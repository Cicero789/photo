// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtySpiritual(props: TemplateProps) {
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

  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  useEffect(() => {
    const id = "font-spc-sp";
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
    "Intuitive sessions",
    "Life transitions",
    "Spiritual coaching",
    "Ritual planning",
    "Energy reflection",
    "Monthly guidance",
  ];

  const credentials = [
    "Certified spiritual counselor",
    "Trauma-informed practitioner",
    "Continuing education",
  ];

  const packageStrip = ["Single Session", "Monthly Package", "Quarterly Journey"];

  const css = `
    .spc-sp-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#111827,#312e81 56%,#581c87);
      color: #f8fafc;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-sp-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(255,255,255,.12);
    }
    .spc-sp-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #fff;
    }
    .spc-sp-brand-dot {
      width: 34px;
      height: 34px;
      background: #c084fc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-sp-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-sp-nav-links span {
      cursor: pointer;
      color: #ede9fe;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .spc-sp-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-sp-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sp-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-sp-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-sp-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #c4b5fd;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      padding: 5px 14px;
      border-radius: 80px 28px 80px 28px;
    }
    .spc-sp-hero h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #fff;
      margin: 0 0 8px 0;
    }
    .spc-sp-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #c084fc;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-sp-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-sp-hero-heading-sub {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #c4b5fd;
      margin: 0 0 14px 0;
      font-style: italic;
    }
    .spc-sp-hero-desc {
      font-size: 0.92rem;
      color: #ede9fe;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 460px;
    }

    /* Package Strip */
    .spc-sp-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .spc-sp-pkg-card {
      flex: 1;
      min-width: 110px;
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 80px 28px 80px 28px;
      padding: 14px 16px;
      text-align: center;
      transition: background 0.2s, transform 0.2s;
    }
    .spc-sp-pkg-card:hover {
      background: rgba(255,255,255,.14);
      transform: translateY(-2px);
    }
    .spc-sp-pkg-name {
      font-size: 0.78rem;
      font-weight: 600;
      color: #fff;
    }
    .spc-sp-pkg-tier {
      font-size: 0.68rem;
      color: #c4b5fd;
      margin-top: 2px;
    }

    /* CTA Buttons */
    .spc-sp-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-sp-btn-primary {
      display: inline-block;
      background: #c084fc;
      color: #111827;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid #c084fc;
      border-radius: 80px 28px 80px 28px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-sp-btn-primary:hover {
      background: transparent;
      color: #c084fc;
    }
    .spc-sp-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #ede9fe;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 13px 30px;
      border: 2px solid rgba(255,255,255,.2);
      border-radius: 80px 28px 80px 28px;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .spc-sp-btn-ghost:hover {
      border-color: #c084fc;
      color: #fff;
    }

    /* Hero Image */
    .spc-sp-hero-right {
      position: relative;
      border-radius: 80px 28px 80px 28px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,.35);
    }
    .spc-sp-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.35s;
    }
    .spc-sp-hero-img:hover {
      transform: scale(1.03);
    }

    /* ── Main Grid (Services + Credentials) ── */
    .spc-sp-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sp-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 80px 28px 80px 28px;
      padding: 36px 28px;
    }
    .spc-sp-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-sp-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 20px;
    }
    .spc-sp-svc-item {
      font-size: 0.88rem;
      color: #ede9fe;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-sp-svc-star {
      color: #c084fc;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .spc-sp-cred-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-sp-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 80px 28px 80px 28px;
      padding: 16px 20px;
      transition: background 0.2s;
    }
    .spc-sp-cred-badge:hover {
      background: rgba(255,255,255,.12);
    }
    .spc-sp-cred-icon {
      width: 32px;
      height: 32px;
      background: #c084fc;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #111827;
      font-size: 0.9rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-sp-cred-label {
      font-size: 0.88rem;
      font-weight: 500;
      color: #ede9fe;
    }

    /* ── Info Grid (3 cards) ── */
    .spc-sp-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sp-info-card {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 80px 28px 80px 28px;
      padding: 32px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-sp-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,0,0,.2);
    }
    .spc-sp-info-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #c084fc;
      margin-bottom: 10px;
    }
    .spc-sp-info-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
      margin-bottom: 8px;
    }
    .spc-sp-info-desc {
      font-size: 0.84rem;
      color: #c4b5fd;
      line-height: 1.6;
    }

    /* ── Lower Grid (Form + Testimonial) ── */
    .spc-sp-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sp-form-panel {
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 80px 28px 80px 28px;
      padding: 36px 28px;
    }
    .spc-sp-form-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 20px 0;
    }
    .spc-sp-form-field {
      width: 100%;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      color: #c4b5fd;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      box-sizing: border-box;
    }
    .spc-sp-form-textarea {
      width: 100%;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 16px;
      color: #c4b5fd;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      min-height: 90px;
      box-sizing: border-box;
      resize: vertical;
    }
    .spc-sp-form-submit {
      display: inline-block;
      background: #c084fc;
      color: #111827;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 12px 28px;
      border: none;
      border-radius: 80px 28px 80px 28px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-sp-form-submit:hover {
      opacity: 0.85;
    }
    .spc-sp-testimonial-panel {
      background: rgba(192,132,252,.18);
      border: 1px solid rgba(192,132,252,.3);
      border-radius: 80px 28px 80px 28px;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-sp-testimonial-quote {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 20px;
    }
    .spc-sp-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: #c084fc;
    }

    /* ── Gallery (asymmetric) ── */
    .spc-sp-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-sp-gallery-img {
      width: 100%;
      object-fit: cover;
      border-radius: 80px 28px 80px 28px;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .spc-sp-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 32px rgba(0,0,0,.3);
    }
    .spc-sp-gallery-img:first-child {
      grid-row: 1 / 3;
      height: 100%;
      min-height: 380px;
    }
    .spc-sp-gallery-img:nth-child(2) {
      height: 220px;
    }
    .spc-sp-gallery-img:nth-child(3) {
      height: 220px;
    }

    /* ── Location strip ── */
    .spc-sp-area {
      font-size: 0.8rem;
      color: #c4b5fd;
      margin-bottom: 18px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-sp-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-sp-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sp-info {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sp-lower {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-sp-gallery {
        grid-template-columns: 1fr;
        padding: 0 24px 40px;
      }
      .spc-sp-gallery-img:first-child {
        grid-row: auto;
        min-height: 260px;
      }
      .spc-sp-gallery-img:nth-child(2),
      .spc-sp-gallery-img:nth-child(3) {
        height: 240px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-sp-nav {
        padding: 14px 16px;
      }
      .spc-sp-nav-links { display: none; }
      .spc-sp-hero {
        padding: 28px 16px 28px;
      }
      .spc-sp-hero h2 {
        font-size: 1.85rem;
      }
      .spc-sp-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-sp-pkg-strip {
        flex-direction: column;
      }
      .spc-sp-main {
        padding: 0 16px 28px;
      }
      .spc-sp-info {
        padding: 0 16px 28px;
      }
      .spc-sp-lower {
        padding: 0 16px 28px;
      }
      .spc-sp-gallery {
        padding: 0 16px 36px;
      }
      .spc-sp-gallery-img:first-child {
        min-height: 220px;
      }
      .spc-sp-gallery-img:nth-child(2),
      .spc-sp-gallery-img:nth-child(3) {
        height: 200px;
      }
      .spc-sp-btn-row {
        flex-direction: column;
      }
      .spc-sp-btn-primary,
      .spc-sp-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-sp-root">
        {/* ── Nav ── */}
        <nav className="spc-sp-nav">
          <div className="spc-sp-brand">
            <div className="spc-sp-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-sp-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-sp-hero">
          <div className="spc-sp-hero-left">
            <div className="spc-sp-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-sp-pill">{s}</span>
              ))}
            </div>
            <h2>
              {name}
              {verified && (
                <span className="spc-sp-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-sp-hero-heading-sub">
              Reflective spiritual guidance with grounded, professional care.
            </p>
            <p className="spc-sp-hero-desc">{tagline}</p>
            <span className="spc-sp-area">{serviceArea}</span>

            <div className="spc-sp-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-sp-pkg-card">
                  <div className="spc-sp-pkg-name">{pkg}</div>
                  <div className="spc-sp-pkg-tier">Tier {i + 1}</div>
                </div>
              ))}
            </div>

            <div className="spc-sp-btn-row">
              <button className="spc-sp-btn-primary" onClick={onHire}>Book Consultation</button>
              <button className="spc-sp-btn-ghost">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="spc-sp-hero-right">
              <img
                className="spc-sp-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid (Services + Credentials) ── */}
        <div className="spc-sp-main">
          <div className="spc-sp-panel">
            <h3>Services</h3>
            <div className="spc-sp-svc-grid">
              {services.map((svc, i) => (
                <div key={i} className="spc-sp-svc-item">
                  <span className="spc-sp-svc-star">★</span>
                  {svc}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-sp-panel">
            <h3>Credentials</h3>
            <div className="spc-sp-cred-list">
              {credentials.map((cred, i) => (
                <div key={i} className="spc-sp-cred-badge">
                  <div className="spc-sp-cred-icon">✓</div>
                  <span className="spc-sp-cred-label">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid (3 cards) ── */}
        <div className="spc-sp-info">
          <div className="spc-sp-info-card">
            <div className="spc-sp-info-label">Approach</div>
            <div className="spc-sp-info-title">Methodology</div>
            <div className="spc-sp-info-desc">
              {bio || "A reflective, client-centered approach that honors your unique journey and encourages clarity through grounded practice."}
            </div>
          </div>
          <div className="spc-sp-info-card">
            <div className="spc-sp-info-label">Fit</div>
            <div className="spc-sp-info-title">Consultation Fit</div>
            <div className="spc-sp-info-desc">
              Whether you are navigating change, seeking deeper alignment, or exploring new possibilities, this practice meets you where you are.
            </div>
          </div>
          <div className="spc-sp-info-card">
            <div className="spc-sp-info-label">Investment</div>
            <div className="spc-sp-info-title">Packages</div>
            <div className="spc-sp-info-desc">
              {priceLabel || "Flexible packages designed to support ongoing growth and reflection at every stage of your journey."}
            </div>
          </div>
        </div>

        {/* ── Lower Grid (Form + Testimonial) ── */}
        <div className="spc-sp-lower">
          <div className="spc-sp-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-sp-form-field">Your Name</div>
            <div className="spc-sp-form-field">Email Address</div>
            <div className="spc-sp-form-textarea">Tell us about what you're seeking...</div>
            <div className="spc-sp-form-submit">Send Request</div>
          </div>
          <div className="spc-sp-testimonial-panel">
            <div className="spc-sp-testimonial-quote">
              &ldquo;The session felt thoughtful, grounded, and emotionally clarifying.&rdquo;
            </div>
            <div className="spc-sp-testimonial-author">&mdash; Verified Client</div>
          </div>
        </div>

        {/* ── Gallery (asymmetric) ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-sp-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="spc-sp-gallery-img"
                src={photo.url}
                alt={photo.filename}
                onClick={() => onPhotoClick(i + 1)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
