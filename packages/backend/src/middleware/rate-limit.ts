// Rate limiting middleware — atomic token bucket via D1 UPSERT
import { RATE_LIMIT_PER_MINUTE, RATE_LIMIT_PER_HOUR } from '@framenest/shared';

interface RateLimitConfig {
  perMinute?: number;
  perHour?: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  perMinute: RATE_LIMIT_PER_MINUTE,
  perHour: RATE_LIMIT_PER_HOUR,
};

export function getClientIP(request: Request): string {
  const cf = request.headers.get('CF-Connecting-IP');
  if (cf) return cf;
  const xff = request.headers.get('X-Forwarded-For');
  if (xff) return xff.split(',')[0]!.trim();
  const xri = request.headers.get('X-Real-IP');
  if (xri) return xri;
  return '127.0.0.1';
}

export async function checkRateLimit(
  db: D1Database,
  request: Request,
  endpoint: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): Promise<{ allowed: boolean; retryAfter?: number } | null> {
  const ip = getClientIP(request);
  const now = Math.floor(Date.now() / 1000);

  // Check per-minute limit
  if (config.perMinute) {
    const minuteKey = `ratelimit:${endpoint}:minute:${ip}`;
    const minuteCutoff = now - 60;

    const result = await db.prepare(`
      INSERT INTO rate_limits (key, count, window_start, updated_at)
      VALUES (?, 1, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN window_start < ? THEN 1 ELSE count + 1 END,
        window_start = CASE WHEN window_start < ? THEN ? ELSE window_start END,
        updated_at = datetime('now')
      RETURNING count, window_start
    `).bind(minuteKey, now, minuteCutoff, minuteCutoff, now).first<{ count: number; window_start: number }>();

    if (result && result.count > config.perMinute) {
      return { allowed: false, retryAfter: result.window_start + 60 - now };
    }
  }

  // Check per-hour limit
  if (config.perHour) {
    const hourKey = `ratelimit:${endpoint}:hour:${ip}`;
    const hourCutoff = now - 3600;

    const result = await db.prepare(`
      INSERT INTO rate_limits (key, count, window_start, updated_at)
      VALUES (?, 1, ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN window_start < ? THEN 1 ELSE count + 1 END,
        window_start = CASE WHEN window_start < ? THEN ? ELSE window_start END,
        updated_at = datetime('now')
      RETURNING count, window_start
    `).bind(hourKey, now, hourCutoff, hourCutoff, now).first<{ count: number; window_start: number }>();

    if (result && result.count > config.perHour) {
      return { allowed: false, retryAfter: result.window_start + 3600 - now };
    }
  }

  return { allowed: true };
}
