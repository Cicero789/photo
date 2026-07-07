import { Errors, generateId, MAX_ALBUM_PHOTO_BYTES, MAX_ALBUM_PHOTO_COUNT } from '@framenest/shared';
import { AlbumRepo } from '../repos/album-repo.js';
import { PhotoRepo } from '../repos/photo-repo.js';
import { hashPassword, verifyPassword } from '../lib/password.js';
import { signMediaUrl } from '../lib/media-signing.js';
import { validateUploadContent } from '../lib/upload-validate.js';
import { log } from '../lib/logger.js';
import type { Actor } from '../middleware/auth.js';

export class AlbumService {
  constructor(
    private albumRepo: AlbumRepo,
    private photoRepo: PhotoRepo,
    private photosBucket: R2Bucket,
    private env: { MEDIA_SIGNING_SECRET: string },
  ) {}

  async create(actor: Actor, input: {
    name: string; password?: string; allowDownloads?: boolean; expiresAt?: string;
  }) {
    const id = generateId('album');
    const shareToken = generateId('connection');

    let hashedPassword: string | undefined;
    if (input.password) {
      hashedPassword = await hashPassword(input.password);
    }

    await this.albumRepo.create({
      id, user_id: actor.userId, name: input.name, share_token: shareToken,
      password: hashedPassword, allow_downloads: input.allowDownloads ?? true,
      expires_at: input.expiresAt,
    });

    log({ level: 'info', message: 'Album created', actor: actor.userId, action: 'album_created', metadata: { albumId: id } });

    return this.albumRepo.getById(id);
  }

  async getMyAlbums(actor: Actor) {
    return this.albumRepo.listByUser(actor.userId);
  }

  async view(token: string, password?: string) {
    const album = await this.albumRepo.getByShareToken(token);
    if (!album) throw Errors.notFound('Album');

    // Check expiration
    if (album.expires_at && new Date(album.expires_at) < new Date()) {
      throw Errors.forbidden('This album has expired');
    }

    // Check password
    if (album.password) {
      if (!password) throw Errors.unauthorized('Password required');
      const valid = await verifyPassword(password, album.password);
      if (!valid) throw Errors.unauthorized('Invalid password');
    }

    await this.albumRepo.incrementViews(album.id);

    // Get photos with signed URLs
    const photos = await this.albumRepo.listPhotos(album.id);
    const photoDetails = await Promise.all(
      photos.map(async (p) => {
        const url = await signMediaUrl(p.storage_key, this.env.MEDIA_SIGNING_SECRET);
        return { storageKey: p.storage_key, filename: p.filename, url, sortOrder: p.sort_order };
      })
    );

    return { album, photos: photoDetails };
  }

  async addPhoto(actor: Actor, albumId: string, file: File) {
    const album = await this.albumRepo.getById(albumId);
    if (!album) throw Errors.notFound('Album', albumId);
    if (album.user_id !== actor.userId) throw Errors.forbidden('Not your album');

    // Check limits
    const count = await this.albumRepo.getMaxSortOrder(albumId);
    if (count >= MAX_ALBUM_PHOTO_COUNT) {
      throw Errors.validation([{ code: 'custom', path: ['file'], message: `Maximum ${MAX_ALBUM_PHOTO_COUNT} photos per album` }]);
    }
    if (file.size > MAX_ALBUM_PHOTO_BYTES) throw Errors.tooLarge(MAX_ALBUM_PHOTO_BYTES);

    const contentCheck = await validateUploadContent(file);
    if (!contentCheck.valid) throw Errors.unsupportedType(file.type);

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const storageKey = `albums/${albumId}/${crypto.randomUUID()}.${ext}`;
    await this.photosBucket.put(storageKey, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    const sortOrder = count + 1;
    await this.albumRepo.addPhoto(albumId, storageKey, file.name, sortOrder);

    log({ level: 'info', message: 'Photo added to album', actor: actor.userId, action: 'album_photo_added', metadata: { albumId, storageKey } });

    const url = await signMediaUrl(storageKey, this.env.MEDIA_SIGNING_SECRET);
    return { storageKey, filename: file.name, url, sortOrder };
  }

  async delete(actor: Actor, albumId: string) {
    const album = await this.albumRepo.getById(albumId);
    if (!album) throw Errors.notFound('Album', albumId);
    if (album.user_id !== actor.userId) throw Errors.forbidden('Not your album');

    // Delete photos from R2
    const photos = await this.albumRepo.listPhotos(albumId);
    for (const p of photos) {
      if (p.storage_key.startsWith('albums/')) {
        try { await this.photosBucket.delete(p.storage_key); } catch { /* best-effort */ }
      }
    }

    await this.albumRepo.softDelete(albumId);
    log({ level: 'info', message: 'Album deleted', actor: actor.userId, action: 'album_deleted', metadata: { albumId } });
  }
}
