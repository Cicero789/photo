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
      `SELECT u.id, u.email, u.name, u.role, u.account_type, u.created_at, u.space_id,
        s.name as space_name, s.slug as space_slug,
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
    const targetId = body.id;
    if (!targetId) return json({ error: "User ID is required" }, 400);

    const user = await db.prepare("SELECT id, role, space_id FROM users WHERE id = ?").bind(targetId).first<{ id: string; role: string; space_id: string | null }>();
    if (!user) return json({ error: "User not found" }, 404);

    if (user.role === "platform_owner") return json({ error: "Cannot delete platform owner" }, 400);

    // Only remove the user's membership, NOT the space content
    await db.prepare("DELETE FROM space_members WHERE user_id = ?").bind(targetId).run();
    // Delete the user record (but NOT their space's content)
    await db.prepare("DELETE FROM users WHERE id = ?").bind(targetId).run();

    return json({ success: true });
  } catch (err) {
    console.error("Admin delete user error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
