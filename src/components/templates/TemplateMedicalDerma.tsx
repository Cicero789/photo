import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalDerma(props: TemplateProps) {
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
    const id = "font-medical-derma";
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
        .tmd-derma {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed, #fff 40%, #ffe4e6);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tmd-derma::before {
          content: "";
          position: fixed;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(251, 113, 133, 0.22);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tmd-derma-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tmd-derma-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tmd-derma-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #be123c;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          font-family: "Playfair Display", serif;
        }
        .tmd-derma-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #3f1724;
          font-family: "Playfair Display", serif;
        }
        .tmd-derma-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tmd-derma-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tmd-derma-nav-links li:hover {
          color: #be123c;
        }

        /* ── HERO ── */
        .tmd-derma-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tmd-derma-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tmd-derma-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tmd-derma-pill {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(15, 23, 42, 0.1);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
        }
        .tmd-derma-hero-title {
          font-family: "Playfair Display", serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.1;
          color: #3f1724;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tmd-derma-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #be123c;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tmd-derma-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tmd-derma-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tmd-derma-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tmd-derma-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #be123c;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          align-self: flex-start;
          font-family: Inter, sans-serif;
        }
        .tmd-derma-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(190, 18, 60, 0.3);
        }
        .tmd-derma-hero-right {
          position: relative;
        }
        .tmd-derma-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(190, 18, 60, 0.1);
        }

        /* ── MAIN GRID ── */
        .tmd-derma-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-derma-panel {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tmd-derma-panel h3 {
          font-family: "Playfair Display", serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #3f1724;
        }
        .tmd-derma-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }

        /* ── INFO ROW ── */
        .tmd-derma-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-derma-info-card {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tmd-derma-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #be123c;
          margin: 0 0 6px;
          font-family: "Playfair Display", serif;
        }
        .tmd-derma-info-card-value {
          font-size: 22px;
          font-weight: 800;
          color: #3f1724;
          margin: 0;
          font-family: "Playfair Display", serif;
        }

        /* ── GALLERY ── */
        .tmd-derma-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tmd-derma-gallery-item {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .tmd-derma-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.08);
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tmd-derma-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tmd-derma-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tmd-derma-hero-right {
            order: -1;
          }
          .tmd-derma-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tmd-derma-nav {
            padding: 16px 28px;
          }
          .tmd-derma-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-derma-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-derma-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tmd-derma-nav {
            padding: 14px 18px;
          }
          .tmd-derma-nav-links {
            gap: 18px;
          }
          .tmd-derma-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tmd-derma-hero-title {
            font-size: 32px;
          }
          .tmd-derma-hero-bio {
            font-size: 14px;
          }
          .tmd-derma-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tmd-derma-main-grid {
            padding: 0 18px 24px;
          }
          .tmd-derma-info-row {
            padding: 0 18px 24px;
          }
          .tmd-derma-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tmd-derma-gallery-item {
            height: 260px;
          }
          .tmd-derma-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tmd-derma">
        {/* NAV */}
        <nav className="tmd-derma-nav">
          <div className="tmd-derma-logo">
            <div className="tmd-derma-logo-icon">{initials}</div>
            <span className="tmd-derma-logo-name">{name}</span>
          </div>
          <ul className="tmd-derma-nav-links">
            <li>Portfolio</li>
            <li>About</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tmd-derma-hero">
          <div className="tmd-derma-hero-left">
            <div className="tmd-derma-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tmd-derma-pill">{s}</span>
              ))}
            </div>

            <h2 className="tmd-derma-hero-title">
              {name}
              {verified && <span className="tmd-derma-verified">&#10003;</span>}
            </h2>

            <p className="tmd-derma-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, revealing your natural radiance through expert dermatologic care.`}
            </p>

            <div className="tmd-derma-stat-bar">
              <span>&#9679; {serviceArea}</span>
              {priceLabel && <span>&#9679; {priceLabel}</span>}
              <span>&#9679; {portfolio.length} photos</span>
            </div>

            <button className="tmd-derma-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
            </button>
          </div>

          <div className="tmd-derma-hero-right">
            {heroPhoto && (
              <img
                className="tmd-derma-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="tmd-derma-main-grid">
          <div className="tmd-derma-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tmd-derma-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" · ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tmd-derma-info-row">
          <div className="tmd-derma-info-card">
            <p className="tmd-derma-info-card-label">Service Area</p>
            <p className="tmd-derma-info-card-value">{serviceArea}</p>
          </div>
          <div className="tmd-derma-info-card">
            <p className="tmd-derma-info-card-label">Portfolio</p>
            <p className="tmd-derma-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tmd-derma-info-card">
            <p className="tmd-derma-info-card-label">Pricing</p>
            <p className="tmd-derma-info-card-value">
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
          <div className="tmd-derma-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-derma-gallery-item"
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
