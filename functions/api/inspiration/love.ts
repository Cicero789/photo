import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database }; params: { id: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
  const db = context.env.DB!;
  const existing = await db.prepare("SELECT * FROM inspiration_loves WHERE inspiration_id = ? AND user_id = ?").bind(context.params.id, a.userId).first();
  if (existing) {
    await db.prepare("DELETE FROM inspiration_loves WHERE inspiration_id = ? AND user_id = ?").bind(context.params.id, a.userId).run();
    await db.prepare("UPDATE inspiration SET loves = MAX(0, loves - 1) WHERE id = ?").bind(context.params.id).run();
    return json({ loved: false });
  } else {
    await db.prepare("INSERT INTO inspiration_loves (inspiration_id, user_id) VALUES (?,?)").bind(context.params.id, a.userId).run();
    await db.prepare("UPDATE inspiration SET loves = loves + 1 WHERE id = ?").bind(context.params.id).run();
    return json({ loved: true });
  }
}
