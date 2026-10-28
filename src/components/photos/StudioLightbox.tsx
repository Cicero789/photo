import { useEffect, useRef, useState } from "react";
import type { StudioPhoto } from "../../../shared/studio";

export function StudioLightbox({ photos, initial, onClose }: { photos: StudioPhoto[]; initial: number; onClose: () => void }) {
  const [index, setIndex] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    const overflow = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex(i => (i + 1) % photos.length), 4500);
    return () => window.clearInterval(timer);
  }, [playing, photos.length]);
  const photo = photos[index];
  if (!photo) return null;
  return <dialog ref={dialog} className="cv-lightbox" aria-label="Photo gallery" onCancel={onClose} onKeyDown={e => {
    if (e.key === "ArrowRight") setIndex(i => (i + 1) % photos.length);
    if (e.key === "ArrowLeft") setIndex(i => (i - 1 + photos.length) % photos.length);
  }}>
    <div className="cv-lightbox-top"><span>{String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span><div><button onClick={() => setPlaying(!playing)}>{playing ? "Pause slideshow" : "Play slideshow"}</button><button aria-label="Close gallery" onClick={onClose}>✕</button></div></div>
    <div className="cv-lightbox-image"><button aria-label="Previous photo" onClick={() => setIndex(i => (i - 1 + photos.length) % photos.length)}>←</button><img src={photo.url} alt={photo.title} /><button aria-label="Next photo" onClick={() => setIndex(i => (i + 1) % photos.length)}>→</button></div>
    <div className="cv-lightbox-caption"><small>{photo.category}{photo.sample ? " · Sample imagery" : ""}</small><h2>{photo.title}</h2><p>{photo.description}</p></div>
  </dialog>;
}
