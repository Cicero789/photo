/** Client page API — GET/PUT builder pages /api/clients/:id/pages/:slug */
import { json } from "../../../../lib/response";
import { requireAuth } from "../../../../lib/auth";

export async function onRequestGet(context: {
  request: Request; env: { DB?: D1Database };
  params: { id: string; slug: string };
}): Promise<Response> {
  const { id, slug } = context.params;
  const page = await context.env.DB!.prepare(
    "SELECT id, slug, title, builder_json, css, published_html, status, updated_at FROM client_pages WHERE client_site_id = ? AND slug = ?"
  ).bind(id, slug).first();

  if (!page) return json({ page: null });
  return json({ page: { ...(page as any), builderJson: (page as any).builder_json } });
}

export async function onRequestPut(context: {
  request: Request; env: { DB?: D1Database; JWT_SECRET?: string };
  params: { id: string; slug: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const { id, slug } = context.params;
  const body = await context.request.json() as { builderJson?: string; html?: string; css?: string; title?: string; status?: string };
  const now = new Date().toISOString();

  // Verify ownership
  const site = await context.env.DB!.prepare(
    "SELECT id FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL"
  ).bind(id, a.userId).first();

  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  // Upsert
  const existing = await context.env.DB!.prepare(
    "SELECT id FROM client_pages WHERE client_site_id = ? AND slug = ?"
  ).bind(id, slug).first();

  if (existing) {
    await context.env.DB!.prepare(
      "UPDATE client_pages SET builder_json = ?, published_html = ?, css = ?, title = ?, status = ?, updated_at = ? WHERE client_site_id = ? AND slug = ?"
    ).bind(body.builderJson || null, body.html || null, body.css || null, body.title || slug, body.status || "draft", now, id, slug).run();
  } else {
    await context.env.DB!.prepare(
      "INSERT INTO client_pages (id, client_site_id, slug, title, builder_json, published_html, css, status, updated_at) VALUES (?,?,?,?,?,?,?,?,?)"
    ).bind(crypto.randomUUID(), id, slug, body.title || slug, body.builderJson || null, body.html || null, body.css || null, body.status || "draft", now).run();
  }

  return json({ success: true, slug, updatedAt: now });
}
