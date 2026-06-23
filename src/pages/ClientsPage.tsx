import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// ─── Types ───
interface ClientSite {
  id: string;
  name: string;
  slug: string;
  industry: string;
  customDomain: string | null;
  status: "published" | "draft";
  blogCount: number;
  galleryCount: number;
}

const INDUSTRIES = [
  "Photography", "Videography", "Wedding", "Beauty", "Fashion",
  "Real Estate", "Restaurant", "Fitness", "Medical", "Legal",
  "Marketing", "Tech", "Education", "Music", "Art",
  "Childcare", "Home Services", "Coaching", "Retail", "Events",
];

// ─── Clients Page ───
export function ClientsPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "Photography", slug: "", customDomain: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await api.get<{ clients: ClientSite[] }>("/clients");
      setClients(data.clients);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchClients(); }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Client name is required."); return; }
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    setSaving(true);
    try {
      await api.post("/clients", form);
      setShowNewModal(false);
      setForm({ name: "", industry: "Photography", slug: "", customDomain: "" });
      await fetchClients();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create client site");
    } finally { setSaving(false); }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-neutral-900">My Clients</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {clients.length > 0
              ? `${clients.length} client site${clients.length !== 1 ? "s" : ""}`
              : "Create beautiful sites for your photography clients"}
          </p>
        </div>
        <button
          onClick={() => { setError(""); setShowNewModal(true); }}
          className="rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 active:bg-neutral-950"
        >
          + New Client Site
        </button>
      </div>

      {/* Client Grid */}
      {clients.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white p-12 text-center">
          <p className="text-5xl">📸</p>
          <h3 className="mt-4 text-lg font-semibold text-neutral-900">No client sites yet</h3>
          <p className="mt-2 text-sm text-neutral-500">
            Create a client site to deliver photos, share galleries, and let your clients share with friends and family.
          </p>
          <button
            onClick={() => { setError(""); setShowNewModal(true); }}
            className="mt-6 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Create your first client site
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onClick={() => navigate(`/clients/${client.id}/edit`)}
            />
          ))}
        </div>
      )}

      {/* New Client Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowNewModal(false)}>
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">New Client Site</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">Client name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({
                      ...f,
                      name,
                      slug: f.slug || generateSlug(name),
                    }));
                  }}
                  placeholder="Sarah & James Wedding"
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Site slug</label>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-sm text-neutral-400">framenest.photos/</span>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      }))
                    }
                    placeholder="sarah-james-wedding"
                    className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">Custom domain (optional)</label>
                <input
                  type="text"
                  value={form.customDomain}
                  onChange={(e) => setForm((f) => ({ ...f, customDomain: e.target.value }))}
                  placeholder="photos.sarahandjames.com"
                  className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Create site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Client Card ───
function ClientCard({ client, onClick }: { client: ClientSite; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-xl border border-border bg-white p-5 transition-all hover:shadow-md hover:border-neutral-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 truncate">{client.name}</h3>
          <p className="mt-0.5 text-xs text-neutral-400 truncate">
            framenest.photos/{client.slug}
          </p>
          {client.customDomain && (
            <p className="mt-0.5 text-xs text-primary-600 truncate">{client.customDomain}</p>
          )}
        </div>
        <span
          className={cn(
            "ml-2 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            client.status === "published"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          )}
        >
          {client.status}
        </span>
      </div>

      {/* Industry badge */}
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
          {client.industry}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1">
          <span className="font-medium text-neutral-700">{client.blogCount}</span> blog posts
        </span>
        <span className="flex items-center gap-1">
          <span className="font-medium text-neutral-700">{client.galleryCount}</span> galleries
        </span>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-3">
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Edit Site
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          Manage Blog
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          Galleries
        </button>
        <a
          href={`/${client.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
        >
          View Live ↗
        </a>
      </div>
    </div>
  );
}
