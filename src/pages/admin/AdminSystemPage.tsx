import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";
import { cn } from "../../lib/utils";

const ADMIN_NAV = [
  { to: "/citysite", label: "Dashboard" },
  { to: "/citysite/people", label: "People" },
  { to: "/citysite/content", label: "Content" },
  { to: "/citysite/commerce", label: "Commerce" },
  { to: "/citysite/discovery", label: "Discovery" },
  { to: "/citysite/system", label: "System" },
];

function AdminNav() {
  const location = useLocation();
  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl gap-0 overflow-x-auto px-4 sm:px-6">
        {ADMIN_NAV.map((item) => {
          const active =
            item.to === "/citysite"
              ? location.pathname === "/citysite"
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

interface HealthData {
  status: string;
  timestamp: string;
  database: string;
  tables: Record<string, number>;
  storage: string;
}

const FEATURE_FLAGS = [
  { key: "photo_uploads", label: "Photo Uploads", enabled: true },
  { key: "video_uploads", label: "Video Uploads", enabled: true },
  { key: "album_sharing", label: "Album Sharing", enabled: true },
  { key: "photographer_directory", label: "Photographer Directory", enabled: true },
  { key: "inspiration_map", label: "Inspiration Map", enabled: true },
  { key: "commerce", label: "Commerce / Orders", enabled: false },
  { key: "ad_tiles", label: "Ad Tiles", enabled: true },
  { key: "custom_domains", label: "Custom Domains", enabled: true },
  { key: "email_notifications", label: "Email Notifications", enabled: false },
  { key: "ai_tagging", label: "AI Photo Tagging", enabled: false },
];

export function AdminSystemPage() {
  const { user } = useAuth();
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flags, setFlags] = useState(FEATURE_FLAGS);

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get<HealthData>("/health");
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load health data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const handleToggleFlag = (key: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          System
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Health checks, database info, and feature flags
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

        {health && (
          <>
            {/* Health Status */}
            <div className="mt-6">
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Health Check
              </h2>
              <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">
                      Overall Status
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          health.status === "healthy"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        )}
                      />
                      <span className="font-medium text-neutral-900">
                        {health.status === "healthy" ? "Healthy" : "Unhealthy"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Database</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          health.database === "connected"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        )}
                      />
                      <span className="font-medium text-neutral-900">
                        {health.database === "connected"
                          ? "Connected"
                          : "Disconnected"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Storage</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          health.storage === "connected"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        )}
                      />
                      <span className="font-medium text-neutral-900">
                        {health.storage === "connected"
                          ? "Connected"
                          : "Disconnected"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-neutral-400">
                  Last checked: {new Date(health.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            {/* DB Table Counts */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-neutral-900">
                Database Tables
              </h2>
              <div className="mt-3 overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-600">
                        Table
                      </th>
                      <th className="px-4 py-3 font-medium text-neutral-600">
                        Row Count
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(health.tables || {}).map(([table, count]) => (
                      <tr
                        key={table}
                        className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-neutral-700">
                          {table}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">{count}</td>
                      </tr>
                    ))}
                    {(!health.tables ||
                      Object.keys(health.tables).length === 0) && (
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-8 text-center text-neutral-400"
                        >
                          No table data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Feature Flags */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Feature Flags
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Static configuration — toggles are local only (not persisted)
          </p>
          <div className="mt-3 rounded-lg border border-neutral-200 bg-white">
            {flags.map((flag, i) => (
              <div
                key={flag.key}
                className={cn(
                  "flex items-center justify-between px-5 py-3",
                  i < flags.length - 1 && "border-b border-neutral-100"
                )}
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {flag.label}
                  </p>
                  <p className="font-mono text-xs text-neutral-400">{flag.key}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={flag.enabled}
                    onChange={() => handleToggleFlag(flag.key)}
                    className="peer sr-only"
                  />
                  <div className="peer h-5 w-9 rounded-full bg-neutral-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-neutral-900 peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Backup */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-semibold text-neutral-900">
            Backup
          </h2>
          <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-600">
              D1 databases cannot self-export from within a Worker. Run the wrangler CLI command manually to back up your database:
            </p>
            <div className="mt-3 rounded-md bg-neutral-50 px-4 py-3">
              <code className="text-xs text-neutral-700">
                npx wrangler d1 export photo-db --remote --output=backup.sql
              </code>
            </div>
            <p className="mt-3 text-xs text-neutral-400">
              This command must be run from your local development machine with wrangler installed and authenticated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
