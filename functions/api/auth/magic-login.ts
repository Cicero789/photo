/**
 * POST /api/auth/magic-login
 * Validates a magic token and returns a JWT for auto-login.
 */

import { getUserById } from "../../lib/db";
import { signToken, getJwtSecret } from "../../lib/jwt";
import { json } from "../../lib/response";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const body = await context.request.json() as { token: string };
    if (!body.token) return json({ error: "Token required" }, 400);

    const db = context.env.DB!;
    const conn = await db.prepare("SELECT * FROM connections WHERE magic_token = ?").bind(body.token).first<Record<string,unknown>>();
    if (!conn) return json({ error: "Invalid or expired token" }, 400);

    // Find the invited user
    const email = conn.to_email as string;
    const user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<Record<string,unknown>>();
    if (!user) return json({ error: "Account not found" }, 404);

    // Auto-accept the connection
    if (conn.status === "pending") {
      await db.prepare("UPDATE connections SET status = 'accepted', to_user = ? WHERE id = ?").bind(user.id, conn.id).run();
    }

    const token = await signToken({ userId: user.id as string, spaceId: user.space_id as string, role: user.role as string }, getJwtSecret(context.env));

    return json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, spaceId: user.space_id }, space: { id: user.id, name: "", slug: "" } });
  } catch (err) { console.error("Magic login error:", err); return json({ error: "Something went wrong" }, 500); }
}
