import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return json({ success: true }); // already invalid
  if (a.userId !== "viewer" && context.env.DB) {
    try {
      await context.env.DB.prepare("UPDATE users SET token_version = token_version + 1 WHERE id = ?").bind(a.userId).run();
    } catch (err) { console.error("logout revoke failed:", err); }
  }
  return json({ success: true });
}
