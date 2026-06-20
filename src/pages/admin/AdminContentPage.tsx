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

interface AdminSpace {
  id: string;
  name: string;
  slug: string;
  ownerName: string;
  eventCount: number;
  photoCount: number;
}

interface DeletedPhoto {
  id: string;
  filename: string;
  storageKey: string;
  eventName: string;
  deletedAt: string;
  thumbnailUrl: string | null;
}

interface AdminAlbum {
  id: string;
  name: string;
  ownerName: string;
  photoCount: number;
  viewCount: number;
  shareToken: string;
  expiresAt: string | null;
}

export function AdminContentPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"spaces" | "deleted" | "albums">("spaces");

  // Spaces state
  const [spaces, setSpaces] = useState<AdminSpace[]>([]);
  const [spacesLoading, setSpacesLoading] = useState(true);
  const [spacesError, setSpacesError] = useState("");

  // Deleted content state
  const [deleted, setDeleted] = useState<DeletedPhoto[]>([]);
  const [deletedLoading, setDeletedLoading] = useState(true);
  const [deletedError, setDeletedError] = useState("");

  // Albums state
  const [albums, setAlbums] = useState<AdminAlbum[]>([]);
  const [albumsLoading, setAlbumsLoading] = useState(true);
  const [albumsError, setAlbumsError] = useState("");

  const fetchSpaces = useCallback(async () => {
    try {
      setSpacesLoading(true);
      const data = await api.get<{ spaces: AdminSpace[] }>("/citysite/spaces");
      setSpaces(data.spaces || []);
    } catch (err) {
      setSpacesError(err instanceof Error ? err.message : "Failed to load spaces");
    } finally {
      setSpacesLoading(false);
    }
  }, []);

  const fetchDeleted = useCallback(async () => {
    try {
      setDeletedLoading(true);
      const data = await api.get<{ items: DeletedPhoto[] }>(
        "/citysite/content?type=photos&status=deleted"
      );
      setDeleted(data.items || []);
    } catch (err) {
      setDeletedError(
        err instanceof Error ? err.message : "Failed to load deleted content"
      );
    } finally {
      setDeletedLoading(false);
    }
  }, []);

  const fetchAlbums = useCallback(async () => {
    try {
      setAlbumsLoading(true);
      const data = await api.get<{ items: AdminAlbum[] }>(
        "/citysite/content?type=albums"
      );
      setAlbums(data.items || []);
    } catch (err) {
      setAlbumsError(
        err instanceof Error ? err.message : "Failed to load albums"
      );
    } finally {
      setAlbumsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpaces();
    fetchDeleted();
    fetchAlbums();
  }, [fetchSpaces, fetchDeleted, fetchAlbums]);

  if (user?.role !== "platform_owner") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">Access denied</p>
      </div>
    );
  }

  const handleResetSpace = async (spaceId: string, name: string) => {
    if (!window.confirm(`Reset space "${name}"? This will clear all content.`))
      return;
    try {
      await api.post(`/admin/spaces/${spaceId}/reset`);
      fetchSpaces();
    } catch {
      /* silent */
    }
  };

  const handleRestorePhoto = async (photoId: string) => {
    try {
      await api.post(`/admin/content/restore`, { photoId });
      setDeleted((prev) => prev.filter((p) => p.id !== photoId));
    } catch {
      /* silent */
    }
  };

  const handleExtendAlbum = async (albumId: string) => {
    try {
      await api.put(`/admin/content/albums/${albumId}`, { extend: true });
      fetchAlbums();
    } catch {
      /* silent */
    }
  };

  const handleDeleteAlbum = async (albumId: string, name: string) => {
    if (!window.confirm(`Delete album "${name}"?`)) return;
    try {
      await api.delete(`/admin/content/albums/${albumId}`);
      setAlbums((prev) => prev.filter((a) => a.id !== albumId));
    } catch {
      /* silent */
    }
  };

  const tabs = [
    { key: "spaces" as const, label: "Spaces" },
    { key: "deleted" as const, label: "Deleted Content" },
    { key: "albums" as const, label: "Albums" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-neutral-900">
          Content
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage spaces, deleted content, and albums
        </p>

        {/* Sub-tabs */}
        <div className="mt-6 flex gap-1 rounded-lg bg-neutral-100 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                tab === t.key
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Spaces Tab */}
        {tab === "spaces" && (
          <div className="mt-6">
            {spacesLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}
            {spacesError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {spacesError}
              </div>
            )}
            {!spacesLoading && !spacesError && (
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-600">Name</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Slug</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Owner</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Events</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Photos</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {spaces.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {s.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-neutral-500">
                          {s.slug}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">{s.ownerName}</td>
                        <td className="px-4 py-3 text-neutral-600">{s.eventCount}</td>
                        <td className="px-4 py-3 text-neutral-600">{s.photoCount}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleResetSpace(s.id, s.name)}
                              className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                              Reset
                            </button>
                            <Link
                              to={`/s/${s.slug}`}
                              className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {spaces.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-8 text-center text-neutral-400"
                        >
                          No spaces found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Deleted Content Tab */}
        {tab === "deleted" && (
          <div className="mt-6">
            {deletedLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}
            {deletedError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {deletedError}
              </div>
            )}
            {!deletedLoading && !deletedError && deleted.length === 0 && (
              <div className="rounded-lg border border-dashed border-neutral-300 py-12 text-center text-neutral-400">
                No deleted content
              </div>
            )}
            {!deletedLoading && !deletedError && deleted.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {deleted.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-neutral-200 bg-white p-3"
                  >
                    <div className="aspect-square overflow-hidden rounded-md bg-neutral-100">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={item.filename}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-neutral-300">
                          No preview
                        </div>
                      )}
                    </div>
                    <p className="mt-2 truncate text-xs font-medium text-neutral-700">
                      {item.filename}
                    </p>
                    <p className="text-xs text-neutral-400">
                      From: {item.eventName}
                    </p>
                    <p className="text-xs text-neutral-400">
                      Deleted: {new Date(item.deletedAt).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleRestorePhoto(item.id)}
                      className="mt-2 w-full rounded bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Albums Tab */}
        {tab === "albums" && (
          <div className="mt-6">
            {albumsLoading && (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-600" />
              </div>
            )}
            {albumsError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {albumsError}
              </div>
            )}
            {!albumsLoading && !albumsError && (
              <div className="overflow-x-auto rounded-lg border border-neutral-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 font-medium text-neutral-600">Name</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Owner</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Photos</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Views</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">
                        Share Link
                      </th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Expiry</th>
                      <th className="px-4 py-3 font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {albums.map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                      >
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {a.name}
                        </td>
                        <td className="px-4 py-3 text-neutral-600">{a.ownerName}</td>
                        <td className="px-4 py-3 text-neutral-600">{a.photoCount}</td>
                        <td className="px-4 py-3 text-neutral-600">{a.viewCount}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`/album/${a.shareToken}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-neutral-500 underline"
                          >
                            {a.shareToken.slice(0, 8)}...
                          </a>
                        </td>
                        <td className="px-4 py-3 text-xs text-neutral-500">
                          {a.expiresAt
                            ? new Date(a.expiresAt).toLocaleDateString()
                            : "Never"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleExtendAlbum(a.id)}
                              className="rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition-colors hover:bg-neutral-50"
                            >
                              Extend
                            </button>
                            <button
                              onClick={() => handleDeleteAlbum(a.id, a.name)}
                              className="rounded border border-red-200 px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {albums.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-4 py-8 text-center text-neutral-400"
                        >
                          No albums found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
