import { json } from "../../lib/response";
import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "staff");
    if (rc) return rc;

    const db = context.env.DB!;
    const photo = await db.prepare("SELECT storage_key, space_id FROM photos WHERE id = ? AND deleted_at IS NULL").bind(context.params.id).first() as any;
    if (!photo) return json({ error: "Photo not found" }, 404);
    if (photo.space_id !== a.spaceId) return json({ error: "Forbidden" }, 403);

    // Soft-delete the photo
    await db.prepare("UPDATE photos SET deleted_at = datetime('now') WHERE id = ?").bind(context.params.id).run();

    // Move R2 object to trash
    try {
      const obj = await context.env.PHOTOS?.get(photo.storage_key);
      if (obj) {
        await context.env.PHOTOS?.put(`trash/${photo.storage_key}`, obj.body);
        await context.env.PHOTOS?.delete(photo.storage_key);
      }
    } catch { /* ignore R2 errors — row is already soft-deleted */ }

    return json({ success: true });
  } catch (err) {
    console.error("Delete photo error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
