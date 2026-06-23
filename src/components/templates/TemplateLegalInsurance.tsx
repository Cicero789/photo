import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalInsurance(props: TemplateProps) {
  const { name, tagline, specialties, bio, website: _website, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-legal-insurance";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Inter:wght@400;600;700&display=swap";
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
        .tlf-insurance-wrapper {
          --tlf-bg: linear-gradient(135deg, #ecfeff, #ffffff 46%, #dbeafe);
          --tlf-accent: #0891b2;
          --tlf-accent-text: #ecfeff;
          --tlf-orb: rgba(6, 182, 212, .23);
          --tlf-card: rgba(255, 255, 255, .84);
          --tlf-card-line: rgba(15, 23, 42, .08);
          --tlf-ink: #111827;
          --tlf-muted: #64748b;
          --tlf-media-radius: 26px 80px 26px 80px;
          --tlf-font-display: 'Nunito', sans-serif;
          --tlf-font-body: 'Inter', sans-serif;
          position: relative;
          background: var(--tlf-bg);
          color: var(--tlf-ink);
          font-family: var(--tlf-font-body);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* Decorative orb */
        .tlf-insurance-orb {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: var(--tlf-orb);
          top: -120px;
          right: -140px;
          z-index: 0;
          pointer-events: none;
          filter: blur(60px);
        }

        .tlf-insurance-orb-secondary {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          background: rgba(6, 182, 212, .12);
          bottom: 200px;
          left: -100px;
          z-index: 0;
          pointer-events: none;
          filter: blur(50px);
        }

        /* Nav */
        .tlf-insurance-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 48px;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--tlf-card-line);
        }

        .tlf-insurance-nav-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .tlf-insurance-nav-logo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--tlf-accent);
          color: var(--tlf-accent-text);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--tlf-font-display);
          font-weight: 800;
          font-size: 20px;
          flex-shrink: 0;
        }

        .tlf-insurance-nav-name {
          font-family: var(--tlf-font-display);
          font-weight: 700;
          font-size: 18px;
          color: var(--tlf-ink);
        }

        .tlf-insurance-nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tlf-insurance-nav-links li {
          font-size: 14px;
          font-weight: 600;
          color: var(--tlf-muted);
          cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }

        .tlf-insurance-nav-links li:hover {
          color: var(--tlf-accent);
        }

        /* Hero */
        .tlf-insurance-hero {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          padding: 72px 48px 56px;
          align-items: center;
          max-width: 1280px;
          margin: 0 auto;
        }

        .tlf-insurance-hero-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tlf-insurance-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 4px;
        }

        .tlf-insurance-pill {
          background: rgba(8, 145, 178, .1);
          color: var(--tlf-accent);
          font-size: 12px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 999px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: var(--tlf-font-body);
        }

        .tlf-insurance-hero-heading {
          font-family: var(--tlf-font-display);
          font-size: 46px;
          font-weight: 900;
          line-height: 1.12;
          color: var(--tlf-ink);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tlf-insurance-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--tlf-accent);
          color: var(--tlf-accent-text);
          font-size: 16px;
          flex-shrink: 0;
        }

        .tlf-insurance-tagline {
          font-family: var(--tlf-font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--tlf-muted);
          margin: 0;
          line-height: 1.5;
        }

        .tlf-insurance-bio {
          font-size: 15px;
          line-height: 1.7;
          color: var(--tlf-muted);
          margin: 0;
          max-width: 520px;
        }

        .tlf-insurance-stats-bar {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-top: 4px;
          flex-wrap: wrap;
        }

        .tlf-insurance-stat {
          font-size: 13px;
          font-weight: 600;
          color: var(--tlf-ink);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tlf-insurance-stat-icon {
          color: var(--tlf-accent);
          font-size: 16px;
        }

        .tlf-insurance-hero-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 8px;
        }

        .tlf-insurance-btn-primary {
          padding: 14px 36px;
          border: none;
          border-radius: 14px;
          background: var(--tlf-accent);
          color: var(--tlf-accent-text);
          font-family: var(--tlf-font-display);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 18px rgba(8, 145, 178, .25);
        }

        .tlf-insurance-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(8, 145, 178, .35);
        }

        .tlf-insurance-btn-secondary {
          padding: 14px 28px;
          border: 2px solid var(--tlf-card-line);
          border-radius: 14px;
          background: var(--tlf-card);
          color: var(--tlf-ink);
          font-family: var(--tlf-font-display);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: border-color 0.2s;
          backdrop-filter: blur(8px);
        }

        .tlf-insurance-btn-secondary:hover {
          border-color: var(--tlf-accent);
        }

        /* Hero media */
        .tlf-insurance-hero-right {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .tlf-insurance-media-card {
          position: relative;
          border-radius: var(--tlf-media-radius);
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, .1);
          width: 100%;
          max-width: 520px;
          aspect-ratio: 4 / 5;
        }

        .tlf-insurance-media-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .tlf-insurance-media-overlay {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(0, 0, 0, .52);
          backdrop-filter: blur(14px);
          color: #fff;
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* Content grid */
        .tlf-insurance-content {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 0 48px 56px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .tlf-insurance-panel {
          background: var(--tlf-card);
          border: 1px solid var(--tlf-card-line);
          border-radius: 22px;
          padding: 36px;
          backdrop-filter: blur(10px);
        }

        .tlf-insurance-panel-title {
          font-family: var(--tlf-font-display);
          font-size: 20px;
          font-weight: 800;
          color: var(--tlf-ink);
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tlf-insurance-panel-title-icon {
          color: var(--tlf-accent);
          font-size: 22px;
        }

        .tlf-insurance-credential-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tlf-insurance-credential-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--tlf-ink);
        }

        .tlf-insurance-credential-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--tlf-accent);
          flex-shrink: 0;
          margin-top: 7px;
        }

        .tlf-insurance-service-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .tlf-insurance-service-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          line-height: 1.6;
          color: var(--tlf-ink);
        }

        .tlf-insurance-service-marker {
          color: var(--tlf-accent);
          font-weight: 800;
          font-size: 18px;
          flex-shrink: 0;
          font-family: var(--tlf-font-display);
          line-height: 1.3;
        }

        /* Info row */
        .tlf-insurance-info-row {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 48px 56px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .tlf-insurance-info-card {
          background: var(--tlf-card);
          border: 1px solid var(--tlf-card-line);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .tlf-insurance-info-card-icon {
          font-size: 28px;
          margin-bottom: 10px;
          display: block;
          color: var(--tlf-accent);
        }

        .tlf-insurance-info-card-label {
          font-family: var(--tlf-font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--tlf-ink);
          margin: 0 0 6px 0;
        }

        .tlf-insurance-info-card-value {
          font-size: 13px;
          color: var(--tlf-muted);
          line-height: 1.5;
          margin: 0;
        }

        /* Gallery */
        .tlf-insurance-gallery {
          position: relative;
          z-index: 5;
          padding: 0 48px 72px;
          max-width: 1280px;
          margin: 0 auto;
        }

        .tlf-insurance-gallery-title {
          font-family: var(--tlf-font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--tlf-ink);
          margin: 0 0 28px 0;
          text-align: center;
        }

        .tlf-insurance-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .tlf-insurance-gallery-item {
          border-radius: var(--tlf-media-radius);
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4 / 3;
          transition: transform 0.22s, box-shadow 0.22s;
          box-shadow: 0 4px 16px rgba(0, 0, 0, .06);
        }

        .tlf-insurance-gallery-item:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 12px 32px rgba(0, 0, 0, .12);
        }

        .tlf-insurance-gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Responsive 980px */
        @media (max-width: 980px) {
          .tlf-insurance-hero {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 48px 28px 40px;
          }

          .tlf-insurance-hero-right {
            order: -1;
          }

          .tlf-insurance-media-card {
            max-width: 420px;
          }

          .tlf-insurance-hero-heading {
            font-size: 36px;
          }

          .tlf-insurance-content {
            grid-template-columns: 1fr;
            padding: 0 28px 40px;
          }

          .tlf-insurance-info-row {
            grid-template-columns: 1fr;
            padding: 0 28px 40px;
          }

          .tlf-insurance-gallery {
            padding: 0 28px 56px;
          }

          .tlf-insurance-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .tlf-insurance-nav {
            padding: 16px 28px;
          }
        }

        /* Responsive 620px */
        @media (max-width: 620px) {
          .tlf-insurance-hero {
            padding: 36px 18px 28px;
            gap: 28px;
          }

          .tlf-insurance-hero-heading {
            font-size: 28px;
          }

          .tlf-insurance-tagline {
            font-size: 17px;
          }

          .tlf-insurance-media-card {
            max-width: 100%;
          }

          .tlf-insurance-hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .tlf-insurance-btn-primary,
          .tlf-insurance-btn-secondary {
            text-align: center;
          }

          .tlf-insurance-content {
            padding: 0 18px 32px;
          }

          .tlf-insurance-info-row {
            padding: 0 18px 32px;
          }

          .tlf-insurance-gallery {
            padding: 0 18px 48px;
          }

          .tlf-insurance-gallery-grid {
            grid-template-columns: 1fr;
          }

          .tlf-insurance-nav {
            padding: 14px 18px;
            gap: 12px;
          }

          .tlf-insurance-nav-links {
            gap: 18px;
          }

          .tlf-insurance-nav-links li {
            font-size: 13px;
          }

          .tlf-insurance-pills {
            gap: 6px;
          }

          .tlf-insurance-stats-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .tlf-insurance-orb {
            width: 300px;
            height: 300px;
            top: -60px;
            right: -80px;
          }
        }
      `}</style>

      <div className="tlf-insurance-wrapper">
        {/* Decorative orbs */}
        <div className="tlf-insurance-orb" />
        <div className="tlf-insurance-orb-secondary" />

        {/* Nav bar */}
        <nav className="tlf-insurance-nav">
          <div className="tlf-insurance-nav-brand">
            <div className="tlf-insurance-nav-logo">
              {name.charAt(0).toUpperCase()}
            </div>
            <span className="tlf-insurance-nav-name">{name}</span>
          </div>
          <ul className="tlf-insurance-nav-links">
            <li>Portfolio</li>
            <li>Credentials</li>
            <li>Hire</li>
          </ul>
        </nav>

        {/* Hero section */}
        <section className="tlf-insurance-hero">
          <div className="tlf-insurance-hero-left">
            <div className="tlf-insurance-pills">
              {specialties.slice(0, 4).map((s) => (
                <span key={s} className="tlf-insurance-pill">{s}</span>
              ))}
            </div>

            <h2 className="tlf-insurance-hero-heading">
              {name}
              {verified && (
                <span className="tlf-insurance-verified" title="Verified">&#10003;</span>
              )}
            </h2>

            <p className="tlf-insurance-tagline">{tagline}</p>
            <p className="tlf-insurance-bio">{bio}</p>

            <div className="tlf-insurance-stats-bar">
              <span className="tlf-insurance-stat">
                <span className="tlf-insurance-stat-icon">&#9678;</span>
                {serviceArea}
              </span>
              {priceLabel && (
                <span className="tlf-insurance-stat">
                  <span className="tlf-insurance-stat-icon">&#9830;</span>
                  {priceLabel}
                </span>
              )}
            </div>

            <div className="tlf-insurance-hero-actions">
              <button className="tlf-insurance-btn-primary" onClick={onHire}>
                Hire Me
              </button>
              <button className="tlf-insurance-btn-secondary">
                View Portfolio
              </button>
            </div>
          </div>

          <div className="tlf-insurance-hero-right">
            {heroPhoto && (
              <div className="tlf-insurance-media-card">
                <img
                  src={heroPhoto.url}
                  alt={heroPhoto.filename}
                  loading="eager"
                />
                <div className="tlf-insurance-media-overlay">
                  Featured &middot; Legal &amp; Insurance Photography
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Main content grid */}
        <section className="tlf-insurance-content">
          <div className="tlf-insurance-panel">
            <h3 className="tlf-insurance-panel-title">
              <span className="tlf-insurance-panel-title-icon">&#9881;</span>
              Credentials &amp; Experience
            </h3>
            <ul className="tlf-insurance-credential-list">
              <li className="tlf-insurance-credential-item">
                <span className="tlf-insurance-credential-bullet" />
                Certified professional photographer with legal industry specialization
              </li>
              <li className="tlf-insurance-credential-item">
                <span className="tlf-insurance-credential-bullet" />
                Fully insured and bonded for on-site corporate assignments
              </li>
              <li className="tlf-insurance-credential-item">
                <span className="tlf-insurance-credential-bullet" />
                NDA-compliant workflow for sensitive documentation
              </li>
              <li className="tlf-insurance-credential-item">
                <span className="tlf-insurance-credential-bullet" />
                Experience with litigation support and evidence photography
              </li>
              <li className="tlf-insurance-credential-item">
                <span className="tlf-insurance-credential-bullet" />
                Trusted by law firms, insurance carriers, and financial institutions
              </li>
            </ul>
          </div>

          <div className="tlf-insurance-panel">
            <h3 className="tlf-insurance-panel-title">
              <span className="tlf-insurance-panel-title-icon">&#9733;</span>
              Specialties &amp; Services
            </h3>
            <ul className="tlf-insurance-service-list">
              {specialties.map((s) => (
                <li key={s} className="tlf-insurance-service-item">
                  <span className="tlf-insurance-service-marker">&sect;</span>
                  {s}
                </li>
              ))}
              <li className="tlf-insurance-service-item">
                <span className="tlf-insurance-service-marker">&sect;</span>
                On-location and studio corporate headshots
              </li>
              <li className="tlf-insurance-service-item">
                <span className="tlf-insurance-service-marker">&sect;</span>
                Insurance claim documentation photography
              </li>
            </ul>
          </div>
        </section>

        {/* Info row */}
        <section className="tlf-insurance-info-row">
          <div className="tlf-insurance-info-card">
            <span className="tlf-insurance-info-card-icon">&#128196;</span>
            <h4 className="tlf-insurance-info-card-label">Licensed &amp; Insured</h4>
            <p className="tlf-insurance-info-card-value">
              Full professional liability coverage for every assignment
            </p>
          </div>
          <div className="tlf-insurance-info-card">
            <span className="tlf-insurance-info-card-icon">&#128274;</span>
            <h4 className="tlf-insurance-info-card-label">Confidential Process</h4>
            <p className="tlf-insurance-info-card-value">
              Secure file handling, NDA-ready, and HIPAA-aware workflows
            </p>
          </div>
          <div className="tlf-insurance-info-card">
            <span className="tlf-insurance-info-card-icon">&#9202;</span>
            <h4 className="tlf-insurance-info-card-label">Fast Turnaround</h4>
            <p className="tlf-insurance-info-card-value">
              Expedited delivery available for time-sensitive legal matters
            </p>
          </div>
        </section>

        {/* Gallery */}
        {galleryPhotos.length > 0 && (
          <section className="tlf-insurance-gallery">
            <h3 className="tlf-insurance-gallery-title">Portfolio</h3>
            <div className="tlf-insurance-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-insurance-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onPhotoClick(i + 1);
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
