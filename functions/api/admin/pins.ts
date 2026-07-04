import { json } from "../../lib/response";
import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const r = await context.env.DB!.prepare("SELECT id, address, latitude, longitude, source, score, loves FROM inspiration ORDER BY score DESC, loves DESC, created_at DESC LIMIT 500").all();
    const pins = (r.results ?? []).map((p: any) => ({
      id: p.id, address: p.address, lat: p.latitude, lng: p.longitude,
      source: p.source || "framenest", score: p.score || 0, loves: p.loves || 0,
    }));
    return json({ pins });
  } catch (err) { console.error("Admin pins:", err); return json({ error: "Failed" }, 500); }
}
