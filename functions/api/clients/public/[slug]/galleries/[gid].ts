/** Public gallery photos — GET /api/clients/public/:slug/galleries/:gid */
import { json } from "../../../../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { slug: string; gid: string } }): Promise<Response> {
  const { slug, gid } = context.params;
  if (!slug || !gid) return json({ error: "Slug and gallery ID required" }, 400);

  const db = context.env.DB!;
  // Verify the client site exists and is published, and gallery belongs to it
  const gallery = await db.prepare(
    `SELECT g.id, g.name FROM client_galleries g
     JOIN client_sites cs ON g.client_site_id = cs.id
     WHERE g.id = ? AND cs.slug = ? AND cs.published = 1 AND cs.deleted_at IS NULL AND g.deleted_at IS NULL`
  ).bind(gid, slug).first() as any;

  if (!gallery) return json({ error: "Gallery not found" }, 404);

  const photos = await db.prepare(
    "SELECT id, storage_key, filename, width, height, file_size, sort_order, created_at FROM client_gallery_photos WHERE gallery_id = ? ORDER BY sort_order, created_at"
  ).bind(gid).all();

  return json({
    id: gallery.id,
    name: gallery.name,
    photos: (photos.results || []).map((p: any) => ({
      id: p.id,
      url: `/api/media/photos/${p.storage_key}`,
      storageKey: p.storage_key,
      filename: p.filename || "",
      width: p.width,
      height: p.height,
      fileSize: p.file_size,
      sortOrder: p.sort_order,
      createdAt: p.created_at,
    })),
  });
}
