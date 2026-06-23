import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalAttorney(props: TemplateProps) {
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
    const id = "font-legal-attorney";
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

  const css = `
    .tlf-attorney-root {
      --tlf-bg: linear-gradient(135deg,#21130c,#3b2416 52%,#0f0b08);
      --tlf-color: #f8fafc;
      --tlf-accent: #b7793b;
      --tlf-accent-text: #fff7ed;
      --tlf-head: #fff7ed;
      --tlf-text: #f5e6d3;
      --tlf-muted: #e7d8c5;
      --tlf-card: rgba(255,255,255,.08);
      --tlf-card-line: rgba(255,255,255,.15);
      --tlf-service-bg: rgba(255,255,255,.08);
      --tlf-pill-bg: rgba(255,255,255,.08);
      --tlf-pill-border: rgba(255,255,255,.18);
      --tlf-orb: rgba(180,83,9,.22);
      --tlf-font-display: "Libre Baskerville", serif;
      --tlf-font-body: "Inter", sans-serif;

      background: var(--tlf-bg);
      color: var(--tlf-color);
      font-family: var(--tlf-font-body);
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .tlf-attorney-root *,
    .tlf-attorney-root *::before,
    .tlf-attorney-root *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* Decorative orb */
    .tlf-attorney-orb {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--tlf-orb) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .tlf-attorney-orb-bottom {
      position: absolute;
      bottom: -160px;
      left: -100px;
      width: 520px;
      height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--tlf-orb) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    /* NAV */
    .tlf-attorney-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 48px;
      position: relative;
      z-index: 2;
      border-bottom: 1px solid var(--tlf-card-line);
    }

    .tlf-attorney-nav-brand {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .tlf-attorney-nav-logo {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: var(--tlf-accent);
      color: var(--tlf-accent-text);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--tlf-font-display);
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }

    .tlf-attorney-nav-name {
      font-family: var(--tlf-font-display);
      font-weight: 700;
      font-size: 18px;
      color: var(--tlf-head);
      letter-spacing: 0.02em;
    }

    .tlf-attorney-nav-links {
      display: flex;
      gap: 32px;
      list-style: none;
    }

    .tlf-attorney-nav-links a {
      color: var(--tlf-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      transition: color 0.25s ease;
      cursor: pointer;
    }

    .tlf-attorney-nav-links a:hover {
      color: var(--tlf-accent);
    }

    /* HERO */
    .tlf-attorney-hero {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      padding: 64px 48px 56px;
      position: relative;
      z-index: 1;
      align-items: center;
    }

    .tlf-attorney-hero-left {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .tlf-attorney-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tlf-attorney-pill {
      background: var(--tlf-pill-bg);
      border: 1px solid var(--tlf-pill-border);
      border-radius: 20px;
      padding: 5px 14px;
      font-size: 12px;
      font-weight: 600;
      color: var(--tlf-muted);
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .tlf-attorney-hero-title {
      font-family: var(--tlf-font-display);
      font-size: 44px;
      font-weight: 700;
      color: var(--tlf-head);
      line-height: 1.15;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-wrap: wrap;
    }

    .tlf-attorney-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--tlf-accent);
      color: var(--tlf-accent-text);
      font-size: 14px;
      flex-shrink: 0;
      line-height: 1;
    }

    .tlf-attorney-hero-tagline {
      font-size: 18px;
      color: var(--tlf-muted);
      line-height: 1.6;
      font-weight: 400;
    }

    .tlf-attorney-hero-bio {
      font-size: 15px;
      color: var(--tlf-text);
      line-height: 1.7;
      max-width: 540px;
    }

    .tlf-attorney-stats {
      display: flex;
      gap: 32px;
      padding: 16px 0;
      border-top: 1px solid var(--tlf-card-line);
      border-bottom: 1px solid var(--tlf-card-line);
    }

    .tlf-attorney-stat-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tlf-attorney-stat-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--tlf-muted);
    }

    .tlf-attorney-stat-value {
      font-size: 15px;
      font-weight: 700;
      color: var(--tlf-head);
    }

    .tlf-attorney-hero-actions {
      display: flex;
      gap: 14px;
      padding-top: 4px;
    }

    .tlf-attorney-btn-primary {
      background: var(--tlf-accent);
      color: var(--tlf-accent-text);
      border: none;
      border-radius: 8px;
      padding: 14px 32px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.2s ease;
      letter-spacing: 0.02em;
      font-family: var(--tlf-font-body);
    }

    .tlf-attorney-btn-primary:hover {
      background: #ca8a3e;
      transform: translateY(-1px);
    }

    .tlf-attorney-btn-secondary {
      background: transparent;
      color: var(--tlf-muted);
      border: 1px solid var(--tlf-card-line);
      border-radius: 8px;
      padding: 14px 28px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.25s ease, color 0.25s ease;
      font-family: var(--tlf-font-body);
    }

    .tlf-attorney-btn-secondary:hover {
      border-color: var(--tlf-accent);
      color: var(--tlf-accent);
    }

    /* Hero right - media card */
    .tlf-attorney-hero-right {
      position: relative;
    }

    .tlf-attorney-media-card {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 20px 60px rgba(0,0,0,.4);
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }

    .tlf-attorney-media-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 28px 70px rgba(0,0,0,.5);
    }

    .tlf-attorney-media-card img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      display: block;
    }

    .tlf-attorney-media-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px 20px;
      background: linear-gradient(transparent, rgba(0,0,0,.65));
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .tlf-attorney-media-note {
      font-size: 12px;
      color: rgba(255,255,255,.85);
      font-weight: 600;
      letter-spacing: 0.03em;
    }

    /* MAIN CONTENT GRID */
    .tlf-attorney-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 0 48px 56px;
      position: relative;
      z-index: 1;
    }

    .tlf-attorney-panel {
      background: var(--tlf-card);
      border: 1px solid var(--tlf-card-line);
      border-radius: 14px;
      padding: 36px;
    }

    .tlf-attorney-panel-title {
      font-family: var(--tlf-font-display);
      font-size: 22px;
      font-weight: 700;
      color: var(--tlf-head);
      margin-bottom: 20px;
    }

    .tlf-attorney-panel-text {
      font-size: 14px;
      color: var(--tlf-text);
      line-height: 1.75;
      margin-bottom: 16px;
    }

    .tlf-attorney-panel-area {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--tlf-muted);
      padding-top: 12px;
      border-top: 1px solid var(--tlf-card-line);
    }

    .tlf-attorney-panel-area-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--tlf-accent);
      flex-shrink: 0;
    }

    .tlf-attorney-services-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .tlf-attorney-service-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: var(--tlf-service-bg);
      border-bottom: 1px solid var(--tlf-card-line);
      font-size: 15px;
      color: var(--tlf-text);
      transition: background 0.2s ease;
    }

    .tlf-attorney-service-item:first-child {
      border-radius: 8px 8px 0 0;
    }

    .tlf-attorney-service-item:last-child {
      border-radius: 0 0 8px 8px;
      border-bottom: none;
    }

    .tlf-attorney-service-item:hover {
      background: rgba(255,255,255,.12);
    }

    .tlf-attorney-service-symbol {
      color: var(--tlf-accent);
      font-weight: 700;
      font-size: 18px;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }

    /* INFO ROW */
    .tlf-attorney-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      padding: 0 48px 56px;
      position: relative;
      z-index: 1;
    }

    .tlf-attorney-info-card {
      background: var(--tlf-card);
      border: 1px solid var(--tlf-card-line);
      border-radius: 12px;
      padding: 28px 24px;
      text-align: center;
      transition: border-color 0.25s ease, transform 0.25s ease;
    }

    .tlf-attorney-info-card:hover {
      border-color: var(--tlf-accent);
      transform: translateY(-2px);
    }

    .tlf-attorney-info-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--tlf-muted);
      margin-bottom: 8px;
    }

    .tlf-attorney-info-value {
      font-family: var(--tlf-font-display);
      font-size: 18px;
      font-weight: 700;
      color: var(--tlf-head);
    }

    /* GALLERY */
    .tlf-attorney-gallery-section {
      padding: 0 48px 72px;
      position: relative;
      z-index: 1;
    }

    .tlf-attorney-gallery-heading {
      font-family: var(--tlf-font-display);
      font-size: 28px;
      font-weight: 700;
      color: var(--tlf-head);
      margin-bottom: 32px;
      text-align: center;
    }

    .tlf-attorney-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .tlf-attorney-gallery-item {
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .tlf-attorney-gallery-item:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(0,0,0,.35);
    }

    .tlf-attorney-gallery-item img {
      width: 100%;
      height: 260px;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    .tlf-attorney-gallery-item:hover img {
      transform: scale(1.04);
    }

    .tlf-attorney-gallery-item::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(transparent 60%, rgba(0,0,0,.3));
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .tlf-attorney-gallery-item:hover::after {
      opacity: 1;
    }

    /* RESPONSIVE */
    @media (max-width: 980px) {
      .tlf-attorney-nav {
        padding: 16px 28px;
      }

      .tlf-attorney-hero {
        grid-template-columns: 1fr;
        padding: 40px 28px 40px;
        gap: 36px;
      }

      .tlf-attorney-hero-title {
        font-size: 34px;
      }

      .tlf-attorney-main {
        grid-template-columns: 1fr;
        padding: 0 28px 40px;
      }

      .tlf-attorney-info-row {
        padding: 0 28px 40px;
      }

      .tlf-attorney-gallery-section {
        padding: 0 28px 56px;
      }

      .tlf-attorney-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .tlf-attorney-media-card img {
        height: 360px;
      }
    }

    @media (max-width: 620px) {
      .tlf-attorney-nav {
        padding: 14px 18px;
        gap: 12px;
      }

      .tlf-attorney-nav-links {
        gap: 16px;
      }

      .tlf-attorney-nav-links a {
        font-size: 12px;
      }

      .tlf-attorney-nav-name {
        font-size: 15px;
      }

      .tlf-attorney-hero {
        padding: 28px 18px 32px;
        gap: 28px;
      }

      .tlf-attorney-hero-title {
        font-size: 26px;
      }

      .tlf-attorney-hero-tagline {
        font-size: 15px;
      }

      .tlf-attorney-hero-bio {
        font-size: 14px;
      }

      .tlf-attorney-stats {
        gap: 20px;
        flex-wrap: wrap;
      }

      .tlf-attorney-hero-actions {
        flex-direction: column;
      }

      .tlf-attorney-btn-primary,
      .tlf-attorney-btn-secondary {
        width: 100%;
        text-align: center;
      }

      .tlf-attorney-media-card img {
        height: 260px;
      }

      .tlf-attorney-main {
        padding: 0 18px 32px;
      }

      .tlf-attorney-panel {
        padding: 24px 20px;
      }

      .tlf-attorney-info-row {
        grid-template-columns: 1fr;
        padding: 0 18px 32px;
      }

      .tlf-attorney-gallery-section {
        padding: 0 18px 48px;
      }

      .tlf-attorney-gallery-grid {
        grid-template-columns: 1fr;
      }

      .tlf-attorney-gallery-heading {
        font-size: 22px;
        margin-bottom: 24px;
      }

      .tlf-attorney-gallery-item img {
        height: 220px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-attorney-root">
        {/* Decorative orbs */}
        <div className="tlf-attorney-orb" />
        <div className="tlf-attorney-orb-bottom" />

        {/* NAV */}
        <nav className="tlf-attorney-nav">
          <div className="tlf-attorney-nav-brand">
            <div className="tlf-attorney-nav-logo">{name.charAt(0)}</div>
            <span className="tlf-attorney-nav-name">{name}</span>
          </div>
          <div className="tlf-attorney-nav-links">
            <a href="#tlf-gallery">Portfolio</a>
            <a href="#tlf-credentials">Credentials</a>
            <a
              href="#tlf-hire"
              onClick={(e) => {
                e.preventDefault();
                onHire();
              }}
            >
              Hire
            </a>
          </div>
        </nav>

        {/* HERO */}
        <div className="tlf-attorney-hero">
          <div className="tlf-attorney-hero-left">
            <div className="tlf-attorney-pills">
              {specialties.map((s, i) => (
                <span key={i} className="tlf-attorney-pill">
                  {s}
                </span>
              ))}
            </div>

            <h2 className="tlf-attorney-hero-title">
              {name}
              {verified && (
                <span className="tlf-attorney-verified" title="Verified">
                  &#10003;
                </span>
              )}
            </h2>

            <p className="tlf-attorney-hero-tagline">{tagline}</p>

            <p className="tlf-attorney-hero-bio">{bio}</p>

            <div className="tlf-attorney-stats">
              <div className="tlf-attorney-stat-item">
                <span className="tlf-attorney-stat-label">Service Area</span>
                <span className="tlf-attorney-stat-value">{serviceArea}</span>
              </div>
              {priceLabel && (
                <div className="tlf-attorney-stat-item">
                  <span className="tlf-attorney-stat-label">Pricing</span>
                  <span className="tlf-attorney-stat-value">{priceLabel}</span>
                </div>
              )}
            </div>

            <div className="tlf-attorney-hero-actions" id="tlf-hire">
              <button className="tlf-attorney-btn-primary" onClick={onHire}>
                Hire Me
              </button>
              <a href="#tlf-gallery" className="tlf-attorney-btn-secondary">
                View Work
              </a>
            </div>
          </div>

          <div className="tlf-attorney-hero-right">
            {heroPhoto && (
              <div
                className="tlf-attorney-media-card"
                onClick={() => onPhotoClick(0)}
              >
                <img src={heroPhoto.url} alt={heroPhoto.filename} />
                <div className="tlf-attorney-media-overlay">
                  <span className="tlf-attorney-media-note">Featured Work</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="tlf-attorney-main" id="tlf-credentials">
          <div className="tlf-attorney-panel">
            <h3 className="tlf-attorney-panel-title">
              Credentials &amp; Experience
            </h3>
            <p className="tlf-attorney-panel-text">{bio}</p>
            <div className="tlf-attorney-panel-area">
              <span className="tlf-attorney-panel-area-dot" />
              <span>Serving {serviceArea}</span>
            </div>
          </div>

          <div className="tlf-attorney-panel">
            <h3 className="tlf-attorney-panel-title">Services</h3>
            <ul className="tlf-attorney-services-list">
              {specialties.map((s, i) => (
                <li key={i} className="tlf-attorney-service-item">
                  <span className="tlf-attorney-service-symbol">&sect;</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* INFO ROW */}
        <div className="tlf-attorney-info-row">
          <div className="tlf-attorney-info-card">
            <div className="tlf-attorney-info-label">Service Area</div>
            <div className="tlf-attorney-info-value">{serviceArea}</div>
          </div>
          <div className="tlf-attorney-info-card">
            <div className="tlf-attorney-info-label">Starting Rate</div>
            <div className="tlf-attorney-info-value">
              {priceLabel || "Contact for pricing"}
            </div>
          </div>
          <div className="tlf-attorney-info-card">
            <div className="tlf-attorney-info-label">Specialties</div>
            <div className="tlf-attorney-info-value">
              {specialties.length} Area{specialties.length !== 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* GALLERY */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-attorney-gallery-section" id="tlf-gallery">
            <h3 className="tlf-attorney-gallery-heading">Portfolio</h3>
            <div className="tlf-attorney-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-attorney-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
