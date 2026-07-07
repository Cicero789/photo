import { json } from '../../lib/response.js';
import { isAppError } from '@framenest/shared';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const result = await context.env.DB.prepare("SELECT id, name, slug, tagline, specialties, bio, service_area, website, verified, featured, hero_photos, pricing_config, template_config, profile_views FROM professionals WHERE status = 'approved' ORDER BY verified DESC, featured DESC, created_at DESC LIMIT 50").all();
    const items = (result.results || []).map((r: any) => ({
      id: r.id, name: r.name, slug: r.slug, tagline: r.tagline,
      specialties: safeJson(r.specialties), bio: r.bio,
      serviceArea: r.service_area, website: r.website,
      verified: r.verified === 1, featured: r.featured === 1,
      heroPhotos: safeJson(r.hero_photos), pricingConfig: safeJson(r.pricing_config),
      templateConfig: safeJson(r.template_config), profileViews: r.profile_views,
    }));
    return json({ items });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}

function safeJson(v: string): any { try { return JSON.parse(v); } catch { return v; } }
