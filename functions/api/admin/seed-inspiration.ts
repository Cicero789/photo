/** POST /api/admin/seed-inspiration — bulk import location/photo data (platform_owner only) */
import { json } from "../../lib/response"; import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const rc = requireRole(a, "platform_owner"); if (rc) return rc;
  const body = await context.request.json() as { items: Array<{lat:number;lng:number;title?:string;address?:string;source?:string;score?:number;author?:string;license_url?:string;thumbnail_url?:string;photo_url?:string;category?:string;season?:string;tips?:string}> };
  if (!body.items?.length) return json({ error: "items array required" }, 400);
  const db = context.env.DB!;
  let count = 0;
  for (const item of body.items) {
    if (typeof item.lat !== "number" || typeof item.lng !== "number") continue;
    const id = crypto.randomUUID();
    await db.prepare("INSERT INTO inspiration (id, user_id, photo_url, address, latitude, longitude, category, season, tips, source, score, author, license_url, thumbnail_url, loves, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)").bind(id, a.userId, item.photo_url || null, item.address || item.title || `${item.lat.toFixed(4)},${item.lng.toFixed(4)}`, item.lat, item.lng, item.category || "scenic", item.season || "", item.tips || "", item.source || "seed", item.score || 10, item.author || "", item.license_url || "", item.thumbnail_url || "", new Date().toISOString()).run();
    count++;
  }
  return json({ imported: count }, 201);
}
