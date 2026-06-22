import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth"; import { requireReadableEvent } from "../../lib/event-access";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { eventId: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const ev = await requireReadableEvent(context.env.DB!, context.params.eventId, a); if (ev instanceof Response) return ev;
  const msgs = await context.env.DB!.prepare("SELECT m.*, u.name as user_name FROM event_messages m JOIN users u ON m.user_id = u.id WHERE m.event_id = ? ORDER BY m.created_at ASC LIMIT 100").bind(context.params.eventId).all();
  return json({ messages: (msgs.results || []).map((m: any) => ({ id: m.id, userId: m.user_id, userName: m.user_name, message: m.message, createdAt: m.created_at })) });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database }; params: { eventId: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  if (a.role === 'viewer' && a.userId === 'viewer') return json({ error: "Gate viewers cannot post messages" }, 403);
  const ev = await requireReadableEvent(context.env.DB!, context.params.eventId, a); if (ev instanceof Response) return ev;
  const body = await context.request.json() as { message: string };
  if (!body.message?.trim()) return json({ error: "Message required" }, 400);
  const id = crypto.randomUUID(); const now = new Date().toISOString();
  await context.env.DB!.prepare("INSERT INTO event_messages (id, event_id, user_id, message, created_at) VALUES (?,?,?,?,?)").bind(id, context.params.eventId, a.userId, body.message.trim().slice(0, 2000), now).run();
  return json({ message: { id, userId: a.userId, message: body.message.trim(), createdAt: now } }, 201);
}
