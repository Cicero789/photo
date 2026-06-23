import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalBookkeeper(props: TemplateProps) {
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
    const id = "font-legal-bookkeeper";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1);

  const css = `
    .tlf-bookkeeper {
      font-family: Inter, sans-serif;
      background: linear-gradient(135deg,#f0fdfa,#ffffff 52%,#ccfbf1);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      position: relative;
      overflow: hidden;
    }
    .tlf-bookkeeper::before {
      content: '';
      position: absolute;
      top: -160px;
      right: -120px;
      width: 480px;
      height: 480px;
      background: rgba(20,184,166,.2);
      border-radius: 50%;
      pointer-events: none;
      filter: blur(90px);
      z-index: 0;
    }

    /* ── Nav ── */
    .tlf-bookkeeper-nav {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 32px;
      border-bottom: 1px solid rgba(15,23,42,.08);
      background: rgba(255,255,255,.84);
      backdrop-filter: blur(12px);
      position: relative;
      z-index: 2;
    }
    .tlf-bookkeeper-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #0f766e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Nunito, sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .tlf-bookkeeper-nav-name {
      font-family: Nunito, sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      color: #111827;
      margin-right: auto;
    }
    .tlf-bookkeeper-nav-links {
      display: flex;
      gap: 24px;
    }
    .tlf-bookkeeper-nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s;
      background: none;
      border: none;
      font-family: inherit;
    }
    .tlf-bookkeeper-nav-link:hover {
      color: #0f766e;
    }

    /* ── Hero ── */
    .tlf-bookkeeper-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
      padding: 56px 32px 48px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .tlf-bookkeeper-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tlf-bookkeeper-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(20,184,166,.1);
      color: #0f766e;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .tlf-bookkeeper-hero-title {
      font-family: Nunito, sans-serif;
      font-size: clamp(1.8rem, 3.6vw, 2.8rem);
      font-weight: 900;
      line-height: 1.12;
      color: #111827;
      margin: 0 0 8px;
    }
    .tlf-bookkeeper-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #0f766e;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .tlf-bookkeeper-tagline {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 12px;
      font-style: italic;
    }
    .tlf-bookkeeper-bio {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.75;
      margin: 0 0 24px;
      max-width: 520px;
    }
    .tlf-bookkeeper-stats {
      display: flex;
      gap: 28px;
      margin-bottom: 28px;
    }
    .tlf-bookkeeper-stat-val {
      font-family: Nunito, sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #111827;
    }
    .tlf-bookkeeper-stat-label {
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .tlf-bookkeeper-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tlf-bookkeeper-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 700;
      font-size: 0.9rem;
      border: none;
      border-radius: 10px;
      background: #0f766e;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .tlf-bookkeeper-btn-primary:hover {
      background: #0d9488;
      transform: translateY(-1px);
    }
    .tlf-bookkeeper-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 700;
      font-size: 0.9rem;
      border: 2px solid #0f766e;
      border-radius: 10px;
      background: transparent;
      color: #0f766e;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tlf-bookkeeper-btn-secondary:hover {
      background: #0f766e;
      color: #fff;
    }

    /* Hero Media Card */
    .tlf-bookkeeper-media {
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(20,184,166,.12);
      aspect-ratio: 4/5;
      max-height: 500px;
    }
    .tlf-bookkeeper-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-bookkeeper-media:hover img {
      transform: scale(1.03);
    }
    .tlf-bookkeeper-media-badge {
      position: absolute;
      bottom: 14px;
      left: 14px;
      background: rgba(255,255,255,.9);
      backdrop-filter: blur(8px);
      padding: 7px 16px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      color: #111827;
    }

    /* ── Main Grid ── */
    .tlf-bookkeeper-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-bookkeeper-panel {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 28px;
    }
    .tlf-bookkeeper-panel h3 {
      font-family: Nunito, sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0 0 16px;
      color: #111827;
    }
    .tlf-bookkeeper-panel p {
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 16px;
    }
    .tlf-bookkeeper-services {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tlf-bookkeeper-services li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
      font-size: 0.88rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tlf-bookkeeper-services li:last-child {
      border-bottom: none;
    }
    .tlf-bookkeeper-section-marker {
      color: #0f766e;
      font-weight: 700;
      font-size: 1rem;
    }

    /* ── Info Row ── */
    .tlf-bookkeeper-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-bookkeeper-info-card {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
    }
    .tlf-bookkeeper-info-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(20,184,166,.1);
      color: #0f766e;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      font-size: 1.2rem;
    }
    .tlf-bookkeeper-info-card h4 {
      font-family: Nunito, sans-serif;
      font-size: 0.95rem;
      font-weight: 800;
      margin: 0 0 6px;
      color: #111827;
    }
    .tlf-bookkeeper-info-card p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ── Gallery ── */
    .tlf-bookkeeper-gallery {
      padding: 0 32px 56px;
      position: relative;
      z-index: 1;
    }
    .tlf-bookkeeper-gallery h3 {
      font-family: Nunito, sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      margin: 0 0 20px;
      color: #111827;
    }
    .tlf-bookkeeper-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .tlf-bookkeeper-gallery-item {
      aspect-ratio: 4/3;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
    }
    .tlf-bookkeeper-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-bookkeeper-gallery-item:hover img {
      transform: scale(1.05);
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tlf-bookkeeper-hero {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px 24px 36px;
      }
      .tlf-bookkeeper-media {
        max-height: 400px;
      }
      .tlf-bookkeeper-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-bookkeeper-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-bookkeeper-gallery {
        padding: 0 24px 40px;
      }
      .tlf-bookkeeper-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tlf-bookkeeper-nav {
        padding: 14px 16px;
        gap: 10px;
      }
      .tlf-bookkeeper-nav-links {
        gap: 14px;
      }
      .tlf-bookkeeper-hero {
        padding: 28px 16px 24px;
      }
      .tlf-bookkeeper-hero-title {
        font-size: 1.6rem;
      }
      .tlf-bookkeeper-stats {
        flex-wrap: wrap;
        gap: 16px;
      }
      .tlf-bookkeeper-btns {
        flex-direction: column;
      }
      .tlf-bookkeeper-main {
        padding: 0 16px 28px;
      }
      .tlf-bookkeeper-info-row {
        padding: 0 16px 28px;
      }
      .tlf-bookkeeper-gallery {
        padding: 0 16px 32px;
      }
      .tlf-bookkeeper-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-bookkeeper">
        {/* ── Nav ── */}
        <nav className="tlf-bookkeeper-nav">
          <div className="tlf-bookkeeper-logo">{name.charAt(0)}</div>
          <span className="tlf-bookkeeper-nav-name">{name}</span>
          <div className="tlf-bookkeeper-nav-links">
            <button className="tlf-bookkeeper-nav-link">Portfolio</button>
            <button className="tlf-bookkeeper-nav-link">Credentials</button>
            <button className="tlf-bookkeeper-nav-link" onClick={onHire}>Hire</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="tlf-bookkeeper-hero">
          <div>
            <div className="tlf-bookkeeper-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span className="tlf-bookkeeper-pill" key={i}>{s}</span>
              ))}
            </div>
            <h2 className="tlf-bookkeeper-hero-title">
              {name}
              {verified && (
                <span className="tlf-bookkeeper-verified" title="Verified">&#10003;</span>
              )}
            </h2>
            <p className="tlf-bookkeeper-tagline">{tagline}</p>
            <p className="tlf-bookkeeper-bio">{bio}</p>
            <div className="tlf-bookkeeper-stats">
              <div>
                <div className="tlf-bookkeeper-stat-val">{serviceArea}</div>
                <div className="tlf-bookkeeper-stat-label">Service Area</div>
              </div>
              {priceLabel && (
                <div>
                  <div className="tlf-bookkeeper-stat-val">{priceLabel}</div>
                  <div className="tlf-bookkeeper-stat-label">Pricing</div>
                </div>
              )}
              <div>
                <div className="tlf-bookkeeper-stat-val">{portfolio.length}</div>
                <div className="tlf-bookkeeper-stat-label">Portfolio Shots</div>
              </div>
            </div>
            <div className="tlf-bookkeeper-btns">
              <button className="tlf-bookkeeper-btn-primary" onClick={onHire}>Hire Now</button>
              <button className="tlf-bookkeeper-btn-secondary">View Portfolio</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tlf-bookkeeper-media">
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="lazy"
                onClick={() => onPhotoClick(0)}
              />
              <div className="tlf-bookkeeper-media-badge">
                {specialties[0] || "Bookkeeper Photography"} &bull; {serviceArea}
              </div>
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="tlf-bookkeeper-main">
          <div className="tlf-bookkeeper-panel">
            <h3>Services &amp; Expertise</h3>
            <ul className="tlf-bookkeeper-services">
              {specialties.map((s, i) => (
                <li key={i}>
                  <span className="tlf-bookkeeper-section-marker">&sect;</span>
                  {s}
                </li>
              ))}
              {specialties.length === 0 && (
                <>
                  <li><span className="tlf-bookkeeper-section-marker">&sect;</span> Financial Audits</li>
                  <li><span className="tlf-bookkeeper-section-marker">&sect;</span> Tax Preparation</li>
                  <li><span className="tlf-bookkeeper-section-marker">&sect;</span> Payroll Documentation</li>
                </>
              )}
            </ul>
          </div>
          <div className="tlf-bookkeeper-panel">
            <h3>About</h3>
            <p>{bio}</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Based in {serviceArea}. {verified ? "Verified professional." : ""}
            </p>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tlf-bookkeeper-info-row">
          <div className="tlf-bookkeeper-info-card">
            <div className="tlf-bookkeeper-info-card-icon">&#9878;</div>
            <h4>Financial Expertise</h4>
            <p>Specialized documentation photography for accounting firms.</p>
          </div>
          <div className="tlf-bookkeeper-info-card">
            <div className="tlf-bookkeeper-info-card-icon">&#9201;</div>
            <h4>Rapid Turnaround</h4>
            <p>Polished deliverables within 24 hours of every session.</p>
          </div>
          <div className="tlf-bookkeeper-info-card">
            <div className="tlf-bookkeeper-info-card-icon">&#9733;</div>
            <h4>Client Trust</h4>
            <p>Partnered with bookkeepers and CPAs across {serviceArea}.</p>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-bookkeeper-gallery">
            <h3>Portfolio</h3>
            <div className="tlf-bookkeeper-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-bookkeeper-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
