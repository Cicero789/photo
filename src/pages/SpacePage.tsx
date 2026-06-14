import { useState, useEffect, type FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { api, setToken } from "@/lib/api";
import { EventGrid } from "@/components/events/EventGrid";
import { SpaceEventMap } from "@/components/map/SpaceEventMap";
import { PhotographerHero } from "@/components/photographer/PhotographerHero";
import { cn } from "@/lib/utils";
import type { EventCategory, Photo } from "@/types";

type ViewMode = "tile" | "map";

interface SpaceData {
  id: string;
  name: string;
  slug: string;
  themeColor: string;
  customDomain: string | null;
  logoUrl: string | null;
  createdAt: string;
}

interface GridEvent {
  id: string;
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  aiSummary?: string | null;
  coverPhotoUrl?: string | null;
  photoCount: number;
  address?: string;
  addressLocked?: boolean;
  latitude?: number | null;
  longitude?: number | null;
}

interface AdTileData {
  id: string;
  imageUrl: string | null;
  linkUrl: string | null;
  message: string | null;
  position: number;
}

export function SpacePage() {
  const { spaceSlug } = useParams<{ spaceSlug: string }>();

  const [space, setSpace] = useState<SpaceData | null>(null);
  const [events, setEvents] = useState<GridEvent[]>([]);
  const [ads, setAds] = useState<AdTileData[]>([]);
  const [mapPhotos, setMapPhotos] = useState<Photo[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("tile");
  const [unlocked, setUnlocked] = useState(false);
  const [gateKey, setGateKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mapLoading, setMapLoading] = useState(false);

  // Fetch space info (public only — no auth needed)
  useEffect(() => {
    if (!spaceSlug) return;
    api
      .get<{ space: SpaceData }>(`/spaces/${spaceSlug}`)
      .then((spaceData) => setSpace(spaceData.space))
      .catch(() => setError("Space not found"))
      .finally(() => setFetching(false));
  }, [spaceSlug]);

  // Fetch map photos when in map mode
  const fetchMapPhotos = async () => {
    if (!space) return;
    setMapLoading(true);
    try {
      const data = await api.get<{ photos: Photo[] }>(`/photos?spaceId=${space.id}&hasLocation=true`);
      setMapPhotos(data.photos);
    } catch { /* ignore */ }
    finally { setMapLoading(false); }
  };

  useEffect(() => {
    if (viewMode === "map" && unlocked && space) {
      fetchMapPhotos();
    }
  }, [viewMode, unlocked, space?.id]);

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    if (!spaceSlug || !gateKey) return;
    setError("");
    setLoading(true);
    try {
      const data = await api.post<{ token: string; space: SpaceData }>("/auth/gate", { spaceSlug, gateKey });
      setToken(data.token);
      setUnlocked(true);
      setGateKey("");
      const unlockedSpace = data.space;
      setSpace(unlockedSpace);
      const [eventData, adsData] = await Promise.all([
        api.get<{ events: GridEvent[] }>(`/events?spaceId=${unlockedSpace.id}`),
        api.get<{ ads: AdTileData[] }>("/ads"),
      ]);
      setEvents(eventData.events);
      setAds(adsData.ads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid gate key");
    } finally {
      setLoading(false);
    }
  };

  // Auto-unlock demo space — public access, no token needed
  const isDemo = space?.slug === "demo";
  useEffect(() => { if (isDemo && !unlocked && space) {
    setUnlocked(true);
    api.get(`/events?spaceId=${space.id}`).then((d:any) => setEvents(d.events||[])).catch(()=>{});
    api.get("/ads").then((a:any) => setAds(a.ads||[])).catch(()=>{});
  }}, [isDemo, unlocked, space?.id]);

  // ─── Loading ───
  if (fetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" role="status" aria-label="Loading" />
      </div>
    );
  }

  // ─── Not Found ───
  if (!space) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-5xl text-neutral-200">404</p>
          <h2 className="mt-4 text-xl font-semibold text-neutral-700">Space not found</h2>
          <p className="mt-2 text-neutral-500">This space doesn&apos;t exist or the link is wrong.</p>
        </div>
      </div>
    );
  }

  // ─── Locked ───
  if (!unlocked) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-neutral-900">{space.name}</h1>
          <p className="mt-2 text-neutral-500">This space is private. Enter the gate key shared by the owner.</p>
        </div>
        <div className="mx-auto max-w-md">
          <form onSubmit={handleUnlock} className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-muted/50 py-16 px-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl" style={{ backgroundColor: space.themeColor + "18" }}>🔐</div>
            <h2 className="text-lg font-semibold text-neutral-700">Gate key required</h2>
            <p className="mt-1 text-sm text-neutral-500">Enter the password to view this space.</p>
            {error && <div className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}
            <input type="password" value={gateKey} onChange={(e) => setGateKey(e.target.value)} placeholder="Enter gate key" className="mt-6 w-full max-w-xs rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-center placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            <button type="submit" disabled={loading} className="mt-3 w-full max-w-xs rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50" style={{ backgroundColor: space.themeColor }}>{loading ? "Checking..." : "Unlock"}</button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Unlocked ───
  const heroPhotos = events.filter(e => e.coverPhotoUrl).map(e => e.coverPhotoUrl!).slice(0, 5);
  const theme = space.themeColor || "#2563eb";

  return (
    <div style={{ "--theme": theme } as React.CSSProperties}>
      {/* Hero — rotating background (if enabled in settings) */}
      {heroPhotos.length > 0 && (((space as any).hero_source && (space as any).hero_source !== "off") || space.slug === "demo") && (
        <PhotographerHero photos={heroPhotos} name={space.name} interval={5000} />
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">{space.name}</h1>
          <div className="flex items-center gap-3">
            <p className="mt-2 text-neutral-500">
              {viewMode === "tile"
                ? `${events.length} event${events.length !== 1 ? "s" : ""}`
                : `${mapPhotos.length} photo${mapPhotos.length !== 1 ? "s" : ""} with location`}
            </p>
            <Link to={`/s/${space.slug}/gallery`}
              className="mt-2 rounded-lg border-2 border-accent-300 bg-accent-50 px-3 py-0.5 text-xs font-semibold text-accent-700 hover:bg-accent-100 transition-colors">
              🖼️ Gallery
            </Link>
          </div>
        </div>

        {/* View toggle — uses theme color */}
        <div className="flex items-center gap-3 rounded-xl border-2 px-1 py-1" style={{ borderColor: theme, backgroundColor: theme + "10" }}>
          <span className="ml-2 text-xs font-semibold uppercase tracking-wider" style={{ color: theme }}>View:</span>
          <div className="flex gap-1 rounded-lg bg-white p-0.5 shadow-sm">
            <button
              onClick={() => setViewMode("tile")}
              className={cn("rounded-md px-4 py-2 text-sm font-semibold transition-all",
                viewMode === "tile" ? "text-white shadow-md" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100")}
              style={viewMode === "tile" ? { backgroundColor: theme } : {}}
            >🎨 Tiles</button>
            <button
              onClick={() => setViewMode("map")}
              className={cn("rounded-md px-4 py-2 text-sm font-semibold transition-all",
                viewMode === "map" ? "text-white shadow-md" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100")}
              style={viewMode === "map" ? { backgroundColor: theme } : {}}
            >🗺️ Map</button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "tile" ? (
        <EventGrid
          events={events}
          ads={ads}
          spaceSlug={space.slug}
          emptyMessage="No events yet. The space owner hasn't created any events."
        />
      ) : mapLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" role="status" aria-label="Loading" />
        </div>
      ) : (
        <SpaceEventMap
          photos={mapPhotos}
          events={events.map(e => ({ id: e.id, title: e.title, latitude: e.latitude ?? null, longitude: e.longitude ?? null, photoCount: e.photoCount, coverPhotoUrl: e.coverPhotoUrl, spaceSlug: space.slug }))}
          emptyMessage="No locations yet. Add event addresses or upload photos with GPS data."
        />
      )}
      </div>
    </div>
  );
}
