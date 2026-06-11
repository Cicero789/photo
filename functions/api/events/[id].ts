import { json } from "../../lib/response"; import { requireAuth, requireRole, requireSpaceOwnership } from "../../lib/auth";

type Row = Record<string, unknown>;
function mapPhoto(p: Row) {
  return { id: p.id, eventId: p.event_id, spaceId: p.space_id, originalFilename: p.original_filename, storageKey: p.storage_key, url: `/api/media/photos/${p.storage_key}`, width: p.width, height: p.height, fileSize: p.file_size, latitude: p.latitude, longitude: p.longitude, takenAt: p.taken_at, uploadedBy: p.uploaded_by, createdAt: p.created_at };
}
function mapVideo(v: Row) {
  return { id: v.id, eventId: v.event_id, spaceId: v.space_id, originalFilename: v.original_filename, storageKey: v.storage_key, url: `/api/media/videos/${v.storage_key}`, duration: v.duration, fileSize: v.file_size, uploadedBy: v.uploaded_by, createdAt: v.created_at };
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ?").bind(context.params.id).first(); if (!event) return json({ error: "Event not found" }, 404);
    const spaceCheck = requireSpaceOwnership(authResult, (event as Record<string,unknown>).space_id as string); if (spaceCheck) return spaceCheck;
    const photos = await db.prepare("SELECT * FROM photos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
    const videos = await db.prepare("SELECT * FROM videos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
    return json({ event: { id: (event as Record<string,unknown>).id, spaceId: (event as Record<string,unknown>).space_id, title: (event as Record<string,unknown>).title, category: (event as Record<string,unknown>).category, eventDate: (event as Record<string,unknown>).event_date, description: (event as Record<string,unknown>).description, aiSummary: (event as Record<string,unknown>).ai_summary, coverPhotoId: (event as Record<string,unknown>).cover_photo_id, createdAt: (event as Record<string,unknown>).created_at, updatedAt: (event as Record<string,unknown>).updated_at }, photos: (photos.results ?? []).map(mapPhoto), videos: (videos.results ?? []).map(mapVideo) });
  } catch (err) { console.error("Get event error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ? AND space_id = ?").bind(context.params.id, authResult.spaceId).first(); if (!event) return json({ error: "Event not found or access denied" }, 404);
    const body = await context.request.json() as { title?: string; category?: string; eventDate?: string; description?: string };
    const parts: string[] = []; const values: (string|null)[] = [];
    if (body.title !== undefined) { parts.push("title = ?"); values.push(body.title); }
    if (body.category !== undefined) { parts.push("category = ?"); values.push(body.category); }
    if (body.eventDate !== undefined) { parts.push("event_date = ?"); values.push(body.eventDate); }
    if (body.description !== undefined) { parts.push("description = ?"); values.push(body.description); }
    if (parts.length > 0) { parts.push("updated_at = datetime('now')"); values.push(context.params.id); await db.prepare(`UPDATE events SET ${parts.join(", ")} WHERE id = ?`).bind(...(values as [string])).run(); }
    return json({ success: true });
  } catch (err) { console.error("Update event error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "page_admin"); if (roleCheck) return roleCheck;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ? AND space_id = ?").bind(context.params.id, authResult.spaceId).first(); if (!event) return json({ error: "Event not found or access denied" }, 404);
    await db.prepare("DELETE FROM photos WHERE event_id = ?").bind(context.params.id).run();
    await db.prepare("DELETE FROM videos WHERE event_id = ?").bind(context.params.id).run();
    await db.prepare("DELETE FROM events WHERE id = ?").bind(context.params.id).run();
    return json({ success: true });
  } catch (err) { console.error("Delete event error:", err); return json({ error: "Something went wrong" }, 500); }
}
