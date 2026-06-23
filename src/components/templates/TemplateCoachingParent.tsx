import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingParent(props: TemplateProps) {
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
    const id = "font-tc-parent";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const kickers =
    specialties.length > 0
      ? specialties.slice(0, 3)
      : ["Gentle structure", "Family support", "Age-based programs"];

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const testimonials = [
    {
      quote:
        "The routines we built together changed our entire household energy.",
      author: "— Parent of three",
    },
    {
      quote:
        "I finally feel like I have tools instead of just reactions.",
      author: "— First-time mom",
    },
    {
      quote:
        "My kids are calmer, and honestly, so am I.",
      author: "— Father of twins",
    },
  ];

  const css = `
    .tc-parent-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 10% 10%, rgba(219,39,119,.10) 0%, transparent 50%),
        linear-gradient(160deg, #fff7f7 0%, #fef3c7 50%, #ecfeff 100%);
      color: #4a2f2f;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-parent-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(219,39,119,.12);
    }
    .tc-parent-brand-dot {
      width: 36px;
      height: 36px;
      background: #db2777;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .tc-parent-brand-name {
      font-weight: 600;
      font-size: 1rem;
      color: #4a2f2f;
    }
    .tc-parent-nav-links {
      margin-left: auto;
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      color: #7a5050;
    }
    .tc-parent-nav-links span {
      cursor: pointer;
      transition: color 0.2s;
    }
    .tc-parent-nav-links span:hover {
      color: #db2777;
    }

    /* ── Hero Grid ── */
    .tc-parent-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .tc-parent-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .tc-parent-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-parent-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #db2777;
      background: rgba(219,39,119,.08);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-parent-h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.6rem;
      font-weight: 700;
      line-height: 1.15;
      color: #4a2f2f;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tc-parent-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #db2777;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tc-parent-verified svg {
      width: 13px;
      height: 13px;
    }
    .tc-parent-desc {
      font-size: 0.95rem;
      color: #6b4444;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .tc-parent-location {
      font-size: 0.82rem;
      color: #9a7070;
      margin-bottom: 20px;
    }

    /* Age programs grid */
    .tc-parent-age-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .tc-parent-age-box {
      background: #fff;
      border-radius: 12px;
      padding: 18px 10px;
      text-align: center;
      font-weight: 900;
      font-size: 0.92rem;
      color: #4a2f2f;
      box-shadow: 0 2px 8px rgba(219,39,119,.06);
    }

    /* Buttons */
    .tc-parent-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-parent-btn-primary {
      background: #db2777;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #db2777;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-parent-btn-primary:hover {
      background: transparent;
      color: #db2777;
    }
    .tc-parent-btn-ghost {
      background: transparent;
      color: #db2777;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #db2777;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-parent-btn-ghost:hover {
      background: #db2777;
      color: #fff;
    }

    /* Hero card */
    .tc-parent-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(219,39,119,.10);
    }
    .tc-parent-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .tc-parent-hero-img:hover {
      transform: scale(1.02);
    }
    .tc-parent-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #4a2f2f;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    /* ── Section Grid ── */
    .tc-parent-sections {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 28px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-parent-panel {
      background: #fff;
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 2px 12px rgba(219,39,119,.05);
    }
    .tc-parent-panel-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #4a2f2f;
      margin: 0 0 16px 0;
    }
    .tc-parent-bio-text {
      font-size: 0.9rem;
      color: #6b4444;
      line-height: 1.75;
      margin-bottom: 20px;
    }
    .tc-parent-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .tc-parent-feature-list li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(219,39,119,.08);
      font-size: 0.88rem;
      color: #5a3a3a;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tc-parent-feature-list li::before {
      content: "✦";
      color: #db2777;
      font-size: 0.7rem;
    }
    .tc-parent-credentials {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tc-parent-credential-tag {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #db2777;
      background: rgba(219,39,119,.07);
      padding: 5px 12px;
      border-radius: 20px;
    }

    /* Pricing panel */
    .tc-parent-pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(219,39,119,.08);
    }
    .tc-parent-pricing-item:last-child {
      border-bottom: none;
    }
    .tc-parent-pricing-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #4a2f2f;
    }
    .tc-parent-pricing-price {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.15rem;
      color: #db2777;
    }

    /* ── Testimonials ── */
    .tc-parent-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-parent-quote-card {
      background: #fff;
      border-radius: 14px;
      padding: 28px 24px;
      box-shadow: 0 2px 12px rgba(219,39,119,.05);
    }
    .tc-parent-quote-text {
      font-size: 0.92rem;
      color: #5a3a3a;
      line-height: 1.7;
      margin-bottom: 14px;
      font-style: italic;
    }
    .tc-parent-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #9a7070;
    }

    /* ── Mini Gallery ── */
    .tc-parent-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-parent-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .tc-parent-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(219,39,119,.12);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-parent-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 28px;
      }
      .tc-parent-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-parent-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-parent-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
      .tc-parent-hero-img {
        height: 340px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-parent-nav {
        flex-wrap: wrap;
        padding: 14px 16px;
        gap: 10px;
      }
      .tc-parent-nav-links {
        width: 100%;
        justify-content: flex-start;
        gap: 16px;
        margin-left: 0;
      }
      .tc-parent-hero {
        padding: 24px 16px 20px;
      }
      .tc-parent-h2 {
        font-size: 1.9rem;
      }
      .tc-parent-age-grid {
        grid-template-columns: 1fr;
      }
      .tc-parent-sections {
        padding: 0 16px 28px;
      }
      .tc-parent-panel {
        padding: 24px 18px;
      }
      .tc-parent-testimonials {
        padding: 0 16px 28px;
      }
      .tc-parent-gallery {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 0 16px 32px;
      }
      .tc-parent-gallery-img {
        height: 220px;
      }
      .tc-parent-hero-img {
        height: 280px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-parent-root">
        {/* ── Navline ── */}
        <nav className="tc-parent-nav">
          <div className="tc-parent-brand-dot">P</div>
          <span className="tc-parent-brand-name">Parent Guide Collective</span>
          <div className="tc-parent-nav-links">
            <span>About</span>
            <span>Programs</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-parent-hero">
          <div className="tc-parent-hero-copy">
            <div className="tc-parent-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-parent-kicker">{k}</span>
              ))}
            </div>
            <h2 className="tc-parent-h2">
              {name}
              {verified && (
                <span className="tc-parent-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 6.5L5 8.5L9 3.5"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-parent-desc">{tagline}</p>
            <p className="tc-parent-location">📍 {serviceArea}</p>

            <div className="tc-parent-age-grid">
              <div className="tc-parent-age-box">Toddlers</div>
              <div className="tc-parent-age-box">School Age</div>
              <div className="tc-parent-age-box">Teens</div>
            </div>

            <div className="tc-parent-btns">
              <button className="tc-parent-btn-primary" onClick={onHire}>
                Book a Session
              </button>
              <button className="tc-parent-btn-ghost">Learn More</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tc-parent-hero-card">
              <img
                className="tc-parent-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-parent-floating-note">
                ✨ Building calmer families, one routine at a time
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-parent-sections">
          <div className="tc-parent-panel">
            <h3 className="tc-parent-panel-title">About Your Guide</h3>
            <p className="tc-parent-bio-text">{bio}</p>
            <ul className="tc-parent-feature-list">
              <li>Morning and bedtime routines</li>
              <li>Emotion coaching and repair</li>
              <li>Parent community circles</li>
            </ul>
            <div className="tc-parent-credentials">
              <span className="tc-parent-credential-tag">Parent Educator</span>
              <span className="tc-parent-credential-tag">Child Development</span>
              <span className="tc-parent-credential-tag">Positive Discipline</span>
            </div>
          </div>

          <div className="tc-parent-panel">
            <h3 className="tc-parent-panel-title">Pricing</h3>
            <div className="tc-parent-pricing-item">
              <span className="tc-parent-pricing-name">Family Reset</span>
              <span className="tc-parent-pricing-price">$150</span>
            </div>
            <div className="tc-parent-pricing-item">
              <span className="tc-parent-pricing-name">Calm Home</span>
              <span className="tc-parent-pricing-price">$575</span>
            </div>
            <div className="tc-parent-pricing-item">
              <span className="tc-parent-pricing-name">Village Plan</span>
              <span className="tc-parent-pricing-price">$1,400</span>
            </div>
            {pricing?.downloads?.single && (
              <div className="tc-parent-pricing-item">
                <span className="tc-parent-pricing-name">Single Download</span>
                <span className="tc-parent-pricing-price">${pricing?.downloads?.single}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-parent-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-parent-quote-card">
              <p className="tc-parent-quote-text">"{t.quote}"</p>
              <span className="tc-parent-quote-author">{t.author}</span>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-parent-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-parent-gallery-img"
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
