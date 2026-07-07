import { BaseRepo } from './base-repo.js';
import type { SpaceRow, SpaceMemberRow } from '@framenest/shared';

export class SpaceRepo extends BaseRepo {
  async getById(id: string): Promise<SpaceRow | null> {
    return this.db.prepare('SELECT * FROM spaces WHERE id = ?').bind(id).first<SpaceRow>();
  }

  async getBySlug(slug: string): Promise<SpaceRow | null> {
    return this.db.prepare('SELECT * FROM spaces WHERE slug = ?').bind(slug.toLowerCase()).first<SpaceRow>();
  }

  async getByDomain(domain: string): Promise<SpaceRow | null> {
    return this.db.prepare('SELECT * FROM spaces WHERE custom_domain = ?').bind(domain).first<SpaceRow>();
  }

  async create(space: {
    id: string; name: string; slug: string; password_hash: string; owner_id: string;
    theme_color?: string; logo_url?: string;
  }): Promise<SpaceRow> {
    await this.db.prepare(`
      INSERT INTO spaces (id, name, slug, password_hash, owner_id, theme_color, logo_url, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(space.id, space.name, space.slug.toLowerCase(), space.password_hash, space.owner_id, space.theme_color ?? '#3b82f6', space.logo_url ?? null).run();
    return (await this.getById(space.id))!;
  }

  async update(id: string, updates: Partial<Pick<SpaceRow, 'name' | 'slug' | 'theme_color' | 'logo_url' | 'custom_domain' | 'hero_enabled' | 'hero_source' | 'hero_style'>>): Promise<void> {
    const sets: string[] = [];
    const params: unknown[] = [];
    for (const [k, v] of Object.entries(updates)) {
      sets.push(`${k} = ?`);
      params.push(v);
    }
    if (sets.length === 0) return;
    sets.push("updated_at = datetime('now')");
    params.push(id);
    await this.db.prepare(`UPDATE spaces SET ${sets.join(', ')} WHERE id = ?`).bind(...params).run();
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.db.prepare("UPDATE spaces SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").bind(passwordHash, id).run();
  }

  // Members
  async getMember(spaceId: string, userId: string): Promise<SpaceMemberRow | null> {
    return this.db.prepare('SELECT * FROM space_members WHERE space_id = ? AND user_id = ?').bind(spaceId, userId).first<SpaceMemberRow>();
  }

  async listMembers(spaceId: string): Promise<SpaceMemberRow[]> {
    const r = await this.db.prepare('SELECT * FROM space_members WHERE space_id = ?').bind(spaceId).all<SpaceMemberRow>();
    return r.results;
  }

  async addMember(member: { id: string; space_id: string; user_id: string; role: string }): Promise<void> {
    await this.db.prepare('INSERT OR IGNORE INTO space_members (id, space_id, user_id, role) VALUES (?,?,?,?)').bind(member.id, member.space_id, member.user_id, member.role).run();
  }

  async removeMember(spaceId: string, userId: string): Promise<void> {
    await this.db.prepare('DELETE FROM space_members WHERE space_id = ? AND user_id = ?').bind(spaceId, userId).run();
  }
}
