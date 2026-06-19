import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface AlbumPhoto {
  key: string;
  filename: string;
  url: string;
}

interface AlbumData {
  name: string;
  ownerName: string;
  downloads: number;
  photoCount: number;
  photos: AlbumPhoto[];
}

export function AlbumViewerPage() {
  const { token } = useParams<{ token: string }>();
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [needsPassword, setNeedsPassword] = useState(false);
  const [passwordName, setPasswordName] = useState("");
  const [passwordOwner, setPasswordOwner] = useState("");
  const [password, setPassword] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const fetchAlbum = async (pw?: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/albums/view/${token}`, {
        headers: pw ? { "X-Album-Password": pw } : {},
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.needsPassword) {
          setNeedsPassword(true);
          setPasswordName(data.name || "");
          setPasswordOwner(data.ownerName || "");
          setLoading(false);
          return;
        }
        throw new Error(data.error || "Album not found");
      }
      setAlbum(data);
      setNeedsPassword(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load album");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) fetchAlbum(); }, [token]);

  // Password gate
  if (needsPassword) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-xl">🔒</div>
              <h1 className="mt-4 font-display text-xl font-bold text-neutral-900">{passwordName}</h1>
              <p className="mt-1 text-sm text-neutral-500">by {passwordOwner}</p>
              <p className="mt-4 text-sm text-neutral-600">This album is password protected.</p>
            </div>
            <form className="mt-6" onSubmit={(e) => { e.preventDefault(); fetchAlbum(password); }}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoFocus
                className="block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
              <button type="submit" className="mt-3 w-full rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                View Album
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" />
      </div>
    );
  }

  // Error
  if (error || !album) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
        <div className="text-center">
          <p className="text-5xl">📷</p>
          <h1 className="mt-4 font-display text-xl font-bold text-neutral-900">Album not found</h1>
          <p className="mt-2 text-sm text-neutral-500">{error || "This album may have been removed or the link is incorrect."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-neutral-900 sm:text-2xl">{album.name}</h1>
            <p className="mt-0.5 text-sm text-neutral-500">
              by {album.ownerName} · {album.photoCount} photo{album.photoCount !== 1 ? "s" : ""}
            </p>
          </div>
          {album.downloads === 1 && album.photoCount > 0 && (
            <a href={album.photos[0]?.url} download
              className="hidden rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 sm:inline-flex sm:items-center sm:gap-2">
              ↓ Download
            </a>
          )}
        </div>
      </header>

      {/* Photo Grid */}
      {album.photoCount === 0 ? (
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-4xl text-neutral-300">📷</p>
            <p className="mt-3 text-sm text-neutral-400">No photos in this album yet.</p>
          </div>
        </div>
      ) : (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {album.photos.map((photo, i) => (
              <div key={photo.key}
                onClick={() => setLightbox(i)}
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-200 aspect-square">
                <img src={photo.url} alt={photo.filename || `Photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy" />
                {album.downloads === 1 && (
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/30 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <a href={photo.url} download={photo.filename || undefined}
                      onClick={e => e.stopPropagation()}
                      className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-medium text-neutral-700 hover:bg-white">
                      ↓
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Lightbox */}
      {lightbox !== null && album.photos[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 text-lg">✕</button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">‹</button>
          )}
          {lightbox < album.photos.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">›</button>
          )}
          <img src={album.photos[lightbox].url} alt=""
            onClick={e => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <span className="text-sm text-white/60">{lightbox + 1} / {album.photos.length}</span>
            {album.downloads === 1 && (
              <a href={album.photos[lightbox].url} download={album.photos[lightbox].filename || undefined}
                onClick={e => e.stopPropagation()}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20">
                ↓ Download
              </a>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-white py-6">
        <p className="text-center text-xs text-neutral-400">
          Shared via <a href="/" className="text-neutral-500 hover:text-neutral-700">FrameNest</a>
        </p>
      </footer>
    </div>
  );
}
