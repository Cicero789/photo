import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalTherapy(props: TemplateProps) {
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
    const id = "font-medical-therapy";
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

  return (
    <>
      <style>{`
        /* ===== Root ===== */
        .tmd-therapy {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #fff7ed, #fffaf5 46%, #fde68a);
          font-family: 'Inter', sans-serif;
          color: #111827;
          overflow-x: hidden;
        }

        /* Decorative orbs */
        .tmd-therapy::before,
        .tmd-therapy::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        .tmd-therapy::before {
          width: 420px;
          height: 420px;
          background: rgba(245, 158, 11, .23);
          top: -120px;
          right: -80px;
          filter: blur(80px);
        }
        .tmd-therapy::after {
          width: 340px;
          height: 340px;
          background: rgba(245, 158, 11, .23);
          bottom: 10%;
          left: -100px;
          filter: blur(70px);
        }

        /* ===== Nav Bar ===== */
        .tmd-therapy-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 5vw;
          position: relative;
          z-index: 2;
        }
        .tmd-therapy-logo {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #d97706;
          color: #fff7ed;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tmd-therapy-nav-name {
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          font-size: 17px;
          color: #111827;
          margin-right: auto;
        }
        .tmd-therapy-nav-links {
          display: flex;
          gap: 28px;
          align-items: center;
        }
        .tmd-therapy-nav-link {
          background: none;
          border: none;
          font: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .tmd-therapy-nav-link:hover {
          color: #d97706;
        }
        .tmd-therapy-nav-link--cta {
          background: #d97706;
          color: #fff7ed;
          padding: 8px 22px;
          border-radius: 24px;
          transition: background 0.2s, transform 0.15s;
        }
        .tmd-therapy-nav-link--cta:hover {
          background: #b45309;
          color: #fff7ed;
          transform: translateY(-1px);
        }

        /* ===== Hero Section ===== */
        .tmd-therapy-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          padding: 32px 5vw 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* Specialty Pills */
        .tmd-therapy-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }
        .tmd-therapy-pill {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 20px;
          background: rgba(217, 119, 6, .12);
          color: #d97706;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* Hero Heading */
        .tmd-therapy-hero h2 {
          margin: 0 0 12px;
          font-family: 'Libre Baskerville', serif;
          font-size: clamp(30px, 4.2vw, 52px);
          font-weight: 700;
          line-height: 1.15;
          color: #111827;
          letter-spacing: -0.02em;
        }
        .tmd-therapy-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #d97706;
          color: #fff7ed;
          font-size: 13px;
          margin-left: 10px;
          vertical-align: middle;
          font-style: normal;
        }

        /* Hero Text */
        .tmd-therapy-tagline {
          margin: 0 0 16px;
          font-size: 17px;
          line-height: 1.6;
          color: #64748b;
          max-width: 520px;
        }
        .tmd-therapy-bio {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #64748b;
          max-width: 520px;
        }

        /* Stat Bar */
        .tmd-therapy-stat-bar {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 28px;
          padding: 14px 20px;
          background: rgba(255, 255, 255, .8);
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 14px;
          max-width: 480px;
        }
        .tmd-therapy-stat {
          text-align: center;
        }
        .tmd-therapy-stat-val {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          font-family: 'Libre Baskerville', serif;
        }
        .tmd-therapy-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .tmd-therapy-stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(15, 23, 42, .08);
        }

        /* Hire Button */
        .tmd-therapy-hire-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .tmd-therapy-hire-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 36px;
          font: inherit;
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 28px;
          background: #d97706;
          color: #fff7ed;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(217, 119, 6, .25);
        }
        .tmd-therapy-hire-btn:hover {
          background: #b45309;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(217, 119, 6, .32);
        }
        .tmd-therapy-price-tag {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        /* Hero Photo */
        .tmd-therapy-hero-photo {
          position: relative;
          border-radius: 28px 90px 28px 90px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          max-height: 520px;
          box-shadow: 0 24px 64px rgba(217, 119, 6, .14);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tmd-therapy-hero-photo:hover {
          transform: scale(1.015);
        }
        .tmd-therapy-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* ===== Two-Panel Section ===== */
        .tmd-therapy-panels {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding: 0 5vw 56px;
          position: relative;
          z-index: 1;
        }
        .tmd-therapy-panel {
          background: rgba(255, 255, 255, .8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 20px;
          padding: 32px 28px;
        }
        .tmd-therapy-panel h3 {
          margin: 0 0 12px;
          font-family: 'Libre Baskerville', serif;
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }
        .tmd-therapy-panel p {
          margin: 0;
          font-size: 14px;
          line-height: 1.75;
          color: #64748b;
        }

        /* At a Glance list */
        .tmd-therapy-glance-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tmd-therapy-glance-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #111827;
          font-weight: 500;
        }
        .tmd-therapy-glance-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(217, 119, 6, .12);
          color: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .tmd-therapy-glance-detail {
          font-size: 12px;
          color: #64748b;
          font-weight: 400;
        }

        /* ===== Info Row (3 cards) ===== */
        .tmd-therapy-info-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 0 5vw 56px;
          position: relative;
          z-index: 1;
        }
        .tmd-therapy-info-card {
          background: rgba(255, 255, 255, .8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(15, 23, 42, .08);
          border-radius: 18px;
          padding: 26px 22px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .tmd-therapy-info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(217, 119, 6, .1);
        }
        .tmd-therapy-info-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(217, 119, 6, .12);
          color: #d97706;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 14px;
        }
        .tmd-therapy-info-card h4 {
          margin: 0 0 8px;
          font-family: 'Libre Baskerville', serif;
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }
        .tmd-therapy-info-card p {
          margin: 0;
          font-size: 13px;
          line-height: 1.65;
          color: #64748b;
        }

        /* ===== Gallery Section ===== */
        .tmd-therapy-gallery-section {
          padding: 0 5vw 72px;
          position: relative;
          z-index: 1;
        }
        .tmd-therapy-gallery-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .tmd-therapy-gallery-header h3 {
          margin: 0 0 6px;
          font-family: 'Libre Baskerville', serif;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }
        .tmd-therapy-gallery-header p {
          margin: 0;
          font-size: 14px;
          color: #64748b;
        }
        .tmd-therapy-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .tmd-therapy-gallery-item {
          position: relative;
          border-radius: 28px 90px 28px 90px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(217, 119, 6, .08);
          transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.3s;
        }
        .tmd-therapy-gallery-item:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 16px 40px rgba(217, 119, 6, .16);
        }
        .tmd-therapy-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tmd-therapy-gallery-item:hover img {
          transform: scale(1.06);
        }

        /* ===== Footer ===== */
        .tmd-therapy-footer {
          text-align: center;
          padding: 28px 5vw 36px;
          font-size: 12px;
          color: #64748b;
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(15, 23, 42, .08);
        }

        /* ===== Responsive: 980px ===== */
        @media (max-width: 980px) {
          .tmd-therapy-hero {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 24px 5vw 40px;
          }
          .tmd-therapy-hero-photo {
            max-height: 400px;
            max-width: 480px;
            margin: 0 auto;
          }
          .tmd-therapy-panels {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .tmd-therapy-info-row {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .tmd-therapy-gallery {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .tmd-therapy-stat-bar {
            max-width: 100%;
          }
        }

        /* ===== Responsive: 620px ===== */
        @media (max-width: 620px) {
          .tmd-therapy-nav {
            padding: 14px 4vw;
            gap: 10px;
          }
          .tmd-therapy-nav-links {
            gap: 14px;
          }
          .tmd-therapy-nav-link {
            font-size: 13px;
          }
          .tmd-therapy-hero {
            padding: 16px 4vw 32px;
            gap: 28px;
          }
          .tmd-therapy-hero h2 {
            font-size: 26px;
          }
          .tmd-therapy-stat-bar {
            flex-wrap: wrap;
            gap: 16px;
            padding: 12px 16px;
          }
          .tmd-therapy-stat-divider {
            display: none;
          }
          .tmd-therapy-hero-photo {
            max-height: 340px;
          }
          .tmd-therapy-panels {
            padding: 0 4vw 40px;
          }
          .tmd-therapy-info-row {
            padding: 0 4vw 40px;
          }
          .tmd-therapy-gallery-section {
            padding: 0 4vw 48px;
          }
          .tmd-therapy-gallery {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .tmd-therapy-gallery-item {
            max-width: 400px;
            margin: 0 auto;
            width: 100%;
          }
          .tmd-therapy-hire-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .tmd-therapy-hire-btn {
            width: 100%;
          }
        }
      `}</style>

      <section className="tmd-therapy">
        {/* ===== Nav Bar ===== */}
        <nav className="tmd-therapy-nav">
          <div className="tmd-therapy-logo">{name.charAt(0)}</div>
          <span className="tmd-therapy-nav-name">{name}</span>
          <div className="tmd-therapy-nav-links">
            <button className="tmd-therapy-nav-link" type="button">
              Portfolio
            </button>
            <button className="tmd-therapy-nav-link" type="button">
              About
            </button>
            <button
              className="tmd-therapy-nav-link tmd-therapy-nav-link--cta"
              type="button"
              onClick={onHire}
            >
              Hire
            </button>
          </div>
        </nav>

        {/* ===== Hero Section ===== */}
        <div className="tmd-therapy-hero">
          {/* Left Column */}
          <div>
            {/* Specialty Pills */}
            <div className="tmd-therapy-pills">
              {specialties.length > 0
                ? specialties.map((s, i) => (
                    <span key={i} className="tmd-therapy-pill">
                      {s}
                    </span>
                  ))
                : (
                    <>
                      <span className="tmd-therapy-pill">Therapy</span>
                      <span className="tmd-therapy-pill">Wellness</span>
                      <span className="tmd-therapy-pill">Healing</span>
                    </>
                  )}
            </div>

            {/* Heading */}
            <h2>
              {name}
              {verified && (
                <span className="tmd-therapy-verified">&#10003;</span>
              )}
            </h2>

            {/* Tagline & Bio */}
            <p className="tmd-therapy-tagline">{tagline}</p>
            <p className="tmd-therapy-bio">{bio}</p>

            {/* Stat Bar */}
            <div className="tmd-therapy-stat-bar">
              <div className="tmd-therapy-stat">
                <div className="tmd-therapy-stat-val">
                  &#128205;
                </div>
                <div className="tmd-therapy-stat-label">
                  {serviceArea || "Local"}
                </div>
              </div>
              <div className="tmd-therapy-stat-divider" />
              <div className="tmd-therapy-stat">
                <div className="tmd-therapy-stat-val">
                  {specialties.length || 3}
                </div>
                <div className="tmd-therapy-stat-label">Specialties</div>
              </div>
              <div className="tmd-therapy-stat-divider" />
              <div className="tmd-therapy-stat">
                <div className="tmd-therapy-stat-val">
                  {portfolio.length}
                </div>
                <div className="tmd-therapy-stat-label">Photos</div>
              </div>
            </div>

            {/* Hire Button + Pricing */}
            <div className="tmd-therapy-hire-row">
              <button
                className="tmd-therapy-hire-btn"
                type="button"
                onClick={onHire}
              >
                Book a Session
              </button>
              {priceLabel && (
                <span className="tmd-therapy-price-tag">{priceLabel}</span>
              )}
            </div>
          </div>

          {/* Right Column — Hero Photo */}
          <div>
            {heroPhoto && (
              <div
                className="tmd-therapy-hero-photo"
                onClick={() => onPhotoClick(0)}
              >
                <img
                  src={heroPhoto.url}
                  alt={heroPhoto.filename}
                  loading="eager"
                />
              </div>
            )}
          </div>
        </div>

        {/* ===== Two-Panel Section ===== */}
        <div className="tmd-therapy-panels">
          <div className="tmd-therapy-panel">
            <h3>Our Practice</h3>
            <p>
              We specialize in capturing the heart of therapeutic and wellness
              environments. Every session is approached with empathy and
              artistry, helping practitioners connect with their communities
              through imagery that radiates warmth, trust, and professionalism.
            </p>
          </div>
          <div className="tmd-therapy-panel">
            <h3>At a Glance</h3>
            <ul className="tmd-therapy-glance-list">
              <li className="tmd-therapy-glance-item">
                <span className="tmd-therapy-glance-icon">&#9752;</span>
                <div>
                  Wellness-Focused
                  <div className="tmd-therapy-glance-detail">
                    Calm, healing-centered compositions
                  </div>
                </div>
              </li>
              <li className="tmd-therapy-glance-item">
                <span className="tmd-therapy-glance-icon">&#128247;</span>
                <div>
                  {portfolio.length} Portfolio Photos
                  <div className="tmd-therapy-glance-detail">
                    Curated therapy &amp; wellness imagery
                  </div>
                </div>
              </li>
              <li className="tmd-therapy-glance-item">
                <span className="tmd-therapy-glance-icon">&#128205;</span>
                <div>
                  {serviceArea || "Your Area"}
                  <div className="tmd-therapy-glance-detail">
                    On-location &amp; studio sessions
                  </div>
                </div>
              </li>
              {priceLabel && (
                <li className="tmd-therapy-glance-item">
                  <span className="tmd-therapy-glance-icon">&#128176;</span>
                  <div>
                    {priceLabel}
                    <div className="tmd-therapy-glance-detail">
                      Transparent, upfront pricing
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ===== Info Row (3 cards) ===== */}
        <div className="tmd-therapy-info-row">
          <div className="tmd-therapy-info-card">
            <div className="tmd-therapy-info-card-icon">&#127759;</div>
            <h4>Service Area</h4>
            <p>
              Based in {serviceArea || "your region"}, available for on-site
              sessions at clinics, wellness centers, and private practices.
            </p>
          </div>
          <div className="tmd-therapy-info-card">
            <div className="tmd-therapy-info-card-icon">&#10024;</div>
            <h4>Specialties</h4>
            <p>
              {specialties.length > 0
                ? specialties.join(", ")
                : "Therapy spaces, wellness portraits, healing environments, and practitioner branding."}
            </p>
          </div>
          <div className="tmd-therapy-info-card">
            <div className="tmd-therapy-info-card-icon">&#128156;</div>
            <h4>Our Approach</h4>
            <p>
              Every image is crafted with intentional warmth and sensitivity,
              ensuring your practice feels approachable and professional.
            </p>
          </div>
        </div>

        {/* ===== Gallery Section ===== */}
        {galleryPhotos.length > 0 && (
          <div className="tmd-therapy-gallery-section">
            <div className="tmd-therapy-gallery-header">
              <h3>Portfolio</h3>
              <p>A glimpse into our therapy and wellness photography</p>
            </div>
            <div className="tmd-therapy-gallery">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tmd-therapy-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Footer ===== */}
        <footer className="tmd-therapy-footer">
          &copy; {new Date().getFullYear()} {name} &middot; Therapy &amp;
          Wellness Photography
        </footer>
      </section>
    </>
  );
}
