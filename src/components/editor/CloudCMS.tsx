/**
 * CloudCMS — Cloudflare-native visual CMS (TinaCMS alternative)
 * Works entirely server-side on Cloudflare Pages. No Node.js required.
 *
 * Left sidebar: collections (Sites, Posts) + file browser
 * Main area: content editor for the selected item
 * Backend: D1 + R2 + GitHub API (all Cloudflare-native)
 */
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { RichTextEditor } from "./RichTextEditor";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import type { ContentBlock } from "./types";

interface SiteItem {
  slug: string; name: string; template?: string; blocks?: ContentBlock[];
  published?: boolean; updatedAt: string;
}

interface PostItem {
  slug: string; title: string; siteSlug: string; body?: string;
  publishedAt?: string;
}

export function CloudCMS() {
  const [searchParams] = useSearchParams();
  const presetSite = searchParams.get("site") || "";
  const [collection, setCollection] = useState<"sites" | "posts">("sites");
  const [items, setItems] = useState<(SiteItem | PostItem)[]>([]);
  const [selected, setSelected] = useState<string | null>(presetSite || null);
  const [loading, setLoading] = useState(false);

  // Content state for selected item
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load collection items
  useEffect(() => {
    setLoading(true);
    api.get<{ sites?: SiteItem[]; posts?: PostItem[] }>(`/content?collection=${collection}`)
      .then(d => setItems(collection === "sites" ? (d.sites || []) : (d.posts || [])))
      .finally(() => setLoading(false));
  }, [collection]);

  // Load selected item content
  useEffect(() => {
    if (!selected) return;
    // Fetch full content for the selected site/post
    api.get<SiteItem>(`/content/${selected}`).then(d => {
      setName(d.name || "");
      setTemplate(d.template || "");
      setBlocks(d.blocks || []);
    }).catch(() => {});
  }, [selected]);

  const handleSave = async () => {
    setSaving(true); setMessage("");
    try {
      await api.put(`/content/${selected}`, { name, blocks, template });
      setMessage("Saved! Version recorded.");
      setTimeout(() => setMessage(""), 3000);
    } catch { setMessage("Save failed."); }
    setSaving(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Left Sidebar — Collection browser */}
      <div className="w-64 shrink-0 border-r border-border bg-neutral-50 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">Content</h2>
          <div className="mt-2 flex rounded-lg border border-border bg-white p-0.5">
            {(["sites", "posts"] as const).map(c => (
              <button key={c} onClick={() => { setCollection(c); setSelected(null); }}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                  collection === c ? "bg-primary-600 text-white" : "text-neutral-500 hover:text-neutral-700"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-neutral-400 py-4">Loading...</p>
        ) : (
          <>
            {collection === "sites" && (
              <a href="/clients" className="mb-3 block w-full rounded-lg border-2 border-dashed border-neutral-300 py-2 text-center text-xs font-medium text-neutral-500 hover:border-primary-300 hover:text-primary-600 transition-colors">
                + New Site
              </a>
            )}
            <ul className="space-y-0.5">
              {items.map(item => (
                <li key={item.slug}>
                  <button onClick={() => setSelected(item.slug)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selected === item.slug ? "bg-primary-50 text-primary-700 font-medium" : "text-neutral-600 hover:bg-neutral-100"
                    }`}>
                    <div className="flex items-center gap-1.5">
                      <p className="truncate flex-1">{item.slug}</p>
                      {"published" in item && !(item as SiteItem).published && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">Draft</span>
                      )}
                    </div>
                    <p className="truncate text-xs text-neutral-400">{"name" in item ? (item as SiteItem).name : (item as PostItem).title}</p>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Main Editor */}
      <div className="flex-1 overflow-y-auto p-6">
        {!selected ? (
          <div className="flex h-full items-center justify-center text-neutral-400">
            <div className="text-center">
              <p className="text-5xl mb-4">📝</p>
              <p className="text-lg">Select a {collection === "sites" ? "site" : "post"} from the left panel</p>
              <p className="text-sm mt-1">Content auto-versions on every save</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{selected}</h1>
                <p className="text-sm text-neutral-500">{collection === "sites" ? "Client Site" : "Blog Post"}</p>
              </div>
              <button onClick={handleSave} disabled={saving}
                className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            {message && (
              <div className={`mb-4 rounded-lg px-4 py-2 text-sm ${message.includes("failed") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Name</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
              </div>
              {collection === "sites" && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Template</label>
                  <select value={template} onChange={e => setTemplate(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm">
                    <option value="">Choose a template...</option>
                    {TEMPLATE_REGISTRY.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                    ))}
                  </select>
                </div>
              )}

              {collection === "sites" && (
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="mb-3 text-sm font-medium text-neutral-700">Page Content</p>
                  <SimpleBlockList blocks={blocks} onChange={setBlocks} />
                </div>
              )}

              {collection === "posts" && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700">Body</label>
                  <div className="mt-1">
                    <RichTextEditor
                      content={blocks?.[0]?.type === "text" ? (blocks[0].data as any).html || "" : ""}
                      onChange={html => setBlocks([{ id: "body", type: "text", data: { html } }])}
                      minHeight="400px" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple block list for site content (text blocks only for simplicity)
function SimpleBlockList({ blocks, onChange }: { blocks: ContentBlock[]; onChange: (b: ContentBlock[]) => void }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => (
        <div key={block.id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 uppercase">{block.type}</span>
            <button onClick={() => onChange(blocks.filter((_, j) => j !== i))}
              className="text-xs text-red-400 hover:text-red-600">Remove</button>
          </div>
          {block.type === "text" && (
            <RichTextEditor
              content={(block.data as any).html || ""}
              onChange={html => {
                const next = [...blocks];
                next[i] = { ...block, data: { ...block.data, html } };
                onChange(next);
              }}
              minHeight="120px" />
          )}
          {block.type === "hero" && (
            <input value={(block.data as any).heading || ""} placeholder="Heading"
              onChange={e => {
                const next = [...blocks];
                next[i] = { ...block, data: { ...block.data, heading: e.target.value } };
                onChange(next);
              }}
              className="w-full rounded border border-neutral-200 px-3 py-2 text-sm" />
          )}
        </div>
      ))}
      <button onClick={() => onChange([...blocks, { id: crypto.randomUUID(), type: "text", data: { html: "<p>New block...</p>" } }])}
        className="w-full rounded-lg border-2 border-dashed border-neutral-300 py-2 text-xs font-medium text-neutral-500 hover:border-neutral-400 hover:text-neutral-700">
        + Add Text Block
      </button>
    </div>
  );
}
