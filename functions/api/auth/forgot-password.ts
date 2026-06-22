/**
 * POST /api/auth/forgot-password
 * Sends a password reset email with a one-time token.
 */

import { getUserByEmail } from "../../lib/db";
import { json } from "../../lib/response";
import { checkRateLimit, getClientIP } from "../../lib/rate-limit";
import { sendEmail, type EmailEnv } from "../../lib/email";
import { hashToken } from "../../lib/password";

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } & EmailEnv;
}): Promise<Response> {
  try {
    const db = context.env.DB!;
    const ip = getClientIP(context.request);
    const limit = await checkRateLimit(db, ip, "forgot-password");
    if (!limit.allowed) {
      return json({ error: `Too many attempts. Please try again in ${limit.retryAfter}s.` }, 429);
    }

    const body = await context.request.json() as { email: string };
    if (!body.email) {
      return json({ error: "Email is required." }, 400);
    }

    // Always return success to prevent email enumeration
    const user = await getUserByEmail(context.env, body.email.toLowerCase().trim()) as Record<string, unknown> | null;
    if (!user) {
      return json({ success: true, message: "If that email exists, a reset link has been sent." });
    }

    // Generate reset token (valid for 1 hour)
    const token = crypto.randomUUID();
    const tokenHash = await hashToken(token);
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    // Store the SHA-256 hash of the token in the DB, not the raw token
    await db
      .prepare("INSERT INTO password_resets (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)")
      .bind(crypto.randomUUID(), user.id as string, tokenHash, expires)
      .run();

    const resetUrl = `${new URL(context.request.url).origin}/reset-password?token=${token}`;

    // Send via ZeptoMail (requires ZOHO_API_KEY secret)
    await sendEmail({
      to: body.email,
      subject: "Reset your FrameNest password",
      htmlBody: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#2563eb">📸 FrameNest</h2>
          <p>You requested a password reset for your FrameNest account.</p>
          <p style="margin:24px 0">
            <a href="${resetUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
              Reset your password
            </a>
          </p>
          <p style="color:#666;font-size:14px">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          <hr style="border:0;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#999;font-size:12px">FrameNest — A home for your life's moments.</p>
        </div>
      `,
    }, context.env);

    // Never include resetUrl in the response — returning it would let anyone
    // take over an account by requesting a reset for that email.
    return json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return json({ error: "Something went wrong." }, 500);
  }
}
