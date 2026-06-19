import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Album {
  id: string;
  name: string;
  shareToken: string;
  downloads: number;
  expiresAt: string | null;
  viewCount: number;
  photoCount: number;
  createdAt: string;
}

export function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchAlbums = () => {
    setLoading(true);
    api.get<{ albums: Album[] }>("/albums").then(d => setAlbums(d.albums)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(fetchAlbums, []);

  const createAlbum = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      await api.post("/albums", { name: newName.trim() });
      setNewName("");
      setShowCreate(false);
      fetchAlbums();
    } catch {}
    setCreating(false);
  };

  const deleteAlbum = async (id: string) => {
    if (!confirm("Delete this album and all its photos?")) return;
    try {
      await api.delete(`/albums/${id}`);
      fetchAlbums();
    } catch {}
  };

  const uploadPhotos = async (albumId: string, files: FileList) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      try {
        await fetch(`/api/albums/${albumId}/photos`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: form,
        });
      } catch {}
    }
    setUploading(false);
    fetchAlbums();
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/album/${token}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(token);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Albums</h1>
          <p className="mt-1 text-sm text-neutral-500">Create shareable photo albums for your clients.</p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
          + New Album
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="mt-6 rounded-xl border border-border bg-white p-6">
          <h3 className="text-sm font-semibold text-neutral-900">New Album</h3>
          <div className="mt-3 flex gap-3">
            <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Johnson Wedding — Selects"
              autoFocus
              onKeyDown={e => e.key === "Enter" && createAlbum()}
              className="flex-1 rounded-lg border border-border px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
            <button onClick={createAlbum} disabled={creating || !newName.trim()}
              className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50">
              {creating ? "Creating…" : "Create"}
            </button>
            <button onClick={() => { setShowCreate(false); setNewName(""); }}
              className="rounded-lg border border-border px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Albums list */}
      {albums.length === 0 && !showCreate ? (
        <div className="mt-16 text-center">
          <p className="text-4xl text-neutral-300">📁</p>
          <p className="mt-3 text-sm text-neutral-500">No albums yet. Create one to start sharing photos.</p>
          <button onClick={() => setShowCreate(true)}
            className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
            Create Your First Album
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {albums.map(album => (
            <div key={album.id} className="rounded-xl border border-border bg-white shadow-sm">
              {/* Album header */}
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-lg">📁</div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-900 truncate">{album.name}</h3>
                    <p className="text-xs text-neutral-400">
                      {album.photoCount} photo{album.photoCount !== 1 ? "s" : ""} · {album.viewCount} view{album.viewCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => copyLink(album.shareToken)}
                    className={cn("rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      copied === album.shareToken
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-border text-neutral-600 hover:bg-neutral-50"
                    )}>
                    {copied === album.shareToken ? "✓ Copied" : "Copy Link"}
                  </button>
                  <button onClick={() => setExpanded(expanded === album.id ? null : album.id)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50">
                    {expanded === album.id ? "Close" : "Manage"}
                  </button>
                  <button onClick={() => deleteAlbum(album.id)}
                    className="rounded-lg px-2 py-1.5 text-xs text-neutral-400 hover:text-red-600">
                    ✕
                  </button>
                </div>
              </div>

              {/* Share link bar */}
              <div className="border-t border-border px-5 py-3 flex items-center gap-2">
                <span className="text-xs text-neutral-400">Share:</span>
                <code className="flex-1 rounded bg-neutral-50 px-3 py-1 text-xs text-neutral-600 font-mono truncate">
                  {window.location.origin}/album/{album.shareToken}
                </code>
              </div>

              {/* Expanded management */}
              {expanded === album.id && (
                <div className="border-t border-border p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-medium text-neutral-700">Photos</p>
                    <div>
                      <input ref={fileRef} type="file" multiple accept="image/*" className="hidden"
                        onChange={e => { if (e.target.files?.length) uploadPhotos(album.id, e.target.files); }} />
                      <button onClick={() => fileRef.current?.click()} disabled={uploading}
                        className="rounded-lg bg-neutral-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-50">
                        {uploading ? "Uploading…" : "+ Upload Photos"}
                      </button>
                    </div>
                  </div>
                  {album.photoCount === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-neutral-200 py-8 text-center">
                      <p className="text-sm text-neutral-400">Drop photos here or click Upload</p>
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400">{album.photoCount} photos uploaded. <a href={`/album/${album.shareToken}`} target="_blank" className="text-neutral-600 hover:text-neutral-900 underline">Preview album →</a></p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
