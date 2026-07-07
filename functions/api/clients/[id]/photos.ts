/** Client site photo pool — POST upload photos */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";
import { validateUploadContent } from "../../../lib/upload-validate";

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic"];

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; PHOTOS?: R2Bucket };
  params: { id: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const db = context.env.DB!;
  // Verify photographer owns this client site
  const site = await db.prepare("SELECT id, slug FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL")
    .bind(context.params.id, a.userId).first() as any;
  if (!site) return json({ error: "Client site not found" }, 404);

  const ct = context.request.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) return json({ error: "Use multipart/form-data to upload photos" }, 400);

  const form = await context.request.formData();
  const files = form.getAll("photos") as unknown as File[];

  if (!files || files.length === 0) return json({ error: "No photos provided" }, 400);

  // --- Validate ALL files before writing any ---
  for (const file of files) {
    if (!PHOTO_TYPES.includes(file.type)) return json({ error: `Invalid file type: ${file.type}` }, 400);
    if (file.size > 20 * 1024 * 1024) return json({ error: "File too large (max 20MB)" }, 400);
  }
  for (const file of files) {
    const contentCheck = await validateUploadContent(file);
    if (!contentCheck.valid) return json({ error: contentCheck.reason }, 400);
  }

  // --- Find or create the default "Photos" gallery (name + slug) ---
  let gallery = await db.prepare("SELECT id FROM client_galleries WHERE client_site_id = ? AND slug = 'photos' AND deleted_at IS NULL")
    .bind(context.params.id).first() as any;
  if (!gallery) {
    const gid = crypto.randomUUID();
    const nowIso = new Date().toISOString();
    await db.prepare("INSERT INTO client_galleries (id, client_site_id, name, slug, created_at, updated_at) VALUES (?,?,?,?,?,?)")
      .bind(gid, context.params.id, "Photos", "photos", nowIso, nowIso).run();
    gallery = { id: gid };
  }

  // Determine the starting sort order once (composite PK is gallery_id + storage_key; no auto-increment id)
  const maxOrder = await db.prepare("SELECT MAX(sort_order) as m FROM client_gallery_photos WHERE gallery_id = ?")
    .bind(gallery.id).first() as any;
  let sortOrder = (maxOrder?.m || 0) + 1;

  const results: { storageKey: string; filename: string; url: string }[] = [];
  for (const file of files) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const storageKey = `clients/${site.slug}/${crypto.randomUUID()}.${ext}`;

    // Write to R2 first
    await context.env.PHOTOS!.put(storageKey, file.stream(), {
      httpMetadata: { contentType: file.type || "image/jpeg" },
    });

    // Insert using only real columns: gallery_id, storage_key, caption, sort_order, uploaded_at.
    // Compensate (delete the orphaned R2 object) if the D1 insert fails.
    try {
      await db.prepare(
        "INSERT INTO client_gallery_photos (gallery_id, storage_key, caption, sort_order, uploaded_at) VALUES (?,?,?,?,?)"
      ).bind(gallery.id, storageKey, file.name, sortOrder, new Date().toISOString()).run();
    } catch (err) {
      try { await context.env.PHOTOS!.delete(storageKey); } catch {}
      return json({ error: "Failed to save photo" }, 500);
    }

    results.push({ storageKey, filename: file.name, url: `/api/media/photos/${storageKey}` });
    sortOrder++;
  }

  return json({ uploaded: results.length, photos: results }, 201);
}

export async function onRequestGet(context: {
  request: Request; env: { DB?: D1Database; MEDIA_SIGNING_SECRET?: string; JWT_SECRET?: string }; params: { id: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const db = context.env.DB!;
  const site = await db.prepare("SELECT id, published FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL")
    .bind(context.params.id, a.userId).first() as any;
  if (!site) return json({ error: "Client site not found" }, 404);

  const rows = await db.prepare(
    `SELECT cgp.storage_key, cgp.caption as filename, cgp.sort_order, cgp.uploaded_at as created_at, cgp.gallery_id
     FROM client_gallery_photos cgp
     JOIN client_galleries g ON g.id = cgp.gallery_id
     WHERE g.client_site_id = ? AND cgp.deleted_at IS NULL AND g.deleted_at IS NULL
     ORDER BY cgp.uploaded_at DESC`
  ).bind(context.params.id).all();

  const secret = context.env.MEDIA_SIGNING_SECRET || context.env.JWT_SECRET || "";
  const photos = await Promise.all((rows.results || []).map(async (p: any) => {
    let url = `/api/media/photos/${p.storage_key}`;
    if (site.published !== 1 && secret) {
      const { signMediaUrl } = await import("../../../lib/signed-url");
      url = await signMediaUrl(p.storage_key, secret, 3600);
    }
    return { storageKey: p.storage_key, filename: p.filename || "", url, sortOrder: p.sort_order, galleryId: p.gallery_id, createdAt: p.created_at };
  }));

  return json({ photos });
}
