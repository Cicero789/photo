import { useState, useEffect, useCallback, type FormEvent } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface AdTile {
  id: string;
  imageUrl: string | null;
  linkUrl: string | null;
  message: string | null;
  position: number;
  active: boolean;
  createdAt: string;
}

export function AdminAdsPage() {
  const { user } = useAuth();
  const [ads, setAds] = useState<AdTile[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<AdTile | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [form, setForm] = useState({
    imageUrl: "",
    linkUrl: "",
    message: "",
    active: true,
  });

  const fetchAds = useCallback(async () => {
    try {
      const data = await api.get<{ ads: AdTile[] }>("/admin/ads");
      setAds(data.ads);
    } catch { /* */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAds(); }, [fetchAds]);

  const resetForm = () => {
    setForm({ imageUrl: "", linkUrl: "", message: "", active: true });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (ad: AdTile) => {
    setEditing(ad);
    setForm({
      imageUrl: ad.imageUrl ?? "",
      linkUrl: ad.linkUrl ?? "",
      message: ad.message ?? "",
      active: ad.active,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      if (editing) {
        await api.put("/admin/ads", { id: editing.id, ...form });
        setMessage({ type: "success", text: "Ad updated!" });
      } else {
        await api.post("/admin/ads", form);
        setMessage({ type: "success", text: "Ad created!" });
      }
      resetForm();
      fetchAds();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (adId: string) => {
    if (!confirm("Delete this ad tile?")) return;
    try {
      await api.delete(`/admin/ads?id=${adId}`);
      fetchAds();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  const handleToggle = async (ad: AdTile) => {
    try {
      await api.put("/admin/ads", { id: ad.id, active: !ad.active });
      fetchAds();
    } catch { /* */ }
  };

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-700">Access denied</h2>
          <p className="mt-2 text-neutral-500">Platform owner access required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Ad Tiles</h1>
          <p className="mt-1 text-sm text-neutral-500">
            These appear every 9th tile in event grids. Clickable images or messages.
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
        >
          + New ad
        </button>
      </div>

      {/* Info banner */}
      <div className="mb-8 rounded-xl bg-accent-50 border border-accent-200 px-5 py-3 text-sm text-accent-800">
        💡 Ads are injected automatically. Ad #1 appears at tile position 9, ad #2 at position 18, ad #3 at position 27, and so on. Order by position.
      </div>

      {message && (
        <div className={cn(
          "mb-6 rounded-lg border px-4 py-3 text-sm",
          message.type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700",
        )}>
          {message.text}
        </div>
      )}

      {/* Create/Edit Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            {editing ? "Edit ad tile" : "Create ad tile"}
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Image URL</label>
                <input type="url" value={form.imageUrl}
                  onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://example.com/ad.jpg"
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700">Link URL</label>
                <input type="url" value={form.linkUrl}
                  onChange={(e) => setForm((f) => ({ ...f, linkUrl: e.target.value }))}
                  placeholder="https://sponsor.com"
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Message</label>
              <input type="text" value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Check out our sponsor!"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active}
                  onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="rounded border-border text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-neutral-700">Active</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                {saving ? "Saving..." : editing ? "Update ad" : "Create ad"}
              </button>
              <button type="button" onClick={resetForm}
                className="rounded-lg border border-border bg-white px-5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ads list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" role="status" aria-label="Loading" />
        </div>
      ) : ads.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 py-16 text-center">
          <span className="text-4xl">📢</span>
          <p className="mt-4 text-neutral-400">No ad tiles yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ads.map((ad) => (
            <div key={ad.id}
              className={cn(
                "flex items-center gap-4 rounded-xl border p-4",
                ad.active ? "bg-white border-border" : "bg-neutral-50 border-neutral-200 opacity-60",
              )}>
              {/* Preview */}
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt="" className="h-16 w-24 rounded-lg object-cover" />
              ) : (
                <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-accent-100 text-xl">📢</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-600">
                    Position {ad.position}
                  </span>
                  <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-bold text-neutral-500">
                    Tile #{ad.position * 9}
                  </span>
                  {!ad.active && (
                    <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">Inactive</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-neutral-700 truncate">
                  {ad.message ?? (ad.imageUrl ? "Image ad" : "No content")}
                </p>
                {ad.linkUrl && (
                  <p className="text-xs text-neutral-400 truncate">{ad.linkUrl}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleToggle(ad)}
                  className={cn("rounded-lg px-2 py-1 text-xs font-medium",
                    ad.active ? "text-neutral-500 hover:bg-neutral-100" : "text-emerald-600 hover:bg-emerald-50")}>
                  {ad.active ? "Disable" : "Enable"}
                </button>
                <button onClick={() => handleEdit(ad)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-primary-600 hover:bg-primary-50">
                  Edit
                </button>
                <button onClick={() => handleDelete(ad.id)}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-red-500 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
