import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

interface EventInfo {
  id: string;
  title: string;
  category: string;
  eventDate: string;
}

export function GalleryPage() {
  const { eventId, spaceSlug } = useParams<{ eventId: string; spaceSlug?: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideInterval, setSlideInterval] = useState(4);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!eventId) return;
    api.get<{ event: EventInfo; photos: Photo[] }>(`/events/${eventId}`)
      .then((data) => {
        setEvent(data.event);
        setPhotos(data.photos);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [eventId]);

  const toggleSelect = (photoId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(photoId)) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(photos.map((p) => p.id)));
  const deselectAll = () => setSelected(new Set());

  const slideshowPhotos = selected.size > 0
    ? photos.filter((p) => selected.has(p.id))
    : photos;

  const [showControls, setShowControls] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetAutoHide = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  const startSlideshow = () => {
    setCurrentIndex(0);
    setPlaying(true);
    setShowControls(true);
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch {}
    resetAutoHide();
  };

  const stopSlideshow = () => {
    setPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    } catch {}
  };

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % slideshowPhotos.length);
    }, slideInterval * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, slideInterval, slideshowPhotos.length]);

  const nextPhoto = () => setCurrentIndex((i) => (i + 1) % slideshowPhotos.length);
  const prevPhoto = () => setCurrentIndex((i) => (i - 1 + slideshowPhotos.length) % slideshowPhotos.length);

  // Keyboard controls
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
  }, [playing, slideshowPhotos.length]);

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>;
  }

  // ─── Slideshow mode ───
  if (playing && slideshowPhotos.length > 0) {
    const photo = slideshowPhotos[currentIndex];
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col cursor-none"
        onMouseMove={resetAutoHide}
        onMouseEnter={() => setShowControls(true)}
        style={{ cursor: showControls ? 'default' : 'none' }}>

        {/* Controls bar — auto-hides */}
        <div className={cn("absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-6 py-4 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
          <div className="text-white text-sm">
            <span className="font-semibold text-lg">{event?.title ?? "Gallery"}</span>
            <span className="ml-3 text-white/60">{currentIndex + 1} / {slideshowPhotos.length}</span>
            {selected.size > 0 && <span className="ml-2 text-white/40">({selected.size} selected)</span>}
          </div>
          <div className="flex items-center gap-3">
            <select value={slideInterval} onChange={(e) => { setSlideInterval(Number(e.target.value)); resetAutoHide(); }}
              className="rounded bg-white/20 px-2 py-1 text-xs text-white border border-white/20">
              <option value={2}>2s</option><option value={4}>4s</option><option value={6}>6s</option><option value={10}>10s</option>
            </select>
            <button onClick={stopSlideshow} className="rounded-lg bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/20">✕ Exit</button>
          </div>
        </div>

        {/* Photo — full screen */}
        {photo && (
          <img src={photo.url} alt={photo.originalFilename}
            className="absolute inset-0 h-full w-full object-contain"
            onClick={nextPhoto} />
        )}

        {/* Nav arrows — auto-hide */}
        <button onClick={prevPhoto}
          className={cn("absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all duration-300",
            showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>‹</button>
        <button onClick={nextPhoto}
          className={cn("absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all duration-300",
            showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>›</button>

        {/* Pause indicator */}
        {!timerRef.current && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 p-6 text-white text-4xl">
            ⏸
          </div>
        )}

        {/* Thumbnail strip — auto-hide */}
        <div className={cn("absolute bottom-0 left-0 right-0 flex gap-1 overflow-x-auto bg-gradient-to-t from-black/80 to-transparent px-4 py-3 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none")}>
          {slideshowPhotos.map((p, i) => (
            <img key={p.id} src={p.url} alt=""
              onClick={() => { setCurrentIndex(i); resetAutoHide(); }}
              className={cn("h-14 w-14 flex-shrink-0 cursor-pointer rounded object-cover transition-all hover:scale-110",
                i === currentIndex ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-80")} />
          ))}
        </div>
      </div>
    );
  }

  // ─── Gallery selection mode ───
  const backLink = spaceSlug ? `/s/${spaceSlug}` : `/dashboard/events/${eventId}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link to={backLink} className="mb-2 inline-block text-sm text-neutral-500 hover:text-neutral-700">&larr; Back</Link>
          <h1 className="font-display text-2xl font-bold text-neutral-900">{event?.title ?? "Gallery"}</h1>
          <p className="text-sm text-neutral-500">{photos.length} photos</p>
        </div>
        <div className="flex gap-3">
          <button onClick={selectAll} className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Select all</button>
          <button onClick={deselectAll} className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Clear</button>
          <button onClick={startSlideshow}
            className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700">
            ▶ Play slideshow {selected.size > 0 ? `(${selected.size})` : `(${photos.length})`}
          </button>
        </div>
      </div>

      {/* Photo grid with checkboxes */}
      {photos.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
          <span className="text-4xl">📸</span>
          <p className="mt-4 text-neutral-400">No photos yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {photos.map((p) => (
            <div key={p.id}
              onClick={() => toggleSelect(p.id)}
              className={cn("group relative aspect-square cursor-pointer overflow-hidden rounded-xl transition-all",
                selected.has(p.id) ? "ring-4 ring-primary-500 scale-95" : "hover:ring-2 hover:ring-neutral-300")}>
              <img src={p.url} alt={p.originalFilename} className="h-full w-full object-cover" loading="lazy" />
              {/* Checkbox overlay */}
              <div className={cn("absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all",
                selected.has(p.id) ? "border-primary-600 bg-primary-600 text-white" : "border-white bg-black/30")}>
                {selected.has(p.id) && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
              </div>
              {/* Filename on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-white truncate">{p.originalFilename}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom action bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl border border-border bg-white px-6 py-3 shadow-xl flex items-center gap-4 z-40">
          <span className="text-sm font-medium text-neutral-700">{selected.size} photo{selected.size !== 1 ? "s" : ""} selected</span>
          <button onClick={startSlideshow} className="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-primary-700">▶ Play</button>
          <button onClick={deselectAll} className="text-sm text-neutral-500 hover:text-neutral-700">Clear</button>
        </div>
      )}
    </div>
  );
}
