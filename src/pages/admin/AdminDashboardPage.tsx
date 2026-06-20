import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

const ADMIN_NAV = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/people", label: "People" },
  { to: "/admin/content", label: "Content" },
  { to: "/admin/commerce", label: "Commerce" },
  { to: "/admin/discovery", label: "Discovery" },
  { to: "/admin/system", label: "System" },
];

function AdminNav() {
  const location = useLocation();
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6">
        {ADMIN_NAV.map((item) => {
          const active =
            item.to === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface Stats {
  users: number;
  spaces: number;
  photos: number;
  albums: number;
  photographers: { total: number; pending: number; approved: number };
  revenue: number;
  mapPins: number;
  inquiries: number;
}

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get<Stats>("/admin/stats");
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const kpiCards = stats
    ? [
        { label: "Users", value: stats.users },
        { label: "Spaces", value: stats.spaces },
        { label: "Photos", value: stats.photos },
        { label: "Albums", value: stats.albums },
        {
          label: "Photographers",
          value: stats.photographers.total,
          sub: `${stats.photographers.pending} pending`,
        },
        {
          label: "Revenue",
          value: `$${(stats.revenue / 100).toFixed(2)}`,
        },
        { label: "Map Pins", value: stats.mapPins },
        { label: "Inquiries", value: stats.inquiries },
      ]
    : [];

  const alerts: string[] = [];
  if (stats) {
    if (stats.photographers.pending > 0)
      alerts.push(
        `${stats.photographers.pending} photographer application(s) pending review`
      );
    if (stats.photographers.approved === 0)
      alerts.push("No verified photographers — directory will appear empty");
    if (stats.photos === 0)
      alerts.push("No photos uploaded yet");
    if (stats.spaces === 0)
      alerts.push("No spaces created yet");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Platform overview and key metrics
        </p>

        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* KPI Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {kpiCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-5"
                >
                  <p className="text-sm font-medium text-neutral-500">
                    {card.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-neutral-900">
                    {card.value}
                  </p>
                  {"sub" in card && card.sub && (
                    <p className="mt-0.5 text-xs text-amber-600">{card.sub}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-lg font-semibold text-neutral-900">
                  Alerts
                </h2>
                <div className="mt-3 space-y-2">
                  {alerts.map((alert, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
                    >
                      <span className="mt-0.5 block h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                      {alert}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Quick Actions
              </h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  to="/admin/people"
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Manage Users
                </Link>
                <Link
                  to="/admin/content"
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Manage Content
                </Link>
                <Link
                  to="/admin/commerce"
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  View Orders
                </Link>
                <Link
                  to="/admin/system"
                  className="rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  System Health
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
