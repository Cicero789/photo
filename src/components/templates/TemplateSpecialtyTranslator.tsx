// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyTranslator(props: TemplateProps) {
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
    const id = "font-spc-tr";
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
  const pills = specialties.length > 0 ? specialties : ["Translation"];

  const services = [
    "Legal translation",
    "Business documents",
    "Academic translation",
    "Website localization",
    "Certified translation",
    "Proofreading",
  ];

  const credentials = [
    "ATA-style certification badge",
    "Native-level review",
    "Confidential document handling",
  ];

  const packageCards = [
    { label: "Single Document", tier: "Discovery" },
    { label: "Project Bundle", tier: "Standard" },
    { label: "Ongoing Retainer", tier: "Premium" },
  ];

  const css = `
    .spc-tr-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#eff6ff,#fff 48%,#e0f2fe);
      color: #475569;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-tr-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(37,99,235,.10);
    }
    .spc-tr-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
    }
    .spc-tr-brand-dot {
      width: 34px;
      height: 34px;
      background: #2563eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-tr-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-tr-nav-links span {
      cursor: pointer;
      color: #64748b;
      transition: color 0.2s;
    }
    .spc-tr-nav-links span:hover {
      color: #0f172a;
    }

    /* ── Hero ── */
    .spc-tr-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-tr-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-tr-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-tr-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #2563eb;
      background: rgba(37,99,235,.08);
      border: 1px solid rgba(37,99,235,.15);
      padding: 5px 14px;
      border-radius: 26px;
    }
    .spc-tr-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .spc-tr-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #2563eb;
      border-radius: 50%;
      margin-left: 10px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-tr-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-tr-hero-tagline {
      font-size: 1.05rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 10px 0;
      font-style: italic;
    }
    .spc-tr-hero-desc {
      font-size: 0.92rem;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .spc-tr-hero-area {
      font-size: 0.8rem;
      color: #64748b;
      margin-bottom: 16px;
    }

    /* Package strip */
    .spc-tr-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
    }
    .spc-tr-pkg-card {
      background: rgba(37,99,235,.06);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 26px;
      padding: 14px 18px;
      text-align: center;
      flex: 1;
      transition: transform 0.2s, border-color 0.2s;
    }
    .spc-tr-pkg-card:hover {
      transform: translateY(-2px);
      border-color: #2563eb;
    }
    .spc-tr-pkg-tier {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #2563eb;
      margin-bottom: 4px;
    }
    .spc-tr-pkg-label {
      font-size: 0.82rem;
      color: #0f172a;
      font-weight: 600;
    }

    /* CTA buttons */
    .spc-tr-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-tr-btn-primary {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #2563eb;
      border-radius: 26px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-tr-btn-primary:hover {
      background: transparent;
      color: #2563eb;
    }
    .spc-tr-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(37,99,235,.2);
      border-radius: 26px;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .spc-tr-btn-ghost:hover {
      border-color: #2563eb;
    }

    /* Hero image */
    .spc-tr-hero-card {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(37,99,235,.10);
    }
    .spc-tr-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.4s;
    }
    .spc-tr-hero-card:hover .spc-tr-hero-img {
      transform: scale(1.03);
    }

    /* ── Main Grid: Services + Credentials ── */
    .spc-tr-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-tr-panel {
      background: rgba(37,99,235,.06);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 26px;
      padding: 36px 28px;
    }
    .spc-tr-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-tr-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-tr-svc-item {
      font-size: 0.88rem;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-tr-svc-star {
      color: #2563eb;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .spc-tr-cred-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-tr-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(37,99,235,.06);
      border: 1px solid rgba(37,99,235,.10);
      border-radius: 26px;
      padding: 16px 18px;
      transition: border-color 0.2s, transform 0.2s;
    }
    .spc-tr-cred-badge:hover {
      border-color: #2563eb;
      transform: translateY(-2px);
    }
    .spc-tr-cred-icon {
      width: 36px;
      height: 36px;
      background: #2563eb;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-tr-cred-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #0f172a;
    }

    /* ── Info Grid: 3 cards ── */
    .spc-tr-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-tr-info-card {
      background: rgba(37,99,235,.06);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 26px;
      padding: 30px 24px;
      transition: transform 0.2s, border-color 0.2s;
    }
    .spc-tr-info-card:hover {
      transform: translateY(-3px);
      border-color: rgba(37,99,235,.28);
    }
    .spc-tr-info-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px 0;
    }
    .spc-tr-info-card p {
      font-size: 0.85rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }
    .spc-tr-info-price {
      font-size: 0.92rem;
      font-weight: 700;
      color: #2563eb;
      margin-top: 10px;
    }

    /* ── Lower Grid: Form + Testimonial ── */
    .spc-tr-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-tr-form-panel {
      background: rgba(37,99,235,.06);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 26px;
      padding: 36px 28px;
    }
    .spc-tr-form-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-tr-input {
      width: 100%;
      background: rgba(37,99,235,.04);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 14px;
      padding: 12px 14px;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      margin-bottom: 12px;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-tr-input:focus {
      border-color: #2563eb;
    }
    .spc-tr-input::placeholder {
      color: #94a3b8;
    }
    .spc-tr-textarea {
      width: 100%;
      background: rgba(37,99,235,.04);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 14px;
      padding: 12px 14px;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      margin-bottom: 16px;
      box-sizing: border-box;
      min-height: 90px;
      resize: vertical;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-tr-textarea:focus {
      border-color: #2563eb;
    }
    .spc-tr-textarea::placeholder {
      color: #94a3b8;
    }
    .spc-tr-form-submit {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 11px 26px;
      border: none;
      border-radius: 26px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-tr-form-submit:hover {
      opacity: 0.85;
    }
    .spc-tr-testimonial {
      background: #2563eb;
      border-radius: 26px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-tr-testimonial-quote {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .spc-tr-testimonial-attr {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,.65);
    }

    /* ── Gallery ── */
    .spc-tr-gallery {
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-tr-gallery h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-tr-gallery-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
    }
    .spc-tr-gallery-item {
      border-radius: 26px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }
    .spc-tr-gallery-item:first-child {
      grid-row: 1 / 3;
    }
    .spc-tr-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s;
    }
    .spc-tr-gallery-item:hover img {
      transform: scale(1.04);
    }

    /* ── Responsive ── */
    @media (max-width: 800px) {
      .spc-tr-hero {
        grid-template-columns: 1fr;
        padding: 36px 20px 32px;
        gap: 28px;
      }
      .spc-tr-hero h2 {
        font-size: 2rem;
      }
      .spc-tr-main {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-tr-info {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-tr-lower {
        grid-template-columns: 1fr;
        padding: 0 20px 36px;
      }
      .spc-tr-gallery {
        padding: 0 20px 40px;
      }
      .spc-tr-gallery-grid {
        grid-template-columns: 1fr;
      }
      .spc-tr-gallery-item:first-child {
        grid-row: auto;
      }
      .spc-tr-nav {
        padding: 14px 20px;
      }
      .spc-tr-pkg-strip {
        flex-direction: column;
      }
    }

    @media (max-width: 520px) {
      .spc-tr-hero h2 {
        font-size: 1.55rem;
      }
      .spc-tr-hero-desc {
        font-size: 0.85rem;
      }
      .spc-tr-hero-tagline {
        font-size: 0.92rem;
      }
      .spc-tr-btn-row {
        flex-direction: column;
      }
      .spc-tr-btn-primary,
      .spc-tr-btn-ghost {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
      }
      .spc-tr-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-tr-panel {
        padding: 24px 18px;
      }
      .spc-tr-form-panel {
        padding: 24px 18px;
      }
      .spc-tr-testimonial {
        padding: 28px 22px;
      }
      .spc-tr-testimonial-quote {
        font-size: 1.05rem;
      }
      .spc-tr-nav-links {
        gap: 14px;
        font-size: 0.78rem;
      }
    }
  `;

  return (
    <div className="spc-tr-root">
      <style>{css}</style>

      {/* Nav */}
      <nav className="spc-tr-nav">
        <div className="spc-tr-brand">
          <div className="spc-tr-brand-dot">{name.charAt(0)}</div>
          {name}
        </div>
        <div className="spc-tr-nav-links">
          <span>Services</span>
          <span>Credentials</span>
          <span>Approach</span>
          <span>Booking</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="spc-tr-hero">
        <div className="spc-tr-hero-copy">
          <div className="spc-tr-pills">
            {pills.map((s, i) => (
              <span className="spc-tr-pill" key={i}>{s}</span>
            ))}
          </div>

          <h2>
            {name}
            {verified && (
              <span className="spc-tr-verified">
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </h2>

          <p className="spc-tr-hero-tagline">
            Precise translation for documents that need accuracy and context.
          </p>

          <p className="spc-tr-hero-desc">
            {tagline || bio}
          </p>

          {serviceArea && (
            <p className="spc-tr-hero-area">Based in {serviceArea}</p>
          )}

          <div className="spc-tr-pkg-strip">
            {packageCards.map((pkg, i) => (
              <div className="spc-tr-pkg-card" key={i}>
                <div className="spc-tr-pkg-tier">{pkg.tier}</div>
                <div className="spc-tr-pkg-label">{pkg.label}</div>
              </div>
            ))}
          </div>

          <div className="spc-tr-btn-row">
            <button className="spc-tr-btn-primary" onClick={onHire}>
              Book Consultation
            </button>
            <button className="spc-tr-btn-ghost">View Work</button>
          </div>
        </div>

        <div className="spc-tr-hero-card">
          {heroPhoto && (
            <img
              className="spc-tr-hero-img"
              src={heroPhoto.url}
              alt={heroPhoto.filename}
              onClick={() => onPhotoClick(0)}
            />
          )}
        </div>
      </section>

      {/* Main Grid: Services + Credentials */}
      <section className="spc-tr-main">
        <div className="spc-tr-panel">
          <h3>Services</h3>
          <div className="spc-tr-svc-grid">
            {services.map((svc, i) => (
              <div className="spc-tr-svc-item" key={i}>
                <span className="spc-tr-svc-star">★</span>
                {svc}
              </div>
            ))}
          </div>
        </div>
        <div className="spc-tr-panel">
          <h3>Credentials</h3>
          <div className="spc-tr-cred-list">
            {credentials.map((cred, i) => (
              <div className="spc-tr-cred-badge" key={i}>
                <div className="spc-tr-cred-icon">✓</div>
                <span className="spc-tr-cred-label">{cred}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Grid: 3 cards */}
      <section className="spc-tr-info">
        <div className="spc-tr-info-card">
          <h4>Approach</h4>
          <p>
            Every project starts with a review of source material, followed by
            translation with native-level nuance and contextual accuracy.
          </p>
        </div>
        <div className="spc-tr-info-card">
          <h4>Consultation Fit</h4>
          <p>
            A brief intake to assess language pairs, document complexity, and
            turnaround needs before quoting.
          </p>
        </div>
        <div className="spc-tr-info-card">
          <h4>Packages</h4>
          <p>
            Flexible tiers for one-off documents, multi-file projects, and
            ongoing localization partnerships.
          </p>
          {priceLabel && (
            <div className="spc-tr-info-price">{priceLabel}</div>
          )}
        </div>
      </section>

      {/* Lower Grid: Form + Testimonial */}
      <section className="spc-tr-lower">
        <div className="spc-tr-form-panel">
          <h3>Request a Consultation</h3>
          <div className="spc-tr-input" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#94a3b8" }}>Your name</span>
          </div>
          <div className="spc-tr-input" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#94a3b8" }}>Email address</span>
          </div>
          <div className="spc-tr-textarea" role="textbox" tabIndex={0} contentEditable={false}>
            <span style={{ color: "#94a3b8" }}>Describe your project...</span>
          </div>
          <div className="spc-tr-form-submit">Send Inquiry</div>
        </div>

        <div className="spc-tr-testimonial">
          <p className="spc-tr-testimonial-quote">
            "The translation was accurate, formatted cleanly, and delivered ahead of schedule."
          </p>
          <span className="spc-tr-testimonial-attr">— Verified Client</span>
        </div>
      </section>

      {/* Gallery */}
      {galleryPhotos.length > 0 && (
        <section className="spc-tr-gallery">
          <h3>Selected Work</h3>
          <div className="spc-tr-gallery-grid">
            {galleryPhotos.map((photo, i) => (
              <div
                className="spc-tr-gallery-item"
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
