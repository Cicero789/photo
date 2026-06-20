import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const db = context.env.DB!;

  // Find photographer by user email
  const user = await db.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);
  const photographer = await db.prepare("SELECT id, profile_views, verified FROM photographers WHERE email = ? AND status = 'approved'").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Not a photographer" }, 403);

  // Aggregate stats
  const [inquiries, orders, albums, pins]: any[] = await db.batch([
    db.prepare("SELECT COUNT(*) as total FROM booking_inquiries WHERE photographer_id = ?").bind(photographer.id),
    db.prepare("SELECT COUNT(*) as total, COALESCE(SUM(CASE WHEN status='paid' THEN amount_cents ELSE 0 END),0) as revenue FROM orders WHERE photographer_id = ?").bind(photographer.id),
    db.prepare("SELECT COUNT(*) as total, COALESCE(SUM(view_count),0) as views FROM albums WHERE user_id = ? AND deleted_at IS NULL").bind(a.userId),
    db.prepare("SELECT COUNT(*) as total, COALESCE(SUM(loves),0) as loves FROM inspiration WHERE user_id = ? AND source = 'framenest'").bind(a.userId),
  ]);

  return json({
    profileViews: photographer.profile_views || 0,
    verified: photographer.verified === 1,
    inquiries: inquiries.results[0].total || 0,
    orders: orders.results[0].total || 0,
    revenueCents: orders.results[0].revenue || 0,
    albums: albums.results[0].total || 0,
    albumViews: albums.results[0].views || 0,
    mapPins: pins.results[0].total || 0,
    mapLoves: pins.results[0].loves || 0,
  });
}
