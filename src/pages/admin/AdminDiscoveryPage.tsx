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

interface MapPin {
  id: string;
  address: string;
  lat: number;
  lng: number;
  source: string;
  score: number;
  loves: number;
}

interface DirectoryPhotographer {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  featured: boolean;
  verified: boolean;
  avatarUrl: string | null;
}

export function AdminDiscoveryPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"map" | "directory">("map");

  // Map pins state
  const [pins, setPins] = useState<MapPin[]>([]);
  const [pinsLoading, setPinsLoading] = useState(true);
  const [pinsError, setPinsError] = useState("");
  const [editingPin, setEditingPin] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<MapPin>>({});

  // Directory state
  const [directory, setDirectory] = useState<DirectoryPhotographer[]>([]);
  const [dirLoading, setDirLoading] = useState(true);
  const [dirError, setDirError] = useState("");

  const fetchPins = useCallback(async () => {
    try {
      setPinsLoading(true);
      const data = await api.get<{ pins: MapPin[] }>("/admin/pins");
      setPins(data.pins || []);
    } catch (err) {
      setPinsError(err instanceof Error ? err.message : "Failed to load map pins");
    } finally {
      setPinsLoading(false);
    }
  }, []);

  const fetchDirectory = useCallback(async () => {
    try {
      setDirLoading(true);
      const data = await api.get<{ photographers: DirectoryPhotographer[] }>(
        "/photographers"
      );
      const approved = (data.photographers || []).filter(
        (p) => p.verified || p.featured
      );
      setDirectory(approved);
    } catch (err) {
      setDirError(
        err instanceof Error ? err.message : "Failed to load directory"
      );
    } finally {
      setDirLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPins();
    fetchDirectory();
  }, [fetchPins, fetchDirectory]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const handleDeletePin = async (pinId: string) => {
    if (!window.confirm("Delete this map pin?")) return;
    try {
      await api.delete(`/admin/pins/${pinId}`);
      setPins((prev) => prev.filter((p) => p.id !== pinId));
    } catch {
      /* silent */
    }
  };

  const handleStartEdit = (pin: MapPin) => {
    setEditingPin(pin.id);
    setEditForm({ address: pin.address, lat: pin.lat, lng: pin.lng, score: pin.score });
  };

  const handleSaveEdit = async (pinId: string) => {
    try {
      await api.put(`/admin/pins/${pinId}`, editForm);
      setPins((prev) =>
        prev.map((p) => (p.id === pinId ? { ...p, ...editForm } : p))
      );
      setEditingPin(null);
      setEditForm({});
    } catch {
      /* silent */
    }
  };

  const handleCancelEdit = () => {
    setEditingPin(null);
    setEditForm({});
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await api.put("/photographers", { id, featured });
      setDirectory((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured } : p))
      );
    } catch {
      /* silent */
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          Discovery
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage inspiration map pins and photographer directory
        </p>

        {/* Sub-tabs */}
        <div className="mt-6 flex gap-1 rounded-lg bg-neutral-100 p-1">
          {(["map", "directory"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                tab === t
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              {t === "map" ? "Inspiration Map" : "Directory"}
            </button>
          ))}
        </div>

        {/* Map Pins Tab */}
        {tab === "map" && (
          <div className="mt-6">
            {pinsLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}
            {pinsError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {pinsError}
              </div>
            )}
            {!pinsLoading && !pinsError && (
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-600">
                        Address
                      </th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Lat</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Lng</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Source</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Score</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Loves</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pins.map((pin) => (
                      <tr
                        key={pin.id}
                        className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                      >
                        {editingPin === pin.id ? (
                          <>
                            <td className="px-4 py-3">
                              <input
                                type="text"
                                value={editForm.address || ""}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    address: e.target.value,
                                  }))
                                }
                                className="w-full rounded border border-neutral-200 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                step="0.0001"
                                value={editForm.lat || 0}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    lat: parseFloat(e.target.value),
                                  }))
                                }
                                className="w-24 rounded border border-neutral-200 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                step="0.0001"
                                value={editForm.lng || 0}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    lng: parseFloat(e.target.value),
                                  }))
                                }
                                className="w-24 rounded border border-neutral-200 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="px-4 py-3 text-neutral-500">
                              {pin.source}
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={editForm.score || 0}
                                onChange={(e) =>
                                  setEditForm((f) => ({
                                    ...f,
                                    score: parseInt(e.target.value),
                                  }))
                                }
                                className="w-16 rounded border border-neutral-200 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="px-4 py-3 text-neutral-500">
                              {pin.loves}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleSaveEdit(pin.id)}
                                  className="rounded bg-neutral-900 px-2 py-1 text-xs text-white"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-600"
                                >
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="max-w-xs truncate px-4 py-3 text-neutral-900">
                              {pin.address}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                              {pin.lat.toFixed(4)}
                            </td>
                            <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                              {pin.lng.toFixed(4)}
                            </td>
                            <td className="px-4 py-3 text-neutral-500">
                              {pin.source}
                            </td>
                            <td className="px-4 py-3 text-neutral-600">{pin.score}</td>
                            <td className="px-4 py-3 text-neutral-600">{pin.loves}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleStartEdit(pin)}
                                  className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-50"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeletePin(pin.id)}
                                  className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                    {pins.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-neutral-400"
                        >
                          No map pins found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Directory Tab */}
        {tab === "directory" && (
          <div className="mt-6">
            {dirLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}
            {dirError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {dirError}
              </div>
            )}
            {!dirLoading && !dirError && directory.length === 0 && (
              <div className="rounded-lg border border-dashed border-neutral-300 py-12 text-center text-neutral-400">
                No approved photographers in directory
              </div>
            )}
            {!dirLoading && !dirError && directory.length > 0 && (
              <div className="space-y-3">
                {directory.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600">
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{p.name}</p>
                        <p className="text-sm text-neutral-500">{p.tagline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {p.verified && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                            Verified
                          </span>
                        )}
                        {p.featured && (
                          <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-xs font-medium text-neutral-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-neutral-600">
                        <input
                          type="checkbox"
                          checked={p.featured}
                          onChange={(e) =>
                            handleToggleFeatured(p.id, e.target.checked)
                          }
                          className="rounded border-neutral-300"
                        />
                        Featured
                      </label>
                      <Link
                        to={`/p/${p.slug}`}
                        className="rounded border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
