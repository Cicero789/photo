import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { BlockEditor } from "@/components/editor/BlockEditor";
import { GrapesBuilder } from "@/components/editor/GrapesBuilder";
import type { ContentBlock } from "@/components/editor/types";
import { saveSiteContent, getContentVersions, restoreContentVersion } from "@/lib/git-content";

// ─── Types ───
interface ClientSiteData {
  id: string;
  name: string;
  slug: string;
  industry: string;
  customDomain: string | null;
  status: "published" | "draft";
  galleryConfig: string | null;
  content: any;
  bio: string;
  services: string;
  pricing: string;
  blogCount: number;
  galleryCount: number;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  status: "published" | "draft";
  publishedAt: string;
}

interface ClientGallery {
  id: string;
  name: string;
  description: string;
  coverUrl: string | null;
  photoCount: number;
}

type EditorTab = "content" | "photos" | "galleries" | "blog" | "domain" | "builder";

const TABS: { key: EditorTab; label: string }[] = [
  { key: "content", label: "Content" },
  { key: "builder", label: "Design Builder" },
  { key: "photos", label: "Photos" },
  { key: "galleries", label: "Galleries" },
  { key: "blog", label: "Blog" },
  { key: "domain", label: "Domain" },
];

// ─── Client Editor Page ───
export function ClientEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<ClientSiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<EditorTab>("content");
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Tab data states
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [customDomain, setCustomDomain] = useState("");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [galleries, setGalleries] = useState<ClientGallery[]>([]);

  const fetchClient = useCallback(async () => {
    try {
      const data = await api.get<{ client: ClientSiteData }>(`/clients/${id}`);
      setClient(data.client);
      setCustomDomain(data.client.customDomain || "");
      // Parse blocks from content JSON, fall back to legacy bio/services/pricing
      try {
        const content = typeof data.client.content === "string" ? JSON.parse(data.client.content || "{}") : (data.client.content || {});
        if (content.blocks?.length) setBlocks(content.blocks);
        else if (data.client.bio || data.client.services || data.client.pricing) {
          // Legacy migration: convert old text fields to blocks
          const legacy: ContentBlock[] = [];
          if (data.client.bio) legacy.push({ id: crypto.randomUUID(), type: "text", data: { html: data.client.bio } });
          if (data.client.services) legacy.push({ id: crypto.randomUUID(), type: "services", data: { items: [{ name: data.client.services, description: "", price: "" }] } });
          if (data.client.pricing) legacy.push({ id: crypto.randomUUID(), type: "pricing", data: { heading: "Pricing", items: [{ name: "Standard", price: data.client.pricing }] } });
          setBlocks(legacy);
        }
      } catch { setBlocks([]); }
    } catch {
      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => { fetchClient(); }, [fetchClient]);

  const fetchBlogs = useCallback(async () => {
    try {
      const data = await api.get<{ blogs: BlogPost[] }>(`/clients/${id}/blog`);
      setBlogs(data.blogs);
    } catch { /* ignore */ }
  }, [id]);

  const fetchGalleries = useCallback(async () => {
    try {
      const data = await api.get<{ galleries: ClientGallery[] }>(`/clients/${id}/galleries`);
      setGalleries(data.galleries);
    } catch { /* ignore */ }
  }, [id]);

  useEffect(() => {
    if (activeTab === "blog") fetchBlogs();
    if (activeTab === "galleries") fetchGalleries();
  }, [activeTab, fetchBlogs, fetchGalleries]);

  const saveContent = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await api.put(`/clients/${id}`, { content: JSON.stringify({ blocks }) });
      // Also save to git-backed content system for version history
      if (client) {
        const gc = typeof client.galleryConfig === "string" ? JSON.parse(client.galleryConfig || "{}") : (client.galleryConfig || {});
        saveSiteContent(client.slug, client.name, blocks, gc.template).catch(() => {});
      }
      setMessage({ type: "success", text: "Content saved! Version recorded." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const saveDomain = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await api.put(`/clients/${id}`, { customDomain });
      setMessage({ type: "success", text: "Domain saved!" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async () => {
    if (!client) return;
    const newPublished = client.status !== "published";
    setPublishing(true);
    setMessage(null);
    try {
      await api.put(`/clients/${id}`, { published: newPublished });
      setClient({ ...client, status: newPublished ? "published" : "draft" });
      setMessage({
        type: "success",
        text: newPublished ? "Site published — it's now live." : "Site unpublished — it's now a draft.",
      });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to update publish status" });
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  if (!client) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-2 text-sm font-medium text-neutral-500 hover:text-neutral-700"
          >
            ← Back to Dashboard
          </button>
          <h1 className="font-display text-2xl font-bold text-neutral-900">{client.name}</h1>
          <p className="mt-1 text-sm text-neutral-500">
            framenest.photos/{client.slug}
            {client.customDomain && (
              <span className="ml-2 text-primary-600">{client.customDomain}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
              client.status === "published"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            )}
          >
            {client.status}
          </span>
          <button
            onClick={togglePublish}
            disabled={publishing}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50",
              client.status === "published"
                ? "border border-border text-neutral-600 hover:bg-neutral-50"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            )}
          >
            {publishing ? "..." : client.status === "published" ? "Unpublish" : "Publish"}
          </button>
          <a
            href={`/${client.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            View Live ↗
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-border">
        <nav className="flex gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setMessage(null);
              }}
              className={cn(
                "pb-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab.key
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:text-neutral-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Message */}
      {message && (
        <div
          className={cn(
            "mb-6 rounded-lg border px-4 py-3 text-sm",
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          )}
        >
          {message.text}
        </div>
      )}

      {/* Tab Content */}
      <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
        {activeTab === "content" && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Page Builder</h3>
                <p className="text-sm text-neutral-500">Build your page with blocks. Changes go live when you save.</p>
              </div>
              <button onClick={saveContent} disabled={saving}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                {saving ? "Saving..." : "Save Page"}
              </button>
            </div>
            <BlockEditor blocks={blocks} onChange={setBlocks} galleries={galleries.map(g => ({ id: g.id, name: g.name, photoCount: g.photoCount }))} />
            {client && <VersionHistory slug={client.slug} onRestore={(restoredBlocks) => setBlocks(restoredBlocks)} />}
          </div>
        )}

        {activeTab === "photos" && (
          <PhotosTab clientId={id!} onUploaded={() => setMessage({ type: "success", text: "Photos uploaded!" })} />
        )}

        {activeTab === "galleries" && (
          <GalleriesTab
            clientId={id!}
            galleries={galleries}
            onRefresh={fetchGalleries}
          />
        )}

        {activeTab === "blog" && (
          <BlogTab
            clientId={id!}
            blogs={blogs}
            onRefresh={fetchBlogs}
          />
        )}

        {activeTab === "builder" && (
          <div className="rounded-xl border border-border bg-white overflow-hidden" style={{ minHeight: "70vh" }}>
            <GrapesBuilder clientId={id!} />
          </div>
        )}

        {activeTab === "domain" && (
          <DomainTab
            slug={client.slug}
            customDomain={customDomain}
            onChangeDomain={setCustomDomain}
            onSave={saveDomain}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}

interface ClientPhoto { storageKey: string; filename: string; url: string; sortOrder: number; galleryId: string; createdAt: string; }

// ─── Photos Tab ───
function PhotosTab({ clientId, onUploaded }: { clientId: string; onUploaded: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<{ id: string; file: File; preview: string }[]>([]);
  const [photos, setPhotos] = useState<ClientPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);

  const fetchPhotos = useCallback(async () => {
    setLoadingPhotos(true);
    try { const data = await api.get<{ photos: ClientPhoto[] }>(`/clients/${clientId}/photos`); setPhotos(data.photos); }
    finally { setLoadingPhotos(false); }
  }, [clientId]);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  const handleFiles = (files: FileList | File[]) => {
    const images = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newFiles = images.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setPreviewFiles((prev) => [...prev, ...newFiles]);
  };

  const handleUpload = async () => {
    if (previewFiles.length === 0) return;
    setUploading(true);
    try {
      const formData = new FormData();
      previewFiles.forEach((pf) => formData.append("photos", pf.file));
      const token = localStorage.getItem("photo_token");
      const res = await fetch(`/api/clients/${clientId}/photos`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      setPreviewFiles([]);
      await fetchPhotos();
      onUploaded();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (id: string) => {
    setPreviewFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-900">Photos</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Upload photos to the client's photo pool. These can be used across galleries.
      </p>

      {/* Drop zone */}
      <div
        className={cn(
          "mt-6 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
          dragOver ? "border-primary-500 bg-primary-50/50" : "border-neutral-300 bg-neutral-50"
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => document.getElementById("client-photo-input")?.click()}
      >
        <p className="text-3xl">📁</p>
        <p className="mt-2 text-sm font-medium text-neutral-700">
          Drag and drop photos here
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          or click to browse files
        </p>
        <input
          id="client-photo-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Preview */}
      {previewFiles.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-500">{previewFiles.length} photo{previewFiles.length !== 1 ? "s" : ""} selected</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload all"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {previewFiles.map((pf) => (
              <div key={pf.id} className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <img src={pf.preview} alt="" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeFile(pf.id)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing photos grid */}
      {loadingPhotos ? (
        <p className="mt-6 text-center text-sm text-neutral-400">Loading photos...</p>
      ) : photos.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-neutral-700">{photos.length} photo{photos.length !== 1 ? "s" : ""} in pool</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((photo) => (
              <div key={photo.storageKey} className="overflow-hidden rounded-lg border border-border bg-white">
                <div className="aspect-square bg-neutral-100">
                  <img src={photo.url} alt={photo.filename || ""} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="truncate px-2 py-1.5 text-xs text-neutral-500">{photo.filename || "Photo"}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No photos message */}
      {!loadingPhotos && photos.length === 0 && previewFiles.length === 0 && (
        <p className="mt-6 text-center text-sm text-neutral-400">
          No photos uploaded yet. Drag and drop above to get started.
        </p>
      )}
    </div>
  );
}

// ─── Galleries Tab ───
function GalleriesTab({
  clientId,
  galleries,
  onRefresh,
}: {
  clientId: string;
  galleries: ClientGallery[];
  onRefresh: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await api.post(`/clients/${clientId}/galleries`, form);
      setForm({ name: "", description: "" });
      setShowForm(false);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create gallery");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (galleryId: string) => {
    if (!confirm("Delete this gallery? All photos will be unlinked but not deleted.")) return;
    try {
      await api.delete(`/clients/${clientId}/galleries/${galleryId}`);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete gallery");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Galleries</h3>
          <p className="mt-1 text-sm text-neutral-500">
            {galleries.length} gallerie{galleries.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          {showForm ? "Cancel" : "+ New Gallery"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="mt-6 rounded-xl border border-border bg-neutral-50 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Gallery name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ceremony photos"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Description (optional)</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Photos from the ceremony"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {saving ? "Creating..." : "Create gallery"}
          </button>
        </form>
      )}

      {/* Gallery list */}
      <div className="mt-6 space-y-3">
        {galleries.length === 0 && !showForm && (
          <p className="py-8 text-center text-sm text-neutral-400">
            No galleries yet. Create one to organize photos for your client.
          </p>
        )}
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className="flex items-center justify-between rounded-lg border border-border bg-white p-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100">
                {gallery.coverUrl ? (
                  <img src={gallery.coverUrl} alt="" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="text-xl">🖼️</span>
                )}
              </div>
              <div>
                <p className="font-medium text-neutral-900">{gallery.name}</p>
                {gallery.description && (
                  <p className="text-xs text-neutral-500">{gallery.description}</p>
                )}
                <p className="text-xs text-neutral-400">{gallery.photoCount} photos</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(gallery.id)}
              className="text-xs font-medium text-red-500 transition-colors hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Blog Tab ───
function BlogTab({
  clientId,
  blogs,
  onRefresh,
}: {
  clientId: string;
  blogs: BlogPost[];
  onRefresh: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/clients/${clientId}/blog/${editingId}`, form);
      } else {
        await api.post(`/clients/${clientId}/blog`, form);
      }
      setForm({ title: "", slug: "", excerpt: "", content: "" });
      setShowForm(false);
      setEditingId(null);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      await api.delete(`/clients/${clientId}/blog/${blogId}`);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete blog post");
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">Blog posts</h3>
          <p className="mt-1 text-sm text-neutral-500">
            {blogs.length} post{blogs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setForm({ title: "", slug: "", excerpt: "", content: "" });
            setShowForm(!showForm);
          }}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
        >
          {showForm && !editingId ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-border bg-neutral-50 p-6">
          <h4 className="text-sm font-semibold text-neutral-700">
            {editingId ? "Edit post" : "New blog post"}
          </h4>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setForm((f) => ({
                    ...f,
                    title,
                    slug: !editingId ? generateSlug(title) : f.slug,
                  }));
                }}
                placeholder="Our wedding story"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))
                }
                placeholder="our-wedding-story"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Excerpt</label>
              <input
                type="text"
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="A short summary of this post..."
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={10}
                placeholder="Write your blog post content here..."
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100 resize-y"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : editingId ? "Update post" : "Create post"}
          </button>
        </form>
      )}

      {/* Blog list */}
      <div className="mt-6 space-y-3">
        {blogs.length === 0 && !showForm && (
          <p className="py-8 text-center text-sm text-neutral-400">
            No blog posts yet. Create one to share updates with the client's audience.
          </p>
        )}
        {blogs.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-lg border border-border bg-white p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="font-medium text-neutral-900 truncate">{post.title}</p>
              <p className="text-xs text-neutral-500">
                /{post.slug} ·{" "}
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase",
                  post.status === "published"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                )}
              >
                {post.status}
              </span>
              <button
                onClick={() => handleEdit(post)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-xs font-medium text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Domain Tab ───
function DomainTab({
  slug,
  customDomain,
  onChangeDomain,
  onSave,
  saving,
}: {
  slug: string;
  customDomain: string;
  onChangeDomain: (v: string) => void;
  onSave: (e: FormEvent) => void;
  saving: boolean;
}) {
  return (
    <form onSubmit={onSave}>
      <h3 className="text-lg font-semibold text-neutral-900">Domain settings</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Set a custom domain for this client site. The default URL will always work.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Default URL</label>
          <div className="mt-1 rounded-lg border border-border bg-neutral-50 px-3 py-2.5">
            <span className="text-sm text-neutral-600">
              framenest.photos/<span className="font-medium text-neutral-900">{slug}</span>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700">Custom domain</label>
          <input
            type="text"
            value={customDomain}
            onChange={(e) => onChangeDomain(e.target.value)}
            placeholder="photos.myclient.com"
            className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
          />
          <p className="mt-1 text-xs text-neutral-400">
            Enter the full domain without http:// or https://
          </p>
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 space-y-1">
          <p className="font-semibold">Setup instructions:</p>
          <p>
            1. In your DNS provider, add a <strong>CNAME</strong> record pointing to{" "}
            <code className="bg-amber-100 px-1 rounded">photo-ll2.pages.dev</code>
          </p>
          <p>
            2. In Cloudflare Dashboard, add the custom domain to the Pages project.
          </p>
          <p>3. Wait 1-2 minutes for SSL to provision.</p>
        </div>

        <div className="mt-2">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View live site →
          </a>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save domain"}
        </button>
      </div>
    </form>
  );
}

// ─── Version History Panel ───
function VersionHistory({ slug, onRestore }: { slug: string; onRestore: (blocks: ContentBlock[]) => void }) {
  const [versions, setVersions] = useState<Array<{ hash: string; date: string; author: string; message: string }>>([]);
  const [open, setOpen] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);

  useEffect(() => {
    if (open) getContentVersions(slug).then(setVersions);
  }, [open, slug]);

  const handleRestore = async (hash: string) => {
    setRestoring(hash);
    const restored = await restoreContentVersion(slug, hash);
    if (restored?.blocks) { onRestore(restored.blocks); }
    setRestoring(null);
  };

  return (
    <div className="mt-8 border-t border-border pt-6">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900">
        {open ? "▼" : "▶"} Version History ({versions.length})
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          {versions.length === 0 && <p className="text-sm text-neutral-400">No versions yet. Versions are created on each save.</p>}
          {versions.map(v => (
            <div key={v.hash} className="flex items-center justify-between rounded-lg border border-border bg-neutral-50 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-neutral-700">{new Date(v.date).toLocaleString()}</p>
                <p className="text-xs text-neutral-400">{v.hash.slice(0, 8)}</p>
              </div>
              <button onClick={() => handleRestore(v.hash)} disabled={restoring === v.hash}
                className="rounded bg-white px-3 py-1 text-xs font-medium text-neutral-600 border border-neutral-200 hover:bg-neutral-100 disabled:opacity-50">
                {restoring === v.hash ? "Restoring..." : "Restore"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
