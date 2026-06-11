import { verifyPassword } from "../../lib/password"; import { signToken, getJwtSecret } from "../../lib/jwt"; import { getUserByEmail, getSpaceById } from "../../lib/db"; import { json } from "../../lib/response"; import { checkRateLimit, getClientIP } from "../../lib/rate-limit";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  try {
    const db = context.env.DB!; const ip = getClientIP(context.request); const limit = await checkRateLimit(db, ip, "login"); if (!limit.allowed) return json({ error: `Too many attempts. Retry in ${limit.retryAfter}s.` }, 429);
    const body = await context.request.json() as { email: string; password: string };
    if (!body.email || !body.password) return json({ error: "Email and password are required." }, 400);
    const user = await getUserByEmail(context.env, body.email) as Record<string, unknown> | null;
    if (!user) return json({ error: "Invalid email or password." }, 401);
    const valid = await verifyPassword(body.password, user.password_hash as string); if (!valid) return json({ error: "Invalid email or password." }, 401);
    const space = await getSpaceById(context.env, user.space_id as string) as Record<string, unknown> | null;
    const token = await signToken({ userId: user.id as string, spaceId: user.space_id as string, role: user.role as string }, getJwtSecret(context.env));
    return json({ user: { id: user.id, email: user.email, name: user.name, role: user.role, spaceId: user.space_id }, space: space ? { id: space.id, name: space.name, slug: space.slug } : null, token });
  } catch (err) { console.error("Login error:", err); return json({ error: "Something went wrong." }, 500); }
}
