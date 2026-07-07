/** Gallery management — PUT + DELETE + POST (upload) /api/clients/:id/galleries/:gid */
import { json } from "../../../../lib/response"; import { requireAuth } from "../../../../lib/auth";
import { validateUploadContent } from "../../../../lib/upload-validate";
import { rejectOversizedRequest } from "../../../../lib/upload-policy";

async function getOwnedGallery(db: D1Database, clientSiteId: string, galleryId: string, userId: string) {
  const gallery = await db.prepare(
    `SELECT g.* FROM client_galleries g JOIN client_sites cs ON g.client_site_id = cs.id
     WHERE g.id = ? AND cs.id = ? AND cs.photographer_id = ? AND g.deleted_at IS NULL AND cs.deleted_at IS NULL`
  ).bind(galleryId, clientSiteId, userId).first() as any;
  return gallery || null;
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; gid: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, gid } = context.params;
  const gallery = await getOwnedGallery(context.env.DB!, id, gid, a.userId);
  if (!gallery) return json({ error: "Gallery not found or access denied" }, 404);

  const body = await context.request.json() as { name: string };
  if (!body.name?.trim()) return json({ error: "Gallery name required" }, 400);

  await context.env.DB!.prepare("UPDATE client_galleries SET name = ?, updated_at = ? WHERE id = ?").bind(body.name.trim(), new Date().toISOString(), gid).run();

  return json({ success: true, id: gid });
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; gid: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, gid } = context.params;
  const gallery = await getOwnedGallery(context.env.DB!, id, gid, a.userId);
  if (!gallery) return json({ error: "Gallery not found or access denied" }, 404);

  // Delete photos from R2
  const photos = await context.env.DB!.prepare("SELECT storage_key FROM client_gallery_photos WHERE gallery_id = ?").bind(gid).all();
  if (context.env.PHOTOS) {
    for (const p of (photos.results || []) as any[]) {
      try { await context.env.PHOTOS.delete(p.storage_key); } catch {}
    }
  }
  await context.env.DB!.prepare("DELETE FROM client_gallery_photos WHERE gallery_id = ?").bind(gid).run();
  await context.env.DB!.prepare("UPDATE client_galleries SET deleted_at = ? WHERE id = ?").bind(new Date().toISOString(), gid).run();

  return json({ success: true });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; gid: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, gid } = context.params;
  const gallery = await getOwnedGallery(context.env.DB!, id, gid, a.userId);
  if (!gallery) return json({ error: "Gallery not found or access denied" }, 404);

  const ct = context.request.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) return json({ error: "Use multipart/form-data to upload photos" }, 400);
  const tooLarge = rejectOversizedRequest(context.request, 25 * 1024 * 1024);
  if (tooLarge) return tooLarge;

  const form = await context.request.formData();
  const uploaded: any[] = [];
  const files = form.getAll("files") as unknown as File[];

  if (!files || files.length === 0) return json({ error: "At least one file is required" }, 400);

  const PHOTO_TYPES = ["image/jpeg","image/png","image/webp","image/avif","image/heic"];
  for (const file of files) {
    if (!PHOTO_TYPES.includes(file.type)) return json({ error: `Invalid file type: ${file.type}` }, 400);
    if (file.size > 50 * 1024 * 1024) return json({ error: "File too large (max 50MB)" }, 400);
  }

  for (const file of files) {
    const contentCheck = await validateUploadContent(file);
    if (!contentCheck.valid) return json({ error: contentCheck.reason }, 400);
  }

  // Get current max sort_order
  const maxOrder = await context.env.DB!.prepare("SELECT MAX(sort_order) as m FROM client_gallery_photos WHERE gallery_id = ?").bind(gid).first() as any;
  let sortOrder = (maxOrder?.m || 0) + 1;

  for (const file of files) {
    const photoId = crypto.randomUUID();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const storageKey = `client-galleries/${gid}/${photoId}.${ext}`;
    const now = new Date().toISOString();

    if (context.env.PHOTOS) {
      await context.env.PHOTOS.put(storageKey, file.stream(), { httpMetadata: { contentType: file.type || "image/jpeg" } });
    }

    await context.env.DB!.prepare(
      "INSERT INTO client_gallery_photos (gallery_id, storage_key, caption, sort_order, uploaded_at) VALUES (?,?,?,?,datetime('now'))"
    ).bind(gid, storageKey, file.name, sortOrder).run();

    uploaded.push({ storageKey, filename: file.name, url: `/api/media/photos/${storageKey}` });
    sortOrder++;
  }

  return json({ photos: uploaded }, 201);
}
