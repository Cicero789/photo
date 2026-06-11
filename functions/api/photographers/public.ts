import { json } from "../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try { const r = await context.env.DB!.prepare("SELECT id, name, website, portfolio_url, service_area, bio FROM photographers WHERE status = 'approved' ORDER BY created_at DESC").all(); const photographers = (r.results ?? []).map((p: Record<string,unknown>) => ({ id: p.id, name: p.name, website: p.website ?? null, portfolioUrl: p.portfolio_url ?? null, serviceArea: p.service_area ?? null, bio: p.bio ?? null })); return json({ photographers }); } catch (err) { console.error("Public photographers error:", err); return json({ photographers: [] }); }
}
