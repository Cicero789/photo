/** Galleries for a client site — GET + POST /api/clients/:id/galleries */
import { json } from "../../../../lib/response"; import { requireAuth } from "../../../../lib/auth";

async function getOwnedSite(db: D1Database, id: string, userId: string) {
  const site = await db.prepare("SELECT id FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL").bind(id, userId).first();
  return site || null;
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "gallery";
}

async function uniqueGallerySlug(db: D1Database, clientSiteId: string, name: string) {
  const base = slugify(name); let slug = base; let suffix = 2;
  while (await db.prepare("SELECT id FROM client_galleries WHERE client_site_id = ? AND slug = ? AND deleted_at IS NULL").bind(clientSiteId, slug).first()) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const site = await getOwnedSite(context.env.DB!, context.params.id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const r = await context.env.DB!.prepare(
    `SELECT g.*,
            (SELECT COUNT(*) FROM client_gallery_photos WHERE gallery_id = g.id AND deleted_at IS NULL) as photo_count,
            (SELECT storage_key FROM client_gallery_photos WHERE gallery_id = g.id AND deleted_at IS NULL ORDER BY sort_order, uploaded_at LIMIT 1) as cover_storage_key
     FROM client_galleries g WHERE g.client_site_id = ? AND g.deleted_at IS NULL ORDER BY g.created_at DESC`
  ).bind(context.params.id).all();

  const galleries = (r.results || []).map((g: any) => ({
    id: g.id, name: g.name, slug: g.slug, photoCount: g.photo_count,
    coverUrl: g.cover_storage_key ? `/api/media/photos/${g.cover_storage_key}` : null,
    createdAt: g.created_at, updatedAt: g.updated_at,
  }));
  return json({ galleries });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const site = await getOwnedSite(context.env.DB!, context.params.id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const body = await context.request.json() as { name: string };
  if (!body.name?.trim()) return json({ error: "Gallery name required" }, 400);

  const galleryId = crypto.randomUUID();
  const slug = await uniqueGallerySlug(context.env.DB!, context.params.id, body.name.trim());
  const now = new Date().toISOString();
  await context.env.DB!.prepare(
    "INSERT INTO client_galleries (id, client_site_id, name, slug, created_at, updated_at) VALUES (?,?,?,?,?,?)"
  ).bind(galleryId, context.params.id, body.name.trim(), slug, now, now).run();

  return json({ id: galleryId, name: body.name.trim(), slug }, 201);
}
