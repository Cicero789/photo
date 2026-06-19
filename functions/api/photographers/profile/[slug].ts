/** Public photographer profile — GET /api/photographers/profile/:slug */
import { json } from "../../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { slug: string } }): Promise<Response> {
  const { slug } = context.params;
  if (!slug) return json({ error: "Slug required" }, 400);

  const photographer = await context.env.DB!.prepare(
    "SELECT id, name, slug, tagline, specialties, bio, website, portfolio_url, service_area, pricing_config, hero_photos, status FROM photographers WHERE slug = ? AND status = 'approved'"
  ).bind(slug).first() as any;
  if (!photographer) return json({ error: "Photographer not found" }, 404);

  // Get portfolio photos
  const portfolio = await context.env.DB!.prepare(
    "SELECT id, storage_key, filename, sort_order FROM photographer_portfolio WHERE photographer_id = ? ORDER BY sort_order, created_at"
  ).bind(photographer.id).all();

  // Parse JSON configs
  let pricing = {};
  let heroPhotos: string[] = [];
  try { pricing = JSON.parse(photographer.pricing_config || "{}"); } catch {}
  try { heroPhotos = JSON.parse(photographer.hero_photos || "[]"); } catch {}

  return json({
    name: photographer.name,
    slug: photographer.slug,
    tagline: photographer.tagline || "",
    specialties: photographer.specialties ? photographer.specialties.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
    bio: photographer.bio || "",
    website: photographer.website || "",
    portfolioUrl: photographer.portfolio_url || "",
    serviceArea: photographer.service_area || "",
    pricing,
    heroPhotos,
    portfolio: (portfolio.results || []).map((p: any) => ({
      id: p.id,
      url: `/api/media/photos/${p.storage_key}`,
      filename: p.filename || "",
    })),
  });
}
