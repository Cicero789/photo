import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

interface SpaceEventMapProps {
  photos: Photo[];
  events?: Array<{
    id: string;
    title: string;
    latitude: number | null;
    longitude: number | null;
    photoCount: number;
    coverPhotoUrl?: string | null;
    spaceSlug?: string;
  }>;
  className?: string;
  emptyMessage?: string;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";
let MAPBOX_LOADED = false;
let MAPBOX_LOADING: Promise<void> | null = null;

function loadMapbox(): Promise<void> {
  if (MAPBOX_LOADED) return Promise.resolve();
  if (MAPBOX_LOADING) return MAPBOX_LOADING;
  MAPBOX_LOADING = new Promise<void>((resolve) => {
    // @ts-expect-error mapboxgl global
    if (typeof mapboxgl !== "undefined") { MAPBOX_LOADED = true; resolve(); return; }
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js";
    script.onload = () => { MAPBOX_LOADED = true; resolve(); };
    script.onerror = () => { MAPBOX_LOADING = null; resolve(); };
    const css = document.createElement("link");
    css.href = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css";
    css.rel = "stylesheet";
    document.head.appendChild(css);
    document.head.appendChild(script);
  });
  return MAPBOX_LOADING;
}

export function SpaceEventMap({ photos, events = [], className, emptyMessage }: SpaceEventMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const [mapFailed, setMapFailed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Build geo points
  const geoPoints: Array<{
    type: "event" | "photo";
    id: string; eventId?: string;
    lat: number; lng: number;
    title: string;
    imageUrl?: string;
    photoCount?: number;
    spaceSlug?: string;
  }> = [];

  events.forEach((ev) => {
    if (ev.latitude != null && ev.longitude != null) {
      geoPoints.push({ type: "event", id: ev.id, lat: ev.latitude, lng: ev.longitude, title: ev.title, photoCount: ev.photoCount, imageUrl: ev.coverPhotoUrl ?? undefined, spaceSlug: ev.spaceSlug });
    }
  });
  photos.forEach((p) => {
    if (p.latitude != null && p.longitude != null) {
      geoPoints.push({ type: "photo", id: p.id, eventId: p.eventId, lat: p.latitude, lng: p.longitude, title: p.originalFilename, imageUrl: p.url });
    }
  });

  useEffect(() => {
    if (geoPoints.length === 0 || !containerRef.current) return;

    let cancelled = false;
    const container = containerRef.current;

    loadMapbox().then(() => {
      if (cancelled || !container) return;
      // @ts-expect-error mapboxgl
      const mb = window.mapboxgl;
      if (!mb) { setMapFailed(true); return; }
      mb.accessToken = MAPBOX_TOKEN;

      // Clear old markers
      (markersRef.current as Array<{ remove: () => void }>).forEach(m => m.remove());
      markersRef.current = [];

      // Create or reuse map
      let map = mapRef.current as { remove: () => void; getCenter: () => unknown; flyTo: (o: unknown) => void; fitBounds: (b: unknown, o: unknown) => void } | null;
      if (!map) {
        map = new mb.Map({
          container,
          style: "mapbox://styles/mapbox/light-v11",
          center: [geoPoints[0]!.lng, geoPoints[0]!.lat],
          zoom: 12,
        }) as { remove: () => void; getCenter: () => unknown; flyTo: (o: unknown) => void; fitBounds: (b: unknown, o: unknown) => void };
        mapRef.current = map;
      }

      // Add markers
      const bounds = new mb.LngLatBounds();
      geoPoints.forEach((pt) => {
        const el = document.createElement("div");
        if (pt.type === "event") {
          el.className = "flex items-center gap-1 cursor-pointer rounded-full bg-primary-600 text-white shadow-lg px-3 py-1.5 text-xs font-bold border-2 border-white transition-transform hover:scale-110";
          el.innerHTML = `📌 ${pt.title.slice(0, 20)}${pt.title.length > 20 ? "…" : ""}`;
        } else {
          el.className = "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent-500 text-white shadow-lg text-[10px] font-bold border-2 border-white transition-transform hover:scale-125";
          el.innerHTML = "📷";
        }
        el.title = pt.title;
        el.addEventListener("click", () => {
          if (pt.type === "event") { setSelectedEvent(pt.id); map!.flyTo({ center: [pt.lng, pt.lat], zoom: 14 }); }
        });
        const marker = new mb.Marker(el).setLngLat([pt.lng, pt.lat]).addTo(map);
        (markersRef.current as unknown[]).push(marker);
        bounds.extend([pt.lng, pt.lat]);
      });

      if (geoPoints.length > 1) {
        map.fitBounds(bounds, { padding: 80, maxZoom: 15 });
      }
    }).catch(() => { if (!cancelled) setMapFailed(true); });

    return () => { cancelled = true; };
  }, [events, photos]);

  const eventPhotos = photos.filter((p) => p.eventId === selectedEvent);
  const selectedEv = events.find((e) => e.id === selectedEvent);

  if (mapFailed) {
    return <div className={cn("flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-red-50 py-16 text-center", className)}>
      <span className="text-4xl">🗺️</span>
      <p className="mt-4 text-red-600 font-medium">Map failed to load</p>
      <p className="mt-1 text-sm text-red-400">Check your connection and try again.</p>
    </div>;
  }

  if (geoPoints.length === 0) {
    return <div className={cn("flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white py-16 text-center", className)}>
      <span className="text-4xl">🗺️</span>
      <p className="mt-4 text-neutral-500">{emptyMessage ?? "No locations yet. Add event addresses or upload photos with GPS data."}</p>
      <p className="mt-2 text-xs text-neutral-400">Events with addresses will appear as 📌 pins. Geotagged photos appear as 📷 pins.</p>
    </div>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="mb-2 flex items-center gap-2 text-sm text-neutral-500">
        <span>📍</span>
        <span>{geoPoints.filter(p => p.type === "event").length} event pin{geoPoints.filter(p => p.type === "event").length !== 1 ? "s" : ""}</span>
        <span>·</span>
        <span>{geoPoints.filter(p => p.type === "photo").length} photo pin{geoPoints.filter(p => p.type === "photo").length !== 1 ? "s" : ""}</span>
      </div>
      <div ref={containerRef} className="h-[500px] w-full rounded-2xl border border-border sm:h-[600px]" />

      {selectedEvent && selectedEv && (
        <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-border bg-white p-4 shadow-lg max-h-64 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold text-neutral-900">{selectedEv.title}</p>
              <p className="text-xs text-neutral-500">{eventPhotos.length} photo{eventPhotos.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex gap-2">
              {selectedEv.spaceSlug && (
                <Link to={`/s/${selectedEv.spaceSlug}/e/${selectedEvent}`} className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">Open →</Link>
              )}
              <button onClick={() => setSelectedEvent(null)} className="rounded-lg px-2 py-1.5 text-xs text-neutral-400 hover:bg-neutral-100">✕</button>
            </div>
          </div>
          {eventPhotos.length > 0 ? (
            <div className="grid grid-cols-4 gap-2">
              {eventPhotos.slice(0, 8).map((p) => <img key={p.id} src={p.url} alt={p.originalFilename} className="aspect-square rounded-lg object-cover" />)}
            </div>
          ) : <p className="text-sm text-neutral-400 text-center py-4">No photos yet.</p>}
        </div>
      )}
    </div>
  );
}
