import { Link } from "react-router-dom";
import { formatDate, cn } from "@/lib/utils";
import { getCategoryInfo } from "@/lib/constants";
import type { EventCategory } from "@/types";

interface EventTileProps {
  id: string;
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  aiSummary?: string | null;
  coverPhotoUrl?: string | null;
  photoCount: number;
  spaceSlug?: string;
  isAd?: boolean;
  adImageUrl?: string;
  adLinkUrl?: string;
  adMessage?: string;
}

export function EventTile({
  id,
  title,
  category,
  eventDate,
  description,
  aiSummary,
  coverPhotoUrl,
  photoCount,
  spaceSlug,
  isAd,
  adImageUrl,
  adLinkUrl,
  adMessage,
}: EventTileProps) {
  const cat = getCategoryInfo(category);

  // ─── Ad Tile ───
  if (isAd) {
    const content = (
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-accent-300 bg-gradient-to-br from-accent-50 to-primary-50 transition-all hover:shadow-lg hover:border-accent-400">
        {adImageUrl ? (
          <div className="flex-1 overflow-hidden">
            <img
              src={adImageUrl}
              alt={adMessage ?? "Advertisement"}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-2xl">
                📢
              </span>
              {adMessage && (
                <p className="mt-3 text-sm font-medium text-accent-700">{adMessage}</p>
              )}
            </div>
          </div>
        )}
        <div className="border-t border-accent-200 bg-accent-50/50 px-4 py-2">
          <p className="text-center text-xs text-accent-600">
            {adLinkUrl ? "Tap to learn more →" : "Message from Photo"}
          </p>
        </div>
      </div>
    );

    if (adLinkUrl) {
      return (
        <a href={adLinkUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
          {content}
        </a>
      );
    }
    return content;
  }

  // ─── Event Tile ───
  const href = spaceSlug ? `/s/${spaceSlug}/e/${id}` : `/dashboard/events/${id}`;

  return (
    <Link
      to={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Cover image or gradient placeholder */}
      <div
        className={cn(
          "relative h-44 overflow-hidden",
          !coverPhotoUrl && "bg-gradient-to-br",
        )}
        style={!coverPhotoUrl ? { backgroundColor: cat.color + "20" } : undefined}
      >
        {coverPhotoUrl ? (
          <img
            src={coverPhotoUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl opacity-40">{cat.emoji}</span>
          </div>
        )}

        {/* Category badge */}
        <span
          className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-xs font-semibold text-white shadow-sm"
          style={{ backgroundColor: cat.color }}
        >
          {cat.emoji} {cat.label}
        </span>

        {/* Photo count */}
        {photoCount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {photoCount} 📷
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold text-neutral-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="mt-0.5 text-xs text-neutral-400">{formatDate(eventDate)}</p>

        {/* AI Summary or description fallback */}
        <p className="mt-2 text-sm leading-relaxed text-neutral-500 line-clamp-3">
          {aiSummary ?? description}
        </p>
      </div>
    </Link>
  );
}
