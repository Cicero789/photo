// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingLife(props: TemplateProps) {
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
    const id = "font-tc-life";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const kickers = specialties.length >= 3 ? specialties.slice(0, 3) : ["Warm coaching", "Personal growth", "Free discovery call"];

  const journeySteps = [
    { title: "Clarify", desc: "Uncover what you truly want" },
    { title: "Release", desc: "Let go of what holds you back" },
    { title: "Build", desc: "Create aligned habits and goals" },
    { title: "Become", desc: "Step into your next chapter" },
  ];

  const credentials = ["ICF Certified", "Trauma-Informed", "8+ Years"];

  const pricingCards = [
    { name: "Clarity Call", price: "$95", desc: "60-min deep-dive session" },
    { name: "Reset Month", price: "$420", desc: "4 weekly sessions + support" },
    { name: "Transformation", price: "$1,150", desc: "3-month coaching journey" },
  ];

  const testimonials = [
    { quote: "Working with this coach changed the trajectory of my life. I finally feel aligned.", author: "Sarah M." },
    { quote: "The warmth and insight in every session made me feel truly seen and supported.", author: "David K." },
    { quote: "I went from stuck to thriving in just three months. Absolutely transformative.", author: "Priya L." },
  ];

  const css = `
    .tc-life-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 20% 0%, rgba(251,146,60,.12) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(250,204,21,.10) 0%, transparent 50%),
        linear-gradient(180deg, #fff7ed 0%, #fef3c7 50%, #fff1f2 100%);
      color: #3f2d20;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-life-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(63,45,32,.10);
    }
    .tc-life-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #3f2d20;
    }
    .tc-life-brand-dot {
      width: 32px;
      height: 32px;
      background: #ea580c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .tc-life-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .tc-life-nav-links span {
      cursor: pointer;
      color: #3f2d20;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .tc-life-nav-links span:hover { opacity: 1; }

    /* ── Hero Grid ── */
    .tc-life-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-life-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tc-life-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-life-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #ea580c;
      background: rgba(234,88,12,.08);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-life-hero h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.6rem;
      font-weight: 700;
      line-height: 1.15;
      color: #3f2d20;
      margin: 0 0 18px 0;
    }
    .tc-life-hero-desc {
      font-size: 0.95rem;
      color: #6b4f3a;
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 460px;
    }
    .tc-life-hero-area {
      font-size: 0.82rem;
      color: #9a7b63;
      margin-bottom: 24px;
    }
    .tc-life-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-life-btn-primary {
      display: inline-block;
      background: #ea580c;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid #ea580c;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-life-btn-primary:hover {
      background: transparent;
      color: #ea580c;
    }
    .tc-life-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #3f2d20;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 12px 28px;
      border: 2px solid rgba(63,45,32,.2);
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tc-life-btn-ghost:hover {
      border-color: #3f2d20;
    }

    /* Hero Card */
    .tc-life-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(63,45,32,.12);
    }
    .tc-life-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .tc-life-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 0.82rem;
      color: #3f2d20;
      font-style: italic;
      max-width: 260px;
      line-height: 1.5;
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }

    /* Verified Badge */
    .tc-life-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: #3f2d20;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .tc-life-verified svg {
      width: 12px;
      height: 12px;
    }

    /* ── Journey Steps ── */
    .tc-life-journey {
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-life-journey-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .tc-life-journey-step {
      background: rgba(255,255,255,.6);
      border: 1px solid rgba(63,45,32,.08);
      border-radius: 14px;
      padding: 28px 20px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tc-life-journey-step:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(63,45,32,.08);
    }
    .tc-life-journey-num {
      font-size: 0.72rem;
      font-weight: 700;
      color: #ea580c;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .tc-life-journey-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: #3f2d20;
      margin-bottom: 6px;
    }
    .tc-life-journey-desc {
      font-size: 0.82rem;
      color: #6b4f3a;
      line-height: 1.5;
    }

    /* ── Section Grid ── */
    .tc-life-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-life-panel {
      background: rgba(255,255,255,.65);
      border: 1px solid rgba(63,45,32,.08);
      border-radius: 16px;
      padding: 36px 28px;
    }
    .tc-life-panel h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #3f2d20;
      margin: 0 0 16px 0;
    }
    .tc-life-panel-bio {
      font-size: 0.9rem;
      color: #6b4f3a;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .tc-life-cred-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tc-life-cred {
      font-size: 0.75rem;
      font-weight: 600;
      color: #ea580c;
      background: rgba(234,88,12,.08);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Pricing Cards */
    .tc-life-pricing-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tc-life-price-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(63,45,32,.08);
      border-radius: 12px;
      padding: 18px 20px;
      transition: box-shadow 0.2s;
    }
    .tc-life-price-card:hover {
      box-shadow: 0 4px 16px rgba(63,45,32,.06);
    }
    .tc-life-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #3f2d20;
    }
    .tc-life-price-desc {
      font-size: 0.78rem;
      color: #9a7b63;
      margin-top: 2px;
    }
    .tc-life-price-amt {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #ea580c;
    }

    /* ── Testimonials ── */
    .tc-life-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-life-quote-card {
      background: rgba(255,255,255,.6);
      border: 1px solid rgba(63,45,32,.08);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-life-quote-text {
      font-size: 0.9rem;
      color: #3f2d20;
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 14px;
    }
    .tc-life-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #ea580c;
    }

    /* ── Mini Gallery ── */
    .tc-life-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-life-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tc-life-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(63,45,32,.12);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-life-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tc-life-journey-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .tc-life-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-life-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-life-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-life-nav {
        padding: 14px 16px;
      }
      .tc-life-nav-links { display: none; }
      .tc-life-hero {
        padding: 28px 16px 28px;
      }
      .tc-life-hero h2 {
        font-size: 1.9rem;
      }
      .tc-life-journey {
        padding: 0 16px 36px;
      }
      .tc-life-journey-grid {
        grid-template-columns: 1fr;
      }
      .tc-life-sections {
        padding: 0 16px 28px;
      }
      .tc-life-testimonials {
        padding: 0 16px 28px;
      }
      .tc-life-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .tc-life-gallery-img {
        height: 220px;
      }
      .tc-life-btn-row {
        flex-direction: column;
      }
      .tc-life-btn-primary,
      .tc-life-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-life-root">
        {/* ── Navline ── */}
        <nav className="tc-life-nav">
          <div className="tc-life-brand">
            <div className="tc-life-brand-dot">L</div>
            Luma Life Coaching
          </div>
          <div className="tc-life-nav-links">
            <span>About</span>
            <span>Services</span>
            <span>Testimonials</span>
            <span>Gallery</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-life-hero">
          <div className="tc-life-hero-copy">
            <div className="tc-life-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-life-kicker">{k}</span>
              ))}
            </div>
            <h2>
              Step into the next version of your life.
              {verified && (
                <span className="tc-life-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-life-hero-desc">{tagline}</p>
            <span className="tc-life-hero-area">{serviceArea}</span>
            <div className="tc-life-btn-row">
              <button className="tc-life-btn-primary" onClick={onHire}>Book a Free Call</button>
              <button className="tc-life-btn-ghost">See the Journey</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tc-life-hero-card">
              <img
                className="tc-life-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-life-floating-note">
                "The best investment you can make is in yourself."
              </div>
            </div>
          )}
        </div>

        {/* ── Journey Steps ── */}
        <div className="tc-life-journey">
          <div className="tc-life-journey-grid">
            {journeySteps.map((step, i) => (
              <div key={i} className="tc-life-journey-step">
                <div className="tc-life-journey-num">Step {i + 1}</div>
                <div className="tc-life-journey-title">{step?.filename}</div>
                <div className="tc-life-journey-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-life-sections">
          <div className="tc-life-panel">
            <h3>About {name}</h3>
            <p className="tc-life-panel-bio">{bio}</p>
            <div className="tc-life-cred-list">
              {credentials.map((c, i) => (
                <span key={i} className="tc-life-cred">{c}</span>
              ))}
            </div>
          </div>
          <div className="tc-life-panel">
            <h3>Coaching Packages</h3>
            <div className="tc-life-pricing-grid">
              {pricingCards.map((p, i) => (
                <div key={i} className="tc-life-price-card">
                  <div>
                    <div className="tc-life-price-name">{p.name}</div>
                    <div className="tc-life-price-desc">{p.desc}</div>
                  </div>
                  <div className="tc-life-price-amt">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-life-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-life-quote-card">
              <div className="tc-life-quote-text">"{t.quote}"</div>
              <div className="tc-life-quote-author">-- {t.author}</div>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-life-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-life-gallery-img"
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
