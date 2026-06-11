import { json } from "../../lib/response"; import { requireAuth, requireRole } from "../../lib/auth"; import { generateSummary } from "../../lib/deepseek";

function getDeepSeekKey(env?: { DEEPSEEK_API_KEY?: string }): string { return env?.DEEPSEEK_API_KEY ?? ""; }

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const body = await context.request.json() as { eventId: string }; if (!body.eventId) return json({ error: "eventId is required" }, 400);
    const db = context.env.DB!;
    const event = await db.prepare("SELECT * FROM events WHERE id = ? AND space_id = ?").bind(body.eventId, authResult.spaceId).first<{ id: string; title: string; category: string; description: string }>(); if (!event) return json({ error: "Event not found or access denied" }, 404);
    if (!event.description || event.description.trim().length < 10) return json({ error: "Description too short to summarize" }, 400);
    const summary = await generateSummary(event.description, event.title, event.category, getDeepSeekKey(context.env));
    if (summary) await db.prepare("UPDATE events SET ai_summary = ?, updated_at = datetime('now') WHERE id = ?").bind(summary, body.eventId).run();
    return json({ summary });
  } catch (err) { console.error("Summarize error:", err); return json({ error: "Failed to generate summary" }, 500); }
}
