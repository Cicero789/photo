import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingFitnessMind(props: TemplateProps) {
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
    const id = "font-tc-fit";
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
      : ["Mind-body coaching", "Habit strength", "Transformation stories"];

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const testimonials = [
    {
      quote: "I stopped quitting on week three. That was the shift.",
      author: "— 12-week client",
    },
    {
      quote: "This isn't just fitness — it's identity work with accountability.",
      author: "— Returning member",
    },
    {
      quote: "The mindset coaching changed how I see consistency forever.",
      author: "— Marathon finisher",
    },
  ];

  const css = `
    .tc-fit-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 10% 10%, rgba(34,197,94,.15) 0%, transparent 50%),
        linear-gradient(160deg, #07140d 0%, #10251a 50%, #172554 100%);
      color: #ffffff;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-fit-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(34,197,94,.15);
    }
    .tc-fit-brand-dot {
      width: 36px;
      height: 36px;
      background: #22c55e;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #07140d;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .tc-fit-brand-name {
      font-weight: 600;
      font-size: 1rem;
      color: #fff;
    }
    .tc-fit-nav-links {
      margin-left: auto;
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      color: rgba(255,255,255,.6);
    }
    .tc-fit-nav-links span {
      cursor: pointer;
      transition: color 0.2s;
    }
    .tc-fit-nav-links span:hover {
      color: #22c55e;
    }

    /* ── Hero Grid ── */
    .tc-fit-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
      align-items: center;
    }
    .tc-fit-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .tc-fit-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-fit-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #22c55e;
      background: rgba(34,197,94,.12);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-fit-h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.6rem;
      font-weight: 700;
      line-height: 1.15;
      text-transform: uppercase;
      color: #fff;
      margin: 0 0 16px 0;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .tc-fit-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #22c55e;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tc-fit-verified svg {
      width: 13px;
      height: 13px;
    }
    .tc-fit-desc {
      font-size: 0.95rem;
      color: rgba(255,255,255,.7);
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .tc-fit-location {
      font-size: 0.82rem;
      color: rgba(255,255,255,.45);
      margin-bottom: 20px;
    }

    /* Metric row */
    .tc-fit-metric-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }
    .tc-fit-metric-box {
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 12px;
      padding: 18px 10px;
      text-align: center;
      font-weight: 900;
      font-size: 0.88rem;
      color: #fff;
    }

    /* Buttons */
    .tc-fit-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-fit-btn-primary {
      background: #22c55e;
      color: #07140d;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #22c55e;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-fit-btn-primary:hover {
      background: transparent;
      color: #22c55e;
    }
    .tc-fit-btn-ghost {
      background: transparent;
      color: #22c55e;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(34,197,94,.4);
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-fit-btn-ghost:hover {
      background: #22c55e;
      color: #07140d;
    }

    /* Hero card */
    .tc-fit-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,.3);
      border: 1px solid rgba(255,255,255,.08);
    }
    .tc-fit-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .tc-fit-hero-img:hover {
      transform: scale(1.02);
    }
    .tc-fit-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.10);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #d1fae5;
      box-shadow: 0 4px 12px rgba(0,0,0,.2);
    }

    /* ── Section Grid ── */
    .tc-fit-sections {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 28px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-fit-panel {
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 14px;
      padding: 32px;
    }
    .tc-fit-panel-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #fff;
      margin: 0 0 16px 0;
    }
    .tc-fit-bio-text {
      font-size: 0.9rem;
      color: #d1fae5;
      line-height: 1.75;
      margin-bottom: 20px;
    }
    .tc-fit-feature-list {
      list-style: none;
      padding: 0;
      margin: 0 0 20px 0;
    }
    .tc-fit-feature-list li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,.08);
      font-size: 0.88rem;
      color: #d1fae5;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tc-fit-feature-list li::before {
      content: "▸";
      color: #22c55e;
      font-size: 0.8rem;
    }
    .tc-fit-credentials {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tc-fit-credential-tag {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #22c55e;
      background: rgba(34,197,94,.12);
      padding: 5px 12px;
      border-radius: 20px;
      border: 1px solid rgba(34,197,94,.2);
    }

    /* Pricing panel */
    .tc-fit-pricing-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid rgba(255,255,255,.08);
    }
    .tc-fit-pricing-item:last-child {
      border-bottom: none;
    }
    .tc-fit-pricing-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: #fff;
    }
    .tc-fit-pricing-price {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.15rem;
      color: #22c55e;
    }

    /* ── Testimonials ── */
    .tc-fit-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-fit-quote-card {
      background: rgba(255,255,255,.08);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.10);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-fit-quote-text {
      font-size: 0.92rem;
      color: #d1fae5;
      line-height: 1.7;
      margin-bottom: 14px;
      font-style: italic;
    }
    .tc-fit-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: rgba(255,255,255,.45);
    }

    /* ── Mini Gallery ── */
    .tc-fit-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-fit-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .tc-fit-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(34,197,94,.15);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-fit-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 28px;
      }
      .tc-fit-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-fit-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-fit-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
      .tc-fit-hero-img {
        height: 340px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-fit-nav {
        flex-wrap: wrap;
        padding: 14px 16px;
        gap: 10px;
      }
      .tc-fit-nav-links {
        width: 100%;
        justify-content: flex-start;
        gap: 16px;
        margin-left: 0;
      }
      .tc-fit-hero {
        padding: 24px 16px 20px;
      }
      .tc-fit-h2 {
        font-size: 1.9rem;
      }
      .tc-fit-metric-row {
        grid-template-columns: 1fr;
      }
      .tc-fit-sections {
        padding: 0 16px 28px;
      }
      .tc-fit-panel {
        padding: 24px 18px;
      }
      .tc-fit-testimonials {
        padding: 0 16px 28px;
      }
      .tc-fit-gallery {
        grid-template-columns: 1fr;
        gap: 12px;
        padding: 0 16px 32px;
      }
      .tc-fit-gallery-img {
        height: 220px;
      }
      .tc-fit-hero-img {
        height: 280px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-fit-root">
        {/* ── Navline ── */}
        <nav className="tc-fit-nav">
          <div className="tc-fit-brand-dot">F</div>
          <span className="tc-fit-brand-name">Fitness Mindset Method</span>
          <div className="tc-fit-nav-links">
            <span>About</span>
            <span>Programs</span>
            <span>Pricing</span>
            <span>Contact</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-fit-hero">
          <div className="tc-fit-hero-copy">
            <div className="tc-fit-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-fit-kicker">{k}</span>
              ))}
            </div>
            <h2 className="tc-fit-h2">
              {name}
              {verified && (
                <span className="tc-fit-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 6.5L5 8.5L9 3.5"
                      stroke="#07140d"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-fit-desc">{tagline}</p>
            <p className="tc-fit-location">📍 {serviceArea}</p>

            <div className="tc-fit-metric-row">
              <div className="tc-fit-metric-box">12wk habit rebuild</div>
              <div className="tc-fit-metric-box">4x check-ins</div>
              <div className="tc-fit-metric-box">360° mind-body</div>
            </div>

            <div className="tc-fit-btns">
              <button className="tc-fit-btn-primary" onClick={onHire}>
                Start Training
              </button>
              <button className="tc-fit-btn-ghost">Learn More</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tc-fit-hero-card">
              <img
                className="tc-fit-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-fit-floating-note">
                🔥 Train the mind. The body follows.
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-fit-sections">
          <div className="tc-fit-panel">
            <h3 className="tc-fit-panel-title">About Your Coach</h3>
            <p className="tc-fit-bio-text">{bio}</p>
            <ul className="tc-fit-feature-list">
              <li>Mind-body integration coaching</li>
              <li>Habit architecture and accountability</li>
              <li>Transformation story documentation</li>
            </ul>
            <div className="tc-fit-credentials">
              <span className="tc-fit-credential-tag">NASM-CPT</span>
              <span className="tc-fit-credential-tag">Behavior Change</span>
              <span className="tc-fit-credential-tag">Mindset Coach</span>
            </div>
          </div>

          <div className="tc-fit-panel">
            <h3 className="tc-fit-panel-title">Pricing</h3>
            <div className="tc-fit-pricing-item">
              <span className="tc-fit-pricing-name">Momentum Call</span>
              <span className="tc-fit-pricing-price">$120</span>
            </div>
            <div className="tc-fit-pricing-item">
              <span className="tc-fit-pricing-name">Consistency Plan</span>
              <span className="tc-fit-pricing-price">$520</span>
            </div>
            <div className="tc-fit-pricing-item">
              <span className="tc-fit-pricing-name">Identity Shift</span>
              <span className="tc-fit-pricing-price">$1,600</span>
            </div>
            {pricing?.downloads?.single && (
              <div className="tc-fit-pricing-item">
                <span className="tc-fit-pricing-name">Single Download</span>
                <span className="tc-fit-pricing-price">${pricing?.downloads?.single}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-fit-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-fit-quote-card">
              <p className="tc-fit-quote-text">"{t.quote}"</p>
              <span className="tc-fit-quote-author">{t.author}</span>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-fit-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-fit-gallery-img"
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
