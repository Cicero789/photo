/** Upload photo to album — POST /api/albums/:id/photos */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;

  // Verify ownership
  const album = await context.env.DB!.prepare("SELECT id FROM albums WHERE id = ? AND user_id = ?").bind(id, a.userId).first();
  if (!album) return json({ error: "Album not found" }, 404);

  const contentType = context.request.headers.get("content-type") || "";

  // Handle multipart upload
  if (contentType.includes("multipart/form-data")) {
    const form = await context.request.formData();
    const file = form.get("file") as File | null;
    if (!file) return json({ error: "No file provided" }, 400);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const storageKey = `albums/${id}/${crypto.randomUUID()}.${ext}`;
    await context.env.PHOTOS!.put(storageKey, file.stream(), { httpMetadata: { contentType: file.type } });

    // Get next sort order
    const maxOrder = await context.env.DB!.prepare("SELECT MAX(sort_order) as m FROM album_photos WHERE album_id = ?").bind(id).first() as any;
    const sortOrder = (maxOrder?.m || 0) + 1;

    await context.env.DB!.prepare(
      "INSERT INTO album_photos (album_id, storage_key, filename, sort_order, created_at) VALUES (?,?,?,?,datetime('now'))"
    ).bind(id, storageKey, file.name, sortOrder).run();

    return json({ storageKey, filename: file.name, url: `/api/media/photos/${storageKey}` }, 201);
  }

  // Handle JSON body (link existing photo by storage_key)
  const body = await context.request.json() as { storageKey: string; filename?: string };
  if (!body.storageKey) return json({ error: "storageKey required" }, 400);

  const maxOrder = await context.env.DB!.prepare("SELECT MAX(sort_order) as m FROM album_photos WHERE album_id = ?").bind(id).first() as any;
  const sortOrder = (maxOrder?.m || 0) + 1;

  await context.env.DB!.prepare(
    "INSERT OR IGNORE INTO album_photos (album_id, storage_key, filename, sort_order, created_at) VALUES (?,?,?,?,datetime('now'))"
  ).bind(id, body.storageKey, body.filename || "", sortOrder).run();

  return json({ storageKey: body.storageKey, url: `/api/media/photos/${body.storageKey}` }, 201);
}
