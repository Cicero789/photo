import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingExecutive(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    website: _website,
    serviceArea,
    verified,
    pricing: _pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  useEffect(() => {
    const id = "font-tc-exec";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const kickers = specialties.length >= 3 ? specialties.slice(0, 3) : ["C-suite coaching", "Confidential advisory", "Leadership ROI"];

  const metrics = [
    { value: "92%", label: "Decision clarity" },
    { value: "38%", label: "Faster alignment" },
    { value: "1:1", label: "Confidential" },
  ];

  const credentials = ["ICF PCC", "Former COO", "NDA Friendly", "Board Advisory"];

  const pricingCards = [
    { name: "Executive Brief", price: "$650", desc: "90-min strategic session" },
    { name: "Quarter Advisory", price: "$4.8k", desc: "12-week leadership engagement" },
    { name: "Boardroom Partner", price: "$12k", desc: "6-month executive partnership" },
  ];

  const testimonials = [
    { quote: "The level of discretion and strategic insight is unmatched. A true executive asset.", author: "VP, Fortune 500" },
    { quote: "Helped me navigate a complex board transition with clarity and confidence.", author: "CEO, Series C Startup" },
    { quote: "The ROI on leadership coaching was evident within the first quarter.", author: "COO, Global Firm" },
  ];

  const css = `
    .tc-exec-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 30% 10%, rgba(214,167,74,.08) 0%, transparent 50%),
        linear-gradient(180deg, #07111f 0%, #0f1e34 50%, #111827 100%);
      color: #f8fafc;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-exec-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(248,250,252,.08);
    }
    .tc-exec-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #f8fafc;
    }
    .tc-exec-brand-dot {
      width: 32px;
      height: 32px;
      background: #d6a74a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #07111f;
      font-weight: 900;
      font-size: 0.95rem;
    }
    .tc-exec-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .tc-exec-nav-links span {
      cursor: pointer;
      color: #f8fafc;
      opacity: 0.5;
      transition: opacity 0.2s;
    }
    .tc-exec-nav-links span:hover { opacity: 1; }

    /* ── Hero Grid ── */
    .tc-exec-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-exec-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tc-exec-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-exec-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #d6a74a;
      background: rgba(214,167,74,.10);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-exec-hero h2 {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.15;
      color: #f8fafc;
      margin: 0 0 18px 0;
    }
    .tc-exec-hero-desc {
      font-size: 0.95rem;
      color: rgba(248,250,252,.65);
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 460px;
    }
    .tc-exec-hero-area {
      font-size: 0.82rem;
      color: rgba(248,250,252,.4);
      margin-bottom: 24px;
    }

    /* Metrics Row */
    .tc-exec-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-bottom: 28px;
    }
    .tc-exec-metric {
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 18px 14px;
      text-align: center;
    }
    .tc-exec-metric-value {
      font-size: 1.5rem;
      font-weight: 900;
      color: #d6a74a;
      margin-bottom: 4px;
    }
    .tc-exec-metric-label {
      font-size: 0.72rem;
      font-weight: 500;
      color: rgba(248,250,252,.55);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tc-exec-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-exec-btn-primary {
      display: inline-block;
      background: #d6a74a;
      color: #07111f;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #d6a74a;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-exec-btn-primary:hover {
      background: transparent;
      color: #d6a74a;
    }
    .tc-exec-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #f8fafc;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid rgba(248,250,252,.15);
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tc-exec-btn-ghost:hover {
      border-color: rgba(248,250,252,.4);
    }

    /* Hero Card */
    .tc-exec-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.4);
      border: 1px solid rgba(255,255,255,.08);
    }
    .tc-exec-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      filter: brightness(0.9);
      transition: filter 0.3s;
    }
    .tc-exec-hero-img:hover { filter: brightness(1); }
    .tc-exec-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(7,17,31,.85);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.10);
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 0.82rem;
      color: rgba(248,250,252,.85);
      font-style: italic;
      max-width: 260px;
      line-height: 1.5;
    }

    /* Verified Badge */
    .tc-exec-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: #d6a74a;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .tc-exec-verified svg {
      width: 12px;
      height: 12px;
    }

    /* ── Section Grid ── */
    .tc-exec-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-exec-panel {
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 16px;
      padding: 36px 28px;
    }
    .tc-exec-panel h3 {
      font-size: 1.25rem;
      font-weight: 800;
      color: #f8fafc;
      margin: 0 0 16px 0;
    }
    .tc-exec-panel-bio {
      font-size: 0.9rem;
      color: rgba(248,250,252,.65);
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .tc-exec-cred-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tc-exec-cred {
      font-size: 0.75rem;
      font-weight: 600;
      color: #d6a74a;
      background: rgba(214,167,74,.10);
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid rgba(214,167,74,.15);
    }

    /* Pricing Cards */
    .tc-exec-pricing-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tc-exec-price-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 12px;
      padding: 18px 20px;
      transition: border-color 0.2s;
    }
    .tc-exec-price-card:hover {
      border-color: rgba(214,167,74,.25);
    }
    .tc-exec-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #f8fafc;
    }
    .tc-exec-price-desc {
      font-size: 0.78rem;
      color: rgba(248,250,252,.45);
      margin-top: 2px;
    }
    .tc-exec-price-amt {
      font-size: 1.3rem;
      font-weight: 900;
      color: #d6a74a;
    }

    /* ── Testimonials ── */
    .tc-exec-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-exec-quote-card {
      background: rgba(255,255,255,.06);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,.08);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-exec-quote-text {
      font-size: 0.9rem;
      color: rgba(248,250,252,.8);
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 14px;
    }
    .tc-exec-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #d6a74a;
    }

    /* ── Mini Gallery ── */
    .tc-exec-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-exec-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.08);
      cursor: pointer;
      filter: brightness(0.85);
      transition: filter 0.3s, transform 0.2s;
    }
    .tc-exec-gallery-img:hover {
      filter: brightness(1);
      transform: scale(1.02);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-exec-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tc-exec-metrics {
        max-width: 400px;
      }
      .tc-exec-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-exec-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-exec-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-exec-nav {
        padding: 14px 16px;
      }
      .tc-exec-nav-links { display: none; }
      .tc-exec-hero {
        padding: 28px 16px 28px;
      }
      .tc-exec-hero h2 {
        font-size: 1.85rem;
      }
      .tc-exec-metrics {
        grid-template-columns: 1fr;
        max-width: 100%;
      }
      .tc-exec-sections {
        padding: 0 16px 28px;
      }
      .tc-exec-testimonials {
        padding: 0 16px 28px;
      }
      .tc-exec-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .tc-exec-gallery-img {
        height: 220px;
      }
      .tc-exec-btn-row {
        flex-direction: column;
      }
      .tc-exec-btn-primary,
      .tc-exec-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-exec-root">
        {/* ── Navline ── */}
        <nav className="tc-exec-nav">
          <div className="tc-exec-brand">
            <div className="tc-exec-brand-dot">E</div>
            Executive Edge
          </div>
          <div className="tc-exec-nav-links">
            <span>About</span>
            <span>Advisory</span>
            <span>Testimonials</span>
            <span>Gallery</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-exec-hero">
          <div className="tc-exec-hero-copy">
            <div className="tc-exec-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-exec-kicker">{k}</span>
              ))}
            </div>
            <h2>
              Executive coaching for decisions that carry weight.
              {verified && (
                <span className="tc-exec-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#07111f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-exec-hero-desc">{tagline}</p>
            <span className="tc-exec-hero-area">{serviceArea}</span>

            <div className="tc-exec-metrics">
              {metrics.map((m, i) => (
                <div key={i} className="tc-exec-metric">
                  <div className="tc-exec-metric-value">{m.value}</div>
                  <div className="tc-exec-metric-label">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="tc-exec-btn-row">
              <button className="tc-exec-btn-primary" onClick={onHire}>Request Advisory</button>
              <button className="tc-exec-btn-ghost">View Engagement</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tc-exec-hero-card">
              <img
                className="tc-exec-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-exec-floating-note">
                "Leadership is not about being in charge. It is about taking care of those in your charge."
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-exec-sections">
          <div className="tc-exec-panel">
            <h3>About {name}</h3>
            <p className="tc-exec-panel-bio">{bio}</p>
            <div className="tc-exec-cred-list">
              {credentials.map((c, i) => (
                <span key={i} className="tc-exec-cred">{c}</span>
              ))}
            </div>
          </div>
          <div className="tc-exec-panel">
            <h3>Advisory Packages</h3>
            <div className="tc-exec-pricing-grid">
              {pricingCards.map((p, i) => (
                <div key={i} className="tc-exec-price-card">
                  <div>
                    <div className="tc-exec-price-name">{p.name}</div>
                    <div className="tc-exec-price-desc">{p.desc}</div>
                  </div>
                  <div className="tc-exec-price-amt">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-exec-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-exec-quote-card">
              <div className="tc-exec-quote-text">"{t.quote}"</div>
              <div className="tc-exec-quote-author">-- {t.author}</div>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-exec-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-exec-gallery-img"
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
