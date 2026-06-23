// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingBusiness(props: TemplateProps) {
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
    const id = "font-tc-biz";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const kickers = specialties.length >= 3 ? specialties.slice(0, 3) : ["Offer strategy", "Sales systems", "Growth mentoring"];

  const credentials = ["Founder Mentor", "$12M Client Revenue", "MBA"];

  const features = [
    { title: "Offer Architecture", desc: "Design irresistible offers that convert without discounting." },
    { title: "Sales Systems", desc: "Build repeatable pipelines that work while you sleep." },
    { title: "Revenue Strategy", desc: "Data-driven pricing and positioning for maximum margin." },
    { title: "Scale Playbook", desc: "Hire, delegate, and systematize for sustainable growth." },
  ];

  const pricingCards = [
    { name: "Offer Audit", price: "$350", desc: "Deep-dive offer + positioning review" },
    { name: "Growth Sprint", price: "$1.5k", desc: "6-week revenue acceleration program" },
    { name: "Scale Partner", price: "$5k", desc: "3-month full business mentorship" },
  ];

  const testimonials = [
    { quote: "Went from $8K to $34K months in under 90 days. The offer audit alone was worth 10x.", author: "Elena V." },
    { quote: "Finally have a sales system that doesn't depend on me being online 24/7.", author: "Raj P." },
    { quote: "The clarity on positioning changed everything. Revenue tripled in one quarter.", author: "Tanya S." },
  ];

  const css = `
    .tc-biz-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(ellipse at 15% 5%, rgba(220,38,38,.06) 0%, transparent 45%),
        radial-gradient(ellipse at 85% 30%, rgba(251,146,60,.06) 0%, transparent 45%),
        #fff7ed;
      color: #1f2937;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-biz-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(31,41,55,.08);
    }
    .tc-biz-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f2937;
    }
    .tc-biz-brand-dot {
      width: 32px;
      height: 32px;
      background: #dc2626;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .tc-biz-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .tc-biz-nav-links span {
      cursor: pointer;
      color: #1f2937;
      opacity: 0.65;
      transition: opacity 0.2s;
    }
    .tc-biz-nav-links span:hover { opacity: 1; }

    /* ── Hero Grid ── */
    .tc-biz-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-biz-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tc-biz-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-biz-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #dc2626;
      background: rgba(220,38,38,.07);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-biz-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.12;
      text-transform: uppercase;
      color: #1f2937;
      margin: 0 0 18px 0;
    }
    .tc-biz-hero-desc {
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 20px;
      max-width: 460px;
    }
    .tc-biz-hero-area {
      font-size: 0.82rem;
      color: #9ca3af;
      margin-bottom: 20px;
    }

    /* Case Card */
    .tc-biz-case-card {
      background: #111827;
      border-radius: 14px;
      padding: 28px 24px;
      margin-bottom: 24px;
      max-width: 400px;
    }
    .tc-biz-case-stat {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: #fb923c;
      line-height: 1;
      margin-bottom: 8px;
    }
    .tc-biz-case-desc {
      font-size: 0.85rem;
      color: rgba(255,255,255,.7);
      line-height: 1.6;
    }

    .tc-biz-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-biz-btn-primary {
      display: inline-block;
      background: #dc2626;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #dc2626;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-biz-btn-primary:hover {
      background: transparent;
      color: #dc2626;
    }
    .tc-biz-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #1f2937;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid rgba(31,41,55,.18);
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tc-biz-btn-ghost:hover {
      border-color: #1f2937;
    }

    /* Hero Card */
    .tc-biz-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(31,41,55,.10);
    }
    .tc-biz-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .tc-biz-floating-note {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 0.82rem;
      color: #1f2937;
      font-style: italic;
      max-width: 240px;
      line-height: 1.5;
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }

    /* Verified Badge */
    .tc-biz-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: #1f2937;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .tc-biz-verified svg {
      width: 12px;
      height: 12px;
    }

    /* ── Section Grid ── */
    .tc-biz-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-biz-panel {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 16px;
      padding: 36px 28px;
    }
    .tc-biz-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 16px 0;
    }
    .tc-biz-panel-bio {
      font-size: 0.9rem;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .tc-biz-feature-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;
    }
    .tc-biz-feature-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .tc-biz-feature-icon {
      width: 8px;
      height: 8px;
      background: #dc2626;
      border-radius: 50%;
      margin-top: 7px;
      flex-shrink: 0;
    }
    .tc-biz-feature-title {
      font-weight: 600;
      font-size: 0.88rem;
      color: #1f2937;
    }
    .tc-biz-feature-desc {
      font-size: 0.8rem;
      color: #9ca3af;
      line-height: 1.5;
    }
    .tc-biz-cred-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tc-biz-cred {
      font-size: 0.75rem;
      font-weight: 600;
      color: #dc2626;
      background: rgba(220,38,38,.07);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Pricing Cards */
    .tc-biz-pricing-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tc-biz-price-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 12px;
      padding: 18px 20px;
      transition: box-shadow 0.2s;
    }
    .tc-biz-price-card:hover {
      box-shadow: 0 4px 16px rgba(31,41,55,.06);
    }
    .tc-biz-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #1f2937;
    }
    .tc-biz-price-desc {
      font-size: 0.78rem;
      color: #9ca3af;
      margin-top: 2px;
    }
    .tc-biz-price-amt {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #dc2626;
    }

    /* ── Testimonials ── */
    .tc-biz-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-biz-quote-card {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-biz-quote-text {
      font-size: 0.9rem;
      color: #1f2937;
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 14px;
    }
    .tc-biz-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #dc2626;
    }

    /* ── Mini Gallery ── */
    .tc-biz-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-biz-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tc-biz-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(31,41,55,.10);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-biz-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tc-biz-case-card {
        max-width: 100%;
      }
      .tc-biz-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-biz-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-biz-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-biz-nav {
        padding: 14px 16px;
      }
      .tc-biz-nav-links { display: none; }
      .tc-biz-hero {
        padding: 28px 16px 28px;
      }
      .tc-biz-hero h2 {
        font-size: 1.85rem;
      }
      .tc-biz-sections {
        padding: 0 16px 28px;
      }
      .tc-biz-testimonials {
        padding: 0 16px 28px;
      }
      .tc-biz-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .tc-biz-gallery-img {
        height: 220px;
      }
      .tc-biz-btn-row {
        flex-direction: column;
      }
      .tc-biz-btn-primary,
      .tc-biz-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-biz-root">
        {/* ── Navline ── */}
        <nav className="tc-biz-nav">
          <div className="tc-biz-brand">
            <div className="tc-biz-brand-dot">B</div>
            Bold Business Mentor
          </div>
          <div className="tc-biz-nav-links">
            <span>About</span>
            <span>Services</span>
            <span>Results</span>
            <span>Gallery</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-biz-hero">
          <div className="tc-biz-hero-copy">
            <div className="tc-biz-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-biz-kicker">{k}</span>
              ))}
            </div>
            <h2>
              Build a business that sells without guessing.
              {verified && (
                <span className="tc-biz-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-biz-hero-desc">{tagline}</p>
            <span className="tc-biz-hero-area">{serviceArea}</span>

            <div className="tc-biz-case-card">
              <div className="tc-biz-case-stat">3.4x</div>
              <div className="tc-biz-case-desc">
                Average revenue multiplier for clients within 6 months of completing the Growth Sprint program.
              </div>
            </div>

            <div className="tc-biz-btn-row">
              <button className="tc-biz-btn-primary" onClick={onHire}>Book a Strategy Call</button>
              <button className="tc-biz-btn-ghost">See Case Studies</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tc-biz-hero-card">
              <img
                className="tc-biz-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-biz-floating-note">
                "Stop selling harder. Start selling smarter."
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-biz-sections">
          <div className="tc-biz-panel">
            <h3>About {name}</h3>
            <p className="tc-biz-panel-bio">{bio}</p>
            <div className="tc-biz-feature-list">
              {features.map((f, i) => (
                <div key={i} className="tc-biz-feature-item">
                  <div className="tc-biz-feature-icon" />
                  <div>
                    <div className="tc-biz-feature-title">{f?.filename}</div>
                    <div className="tc-biz-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tc-biz-cred-list">
              {credentials.map((c, i) => (
                <span key={i} className="tc-biz-cred">{c}</span>
              ))}
            </div>
          </div>
          <div className="tc-biz-panel">
            <h3>Mentorship Packages</h3>
            <div className="tc-biz-pricing-grid">
              {pricingCards.map((p, i) => (
                <div key={i} className="tc-biz-price-card">
                  <div>
                    <div className="tc-biz-price-name">{p.name}</div>
                    <div className="tc-biz-price-desc">{p.desc}</div>
                  </div>
                  <div className="tc-biz-price-amt">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-biz-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-biz-quote-card">
              <div className="tc-biz-quote-text">"{t.quote}"</div>
              <div className="tc-biz-quote-author">-- {t.author}</div>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-biz-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-biz-gallery-img"
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
