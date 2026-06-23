// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyInterpreter(props: TemplateProps) {
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

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : "";

  useEffect(() => {
    const id = "font-spc-in";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const services = [
    "Conference interpreting",
    "Medical appointments",
    "Legal meetings",
    "Business negotiations",
    "Remote interpreting",
    "Community events",
  ];

  const credentials = [
    "Certified interpreter",
    "HIPAA-compliant",
    "Court-certified",
  ];

  const packageCards = ["Single Session", "Half-Day Block", "Full-Day Retainer"];

  const css = `
    .spc-in-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#f8fafc,#fff 48%,#e2e8f0);
      color: #1e293b;
      min-height: 100vh;
      line-height: 1.6;
      overflow-x: hidden;
    }
    .spc-in-root * {
      box-sizing: border-box;
    }

    /* ── Nav ── */
    .spc-in-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 36px;
      border-bottom: 1px solid rgba(51,65,85,.1);
    }
    .spc-in-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
    }
    .spc-in-brand-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #334155;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .spc-in-nav-links {
      display: flex;
      gap: 28px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-in-nav-links span {
      cursor: pointer;
      color: #475569;
      transition: color 0.2s;
    }
    .spc-in-nav-links span:hover {
      color: #0f172a;
    }

    /* ── Hero ── */
    .spc-in-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      padding: 52px 36px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-in-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-in-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;
    }
    .spc-in-pill {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.3px;
      color: #334155;
      background: rgba(51,65,85,.08);
      border: 1px solid rgba(51,65,85,.15);
      padding: 5px 14px;
      border-radius: 18px;
    }
    .spc-in-hero h2 {
      font-family: 'Libre Baskerville', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 700;
      line-height: 1.18;
      color: #0f172a;
      margin: 0 0 10px 0;
    }
    .spc-in-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #334155;
      margin-left: 10px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-in-verified svg {
      width: 14px;
      height: 14px;
    }
    .spc-in-hero-desc {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }

    /* Package Strip */
    .spc-in-pkg-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .spc-in-pkg-card {
      background: rgba(51,65,85,.06);
      border: 1px solid rgba(51,65,85,.12);
      border-radius: 18px;
      padding: 16px 14px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-in-pkg-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(51,65,85,.1);
    }
    .spc-in-pkg-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #0f172a;
    }
    .spc-in-pkg-sub {
      font-size: 0.68rem;
      color: #64748b;
      margin-top: 2px;
    }

    /* CTA */
    .spc-in-btn-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .spc-in-btn-primary {
      display: inline-block;
      background: #334155;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid #334155;
      border-radius: 18px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.15s;
    }
    .spc-in-btn-primary:hover {
      background: transparent;
      color: #334155;
      transform: translateY(-1px);
    }
    .spc-in-btn-secondary {
      display: inline-block;
      background: transparent;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid rgba(51,65,85,.18);
      border-radius: 18px;
      cursor: pointer;
      transition: border-color 0.2s, transform 0.15s;
    }
    .spc-in-btn-secondary:hover {
      border-color: #334155;
      transform: translateY(-1px);
    }

    /* Hero Image */
    .spc-in-hero-img-wrap {
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(51,65,85,.12);
      cursor: pointer;
      transition: transform 0.3s;
    }
    .spc-in-hero-img-wrap:hover {
      transform: scale(1.015);
    }
    .spc-in-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
    }

    /* ── Main Grid ── */
    .spc-in-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-in-panel {
      background: rgba(51,65,85,.06);
      border: 1px solid rgba(51,65,85,.12);
      border-radius: 18px;
      padding: 32px 28px;
    }
    .spc-in-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 18px 0;
    }
    .spc-in-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-in-svc-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      color: #1e293b;
      font-weight: 500;
    }
    .spc-in-svc-star {
      color: #334155;
      font-size: 0.78rem;
      flex-shrink: 0;
    }
    .spc-in-cred-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .spc-in-cred-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(51,65,85,.06);
      border: 1px solid rgba(51,65,85,.12);
      border-radius: 18px;
      padding: 14px 18px;
      transition: transform 0.2s;
    }
    .spc-in-cred-badge:hover {
      transform: translateX(4px);
    }
    .spc-in-cred-check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #334155;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-in-cred-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #0f172a;
    }

    /* ── Info Grid ── */
    .spc-in-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-in-info-card {
      background: rgba(51,65,85,.06);
      border: 1px solid rgba(51,65,85,.12);
      border-radius: 18px;
      padding: 28px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-in-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(51,65,85,.08);
    }
    .spc-in-info-card h4 {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1rem;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    .spc-in-info-card p {
      font-size: 0.84rem;
      color: #475569;
      line-height: 1.65;
      margin: 0;
    }
    .spc-in-info-price {
      font-size: 0.78rem;
      color: #334155;
      font-weight: 700;
      margin-top: 8px;
    }

    /* ── Lower Grid ── */
    .spc-in-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-in-form-panel {
      background: rgba(51,65,85,.06);
      border: 1px solid rgba(51,65,85,.12);
      border-radius: 18px;
      padding: 32px 28px;
    }
    .spc-in-form-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-in-input {
      width: 100%;
      background: #fff;
      border: 1px solid rgba(51,65,85,.15);
      border-radius: 18px;
      padding: 12px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #1e293b;
      margin-bottom: 12px;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-in-input:focus {
      border-color: #334155;
    }
    .spc-in-textarea {
      width: 100%;
      background: #fff;
      border: 1px solid rgba(51,65,85,.15);
      border-radius: 18px;
      padding: 12px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #1e293b;
      margin-bottom: 16px;
      outline: none;
      resize: vertical;
      min-height: 90px;
      transition: border-color 0.2s;
    }
    .spc-in-textarea:focus {
      border-color: #334155;
    }
    .spc-in-form-btn {
      display: inline-block;
      background: #334155;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 12px 28px;
      border: none;
      border-radius: 18px;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }
    .spc-in-form-btn:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }
    .spc-in-testimonial {
      background: #334155;
      border-radius: 18px;
      padding: 36px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-in-testimonial-quote {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 400;
      font-style: italic;
      color: #fff;
      line-height: 1.7;
      margin: 0 0 20px 0;
    }
    .spc-in-testimonial-attr {
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255,255,255,.7);
    }

    /* ── Gallery ── */
    .spc-in-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      padding: 0 36px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-in-gallery-item {
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .spc-in-gallery-item:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 32px rgba(51,65,85,.14);
    }
    .spc-in-gallery-item:first-child {
      grid-row: 1 / 3;
    }
    .spc-in-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-in-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-in-hero h2 {
        font-size: 1.9rem;
      }
      .spc-in-pkg-strip {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .spc-in-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-in-info {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-in-lower {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-in-gallery {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 0 24px 40px;
      }
      .spc-in-gallery-item:first-child {
        grid-row: auto;
      }
      .spc-in-gallery-item img {
        height: 260px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-in-nav {
        padding: 14px 16px;
      }
      .spc-in-nav-links {
        display: none;
      }
      .spc-in-hero {
        padding: 28px 16px 28px;
      }
      .spc-in-hero h2 {
        font-size: 1.55rem;
      }
      .spc-in-hero-desc {
        font-size: 0.88rem;
      }
      .spc-in-pkg-strip {
        grid-template-columns: 1fr;
      }
      .spc-in-btn-row {
        flex-direction: column;
      }
      .spc-in-btn-primary,
      .spc-in-btn-secondary {
        text-align: center;
        width: 100%;
      }
      .spc-in-main {
        padding: 0 16px 28px;
      }
      .spc-in-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-in-info {
        padding: 0 16px 28px;
      }
      .spc-in-lower {
        padding: 0 16px 28px;
      }
      .spc-in-gallery {
        padding: 0 16px 36px;
      }
      .spc-in-gallery-item img {
        height: 220px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-in-root">
        {/* ── Nav ── */}
        <nav className="spc-in-nav">
          <div className="spc-in-brand">
            <div className="spc-in-brand-circle">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-in-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-in-hero">
          <div className="spc-in-hero-left">
            <div className="spc-in-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-in-pill">{s}</span>
              ))}
            </div>
            <h2>
              {name}
              {verified && (
                <span className="spc-in-verified">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.5 7.5L6 10L10.5 4.5"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-in-hero-desc">
              Clear communication in high-stakes conversations.
              {tagline ? ` ${tagline}` : ""}
            </p>

            <div className="spc-in-pkg-strip">
              {packageCards.map((label, i) => (
                <div key={i} className="spc-in-pkg-card">
                  <div className="spc-in-pkg-label">{label}</div>
                  <div className="spc-in-pkg-sub">
                    {i === 0 ? "1 session" : i === 1 ? "4 hours" : "8 hours"}
                  </div>
                </div>
              ))}
            </div>

            <div className="spc-in-btn-row">
              <button className="spc-in-btn-primary" onClick={onHire}>
                Book Consultation
              </button>
              <button className="spc-in-btn-secondary">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div
              className="spc-in-hero-img-wrap"
              onClick={() => onPhotoClick(0)}
            >
              <img
                className="spc-in-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="spc-in-main">
          <div className="spc-in-panel">
            <h3>Services</h3>
            <div className="spc-in-svc-grid">
              {services.map((s, i) => (
                <div key={i} className="spc-in-svc-item">
                  <span className="spc-in-svc-star">&#9733;</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-in-panel">
            <h3>Credentials</h3>
            <div className="spc-in-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="spc-in-cred-badge">
                  <div className="spc-in-cred-check">&#10003;</div>
                  <span className="spc-in-cred-label">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="spc-in-info">
          <div className="spc-in-info-card">
            <h4>Methodology</h4>
            <p>
              {bio || "A structured approach that balances accuracy, cultural sensitivity, and real-time adaptability for every engagement."}
            </p>
          </div>
          <div className="spc-in-info-card">
            <h4>Consultation Fit</h4>
            <p>
              Serving {serviceArea || "your area"}. Every project starts with a
              brief intake call to match the right interpreter to your needs.
            </p>
          </div>
          <div className="spc-in-info-card">
            <h4>Packages</h4>
            <p>Flexible pricing for sessions, half-day blocks, and retainers.</p>
            {priceLabel && (
              <div className="spc-in-info-price">{priceLabel}</div>
            )}
          </div>
        </div>

        {/* ── Lower Grid ── */}
        <div className="spc-in-lower">
          <div className="spc-in-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-in-input" role="textbox" tabIndex={0}>
              Your name
            </div>
            <div className="spc-in-input" role="textbox" tabIndex={0}>
              Email address
            </div>
            <div className="spc-in-textarea" role="textbox" tabIndex={0}>
              Tell us about your interpreting needs...
            </div>
            <div className="spc-in-form-btn">Submit Request</div>
          </div>
          <div className="spc-in-testimonial">
            <p className="spc-in-testimonial-quote">
              &ldquo;They made a complex meeting feel calm and understandable for
              everyone.&rdquo;
            </p>
            <span className="spc-in-testimonial-attr">
              &mdash; Verified Client
            </span>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-in-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="spc-in-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
