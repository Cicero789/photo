// Per-endpoint rate limits — auth stays strict, uploads get more headroom
const LIMITS: Record<string, { perMin: number; perHour: number }> = {
  default:           { perMin: 10, perHour: 30 },
  "photos/upload":   { perMin: 12, perHour: 120 },
  "videos/upload":   { perMin: 6,  perHour: 60 },
  uploads:           { perMin: 12, perHour: 120 }, // client-site/gallery uploads
};

const WINDOW_MINUTES = 1; const WINDOW_HOURS = 1;

export async function checkRateLimit(db: D1Database, ip: string, endpoint: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const cfg = LIMITS[endpoint] ?? LIMITS["default"]!;
  const now = Date.now(); const minAgo = now - WINDOW_MINUTES * 60 * 1000; const hourAgo = now - WINDOW_HOURS * 60 * 60 * 1000;
  await db.prepare("DELETE FROM rate_limits WHERE timestamp < ?").bind(hourAgo).run();
  const minCount = await db.prepare("SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp > ?").bind(ip, endpoint, minAgo).first<{ count: number }>();
  const hourCount = await db.prepare("SELECT COUNT(*) as count FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp > ?").bind(ip, endpoint, hourAgo).first<{ count: number }>();
  if ((minCount?.count ?? 0) >= cfg.perMin) return { allowed: false, retryAfter: 60 };
  if ((hourCount?.count ?? 0) >= cfg.perHour) return { allowed: false, retryAfter: 3600 };
  await db.prepare("INSERT INTO rate_limits (id, ip, endpoint, timestamp) VALUES (?, ?, ?, ?)").bind(crypto.randomUUID(), ip, endpoint, now).run();
  return { allowed: true };
}

export function getClientIP(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ?? request.headers.get("X-Real-IP") ?? "127.0.0.1";
}
