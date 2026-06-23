import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateWinterFrozen(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-winter-frozen";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap";
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

  return (
    <>
      <style>{`
        /* ── Root ── */
        .wf-root {
          position: relative;
          min-height: 600px;
          font-family: "DM Sans", sans-serif;
          color: #173447;
          background: linear-gradient(180deg, #f9fdff 0%, #dff3fc 100%);
          overflow: hidden;
        }
        .wf-root *,
        .wf-root *::before,
        .wf-root *::after { box-sizing: border-box; }

        /* ── Radial accent gradients ── */
        .wf-root::before,
        .wf-root::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .wf-root::before {
          width: 700px; height: 700px;
          top: -180px; right: -120px;
          background: radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%);
        }
        .wf-root::after {
          width: 500px; height: 500px;
          bottom: 60px; left: -100px;
          background: radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%);
        }

        /* ── Snowfall ── */
        .wf-snow-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }
        .wf-snowflake {
          position: absolute;
          top: -12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          box-shadow: 0 0 6px 1px rgba(255,255,255,0.7), 0 0 14px 3px rgba(14,165,233,0.12);
          animation: wf-fall linear infinite;
          will-change: transform;
        }
        @keyframes wf-fall {
          0%   { transform: translateY(0) translateX(0); opacity: 1; }
          25%  { transform: translateY(25vh) translateX(12px); opacity: 0.9; }
          50%  { transform: translateY(50vh) translateX(-8px); opacity: 0.8; }
          75%  { transform: translateY(75vh) translateX(16px); opacity: 0.5; }
          100% { transform: translateY(105vh) translateX(4px); opacity: 0; }
        }
        .wf-snowflake-0 { left: 5%;  width: 5px; height: 5px; animation-duration: 12s; animation-delay: 0s; }
        .wf-snowflake-1 { left: 14%; width: 3px; height: 3px; animation-duration: 16s; animation-delay: 2s; }
        .wf-snowflake-2 { left: 25%; width: 7px; height: 7px; animation-duration: 10s; animation-delay: 4s; }
        .wf-snowflake-3 { left: 35%; width: 4px; height: 4px; animation-duration: 18s; animation-delay: 1s; }
        .wf-snowflake-4 { left: 48%; width: 6px; height: 6px; animation-duration: 14s; animation-delay: 5s; }
        .wf-snowflake-5 { left: 58%; width: 3px; height: 3px; animation-duration: 20s; animation-delay: 3s; }
        .wf-snowflake-6 { left: 68%; width: 8px; height: 8px; animation-duration: 11s; animation-delay: 6s; }
        .wf-snowflake-7 { left: 76%; width: 4px; height: 4px; animation-duration: 15s; animation-delay: 0.5s; }
        .wf-snowflake-8 { left: 85%; width: 5px; height: 5px; animation-duration: 13s; animation-delay: 7s; }
        .wf-snowflake-9 { left: 93%; width: 6px; height: 6px; animation-duration: 17s; animation-delay: 2.5s; }
        @media (prefers-reduced-motion: reduce) {
          .wf-snow-container { display: none; }
        }

        /* ── Nav bar ── */
        .wf-nav {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 16px 5vw;
          border-top: 1px solid rgba(14,165,233,0.18);
          border-bottom: 1px solid rgba(14,165,233,0.18);
          font-family: "Manrope", sans-serif;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4f7d96;
        }
        .wf-nav-area { text-align: left; }
        .wf-nav-name {
          text-align: center;
          font-weight: 300;
          font-size: 14px;
          color: #173447;
          letter-spacing: 0.14em;
        }
        .wf-nav-specs { text-align: right; }

        /* ── Hero section ── */
        .wf-hero {
          position: relative;
          z-index: 2;
          min-height: 78vh;
          display: flex;
          align-items: flex-end;
          padding: 5vw;
        }
        .wf-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.55) brightness(1.05);
        }
        .wf-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(223,243,252,0.82), transparent 60%),
            linear-gradient(0deg, rgba(23,52,71,0.72), transparent 55%);
          z-index: 1;
        }

        /* ── Frosted glass panel ── */
        .wf-glass-panel {
          position: relative;
          z-index: 2;
          max-width: 560px;
          padding: 40px 44px;
          background: rgba(255,255,255,0.22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.45);
          border-radius: 6px;
        }
        .wf-kicker {
          display: block;
          margin-bottom: 10px;
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #0b84bd;
        }
        .wf-hero-title {
          margin: 0 0 16px;
          font-family: "Manrope", sans-serif;
          font-weight: 300;
          font-size: clamp(34px, 5vw, 56px);
          line-height: 1.1;
          color: #fff;
        }
        .wf-hero-desc {
          margin: 0 0 24px;
          font-family: "DM Sans", sans-serif;
          font-weight: 300;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.88);
          max-width: 440px;
        }
        .wf-hire-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 28px;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          background: #0ea5e9;
          border: 2px solid #0ea5e9;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.3s, color 0.3s;
        }
        .wf-hire-btn:hover {
          background: transparent;
          color: #fff;
        }

        /* ── Verified badge ── */
        .wf-verified {
          display: inline-block;
          color: #0ea5e9;
          font-size: 16px;
          margin-left: 10px;
          vertical-align: middle;
        }

        /* ── Glass Gallery ── */
        .wf-gallery {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 48px 5vw 56px;
        }
        .wf-card {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.45);
          box-shadow: 0 4px 24px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .wf-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(14,165,233,0.14), 0 2px 8px rgba(0,0,0,0.06);
        }
        .wf-card img {
          display: block;
          width: 100%;
          height: 320px;
          object-fit: cover;
          filter: saturate(0.5) brightness(1.05);
          transition: filter 0.45s ease;
        }
        .wf-card:hover img {
          filter: saturate(1) brightness(1);
        }
        .wf-card-label {
          position: absolute;
          bottom: 12px;
          left: 12px;
          padding: 5px 14px;
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #173447;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 20px;
          letter-spacing: 0.04em;
          pointer-events: none;
        }

        /* ── Bottom note ── */
        .wf-note {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 24px 5vw 48px;
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-weight: 400;
          font-size: 17px;
          color: #4f7d96;
          letter-spacing: 0.02em;
        }

        /* ── Responsive: 900px ── */
        @media (max-width: 900px) {
          .wf-hero { min-height: 85vh; }
          .wf-gallery { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Responsive: 600px ── */
        @media (max-width: 600px) {
          .wf-nav {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 6px;
          }
          .wf-nav-area,
          .wf-nav-specs { text-align: center; }
          .wf-hero {
            min-height: 90vh;
            align-items: flex-end;
            padding: 20px;
          }
          .wf-glass-panel {
            max-width: 100%;
            padding: 28px 24px;
          }
          .wf-gallery { grid-template-columns: 1fr; }
          .wf-card img { height: 260px; }
        }
      `}</style>
      <section className="wf-root">
        {/* Snowfall particles */}
        <div className="wf-snow-container">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`wf-snowflake wf-snowflake-${i}`} />
          ))}
        </div>

        {/* Nav bar */}
        <nav className="wf-nav">
          <span className="wf-nav-area">{serviceArea}</span>
          <span className="wf-nav-name">
            {name}
            {verified && <span className="wf-verified">&#10003;</span>}
          </span>
          <span className="wf-nav-specs">{specialties.join(" · ")}</span>
        </nav>

        {/* Hero */}
        <div className="wf-hero">
          {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} className="wf-hero-img" />}
          <div className="wf-hero-overlay" />
          <div className="wf-glass-panel">
            <span className="wf-kicker">{tagline || "Frozen Elegance"}</span>
            <h1 className="wf-hero-title">
              {name}
              {verified && <span className="wf-verified">&#10003;</span>}
            </h1>
            {bio && <p className="wf-hero-desc">{bio}</p>}
            {!bio && tagline && (
              <p className="wf-hero-desc">
                {tagline}. {specialties.join(", ")} shaped by light, atmosphere, and authentic emotion.
              </p>
            )}
            <button className="wf-hire-btn" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>

        {/* Glass Gallery */}
        <div className="wf-gallery">
          {galleryPhotos.map((photo, i) => (
            <div key={photo.id} className="wf-card" onClick={() => onPhotoClick(i + 1)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
              <span className="wf-card-label">{photo.filename}</span>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="wf-note">
          {serviceArea} &middot; {specialties.join(" · ")}
        </p>
      </section>
    </>
  );
}
