import { BaseRepo } from './base-repo.js';
import type { UserRow } from '@framenest/shared';

export class UserRepo extends BaseRepo {
  async getById(id: string): Promise<UserRow | null> {
    return this.db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<UserRow>();
  }

  async getByEmail(email: string): Promise<UserRow | null> {
    return this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email.toLowerCase()).first<UserRow>();
  }

  async create(user: {
    id: string; email: string; name: string; password_hash: string; role: string;
    space_id: string; token_version?: number; account_type?: string;
  }): Promise<UserRow> {
    await this.db.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, space_id, token_version, account_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(user.id, user.email.toLowerCase(), user.name, user.password_hash, user.role, user.space_id, user.token_version ?? 0, user.account_type ?? 'personal').run();
    return (await this.getById(user.id))!;
  }

  async updateTokenVersion(id: string): Promise<void> {
    await this.db.prepare('UPDATE users SET token_version = token_version + 1 WHERE id = ?').bind(id).run();
  }

  async updateRole(id: string, role: string): Promise<void> {
    await this.db.prepare('UPDATE users SET role = ? WHERE id = ?').bind(role, id).run();
  }

  async updateAccountType(id: string, type: string): Promise<void> {
    await this.db.prepare('UPDATE users SET account_type = ? WHERE id = ?').bind(type, id).run();
  }

  async delete(id: string): Promise<void> {
    await this.db.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
  }

  async listAll(): Promise<UserRow[]> {
    const r = await this.db.prepare('SELECT * FROM users ORDER BY created_at DESC').all<UserRow>();
    return r.results;
  }
}
