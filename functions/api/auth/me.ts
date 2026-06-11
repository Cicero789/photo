import { verifyToken, getJwtSecret } from "../../lib/jwt"; import { getUserById, getSpaceById } from "../../lib/db"; import { json } from "../../lib/response";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authHeader = context.request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return json({ user: null }, 200);
    const payload = await verifyToken(authHeader.slice(7), getJwtSecret(context.env));
    if (!payload) return json({ user: null }, 200);
    const user = await getUserById(context.env, payload.userId) as Record<string, unknown> | null;
    if (!user) return json({ user: null }, 200);
    const space = await getSpaceById(context.env, user.space_id as string) as Record<string, unknown> | null;
    return json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, spaceId: user.space_id, avatarUrl: user.avatar_url }, space: space ? { id: space.id, name: space.name, slug: space.slug } : null });
  } catch (err) { console.error("Me error:", err); return json({ error: "Something went wrong." }, 500); }
}
