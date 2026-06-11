import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { getCategoryInfo } from "@/lib/constants";
import { PhotoUploader } from "@/components/photos/PhotoUploader";
import { VideoUploader } from "@/components/videos/VideoUploader";
import { EventMap } from "@/components/map/EventMap";
import type { EventCategory, Photo, Video } from "@/types";

interface EventDetail {
  id: string;
  spaceId: string;
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  aiSummary: string | null;
  coverPhotoId: string | null;
  createdAt: string;
  updatedAt: string;
}

export function EventDetailPage() {
  const { eventId, spaceSlug } = useParams<{ eventId: string; spaceSlug?: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showUploader, setShowUploader] = useState<"photo" | "video" | null>(null);
  const [summarizing, setSummarizing] = useState(false);

  const fetchEvent = () => {
    if (!eventId) return;
    api
      .get<{ event: EventDetail; photos: Photo[]; videos: Video[] }>(`/events/${eventId}`)
      .then((data) => {
        setEvent(data.event);
        setPhotos(data.photos);
        setVideos(data.videos);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Event not found"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const handleUploaded = () => {
    setShowUploader(null);
    fetchEvent();
  };

  const handleRegenerateSummary = async () => {
    if (!eventId || summarizing) return;
    setSummarizing(true);
    try {
      await api.post("/events/summarize", { eventId });
      fetchEvent();
    } catch {
      // error shown via re-fetch
    } finally {
      setSummarizing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" role="status" aria-label="Loading" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-5xl text-neutral-200">404</p>
          <h2 className="mt-4 text-xl font-semibold text-neutral-700">Event not found</h2>
          <p className="mt-2 text-neutral-500">{error ?? "This event doesn't exist."}</p>
          <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
            &larr; Back
          </Link>
        </div>
      </div>
    );
  }

  const cat = getCategoryInfo(event.category);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Back link */}
      {spaceSlug ? (
        <Link
          to={`/s/${spaceSlug}`}
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-700"
        >
          &larr; Back to {spaceSlug}
        </Link>
      ) : (
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-700"
        >
          &larr; Back to dashboard
        </Link>
      )}

      {/* Header */}
      <div className="mb-10">
        <span
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: cat.color }}
        >
          {cat.emoji} {cat.label}
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
          {event.title}
        </h1>
        <p className="mt-2 text-sm text-neutral-500">{formatDate(event.eventDate)}</p>
      </div>

      {/* AI Summary */}
      <div className="mb-10">
        {event.aiSummary ? (
          <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-6">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-700">
                🤖 AI Summary
              </span>
            </div>
            <p className="mt-3 leading-relaxed text-neutral-800 text-lg font-medium">
              {event.aiSummary}
            </p>
            {!spaceSlug && (
              <button
                onClick={handleRegenerateSummary}
                disabled={summarizing}
                className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                {summarizing ? "Generating..." : "↻ Regenerate"}
              </button>
            )}
          </div>
        ) : event.description ? (
          <div className="rounded-2xl border border-border bg-muted/50 p-6">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
              Description
            </h2>
            <p className="mt-3 leading-relaxed text-neutral-700">
              {event.description}
            </p>
            {!spaceSlug && (
              <button
                onClick={handleRegenerateSummary}
                disabled={summarizing}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                {summarizing ? "🤖 Generating summary..." : "🤖 Generate AI summary"}
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Upload buttons */}
      {!spaceSlug && (
        <div className="mb-6">
          {!showUploader ? (
            <div className="flex gap-3">
              <button
                onClick={() => setShowUploader("photo")}
                className="rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                + Add photos
              </button>
              <button
                onClick={() => setShowUploader("video")}
                className="rounded-xl border-2 border-accent-500 bg-white px-5 py-3 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
              >
                🎬 Add videos
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-white p-6">
              {showUploader === "photo" ? (
                <PhotoUploader
                  eventId={event.id}
                  onUploaded={handleUploaded}
                  onClose={() => setShowUploader(null)}
                />
              ) : (
                <VideoUploader
                  eventId={event.id}
                  onUploaded={handleUploaded}
                  onClose={() => setShowUploader(null)}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* Map */}
      {photos.length > 0 && (
        <div className="mb-10">
          <EventMap photos={photos} />
        </div>
      )}

      {/* Photos */}
      {photos.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900">Photos ({photos.length})</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100"
              >
                <img
                  src={photo.url}
                  alt={photo.originalFilename}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                {photo.latitude != null && (
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/50 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                    📍
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900">Videos ({videos.length})</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className="overflow-hidden rounded-xl bg-neutral-900"
              >
                <video
                  src={video.url}
                  controls
                  className="w-full"
                  preload="metadata"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {photos.length === 0 && videos.length === 0 && !showUploader && (
        <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-border bg-muted/50 py-16 text-center">
          <span className="text-4xl">📸</span>
          <p className="mt-4 text-neutral-400">No photos or videos yet.</p>
          {!spaceSlug && (
            <button
              onClick={() => setShowUploader("photo")}
              className="mt-4 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Upload your first photos
            </button>
          )}
        </div>
      )}
    </div>
  );
}
