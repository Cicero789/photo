import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingLeadership(props: TemplateProps) {
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
    const id = "font-tc-lead";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const kickers =
    specialties.length > 0
      ? specialties.slice(0, 3)
      : ["Team workshops", "360 assessment", "Keynote speaker"];

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const testimonials = [
    {
      quote: "Our managers went from avoiding feedback to seeking it out.",
      author: "— VP of People",
    },
    {
      quote: "The 360 debrief was the most honest conversation our team has ever had.",
      author: "— Engineering Director",
    },
    {
      quote: "Real leadership tools, not motivational fluff.",
      author: "— COO, Series B startup",
    },
  ];

  const steps = ["Assess", "Align", "Practice", "Measure"];

  const css = `
    .tc-lead-root {
      font-family: 'Manrope', 'Inter', sans-serif;
      background:
        repeating-linear-gradient(
          45deg,
          rgba(15,23,42,.04) 0px,
          rgba(15,23,42,.04) 1px,
          transparent 1px,
          transparent 12px
        ),
        #f9fafb;
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-lead-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(15,23,42,.10);
    }
    .tc-lead-brand-dot {
      width: 36px;
      height: 36px;
      background: #0f172a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-weight: 800;
      font-size: 0.8rem;
      flex-shrink: 0;
    }
    .tc-lead-brand-name {
      font-weight: 700;
      font-size: 1rem;
      color: #111827;
    }
    .tc-lead-nav-links {
      margin-left: auto;
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      color: #6b7280;
    }
    .tc-lead-nav-links span {
      cursor: pointer;
      transition: color 0.2s;
    }
    .tc-lead-nav-links span:hover {
      color: #0f172a;
    }

    /* ── Hero Grid ── */
    .tc-lead-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .tc-lead-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .tc-lead-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-lead-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0f172a;
      background: rgba(15,23,42,.06);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-lead-h2 {
      font-family: 'Manrope', sans-serif;
      font-size: 2.6rem;
      font-weight: 900;
      line-height: 1.15;
      color: #111827;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tc-lead-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #0f172a;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tc-lead-verified svg {
      width: 13px;
      height: 13px;
    }
    .tc-lead-desc {
      font-size: 0.95rem;
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .tc-lead-location {
      font-size: 0.82rem;
      color: #9ca3af;
      margin-bottom: 20px;
    }

    /* Assessment steps grid */
    .tc-lead-steps-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .tc-lead-step-box {
      background: #fff;
      border: 1px solid rgba(15,23,42,.10);
      border-radius: 12px;
      padding: 18px 10px;
      text-align: center;
      font-weight: 900;
      font-size: 0.88rem;
      color: #111827;
    }

    /* Buttons */
    .tc-lead-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-lead-btn-primary {
      background: #0f172a;
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #0f172a;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-lead-btn-primary:hover {
      background: transparent;
      color: #0f172a;
    }
    .tc-lead-btn-ghost {
      background: transparent;
      color: #0f172a;
      font-family: 'Manrope', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #0f172a;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-lead-btn-ghost:hover {
      background: #0f172a;
      color: #fff;
    }

    /* Hero card */
    .tc-lead-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(15,23,42,.10);
      border: 1px solid rgba(15,23,42,.08);
    }
    .tc-lead-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .tc-lead-hero-img:hover {
      transform: scale(1.02);
    }
    .tc-lead-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.94);
      backdrop-filter: blur(8px);
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #111827;
      box-shadow: 0 4px 12px rgba(0,0,0,.08);
    }

    /* ── Section Grid ── */
    .tc-lead-sections {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 28px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-lead-panel {
      background: #fff;
      border-radius: 14px;
      padding: 32px;
      border: 1px solid rgba(15,23,42,.06);
      box-shadow: 0 2px 12px rgba(15,23,42,.04);
    }
    .tc-lead-panel-title {
      font-family: 'Manrope', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      color: #111827;
      margin: 0 0 16px 0;
    }
    .tc-lead-bio-text {
      font-size: 0.9rem;
      color: #4b5563;
      line-height: 1.75;
      margin-bottom: 20px;
    }
    .tc-lead-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .tc-lead-feature-list li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
      font-size: 0.88rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tc-lead-feature-list li::before {
      content: "→";
      color: #0f172a;
      font-weight: 700;
      font-size: 0.8rem;
    }
    .tc-lead-credentials {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tc-lead-credential-tag {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0f172a;
      background: rgba(15,23,42,.06);
      padding: 5px 12px;
      border-radius: 20px;
    }

    /* Pricing panel */
    .tc-lead-pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
    }
    .tc-lead-pricing-item:last-child {
      border-bottom: none;
    }
    .tc-lead-pricing-name {
      font-weight: 700;
      font-size: 0.95rem;
      color: #111827;
    }
    .tc-lead-pricing-price {
      font-family: 'Manrope', sans-serif;
      font-weight: 900;
      font-size: 1.15rem;
      color: #0f172a;
    }

    /* ── Testimonials ── */
    .tc-lead-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-lead-quote-card {
      background: #fff;
      border-radius: 14px;
      padding: 28px 24px;
      border: 1px solid rgba(15,23,42,.06);
      box-shadow: 0 2px 12px rgba(15,23,42,.04);
    }
    .tc-lead-quote-text {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.7;
      margin-bottom: 14px;
      font-style: italic;
    }
    .tc-lead-quote-author {
      font-size: 0.8rem;
      font-weight: 700;
      color: #9ca3af;
    }

    /* ── Mini Gallery ── */
    .tc-lead-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-lead-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .tc-lead-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(15,23,42,.10);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-lead-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 28px;
      }
      .tc-lead-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-lead-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-lead-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
      .tc-lead-hero-img {
        height: 340px;
      }
      .tc-lead-steps-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-lead-nav {
        flex-wrap: wrap;
        padding: 14px 16px;
        gap: 10px;
      }
      .tc-lead-nav-links {
        width: 100%;
        justify-content: flex-start;
        gap: 16px;
        margin-left: 0;
      }
      .tc-lead-hero {
        padding: 24px 16px 20px;
      }
      .tc-lead-h2 {
        font-size: 1.9rem;
      }
      .tc-lead-steps-grid {
        grid-template-columns: 1fr 1fr;
      }
      .tc-lead-sections {
        padding: 0 16px 28px;
      }
      .tc-lead-panel {
        padding: 24px 18px;
      }
      .tc-lead-testimonials {
        padding: 0 16px 28px;
      }
      .tc-lead-gallery {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 0 16px 32px;
      }
      .tc-lead-gallery-img {
        height: 220px;
      }
      .tc-lead-hero-img {
        height: 280px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-lead-root">
        {/* ── Navline ── */}
        <nav className="tc-lead-nav">
          <div className="tc-lead-brand-dot">LL</div>
          <span className="tc-lead-brand-name">Leadership Lab</span>
          <div className="tc-lead-nav-links">
            <span>About</span>
            <span>Workshops</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-lead-hero">
          <div className="tc-lead-hero-copy">
            <div className="tc-lead-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-lead-kicker">{k}</span>
              ))}
            </div>
            <h2 className="tc-lead-h2">
              {name}
              {verified && (
                <span className="tc-lead-verified">
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
            <p className="tc-lead-desc">{tagline}</p>
            <p className="tc-lead-location">📍 {serviceArea}</p>

            <div className="tc-lead-steps-grid">
              {steps.map((step, i) => (
                <div key={i} className="tc-lead-step-box">{step}</div>
              ))}
            </div>

            <div className="tc-lead-btns">
              <button className="tc-lead-btn-primary" onClick={onHire}>
                Book a Workshop
              </button>
              <button className="tc-lead-btn-ghost">Learn More</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tc-lead-hero-card">
              <img
                className="tc-lead-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-lead-floating-note">
                📊 Build leaders your team can actually follow
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-lead-sections">
          <div className="tc-lead-panel">
            <h3 className="tc-lead-panel-title">About Your Facilitator</h3>
            <p className="tc-lead-bio-text">{bio}</p>
            <ul className="tc-lead-feature-list">
              <li>360 leadership assessments</li>
              <li>Team communication workshops</li>
              <li>Manager cohort facilitation</li>
            </ul>
            <div className="tc-lead-credentials">
              <span className="tc-lead-credential-tag">Certified Facilitator</span>
              <span className="tc-lead-credential-tag">360 Assessment</span>
              <span className="tc-lead-credential-tag">Keynote Speaker</span>
            </div>
          </div>

          <div className="tc-lead-panel">
            <h3 className="tc-lead-panel-title">Pricing</h3>
            <div className="tc-lead-pricing-item">
              <span className="tc-lead-pricing-name">Manager Debrief</span>
              <span className="tc-lead-pricing-price">$400</span>
            </div>
            <div className="tc-lead-pricing-item">
              <span className="tc-lead-pricing-name">Team Workshop</span>
              <span className="tc-lead-pricing-price">$3,500</span>
            </div>
            <div className="tc-lead-pricing-item">
              <span className="tc-lead-pricing-name">Leadership Cohort</span>
              <span className="tc-lead-pricing-price">$9,000</span>
            </div>
            {pricing?.downloads?.single && (
              <div className="tc-lead-pricing-item">
                <span className="tc-lead-pricing-name">Single Download</span>
                <span className="tc-lead-pricing-price">${pricing?.downloads?.single}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-lead-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-lead-quote-card">
              <p className="tc-lead-quote-text">"{t.quote}"</p>
              <span className="tc-lead-quote-author">{t.author}</span>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-lead-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-lead-gallery-img"
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
