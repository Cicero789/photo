import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const db = context.env.DB!;
  const r = await db.prepare("SELECT cs.*, (SELECT COUNT(*) FROM blog_posts WHERE client_site_id = cs.id) as blog_count, (SELECT COUNT(*) FROM client_galleries WHERE client_site_id = cs.id) as gallery_count FROM client_sites cs WHERE cs.photographer_id = ? AND cs.deleted_at IS NULL ORDER BY cs.updated_at DESC").bind(a.userId).all();
  const clients = (r.results || []).map((c: any) => ({
    id: c.id, name: c.name, slug: c.slug, industryId: c.industry_id,
    customDomain: c.custom_domain, published: c.published === 1,
    blogCount: c.blog_count, galleryCount: c.gallery_count,
    setupFeeCents: c.setup_fee_cents, monthlyFeeCents: c.monthly_fee_cents,
    createdAt: c.created_at, updatedAt: c.updated_at,
  }));
  return json({ clients });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const body = await context.request.json() as { name: string; slug: string; industryId?: string; customDomain?: string };
  if (!body.name || !body.slug) return json({ error: "Name and slug required" }, 400);
  if (!/^[a-z0-9-]+$/.test(body.slug)) return json({ error: "Invalid slug" }, 400);

  const db = context.env.DB!;
  const existing = await db.prepare("SELECT id FROM client_sites WHERE slug = ? AND deleted_at IS NULL").bind(body.slug).first();
  if (existing) return json({ error: "Slug already taken" }, 409);

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO client_sites (id, photographer_id, name, slug, industry_id, custom_domain, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?)").bind(id, a.userId, body.name.trim(), body.slug.toLowerCase(), body.industryId || null, body.customDomain || null, now, now).run();
  return json({ id, slug: body.slug }, 201);
}
