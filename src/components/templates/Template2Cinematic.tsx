import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function Template2Cinematic(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-cinematic-dark";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@300;400;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const heroPhoto = portfolio[0];
  const galleryPhotos = portfolio.slice(1);

  return (
    <>
      <style>{`
        .t2-cinematic { color: white; background: #0a0a0a; font-family: Roboto, sans-serif; min-height: 600px; }
        .t2-cine-hero { position: relative; min-height: 78vh; display: flex; align-items: flex-end; padding: 7vw; }
        .t2-cine-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.72; }
        .t2-cine-hero::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.88), rgba(0,0,0,0.08) 70%), linear-gradient(0deg, #0a0a0a, transparent 65%); }
        .t2-cine-copy { position: relative; z-index: 1; max-width: 780px; }
        .t2-cine-copy h2 { margin: 8px 0; font: 400 clamp(70px, 11vw, 160px)/0.8 "Bebas Neue", sans-serif; letter-spacing: 0.015em; }
        .t2-gold { color: #d4af37; }
        .t2-cine-copy p { max-width: 530px; color: #ddd; font-weight: 300; line-height: 1.7; }
        .t2-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }
        .t2-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 24px; font: inherit; text-decoration: none; cursor: pointer; border: none; margin-top: 20px; color: #090909; background: #d4af37; font-weight: 700; transition: transform 0.25s, background 0.25s, color 0.25s; }
        .t2-hire:hover { transform: translateY(-2px); }
        .t2-cine-gallery { padding: 35px 5vw 75px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .t2-cine-gallery .t2-photo { height: 390px; overflow: hidden; cursor: pointer; }
        .t2-cine-gallery .t2-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.2,0.7,0.2,1), opacity 0.35s; }
        .t2-cine-gallery .t2-photo:hover img { opacity: 0.75; transform: scale(1.04); }
        .t2-verified { display: inline-block; color: #d4af37; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .t2-cine-gallery { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .t2-cine-hero { min-height: 700px; }
          .t2-cine-gallery .t2-photo { height: 300px; }
        }
      `}</style>
      <section className="t2-cinematic">
        <div className="t2-cine-hero">
          {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
          <div className="t2-cine-copy">
            <span className="t2-eyebrow t2-gold">
              {serviceArea} {specialties.length > 0 && `· ${specialties.join(" · ")}`}
            </span>
            <h2>
              {name.split(" ").map((word, i, arr) => (
                <span key={i}>{word}{i < arr.length - 1 ? <br /> : ""}</span>
              ))}
              {verified && <span className="t2-verified">&#10003;</span>}
            </h2>
            {bio && <p>{bio}</p>}
            {!bio && tagline && <p>{tagline}. {specialties.join(", ")} shaped by light, atmosphere, and authentic emotion.</p>}
            <button className="t2-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>
        <div className="t2-cine-gallery">
          {galleryPhotos.map((photo, i) => (
            <div key={photo.id} className="t2-photo" onClick={() => onPhotoClick(i + 1)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
