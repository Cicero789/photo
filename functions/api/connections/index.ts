/**
 * GET /api/connections — list my connections
 * POST /api/connections — invite someone (with auto-account if needed)
 * PUT /api/connections — accept/reject
 */

import { json } from "../../lib/response";
import { requireAuth, requireRole } from "../../lib/auth";
import { hashPassword } from "../../lib/password";
import { sendEmail } from "../../lib/email";
import { logActivity } from "../../lib/activity";

function escHtml(s: string): string {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}

// ─── List my connections ───
export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; ZOHO_API_KEY?: string; EMAIL_FROM?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const db = context.env.DB!;
    const user = await db.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first<{email:string}>();
    const userEmail = user?.email || "";
    const result = await db.prepare(
      `SELECT c.*, u.name as from_name, u.email as from_email, us.name as to_name
       FROM connections c
       LEFT JOIN users u ON c.from_user = u.id
       LEFT JOIN users us ON c.to_user = us.id
       WHERE c.from_user = ? OR c.to_user = ? OR c.to_email = ?
       ORDER BY c.created_at DESC`
    ).bind(a.userId, a.userId, userEmail).all();
    const connections = (result.results ?? []).map((r: Record<string,unknown>) => ({
      id: r.id, fromUser: r.from_user, toEmail: r.to_email, toUser: r.to_user,
      connectionType: r.connection_type, status: r.status, message: r.message,
      fromName: r.from_name, fromEmail: r.from_email, toName: r.to_name,
      createdAt: r.created_at,
    }));
    return json({ connections });
  } catch (err) { console.error("List connections error:", err); return json({ error: "Something went wrong" }, 500); }
}

// ─── Invite someone ───
export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; ZOHO_API_KEY?: string; EMAIL_FROM?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const roleCheck = requireRole(a, "staff"); if (roleCheck) return roleCheck;
    const body = await context.request.json() as { email: string; connectionType: string; message?: string };
    if (!body.email || !["family", "friend"].includes(body.connectionType)) {
      return json({ error: "Email and connection type (family/friend) are required" }, 400);
    }

    const db = context.env.DB!;
    const email = body.email.toLowerCase().trim();

    // Don't invite yourself
    const me = await db.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first<{email:string}>();
    if (me?.email === email) return json({ error: "You can't invite yourself" }, 400);

    // Check existing connection
    const existing = await db.prepare("SELECT id FROM connections WHERE from_user = ? AND to_email = ? AND status != 'rejected'").bind(a.userId, email).first();
    if (existing) return json({ error: "Invitation already sent to this email" }, 409);

    // Check if target user exists
    const targetUser = await db.prepare("SELECT id, name FROM users WHERE email = ?").bind(email).first<{id:string;name:string}>();

    const connId = crypto.randomUUID();
    const magicToken = crypto.randomUUID();
    const now = new Date().toISOString();
    const toUserId = targetUser?.id ?? null;

    // Build magic link using request origin (works in dev + production)
    const origin = new URL(context.request.url).origin;
    const magicLink = `${origin}/login?magic=${encodeURIComponent(magicToken)}`;

    // If user doesn't exist, auto-create account + space
    if (!targetUser) {
      const newUserId = crypto.randomUUID();
      const newSpaceId = crypto.randomUUID();
      const randomPw = crypto.randomUUID().slice(0, 16);
      const pwHash = await hashPassword(randomPw);

      const memberId = crypto.randomUUID();
      await db.batch([
        db.prepare("INSERT INTO users (id, email, name, password_hash, role, space_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(newUserId, email, body.email.split("@")[0], pwHash, "page_admin", newSpaceId, now),
        db.prepare("INSERT INTO spaces (id, name, slug, password_hash, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(newSpaceId, body.email.split("@")[0], `space-${newSpaceId.slice(0,8)}`, pwHash, newUserId, now, now),
        db.prepare("INSERT INTO space_members (id, space_id, user_id, role) VALUES (?, ?, ?, ?)").bind(memberId, newSpaceId, newUserId, "page_admin"),
      ]);
    }

    // Create connection
    await db.prepare("INSERT INTO connections (id, from_user, to_email, to_user, connection_type, status, message, magic_token, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(connId, a.userId, email, toUserId, body.connectionType, "pending", body.message ?? "", magicToken, now).run();

    // Get inviter name (used for email + notification)
    const inviter = await db.prepare("SELECT name FROM users WHERE id = ?").bind(a.userId).first<{name:string}>();
    const inviterName = (inviter as any)?.name as string || "Someone";

    // Notify existing user if they have an account
    if (toUserId) logActivity(db, toUserId, "connection_invite", `${inviterName} invited you to connect!`, "/dashboard?tab=connections");
    const typeLabel = body.connectionType === "family" ? "family" : "a friend";

    // Send email
    try {
      await sendEmail({
        to: email,
        subject: `${inviter?.name ?? "Someone"} saved a space for you on FrameNest`,
        htmlBody: `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#2563eb">📸 FrameNest</h2>
          <p><strong>${escHtml(inviter?.name ?? "Someone")}</strong> saved a space for you and tagged you as ${escHtml(typeLabel)}.</p>
          ${body.message ? `<p style="color:#666;font-style:italic">"${escHtml(body.message)}"</p>` : ""}
          <p style="margin:24px 0"><a href="${escHtml(magicLink)}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">See what they shared</a></p>
          <p style="color:#999;font-size:13px">FrameNest gives every family a private home for their photos. Your space is ready when you are.</p>
        </div>`,
      }, context.env);
    } catch (e) { console.error("Failed to send invite email:", e); }

    return json({ success: true, connection: { id: connId, toEmail: email, connectionType: body.connectionType, status: "pending" } }, 201);
  } catch (err) { console.error("Invite error:", err); return json({ error: "Something went wrong" }, 500); }
}

// ─── Accept / Reject ───
export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; ZOHO_API_KEY?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const body = await context.request.json() as { id: string; status: string };
    if (!body.id || !["accepted", "rejected"].includes(body.status)) return json({ error: "Valid id and status (accepted/rejected) required" }, 400);
    const db = context.env.DB!;
    const conn = await db.prepare("SELECT * FROM connections WHERE id = ? AND to_email = (SELECT email FROM users WHERE id = ?)").bind(body.id, a.userId).first();
    if (!conn) return json({ error: "Connection not found" }, 404);
    await db.prepare("UPDATE connections SET status = ?, to_user = ? WHERE id = ?").bind(body.status, a.userId, body.id).run();
    // Notify the inviter
    const connRow = await db.prepare("SELECT from_user FROM connections WHERE id = ?").bind(body.id).first<{from_user:string}>();
    if (connRow && body.status === "accepted") {
      const inviter = await db.prepare("SELECT name FROM users WHERE id = ?").bind(connRow.from_user).first<{name:string}>();
      const invName = (inviter as any)?.name as string || "Someone";
      logActivity(db, connRow.from_user as string, "connection_accepted", `${invName} accepted your connection!`);
    }
    return json({ success: true });
  } catch (err) { console.error("Update connection error:", err); return json({ error: "Something went wrong" }, 500); }
}
