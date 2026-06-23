import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalCPA(props: TemplateProps) {
  const { name, tagline, specialties, bio, website: _website, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-legal-cpa";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap";
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
        .tlf-cpa-root {
          --tlf-cpa-bg: linear-gradient(135deg,#f8fafc,#ffffff 50%,#e0f2fe);
          --tlf-cpa-accent: #0369a1;
          --tlf-cpa-accent-text: #fff;
          --tlf-cpa-orb: rgba(14,165,233,.18);
          --tlf-cpa-card: rgba(255,255,255,.84);
          --tlf-cpa-card-line: rgba(15,23,42,.08);
          --tlf-cpa-ink: #111827;
          --tlf-cpa-muted: #64748b;
          --tlf-cpa-radius: 18px;
          font-family: 'Inter', sans-serif;
          color: var(--tlf-cpa-ink);
          background: var(--tlf-cpa-bg);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Decorative orb */
        .tlf-cpa-orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: var(--tlf-cpa-orb);
          top: -120px;
          right: -140px;
          z-index: 0;
          pointer-events: none;
          filter: blur(60px);
        }

        .tlf-cpa-orb--bottom {
          top: auto;
          bottom: -180px;
          left: -160px;
          right: auto;
          width: 440px;
          height: 440px;
        }

        /* NAV */
        .tlf-cpa-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 48px;
          position: relative;
          z-index: 2;
          border-bottom: 1px solid var(--tlf-cpa-card-line);
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,.72);
        }

        .tlf-cpa-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .tlf-cpa-nav-logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--tlf-cpa-accent);
          color: var(--tlf-cpa-accent-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          flex-shrink: 0;
        }

        .tlf-cpa-nav-name {
          font-weight: 700;
          font-size: 16px;
          letter-spacing: -0.02em;
        }

        .tlf-cpa-nav-links {
          display: flex;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tlf-cpa-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: var(--tlf-cpa-muted);
          cursor: pointer;
          transition: color .2s;
        }

        .tlf-cpa-nav-links li:hover {
          color: var(--tlf-cpa-accent);
        }

        /* HERO */
        .tlf-cpa-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 48px 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }

        .tlf-cpa-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tlf-cpa-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tlf-cpa-pill {
          background: rgba(3,105,161,.08);
          color: var(--tlf-cpa-accent);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .tlf-cpa-hero-heading {
          font-family: 'Inter', sans-serif;
          font-size: 44px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .tlf-cpa-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--tlf-cpa-accent);
          color: var(--tlf-cpa-accent-text);
          font-size: 14px;
          flex-shrink: 0;
        }

        .tlf-cpa-tagline {
          font-size: 18px;
          color: var(--tlf-cpa-muted);
          line-height: 1.6;
          margin: 0;
          font-weight: 400;
        }

        .tlf-cpa-bio {
          font-size: 15px;
          line-height: 1.7;
          color: var(--tlf-cpa-ink);
          margin: 0;
          opacity: 0.85;
        }

        .tlf-cpa-stats {
          display: flex;
          gap: 24px;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 4px;
        }

        .tlf-cpa-stat {
          font-size: 13px;
          font-weight: 600;
          color: var(--tlf-cpa-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tlf-cpa-stat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--tlf-cpa-accent);
        }

        .tlf-cpa-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .tlf-cpa-btn-primary {
          background: var(--tlf-cpa-accent);
          color: var(--tlf-cpa-accent-text);
          border: none;
          padding: 14px 36px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: transform .15s, box-shadow .2s;
          box-shadow: 0 2px 12px rgba(3,105,161,.22);
        }

        .tlf-cpa-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(3,105,161,.32);
        }

        .tlf-cpa-btn-secondary {
          background: transparent;
          color: var(--tlf-cpa-accent);
          border: 2px solid var(--tlf-cpa-accent);
          padding: 12px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: background .2s, color .2s;
        }

        .tlf-cpa-btn-secondary:hover {
          background: var(--tlf-cpa-accent);
          color: var(--tlf-cpa-accent-text);
        }

        /* Hero media card */
        .tlf-cpa-hero-right {
          position: relative;
        }

        .tlf-cpa-media-card {
          position: relative;
          border-radius: var(--tlf-cpa-radius);
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,.10);
        }

        .tlf-cpa-media-card img {
          display: block;
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: var(--tlf-cpa-radius);
        }

        .tlf-cpa-media-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(0,0,0,.54);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 8px;
          backdrop-filter: blur(6px);
          letter-spacing: 0.02em;
        }

        /* MAIN CONTENT GRID */
        .tlf-cpa-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 0 48px 40px;
          position: relative;
          z-index: 1;
        }

        .tlf-cpa-panel {
          background: var(--tlf-cpa-card);
          border: 1px solid var(--tlf-cpa-card-line);
          border-radius: 16px;
          padding: 32px;
          backdrop-filter: blur(10px);
        }

        .tlf-cpa-panel-title {
          font-size: 18px;
          font-weight: 800;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tlf-cpa-panel-title-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(3,105,161,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--tlf-cpa-accent);
          font-size: 16px;
          font-weight: 700;
        }

        .tlf-cpa-credential-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tlf-cpa-credential-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          line-height: 1.5;
          color: var(--tlf-cpa-ink);
        }

        .tlf-cpa-credential-marker {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--tlf-cpa-accent);
          color: var(--tlf-cpa-accent-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .tlf-cpa-service-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tlf-cpa-service-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          line-height: 1.5;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(3,105,161,.04);
          border: 1px solid var(--tlf-cpa-card-line);
          transition: border-color .2s;
        }

        .tlf-cpa-service-item:hover {
          border-color: rgba(3,105,161,.25);
        }

        .tlf-cpa-service-marker {
          color: var(--tlf-cpa-accent);
          font-weight: 800;
          font-size: 16px;
          flex-shrink: 0;
        }

        /* INFO ROW */
        .tlf-cpa-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 48px;
          position: relative;
          z-index: 1;
        }

        .tlf-cpa-info-card {
          background: var(--tlf-cpa-card);
          border: 1px solid var(--tlf-cpa-card-line);
          border-radius: 14px;
          padding: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .tlf-cpa-info-card-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--tlf-cpa-muted);
          margin: 0 0 8px;
        }

        .tlf-cpa-info-card-value {
          font-size: 20px;
          font-weight: 800;
          color: var(--tlf-cpa-ink);
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* GALLERY */
        .tlf-cpa-gallery {
          padding: 0 48px 64px;
          position: relative;
          z-index: 1;
        }

        .tlf-cpa-gallery-title {
          font-size: 24px;
          font-weight: 800;
          margin: 0 0 24px;
          letter-spacing: -0.02em;
        }

        .tlf-cpa-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }

        .tlf-cpa-gallery-item {
          border-radius: var(--tlf-cpa-radius);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 2px 16px rgba(0,0,0,.07);
          transition: transform .2s, box-shadow .2s;
        }

        .tlf-cpa-gallery-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,.13);
        }

        .tlf-cpa-gallery-item img {
          display: block;
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .tlf-cpa-gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px 14px;
          background: linear-gradient(transparent, rgba(0,0,0,.52));
          color: #fff;
          font-size: 12px;
          font-weight: 600;
        }

        /* RESPONSIVE */
        @media (max-width: 980px) {
          .tlf-cpa-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 32px;
          }

          .tlf-cpa-content {
            grid-template-columns: 1fr;
            padding: 0 32px 32px;
          }

          .tlf-cpa-info-row {
            grid-template-columns: 1fr;
            padding: 0 32px 40px;
          }

          .tlf-cpa-gallery {
            padding: 0 32px 48px;
          }

          .tlf-cpa-nav {
            padding: 16px 32px;
          }

          .tlf-cpa-hero-heading {
            font-size: 36px;
          }

          .tlf-cpa-media-card img {
            height: 340px;
          }
        }

        @media (max-width: 620px) {
          .tlf-cpa-hero {
            padding: 28px 18px;
          }

          .tlf-cpa-nav {
            padding: 14px 18px;
            flex-direction: column;
            gap: 12px;
          }

          .tlf-cpa-nav-links {
            gap: 18px;
          }

          .tlf-cpa-hero-heading {
            font-size: 28px;
          }

          .tlf-cpa-content {
            padding: 0 18px 24px;
          }

          .tlf-cpa-info-row {
            padding: 0 18px 32px;
          }

          .tlf-cpa-gallery {
            padding: 0 18px 40px;
          }

          .tlf-cpa-gallery-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .tlf-cpa-gallery-item img {
            height: 160px;
          }

          .tlf-cpa-actions {
            flex-direction: column;
          }

          .tlf-cpa-media-card img {
            height: 260px;
          }

          .tlf-cpa-panel {
            padding: 22px;
          }
        }
      `}</style>

      <div className="tlf-cpa-root">
        {/* Decorative orbs */}
        <div className="tlf-cpa-orb" />
        <div className="tlf-cpa-orb tlf-cpa-orb--bottom" />

        {/* NAV */}
        <nav className="tlf-cpa-nav">
          <div className="tlf-cpa-nav-brand">
            <div className="tlf-cpa-nav-logo">{name.charAt(0)}</div>
            <span className="tlf-cpa-nav-name">{name}</span>
          </div>
          <ul className="tlf-cpa-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li onClick={onHire}>Hire</li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="tlf-cpa-hero">
          <div className="tlf-cpa-hero-left">
            <div className="tlf-cpa-pills">
              {specialties.slice(0, 4).map((s) => (
                <span className="tlf-cpa-pill" key={s}>{s}</span>
              ))}
            </div>

            <h2 className="tlf-cpa-hero-heading">
              {name}
              {verified && (
                <span className="tlf-cpa-verified" title="Verified">&#10003;</span>
              )}
            </h2>

            <p className="tlf-cpa-tagline">{tagline}</p>
            <p className="tlf-cpa-bio">{bio}</p>

            <div className="tlf-cpa-stats">
              {serviceArea && (
                <span className="tlf-cpa-stat">
                  <span className="tlf-cpa-stat-dot" />
                  {serviceArea}
                </span>
              )}
              {priceLabel && (
                <span className="tlf-cpa-stat">
                  <span className="tlf-cpa-stat-dot" />
                  {priceLabel}
                </span>
              )}
            </div>

            <div className="tlf-cpa-actions">
              <button className="tlf-cpa-btn-primary" onClick={onHire}>
                Hire Me
              </button>
              <button className="tlf-cpa-btn-secondary">
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-cpa-hero-right">
            {heroPhoto && (
              <div className="tlf-cpa-media-card" onClick={() => onPhotoClick(0)} style={{ cursor: "pointer" }}>
                <img src={heroPhoto.url} alt={heroPhoto.filename} />
                <div className="tlf-cpa-media-overlay">Featured Work</div>
              </div>
            )}
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section className="tlf-cpa-content">
          {/* Credentials Panel */}
          <div className="tlf-cpa-panel">
            <h3 className="tlf-cpa-panel-title">
              <span className="tlf-cpa-panel-title-icon">&#9733;</span>
              Credentials
            </h3>
            <ul className="tlf-cpa-credential-list">
              <li className="tlf-cpa-credential-item">
                <span className="tlf-cpa-credential-marker">01</span>
                <span>Professional photographer specializing in legal and financial documentation</span>
              </li>
              <li className="tlf-cpa-credential-item">
                <span className="tlf-cpa-credential-marker">02</span>
                <span>High-resolution corporate headshots and office environment photography</span>
              </li>
              <li className="tlf-cpa-credential-item">
                <span className="tlf-cpa-credential-marker">03</span>
                <span>Compliance-ready visual assets for regulatory submissions</span>
              </li>
              {verified && (
                <li className="tlf-cpa-credential-item">
                  <span className="tlf-cpa-credential-marker">&#10003;</span>
                  <span>Verified professional with identity and portfolio review</span>
                </li>
              )}
            </ul>
          </div>

          {/* Services Panel */}
          <div className="tlf-cpa-panel">
            <h3 className="tlf-cpa-panel-title">
              <span className="tlf-cpa-panel-title-icon">&#167;</span>
              Specialties &amp; Services
            </h3>
            <ul className="tlf-cpa-service-list">
              {specialties.map((s) => (
                <li className="tlf-cpa-service-item" key={s}>
                  <span className="tlf-cpa-service-marker">&sect;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* INFO ROW */}
        <section className="tlf-cpa-info-row">
          <div className="tlf-cpa-info-card">
            <p className="tlf-cpa-info-card-label">Service Area</p>
            <p className="tlf-cpa-info-card-value">{serviceArea || "Nationwide"}</p>
          </div>
          <div className="tlf-cpa-info-card">
            <p className="tlf-cpa-info-card-label">Portfolio Size</p>
            <p className="tlf-cpa-info-card-value">{portfolio.length} Photos</p>
          </div>
          <div className="tlf-cpa-info-card">
            <p className="tlf-cpa-info-card-label">Pricing</p>
            <p className="tlf-cpa-info-card-value">{priceLabel || "Contact for quote"}</p>
          </div>
        </section>

        {/* GALLERY */}
        {galleryPhotos.length > 0 && (
          <section className="tlf-cpa-gallery">
            <h3 className="tlf-cpa-gallery-title">Portfolio</h3>
            <div className="tlf-cpa-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  className="tlf-cpa-gallery-item"
                  key={photo.id}
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} />
                  <div className="tlf-cpa-gallery-caption">{photo.filename}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
