/** Galleries for a client site — GET + POST /api/clients/:id/galleries */
import { json } from "../../../../lib/response"; import { requireAuth } from "../../../../lib/auth";

async function getOwnedSite(db: D1Database, id: string, userId: string) {
  const site = await db.prepare("SELECT id FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL").bind(id, userId).first();
  return site || null;
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const r = await context.env.DB!.prepare(
    `SELECT g.*, (SELECT COUNT(*) FROM client_gallery_photos WHERE gallery_id = g.id) as photo_count
     FROM client_galleries g WHERE g.client_site_id = ? AND g.deleted_at IS NULL ORDER BY g.created_at DESC`
  ).bind(id).all();

  const galleries = (r.results || []).map((g: any) => ({
    id: g.id, name: g.name, photoCount: g.photo_count,
    createdAt: g.created_at, updatedAt: g.updated_at,
  }));
  return json({ galleries });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const body = await context.request.json() as { name: string };
  if (!body.name?.trim()) return json({ error: "Gallery name required" }, 400);

  const galleryId = crypto.randomUUID();
  const now = new Date().toISOString();
  await context.env.DB!.prepare("INSERT INTO client_galleries (id, client_site_id, name, created_at, updated_at) VALUES (?,?,?,?,?)").bind(galleryId, id, body.name.trim(), now, now).run();

  return json({ id: galleryId, name: body.name.trim() }, 201);
}
