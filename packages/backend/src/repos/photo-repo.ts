import { BaseRepo } from './base-repo.js';
import type { PhotoRow } from '@framenest/shared';

export class PhotoRepo extends BaseRepo {
  async getById(id: string): Promise<PhotoRow | null> {
    return this.db.prepare(`SELECT * FROM photos WHERE id = ? ${this.active('photos')}`).bind(id).first<PhotoRow>();
  }

  async listByEvent(eventId: string, limit = 500): Promise<PhotoRow[]> {
    const r = await this.db.prepare(`SELECT * FROM photos WHERE event_id = ? ${this.active('photos')} ORDER BY created_at DESC LIMIT ?`).bind(eventId, limit).all<PhotoRow>();
    return r.results;
  }

  async listBySpace(spaceId: string, hasLocation = false, limit = 500): Promise<PhotoRow[]> {
    let sql = `SELECT * FROM photos WHERE space_id = ? ${this.active('photos')}`;
    if (hasLocation) sql += ' AND latitude IS NOT NULL AND longitude IS NOT NULL';
    sql += ' ORDER BY created_at DESC LIMIT ?';
    const r = await this.db.prepare(sql).bind(spaceId, limit).all<PhotoRow>();
    return r.results;
  }

  async create(data: {
    id: string; event_id: string; space_id: string; original_filename: string;
    storage_key: string; width: number; height: number; file_size: number;
    uploaded_by: string; thumbnail_key?: string; latitude?: number; longitude?: number; taken_at?: string;
  }): Promise<void> {
    await this.db.prepare(`
      INSERT INTO photos (id, event_id, space_id, original_filename, storage_key, thumbnail_key, width, height, file_size, latitude, longitude, taken_at, uploaded_by, created_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'))
    `).bind(data.id, data.event_id, data.space_id, data.original_filename, data.storage_key,
      data.thumbnail_key ?? null, data.width, data.height, data.file_size,
      data.latitude ?? null, data.longitude ?? null, data.taken_at ?? null, data.uploaded_by).run();
  }

  async softDelete(id: string): Promise<void> {
    await this.db.prepare("UPDATE photos SET deleted_at = datetime('now') WHERE id = ?").bind(id).run();
  }

  async toggleFavorite(id: string): Promise<void> {
    await this.db.prepare('UPDATE photos SET favorite = CASE WHEN favorite = 1 THEN 0 ELSE 1 END WHERE id = ?').bind(id).run();
  }

  async getByStorageKey(key: string): Promise<PhotoRow | null> {
    return this.db.prepare('SELECT * FROM photos WHERE storage_key = ?').bind(key).first<PhotoRow>();
  }

  async countByEvent(eventId: string): Promise<number> {
    const r = await this.db.prepare(`SELECT COUNT(*) as c FROM photos WHERE event_id = ? ${this.active('photos')}`).bind(eventId).first<{ c: number }>();
    return r?.c ?? 0;
  }
}
