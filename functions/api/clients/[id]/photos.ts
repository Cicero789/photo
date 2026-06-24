/** Client site photo pool — POST upload photos */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";
import { validateUploadContent } from "../../../lib/upload-validate";

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; PHOTOS?: R2Bucket };
  params: { id: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const db = context.env.DB!;
  // Verify photographer owns this client site
  const site = await db.prepare("SELECT id, slug FROM client_sites WHERE id = ? AND photographer_id = ?")
    .bind(context.params.id, a.userId).first();
  if (!site) return json({ error: "Client site not found" }, 404);

  const form = await context.request.formData();
  const files = form.getAll("photos") as File[];

  if (!files.length) return json({ error: "No photos provided" }, 400);

  const results = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    if (file.size > 20 * 1024 * 1024) continue;

    // Validate content
    const contentCheck = await validateUploadContent(file);
    if (!contentCheck.valid) continue;

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const storageKey = `clients/${site.slug}/${crypto.randomUUID()}.${ext}`;
    await context.env.PHOTOS!.put(storageKey, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    // Auto-create or add to "Photos" gallery
    let gallery = await db.prepare("SELECT id FROM client_galleries WHERE client_site_id = ? AND slug = 'photos'")
      .bind(context.params.id).first() as any;
    if (!gallery) {
      const gid = crypto.randomUUID();
      await db.prepare("INSERT INTO client_galleries (id, client_site_id, name, slug, created_at) VALUES (?,?,?,?,datetime('now'))")
        .bind(gid, context.params.id, "Photos", "photos").run();
      gallery = { id: gid };
    }

    const maxOrder = await db.prepare("SELECT MAX(sort_order) as m FROM client_gallery_photos WHERE gallery_id = ?")
      .bind(gallery.id).first() as any;
    await db.prepare("INSERT INTO client_gallery_photos (gallery_id, storage_key, caption, sort_order, uploaded_at) VALUES (?,?,?,?,datetime('now'))")
      .bind(gallery.id, storageKey, file.name, (maxOrder?.m || 0) + 1).run();

    results.push({ storageKey, filename: file.name });
  }

  return json({ uploaded: results.length, photos: results }, 201);
}
