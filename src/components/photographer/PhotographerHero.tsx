import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PhotographerHeroProps {
  photos: string[]; // URLs of hero images
  name: string;
  tagline?: string;
  interval?: number; // ms between transitions
}

export function PhotographerHero({ photos, name, tagline, interval = 6000 }: PhotographerHeroProps) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<any>(null);

  const images = photos.length > 0 ? photos : [];

  useEffect(() => {
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(i => (i + 1) % images.length);
        setFading(false);
      }, 800); // crossfade duration
    }, interval);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div className="relative h-[60vh] min-h-[400px] sm:h-[70vh] overflow-hidden bg-neutral-900">
      {/* Background images */}
      {images.map((url, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-800",
            i === current ? (fading ? "opacity-0" : "opacity-100") : "opacity-0"
          )}
          style={{ backgroundImage: `url(${url})` }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setFading(false); if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = setInterval(() => { setFading(true); setTimeout(() => { setCurrent(j => (j + 1) % images.length); setFading(false); }, 800); }, interval); } }}
              className={cn("h-2 rounded-full transition-all", i === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/70")}
            />
          ))}
        </div>
      )}

      {/* Hero text */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-10">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
          {name}
        </h1>
        {tagline && (
          <p className="mt-2 text-lg sm:text-xl text-white/80 max-w-lg drop-shadow">
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
