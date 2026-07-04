import { hashPassword } from "../../lib/password"; import { json } from "../../lib/response"; import { validateMember, sanitize, MAX_NAME, MAX_EMAIL } from "../../lib/validate"; import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const db = context.env.DB!;
    const result = await db.prepare("SELECT sm.id, sm.space_id, sm.user_id, sm.role, u.name, u.email, u.created_at FROM space_members sm JOIN users u ON sm.user_id = u.id WHERE sm.space_id = ? ORDER BY sm.role, u.created_at").bind(authResult.spaceId).all<{id:string;space_id:string;user_id:string;role:string;name:string;email:string;created_at:string}>();
    const members = (result.results ?? []).map(m => ({ id: m.id, userId: m.user_id, spaceId: m.space_id, role: m.role, name: m.name, email: m.email, joinedAt: m.created_at }));
    return json({ members });
  } catch (err) { console.error("List members error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "page_admin"); if (roleCheck) return roleCheck;
    const rawBody = await context.request.json() as { name: string; email: string; role: string; password: string };
    const validationError = validateMember(rawBody); if (validationError) return json({ error: validationError }, 400);
    const body = { name: sanitize(rawBody.name, MAX_NAME), email: sanitize(rawBody.email, MAX_EMAIL).toLowerCase(), role: rawBody.role, password: rawBody.password };
    const db = context.env.DB!;
    const existing = await db.prepare("SELECT u.id FROM users u JOIN space_members sm ON u.id = sm.user_id WHERE u.email = ? AND sm.space_id = ?").bind(body.email, authResult.spaceId).first(); if (existing) return json({ error: "A member with this email already exists in your space" }, 409);
    const existingUser = await db.prepare("SELECT id FROM users WHERE email = ?").bind(body.email).first<{id:string}>();
    if (existingUser) {
      // Add existing user as member
      await db.prepare("INSERT OR IGNORE INTO space_members (id, space_id, user_id, role) VALUES (?,?,?,?)").bind(crypto.randomUUID(), authResult.spaceId, existingUser.id, body.role).run();
      return json({ success: true });
    }
    const userId = crypto.randomUUID(); const memberId = crypto.randomUUID(); const passwordHash = await hashPassword(body.password);
    await db.prepare("INSERT INTO users (id, email, name, password_hash, role, space_id) VALUES (?, ?, ?, ?, ?, ?)").bind(userId, body.email, body.name, passwordHash, body.role, authResult.spaceId).run();
    await db.prepare("INSERT INTO space_members (id, space_id, user_id, role) VALUES (?, ?, ?, ?)").bind(memberId, authResult.spaceId, userId, body.role).run();
    return json({ member: { id: memberId, userId, spaceId: authResult.spaceId, role: body.role, name: body.name, email: body.email } }, 201);
  } catch (err) { console.error("Add member error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "page_admin"); if (roleCheck) return roleCheck;
    const url = new URL(context.request.url); const memberId = url.searchParams.get("id"); if (!memberId) return json({ error: "Member ID is required" }, 400);
    const db = context.env.DB!;
    const member = await db.prepare("SELECT * FROM space_members WHERE id = ? AND space_id = ?").bind(memberId, authResult.spaceId).first() as { user_id: string } | null; if (!member) return json({ error: "Member not found" }, 404);
    const space = await db.prepare("SELECT owner_id FROM spaces WHERE id = ?").bind(authResult.spaceId).first<{owner_id:string}>();
    if (space?.owner_id === member.user_id) return json({ error: "Cannot remove the space owner" }, 400);
    await db.prepare("DELETE FROM space_members WHERE id = ?").bind(memberId).run();
    return json({ success: true });
  } catch (err) { console.error("Remove member error:", err); return json({ error: "Something went wrong" }, 500); }
}
