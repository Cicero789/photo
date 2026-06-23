import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalEstate(props: TemplateProps) {
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
    const id = "font-legal-estate";
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

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1);

  const css = `
    .tlf-estate {
      font-family: Inter, sans-serif;
      background: linear-gradient(135deg,#faf7ef,#ffffff 48%,#f3e8d6);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      position: relative;
      overflow: hidden;
    }
    .tlf-estate::before {
      content: '';
      position: absolute;
      top: -140px;
      right: -100px;
      width: 460px;
      height: 460px;
      background: rgba(146,64,14,.18);
      border-radius: 50%;
      pointer-events: none;
      filter: blur(90px);
      z-index: 0;
    }

    /* ── Nav ── */
    .tlf-estate-nav {
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
    .tlf-estate-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #92400e;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .tlf-estate-nav-name {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 1.05rem;
      color: #111827;
      margin-right: auto;
    }
    .tlf-estate-nav-links {
      display: flex;
      gap: 24px;
    }
    .tlf-estate-nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s;
      background: none;
      border: none;
      font-family: inherit;
    }
    .tlf-estate-nav-link:hover {
      color: #92400e;
    }

    /* ── Hero ── */
    .tlf-estate-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
      padding: 56px 32px 48px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .tlf-estate-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tlf-estate-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(146,64,14,.1);
      color: #92400e;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .tlf-estate-hero-title {
      font-family: 'Libre Baskerville', serif;
      font-size: clamp(1.8rem, 3.6vw, 2.8rem);
      font-weight: 700;
      line-height: 1.15;
      color: #111827;
      margin: 0 0 8px;
    }
    .tlf-estate-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #92400e;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .tlf-estate-tagline {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 12px;
      font-style: italic;
    }
    .tlf-estate-bio {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.75;
      margin: 0 0 24px;
      max-width: 520px;
    }
    .tlf-estate-stats {
      display: flex;
      gap: 28px;
      margin-bottom: 28px;
    }
    .tlf-estate-stat-val {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: #111827;
    }
    .tlf-estate-stat-label {
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .tlf-estate-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tlf-estate-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 600;
      font-size: 0.9rem;
      border: none;
      border-radius: 10px;
      background: #92400e;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .tlf-estate-btn-primary:hover {
      background: #78350f;
      transform: translateY(-1px);
    }
    .tlf-estate-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 600;
      font-size: 0.9rem;
      border: 2px solid #92400e;
      border-radius: 10px;
      background: transparent;
      color: #92400e;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tlf-estate-btn-secondary:hover {
      background: #92400e;
      color: #fff;
    }

    /* Hero Media Card */
    .tlf-estate-media {
      position: relative;
      border-radius: 80px 26px 80px 26px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(146,64,14,.12);
      aspect-ratio: 4/5;
      max-height: 500px;
    }
    .tlf-estate-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-estate-media:hover img {
      transform: scale(1.03);
    }
    .tlf-estate-media-badge {
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
    .tlf-estate-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-estate-panel {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 28px;
    }
    .tlf-estate-panel h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0 0 16px;
      color: #111827;
    }
    .tlf-estate-panel p {
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 16px;
    }
    .tlf-estate-services {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tlf-estate-services li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
      font-size: 0.88rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tlf-estate-services li:last-child {
      border-bottom: none;
    }
    .tlf-estate-section-marker {
      color: #92400e;
      font-weight: 700;
      font-size: 1rem;
    }

    /* ── Info Row ── */
    .tlf-estate-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-estate-info-card {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
    }
    .tlf-estate-info-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(146,64,14,.1);
      color: #92400e;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      font-size: 1.2rem;
    }
    .tlf-estate-info-card h4 {
      font-family: 'Libre Baskerville', serif;
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0 0 6px;
      color: #111827;
    }
    .tlf-estate-info-card p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ── Gallery ── */
    .tlf-estate-gallery {
      padding: 0 32px 56px;
      position: relative;
      z-index: 1;
    }
    .tlf-estate-gallery h3 {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 20px;
      color: #111827;
    }
    .tlf-estate-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .tlf-estate-gallery-item {
      aspect-ratio: 4/3;
      border-radius: 80px 26px 80px 26px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
    }
    .tlf-estate-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-estate-gallery-item:hover img {
      transform: scale(1.05);
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tlf-estate-hero {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px 24px 36px;
      }
      .tlf-estate-media {
        max-height: 400px;
      }
      .tlf-estate-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-estate-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-estate-gallery {
        padding: 0 24px 40px;
      }
      .tlf-estate-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tlf-estate-nav {
        padding: 14px 16px;
        gap: 10px;
      }
      .tlf-estate-nav-links {
        gap: 14px;
      }
      .tlf-estate-hero {
        padding: 28px 16px 24px;
      }
      .tlf-estate-hero-title {
        font-size: 1.6rem;
      }
      .tlf-estate-stats {
        flex-wrap: wrap;
        gap: 16px;
      }
      .tlf-estate-btns {
        flex-direction: column;
      }
      .tlf-estate-main {
        padding: 0 16px 28px;
      }
      .tlf-estate-info-row {
        padding: 0 16px 28px;
      }
      .tlf-estate-gallery {
        padding: 0 16px 32px;
      }
      .tlf-estate-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-estate">
        {/* ── Nav ── */}
        <nav className="tlf-estate-nav">
          <div className="tlf-estate-logo">{name.charAt(0)}</div>
          <span className="tlf-estate-nav-name">{name}</span>
          <div className="tlf-estate-nav-links">
            <button className="tlf-estate-nav-link">Portfolio</button>
            <button className="tlf-estate-nav-link">Credentials</button>
            <button className="tlf-estate-nav-link" onClick={onHire}>Hire</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="tlf-estate-hero">
          <div>
            <div className="tlf-estate-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span className="tlf-estate-pill" key={i}>{s}</span>
              ))}
            </div>
            <h2 className="tlf-estate-hero-title">
              {name}
              {verified && (
                <span className="tlf-estate-verified" title="Verified">&#10003;</span>
              )}
            </h2>
            <p className="tlf-estate-tagline">{tagline}</p>
            <p className="tlf-estate-bio">{bio}</p>
            <div className="tlf-estate-stats">
              <div>
                <div className="tlf-estate-stat-val">{serviceArea}</div>
                <div className="tlf-estate-stat-label">Service Area</div>
              </div>
              {priceLabel && (
                <div>
                  <div className="tlf-estate-stat-val">{priceLabel}</div>
                  <div className="tlf-estate-stat-label">Pricing</div>
                </div>
              )}
              <div>
                <div className="tlf-estate-stat-val">{portfolio.length}</div>
                <div className="tlf-estate-stat-label">Portfolio Shots</div>
              </div>
            </div>
            <div className="tlf-estate-btns">
              <button className="tlf-estate-btn-primary" onClick={onHire}>Hire Now</button>
              <button className="tlf-estate-btn-secondary">View Portfolio</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tlf-estate-media">
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="lazy"
                onClick={() => onPhotoClick(0)}
              />
              <div className="tlf-estate-media-badge">
                {specialties[0] || "Estate Photography"} &bull; {serviceArea}
              </div>
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="tlf-estate-main">
          <div className="tlf-estate-panel">
            <h3>Services &amp; Expertise</h3>
            <ul className="tlf-estate-services">
              {specialties.map((s, i) => (
                <li key={i}>
                  <span className="tlf-estate-section-marker">&sect;</span>
                  {s}
                </li>
              ))}
              {specialties.length === 0 && (
                <>
                  <li><span className="tlf-estate-section-marker">&sect;</span> Estate Planning</li>
                  <li><span className="tlf-estate-section-marker">&sect;</span> Trust Documentation</li>
                  <li><span className="tlf-estate-section-marker">&sect;</span> Property Valuation</li>
                </>
              )}
            </ul>
          </div>
          <div className="tlf-estate-panel">
            <h3>About</h3>
            <p>{bio}</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Based in {serviceArea}. {verified ? "Verified professional." : ""}
            </p>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tlf-estate-info-row">
          <div className="tlf-estate-info-card">
            <div className="tlf-estate-info-card-icon">&#9878;</div>
            <h4>Estate Expertise</h4>
            <p>Specialized photography for estate and trust professionals.</p>
          </div>
          <div className="tlf-estate-info-card">
            <div className="tlf-estate-info-card-icon">&#9201;</div>
            <h4>Timely Delivery</h4>
            <p>High-resolution edits delivered within 24-48 hours.</p>
          </div>
          <div className="tlf-estate-info-card">
            <div className="tlf-estate-info-card-icon">&#9733;</div>
            <h4>Trusted Quality</h4>
            <p>Relied upon by estate attorneys across {serviceArea}.</p>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-estate-gallery">
            <h3>Portfolio</h3>
            <div className="tlf-estate-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-estate-gallery-item"
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
