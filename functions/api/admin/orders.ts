import { json } from "../../lib/response";
import { requireAuth, requireRole } from "../../lib/auth";

interface Env { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; [key: string]: unknown }

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const db = context.env.DB!;

    const r = await db.prepare(
      `SELECT o.*, u.name as buyer_name, u.email as buyer_email, p.name as photographer_name
       FROM orders o
       JOIN users u ON o.buyer_user_id = u.id
       JOIN photographers p ON o.photographer_id = p.id
       ORDER BY o.created_at DESC`
    ).all();

    return json({ orders: r.results });
  } catch (err) {
    console.error("Admin list orders error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
