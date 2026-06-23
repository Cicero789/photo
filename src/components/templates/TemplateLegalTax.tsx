// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalTax(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    website: _website,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  useEffect(() => {
    const id = "font-legal-tax";
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

  const credentials = [
    { label: "Licensed CPA", detail: "State-certified public accountant" },
    { label: "IRS Enrolled Agent", detail: "Federally authorized tax practitioner" },
    { label: "10+ Years", detail: "Serving individuals & businesses" },
    { label: "Audit Defense", detail: "Representation before IRS & state agencies" },
  ];

  const services = [
    "Individual Tax Preparation",
    "Business & Corporate Filing",
    "Tax Planning & Strategy",
    "IRS Audit Representation",
    "Bookkeeping & Payroll",
    "Estate & Trust Taxation",
  ];

  const infoCards = [
    { icon: "📋", title: "Compliance First", desc: "Every filing reviewed for accuracy and regulatory compliance before submission." },
    { icon: "🔒", title: "Secure & Confidential", desc: "Bank-level encryption and strict confidentiality for all client documents." },
    { icon: "⏱", title: "Timely Delivery", desc: "Meet every deadline with proactive scheduling and status updates." },
  ];

  const css = `
    .tlf-tax-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #fff7ed, #ffffff 48%, #fef3c7);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      position: relative;
      overflow-x: hidden;
    }

    /* ── Decorative Orb ── */
    .tlf-tax-orb {
      position: absolute;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: rgba(249,115,22,.22);
      filter: blur(100px);
      top: -120px;
      right: -160px;
      pointer-events: none;
      z-index: 0;
    }
    .tlf-tax-orb-2 {
      position: absolute;
      width: 380px;
      height: 380px;
      border-radius: 50%;
      background: rgba(249,115,22,.12);
      filter: blur(90px);
      bottom: 200px;
      left: -140px;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Nav ── */
    .tlf-tax-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 32px;
      border-bottom: 1px solid rgba(15,23,42,.08);
      position: relative;
      z-index: 2;
    }
    .tlf-tax-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      color: #111827;
    }
    .tlf-tax-brand-circle {
      width: 34px;
      height: 34px;
      background: #ea580c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      flex-shrink: 0;
    }
    .tlf-tax-nav-links {
      display: flex;
      gap: 26px;
      font-size: 0.84rem;
      font-weight: 600;
    }
    .tlf-tax-nav-links span {
      cursor: pointer;
      color: #111827;
      opacity: 0.65;
      transition: opacity 0.2s;
    }
    .tlf-tax-nav-links span:hover {
      opacity: 1;
    }

    /* ── Hero ── */
    .tlf-tax-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 52px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .tlf-tax-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tlf-tax-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .tlf-tax-pill {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      color: #ea580c;
      background: rgba(234,88,12,.09);
      padding: 4px 14px;
      border-radius: 20px;
    }
    .tlf-tax-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #111827;
      margin: 0 0 14px 0;
    }
    .tlf-tax-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #ea580c;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      color: #fff;
      font-size: 0.72rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .tlf-tax-tagline {
      font-size: 1.05rem;
      color: #64748b;
      line-height: 1.7;
      margin-bottom: 12px;
      max-width: 480px;
    }
    .tlf-tax-bio {
      font-size: 0.92rem;
      color: #64748b;
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 480px;
    }
    .tlf-tax-stats {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-bottom: 26px;
      font-size: 0.84rem;
      color: #64748b;
    }
    .tlf-tax-stat-sep {
      width: 1px;
      height: 16px;
      background: rgba(15,23,42,.15);
    }
    .tlf-tax-stat-accent {
      font-weight: 700;
      color: #ea580c;
    }
    .tlf-tax-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tlf-tax-btn-primary {
      display: inline-block;
      background: #ea580c;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 30px;
      border: 2px solid #ea580c;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tlf-tax-btn-primary:hover {
      background: transparent;
      color: #ea580c;
    }
    .tlf-tax-btn-secondary {
      display: inline-block;
      background: transparent;
      color: #111827;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 30px;
      border: 2px solid rgba(15,23,42,.18);
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tlf-tax-btn-secondary:hover {
      border-color: #111827;
    }

    /* Hero Card */
    .tlf-tax-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(17,24,39,.10);
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
    }
    .tlf-tax-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .tlf-tax-hero-overlay {
      position: absolute;
      bottom: 18px;
      left: 18px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(10px);
      padding: 12px 18px;
      border-radius: 10px;
      font-size: 0.8rem;
      color: #111827;
      max-width: 260px;
      line-height: 1.5;
      box-shadow: 0 4px 16px rgba(0,0,0,.07);
      font-style: italic;
    }

    /* ── Main Content Grid ── */
    .tlf-tax-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .tlf-tax-panel {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 32px 28px;
    }
    .tlf-tax-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 18px 0;
    }
    .tlf-tax-cred-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tlf-tax-cred-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: rgba(234,88,12,.04);
      border: 1px solid rgba(234,88,12,.10);
      border-radius: 10px;
      transition: box-shadow 0.2s;
    }
    .tlf-tax-cred-item:hover {
      box-shadow: 0 4px 16px rgba(234,88,12,.08);
    }
    .tlf-tax-cred-dot {
      width: 8px;
      height: 8px;
      background: #ea580c;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }
    .tlf-tax-cred-label {
      font-weight: 700;
      font-size: 0.88rem;
      color: #111827;
    }
    .tlf-tax-cred-detail {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 2px;
    }

    /* Services Panel */
    .tlf-tax-services-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tlf-tax-service-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(15,23,42,.06);
      transition: background 0.15s;
    }
    .tlf-tax-service-row:last-child {
      border-bottom: none;
    }
    .tlf-tax-service-row:hover {
      background: rgba(234,88,12,.03);
    }
    .tlf-tax-service-marker {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #ea580c;
      flex-shrink: 0;
    }
    .tlf-tax-service-name {
      font-size: 0.9rem;
      font-weight: 600;
      color: #111827;
    }

    /* ── Info Row ── */
    .tlf-tax-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .tlf-tax-info-card {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
      padding: 28px 24px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tlf-tax-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(17,24,39,.08);
    }
    .tlf-tax-info-icon {
      font-size: 1.8rem;
      margin-bottom: 12px;
    }
    .tlf-tax-info-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 8px;
    }
    .tlf-tax-info-desc {
      font-size: 0.84rem;
      color: #64748b;
      line-height: 1.6;
    }

    /* ── Gallery ── */
    .tlf-tax-gallery {
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .tlf-tax-gallery-heading {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 20px 0;
    }
    .tlf-tax-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .tlf-tax-gallery-img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      border: 1px solid rgba(15,23,42,.06);
    }
    .tlf-tax-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(17,24,39,.10);
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tlf-tax-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tlf-tax-content {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-tax-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-tax-gallery {
        padding: 0 24px 40px;
      }
      .tlf-tax-gallery-grid {
        grid-template-columns: 1fr 1fr;
      }
      .tlf-tax-hero-img {
        min-height: 320px;
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tlf-tax-nav {
        padding: 14px 16px;
      }
      .tlf-tax-nav-links {
        display: none;
      }
      .tlf-tax-hero {
        padding: 28px 16px 28px;
      }
      .tlf-tax-hero h2 {
        font-size: 1.85rem;
      }
      .tlf-tax-content {
        padding: 0 16px 28px;
      }
      .tlf-tax-info-row {
        padding: 0 16px 28px;
      }
      .tlf-tax-gallery {
        padding: 0 16px 36px;
      }
      .tlf-tax-gallery-grid {
        grid-template-columns: 1fr;
      }
      .tlf-tax-gallery-img {
        height: 220px;
      }
      .tlf-tax-btn-row {
        flex-direction: column;
      }
      .tlf-tax-btn-primary,
      .tlf-tax-btn-secondary {
        text-align: center;
        width: 100%;
      }
      .tlf-tax-hero-img {
        min-height: 260px;
      }
      .tlf-tax-orb {
        width: 300px;
        height: 300px;
        top: -60px;
        right: -80px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-tax-root">
        {/* Decorative Orbs */}
        <div className="tlf-tax-orb" />
        <div className="tlf-tax-orb-2" />

        {/* ── Nav Bar ── */}
        <nav className="tlf-tax-nav">
          <div className="tlf-tax-brand">
            <div className="tlf-tax-brand-circle">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="tlf-tax-nav-links">
            <span>Portfolio</span>
            <span>Credentials</span>
            <span>Hire</span>
          </div>
        </nav>

        {/* ── Hero Section ── */}
        <div className="tlf-tax-hero">
          <div className="tlf-tax-hero-left">
            <div className="tlf-tax-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span key={i} className="tlf-tax-pill">{s}</span>
              ))}
            </div>
            <h2>
              {name}
              {verified && (
                <span className="tlf-tax-verified">&#10003;</span>
              )}
            </h2>
            <p className="tlf-tax-tagline">{tagline}</p>
            <p className="tlf-tax-bio">{bio}</p>
            <div className="tlf-tax-stats">
              <span>{serviceArea}</span>
              {priceLabel && (
                <>
                  <span className="tlf-tax-stat-sep" />
                  <span className="tlf-tax-stat-accent">{priceLabel}</span>
                </>
              )}
            </div>
            <div className="tlf-tax-btn-row">
              <button className="tlf-tax-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tlf-tax-btn-secondary">View Portfolio</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tlf-tax-hero-card">
              <img
                className="tlf-tax-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tlf-tax-hero-overlay">
                "Precision and trust in every engagement."
              </div>
            </div>
          )}
        </div>

        {/* ── Main Content Grid ── */}
        <div className="tlf-tax-content">
          {/* Credentials Panel */}
          <div className="tlf-tax-panel">
            <h3>Credentials &amp; Experience</h3>
            <div className="tlf-tax-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="tlf-tax-cred-item">
                  <div className="tlf-tax-cred-dot" />
                  <div>
                    <div className="tlf-tax-cred-label">{c.label}</div>
                    <div className="tlf-tax-cred-detail">{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties / Services Panel */}
          <div className="tlf-tax-panel">
            <h3>Services &amp; Specialties</h3>
            <div className="tlf-tax-services-list">
              {services.map((s, i) => (
                <div key={i} className="tlf-tax-service-row">
                  <span className="tlf-tax-service-marker">&sect;</span>
                  <span className="tlf-tax-service-name">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tlf-tax-info-row">
          {infoCards.map((card, i) => (
            <div key={i} className="tlf-tax-info-card">
              <div className="tlf-tax-info-icon">{card.icon}</div>
              <div className="tlf-tax-info-title">{card?.filename}</div>
              <div className="tlf-tax-info-desc">{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-tax-gallery">
            <h3 className="tlf-tax-gallery-heading">Portfolio</h3>
            <div className="tlf-tax-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tlf-tax-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
