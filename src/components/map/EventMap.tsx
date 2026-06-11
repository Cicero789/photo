import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/types";

interface EventMapProps {
  photos: Photo[];
  className?: string;
}

interface MapPhoto {
  id: string;
  url: string;
  latitude: number;
  longitude: number;
  filename: string;
}

export function EventMap({ photos, className }: EventMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MapPhoto | null>(null);

  const geoPhotos: MapPhoto[] = photos
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => ({
      id: p.id,
      url: p.storageKey,
      latitude: p.latitude!,
      longitude: p.longitude!,
      filename: p.originalFilename,
    }));

  useEffect(() => {
    if (geoPhotos.length === 0 || !mapContainer.current) return;

    // Dynamically load Mapbox GL
    const loadMap = async () => {
      // @ts-expect-error Mapbox GL is loaded via CDN
      if (typeof mapboxgl === "undefined") {
        const script = document.createElement("script");
        script.src = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js";
        const css = document.createElement("link");
        css.href = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css";
        css.rel = "stylesheet";
        document.head.appendChild(css);
        await new Promise<void>((resolve) => {
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      // @ts-expect-error Mapbox GL global
      const mapboxgl = window.mapboxgl;
      if (!mapboxgl) return;

      mapboxgl.accessToken = "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/light-v11",
        center: [geoPhotos[0]!.longitude, geoPhotos[0]!.latitude],
        zoom: 12,
      });

      // Add markers
      geoPhotos.forEach((photo) => {
        const el = document.createElement("div");
        el.className = "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-600 text-white shadow-lg text-xs font-bold border-2 border-white transition-transform hover:scale-125";
        el.textContent = "📷";
        el.title = photo.filename;

        el.addEventListener("click", () => setSelectedPhoto(photo));

        new mapboxgl.Marker(el)
          .setLngLat([photo.longitude, photo.latitude])
          .addTo(map);
      });

      // Fit bounds
      if (geoPhotos.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        geoPhotos.forEach((p) => bounds.extend([p.longitude, p.latitude]));
        map.fitBounds(bounds, { padding: 60 });
      }

    };

    loadMap();

    return () => {};
  }, [geoPhotos.length]);

  if (geoPhotos.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 py-12 text-center ${className}`}>
        <span className="text-3xl">🗺️</span>
        <p className="mt-3 text-sm text-neutral-500">
          No location data found in photos.
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Photos taken with GPS-enabled devices will appear on the map automatically.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="h-80 w-full rounded-2xl border border-border sm:h-96" />

      {/* Selected photo popup */}
      {selectedPhoto && (
        <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-border bg-white p-3 shadow-lg">
          <div className="flex gap-3">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              className="h-16 w-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-700 truncate">{selectedPhoto.filename}</p>
              <p className="text-xs text-neutral-400">
                {selectedPhoto.latitude.toFixed(4)}, {selectedPhoto.longitude.toFixed(4)}
              </p>
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="text-neutral-400 hover:text-neutral-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <p className="mt-2 text-xs text-neutral-400">
        {geoPhotos.length} of {photos.length} photos have location data
      </p>
    </div>
  );
}
