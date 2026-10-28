import { z } from "zod";
import { requireAuth, requireRole } from "../../lib/auth";
import { json } from "../../lib/response";
import { validateUploadContent } from "../../lib/upload-validate";
import { rejectOversizedRequest } from "../../lib/upload-policy";
type Context = { request: Request; env: { DB: D1Database; PHOTOS: R2Bucket } };
const metadata = z.object({ id: z.string().uuid(), title: z.string().trim().min(1).max(150), description: z.string().max(1000), category: z.enum(["Families", "Couples", "Portraits", "Milestones"]) });
export async function onRequest(context: Context) {
  const { request, env } = context;
  const auth = await requireAuth(request, env); if (auth instanceof Response) return auth;
  const denied = requireRole(auth, "platform_owner"); if (denied) return denied;
  if (request.method === "POST") {
    const oversized = rejectOversizedRequest(request, 20 * 1024 * 1024); if (oversized) return oversized;
    const form = await request.formData(); const file = form.get("file");
    if (!file || typeof file === "string" || !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 20 * 1024 * 1024) return json({ error: "Choose a JPEG, PNG or WebP under 20 MB." }, 400);
    const validation = await validateUploadContent(file); if (!validation.valid) return json({ error: validation.reason }, 400);
    const id = crypto.randomUUID(); const key = `studio/${id}`;
    await env.PHOTOS.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
    try { await env.DB.prepare("INSERT INTO studio_photos (id, storage_key, title) VALUES (?, ?, ?)").bind(id, key, file.name.slice(0, 150)).run(); }
    catch (error) { await env.PHOTOS.delete(key); throw error; }
    return json({ id }, 201);
  }
  if (request.method === "PUT") {
    const data = metadata.safeParse(await request.json().catch(() => null));
    if (!data.success) return json({ error: "Invalid photo details." }, 400);
    const p = data.data;
    await env.DB.prepare("UPDATE studio_photos SET title = ?, description = ?, category = ? WHERE id = ?").bind(p.title, p.description, p.category, p.id).run();
    return json({ success: true });
  }
  if (request.method === "DELETE") {
    const body = z.object({ id: z.string().uuid() }).safeParse(await request.json().catch(() => null));
    if (!body.success) return json({ error: "Invalid photo." }, 400);
    const p = await env.DB.prepare("SELECT storage_key FROM studio_photos WHERE id = ?").bind(body.data.id).first<{ storage_key: string }>();
    if (!p) return json({ error: "Photo not found." }, 404);
    await env.DB.prepare("DELETE FROM studio_photos WHERE id = ?").bind(body.data.id).run();
    await env.PHOTOS.delete(p.storage_key);
    return json({ success: true });
  }
  return json({ error: "Method not allowed" }, 405);
}
