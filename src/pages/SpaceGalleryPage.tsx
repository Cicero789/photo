import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

interface EventInfo {
  id: string;
  title: string;
  photoCount: number;
  coverPhotoUrl?: string | null;
}

export function SpaceGalleryPage() {
  const { spaceSlug } = useParams<{ spaceSlug: string }>();
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideInterval, setSlideInterval] = useState(4);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!spaceSlug) return;
    api.get<{ space: { id: string; name: string } }>(`/spaces/${spaceSlug}`)
      .then((s) => api.get<{ events: EventInfo[] }>(`/events?spaceId=${s.space.id}`))
      .then((d) => setEvents(d.events))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [spaceSlug]);

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedEvents(new Set(events.map((e) => e.id)));
  const deselectAll = () => { setSelectedEvents(new Set()); setPhotos([]); };

  const loadPhotos = async () => {
    if (selectedEvents.size === 0) return;
    setLoadingPhotos(true);
    const allPhotos: Photo[] = [];
    for (const eventId of selectedEvents) {
      try {
        const data = await api.get<{ photos: Photo[] }>(`/events/${eventId}`).catch(() => null);
        if (data) {
          const evData = data as { photos: Photo[] } | { event: { photos: Photo[] } };
          const ps = "photos" in evData ? evData.photos : [];
          allPhotos.push(...ps);
        }
      } catch {}
    }
    setPhotos(allPhotos);
    setLoadingPhotos(false);
  };

  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetAutoHide = () => { setShowControls(true); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); hideTimerRef.current = setTimeout(() => setShowControls(false), 3000); };

  const startSlideshow = () => {
    if (photos.length === 0) return;
    setCurrentIndex(0); setPlaying(true); setShowControls(true);
    try { document.documentElement.requestFullscreen?.().catch(() => {}); } catch {}
    resetAutoHide();
  };

  const stopSlideshow = () => {
    setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    try { if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {}); } catch {}
  };

  useEffect(() => {
    if (!playing || photos.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % photos.length);
    }, slideInterval * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, slideInterval, photos.length]);

  const nextPhoto = () => setCurrentIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () => setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!playing) return;
      if (e.key === "Escape") stopSlideshow();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [playing, photos.length]);

  // ─── Slideshow mode ───
  if (playing && photos.length > 0) {
    const photo = photos[currentIndex];
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col cursor-none"
        onMouseMove={resetAutoHide} onMouseEnter={() => setShowControls(true)}
        style={{ cursor: showControls ? 'default' : 'none' }}>
        <div className={cn("absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-6 py-4 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
          <div className="text-white text-sm">
            <span className="font-semibold text-lg">{selectedEvents.size} event{selectedEvents.size !== 1 ? "s" : ""}</span>
            <span className="ml-3 text-white/60">{currentIndex + 1} / {photos.length}</span>
          </div>
          <div className="flex items-center gap-3">
            <select value={slideInterval} onChange={(e) => { setSlideInterval(Number(e.target.value)); resetAutoHide(); }}
              className="rounded bg-white/20 px-2 py-1 text-xs text-white border border-white/20">
              <option value={2}>2s</option><option value={4}>4s</option><option value={6}>6s</option><option value={10}>10s</option>
            </select>
            <button onClick={stopSlideshow} className="rounded-lg bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/20">✕ Exit</button>
          </div>
        </div>
        {photo && <img src={photo.url} alt={photo.originalFilename} className="absolute inset-0 h-full w-full object-contain" onClick={nextPhoto} />}
        <button onClick={prevPhoto} className={cn("absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>‹</button>
        <button onClick={nextPhoto} className={cn("absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all duration-300", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>›</button>
        <div className={cn("absolute bottom-0 left-0 right-0 flex gap-1 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-500", showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
          {photos.map((p, i) => (
            <img key={p.id} src={p.url} alt="" onClick={() => { setCurrentIndex(i); resetAutoHide(); }}
              className={cn("h-14 w-14 flex-shrink-0 cursor-pointer rounded object-cover transition-all hover:scale-110", i === currentIndex ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-80")} />
          ))}
        </div>
      </div>
    );
  }

  // ─── Event selection mode ───
  const totalPhotos = events.filter(e => selectedEvents.has(e.id)).reduce((sum, e) => sum + e.photoCount, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <Link to={`/s/${spaceSlug}`} className="mb-2 inline-block text-sm text-neutral-500 hover:text-neutral-700">&larr; Back to space</Link>
        <h1 className="font-display text-2xl font-bold text-neutral-900">Gallery</h1>
        <p className="text-sm text-neutral-500">Select events to create a combined photo slideshow.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>
      ) : events.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <span className="text-4xl">📸</span><p className="mt-4 text-neutral-400">No events yet.</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-3">
            <button onClick={selectAll} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Select all</button>
            <button onClick={deselectAll} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Clear</button>
            <button onClick={loadPhotos} disabled={selectedEvents.size === 0}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
              {loadingPhotos ? "Loading..." : `Load ${totalPhotos} photo${totalPhotos !== 1 ? "s" : ""}`}
            </button>
            <button onClick={startSlideshow} disabled={photos.length === 0}
              className="rounded-lg bg-accent-600 px-5 py-2 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-50">
              ▶ Play {photos.length > 0 ? `(${photos.length})` : ""}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <div key={ev.id} onClick={() => toggleEvent(ev.id)}
                className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all",
                  selectedEvents.has(ev.id) ? "border-primary-500 bg-primary-50 shadow-md" : "border-border bg-white hover:border-neutral-300")}>
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-6 w-6 items-center justify-center rounded border-2",
                    selectedEvents.has(ev.id) ? "border-primary-600 bg-primary-600 text-white" : "border-neutral-300")}>
                    {selectedEvents.has(ev.id) && "✓"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{ev.title}</p>
                    <p className="text-xs text-neutral-500">{ev.photoCount} photo{ev.photoCount !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
