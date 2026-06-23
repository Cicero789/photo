import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalChiro(props: TemplateProps) {
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
    const id = "font-medical-chiro";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600;700&display=swap";
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
    .tmd-chiro-root {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #f7fee7, #ffffff 48%, #ecfccb);
      color: #111827;
      min-height: 100vh;
      line-height: 1.65;
      overflow-x: hidden;
    }
    .tmd-chiro-root * { box-sizing: border-box; }

    /* ── Nav ── */
    .tmd-chiro-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 36px;
      background: rgba(255,255,255,.72);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(15,23,42,.06);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .tmd-chiro-nav-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #65a30d;
      color: #1a2e05;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .tmd-chiro-nav-name {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.12rem;
      color: #111827;
      margin-right: auto;
    }
    .tmd-chiro-nav-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tmd-chiro-nav-link {
      background: none;
      border: none;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: #64748b;
      padding: 7px 16px;
      border-radius: 8px;
      transition: color .2s, background .2s;
    }
    .tmd-chiro-nav-link:hover {
      color: #65a30d;
      background: rgba(101,163,13,.08);
    }
    .tmd-chiro-nav-link--hire {
      background: #65a30d;
      color: #fff;
      border-radius: 10px;
    }
    .tmd-chiro-nav-link--hire:hover {
      background: #4d7c0f;
      color: #fff;
    }

    /* ── Orbs (background decoration) ── */
    .tmd-chiro-orb {
      position: absolute;
      border-radius: 50%;
      background: rgba(132,204,22,.28);
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }
    .tmd-chiro-orb--1 { width: 420px; height: 420px; top: -80px; right: -100px; }
    .tmd-chiro-orb--2 { width: 300px; height: 300px; bottom: -60px; left: -80px; }

    /* ── Hero ── */
    .tmd-chiro-hero {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 64px 36px 56px;
    }
    .tmd-chiro-hero-left { position: relative; z-index: 1; }
    .tmd-chiro-hero-right { position: relative; z-index: 1; }

    /* Specialty pills */
    .tmd-chiro-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .tmd-chiro-pill {
      font-size: 0.78rem;
      font-weight: 600;
      padding: 5px 14px;
      border-radius: 20px;
      background: rgba(101,163,13,.12);
      color: #4d7c0f;
      letter-spacing: .01em;
      white-space: nowrap;
    }

    /* Hero heading */
    .tmd-chiro-hero-heading {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 2.6rem;
      line-height: 1.18;
      color: #111827;
      margin: 0 0 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
    }
    .tmd-chiro-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #65a30d;
      color: #1a2e05;
      font-size: 0.85rem;
      font-weight: 700;
      flex-shrink: 0;
      line-height: 1;
    }

    .tmd-chiro-tagline {
      font-size: 1.1rem;
      color: #64748b;
      margin: 0 0 18px;
      font-weight: 400;
    }
    .tmd-chiro-bio {
      font-size: 0.95rem;
      color: #374151;
      margin: 0 0 28px;
      line-height: 1.72;
    }

    /* Stat bar */
    .tmd-chiro-stat-bar {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-bottom: 28px;
      padding: 14px 20px;
      background: rgba(255,255,255,.8);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
    }
    .tmd-chiro-stat-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .tmd-chiro-stat-label {
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .06em;
      color: #64748b;
    }
    .tmd-chiro-stat-value {
      font-size: 0.95rem;
      font-weight: 700;
      color: #111827;
    }
    .tmd-chiro-stat-divider {
      width: 1px;
      height: 32px;
      background: rgba(15,23,42,.1);
      flex-shrink: 0;
    }

    /* Hire button */
    .tmd-chiro-hire-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #65a30d;
      color: #fff;
      border: none;
      padding: 14px 32px;
      border-radius: 14px;
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: background .2s, transform .15s, box-shadow .2s;
      box-shadow: 0 4px 18px rgba(101,163,13,.25);
    }
    .tmd-chiro-hire-btn:hover {
      background: #4d7c0f;
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(101,163,13,.35);
    }
    .tmd-chiro-hire-btn:active {
      transform: translateY(0);
    }
    .tmd-chiro-price-tag {
      font-size: 0.82rem;
      font-weight: 600;
      color: rgba(255,255,255,.82);
    }

    /* Hero image */
    .tmd-chiro-hero-img-wrap {
      width: 100%;
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border-radius: 80px 28px 80px 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,.1), 0 2px 8px rgba(0,0,0,.05);
      cursor: pointer;
      transition: transform .35s ease, box-shadow .35s ease;
    }
    .tmd-chiro-hero-img-wrap:hover {
      transform: scale(1.015);
      box-shadow: 0 24px 70px rgba(0,0,0,.14);
    }
    .tmd-chiro-hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .5s ease;
    }
    .tmd-chiro-hero-img-wrap:hover .tmd-chiro-hero-img {
      transform: scale(1.04);
    }

    /* ── Two-Panel Section ── */
    .tmd-chiro-panels {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 36px 56px;
    }
    .tmd-chiro-panel {
      background: rgba(255,255,255,.8);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 20px;
      padding: 36px;
      transition: box-shadow .25s, transform .25s;
    }
    .tmd-chiro-panel:hover {
      box-shadow: 0 8px 32px rgba(0,0,0,.06);
      transform: translateY(-2px);
    }
    .tmd-chiro-panel-title {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.25rem;
      color: #111827;
      margin: 0 0 14px;
    }
    .tmd-chiro-panel-accent-line {
      width: 40px;
      height: 3px;
      background: #65a30d;
      border-radius: 2px;
      margin-bottom: 16px;
    }
    .tmd-chiro-panel-text {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.72;
      margin: 0;
    }
    .tmd-chiro-glance-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .tmd-chiro-glance-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      color: #374151;
    }
    .tmd-chiro-glance-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #65a30d;
      flex-shrink: 0;
    }

    /* ── Info Row ── */
    .tmd-chiro-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 36px 56px;
    }
    .tmd-chiro-info-card {
      background: rgba(255,255,255,.8);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 18px;
      padding: 28px;
      text-align: center;
      transition: box-shadow .25s, transform .25s;
    }
    .tmd-chiro-info-card:hover {
      box-shadow: 0 8px 32px rgba(0,0,0,.06);
      transform: translateY(-3px);
    }
    .tmd-chiro-info-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      background: rgba(101,163,13,.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 14px;
      font-size: 1.3rem;
    }
    .tmd-chiro-info-title {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1rem;
      color: #111827;
      margin: 0 0 6px;
    }
    .tmd-chiro-info-desc {
      font-size: 0.85rem;
      color: #64748b;
      margin: 0;
      line-height: 1.55;
    }

    /* ── Gallery ── */
    .tmd-chiro-gallery {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 36px 72px;
    }
    .tmd-chiro-gallery-header {
      text-align: center;
      margin-bottom: 40px;
    }
    .tmd-chiro-gallery-title {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.8rem;
      color: #111827;
      margin: 0 0 8px;
    }
    .tmd-chiro-gallery-sub {
      font-size: 0.95rem;
      color: #64748b;
      margin: 0;
    }
    .tmd-chiro-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .tmd-chiro-gallery-item {
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border-radius: 80px 28px 80px 28px;
      cursor: pointer;
      position: relative;
      box-shadow: 0 4px 20px rgba(0,0,0,.07);
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .tmd-chiro-gallery-item:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow: 0 12px 40px rgba(0,0,0,.12);
    }
    .tmd-chiro-gallery-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform .45s ease;
    }
    .tmd-chiro-gallery-item:hover .tmd-chiro-gallery-img {
      transform: scale(1.06);
    }
    .tmd-chiro-gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,.35) 0%, transparent 50%);
      opacity: 0;
      transition: opacity .3s;
      border-radius: 80px 28px 80px 28px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 24px;
    }
    .tmd-chiro-gallery-item:hover .tmd-chiro-gallery-overlay {
      opacity: 1;
    }
    .tmd-chiro-gallery-overlay-text {
      color: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: .02em;
    }

    /* ── Footer ── */
    .tmd-chiro-footer {
      text-align: center;
      padding: 32px 36px 40px;
      color: #64748b;
      font-size: 0.82rem;
      border-top: 1px solid rgba(15,23,42,.06);
    }
    .tmd-chiro-footer a {
      color: #65a30d;
      text-decoration: none;
      font-weight: 600;
    }
    .tmd-chiro-footer a:hover { text-decoration: underline; }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tmd-chiro-hero {
        grid-template-columns: 1fr;
        gap: 36px;
        padding: 44px 28px 40px;
      }
      .tmd-chiro-hero-right { order: -1; }
      .tmd-chiro-hero-img-wrap { max-width: 480px; margin: 0 auto; }
      .tmd-chiro-hero-heading { font-size: 2rem; }
      .tmd-chiro-panels {
        grid-template-columns: 1fr;
        padding: 0 28px 40px;
      }
      .tmd-chiro-info-row {
        grid-template-columns: 1fr;
        padding: 0 28px 40px;
      }
      .tmd-chiro-gallery { padding: 0 28px 56px; }
      .tmd-chiro-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }
      .tmd-chiro-nav { padding: 14px 20px; }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tmd-chiro-hero { padding: 32px 18px 28px; gap: 28px; }
      .tmd-chiro-hero-heading { font-size: 1.6rem; }
      .tmd-chiro-hero-img-wrap { max-width: 100%; }
      .tmd-chiro-stat-bar { flex-direction: column; align-items: flex-start; gap: 12px; }
      .tmd-chiro-stat-divider { width: 100%; height: 1px; }
      .tmd-chiro-panels { padding: 0 18px 32px; gap: 18px; }
      .tmd-chiro-panel { padding: 24px; }
      .tmd-chiro-info-row { padding: 0 18px 36px; gap: 16px; }
      .tmd-chiro-info-card { padding: 22px; }
      .tmd-chiro-gallery { padding: 0 18px 48px; }
      .tmd-chiro-gallery-grid { grid-template-columns: 1fr; gap: 20px; }
      .tmd-chiro-gallery-title { font-size: 1.4rem; }
      .tmd-chiro-nav { padding: 12px 16px; gap: 10px; }
      .tmd-chiro-nav-links { gap: 4px; }
      .tmd-chiro-nav-link { padding: 6px 10px; font-size: 0.82rem; }
      .tmd-chiro-hire-btn { width: 100%; justify-content: center; }
      .tmd-chiro-footer { padding: 24px 18px 32px; }
    }
  `;

  return (
    <div className="tmd-chiro-root">
      <style>{css}</style>

      {/* ── Nav ── */}
      <nav className="tmd-chiro-nav">
        <div className="tmd-chiro-nav-logo">{initial}</div>
        <div className="tmd-chiro-nav-name">{name}</div>
        <div className="tmd-chiro-nav-links">
          <button className="tmd-chiro-nav-link" type="button">
            Portfolio
          </button>
          <button className="tmd-chiro-nav-link" type="button">
            About
          </button>
          <button
            className="tmd-chiro-nav-link tmd-chiro-nav-link--hire"
            type="button"
            onClick={onHire}
          >
            Hire
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="tmd-chiro-hero">
        <div className="tmd-chiro-orb tmd-chiro-orb--1" />
        <div className="tmd-chiro-orb tmd-chiro-orb--2" />

        {/* Left column */}
        <div className="tmd-chiro-hero-left">
          {specialties.length > 0 && (
            <div className="tmd-chiro-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-chiro-pill">
                  {s}
                </span>
              ))}
            </div>
          )}

          <h2 className="tmd-chiro-hero-heading">
            {name}
            {verified && <span className="tmd-chiro-verified">&#10003;</span>}
          </h2>

          <p className="tmd-chiro-tagline">{tagline}</p>
          <p className="tmd-chiro-bio">{bio}</p>

          <div className="tmd-chiro-stat-bar">
            <div className="tmd-chiro-stat-item">
              <span className="tmd-chiro-stat-label">Service Area</span>
              <span className="tmd-chiro-stat-value">{serviceArea}</span>
            </div>
            <div className="tmd-chiro-stat-divider" />
            <div className="tmd-chiro-stat-item">
              <span className="tmd-chiro-stat-label">Specialties</span>
              <span className="tmd-chiro-stat-value">
                {specialties.length}
              </span>
            </div>
            <div className="tmd-chiro-stat-divider" />
            <div className="tmd-chiro-stat-item">
              <span className="tmd-chiro-stat-label">Portfolio</span>
              <span className="tmd-chiro-stat-value">
                {portfolio.length} photos
              </span>
            </div>
          </div>

          <button
            className="tmd-chiro-hire-btn"
            type="button"
            onClick={onHire}
          >
            Book a Session
            {priceLabel && (
              <span className="tmd-chiro-price-tag">{priceLabel}</span>
            )}
          </button>
        </div>

        {/* Right column */}
        <div className="tmd-chiro-hero-right">
          {heroPhoto && (
            <div
              className="tmd-chiro-hero-img-wrap"
              onClick={() => onPhotoClick(0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onPhotoClick(0);
              }}
            >
              <img
                className="tmd-chiro-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="eager"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Two-Panel Section ── */}
      <section className="tmd-chiro-panels">
        <div className="tmd-chiro-panel">
          <h3 className="tmd-chiro-panel-title">Our Philosophy</h3>
          <div className="tmd-chiro-panel-accent-line" />
          <p className="tmd-chiro-panel-text">
            We believe every chiropractic practice tells a story of healing and
            trust. Our photography captures the authentic connection between
            practitioners and patients, highlighting the professionalism and
            warmth that defines your practice. Each image is crafted to
            communicate confidence, care, and clinical excellence.
          </p>
        </div>
        <div className="tmd-chiro-panel">
          <h3 className="tmd-chiro-panel-title">At a Glance</h3>
          <div className="tmd-chiro-panel-accent-line" />
          <ul className="tmd-chiro-glance-list">
            <li className="tmd-chiro-glance-item">
              <span className="tmd-chiro-glance-dot" />
              Serving {serviceArea}
            </li>
            <li className="tmd-chiro-glance-item">
              <span className="tmd-chiro-glance-dot" />
              {specialties.length} specialized service
              {specialties.length !== 1 ? "s" : ""}
            </li>
            <li className="tmd-chiro-glance-item">
              <span className="tmd-chiro-glance-dot" />
              {portfolio.length} portfolio image
              {portfolio.length !== 1 ? "s" : ""}
            </li>
            {verified && (
              <li className="tmd-chiro-glance-item">
                <span className="tmd-chiro-glance-dot" />
                Verified professional
              </li>
            )}
            {priceLabel && (
              <li className="tmd-chiro-glance-item">
                <span className="tmd-chiro-glance-dot" />
                {priceLabel}
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* ── Info Row ── */}
      <section className="tmd-chiro-info-row">
        <div className="tmd-chiro-info-card">
          <div className="tmd-chiro-info-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#65a30d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h4 className="tmd-chiro-info-title">Service Area</h4>
          <p className="tmd-chiro-info-desc">{serviceArea}</p>
        </div>
        <div className="tmd-chiro-info-card">
          <div className="tmd-chiro-info-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#65a30d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h4 className="tmd-chiro-info-title">Specialties</h4>
          <p className="tmd-chiro-info-desc">
            {specialties.length > 0
              ? specialties.slice(0, 3).join(", ")
              : "Professional photography"}
            {specialties.length > 3 && ` +${specialties.length - 3} more`}
          </p>
        </div>
        <div className="tmd-chiro-info-card">
          <div className="tmd-chiro-info-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#65a30d"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h4 className="tmd-chiro-info-title">About</h4>
          <p className="tmd-chiro-info-desc">
            {bio.length > 120 ? bio.slice(0, 120) + "..." : bio}
          </p>
        </div>
      </section>

      {/* ── Gallery ── */}
      {galleryPhotos.length > 0 && (
        <section className="tmd-chiro-gallery">
          <div className="tmd-chiro-gallery-header">
            <h3 className="tmd-chiro-gallery-title">Portfolio</h3>
            <p className="tmd-chiro-gallery-sub">
              A curated selection of our chiropractic and medical photography
            </p>
          </div>
          <div className="tmd-chiro-gallery-grid">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-chiro-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onPhotoClick(i + 1);
                }}
              >
                <img
                  className="tmd-chiro-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                />
                <div className="tmd-chiro-gallery-overlay">
                  <span className="tmd-chiro-gallery-overlay-text">
                    View Photo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="tmd-chiro-footer">
        &copy; {new Date().getFullYear()} {name} &mdash; Chiropractic &amp;
        Medical Photography
      </footer>
    </div>
  );
}
