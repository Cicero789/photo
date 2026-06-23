import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function Template3Editorial(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-editorial-magazine";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Source+Serif+4:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `From $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const featurePhoto = portfolio?.[0];
  const stackPhotos = portfolio.slice(1, 3);

  return (
    <>
      <style>{`
        .t3-editorial { padding: 68px 5vw 80px; background: #fafaf9; font-family: "Source Serif 4", serif; min-height: 600px; }
        .t3-edit-mast { text-align: center; border-top: 1px solid #444; border-bottom: 1px solid #444; padding: 28px 0; }
        .t3-edit-mast h2 { margin: 0; font: 600 clamp(32px, 6vw, 78px)/1 "Playfair Display", serif; letter-spacing: 0.15em; text-transform: uppercase; }
        .t3-edit-meta { margin-top: 12px; font-style: italic; color: #666; }
        .t3-edit-feature { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; margin: 38px 0; }
        .t3-edit-feature > .t3-photo { min-height: 670px; overflow: hidden; cursor: pointer; }
        .t3-edit-stack { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
        .t3-edit-stack .t3-photo { min-height: 327px; overflow: hidden; cursor: pointer; }
        .t3-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.2,0.7,0.2,1); }
        .t3-photo:hover img { transform: scale(1.035); }
        .t3-edit-story { display: grid; grid-template-columns: 1fr 1.4fr auto; gap: 5vw; align-items: start; padding: 30px 0; border-top: 1px solid #aaa; border-bottom: 1px solid #aaa; }
        .t3-edit-story h3 { margin: 0; font: 400 38px/1.05 "Playfair Display", serif; }
        .t3-edit-story p { margin: 0; line-height: 1.7; }
        .t3-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }
        .t3-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 24px; font: inherit; text-decoration: none; cursor: pointer; border: 1px solid #991b1b; color: white; background: #991b1b; transition: transform 0.25s, background 0.25s, color 0.25s; }
        .t3-hire:hover { color: #991b1b; background: transparent; transform: translateY(-2px); }
        .t3-verified { display: inline-block; color: #991b1b; font-size: 14px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .t3-edit-feature { grid-template-columns: 1fr; }
          .t3-edit-feature > .t3-photo { min-height: 500px; }
          .t3-edit-story { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .t3-edit-stack .t3-photo { min-height: 230px; }
        }
      `}</style>
      <section className="t3-editorial">
        <header className="t3-edit-mast">
          <h2>
            {name}
            {verified && <span className="t3-verified">&#10003;</span>}
          </h2>
          <div className="t3-edit-meta">
            {specialties.join(" & ")} {serviceArea && `· ${serviceArea}`}
          </div>
        </header>
        <div className="t3-edit-feature">
          {featurePhoto && (
            <div className="t3-photo" onClick={() => onPhotoClick(0)}>
              <img src={featurePhoto.url} alt={featurePhoto.filename} loading="lazy" />
            </div>
          )}
          <div className="t3-edit-stack">
            {stackPhotos.map((photo, i) => (
              <div key={photo.id} className="t3-photo" onClick={() => onPhotoClick(i + 1)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="t3-edit-story">
          <h3>
            {tagline ? (
              <>
                {tagline.split(",")[0]},<br />
                <em>{tagline.split(",").slice(1).join(",").trim() || "artfully captured."}</em>
              </>
            ) : (
              <em>Visual stories</em>
            )}
          </h3>
          {bio && <p>{bio}</p>}
          <div>
            <span className="t3-eyebrow">{specialties.join(" / ")}</span>
            <br /><br />
            <button className="t3-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
