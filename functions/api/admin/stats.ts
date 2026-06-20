import { json } from "../../lib/response";
import { requireAuth, requireRole } from "../../lib/auth";

interface Env { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; [key: string]: unknown }
interface Row { [key: string]: unknown; c: number; bytes?: number; pending?: number; verified?: number; revenue?: number }

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const db = context.env.DB!;

    const [users, spaces, events, photos, videos, albums, photographers, orders, pins, inquiries] = await db.batch([
      db.prepare("SELECT COUNT(*) as c FROM users"),
      db.prepare("SELECT COUNT(*) as c FROM spaces"),
      db.prepare("SELECT COUNT(*) as c FROM events WHERE deleted_at IS NULL"),
      db.prepare("SELECT COUNT(*) as c, COALESCE(SUM(file_size),0) as bytes FROM photos WHERE deleted_at IS NULL"),
      db.prepare("SELECT COUNT(*) as c FROM videos WHERE deleted_at IS NULL"),
      db.prepare("SELECT COUNT(*) as c FROM albums WHERE deleted_at IS NULL"),
      db.prepare("SELECT COUNT(*) as c, SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending, SUM(CASE WHEN verified=1 THEN 1 ELSE 0 END) as verified FROM photographers"),
      db.prepare("SELECT COUNT(*) as c, COALESCE(SUM(CASE WHEN status='paid' THEN amount_cents ELSE 0 END),0) as revenue FROM orders"),
      db.prepare("SELECT COUNT(*) as c FROM inspiration"),
      db.prepare("SELECT COUNT(*) as c FROM booking_inquiries"),
    ]);

    const u = users.results[0] as Row, sp = spaces.results[0] as Row, ev = events.results[0] as Row;
    const ph = photos.results[0] as Row, vi = videos.results[0] as Row, al = albums.results[0] as Row;
    const pg = photographers.results[0] as Row, od = orders.results[0] as Row;
    const pi = pins.results[0] as Row, iq = inquiries.results[0] as Row;

    return json({
      users: u.c,
      spaces: sp.c,
      events: ev.c,
      photos: ph.c,
      photosBytes: ph.bytes,
      videos: vi.c,
      albums: al.c,
      photographers: pg.c,
      photographersPending: pg.pending || 0,
      photographersVerified: pg.verified || 0,
      orders: od.c,
      revenueCents: od.revenue,
      pins: pi.c,
      inquiries: iq.c,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
