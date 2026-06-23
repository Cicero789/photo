/** Blog posts for a client site — GET + POST /api/clients/:id/blog */
import { json } from "../../../../lib/response"; import { requireAuth } from "../../../../lib/auth";

async function getOwnedSite(db: D1Database, id: string, userId: string) {
  const site = await db.prepare("SELECT id FROM client_sites WHERE id = ? AND photographer_id = ? AND deleted_at IS NULL").bind(id, userId).first();
  if (!site) return null;
  return site;
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const r = await context.env.DB!.prepare(
    "SELECT id, title, slug, body, featured_image, published, created_at, updated_at FROM blog_posts WHERE client_site_id = ? AND deleted_at IS NULL ORDER BY created_at DESC"
  ).bind(id).all();

  const posts = (r.results || []).map((p: any) => ({
    id: p.id, title: p.title, slug: p.slug, body: p.body,
    featuredImage: p.featured_image || "", published: p.published === 1,
    createdAt: p.created_at, updatedAt: p.updated_at,
  }));
  return json({ posts });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if (!site) return json({ error: "Client site not found or access denied" }, 404);

  const body = await context.request.json() as { title: string; body?: string; slug?: string; featuredImage?: string };
  if (!body.title?.trim()) return json({ error: "Title required" }, 400);

  const db = context.env.DB!;
  // Auto-generate slug from title if not provided
  let slug = body.slug?.trim() || "";
  if (!slug) {
    slug = body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) slug = crypto.randomUUID().slice(0, 8);
  }
  if (!/^[a-z0-9-]+$/.test(slug)) return json({ error: "Invalid slug" }, 400);

  const existing = await db.prepare("SELECT id FROM blog_posts WHERE client_site_id = ? AND slug = ? AND deleted_at IS NULL").bind(id, slug).first();
  if (existing) return json({ error: "A post with this slug already exists" }, 409);

  const postId = crypto.randomUUID();
  const now = new Date().toISOString();
  await db.prepare("INSERT INTO blog_posts (id, client_site_id, title, slug, body, featured_image, published, created_at, updated_at) VALUES (?,?,?,?,?,?,0,?,?)").bind(postId, id, body.title.trim(), slug, body.body || "", body.featuredImage || null, now, now).run();

  return json({ id: postId, slug }, 201);
}
