import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalNotary(props: TemplateProps) {
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
    const id = "font-legal-notary";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap";
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
    .tlf-notary {
      font-family: Inter, sans-serif;
      background: linear-gradient(135deg,#ffffff,#f1f5f9 55%,#e2e8f0);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      position: relative;
      overflow: hidden;
    }
    .tlf-notary::before {
      content: '';
      position: absolute;
      top: -160px;
      right: -120px;
      width: 480px;
      height: 480px;
      background: rgba(100,116,139,.16);
      border-radius: 50%;
      pointer-events: none;
      filter: blur(90px);
      z-index: 0;
    }

    /* ── Nav ── */
    .tlf-notary-nav {
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
    .tlf-notary-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #475569;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Inter, sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .tlf-notary-nav-name {
      font-family: Inter, sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      color: #111827;
      margin-right: auto;
    }
    .tlf-notary-nav-links {
      display: flex;
      gap: 24px;
    }
    .tlf-notary-nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s;
      background: none;
      border: none;
      font-family: inherit;
    }
    .tlf-notary-nav-link:hover {
      color: #475569;
    }

    /* ── Hero ── */
    .tlf-notary-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
      padding: 56px 32px 48px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .tlf-notary-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tlf-notary-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(100,116,139,.1);
      color: #475569;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .tlf-notary-hero-title {
      font-family: Inter, sans-serif;
      font-size: clamp(1.8rem, 3.6vw, 2.8rem);
      font-weight: 900;
      line-height: 1.12;
      color: #111827;
      margin: 0 0 8px;
    }
    .tlf-notary-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #475569;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .tlf-notary-tagline {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 12px;
      font-style: italic;
    }
    .tlf-notary-bio {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.75;
      margin: 0 0 24px;
      max-width: 520px;
    }
    .tlf-notary-stats {
      display: flex;
      gap: 28px;
      margin-bottom: 28px;
    }
    .tlf-notary-stat-val {
      font-family: Inter, sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: #111827;
    }
    .tlf-notary-stat-label {
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .tlf-notary-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tlf-notary-btn-primary {
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
      background: #475569;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .tlf-notary-btn-primary:hover {
      background: #334155;
      transform: translateY(-1px);
    }
    .tlf-notary-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 700;
      font-size: 0.9rem;
      border: 2px solid #475569;
      border-radius: 10px;
      background: transparent;
      color: #475569;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tlf-notary-btn-secondary:hover {
      background: #475569;
      color: #fff;
    }

    /* Hero Media Card */
    .tlf-notary-media {
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(100,116,139,.12);
      aspect-ratio: 4/5;
      max-height: 500px;
    }
    .tlf-notary-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-notary-media:hover img {
      transform: scale(1.03);
    }
    .tlf-notary-media-badge {
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
    .tlf-notary-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-notary-panel {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 28px;
    }
    .tlf-notary-panel h3 {
      font-family: Inter, sans-serif;
      font-size: 1.15rem;
      font-weight: 800;
      margin: 0 0 16px;
      color: #111827;
    }
    .tlf-notary-panel p {
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 16px;
    }
    .tlf-notary-services {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tlf-notary-services li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
      font-size: 0.88rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tlf-notary-services li:last-child {
      border-bottom: none;
    }
    .tlf-notary-section-marker {
      color: #475569;
      font-weight: 700;
      font-size: 1rem;
    }

    /* ── Info Row ── */
    .tlf-notary-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-notary-info-card {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
    }
    .tlf-notary-info-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(100,116,139,.1);
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      font-size: 1.2rem;
    }
    .tlf-notary-info-card h4 {
      font-family: Inter, sans-serif;
      font-size: 0.95rem;
      font-weight: 800;
      margin: 0 0 6px;
      color: #111827;
    }
    .tlf-notary-info-card p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ── Gallery ── */
    .tlf-notary-gallery {
      padding: 0 32px 56px;
      position: relative;
      z-index: 1;
    }
    .tlf-notary-gallery h3 {
      font-family: Inter, sans-serif;
      font-size: 1.25rem;
      font-weight: 800;
      margin: 0 0 20px;
      color: #111827;
    }
    .tlf-notary-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .tlf-notary-gallery-item {
      aspect-ratio: 4/3;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
    }
    .tlf-notary-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-notary-gallery-item:hover img {
      transform: scale(1.05);
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tlf-notary-hero {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px 24px 36px;
      }
      .tlf-notary-media {
        max-height: 400px;
      }
      .tlf-notary-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-notary-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-notary-gallery {
        padding: 0 24px 40px;
      }
      .tlf-notary-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tlf-notary-nav {
        padding: 14px 16px;
        gap: 10px;
      }
      .tlf-notary-nav-links {
        gap: 14px;
      }
      .tlf-notary-hero {
        padding: 28px 16px 24px;
      }
      .tlf-notary-hero-title {
        font-size: 1.6rem;
      }
      .tlf-notary-stats {
        flex-wrap: wrap;
        gap: 16px;
      }
      .tlf-notary-btns {
        flex-direction: column;
      }
      .tlf-notary-main {
        padding: 0 16px 28px;
      }
      .tlf-notary-info-row {
        padding: 0 16px 28px;
      }
      .tlf-notary-gallery {
        padding: 0 16px 32px;
      }
      .tlf-notary-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-notary">
        {/* ── Nav ── */}
        <nav className="tlf-notary-nav">
          <div className="tlf-notary-logo">{name.charAt(0)}</div>
          <span className="tlf-notary-nav-name">{name}</span>
          <div className="tlf-notary-nav-links">
            <button className="tlf-notary-nav-link">Portfolio</button>
            <button className="tlf-notary-nav-link">Credentials</button>
            <button className="tlf-notary-nav-link" onClick={onHire}>Hire</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="tlf-notary-hero">
          <div>
            <div className="tlf-notary-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span className="tlf-notary-pill" key={i}>{s}</span>
              ))}
            </div>
            <h2 className="tlf-notary-hero-title">
              {name}
              {verified && (
                <span className="tlf-notary-verified" title="Verified">&#10003;</span>
              )}
            </h2>
            <p className="tlf-notary-tagline">{tagline}</p>
            <p className="tlf-notary-bio">{bio}</p>
            <div className="tlf-notary-stats">
              <div>
                <div className="tlf-notary-stat-val">{serviceArea}</div>
                <div className="tlf-notary-stat-label">Service Area</div>
              </div>
              {priceLabel && (
                <div>
                  <div className="tlf-notary-stat-val">{priceLabel}</div>
                  <div className="tlf-notary-stat-label">Pricing</div>
                </div>
              )}
              <div>
                <div className="tlf-notary-stat-val">{portfolio.length}</div>
                <div className="tlf-notary-stat-label">Portfolio Shots</div>
              </div>
            </div>
            <div className="tlf-notary-btns">
              <button className="tlf-notary-btn-primary" onClick={onHire}>Hire Now</button>
              <button className="tlf-notary-btn-secondary">View Portfolio</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tlf-notary-media">
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="lazy"
                onClick={() => onPhotoClick(0)}
              />
              <div className="tlf-notary-media-badge">
                {specialties[0] || "Notary Photography"} &bull; {serviceArea}
              </div>
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="tlf-notary-main">
          <div className="tlf-notary-panel">
            <h3>Services &amp; Expertise</h3>
            <ul className="tlf-notary-services">
              {specialties.map((s, i) => (
                <li key={i}>
                  <span className="tlf-notary-section-marker">&sect;</span>
                  {s}
                </li>
              ))}
              {specialties.length === 0 && (
                <>
                  <li><span className="tlf-notary-section-marker">&sect;</span> Notary Signings</li>
                  <li><span className="tlf-notary-section-marker">&sect;</span> Legal Documentation</li>
                  <li><span className="tlf-notary-section-marker">&sect;</span> Compliance Photography</li>
                </>
              )}
            </ul>
          </div>
          <div className="tlf-notary-panel">
            <h3>About</h3>
            <p>{bio}</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Based in {serviceArea}. {verified ? "Verified professional." : ""}
            </p>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tlf-notary-info-row">
          <div className="tlf-notary-info-card">
            <div className="tlf-notary-info-card-icon">&#9878;</div>
            <h4>Certified &amp; Bonded</h4>
            <p>Professional coverage for notary and legal documentation.</p>
          </div>
          <div className="tlf-notary-info-card">
            <div className="tlf-notary-info-card-icon">&#9201;</div>
            <h4>Same-Day Delivery</h4>
            <p>Rush editing available for time-sensitive legal matters.</p>
          </div>
          <div className="tlf-notary-info-card">
            <div className="tlf-notary-info-card-icon">&#9733;</div>
            <h4>Proven Track Record</h4>
            <p>Trusted by notary offices throughout {serviceArea}.</p>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-notary-gallery">
            <h3>Portfolio</h3>
            <div className="tlf-notary-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-notary-gallery-item"
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
