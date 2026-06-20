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

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  spaceName: string | null;
  eventCount: number;
  photoCount: number;
  createdAt: string;
}

interface Photographer {
  id: string;
  userId: string;
  name: string;
  email: string;
  slug: string;
  tagline: string;
  bio: string;
  status: string;
  verified: boolean;
  featured: boolean;
  coverUrl: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export function AdminPeoplePage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"users" | "photographers">("users");

  // Users state
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState("");
  const [search, setSearch] = useState("");

  // Photographers state
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [photosError, setPhotosError] = useState("");
  const [editingSlug, setEditingSlug] = useState<Record<string, string>>({});
  const [editingTagline, setEditingTagline] = useState<Record<string, string>>({});

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const data = await api.get<{ users: AdminUser[] }>("/citysite/users");
      setUsers(data.users || []);
    } catch (err) {
      setUsersError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchPhotographers = useCallback(async () => {
    try {
      setPhotosLoading(true);
      const data = await api.get<{ photographers: Photographer[] }>("/photographers");
      setPhotographers(data.photographers || []);
    } catch (err) {
      setPhotosError(
        err instanceof Error ? err.message : "Failed to load photographers"
      );
    } finally {
      setPhotosLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchPhotographers();
  }, [fetchUsers, fetchPhotographers]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const handleChangeRole = async (userId: string, newRole: string) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      /* silent */
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch {
      /* silent */
    }
  };

  const handlePhotographerAction = async (
    id: string,
    action: "approve" | "reject"
  ) => {
    try {
      const status = action === "approve" ? "approved" : "rejected";
      await api.put("/photographers", { id, status });
      setPhotographers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status } : p))
      );
    } catch {
      /* silent */
    }
  };

  const handleToggleVerified = async (id: string, verified: boolean) => {
    try {
      await api.put("/photographers", { id, verified });
      setPhotographers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, verified } : p))
      );
    } catch {
      /* silent */
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await api.put("/photographers", { id, featured });
      setPhotographers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, featured } : p))
      );
    } catch {
      /* silent */
    }
  };

  const handleUpdateSlug = async (id: string) => {
    const slug = editingSlug[id];
    if (!slug) return;
    try {
      await api.put("/photographers", { id, slug });
      setPhotographers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, slug } : p))
      );
    } catch {
      /* silent */
    }
  };

  const handleUpdateTagline = async (id: string) => {
    const tagline = editingTagline[id];
    if (tagline === undefined) return;
    try {
      await api.put("/photographers", { id, tagline });
      setPhotographers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, tagline } : p))
      );
    } catch {
      /* silent */
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const roles = ["viewer", "staff", "page_admin", "platform_owner"];

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          People
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage users and photographer applications
        </p>

        {/* Sub-tabs */}
        <div className="mt-6 flex gap-1 rounded-lg bg-neutral-100 p-1">
          {(["users", "photographers"] as const).map((t) => (
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
              {t === "users" ? "Users" : "Photographers"}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {tab === "users" && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full max-w-sm rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />

            {usersLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}

            {usersError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {usersError}
              </div>
            )}

            {!usersLoading && !usersError && (
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-600">Name</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Email</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Role</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Space</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Events</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Photos</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Created</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {u.name}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">{u.email}</td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                              u.role === "platform_owner"
                                ? "bg-neutral-900 text-white"
                                : u.role === "page_admin"
                                ? "bg-neutral-200 text-neutral-800"
                                : "bg-neutral-100 text-neutral-600"
                            )}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-600">
                          {u.spaceName || "—"}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">{u.eventCount}</td>
                        <td className="px-4 py-3 text-neutral-600">{u.photoCount}</td>
                        <td className="px-4 py-3 text-neutral-500 text-xs">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <select
                              value={u.role}
                              onChange={(e) =>
                                handleChangeRole(u.id, e.target.value)
                              }
                              className="rounded border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-700"
                            >
                              {roles.map((r) => (
                                <option key={r} value={r}>
                                  {r}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-8 text-center text-neutral-400"
                        >
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Photographers Tab */}
        {tab === "photographers" && (
          <div className="mt-6">
            {photosLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}

            {photosError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {photosError}
              </div>
            )}

            {!photosLoading && !photosError && photographers.length === 0 && (
              <div className="rounded-lg border border-dashed border-neutral-300 py-12 text-center text-neutral-400">
                No photographer applications yet
              </div>
            )}

            {!photosLoading && !photosError && photographers.length > 0 && (
              <div className="space-y-4">
                {photographers.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-lg border border-neutral-200 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-base font-semibold text-neutral-900">
                            {p.name}
                          </h3>
                          <span
                            className={cn(
                              "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                              p.status === "approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : p.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                            )}
                          >
                            {p.status}
                          </span>
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
                        <p className="mt-1 text-sm text-neutral-500">{p.email}</p>
                        {p.bio && (
                          <p className="mt-2 text-sm text-neutral-600 line-clamp-2">
                            {p.bio}
                          </p>
                        )}

                        {/* Editable fields */}
                        <div className="mt-3 flex flex-wrap gap-3">
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-neutral-500">Slug:</label>
                            <input
                              type="text"
                              value={editingSlug[p.id] ?? p.slug}
                              onChange={(e) =>
                                setEditingSlug((prev) => ({
                                  ...prev,
                                  [p.id]: e.target.value,
                                }))
                              }
                              className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-700"
                            />
                            {editingSlug[p.id] !== undefined &&
                              editingSlug[p.id] !== p.slug && (
                                <button
                                  onClick={() => handleUpdateSlug(p.id)}
                                  className="rounded bg-neutral-900 px-2 py-1 text-xs text-white"
                                >
                                  Save
                                </button>
                              )}
                          </div>
                          <div className="flex items-center gap-1">
                            <label className="text-xs text-neutral-500">
                              Tagline:
                            </label>
                            <input
                              type="text"
                              value={editingTagline[p.id] ?? p.tagline}
                              onChange={(e) =>
                                setEditingTagline((prev) => ({
                                  ...prev,
                                  [p.id]: e.target.value,
                                }))
                              }
                              className="w-56 rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-700"
                            />
                            {editingTagline[p.id] !== undefined &&
                              editingTagline[p.id] !== p.tagline && (
                                <button
                                  onClick={() => handleUpdateTagline(p.id)}
                                  className="rounded bg-neutral-900 px-2 py-1 text-xs text-white"
                                >
                                  Save
                                </button>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end gap-2">
                        {p.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handlePhotographerAction(p.id, "approve")
                              }
                              className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handlePhotographerAction(p.id, "reject")
                              }
                              className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        <label className="flex items-center gap-2 text-xs text-neutral-600">
                          <input
                            type="checkbox"
                            checked={p.verified}
                            onChange={(e) =>
                              handleToggleVerified(p.id, e.target.checked)
                            }
                            className="rounded border-neutral-300"
                          />
                          Verified
                        </label>
                        <label className="flex items-center gap-2 text-xs text-neutral-600">
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
                      </div>
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
