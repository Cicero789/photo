// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyGrant(props: TemplateProps) {
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
    const id = "font-spc-gw";
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
    "Grant research",
    "Proposal writing",
    "Logic models",
    "Budget narratives",
    "Grant calendars",
    "Reporting support",
  ];

  const credentials = [
    "Grant certified writer",
    "Federal grant specialist",
    "95% approval rate",
  ];

  const packageStrip = ["Grant Review", "Full Proposal", "Annual Retainer"];

  const css = `
    .spc-gw-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#f0fdf4,#fff 48%,#dcfce7);
      color: #1e293b;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-gw-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(22,163,74,.10);
    }
    .spc-gw-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #052e16;
    }
    .spc-gw-brand-dot {
      width: 34px;
      height: 34px;
      background: #16a34a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-gw-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-gw-nav-links span {
      cursor: pointer;
      color: #1e293b;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .spc-gw-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-gw-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-gw-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-gw-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-gw-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #16a34a;
      background: rgba(22,163,74,.08);
      border: 1px solid rgba(22,163,74,.15);
      padding: 5px 14px;
      border-radius: 26px 90px 26px 90px;
      transition: background 0.2s;
    }
    .spc-gw-pill:hover {
      background: rgba(22,163,74,.14);
    }
    .spc-gw-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1.15;
      color: #052e16;
      margin: 0 0 14px 0;
    }
    .spc-gw-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #16a34a;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-gw-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-gw-hero-desc {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 470px;
    }

    /* Package Strip */
    .spc-gw-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 24px;
    }
    .spc-gw-pkg-card {
      flex: 1;
      background: rgba(22,163,74,.06);
      border: 1px solid rgba(22,163,74,.12);
      border-radius: 26px 90px 26px 90px;
      padding: 14px 16px;
      text-align: center;
      transition: background 0.2s, box-shadow 0.2s;
    }
    .spc-gw-pkg-card:hover {
      background: rgba(22,163,74,.12);
      box-shadow: 0 4px 16px rgba(22,163,74,.10);
    }
    .spc-gw-pkg-name {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 0.82rem;
      color: #052e16;
    }
    .spc-gw-pkg-tier {
      font-size: 0.7rem;
      color: #16a34a;
      margin-top: 2px;
      font-weight: 500;
    }

    /* CTA Buttons */
    .spc-gw-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-gw-btn-primary {
      display: inline-block;
      background: #16a34a;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #16a34a;
      border-radius: 26px 90px 26px 90px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-gw-btn-primary:hover {
      background: transparent;
      color: #16a34a;
    }
    .spc-gw-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #052e16;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid rgba(22,163,74,.2);
      border-radius: 26px 90px 26px 90px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .spc-gw-btn-ghost:hover {
      border-color: #16a34a;
    }

    /* Hero Image */
    .spc-gw-hero-card {
      position: relative;
      border-radius: 26px 90px 26px 90px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(22,163,74,.10);
    }
    .spc-gw-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .spc-gw-hero-img:hover {
      transform: scale(1.02);
    }

    /* ── Main Grid ── */
    .spc-gw-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gw-panel {
      background: rgba(22,163,74,.06);
      border: 1px solid rgba(22,163,74,.12);
      border-radius: 26px 90px 26px 90px;
      padding: 36px 28px;
    }
    .spc-gw-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #052e16;
      margin: 0 0 18px 0;
    }
    .spc-gw-services-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-gw-service-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      color: #1e293b;
      font-weight: 500;
    }
    .spc-gw-service-star {
      color: #16a34a;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .spc-gw-cred-badges {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-gw-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(22,163,74,.12);
      border-radius: 26px 90px 26px 90px;
      padding: 16px 20px;
      transition: box-shadow 0.2s;
    }
    .spc-gw-cred-badge:hover {
      box-shadow: 0 4px 16px rgba(22,163,74,.10);
    }
    .spc-gw-cred-icon {
      width: 32px;
      height: 32px;
      background: #16a34a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-gw-cred-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #052e16;
    }

    /* ── Info Grid ── */
    .spc-gw-info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gw-info-card {
      background: rgba(22,163,74,.06);
      border: 1px solid rgba(22,163,74,.12);
      border-radius: 26px 90px 26px 90px;
      padding: 30px 24px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .spc-gw-info-card:hover {
      box-shadow: 0 8px 28px rgba(22,163,74,.10);
      transform: translateY(-2px);
    }
    .spc-gw-info-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #052e16;
      margin: 0 0 10px 0;
    }
    .spc-gw-info-card p {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.65;
      margin: 0;
    }
    .spc-gw-price-label {
      display: inline-block;
      margin-top: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.9rem;
      color: #16a34a;
    }

    /* ── Lower Grid ── */
    .spc-gw-lower-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gw-form-panel {
      background: rgba(22,163,74,.06);
      border: 1px solid rgba(22,163,74,.12);
      border-radius: 26px 90px 26px 90px;
      padding: 36px 28px;
    }
    .spc-gw-form-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #052e16;
      margin: 0 0 20px 0;
    }
    .spc-gw-form-field {
      width: 100%;
      background: rgba(255,255,255,.8);
      border: 1px solid rgba(22,163,74,.15);
      border-radius: 10px;
      padding: 12px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #1e293b;
      margin-bottom: 12px;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .spc-gw-form-field:hover {
      border-color: rgba(22,163,74,.35);
    }
    .spc-gw-form-field.spc-gw-textarea {
      min-height: 100px;
      resize: vertical;
    }
    .spc-gw-form-submit {
      display: inline-block;
      background: #16a34a;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 11px 24px;
      border: none;
      border-radius: 26px 90px 26px 90px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.2s;
    }
    .spc-gw-form-submit:hover {
      background: #15803d;
    }
    .spc-gw-testimonial {
      background: #16a34a;
      border-radius: 26px 90px 26px 90px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-gw-testimonial-quote {
      font-size: 1.15rem;
      color: #fff;
      font-style: italic;
      line-height: 1.7;
      margin-bottom: 18px;
    }
    .spc-gw-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,.8);
    }

    /* ── Gallery ── */
    .spc-gw-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gw-gallery-img {
      width: 100%;
      height: 100%;
      min-height: 200px;
      object-fit: cover;
      border-radius: 26px 90px 26px 90px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-gw-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(22,163,74,.12);
    }
    .spc-gw-gallery-span2 {
      grid-row: 1 / 3;
    }
    .spc-gw-gallery-span2 .spc-gw-gallery-img {
      min-height: 420px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-gw-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px;
      }
      .spc-gw-main-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gw-info-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gw-lower-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gw-gallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        padding: 0 24px 40px;
      }
      .spc-gw-gallery-span2 {
        grid-row: auto;
      }
      .spc-gw-gallery-span2 .spc-gw-gallery-img {
        min-height: 200px;
      }
      .spc-gw-services-list {
        grid-template-columns: 1fr;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-gw-nav {
        padding: 14px 16px;
      }
      .spc-gw-nav-links { display: none; }
      .spc-gw-hero {
        padding: 28px 16px;
      }
      .spc-gw-hero h2 {
        font-size: 1.75rem;
      }
      .spc-gw-pkg-strip {
        flex-direction: column;
      }
      .spc-gw-btn-row {
        flex-direction: column;
      }
      .spc-gw-btn-primary,
      .spc-gw-btn-ghost {
        text-align: center;
        width: 100%;
      }
      .spc-gw-main-grid {
        padding: 0 16px 28px;
      }
      .spc-gw-info-grid {
        padding: 0 16px 28px;
      }
      .spc-gw-lower-grid {
        padding: 0 16px 28px;
      }
      .spc-gw-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .spc-gw-gallery-span2 .spc-gw-gallery-img,
      .spc-gw-gallery-img {
        min-height: 200px;
        height: 220px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-gw-root">
        {/* ── Nav ── */}
        <nav className="spc-gw-nav">
          <div className="spc-gw-brand">
            <div className="spc-gw-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-gw-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-gw-hero">
          <div className="spc-gw-hero-copy">
            <div className="spc-gw-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-gw-pill">{s}</span>
              ))}
            </div>
            <h2>
              Grant proposals built with strategy, evidence, and funder fit.
              {verified && (
                <span className="spc-gw-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-gw-hero-desc">{tagline}</p>

            <div className="spc-gw-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-gw-pkg-card">
                  <div className="spc-gw-pkg-name">{pkg}</div>
                  <div className="spc-gw-pkg-tier">Tier {i + 1}</div>
                </div>
              ))}
            </div>

            <div className="spc-gw-btn-row">
              <button className="spc-gw-btn-primary" onClick={onHire}>Book Consultation</button>
              <button className="spc-gw-btn-ghost">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="spc-gw-hero-card">
              <img
                className="spc-gw-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="spc-gw-main-grid">
          <div className="spc-gw-panel">
            <h3>Services</h3>
            <div className="spc-gw-services-list">
              {services.map((svc, i) => (
                <div key={i} className="spc-gw-service-item">
                  <span className="spc-gw-service-star">★</span>
                  {svc}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-gw-panel">
            <h3>Credentials</h3>
            <div className="spc-gw-cred-badges">
              {credentials.map((cred, i) => (
                <div key={i} className="spc-gw-cred-badge">
                  <div className="spc-gw-cred-icon">✓</div>
                  <div className="spc-gw-cred-label">{cred}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="spc-gw-info-grid">
          <div className="spc-gw-info-card">
            <h4>Methodology</h4>
            <p>
              Every proposal begins with a thorough landscape scan, aligning your
              mission with funder priorities through evidence-based narratives and
              measurable outcomes. {serviceArea && <>Serving {serviceArea}.</>}
            </p>
          </div>
          <div className="spc-gw-info-card">
            <h4>Consultation Fit</h4>
            <p>
              {bio || "We work best with mission-driven organizations ready to invest in a strategic, data-backed approach to grant acquisition and reporting."}
            </p>
          </div>
          <div className="spc-gw-info-card">
            <h4>Packages</h4>
            <p>
              Flexible engagement tiers from one-time reviews to ongoing annual
              retainers. Every package includes funder research and narrative
              development.
            </p>
            {priceLabel && (
              <span className="spc-gw-price-label">{priceLabel}</span>
            )}
          </div>
        </div>

        {/* ── Lower Grid ── */}
        <div className="spc-gw-lower-grid">
          <div className="spc-gw-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-gw-form-field">Your name</div>
            <div className="spc-gw-form-field">Email address</div>
            <div className="spc-gw-form-field spc-gw-textarea">Tell us about your project or grant needs...</div>
            <div className="spc-gw-form-submit">Send Message</div>
          </div>
          <div className="spc-gw-testimonial">
            <div className="spc-gw-testimonial-quote">
              "The proposal finally captured our mission in language funders could act on."
            </div>
            <div className="spc-gw-testimonial-author">— Verified Client</div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-gw-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={i === 0 ? "spc-gw-gallery-span2" : ""}
              >
                <img
                  className="spc-gw-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  onClick={() => onPhotoClick(i + 1)}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
