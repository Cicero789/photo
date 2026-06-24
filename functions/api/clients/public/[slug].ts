/** Public client site page — GET /api/clients/public/:slug */
import { json } from "../../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { slug: string } }): Promise<Response> {
  const { slug } = context.params;
  if (!slug) return json({ error: "Slug required" }, 400);

  const db = context.env.DB!;
  const site = await db.prepare(
    "SELECT * FROM client_sites WHERE slug = ? AND published = 1 AND deleted_at IS NULL"
  ).bind(slug).first() as any;

  if (!site) return json({ error: "Client site not found" }, 404);

  const blogsQuery = await db.prepare(
    "SELECT id, title, slug, body, featured_image, published, created_at FROM blog_posts WHERE client_site_id = ? AND published = 1 ORDER BY created_at DESC"
  ).bind(site.id).all();

  const galleriesQuery = await db.prepare(
    "SELECT g.id, g.name, g.created_at, (SELECT COUNT(*) FROM client_gallery_photos WHERE gallery_id = g.id) as photo_count FROM client_galleries g WHERE g.client_site_id = ? ORDER BY g.created_at DESC"
  ).bind(site.id).all();

  // Parse JSON configs safely
  let content: any = {};
  let galleryConfig: any = {};
  try { content = JSON.parse(site.content || "{}"); } catch {}
  try { galleryConfig = JSON.parse(site.gallery_config || "{}"); } catch {}

  return json({
    id: site.id,
    name: site.name,
    slug: site.slug,
    industryId: site.industry_id || "",
    customDomain: site.custom_domain || "",
    published: site.published === 1,
    content,
    galleryConfig,
    setupFeeCents: site.setup_fee_cents,
    monthlyFeeCents: site.monthly_fee_cents,
    createdAt: site.created_at,
    updatedAt: site.updated_at,
    blogs: (blogsQuery.results || []).map((b: any) => ({
      id: b.id,
      title: b.title,
      slug: b.slug,
      body: b.body,
      featuredImage: b.featured_image || "",
      published: b.published === 1,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    })),
    galleries: (galleriesQuery.results || []).map((g: any) => ({
      id: g.id,
      name: g.name,
      photoCount: g.photo_count,
      createdAt: g.created_at,
      updatedAt: g.updated_at,
    })),
  });
}
