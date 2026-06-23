// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyGenealogist(props: TemplateProps) {
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
    const id = "font-spc-gn";
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
    "Family tree research",
    "Immigration records",
    "DNA clue review",
    "Archive searches",
    "Lineage reports",
    "Heirloom summaries",
  ];

  const credentials = [
    "Certified genealogist",
    "Archive-trained researcher",
    "DNA analysis certified",
  ];

  const packageCards = ["Starter Search", "Deep Ancestry", "Full Lineage"];

  const css = `
    .spc-gn-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#faf7ef,#fff 48%,#f3e8d6);
      color: #3f2d1e;
      min-height: 100vh;
      line-height: 1.6;
      overflow-x: hidden;
    }
    .spc-gn-root * {
      box-sizing: border-box;
    }

    /* ── Nav ── */
    .spc-gn-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 36px;
      border-bottom: 1px solid rgba(146,64,14,.1);
    }
    .spc-gn-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1c1208;
    }
    .spc-gn-brand-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #92400e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .spc-gn-nav-links {
      display: flex;
      gap: 28px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-gn-nav-links span {
      cursor: pointer;
      color: #6b5744;
      transition: color 0.2s;
    }
    .spc-gn-nav-links span:hover {
      color: #1c1208;
    }

    /* ── Hero ── */
    .spc-gn-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      padding: 52px 36px 48px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .spc-gn-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-gn-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;
    }
    .spc-gn-pill {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.3px;
      color: #92400e;
      background: rgba(146,64,14,.08);
      border: 1px solid rgba(146,64,14,.15);
      padding: 5px 14px;
      border-radius: 44px;
    }
    .spc-gn-hero h2 {
      font-family: 'Libre Baskerville', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 700;
      line-height: 1.18;
      color: #1c1208;
      margin: 0 0 10px 0;
    }
    .spc-gn-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #92400e;
      margin-left: 10px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-gn-verified svg {
      width: 14px;
      height: 14px;
    }
    .spc-gn-hero-desc {
      font-size: 0.95rem;
      color: #6b5744;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }

    /* Package Strip */
    .spc-gn-pkg-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .spc-gn-pkg-card {
      background: rgba(146,64,14,.06);
      border: 1px solid rgba(146,64,14,.12);
      border-radius: 44px;
      padding: 16px 14px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-gn-pkg-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(146,64,14,.1);
    }
    .spc-gn-pkg-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: #1c1208;
    }
    .spc-gn-pkg-sub {
      font-size: 0.68rem;
      color: #92400e;
      margin-top: 2px;
    }

    /* CTA */
    .spc-gn-btn-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }
    .spc-gn-btn-primary {
      display: inline-block;
      background: #92400e;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid #92400e;
      border-radius: 44px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.15s;
    }
    .spc-gn-btn-primary:hover {
      background: transparent;
      color: #92400e;
      transform: translateY(-1px);
    }
    .spc-gn-btn-secondary {
      display: inline-block;
      background: transparent;
      color: #3f2d1e;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid rgba(146,64,14,.18);
      border-radius: 44px;
      cursor: pointer;
      transition: border-color 0.2s, transform 0.15s;
    }
    .spc-gn-btn-secondary:hover {
      border-color: #92400e;
      transform: translateY(-1px);
    }

    /* Hero Image */
    .spc-gn-hero-img-wrap {
      position: relative;
      border-radius: 44px;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(146,64,14,.12);
      cursor: pointer;
      transition: transform 0.3s;
    }
    .spc-gn-hero-img-wrap:hover {
      transform: scale(1.015);
    }
    .spc-gn-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
    }

    /* ── Main Grid ── */
    .spc-gn-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gn-panel {
      background: rgba(146,64,14,.06);
      border: 1px solid rgba(146,64,14,.12);
      border-radius: 44px;
      padding: 32px 28px;
    }
    .spc-gn-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #1c1208;
      margin: 0 0 18px 0;
    }
    .spc-gn-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .spc-gn-svc-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.88rem;
      color: #3f2d1e;
      font-weight: 500;
    }
    .spc-gn-svc-star {
      color: #92400e;
      font-size: 0.78rem;
      flex-shrink: 0;
    }
    .spc-gn-cred-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .spc-gn-cred-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(146,64,14,.06);
      border: 1px solid rgba(146,64,14,.12);
      border-radius: 44px;
      padding: 14px 18px;
      transition: transform 0.2s;
    }
    .spc-gn-cred-badge:hover {
      transform: translateX(4px);
    }
    .spc-gn-cred-check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #92400e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.82rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-gn-cred-label {
      font-size: 0.88rem;
      font-weight: 600;
      color: #1c1208;
    }

    /* ── Info Grid ── */
    .spc-gn-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gn-info-card {
      background: rgba(146,64,14,.06);
      border: 1px solid rgba(146,64,14,.12);
      border-radius: 44px;
      padding: 28px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-gn-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(146,64,14,.08);
    }
    .spc-gn-info-card h4 {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1rem;
      color: #1c1208;
      margin: 0 0 8px 0;
    }
    .spc-gn-info-card p {
      font-size: 0.84rem;
      color: #6b5744;
      line-height: 1.65;
      margin: 0;
    }
    .spc-gn-info-price {
      font-size: 0.78rem;
      color: #92400e;
      font-weight: 700;
      margin-top: 8px;
    }

    /* ── Lower Grid ── */
    .spc-gn-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 36px 44px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gn-form-panel {
      background: rgba(146,64,14,.06);
      border: 1px solid rgba(146,64,14,.12);
      border-radius: 44px;
      padding: 32px 28px;
    }
    .spc-gn-form-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #1c1208;
      margin: 0 0 20px 0;
    }
    .spc-gn-input {
      width: 100%;
      background: #fff;
      border: 1px solid rgba(146,64,14,.15);
      border-radius: 44px;
      padding: 12px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #3f2d1e;
      margin-bottom: 12px;
      outline: none;
      transition: border-color 0.2s;
    }
    .spc-gn-input:focus {
      border-color: #92400e;
    }
    .spc-gn-textarea {
      width: 100%;
      background: #fff;
      border: 1px solid rgba(146,64,14,.15);
      border-radius: 44px;
      padding: 12px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: #3f2d1e;
      margin-bottom: 16px;
      outline: none;
      resize: vertical;
      min-height: 90px;
      transition: border-color 0.2s;
    }
    .spc-gn-textarea:focus {
      border-color: #92400e;
    }
    .spc-gn-form-btn {
      display: inline-block;
      background: #92400e;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 12px 28px;
      border: none;
      border-radius: 44px;
      cursor: pointer;
      transition: opacity 0.2s, transform 0.15s;
    }
    .spc-gn-form-btn:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }
    .spc-gn-testimonial {
      background: #92400e;
      border-radius: 44px;
      padding: 36px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-gn-testimonial-quote {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 400;
      font-style: italic;
      color: #fff;
      line-height: 1.7;
      margin: 0 0 20px 0;
    }
    .spc-gn-testimonial-attr {
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255,255,255,.7);
    }

    /* ── Gallery ── */
    .spc-gn-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      padding: 0 36px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-gn-gallery-item {
      border-radius: 44px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .spc-gn-gallery-item:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 32px rgba(146,64,14,.14);
    }
    .spc-gn-gallery-item:first-child {
      grid-row: 1 / 3;
    }
    .spc-gn-gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-gn-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-gn-hero h2 {
        font-size: 1.9rem;
      }
      .spc-gn-pkg-strip {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .spc-gn-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gn-info {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gn-lower {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-gn-gallery {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 0 24px 40px;
      }
      .spc-gn-gallery-item:first-child {
        grid-row: auto;
      }
      .spc-gn-gallery-item img {
        height: 260px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-gn-nav {
        padding: 14px 16px;
      }
      .spc-gn-nav-links {
        display: none;
      }
      .spc-gn-hero {
        padding: 28px 16px 28px;
      }
      .spc-gn-hero h2 {
        font-size: 1.55rem;
      }
      .spc-gn-hero-desc {
        font-size: 0.88rem;
      }
      .spc-gn-pkg-strip {
        grid-template-columns: 1fr;
      }
      .spc-gn-btn-row {
        flex-direction: column;
      }
      .spc-gn-btn-primary,
      .spc-gn-btn-secondary {
        text-align: center;
        width: 100%;
      }
      .spc-gn-main {
        padding: 0 16px 28px;
      }
      .spc-gn-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-gn-info {
        padding: 0 16px 28px;
      }
      .spc-gn-lower {
        padding: 0 16px 28px;
      }
      .spc-gn-gallery {
        padding: 0 16px 36px;
      }
      .spc-gn-gallery-item img {
        height: 220px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-gn-root">
        {/* ── Nav ── */}
        <nav className="spc-gn-nav">
          <div className="spc-gn-brand">
            <div className="spc-gn-brand-circle">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-gn-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-gn-hero">
          <div className="spc-gn-hero-left">
            <div className="spc-gn-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-gn-pill">{s}</span>
              ))}
            </div>
            <h2>
              {name}
              {verified && (
                <span className="spc-gn-verified">
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
            <p className="spc-gn-hero-desc">
              Find the names, places, and stories behind your family tree.
              {tagline ? ` ${tagline}` : ""}
            </p>

            <div className="spc-gn-pkg-strip">
              {packageCards.map((label, i) => (
                <div key={i} className="spc-gn-pkg-card">
                  <div className="spc-gn-pkg-label">{label}</div>
                  <div className="spc-gn-pkg-sub">
                    {i === 0 ? "Basic report" : i === 1 ? "Extended tree" : "Complete history"}
                  </div>
                </div>
              ))}
            </div>

            <div className="spc-gn-btn-row">
              <button className="spc-gn-btn-primary" onClick={onHire}>
                Book Consultation
              </button>
              <button className="spc-gn-btn-secondary">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div
              className="spc-gn-hero-img-wrap"
              onClick={() => onPhotoClick(0)}
            >
              <img
                className="spc-gn-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="spc-gn-main">
          <div className="spc-gn-panel">
            <h3>Services</h3>
            <div className="spc-gn-svc-grid">
              {services.map((s, i) => (
                <div key={i} className="spc-gn-svc-item">
                  <span className="spc-gn-svc-star">&#9733;</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-gn-panel">
            <h3>Credentials</h3>
            <div className="spc-gn-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="spc-gn-cred-badge">
                  <div className="spc-gn-cred-check">&#10003;</div>
                  <span className="spc-gn-cred-label">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="spc-gn-info">
          <div className="spc-gn-info-card">
            <h4>Approach</h4>
            <p>
              {bio || "Methodical research combining primary documents, oral history, DNA analysis, and archival discovery to build a verified family narrative."}
            </p>
          </div>
          <div className="spc-gn-info-card">
            <h4>Consultation Fit</h4>
            <p>
              Serving {serviceArea || "your area"}. Every project begins with a
              discovery call to understand your family goals and known history.
            </p>
          </div>
          <div className="spc-gn-info-card">
            <h4>Packages</h4>
            <p>
              Tiered research packages from quick searches to full lineage
              reports spanning multiple generations.
            </p>
            {priceLabel && (
              <div className="spc-gn-info-price">{priceLabel}</div>
            )}
          </div>
        </div>

        {/* ── Lower Grid ── */}
        <div className="spc-gn-lower">
          <div className="spc-gn-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-gn-input" role="textbox" tabIndex={0}>
              Your name
            </div>
            <div className="spc-gn-input" role="textbox" tabIndex={0}>
              Email address
            </div>
            <div className="spc-gn-textarea" role="textbox" tabIndex={0}>
              Tell us about your family research goals...
            </div>
            <div className="spc-gn-form-btn">Submit Request</div>
          </div>
          <div className="spc-gn-testimonial">
            <p className="spc-gn-testimonial-quote">
              &ldquo;The report gave our family names, dates, places, and
              stories we had never known.&rdquo;
            </p>
            <span className="spc-gn-testimonial-attr">
              &mdash; Verified Client
            </span>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-gn-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="spc-gn-gallery-item"
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
