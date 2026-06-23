// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyAstrologer(props: TemplateProps) {
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
    const id = "font-spc-as";
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
    "Birth chart readings",
    "Transit forecasts",
    "Relationship readings",
    "Career timing",
    "Year-ahead sessions",
    "Recorded readings",
  ];

  const credentials = [
    "Certified astrologer",
    "Published chart analyst",
    "10+ years practice",
  ];

  const packageStrip = ["Single Reading", "Transit Package", "Year Ahead"];

  const css = `
    .spc-as-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(circle at 16% 18%, rgba(168,85,247,.30), transparent 25%),
        linear-gradient(135deg, #020617, #111827 52%, #312e81);
      color: #e0e7ff;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-as-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .spc-as-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #fff;
    }
    .spc-as-brand-dot {
      width: 34px;
      height: 34px;
      background: #a78bfa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-as-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-as-nav-links span {
      cursor: pointer;
      color: #a5b4fc;
      opacity: 0.75;
      transition: opacity 0.2s;
    }
    .spc-as-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-as-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-as-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Specialty Pills */
    .spc-as-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-as-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #a5b4fc;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Heading */
    .spc-as-heading {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #fff;
      margin: 0 0 6px 0;
    }
    .spc-as-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #a78bfa;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-as-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-as-hero-tagline {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #a5b4fc;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    .spc-as-hero-desc {
      font-size: 0.92rem;
      color: #e0e7ff;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 460px;
    }

    /* Package Strip */
    .spc-as-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
    }
    .spc-as-pkg-card {
      flex: 1;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px 999px 40px 40px;
      padding: 14px 12px;
      text-align: center;
      transition: background 0.2s;
    }
    .spc-as-pkg-card:hover {
      background: rgba(255,255,255,.12);
    }
    .spc-as-pkg-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: #fff;
    }

    /* CTA Buttons */
    .spc-as-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-as-btn-primary {
      display: inline-block;
      background: #a78bfa;
      color: #111827;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #a78bfa;
      border-radius: 999px 999px 40px 40px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-as-btn-primary:hover {
      background: transparent;
      color: #a78bfa;
    }
    .spc-as-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #f8fafc;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(255,255,255,.18);
      border-radius: 999px 999px 40px 40px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .spc-as-btn-ghost:hover {
      border-color: #a78bfa;
    }

    /* Hero Image */
    .spc-as-hero-card {
      position: relative;
      border-radius: 999px 999px 40px 40px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.35);
    }
    .spc-as-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }

    /* ── Main Grid (Services + Credentials) ── */
    .spc-as-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-as-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px 999px 40px 40px;
      padding: 36px 28px;
    }
    .spc-as-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 18px 0;
    }

    /* Services 2-col list */
    .spc-as-services-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
    }
    .spc-as-service-item {
      font-size: 0.88rem;
      color: #e0e7ff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-as-service-star {
      color: #a78bfa;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    /* Credential Badges */
    .spc-as-cred-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .spc-as-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 14px;
      padding: 16px 20px;
      transition: background 0.2s;
    }
    .spc-as-cred-badge:hover {
      background: rgba(255,255,255,.10);
    }
    .spc-as-cred-icon {
      width: 32px;
      height: 32px;
      background: #a78bfa;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-as-cred-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #f8fafc;
    }

    /* ── Info Grid (3 cards) ── */
    .spc-as-info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-as-info-card {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px 999px 40px 40px;
      padding: 32px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-as-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(0,0,0,.25);
    }
    .spc-as-info-card h4 {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 10px 0;
    }
    .spc-as-info-card p {
      font-size: 0.85rem;
      color: #a5b4fc;
      line-height: 1.6;
      margin: 0;
    }
    .spc-as-info-price {
      margin-top: 12px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #a78bfa;
    }

    /* ── Lower Grid (Form + Testimonial) ── */
    .spc-as-lower-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-as-form-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px 999px 40px 40px;
      padding: 36px 28px;
    }
    .spc-as-form-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-as-form-field {
      width: 100%;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #a5b4fc;
      box-sizing: border-box;
    }
    .spc-as-form-textarea {
      width: 100%;
      min-height: 90px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #a5b4fc;
      resize: vertical;
      box-sizing: border-box;
    }
    .spc-as-form-submit {
      display: inline-block;
      background: #a78bfa;
      color: #111827;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 11px 28px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-as-form-submit:hover { opacity: 0.85; }

    /* Testimonial Card */
    .spc-as-testimonial-card {
      background: #a78bfa;
      border-radius: 999px 999px 40px 40px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-as-testimonial-quote {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #111827;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 20px;
    }
    .spc-as-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(17,24,39,.7);
    }

    /* ── Gallery ── */
    .spc-as-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-as-gallery-img {
      width: 100%;
      object-fit: cover;
      border-radius: 999px 999px 40px 40px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-as-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 28px rgba(0,0,0,.3);
    }
    .spc-as-gallery-span {
      grid-row: span 2;
      height: 100%;
      min-height: 360px;
    }
    .spc-as-gallery-single {
      height: 220px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-as-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-as-main-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-as-info-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-as-lower-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-as-gallery {
        grid-template-columns: 1fr;
        padding: 0 24px 40px;
      }
      .spc-as-gallery-span {
        grid-row: span 1;
        min-height: 260px;
      }
      .spc-as-gallery-single {
        height: 240px;
      }
      .spc-as-services-list {
        grid-template-columns: 1fr;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-as-nav {
        padding: 14px 16px;
      }
      .spc-as-nav-links { display: none; }
      .spc-as-hero {
        padding: 28px 16px 28px;
      }
      .spc-as-heading {
        font-size: 1.85rem;
      }
      .spc-as-pkg-strip {
        flex-direction: column;
      }
      .spc-as-main-grid {
        padding: 0 16px 28px;
      }
      .spc-as-info-grid {
        padding: 0 16px 28px;
      }
      .spc-as-lower-grid {
        padding: 0 16px 28px;
      }
      .spc-as-gallery {
        padding: 0 16px 36px;
      }
      .spc-as-gallery-span {
        min-height: 220px;
      }
      .spc-as-gallery-single {
        height: 200px;
      }
      .spc-as-btn-row {
        flex-direction: column;
      }
      .spc-as-btn-primary,
      .spc-as-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-as-root">
        {/* ── Nav ── */}
        <nav className="spc-as-nav">
          <div className="spc-as-brand">
            <div className="spc-as-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-as-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-as-hero">
          <div className="spc-as-hero-left">
            <div className="spc-as-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-as-pill">{s}</span>
              ))}
            </div>
            <h2 className="spc-as-heading">
              {name}
              {verified && (
                <span className="spc-as-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-as-hero-tagline">
              Celestial insight with structure, symbolism, and practical reflection.
            </p>
            <p className="spc-as-hero-desc">{tagline}</p>
            <div className="spc-as-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-as-pkg-card">
                  <div className="spc-as-pkg-name">{pkg}</div>
                </div>
              ))}
            </div>
            <div className="spc-as-btn-row">
              <button className="spc-as-btn-primary" onClick={onHire}>
                Book Consultation
              </button>
              <button className="spc-as-btn-ghost">View Work</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="spc-as-hero-card">
              <img
                className="spc-as-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid: Services + Credentials ── */}
        <div className="spc-as-main-grid">
          <div className="spc-as-panel">
            <h3>Services</h3>
            <div className="spc-as-services-list">
              {services.map((s, i) => (
                <div key={i} className="spc-as-service-item">
                  <span className="spc-as-service-star">&#9733;</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-as-panel">
            <h3>Credentials</h3>
            <div className="spc-as-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="spc-as-cred-badge">
                  <div className="spc-as-cred-icon">&#10003;</div>
                  <span className="spc-as-cred-label">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid (3 cards) ── */}
        <div className="spc-as-info-grid">
          <div className="spc-as-info-card">
            <h4>Methodology</h4>
            <p>{bio}</p>
          </div>
          <div className="spc-as-info-card">
            <h4>Consultation Fit</h4>
            <p>
              Serving {serviceArea}. Every session is tailored to your chart,
              timeline, and questions — whether you're exploring for the first
              time or refining an ongoing practice.
            </p>
          </div>
          <div className="spc-as-info-card">
            <h4>Packages</h4>
            <p>
              Flexible options from single readings to multi-session deep-dives,
              with recorded sessions available upon request.
            </p>
            {priceLabel && (
              <div className="spc-as-info-price">{priceLabel}</div>
            )}
          </div>
        </div>

        {/* ── Lower Grid: Form + Testimonial ── */}
        <div className="spc-as-lower-grid">
          <div className="spc-as-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-as-form-field">Your name</div>
            <div className="spc-as-form-field">Email address</div>
            <div className="spc-as-form-textarea">
              Tell me about what you're looking for...
            </div>
            <div className="spc-as-form-submit">Send Request</div>
          </div>
          <div className="spc-as-testimonial-card">
            <div className="spc-as-testimonial-quote">
              &ldquo;The reading was specific, useful, and surprisingly
              grounded.&rdquo;
            </div>
            <div className="spc-as-testimonial-author">
              &mdash; Verified Client
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-as-gallery">
            {galleryPhotos[0] && (
              <img
                className="spc-as-gallery-img spc-as-gallery-span"
                src={galleryPhotos[0].url}
                alt={galleryPhotos[0].filename}
                onClick={() => onPhotoClick(1)}
              />
            )}
            {galleryPhotos[1] && (
              <img
                className="spc-as-gallery-img spc-as-gallery-single"
                src={galleryPhotos[1].url}
                alt={galleryPhotos[1].filename}
                onClick={() => onPhotoClick(2)}
              />
            )}
            {galleryPhotos[2] && (
              <img
                className="spc-as-gallery-img spc-as-gallery-single"
                src={galleryPhotos[2].url}
                alt={galleryPhotos[2].filename}
                onClick={() => onPhotoClick(3)}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
