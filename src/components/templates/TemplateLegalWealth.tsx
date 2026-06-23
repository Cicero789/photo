import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalWealth(props: TemplateProps) {
  const { name, tagline, specialties, bio, website: _website, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-legal-wealth";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700&display=swap";
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
    <div className="tlf-wealth-root">
      {/* Decorative orb */}
      <div className="tlf-wealth-orb" />

      {/* ── Nav Bar ── */}
      <nav className="tlf-wealth-nav">
        <div className="tlf-wealth-nav-inner">
          <div className="tlf-wealth-nav-brand">
            <span className="tlf-wealth-logo-circle">{name.charAt(0)}</span>
            <span className="tlf-wealth-nav-name">{name}</span>
          </div>
          <div className="tlf-wealth-nav-links">
            <a href="#tlf-wealth-gallery" className="tlf-wealth-nav-link">Portfolio</a>
            <a href="#tlf-wealth-credentials" className="tlf-wealth-nav-link">Credentials</a>
            <button className="tlf-wealth-nav-hire" onClick={onHire}>Hire</button>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="tlf-wealth-hero">
        <div className="tlf-wealth-hero-grid">
          {/* Left column */}
          <div className="tlf-wealth-hero-left">
            <div className="tlf-wealth-pills">
              {specialties.slice(0, 4).map((s) => (
                <span key={s} className="tlf-wealth-pill">{s}</span>
              ))}
            </div>

            <h2 className="tlf-wealth-hero-heading">
              {name}
              {verified && <span className="tlf-wealth-verified" title="Verified">&#10003;</span>}
            </h2>

            <p className="tlf-wealth-hero-tagline">{tagline}</p>
            <p className="tlf-wealth-hero-bio">{bio}</p>

            <div className="tlf-wealth-stats-bar">
              {serviceArea && (
                <span className="tlf-wealth-stat">
                  <span className="tlf-wealth-stat-label">Service Area</span>
                  <span className="tlf-wealth-stat-value">{serviceArea}</span>
                </span>
              )}
              {priceLabel && (
                <span className="tlf-wealth-stat">
                  <span className="tlf-wealth-stat-label">Pricing</span>
                  <span className="tlf-wealth-stat-value">{priceLabel}</span>
                </span>
              )}
            </div>

            <div className="tlf-wealth-hero-actions">
              <button className="tlf-wealth-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tlf-wealth-btn-secondary" onClick={() => { const el = document.getElementById("tlf-wealth-gallery"); el?.scrollIntoView({ behavior: "smooth" }); }}>View Portfolio</button>
            </div>
          </div>

          {/* Right column */}
          <div className="tlf-wealth-hero-right">
            {heroPhoto && (
              <div className="tlf-wealth-media-card" onClick={() => onPhotoClick(0)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") onPhotoClick(0); }}>
                <img src={heroPhoto.url} alt={heroPhoto.filename} className="tlf-wealth-media-img" />
                <div className="tlf-wealth-media-overlay">
                  <span className="tlf-wealth-media-note">Featured Work</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <section className="tlf-wealth-main" id="tlf-wealth-credentials">
        <div className="tlf-wealth-main-grid">
          {/* Left: Credentials */}
          <div className="tlf-wealth-panel tlf-wealth-credentials">
            <h3 className="tlf-wealth-panel-title">Credentials &amp; Experience</h3>
            <div className="tlf-wealth-credential-list">
              <div className="tlf-wealth-credential-item">
                <span className="tlf-wealth-credential-icon">&#9670;</span>
                <div>
                  <strong>Professional Photographer</strong>
                  <p>Specializing in legal and financial sector imagery</p>
                </div>
              </div>
              <div className="tlf-wealth-credential-item">
                <span className="tlf-wealth-credential-icon">&#9670;</span>
                <div>
                  <strong>Corporate &amp; Executive Portraits</strong>
                  <p>High-end headshots for attorneys, advisors, and C-suite</p>
                </div>
              </div>
              <div className="tlf-wealth-credential-item">
                <span className="tlf-wealth-credential-icon">&#9670;</span>
                <div>
                  <strong>Architectural &amp; Interior Photography</strong>
                  <p>Law offices, financial institutions, and luxury spaces</p>
                </div>
              </div>
              {verified && (
                <div className="tlf-wealth-credential-item">
                  <span className="tlf-wealth-credential-icon" style={{ color: "#d6a74a" }}>&#10003;</span>
                  <div>
                    <strong>Verified Professional</strong>
                    <p>Identity and credentials verified on this platform</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Services */}
          <div className="tlf-wealth-panel tlf-wealth-services">
            <h3 className="tlf-wealth-panel-title">Specialties &amp; Services</h3>
            <div className="tlf-wealth-service-list">
              {specialties.map((s) => (
                <div key={s} className="tlf-wealth-service-item">
                  <span className="tlf-wealth-section-marker">&sect;</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tlf-wealth-service-cta">
              <button className="tlf-wealth-btn-primary" onClick={onHire}>Request a Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Info Row ── */}
      <section className="tlf-wealth-info-row">
        <div className="tlf-wealth-info-card">
          <span className="tlf-wealth-info-icon">&#9733;</span>
          <h4>Premium Quality</h4>
          <p>Publication-ready images that reflect the prestige of your practice and brand.</p>
        </div>
        <div className="tlf-wealth-info-card">
          <span className="tlf-wealth-info-icon">&#128274;</span>
          <h4>Confidential Process</h4>
          <p>Discretion and professionalism at every stage, from booking through delivery.</p>
        </div>
        <div className="tlf-wealth-info-card">
          <span className="tlf-wealth-info-icon">&#9883;</span>
          <h4>Tailored Results</h4>
          <p>Each session is customized to meet the unique demands of legal and financial imagery.</p>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="tlf-wealth-gallery" id="tlf-wealth-gallery">
        <h3 className="tlf-wealth-gallery-title">Portfolio</h3>
        <div className="tlf-wealth-gallery-grid">
          {galleryPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="tlf-wealth-gallery-item"
              onClick={() => onPhotoClick(idx + 1)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") onPhotoClick(idx + 1); }}
            >
              <img src={photo.url} alt={photo.filename} className="tlf-wealth-gallery-img" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Styles ── */}
      <style>{`
        .tlf-wealth-root {
          position: relative;
          background: linear-gradient(135deg, #07111f, #0f1e34 56%, #111827);
          color: #f8fafc;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Decorative Orb ── */
        .tlf-wealth-orb {
          position: absolute;
          top: -180px;
          right: -140px;
          width: 620px;
          height: 620px;
          border-radius: 50%;
          background: rgba(214, 167, 74, .2);
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Nav ── */
        .tlf-wealth-nav {
          position: relative;
          z-index: 10;
          padding: 22px 48px;
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .tlf-wealth-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .tlf-wealth-nav-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .tlf-wealth-logo-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #d6a74a;
          color: #07111f;
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tlf-wealth-nav-name {
          font-family: "Playfair Display", serif;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          letter-spacing: .3px;
        }
        .tlf-wealth-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .tlf-wealth-nav-link {
          color: #cbd5e1;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: .4px;
          transition: color .2s;
        }
        .tlf-wealth-nav-link:hover {
          color: #d6a74a;
        }
        .tlf-wealth-nav-hire {
          background: #d6a74a;
          color: #07111f;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background .2s;
        }
        .tlf-wealth-nav-hire:hover {
          background: #c4963e;
        }

        /* ── Hero ── */
        .tlf-wealth-hero {
          position: relative;
          z-index: 2;
          padding: 72px 48px 56px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .tlf-wealth-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .tlf-wealth-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-wealth-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .tlf-wealth-pill {
          display: inline-block;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          color: #dbeafe;
          letter-spacing: .5px;
        }
        .tlf-wealth-hero-heading {
          font-family: "Playfair Display", serif;
          font-size: 52px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin: 8px 0 0;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .tlf-wealth-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #d6a74a;
          color: #07111f;
          font-size: 16px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .tlf-wealth-hero-tagline {
          font-size: 20px;
          color: #dbeafe;
          line-height: 1.5;
          margin: 0;
        }
        .tlf-wealth-hero-bio {
          font-size: 15px;
          color: #cbd5e1;
          line-height: 1.7;
          margin: 0;
        }
        .tlf-wealth-stats-bar {
          display: flex;
          gap: 32px;
          padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,.14);
          border-bottom: 1px solid rgba(255,255,255,.14);
          margin: 4px 0;
        }
        .tlf-wealth-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tlf-wealth-stat-label {
          font-size: 11px;
          font-weight: 600;
          color: #cbd5e1;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .tlf-wealth-stat-value {
          font-size: 15px;
          font-weight: 700;
          color: #d6a74a;
        }
        .tlf-wealth-hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 4px;
        }
        .tlf-wealth-btn-primary {
          background: #d6a74a;
          color: #07111f;
          border: none;
          padding: 14px 36px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s, transform .15s;
          letter-spacing: .3px;
        }
        .tlf-wealth-btn-primary:hover {
          background: #c4963e;
          transform: translateY(-1px);
        }
        .tlf-wealth-btn-secondary {
          background: rgba(255,255,255,.08);
          color: #dbeafe;
          border: 1px solid rgba(255,255,255,.16);
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s, border-color .2s;
        }
        .tlf-wealth-btn-secondary:hover {
          background: rgba(255,255,255,.14);
          border-color: rgba(255,255,255,.28);
        }

        /* Hero Right / Media Card */
        .tlf-wealth-hero-right {
          display: flex;
          justify-content: center;
        }
        .tlf-wealth-media-card {
          position: relative;
          border-radius: 42px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 20px 60px rgba(0,0,0,.45);
          transition: transform .3s;
          max-width: 520px;
          width: 100%;
        }
        .tlf-wealth-media-card:hover {
          transform: scale(1.015);
        }
        .tlf-wealth-media-img {
          width: 100%;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/5;
        }
        .tlf-wealth-media-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 28px 28px 24px;
          background: linear-gradient(transparent, rgba(7,17,31,.78));
        }
        .tlf-wealth-media-note {
          font-size: 13px;
          font-weight: 600;
          color: #d6a74a;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        /* ── Main Content Grid ── */
        .tlf-wealth-main {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px 64px;
        }
        .tlf-wealth-main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .tlf-wealth-panel {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 24px;
          padding: 36px;
        }
        .tlf-wealth-panel-title {
          font-family: "Playfair Display", serif;
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 24px;
        }

        /* Credentials */
        .tlf-wealth-credential-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .tlf-wealth-credential-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }
        .tlf-wealth-credential-icon {
          font-size: 14px;
          color: #d6a74a;
          margin-top: 3px;
          flex-shrink: 0;
        }
        .tlf-wealth-credential-item strong {
          display: block;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .tlf-wealth-credential-item p {
          margin: 0;
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.5;
        }

        /* Services */
        .tlf-wealth-services {
          background: rgba(255,255,255,.08);
        }
        .tlf-wealth-service-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 28px;
        }
        .tlf-wealth-service-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: #dbeafe;
          font-weight: 600;
        }
        .tlf-wealth-section-marker {
          color: #d6a74a;
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
          width: 22px;
          text-align: center;
        }
        .tlf-wealth-service-cta {
          padding-top: 8px;
        }

        /* ── Info Row ── */
        .tlf-wealth-info-row {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px 72px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .tlf-wealth-info-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 20px;
          padding: 32px 28px;
          text-align: center;
        }
        .tlf-wealth-info-icon {
          font-size: 28px;
          display: block;
          margin-bottom: 14px;
        }
        .tlf-wealth-info-card h4 {
          font-family: "Playfair Display", serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
        }
        .tlf-wealth-info-card p {
          margin: 0;
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.6;
        }

        /* ── Gallery ── */
        .tlf-wealth-gallery {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px 80px;
        }
        .tlf-wealth-gallery-title {
          font-family: "Playfair Display", serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 32px;
        }
        .tlf-wealth-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .tlf-wealth-gallery-item {
          border-radius: 42px;
          overflow: hidden;
          cursor: pointer;
          transition: transform .3s, box-shadow .3s;
        }
        .tlf-wealth-gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 40px rgba(0,0,0,.5);
        }
        .tlf-wealth-gallery-img {
          width: 100%;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/5;
          border-radius: 42px;
        }

        /* ── Responsive: 980px ── */
        @media (max-width: 980px) {
          .tlf-wealth-nav {
            padding: 18px 24px;
          }
          .tlf-wealth-hero {
            padding: 48px 24px 40px;
          }
          .tlf-wealth-hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .tlf-wealth-hero-heading {
            font-size: 38px;
          }
          .tlf-wealth-hero-right {
            order: -1;
          }
          .tlf-wealth-media-card {
            max-width: 100%;
          }
          .tlf-wealth-main {
            padding: 0 24px 48px;
          }
          .tlf-wealth-main-grid {
            grid-template-columns: 1fr;
          }
          .tlf-wealth-info-row {
            padding: 0 24px 56px;
            grid-template-columns: 1fr;
          }
          .tlf-wealth-gallery {
            padding: 0 24px 56px;
          }
          .tlf-wealth-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 620px ── */
        @media (max-width: 620px) {
          .tlf-wealth-nav-inner {
            flex-direction: column;
            gap: 14px;
          }
          .tlf-wealth-nav-links {
            gap: 16px;
          }
          .tlf-wealth-hero {
            padding: 32px 16px 28px;
          }
          .tlf-wealth-hero-heading {
            font-size: 28px;
          }
          .tlf-wealth-hero-tagline {
            font-size: 16px;
          }
          .tlf-wealth-hero-bio {
            font-size: 14px;
          }
          .tlf-wealth-stats-bar {
            flex-direction: column;
            gap: 14px;
          }
          .tlf-wealth-hero-actions {
            flex-direction: column;
          }
          .tlf-wealth-btn-primary,
          .tlf-wealth-btn-secondary {
            width: 100%;
            text-align: center;
          }
          .tlf-wealth-main {
            padding: 0 16px 36px;
          }
          .tlf-wealth-panel {
            padding: 24px 20px;
          }
          .tlf-wealth-info-row {
            padding: 0 16px 40px;
          }
          .tlf-wealth-gallery {
            padding: 0 16px 48px;
          }
          .tlf-wealth-gallery-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .tlf-wealth-gallery-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
