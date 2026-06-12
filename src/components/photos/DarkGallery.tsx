import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Photo } from "@/types";

interface DarkGalleryProps {
  photos: Photo[];
  startIndex?: number;
  onClose: () => void;
  title?: string;
}

export function DarkGallery({ photos, startIndex = 0, onClose, title }: DarkGalleryProps) {
  const [index, setIndex] = useState(startIndex);

  const prev = useCallback(() => setIndex(i => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setIndex(i => (i + 1) % photos.length), [photos.length]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  const photo = photos[index];
  if (!photo || photos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" onClick={onClose}>
      {/* Top bar — thin solid border */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/90" onClick={e => e.stopPropagation()}>
        <div className="text-white/70 text-xs">
          {title && <span>{title}</span>}
          <span className="ml-2 text-white/30">{index + 1}/{photos.length}</span>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white text-sm">✕</button>
      </div>

      {/* Main photo area */}
      <div className="flex-1 flex items-center justify-center min-h-0 px-4" onClick={e => e.stopPropagation()}>
        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all z-10">‹</button>
        <img src={photo.url} alt={photo.originalFilename} className="max-h-full max-w-full object-contain select-none" />
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white hover:bg-white/30 text-3xl transition-all z-10">›</button>
      </div>

      {/* Thumbnail strip — minimal, always visible */}
      <div className="flex-shrink-0 bg-black/90 border-t border-white/10" onClick={e => e.stopPropagation()}>
        <div className="flex gap-1.5 overflow-x-auto px-4 py-2 mx-auto max-w-full justify-center">
          {photos.map((p, i) => (
            <img key={p.id} src={p.url} alt=""
              onClick={() => setIndex(i)}
              className={cn("h-14 w-14 flex-shrink-0 cursor-pointer rounded object-cover transition-all hover:scale-110",
                i === index ? "ring-2 ring-white scale-105 opacity-100" : "opacity-40 hover:opacity-80")} />
          ))}
        </div>
      </div>
    </div>
  );
}
