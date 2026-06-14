import { json } from "../../lib/response"; import { requireAuth, requireRole } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; VIDEOS?: R2Bucket; JWT_SECRET?: string; ENVIRONMENT?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const formData = await context.request.formData(); const eventId = formData.get("eventId") as string; const metadataStr = formData.get("metadata") as string | null; const files = formData.getAll("files") as unknown as File[];
    if (!eventId) return json({ error: "eventId is required" }, 400); if (!files || files.length === 0) return json({ error: "At least one file is required" }, 400);
    const db = context.env.DB!; const event = await db.prepare("SELECT id, space_id FROM events WHERE id = ?").bind(eventId).first<{id:string;space_id:string}>(); if (!event) return json({ error: "Event not found" }, 404);
    if (event.space_id !== authResult.spaceId) return json({ error: "Access denied" }, 403);
    let metadataList: Array<{filename?:string;duration?:number}> = []; if (metadataStr) { try { metadataList = JSON.parse(metadataStr); } catch (e) { console.error("Upload parse error:", e); } }
    const r2 = context.env.VIDEOS; const uploaded: Array<{id:string;eventId:string;originalFilename:string;storageKey:string;duration:number;fileSize:number}> = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i]; if (!file) continue; const meta = metadataList[i] ?? {}; const videoId = crypto.randomUUID(); const ext = getVideoExtension(file.name) ?? getVideoExtension(file.type) ?? "mp4"; const storageKey = `${authResult.spaceId}/${eventId}/${videoId}.${ext}`;
      if (r2) await r2.put(storageKey, file.stream(), { httpMetadata: { contentType: file.type || "video/mp4" } });
      await db.prepare("INSERT INTO videos (id, event_id, space_id, original_filename, storage_key, duration, file_size, uploaded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(videoId, eventId, authResult.spaceId, meta.filename ?? file.name, storageKey, meta.duration ?? 0, file.size, authResult.userId).run();
      uploaded.push({ id: videoId, eventId, originalFilename: meta.filename ?? file.name, storageKey, duration: meta.duration ?? 0, fileSize: file.size });
    }
    return json({ videos: uploaded }, 201);
  } catch (err) { console.error("Video upload error:", err); return json({ error: "Upload failed." }, 500); }
}
function getVideoExtension(filenameOrType: string): string | null { const parts = filenameOrType.split("."); if (parts.length >= 2) { const ext = parts.pop()?.toLowerCase(); if (ext && ["mp4","webm","mov","avi","mkv"].includes(ext)) return ext; } const mimeMap: Record<string,string> = { "video/mp4":"mp4", "video/webm":"webm", "video/quicktime":"mov", "video/x-msvideo":"avi" }; return mimeMap[filenameOrType] ?? null; }
