import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateSummerBeach(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-summer-beach";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const gridPhotos = portfolio.slice(0, 6);

  const captionFor = (filename: string) =>
    filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");

  return (
    <>
      <style>{`
        /* ── Beach Vibes – Summer Beach Template ── */

        .sb-beach {
          position: relative;
          overflow: hidden;
          background: #fef7ed;
          font-family: "Nunito", sans-serif;
          color: #2d3a37;
          min-height: 600px;
        }

        /* ── Radial gradient overlays ── */
        .sb-beach::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 900px 600px at 15% 80%, rgba(13,148,136,0.06), transparent),
            radial-gradient(ellipse 700px 500px at 85% 20%, rgba(249,200,94,0.10), transparent);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Sun decoration ── */
        .sb-sun {
          position: absolute;
          top: -70px;
          right: -70px;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: #f9c85e;
          box-shadow:
            0 0 0 32px rgba(249,200,94,0.22),
            0 0 0 64px rgba(249,200,94,0.10),
            0 0 0 100px rgba(249,200,94,0.05);
          z-index: 0;
          pointer-events: none;
        }

        /* ── Wave border scallop (top) ── */
        .sb-wave-top {
          position: relative;
          z-index: 1;
          height: 24px;
          background:
            radial-gradient(circle at 24px 24px, rgba(13,148,136,0.07) 23px, transparent 24px)
            0 0 / 48px 24px repeat-x;
        }

        /* ── Wave border scallop (bottom) ── */
        .sb-wave-bottom {
          position: relative;
          z-index: 1;
          height: 24px;
          background:
            radial-gradient(circle at 24px 0, rgba(13,148,136,0.07) 23px, transparent 24px)
            0 0 / 48px 24px repeat-x;
          margin-top: 48px;
        }

        /* ── Nav bar ── */
        .sb-nav {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 14px 5vw;
          border-bottom: 2px solid #0d9488;
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          color: #4c7770;
          letter-spacing: 0.04em;
        }

        .sb-nav-left {
          text-transform: uppercase;
          font-weight: 500;
        }

        .sb-nav-center {
          text-align: center;
        }

        .sb-nav-center strong {
          font-weight: 600;
          color: #075e58;
          font-size: 14px;
        }

        .sb-nav-right {
          text-align: right;
          font-weight: 400;
        }

        /* ── Header section ── */
        .sb-header {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 64px 5vw 48px;
          align-items: center;
        }

        .sb-header-left {}

        .sb-kicker {
          display: inline-block;
          color: #0d9488;
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 12px;
        }

        .sb-h1 {
          margin: 0;
          font-family: "Nunito", sans-serif;
          font-weight: 800;
          font-size: clamp(42px, 7vw, 86px);
          line-height: 0.95;
          letter-spacing: -0.025em;
          color: #1a2e2a;
        }

        .sb-verified {
          display: inline-block;
          color: #0d9488;
          font-size: 22px;
          margin-left: 10px;
          vertical-align: middle;
        }

        .sb-header-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sb-header-right p {
          margin: 0;
          color: #4c7770;
          font-size: 16px;
          line-height: 1.75;
          max-width: 500px;
        }

        .sb-hire {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          min-height: 48px;
          padding: 0 32px;
          border: none;
          border-radius: 999px;
          background: #0d9488;
          color: #fff;
          font-family: "Nunito", sans-serif;
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          box-shadow: 0 4px 0 #075e58, 0 6px 16px rgba(7,94,88,0.18);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          text-decoration: none;
        }

        .sb-hire:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 0 #075e58, 0 10px 24px rgba(7,94,88,0.22);
        }

        .sb-hire:active {
          transform: translateY(1px);
          box-shadow: 0 2px 0 #075e58, 0 3px 8px rgba(7,94,88,0.18);
        }

        /* ── Photo grid ── */
        .sb-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 260px 260px 260px;
          gap: 16px;
          padding: 24px 5vw 0;
        }

        .sb-grid-item {
          position: relative;
          overflow: hidden;
          border: 5px solid #fff;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }

        .sb-grid-item:nth-child(1) {
          grid-column: 1 / 8;
          grid-row: 1 / 3;
          border-radius: 70px 32px 32px 32px;
        }

        .sb-grid-item:nth-child(2) {
          grid-column: 8 / 13;
          grid-row: 1 / 2;
          border-radius: 32px 32px 70px 32px;
        }

        .sb-grid-item:nth-child(3) {
          grid-column: 8 / 13;
          grid-row: 2 / 3;
          border-radius: 32px 32px 32px 32px;
        }

        .sb-grid-item:nth-child(4) {
          grid-column: 1 / 6;
          grid-row: 3 / 4;
          border-radius: 32px 32px 32px 70px;
        }

        .sb-grid-item:nth-child(5) {
          grid-column: 6 / 13;
          grid-row: 3 / 4;
          border-radius: 32px 70px 32px 32px;
        }

        .sb-grid-item:nth-child(n+6) {
          display: none;
        }

        .sb-grid-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.65);
          transition: filter 0.5s ease, transform 0.6s cubic-bezier(0.2,0.7,0.2,1);
        }

        .sb-grid-item:hover img {
          filter: saturate(1);
          transform: scale(1.04);
        }

        .sb-caption {
          position: absolute;
          bottom: 16px;
          left: 16px;
          padding: 6px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #1a2e2a;
          pointer-events: none;
          z-index: 2;
          white-space: nowrap;
          max-width: calc(100% - 32px);
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Tags strip ── */
        .sb-tags {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 40px 5vw 12px;
          justify-content: center;
        }

        .sb-tag {
          display: inline-block;
          padding: 7px 20px;
          border-radius: 999px;
          border: 1.5px solid #0d9488;
          background: rgba(13,148,136,0.06);
          font-family: "Nunito", sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0d9488;
          letter-spacing: 0.02em;
          transition: background 0.25s, color 0.25s;
        }

        .sb-tag:hover {
          background: #0d9488;
          color: #fff;
        }

        /* ── Responsive: 900px ── */
        @media (max-width: 900px) {
          .sb-header {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 48px 5vw 36px;
          }

          .sb-header-right {
            align-items: flex-start;
          }

          .sb-h1 {
            font-size: clamp(38px, 9vw, 64px);
          }

          .sb-grid {
            grid-template-rows: 220px 220px 220px;
          }
        }

        /* ── Responsive: 600px ── */
        @media (max-width: 600px) {
          .sb-nav {
            grid-template-columns: 1fr;
            gap: 4px;
            text-align: center;
            padding: 12px 5vw;
          }

          .sb-nav-left,
          .sb-nav-right {
            text-align: center;
          }

          .sb-sun {
            width: 140px;
            height: 140px;
            top: -50px;
            right: -50px;
            box-shadow:
              0 0 0 20px rgba(249,200,94,0.20),
              0 0 0 40px rgba(249,200,94,0.08);
          }

          .sb-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
            gap: 12px;
          }

          .sb-grid-item:nth-child(1),
          .sb-grid-item:nth-child(2),
          .sb-grid-item:nth-child(3),
          .sb-grid-item:nth-child(4),
          .sb-grid-item:nth-child(5) {
            grid-column: auto;
            grid-row: auto;
            border-radius: 20px;
            height: 200px;
          }

          .sb-grid-item:nth-child(5) {
            grid-column: 1 / -1;
          }

          .sb-h1 {
            font-size: clamp(32px, 10vw, 48px);
          }

          .sb-wave-top,
          .sb-wave-bottom {
            height: 18px;
            background-size: 36px 18px;
          }
        }
      `}</style>
      <section className="sb-beach">
        {/* Sun decoration */}
        <div className="sb-sun" aria-hidden="true" />

        {/* Wave border top */}
        <div className="sb-wave-top" aria-hidden="true" />

        {/* Nav bar */}
        <nav className="sb-nav">
          <span className="sb-nav-left">{serviceArea}</span>
          <span className="sb-nav-center">
            <strong>{name}</strong>
          </span>
          <span className="sb-nav-right">
            {specialties.length > 0 ? specialties.join(" / ") : "Photography"}
          </span>
        </nav>

        {/* Header */}
        <div className="sb-header">
          <div className="sb-header-left">
            <span className="sb-kicker">
              {specialties.length > 0 ? specialties[0] : "Photography"} &mdash; {serviceArea}
            </span>
            <h1 className="sb-h1">
              {name}
              {verified && <span className="sb-verified">&#10003;</span>}
            </h1>
          </div>
          <div className="sb-header-right">
            <p>
              {bio || tagline || `${name} specializes in ${specialties.join(", ")}. Based in ${serviceArea}.`}
            </p>
            <button className="sb-hire" onClick={onHire}>
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </div>

        {/* Photo grid */}
        <div className="sb-grid">
          {gridPhotos.map((photo, i) => (
            <div key={photo.id} className="sb-grid-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
              <span className="sb-caption">{captionFor(photo.filename)}</span>
            </div>
          ))}
        </div>

        {/* Tags strip */}
        {specialties.length > 0 && (
          <div className="sb-tags">
            {specialties.map((s) => (
              <span key={s} className="sb-tag">{s}</span>
            ))}
          </div>
        )}

        {/* Wave border bottom */}
        <div className="sb-wave-bottom" aria-hidden="true" />
      </section>
    </>
  );
}
