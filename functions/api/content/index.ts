/** GET /api/content?collection=sites|posts — list items scoped to the authenticated photographer */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const url = new URL(context.request.url);
  const collection = url.searchParams.get("collection") || "sites";

  try {
    // Get the photographer record for this user
    const photographer = await context.env.DB!.prepare(
      "SELECT id FROM photographers WHERE email = (SELECT email FROM users WHERE id = ?)"
    ).bind(a.userId).first<{ id: string }>();

    if (!photographer) {
      return json({ error: "No photographer profile found. Switch to Pro mode first." }, 403);
    }

    if (collection === "sites") {
      const rows = await context.env.DB!.prepare(
        "SELECT slug, name, gallery_config, published, updated_at FROM client_sites WHERE photographer_id = ? AND deleted_at IS NULL ORDER BY updated_at DESC"
      ).bind(photographer.id).all();
      const sites = (rows.results || []).map((r: any) => ({
        slug: r.slug, name: r.name, published: r.published === 1,
        template: (() => { try { return JSON.parse(r.gallery_config || "{}").template; } catch { return ""; } })(),
        updatedAt: r.updated_at,
      }));
      return json({ sites });
    }

    if (collection === "posts") {
      const rows = await context.env.DB!.prepare(
        "SELECT bp.slug, bp.title, cs.slug as site_slug, bp.updated_at FROM blog_posts bp JOIN client_sites cs ON bp.client_site_id = cs.id WHERE cs.photographer_id = ? AND bp.deleted_at IS NULL AND cs.deleted_at IS NULL ORDER BY bp.updated_at DESC"
      ).bind(photographer.id).all();
      const posts = (rows.results || []).map((r: any) => ({
        slug: r.slug, title: r.title, siteSlug: r.site_slug,
        publishedAt: r.updated_at,
      }));
      return json({ posts });
    }

    return json({ error: "Invalid collection" }, 400);
  } catch (err) {
    return json({ error: "Failed to load" }, 500);
  }
}
