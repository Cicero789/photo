import { defaultStudio, studioSchema } from "../../../shared/studio";
import { requireAuth, requireRole } from "../../lib/auth";
import { json } from "../../lib/response";
type Context = { request: Request; env: { DB: D1Database } };
export async function onRequestGet({ env }: Context) {
  const settings = await env.DB.prepare("SELECT content FROM studio_settings WHERE id = 1").first<{ content: string }>();
  const photos = await env.DB.prepare("SELECT id, storage_key, title, description, category FROM studio_photos ORDER BY created_at, id").all();
  return json({ studio: settings ? JSON.parse(settings.content) : defaultStudio, photos: photos.results.map(p => ({ id: p.id, url: `/api/media/photos/${p.storage_key}`, title: p.title, description: p.description, category: p.category })) });
}
export async function onRequestPut({ request, env }: Context) {
  const auth = await requireAuth(request, env); if (auth instanceof Response) return auth;
  const denied = requireRole(auth, "platform_owner"); if (denied) return denied;
  const parsed = studioSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ error: "Check the site fields and email address." }, 400);
  await env.DB.prepare("INSERT INTO studio_settings (id, content) VALUES (1, ?) ON CONFLICT(id) DO UPDATE SET content = excluded.content").bind(JSON.stringify(parsed.data)).run();
  return json({ success: true });
}
