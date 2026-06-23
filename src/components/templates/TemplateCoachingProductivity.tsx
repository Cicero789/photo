import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingProductivity(props: TemplateProps) {
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
    const id = "font-tc-prod";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const kickers =
    specialties.length > 0
      ? specialties.slice(0, 3)
      : ["Minimal systems", "Time management", "Productivity audit"];

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const testimonials = [
    {
      quote: "I reclaimed 12 hours a week just by simplifying my task system.",
      author: "— Startup founder",
    },
    {
      quote: "The calendar audit alone was worth every dollar.",
      author: "— Remote team lead",
    },
    {
      quote: "Finally, a productivity approach that doesn't add more tools.",
      author: "— Freelance designer",
    },
  ];

  const auditLines = [
    "Calendar friction audit",
    "Task system simplification",
    "Weekly planning rhythm",
  ];

  const css = `
    .tc-prod-root {
      font-family: 'Inter', sans-serif;
      background:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 41px,
          rgba(28,25,23,.06) 41px,
          rgba(28,25,23,.06) 42px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 41px,
          rgba(28,25,23,.06) 41px,
          rgba(28,25,23,.06) 42px
        ),
        #fbfbf8;
      color: #1c1917;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-prod-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(28,25,23,.10);
      background: rgba(251,251,248,.9);
      backdrop-filter: blur(4px);
    }
    .tc-prod-brand-dot {
      width: 36px;
      height: 36px;
      background: #1c1917;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fbfbf8;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .tc-prod-brand-name {
      font-weight: 600;
      font-size: 1rem;
      color: #1c1917;
    }
    .tc-prod-nav-links {
      margin-left: auto;
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      color: #78716c;
    }
    .tc-prod-nav-links span {
      cursor: pointer;
      transition: color 0.2s;
    }
    .tc-prod-nav-links span:hover {
      color: #1c1917;
    }

    /* ── Hero Grid ── */
    .tc-prod-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .tc-prod-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .tc-prod-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-prod-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #1c1917;
      background: rgba(28,25,23,.06);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-prod-h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.6rem;
      font-weight: 700;
      line-height: 1.15;
      color: #1c1917;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tc-prod-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #1c1917;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tc-prod-verified svg {
      width: 13px;
      height: 13px;
    }
    .tc-prod-desc {
      font-size: 0.95rem;
      color: #57534e;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .tc-prod-location {
      font-size: 0.82rem;
      color: #a8a29e;
      margin-bottom: 20px;
    }

    /* Audit card */
    .tc-prod-audit-card {
      background: #fff;
      border: 2px solid #1c1917;
      border-radius: 12px;
      box-shadow: 10px 10px 0 rgba(28,25,23,.08);
      padding: 0;
      margin-bottom: 28px;
      overflow: hidden;
    }
    .tc-prod-audit-row {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 12px;
      align-items: center;
      padding: 14px 20px;
      border-bottom: 1px solid rgba(28,25,23,.10);
      font-size: 0.9rem;
      color: #1c1917;
    }
    .tc-prod-audit-row:last-child {
      border-bottom: none;
    }
    .tc-prod-audit-check {
      font-size: 1rem;
      color: #1c1917;
      font-weight: 700;
      text-align: center;
    }

    /* Buttons */
    .tc-prod-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-prod-btn-primary {
      background: #1c1917;
      color: #fbfbf8;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #1c1917;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-prod-btn-primary:hover {
      background: transparent;
      color: #1c1917;
    }
    .tc-prod-btn-ghost {
      background: transparent;
      color: #1c1917;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #1c1917;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-prod-btn-ghost:hover {
      background: #1c1917;
      color: #fbfbf8;
    }

    /* Hero card */
    .tc-prod-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(28,25,23,.10);
      border: 1px solid rgba(28,25,23,.08);
    }
    .tc-prod-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .tc-prod-hero-img:hover {
      transform: scale(1.02);
    }
    .tc-prod-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.94);
      backdrop-filter: blur(8px);
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #1c1917;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    /* ── Section Grid ── */
    .tc-prod-sections {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 28px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-prod-panel {
      background: #fff;
      border-radius: 14px;
      padding: 32px;
      border: 1px solid rgba(28,25,23,.06);
      box-shadow: 0 2px 12px rgba(28,25,23,.04);
    }
    .tc-prod-panel-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #1c1917;
      margin: 0 0 16px 0;
    }
    .tc-prod-bio-text {
      font-size: 0.9rem;
      color: #57534e;
      line-height: 1.75;
      margin-bottom: 20px;
    }
    .tc-prod-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .tc-prod-feature-list li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(28,25,23,.06);
      font-size: 0.88rem;
      color: #44403c;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tc-prod-feature-list li::before {
      content: "—";
      color: #1c1917;
      font-weight: 700;
      font-size: 0.8rem;
    }
    .tc-prod-credentials {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tc-prod-credential-tag {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #1c1917;
      background: rgba(28,25,23,.06);
      padding: 5px 12px;
      border-radius: 20px;
    }

    /* Pricing panel */
    .tc-prod-pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(28,25,23,.06);
    }
    .tc-prod-pricing-item:last-child {
      border-bottom: none;
    }
    .tc-prod-pricing-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #1c1917;
    }
    .tc-prod-pricing-price {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.15rem;
      color: #1c1917;
    }

    /* ── Testimonials ── */
    .tc-prod-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-prod-quote-card {
      background: #fff;
      border-radius: 14px;
      padding: 28px 24px;
      border: 1px solid rgba(28,25,23,.06);
      box-shadow: 0 2px 12px rgba(28,25,23,.04);
    }
    .tc-prod-quote-text {
      font-size: 0.92rem;
      color: #44403c;
      line-height: 1.7;
      margin-bottom: 14px;
      font-style: italic;
    }
    .tc-prod-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #a8a29e;
    }

    /* ── Mini Gallery ── */
    .tc-prod-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-prod-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid rgba(28,25,23,.06);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .tc-prod-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(28,25,23,.10);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-prod-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 28px;
      }
      .tc-prod-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-prod-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-prod-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
      .tc-prod-hero-img {
        height: 340px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-prod-nav {
        flex-wrap: wrap;
        padding: 14px 16px;
        gap: 10px;
      }
      .tc-prod-nav-links {
        width: 100%;
        justify-content: flex-start;
        gap: 16px;
        margin-left: 0;
      }
      .tc-prod-hero {
        padding: 24px 16px 20px;
      }
      .tc-prod-h2 {
        font-size: 1.9rem;
      }
      .tc-prod-audit-card {
        box-shadow: 6px 6px 0 rgba(28,25,23,.08);
      }
      .tc-prod-sections {
        padding: 0 16px 28px;
      }
      .tc-prod-panel {
        padding: 24px 18px;
      }
      .tc-prod-testimonials {
        padding: 0 16px 28px;
      }
      .tc-prod-gallery {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 0 16px 32px;
      }
      .tc-prod-gallery-img {
        height: 220px;
      }
      .tc-prod-hero-img {
        height: 280px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-prod-root">
        {/* ── Navline ── */}
        <nav className="tc-prod-nav">
          <div className="tc-prod-brand-dot">P</div>
          <span className="tc-prod-brand-name">Productivity Pro</span>
          <div className="tc-prod-nav-links">
            <span>About</span>
            <span>Systems</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-prod-hero">
          <div className="tc-prod-hero-copy">
            <div className="tc-prod-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-prod-kicker">{k}</span>
              ))}
            </div>
            <h2 className="tc-prod-h2">
              {name}
              {verified && (
                <span className="tc-prod-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 6.5L5 8.5L9 3.5"
                      stroke="#fbfbf8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-prod-desc">{tagline}</p>
            <p className="tc-prod-location">📍 {serviceArea}</p>

            <div className="tc-prod-audit-card">
              {auditLines.map((line, i) => (
                <div key={i} className="tc-prod-audit-row">
                  <span className="tc-prod-audit-check">✓</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>

            <div className="tc-prod-btns">
              <button className="tc-prod-btn-primary" onClick={onHire}>
                Book an Audit
              </button>
              <button className="tc-prod-btn-ghost">Learn More</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tc-prod-hero-card">
              <img
                className="tc-prod-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-prod-floating-note">
                ⚡ Clean up your time, tools, and attention
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-prod-sections">
          <div className="tc-prod-panel">
            <h3 className="tc-prod-panel-title">About Your Consultant</h3>
            <p className="tc-prod-bio-text">{bio}</p>
            <ul className="tc-prod-feature-list">
              <li>Time-blocking and calendar design</li>
              <li>Task capture and prioritization</li>
              <li>Tool audits for Notion, Todoist, Asana, Google Workspace</li>
            </ul>
            <div className="tc-prod-credentials">
              <span className="tc-prod-credential-tag">Productivity Consultant</span>
              <span className="tc-prod-credential-tag">Systems Design</span>
              <span className="tc-prod-credential-tag">Operations Background</span>
            </div>
          </div>

          <div className="tc-prod-panel">
            <h3 className="tc-prod-panel-title">Pricing</h3>
            <div className="tc-prod-pricing-item">
              <span className="tc-prod-pricing-name">Time Audit</span>
              <span className="tc-prod-pricing-price">$175</span>
            </div>
            <div className="tc-prod-pricing-item">
              <span className="tc-prod-pricing-name">System Build</span>
              <span className="tc-prod-pricing-price">$700</span>
            </div>
            <div className="tc-prod-pricing-item">
              <span className="tc-prod-pricing-name">Deep Work Lab</span>
              <span className="tc-prod-pricing-price">$1,800</span>
            </div>
            {pricing?.downloads?.single && (
              <div className="tc-prod-pricing-item">
                <span className="tc-prod-pricing-name">Single Download</span>
                <span className="tc-prod-pricing-price">${pricing?.downloads?.single}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-prod-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-prod-quote-card">
              <p className="tc-prod-quote-text">"{t.quote}"</p>
              <span className="tc-prod-quote-author">{t.author}</span>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-prod-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-prod-gallery-img"
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
