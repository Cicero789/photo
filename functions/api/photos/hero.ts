/** GET /api/photos/hero?spaceId= — shuffled photo URLs for hero backgrounds */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { signMediaUrl } from "../../lib/signed-url";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; MEDIA_SIGNING_SECRET?: string; JWT_SECRET?: string } }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const spaceId = url.searchParams.get("spaceId") || "";

    // Auth is optional — public spaces return public-event photos unsigned
    const authHeader = context.request.headers.get("Authorization");
    let actor: { spaceId: string } | null = null;
    if (authHeader?.startsWith("Bearer ")) {
      const a = await requireAuth(context.request, context.env);
      if (!(a instanceof Response)) actor = a;
    }

    const db = context.env.DB!;
    // Get up to 50 random photo storage keys from non-deleted photos in non-deleted events
    // If authenticated, include private/gate events for the user's space
    let visFilter = "e.visibility = 'public'";
    if (actor && spaceId && actor.spaceId === spaceId) {
      visFilter = "e.visibility IN ('public','gate','private')";
    }

    const rows = await db.prepare(
      `SELECT p.storage_key FROM photos p
       JOIN events e ON p.event_id = e.id
       WHERE e.space_id = ? AND ${visFilter}
       AND p.deleted_at IS NULL AND e.deleted_at IS NULL
       ORDER BY RANDOM() LIMIT 50`
    ).bind(spaceId || (actor?.spaceId || "")).all<{ storage_key: string }>();

    const secret = context.env.MEDIA_SIGNING_SECRET || context.env.JWT_SECRET || "";
    const urls = await Promise.all((rows.results || []).map(async (r) => {
      return secret ? await signMediaUrl(r.storage_key, secret, 3600) : `/api/media/photos/${r.storage_key}`;
    }));

    return json({ urls });
  } catch (err) { console.error("Hero photos error:", err); return json({ urls: [] }); }
}
