// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingCareer(props: TemplateProps) {
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
    const id = "font-tc-career";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const kickers = specialties.length >= 3 ? specialties.slice(0, 3) : ["Resume strategy", "Interview prep", "Offer confidence"];

  const credentials = ["Former Recruiter", "SHRM Certified", "500+ Clients"];

  const features = [
    { title: "Resume Overhaul", desc: "ATS-optimized, story-driven resumes that get past filters." },
    { title: "Interview Prep", desc: "Mock sessions with real-time feedback and confidence drills." },
    { title: "Salary Negotiation", desc: "Data-backed strategies to maximize your compensation." },
    { title: "LinkedIn Optimization", desc: "Profile revamp to attract recruiters organically." },
  ];

  const pricingCards = [
    { name: "Resume Refresh", price: "$250", desc: "Full resume rewrite + cover letter" },
    { name: "Interview Sprint", price: "$495", desc: "3 mock interviews + strategy session" },
    { name: "Career Pivot", price: "$1,200", desc: "6-week full career transition program" },
  ];

  const testimonials = [
    { quote: "Landed my dream job within 6 weeks of starting. The resume alone got me 5 interviews.", author: "Jordan T." },
    { quote: "The mock interviews were a game-changer. I went from nervous to confident overnight.", author: "Aisha R." },
    { quote: "Negotiated $25K more than my initial offer. Best investment in my career.", author: "Marcus W." },
  ];

  const css = `
    .tc-career-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #eef4ff 0%, #ffffff 48%, #e0f2fe 100%);
      color: #172554;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-career-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(23,37,84,.08);
    }
    .tc-career-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Manrope', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #172554;
    }
    .tc-career-brand-dot {
      width: 32px;
      height: 32px;
      background: #2563eb;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-weight: 800;
      font-size: 0.95rem;
    }
    .tc-career-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .tc-career-nav-links span {
      cursor: pointer;
      color: #172554;
      opacity: 0.65;
      transition: opacity 0.2s;
    }
    .tc-career-nav-links span:hover { opacity: 1; }

    /* ── Hero Grid ── */
    .tc-career-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-career-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tc-career-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-career-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #2563eb;
      background: rgba(37,99,235,.08);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-career-hero h2 {
      font-family: 'Manrope', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1.15;
      color: #172554;
      margin: 0 0 18px 0;
    }
    .tc-career-hero-desc {
      font-size: 0.95rem;
      color: #3b5998;
      line-height: 1.7;
      margin-bottom: 16px;
      max-width: 460px;
    }

    /* Profile Strip */
    .tc-career-profile-strip {
      display: flex;
      align-items: center;
      gap: 14px;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(37,99,235,.12);
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 24px;
      max-width: 400px;
    }
    .tc-career-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #60a5fa);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-weight: 800;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .tc-career-strip-text {
      font-size: 0.82rem;
      color: #172554;
      line-height: 1.5;
    }
    .tc-career-strip-text strong {
      display: block;
      font-weight: 700;
      font-size: 0.88rem;
    }

    .tc-career-hero-area {
      font-size: 0.82rem;
      color: #6b7fa8;
      margin-bottom: 24px;
    }
    .tc-career-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-career-btn-primary {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      font-family: 'Manrope', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #2563eb;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-career-btn-primary:hover {
      background: transparent;
      color: #2563eb;
    }
    .tc-career-btn-ghost {
      display: inline-block;
      background: transparent;
      color: #172554;
      font-family: 'Manrope', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid rgba(23,37,84,.18);
      border-radius: 8px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tc-career-btn-ghost:hover {
      border-color: #172554;
    }

    /* Hero Card */
    .tc-career-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(23,37,84,.10);
    }
    .tc-career-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .tc-career-floating-note {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 0.82rem;
      color: #172554;
      font-style: italic;
      max-width: 240px;
      line-height: 1.5;
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }

    /* Verified Badge */
    .tc-career-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: #172554;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      flex-shrink: 0;
    }
    .tc-career-verified svg {
      width: 12px;
      height: 12px;
    }

    /* ── Section Grid ── */
    .tc-career-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-career-panel {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(23,37,84,.06);
      border-radius: 16px;
      padding: 36px 28px;
    }
    .tc-career-panel h3 {
      font-family: 'Manrope', sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      color: #172554;
      margin: 0 0 16px 0;
    }
    .tc-career-panel-bio {
      font-size: 0.9rem;
      color: #3b5998;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .tc-career-feature-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;
    }
    .tc-career-feature-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .tc-career-feature-icon {
      width: 8px;
      height: 8px;
      background: #2563eb;
      border-radius: 50%;
      margin-top: 7px;
      flex-shrink: 0;
    }
    .tc-career-feature-title {
      font-weight: 600;
      font-size: 0.88rem;
      color: #172554;
    }
    .tc-career-feature-desc {
      font-size: 0.8rem;
      color: #6b7fa8;
      line-height: 1.5;
    }
    .tc-career-cred-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tc-career-cred {
      font-size: 0.75rem;
      font-weight: 600;
      color: #2563eb;
      background: rgba(37,99,235,.08);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Pricing Cards */
    .tc-career-pricing-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tc-career-price-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(23,37,84,.06);
      border-radius: 12px;
      padding: 18px 20px;
      transition: box-shadow 0.2s;
    }
    .tc-career-price-card:hover {
      box-shadow: 0 4px 16px rgba(23,37,84,.06);
    }
    .tc-career-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #172554;
    }
    .tc-career-price-desc {
      font-size: 0.78rem;
      color: #6b7fa8;
      margin-top: 2px;
    }
    .tc-career-price-amt {
      font-family: 'Manrope', sans-serif;
      font-size: 1.3rem;
      font-weight: 800;
      color: #2563eb;
    }

    /* ── Testimonials ── */
    .tc-career-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-career-quote-card {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(23,37,84,.06);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-career-quote-text {
      font-size: 0.9rem;
      color: #172554;
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 14px;
    }
    .tc-career-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #2563eb;
    }

    /* ── Mini Gallery ── */
    .tc-career-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-career-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tc-career-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(23,37,84,.10);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-career-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tc-career-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-career-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-career-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-career-nav {
        padding: 14px 16px;
      }
      .tc-career-nav-links { display: none; }
      .tc-career-hero {
        padding: 28px 16px 28px;
      }
      .tc-career-hero h2 {
        font-size: 1.85rem;
      }
      .tc-career-profile-strip {
        max-width: 100%;
      }
      .tc-career-sections {
        padding: 0 16px 28px;
      }
      .tc-career-testimonials {
        padding: 0 16px 28px;
      }
      .tc-career-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .tc-career-gallery-img {
        height: 220px;
      }
      .tc-career-btn-row {
        flex-direction: column;
      }
      .tc-career-btn-primary,
      .tc-career-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-career-root">
        {/* ── Navline ── */}
        <nav className="tc-career-nav">
          <div className="tc-career-brand">
            <div className="tc-career-brand-dot">C</div>
            Career Navigator
          </div>
          <div className="tc-career-nav-links">
            <span>About</span>
            <span>Services</span>
            <span>Testimonials</span>
            <span>Gallery</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-career-hero">
          <div className="tc-career-hero-copy">
            <div className="tc-career-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-career-kicker">{k}</span>
              ))}
            </div>
            <h2>
              Make your next career move with a sharper strategy.
              {verified && (
                <span className="tc-career-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-career-hero-desc">{tagline}</p>

            <div className="tc-career-profile-strip">
              <div className="tc-career-avatar">{name.charAt(0)}</div>
              <div className="tc-career-strip-text">
                <strong>Career Positioning Audit</strong>
                Personalized roadmap for your next move
              </div>
            </div>

            <span className="tc-career-hero-area">{serviceArea}</span>
            <div className="tc-career-btn-row">
              <button className="tc-career-btn-primary" onClick={onHire}>Start Your Strategy</button>
              <button className="tc-career-btn-ghost">View Services</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tc-career-hero-card">
              <img
                className="tc-career-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-career-floating-note">
                "Your career is not a ladder -- it's a portfolio of experiences."
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-career-sections">
          <div className="tc-career-panel">
            <h3>About {name}</h3>
            <p className="tc-career-panel-bio">{bio}</p>
            <div className="tc-career-feature-list">
              {features.map((f, i) => (
                <div key={i} className="tc-career-feature-item">
                  <div className="tc-career-feature-icon" />
                  <div>
                    <div className="tc-career-feature-title">{f?.filename}</div>
                    <div className="tc-career-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tc-career-cred-list">
              {credentials.map((c, i) => (
                <span key={i} className="tc-career-cred">{c}</span>
              ))}
            </div>
          </div>
          <div className="tc-career-panel">
            <h3>Coaching Packages</h3>
            <div className="tc-career-pricing-grid">
              {pricingCards.map((p, i) => (
                <div key={i} className="tc-career-price-card">
                  <div>
                    <div className="tc-career-price-name">{p.name}</div>
                    <div className="tc-career-price-desc">{p.desc}</div>
                  </div>
                  <div className="tc-career-price-amt">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-career-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-career-quote-card">
              <div className="tc-career-quote-text">"{t.quote}"</div>
              <div className="tc-career-quote-author">-- {t.author}</div>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-career-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-career-gallery-img"
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
