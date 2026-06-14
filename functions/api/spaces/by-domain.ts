import { json } from "../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const domain = new URL(context.request.url).searchParams.get("domain");
  if (!domain) return json({ error: "Domain required" }, 400);
  const space = await context.env.DB!.prepare("SELECT slug FROM spaces WHERE custom_domain = ?").bind(domain).first<{slug:string}>();
  return json({ slug: space?.slug || null });
}
