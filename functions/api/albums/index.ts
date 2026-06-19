/** Albums API — GET (list mine) + POST (create) */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { hashPassword } from "../../lib/password";

function generateToken(len = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let s = "";
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  for (const b of arr) s += chars[b % chars.length];
  return s;
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const result = await context.env.DB!.prepare(
    "SELECT a.*, (SELECT COUNT(*) FROM album_photos WHERE album_id = a.id) as photo_count FROM albums a WHERE a.user_id = ? ORDER BY a.created_at DESC"
  ).bind(a.userId).all();
  const albums = (result.results || []).map((r: any) => ({
    id: r.id, name: r.name, shareToken: r.share_token, downloads: r.downloads,
    expiresAt: r.expires_at, viewCount: r.view_count, photoCount: r.photo_count,
    createdAt: r.created_at,
  }));
  return json({ albums });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const body = await context.request.json() as { name: string; password?: string; downloads?: boolean; expiresAt?: string };
  if (!body.name?.trim()) return json({ error: "Album name is required" }, 400);

  const id = crypto.randomUUID();
  const shareToken = generateToken();
  await context.env.DB!.prepare(
    "INSERT INTO albums (id, user_id, name, share_token, password, downloads, expires_at, created_at) VALUES (?,?,?,?,?,?,?,datetime('now'))"
  ).bind(id, a.userId, body.name.trim(), shareToken, body.password ? await hashPassword(body.password) : null, body.downloads === false ? 0 : 1, body.expiresAt || null).run();

  return json({ id, shareToken, name: body.name.trim() }, 201);
}
