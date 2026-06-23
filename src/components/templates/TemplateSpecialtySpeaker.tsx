// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtySpeaker(props: TemplateProps) {
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
    const id = "font-spc-sk";
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
    "Conference keynotes",
    "Corporate workshops",
    "Panel moderation",
    "Leadership talks",
    "Media interviews",
    "Custom sessions",
  ];

  const credentials = [
    "TEDx speaker",
    "Published author",
    "500+ engagements",
  ];

  const packageStrip = ["Single Keynote", "Workshop Day", "Speaking Retainer"];

  const css = `
    .spc-sk-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #ecfeff, #fff 48%, #e0f2fe);
      color: #475569;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-sk-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(8,145,178,.10);
    }
    .spc-sk-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
    }
    .spc-sk-brand-dot {
      width: 34px;
      height: 34px;
      background: #0891b2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ecfeff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-sk-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-sk-nav-links span {
      cursor: pointer;
      color: #0891b2;
      opacity: 0.75;
      transition: opacity 0.2s;
    }
    .spc-sk-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-sk-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sk-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Specialty Pills */
    .spc-sk-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-sk-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #0891b2;
      background: rgba(8,145,178,.08);
      border: 1px solid rgba(8,145,178,.15);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Heading */
    .spc-sk-heading {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .spc-sk-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #0891b2;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-sk-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-sk-hero-tagline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #0891b2;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    .spc-sk-hero-desc {
      font-size: 0.92rem;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 460px;
    }

    /* Package Strip */
    .spc-sk-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
    }
    .spc-sk-pkg-card {
      flex: 1;
      background: rgba(8,145,178,.06);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 34px;
      padding: 14px 12px;
      text-align: center;
      transition: background 0.2s;
    }
    .spc-sk-pkg-card:hover {
      background: rgba(8,145,178,.12);
    }
    .spc-sk-pkg-name {
      font-size: 0.75rem;
      font-weight: 600;
      color: #0f172a;
    }

    /* CTA Buttons */
    .spc-sk-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-sk-btn-primary {
      display: inline-block;
      background: #0891b2;
      color: #ecfeff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #0891b2;
      border-radius: 34px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-sk-btn-primary:hover {
      background: transparent;
      color: #0891b2;
    }
    .spc-sk-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #1e293b;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(8,145,178,.20);
      border-radius: 34px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .spc-sk-btn-ghost:hover {
      border-color: #0891b2;
    }

    /* Hero Image */
    .spc-sk-hero-card {
      position: relative;
      border-radius: 34px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(8,145,178,.12);
    }
    .spc-sk-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }

    /* ── Main Grid (Services + Credentials) ── */
    .spc-sk-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sk-panel {
      background: rgba(8,145,178,.06);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 34px;
      padding: 36px 28px;
    }
    .spc-sk-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 18px 0;
    }

    /* Services 2-col list */
    .spc-sk-services-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px 18px;
    }
    .spc-sk-service-item {
      font-size: 0.88rem;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-sk-service-star {
      color: #0891b2;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    /* Credential Badges */
    .spc-sk-cred-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .spc-sk-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(8,145,178,.06);
      border: 1px solid rgba(8,145,178,.10);
      border-radius: 14px;
      padding: 16px 20px;
      transition: background 0.2s;
    }
    .spc-sk-cred-badge:hover {
      background: rgba(8,145,178,.12);
    }
    .spc-sk-cred-icon {
      width: 32px;
      height: 32px;
      background: #0891b2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ecfeff;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-sk-cred-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #0f172a;
    }

    /* ── Info Grid (3 cards) ── */
    .spc-sk-info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sk-info-card {
      background: rgba(8,145,178,.06);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 34px;
      padding: 32px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-sk-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 28px rgba(8,145,178,.10);
    }
    .spc-sk-info-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px 0;
    }
    .spc-sk-info-card p {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }
    .spc-sk-info-price {
      margin-top: 12px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #0891b2;
    }

    /* ── Lower Grid (Form + Testimonial) ── */
    .spc-sk-lower-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sk-form-panel {
      background: rgba(8,145,178,.06);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 34px;
      padding: 36px 28px;
    }
    .spc-sk-form-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-sk-form-field {
      width: 100%;
      background: rgba(8,145,178,.05);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #64748b;
      box-sizing: border-box;
    }
    .spc-sk-form-textarea {
      width: 100%;
      min-height: 90px;
      background: rgba(8,145,178,.05);
      border: 1px solid rgba(8,145,178,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #64748b;
      resize: vertical;
      box-sizing: border-box;
    }
    .spc-sk-form-submit {
      display: inline-block;
      background: #0891b2;
      color: #ecfeff;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      padding: 11px 28px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-sk-form-submit:hover { opacity: 0.85; }

    /* Testimonial Card */
    .spc-sk-testimonial-card {
      background: #0891b2;
      border-radius: 34px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-sk-testimonial-quote {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 600;
      color: #ecfeff;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 20px;
    }
    .spc-sk-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(236,254,255,.7);
    }

    /* ── Gallery ── */
    .spc-sk-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sk-gallery-img {
      width: 100%;
      object-fit: cover;
      border-radius: 34px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-sk-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 28px rgba(8,145,178,.15);
    }
    .spc-sk-gallery-span {
      grid-row: span 2;
      height: 100%;
      min-height: 360px;
    }
    .spc-sk-gallery-single {
      height: 220px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-sk-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-sk-main-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sk-info-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sk-lower-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sk-gallery {
        grid-template-columns: 1fr;
        padding: 0 24px 40px;
      }
      .spc-sk-gallery-span {
        grid-row: span 1;
        min-height: 260px;
      }
      .spc-sk-gallery-single {
        height: 240px;
      }
      .spc-sk-services-list {
        grid-template-columns: 1fr;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-sk-nav {
        padding: 14px 16px;
      }
      .spc-sk-nav-links { display: none; }
      .spc-sk-hero {
        padding: 28px 16px 28px;
      }
      .spc-sk-heading {
        font-size: 1.85rem;
      }
      .spc-sk-pkg-strip {
        flex-direction: column;
      }
      .spc-sk-main-grid {
        padding: 0 16px 28px;
      }
      .spc-sk-info-grid {
        padding: 0 16px 28px;
      }
      .spc-sk-lower-grid {
        padding: 0 16px 28px;
      }
      .spc-sk-gallery {
        padding: 0 16px 36px;
      }
      .spc-sk-gallery-span {
        min-height: 220px;
      }
      .spc-sk-gallery-single {
        height: 200px;
      }
      .spc-sk-btn-row {
        flex-direction: column;
      }
      .spc-sk-btn-primary,
      .spc-sk-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-sk-root">
        {/* ── Nav ── */}
        <nav className="spc-sk-nav">
          <div className="spc-sk-brand">
            <div className="spc-sk-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-sk-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-sk-hero">
          <div className="spc-sk-hero-left">
            <div className="spc-sk-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-sk-pill">{s}</span>
              ))}
            </div>
            <h2 className="spc-sk-heading">
              {name}
              {verified && (
                <span className="spc-sk-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#ecfeff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-sk-hero-tagline">
              Keynotes that help audiences see clearly and act differently.
            </p>
            <p className="spc-sk-hero-desc">{tagline}</p>
            <div className="spc-sk-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-sk-pkg-card">
                  <div className="spc-sk-pkg-name">{pkg}</div>
                </div>
              ))}
            </div>
            <div className="spc-sk-btn-row">
              <button className="spc-sk-btn-primary" onClick={onHire}>
                Book Consultation
              </button>
              <button className="spc-sk-btn-ghost">View Work</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="spc-sk-hero-card">
              <img
                className="spc-sk-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid: Services + Credentials ── */}
        <div className="spc-sk-main-grid">
          <div className="spc-sk-panel">
            <h3>Services</h3>
            <div className="spc-sk-services-list">
              {services.map((s, i) => (
                <div key={i} className="spc-sk-service-item">
                  <span className="spc-sk-service-star">&#9733;</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-sk-panel">
            <h3>Credentials</h3>
            <div className="spc-sk-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="spc-sk-cred-badge">
                  <div className="spc-sk-cred-icon">&#10003;</div>
                  <span className="spc-sk-cred-label">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid (3 cards) ── */}
        <div className="spc-sk-info-grid">
          <div className="spc-sk-info-card">
            <h4>Approach</h4>
            <p>{bio}</p>
          </div>
          <div className="spc-sk-info-card">
            <h4>Consultation Fit</h4>
            <p>
              Serving {serviceArea}. Every engagement is scoped to your audience,
              goals, and event format — from 500-person keynotes to intimate
              leadership workshops.
            </p>
          </div>
          <div className="spc-sk-info-card">
            <h4>Packages</h4>
            <p>
              Flexible booking from single keynotes to full-day workshops and
              ongoing retainers, with custom sessions available.
            </p>
            {priceLabel && (
              <div className="spc-sk-info-price">{priceLabel}</div>
            )}
          </div>
        </div>

        {/* ── Lower Grid: Form + Testimonial ── */}
        <div className="spc-sk-lower-grid">
          <div className="spc-sk-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-sk-form-field">Your name</div>
            <div className="spc-sk-form-field">Email address</div>
            <div className="spc-sk-form-textarea">
              Tell me about your event or speaking needs...
            </div>
            <div className="spc-sk-form-submit">Send Request</div>
          </div>
          <div className="spc-sk-testimonial-card">
            <div className="spc-sk-testimonial-quote">
              &ldquo;The talk was polished, practical, and quoted by attendees
              afterward.&rdquo;
            </div>
            <div className="spc-sk-testimonial-author">
              &mdash; Verified Client
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-sk-gallery">
            {galleryPhotos[0] && (
              <img
                className="spc-sk-gallery-img spc-sk-gallery-span"
                src={galleryPhotos[0].url}
                alt={galleryPhotos[0].filename}
                onClick={() => onPhotoClick(1)}
              />
            )}
            {galleryPhotos[1] && (
              <img
                className="spc-sk-gallery-img spc-sk-gallery-single"
                src={galleryPhotos[1].url}
                alt={galleryPhotos[1].filename}
                onClick={() => onPhotoClick(2)}
              />
            )}
            {galleryPhotos[2] && (
              <img
                className="spc-sk-gallery-img spc-sk-gallery-single"
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
