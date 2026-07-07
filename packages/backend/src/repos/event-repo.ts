import { BaseRepo } from './base-repo.js';
import type { EventRow } from '@framenest/shared';

export class EventRepo extends BaseRepo {
  async getById(id: string): Promise<EventRow | null> {
    return this.db.prepare(`SELECT * FROM events WHERE id = ? ${this.active('events')}`).bind(id).first<EventRow>();
  }

  async getByIdAny(id: string): Promise<EventRow | null> {
    return this.db.prepare('SELECT * FROM events WHERE id = ?').bind(id).first<EventRow>();
  }

  async listBySpace(spaceId: string, opts?: {
    visibility?: string; category?: string; year?: number; limit?: number; offset?: number;
  }): Promise<EventRow[]> {
    let sql = `SELECT * FROM events WHERE space_id = ? ${this.active('events')}`;
    const params: unknown[] = [spaceId];
    if (opts?.visibility) { sql += ' AND visibility = ?'; params.push(opts.visibility); }
    if (opts?.category) { sql += ' AND category = ?'; params.push(opts.category); }
    if (opts?.year) { sql += ' AND event_date >= ? AND event_date < ?'; params.push(`${opts.year}-01-01`, `${opts.year + 1}-01-01`); }
    sql += ' ORDER BY event_date DESC, created_at DESC';
    sql += ` LIMIT ${opts?.limit ?? 50} OFFSET ${opts?.offset ?? 0}`;
    const r = await this.db.prepare(sql).bind(...params).all<EventRow>();
    return r.results;
  }

  async listPublic(limit = 50, offset = 0): Promise<EventRow[]> {
    const r = await this.db.prepare(`
      SELECT * FROM events WHERE visibility = 'public' ${this.active('events')}
      ORDER BY created_at DESC LIMIT ? OFFSET ?
    `).bind(limit, offset).all<EventRow>();
    return r.results;
  }

  async create(data: {
    id: string; space_id: string; title: string; category: string; event_date: string;
    description?: string; address?: string; visibility?: string;
    latitude?: number; longitude?: number;
  }): Promise<void> {
    await this.db.prepare(`
      INSERT INTO events (id, space_id, title, category, event_date, description, address, visibility, latitude, longitude, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,datetime('now'),datetime('now'))
    `).bind(data.id, data.space_id, data.title, data.category, data.event_date,
      data.description ?? '', data.address ?? '', data.visibility ?? 'private',
      data.latitude ?? null, data.longitude ?? null).run();
  }

  async update(id: string, updates: Partial<Pick<EventRow, 'title' | 'category' | 'event_date' | 'description' | 'address' | 'visibility' | 'latitude' | 'longitude' | 'ai_summary' | 'cover_photo_id'>>): Promise<void> {
    const sets: string[] = [];
    const params: unknown[] = [];
    for (const [k, v] of Object.entries(updates)) {
      sets.push(`${k} = ?`);
      params.push(v);
    }
    if (sets.length === 0) return;
    sets.push("updated_at = datetime('now')");
    params.push(id);
    await this.db.prepare(`UPDATE events SET ${sets.join(', ')} WHERE id = ?`).bind(...params).run();
  }

  async softDelete(id: string): Promise<void> {
    await this.db.prepare("UPDATE events SET deleted_at = datetime('now') WHERE id = ?").bind(id).run();
  }

  async getPhotoCount(eventId: string): Promise<number> {
    const r = await this.db.prepare(`SELECT COUNT(*) as c FROM photos WHERE event_id = ? ${this.active('photos')}`).bind(eventId).first<{ c: number }>();
    return r?.c ?? 0;
  }

  async getStats(spaceId: string): Promise<{ total: number; photoCount: number }> {
    const r = await this.db.prepare(`SELECT COUNT(*) as c FROM events WHERE space_id = ? ${this.active('events')}`).bind(spaceId).first<{ c: number }>();
    return { total: r?.c ?? 0, photoCount: 0 };
  }
}
