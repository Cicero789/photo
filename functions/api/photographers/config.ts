import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const db = context.env.DB!;
  const photog = await db.prepare("SELECT slug, tagline, specialties, stripe_config, pricing_config, gallery_config, hero_photos FROM photographers WHERE email = (SELECT email FROM users WHERE id = ?)").bind(a.userId).first<Record<string,string>>();
  if (!photog) return json({ pricing: "{}", stripe: "{}", design: "{}", hero: "[]", slug: "", tagline: "", specialties: "" });
  return json({ pricing: photog.pricing_config, stripe: photog.stripe_config, design: photog.gallery_config, hero: photog.hero_photos, slug: photog.slug || "", tagline: photog.tagline || "", specialties: photog.specialties || "" });
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const body = await context.request.json() as { pricing?: string; stripeAccount?: string; design?: string; slug?: string; tagline?: string; specialties?: string };
  const db = context.env.DB!;
  const photog = await db.prepare("SELECT id FROM photographers WHERE email = (SELECT email FROM users WHERE id = ?)").bind(a.userId).first<{id:string}>();
  if (!photog) return json({ error: "Not a photographer" }, 404);
  const parts: string[] = []; const vals: any[] = [];
  if (body.pricing !== undefined) { parts.push("pricing_config = ?"); vals.push(body.pricing); }
  if (body.stripeAccount !== undefined) { parts.push("stripe_config = ?"); vals.push(JSON.stringify({ stripeAccount: body.stripeAccount })); }
  if (body.design !== undefined) { parts.push("gallery_config = ?"); vals.push(body.design); }
  if (body.slug !== undefined) { parts.push("slug = ?"); vals.push(body.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 60)); }
  if (body.tagline !== undefined) { parts.push("tagline = ?"); vals.push(body.tagline.slice(0, 200)); }
  if (body.specialties !== undefined) { parts.push("specialties = ?"); vals.push(body.specialties.slice(0, 500)); }
  if (parts.length > 0) { vals.push(photog.id); await db.prepare(`UPDATE photographers SET ${parts.join(",")} WHERE id = ?`).bind(...vals).run(); }
  return json({ success: true });
}
