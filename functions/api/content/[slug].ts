/** Git-backed content API — serves + saves client site content with version history */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";

interface SiteContent {
  slug: string; name: string; template?: string; blocks: unknown;
  updatedAt: string; updatedBy?: string;
}

// GET /api/content/:slug — serve content (public, cached)
export async function onRequestGet(context: {
  request: Request; env: { DB?: D1Database; GITHUB_API_KEY?: string };
  params: { slug: string };
}): Promise<Response> {
  const { slug } = context.params;
  try {
    // Read from D1 first (fast), fall back to content_versions
    const site = await context.env.DB!.prepare(
      "SELECT cs.slug, cs.name, cs.gallery_config, cs.content, cs.updated_at FROM client_sites cs WHERE cs.slug = ? AND cs.published = 1 AND cs.deleted_at IS NULL"
    ).bind(slug).first() as any;

    if (!site) return json({ error: "Not found" }, 404);

    let blocks: unknown[] = [];
    try { const c = JSON.parse(site.content || "{}"); blocks = c.blocks || []; } catch {}

    return json({
      slug: site.slug, name: site.name,
      template: (() => { try { return JSON.parse(site.gallery_config || "{}").template; } catch { return ""; } })(),
      blocks, updatedAt: site.updated_at,
    });
  } catch (err) {
    return json({ error: "Failed to load content" }, 500);
  }
}

// PUT /api/content/:slug — save content with version tracking
export async function onRequestPut(context: {
  request: Request; env: { DB?: D1Database; GITHUB_API_KEY?: string; JWT_SECRET?: string };
  params: { slug: string };
}): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const { slug } = context.params;
  try {
    const body = await context.request.json() as { name: string; blocks: unknown[]; template?: string };

    // Verify this photographer owns the client site
    const site = await context.env.DB!.prepare(
      "SELECT id, content FROM client_sites WHERE slug = ? AND photographer_id = ? AND deleted_at IS NULL"
    ).bind(slug, a.userId).first<{ id: string; content: string }>();

    if (!site) return json({ error: "Client site not found or access denied" }, 404);

    const now = new Date().toISOString();
    const contentJson = JSON.stringify({ blocks: body.blocks });

    // Save to D1
    await context.env.DB!.prepare(
      "UPDATE client_sites SET content = ?, updated_at = ? WHERE id = ?"
    ).bind(contentJson, now, site.id).run();

    // Record version in content_versions
    const versionId = crypto.randomUUID();
    const previousContent = site.content || "{}";
    await context.env.DB!.prepare(
      `INSERT INTO content_versions (id, slug, content, previous_content, updated_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).bind(versionId, slug, contentJson, previousContent, a.userId, now).run();

    // Update template if provided
    if (body.template && context.env.DB) {
      const gc = JSON.stringify({ template: body.template });
      await context.env.DB!.prepare("UPDATE client_sites SET gallery_config = ? WHERE id = ?").bind(gc, site.id).run();
    }

    // Git sync: commit to GitHub repo (best-effort, non-blocking)
    if (context.env.GITHUB_API_KEY) {
      const githubSync = githubCommitFile(slug, contentJson, `content: update ${slug}`, context.env.GITHUB_API_KEY);
      context.request.signal.addEventListener("abort", () => {}); // fire-and-forget
      void githubSync;
    }

    return json({ success: true, version: versionId, updatedAt: now });
  } catch (err) {
    console.error("Content save error:", err);
    return json({ error: "Failed to save content" }, 500);
  }
}

// GET /api/content/:slug/versions — version history
export async function onRequestGet_versions(context: {
  request: Request; env: { DB?: D1Database };
  params: { slug: string };
}): Promise<Response> {
  const { slug } = context.params;
  try {
    const rows = await context.env.DB!.prepare(
      "SELECT id, created_at, updated_by FROM content_versions WHERE slug = ? ORDER BY created_at DESC LIMIT 50"
    ).bind(slug).all();

    const versions = (rows.results || []).map((r: any) => ({
      hash: r.id, date: r.created_at, author: r.updated_by || "unknown",
      message: `Update ${slug}`,
    }));

    return json({ versions });
  } catch {
    return json({ versions: [] });
  }
}

// Helper: commit a file to GitHub via API (fire-and-forget)
async function githubCommitFile(path: string, content: string, message: string, token: string): Promise<void> {
  try {
    const repo = "Cicero789/photo";
    const branch = "main";
    const url = `https://api.github.com/repos/${repo}/contents/content/sites/${path}.json`;

    // Get current file SHA (if exists)
    const existing = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" },
    });
    const existingData = existing.ok ? await existing.json() as any : null;
    const sha = existingData?.sha;

    // Put new content
    const body: Record<string, string> = {
      message,
      content: btoa(unescape(encodeURIComponent(content))),
      branch,
    };
    if (sha) body.sha = sha;

    await fetch(url, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error("GitHub sync failed:", err);
  }
}
