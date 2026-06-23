/** Blog post management — PUT + DELETE /api/clients/:id/blog/:postId */
import { json } from "../../../../lib/response"; import { requireAuth } from "../../../../lib/auth";

async function getOwnedPost(db: D1Database, clientSiteId: string, postId: string, userId: string) {
  const post = await db.prepare(
    "SELECT bp.* FROM blog_posts bp JOIN client_sites cs ON bp.client_site_id = cs.id WHERE bp.id = ? AND cs.id = ? AND cs.photographer_id = ? AND bp.deleted_at IS NULL AND cs.deleted_at IS NULL"
  ).bind(postId, clientSiteId, userId).first() as any;
  if (!post) return null;
  return post;
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; postId: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, postId } = context.params;
  const post = await getOwnedPost(context.env.DB!, id, postId, a.userId);
  if (!post) return json({ error: "Post not found or access denied" }, 404);

  const body = await context.request.json() as { title?: string; body?: string; slug?: string; featuredImage?: string; published?: boolean };
  const now = new Date().toISOString();
  const sets: string[] = ["updated_at = ?"];
  const vals: any[] = [now];

  if (body.title !== undefined) { sets.push("title = ?"); vals.push(body.title.trim()); }
  if (body.body !== undefined) { sets.push("body = ?"); vals.push(body.body); }
  if (body.featuredImage !== undefined) { sets.push("featured_image = ?"); vals.push(body.featuredImage || null); }
  if (body.published !== undefined) { sets.push("published = ?"); vals.push(body.published ? 1 : 0); }
  if (body.slug !== undefined) {
    if (!/^[a-z0-9-]+$/.test(body.slug)) return json({ error: "Invalid slug" }, 400);
    const existing = await context.env.DB!.prepare("SELECT id FROM blog_posts WHERE client_site_id = ? AND slug = ? AND id != ? AND deleted_at IS NULL").bind(id, body.slug, postId).first();
    if (existing) return json({ error: "Slug already taken" }, 409);
    sets.push("slug = ?"); vals.push(body.slug.toLowerCase());
  }

  vals.push(postId);
  await context.env.DB!.prepare(`UPDATE blog_posts SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();

  return json({ success: true, id: postId });
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string; postId: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id, postId } = context.params;
  const post = await getOwnedPost(context.env.DB!, id, postId, a.userId);
  if (!post) return json({ error: "Post not found or access denied" }, 404);

  await context.env.DB!.prepare("UPDATE blog_posts SET deleted_at = ? WHERE id = ?").bind(new Date().toISOString(), postId).run();

  return json({ success: true });
}
