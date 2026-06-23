// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyResearcher(props: TemplateProps) {
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
    const id = "font-spc-rs";
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
    "Literature reviews",
    "Desk research",
    "Interview synthesis",
    "Evidence briefs",
    "Citation checks",
    "Methodology consulting",
  ];

  const credentials = [
    "Peer-reviewed researcher",
    "IRB-certified",
    "Published author",
  ];

  const packageStrip = ["Quick Brief", "Full Study", "Ongoing Research"];

  const css = `
    .spc-rs-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#fff,#f8fafc 48%,#e2e8f0);
      color: #1e293b;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-rs-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(71,85,105,.10);
    }
    .spc-rs-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
    }
    .spc-rs-brand-dot {
      width: 34px;
      height: 34px;
      background: #475569;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-rs-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-rs-nav-links span {
      cursor: pointer;
      color: #1e293b;
      opacity: 0.6;
      transition: opacity 0.2s;
    }
    .spc-rs-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-rs-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-rs-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-rs-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-rs-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #64748b;
      background: rgba(71,85,105,.08);
      border: 1px solid rgba(71,85,105,.15);
      padding: 5px 14px;
      border-radius: 28px;
      transition: background 0.2s;
    }
    .spc-rs-pill:hover {
      background: rgba(71,85,105,.14);
    }
    .spc-rs-hero h2 {
      font-family: 'Libre Baskerville', serif;
      font-size: 2.3rem;
      font-weight: 700;
      line-height: 1.2;
      color: #0f172a;
      margin: 0 0 14px 0;
    }
    .spc-rs-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #475569;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-rs-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-rs-hero-desc {
      font-size: 0.95rem;
      color: #475569;
      line-height: 1.7;
      margin-bottom: 22px;
      max-width: 470px;
    }

    /* Package Strip */
    .spc-rs-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 24px;
    }
    .spc-rs-pkg-card {
      flex: 1;
      background: rgba(71,85,105,.06);
      border: 1px solid rgba(71,85,105,.12);
      border-radius: 28px;
      padding: 14px 16px;
      text-align: center;
      transition: background 0.2s, box-shadow 0.2s;
    }
    .spc-rs-pkg-card:hover {
      background: rgba(71,85,105,.12);
      box-shadow: 0 4px 16px rgba(71,85,105,.10);
    }
    .spc-rs-pkg-name {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 0.82rem;
      color: #0f172a;
    }
    .spc-rs-pkg-tier {
      font-size: 0.7rem;
      color: #64748b;
      margin-top: 2px;
      font-weight: 500;
    }

    /* CTA Buttons */
    .spc-rs-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-rs-btn-primary {
      display: inline-block;
      background: #475569;
      color: #fff;
      font-family: 'Libre Baskerville', serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #475569;
      border-radius: 28px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-rs-btn-primary:hover {
      background: transparent;
      color: #475569;
    }
    .spc-rs-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #0f172a;
      font-family: 'Libre Baskerville', serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid rgba(71,85,105,.2);
      border-radius: 28px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .spc-rs-btn-ghost:hover {
      border-color: #475569;
    }

    /* Hero Image */
    .spc-rs-hero-card {
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(71,85,105,.10);
    }
    .spc-rs-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .spc-rs-hero-img:hover {
      transform: scale(1.02);
    }

    /* ── Main Grid ── */
    .spc-rs-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rs-panel {
      background: rgba(71,85,105,.06);
      border: 1px solid rgba(71,85,105,.12);
      border-radius: 28px;
      padding: 36px 28px;
    }
    .spc-rs-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 18px 0;
    }
    .spc-rs-services-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-rs-service-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      color: #1e293b;
      font-weight: 500;
    }
    .spc-rs-service-star {
      color: #64748b;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .spc-rs-cred-badges {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-rs-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(71,85,105,.12);
      border-radius: 28px;
      padding: 16px 20px;
      transition: box-shadow 0.2s;
    }
    .spc-rs-cred-badge:hover {
      box-shadow: 0 4px 16px rgba(71,85,105,.10);
    }
    .spc-rs-cred-icon {
      width: 32px;
      height: 32px;
      background: #475569;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-rs-cred-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #0f172a;
    }

    /* ── Info Grid ── */
    .spc-rs-info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rs-info-card {
      background: rgba(71,85,105,.06);
      border: 1px solid rgba(71,85,105,.12);
      border-radius: 28px;
      padding: 30px 24px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .spc-rs-info-card:hover {
      box-shadow: 0 8px 28px rgba(71,85,105,.10);
      transform: translateY(-2px);
    }
    .spc-rs-info-card h4 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px 0;
    }
    .spc-rs-info-card p {
      font-size: 0.85rem;
      color: #475569;
      line-height: 1.65;
      margin: 0;
    }
    .spc-rs-price-label {
      display: inline-block;
      margin-top: 10px;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 0.9rem;
      color: #475569;
    }

    /* ── Lower Grid ── */
    .spc-rs-lower-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rs-form-panel {
      background: rgba(71,85,105,.06);
      border: 1px solid rgba(71,85,105,.12);
      border-radius: 28px;
      padding: 36px 28px;
    }
    .spc-rs-form-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 20px 0;
    }
    .spc-rs-form-field {
      width: 100%;
      background: rgba(255,255,255,.8);
      border: 1px solid rgba(71,85,105,.15);
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
    .spc-rs-form-field:hover {
      border-color: rgba(71,85,105,.35);
    }
    .spc-rs-form-field.spc-rs-textarea {
      min-height: 100px;
      resize: vertical;
    }
    .spc-rs-form-submit {
      display: inline-block;
      background: #475569;
      color: #fff;
      font-family: 'Libre Baskerville', serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 11px 24px;
      border: none;
      border-radius: 28px;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.2s;
    }
    .spc-rs-form-submit:hover {
      background: #334155;
    }
    .spc-rs-testimonial {
      background: #475569;
      border-radius: 28px;
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-rs-testimonial-quote {
      font-size: 1.15rem;
      color: #fff;
      font-style: italic;
      line-height: 1.7;
      margin-bottom: 18px;
    }
    .spc-rs-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: rgba(255,255,255,.8);
    }

    /* ── Gallery ── */
    .spc-rs-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rs-gallery-img {
      width: 100%;
      height: 100%;
      min-height: 200px;
      object-fit: cover;
      border-radius: 28px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-rs-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(71,85,105,.12);
    }
    .spc-rs-gallery-span2 {
      grid-row: 1 / 3;
    }
    .spc-rs-gallery-span2 .spc-rs-gallery-img {
      min-height: 420px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-rs-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px;
      }
      .spc-rs-main-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rs-info-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rs-lower-grid {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rs-gallery {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        padding: 0 24px 40px;
      }
      .spc-rs-gallery-span2 {
        grid-row: auto;
      }
      .spc-rs-gallery-span2 .spc-rs-gallery-img {
        min-height: 200px;
      }
      .spc-rs-services-list {
        grid-template-columns: 1fr;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-rs-nav {
        padding: 14px 16px;
      }
      .spc-rs-nav-links { display: none; }
      .spc-rs-hero {
        padding: 28px 16px;
      }
      .spc-rs-hero h2 {
        font-size: 1.65rem;
      }
      .spc-rs-pkg-strip {
        flex-direction: column;
      }
      .spc-rs-btn-row {
        flex-direction: column;
      }
      .spc-rs-btn-primary,
      .spc-rs-btn-ghost {
        text-align: center;
        width: 100%;
      }
      .spc-rs-main-grid {
        padding: 0 16px 28px;
      }
      .spc-rs-info-grid {
        padding: 0 16px 28px;
      }
      .spc-rs-lower-grid {
        padding: 0 16px 28px;
      }
      .spc-rs-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .spc-rs-gallery-span2 .spc-rs-gallery-img,
      .spc-rs-gallery-img {
        min-height: 200px;
        height: 220px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-rs-root">
        {/* ── Nav ── */}
        <nav className="spc-rs-nav">
          <div className="spc-rs-brand">
            <div className="spc-rs-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-rs-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-rs-hero">
          <div className="spc-rs-hero-copy">
            <div className="spc-rs-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-rs-pill">{s}</span>
              ))}
            </div>
            <h2>
              Rigorous research support for complex questions and careful decisions.
              {verified && (
                <span className="spc-rs-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-rs-hero-desc">{tagline}</p>

            <div className="spc-rs-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-rs-pkg-card">
                  <div className="spc-rs-pkg-name">{pkg}</div>
                  <div className="spc-rs-pkg-tier">Tier {i + 1}</div>
                </div>
              ))}
            </div>

            <div className="spc-rs-btn-row">
              <button className="spc-rs-btn-primary" onClick={onHire}>Book Consultation</button>
              <button className="spc-rs-btn-ghost">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="spc-rs-hero-card">
              <img
                className="spc-rs-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="spc-rs-main-grid">
          <div className="spc-rs-panel">
            <h3>Services</h3>
            <div className="spc-rs-services-list">
              {services.map((svc, i) => (
                <div key={i} className="spc-rs-service-item">
                  <span className="spc-rs-service-star">★</span>
                  {svc}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-rs-panel">
            <h3>Credentials</h3>
            <div className="spc-rs-cred-badges">
              {credentials.map((cred, i) => (
                <div key={i} className="spc-rs-cred-badge">
                  <div className="spc-rs-cred-icon">✓</div>
                  <div className="spc-rs-cred-label">{cred}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="spc-rs-info-grid">
          <div className="spc-rs-info-card">
            <h4>Approach</h4>
            <p>
              Every engagement starts with a structured scoping session, mapping
              your questions to the right methods, sources, and frameworks for
              reliable answers. {serviceArea && <>Serving {serviceArea}.</>}
            </p>
          </div>
          <div className="spc-rs-info-card">
            <h4>Consultation Fit</h4>
            <p>
              {bio || "Best suited for teams that need evidence-based insights, whether for strategic decisions, policy work, or academic publication."}
            </p>
          </div>
          <div className="spc-rs-info-card">
            <h4>Packages</h4>
            <p>
              From quick desk-research briefs to full multi-method studies and
              ongoing research retainers. Every package includes source
              verification and clear deliverables.
            </p>
            {priceLabel && (
              <span className="spc-rs-price-label">{priceLabel}</span>
            )}
          </div>
        </div>

        {/* ── Lower Grid ── */}
        <div className="spc-rs-lower-grid">
          <div className="spc-rs-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-rs-form-field">Your name</div>
            <div className="spc-rs-form-field">Email address</div>
            <div className="spc-rs-form-field spc-rs-textarea">Describe the research question or project scope...</div>
            <div className="spc-rs-form-submit">Send Message</div>
          </div>
          <div className="spc-rs-testimonial">
            <div className="spc-rs-testimonial-quote">
              "The findings were organized, sourced, and immediately useful."
            </div>
            <div className="spc-rs-testimonial-author">— Verified Client</div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-rs-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={i === 0 ? "spc-rs-gallery-span2" : ""}
              >
                <img
                  className="spc-rs-gallery-img"
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
