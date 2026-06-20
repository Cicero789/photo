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
      `SELECT u.*, s.name as space_name, s.slug as space_slug,
        (SELECT COUNT(*) FROM events WHERE space_id = u.space_id AND deleted_at IS NULL) as event_count,
        (SELECT COUNT(*) FROM photos WHERE space_id = u.space_id AND deleted_at IS NULL) as photo_count
       FROM users u LEFT JOIN spaces s ON u.space_id = s.id
       ORDER BY u.created_at DESC`
    ).all();

    return json({ users: r.results });
  } catch (err) {
    console.error("Admin list users error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const db = context.env.DB!;

    const body = await context.request.json() as { id: string; role?: string; email?: string; name?: string };
    if (!body.id) return json({ error: "User ID is required" }, 400);

    const parts: string[] = [];
    const values: (string | number | null)[] = [];
    if (body.role !== undefined) { parts.push("role = ?"); values.push(body.role); }
    if (body.email !== undefined) { parts.push("email = ?"); values.push(body.email); }
    if (body.name !== undefined) { parts.push("name = ?"); values.push(body.name); }

    if (parts.length === 0) return json({ error: "No fields to update" }, 400);

    values.push(body.id);
    await db.prepare(`UPDATE users SET ${parts.join(", ")} WHERE id = ?`).bind(...values).run();

    return json({ success: true });
  } catch (err) {
    console.error("Admin update user error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const db = context.env.DB!;

    const body = await context.request.json() as { id: string };
    if (!body.id) return json({ error: "User ID is required" }, 400);

    const now = new Date().toISOString();
    const user = await db.prepare("SELECT space_id FROM users WHERE id = ?").bind(body.id).first<{ space_id: string | null }>();
    if (!user) return json({ error: "User not found" }, 404);

    const stmts: D1PreparedStatement[] = [];

    if (user.space_id) {
      stmts.push(db.prepare("UPDATE photos SET deleted_at = ? WHERE space_id = ? AND deleted_at IS NULL").bind(now, user.space_id));
      stmts.push(db.prepare("UPDATE videos SET deleted_at = ? WHERE space_id = ? AND deleted_at IS NULL").bind(now, user.space_id));
      stmts.push(db.prepare("UPDATE events SET deleted_at = ? WHERE space_id = ? AND deleted_at IS NULL").bind(now, user.space_id));
      stmts.push(db.prepare("DELETE FROM space_members WHERE space_id = ?").bind(user.space_id));
    }
    stmts.push(db.prepare("DELETE FROM users WHERE id = ?").bind(body.id));

    await db.batch(stmts);

    return json({ success: true });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
