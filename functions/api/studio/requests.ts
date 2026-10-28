import { requestSchema } from "../../../shared/studio";
import { requireAuth, requireRole } from "../../lib/auth";
import { json } from "../../lib/response";
import { verifyPassword } from "../../lib/password";
import { checkRateLimit, getClientIP } from "../../lib/rate-limit";
type Context = { request: Request; env: { DB: D1Database } };
export async function onRequestGet({ request, env }: Context) {
  const auth = await requireAuth(request, env); if (auth instanceof Response) return auth;
  const denied = requireRole(auth, "page_admin"); if (denied) return denied;
  const result = auth.role === "platform_owner"
    ? await env.DB.prepare("SELECT r.*, a.name AS album_name FROM studio_requests r LEFT JOIN albums a ON a.id = r.album_id ORDER BY r.created_at DESC LIMIT 200").all()
    : await env.DB.prepare("SELECT r.*, a.name AS album_name FROM studio_requests r LEFT JOIN albums a ON a.id = r.album_id WHERE r.owner_id = ? ORDER BY r.created_at DESC LIMIT 200").bind(auth.userId).all();
  return json({ requests: result.results });
}
export async function onRequestPost({ request, env }: Context) {
  const limit = await checkRateLimit(env.DB, getClientIP(request), "studio-requests");
  if (!limit.allowed) return json({ error: "Too many requests. Please try again later." }, 429);
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ error: "Please check your contact details and photo selections." }, 400);
  const data = parsed.data; let albumId: string | null = null; let ownerId: string | null = null;
  const items: { key: string; product: string; quantity: number; filename: string }[] = [];
  if (data.kind === "selection") {
    const album = await env.DB.prepare("SELECT id, user_id, password, expires_at FROM albums WHERE share_token = ? AND deleted_at IS NULL").bind(data.token).first<{ id: string; user_id: string; password: string | null; expires_at: string | null }>();
    if (!album || (album.expires_at && new Date(album.expires_at).getTime() < Date.now())) return json({ error: "This gallery key is invalid or expired." }, 403);
    if (album.password && !await verifyPassword(request.headers.get("X-Album-Password") || "", album.password)) return json({ error: "Gallery password required." }, 403);
    const photos = await env.DB.prepare("SELECT storage_key, filename FROM album_photos WHERE album_id = ?").bind(album.id).all<{ storage_key: string; filename: string }>();
    for (const item of data.items) {
      const photo = photos.results.find(p => p.storage_key === item.key);
      if (!photo) return json({ error: "A selected photo does not belong to this gallery." }, 400);
      items.push({ ...item, filename: photo.filename });
    }
    albumId = album.id; ownerId = album.user_id;
  }
  const id = crypto.randomUUID();
  await env.DB.prepare("INSERT INTO studio_requests (id, kind, name, email, message, album_id, owner_id, items) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(id, data.kind, data.name, data.email, data.message, albumId, ownerId, JSON.stringify(items)).run();
  return json({ id, success: true }, 201);
}
