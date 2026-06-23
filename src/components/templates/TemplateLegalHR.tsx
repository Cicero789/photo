import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalHR(props: TemplateProps) {
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
    const id = "font-legal-hr";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap";
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
        .tlf-hr {
          min-height: 100vh;
          background: linear-gradient(135deg,#eff6ff,#ffffff 48%,#fdf2f8);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tlf-hr::before {
          content: "";
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(37,99,235,.18);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tlf-hr-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tlf-hr-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tlf-hr-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #2563eb;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          font-family: Inter, sans-serif;
        }
        .tlf-hr-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          font-family: Inter, sans-serif;
        }
        .tlf-hr-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tlf-hr-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tlf-hr-nav-links li:hover {
          color: #2563eb;
        }

        /* ── HERO ── */
        .tlf-hr-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tlf-hr-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-hr-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tlf-hr-pill {
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.10);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
        }
        .tlf-hr-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          line-height: 1.08;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
          font-family: Inter, sans-serif;
        }
        .tlf-hr-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tlf-hr-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tlf-hr-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tlf-hr-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tlf-hr-btn-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tlf-hr-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          font-family: Inter, sans-serif;
        }
        .tlf-hr-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.3);
        }
        .tlf-hr-secondary {
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
          font-family: Inter, sans-serif;
        }
        .tlf-hr-secondary:hover {
          background: rgba(15,23,42,.04);
          border-color: rgba(15,23,42,.24);
        }
        .tlf-hr-hero-right {
          position: relative;
        }
        .tlf-hr-media-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 24px;
          padding: 10px;
          backdrop-filter: blur(10px);
        }
        .tlf-hr-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 16px;
          display: block;
        }

        /* ── MAIN GRID (two panels) ── */
        .tlf-hr-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-hr-panel {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tlf-hr-panel h3 {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 12px;
          color: #111827;
          font-family: Inter, sans-serif;
        }
        .tlf-hr-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }

        /* ── INFO ROW (3 cards) ── */
        .tlf-hr-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tlf-hr-info-card {
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tlf-hr-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #2563eb;
          margin: 0 0 6px;
        }
        .tlf-hr-info-card-value {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          margin: 0;
          font-family: Inter, sans-serif;
        }

        /* ── GALLERY ── */
        .tlf-hr-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tlf-hr-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255,255,255,.84);
          border: 1px solid rgba(15,23,42,.08);
        }
        .tlf-hr-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tlf-hr-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tlf-hr-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tlf-hr-hero-right {
            order: -1;
          }
          .tlf-hr-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tlf-hr-nav {
            padding: 16px 28px;
          }
          .tlf-hr-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-hr-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tlf-hr-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tlf-hr-nav {
            padding: 14px 18px;
          }
          .tlf-hr-nav-links {
            gap: 18px;
          }
          .tlf-hr-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tlf-hr-hero-title {
            font-size: 32px;
          }
          .tlf-hr-hero-bio {
            font-size: 14px;
          }
          .tlf-hr-btn-row {
            flex-direction: column;
            align-items: stretch;
          }
          .tlf-hr-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-hr-secondary {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tlf-hr-main-grid {
            padding: 0 18px 24px;
          }
          .tlf-hr-info-row {
            padding: 0 18px 24px;
          }
          .tlf-hr-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tlf-hr-gallery-item {
            height: 260px;
          }
          .tlf-hr-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tlf-hr">
        {/* NAV */}
        <nav className="tlf-hr-nav">
          <div className="tlf-hr-logo">
            <div className="tlf-hr-logo-icon">{initials}</div>
            <span className="tlf-hr-logo-name">{name}</span>
          </div>
          <ul className="tlf-hr-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tlf-hr-hero">
          <div className="tlf-hr-hero-left">
            <div className="tlf-hr-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tlf-hr-pill">§ {s}</span>
              ))}
            </div>

            <h2 className="tlf-hr-hero-title">
              {name}
              {verified && <span className="tlf-hr-verified">&#10003;</span>}
            </h2>

            <p className="tlf-hr-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, delivering results shaped by precision, strategy, and trust.`}
            </p>

            <div className="tlf-hr-stat-bar">
              <span>§ {serviceArea}</span>
              {priceLabel && <span>§ {priceLabel}</span>}
              <span>§ {portfolio.length} photos</span>
            </div>

            <div className="tlf-hr-btn-row">
              <button className="tlf-hr-hire" onClick={onHire}>
                Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <button className="tlf-hr-secondary" onClick={() => onPhotoClick(0)}>
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-hr-hero-right">
            {heroPhoto && (
              <div className="tlf-hr-media-card">
                <img
                  className="tlf-hr-hero-img"
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
        <div className="tlf-hr-main-grid">
          <div className="tlf-hr-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tlf-hr-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" § ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tlf-hr-info-row">
          <div className="tlf-hr-info-card">
            <p className="tlf-hr-info-card-label">Service Area</p>
            <p className="tlf-hr-info-card-value">{serviceArea}</p>
          </div>
          <div className="tlf-hr-info-card">
            <p className="tlf-hr-info-card-label">Portfolio</p>
            <p className="tlf-hr-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tlf-hr-info-card">
            <p className="tlf-hr-info-card-label">Pricing</p>
            <p className="tlf-hr-info-card-value">
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
          <div className="tlf-hr-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tlf-hr-gallery-item"
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
