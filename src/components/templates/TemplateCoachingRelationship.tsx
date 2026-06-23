import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingRelationship(props: TemplateProps) {
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
    const id = "font-tc-rel";
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
      : ["Couples coaching", "Communication tools", "Repair practices"];

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const testimonials = [
    {
      quote: "We finally learned how to fight fair and reconnect after.",
      author: "— Couple, 8 years together",
    },
    {
      quote: "The repair scripts alone saved us months of silence.",
      author: "— Engaged couple",
    },
    {
      quote: "I didn't know listening could be this intentional and healing.",
      author: "— Partner in recovery",
    },
  ];

  const commTools = [
    "Conflict maps",
    "Repair scripts",
    "Listening rituals",
    "Weekly check-ins",
  ];

  const css = `
    .tc-rel-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 90% 10%, rgba(190,24,93,.10) 0%, transparent 50%),
        linear-gradient(160deg, #fff1f2 0%, #ffffff 50%, #ffe4e6 100%);
      color: #4c1d31;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-rel-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(190,24,93,.10);
    }
    .tc-rel-brand-dot {
      width: 36px;
      height: 36px;
      background: #be185d;
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
    .tc-rel-brand-name {
      font-weight: 600;
      font-size: 1rem;
      color: #4c1d31;
    }
    .tc-rel-nav-links {
      margin-left: auto;
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      color: #8a4060;
    }
    .tc-rel-nav-links span {
      cursor: pointer;
      transition: color 0.2s;
    }
    .tc-rel-nav-links span:hover {
      color: #be185d;
    }

    /* ── Hero Grid ── */
    .tc-rel-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .tc-rel-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .tc-rel-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-rel-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #be185d;
      background: rgba(190,24,93,.07);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-rel-h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.6rem;
      font-weight: 700;
      line-height: 1.15;
      color: #4c1d31;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tc-rel-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #be185d;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tc-rel-verified svg {
      width: 13px;
      height: 13px;
    }
    .tc-rel-desc {
      font-size: 0.95rem;
      color: #7a3a55;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .tc-rel-location {
      font-size: 0.82rem;
      color: #a8607a;
      margin-bottom: 20px;
    }

    /* Communication tools grid 2x2 */
    .tc-rel-tools-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 28px;
    }
    .tc-rel-tool-box {
      background: #fff;
      border-radius: 12px;
      padding: 16px 14px;
      text-align: center;
      font-weight: 600;
      font-size: 0.88rem;
      color: #4c1d31;
      border: 1.5px solid rgba(190,24,93,.15);
      box-shadow: 0 2px 8px rgba(190,24,93,.04);
    }

    /* Buttons */
    .tc-rel-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-rel-btn-primary {
      background: #be185d;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #be185d;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-rel-btn-primary:hover {
      background: transparent;
      color: #be185d;
    }
    .tc-rel-btn-ghost {
      background: transparent;
      color: #be185d;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #be185d;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-rel-btn-ghost:hover {
      background: #be185d;
      color: #fff;
    }

    /* Hero card */
    .tc-rel-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(190,24,93,.10);
    }
    .tc-rel-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .tc-rel-hero-img:hover {
      transform: scale(1.02);
    }
    .tc-rel-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #4c1d31;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    /* ── Section Grid ── */
    .tc-rel-sections {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 28px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-rel-panel {
      background: #fff;
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 2px 12px rgba(190,24,93,.05);
    }
    .tc-rel-panel-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #4c1d31;
      margin: 0 0 16px 0;
    }
    .tc-rel-bio-text {
      font-size: 0.9rem;
      color: #7a3a55;
      line-height: 1.75;
      margin-bottom: 20px;
    }
    .tc-rel-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .tc-rel-feature-list li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(190,24,93,.08);
      font-size: 0.88rem;
      color: #6b2e48;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tc-rel-feature-list li::before {
      content: "♡";
      color: #be185d;
      font-size: 0.8rem;
    }
    .tc-rel-credentials {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tc-rel-credential-tag {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #be185d;
      background: rgba(190,24,93,.07);
      padding: 5px 12px;
      border-radius: 20px;
    }

    /* Pricing panel */
    .tc-rel-pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(190,24,93,.08);
    }
    .tc-rel-pricing-item:last-child {
      border-bottom: none;
    }
    .tc-rel-pricing-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #4c1d31;
    }
    .tc-rel-pricing-price {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.15rem;
      color: #be185d;
    }

    /* ── Testimonials ── */
    .tc-rel-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-rel-quote-card {
      background: #fff;
      border-radius: 14px;
      padding: 28px 24px;
      box-shadow: 0 2px 12px rgba(190,24,93,.05);
    }
    .tc-rel-quote-text {
      font-size: 0.92rem;
      color: #6b2e48;
      line-height: 1.7;
      margin-bottom: 14px;
      font-style: italic;
    }
    .tc-rel-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #a8607a;
    }

    /* ── Mini Gallery ── */
    .tc-rel-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-rel-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .tc-rel-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(190,24,93,.12);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-rel-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 28px;
      }
      .tc-rel-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-rel-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-rel-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
      .tc-rel-hero-img {
        height: 340px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-rel-nav {
        flex-wrap: wrap;
        padding: 14px 16px;
        gap: 10px;
      }
      .tc-rel-nav-links {
        width: 100%;
        justify-content: flex-start;
        gap: 16px;
        margin-left: 0;
      }
      .tc-rel-hero {
        padding: 24px 16px 20px;
      }
      .tc-rel-h2 {
        font-size: 1.9rem;
      }
      .tc-rel-tools-grid {
        grid-template-columns: 1fr;
      }
      .tc-rel-sections {
        padding: 0 16px 28px;
      }
      .tc-rel-panel {
        padding: 24px 18px;
      }
      .tc-rel-testimonials {
        padding: 0 16px 28px;
      }
      .tc-rel-gallery {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 0 16px 32px;
      }
      .tc-rel-gallery-img {
        height: 220px;
      }
      .tc-rel-hero-img {
        height: 280px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-rel-root">
        {/* ── Navline ── */}
        <nav className="tc-rel-nav">
          <div className="tc-rel-brand-dot">R</div>
          <span className="tc-rel-brand-name">Rosebridge Relationships</span>
          <div className="tc-rel-nav-links">
            <span>About</span>
            <span>Approach</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-rel-hero">
          <div className="tc-rel-hero-copy">
            <div className="tc-rel-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-rel-kicker">{k}</span>
              ))}
            </div>
            <h2 className="tc-rel-h2">
              {name}
              {verified && (
                <span className="tc-rel-verified">
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
            <p className="tc-rel-desc">{tagline}</p>
            <p className="tc-rel-location">📍 {serviceArea}</p>

            <div className="tc-rel-tools-grid">
              {commTools.map((tool, i) => (
                <div key={i} className="tc-rel-tool-box">{tool}</div>
              ))}
            </div>

            <div className="tc-rel-btns">
              <button className="tc-rel-btn-primary" onClick={onHire}>
                Book a Session
              </button>
              <button className="tc-rel-btn-ghost">Learn More</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tc-rel-hero-card">
              <img
                className="tc-rel-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-rel-floating-note">
                💕 Better conversations start here
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-rel-sections">
          <div className="tc-rel-panel">
            <h3 className="tc-rel-panel-title">About Your Coach</h3>
            <p className="tc-rel-bio-text">{bio}</p>
            <ul className="tc-rel-feature-list">
              <li>Couples communication coaching</li>
              <li>Attachment-informed support</li>
              <li>Repair and reconnection workshops</li>
            </ul>
            <div className="tc-rel-credentials">
              <span className="tc-rel-credential-tag">Gottman-Informed</span>
              <span className="tc-rel-credential-tag">Attachment Lens</span>
              <span className="tc-rel-credential-tag">Workshop Facilitator</span>
            </div>
          </div>

          <div className="tc-rel-panel">
            <h3 className="tc-rel-panel-title">Pricing</h3>
            <div className="tc-rel-pricing-item">
              <span className="tc-rel-pricing-name">Clarity Session</span>
              <span className="tc-rel-pricing-price">$175</span>
            </div>
            <div className="tc-rel-pricing-item">
              <span className="tc-rel-pricing-name">Communication Reset</span>
              <span className="tc-rel-pricing-price">$680</span>
            </div>
            <div className="tc-rel-pricing-item">
              <span className="tc-rel-pricing-name">Reconnect Program</span>
              <span className="tc-rel-pricing-price">$1,900</span>
            </div>
            {pricing?.downloads?.single && (
              <div className="tc-rel-pricing-item">
                <span className="tc-rel-pricing-name">Single Download</span>
                <span className="tc-rel-pricing-price">${pricing?.downloads?.single}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-rel-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-rel-quote-card">
              <p className="tc-rel-quote-text">"{t.quote}"</p>
              <span className="tc-rel-quote-author">{t.author}</span>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-rel-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-rel-gallery-img"
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
