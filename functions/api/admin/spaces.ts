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
      `SELECT s.id, s.name, s.slug, s.custom_domain, s.logo_url, s.theme_color, s.owner_id, s.created_at, s.updated_at, s.hero_enabled, s.hero_source, s.hero_style,
              u.name as owner_name, u.email as owner_email,
        (SELECT COUNT(*) FROM events WHERE space_id = s.id AND deleted_at IS NULL) as event_count,
        (SELECT COUNT(*) FROM photos WHERE space_id = s.id AND deleted_at IS NULL) as photo_count
       FROM spaces s JOIN users u ON s.owner_id = u.id
       ORDER BY s.created_at DESC`
    ).all();

    return json({ spaces: r.results });
  } catch (err) {
    console.error("Admin list spaces error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner");
    if (rc) return rc;
    const db = context.env.DB!;

    const body = await context.request.json() as { spaceId: string; action: string };
    if (!body.spaceId) return json({ error: "Space ID is required" }, 400);
    if (body.action !== "reset") return json({ error: "Invalid action" }, 400);

    const now = new Date().toISOString();
    await db.batch([
      db.prepare("UPDATE events SET deleted_at = ? WHERE space_id = ? AND deleted_at IS NULL").bind(now, body.spaceId),
      db.prepare("UPDATE photos SET deleted_at = ? WHERE space_id = ? AND deleted_at IS NULL").bind(now, body.spaceId),
    ]);

    return json({ success: true });
  } catch (err) {
    console.error("Admin reset space error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
