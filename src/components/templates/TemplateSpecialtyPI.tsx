// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyPI(props: TemplateProps) {
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
    const id = "font-spc-pi";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : "";

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const pills = specialties.length > 0 ? specialties : ["Investigation"];

  const services = [
    "Background research",
    "Skip tracing",
    "Civil case support",
    "Surveillance coordination",
    "Asset searches",
    "Due diligence",
  ];

  const credentials = [
    "Licensed investigator",
    "Confidentiality pledge",
    "Court-ready documentation",
  ];

  const packageCards = [
    { label: "Initial Consult", tier: "Discovery" },
    { label: "Standard Case", tier: "Standard" },
    { label: "Full Investigation", tier: "Premium" },
  ];

  const css = `
    .spc-pi-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#020617,#111827 52%,#0f172a);
      color: #cbd5e1;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-pi-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .spc-pi-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #fff;
    }
    .spc-pi-brand-dot {
      width: 34px;
      height: 34px;
      background: #94a3b8;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #020617;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-pi-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-pi-nav-links span {
      cursor: pointer;
      color: #94a3b8;
      transition: color 0.2s;
    }
    .spc-pi-nav-links span:hover {
      color: #f8fafc;
    }

    /* ── Hero ── */
    .spc-pi-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-pi-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-pi-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-pi-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #94a3b8;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      padding: 5px 14px;
      border-radius: 14px;
    }
    .spc-pi-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #fff;
      margin: 0 0 8px 0;
    }
    .spc-pi-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #94a3b8;
      border-radius: 50%;
      margin-left: 10px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-pi-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-pi-hero-tagline {
      font-size: 1.05rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0 0 10px 0;
      font-style: italic;
    }
    .spc-pi-hero-desc {
      font-size: 0.92rem;
      color: #cbd5e1;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .spc-pi-hero-area {
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 16px;
    }

    /* Package strip */
    .spc-pi-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
    }
    .spc-pi-pkg-card {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      padding: 14px 18px;
      text-align: center;
      flex: 1;
      transition: transform 0.2s, border-color 0.2s;
    }
    .spc-pi-pkg-card:hover {
      transform: translateY(-2px);
      border-color: #94a3b8;
    }
    .spc-pi-pkg-tier {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 4px;
    }
    .spc-pi-pkg-label {
      font-size: 0.82rem;
      color: #f8fafc;
      font-weight: 600;
    }

    /* CTA buttons */
    .spc-pi-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-pi-btn-primary {
      display: inline-block;
      background: #94a3b8;
      color: #020617;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #94a3b8;
      border-radius: 14px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-pi-btn-primary:hover {
      background: transparent;
      color: #94a3b8;
    }
    .spc-pi-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(255,255,255,.18);
      border-radius: 14px;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .spc-pi-btn-ghost:hover {
      border-color: #f8fafc;
    }

    /* Hero image */
    .spc-pi-hero-card {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.35);
    }
    .spc-pi-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.4s;
    }
    .spc-pi-hero-card:hover .spc-pi-hero-img {
      transform: scale(1.03);
    }

    /* ── Main Grid: Services + Credentials ── */
    .spc-pi-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-pi-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      padding: 36px 28px;
    }
    .spc-pi-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-pi-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-pi-svc-item {
      font-size: 0.88rem;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-pi-svc-star {
      color: #94a3b8;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .spc-pi-cred-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-pi-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 14px;
      padding: 16px 18px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .spc-pi-cred-badge:hover {
      border-color: #94a3b8;
      transform: translateY(-2px);
    }
    .spc-pi-cred-icon {
      width: 36px;
      height: 36px;
      background: #94a3b8;
      color: #020617;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-pi-cred-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #f8fafc;
    }

    /* ── Info Grid: 3 cards ── */
    .spc-pi-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-pi-info-card {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      padding: 30px 24px;
      transition: transform 0.2s, border-color 0.2s;
    }
    .spc-pi-info-card:hover {
      transform: translateY(-3px);
      border-color: rgba(255,255,255,.22);
    }
    .spc-pi-info-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 10px 0;
    }
    .spc-pi-info-card p {
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.6;
      margin: 0;
    }
    .spc-pi-info-price {
      font-size: 0.92rem;
      font-weight: 700;
      color: #94a3b8;
      margin-top: 10px;
    }

    /* ── Lower Grid: Form + Testimonial ── */
    .spc-pi-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-pi-form-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      padding: 36px 28px;
    }
    .spc-pi-form-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-pi-input {
      width: 100%;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 14px;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      margin-bottom: 12px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-pi-input:focus {
      border-color: #94a3b8;
    }
    .spc-pi-input::placeholder {
      color: #64748b;
    }
    .spc-pi-textarea {
      width: 100%;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 14px;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      margin-bottom: 16px;
      box-sizing: border-box;
      min-height: 90px;
      resize: vertical;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-pi-textarea:focus {
      border-color: #94a3b8;
    }
    .spc-pi-textarea::placeholder {
      color: #64748b;
    }
    .spc-pi-form-submit {
      display: inline-block;
      background: #94a3b8;
      color: #020617;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 11px 26px;
      border: none;
      border-radius: 14px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-pi-form-submit:hover {
      opacity: 0.85;
    }
    .spc-pi-testimonial {
      background: #94a3b8;
      border-radius: 14px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-pi-testimonial-quote {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #020617;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .spc-pi-testimonial-attr {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(2,6,23,.6);
    }

    /* ── Gallery ── */
    .spc-pi-gallery {
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-pi-gallery h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-pi-gallery-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
    }
    .spc-pi-gallery-item {
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }
    .spc-pi-gallery-item:first-child {
      grid-row: 1 / 3;
    }
    .spc-pi-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s;
    }
    .spc-pi-gallery-item:hover img {
      transform: scale(1.04);
    }

    /* ── Responsive ── */
    @media (max-width: 800px) {
      .spc-pi-hero {
        grid-template-columns: 1fr;
        padding: 36px 20px 32px;
        gap: 28px;
      }
      .spc-pi-hero h2 {
        font-size: 2rem;
      }
      .spc-pi-main {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-pi-info {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-pi-lower {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-pi-gallery {
        padding: 0 20px 40px;
      }
      .spc-pi-gallery-grid {
        grid-template-columns: 1fr;
      }
      .spc-pi-gallery-item:first-child {
        grid-row: auto;
      }
      .spc-pi-nav {
        padding: 14px 20px;
      }
      .spc-pi-pkg-strip {
        flex-direction: column;
      }
    }

    @media (max-width: 520px) {
      .spc-pi-hero h2 {
        font-size: 1.55rem;
      }
      .spc-pi-hero-desc {
        font-size: 0.85rem;
      }
      .spc-pi-hero-tagline {
        font-size: 0.92rem;
      }
      .spc-pi-btn-row {
        flex-direction: column;
      }
      .spc-pi-btn-primary,
      .spc-pi-btn-ghost {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
      }
      .spc-pi-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-pi-panel {
        padding: 24px 18px;
      }
      .spc-pi-form-panel {
        padding: 24px 18px;
      }
      .spc-pi-testimonial {
        padding: 28px 22px;
      }
      .spc-pi-testimonial-quote {
        font-size: 1.05rem;
      }
      .spc-pi-nav-links {
        gap: 14px;
        font-size: 0.78rem;
      }
    }
  `;

  return (
    <div className="spc-pi-root">
      <style>{css}</style>

      {/* Nav */}
      <nav className="spc-pi-nav">
        <div className="spc-pi-brand">
          <div className="spc-pi-brand-dot">{name.charAt(0)}</div>
          {name}
        </div>
        <div className="spc-pi-nav-links">
          <span>Services</span>
          <span>Credentials</span>
          <span>Approach</span>
          <span>Booking</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="spc-pi-hero">
        <div className="spc-pi-hero-copy">
          <div className="spc-pi-pills">
            {pills.map((s, i) => (
              <span className="spc-pi-pill" key={i}>{s}</span>
            ))}
          </div>

          <h2>
            {name}
            {verified && (
              <span className="spc-pi-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </h2>

          <p className="spc-pi-hero-tagline">
            Discreet research, careful documentation, confidential answers.
          </p>

          <p className="spc-pi-hero-desc">
            {tagline || bio}
          </p>

          {serviceArea && (
            <p className="spc-pi-hero-area">Based in {serviceArea}</p>
          )}

          <div className="spc-pi-pkg-strip">
            {packageCards.map((pkg, i) => (
              <div className="spc-pi-pkg-card" key={i}>
                <div className="spc-pi-pkg-tier">{pkg.tier}</div>
                <div className="spc-pi-pkg-label">{pkg.label}</div>
              </div>
            ))}
          </div>

          <div className="spc-pi-btn-row">
            <button className="spc-pi-btn-primary" onClick={onHire}>
              Book Consultation
            </button>
            <button className="spc-pi-btn-ghost">View Work</button>
          </div>
        </div>

        <div className="spc-pi-hero-card">
          {heroPhoto && (
            <img
              className="spc-pi-hero-img"
              src={heroPhoto.url}
              alt={heroPhoto.filename}
              onClick={() => onPhotoClick(0)}
            />
          )}
        </div>
      </section>

      {/* Main Grid: Services + Credentials */}
      <section className="spc-pi-main">
        <div className="spc-pi-panel">
          <h3>Services</h3>
          <div className="spc-pi-svc-grid">
            {services.map((svc, i) => (
              <div className="spc-pi-svc-item" key={i}>
                <span className="spc-pi-svc-star">★</span>
                {svc}
              </div>
            ))}
          </div>
        </div>
        <div className="spc-pi-panel">
          <h3>Credentials</h3>
          <div className="spc-pi-cred-list">
            {credentials.map((cred, i) => (
              <div className="spc-pi-cred-badge" key={i}>
                <div className="spc-pi-cred-icon">✓</div>
                <span className="spc-pi-cred-label">{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Grid: 3 cards */}
      <section className="spc-pi-info">
        <div className="spc-pi-info-card">
          <h4>Methodology</h4>
          <p>
            Every case begins with a thorough intake, followed by a tailored
            investigation plan built around your specific objectives and timeline.
          </p>
        </div>
        <div className="spc-pi-info-card">
          <h4>Consultation Fit</h4>
          <p>
            An initial meeting to assess your needs, outline scope, and ensure
            you feel confident before any work begins.
          </p>
        </div>
        <div className="spc-pi-info-card">
          <h4>Packages</h4>
          <p>
            Flexible engagement tiers designed for individuals, attorneys, and
            businesses with varying caseloads.
          </p>
          {priceLabel && (
            <div className="spc-pi-info-price">{priceLabel}</div>
          )}
        </div>
      </section>

      {/* Lower Grid: Form + Testimonial */}
      <section className="spc-pi-lower">
        <div className="spc-pi-form-panel">
          <h3>Request a Consultation</h3>
          <div className="spc-pi-input" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#64748b" }}>Your name</span>
          </div>
          <div className="spc-pi-input" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#64748b" }}>Email address</span>
          </div>
          <div className="spc-pi-textarea" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#64748b" }}>Describe your situation...</span>
          </div>
          <div className="spc-pi-form-submit">Send Inquiry</div>
        </div>

        <div className="spc-pi-testimonial">
          <p className="spc-pi-testimonial-quote">
            "The work was discreet, clear, and carefully documented from start to finish."
          </p>
          <span className="spc-pi-testimonial-attr">— Verified Client</span>
        </div>
      </section>

      {/* Gallery */}
      {galleryPhotos.length > 0 && (
        <section className="spc-pi-gallery">
          <h3>Selected Work</h3>
          <div className="spc-pi-gallery-grid">
            {galleryPhotos.map((photo, i) => (
              <div
                className="spc-pi-gallery-item"
                key={photo.id}
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
