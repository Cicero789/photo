/** Public blog post — GET /api/blog/:siteSlug/:postSlug */
import { json } from "../../../lib/response";

// Maps a blog_posts DB row → BlogPostDto (see ARCHITECTURE.md). Note: the live
// schema has no `excerpt`/`published_at` columns, so those fall back to ""/null.
function toBlogPostDto(row: any): any {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || "",
    content: row.body || "",                        // DB 'body' → DTO 'content'
    coverImageUrl: row.featured_image || null,      // DB 'featured_image' → DTO 'coverImageUrl'
    status: row.published === 1 ? "published" : "draft",
    publishedAt: row.published_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

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

  return json({ post: toBlogPostDto(post) });
}
