import { json } from "../lib/response"; import { requireAuth } from "../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const db = context.env.DB!;

    // Get accepted connections
    const conns = await db.prepare(
      `SELECT c.*, u.name as from_name, u2.name as to_name, s.slug as space_slug
       FROM connections c JOIN users u ON c.from_user = u.id
       LEFT JOIN users u2 ON c.to_user = u2.id
       JOIN spaces s ON u.space_id = s.id
       WHERE (c.from_user = ? OR c.to_user = ?) AND c.status = 'accepted'`
    ).bind(a.userId, a.userId).all();

    if (!conns.results?.length) return json({ feed: [] });

    // Get events from connected users' spaces
    const connectedUserIds = (conns.results as any[]).map((c: any) => c.from_user === a.userId ? c.to_user : c.from_user).filter(Boolean);
    if (connectedUserIds.length === 0) return json({ feed: [] });
    const placeholders = connectedUserIds.map(() => "?").join(",");

    const events = await db.prepare(
      `SELECT e.*, u.name as owner_name, s.slug as space_slug, u.id as owner_id,
        (SELECT COUNT(*) FROM photos WHERE event_id = e.id) as photo_count,
        (SELECT storage_key FROM photos WHERE event_id = e.id LIMIT 1) as cover_key,
        (SELECT COUNT(*) FROM photos WHERE event_id = e.id AND favorite = 1) as fav_count
       FROM events e JOIN users u ON e.space_id = u.space_id
       JOIN spaces s ON e.space_id = s.id
       WHERE u.id IN (${placeholders}) AND e.visibility = 'public'
       ORDER BY e.event_date DESC LIMIT 50`
    ).bind(...connectedUserIds).all();

    // Map connection types
    const connMap = new Map<string, string>();
    (conns.results as any[]).forEach((c: any) => {
      const otherId = c.from_user === a.userId ? c.to_user : c.from_user;
      if (otherId) connMap.set(otherId, c.connection_type);
    });

    const feed = (events.results as any[] || []).map((e: any) => ({
      id: e.id, title: e.title, category: e.category, eventDate: e.event_date,
      coverPhotoUrl: e.cover_key ? `/api/media/photos/${e.cover_key}` : null,
      photoCount: e.photo_count || 0, fromName: e.owner_name, spaceSlug: e.space_slug,
      connectionType: connMap.get(e.owner_id) || "friend",
      favoriteCount: e.fav_count || 0,
    }));

    return json({ feed });
  } catch (err) { console.error("Feed error:", err); return json({ error: "Failed" }, 500); }
}
