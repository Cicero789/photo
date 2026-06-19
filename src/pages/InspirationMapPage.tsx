import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { HireButton } from "@/components/photographer/HireButton";

interface InspirationItem {
  id: string; userName: string; photoUrl: string; address: string;
  latitude: number; longitude: number; category: string; season: string; loves: number;
  tips?: string; bestTime?: string; permissionInfo?: string;
  source?: string; score?: number; author?: string; licenseUrl?: string; thumbnailUrl?: string;
}

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";

const CATEGORIES = ["general","wedding","nature","urban","golden_hour","night","portrait","event"];
const SEASONS = ["","spring","summer","fall","winter"];

/* ---------- Mapbox CDN loader (idempotent) ---------- */
let mapboxPromise: Promise<void> | null = null;
function loadMapboxScript(): Promise<void> {
  // @ts-expect-error
  if (window.mapboxgl) return Promise.resolve();
  if (mapboxPromise) return mapboxPromise;
  mapboxPromise = new Promise<void>(resolve => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
  return mapboxPromise;
}

/* ---------- GeoJSON builder ---------- */
function buildFeatures(items: InspirationItem[], selectedId: string | null) {
  return {
    type: "FeatureCollection" as const,
    features: items
      .filter(i => i.latitude && i.longitude)
      .map(item => {
        const isFrameNest = !item.source || item.source === "framenest";
        const isCC0 = item.source === "cc0" || item.source === "seed";
        const hasPhoto = !!(item.thumbnailUrl || item.photoUrl);
        const name = item.address.split(",")[0] || item.address;
        return {
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: [item.longitude, item.latitude] },
          properties: {
            id: item.id,
            shortName: name.length > 20 ? name.slice(0, 18) + "…" : name,
            pinColor: isFrameNest ? "#2563eb" : (isCC0 && hasPhoto) ? "#f59e0b" : "#9ca3af",
            isSelected: item.id === selectedId ? 1 : 0,
          },
        };
      }),
  };
}

