import { json } from '../../lib/response.js';
import { createAlbumSchema, Errors, isAppError } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { AlbumService } from '../../services/album-service.js';
import { AlbumRepo } from '../../repos/album-repo.js';
import { PhotoRepo } from '../../repos/photo-repo.js';
import { serializeAlbum } from '../../serializers/album.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database; MEDIA_SIGNING_SECRET: string } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;

    const service = new AlbumService(new AlbumRepo(context.env.DB), new PhotoRepo(context.env.DB), null as unknown as R2Bucket, context.env);
    const albums = await service.getMyAlbums(auth.actor);
    return json({ albums: albums.map(serializeAlbum) });
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}

export async function onRequestPost(context: { request: Request; env: { DB: D1Database; PHOTOS: R2Bucket; MEDIA_SIGNING_SECRET: string } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;

    const body = await context.request.json();
    const parsed = createAlbumSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);

    const service = new AlbumService(new AlbumRepo(context.env.DB), new PhotoRepo(context.env.DB), context.env.PHOTOS, context.env);
    const album = await service.create(auth.actor, parsed.data);

    return json({ album: serializeAlbum({ ...album!, photo_count: 0 }) }, 201);
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}
