// Base repository — soft-delete filter, batch transactions, atomic rate limit
export abstract class BaseRepo {
  constructor(protected db: D1Database) {}

  /** Soft-delete filter for SELECT queries. Call in WHERE clause. */
  protected active(tableName: string, alias?: string): string {
    const tbl = alias ?? tableName;
    return `AND ${tbl}.deleted_at IS NULL`;
  }

  /** Execute multiple statements atomically */
  async batch(statements: Array<{ sql: string; params: unknown[] }>): Promise<D1Result[]> {
    const stmts = statements.map(s => this.db.prepare(s.sql).bind(...s.params));
    return this.db.batch(stmts);
  }

  /** Atomic rate limit — no race condition */
  protected async checkRateLimit(
    key: string, maxActions: number, windowSeconds: number,
  ): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const now = Math.floor(Date.now() / 1000);
    const cutoff = now - windowSeconds;
    const result = await this.db.prepare(`
      INSERT INTO rate_limits (key, count, window_start, updated_at)
      VALUES (?, 1, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN window_start < ? THEN 1 ELSE count + 1 END,
        window_start = CASE WHEN window_start < ? THEN ? ELSE window_start END,
        updated_at = datetime('now')
      RETURNING count, window_start
    `).bind(key, now, cutoff, cutoff, now).first<{ count: number; window_start: number }>();
    const remaining = Math.max(0, maxActions - (result?.count ?? 0));
    return { allowed: remaining > 0, remaining, resetAt: (result?.window_start ?? now) + windowSeconds };
  }
}
