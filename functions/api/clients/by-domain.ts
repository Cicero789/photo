/** GET /api/clients/by-domain?domain= — resolve client site by custom domain */
import { json } from "../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const domain = new URL(context.request.url).searchParams.get("domain")?.toLowerCase();
  if (!domain) return json({ error: "Domain required" }, 400);

  const site = await context.env.DB!.prepare(
    "SELECT slug FROM client_sites WHERE lower(custom_domain) = ? AND published = 1 AND deleted_at IS NULL"
  ).bind(domain).first<{ slug: string }>();

  if (!site) return json({ slug: null });
  return json({ slug: site.slug, type: "client" });
}
