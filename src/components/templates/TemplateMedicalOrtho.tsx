import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalOrtho(props: TemplateProps) {
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
    const id = "font-medical-ortho";
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
        .tmd-ortho {
          min-height: 100vh;
          background: linear-gradient(120deg, #fff, #eef2ff 45%, #fdf2f8);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tmd-ortho::before {
          content: "";
          position: fixed;
          bottom: -100px;
          left: -100px;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.2);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tmd-ortho-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tmd-ortho-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tmd-ortho-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #7c3aed;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          font-family: "Space Grotesk", sans-serif;
        }
        .tmd-ortho-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          font-family: "Space Grotesk", sans-serif;
        }
        .tmd-ortho-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tmd-ortho-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tmd-ortho-nav-links li:hover {
          color: #7c3aed;
        }

        /* ── HERO ── */
        .tmd-ortho-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tmd-ortho-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tmd-ortho-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tmd-ortho-pill {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(15, 23, 42, 0.1);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
        }
        .tmd-ortho-hero-title {
          font-family: "Space Grotesk", sans-serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.08;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .tmd-ortho-verified {
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
        .tmd-ortho-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tmd-ortho-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tmd-ortho-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tmd-ortho-hire {
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
          align-self: flex-start;
          font-family: "Space Grotesk", sans-serif;
        }
        .tmd-ortho-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3);
        }
        .tmd-ortho-hero-right {
          position: relative;
        }
        .tmd-ortho-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 20px 60px rgba(124, 58, 237, 0.12);
        }

        /* ── MAIN GRID ── */
        .tmd-ortho-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-ortho-panel {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 18px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }
        .tmd-ortho-panel h3 {
          font-family: "Space Grotesk", sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #111827;
        }
        .tmd-ortho-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }

        /* ── INFO ROW ── */
        .tmd-ortho-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-ortho-info-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 18px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        .tmd-ortho-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #7c3aed;
          margin: 0 0 6px;
          font-family: "Space Grotesk", sans-serif;
        }
        .tmd-ortho-info-card-value {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
        }

        /* ── GALLERY ── */
        .tmd-ortho-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tmd-ortho-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
        }
        .tmd-ortho-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tmd-ortho-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .tmd-ortho-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tmd-ortho-hero-right {
            order: -1;
          }
          .tmd-ortho-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tmd-ortho-nav {
            padding: 16px 28px;
          }
          .tmd-ortho-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-ortho-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-ortho-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
        }
        @media (max-width: 620px) {
          .tmd-ortho-nav {
            padding: 14px 18px;
          }
          .tmd-ortho-nav-links {
            gap: 18px;
          }
          .tmd-ortho-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tmd-ortho-hero-title {
            font-size: 32px;
          }
          .tmd-ortho-hero-bio {
            font-size: 14px;
          }
          .tmd-ortho-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tmd-ortho-main-grid {
            padding: 0 18px 24px;
          }
          .tmd-ortho-info-row {
            padding: 0 18px 24px;
          }
          .tmd-ortho-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tmd-ortho-gallery-item {
            height: 260px;
          }
          .tmd-ortho-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tmd-ortho">
        {/* NAV */}
        <nav className="tmd-ortho-nav">
          <div className="tmd-ortho-logo">
            <div className="tmd-ortho-logo-icon">{initials}</div>
            <span className="tmd-ortho-logo-name">{name}</span>
          </div>
          <ul className="tmd-ortho-nav-links">
            <li>Portfolio</li>
            <li>About</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tmd-ortho-hero">
          <div className="tmd-ortho-hero-left">
            <div className="tmd-ortho-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tmd-ortho-pill">{s}</span>
              ))}
            </div>

            <h2 className="tmd-ortho-hero-title">
              {name}
              {verified && <span className="tmd-ortho-verified">&#10003;</span>}
            </h2>

            <p className="tmd-ortho-hero-bio">
              {bio || `${tagline}. Specializing in ${specialties.join(", ")}, restoring movement and strength through dedicated orthopedic care.`}
            </p>

            <div className="tmd-ortho-stat-bar">
              <span>&#9679; {serviceArea}</span>
              {priceLabel && <span>&#9679; {priceLabel}</span>}
              <span>&#9679; {portfolio.length} photos</span>
            </div>

            <button className="tmd-ortho-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
            </button>
          </div>

          <div className="tmd-ortho-hero-right">
            {heroPhoto && (
              <img
                className="tmd-ortho-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="tmd-ortho-main-grid">
          <div className="tmd-ortho-panel">
            <h3>About</h3>
            <p>{bio || tagline}</p>
          </div>
          <div className="tmd-ortho-panel">
            <h3>Specialties</h3>
            <p>{specialties.join(" · ")}</p>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tmd-ortho-info-row">
          <div className="tmd-ortho-info-card">
            <p className="tmd-ortho-info-card-label">Service Area</p>
            <p className="tmd-ortho-info-card-value">{serviceArea}</p>
          </div>
          <div className="tmd-ortho-info-card">
            <p className="tmd-ortho-info-card-label">Portfolio</p>
            <p className="tmd-ortho-info-card-value">{portfolio.length} Images</p>
          </div>
          <div className="tmd-ortho-info-card">
            <p className="tmd-ortho-info-card-label">Pricing</p>
            <p className="tmd-ortho-info-card-value">
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
          <div className="tmd-ortho-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-ortho-gallery-item"
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
