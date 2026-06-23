import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateGoldenFeast(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-golden-feast";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const galleryPhotos = portfolio.slice(1);
  const featuredPhotos = galleryPhotos.slice(0, 2);
  const bottomPhotos = galleryPhotos.slice(2, 5);

  return (
    <>
      <style>{`
        .gf-feast {
          position: relative;
          color: #3b2717;
          background: #fff8e8;
          font-family: "DM Sans", sans-serif;
          min-height: 600px;
          overflow: hidden;
        }
        .gf-feast::before {
          content: "";
          position: absolute;
          top: -120px;
          right: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(146,64,14,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .gf-feast::after {
          content: "";
          position: absolute;
          bottom: -100px;
          left: -60px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(193,125,50,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Decorative leaves */
        .gf-leaf {
          position: absolute;
          display: block;
          width: 28px;
          height: 28px;
          background: rgba(146,64,14,0.08);
          border-radius: 0 50% 50% 50%;
          pointer-events: none;
          z-index: 0;
        }
        .gf-l1 { top: 180px; left: 40px; transform: rotate(-30deg); width: 22px; height: 22px; }
        .gf-l2 { top: 320px; right: 60px; transform: rotate(45deg); width: 32px; height: 32px; background: rgba(193,125,50,0.07); }
        .gf-l3 { bottom: 260px; left: 120px; transform: rotate(15deg); width: 18px; height: 18px; background: rgba(126,87,44,0.09); }

        /* Header bar */
        .gf-header {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 18px 5vw;
          border-top: 3px solid #92400e;
          border-bottom: 1px solid #b4855d;
          font-size: 12px;
          letter-spacing: 0.04em;
          color: #765a42;
        }
        .gf-header span:last-child {
          text-align: right;
        }
        .gf-header strong {
          font-family: "Libre Baskerville", serif;
          font-size: 15px;
          color: #3b2717;
          letter-spacing: 0.02em;
        }

        /* Intro section */
        .gf-intro {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding: 70px 5vw 60px;
          align-items: start;
        }
        .gf-kicker {
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 18px;
        }
        .gf-intro h1 {
          font: 700 clamp(36px, 6vw, 72px)/1.08 "Libre Baskerville", serif;
          color: #3b2717;
          margin: 0;
        }
        .gf-intro h1 .gf-verified {
          display: inline-block;
          color: #92400e;
          font-size: 20px;
          margin-left: 10px;
          vertical-align: middle;
        }
        .gf-intro-right {
          padding-top: 14px;
        }
        .gf-intro-right p {
          color: #765a42;
          line-height: 1.75;
          font-size: 15px;
          margin: 0 0 28px;
        }
        .gf-hire {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font: 600 14px/1 "DM Sans", sans-serif;
          color: #fff;
          background: #92400e;
          border: 2px solid #92400e;
          cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: background 0.3s, color 0.3s, transform 0.25s;
        }
        .gf-hire:hover {
          background: transparent;
          color: #92400e;
          transform: translateY(-2px);
        }

        /* Photo grid */
        .gf-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          grid-template-rows: 330px 270px;
          gap: 20px;
          padding: 0 5vw 50px;
        }
        .gf-photo {
          background: #fff;
          padding: 10px 10px 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 2px 12px rgba(59,39,23,0.08);
        }
        .gf-photo:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(59,39,23,0.14);
        }
        .gf-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.85) sepia(0.06);
          transition: filter 0.4s ease;
        }
        .gf-photo:hover img {
          filter: saturate(1) sepia(0);
        }
        .gf-photo-hero {
          grid-row: 1 / 3;
          border-bottom: 4px solid #a44b20;
        }
        .gf-photo-feat1 {
          border-bottom: 4px solid #c17d32;
        }
        .gf-photo-feat2 {
          border-bottom: 4px solid #7e572c;
        }

        /* Gratitude section */
        .gf-gratitude {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 60px 5vw;
          margin: 0 5vw;
          border-top: 1px solid #d4b896;
          border-bottom: 1px solid #d4b896;
        }
        .gf-gratitude::before {
          content: "\\201C";
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          font: 700 120px/1 "Libre Baskerville", serif;
          color: rgba(146,64,14,0.08);
          pointer-events: none;
        }
        .gf-gratitude .gf-kicker {
          margin-bottom: 14px;
        }
        .gf-gratitude h2 {
          font: 700 clamp(24px, 3.5vw, 40px)/1.2 "Libre Baskerville", serif;
          color: #3b2717;
          margin: 0 0 20px;
        }
        .gf-gratitude p {
          font: italic 400 16px/1.8 "Libre Baskerville", serif;
          color: #765a42;
          max-width: 560px;
          margin: 0 auto;
        }

        /* Bottom gallery */
        .gf-gallery {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 50px 5vw 70px;
        }
        .gf-gallery .gf-photo {
          height: 390px;
        }
        .gf-gallery .gf-photo:nth-child(1) {
          border-bottom: 4px solid #a44b20;
        }
        .gf-gallery .gf-photo:nth-child(2) {
          border-bottom: 4px solid #c17d32;
        }
        .gf-gallery .gf-photo:nth-child(3) {
          border-bottom: 4px solid #7e572c;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .gf-intro {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 50px 5vw 40px;
          }
        }
        @media (max-width: 600px) {
          .gf-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .gf-photo-hero {
            grid-row: auto;
          }
          .gf-gallery {
            grid-template-columns: 1fr;
          }
          .gf-gallery .gf-photo {
            height: 300px;
          }
          .gf-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 6px;
          }
          .gf-header span:last-child {
            text-align: center;
          }
        }
      `}</style>
      <section className="gf-feast">
        <span className="gf-leaf gf-l1" />
        <span className="gf-leaf gf-l2" />
        <span className="gf-leaf gf-l3" />

        <header className="gf-header">
          <span>{serviceArea}</span>
          <strong>{name}</strong>
          <span>{specialties.join(" · ")}</span>
        </header>

        <div className="gf-intro">
          <div>
            <span className="gf-kicker">Gather. Give thanks. Remember.</span>
            <h1>
              The season is made around the table.
              {verified && <span className="gf-verified">&#10003;</span>}
            </h1>
          </div>
          <div className="gf-intro-right">
            {bio && <p>{bio}</p>}
            {!bio && tagline && (
              <p>
                {tagline}. {specialties.join(", ")} &mdash; warm, documentary-style
                photography for every gathering.
              </p>
            )}
            <button className="gf-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>

        <div className="gf-grid">
          {heroPhoto && (
            <div className="gf-photo gf-photo-hero" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
          {featuredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              className={`gf-photo ${i === 0 ? "gf-photo-feat1" : "gf-photo-feat2"}`}
              onClick={() => onPhotoClick(i + 1)}
            >
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>

        <section className="gf-gratitude">
          <span className="gf-kicker">Gratitude</span>
          <h2>For the ordinary magic.</h2>
          <p>
            For chairs pulled closer, for laughter that echoes through warm kitchens,
            for the stories told between courses &mdash; these are the moments worth
            holding onto.
          </p>
        </section>

        {bottomPhotos.length > 0 && (
          <div className="gf-gallery">
            {bottomPhotos.map((photo, i) => (
              <div key={photo.id} className="gf-photo" onClick={() => onPhotoClick(i + 3)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
