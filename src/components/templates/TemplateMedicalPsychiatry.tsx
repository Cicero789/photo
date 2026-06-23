import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalPsychiatry(props: TemplateProps) {
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
    const id = "font-medical-psychiatry";
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
        /* ── ROOT ── */
        .tmd-psychiatry {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0 55%, #ffffff);
          font-family: Inter, sans-serif;
          color: #111827;
          overflow-x: hidden;
          position: relative;
        }
        .tmd-psychiatry::before {
          content: "";
          position: fixed;
          top: -120px;
          right: -120px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(51, 65, 85, 0.14);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .tmd-psychiatry::after {
          content: "";
          position: fixed;
          bottom: -100px;
          left: -80px;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: rgba(51, 65, 85, 0.08);
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .tmd-psychiatry-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          position: relative;
          z-index: 2;
        }
        .tmd-psychiatry-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .tmd-psychiatry-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #334155;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tmd-psychiatry-logo-name {
          font-weight: 700;
          font-size: 17px;
          color: #111827;
        }
        .tmd-psychiatry-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .tmd-psychiatry-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: color 0.2s;
        }
        .tmd-psychiatry-nav-links li:hover {
          color: #334155;
        }

        /* ── HERO ── */
        .tmd-psychiatry-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 32px 48px 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tmd-psychiatry-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tmd-psychiatry-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tmd-psychiatry-pill {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(15, 23, 42, 0.1);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          backdrop-filter: blur(6px);
          transition: background 0.2s, border-color 0.2s;
        }
        .tmd-psychiatry-pill:hover {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(51, 65, 85, 0.25);
        }
        .tmd-psychiatry-hero-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          line-height: 1.08;
          color: #111827;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .tmd-psychiatry-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #334155;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tmd-psychiatry-hero-tagline {
          font-size: 18px;
          font-weight: 600;
          line-height: 1.5;
          color: #334155;
          margin: 0;
          max-width: 480px;
        }
        .tmd-psychiatry-hero-bio {
          font-size: 16px;
          line-height: 1.7;
          color: #64748b;
          max-width: 480px;
          margin: 0;
        }
        .tmd-psychiatry-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }
        .tmd-psychiatry-stat-bar span {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tmd-psychiatry-hire {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #334155;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, background 0.2s;
          align-self: flex-start;
          font-family: Inter, sans-serif;
        }
        .tmd-psychiatry-hire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(51, 65, 85, 0.28);
          background: #1e293b;
        }
        .tmd-psychiatry-hero-right {
          position: relative;
        }
        .tmd-psychiatry-hero-img {
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(51, 65, 85, 0.12);
          transition: box-shadow 0.3s;
        }
        .tmd-psychiatry-hero-img:hover {
          box-shadow: 0 24px 64px rgba(51, 65, 85, 0.18);
        }

        /* ── TWO-PANEL GRID ── */
        .tmd-psychiatry-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-psychiatry-panel {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(10px);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .tmd-psychiatry-panel:hover {
          box-shadow: 0 8px 32px rgba(51, 65, 85, 0.08);
          transform: translateY(-2px);
        }
        .tmd-psychiatry-panel h3 {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 12px;
          color: #111827;
        }
        .tmd-psychiatry-panel p {
          font-size: 15px;
          line-height: 1.7;
          color: #64748b;
          margin: 0;
        }
        .tmd-psychiatry-panel ul {
          list-style: none;
          margin: 8px 0 0;
          padding: 0;
        }
        .tmd-psychiatry-panel ul li {
          font-size: 14px;
          line-height: 1.6;
          color: #64748b;
          padding: 4px 0;
          border-bottom: 1px solid rgba(15, 23, 42, 0.05);
        }
        .tmd-psychiatry-panel ul li:last-child {
          border-bottom: none;
        }
        .tmd-psychiatry-panel ul li strong {
          color: #111827;
          font-weight: 700;
        }

        /* ── INFO ROW (3 cards) ── */
        .tmd-psychiatry-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }
        .tmd-psychiatry-info-card {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .tmd-psychiatry-info-card:hover {
          box-shadow: 0 8px 32px rgba(51, 65, 85, 0.08);
          transform: translateY(-2px);
        }
        .tmd-psychiatry-info-card-label {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #334155;
          margin: 0 0 6px;
        }
        .tmd-psychiatry-info-card-value {
          font-size: 22px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        /* ── GALLERY ── */
        .tmd-psychiatry-gallery-heading {
          font-size: 28px;
          font-weight: 800;
          color: #111827;
          text-align: center;
          margin: 0 0 28px;
          padding: 0 48px;
          position: relative;
          z-index: 1;
        }
        .tmd-psychiatry-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }
        .tmd-psychiatry-gallery-item {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.08);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .tmd-psychiatry-gallery-item:hover {
          box-shadow: 0 12px 36px rgba(51, 65, 85, 0.12);
          transform: translateY(-3px);
        }
        .tmd-psychiatry-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease, opacity 0.3s;
        }
        .tmd-psychiatry-gallery-item:hover img {
          transform: scale(1.05);
          opacity: 0.92;
        }

        /* ── RESPONSIVE 980px ── */
        @media (max-width: 980px) {
          .tmd-psychiatry-hero {
            grid-template-columns: 1fr;
            padding: 24px 28px 40px;
          }
          .tmd-psychiatry-hero-right {
            order: -1;
          }
          .tmd-psychiatry-hero-img {
            aspect-ratio: 16 / 9;
          }
          .tmd-psychiatry-nav {
            padding: 16px 28px;
          }
          .tmd-psychiatry-main-grid {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-psychiatry-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 32px;
          }
          .tmd-psychiatry-gallery {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 28px 48px;
          }
          .tmd-psychiatry-gallery-heading {
            padding: 0 28px;
            font-size: 24px;
          }
        }

        /* ── RESPONSIVE 620px ── */
        @media (max-width: 620px) {
          .tmd-psychiatry-nav {
            padding: 14px 18px;
          }
          .tmd-psychiatry-nav-links {
            gap: 18px;
          }
          .tmd-psychiatry-hero {
            padding: 16px 18px 32px;
            gap: 24px;
          }
          .tmd-psychiatry-hero-title {
            font-size: 32px;
          }
          .tmd-psychiatry-hero-tagline {
            font-size: 16px;
          }
          .tmd-psychiatry-hero-bio {
            font-size: 14px;
          }
          .tmd-psychiatry-hire {
            padding: 14px 28px;
            font-size: 15px;
            width: 100%;
            justify-content: center;
          }
          .tmd-psychiatry-main-grid {
            padding: 0 18px 24px;
          }
          .tmd-psychiatry-info-row {
            padding: 0 18px 24px;
          }
          .tmd-psychiatry-gallery {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 0 18px 40px;
          }
          .tmd-psychiatry-gallery-heading {
            padding: 0 18px;
            font-size: 22px;
          }
          .tmd-psychiatry-gallery-item {
            height: 260px;
          }
          .tmd-psychiatry-stat-bar {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      <section className="tmd-psychiatry">
        {/* NAV */}
        <nav className="tmd-psychiatry-nav">
          <div className="tmd-psychiatry-logo">
            <div className="tmd-psychiatry-logo-icon">{initials}</div>
            <span className="tmd-psychiatry-logo-name">{name}</span>
          </div>
          <ul className="tmd-psychiatry-nav-links">
            <li>Portfolio</li>
            <li>About</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <div className="tmd-psychiatry-hero">
          <div className="tmd-psychiatry-hero-left">
            <div className="tmd-psychiatry-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tmd-psychiatry-pill">
                  {s}
                </span>
              ))}
            </div>

            <h2 className="tmd-psychiatry-hero-title">
              {name}
              {verified && (
                <span className="tmd-psychiatry-verified">&#10003;</span>
              )}
            </h2>

            <p className="tmd-psychiatry-hero-tagline">{tagline}</p>

            <p className="tmd-psychiatry-hero-bio">
              {bio ||
                `Specializing in ${specialties.join(", ")}, delivering results shaped by precision, empathy, and clinical expertise.`}
            </p>

            <div className="tmd-psychiatry-stat-bar">
              <span>&#9679; {serviceArea}</span>
              {priceLabel && <span>&#9679; {priceLabel}</span>}
              <span>&#9679; {portfolio.length} photos</span>
            </div>

            <button className="tmd-psychiatry-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` — ${priceLabel}` : ""}
            </button>
          </div>

          <div className="tmd-psychiatry-hero-right">
            {heroPhoto && (
              <img
                className="tmd-psychiatry-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        {/* TWO-PANEL SECTION */}
        <div className="tmd-psychiatry-main-grid">
          <div className="tmd-psychiatry-panel">
            <h3>Our Method</h3>
            <p>
              {bio ||
                `${name} combines clinical precision with artistic sensitivity, capturing the human side of psychiatric care. Every session is conducted with discretion, professionalism, and a deep understanding of the healthcare environment.`}
            </p>
          </div>
          <div className="tmd-psychiatry-panel">
            <h3>Quick Facts</h3>
            <ul>
              <li>
                <strong>Location:</strong> {serviceArea}
              </li>
              <li>
                <strong>Specialties:</strong> {specialties.join(", ")}
              </li>
              <li>
                <strong>Portfolio:</strong> {portfolio.length} images
              </li>
              {priceLabel && (
                <li>
                  <strong>Pricing:</strong> {priceLabel}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tmd-psychiatry-info-row">
          <div className="tmd-psychiatry-info-card">
            <p className="tmd-psychiatry-info-card-label">Service Area</p>
            <p className="tmd-psychiatry-info-card-value">{serviceArea}</p>
          </div>
          <div className="tmd-psychiatry-info-card">
            <p className="tmd-psychiatry-info-card-label">Specialties</p>
            <p className="tmd-psychiatry-info-card-value">
              {specialties.length} areas
            </p>
          </div>
          <div className="tmd-psychiatry-info-card">
            <p className="tmd-psychiatry-info-card-label">Practice</p>
            <p className="tmd-psychiatry-info-card-value">
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
          <>
            <h3 className="tmd-psychiatry-gallery-heading">Portfolio</h3>
            <div className="tmd-psychiatry-gallery">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tmd-psychiatry-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
