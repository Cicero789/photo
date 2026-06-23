import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateLegalMortgage(props: TemplateProps) {
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
    const id = "font-legal-mortgage";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;600;700&display=swap";
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
    .tlf-mortgage {
      font-family: Inter, sans-serif;
      background: linear-gradient(135deg,#f0fdf4,#ffffff 48%,#dcfce7);
      color: #111827;
      min-height: 100vh;
      line-height: 1.6;
      position: relative;
      overflow: hidden;
    }
    .tlf-mortgage::before {
      content: '';
      position: absolute;
      top: -160px;
      right: -120px;
      width: 480px;
      height: 480px;
      background: rgba(34,197,94,.22);
      border-radius: 50%;
      pointer-events: none;
      filter: blur(90px);
      z-index: 0;
    }

    /* ── Nav ── */
    .tlf-mortgage-nav {
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
    .tlf-mortgage-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #16a34a;
      color: #052e16;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .tlf-mortgage-nav-name {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      color: #111827;
      margin-right: auto;
    }
    .tlf-mortgage-nav-links {
      display: flex;
      gap: 24px;
    }
    .tlf-mortgage-nav-link {
      font-size: 0.85rem;
      font-weight: 600;
      color: #64748b;
      cursor: pointer;
      transition: color 0.2s;
      background: none;
      border: none;
      font-family: inherit;
    }
    .tlf-mortgage-nav-link:hover {
      color: #16a34a;
    }

    /* ── Hero ── */
    .tlf-mortgage-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 48px;
      padding: 56px 32px 48px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .tlf-mortgage-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    .tlf-mortgage-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(34,197,94,.12);
      color: #16a34a;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .tlf-mortgage-hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.8rem, 3.6vw, 2.8rem);
      font-weight: 700;
      line-height: 1.12;
      color: #111827;
      margin: 0 0 8px;
    }
    .tlf-mortgage-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #16a34a;
      color: #fff;
      font-size: 13px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .tlf-mortgage-tagline {
      font-size: 1rem;
      color: #64748b;
      margin: 0 0 12px;
      font-style: italic;
    }
    .tlf-mortgage-bio {
      font-size: 0.92rem;
      color: #374151;
      line-height: 1.75;
      margin: 0 0 24px;
      max-width: 520px;
    }
    .tlf-mortgage-stats {
      display: flex;
      gap: 28px;
      margin-bottom: 28px;
    }
    .tlf-mortgage-stat-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: #111827;
    }
    .tlf-mortgage-stat-label {
      font-size: 0.72rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .tlf-mortgage-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .tlf-mortgage-btn-primary {
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
      background: #16a34a;
      color: #052e16;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .tlf-mortgage-btn-primary:hover {
      background: #15803d;
      transform: translateY(-1px);
    }
    .tlf-mortgage-btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 0 30px;
      font: inherit;
      font-weight: 600;
      font-size: 0.9rem;
      border: 2px solid #16a34a;
      border-radius: 10px;
      background: transparent;
      color: #16a34a;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .tlf-mortgage-btn-secondary:hover {
      background: #16a34a;
      color: #052e16;
    }

    /* Hero Media Card */
    .tlf-mortgage-media {
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(34,197,94,.14);
      aspect-ratio: 4/5;
      max-height: 500px;
    }
    .tlf-mortgage-media img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-mortgage-media:hover img {
      transform: scale(1.03);
    }
    .tlf-mortgage-media-badge {
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
    .tlf-mortgage-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-mortgage-panel {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 16px;
      padding: 28px;
    }
    .tlf-mortgage-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0 0 16px;
      color: #111827;
    }
    .tlf-mortgage-panel p {
      font-size: 0.88rem;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 16px;
    }
    .tlf-mortgage-services {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .tlf-mortgage-services li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(15,23,42,.06);
      font-size: 0.88rem;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .tlf-mortgage-services li:last-child {
      border-bottom: none;
    }
    .tlf-mortgage-section-marker {
      color: #16a34a;
      font-weight: 700;
      font-size: 1rem;
    }

    /* ── Info Row ── */
    .tlf-mortgage-info-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding: 0 32px 48px;
      position: relative;
      z-index: 1;
    }
    .tlf-mortgage-info-card {
      background: rgba(255,255,255,.84);
      border: 1px solid rgba(15,23,42,.08);
      border-radius: 14px;
      padding: 24px;
      text-align: center;
    }
    .tlf-mortgage-info-card-icon {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(34,197,94,.12);
      color: #16a34a;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      font-size: 1.2rem;
    }
    .tlf-mortgage-info-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      margin: 0 0 6px;
      color: #111827;
    }
    .tlf-mortgage-info-card p {
      font-size: 0.82rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    /* ── Gallery ── */
    .tlf-mortgage-gallery {
      padding: 0 32px 56px;
      position: relative;
      z-index: 1;
    }
    .tlf-mortgage-gallery h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 20px;
      color: #111827;
    }
    .tlf-mortgage-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .tlf-mortgage-gallery-item {
      aspect-ratio: 4/3;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid rgba(15,23,42,.06);
    }
    .tlf-mortgage-gallery-item img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s cubic-bezier(0.2,0.7,0.2,1);
    }
    .tlf-mortgage-gallery-item:hover img {
      transform: scale(1.05);
    }

    /* ── Responsive 980px ── */
    @media (max-width: 980px) {
      .tlf-mortgage-hero {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 40px 24px 36px;
      }
      .tlf-mortgage-media {
        max-height: 400px;
      }
      .tlf-mortgage-main {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-mortgage-info-row {
        grid-template-columns: 1fr;
        padding: 0 24px 36px;
      }
      .tlf-mortgage-gallery {
        padding: 0 24px 40px;
      }
      .tlf-mortgage-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 620px ── */
    @media (max-width: 620px) {
      .tlf-mortgage-nav {
        padding: 14px 16px;
        gap: 10px;
      }
      .tlf-mortgage-nav-links {
        gap: 14px;
      }
      .tlf-mortgage-hero {
        padding: 28px 16px 24px;
      }
      .tlf-mortgage-hero-title {
        font-size: 1.6rem;
      }
      .tlf-mortgage-stats {
        flex-wrap: wrap;
        gap: 16px;
      }
      .tlf-mortgage-btns {
        flex-direction: column;
      }
      .tlf-mortgage-main {
        padding: 0 16px 28px;
      }
      .tlf-mortgage-info-row {
        padding: 0 16px 28px;
      }
      .tlf-mortgage-gallery {
        padding: 0 16px 32px;
      }
      .tlf-mortgage-gallery-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tlf-mortgage">
        {/* ── Nav ── */}
        <nav className="tlf-mortgage-nav">
          <div className="tlf-mortgage-logo">{name.charAt(0)}</div>
          <span className="tlf-mortgage-nav-name">{name}</span>
          <div className="tlf-mortgage-nav-links">
            <button className="tlf-mortgage-nav-link">Portfolio</button>
            <button className="tlf-mortgage-nav-link">Credentials</button>
            <button className="tlf-mortgage-nav-link" onClick={onHire}>Hire</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="tlf-mortgage-hero">
          <div>
            <div className="tlf-mortgage-pills">
              {specialties.slice(0, 4).map((s, i) => (
                <span className="tlf-mortgage-pill" key={i}>{s}</span>
              ))}
            </div>
            <h2 className="tlf-mortgage-hero-title">
              {name}
              {verified && (
                <span className="tlf-mortgage-verified" title="Verified">&#10003;</span>
              )}
            </h2>
            <p className="tlf-mortgage-tagline">{tagline}</p>
            <p className="tlf-mortgage-bio">{bio}</p>
            <div className="tlf-mortgage-stats">
              <div>
                <div className="tlf-mortgage-stat-val">{serviceArea}</div>
                <div className="tlf-mortgage-stat-label">Service Area</div>
              </div>
              {priceLabel && (
                <div>
                  <div className="tlf-mortgage-stat-val">{priceLabel}</div>
                  <div className="tlf-mortgage-stat-label">Pricing</div>
                </div>
              )}
              <div>
                <div className="tlf-mortgage-stat-val">{portfolio.length}</div>
                <div className="tlf-mortgage-stat-label">Portfolio Shots</div>
              </div>
            </div>
            <div className="tlf-mortgage-btns">
              <button className="tlf-mortgage-btn-primary" onClick={onHire}>Hire Now</button>
              <button className="tlf-mortgage-btn-secondary">View Portfolio</button>
            </div>
          </div>

          {heroPhoto && (
            <div className="tlf-mortgage-media">
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="lazy"
                onClick={() => onPhotoClick(0)}
              />
              <div className="tlf-mortgage-media-badge">
                {specialties[0] || "Mortgage Photography"} &bull; {serviceArea}
              </div>
            </div>
          )}
        </div>

        {/* ── Main Grid ── */}
        <div className="tlf-mortgage-main">
          <div className="tlf-mortgage-panel">
            <h3>Services &amp; Expertise</h3>
            <ul className="tlf-mortgage-services">
              {specialties.map((s, i) => (
                <li key={i}>
                  <span className="tlf-mortgage-section-marker">&sect;</span>
                  {s}
                </li>
              ))}
              {specialties.length === 0 && (
                <>
                  <li><span className="tlf-mortgage-section-marker">&sect;</span> Mortgage Closings</li>
                  <li><span className="tlf-mortgage-section-marker">&sect;</span> Property Inspections</li>
                  <li><span className="tlf-mortgage-section-marker">&sect;</span> Commercial Real Estate</li>
                </>
              )}
            </ul>
          </div>
          <div className="tlf-mortgage-panel">
            <h3>About</h3>
            <p>{bio}</p>
            <p style={{ fontSize: "0.82rem", color: "#64748b" }}>
              Based in {serviceArea}. {verified ? "Verified professional." : ""}
            </p>
          </div>
        </div>

        {/* ── Info Row ── */}
        <div className="tlf-mortgage-info-row">
          <div className="tlf-mortgage-info-card">
            <div className="tlf-mortgage-info-card-icon">&#9878;</div>
            <h4>Licensed &amp; Insured</h4>
            <p>Full professional liability coverage for every engagement.</p>
          </div>
          <div className="tlf-mortgage-info-card">
            <div className="tlf-mortgage-info-card-icon">&#9201;</div>
            <h4>Fast Turnaround</h4>
            <p>Edited deliverables within 24-48 hours of the session.</p>
          </div>
          <div className="tlf-mortgage-info-card">
            <div className="tlf-mortgage-info-card-icon">&#9733;</div>
            <h4>Client Satisfaction</h4>
            <p>Trusted by mortgage professionals across {serviceArea}.</p>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tlf-mortgage-gallery">
            <h3>Portfolio</h3>
            <div className="tlf-mortgage-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tlf-mortgage-gallery-item"
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
