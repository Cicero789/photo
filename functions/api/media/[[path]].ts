/**
 * GET /api/media/photos/<storage_key>  → PHOTOS bucket
 * GET /api/media/videos/<storage_key>  → VIDEOS bucket
 *
 * Serves uploaded R2 objects with authorization checks.
 * Access requires one of:
 *   1. A valid signed URL (expires + sig query params)
 *   2. The media belonging to a public/gate event (anonymous OK)
 *   3. An authenticated user who owns the media's space
 * Storage keys not found in event media are checked against album_photos and
 * photographer_portfolio; unknown keys are rejected with 403.
 * Supports Range requests so <video> seeking works in all browsers.
 */

import { verifyMediaSignature } from "../../lib/signed-url";
import { requireAuth } from "../../lib/auth";
import { canReadEvent } from "../../lib/event-access";

export async function onRequestGet(context: {
  request: Request;
  env: { PHOTOS?: R2Bucket; VIDEOS?: R2Bucket; DB?: D1Database; JWT_SECRET?: string; MEDIA_SIGNING_SECRET?: string; ENVIRONMENT?: string };
  params: { path: string[] };
}): Promise<Response> {
  const segments = context.params.path;
  if (!Array.isArray(segments) || segments.length < 2) {
    return new Response("Not found", { status: 404 });
  }

  const kind = segments[0];
  const storageKey = segments.slice(1).join("/");
  const bucket = kind === "photos" ? context.env.PHOTOS : kind === "videos" ? context.env.VIDEOS : undefined;
  if (!bucket || !storageKey) {
    return new Response("Not found", { status: 404 });
  }

  // --- Authorization check ---
  let isPublic = false;
  const url = new URL(context.request.url);
  const expires = url.searchParams.get("expires");
  const sig = url.searchParams.get("sig");

  if (expires && sig) {
    // Signed URL access
    const secret = context.env.MEDIA_SIGNING_SECRET || context.env.JWT_SECRET;
    if (!secret) return new Response(JSON.stringify({ error: "Service unavailable" }), { status: 503 });
    const valid = await verifyMediaSignature(storageKey, sig, expires, secret);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid or expired link" }), { status: 403, headers: { "Content-Type": "application/json" } });
  } else {
    // Must be authenticated OR media must be in a public/gate event
    const db = context.env.DB;
    if (!db) return new Response(JSON.stringify({ error: "Service unavailable" }), { status: 503, headers: { "Content-Type": "application/json" } });
    const table = kind === "photos" ? "photos" : "videos";
    const media = await db.prepare(`SELECT m.space_id, e.visibility FROM ${table} m JOIN events e ON m.event_id = e.id WHERE m.storage_key = ? AND m.deleted_at IS NULL AND e.deleted_at IS NULL`).bind(storageKey).first<{ space_id: string; visibility: string }>();
    if (media) {
      // Determine actor from auth token (anonymous if no valid token)
      let actor: { userId: string; spaceId: string; role: string } | null = null;
      try {
        const a = await requireAuth(context.request, context.env);
        if (!(a instanceof Response)) {
          actor = { userId: a.userId, spaceId: a.spaceId, role: a.role };
        }
      } catch {}

      // Use centralized canReadEvent policy — fail closed
      const eventAccess = { id: "", space_id: media.space_id, visibility: media.visibility };
      if (!canReadEvent(actor, eventAccess)) {
        return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
      }
      if (media.visibility === "public") {
        isPublic = true;
      }
    } else {
      // Check album_photos
      const albumPhoto = await db.prepare("SELECT album_id FROM album_photos WHERE storage_key = ?").bind(storageKey).first() as any;
      if (albumPhoto) {
        // Password-protected albums require signed URL
        const album = await db.prepare("SELECT password FROM albums WHERE id = ?").bind(albumPhoto.album_id).first() as any;
        if (album?.password) {
          // Password-protected — must use signed URL (checked above, would have passed)
          return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
        // No password — share link is sufficient, allow access
      } else {
        // Check photographer_portfolio
        const portfolioPhoto = await db.prepare("SELECT photographer_id FROM photographer_portfolio WHERE storage_key = ?").bind(storageKey).first();
        if (portfolioPhoto) {
          // allow — portfolio is public
          isPublic = true;
        } else {
          // Check client gallery photos
          const cgp = await db.prepare(
            `SELECT cgp.storage_key, cs.published, cs.photographer_id, cs.deleted_at as site_deleted,
                    cg.deleted_at as gallery_deleted
             FROM client_gallery_photos cgp
             JOIN client_galleries cg ON cg.id = cgp.gallery_id
             JOIN client_sites cs ON cs.id = cg.client_site_id
             WHERE cgp.storage_key = ?`
          ).bind(storageKey).first() as any;

          if (cgp) {
            if (cgp.site_deleted || cgp.gallery_deleted) {
              return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
            }
            // Public if published, private if draft (owner only)
            if (cgp.published === 1) {
              isPublic = true;
            } else {
              const a = await requireAuth(context.request, context.env);
              if (a instanceof Response) return a;
              if (a.userId !== cgp.photographer_id) {
                return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
              }
            }
          } else {
            // Unknown key — reject
            return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
          }
        }
      }
    }
  }

  // --- Serve the R2 object ---

  const rangeHeader = context.request.headers.get("Range");
  const range = parseRange(rangeHeader);

  const object = range
    ? await bucket.get(storageKey, { range })
    : await bucket.get(storageKey);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", object.httpMetadata?.contentType ?? (kind === "videos" ? "video/webm" : "image/jpeg"));
  headers.set("Cache-Control", isPublic
    ? "public, max-age=31536000, immutable"
    : "private, no-store");
  headers.set("Accept-Ranges", "bytes");
  headers.set("ETag", object.httpEtag);

  if (range) {
    const end = range.offset + (range.length ?? object.size - range.offset) - 1;
    headers.set("Content-Range", `bytes ${range.offset}-${end}/${object.size}`);
    headers.set("Content-Length", String(end - range.offset + 1));
    return new Response(object.body, { status: 206, headers });
  }

  headers.set("Content-Length", String(object.size));
  return new Response(object.body, { status: 200, headers });
}

function parseRange(header: string | null): { offset: number; length?: number } | null {
  if (!header) return null;
  const match = header.match(/^bytes=(\d+)-(\d*)$/);
  if (!match || !match[1]) return null;
  const offset = parseInt(match[1], 10);
  const endStr = match[2];
  if (endStr) {
    const end = parseInt(endStr, 10);
    if (end < offset) return null;
    return { offset, length: end - offset + 1 };
  }
  return { offset };
}
