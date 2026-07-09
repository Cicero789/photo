import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ClientSite {
  id: string; name: string; slug: string; industry: string;
  customDomain: string | null; template: string;
  published: boolean; blogCount: number; galleryCount: number;
  updatedAt: string;
}

export function StudioOverviewPage() {
  const [sites, setSites] = useState<ClientSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ views: number; inquiries: number }>({ views: 0, inquiries: 0 });

  useEffect(() => {
    Promise.all([
      api.get<{ sites: ClientSite[] }>("/clients"),
      api.get<{ profileViews: number; inquiries: number }>("/photographers/stats").catch(() => ({ profileViews: 0, inquiries: 0 })),
    ]).then(([clients, s]) => {
      setSites((clients as any).clients || (clients as any).sites || []);
      setStats({ views: s.profileViews || 0, inquiries: s.inquiries || 0 });
      setLoading(false);
    });
  }, []);

  const togglePublish = async (site: ClientSite) => {
    await api.put(`/clients/${site.id}`, { published: !site.published });
    setSites(prev => prev.map(s => s.id === site.id ? { ...s, published: !s.published } : s));
  };

  if (loading) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">My Studio</h1>
          <p className="mt-1 text-sm text-neutral-500">{sites.length} client site{sites.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/content" className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors">
            📝 CMS Editor
          </Link>
          <Link to="/clients" className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            + New Client Site
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Client Sites", value: String(sites.length) },
          { label: "Published", value: String(sites.filter(s => s.published).length) },
          { label: "Profile Views", value: String(stats.views) },
          { label: "Inquiries", value: String(stats.inquiries) },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-medium uppercase text-neutral-500">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sites table */}
      {sites.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-neutral-200 p-12 text-center">
          <p className="text-neutral-500">No client sites yet.</p>
          <Link to="/clients" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:underline">Create your first client site</Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-neutral-50">
              <tr>
                <th className="px-4 py-3 font-medium text-neutral-600">Site</th>
                <th className="hidden px-4 py-3 font-medium text-neutral-600 sm:table-cell">Template</th>
                <th className="hidden px-4 py-3 font-medium text-neutral-600 lg:table-cell">Domain</th>
                <th className="px-4 py-3 font-medium text-neutral-600">Status</th>
                <th className="px-4 py-3 font-medium text-neutral-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sites.map(site => (
                <tr key={site.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/clients/${site.id}/edit`} className="font-medium text-neutral-900 hover:text-primary-600">
                      {site.name}
                    </Link>
                    <p className="text-xs text-neutral-400">/site/{site.slug}</p>
                  </td>
                  <td className="hidden px-4 py-3 text-neutral-500 sm:table-cell">{site.template || "1-clean"}</td>
                  <td className="hidden px-4 py-3 text-neutral-500 lg:table-cell">{site.customDomain || "—"}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(site)}
                      className={cn("rounded-full px-3 py-1 text-xs font-medium", site.published ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500")}>
                      {site.published ? "Live" : "Draft"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/site/${site.slug}`} target="_blank" className="text-xs text-neutral-400 hover:text-primary-600">View ↗</Link>
                      <Link to={`/clients/${site.id}/edit`} className="text-xs text-primary-600 hover:underline">Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
