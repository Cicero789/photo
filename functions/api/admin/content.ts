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
    const url = new URL(context.request.url);
    const type = url.searchParams.get("type");
    const status = url.searchParams.get("status");

    if (type === "photos" && status === "deleted") {
      const r = await db.prepare(
        `SELECT p.*, s.name as space_name, u.name as owner_name
         FROM photos p
         LEFT JOIN spaces s ON p.space_id = s.id
         LEFT JOIN users u ON s.owner_id = u.id
         WHERE p.deleted_at IS NOT NULL
         ORDER BY p.deleted_at DESC`
      ).all();
      return json({ photos: r.results });
    }

    if (type === "albums") {
      const r = await db.prepare(
        `SELECT a.*, s.name as space_name, u.name as owner_name, u.email as owner_email
         FROM albums a
         LEFT JOIN spaces s ON a.space_id = s.id
         LEFT JOIN users u ON s.owner_id = u.id
         WHERE a.deleted_at IS NULL
         ORDER BY a.created_at DESC`
      ).all();
      return json({ albums: r.results });
    }

    return json({ error: "Invalid type parameter. Use ?type=photos&status=deleted or ?type=albums" }, 400);
  } catch (err) {
    console.error("Admin list content error:", err);
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

    const body = await context.request.json() as { type: string; id: string; action?: string; expiresAt?: string };
    if (!body.id) return json({ error: "ID is required" }, 400);

    if (body.type === "photo" && body.action === "restore") {
      await db.prepare("UPDATE photos SET deleted_at = NULL WHERE id = ?").bind(body.id).run();
      return json({ success: true });
    }

    if (body.type === "album" && body.expiresAt) {
      await db.prepare("UPDATE albums SET expires_at = ? WHERE id = ?").bind(body.expiresAt, body.id).run();
      return json({ success: true });
    }

    return json({ error: "Invalid request. Use type=photo with action=restore, or type=album with expiresAt" }, 400);
  } catch (err) {
    console.error("Admin update content error:", err);
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

    const body = await context.request.json() as { type: string; id: string };
    if (!body.id) return json({ error: "ID is required" }, 400);

    if (body.type === "photo") {
      await db.prepare("DELETE FROM photos WHERE id = ?").bind(body.id).run();
      return json({ success: true });
    }

    if (body.type === "album") {
      await db.prepare("DELETE FROM albums WHERE id = ?").bind(body.id).run();
      return json({ success: true });
    }

    return json({ error: "Invalid type. Use photo or album" }, 400);
  } catch (err) {
    console.error("Admin purge content error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
