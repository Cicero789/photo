import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalImmigration(props: TemplateProps) {
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
    const id = "font-legal-immigration";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700&display=swap";
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
        .tlf-immigration {
          min-height: 100vh;
          background: linear-gradient(135deg,#ecfeff,#ffffff 45%,#f0fdf4);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tlf-immigration::before {
          content: "";
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(20,184,166,.22);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tlf-immigration-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tlf-immigration-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tlf-immigration-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #0d9488;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tlf-immigration-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tlf-immigration-nav-links li:hover {
          color: #0d9488;
        }

        /* ── HERO ── */
        .tlf-immigration-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tlf-immigration-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-immigration-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tlf-immigration-pill {
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.10);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
        }
        .tlf-immigration-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0d9488;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tlf-immigration-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tlf-immigration-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tlf-immigration-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tlf-immigration-btn-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tlf-immigration-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #0d9488;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13,148,136,0.3);
        }
        .tlf-immigration-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #111827;
          border: 1px solid rgba(15,23,42,.14);
          border-radius: 14px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-secondary:hover {
          background: rgba(15,23,42,.04);
          border-color: rgba(15,23,42,.24);
        }
        .tlf-immigration-hero-right {
          position: relative;
        }
        .tlf-immigration-media-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 26px 80px 26px 80px;
          padding: 10px;
          backdrop-filter: blur(10px);
        }
        .tlf-immigration-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 18px 72px 18px 72px;
          display: block;
        }

        /* ── MAIN GRID (two panels) ── */
        .tlf-immigration-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-immigration-panel {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tlf-immigration-panel h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #111827;
          font-family: "Playfair Display", serif;
        }
        .tlf-immigration-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }

        /* ── INFO ROW (3 cards) ── */
        .tlf-immigration-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-immigration-info-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tlf-immigration-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #0d9488;
          margin: 0 0 6px;
        }
        .tlf-immigration-info-card-value {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          font-family: "Playfair Display", serif;
        }

        /* ── GALLERY ── */
        .tlf-immigration-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tlf-immigration-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
        }
        .tlf-immigration-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tlf-immigration-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tlf-immigration-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tlf-immigration-hero-right {
            order: -1;
          }
          .tlf-immigration-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tlf-immigration-nav {
            padding: 16px 28px;
          }
          .tlf-immigration-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-immigration-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-immigration-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tlf-immigration-nav {
            padding: 14px 18px;
          }
          .tlf-immigration-nav-links {
            gap: 18px;
          }
          .tlf-immigration-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tlf-immigration-hero-title {
            font-size: 32px;
          }
          .tlf-immigration-hero-bio {
            font-size: 14px;
          }
          .tlf-immigration-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .tlf-immigration-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-immigration-secondary {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-immigration-main-grid {
            padding: 0 18px 24px;
          }
          .tlf-immigration-info-row {
            padding: 0 18px 24px;
          }
          .tlf-immigration-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tlf-immigration-gallery-item {
            height: 260px;
          }
          .tlf-immigration-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tlf-immigration">
        {/* NAV */}
        <nav className="tlf-immigration-nav">
          <div className="tlf-immigration-logo">
            <div className="tlf-immigration-logo-icon">{initials}</div>
            <span className="tlf-immigration-logo-name">{name}</span>
          </div>
          <ul className="tlf-immigration-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tlf-immigration-hero">
          <div className="tlf-immigration-hero-left">
            <div className="tlf-immigration-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tlf-immigration-pill">§ {s}</span>
              ))}
            </div>

            <h2 className="tlf-immigration-hero-title">
              {name}
              {verified && <span className="tlf-immigration-verified">&#10003;</span>}
            </h2>

            <p className="tlf-immigration-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, delivering results shaped by precision, strategy, and trust.`}
            </p>

            <div className="tlf-immigration-stat-bar">
              <span>§ {serviceArea}</span>
              {priceLabel && <span>§ {priceLabel}</span>}
              <span>§ {portfolio.length} photos</span>
            </div>

            <div className="tlf-immigration-btn-row">
              <button className="tlf-immigration-hire" onClick={onHire}>
                Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <button className="tlf-immigration-secondary" onClick={() => onPhotoClick(0)}>
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-immigration-hero-right">
            {heroPhoto && (
              <div className="tlf-immigration-media-card">
                <img
                  className="tlf-immigration-hero-img"
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
        <div className="tlf-immigration-main-grid">
          <div className="tlf-immigration-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tlf-immigration-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" § ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tlf-immigration-info-row">
          <div className="tlf-immigration-info-card">
            <p className="tlf-immigration-info-card-label">Service Area</p>
            <p className="tlf-immigration-info-card-value">{serviceArea}</p>
          </div>
          <div className="tlf-immigration-info-card">
            <p className="tlf-immigration-info-card-label">Portfolio</p>
            <p className="tlf-immigration-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tlf-immigration-info-card">
            <p className="tlf-immigration-info-card-label">Pricing</p>
            <p className="tlf-immigration-info-card-value">
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
          <div className="tlf-immigration-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tlf-immigration-gallery-item"
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
