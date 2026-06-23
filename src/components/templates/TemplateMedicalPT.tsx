import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalPT(props: TemplateProps) {
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
    const id = "font-medical-pt";
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

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════
           TemplateMedicalPT — Dark PT Theme
           ══════════════════════════════════════ */

        .tmd-pt-root {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background: radial-gradient(circle at 15% 20%,rgba(34,197,94,.2),transparent 26%),linear-gradient(135deg,#07140d,#10251a 52%,#0f172a);
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }

        /* ── Decorative orb ── */
        .tmd-pt-orb {
          position: fixed;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: rgba(34,197,94,.2);
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
          top: -80px;
          right: -100px;
        }

        /* ── Content layer ── */
        .tmd-pt-content {
          position: relative;
          z-index: 1;
        }

        /* ══════════════════
           NAV BAR
           ══════════════════ */
        .tmd-pt-nav {
          display: flex;
          align-items: center;
          padding: 18px 48px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          gap: 16px;
        }
        .tmd-pt-nav-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #22c55e;
          color: #052e16;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 16px;
          flex-shrink: 0;
        }
        .tmd-pt-nav-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #fff;
          letter-spacing: 0.02em;
          margin-right: auto;
        }
        .tmd-pt-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .tmd-pt-nav-link {
          font-size: 13px;
          font-weight: 600;
          color: #d1fae5;
          text-decoration: none;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color 0.25s;
          background: none;
          border: none;
          padding: 0;
          font-family: inherit;
        }
        .tmd-pt-nav-link:hover {
          color: #22c55e;
        }
        .tmd-pt-nav-hire {
          font-size: 13px;
          font-weight: 700;
          color: #052e16;
          background: #22c55e;
          border: none;
          padding: 8px 22px;
          border-radius: 8px;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: 0.04em;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
        }
        .tmd-pt-nav-hire:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(34,197,94,.35);
        }

        /* ══════════════════
           HERO SECTION
           ══════════════════ */
        .tmd-pt-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding: 72px 48px 64px;
          align-items: center;
        }

        /* ── Pills row ── */
        .tmd-pt-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .tmd-pt-pill {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.16);
          color: #d1fae5;
        }

        /* ── Heading ── */
        .tmd-pt-hero-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(36px, 5vw, 56px);
          line-height: 1.05;
          color: #fff;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }
        .tmd-pt-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #22c55e;
          color: #052e16;
          font-size: 14px;
          font-weight: 700;
          margin-left: 10px;
          vertical-align: middle;
        }

        /* ── Tagline ── */
        .tmd-pt-tagline {
          font-size: 17px;
          font-weight: 600;
          color: #d1fae5;
          margin: 0 0 14px 0;
          line-height: 1.5;
        }

        /* ── Bio ── */
        .tmd-pt-bio {
          font-size: 14px;
          color: #d1fae5;
          line-height: 1.75;
          margin: 0 0 24px 0;
          max-width: 520px;
          opacity: 0.85;
        }

        /* ── Stat bar ── */
        .tmd-pt-statbar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          font-size: 13px;
          color: #d1fae5;
          opacity: 0.8;
        }
        .tmd-pt-statbar-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,.08);
          font-size: 13px;
        }
        .tmd-pt-statbar-text {
          font-weight: 600;
        }

        /* ── Hire button ── */
        .tmd-pt-hire-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          height: 52px;
          padding: 0 32px;
          background: #22c55e;
          color: #052e16;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.03em;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s, box-shadow 0.3s;
        }
        .tmd-pt-hire-btn:hover {
          background: #16a34a;
          transform: translateY(-2px);
          box-shadow: 0 6px 28px rgba(34,197,94,.4);
        }

        /* ── Hero photo ── */
        .tmd-pt-hero-photo {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4 / 5;
          max-height: 560px;
          box-shadow: 0 8px 40px rgba(0,0,0,.4);
        }
        .tmd-pt-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1), filter 0.4s;
        }
        .tmd-pt-hero-photo:hover img {
          transform: scale(1.04);
          filter: brightness(1.08);
        }
        .tmd-pt-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(7,20,13,.6) 100%);
          pointer-events: none;
        }

        /* ══════════════════
           TWO-PANEL SECTION
           ══════════════════ */
        .tmd-pt-panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          padding: 0 48px 56px;
        }
        .tmd-pt-panel {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 16px;
          padding: 36px 32px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .tmd-pt-panel:hover {
          border-color: rgba(34,197,94,.35);
          transform: translateY(-2px);
        }
        .tmd-pt-panel-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #22c55e;
          margin-bottom: 12px;
        }
        .tmd-pt-panel-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 22px;
          color: #fff;
          margin: 0 0 12px 0;
        }
        .tmd-pt-panel-body {
          font-size: 14px;
          color: #d1fae5;
          line-height: 1.7;
          margin: 0;
          opacity: 0.8;
        }
        .tmd-pt-panel-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .tmd-pt-stat-item {
          text-align: center;
        }
        .tmd-pt-stat-value {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 28px;
          color: #22c55e;
          display: block;
        }
        .tmd-pt-stat-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #d1fae5;
          opacity: 0.7;
          margin-top: 4px;
          display: block;
        }

        /* ══════════════════
           INFO ROW (3 cards)
           ══════════════════ */
        .tmd-pt-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 48px 64px;
        }
        .tmd-pt-info-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 14px;
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .tmd-pt-info-card:hover {
          border-color: rgba(34,197,94,.3);
          transform: translateY(-2px);
        }
        .tmd-pt-info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(34,197,94,.15);
          color: #22c55e;
          font-size: 18px;
          margin-bottom: 14px;
        }
        .tmd-pt-info-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          margin-bottom: 6px;
        }
        .tmd-pt-info-text {
          font-size: 13px;
          color: #d1fae5;
          line-height: 1.6;
          opacity: 0.8;
        }

        /* ══════════════════
           GALLERY SECTION
           ══════════════════ */
        .tmd-pt-gallery {
          padding: 0 48px 80px;
        }
        .tmd-pt-gallery-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .tmd-pt-gallery-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 26px;
          color: #fff;
          margin: 0;
        }
        .tmd-pt-gallery-count {
          font-size: 13px;
          color: #d1fae5;
          opacity: 0.6;
        }
        .tmd-pt-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .tmd-pt-gallery-cell {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 4 / 3;
          background: rgba(255,255,255,.04);
        }
        .tmd-pt-gallery-cell img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.2,0.7,0.2,1), filter 0.35s;
        }
        .tmd-pt-gallery-cell:hover img {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        .tmd-pt-gallery-hover {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(7,20,13,.55) 100%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
        }
        .tmd-pt-gallery-cell:hover .tmd-pt-gallery-hover {
          opacity: 1;
        }
        .tmd-pt-gallery-idx {
          position: absolute;
          bottom: 10px;
          left: 14px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 12px;
          color: rgba(255,255,255,.7);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s;
        }
        .tmd-pt-gallery-cell:hover .tmd-pt-gallery-idx {
          opacity: 1;
        }

        /* ══════════════════
           RESPONSIVE: 980px
           ══════════════════ */
        @media (max-width: 980px) {
          .tmd-pt-hero {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 48px 36px 48px;
          }
          .tmd-pt-hero-photo {
            max-height: 420px;
            aspect-ratio: 16 / 10;
          }
          .tmd-pt-panels {
            grid-template-columns: 1fr;
            padding: 0 36px 48px;
          }
          .tmd-pt-info-row {
            grid-template-columns: 1fr;
            padding: 0 36px 48px;
          }
          .tmd-pt-gallery {
            padding: 0 36px 64px;
          }
          .tmd-pt-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .tmd-pt-nav {
            padding: 16px 28px;
          }
        }

        /* ══════════════════
           RESPONSIVE: 620px
           ══════════════════ */
        @media (max-width: 620px) {
          .tmd-pt-nav {
            padding: 14px 20px;
            gap: 10px;
            flex-wrap: wrap;
          }
          .tmd-pt-nav-links {
            gap: 16px;
          }
          .tmd-pt-nav-link {
            font-size: 12px;
          }
          .tmd-pt-hero {
            padding: 32px 20px 36px;
            gap: 28px;
          }
          .tmd-pt-hero-heading {
            font-size: clamp(28px, 8vw, 40px);
          }
          .tmd-pt-hero-photo {
            max-height: 320px;
            aspect-ratio: 3 / 2;
          }
          .tmd-pt-panels {
            padding: 0 20px 36px;
            gap: 16px;
          }
          .tmd-pt-panel {
            padding: 24px 20px;
          }
          .tmd-pt-panel-stats {
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .tmd-pt-info-row {
            padding: 0 20px 40px;
            gap: 14px;
          }
          .tmd-pt-info-card {
            padding: 22px 18px;
          }
          .tmd-pt-gallery {
            padding: 0 20px 48px;
          }
          .tmd-pt-gallery-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .tmd-pt-gallery-cell {
            aspect-ratio: 16 / 10;
          }
          .tmd-pt-hire-btn {
            width: 100%;
            justify-content: center;
          }
          .tmd-pt-orb {
            display: none;
          }
        }
      `}</style>

      <div className="tmd-pt-root">
        <div className="tmd-pt-orb" />

        <div className="tmd-pt-content">
          {/* ── Nav Bar ── */}
          <nav className="tmd-pt-nav">
            <div className="tmd-pt-nav-logo">{name.charAt(0).toUpperCase()}</div>
            <span className="tmd-pt-nav-name">{name}</span>
            <div className="tmd-pt-nav-links">
              <a className="tmd-pt-nav-link" href="#tmd-pt-gallery">Portfolio</a>
              <a className="tmd-pt-nav-link" href="#tmd-pt-about">About</a>
              <button className="tmd-pt-nav-hire" onClick={onHire}>Hire</button>
            </div>
          </nav>

          {/* ── Hero Section ── */}
          <section className="tmd-pt-hero" id="tmd-pt-about">
            <div>
              {/* Specialty pills */}
              {specialties.length > 0 && (
                <div className="tmd-pt-pills">
                  {specialties.map((s) => (
                    <span key={s} className="tmd-pt-pill">{s}</span>
                  ))}
                </div>
              )}

              {/* Name + verified badge */}
              <h2 className="tmd-pt-hero-heading">
                {name}
                {verified && <span className="tmd-pt-verified">&#10003;</span>}
              </h2>

              {/* Tagline */}
              {tagline && <p className="tmd-pt-tagline">{tagline}</p>}

              {/* Bio */}
              {bio && <p className="tmd-pt-bio">{bio}</p>}

              {/* Stat bar — service area */}
              {serviceArea && (
                <div className="tmd-pt-statbar">
                  <span className="tmd-pt-statbar-icon">&#9678;</span>
                  <span className="tmd-pt-statbar-text">{serviceArea}</span>
                </div>
              )}

              {/* Hire button + price */}
              <div>
                <button className="tmd-pt-hire-btn" onClick={onHire}>
                  Book a Session
                  {priceLabel && <span>&nbsp;&mdash;&nbsp;{priceLabel}</span>}
                </button>
              </div>
            </div>

            {/* Hero photo */}
            {heroPhoto && (
              <div className="tmd-pt-hero-photo" onClick={() => onPhotoClick(0)}>
                <img
                  src={heroPhoto.url}
                  alt={heroPhoto.filename || "Featured photo"}
                />
                <div className="tmd-pt-hero-overlay" />
              </div>
            )}
          </section>

          {/* ── Two-Panel Section ── */}
          <section className="tmd-pt-panels">
            {/* Our Approach card */}
            <div className="tmd-pt-panel">
              <div className="tmd-pt-panel-label">Our Approach</div>
              <h3 className="tmd-pt-panel-title">Precision Medical Photography</h3>
              <p className="tmd-pt-panel-body">
                Every session is carefully planned to capture the professionalism
                and compassion of physical therapy practices. From clinical
                environments to patient interactions, we deliver imagery that
                builds trust and elevates your brand.
              </p>
            </div>

            {/* Quick Stats card */}
            <div className="tmd-pt-panel">
              <div className="tmd-pt-panel-label">Quick Stats</div>
              <h3 className="tmd-pt-panel-title">At a Glance</h3>
              <div className="tmd-pt-panel-stats">
                <div className="tmd-pt-stat-item">
                  <span className="tmd-pt-stat-value">{portfolio.length}</span>
                  <span className="tmd-pt-stat-label">Photos</span>
                </div>
                <div className="tmd-pt-stat-item">
                  <span className="tmd-pt-stat-value">{specialties.length}</span>
                  <span className="tmd-pt-stat-label">Specialties</span>
                </div>
                <div className="tmd-pt-stat-item">
                  <span className="tmd-pt-stat-value">
                    {serviceArea ? serviceArea.split(",").length : 1}
                  </span>
                  <span className="tmd-pt-stat-label">Regions</span>
                </div>
                <div className="tmd-pt-stat-item">
                  <span className="tmd-pt-stat-value">
                    {verified ? "Yes" : "No"}
                  </span>
                  <span className="tmd-pt-stat-label">Verified</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Info Row (3 cards) ── */}
          <section className="tmd-pt-info-row">
            {/* Card 1: Service Area */}
            <div className="tmd-pt-info-card">
              <div className="tmd-pt-info-icon">&#9906;</div>
              <div className="tmd-pt-info-title">Service Area</div>
              <div className="tmd-pt-info-text">
                {serviceArea || "Available on request"}
              </div>
            </div>

            {/* Card 2: Specialties summary */}
            <div className="tmd-pt-info-card">
              <div className="tmd-pt-info-icon">&#10023;</div>
              <div className="tmd-pt-info-title">Specialties</div>
              <div className="tmd-pt-info-text">
                {specialties.length > 0
                  ? specialties.slice(0, 4).join(", ")
                  : "Medical & PT Photography"}
              </div>
            </div>

            {/* Card 3: Quote from tagline */}
            <div className="tmd-pt-info-card">
              <div className="tmd-pt-info-icon">&#10077;</div>
              <div className="tmd-pt-info-title">Philosophy</div>
              <div className="tmd-pt-info-text">
                {tagline || "Capturing the art of healing through a professional lens."}
              </div>
            </div>
          </section>

          {/* ── Gallery Section ── */}
          {galleryPhotos.length > 0 && (
            <section className="tmd-pt-gallery" id="tmd-pt-gallery">
              <div className="tmd-pt-gallery-header">
                <h3 className="tmd-pt-gallery-title">Portfolio</h3>
                <span className="tmd-pt-gallery-count">
                  {galleryPhotos.length} photo{galleryPhotos.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="tmd-pt-gallery-grid">
                {galleryPhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="tmd-pt-gallery-cell"
                    onClick={() => onPhotoClick(i + 1)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.filename || `Photo ${i + 2}`}
                      loading="lazy"
                    />
                    <div className="tmd-pt-gallery-hover" />
                    <span className="tmd-pt-gallery-idx">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
