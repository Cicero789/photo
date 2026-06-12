import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api, getToken } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { getCategoryInfo } from "@/lib/constants";
import { PhotoUploader } from "@/components/photos/PhotoUploader";
import { VideoUploader } from "@/components/videos/VideoUploader";
import { lazy, Suspense } from "react";
const PhotoEditorModal = lazy(() => import("@/components/photos/PhotoEditorModal"));
import { EventMap } from "@/components/map/EventMap";
import { DarkGallery } from "@/components/photos/DarkGallery";
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
  address?: string;
  addressLocked?: boolean;
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
  const [editingAddress, setEditingAddress] = useState(false);
  const [editAddress, setEditAddress] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<{ url: string; filename: string } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

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
    } finally {
      setSummarizing(false);
    }
  };

  const handleSaveAddress = async () => {
    if (!eventId || savingAddress) return;
    setSavingAddress(true);
    try {
      await api.put(`/events/${eventId}`, { address: editAddress });
      setEditingAddress(false);
      fetchEvent();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleEditPhotoSave = async (blob: Blob, filename: string) => {
    if (!eventId) return;
    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("files", new File([blob], filename, { type: "image/jpeg" }));
    const token = getToken();
    const res = await fetch("/api/photos/upload", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    fetchEvent();
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
        {!spaceSlug && (
          <button
            onClick={async () => { try { await api.put(`/events/${event.id}`, { public: !(event as any).public }); fetchEvent(); } catch {} }}
            className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${(event as any).public !== false ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}
          >
            {(event as any).public !== false ? "🌐 Public" : "🔒 Private"}
          </button>
        )}
      </div>

      {/* Address — editable by logged-in users */}
      <div className="mb-6">
        {event.address ? (
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-700">{event.address}</p>
                  {!spaceSlug && (
                    <button onClick={() => setEditingAddress(true)}
                      className="mt-1 text-xs text-primary-600 hover:text-primary-700">
                      Edit address
                    </button>
                  )}
                </div>
              </div>
            </div>
            {editingAddress && (
              <div className="mt-3 flex gap-2">
                <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)}
                  className="flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:border-primary-500 focus:outline-none"
                  placeholder="123 Main St, Austin, TX" />
                <button onClick={handleSaveAddress} disabled={savingAddress}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                  {savingAddress ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setEditingAddress(false)}
                  className="rounded-lg border px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-50">Cancel</button>
              </div>
            )}
          </div>
        ) : !spaceSlug ? (
          <div className="rounded-2xl border-2 border-dashed border-border bg-muted/30 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                <p className="text-sm text-neutral-400">No location set</p>
              </div>
              {!editingAddress ? (
                <button onClick={() => setEditingAddress(true)}
                  className="rounded-lg border border-primary-300 bg-white px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-50">
                  + Add address
                </button>
              ) : (
                <div className="flex gap-2">
                  <input type="text" value={editAddress} onChange={(e) => setEditAddress(e.target.value)}
                    className="rounded-lg border border-border px-3 py-2 text-sm focus:border-primary-500 focus:outline-none w-64"
                    placeholder="123 Main St, Austin, TX" />
                  <button onClick={handleSaveAddress} disabled={savingAddress}
                    className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                    {savingAddress ? "..." : "Save"}
                  </button>
                  <button onClick={() => setEditingAddress(false)}
                    className="rounded-lg border px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-50">Cancel</button>
                </div>
              )}
            </div>
          </div>
        ) : null}
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

      {/* Action buttons */}
      {!spaceSlug && (
        <div className="mb-6 flex gap-3">
          <button onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
            className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800">
            🖼️ View Gallery
          </button>
          <Link to={`/dashboard/gallery?eventId=${event.id}`}
            className="rounded-xl border-2 border-accent-500 bg-white px-5 py-3 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50">
            ▶ Slideshow
          </Link>
        </div>
      )}
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
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100"
              >
                <img
                  src={photo.url}
                  alt={photo.originalFilename}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105 cursor-pointer"
                  loading="lazy"
                  onClick={() => { setGalleryIndex(i); setGalleryOpen(true); }}
                />
                {!spaceSlug && (
                  <>
                    <button
                      onClick={async (e: any) => { e.stopPropagation(); e.preventDefault(); try { await api.put("/photos/favorite", { photoId: photo.id }); fetchEvent(); } catch {} }}
                      className={`absolute top-2 right-2 z-10 rounded-full w-8 h-8 flex items-center justify-center text-lg transition-all hover:scale-125 ${(photo as any).favorite ? "text-yellow-400" : "text-white/30 hover:text-yellow-300"}`}
                      title={(photo as any).favorite ? "Favorited — click to remove" : "Click to favorite"}
                    >
                      ☆
                    </button>
                    <button
                      onClick={() => setEditingPhoto({ url: photo.url, filename: photo.originalFilename })}
                      className="absolute top-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-sm"
                    >
                      ✏️ Edit
                    </button>
                  </>
                )}
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

      {/* Dark Gallery — click photos */}
      {galleryOpen && (
        <DarkGallery
          photos={photos}
          startIndex={galleryIndex}
          title={event.title}
          onClose={() => setGalleryOpen(false)}
        />
      )}

      {/* Photo Editor Modal — lazy loaded */}
      {editingPhoto && (
        <Suspense fallback={
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="rounded-xl bg-white px-6 py-4 shadow-xl text-center">
              <div className="mb-2 h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
              <p className="text-sm font-medium text-neutral-700">Loading editor...</p>
            </div>
          </div>
        }>
          <PhotoEditorModal
            open={true}
            imageUrl={editingPhoto.url}
            filename={editingPhoto.filename}
            onClose={() => setEditingPhoto(null)}
            onSave={handleEditPhotoSave}
          />
        </Suspense>
      )}
    </div>
  );
}
