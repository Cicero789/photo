import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import type { Photo } from "@/types";

interface SpaceEventMapProps {
  photos: Photo[];
  events?: Array<{
    id: string; title: string;
    latitude: number | null; longitude: number | null;
    photoCount: number;
    coverPhotoUrl?: string | null;
    spaceSlug?: string;
  }>;
  className?: string;
  emptyMessage?: string;
}

// Public token (pk.*) — restricted by domain in Mapbox dashboard
const MAPBOX_TOKEN = "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";

function loadMapboxScript(): Promise<void> {
  // @ts-expect-error mapboxgl
  if (typeof mapboxgl !== "undefined") return Promise.resolve();
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js";
    s.onload = () => resolve();
    const c = document.createElement("link");
    c.href = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css";
    c.rel = "stylesheet";
    document.head.appendChild(c);
    document.head.appendChild(s);
  });
}

export function SpaceEventMap({ photos, events = [], className, emptyMessage }: SpaceEventMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const loadedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [eventPhotos, setEventPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  // Stable geo points keyed by id
  const geoPoints = useMemo(() => {
    const pts: Array<{ type: "event" | "photo"; id: string; eventId?: string; lat: number; lng: number; title: string; imageUrl?: string; photoCount?: number; spaceSlug?: string }> = [];
    events.forEach(ev => { if (ev.latitude != null && ev.longitude != null) pts.push({ type: "event", id: ev.id, lat: ev.latitude, lng: ev.longitude, title: ev.title, photoCount: ev.photoCount, imageUrl: ev.coverPhotoUrl ?? undefined, spaceSlug: ev.spaceSlug }); });
    photos.forEach(p => { if (p.latitude != null && p.longitude != null) pts.push({ type: "photo", id: p.id, eventId: p.eventId, lat: p.latitude, lng: p.longitude, title: p.originalFilename, imageUrl: p.url }); });
    return pts;
  }, [events, photos]);

  // Unique key for marker set — only changes when point IDs change
  const pointIds = useMemo(() => geoPoints.map(p => p.id).sort().join(","), [geoPoints]);

  const handleEventClick = async (eventId: string) => {
    setSelectedEvent(eventId);
    setLoadingPhotos(true);
    try {
      const data = await api.get<{ photos: Photo[] }>(`/events/${eventId}`);
      setEventPhotos(Array.isArray((data as any).photos) ? (data as any).photos : []);
    } catch { setEventPhotos([]); }
    finally { setLoadingPhotos(false); }
  };

  // Load map once
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    loadMapboxScript().then(() => {
      if (cancelled || !containerRef.current) return;
      // @ts-expect-error
      const mb = window.mapboxgl;
      if (!mb) return;
      mb.accessToken = MAPBOX_TOKEN;
      const map = new mb.Map({ container: containerRef.current, style: "mapbox://styles/mapbox/light-v11", center: [-98, 39], zoom: 3 });
      mapRef.current = map;
      loadedRef.current = true;
      setReady(true);
    });
    return () => { cancelled = true; };
  }, []);

  // Update markers when pointIds change, but only if map is loaded
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    const map = mapRef.current;

    // Remove old markers
    markersRef.current.forEach((m: any) => m.remove());
    markersRef.current = [];

    if (geoPoints.length === 0) return;

    const bounds = new (window as any).mapboxgl.LngLatBounds();
    geoPoints.forEach((pt: any) => {
      const el = document.createElement("div");
      if (pt.type === "event") {
        el.className = "flex items-center gap-1 cursor-pointer rounded-full bg-primary-600 text-white shadow-lg px-3 py-1.5 text-xs font-bold border-2 border-white whitespace-nowrap";
        el.textContent = `📌 ${pt.title.slice(0, 22)}${pt.title.length > 22 ? "…" : ""}`;
      } else {
        el.className = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent-500 text-white shadow-lg text-[10px] font-bold border-2 border-white";
        el.textContent = "📷";
      }
      el.title = pt.title;
      el.addEventListener("click", () => {
        if (pt.type === "event") {
          handleEventClick(pt.id);
          map.flyTo({ center: [pt.lng, pt.lat], zoom: 14 });
        } else if (pt.type === "photo" && pt.eventId) {
          // Navigate to event page for photo pins
          const slug = pt.spaceSlug || events.find(e => e.id === pt.eventId)?.spaceSlug;
          if (slug) window.location.href = `/s/${slug}/e/${pt.eventId}`;
        }
      });

      const marker = new (window as any).mapboxgl.Marker(el).setLngLat([pt.lng, pt.lat]).addTo(map);
      markersRef.current.push(marker);
      bounds.extend([pt.lng, pt.lat]);
    });

    if (geoPoints.length > 1) {
      map.fitBounds(bounds, { padding: 80, maxZoom: 15 });
    } else if (geoPoints.length === 1) {
      map.flyTo({ center: [geoPoints[0]!.lng, geoPoints[0]!.lat], zoom: 13 });
    }
  }, [pointIds, ready]);

  const selectedEv = events.find(e => e.id === selectedEvent);

  if (geoPoints.length === 0) {
    return <div className={cn("flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white py-16 text-center", className)}>
      <span className="text-4xl">🗺️</span>
      <p className="mt-4 text-neutral-500">{emptyMessage ?? "No locations yet. Add event addresses or upload photos with GPS data."}</p>
    </div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
        <span>📍 {geoPoints.filter(p => p.type === "event").length} event pin{geoPoints.filter(p => p.type === "event").length !== 1 ? "s" : ""} · {geoPoints.filter(p => p.type === "photo").length} photo</span>
      </div>
      <div ref={containerRef} className="h-[500px] w-full rounded-2xl border border-border sm:h-[600px]" />

      {selectedEvent && selectedEv && (
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border bg-white p-4 shadow-lg max-h-72 overflow-y-auto z-10">
          <div className="flex items-center justify-between mb-3">
            <div><p className="font-semibold text-neutral-900">{selectedEv.title}</p><p className="text-xs text-neutral-500">{selectedEv.photoCount} photos</p></div>
            <div className="flex gap-2">
              {selectedEv.spaceSlug && <Link to={`/s/${selectedEv.spaceSlug}/e/${selectedEvent}`} className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">Open →</Link>}
              <button onClick={() => { setSelectedEvent(null); setEventPhotos([]); }} className="rounded-lg px-2 py-1.5 text-xs text-neutral-400 hover:bg-neutral-100">✕</button>
            </div>
          </div>
          {loadingPhotos ? <div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-3 border-primary-200 border-t-primary-600" /></div>
          : eventPhotos.length > 0 ? <div className="grid grid-cols-4 gap-2">{eventPhotos.slice(0, 12).map(p => <img key={p.id} src={p.url} alt={p.originalFilename} className="aspect-square rounded-lg object-cover" />)}</div>
          : <p className="text-sm text-neutral-400 text-center py-4">No photos yet.</p>}
        </div>
      )}
    </div>
  );
}
