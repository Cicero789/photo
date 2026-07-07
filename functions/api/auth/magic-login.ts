/**
 * POST /api/auth/magic-login — one-time magic token login.
 * Token expires after 7 days and is single-use (deleted on redeem).
 */

import { signToken, getJwtSecret } from "../../lib/jwt";
import { json } from "../../lib/response";
import { hashToken, hashPassword } from "../../lib/password";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const body = await context.request.json() as { token: string };
    if (!body.token) return json({ error: "Token required" }, 400);

    const db = context.env.DB!;
    // Hash the incoming token to match the stored SHA-256 hash
    const tokenHash = await hashToken(body.token);
    const conn = await db.prepare(
      "SELECT * FROM connections WHERE magic_token = ? AND created_at > datetime('now', '-7 days')"
    ).bind(tokenHash).first<Record<string,unknown>>();
    if (!conn) return json({ error: "Invalid or expired token" }, 400);

    const email = conn.to_email as string;
    let user = await db.prepare("SELECT * FROM users WHERE email = ?").bind(email).first<Record<string,unknown>>();
    if (!user) {
      // Auto-provision account for invitee (the invite email promised this)
      const userId = crypto.randomUUID();
      const spaceId = crypto.randomUUID();
      const now = new Date().toISOString();
      const namePart = email.split("@")[0] || "Friend";
      const randomSecret = crypto.randomUUID() + crypto.randomUUID();
      const passwordHash = await hashPassword(randomSecret);
      const gateHash = await hashPassword(crypto.randomUUID());
      let slug = namePart.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "friend";
      const clash = await db.prepare("SELECT id FROM spaces WHERE slug = ?").bind(slug).first();
      if (clash) slug = `${slug}-${crypto.randomUUID().slice(0, 6)}`;
      await db.batch([
        db.prepare("INSERT INTO users (id, email, name, password_hash, role, space_id, created_at) VALUES (?,?,?,?,?,?,?)")
          .bind(userId, email, namePart, passwordHash, "page_admin", spaceId, now),
        db.prepare("INSERT INTO spaces (id, name, slug, password_hash, owner_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?)")
          .bind(spaceId, `${namePart}'s Space`, slug, gateHash, userId, now, now),
        db.prepare("INSERT INTO space_members (id, space_id, user_id, role) VALUES (?,?,?,?)")
          .bind(crypto.randomUUID(), spaceId, userId, "page_admin"),
      ]);
      user = await db.prepare("SELECT * FROM users WHERE id = ?").bind(userId).first<Record<string,unknown>>();
      if (!user) return json({ error: "Account creation failed" }, 500);
    }

    // Auto-accept + clear token (single-use)
    if (conn.status === "pending") {
      await db.prepare("UPDATE connections SET status = 'accepted', to_user = ?, magic_token = NULL WHERE id = ?").bind(user.id, conn.id).run();
    } else {
      await db.prepare("UPDATE connections SET magic_token = NULL WHERE id = ?").bind(conn.id).run();
    }

    // Ensure all connections with this magic token are invalidated
    await db.prepare("UPDATE connections SET magic_token = NULL WHERE magic_token = ?").bind(tokenHash).run();

    const space = await db.prepare("SELECT * FROM spaces WHERE id = ?").bind(user.space_id as string).first<Record<string,unknown>>();
    const token = await signToken({
      userId: user.id as string,
      spaceId: user.space_id as string,
      role: user.role as string,
      email: user.email as string,
      tokenVersion: (user.token_version as number) ?? 0,
    }, getJwtSecret(context.env));

    return json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role, spaceId: user.space_id },
      space: space ? { id: space.id, name: space.name, slug: space.slug } : null,
    });
  } catch (err) { console.error("Magic login error:", err); return json({ error: "Something went wrong" }, 500); }
}
