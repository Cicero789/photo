import { verifyPassword } from "../../lib/password"; import { signToken, getJwtSecret } from "../../lib/jwt"; import { getSpaceBySlug } from "../../lib/db"; import { json } from "../../lib/response"; import { checkRateLimit, getClientIP } from "../../lib/rate-limit";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const db = context.env.DB!; const ip = getClientIP(context.request); const limit = await checkRateLimit(db, ip, "gate"); if (!limit.allowed) return json({ error: `Too many attempts. Retry in ${limit.retryAfter}s.` }, 429);
    const body = await context.request.json() as { spaceSlug: string; gateKey: string };
    if (!body.spaceSlug || !body.gateKey) return json({ error: "Space slug and gate key are required" }, 400);
    const space = await getSpaceBySlug(context.env, body.spaceSlug) as Record<string, unknown> | null;
    if (!space) return json({ error: "Space not found" }, 404);
    const valid = await verifyPassword(body.gateKey, space.password_hash as string); if (!valid) return json({ error: "Invalid gate key" }, 401);
    const token = await signToken({ userId: "viewer", spaceId: space.id as string, role: "viewer", tokenVersion: 0 }, getJwtSecret(context.env));
    return json({ success: true, token, space: { id: space.id, name: space.name, slug: space.slug, themeColor: space.theme_color } });
  } catch (err) { console.error("Gate verify error:", err); return json({ error: "Something went wrong" }, 500); }
}
