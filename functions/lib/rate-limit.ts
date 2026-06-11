const WINDOW_MINUTES = 1; const MAX_PER_MINUTE = 10; const WINDOW_HOURS = 1; const MAX_PER_HOUR = 30;

export async function checkRateLimit(db: D1Database, ip: string, endpoint: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const now = Date.now(); const minAgo = now - WINDOW_MINUTES * 60 * 1000; const hourAgo = now - WINDOW_HOURS * 60 * 60 * 1000;
  await db.prepare("DELETE FROM rate_limits WHERE timestamp < ?").bind(hourAgo).run();
  const minCount = await db.prepare("SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp > ?").bind(ip, endpoint, minAgo).first<{ count: number }>();
  const hourCount = await db.prepare("SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp > ?").bind(ip, endpoint, hourAgo).first<{ count: number }>();
  if ((minCount?.count ?? 0) >= MAX_PER_MINUTE) return { allowed: false, retryAfter: 60 };
  if ((hourCount?.count ?? 0) >= MAX_PER_HOUR) return { allowed: false, retryAfter: 3600 };
  await db.prepare("INSERT INTO rate_limits (id, ip, endpoint, timestamp) VALUES (?, ?, ?, ?)").bind(crypto.randomUUID(), ip, endpoint, now).run();
  return { allowed: true };
}

export function getClientIP(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ?? request.headers.get("X-Real-IP") ?? "127.0.0.1";
}
