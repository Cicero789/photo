import { BaseRepo } from './base-repo.js';
import type { AlbumRow, AlbumPhotoRow } from '@framenest/shared';

export class AlbumRepo extends BaseRepo {
  async getById(id: string): Promise<AlbumRow | null> {
    return this.db.prepare(`SELECT * FROM albums WHERE id = ? ${this.active('albums')}`).bind(id).first<AlbumRow>();
  }

  async getByShareToken(token: string): Promise<AlbumRow | null> {
    return this.db.prepare(`SELECT * FROM albums WHERE share_token = ? ${this.active('albums')}`).bind(token).first<AlbumRow>();
  }

  async listByUser(userId: string): Promise<(AlbumRow & { photo_count: number })[]> {
    const r = await this.db.prepare(`
      SELECT a.*, COALESCE(ap.cnt, 0) as photo_count
      FROM albums a LEFT JOIN (SELECT album_id, COUNT(*) as cnt FROM album_photos GROUP BY album_id) ap ON a.id = ap.album_id
      WHERE a.user_id = ? ${this.active('a')}
      ORDER BY a.created_at DESC
    `).bind(userId).all<AlbumRow & { photo_count: number }>();
    return r.results;
  }

  async create(data: {
    id: string; user_id: string; name: string; share_token: string;
    password?: string; allow_downloads?: boolean; expires_at?: string;
  }): Promise<void> {
    await this.db.prepare(`
      INSERT INTO albums (id, user_id, name, share_token, password, allow_downloads, expires_at, created_at)
      VALUES (?,?,?,?,?,?,?,datetime('now'))
    `).bind(data.id, data.user_id, data.name, data.share_token,
      data.password ?? null, data.allow_downloads !== false ? 1 : 0, data.expires_at ?? null).run();
  }

  async softDelete(id: string): Promise<void> {
    await this.db.prepare("UPDATE albums SET deleted_at = datetime('now') WHERE id = ?").bind(id).run();
  }

  async incrementViews(id: string): Promise<void> {
    await this.db.prepare('UPDATE albums SET view_count = view_count + 1 WHERE id = ?').bind(id).run();
  }

  // Photos
  async addPhoto(albumId: string, storageKey: string, filename: string, sortOrder: number): Promise<void> {
    await this.db.prepare('INSERT OR IGNORE INTO album_photos (album_id, storage_key, filename, sort_order, created_at) VALUES (?,?,?,?,datetime(\'now\'))').bind(albumId, storageKey, filename, sortOrder).run();
  }

  async listPhotos(albumId: string): Promise<AlbumPhotoRow[]> {
    const r = await this.db.prepare('SELECT * FROM album_photos WHERE album_id = ? ORDER BY sort_order').bind(albumId).all<AlbumPhotoRow>();
    return r.results;
  }

  async getMaxSortOrder(albumId: string): Promise<number> {
    const r = await this.db.prepare('SELECT MAX(sort_order) as m FROM album_photos WHERE album_id = ?').bind(albumId).first<{ m: number }>();
    return r?.m ?? 0;
  }
}
