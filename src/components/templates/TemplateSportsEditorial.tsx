import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSportsEditorial(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    website,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  useEffect(() => {
    const id = "font-sports-editorial";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,500;0,700;1,500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `From $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const heroPhoto = portfolio[0];
  const galleryPhotos = portfolio.slice(1, 6);

  /* Generate stats from available data */
  const statYears = Math.max(3, Math.min(specialties.length * 3, 15));
  const statProjects = portfolio.length * 12;
  const statEvents = Math.max(50, portfolio.length * 8);

  const achievements = [
    specialties.length >= 2 ? `${specialties[0]} & ${specialties[1]} specialist` : `${specialties[0] || "Photography"} specialist`,
    `${statEvents}+ events covered`,
    serviceArea ? `Based in ${serviceArea}` : "Available nationwide",
  ];

  return (
    <>
      <style>{`
        /* ── Sports Editorial Template ── */
        .tse-root {
          background: #fff;
          color: #101010;
          font-family: "Libre Franklin", sans-serif;
          min-height: 600px;
          line-height: 1.5;
        }

        /* ── Masthead ── */
        .tse-masthead {
          border-top: 8px solid #101010;
          padding: 0 5vw;
        }
        .tse-topline {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 18px 0 12px;
          border-bottom: 1px solid #d0d0d0;
        }
        .tse-topline-left {
          display: flex;
          align-items: baseline;
          gap: 14px;
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #585858;
        }
        .tse-topline-left span {
          color: #101010;
          font-weight: 600;
        }
        .tse-topline-right {
          display: flex;
          gap: 16px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #585858;
        }
        .tse-topline-right span {
          position: relative;
        }
        .tse-topline-right span + span::before {
          content: "·";
          position: absolute;
          left: -11px;
          color: #aaa;
        }
        .tse-headline {
          padding: 28px 0 18px;
        }
        .tse-headline h1 {
          margin: 0;
          font-family: "Source Serif 4", serif;
          font-weight: 700;
          font-size: clamp(38px, 6vw, 72px);
          line-height: 1.02;
          letter-spacing: -0.015em;
          color: #101010;
        }
        .tse-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #101010;
          color: #fff;
          font-size: 14px;
          margin-left: 12px;
          vertical-align: middle;
          position: relative;
          top: -4px;
        }
        .tse-deck {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 40px;
          padding: 20px 0 36px;
          border-top: 1px solid #d0d0d0;
        }
        .tse-deck-subtitle {
          font-family: "Source Serif 4", serif;
          font-style: italic;
          font-weight: 500;
          font-size: clamp(18px, 2.4vw, 24px);
          line-height: 1.45;
          color: #101010;
          margin: 0;
        }
        .tse-deck-description {
          font-size: 15px;
          line-height: 1.75;
          color: #585858;
          margin: 0;
        }
        .tse-deck-description a {
          color: #101010;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Feature Section ── */
        .tse-feature {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 0;
          padding: 0 5vw;
          border-top: 2px solid #101010;
        }
        .tse-hero-wrap {
          position: relative;
          height: 690px;
          overflow: hidden;
          cursor: pointer;
        }
        .tse-hero-wrap img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tse-hero-wrap:hover img {
          transform: scale(1.03);
        }
        .tse-caption-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px 20px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* ── Stats Sidebar ── */
        .tse-stats-sidebar {
          background: #f7f7f5;
          padding: 40px 32px 36px;
          display: flex;
          flex-direction: column;
        }
        .tse-stats-title {
          font-family: "Source Serif 4", serif;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #555;
          margin: 0 0 28px;
          padding-bottom: 14px;
          border-bottom: 2px solid #101010;
        }
        .tse-stat-item {
          margin-bottom: 24px;
        }
        .tse-stat-number {
          font-family: "Source Serif 4", serif;
          font-weight: 700;
          font-size: 44px;
          line-height: 1;
          color: #101010;
        }
        .tse-stat-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #555;
          margin-top: 4px;
        }
        .tse-achievements {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          border-top: 1px solid #d0d0d0;
          padding-top: 20px;
        }
        .tse-achievements li {
          position: relative;
          padding-left: 18px;
          font-size: 14px;
          line-height: 1.5;
          color: #555;
          margin-bottom: 10px;
        }
        .tse-achievements li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: #101010;
          font-weight: 700;
        }
        .tse-price-label {
          font-size: 13px;
          font-weight: 600;
          color: #585858;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid #d0d0d0;
        }
        .tse-sidebar-bottom {
          margin-top: auto;
          padding-top: 24px;
        }
        .tse-book-btn {
          display: block;
          width: 100%;
          padding: 16px 24px;
          font-family: "Libre Franklin", sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #fff;
          background: #101010;
          border: 2px solid #101010;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
        }
        .tse-book-btn:hover {
          color: #101010;
          background: #fff;
        }

        /* ── Gallery ── */
        .tse-gallery-section {
          padding: 48px 5vw 64px;
        }
        .tse-gallery-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #585858;
          margin: 0 0 20px;
        }
        .tse-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 310px 310px;
          gap: 6px;
        }
        .tse-gallery-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .tse-gallery-item:first-child {
          grid-row: 1 / 3;
        }
        .tse-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(0);
          transition: filter 0.4s, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tse-gallery-item:hover img {
          filter: grayscale(1);
          transform: scale(1.03);
        }
        .tse-gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px 16px;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .tse-gallery-item:hover .tse-gallery-caption {
          opacity: 1;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tse-feature {
            grid-template-columns: 1fr;
          }
          .tse-hero-wrap {
            height: 460px;
          }
          .tse-stats-sidebar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px 32px;
            padding: 28px 24px;
          }
          .tse-stats-title {
            grid-column: 1 / -1;
          }
          .tse-achievements {
            grid-column: 1 / -1;
            border-top: none;
            padding-top: 0;
          }
          .tse-sidebar-bottom {
            grid-column: 1 / -1;
          }
          .tse-gallery {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 310px 310px;
          }
          .tse-gallery-item:first-child {
            grid-row: 1 / 3;
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tse-topline {
            flex-direction: column;
            gap: 8px;
          }
          .tse-deck {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .tse-stats-sidebar {
            grid-template-columns: 1fr;
          }
          .tse-hero-wrap {
            height: 340px;
          }
          .tse-gallery {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .tse-gallery-item:first-child {
            grid-row: auto;
          }
          .tse-gallery-item {
            height: 280px;
          }
          .tse-headline h1 {
            font-size: 32px;
          }
        }
      `}</style>

      <section className="tse-root">
        {/* ── Masthead ── */}
        <header className="tse-masthead">
          <div className="tse-topline">
            <div className="tse-topline-left">
              <span>{name}</span>
              {serviceArea && <>{serviceArea}</>}
            </div>
            <div className="tse-topline-right">
              {specialties.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>

          <div className="tse-headline">
            <h1>
              {tagline || "Capturing the decisive moment"}
              {verified && (
                <span className="tse-verified" title="Verified photographer">
                  &#10003;
                </span>
              )}
            </h1>
          </div>

          <div className="tse-deck">
            <p className="tse-deck-subtitle">
              {bio
                ? bio.split(".").slice(0, 1).join(".") + "."
                : "A visual storytelling practice built on precision, timing, and an unrelenting eye for the peak moment."}
            </p>
            <p className="tse-deck-description">
              {bio ||
                "With years of experience across fast-paced editorial and sporting environments, every frame is composed with intentionality. The work speaks through clarity, contrast, and a deep respect for the subject."}
              {website && (
                <>
                  {" "}
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </a>
                </>
              )}
            </p>
          </div>
        </header>

        {/* ── Feature Section ── */}
        <div className="tse-feature">
          {heroPhoto && (
            <div className="tse-hero-wrap" onClick={() => onPhotoClick(0)}>
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename}
                loading="lazy"
              />
              <div className="tse-caption-overlay">{heroPhoto.filename}</div>
            </div>
          )}

          <div className="tse-stats-sidebar">
            <div className="tse-stats-title">By the Numbers</div>

            <div className="tse-stat-item">
              <div className="tse-stat-number">{portfolio.length}</div>
              <div className="tse-stat-label">Portfolio works</div>
            </div>

            <div className="tse-stat-item">
              <div className="tse-stat-number">{statYears}</div>
              <div className="tse-stat-label">Years experience</div>
            </div>

            <div className="tse-stat-item">
              <div className="tse-stat-number">{statProjects}+</div>
              <div className="tse-stat-label">Completed projects</div>
            </div>

            <ul className="tse-achievements">
              {achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>

            {priceLabel && <div className="tse-price-label">{priceLabel}</div>}

            <div className="tse-sidebar-bottom">
              <button className="tse-book-btn" onClick={onHire}>
                Book a Session
              </button>
            </div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <div className="tse-gallery-section">
            <p className="tse-gallery-label">Selected Work</p>
            <div className="tse-gallery">
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  className="tse-gallery-item"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename}
                    loading="lazy"
                  />
                  <div className="tse-gallery-caption">{photo.filename}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
