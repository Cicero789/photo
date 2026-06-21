import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSummerGolden(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-summer-golden";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Manrope:wght@400;500;600&display=swap";
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
        /* ── Root & warm sunset gradient ── */
        .sg-root {
          color: #fff;
          background: linear-gradient(145deg, #e98a3e, #df6955 35%, #cb5d87 65%, #704179);
          font-family: "Manrope", sans-serif;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .sg-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,244,221,0.1) 0%, transparent 38%),
                      radial-gradient(ellipse at 70% 20%, rgba(255,244,221,0.07), transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Nav bar ── */
        .sg-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 5vw;
          border-bottom: 1px solid rgba(255,255,255,0.18);
          position: relative;
          z-index: 3;
        }
        .sg-nav-name {
          font-family: "Playfair Display", serif;
          font-weight: 500;
          font-style: italic;
          font-size: 21px;
          letter-spacing: 0.02em;
        }
        .sg-nav-right {
          font-size: 13px;
          font-weight: 400;
          opacity: 0.82;
          letter-spacing: 0.04em;
        }

        /* ── Verified badge ── */
        .sg-verified {
          display: inline-block;
          margin-left: 10px;
          font-size: 16px;
          font-style: normal;
          text-shadow: 0 0 8px rgba(255,255,255,0.6), 0 0 22px rgba(255,244,221,0.45);
          vertical-align: middle;
        }

        /* ── Hero section ── */
        .sg-hero {
          position: relative;
          min-height: 77vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          box-shadow: 0 30px 90px rgba(0,0,0,0.45), 0 0 120px rgba(112,65,121,0.2);
        }
        .sg-hero > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.28) saturate(1.25) brightness(0.88) contrast(1.05);
        }
        .sg-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 28% 38%, rgba(233,138,62,0.3), transparent 58%),
            linear-gradient(to top, rgba(112,65,121,0.88) 0%, rgba(112,65,121,0.25) 35%, transparent 60%);
          z-index: 1;
        }
        .sg-hero-copy {
          position: relative;
          z-index: 2;
          padding: 7vw;
          max-width: 740px;
        }
        .sg-kicker {
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 11px;
          font-weight: 600;
          opacity: 0.88;
        }
        .sg-hero-copy h1 {
          font-family: "Playfair Display", serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(44px, 7.5vw, 92px);
          line-height: 1.05;
          margin: 16px 0 20px;
          text-shadow: 0 3px 35px rgba(0,0,0,0.28);
        }
        .sg-hero-copy p {
          font-size: 15px;
          line-height: 1.75;
          opacity: 0.88;
          max-width: 500px;
          font-weight: 400;
        }

        /* ── Hire button (cream pill) ── */
        .sg-hire {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 34px;
          margin-top: 26px;
          font-family: "Manrope", sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #7f3952;
          background: #fff4dd;
          border: 2px solid #fff4dd;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(127,57,82,0.32);
          transition: background 0.3s, color 0.3s, transform 0.25s, box-shadow 0.3s, border-color 0.3s;
          text-decoration: none;
        }
        .sg-hire:hover {
          background: transparent;
          color: #fff;
          border-color: rgba(255,255,255,0.5);
          box-shadow: 0 6px 36px rgba(255,244,221,0.2);
          transform: translateY(-2px);
        }

        /* ── Glow gallery ── */
        .sg-gallery {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 26px;
          padding: 64px 5vw 72px;
          position: relative;
          z-index: 1;
        }
        .sg-gallery-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 14px 44px rgba(0,0,0,0.3), 0 0 70px rgba(233,138,62,0.08);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22,0.68,0.18,1), box-shadow 0.4s;
          display: flex;
          flex-direction: column;
        }
        .sg-gallery-card:nth-child(3n+1),
        .sg-gallery-card:nth-child(3n) {
          height: 78%;
          align-self: center;
        }
        .sg-gallery-card:hover {
          transform: translateY(-7px) scale(1.015);
          box-shadow: 0 22px 64px rgba(0,0,0,0.4), 0 0 90px rgba(233,138,62,0.14);
        }
        .sg-gallery-card img {
          width: 100%;
          flex: 1;
          min-height: 0;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.22,0.68,0.18,1), opacity 0.35s;
        }
        .sg-gallery-card:hover img {
          transform: scale(1.04);
          opacity: 0.88;
        }
        .sg-gallery-label {
          padding: 15px 20px;
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-weight: 500;
          font-size: 14px;
          opacity: 0.85;
          letter-spacing: 0.02em;
        }

        /* ── Bottom note ── */
        .sg-bottom-note {
          text-align: center;
          padding: 42px 5vw;
          border-top: 1px solid rgba(255,255,255,0.18);
          border-bottom: 1px solid rgba(255,255,255,0.18);
          margin: 0 5vw 64px;
          position: relative;
          z-index: 1;
        }
        .sg-bottom-note p {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-weight: 500;
          font-size: 18px;
          line-height: 1.65;
          opacity: 0.82;
          max-width: 580px;
          margin: 0 auto;
        }

        /* ── Responsive: 900px ── */
        @media (max-width: 900px) {
          .sg-hero { min-height: 600px; }
          .sg-gallery { gap: 18px; }
        }

        /* ── Responsive: 600px ── */
        @media (max-width: 600px) {
          .sg-nav {
            flex-direction: column;
            gap: 6px;
            text-align: center;
          }
          .sg-hero {
            min-height: 75vh;
          }
          .sg-hero-copy {
            padding: 6vw;
          }
          .sg-hero-copy h1 {
            font-size: clamp(30px, 10vw, 50px);
          }
          .sg-gallery {
            grid-template-columns: 1fr;
            padding: 40px 5vw 48px;
          }
          .sg-gallery-card:nth-child(3n+1),
          .sg-gallery-card:nth-child(3n) {
            height: auto;
            align-self: stretch;
          }
          .sg-bottom-note {
            margin: 0 3vw 48px;
            padding: 32px 4vw;
          }
        }
      `}</style>
      <section className="sg-root">
        {/* Nav */}
        <nav className="sg-nav">
          <div className="sg-nav-name">
            {name}
            {verified && <span className="sg-verified">&#10003;</span>}
          </div>
          <div className="sg-nav-right">
            {serviceArea}
            {tagline && ` · ${tagline}`}
          </div>
        </nav>

        {/* Hero */}
        <div className="sg-hero">
          {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
          <div className="sg-hero-overlay" />
          <div className="sg-hero-copy">
            <span className="sg-kicker">
              {specialties.length > 0 ? specialties.join(" · ") : "Photography"}
            </span>
            <h1>{name}</h1>
            {bio && <p>{bio}</p>}
            {!bio && tagline && (
              <p>{tagline}. Capturing warmth, light, and golden moments across {serviceArea}.</p>
            )}
            <button className="sg-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>

        {/* Glow Gallery */}
        {galleryPhotos.length > 0 && (
          <div className="sg-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="sg-gallery-card"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} loading="lazy" />
                <div className="sg-gallery-label">
                  {photo.filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Note */}
        <div className="sg-bottom-note">
          <p>&ldquo;Every golden hour is a fleeting invitation to see the world wrapped in warmth.&rdquo;</p>
        </div>
      </section>
    </>
  );
}
