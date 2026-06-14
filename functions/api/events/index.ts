import { json } from "../../lib/response"; import { generateSummary } from "../../lib/deepseek"; import { requireAuth, requireRole, requireSpaceOwnership } from "../../lib/auth"; import { geocodeAddress } from "../../lib/geocode"; import { toPublicEventDto } from "../../lib/event-dto";

function getDeepSeekKey(env?: { DEEPSEEK_API_KEY?: string }): string { return env?.DEEPSEEK_API_KEY ?? ""; }

interface EventRow { id: string; space_id: string; title: string; category: string; event_date: string; description: string; ai_summary: string | null; cover_photo_id: string | null; address: string; address_locked: number; public: number; latitude: number | null; longitude: number | null; created_at: string; updated_at: string; }

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const url = new URL(context.request.url); const spaceId = url.searchParams.get("spaceId");
    const db = context.env.DB!;

    // Public access: anonymous visitors can only list PUBLIC events (scrubbed)
    if (spaceId && !context.request.headers.get("Authorization")) {
      const result = await db.prepare("SELECT * FROM events WHERE space_id = ? AND visibility = 'public' ORDER BY event_date DESC").bind(spaceId).all<EventRow>();
      const enriched = await Promise.all((result.results ?? []).map(async (e) => {
        const pc = await db.prepare("SELECT COUNT(*) as count FROM photos WHERE event_id = ?").bind(e.id).first<{count:number}>();
        return { ...toPublicEventDto({...e, photoCount: pc?.count ?? 0}), photoCount: pc?.count ?? 0 };
      }));
      return json({ events: enriched });
    }

    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const targetSpaceId = spaceId ?? authResult.spaceId;
    // Authenticated non-owners: filter by visibility + scrub
    const isOwner = authResult.spaceId === targetSpaceId && authResult.role !== "viewer";
    const isPlatformOwner = authResult.role === "platform_owner";
    if (spaceId && !isOwner && !isPlatformOwner) {
      const result = await db.prepare("SELECT * FROM events WHERE space_id = ? AND visibility IN ('public','gate') ORDER BY event_date DESC").bind(targetSpaceId).all<EventRow>();
      const enriched = await Promise.all((result.results ?? []).map(async (e) => {
        const pc = await db.prepare("SELECT COUNT(*) as count FROM photos WHERE event_id = ?").bind(e.id).first<{count:number}>();
        return { ...toPublicEventDto({...e, photoCount: pc?.count ?? 0}), photoCount: pc?.count ?? 0 };
      }));
      return json({ events: enriched });
    }
    if (spaceId && !isPlatformOwner) { const spaceCheck = requireSpaceOwnership(authResult, spaceId); if (spaceCheck) return spaceCheck; }
    const result = await db.prepare("SELECT * FROM events WHERE space_id = ? ORDER BY event_date DESC").bind(targetSpaceId).all<EventRow>();
    const events = result.results ?? [];
    const enriched = await Promise.all(events.map(async (e) => {
      const pc = await db.prepare("SELECT COUNT(*) as count FROM photos WHERE event_id = ?").bind(e.id).first<{count:number}>();
      const cp = await db.prepare("SELECT storage_key FROM photos WHERE event_id = ? LIMIT 1").bind(e.id).first<{storage_key:string}>();
      return { id: e.id, spaceId: e.space_id, title: e.title, category: e.category, eventDate: e.event_date, description: e.description, aiSummary: e.ai_summary, coverPhotoId: e.cover_photo_id, coverPhotoUrl: cp?.storage_key ? `/api/media/photos/${cp.storage_key}` : null, photoCount: pc?.count ?? 0, address: e.address || "", addressLocked: e.address_locked === 1, public: e.public !== 0, latitude: e.latitude, longitude: e.longitude, createdAt: e.created_at, updatedAt: e.updated_at };
    }));
    return json({ events: enriched });
  } catch (err) { console.error("List events error:", err); return json({ error: "Something went wrong" }, 500); }
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string; DEEPSEEK_API_KEY?: string } }): Promise<Response> {
  try {
    const authResult = await requireAuth(context.request, context.env); if (authResult instanceof Response) return authResult;
    const roleCheck = requireRole(authResult, "staff"); if (roleCheck) return roleCheck;
    const body = await context.request.json() as { title: string; category: string; eventDate: string; description: string; address?: string; visibility?: string };
    if (!body.title || !body.category || !body.eventDate) return json({ error: "Title, category, and event date are required" }, 400);
    const VALID = ["holiday","birthday","graduation","wedding","celebration","sports","school","travel","vacation","work","restaurant","party","family","kids","parents","other"];
    if (!VALID.includes(body.category)) return json({ error: "Invalid category" }, 400);
    const db = context.env.DB!; const eventId = crypto.randomUUID(); const now = new Date().toISOString();
    // Geocode address if provided
    let lat: number | null = null; let lng: number | null = null;
    if (body.address && body.address.trim()) {
      const geo = await geocodeAddress(body.address);
      if (geo) { lat = geo.lat; lng = geo.lng; }
    }

    const vis = (body.visibility === "public" || body.visibility === "gate") ? body.visibility : "private";
    const legacyPublic = vis === "public" ? 1 : 0;
    await db.prepare("INSERT INTO events (id, space_id, title, category, event_date, description, address, latitude, longitude, visibility, public) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(eventId, authResult.spaceId, body.title, body.category, body.eventDate, body.description ?? "", body.address ?? "", lat, lng, vis, legacyPublic).run();
    if (body.description && body.description.trim().length >= 10) {
      generateSummary(body.description, body.title, body.category, getDeepSeekKey(context.env)).then(async (summary) => { if (summary) await db.prepare("UPDATE events SET ai_summary = ? WHERE id = ?").bind(summary, eventId).run(); }).catch(() => {});
    }
    return json({ event: { id: eventId, spaceId: authResult.spaceId, title: body.title, category: body.category, eventDate: body.eventDate, description: body.description ?? "", aiSummary: null, coverPhotoId: null, coverPhotoUrl: null, photoCount: 0, createdAt: now, updatedAt: now } }, 201);
  } catch (err) { console.error("Create event error:", err); return json({ error: "Something went wrong" }, 500); }
}
