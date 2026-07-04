import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database }; params: { id: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    if (a.role === "viewer" && a.userId === "viewer") return json({ error: "Sign in to interact" }, 403);
    const inspirationId = context.params.id;
    if (!inspirationId) return json({ error: "ID required" }, 400);
    const db = context.env.DB!;
    const existing = await db.prepare("SELECT inspiration_id FROM inspiration_loves WHERE inspiration_id = ? AND user_id = ?").bind(inspirationId, a.userId).first();
    if (existing) {
      await db.prepare("DELETE FROM inspiration_loves WHERE inspiration_id = ? AND user_id = ?").bind(inspirationId, a.userId).run();
      await db.prepare("UPDATE inspiration SET loves = MAX(0, loves - 1) WHERE id = ?").bind(inspirationId).run();
      return json({ loved: false });
    } else {
      await db.prepare("INSERT INTO inspiration_loves (inspiration_id, user_id) VALUES (?, ?)").bind(inspirationId, a.userId).run();
      await db.prepare("UPDATE inspiration SET loves = loves + 1 WHERE id = ?").bind(inspirationId).run();
      return json({ loved: true });
    }
  } catch (err) { return json({ error: "Failed" }, 500); }
}
