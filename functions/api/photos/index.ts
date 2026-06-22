/**
 * GET /api/photos?spaceId=X&hasLocation=true
 * Lists photos for a space, optionally filtered to only geotagged.
 */

import { requireAuth, requireSpaceOwnership } from "../../lib/auth";
import { json } from "../../lib/response";

export async function onRequestGet(context: {
  request: Request;
  env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string };
}): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const spaceId = url.searchParams.get("spaceId");
    const hasLocation = url.searchParams.get("hasLocation") === "true";

    const authResult = await requireAuth(context.request, context.env);
    if (authResult instanceof Response) return authResult;

    const targetSpaceId = spaceId ?? authResult.spaceId;
    if (spaceId) {
      const spaceCheck = requireSpaceOwnership(authResult, spaceId);
      if (spaceCheck) return spaceCheck;
    }

    const db = context.env.DB!;
    let query = "SELECT * FROM photos WHERE space_id = ? AND deleted_at IS NULL";
    if (hasLocation) query += " AND latitude IS NOT NULL AND longitude IS NOT NULL";
    query += " ORDER BY created_at DESC LIMIT 500";

    const result = await db.prepare(query).bind(targetSpaceId).all();

    const photos = (result.results ?? []).map((p: Record<string, unknown>) => ({
      id: p.id,
      eventId: p.event_id,
      spaceId: p.space_id,
      originalFilename: p.original_filename,
      storageKey: p.storage_key,
      url: `/api/media/photos/${p.storage_key}`,
      width: p.width,
      height: p.height,
      fileSize: p.file_size,
      latitude: p.latitude ?? null,
      longitude: p.longitude ?? null,
      takenAt: p.taken_at ?? null,
      uploadedBy: p.uploaded_by,
      favorite: (p.favorite as number) === 1,
      createdAt: p.created_at,
    }));

    return json({ photos });
  } catch (err) {
    console.error("List photos error:", err);
    return json({ error: "Something went wrong" }, 500);
  }
}
