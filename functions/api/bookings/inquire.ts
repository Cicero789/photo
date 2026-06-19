import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth"; import { logActivity } from "../../lib/activity";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const body = await context.request.json() as { photographerId?: string; message: string; eventTitle?: string; locationName?: string };
  if (!body.message?.trim()) return json({ error: "Message required" }, 400);

  const db = context.env.DB!;
  const id = crypto.randomUUID(); const now = new Date().toISOString();

  // If photographerId is provided, find the photographer user
  let photogUserId: string | null = null;
  if (body.photographerId) {
    const photog = await db.prepare("SELECT u.id FROM users u JOIN spaces s ON u.space_id = s.id JOIN photographers p ON p.email = u.email WHERE p.id = ?").bind(body.photographerId).first<{id:string}>();
    photogUserId = photog?.id || null;
    if (photogUserId) logActivity(db, photogUserId, "booking_inquiry", `Someone sent you a booking inquiry!${body.eventTitle ? ` for "${body.eventTitle}"` : ""}`, "/dashboard?tab=connections");
  }

  await db.prepare("INSERT INTO booking_inquiries (id, photographer_id, client_user_id, message, event_title, location_name, created_at) VALUES (?,?,?,?,?,?,?)").bind(id, body.photographerId || null, a.userId, body.message.trim().slice(0, 2000), body.eventTitle || "", body.locationName || "", now).run();

  return json({ success: true, id }, 201);
}
