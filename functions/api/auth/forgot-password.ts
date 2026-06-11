/**
 * POST /api/auth/forgot-password
 * Sends a password reset email with a one-time token.
 */

import { getUserByEmail } from "../../lib/db";
import { json } from "../../lib/response";
import { checkRateLimit, getClientIP } from "../../lib/rate-limit";
import { sendEmail } from "../../lib/email";

export async function onRequestPost(context: {
  request: Request;
  env: { DB?: D1Database; RESEND_API_KEY?: string };
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
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await db
      .prepare("INSERT INTO password_resets (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)")
      .bind(crypto.randomUUID(), user.id as string, token, expires)
      .run();

    const resetUrl = `https://photo-ll2.pages.dev/reset-password?token=${token}`;

    // Try sending email (Resend if configured, else MailChannels)
    const sent = await sendEmail({
      to: body.email,
      subject: "Reset your Photo password",
      htmlBody: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#2563eb">📸 Photo</h2>
          <p>You requested a password reset for your Photo account.</p>
          <p style="margin:24px 0">
            <a href="${resetUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
              Reset your password
            </a>
          </p>
          <p style="color:#666;font-size:14px">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
          <hr style="border:0;border-top:1px solid #eee;margin:24px 0">
          <p style="color:#999;font-size:12px">Photo — A home for your life's moments.</p>
        </div>
      `,
    }, context.env);

    return json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
      resetUrl: sent ? undefined : resetUrl, // Show URL if email failed
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return json({ error: "Something went wrong." }, 500);
  }
}
