import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

interface Ev { id: string; title: string; photoCount: number; coverPhotoUrl?: string | null }

export function DashboardGalleryPage() {
  const [sp] = useSearchParams();
  const preselected = sp.get("eventId");

  const [events, setEvents] = useState<Ev[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set(preselected ? [preselected] : []));
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideInterval, setSlideInterval] = useState(4);
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef<any>(null);
  const hideTimerRef = useRef<any>(null);

  useEffect(() => {
    api.get<{ events: Ev[] }>("/events").then(d => { setEvents(d.events); if (preselected) setSelected(new Set([preselected])); }).catch(()=>{}).finally(()=>setLoading(false));
  }, [preselected]);

  const resetAutoHide = () => { setShowControls(true); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); hideTimerRef.current = setTimeout(() => setShowControls(false), 3000); };

  // Reset + auto-load when favoritesOnly or selection changes
  useEffect(() => { setPhotos([]); }, [favoritesOnly]);
  useEffect(() => {
    if (favoritesOnly && selected.size > 0) {
      (async () => {
        const all: any[] = [];
        for (const eid of selected) {
          try { const d = await api.get(`/events/${eid}`); if (d && (d as any).photos) all.push(...(d as any).photos); } catch {}
        }
        setPhotos(all);
      })();
    } else if (!favoritesOnly) {
      setPhotos([]);
    }
  }, [favoritesOnly, selected]);

  const start = async () => {
    if (selected.size === 0) return;
    setLoadingPhotos(true);
    let all: any[] = [];
    for (const eid of selected) {
      try { const d = await api.get(`/events/${eid}`); if (d && (d as any).photos) all.push(...(d as any).photos); } catch {}
    }
    if (favoritesOnly) all = all.filter((p: any) => p.favorite);
    setPhotos(all); setLoadingPhotos(false);
    if (all.length === 0) return;
    setCurrentIndex(0); setPlaying(true);
    try { document.documentElement.requestFullscreen?.().catch(()=>{}); } catch {}
    resetAutoHide();
  };
  const stop = () => { setPlaying(false); if (timerRef.current) clearInterval(timerRef.current); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); try { if (document.fullscreenElement) document.exitFullscreen?.().catch(()=>{}); } catch {} };

  useEffect(() => {
    if (!playing || photos.length === 0) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = window.setInterval(() => setCurrentIndex(i => (i + 1) % photos.length), slideInterval * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, slideInterval, photos.length]);

  const nxt = () => setCurrentIndex(i => (i + 1) % photos.length);
  const prv = () => setCurrentIndex(i => (i - 1 + photos.length) % photos.length);

  const totalEv = events.filter(e => selected.has(e.id)).reduce((s, e) => s + e.photoCount, 0);
  const favCount = photos.filter((p: any) => p.favorite).length;
  const total = favoritesOnly ? favCount : (photos.length || totalEv);

  if (playing && photos.length > 0) {
    const p = photos[currentIndex];
    return <div className="fixed inset-0 z-50 bg-black flex flex-col" onMouseMove={resetAutoHide} style={{cursor:showControls?'default':'none'}}>
      <div className={cn("absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/80 px-6 py-3 transition-opacity duration-500", showControls?"opacity-100":"opacity-0 pointer-events-none")}>
        <div className="text-white text-sm"><span className="font-semibold text-lg">{selected.size} event{selected.size!==1?"s":""}</span><span className="ml-3 text-white/60">{currentIndex+1}/{photos.length}</span></div>
        <div className="flex items-center gap-3">
          <select value={slideInterval} onChange={e=>{setSlideInterval(Number(e.target.value));resetAutoHide()}} className="rounded bg-white/20 px-2 py-1 text-xs text-white"><option value={2}>2s</option><option value={4}>4s</option><option value={6}>6s</option><option value={10}>10s</option></select>
          <button onClick={stop} className="rounded-lg bg-white/10 px-4 py-1.5 text-sm text-white hover:bg-white/20">✕ Exit</button>
        </div>
      </div>
      {p && <img src={p.url} alt={p.originalFilename} className="absolute inset-0 h-full w-full object-contain" onClick={nxt} />}
      <button onClick={prv} className={cn("absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all", showControls?"opacity-100":"opacity-0 pointer-events-none")}>‹</button>
      <button onClick={nxt} className={cn("absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all", showControls?"opacity-100":"opacity-0 pointer-events-none")}>›</button>
    </div>;
  }

  return <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
    <Link to="/dashboard" className="mb-2 inline-block text-sm text-neutral-500 hover:text-neutral-700">&larr; Dashboard</Link>
    <h1 className="font-display text-2xl font-bold text-neutral-900">Slideshow</h1>
    <p className="text-sm text-neutral-500 mb-8">Select one or more events to combine their photos into a slideshow.</p>

    {loading ? <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>
    : events.length === 0 ? <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border py-20"><span className="text-4xl">📸</span><p className="mt-4 text-neutral-400">No events yet.</p></div>
    : <><div className="mb-6 flex items-center gap-3 flex-wrap">
        <button onClick={()=>setSelected(new Set(events.map(e=>e.id)))} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Select all</button>
        <button onClick={()=>setSelected(new Set())} className="rounded-lg border px-3 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Clear</button>
        <label className="flex items-center gap-2 cursor-pointer text-sm text-neutral-600"><input type="checkbox" checked={favoritesOnly} onChange={e=>setFavoritesOnly(e.target.checked)} className="rounded" />⭐ Favorites only</label>
        <button onClick={start} disabled={selected.size===0 || loadingPhotos} className="rounded-lg bg-accent-600 px-5 py-2 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-50">{loadingPhotos?"Loading...":`▶ Play ${total} photo${total!==1?"s":""}`}</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(ev=><div key={ev.id} onClick={()=>setSelected(p=>{const n=new Set(p);if(n.has(ev.id))n.delete(ev.id);else n.add(ev.id);return n})} className={cn("cursor-pointer rounded-xl border-2 p-4 transition-all",selected.has(ev.id)?"border-primary-500 bg-primary-50 shadow-md":"border-border bg-white hover:border-neutral-300")}>
          <div className="flex items-center gap-3"><div className={cn("flex h-6 w-6 items-center justify-center rounded border-2",selected.has(ev.id)?"border-primary-600 bg-primary-600 text-white":"border-neutral-300")}>{selected.has(ev.id)&&"✓"}</div><div className="min-w-0"><p className="font-medium truncate">{ev.title}</p><p className="text-xs text-neutral-500">{ev.photoCount} photo{ev.photoCount!==1?"s":""}</p></div></div>
        </div>)}
      </div></>}
  </div>;
}
