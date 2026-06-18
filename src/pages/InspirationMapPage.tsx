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
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (season) params.set("season", season);
    if (sort) params.set("sort", sort);
    api.get(`/inspiration?${params}`).then((d: any) => setItems(d.items || [])).catch(()=>{}).finally(()=>setLoading(false));
  }, [category, season, sort]);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const loadMap = async () => {
      // @ts-expect-error
      if (typeof mapboxgl === "undefined") {
        await new Promise<void>(resolve => { const s = document.createElement("script"); s.src = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js"; s.onload = () => resolve(); const c = document.createElement("link"); c.href = "https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.css"; c.rel = "stylesheet"; document.head.appendChild(c); document.head.appendChild(s); });
      }
      // @ts-expect-error
      const mb = window.mapboxgl; if (!mb) return;
      mb.accessToken = MAPBOX_TOKEN;
      const map = new mb.Map({ container: containerRef.current, style: "mapbox://styles/mapbox/streets-v12", center: [-98, 39], zoom: 2.5 });
      mapRef.current = map;

      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      const bounds = new mb.LngLatBounds();
      // Marker rendering with zoom-dependent detail
      const currentZoom = map.getZoom();
      const showLabels = currentZoom >= 10;

      items.forEach(item => {
        const el = document.createElement("div");
        const isFrameNest = !item.source || item.source === "framenest";
        const isCC0 = item.source === "cc0" || item.source === "seed";
        const name = item.address.split(",")[0] || item.address;
        const shortName = name.length > 20 ? name.slice(0,18) + "…" : name;

        if (showLabels) {
          el.className = `flex items-center gap-1 cursor-pointer rounded-full text-white shadow-lg px-2 py-1 text-[10px] font-bold border-2 border-white whitespace-nowrap ${isFrameNest ? "bg-primary-600" : isCC0 ? "bg-amber-500" : "bg-neutral-500"}`;
          el.innerHTML = `${isFrameNest ? "📸" : isCC0 ? "🖼️" : "📍"} ${shortName}`;
        } else {
          el.className = `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg text-xs font-bold border-2 border-white ${isFrameNest ? "bg-primary-600" : isCC0 ? "bg-amber-500" : "bg-neutral-400"}`;
          el.innerHTML = isFrameNest ? "📸" : isCC0 && item.thumbnailUrl ? "🖼️" : "📍";
        }
        el.title = item.address;
        el.addEventListener("click", () => { setSelected(item); map.flyTo({ center: [item.longitude, item.latitude], zoom: 14 }); });
        const marker = new mb.Marker(el).setLngLat([item.longitude, item.latitude]).addTo(map);
        markersRef.current.push(marker);
        bounds.extend([item.longitude, item.latitude]);
      });

      // Store items with markers for zoom updates
      const markerData = items.map((item, i) => ({ item, marker: markersRef.current[i] }));
      map.on("zoomend", () => {
        const z = map.getZoom();
        markerData.forEach(({ item, marker }) => {
          if (!marker) return;
          const el = marker.getElement();
          const isFrameNest = !item.source || item.source === "framenest";
          const isCC0 = item.source === "cc0" || item.source === "seed";
          const name = item.address.split(",")[0] || item.address;
          const shortName = name.length > 18 ? name.slice(0,16) + "…" : name;
          if (z >= 8) {
            el.className = `flex items-center gap-1 cursor-pointer rounded-full text-white shadow-lg px-2 py-1 text-[10px] font-bold border-2 border-white whitespace-nowrap ${isFrameNest ? "bg-primary-600" : isCC0 ? "bg-amber-500" : "bg-neutral-500"}`;
            el.innerHTML = `${isFrameNest ? "📸" : isCC0 ? "🖼️" : "📍"} ${shortName}`;
          } else {
            el.className = `flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white shadow-lg text-xs font-bold border-2 border-white ${isFrameNest ? "bg-primary-600" : isCC0 ? "bg-amber-500" : "bg-neutral-400"}`;
            el.innerHTML = isFrameNest ? "📸" : isCC0 && item.thumbnailUrl ? "🖼️" : "📍";
          }
        });
      });

      if (items.length > 1) map.fitBounds(bounds, { padding: 60, maxZoom: 10 });
    };
    loadMap();
  }, [items]);

  const handleLove = async (id: string) => {
    try {
      const d: any = await api.post(`/inspiration/${id}/love`);
      setItems(prev => prev.map(i => i.id === id ? { ...i, loves: i.loves + (d.loved ? 1 : -1) } : i));
      setLoved(prev => { const n = new Set(prev); if (d.loved) n.add(id); else n.delete(id); return n; });
    } catch {}
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
            <div key={item.id} onClick={() => setSelected(item)} className={cn("cursor-pointer rounded-xl border p-3 transition-all hover:shadow-sm", selected?.id === item.id ? "border-primary-500 bg-primary-50" : "border-border bg-white")}>
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
