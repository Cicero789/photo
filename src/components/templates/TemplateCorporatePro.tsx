import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCorporatePro(props: TemplateProps) {
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
    const id = "font-corporate-pro";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const heroPhoto = portfolio[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);

  const timelineEvents = specialties.slice(0, 5).map((s, i) => {
    const months = [
      "Jan 2026",
      "Mar 2026",
      "Jun 2026",
      "Sep 2026",
      "Nov 2026",
    ];
    const descriptions = [
      "Full-day coverage with deliverables within 48 hours.",
      "Multi-track sessions captured with cinematic precision.",
      "Executive portraits and candid networking moments.",
      "Keynote stage photography and breakout sessions.",
      "End-to-end visual storytelling for corporate events.",
    ];
    return {
      date: months[i] || `Q${i + 1} 2026`,
      title: s,
      description: descriptions[i] || "Professional event coverage.",
    };
  });

  const clients = specialties.length > 0 ? specialties : ["Client"];

  const marqueeText = `"${name} delivered outstanding conference photography that exceeded our expectations." — Event Director  ///  "Exceptional eye for capturing the energy of live events." — Marketing VP  ///  "The go-to photographer for corporate gatherings." — Program Manager  ///  `;

  const css = `
    .tcp-root {
      font-family: 'IBM Plex Sans', sans-serif;
      background: #f3f4f6;
      color: #172033;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Header ── */
    .tcp-header {
      display: grid;
      grid-template-columns: 43px 1fr auto;
      align-items: center;
      gap: 14px;
      padding: 18px 32px;
      border-bottom: 1px solid #d1d5db;
      background: #fff;
    }
    .tcp-geo-mark {
      width: 43px;
      height: 43px;
      background: #2563eb;
      clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
      flex-shrink: 0;
    }
    .tcp-header-name {
      font-weight: 700;
      font-size: 1.15rem;
      color: #172033;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tcp-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      background: #2563eb;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .tcp-verified svg {
      width: 11px;
      height: 11px;
    }
    .tcp-header-location {
      font-size: 0.85rem;
      color: #687386;
      white-space: nowrap;
    }

    /* ── Hero ── */
    .tcp-hero {
      display: grid;
      grid-template-columns: .82fr 1.18fr;
      gap: 0;
      background: #fff;
    }
    .tcp-hero-copy {
      padding: 56px 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .tcp-kicker {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #2563eb;
      margin-bottom: 12px;
    }
    .tcp-hero-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.75rem;
      font-weight: 700;
      line-height: 1.1;
      color: #172033;
      margin: 0 0 20px 0;
    }
    .tcp-hero-bio {
      font-size: 0.97rem;
      color: #5e6878;
      line-height: 1.7;
      margin-bottom: 28px;
      max-width: 440px;
    }
    .tcp-hero-btn {
      display: inline-block;
      background: #2563eb;
      color: #fff;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;
      padding: 12px 32px;
      border: 2px solid #2563eb;
      border-radius: 7px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-align: center;
      align-self: flex-start;
    }
    .tcp-hero-btn:hover {
      background: #fff;
      color: #2563eb;
    }
    .tcp-hero-photo-wrap {
      position: relative;
      overflow: hidden;
      min-height: 420px;
    }
    .tcp-hero-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0 0 0 7px;
      filter: saturate(0.7);
      cursor: pointer;
      transition: filter 0.3s;
    }
    .tcp-hero-photo:hover {
      filter: saturate(1);
    }
    .tcp-price-label {
      display: inline-block;
      margin-top: 10px;
      font-size: 0.8rem;
      color: #697487;
      font-weight: 500;
    }

    /* ── Timeline ── */
    .tcp-timeline-section {
      border: 1px solid #d1d5db;
      border-radius: 10px;
      margin: 40px 32px;
      background: #fff;
      overflow: hidden;
    }
    .tcp-timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 32px 20px;
      border-bottom: 1px solid #e5e7eb;
    }
    .tcp-timeline-header h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
      color: #172033;
    }
    .tcp-timeline-date-range {
      font-size: 0.82rem;
      color: #687386;
    }
    .tcp-timeline-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding: 0 32px 32px;
      position: relative;
    }
    .tcp-timeline-line {
      position: absolute;
      top: 32px;
      left: 56px;
      right: 56px;
      height: 2px;
      background: #e5e7eb;
    }
    .tcp-timeline-item {
      padding: 24px 12px 0;
      text-align: center;
      position: relative;
    }
    .tcp-timeline-dot {
      width: 12px;
      height: 12px;
      background: #2563eb;
      border-radius: 50%;
      margin: 0 auto 16px;
      position: relative;
      z-index: 1;
      border: 3px solid #fff;
      box-shadow: 0 0 0 2px #2563eb;
    }
    .tcp-timeline-item-date {
      font-size: 0.75rem;
      color: #687386;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .tcp-timeline-item-title {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 0.92rem;
      color: #172033;
      margin-bottom: 6px;
    }
    .tcp-timeline-item-desc {
      font-size: 0.78rem;
      color: #697487;
      line-height: 1.5;
    }

    /* ── Marquee ── */
    .tcp-marquee {
      background: #2563eb;
      overflow: hidden;
      padding: 18px 0;
      position: relative;
    }
    .tcp-marquee-track {
      display: flex;
      width: max-content;
      animation: tcp-scroll 30s linear infinite;
    }
    .tcp-marquee-text {
      white-space: nowrap;
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 0.92rem;
      color: rgba(255,255,255,0.92);
      font-weight: 500;
      padding: 0 24px;
      letter-spacing: 0.2px;
    }
    @keyframes tcp-scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @media (prefers-reduced-motion: reduce) {
      .tcp-marquee-track {
        animation: none;
      }
    }

    /* ── Clients ── */
    .tcp-clients {
      padding: 40px 32px;
    }
    .tcp-clients-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 24px;
      gap: 16px;
    }
    .tcp-clients-header h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      margin: 0;
      color: #172033;
    }
    .tcp-clients-header p {
      font-size: 0.85rem;
      color: #687386;
      margin: 0;
      max-width: 340px;
      text-align: right;
      line-height: 1.5;
    }
    .tcp-clients-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    .tcp-client-cell {
      border: 1px solid #d1d5db;
      padding: 22px 18px;
      text-align: center;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 0.92rem;
      color: #172033;
      cursor: default;
      transition: background 0.2s, color 0.2s;
      margin-top: -1px;
      margin-left: -1px;
    }
    .tcp-client-cell:hover {
      background: #2563eb;
      color: #fff;
    }

    /* ── Gallery ── */
    .tcp-gallery {
      padding: 0 32px 48px;
    }
    .tcp-gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    .tcp-gallery-img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      border-radius: 7px;
      cursor: pointer;
      filter: saturate(0.8);
      transition: filter 0.3s, transform 0.2s;
    }
    .tcp-gallery-img:hover {
      filter: saturate(1);
      transform: scale(1.01);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .tcp-hero {
        grid-template-columns: 1fr;
      }
      .tcp-hero-photo-wrap {
        min-height: 320px;
      }
      .tcp-hero-photo {
        border-radius: 0;
      }
      .tcp-timeline-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .tcp-timeline-line {
        display: none;
      }
      .tcp-clients-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .tcp-header {
        grid-template-columns: 43px 1fr;
        gap: 10px;
        padding: 14px 16px;
      }
      .tcp-header-location {
        grid-column: 1 / -1;
        margin-top: -4px;
      }
      .tcp-hero-copy {
        padding: 32px 20px;
      }
      .tcp-hero-title {
        font-size: 2rem;
      }
      .tcp-timeline-section {
        margin: 24px 16px;
      }
      .tcp-timeline-grid {
        grid-template-columns: 1fr;
        padding-left: 48px;
      }
      .tcp-timeline-item {
        text-align: left;
        padding: 16px 0 16px 20px;
        border-left: 2px solid #e5e7eb;
      }
      .tcp-timeline-dot {
        position: absolute;
        left: -7px;
        top: 24px;
        margin: 0;
      }
      .tcp-timeline-line {
        display: none;
      }
      .tcp-gallery-grid {
        grid-template-columns: 1fr;
      }
      .tcp-gallery-img {
        height: 260px;
      }
      .tcp-clients {
        padding: 24px 16px;
      }
      .tcp-clients-header {
        flex-direction: column;
        align-items: flex-start;
      }
      .tcp-clients-header p {
        text-align: left;
      }
      .tcp-clients-grid {
        grid-template-columns: 1fr;
      }
      .tcp-gallery {
        padding: 0 16px 32px;
      }
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section className="tcp-root">
        {/* ── Header ── */}
        <header className="tcp-header">
          <div className="tcp-geo-mark" />
          <div className="tcp-header-name">
            {name}
            {verified && (
              <span className="tcp-verified">
                <svg viewBox="0 0 12 12" fill="none">
                  <path
                    d="M3 6.5L5 8.5L9 3.5"
                    stroke="#fff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
          <span className="tcp-header-location">{serviceArea}</span>
        </header>

        {/* ── Conference Hero ── */}
        <div className="tcp-hero">
          <div className="tcp-hero-copy">
            <span className="tcp-kicker">Conference Photography</span>
            <h1 className="tcp-hero-title">{tagline}</h1>
            <p className="tcp-hero-bio">{bio}</p>
            <button className="tcp-hero-btn" onClick={onHire}>
              Request a Quote
            </button>
            {priceLabel && (
              <span className="tcp-price-label">{priceLabel}</span>
            )}
          </div>
          {heroPhoto && (
            <div className="tcp-hero-photo-wrap">
              <img
                className="tcp-hero-photo"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                onClick={() => onPhotoClick(0)}
              />
            </div>
          )}
        </div>

        {/* ── Event Timeline ── */}
        {timelineEvents.length > 0 && (
          <div className="tcp-timeline-section">
            <div className="tcp-timeline-header">
              <h2>Recent events</h2>
              <span className="tcp-timeline-date-range">
                {timelineEvents[0]?.date} &mdash;{" "}
                {timelineEvents[timelineEvents.length - 1]?.date}
              </span>
            </div>
            <div className="tcp-timeline-grid">
              <div className="tcp-timeline-line" />
              {timelineEvents.map((evt, i) => (
                <div className="tcp-timeline-item" key={i}>
                  <div className="tcp-timeline-dot" />
                  <div className="tcp-timeline-item-date">{evt.date}</div>
                  <div className="tcp-timeline-item-title">{evt.title}</div>
                  <div className="tcp-timeline-item-desc">
                    {evt.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Marquee ── */}
        <div className="tcp-marquee">
          <div className="tcp-marquee-track">
            <span className="tcp-marquee-text">{marqueeText}</span>
            <span className="tcp-marquee-text">{marqueeText}</span>
          </div>
        </div>

        {/* ── Clients ── */}
        <div className="tcp-clients">
          <div className="tcp-clients-header">
            <h2>Trusted by leading organizations</h2>
            <p>
              Delivering professional photography for conferences, summits, and
              corporate events worldwide.
            </p>
          </div>
          <div className="tcp-clients-grid">
            {clients.map((client, i) => (
              <div className="tcp-client-cell" key={i}>
                {client}
              </div>
            ))}
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tcp-gallery">
            <div className="tcp-gallery-grid">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tcp-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
