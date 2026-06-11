import { json } from "../../lib/response"; import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if ("error" in authResult) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const formData = await context.request.formData(); const eventId = formData.get("eventId") as string; const metadataStr = formData.get("metadata") as string | null; const files = formData.getAll("files") as File[];
    if (!eventId) return json({ error: "eventId is required" }, 400); if (!files || files.length === 0) return json({ error: "At least one file is required" }, 400);
    const db = context.env.DB!; const event = await db.prepare("SELECT id, space_id FROM events WHERE id = ?").bind(eventId).first<{id:string;space_id:string}>(); if (!event) return json({ error: "Event not found" }, 404);
    if (event.space_id !== authResult.spaceId) return json({ error: "Access denied" }, 403);
    let metadataList: Array<{filename?:string;width?:number;height?:number;latitude?:number;longitude?:number;takenAt?:string}> = []; if (metadataStr) { try { metadataList = JSON.parse(metadataStr); } catch {} }
    const r2 = context.env.PHOTOS; const uploaded: Array<{id:string;eventId:string;originalFilename:string;storageKey:string;width:number;height:number;fileSize:number;latitude:number|null;longitude:number|null;takenAt:string|null}> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i]; if (!file) continue; const meta = metadataList[i] ?? {}; const photoId = crypto.randomUUID(); const ext = getExtension(file.name) ?? "jpg"; const storageKey = `${authResult.spaceId}/${eventId}/${photoId}.${ext}`;
      if (r2) await r2.put(storageKey, file.stream(), { httpMetadata: { contentType: file.type || "image/jpeg" } });
      const now = new Date().toISOString();
      await db.prepare("INSERT INTO photos (id, event_id, space_id, original_filename, storage_key, width, height, file_size, latitude, longitude, taken_at, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(photoId, eventId, authResult.spaceId, meta.filename ?? file.name, storageKey, meta.width ?? 0, meta.height ?? 0, file.size, meta.latitude ?? null, meta.longitude ?? null, meta.takenAt ?? null, authResult.userId).run();
      if (i === 0) { const ce = await db.prepare("SELECT cover_photo_id FROM events WHERE id = ?").bind(eventId).first<{cover_photo_id:string|null}>(); if (!ce?.cover_photo_id) await db.prepare("UPDATE events SET cover_photo_id = ? WHERE id = ?").bind(photoId, eventId).run(); }
      uploaded.push({ id: photoId, eventId, originalFilename: meta.filename ?? file.name, storageKey, width: meta.width ?? 0, height: meta.height ?? 0, fileSize: file.size, latitude: meta.latitude ?? null, longitude: meta.longitude ?? null, takenAt: meta.takenAt ?? null });
    }
    return json({ photos: uploaded }, 201);
  } catch (err) { console.error("Upload error:", err); return json({ error: "Upload failed." }, 500); }
}
function getExtension(filename: string): string | null { const parts = filename.split("."); if (parts.length < 2) return null; return parts.pop()?.toLowerCase() ?? null; }
