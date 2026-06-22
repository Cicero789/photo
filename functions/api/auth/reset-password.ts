/**
 * POST /api/auth/reset-password
 * Validates a reset token and updates the user's password.
 */

import { hashPassword, hashToken } from "../../lib/password";
import { json } from "../../lib/response";

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string };
}): Promise<Response> {
  try {
    const body = await context.request.json() as { token: string; password: string };
    if (!body.token || !body.password) {
      return json({ error: "Token and new password are required." }, 400);
    }

    if (body.password.length < 8) {
      return json({ error: "Password must be at least 8 characters." }, 400);
    }

    const db = context.env.DB!;

    // Hash the incoming token to match the stored SHA-256 hash
    const tokenHash = await hashToken(body.token);

    // Find valid reset token
    const reset = await db
      .prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > datetime('now')")
      .bind(tokenHash)
      .first<{ id: string; user_id: string; token: string }>();

    if (!reset) {
      return json({ error: "Invalid or expired reset token. Please request a new one." }, 400);
    }

    // Hash new password
    const passwordHash = await hashPassword(body.password);

    // Update user password
    await db
      .prepare("UPDATE users SET password_hash = ? WHERE id = ?")
      .bind(passwordHash, reset.user_id)
      .run();

    // Delete used token
    await db
      .prepare("DELETE FROM password_resets WHERE id = ?")
      .bind(reset.id)
      .run();

    // Clean up expired tokens
    await db
      .prepare("DELETE FROM password_resets WHERE expires_at < datetime('now')")
      .run();

    // Note: Existing JWT sessions are not explicitly invalidated on password change.
    // With JWT lifetime reduced to 24 hours (C-5), the blast radius of leaked tokens
    // is limited. For full invalidation, a token-revocation list or DB-stored session
    // IDs would be needed.

    return json({ success: true, message: "Password has been reset. You can now log in." });
  } catch (err) {
    console.error("Reset password error:", err);
    return json({ error: "Something went wrong." }, 500);
  }
}
