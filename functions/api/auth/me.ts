import { requireAuth } from "../../lib/auth"; import { getSpaceById } from "../../lib/db"; import { json } from "../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return json({ user: null }, 200);
    const user: { id: string; email: string; name: string; role: string; spaceId: string; avatarUrl: string | null } = { id: a.userId, email: "", name: "", role: a.role, spaceId: a.spaceId, avatarUrl: null };
    // Fetch name/email from DB for the response (requireAuth already verified the token)
    const row = await context.env.DB?.prepare("SELECT email, name, avatar_url FROM users WHERE id = ?").bind(a.userId).first<{email:string;name:string;avatar_url:string|null}>();
    if (row) { user.email = row.email; user.name = row.name; user.avatarUrl = row.avatar_url; }
    const space = await getSpaceById(context.env, a.spaceId) as Record<string, unknown> | null;
    return json({ user, space: space ? { id: space.id, name: space.name, slug: space.slug } : null });
  } catch (err) { console.error("Me error:", err); return json({ error: "Something went wrong." }, 500); }
}
