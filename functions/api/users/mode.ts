/** Switch account mode — PUT /api/users/mode */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const body = await context.request.json() as { mode: string };
  if (!body.mode || !["personal", "pro"].includes(body.mode)) return json({ error: "mode must be 'personal' or 'pro'" }, 400);

  const db = context.env.DB!;
  try {
    await db.prepare("UPDATE users SET account_type = ? WHERE id = ?").bind(body.mode, a.userId).run();
  } catch (err) {
    console.error("Mode switch error (account_type column may not exist):", err);
    return json({ error: "Mode switch failed — database may need migration" }, 500);
  }

  // Auto-create photographer row when switching to pro
  if (body.mode === "pro") {
    const user = await db.prepare("SELECT email, name FROM users WHERE id = ?").bind(a.userId).first() as any;
    if (user) {
      const existing = await db.prepare("SELECT id FROM photographers WHERE email = ?").bind(user.email).first();
      if (!existing) {
        await db.prepare(
          "INSERT INTO photographers (id, name, email, status, created_at) VALUES (?,?,?,'pending',datetime('now'))"
        ).bind(crypto.randomUUID(), user.name, user.email).run();
      }
    }
  }

  return json({ mode: body.mode });
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  try {
    const user = await context.env.DB!.prepare("SELECT account_type FROM users WHERE id = ?").bind(a.userId).first() as any;
    return json({ mode: user?.account_type || "personal" });
  } catch (err) {
    console.error("Mode switch error (account_type column may not exist):", err);
    return json({ error: "Mode switch failed — database may need migration" }, 500);
  }
}
