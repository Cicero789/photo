// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCoachingADHD(props: TemplateProps) {
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
    const id = "font-tc-adhd";
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
  const kickers = specialties.length >= 3 ? specialties.slice(0, 3) : ["Neurodivergent-friendly", "Low shame", "Real systems"];

  const toolCards = [
    { title: "Time maps", tilt: "-2deg" },
    { title: "Task menus", tilt: "1.5deg" },
    { title: "Reset rituals", tilt: "-1deg" },
    { title: "Dopamine plans", tilt: "2.5deg" },
  ];

  const credentials = ["ADHD-CCSP", "Neurodiversity-Affirming", "Student + Adult Support"];

  const features = [
    { title: "Body Doubling Sessions", desc: "Coworking sessions designed for ADHD brains that thrive with presence." },
    { title: "Executive Function Coaching", desc: "Practical strategies for planning, prioritizing, and following through." },
    { title: "Emotion Regulation", desc: "Tools for managing RSD, overwhelm, and the emotional side of ADHD." },
    { title: "Accountability System", desc: "Gentle, shame-free check-ins that actually work." },
  ];

  const pricingCards = [
    { name: "System Reset", price: "$180", desc: "Single deep-dive session" },
    { name: "Focus Month", price: "$640", desc: "4 weekly sessions + async support" },
    { name: "Semester Support", price: "$1.8k", desc: "12-week structured program" },
  ];

  const testimonials = [
    { quote: "For the first time, someone explained my brain to me without making me feel broken.", author: "Alex K." },
    { quote: "The task menu system changed everything. I actually finish things now.", author: "Jamie L." },
    { quote: "Finally a coach who gets that ADHD is not a motivation problem. Life-changing.", author: "Sam R." },
  ];

  const css = `
    .tc-adhd-root {
      font-family: 'Inter', sans-serif;
      background:
        radial-gradient(circle at 10% 15%, rgba(190,242,100,.18) 0%, transparent 30%),
        radial-gradient(circle at 90% 10%, rgba(103,232,249,.15) 0%, transparent 30%),
        radial-gradient(circle at 50% 85%, rgba(249,168,212,.12) 0%, transparent 30%),
        #ffffff;
      color: #1f2937;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Navline ── */
    .tc-adhd-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(31,41,55,.08);
    }
    .tc-adhd-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f2937;
    }
    .tc-adhd-brand-dot {
      width: 32px;
      height: 32px;
      background: #7c3aed;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .tc-adhd-nav-links {
      display: flex;
      gap: 24px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .tc-adhd-nav-links span {
      cursor: pointer;
      color: #1f2937;
      opacity: 0.65;
      transition: opacity 0.2s;
    }
    .tc-adhd-nav-links span:hover { opacity: 1; }

    /* ── Hero Grid ── */
    .tc-adhd-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 56px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-adhd-hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tc-adhd-kickers {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .tc-adhd-kicker {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #7c3aed;
      background: rgba(124,58,237,.08);
      padding: 4px 12px;
      border-radius: 20px;
    }
    .tc-adhd-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 1.15;
      color: #1f2937;
      margin: 0 0 18px 0;
    }
    .tc-adhd-hero-desc {
      font-size: 0.95rem;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 460px;
    }
    .tc-adhd-hero-area {
      font-size: 0.82rem;
      color: #9ca3af;
      margin-bottom: 24px;
    }

    /* Tool Board */
    .tc-adhd-tools {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;
      margin-bottom: 28px;
    }
    .tc-adhd-tool-card {
      background: #fff;
      border: 2px solid #1f2937;
      border-radius: 10px;
      padding: 20px 14px;
      text-align: center;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 0.88rem;
      color: #1f2937;
      box-shadow: 5px 5px 0 #1f2937;
      transform: rotate(var(--tilt, 0deg));
      transition: transform 0.2s, box-shadow 0.2s;
      cursor: default;
    }
    .tc-adhd-tool-card:hover {
      transform: rotate(0deg) translateY(-3px);
      box-shadow: 7px 7px 0 #7c3aed;
    }

    .tc-adhd-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tc-adhd-btn-primary {
      display: inline-block;
      background: #7c3aed;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 28px;
      border: 2px solid #7c3aed;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tc-adhd-btn-primary:hover {
      background: transparent;
      color: #7c3aed;
    }
    .tc-adhd-btn-ghost {
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
    .tc-adhd-btn-ghost:hover {
      border-color: #1f2937;
    }

    /* Hero Card */
    .tc-adhd-hero-card {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(124,58,237,.10);
    }
    .tc-adhd-hero-img {
      width: 100%;
      height: 100%;
      min-height: 380px;
      object-fit: cover;
      display: block;
      cursor: pointer;
    }
    .tc-adhd-floating-note {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: rgba(255,255,255,.92);
      backdrop-filter: blur(8px);
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 0.82rem;
      color: #1f2937;
      font-style: italic;
      max-width: 260px;
      line-height: 1.5;
      box-shadow: 0 4px 16px rgba(0,0,0,.08);
    }

    /* Verified Badge */
    .tc-adhd-verified {
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
    .tc-adhd-verified svg {
      width: 12px;
      height: 12px;
    }

    /* ── Section Grid ── */
    .tc-adhd-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-adhd-panel {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 16px;
      padding: 36px 28px;
    }
    .tc-adhd-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 16px 0;
    }
    .tc-adhd-panel-bio {
      font-size: 0.9rem;
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    .tc-adhd-feature-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;
    }
    .tc-adhd-feature-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
    }
    .tc-adhd-feature-icon {
      width: 8px;
      height: 8px;
      background: #7c3aed;
      border-radius: 50%;
      margin-top: 7px;
      flex-shrink: 0;
    }
    .tc-adhd-feature-title {
      font-weight: 600;
      font-size: 0.88rem;
      color: #1f2937;
    }
    .tc-adhd-feature-desc {
      font-size: 0.8rem;
      color: #9ca3af;
      line-height: 1.5;
    }
    .tc-adhd-cred-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tc-adhd-cred {
      font-size: 0.75rem;
      font-weight: 600;
      color: #7c3aed;
      background: rgba(124,58,237,.08);
      padding: 5px 14px;
      border-radius: 20px;
    }

    /* Pricing Cards */
    .tc-adhd-pricing-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .tc-adhd-price-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 12px;
      padding: 18px 20px;
      transition: box-shadow 0.2s;
    }
    .tc-adhd-price-card:hover {
      box-shadow: 0 4px 16px rgba(124,58,237,.08);
    }
    .tc-adhd-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #1f2937;
    }
    .tc-adhd-price-desc {
      font-size: 0.78rem;
      color: #9ca3af;
      margin-top: 2px;
    }
    .tc-adhd-price-amt {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #7c3aed;
    }

    /* ── Testimonials ── */
    .tc-adhd-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-adhd-quote-card {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(31,41,55,.06);
      border-radius: 14px;
      padding: 28px 24px;
    }
    .tc-adhd-quote-text {
      font-size: 0.9rem;
      color: #1f2937;
      line-height: 1.7;
      font-style: italic;
      margin-bottom: 14px;
    }
    .tc-adhd-quote-author {
      font-size: 0.8rem;
      font-weight: 600;
      color: #7c3aed;
    }

    /* ── Mini Gallery ── */
    .tc-adhd-gallery {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .tc-adhd-gallery-img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      border-radius: 12px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .tc-adhd-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 24px rgba(124,58,237,.12);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tc-adhd-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .tc-adhd-tools {
        grid-template-columns: repeat(2, 1fr);
      }
      .tc-adhd-sections {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-adhd-testimonials {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tc-adhd-gallery {
        grid-template-columns: 1fr 1fr;
        padding: 0 24px 40px;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tc-adhd-nav {
        padding: 14px 16px;
      }
      .tc-adhd-nav-links { display: none; }
      .tc-adhd-hero {
        padding: 28px 16px 28px;
      }
      .tc-adhd-hero h2 {
        font-size: 1.8rem;
      }
      .tc-adhd-tools {
        grid-template-columns: 1fr 1fr;
      }
      .tc-adhd-sections {
        padding: 0 16px 28px;
      }
      .tc-adhd-testimonials {
        padding: 0 16px 28px;
      }
      .tc-adhd-gallery {
        grid-template-columns: 1fr;
        padding: 0 16px 36px;
      }
      .tc-adhd-gallery-img {
        height: 220px;
      }
      .tc-adhd-btn-row {
        flex-direction: column;
      }
      .tc-adhd-btn-primary,
      .tc-adhd-btn-ghost {
        text-align: center;
        width: 100%;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tc-adhd-root">
        {/* ── Navline ── */}
        <nav className="tc-adhd-nav">
          <div className="tc-adhd-brand">
            <div className="tc-adhd-brand-dot">A</div>
            ADHD Coach Studio
          </div>
          <div className="tc-adhd-nav-links">
            <span>About</span>
            <span>Tools</span>
            <span>Testimonials</span>
            <span>Gallery</span>
          </div>
        </nav>

        {/* ── Hero Grid ── */}
        <div className="tc-adhd-hero">
          <div className="tc-adhd-hero-copy">
            <div className="tc-adhd-kickers">
              {kickers.map((k, i) => (
                <span key={i} className="tc-adhd-kicker">{k}</span>
              ))}
            </div>
            <h2>
              Your brain is not broken. Your systems need to fit.
              {verified && (
                <span className="tc-adhd-verified">
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="M3 6.5L5 8.5L9 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="tc-adhd-hero-desc">{tagline}</p>
            <span className="tc-adhd-hero-area">{serviceArea}</span>

            <div className="tc-adhd-tools">
              {toolCards.map((t, i) => (
                <div
                  key={i}
                  className="tc-adhd-tool-card"
                  style={{ "--tilt": t.tilt } as React.CSSProperties}
                >
                  {t?.filename}
                </div>
              ))}
            </div>

            <div className="tc-adhd-btn-row">
              <button className="tc-adhd-btn-primary" onClick={onHire}>Book a Session</button>
              <button className="tc-adhd-btn-ghost">Explore Tools</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tc-adhd-hero-card">
              <img
                className="tc-adhd-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
              <div className="tc-adhd-floating-note">
                "Different wiring, not defective wiring."
              </div>
            </div>
          )}
        </div>

        {/* ── Section Grid ── */}
        <div className="tc-adhd-sections">
          <div className="tc-adhd-panel">
            <h3>About {name}</h3>
            <p className="tc-adhd-panel-bio">{bio}</p>
            <div className="tc-adhd-feature-list">
              {features.map((f, i) => (
                <div key={i} className="tc-adhd-feature-item">
                  <div className="tc-adhd-feature-icon" />
                  <div>
                    <div className="tc-adhd-feature-title">{f?.filename}</div>
                    <div className="tc-adhd-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="tc-adhd-cred-list">
              {credentials.map((c, i) => (
                <span key={i} className="tc-adhd-cred">{c}</span>
              ))}
            </div>
          </div>
          <div className="tc-adhd-panel">
            <h3>Coaching Packages</h3>
            <div className="tc-adhd-pricing-grid">
              {pricingCards.map((p, i) => (
                <div key={i} className="tc-adhd-price-card">
                  <div>
                    <div className="tc-adhd-price-name">{p.name}</div>
                    <div className="tc-adhd-price-desc">{p.desc}</div>
                  </div>
                  <div className="tc-adhd-price-amt">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div className="tc-adhd-testimonials">
          {testimonials.map((t, i) => (
            <div key={i} className="tc-adhd-quote-card">
              <div className="tc-adhd-quote-text">"{t.quote}"</div>
              <div className="tc-adhd-quote-author">-- {t.author}</div>
            </div>
          ))}
        </div>

        {/* ── Mini Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tc-adhd-gallery">
            {galleryPhotos.map((photo, i) => (
              <img
                key={photo.id}
                className="tc-adhd-gallery-img"
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
