import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSportsAction(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-sports-action";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `From $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const photos = portfolio.slice(0, 6);
  const kickerText = [serviceArea, specialties[0]].filter(Boolean).join(" // ");

  return (
    <>
      <style>{`
        /* ── Base ── */
        .tsa-root {
          position: relative;
          overflow: hidden;
          background: #080a09;
          color: #f8f8f8;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          padding: 56px 5vw 80px;
        }

        /* ── Diagonal neon stripe ── */
        .tsa-stripe {
          position: absolute;
          top: -20%;
          left: 63%;
          width: 6px;
          height: 160%;
          background: #00ff88;
          transform: skewX(-12deg);
          opacity: 0.45;
          box-shadow: 0 0 40px 10px rgba(0, 255, 136, 0.25),
                      0 0 80px 20px rgba(0, 255, 136, 0.1);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Speed lines ── */
        .tsa-speed {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 60px,
            rgba(0, 255, 136, 0.03) 60px,
            rgba(0, 255, 136, 0.03) 62px
          );
          transform: skewX(-12deg);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Content layer ── */
        .tsa-content {
          position: relative;
          z-index: 1;
        }

        /* ── Kicker ── */
        .tsa-kicker {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #00ff88;
          margin-bottom: 10px;
        }

        /* ── Header grid ── */
        .tsa-header {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          align-items: end;
          margin-bottom: 48px;
        }

        /* ── Name ── */
        .tsa-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(48px, 7vw, 96px);
          text-transform: uppercase;
          line-height: 0.92;
          letter-spacing: -0.02em;
          margin: 0;
          transform: skewX(-6deg);
        }
        .tsa-name .tsa-accent {
          color: #00ff88;
        }

        /* ── Verified badge ── */
        .tsa-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #00ff88;
          color: #080a09;
          font-size: 14px;
          font-weight: 700;
          margin-left: 12px;
          vertical-align: middle;
          transform: skewX(6deg);
        }

        /* ── Tagline ── */
        .tsa-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #b8bdb9;
          margin-top: 14px;
          transform: skewX(-6deg);
          letter-spacing: 0.02em;
        }

        /* ── Right column (bio + button) ── */
        .tsa-right {
          border-left: 2px solid rgba(0, 255, 136, 0.3);
          padding-left: 32px;
        }
        .tsa-bio {
          font-size: 14px;
          line-height: 1.75;
          color: #b8bdb9;
          margin: 0 0 24px;
          max-width: 420px;
        }
        .tsa-price {
          font-size: 13px;
          font-weight: 600;
          color: #00ff88;
          margin-bottom: 20px;
        }

        /* ── Book button (angled) ── */
        .tsa-book {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 36px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 800;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #080a09;
          background: #00ff88;
          border: none;
          cursor: pointer;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tsa-book:hover {
          transform: translateY(-2px) skewX(-3deg);
          box-shadow: 0 4px 24px rgba(0, 255, 136, 0.35);
        }

        /* ── Photo grid ── */
        .tsa-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 220px 200px 220px;
          gap: 10px;
        }

        /* Default span: 3 photos per row of 4 columns each */
        .tsa-cell:nth-child(1) { grid-column: 1 / 5;  grid-row: 1; }
        .tsa-cell:nth-child(2) { grid-column: 5 / 9;  grid-row: 1; }
        .tsa-cell:nth-child(3) { grid-column: 9 / 13; grid-row: 1; }
        .tsa-cell:nth-child(4) { grid-column: 1 / 5;  grid-row: 2; }
        .tsa-cell:nth-child(5) { grid-column: 5 / 9;  grid-row: 2; }
        .tsa-cell:nth-child(6) { grid-column: 9 / 13; grid-row: 3; }

        /* Staggered layout: shift some cells for dynamic feel */
        .tsa-cell:nth-child(4) { grid-column: 2 / 6;  grid-row: 2; }
        .tsa-cell:nth-child(5) { grid-column: 7 / 11; grid-row: 2; }
        .tsa-cell:nth-child(6) { grid-column: 3 / 7;  grid-row: 3; }

        .tsa-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }
        .tsa-cell img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.3s;
        }
        .tsa-cell:hover img {
          transform: scale(1.06);
          filter: brightness(1.1);
        }

        /* Green overlay on hover */
        .tsa-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 255, 136, 0.12);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        .tsa-cell:hover .tsa-overlay {
          opacity: 1;
        }

        /* Photo number label */
        .tsa-num {
          position: absolute;
          bottom: 10px;
          left: 18px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 28px;
          color: rgba(0, 255, 136, 0.5);
          letter-spacing: 0.05em;
          pointer-events: none;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
        }

        /* ── Footer / specialties bar ── */
        .tsa-footer {
          margin-top: 40px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .tsa-tag {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #080a09;
          background: #00ff88;
          padding: 5px 14px;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
        }
        .tsa-footer-area {
          font-size: 12px;
          color: #b8bdb9;
          margin-left: auto;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tsa-header {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .tsa-right {
            border-left: none;
            border-top: 2px solid rgba(0, 255, 136, 0.3);
            padding-left: 0;
            padding-top: 24px;
          }
          .tsa-grid {
            grid-template-rows: 180px 160px 180px;
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tsa-root {
            padding: 36px 4vw 56px;
          }
          .tsa-name {
            font-size: clamp(32px, 10vw, 52px);
          }
          .tsa-speed {
            display: none;
          }
          .tsa-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            gap: 8px;
          }
          .tsa-cell:nth-child(1),
          .tsa-cell:nth-child(2),
          .tsa-cell:nth-child(3),
          .tsa-cell:nth-child(4),
          .tsa-cell:nth-child(5),
          .tsa-cell:nth-child(6) {
            grid-column: auto;
            grid-row: auto;
          }
          .tsa-cell {
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>

      <section className="tsa-root">
        {/* Decorative elements */}
        <div className="tsa-stripe" />
        <div className="tsa-speed" />

        <div className="tsa-content">
          {/* Header */}
          <header className="tsa-header">
            <div>
              <div className="tsa-kicker">{kickerText}</div>
              <h1 className="tsa-name">
                {name}
                {specialties[0] && (
                  <span className="tsa-accent"> {specialties[0]}</span>
                )}
                {verified && (
                  <span className="tsa-verified" title="Verified">&#10003;</span>
                )}
              </h1>
              {tagline && <div className="tsa-tagline">{tagline}</div>}
            </div>

            <div className="tsa-right">
              {bio && <p className="tsa-bio">{bio}</p>}
              {priceLabel && <div className="tsa-price">{priceLabel}</div>}
              <button className="tsa-book" onClick={onHire}>
                Book a Session
              </button>
            </div>
          </header>

          {/* Photo grid */}
          <div className="tsa-grid">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="tsa-cell"
                onClick={() => onPhotoClick(i)}
              >
                <img src={photo.url} alt={photo.filename} loading="lazy" />
                <div className="tsa-overlay" />
                <span className="tsa-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* Footer specialties bar */}
          <div className="tsa-footer">
            {specialties.map((s) => (
              <span key={s} className="tsa-tag">{s}</span>
            ))}
            <span className="tsa-footer-area">{serviceArea}</span>
          </div>
        </div>
      </section>
    </>
  );
}
