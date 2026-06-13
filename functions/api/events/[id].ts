import { json } from "../../lib/response"; import { requireAuth, requireRole, requireSpaceOwnership } from "../../lib/auth"; import { geocodeAddress } from "../../lib/geocode";

type Row = Record<string, unknown>;
function mapPhoto(p: Row) {
  return { id: p.id, eventId: p.event_id, spaceId: p.space_id, originalFilename: p.original_filename, storageKey: p.storage_key, url: `/api/media/photos/${p.storage_key}`, width: p.width, height: p.height, fileSize: p.file_size, latitude: p.latitude, longitude: p.longitude, takenAt: p.taken_at, uploadedBy: p.uploaded_by, favorite: (p.favorite as number) === 1, createdAt: p.created_at };
}
function mapVideo(v: Row) {
  return { id: v.id, eventId: v.event_id, spaceId: v.space_id, originalFilename: v.original_filename, storageKey: v.storage_key, url: `/api/media/videos/${v.storage_key}`, duration: v.duration, fileSize: v.file_size, uploadedBy: v.uploaded_by, createdAt: v.created_at };
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const db = context.env.DB!;
    const event = await db.prepare("SELECT * FROM events WHERE id = ?").bind(context.params.id).first(); if (!event) return json({ error: "Event not found" }, 404);
    const ev = event as Record<string,unknown>;

    // Public event: allow access without auth (demo, shared links)
    if ((ev.public as number) !== 0) {
      const photos = await db.prepare("SELECT * FROM photos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
      const videos = await db.prepare("SELECT * FROM videos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
      return json({ event: { id: ev.id, spaceId: ev.space_id, title: ev.title, category: ev.category, eventDate: ev.event_date, description: ev.description, aiSummary: ev.ai_summary, coverPhotoId: ev.cover_photo_id, address: ev.address || "", addressLocked: (ev.address_locked as number) === 1, public: true, createdAt: ev.created_at, updatedAt: ev.updated_at }, photos: (photos.results ?? []).map(mapPhoto), videos: (videos.results ?? []).map(mapVideo) });
    }

    // Private event: require auth + ownership
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const spaceCheck = requireSpaceOwnership(authResult, ev.space_id as string); if (spaceCheck) return spaceCheck;
    const photos = await db.prepare("SELECT * FROM photos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
    const videos = await db.prepare("SELECT * FROM videos WHERE event_id = ? ORDER BY created_at").bind(context.params.id).all();
    return json({ event: { id: ev.id, spaceId: ev.space_id, title: ev.title, category: ev.category, eventDate: ev.event_date, description: ev.description, aiSummary: ev.ai_summary, coverPhotoId: ev.cover_photo_id, address: ev.address || "", addressLocked: (ev.address_locked as number) === 1, public: (ev.public as number) !== 0, createdAt: ev.created_at, updatedAt: ev.updated_at }, photos: (photos.results ?? []).map(mapPhoto), videos: (videos.results ?? []).map(mapVideo) });
  } catch (err) { console.error("Get event error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ? AND space_id = ?").bind(context.params.id, authResult.spaceId).first(); if (!event) return json({ error: "Event not found or access denied" }, 404);
    const body = await context.request.json() as { title?: string; category?: string; eventDate?: string; description?: string; address?: string; public?: boolean };
    const parts: string[] = []; const values: (string|null)[] = [];
    if (body.title !== undefined) { parts.push("title = ?"); values.push(body.title); }
    if (body.category !== undefined) { parts.push("category = ?"); values.push(body.category); }
    if (body.eventDate !== undefined) { parts.push("event_date = ?"); values.push(body.eventDate); }
    if (body.description !== undefined) { parts.push("description = ?"); values.push(body.description); }
    if (body.public !== undefined) { parts.push("public = ?"); values.push(body.public ? "1" : "0"); }
    if (body.address !== undefined) {
      parts.push("address = ?"); values.push(body.address);
      const geo = await geocodeAddress(body.address);
      if (geo) { parts.push("latitude = ?"); values.push(geo.lat.toString()); parts.push("longitude = ?"); values.push(geo.lng.toString()); }
      else { parts.push("latitude = NULL"); parts.push("longitude = NULL"); }
    }
    if (parts.length > 0) { parts.push("updated_at = ?"); values.push(new Date().toISOString()); values.push(context.params.id); await db.prepare(`UPDATE events SET ${parts.join(", ")} WHERE id = ?`).bind(...(values as [string])).run(); }
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
