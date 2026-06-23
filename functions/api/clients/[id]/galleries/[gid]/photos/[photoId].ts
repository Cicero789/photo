/** Delete photo from gallery — DELETE /api/clients/:id/galleries/:gid/photos/:photoId */
import { json } from "../../../../../../lib/response"; import { requireAuth } from "../../../../../../lib/auth";

async function getOwnedGalleryPhoto(db: D1Database, clientSiteId: string, galleryId: string, photoId: string, userId: string) {
  const photo = await db.prepare(
    `SELECT cgp.* FROM client_gallery_photos cgp
     JOIN client_galleries g ON cgp.gallery_id = g.id
     JOIN client_sites cs ON g.client_site_id = cs.id
     WHERE cgp.id = ? AND g.id = ? AND cs.id = ? AND cs.photographer_id = ? AND g.deleted_at IS NULL AND cs.deleted_at IS NULL`
  ).bind(photoId, galleryId, clientSiteId, userId).first() as any;
  return photo || null;
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; gid: string; photoId: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, gid, photoId } = context.params;
  const photo = await getOwnedGalleryPhoto(context.env.DB!, id, gid, photoId, a.userId);
  if (!photo) return json({ error: "Photo not found or access denied" }, 404);

  // Delete from R2
  if (context.env.PHOTOS) {
    try { await context.env.PHOTOS.delete(photo.storage_key); } catch {}
  }
  await context.env.DB!.prepare("DELETE FROM client_gallery_photos WHERE id = ?").bind(photoId).run();

  return json({ success: true });
}
