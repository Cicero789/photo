import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHolidayHearth(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-holiday-hearth";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600&display=swap";
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
        /* ── Holiday Hearth — scoped styles ── */
        .hh-section {
          position: relative;
          background: #7f1d1d;
          background-image: radial-gradient(ellipse at 30% 20%, rgba(212,175,55,.12) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 80%, rgba(212,175,55,.08) 0%, transparent 50%);
          color: #fff8eb;
          font-family: "DM Sans", sans-serif;
          min-height: 600px;
          overflow: hidden;
        }

        /* Gold double-border frame */
        .hh-section::before,
        .hh-section::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
        }
        .hh-section::before {
          border: 3px solid rgba(212,175,55,.5);
          margin: 10px;
        }
        .hh-section::after {
          border: 1px solid rgba(212,175,55,.25);
          margin: 18px;
        }

        /* ── Snowflakes (CSS-only) ── */
        .hh-snowflake {
          position: absolute;
          color: rgba(255,248,235,.10);
          font-size: 72px;
          pointer-events: none;
          z-index: 2;
          animation: hh-drift 12s ease-in-out infinite;
        }
        .hh-snowflake:nth-child(1) { top: 6%; right: 8%; font-size: 64px; animation-delay: 0s; }
        .hh-snowflake:nth-child(2) { top: 42%; left: 4%; font-size: 48px; animation-delay: -4s; }
        .hh-snowflake:nth-child(3) { bottom: 12%; right: 14%; font-size: 56px; animation-delay: -8s; }
        @keyframes hh-drift {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.10; }
          50% { transform: translateY(-12px) rotate(45deg); opacity: 0.18; }
        }

        /* ── Nav bar ── */
        .hh-nav {
          position: relative;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 40px;
          border-bottom: 1px solid rgba(212,175,55,.35);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          flex-wrap: wrap;
          gap: 8px;
        }
        .hh-nav-name {
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.06em;
          color: #d4af37;
        }
        .hh-nav-meta {
          color: rgba(255,248,235,.6);
          font-size: 11px;
        }
        .hh-nav-meta span { margin: 0 6px; }

        /* ── Split hero ── */
        .hh-hero {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 70vh;
        }

        /* Left copy panel */
        .hh-copy-panel {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 48px;
          background: rgba(84,12,14,.86);
          position: relative;
        }

        /* Gold ornament divider (star between lines) */
        .hh-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          color: #d4af37;
          font-size: 13px;
        }
        .hh-ornament::before,
        .hh-ornament::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
        }

        .hh-kicker {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 11px;
          color: rgba(255,248,235,.55);
          margin-bottom: 12px;
        }

        .hh-copy-panel h1 {
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: clamp(42px, 5vw, 72px);
          line-height: 1.05;
          margin: 0 0 16px;
          color: #fff8eb;
        }

        .hh-verified {
          display: inline-block;
          color: #d4af37;
          font-size: 18px;
          margin-left: 10px;
          vertical-align: middle;
        }

        .hh-tagline {
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,248,235,.75);
          max-width: 440px;
          margin-bottom: 28px;
        }

        .hh-hire {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 32px;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: 2px solid #d4af37;
          background: #d4af37;
          color: #3b0a0a;
          transition: background 0.3s, color 0.3s, transform 0.25s;
        }
        .hh-hire:hover {
          background: transparent;
          color: #d4af37;
          transform: translateY(-2px);
        }

        /* Right hero photo */
        .hh-hero-photo {
          position: relative;
          overflow: hidden;
        }
        .hh-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.15) saturate(1.2);
          transition: transform 0.8s cubic-bezier(0.2,0.7,0.2,1);
        }
        .hh-hero-photo:hover img {
          transform: scale(1.03);
        }
        .hh-hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(127,29,29,.35) 0%, transparent 60%),
                      linear-gradient(to top, rgba(127,29,29,.4) 0%, transparent 40%);
          pointer-events: none;
        }

        /* ── Gallery ── */
        .hh-gallery {
          position: relative;
          z-index: 4;
          padding: 48px 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .hh-card {
          border: 1px solid rgba(212,175,55,.4);
          padding: 8px;
          background: rgba(84,12,14,.3);
          cursor: pointer;
          transition: border-color 0.3s, transform 0.3s;
          overflow: hidden;
        }
        .hh-card:hover {
          border-color: #d4af37;
          transform: translateY(-4px);
        }
        .hh-card-inner {
          overflow: hidden;
          height: 280px;
        }
        .hh-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.08) saturate(1.15);
          transition: transform 0.65s cubic-bezier(0.2,0.7,0.2,1), opacity 0.35s;
        }
        .hh-card:hover img {
          transform: scale(1.06);
          opacity: 0.85;
        }

        /* ── Bottom note ── */
        .hh-bottom-note {
          position: relative;
          z-index: 4;
          text-align: center;
          padding: 16px 40px 48px;
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 15px;
          color: rgba(255,248,235,.4);
          letter-spacing: 0.04em;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hh-hero {
            grid-template-columns: 1fr;
          }
          .hh-hero-photo {
            min-height: 50vh;
          }
          .hh-copy-panel {
            padding: 40px 32px;
          }
          .hh-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 32px 24px;
          }
          .hh-nav {
            padding: 14px 24px;
          }
        }
        @media (max-width: 600px) {
          .hh-copy-panel {
            padding: 32px 20px;
          }
          .hh-gallery {
            grid-template-columns: 1fr;
            padding: 24px 16px;
            gap: 16px;
          }
          .hh-nav {
            padding: 12px 16px;
            flex-direction: column;
            align-items: flex-start;
          }
          .hh-section::before { margin: 6px; }
          .hh-section::after { margin: 12px; }
          .hh-bottom-note { padding: 12px 20px 36px; }
        }
      `}</style>
      <section className="hh-section">
        {/* Decorative snowflakes */}
        <span className="hh-snowflake" aria-hidden="true">&#10052;</span>
        <span className="hh-snowflake" aria-hidden="true">&#10053;</span>
        <span className="hh-snowflake" aria-hidden="true">&#10054;</span>

        {/* Nav bar */}
        <nav className="hh-nav">
          <span className="hh-nav-name">{name}</span>
          <span className="hh-nav-meta">
            {serviceArea}
            {specialties.length > 0 && (
              <>
                <span>&#183;</span>
                {specialties.join(" · ")}
              </>
            )}
          </span>
        </nav>

        {/* Split hero */}
        <div className="hh-hero">
          <div className="hh-copy-panel">
            <div className="hh-ornament">&#9733;</div>
            <span className="hh-kicker">Photographer</span>
            <h1>
              {name}
              {verified && <span className="hh-verified">&#10003;</span>}
            </h1>
            <p className="hh-tagline">
              {bio || tagline || `${specialties.join(", ")} — crafted with warmth, light, and timeless elegance.`}
            </p>
            <button className="hh-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
          <div className="hh-hero-photo" onClick={() => onPhotoClick(0)}>
            {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
          </div>
        </div>

        {/* Gallery */}
        <div className="hh-gallery">
          {galleryPhotos.map((photo, i) => (
            <div key={photo.id} className="hh-card" onClick={() => onPhotoClick(i + 1)}>
              <div className="hh-card-inner">
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="hh-bottom-note">
          Warmth &amp; wonder, one frame at a time
        </div>
      </section>
    </>
  );
}
