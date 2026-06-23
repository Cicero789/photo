import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateWinterCozy(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-winter-cozy";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&family=Slabo+27px&display=swap";
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
  const warmGallery = galleryPhotos.slice(0, 3);
  const storyPhotos = galleryPhotos.slice(3);

  return (
    <>
      <style>{`
        /* ── Cozy Winter — scoped with wc- prefix ── */
        .wc-root {
          position: relative;
          color: #f8e8cc;
          background: #1c1917;
          font-family: "DM Sans", sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }

        /* Amber radial gradients */
        .wc-root::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 15% 20%, rgba(245,158,11,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 85% 75%, rgba(245,158,11,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 50% 50%, rgba(139,91,45,0.05) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle vertical stripe overlay */
        .wc-root::after {
          content: "";
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 3px,
            rgba(245,158,11,0.015) 3px,
            rgba(245,158,11,0.015) 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        .wc-root > * {
          position: relative;
          z-index: 1;
        }

        /* ── Ember decorations ── */
        .wc-ember {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 12px 4px rgba(245,158,11,0.5), 0 0 28px 8px rgba(245,158,11,0.2);
          z-index: 2;
          pointer-events: none;
          animation: wc-glow 3s ease-in-out infinite alternate;
        }
        .wc-ember-1 { top: 12%; left: 8%; animation-delay: 0s; }
        .wc-ember-2 { top: 55%; right: 6%; animation-delay: 1s; }
        .wc-ember-3 { bottom: 18%; left: 45%; animation-delay: 2s; }

        @keyframes wc-glow {
          0%   { opacity: 0.5; transform: scale(0.8); }
          100% { opacity: 1;   transform: scale(1.2); }
        }

        /* ── Nav bar ── */
        .wc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 5vw;
          border-bottom: 1px solid rgba(245,158,11,0.18);
          font-size: 13px;
          letter-spacing: 0.06em;
        }
        .wc-nav-name {
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: 22px;
          color: #f8e8cc;
        }
        .wc-nav-meta {
          display: flex;
          gap: 18px;
          color: rgba(248,232,204,0.6);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .wc-nav-meta span {
          border-left: 1px solid rgba(245,158,11,0.25);
          padding-left: 18px;
        }
        .wc-nav-meta span:first-child {
          border-left: none;
          padding-left: 0;
        }

        /* ── Split Hero ── */
        .wc-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 72vh;
        }
        .wc-hero-photo {
          position: relative;
          overflow: hidden;
          min-height: 500px;
        }
        .wc-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7) sepia(0.25) saturate(0.85);
          transition: filter 0.6s ease;
        }
        .wc-hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(28,25,23,0.6) 100%);
          pointer-events: none;
        }

        .wc-hero-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6vw 5vw;
          background: linear-gradient(135deg, rgba(28,25,23,0.97) 0%, rgba(30,27,24,0.95) 50%, rgba(35,30,26,0.92) 100%);
          border-left: 1px solid rgba(245,158,11,0.12);
        }

        .wc-kicker {
          display: inline-block;
          color: #f59e0b;
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          margin-bottom: 18px;
        }

        .wc-hero-copy h1 {
          margin: 0 0 20px;
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: clamp(42px, 5.5vw, 80px);
          line-height: 1.05;
          color: #f8e8cc;
        }

        .wc-hero-copy .wc-tagline {
          margin: 0 0 28px;
          font-family: "Slabo 27px", serif;
          font-size: 15px;
          line-height: 1.75;
          color: rgba(248,232,204,0.7);
          max-width: 440px;
        }

        .wc-verified {
          display: inline-block;
          color: #f59e0b;
          font-size: 18px;
          margin-left: 10px;
          vertical-align: middle;
        }

        .wc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 32px;
          font-family: "DM Sans", sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          cursor: pointer;
          border: 2px solid #f59e0b;
          background: #f59e0b;
          color: #1c1917;
          box-shadow: 4px 4px 0 #8b5b2d;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.3s;
        }
        .wc-btn:hover {
          background: transparent;
          color: #f59e0b;
          box-shadow: 2px 2px 0 #8b5b2d;
          transform: translate(2px, 2px);
        }

        /* ── Warm Gallery ── */
        .wc-gallery {
          padding: 60px 5vw;
        }
        .wc-gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 22px;
          align-items: center;
        }
        .wc-gallery-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(245,158,11,0.2);
          background: rgba(28,25,23,0.9);
          cursor: pointer;
          transition: border-color 0.4s, transform 0.4s;
        }
        .wc-gallery-card:hover {
          border-color: rgba(245,158,11,0.5);
          transform: translateY(-4px);
        }
        .wc-gallery-card:nth-child(1),
        .wc-gallery-card:nth-child(3) {
          height: 78%;
          min-height: 280px;
        }
        .wc-gallery-card:nth-child(2) {
          min-height: 360px;
        }
        .wc-gallery-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.75) sepia(0.2) saturate(0.8);
          transition: filter 0.5s, transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
        }
        .wc-gallery-card:hover img {
          filter: brightness(0.85) sepia(0.1) saturate(0.9);
          transform: scale(1.04);
        }
        .wc-gallery-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 18px;
          background: linear-gradient(0deg, rgba(28,25,23,0.88) 0%, transparent 100%);
          font-family: "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(248,232,204,0.8);
          pointer-events: none;
        }

        /* ── Story Section ── */
        .wc-story {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          padding: 55px 5vw;
          border-top: 1px solid rgba(245,158,11,0.15);
          border-bottom: 1px solid rgba(245,158,11,0.15);
        }
        .wc-story-left h2 {
          margin: 0;
          font-family: "Cormorant Garamond", serif;
          font-weight: 500;
          font-size: clamp(28px, 3.5vw, 48px);
          line-height: 1.15;
          color: #f59e0b;
        }
        .wc-story-right p {
          margin: 0;
          font-family: "Slabo 27px", serif;
          font-size: 15px;
          line-height: 1.85;
          color: rgba(248,232,204,0.65);
        }

        /* ── Extra gallery (story photos) ── */
        .wc-extra {
          padding: 50px 5vw 70px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .wc-extra-photo {
          height: 300px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(245,158,11,0.1);
          transition: border-color 0.3s;
        }
        .wc-extra-photo:hover {
          border-color: rgba(245,158,11,0.35);
        }
        .wc-extra-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.72) sepia(0.15);
          transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1), filter 0.4s;
        }
        .wc-extra-photo:hover img {
          transform: scale(1.05);
          filter: brightness(0.82) sepia(0.08);
        }

        /* ── Responsive: 900px ── */
        @media (max-width: 900px) {
          .wc-hero {
            grid-template-columns: 1fr;
          }
          .wc-hero-photo {
            min-height: 600px;
          }
          .wc-hero-copy {
            border-left: none;
            border-top: 1px solid rgba(245,158,11,0.12);
            padding: 8vw 6vw;
          }
          .wc-story {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .wc-extra {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 600px ── */
        @media (max-width: 600px) {
          .wc-nav {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          .wc-nav-meta {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }
          .wc-gallery-grid {
            grid-template-columns: 1fr;
          }
          .wc-gallery-card:nth-child(1),
          .wc-gallery-card:nth-child(3) {
            height: auto;
            min-height: 260px;
          }
          .wc-gallery-card:nth-child(2) {
            min-height: 260px;
          }
          .wc-story {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .wc-extra {
            grid-template-columns: 1fr;
          }
          .wc-extra-photo {
            height: 250px;
          }
          .wc-hero-copy h1 {
            font-size: clamp(32px, 8vw, 50px);
          }
        }
      `}</style>

      <section className="wc-root">
        {/* Ember decorations */}
        <div className="wc-ember wc-ember-1" />
        <div className="wc-ember wc-ember-2" />
        <div className="wc-ember wc-ember-3" />

        {/* Nav bar */}
        <nav className="wc-nav">
          <span className="wc-nav-name">
            {name}
            {verified && <span className="wc-verified">&#10003;</span>}
          </span>
          <div className="wc-nav-meta">
            {serviceArea && <span>{serviceArea}</span>}
            {specialties.slice(0, 3).map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </nav>

        {/* Split Hero */}
        <div className="wc-hero">
          <div className="wc-hero-photo">
            {heroPhoto && (
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            )}
          </div>
          <div className="wc-hero-copy">
            <span className="wc-kicker">
              {specialties.length > 0 ? specialties.join(" / ") : "Photography"}
            </span>
            <h1>{name}</h1>
            <p className="wc-tagline">
              {tagline || (bio ? bio.slice(0, 160) : "Capturing warmth, light, and authentic moments.")}
            </p>
            <button className="wc-btn" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>

        {/* Warm Gallery */}
        {warmGallery.length > 0 && (
          <div className="wc-gallery">
            <div className="wc-gallery-grid">
              {warmGallery.map((photo, i) => (
                <div
                  key={photo.id}
                  className="wc-gallery-card"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                  <span className="wc-gallery-label">
                    {specialties[i] || photo.filename}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Story Section */}
        <div className="wc-story">
          <div className="wc-story-left">
            <h2>Every Frame<br />Tells a Story</h2>
          </div>
          <div className="wc-story-right">
            <p>
              {bio || `${name} is a photographer based in ${serviceArea || "your area"}, specializing in ${specialties.join(", ") || "capturing life's fleeting moments"}. ${tagline || "Warm tones, authentic emotion, and timeless compositions define every session."}`}
            </p>
          </div>
        </div>

        {/* Extra gallery (remaining story photos) */}
        {storyPhotos.length > 0 && (
          <div className="wc-extra">
            {storyPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="wc-extra-photo"
                onClick={() => onPhotoClick(i + 4)}
              >
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
