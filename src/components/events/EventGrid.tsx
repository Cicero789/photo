import { EventTile } from "./EventTile";
import { AD_TILE_INTERVAL } from "@/lib/constants";
import type { EventCategory } from "@/types";

interface GridEvent {
  id: string;
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  aiSummary?: string | null;
  coverPhotoUrl?: string | null;
  photoCount: number;
  spaceSlug?: string;
}

interface AdTile {
  id: string;
  imageUrl?: string | null;
  linkUrl?: string | null;
  message?: string | null;
}

interface EventGridProps {
  events: GridEvent[];
  ads?: AdTile[];
  spaceSlug?: string;
  emptyMessage?: string;
}

export function EventGrid({ events, ads = [], spaceSlug, emptyMessage }: EventGridProps) {
  // Build tiles: inject ad tiles at every 9th position
  const tiles: (GridEvent | { _ad: true; ad: AdTile })[] = [...events];

  ads.forEach((ad, i) => {
    const position = AD_TILE_INTERVAL * (i + 1) - 1; // 0-indexed: 8, 17, 26...
    if (position <= tiles.length) {
      tiles.splice(position, 0, { _ad: true, ad });
    } else {
      tiles.push({ _ad: true, ad });
    }
  });

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/50 py-20 text-center">
        <span className="text-4xl">📸</span>
        <p className="mt-4 text-neutral-400">{emptyMessage ?? "No events yet."}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {tiles.map((item, index) => {
        if ("_ad" in item) {
          return (
            <EventTile
              key={`ad-${index}`}
              id={`ad-${index}`}
              title=""
              category="other"
              eventDate=""
              description=""
              photoCount={0}
              spaceSlug={spaceSlug}
              isAd
              adImageUrl={item.ad.imageUrl ?? undefined}
              adLinkUrl={item.ad.linkUrl ?? undefined}
              adMessage={item.ad.message ?? undefined}
            />
          );
        }
        return (
          <EventTile
            key={item.id}
            {...item}
            spaceSlug={spaceSlug}
          />
        );
      })}
    </div>
  );
}
