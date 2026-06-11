import { json } from "../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const db = context.env.DB!;
    const result = await db.prepare("SELECT * FROM ad_tiles WHERE active = 1 ORDER BY position ASC").all();
    const ads = (result.results ?? []).map((a: Record<string, unknown>) => ({ id: a.id, imageUrl: a.image_url ?? null, linkUrl: a.link_url ?? null, message: a.message ?? null, position: a.position, active: a.active === 1, createdAt: a.created_at }));
    return json({ ads });
  } catch (err) { console.error("List ads error:", err); return json({ error: "Something went wrong" }, 500); }
}
