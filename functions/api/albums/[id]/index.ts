/** Album management — DELETE /api/albums/:id */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;

  // Verify ownership
  const album = await context.env.DB!.prepare("SELECT id FROM albums WHERE id = ? AND user_id = ?").bind(id, a.userId).first();
  if (!album) return json({ error: "Album not found" }, 404);

  // Delete album-owned photos from R2 (skip referenced event photos)
  const photos = await context.env.DB!.prepare("SELECT storage_key FROM album_photos WHERE album_id = ?").bind(id).all();
  for (const p of (photos.results || []) as any[]) {
    // Only delete album-owned objects, not referenced event photos
    if (p.storage_key.startsWith("albums/")) {
      try { await context.env.PHOTOS?.delete(p.storage_key); } catch {}
    }
  }
  await context.env.DB!.prepare("DELETE FROM album_photos WHERE album_id = ?").bind(id).run();
  await context.env.DB!.prepare("DELETE FROM albums WHERE id = ?").bind(id).run();

  return json({ success: true });
}
