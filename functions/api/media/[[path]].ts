/**
 * GET /api/media/photos/<storage_key>  → PHOTOS bucket
 * GET /api/media/videos/<storage_key>  → VIDEOS bucket
 *
 * Serves uploaded R2 objects. This route is intentionally public: images load
 * via <img> tags which cannot send the Authorization header. Storage keys are
 * UUID-based ({spaceId}/{eventId}/{photoId}.jpg) and not enumerable.
 * Supports Range requests so <video> seeking works in all browsers.
 */

export async function onRequestGet(context: {
  request: Request;
  env: { PHOTOS?: R2Bucket; VIDEOS?: R2Bucket };
  params: { path: string[] };
}): Promise<Response> {
  const segments = context.params.path;
  if (!Array.isArray(segments) || segments.length < 2) {
    return new Response("Not found", { status: 404 });
  }

  const kind = segments[0];
  const key = segments.slice(1).join("/");
  const bucket = kind === "photos" ? context.env.PHOTOS : kind === "videos" ? context.env.VIDEOS : undefined;
  if (!bucket || !key) {
    return new Response("Not found", { status: 404 });
  }

  const rangeHeader = context.request.headers.get("Range");
  const range = parseRange(rangeHeader);

  const object = range
    ? await bucket.get(key, { range })
    : await bucket.get(key);
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
