import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function Template5Masonry(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-masonry-wall";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `From $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  return (
    <>
      <style>{`
        .t5-masonry { position: relative; padding: 65px 4vw 80px; background: #f5f5f5; font-family: "Space Grotesk", sans-serif; min-height: 600px; }
        .t5-masonry-card { position: absolute; z-index: 3; top: 34px; left: 5vw; width: min(430px, 75vw); padding: 28px; color: white; background: rgba(20, 20, 25, 0.91); box-shadow: 0 18px 50px rgba(0,0,0,0.27); }
        .t5-masonry-card h2 { margin: 0 0 8px; font-size: 34px; line-height: 1; }
        .t5-masonry-card p { color: #d7d7de; font-size: 13px; line-height: 1.55; }
        .t5-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }
        .t5-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 24px; font: inherit; text-decoration: none; cursor: pointer; border: none; color: white; background: #6366f1; border-radius: 7px; transition: transform 0.25s, background 0.25s; }
        .t5-hire:hover { transform: translateY(-2px); }
        .t5-masonry-grid { column-count: 3; column-gap: 18px; max-width: 1250px; margin: auto; padding-top: 105px; }
        .t5-masonry-grid .t5-photo { break-inside: avoid; margin-bottom: 18px; border-radius: 14px; box-shadow: 0 8px 25px rgba(17,17,18,0.13); overflow: hidden; cursor: pointer; }
        .t5-masonry-grid .t5-photo img { display: block; width: 100%; height: auto; min-height: 280px; object-fit: cover; transition: transform 0.65s cubic-bezier(0.2,0.7,0.2,1); }
        .t5-masonry-grid .t5-photo:nth-child(2n) img { min-height: 480px; }
        .t5-masonry-grid .t5-photo:nth-child(3n) img { min-height: 360px; }
        .t5-masonry-grid .t5-photo:hover img { transform: scale(1.035); }
        .t5-verified { display: inline-block; color: #6366f1; font-size: 14px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .t5-masonry-grid { column-count: 2; }
        }
        @media (max-width: 520px) {
          .t5-masonry-grid { column-count: 1; padding-top: 210px; }
        }
      `}</style>
      <section className="t5-masonry">
        <div className="t5-masonry-card">
          <span className="t5-eyebrow">
            {serviceArea}
            {priceLabel && <> &middot; {priceLabel}</>}
          </span>
          <h2>
            {name}
            {verified && <span className="t5-verified">&#10003;</span>}
          </h2>
          {bio && <p>{bio}</p>}
          {!bio && tagline && (
            <p>{tagline}. {specialties.join(", ")} grounded in authentic emotion.</p>
          )}
          {specialties.length > 0 && (
            <p style={{ color: "#a5a5b0", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.13em" }}>
              {specialties.join(" · ")}
            </p>
          )}
          <button className="t5-hire" onClick={onHire}>Hire Me</button>
        </div>
        <div className="t5-masonry-grid">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="t5-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
