/** Client site management — PUT + DELETE /api/clients/:id */
import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth";

async function getOwnedSite(db: D1Database, id: string, userId: string) {
  const site = await db.prepare("SELECT * FROM client_sites WHERE id = ? AND deleted_at IS NULL").bind(id).first() as any;
  if (!site) return { error: "Client site not found", status: 404 } as const;
  if (site.photographer_id !== userId) return { error: "Access denied", status: 403 } as const;
  return site;
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if ("error" in site) return json({ error: site.error }, site.status);

  let content: any = {};
  let galleryConfig: any = {};
  try { content = JSON.parse(site.content || "{}"); } catch {}
  try { galleryConfig = JSON.parse(site.gallery_config || "{}"); } catch {}

  return json({
    client: {
      id: site.id, name: site.name, slug: site.slug,
      industry: site.industry_id || "general",
      customDomain: site.custom_domain || null,
      status: site.published === 1 ? "published" : "draft",
      galleryConfig,
      bio: content.bio || "", services: content.services || "", pricing: content.pricing || "",
      blogCount: 0, galleryCount: 0,
    },
  });
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if ("error" in site) return json({ error: site.error }, site.status);

  const body = await context.request.json() as {
    name?: string; slug?: string; customDomain?: string; published?: boolean;
    content?: any; galleryConfig?: any; setupFeeCents?: number; monthlyFeeCents?: number;
  };
  const now = new Date().toISOString();
  const sets: string[] = ["updated_at = ?"];
  const vals: any[] = [now];

  if (body.name !== undefined) { sets.push("name = ?"); vals.push(body.name.trim()); }
  if (body.slug !== undefined) {
    if (!/^[a-z0-9-]+$/.test(body.slug)) return json({ error: "Invalid slug" }, 400);
    const existing = await context.env.DB!.prepare("SELECT id FROM client_sites WHERE slug = ? AND id != ? AND deleted_at IS NULL").bind(body.slug, id).first();
    if (existing) return json({ error: "Slug already taken" }, 409);
    sets.push("slug = ?"); vals.push(body.slug.toLowerCase());
  }
  if (body.customDomain !== undefined) { sets.push("custom_domain = ?"); vals.push(body.customDomain || null); }
  if (body.published !== undefined) { sets.push("published = ?"); vals.push(body.published ? 1 : 0); }
  if (body.content !== undefined) { sets.push("content = ?"); vals.push(JSON.stringify(body.content)); }
  if (body.galleryConfig !== undefined) { sets.push("gallery_config = ?"); vals.push(JSON.stringify(body.galleryConfig)); }
  if (body.setupFeeCents !== undefined) { sets.push("setup_fee_cents = ?"); vals.push(body.setupFeeCents); }
  if (body.monthlyFeeCents !== undefined) { sets.push("monthly_fee_cents = ?"); vals.push(body.monthlyFeeCents); }

  vals.push(id);
  await context.env.DB!.prepare(`UPDATE client_sites SET ${sets.join(", ")} WHERE id = ?`).bind(...vals).run();

  return json({ success: true, id });
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const { id } = context.params;
  const site = await getOwnedSite(context.env.DB!, id, a.userId);
  if ("error" in site) return json({ error: site.error }, site.status);

  const now = new Date().toISOString();
  // Soft-delete everything
  await context.env.DB!.prepare("UPDATE client_sites SET deleted_at = ? WHERE id = ?").bind(now, id).run();
  await context.env.DB!.prepare("UPDATE blog_posts SET deleted_at = ? WHERE client_site_id = ? AND deleted_at IS NULL").bind(now, id).run();
  await context.env.DB!.prepare("UPDATE client_galleries SET deleted_at = ? WHERE client_site_id = ? AND deleted_at IS NULL").bind(now, id).run();

  return json({ success: true });
}
