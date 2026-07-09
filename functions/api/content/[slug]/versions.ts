/** GET /api/content/:slug/versions[?restore=hash] — version history or restore */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";

export async function onRequestGet(context: {
  request: Request; env: { DB?: D1Database };
  params: { slug: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const url = new URL(context.request.url);
  const restoreHash = url.searchParams.get("restore");

  // Restore mode: return specific version content
  if (restoreHash) {
    try {
      const row = await context.env.DB!.prepare(
        "SELECT content FROM content_versions WHERE id = ? AND slug = ?"
      ).bind(restoreHash, context.params.slug).first<{ content: string }>();
      if (!row) return json({ error: "Version not found" }, 404);
      const parsed = JSON.parse(row.content);
      return json({ slug: context.params.slug, blocks: parsed.blocks || [], restoredFrom: restoreHash });
    } catch { return json({ error: "Failed to restore" }, 500); }
  }

  // List mode: return version history
  try {
    const rows = await context.env.DB!.prepare(
      "SELECT id, created_at, updated_by FROM content_versions WHERE slug = ? ORDER BY created_at DESC LIMIT 50"
    ).bind(context.params.slug).all();
    const versions = (rows.results || []).map((r: any) => ({
      hash: r.id, date: r.created_at, author: r.updated_by || "unknown",
      message: `Update ${context.params.slug}`,
    }));
    return json({ versions });
  } catch {
    return json({ versions: [] });
  }
}
