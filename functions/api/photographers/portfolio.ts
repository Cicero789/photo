/** Portfolio photos — GET (list) + POST (upload) */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  // Find photographer by user email
  const user = await context.env.DB!.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);
  const photographer = await context.env.DB!.prepare("SELECT id FROM photographers WHERE email = ?").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Not a photographer" }, 403);

  const result = await context.env.DB!.prepare(
    "SELECT id, storage_key, filename, sort_order FROM photographer_portfolio WHERE photographer_id = ? ORDER BY sort_order, created_at"
  ).bind(photographer.id).all();

  return json({
    photos: (result.results || []).map((p: any) => ({
      id: p.id, url: `/api/media/photos/${p.storage_key}`, filename: p.filename || "",
    })),
  });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const user = await context.env.DB!.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);
  const photographer = await context.env.DB!.prepare("SELECT id FROM photographers WHERE email = ? AND status = 'approved'").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Not an approved photographer" }, 403);

  const form = await context.request.formData();
  const file = form.get("file") as File | null;
  if (!file) return json({ error: "No file provided" }, 400);

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const storageKey = `portfolio/${photographer.id}/${crypto.randomUUID()}.${ext}`;
  await context.env.PHOTOS!.put(storageKey, file.stream(), { httpMetadata: { contentType: file.type } });

  const maxOrder = await context.env.DB!.prepare(
    "SELECT MAX(sort_order) as m FROM photographer_portfolio WHERE photographer_id = ?"
  ).bind(photographer.id).first() as any;
  const sortOrder = (maxOrder?.m || 0) + 1;

  const id = crypto.randomUUID();
  await context.env.DB!.prepare(
    "INSERT INTO photographer_portfolio (id, photographer_id, storage_key, filename, sort_order, created_at) VALUES (?,?,?,?,?,datetime('now'))"
  ).bind(id, photographer.id, storageKey, file.name, sortOrder).run();

  return json({ id, url: `/api/media/photos/${storageKey}`, filename: file.name }, 201);
}
