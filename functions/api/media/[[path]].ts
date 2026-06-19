/**
 * GET /api/media/photos/<storage_key>  → PHOTOS bucket
 * GET /api/media/videos/<storage_key>  → VIDEOS bucket
 *
 * Serves uploaded R2 objects with authorization checks.
 * Access requires one of:
 *   1. A valid signed URL (expires + sig query params)
 *   2. The media belonging to a public/gate event (anonymous OK)
 *   3. An authenticated user who owns the media's space
 * Storage keys not found in DB (album photos, portfolio, inspiration) are allowed through.
 * Supports Range requests so <video> seeking works in all browsers.
 */

import { verifyMediaSignature } from "../../lib/signed-url";
import { requireAuth } from "../../lib/auth";

export async function onRequestGet(context: {
  request: Request;
  env: { PHOTOS?: R2Bucket; VIDEOS?: R2Bucket; DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string };
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
  const url = new URL(context.request.url);
  const expires = url.searchParams.get("expires");
  const sig = url.searchParams.get("sig");

  if (expires && sig) {
    // Signed URL access
    const secret = context.env.JWT_SECRET || "";
    const valid = await verifyMediaSignature(storageKey, sig, expires, secret);
    if (!valid) return new Response(JSON.stringify({ error: "Invalid or expired link" }), { status: 403, headers: { "Content-Type": "application/json" } });
  } else {
    // Must be authenticated OR media must be in a public/gate event
    const db = context.env.DB;
    if (db) {
      const table = kind === "photos" ? "photos" : "videos";
      const media = await db.prepare(`SELECT m.space_id, e.visibility FROM ${table} m JOIN events e ON m.event_id = e.id WHERE m.storage_key = ?`).bind(storageKey).first<{ space_id: string; visibility: string }>();
      if (media) {
        if (media.visibility !== 'public' && media.visibility !== 'gate') {
          // Private media — require auth + space ownership
          const a = await requireAuth(context.request, context.env);
          if (a instanceof Response) return a;
          if (a.spaceId !== media.space_id) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: { "Content-Type": "application/json" } });
        }
      }
      // If media not found in DB (album photos, portfolio, inspiration), allow access
      // These are served via separate access-controlled endpoints
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
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
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
