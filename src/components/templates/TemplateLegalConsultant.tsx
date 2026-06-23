import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalConsultant(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  useEffect(() => {
    const id = "font-legal-consultant";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;600;700&display=swap";
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
  const initials = name.charAt(0).toUpperCase();

  return (
    <>
      <style>{`
        .tlf-consultant {
          min-height: 100vh;
          background: linear-gradient(135deg,#111827,#1f2937 54%,#312e81);
          font-family: Inter, sans-serif;
          color: #f8fafc;
          overflow-x: hidden;
          position: relative;
        }
        .tlf-consultant::before {
          content: "";
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(167,139,250,.22);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tlf-consultant-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tlf-consultant-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tlf-consultant-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #a78bfa;
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #fff;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tlf-consultant-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #cbd5e1;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tlf-consultant-nav-links li:hover {
          color: #a78bfa;
        }

        /* ── HERO ── */
        .tlf-consultant-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tlf-consultant-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-consultant-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tlf-consultant-pill {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #e0e7ff;
          backdrop-filter: blur(6px);
        }
        .tlf-consultant-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #a78bfa;
          color: #111827;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tlf-consultant-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #cbd5e1;
          max-width: 480px;
          margin: 0;
        }
        .tlf-consultant-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #cbd5e1;
          font-weight: 600;
        }
        .tlf-consultant-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tlf-consultant-btn-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tlf-consultant-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #a78bfa;
          color: #111827;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(167,139,250,0.35);
        }
        .tlf-consultant-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #e0e7ff;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 14px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-secondary:hover {
          background: rgba(255,255,255,.06);
          border-color: rgba(255,255,255,.28);
        }
        .tlf-consultant-hero-right {
          position: relative;
        }
        .tlf-consultant-media-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 42px;
          padding: 10px;
          backdrop-filter: blur(10px);
        }
        .tlf-consultant-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 34px;
          display: block;
        }

        /* ── MAIN GRID (two panels) ── */
        .tlf-consultant-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-consultant-panel {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tlf-consultant-panel h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #fff;
          font-family: "Space Grotesk", sans-serif;
        }
        .tlf-consultant-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #cbd5e1;
          margin: 0;
        }

        /* ── INFO ROW (3 cards) ── */
        .tlf-consultant-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-consultant-info-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tlf-consultant-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #a78bfa;
          margin: 0 0 6px;
        }
        .tlf-consultant-info-card-value {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
        }

        /* ── GALLERY ── */
        .tlf-consultant-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tlf-consultant-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
        }
        .tlf-consultant-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tlf-consultant-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tlf-consultant-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tlf-consultant-hero-right {
            order: -1;
          }
          .tlf-consultant-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tlf-consultant-nav {
            padding: 16px 28px;
          }
          .tlf-consultant-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-consultant-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-consultant-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tlf-consultant-nav {
            padding: 14px 18px;
          }
          .tlf-consultant-nav-links {
            gap: 18px;
          }
          .tlf-consultant-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tlf-consultant-hero-title {
            font-size: 32px;
          }
          .tlf-consultant-hero-bio {
            font-size: 14px;
          }
          .tlf-consultant-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .tlf-consultant-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-consultant-secondary {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-consultant-main-grid {
            padding: 0 18px 24px;
          }
          .tlf-consultant-info-row {
            padding: 0 18px 24px;
          }
          .tlf-consultant-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tlf-consultant-gallery-item {
            height: 260px;
          }
          .tlf-consultant-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tlf-consultant">
        {/* NAV */}
        <nav className="tlf-consultant-nav">
          <div className="tlf-consultant-logo">
            <div className="tlf-consultant-logo-icon">{initials}</div>
            <span className="tlf-consultant-logo-name">{name}</span>
          </div>
          <ul className="tlf-consultant-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tlf-consultant-hero">
          <div className="tlf-consultant-hero-left">
            <div className="tlf-consultant-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tlf-consultant-pill">§ {s}</span>
              ))}
            </div>

            <h2 className="tlf-consultant-hero-title">
              {name}
              {verified && <span className="tlf-consultant-verified">&#10003;</span>}
            </h2>

            <p className="tlf-consultant-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, delivering results shaped by precision, strategy, and trust.`}
            </p>

            <div className="tlf-consultant-stat-bar">
              <span>§ {serviceArea}</span>
              {priceLabel && <span>§ {priceLabel}</span>}
              <span>§ {portfolio.length} photos</span>
            </div>

            <div className="tlf-consultant-btn-row">
              <button className="tlf-consultant-hire" onClick={onHire}>
                Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <button className="tlf-consultant-secondary" onClick={() => onPhotoClick(0)}>
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-consultant-hero-right">
            {heroPhoto && (
              <div className="tlf-consultant-media-card">
                <img
                  className="tlf-consultant-hero-img"
                  src={heroPhoto.url}
                  alt={heroPhoto.filename}
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="tlf-consultant-main-grid">
          <div className="tlf-consultant-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tlf-consultant-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" § ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tlf-consultant-info-row">
          <div className="tlf-consultant-info-card">
            <p className="tlf-consultant-info-card-label">Service Area</p>
            <p className="tlf-consultant-info-card-value">{serviceArea}</p>
          </div>
          <div className="tlf-consultant-info-card">
            <p className="tlf-consultant-info-card-label">Portfolio</p>
            <p className="tlf-consultant-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tlf-consultant-info-card">
            <p className="tlf-consultant-info-card-label">Pricing</p>
            <p className="tlf-consultant-info-card-value">
              {pricing?.downloads?.single
                ? `$${pricing?.downloads?.single}`
                : pricing?.downloads?.full
                  ? `$${pricing?.downloads?.full}`
                  : "Contact"}
            </p>
          </div>
        </div>

        {/* GALLERY */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-consultant-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tlf-consultant-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
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
