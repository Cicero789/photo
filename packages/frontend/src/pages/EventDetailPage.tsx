import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../data/queries/useAuth.js';
import { api } from '../lib/api-client.js';
import { Button } from '../components/ui/Button.js';
import { formatDate, formatBytes } from '../lib/utils.js';
import type { EventResponse, PhotoResponse } from '@framenest/shared';

export function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [photos, setPhotos] = useState<PhotoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const data = await api.get<{ event: EventResponse; photos?: PhotoResponse[] }>(`/events/${eventId}`);
      setEvent(data.event);
      setPhotos((data as any).photos || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  }, [eventId]);

  useEffect(() => { fetchEvent(); }, [fetchEvent]);

  // Upload handler
  const handleFiles = async (files: FileList | File[]) => {
    if (!eventId || files.length === 0) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('eventId', eventId);
      for (const f of files) form.append('files', f);

      const res = await fetch('/api/photos/upload', {
        method: 'POST',
        headers: user ? { Authorization: `Bearer ${localStorage.getItem('framenest:auth:token')}` } : {},
        body: form,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      } else {
        await fetchEvent(); // Refresh
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full" /></div>;
  if (!event) return <div className="min-h-screen flex items-center justify-center text-neutral-500">Event not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <button onClick={() => navigate(-1)} className="text-sm text-neutral-400 hover:text-neutral-600 mb-2">← Back</button>
          <div className="flex items-center gap-3">
            <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary-50 text-primary-700 capitalize">{event.category}</span>
            <span className={`text-xs capitalize ${event.visibility === 'public' ? 'text-green-600' : event.visibility === 'gate' ? 'text-amber-600' : 'text-neutral-500'}`}>{event.visibility}</span>
          </div>
          <h1 className="text-3xl font-bold mt-1">{event.title}</h1>
          {event.eventDate && <p className="text-sm text-neutral-500 mt-1">{formatDate(event.eventDate)}</p>}
          {event.description && <p className="text-neutral-600 mt-2">{event.description}</p>}
          {event.address && <p className="text-sm text-neutral-400 mt-1">📍 {event.address}</p>}
        </div>
        <div className="text-sm text-neutral-400">{photos.length} photos</div>
      </div>

      {/* Upload zone */}
      <div
        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={() => setDragOver(false)}
        className={`mb-8 p-8 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer
          ${dragOver ? 'border-primary-400 bg-primary-50' : 'border-neutral-300 hover:border-neutral-400'}`}
        onClick={() => document.getElementById('photo-input')?.click()}
      >
        <input id="photo-input" type="file" multiple accept="image/*" className="hidden"
          onChange={e => e.target.files && handleFiles(e.target.files)} />
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-primary-600">
            <div className="animate-spin h-5 w-5 border-2 border-primary-200 border-t-primary-600 rounded-full" />
            <span>Uploading...</span>
          </div>
        ) : (
          <>
            <p className="text-3xl mb-2">📸</p>
            <p className="font-medium text-neutral-700">Drag & drop photos here</p>
            <p className="text-sm text-neutral-400 mt-1">or click to browse. JPG, PNG, WebP, HEIC up to 50MB each.</p>
          </>
        )}
      </div>

      {/* Photo grid */}
      {photos.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <p className="text-6xl mb-4">🖼️</p>
          <p className="text-lg">No photos yet</p>
          <p className="text-sm">Upload your first photo above</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div key={photo.id || i} className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-neutral-200 hover:opacity-90 transition-opacity"
              onClick={() => setLightboxIdx(i)}>
              {photo.url ? (
                <img src={photo.url} alt={photo.originalFilename || `Photo ${i + 1}`}
                  className="w-full h-full object-cover" loading="lazy" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">📷</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightboxIdx(null)}>
          <button className="absolute top-4 right-4 text-white text-2xl hover:opacity-70" onClick={() => setLightboxIdx(null)}>✕</button>
          {lightboxIdx > 0 && (
            <button className="absolute left-4 text-white text-3xl hover:opacity-70" onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}>‹</button>
          )}
          {lightboxIdx < photos.length - 1 && (
            <button className="absolute right-4 text-white text-3xl hover:opacity-70" onClick={e => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}>›</button>
          )}
          <div className="max-w-[90vw] max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <img src={photos[lightboxIdx]?.url || ''} alt={photos[lightboxIdx]?.originalFilename || ''}
              className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            <p className="text-white/60 text-sm text-center mt-3">
              {photos[lightboxIdx]?.originalFilename} · {formatBytes(photos[lightboxIdx]?.fileSize || 0)}
              {photos[lightboxIdx]?.width && ` · ${photos[lightboxIdx]?.width}×${photos[lightboxIdx]?.height}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
