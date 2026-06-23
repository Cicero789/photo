import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalMediator(props: TemplateProps) {
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
    const id = "font-legal-mediator";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600;700&display=swap";
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
        .tlf-mediator {
          min-height: 100vh;
          background: linear-gradient(135deg,#f8fafc,#ffffff 50%,#f5f3ff);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tlf-mediator::before {
          content: "";
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(124,58,237,.18);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tlf-mediator-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tlf-mediator-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tlf-mediator-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #7c3aed;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tlf-mediator-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tlf-mediator-nav-links li:hover {
          color: #7c3aed;
        }

        /* ── HERO ── */
        .tlf-mediator-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tlf-mediator-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-mediator-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tlf-mediator-pill {
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.10);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
        }
        .tlf-mediator-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #7c3aed;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tlf-mediator-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tlf-mediator-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tlf-mediator-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tlf-mediator-btn-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tlf-mediator-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.3);
        }
        .tlf-mediator-secondary {
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
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-secondary:hover {
          background: rgba(15,23,42,.04);
          border-color: rgba(15,23,42,.24);
        }
        .tlf-mediator-hero-right {
          position: relative;
        }
        .tlf-mediator-media-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 80px 26px 80px 26px;
          padding: 10px;
          backdrop-filter: blur(10px);
        }
        .tlf-mediator-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 72px 18px 72px 18px;
          display: block;
        }

        /* ── MAIN GRID (two panels) ── */
        .tlf-mediator-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-mediator-panel {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tlf-mediator-panel h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #111827;
          font-family: "Libre Baskerville", serif;
        }
        .tlf-mediator-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }

        /* ── INFO ROW (3 cards) ── */
        .tlf-mediator-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-mediator-info-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tlf-mediator-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #7c3aed;
          margin: 0 0 6px;
        }
        .tlf-mediator-info-card-value {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          font-family: "Libre Baskerville", serif;
        }

        /* ── GALLERY ── */
        .tlf-mediator-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tlf-mediator-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
        }
        .tlf-mediator-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tlf-mediator-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tlf-mediator-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tlf-mediator-hero-right {
            order: -1;
          }
          .tlf-mediator-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tlf-mediator-nav {
            padding: 16px 28px;
          }
          .tlf-mediator-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-mediator-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-mediator-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tlf-mediator-nav {
            padding: 14px 18px;
          }
          .tlf-mediator-nav-links {
            gap: 18px;
          }
          .tlf-mediator-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tlf-mediator-hero-title {
            font-size: 32px;
          }
          .tlf-mediator-hero-bio {
            font-size: 14px;
          }
          .tlf-mediator-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .tlf-mediator-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-mediator-secondary {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-mediator-main-grid {
            padding: 0 18px 24px;
          }
          .tlf-mediator-info-row {
            padding: 0 18px 24px;
          }
          .tlf-mediator-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tlf-mediator-gallery-item {
            height: 260px;
          }
          .tlf-mediator-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tlf-mediator">
        {/* NAV */}
        <nav className="tlf-mediator-nav">
          <div className="tlf-mediator-logo">
            <div className="tlf-mediator-logo-icon">{initials}</div>
            <span className="tlf-mediator-logo-name">{name}</span>
          </div>
          <ul className="tlf-mediator-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tlf-mediator-hero">
          <div className="tlf-mediator-hero-left">
            <div className="tlf-mediator-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tlf-mediator-pill">§ {s}</span>
              ))}
            </div>

            <h2 className="tlf-mediator-hero-title">
              {name}
              {verified && <span className="tlf-mediator-verified">&#10003;</span>}
            </h2>

            <p className="tlf-mediator-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, delivering results shaped by precision, strategy, and trust.`}
            </p>

            <div className="tlf-mediator-stat-bar">
              <span>§ {serviceArea}</span>
              {priceLabel && <span>§ {priceLabel}</span>}
              <span>§ {portfolio.length} photos</span>
            </div>

            <div className="tlf-mediator-btn-row">
              <button className="tlf-mediator-hire" onClick={onHire}>
                Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <button className="tlf-mediator-secondary" onClick={() => onPhotoClick(0)}>
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-mediator-hero-right">
            {heroPhoto && (
              <div className="tlf-mediator-media-card">
                <img
                  className="tlf-mediator-hero-img"
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
        <div className="tlf-mediator-main-grid">
          <div className="tlf-mediator-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tlf-mediator-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" § ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tlf-mediator-info-row">
          <div className="tlf-mediator-info-card">
            <p className="tlf-mediator-info-card-label">Service Area</p>
            <p className="tlf-mediator-info-card-value">{serviceArea}</p>
          </div>
          <div className="tlf-mediator-info-card">
            <p className="tlf-mediator-info-card-label">Portfolio</p>
            <p className="tlf-mediator-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tlf-mediator-info-card">
            <p className="tlf-mediator-info-card-label">Pricing</p>
            <p className="tlf-mediator-info-card-value">
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
          <div className="tlf-mediator-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tlf-mediator-gallery-item"
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
