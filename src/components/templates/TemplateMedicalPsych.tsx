import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalPsych(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    website: _website,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  useEffect(() => {
    const id = "font-medical-psych";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const galleryPhotos = portfolio.slice(1);

  const initial = name.trim().charAt(0).toUpperCase();

  const css = `
    /* ── Root ── */
    .tmd-psych-root {
      position: relative;
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #f5f3ff, #ffffff 48%, #e0f2fe);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* Decorative orbs */
    .tmd-psych-root::before,
    .tmd-psych-root::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
    .tmd-psych-root::before {
      width: 480px;
      height: 480px;
      background: rgba(99,102,241,.18);
      top: -120px;
      right: -140px;
      filter: blur(80px);
    }
    .tmd-psych-root::after {
      width: 360px;
      height: 360px;
      background: rgba(99,102,241,.10);
      bottom: 80px;
      left: -100px;
      filter: blur(70px);
    }

    /* ── Nav ── */
    .tmd-psych-nav {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 18px 40px;
      background: rgba(255,255,255,.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(15,23,42,.08);
    }
    .tmd-psych-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }
    .tmd-psych-nav-name {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #111827;
      margin-right: auto;
    }
    .tmd-psych-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tmd-psych-nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      background: none;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: color 0.2s, background 0.2s;
      font-family: inherit;
    }
    .tmd-psych-nav-link:hover {
      color: #6366f1;
      background: rgba(99,102,241,.08);
    }
    .tmd-psych-nav-link--hire {
      background: #6366f1;
      color: #fff;
      border-radius: 8px;
    }
    .tmd-psych-nav-link--hire:hover {
      background: #4f46e5;
      color: #fff;
    }

    /* ── Hero ── */
    .tmd-psych-hero {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      padding: 64px 40px 56px;
      align-items: center;
    }
    .tmd-psych-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 18px;
    }
    .tmd-psych-pill {
      display: inline-block;
      padding: 5px 14px;
      background: rgba(99,102,241,.10);
      color: #6366f1;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 20px;
      letter-spacing: 0.02em;
    }
    .tmd-psych-hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(28px, 4vw, 46px);
      font-weight: 800;
      line-height: 1.12;
      color: #111827;
      margin: 0 0 8px;
      letter-spacing: -0.02em;
    }
    .tmd-psych-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #6366f1;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
      vertical-align: middle;
      line-height: 1;
    }
    .tmd-psych-hero-tagline {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem;
      font-weight: 600;
      color: #6366f1;
      margin: 0 0 16px;
      line-height: 1.5;
    }
    .tmd-psych-hero-bio {
      font-size: 0.95rem;
      line-height: 1.75;
      color: #64748b;
      margin: 0 0 28px;
      max-width: 500px;
    }
    .tmd-psych-stat-bar {
      display: flex;
      gap: 28px;
      margin-bottom: 28px;
      flex-wrap: wrap;
    }
    .tmd-psych-stat {
      text-align: left;
    }
    .tmd-psych-stat-val {
      font-size: 1.2rem;
      font-weight: 700;
      color: #111827;
    }
    .tmd-psych-stat-label {
      font-size: 0.7rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-weight: 600;
    }
    .tmd-psych-hero-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .tmd-psych-btn-hire {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 0 32px;
      font-family: inherit;
      font-weight: 700;
      font-size: 0.92rem;
      border: none;
      border-radius: 12px;
      background: #6366f1;
      color: #fff;
      cursor: pointer;
      transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
      box-shadow: 0 4px 20px rgba(99,102,241,.25);
    }
    .tmd-psych-btn-hire:hover {
      background: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(99,102,241,.35);
    }
    .tmd-psych-price-tag {
      font-size: 0.82rem;
      color: #64748b;
      font-weight: 500;
    }

    /* Hero photo */
    .tmd-psych-hero-photo-wrap {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(99,102,241,.12);
      aspect-ratio: 4/5;
      max-height: 520px;
    }
    .tmd-psych-hero-photo {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tmd-psych-hero-photo:hover {
      transform: scale(1.03);
    }

    /* ── Two Panel ── */
    .tmd-psych-two-panel {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 40px 48px;
    }
    .tmd-psych-panel-card {
      background: rgba(255,255,255,.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 32px;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .tmd-psych-panel-card:hover {
      box-shadow: 0 12px 40px rgba(99,102,241,.10);
      transform: translateY(-2px);
    }
    .tmd-psych-panel-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 12px;
    }
    .tmd-psych-panel-card p {
      font-size: 0.9rem;
      line-height: 1.75;
      color: #64748b;
      margin: 0;
    }
    .tmd-psych-panel-list {
      list-style: none;
      margin: 16px 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .tmd-psych-panel-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: #111827;
      font-weight: 500;
    }
    .tmd-psych-panel-list li::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #6366f1;
      flex-shrink: 0;
    }

    /* Quick overview stats */
    .tmd-psych-overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 16px;
    }
    .tmd-psych-overview-item {
      background: rgba(99,102,241,.06);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }
    .tmd-psych-overview-item-val {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: #6366f1;
    }
    .tmd-psych-overview-item-label {
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-weight: 600;
      margin-top: 4px;
    }

    /* ── Info Row ── */
    .tmd-psych-info-row {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 40px 48px;
    }
    .tmd-psych-info-card {
      background: rgba(255,255,255,.8);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 28px 24px;
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .tmd-psych-info-card:hover {
      box-shadow: 0 10px 36px rgba(99,102,241,.10);
      transform: translateY(-2px);
    }
    .tmd-psych-info-card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99,102,241,.10);
      font-size: 20px;
      margin-bottom: 14px;
    }
    .tmd-psych-info-card h4 {
      font-family: 'Playfair Display', serif;
      font-size: 1rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 8px;
    }
    .tmd-psych-info-card p {
      font-size: 0.85rem;
      line-height: 1.65;
      color: #64748b;
      margin: 0;
    }
    .tmd-psych-specialty-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }
    .tmd-psych-specialty-tag {
      padding: 4px 10px;
      background: rgba(99,102,241,.08);
      color: #6366f1;
      font-size: 0.72rem;
      font-weight: 600;
      border-radius: 6px;
    }

    /* ── Gallery ── */
    .tmd-psych-gallery {
      position: relative;
      z-index: 1;
      padding: 0 40px 64px;
    }
    .tmd-psych-gallery-header {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 24px;
      text-align: center;
    }
    .tmd-psych-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .tmd-psych-gallery-item {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      aspect-ratio: 4/3;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
      transition: box-shadow 0.3s, transform 0.3s;
    }
    .tmd-psych-gallery-item:hover {
      box-shadow: 0 12px 36px rgba(99,102,241,.14);
      transform: translateY(-3px);
    }
    .tmd-psych-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tmd-psych-gallery-item:hover img {
      transform: scale(1.06);
    }
    .tmd-psych-gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(99,102,241,.25) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    .tmd-psych-gallery-item:hover .tmd-psych-gallery-overlay {
      opacity: 1;
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tmd-psych-nav {
        padding: 16px 24px;
      }
      .tmd-psych-hero {
        grid-template-columns: 1fr;
        gap: 36px;
        padding: 48px 24px 40px;
      }
      .tmd-psych-hero-photo-wrap {
        max-height: 420px;
      }
      .tmd-psych-two-panel {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tmd-psych-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tmd-psych-gallery {
        padding: 0 24px 48px;
      }
      .tmd-psych-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tmd-psych-nav {
        padding: 14px 16px;
        gap: 10px;
      }
      .tmd-psych-nav-name {
        font-size: 0.95rem;
      }
      .tmd-psych-nav-links {
        gap: 4px;
      }
      .tmd-psych-nav-link {
        padding: 6px 10px;
        font-size: 0.78rem;
      }
      .tmd-psych-hero {
        padding: 32px 16px 28px;
        gap: 28px;
      }
      .tmd-psych-hero-title {
        font-size: 1.65rem;
      }
      .tmd-psych-hero-photo-wrap {
        max-height: 340px;
      }
      .tmd-psych-stat-bar {
        gap: 18px;
      }
      .tmd-psych-hero-actions {
        flex-direction: column;
        align-items: flex-start;
      }
      .tmd-psych-two-panel {
        padding: 0 16px 28px;
      }
      .tmd-psych-panel-card {
        padding: 24px 20px;
      }
      .tmd-psych-overview-grid {
        grid-template-columns: 1fr;
      }
      .tmd-psych-info-row {
        padding: 0 16px 28px;
      }
      .tmd-psych-info-card {
        padding: 22px 18px;
      }
      .tmd-psych-gallery {
        padding: 0 16px 36px;
      }
      .tmd-psych-gallery-grid {
        grid-template-columns: 1fr;
        gap: 12px;
      }
      .tmd-psych-gallery-header {
        font-size: 1.25rem;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tmd-psych-root">
        {/* ── Nav ── */}
        <nav className="tmd-psych-nav">
          <div className="tmd-psych-logo">{initial}</div>
          <span className="tmd-psych-nav-name">{name}</span>
          <div className="tmd-psych-nav-links">
            <button className="tmd-psych-nav-link" type="button">
              Portfolio
            </button>
            <button className="tmd-psych-nav-link" type="button">
              About
            </button>
            <button
              className="tmd-psych-nav-link tmd-psych-nav-link--hire"
              type="button"
              onClick={onHire}
            >
              Hire
            </button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="tmd-psych-hero">
          {/* Left column */}
          <div>
            <div className="tmd-psych-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span className="tmd-psych-pill" key={i}>
                  {s}
                </span>
              ))}
              {specialties.length === 0 && (
                <span className="tmd-psych-pill">Psychology Photography</span>
              )}
            </div>

            <h2 className="tmd-psych-hero-title">
              {name}
              {verified && (
                <span className="tmd-psych-verified">&#10003;</span>
              )}
            </h2>

            <p className="tmd-psych-hero-tagline">{tagline}</p>
            <p className="tmd-psych-hero-bio">{bio}</p>

            <div className="tmd-psych-stat-bar">
              <div className="tmd-psych-stat">
                <div className="tmd-psych-stat-val">
                  {serviceArea || "Nationwide"}
                </div>
                <div className="tmd-psych-stat-label">Service Area</div>
              </div>
              <div className="tmd-psych-stat">
                <div className="tmd-psych-stat-val">
                  {specialties.length || 1}+
                </div>
                <div className="tmd-psych-stat-label">Specialties</div>
              </div>
              <div className="tmd-psych-stat">
                <div className="tmd-psych-stat-val">{portfolio.length}</div>
                <div className="tmd-psych-stat-label">Photos</div>
              </div>
            </div>

            <div className="tmd-psych-hero-actions">
              <button
                className="tmd-psych-btn-hire"
                type="button"
                onClick={onHire}
              >
                Book a Session
              </button>
              {priceLabel && (
                <span className="tmd-psych-price-tag">{priceLabel}</span>
              )}
            </div>
          </div>

          {/* Right column — hero photo */}
          {heroPhoto && (
            <div className="tmd-psych-hero-photo-wrap">
              <img
                className="tmd-psych-hero-photo"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="eager"
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Two-Panel Section ── */}
        <div className="tmd-psych-two-panel">
          <div className="tmd-psych-panel-card">
            <h3>Our Approach</h3>
            <p>
              We believe in creating a calm, empathetic environment where
              authentic expression emerges naturally. Every session is tailored
              to reflect the warmth and professionalism of your practice.
            </p>
            <ul className="tmd-psych-panel-list">
              <li>Empathetic, client-centered direction</li>
              <li>Relaxed studio and on-location sessions</li>
              <li>Imagery that builds patient trust</li>
              <li>HIPAA-mindful workflow</li>
            </ul>
          </div>

          <div className="tmd-psych-panel-card">
            <h3>Quick Overview</h3>
            <p>
              A snapshot of what we bring to every engagement.
            </p>
            <div className="tmd-psych-overview-grid">
              <div className="tmd-psych-overview-item">
                <div className="tmd-psych-overview-item-val">
                  {portfolio.length}
                </div>
                <div className="tmd-psych-overview-item-label">
                  Portfolio Photos
                </div>
              </div>
              <div className="tmd-psych-overview-item">
                <div className="tmd-psych-overview-item-val">
                  {specialties.length || 1}
                </div>
                <div className="tmd-psych-overview-item-label">
                  Specialties
                </div>
              </div>
              <div className="tmd-psych-overview-item">
                <div className="tmd-psych-overview-item-val">48h</div>
                <div className="tmd-psych-overview-item-label">Turnaround</div>
              </div>
              <div className="tmd-psych-overview-item">
                <div className="tmd-psych-overview-item-val">5&#9733;</div>
                <div className="tmd-psych-overview-item-label">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tmd-psych-info-row">
          <div className="tmd-psych-info-card">
            <div className="tmd-psych-info-card-icon">&#128205;</div>
            <h4>Service Area</h4>
            <p>{serviceArea || "Available nationwide for on-location and studio sessions tailored to healthcare professionals."}</p>
          </div>

          <div className="tmd-psych-info-card">
            <div className="tmd-psych-info-card-icon">&#10024;</div>
            <h4>Specialties</h4>
            <p>Focused visual storytelling for psychology and mental health practices.</p>
            {specialties.length > 0 && (
              <div className="tmd-psych-specialty-tags">
                {specialties.map((s, i) => (
                  <span className="tmd-psych-specialty-tag" key={i}>
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="tmd-psych-info-card">
            <div className="tmd-psych-info-card-icon">&#128247;</div>
            <h4>Experience</h4>
            <p>
              Years of dedicated experience capturing the human side of
              healthcare — from practitioner headshots to clinic environments
              that convey compassion and expertise.
            </p>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tmd-psych-gallery">
            <h2 className="tmd-psych-gallery-header">Portfolio</h2>
            <div className="tmd-psych-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tmd-psych-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    loading="lazy"
                  />
                  <div className="tmd-psych-gallery-overlay" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
