import { json } from "../lib/response"; import { requireAuth } from "../lib/auth";

// GET — list inspiration photos with filters
export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const category = url.searchParams.get("category") || "";
    const season = url.searchParams.get("season") || "";
    const sort = url.searchParams.get("sort") || "newest";

    let query = "SELECT i.*, u.name as user_name FROM inspiration i JOIN users u ON i.user_id = u.id WHERE 1=1";
    const params: string[] = [];
    if (category) { query += " AND i.category = ?"; params.push(category); }
    if (season) { query += " AND i.season = ?"; params.push(season); }
    query += sort === "loves" ? " ORDER BY i.loves DESC" : " ORDER BY i.created_at DESC";
    query += " LIMIT 100";

    const result = await context.env.DB!.prepare(query).bind(...params).all();
    const items = (result.results || []).map((r: any) => ({
      id: r.id, userId: r.user_id, userName: r.user_name, photoUrl: r.photo_url,
      address: r.address, latitude: r.latitude, longitude: r.longitude,
      category: r.category, season: r.season, loves: r.loves, createdAt: r.created_at,
    }));
    return json({ items });
  } catch (err: any) { return json({ error: err.message }, 500); }
}

// POST — submit a photo to the inspiration map
export async function onRequestPost(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const body = await context.request.json() as { photoUrl: string; address: string; latitude: number; longitude: number; category?: string; season?: string };
    if (!body.photoUrl || !body.address || typeof body.latitude !== "number" || typeof body.longitude !== "number") return json({ error: "photoUrl, address, latitude, longitude required" }, 400);

    const id = crypto.randomUUID();
    await context.env.DB!.prepare("INSERT INTO inspiration (id, user_id, photo_url, address, latitude, longitude, category, season, loves, created_at) VALUES (?,?,?,?,?,?,?,?,0,?)").bind(id, a.userId, body.photoUrl, body.address, body.latitude, body.longitude, body.category || "general", body.season || "", new Date().toISOString()).run();

    return json({ id, loves: 0 }, 201);
  } catch (err: any) { return json({ error: err.message }, 500); }
}
