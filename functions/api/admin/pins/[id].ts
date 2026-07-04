import { json } from "../../../lib/response";
import { requireAuth, requireRole } from "../../../lib/auth";

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string }; params: { id: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner"); if (rc) return rc;
    const body = await context.request.json() as { address?: string; lat?: number; lng?: number; score?: number };
    const parts: string[] = []; const vals: any[] = [];
    if (body.address !== undefined) { parts.push("address = ?"); vals.push(body.address); }
    if (typeof body.lat === "number") { parts.push("latitude = ?"); vals.push(body.lat); }
    if (typeof body.lng === "number") { parts.push("longitude = ?"); vals.push(body.lng); }
    if (typeof body.score === "number") { parts.push("score = ?"); vals.push(body.score); }
    if (parts.length === 0) return json({ error: "No fields" }, 400);
    vals.push(context.params.id);
    await context.env.DB!.prepare(`UPDATE inspiration SET ${parts.join(", ")} WHERE id = ?`).bind(...vals).run();
    return json({ success: true });
  } catch (err) { console.error("Admin update pin error:", err); return json({ error: "Failed" }, 500); }
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string }; params: { id: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner"); if (rc) return rc;
    await context.env.DB!.prepare("DELETE FROM inspiration_loves WHERE inspiration_id = ?").bind(context.params.id).run();
    await context.env.DB!.prepare("DELETE FROM inspiration WHERE id = ?").bind(context.params.id).run();
    return json({ success: true });
  } catch (err) { console.error("Admin delete pin error:", err); return json({ error: "Failed" }, 500); }
}
