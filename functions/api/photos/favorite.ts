/**
 * PUT /api/photos/favorite — toggle favorite status
 * Body: { photoId: string }
 */

import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const body = await context.request.json() as { photoId: string };
    if (!body.photoId) return json({ error: "photoId required" }, 400);

    const db = context.env.DB!;
    const photo = await db.prepare("SELECT id, favorite FROM photos WHERE id = ? AND space_id = ?").bind(body.photoId, a.spaceId).first<{id:string;favorite:number}>();
    if (!photo) return json({ error: "Photo not found" }, 404);

    const newVal = photo.favorite ? 0 : 1;
    await db.prepare("UPDATE photos SET favorite = ? WHERE id = ?").bind(newVal, body.photoId).run();
    return json({ favorite: newVal === 1 });
  } catch (err) { console.error("Favorite error:", err); return json({ error: "Something went wrong" }, 500); }
}
