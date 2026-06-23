/** Public blog post — GET /api/blog/:siteSlug/:postSlug */
import { json } from "../../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { siteSlug: string; postSlug: string } }): Promise<Response> {
  const { siteSlug, postSlug } = context.params;
  if (!siteSlug || !postSlug) return json({ error: "Slugs required" }, 400);

  const db = context.env.DB!;
  const post = await db.prepare(
    `SELECT bp.*, cs.name as site_name, cs.slug as site_slug
     FROM blog_posts bp
     JOIN client_sites cs ON bp.client_site_id = cs.id
     WHERE cs.slug = ? AND bp.slug = ? AND bp.published = 1 AND bp.deleted_at IS NULL AND cs.published = 1 AND cs.deleted_at IS NULL`
  ).bind(siteSlug, postSlug).first() as any;

  if (!post) return json({ error: "Post not found" }, 404);

  return json({
    id: post.id,
    title: post.title,
    slug: post.slug,
    body: post.body,
    featuredImage: post.featured_image || "",
    siteName: post.site_name,
    siteSlug: post.site_slug,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  });
}
