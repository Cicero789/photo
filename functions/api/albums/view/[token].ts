/** Public album viewer — GET /api/albums/view/:token (no auth required) */
import { json } from "../../../lib/response";
import { verifyPassword } from "../../../lib/password";
import { signMediaUrl } from "../../../lib/signed-url";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; MEDIA_SIGNING_SECRET?: string; JWT_SECRET?: string }; params: { token: string } }): Promise<Response> {
  const { token } = context.params;
  if (!token) return json({ error: "Token required" }, 400);

  const album = await context.env.DB!.prepare(
    "SELECT a.*, u.name as owner_name FROM albums a JOIN users u ON a.user_id = u.id WHERE a.share_token = ? AND a.deleted_at IS NULL"
  ).bind(token).first() as any;
  if (!album) return json({ error: "Album not found" }, 404);

  // Check expiration
  if (album.expires_at && new Date(album.expires_at) < new Date()) {
    return json({ error: "This album link has expired" }, 410);
  }

  // Check password (if set, require it via query param or header)
  if (album.password) {
    const pw = context.request.headers.get("X-Album-Password") || "";
    if (!await verifyPassword(pw, album.password)) {
      return json({ needsPassword: true, name: album.name, ownerName: album.owner_name }, 401);
    }
  }

  // Increment view count
  await context.env.DB!.prepare("UPDATE albums SET view_count = view_count + 1 WHERE id = ?").bind(album.id).run();

  // Get photos
  const photosResult = await context.env.DB!.prepare(
    "SELECT storage_key, filename, sort_order FROM album_photos WHERE album_id = ? ORDER BY sort_order, created_at"
  ).bind(album.id).all();

  const secret = context.env.MEDIA_SIGNING_SECRET || context.env.JWT_SECRET || "";
  const photos = await Promise.all((photosResult.results || []).map(async (p: any) => ({
    key: p.storage_key,
    filename: p.filename || "",
    url: await signMediaUrl(p.storage_key, secret, 3600),
  })));

  return json({
    name: album.name,
    ownerName: album.owner_name,
    downloads: album.downloads,
    photoCount: photos.length,
    photos,
  });
}
