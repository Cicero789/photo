import { getSpaceBySlug } from "../../lib/db"; import { json } from "../../lib/response"; import { hashPassword } from "../../lib/password"; import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { slug: string } }): Promise<Response> {
  try {
    const space = await getSpaceBySlug(context.env, context.params.slug) as Record<string,unknown> | null; if (!space) return json({ error: "Space not found" }, 404);
    return json({ space: { id: space.id, name: space.name, slug: space.slug, customDomain: space.custom_domain, logoUrl: space.logo_url, themeColor: space.theme_color, hero_source: (space as any).hero_source || "off", hero_style: (space as any).hero_style || "banner", createdAt: space.created_at } });
  } catch (err) { console.error("Get space error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { slug: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const space = await getSpaceBySlug(context.env, context.params.slug) as Record<string,unknown> | null; if (!space) return json({ error: "Space not found" }, 404);
    if (space.owner_id !== authResult.userId && authResult.role !== "platform_owner") return json({ error: "You don't have permission to edit this space" }, 403);
    const body = await context.request.json() as { name?: string; gateKey?: string; themeColor?: string; customDomain?: string; heroSource?: string; heroStyle?: string };
    const db = context.env.DB!; const updates: string[] = []; const values: (string|null)[] = [];
    if (body.name) { updates.push("name = ?"); values.push(body.name); }
    if (body.gateKey) { updates.push("password_hash = ?"); values.push(await hashPassword(body.gateKey)); }
    if (body.themeColor) { updates.push("theme_color = ?"); values.push(body.themeColor); }
    if (body.customDomain !== undefined) { updates.push("custom_domain = ?"); values.push(body.customDomain || null); }
    if (body.heroSource !== undefined) { updates.push("hero_source = ?"); values.push(body.heroSource); }
    if (body.heroStyle !== undefined) { updates.push("hero_style = ?"); values.push(body.heroStyle); }
    if (updates.length > 0) { updates.push("updated_at = ?"); values.push(new Date().toISOString()); values.push(context.params.slug); await db.prepare(`UPDATE spaces SET ${updates.join(", ")} WHERE slug = ?`).bind(...(values as [string])).run(); }
    const updated = await getSpaceBySlug(context.env, context.params.slug) as Record<string,unknown>;
    return json({ space: { id: updated!.id, name: updated!.name, slug: updated!.slug, customDomain: updated!.custom_domain, logoUrl: updated!.logo_url, themeColor: updated!.theme_color, hero_source: (updated as any).hero_source || "off", hero_style: (updated as any).hero_style || "banner" } });
  } catch (err) { console.error("Update space error:", err); return json({ error: "Something went wrong" }, 500); }
}
