import { useState, useEffect, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api, setToken } from "@/lib/api";
import { EventGrid } from "@/components/events/EventGrid";
import type { EventCategory } from "@/types";

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
  const [unlocked, setUnlocked] = useState(false);
  const [gateKey, setGateKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch space info (public only — no auth needed)
  useEffect(() => {
    if (!spaceSlug) return;
    api
      .get<{ space: SpaceData }>(`/spaces/${spaceSlug}`)
      .then((spaceData) => setSpace(spaceData.space))
      .catch(() => setError("Space not found"))
      .finally(() => setFetching(false));
  }, [spaceSlug]);

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    if (!spaceSlug || !gateKey) return;
    setError("");
    setLoading(true);
    try {
      const data = await api.post<{ token: string; space: SpaceData }>("/auth/gate", { spaceSlug, gateKey });
      // Store the viewer token for subsequent API calls
      setToken(data.token);
      setUnlocked(true);
      setGateKey("");
      setSpace(data.space);
      // Fetch events + ads with the viewer token
      if (space) {
        const [eventData, adsData] = await Promise.all([
          api.get<{ events: GridEvent[] }>(`/events?spaceId=${space.id}`),
          api.get<{ ads: AdTileData[] }>("/ads"),
        ]);
        setEvents(eventData.events);
        setAds(adsData.ads);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid gate key");
    } finally {
      setLoading(false);
    }
  };

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

  // ─── Locked (Gate Key Required) ───
  if (!unlocked) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold text-neutral-900">{space.name}</h1>
          <p className="mt-2 text-neutral-500">
            This space is private. Enter the gate key shared by the owner.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <form
            onSubmit={handleUnlock}
            className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-muted/50 py-16 px-8"
          >
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
              style={{ backgroundColor: space.themeColor + "18" }}
            >
              🔐
            </div>
            <h2 className="text-lg font-semibold text-neutral-700">Gate key required</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Enter the password to view this space.
            </p>

            {error && (
              <div className="mt-4 w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <input
              type="password"
              value={gateKey}
              onChange={(e) => setGateKey(e.target.value)}
              placeholder="Enter gate key"
              className="mt-6 w-full max-w-xs rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-center placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full max-w-xs rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50"
              style={{ backgroundColor: space.themeColor }}
            >
              {loading ? "Checking..." : "Unlock"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Unlocked — Show Events ───
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-neutral-900">{space.name}</h1>
        <p className="mt-2 text-neutral-500">
          {events.length > 0
            ? `${events.length} event${events.length !== 1 ? "s" : ""} — browse and enjoy the memories.`
            : "No events yet. Check back soon!"}
        </p>
      </div>

      <EventGrid
        events={events}
        ads={ads}
        spaceSlug={space.slug}
        emptyMessage="No events yet. The space owner hasn't created any events."
      />
    </div>
  );
}
