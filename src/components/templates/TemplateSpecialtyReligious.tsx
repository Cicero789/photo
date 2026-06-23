// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSpecialtyReligious(props: TemplateProps) {
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
    const id = "font-spc-rl";
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
    "Grief support",
    "Premarital counseling",
    "Family guidance",
    "Spiritual direction",
    "Crisis care",
    "Community referrals",
  ];

  const credentials = [
    "Ordained minister",
    "CPE-certified chaplain",
    "Pastoral counseling credential",
  ];

  const packageStrip = ["Initial Meeting", "Pastoral Series", "Ongoing Support"];

  const css = `
    .spc-rl-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg,#fff7ed,#fff 48%,#fef3c7);
      color: #1c1208;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .spc-rl-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(180,83,9,.12);
    }
    .spc-rl-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1c1208;
    }
    .spc-rl-brand-dot {
      width: 34px;
      height: 34px;
      background: #b45309;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .spc-rl-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .spc-rl-nav-links span {
      cursor: pointer;
      color: #6b5744;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .spc-rl-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .spc-rl-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rl-hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-rl-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .spc-rl-pill {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #92400e;
      background: rgba(180,83,9,.08);
      border: 1px solid rgba(180,83,9,.15);
      padding: 5px 14px;
      border-radius: 44px;
    }
    .spc-rl-hero h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.15;
      color: #1c1208;
      margin: 0 0 8px 0;
    }
    .spc-rl-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #b45309;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .spc-rl-verified svg {
      width: 13px;
      height: 13px;
    }
    .spc-rl-hero-heading-sub {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #92400e;
      margin: 0 0 14px 0;
      font-style: italic;
    }
    .spc-rl-hero-desc {
      font-size: 0.92rem;
      color: #6b5744;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 460px;
    }

    /* Package Strip */
    .spc-rl-pkg-strip {
      display: flex;
      gap: 10px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .spc-rl-pkg-card {
      flex: 1;
      min-width: 110px;
      background: rgba(180,83,9,.06);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 44px;
      padding: 14px 16px;
      text-align: center;
      transition: background 0.2s, transform 0.2s;
    }
    .spc-rl-pkg-card:hover {
      background: rgba(180,83,9,.12);
      transform: translateY(-2px);
    }
    .spc-rl-pkg-name {
      font-size: 0.78rem;
      font-weight: 600;
      color: #1c1208;
    }
    .spc-rl-pkg-tier {
      font-size: 0.68rem;
      color: #92400e;
      margin-top: 2px;
    }

    /* CTA Buttons */
    .spc-rl-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .spc-rl-btn-primary {
      display: inline-block;
      background: #b45309;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 13px 30px;
      border: 2px solid #b45309;
      border-radius: 44px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .spc-rl-btn-primary:hover {
      background: transparent;
      color: #b45309;
    }
    .spc-rl-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #1c1208;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 13px 30px;
      border: 2px solid rgba(180,83,9,.2);
      border-radius: 44px;
      cursor: pointer;
      transition: border-color 0.2s, color 0.2s;
    }
    .spc-rl-btn-ghost:hover {
      border-color: #b45309;
      color: #b45309;
    }

    /* Hero Image */
    .spc-rl-hero-right {
      position: relative;
      border-radius: 44px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(28,18,8,.12);
    }
    .spc-rl-hero-img {
      width: 100%;
      height: 100%;
      min-height: 400px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.35s;
    }
    .spc-rl-hero-img:hover {
      transform: scale(1.03);
    }

    /* ── Main Grid (Services + Credentials) ── */
    .spc-rl-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rl-panel {
      background: rgba(180,83,9,.06);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 44px;
      padding: 36px 28px;
    }
    .spc-rl-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1c1208;
      margin: 0 0 20px 0;
    }
    .spc-rl-svc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 20px;
    }
    .spc-rl-svc-item {
      font-size: 0.88rem;
      color: #6b5744;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .spc-rl-svc-star {
      color: #b45309;
      font-size: 0.85rem;
      flex-shrink: 0;
    }
    .spc-rl-cred-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .spc-rl-cred-badge {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(180,83,9,.06);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 44px;
      padding: 16px 20px;
      transition: background 0.2s;
    }
    .spc-rl-cred-badge:hover {
      background: rgba(180,83,9,.12);
    }
    .spc-rl-cred-icon {
      width: 32px;
      height: 32px;
      background: #b45309;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 0.9rem;
      font-weight: 700;
      flex-shrink: 0;
    }
    .spc-rl-cred-label {
      font-size: 0.88rem;
      font-weight: 500;
      color: #6b5744;
    }

    /* ── Info Grid (3 cards) ── */
    .spc-rl-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rl-info-card {
      background: rgba(180,83,9,.06);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 44px;
      padding: 32px 24px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .spc-rl-info-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(28,18,8,.08);
    }
    .spc-rl-info-label {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #b45309;
      margin-bottom: 10px;
    }
    .spc-rl-info-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #1c1208;
      margin-bottom: 8px;
    }
    .spc-rl-info-desc {
      font-size: 0.84rem;
      color: #92400e;
      line-height: 1.6;
    }

    /* ── Lower Grid (Form + Testimonial) ── */
    .spc-rl-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rl-form-panel {
      background: rgba(180,83,9,.06);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 44px;
      padding: 36px 28px;
    }
    .spc-rl-form-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #1c1208;
      margin: 0 0 20px 0;
    }
    .spc-rl-form-field {
      width: 100%;
      background: rgba(180,83,9,.04);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 14px;
      color: #92400e;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      box-sizing: border-box;
    }
    .spc-rl-form-textarea {
      width: 100%;
      background: rgba(180,83,9,.04);
      border: 1px solid rgba(180,83,9,.12);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 16px;
      color: #92400e;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      min-height: 90px;
      box-sizing: border-box;
      resize: vertical;
    }
    .spc-rl-form-submit {
      display: inline-block;
      background: #b45309;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      padding: 12px 28px;
      border: none;
      border-radius: 44px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .spc-rl-form-submit:hover {
      opacity: 0.85;
    }
    .spc-rl-testimonial-panel {
      background: rgba(180,83,9,.1);
      border: 1px solid rgba(180,83,9,.2);
      border-radius: 44px;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .spc-rl-testimonial-quote {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1c1208;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 20px;
    }
    .spc-rl-testimonial-author {
      font-size: 0.85rem;
      font-weight: 600;
      color: #b45309;
    }

    /* ── Gallery (asymmetric) ── */
    .spc-rl-gallery {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .spc-rl-gallery-img {
      width: 100%;
      object-fit: cover;
      border-radius: 44px;
      cursor: pointer;
      transition: transform 0.25s, box-shadow 0.25s;
    }
    .spc-rl-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 12px 32px rgba(28,18,8,.1);
    }
    .spc-rl-gallery-img:first-child {
      grid-row: 1 / 3;
      height: 100%;
      min-height: 380px;
    }
    .spc-rl-gallery-img:nth-child(2) {
      height: 220px;
    }
    .spc-rl-gallery-img:nth-child(3) {
      height: 220px;
    }

    /* ── Location strip ── */
    .spc-rl-area {
      font-size: 0.8rem;
      color: #92400e;
      margin-bottom: 18px;
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .spc-rl-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .spc-rl-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rl-info {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rl-lower {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .spc-rl-gallery {
        grid-template-columns: 1fr;
        padding: 0 24px 40px;
      }
      .spc-rl-gallery-img:first-child {
        grid-row: auto;
        min-height: 260px;
      }
      .spc-rl-gallery-img:nth-child(2),
      .spc-rl-gallery-img:nth-child(3) {
        height: 240px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .spc-rl-nav {
        padding: 14px 16px;
      }
      .spc-rl-nav-links { display: none; }
      .spc-rl-hero {
        padding: 28px 16px 28px;
      }
      .spc-rl-hero h2 {
        font-size: 1.85rem;
      }
      .spc-rl-svc-grid {
        grid-template-columns: 1fr;
      }
      .spc-rl-pkg-strip {
        flex-direction: column;
      }
      .spc-rl-main {
        padding: 0 16px 28px;
      }
      .spc-rl-info {
        padding: 0 16px 28px;
      }
      .spc-rl-lower {
        padding: 0 16px 28px;
      }
      .spc-rl-gallery {
        padding: 0 16px 36px;
      }
      .spc-rl-gallery-img:first-child {
        min-height: 220px;
      }
      .spc-rl-gallery-img:nth-child(2),
      .spc-rl-gallery-img:nth-child(3) {
        height: 200px;
      }
      .spc-rl-btn-row {
        flex-direction: column;
      }
      .spc-rl-btn-primary,
      .spc-rl-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="spc-rl-root">
        {/* ── Nav ── */}
        <nav className="spc-rl-nav">
          <div className="spc-rl-brand">
            <div className="spc-rl-brand-dot">{name.charAt(0)}</div>
            {name}
          </div>
          <div className="spc-rl-nav-links">
            <span>Services</span>
            <span>Credentials</span>
            <span>Approach</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="spc-rl-hero">
          <div className="spc-rl-hero-left">
            <div className="spc-rl-pills">
              {specialties.map((s, i) => (
                <span key={i} className="spc-rl-pill">{s}</span>
              ))}
            </div>
            <h2>
              {name}
              {verified && (
                <span className="spc-rl-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="spc-rl-hero-heading-sub">
              Faith-informed support for seasons of grief, conflict, and change.
            </p>
            <p className="spc-rl-hero-desc">{tagline}</p>
            <span className="spc-rl-area">{serviceArea}</span>

            <div className="spc-rl-pkg-strip">
              {packageStrip.map((pkg, i) => (
                <div key={i} className="spc-rl-pkg-card">
                  <div className="spc-rl-pkg-name">{pkg}</div>
                  <div className="spc-rl-pkg-tier">Tier {i + 1}</div>
                </div>
              ))}
            </div>

            <div className="spc-rl-btn-row">
              <button className="spc-rl-btn-primary" onClick={onHire}>Book Consultation</button>
              <button className="spc-rl-btn-ghost">View Work</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="spc-rl-hero-right">
              <img
                className="spc-rl-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Main Grid (Services + Credentials) ── */}
        <div className="spc-rl-main">
          <div className="spc-rl-panel">
            <h3>Services</h3>
            <div className="spc-rl-svc-grid">
              {services.map((svc, i) => (
                <div key={i} className="spc-rl-svc-item">
                  <span className="spc-rl-svc-star">★</span>
                  {svc}
                </div>
              ))}
            </div>
          </div>
          <div className="spc-rl-panel">
            <h3>Credentials</h3>
            <div className="spc-rl-cred-list">
              {credentials.map((cred, i) => (
                <div key={i} className="spc-rl-cred-badge">
                  <div className="spc-rl-cred-icon">✓</div>
                  <span className="spc-rl-cred-label">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Info Grid (3 cards) ── */}
        <div className="spc-rl-info">
          <div className="spc-rl-info-card">
            <div className="spc-rl-info-label">Approach</div>
            <div className="spc-rl-info-title">Methodology</div>
            <div className="spc-rl-info-desc">
              {bio || "A compassionate, faith-informed approach grounded in pastoral wisdom and professional care for every season of life."}
            </div>
          </div>
          <div className="spc-rl-info-card">
            <div className="spc-rl-info-label">Fit</div>
            <div className="spc-rl-info-title">Consultation Fit</div>
            <div className="spc-rl-info-desc">
              Whether you are grieving, preparing for marriage, or seeking spiritual clarity, this practice meets you with care and without judgment.
            </div>
          </div>
          <div className="spc-rl-info-card">
            <div className="spc-rl-info-label">Investment</div>
            <div className="spc-rl-info-title">Packages</div>
            <div className="spc-rl-info-desc">
              {priceLabel || "Flexible pastoral care packages designed for individuals, couples, and families at every stage of faith and life."}
            </div>
          </div>
        </div>

        {/* ── Lower Grid (Form + Testimonial) ── */}
        <div className="spc-rl-lower">
          <div className="spc-rl-form-panel">
            <h3>Request a Consultation</h3>
            <div className="spc-rl-form-field">Your Name</div>
            <div className="spc-rl-form-field">Email Address</div>
            <div className="spc-rl-form-textarea">Share what brings you here...</div>
            <div className="spc-rl-form-submit">Send Request</div>
          </div>
          <div className="spc-rl-testimonial-panel">
            <div className="spc-rl-testimonial-quote">
              &ldquo;The guidance was compassionate, wise, and never rushed.&rdquo;
            </div>
            <div className="spc-rl-testimonial-author">&mdash; Verified Client</div>
          </div>
        </div>

        {/* ── Gallery (asymmetric) ── */}
        {galleryPhotos.length > 0 && (
          <div className="spc-rl-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="spc-rl-gallery-img"
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
