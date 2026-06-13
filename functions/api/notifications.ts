import { json } from "../lib/response"; import { requireAuth } from "../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const db = context.env.DB!;
  const items = await db.prepare("SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 30").bind(a.userId).all();
  const unread = await db.prepare("SELECT COUNT(*) as c FROM activity_log WHERE user_id = ? AND read = 0").bind(a.userId).first<{c:number}>();
  return json({ items: (items.results || []).map((r: any) => ({ id: r.id, type: r.type, message: r.message, link: r.link, read: r.read === 1, createdAt: r.created_at })), unread: unread?.c || 0 });
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  await context.env.DB!.prepare("UPDATE activity_log SET read = 1 WHERE user_id = ?").bind(a.userId).run();
  return json({ success: true });
}
