import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface PhotographerApp {
  id: string;
  name: string;
  email: string;
  website: string | null;
  portfolio_url: string | null;
  service_area: string | null;
  bio: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export function AdminPhotographersPage() {
  const { user } = useAuth();
  const [apps, setApps] = useState<PhotographerApp[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = useCallback(async () => {
    try {
      const data = await api.get<{ photographers: PhotographerApp[] }>("/photographers");
      setApps(data.photographers);
    } catch { /* */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchApps(); }, [fetchApps]);

  const handleAction = async (id: string, status: "approved" | "rejected") => {
    try {
      await api.put("/photographers", { id, status });
      fetchApps();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Action failed");
    }
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

  const pending = apps.filter((a) => a.status === "pending");
  const approved = apps.filter((a) => a.status === "approved");
  const rejected = apps.filter((a) => a.status === "rejected");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-neutral-900">Photographer Applications</h1>
        <p className="mt-1 text-sm text-neutral-500">Review and manage photographer applications.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatBadge label="Pending" count={pending.length} color="amber" />
        <StatBadge label="Approved" count={approved.length} color="emerald" />
        <StatBadge label="Rejected" count={rejected.length} color="red" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" role="status" aria-label="Loading" />
        </div>
      ) : apps.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/50 py-16 text-center">
          <span className="text-4xl">📷</span>
          <p className="mt-4 text-neutral-400">No photographer applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id}
              className={cn(
                "rounded-xl border p-5",
                app.status === "pending" ? "border-amber-200 bg-amber-50/30" :
                app.status === "approved" ? "border-emerald-200 bg-emerald-50/30" :
                "border-neutral-200 bg-neutral-50/50",
              )}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-neutral-900">{app.name}</h3>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      app.status === "pending" ? "bg-amber-100 text-amber-700" :
                      app.status === "approved" ? "bg-emerald-100 text-emerald-700" :
                      "bg-red-100 text-red-700",
                    )}>
                      {app.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">{app.email}</p>
                  {app.service_area && (
                    <p className="mt-1 text-xs text-neutral-400">📍 {app.service_area}</p>
                  )}
                  {app.bio && (
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{app.bio}</p>
                  )}
                  <div className="mt-2 flex gap-3 text-xs">
                    {app.website && (
                      <a href={app.website} target="_blank" rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-700">
                        Portfolio →
                      </a>
                    )}
                    <span className="text-neutral-400">
                      Applied {new Date(app.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {app.status === "pending" && (
                  <div className="ml-4 flex gap-2">
                    <button onClick={() => handleAction(app.id, "approved")}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                      Approve
                    </button>
                    <button onClick={() => handleAction(app.id, "rejected")}
                      className="rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatBadge({ label, count, color }: { label: string; count: number; color: "amber" | "emerald" | "red" }) {
  const styles = {
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    red: "bg-red-50 border-red-200 text-red-700",
  };
  return (
    <div className={cn("rounded-xl border px-4 py-3 text-center", styles[color])}>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}