export function InspirationMapPage() {
  const [items, setItems] = useState<InspirationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<InspirationItem | null>(null);
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [sort, setSort] = useState("newest");
  const [loved, setLoved] = useState<Set<string>>(new Set());
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapReadyRef = useRef(false);
  const itemsRef = useRef<InspirationItem[]>([]);
  const hasFitRef = useRef(false);

  // Keep itemsRef in sync for stale-closure-safe map handlers
  useEffect(() => { itemsRef.current = items; }, [items]);

  // Fetch data
  useEffect(() => {
    setLoading(true);
    hasFitRef.current = false; // re-fit bounds on next data update
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (season) params.set("season", season);
    if (sort) params.set("sort", sort);
    api.get(`/inspiration?${params}`).then((d: any) => setItems(d.items || [])).catch(() => {}).finally(() => setLoading(false));
  }, [category, season, sort]);

  // ---- Map initialization (runs once) ----
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    loadMapboxScript().then(() => {
      if (cancelled || !containerRef.current) return;
      // @ts-expect-error
      const mb = window.mapboxgl;
      if (!mb) return;
      mb.accessToken = MAPBOX_TOKEN;

      const map = new mb.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [-98, 39],
        zoom: 2.5,
      });
      mapRef.current = map;

      map.on("load", () => {
        if (cancelled) return;

        // GeoJSON source with clustering
        map.addSource("pins", {
          type: "geojson",
          data: buildFeatures(itemsRef.current, null),
          cluster: true,
          clusterMaxZoom: 11,
          clusterRadius: 50,
        });

        // Layer 1 — Cluster circles
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "pins",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": ["step", ["get", "point_count"], "#93c5fd", 10, "#3b82f6", 30, "#1d4ed8"],
            "circle-radius": ["step", ["get", "point_count"], 18, 10, 24, 30, 30],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff",
          },
        });

        // Layer 2 — Cluster count labels
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "pins",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 13,
          },
          paint: { "text-color": "#ffffff" },
        });

        // Layer 3 — Individual pin dots
        // Note: ["zoom"] must be the input to the outermost interpolate/step,
        // so data-driven case goes INSIDE each zoom stop, not the other way around.
        map.addLayer({
          id: "pin-dots",
          type: "circle",
          source: "pins",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": ["get", "pinColor"],
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              4, ["case", ["==", ["get", "isSelected"], 1], 12, 5],
              10, ["case", ["==", ["get", "isSelected"], 1], 12, 8],
              14, ["case", ["==", ["get", "isSelected"], 1], 12, 10],
            ],
            "circle-stroke-width": ["case", ["==", ["get", "isSelected"], 1], 3, 2],
            "circle-stroke-color": "#ffffff",
            "circle-opacity": ["case", ["==", ["get", "isSelected"], 1], 1, 0.85],
          },
        });

        // Layer 4 — Pin labels at zoom ≥ 12
        map.addLayer({
          id: "pin-labels",
          type: "symbol",
          source: "pins",
          filter: ["!", ["has", "point_count"]],
          minzoom: 12,
          layout: {
            "text-field": ["get", "shortName"],
            "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
            "text-size": 11,
            "text-offset": [0, 1.2],
            "text-anchor": "top",
            "text-max-width": 10,
          },
          paint: {
            "text-color": "#374151",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.5,
          },
        });

        // --- Interactions ---

        // Click individual pin
        map.on("click", "pin-dots", (e: any) => {
          const feat = e.features?.[0];
          if (!feat) return;
          const item = itemsRef.current.find(i => i.id === feat.properties.id);
          if (item) {
            setSelected(item);
            map.flyTo({ center: [item.longitude, item.latitude], zoom: 14 });
          }
        });

        // Click cluster → zoom in
        map.on("click", "clusters", (e: any) => {
          const feat = e.features?.[0];
          if (!feat) return;
          (map.getSource("pins") as any).getClusterExpansionZoom(feat.properties.cluster_id, (err: any, zoom: number) => {
            if (err) return;
            map.easeTo({ center: (feat.geometry as any).coordinates, zoom });
          });
        });

        // Cursor
        map.on("mouseenter", "pin-dots", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "pin-dots", () => { map.getCanvas().style.cursor = ""; });
        map.on("mouseenter", "clusters", () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", "clusters", () => { map.getCanvas().style.cursor = ""; });

        // --- Enhance base map labels for zoomed-in context ---
        // Show more POI labels at zoom 12+ (default only shows rank 1 until zoom 16)
        if (map.getLayer("poi-label")) {
          map.setFilter("poi-label", ["<=", ["get", "filterrank"],
            ["+", ["step", ["zoom"], 0, 12, 1, 14, 2, 16, 3], 1],
          ]);
          map.setPaintProperty("poi-label", "text-color", "hsl(220, 5%, 40%)");
        }
        // Darken road labels for readability on light background
        if (map.getLayer("road-label-simple")) {
          map.setPaintProperty("road-label-simple", "text-color", "hsl(220, 5%, 35%)");
        }
        // Show neighborhood names slightly earlier
        if (map.getLayer("settlement-subdivision-label")) {
          map.setLayerZoomRange("settlement-subdivision-label", 8, 24);
        }

        mapReadyRef.current = true;

        // If data loaded before the map, do initial fitBounds now
        if (itemsRef.current.length > 1 && !hasFitRef.current) {
          const bounds = new mb.LngLatBounds();
          itemsRef.current.forEach((item: any) => {
            if (item.latitude && item.longitude) bounds.extend([item.longitude, item.latitude]);
          });
          map.fitBounds(bounds, { padding: 60, maxZoom: 10 });
          hasFitRef.current = true;
        }
      });
    });

    return () => {
      cancelled = true;
      mapReadyRef.current = false;
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Sync GeoJSON data when items or selected changes ----
  useEffect(() => {
    if (!mapReadyRef.current || !mapRef.current) return;
    const src = mapRef.current.getSource("pins");
    if (!src) return;
    (src as any).setData(buildFeatures(items, selected?.id ?? null));

    // Fit bounds only on fresh data (filter change), not on selection change
    if (!hasFitRef.current && items.length > 1) {
      // @ts-expect-error
      const bounds = new window.mapboxgl.LngLatBounds();
      items.forEach(item => {
        if (item.latitude && item.longitude) bounds.extend([item.longitude, item.latitude]);
      });
      mapRef.current.fitBounds(bounds, { padding: 60, maxZoom: 10 });
      hasFitRef.current = true;
    }
  }, [items, selected]);

  const handleLove = async (id: string) => {
    try {
      const d: any = await api.post(`/inspiration/${id}/love`);
      setItems(prev => prev.map(i => i.id === id ? { ...i, loves: i.loves + (d.loved ? 1 : -1) } : i));
      setLoved(prev => { const n = new Set(prev); if (d.loved) n.add(id); else n.delete(id); return n; });
    } catch {}
  };

  const selectItem = (item: InspirationItem) => {
    setSelected(item);
    if (mapRef.current) mapRef.current.flyTo({ center: [item.longitude, item.latitude], zoom: 14 });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0 border-r border-border bg-white overflow-y-auto p-4">
        <h1 className="font-display text-xl font-bold text-neutral-900">🌍 Inspiration Map</h1>
        <p className="text-xs text-neutral-500 mt-1">Discover beautiful photo locations. Submit your own to inspire others.</p>

        {/* Filters */}
        <div className="mt-4 space-y-2">
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-lg border px-3 py-1.5 text-sm">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c.replace("_"," ")}</option>)}
          </select>
          <div className="flex gap-1">
            {SEASONS.map(s => <button key={s||"all"} onClick={() => setSeason(s)} className={cn("flex-1 rounded px-2 py-1 text-xs font-medium", season===s?"bg-primary-600 text-white":"bg-muted text-neutral-600 hover:bg-neutral-200")}>{s||"All"}</button>)}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="w-full rounded-lg border px-3 py-1.5 text-sm">
            <option value="newest">Newest</option><option value="loves">Most Loved</option>
          </select>
        </div>

        {/* Feed */}
        <div className="mt-4 space-y-2">
          {loading ? <div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-3 border-primary-200 border-t-primary-600" /></div>
          : items.length === 0 ? <p className="text-sm text-neutral-400 text-center py-8">No photos yet. Be the first to submit!</p>
          : items.map(item => (
            <div key={item.id} onClick={() => selectItem(item)} className={cn("cursor-pointer rounded-xl border p-3 transition-all hover:shadow-sm", selected?.id === item.id ? "border-primary-500 bg-primary-50" : "border-border bg-white")}>
              <div className="flex gap-3">
                {(item.thumbnailUrl || item.photoUrl) ? <img src={item.thumbnailUrl || item.photoUrl} alt="" className="h-16 w-16 rounded-lg object-cover" /> : <div className="h-16 w-16 rounded-lg bg-neutral-100 flex items-center justify-center text-2xl">📍</div>}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{item.address}</p>
                  <p className="text-[10px] text-neutral-400">{item.source === "framenest" ? `by ${item.userName}` : item.author ? `© ${item.author}` : "Public domain"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={(e) => { e.stopPropagation(); handleLove(item.id); }} className={cn("text-xs", loved.has(item.id) ? "text-red-500" : "text-neutral-400 hover:text-red-400")}>
                      {loved.has(item.id) ? "❤️" : "🤍"} {item.loves}
                    </button>
                    <span className="text-[10px] text-neutral-300">{item.category.replace("_"," ")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={containerRef} className="h-full w-full" />

        {/* Selected photo overlay */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 lg:left-4 lg:right-4 rounded-xl border border-border bg-white p-4 shadow-lg z-10 max-w-lg">
            <div className="flex gap-3">
              {selected.photoUrl || selected.thumbnailUrl ? (
                <img src={selected.photoUrl || selected.thumbnailUrl} alt="" className="h-24 w-24 rounded-lg object-cover" />
              ) : (
                <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-3xl">📍</div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{selected.address}</p>
                <p className="text-xs text-neutral-500">{selected.source === "framenest" ? `by ${selected.userName}` : selected.author ? `© ${selected.author}` : ""} · {selected.loves} ❤️</p>
                {selected.licenseUrl && <a href={selected.licenseUrl} target="_blank" className="text-[10px] text-blue-500 hover:underline">License ↗</a>}
                <p className="text-[10px] text-neutral-400 mt-1">📍 {selected.latitude.toFixed(4)}, {selected.longitude.toFixed(4)}</p>
                {(selected.tips || selected.bestTime || selected.permissionInfo) && (
                  <div className="mt-2 space-y-1 border-t border-border pt-2">
                    {selected.tips && <p className="text-[10px] text-neutral-600">💡 {selected.tips}</p>}
                    {selected.bestTime && <p className="text-[10px] text-neutral-500">🕐 Best: {selected.bestTime}</p>}
                    {selected.permissionInfo && <p className="text-[10px] text-neutral-500">📋 {selected.permissionInfo}</p>}
                  </div>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  <button onClick={() => handleLove(selected.id)} className={cn("rounded-lg px-3 py-1 text-xs font-semibold", loved.has(selected.id) ? "bg-red-100 text-red-600" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200")}>
                    {loved.has(selected.id) ? "❤️ Loved" : "🤍 Love"}
                  </button>
                  {(!selected.source || selected.source === "framenest") ? (
                    <HireButton photographerName={selected.userName} locationName={selected.address} />
                  ) : (
                    <a href="/photographers" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] text-amber-700 hover:bg-amber-100 font-medium">
                      📸 Be the first photographer here →
                    </a>
                  )}
                  <button onClick={() => setSelected(null)} className="rounded-lg px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-100">✕ Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
