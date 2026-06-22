import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth"; import { geocodeAddress } from "../../lib/geocode"; import { toPublicEventDto, toPublicPhotoDto } from "../../lib/event-dto"; import { canReadEvent, canManageEvent } from "../../lib/event-access";

type Row = Record<string, unknown>;
function mapPhoto(p: Row) {
  return { id: p.id, eventId: p.event_id, spaceId: p.space_id, originalFilename: p.original_filename, storageKey: p.storage_key, url: `/api/media/photos/${p.storage_key}`, width: p.width, height: p.height, fileSize: p.file_size, latitude: p.latitude, longitude: p.longitude, takenAt: p.taken_at, uploadedBy: p.uploaded_by, favorite: (p.favorite as number) === 1, license: (p.license as string) || "personal", createdAt: p.created_at };
}
function mapVideo(v: Row) {
  return { id: v.id, eventId: v.event_id, spaceId: v.space_id, originalFilename: v.original_filename, storageKey: v.storage_key, url: `/api/media/videos/${v.storage_key}`, duration: v.duration, fileSize: v.file_size, uploadedBy: v.uploaded_by, createdAt: v.created_at };
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const db = context.env.DB!;
    const event = await db.prepare("SELECT * FROM events WHERE id = ?").bind(context.params.id).first(); if (!event) return json({ error: "Event not found" }, 404);
    const ev = event as Record<string,unknown>;

    // Resolve access using shared event-access helpers
    const authResult = await requireAuth(context.request, context.env);
    const isAuthenticated = !(authResult instanceof Response);
    const actor = isAuthenticated ? { userId: authResult.userId, spaceId: authResult.spaceId, role: authResult.role } : null;
    const eventAccess = { id: ev.id as string, space_id: ev.space_id as string, visibility: (ev.visibility as string) || 'private' };

    if (!canReadEvent(actor, eventAccess)) {
      return json({ error: "Forbidden" }, 403);
    }

    const isOwner = actor ? canManageEvent(actor, eventAccess) : false;

    if (isOwner) {
      // Space owner/manager: full access regardless of visibility
      const photos = await db.prepare("SELECT * FROM photos WHERE event_id = ? AND deleted_at IS NULL ORDER BY created_at").bind(context.params.id).all();
      const videos = await db.prepare("SELECT * FROM videos WHERE event_id = ? AND deleted_at IS NULL ORDER BY created_at").bind(context.params.id).all();
      return json({ event: { id: ev.id, spaceId: ev.space_id, title: ev.title, category: ev.category, eventDate: ev.event_date, description: ev.description, aiSummary: ev.ai_summary, coverPhotoId: ev.cover_photo_id, address: ev.address || "", addressLocked: (ev.address_locked as number) === 1, public: (ev.public as number) !== 0, createdAt: ev.created_at, updatedAt: ev.updated_at }, photos: (photos.results ?? []).map(mapPhoto), videos: (videos.results ?? []).map(mapVideo) });
    }

    // Return scrubbed public data for readable non-owner events
    const photos = await db.prepare("SELECT id, storage_key, width, height, license FROM photos WHERE event_id = ? AND deleted_at IS NULL ORDER BY created_at").bind(context.params.id).all();
    return json({ event: toPublicEventDto(ev), photos: (photos.results ?? []).map(toPublicPhotoDto), videos: [] });
  } catch (err) { console.error("Get event error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPut(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ?").bind(context.params.id).first(); if (!event) return json({ error: "Event not found" }, 404);
    if ((event as Record<string,unknown>).space_id !== authResult.spaceId || authResult.role === 'viewer') return json({ error: "Forbidden" }, 403);
    const body = await context.request.json() as { title?: string; category?: string; eventDate?: string; description?: string; address?: string; visibility?: string };
    if (body.title !== undefined && body.title.length > 200) return json({ error: "Title too long" }, 400);
    if (body.description !== undefined && body.description.length > 5000) return json({ error: "Description too long" }, 400);
    const VALID_CATS = ['holiday','birthday','graduation','wedding','celebration','sports','school','travel','vacation','work','restaurant','party','family','kids','parents','other'];
    if (body.category !== undefined && !VALID_CATS.includes(body.category)) return json({ error: "Invalid category" }, 400);
    const parts: string[] = []; const values: (string|null)[] = [];
    if (body.title !== undefined) { parts.push("title = ?"); values.push(body.title); }
    if (body.category !== undefined) { parts.push("category = ?"); values.push(body.category); }
    if (body.eventDate !== undefined) { parts.push("event_date = ?"); values.push(body.eventDate); }
    if (body.description !== undefined) { parts.push("description = ?"); values.push(body.description); }
    if (body.visibility !== undefined && ["private","gate","public"].includes(body.visibility)) {
      parts.push("visibility = ?"); values.push(body.visibility);
      parts.push("public = ?"); values.push(body.visibility === "public" ? "1" : "0");
    }
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

export async function onRequestDelete(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string; PHOTOS?: R2Bucket; VIDEOS?: R2Bucket }; params: { id: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const db = context.env.DB!; const event = await db.prepare("SELECT * FROM events WHERE id = ?").bind(context.params.id).first(); if (!event) return json({ error: "Event not found" }, 404);
    if ((event as Record<string,unknown>).space_id !== authResult.spaceId || authResult.role === 'viewer') return json({ error: "Forbidden" }, 403);

    // Clean up R2 storage before deleting DB rows
    const photoRows = await db.prepare("SELECT storage_key FROM photos WHERE event_id = ? AND deleted_at IS NULL").bind(context.params.id).all<{ storage_key: string }>();
    const videoRows = await db.prepare("SELECT storage_key FROM videos WHERE event_id = ? AND deleted_at IS NULL").bind(context.params.id).all<{ storage_key: string }>();
    for (const row of photoRows.results ?? []) {
      const obj = await context.env.PHOTOS?.get(row.storage_key);
      if (obj) {
        await context.env.PHOTOS?.put(`trash/${row.storage_key}`, obj.body, { httpMetadata: obj.httpMetadata });
        await context.env.PHOTOS?.delete(row.storage_key);
      }
    }
    for (const row of videoRows.results ?? []) {
      const obj = await context.env.VIDEOS?.get(row.storage_key);
      if (obj) {
        await context.env.VIDEOS?.put(`trash/${row.storage_key}`, obj.body, { httpMetadata: obj.httpMetadata });
        await context.env.VIDEOS?.delete(row.storage_key);
      }
    }

    await db.batch([
      db.prepare("UPDATE photos SET deleted_at = datetime('now') WHERE event_id = ? AND deleted_at IS NULL").bind(context.params.id),
      db.prepare("UPDATE videos SET deleted_at = datetime('now') WHERE event_id = ? AND deleted_at IS NULL").bind(context.params.id),
      db.prepare("UPDATE events SET deleted_at = datetime('now') WHERE id = ? AND deleted_at IS NULL").bind(context.params.id),
    ]);
    return json({ success: true });
  } catch (err) { console.error("Delete event error:", err); return json({ error: "Something went wrong" }, 500); }
}
