/** Gallery photo delete — DELETE /api/clients/:id/galleries/:gid/photos (body: { storageKey }) */
import { json } from "../../../../../../lib/response"; import { requireAuth } from "../../../../../../lib/auth";

export async function onRequestDelete(context: {
  request: Request; env: { DB?: D1Database; JWT_SECRET?: string };
  params: { id: string; gid: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const { id, gid } = context.params;
  const body = await context.request.json().catch(() => ({})) as { storageKey?: string };
  if (!body.storageKey) return json({ error: "storageKey required" }, 400);

  const row = await context.env.DB!.prepare(
    `SELECT cgp.storage_key FROM client_gallery_photos cgp
     JOIN client_galleries g ON g.id = cgp.gallery_id
     JOIN client_sites cs ON cs.id = g.client_site_id
     WHERE cgp.gallery_id = ? AND cgp.storage_key = ? AND cs.id = ? AND cs.photographer_id = ?
       AND cgp.deleted_at IS NULL AND g.deleted_at IS NULL AND cs.deleted_at IS NULL`
  ).bind(gid, body.storageKey, id, a.userId).first();

  if (!row) return json({ error: "Photo not found or access denied" }, 404);

  await context.env.DB!.prepare(
    "UPDATE client_gallery_photos SET deleted_at = ? WHERE gallery_id = ? AND storage_key = ?"
  ).bind(new Date().toISOString(), gid, body.storageKey).run();

  return json({ success: true });
}
