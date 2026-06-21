import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateFamilyWarm(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-family-warm";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=DM+Sans:wght@400;500;600;700&family=Fredoka:wght@500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const photos = portfolio.slice(0, 5);
  const captions = ["Our favorite moment", "Pure joy", "Together forever", "Making memories", "Family love"];

  return (
    <>
      <style>{`
        /* ── Wrapper ─────────────────────────────── */
        .tfw-wrap {
          position: relative;
          padding: 60px 5vw 80px;
          min-height: 700px;
          background:
            radial-gradient(ellipse at 15% 18%, rgba(218,165,80,0.28) 0%, transparent 55%),
            radial-gradient(ellipse at 88% 73%, rgba(134,168,112,0.18) 0%, transparent 50%),
            #fdf6e3;
          font-family: 'DM Sans', sans-serif;
          color: #2e2922;
          overflow: hidden;
        }

        /* dot-pattern overlay */
        .tfw-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(139,109,71,0.08) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
          z-index: 0;
        }

        .tfw-wrap > * { position: relative; z-index: 1; }

        /* ── Decorative doodles ──────────────────── */
        .tfw-doodle {
          position: absolute;
          font-family: 'Gloria Hallelujah', cursive;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .tfw-doodle-heart {
          top: 60px;
          right: 7%;
          font-size: 64px;
          color: rgba(191,112,64,0.12);
          transform: rotate(18deg);
        }
        .tfw-doodle-star {
          bottom: 110px;
          left: 4%;
          font-size: 52px;
          color: rgba(142,164,119,0.14);
          transform: rotate(-12deg);
        }
        .tfw-doodle-heart2 {
          top: 42%;
          left: 48%;
          font-size: 38px;
          color: rgba(185,104,85,0.09);
          transform: rotate(32deg);
        }

        /* ── Header ──────────────────────────────── */
        .tfw-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 36px;
          align-items: end;
          margin-bottom: 52px;
        }
        .tfw-kicker {
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #8a6347;
          margin-bottom: 6px;
        }
        .tfw-name {
          font-family: 'Gloria Hallelujah', cursive;
          font-size: clamp(32px, 5.5vw, 62px);
          color: #59422f;
          margin: 0 0 14px;
          line-height: 1.15;
        }
        .tfw-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #bf7040;
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          vertical-align: middle;
          font-family: sans-serif;
        }
        .tfw-bio {
          font-size: 15px;
          line-height: 1.7;
          color: #806b58;
          max-width: 540px;
          margin: 0;
        }
        .tfw-tagline {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          font-size: 17px;
          color: #59422f;
          margin-bottom: 10px;
        }
        .tfw-price-label {
          display: inline-block;
          margin-top: 10px;
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #8a6347;
          background: rgba(240,184,107,0.22);
          padding: 4px 14px;
          border-radius: 20px;
        }

        /* ── Button ──────────────────────────────── */
        .tfw-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 36px;
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #fff;
          background: #bf7040;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 0 #8d5130;
          transition: transform 0.15s, box-shadow 0.15s;
          white-space: nowrap;
        }
        .tfw-btn:hover {
          transform: translateY(4px);
          box-shadow: 0 4px 0 #8d5130;
        }
        .tfw-btn:active {
          transform: translateY(7px);
          box-shadow: 0 1px 0 #8d5130;
        }

        /* ── Scrapbook ───────────────────────────── */
        .tfw-scrapbook {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 28px 22px;
          margin-bottom: 52px;
          padding: 20px 0;
        }
        .tfw-polaroid {
          position: relative;
          background: #fff;
          padding: 11px 11px 42px;
          border-radius: 20px;
          box-shadow: 0 6px 22px rgba(80,50,20,0.13);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.2,0.7,0.2,1), box-shadow 0.3s;
          flex-shrink: 0;
        }
        .tfw-polaroid:hover {
          z-index: 5;
          box-shadow: 0 12px 32px rgba(80,50,20,0.22);
        }
        .tfw-polaroid img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          filter: saturate(0.7);
          transition: filter 0.4s;
        }
        .tfw-polaroid:hover img {
          filter: saturate(1);
        }
        .tfw-polaroid-caption {
          position: absolute;
          bottom: 12px;
          left: 11px;
          right: 11px;
          text-align: center;
          font-family: 'Gloria Hallelujah', cursive;
          font-size: 12px;
          color: #806b58;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* tape strip */
        .tfw-tape {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 20px;
          background: rgba(240,218,150,0.72);
          border-radius: 2px;
          z-index: 2;
          pointer-events: none;
        }

        /* individual photo sizes & rotations */
        .tfw-p0 { width: 220px; height: auto; transform: rotate(-4deg); }
        .tfw-p0 img { height: 180px; }
        .tfw-p1 { width: 200px; height: auto; transform: rotate(5deg); margin-top: 30px; }
        .tfw-p1 img { height: 200px; }
        .tfw-p2 { width: 240px; height: auto; transform: rotate(2deg); }
        .tfw-p2 img { height: 170px; }
        .tfw-p3 { width: 190px; height: auto; transform: rotate(5deg); margin-top: 24px; }
        .tfw-p3 img { height: 210px; }
        .tfw-p4 { width: 210px; height: auto; transform: rotate(-5deg); }
        .tfw-p4 img { height: 185px; }

        .tfw-polaroid:hover.tfw-p0 { transform: rotate(-4deg) scale(1.06); }
        .tfw-polaroid:hover.tfw-p1 { transform: rotate(5deg) scale(1.06); }
        .tfw-polaroid:hover.tfw-p2 { transform: rotate(2deg) scale(1.06); }
        .tfw-polaroid:hover.tfw-p3 { transform: rotate(5deg) scale(1.06); }
        .tfw-polaroid:hover.tfw-p4 { transform: rotate(-5deg) scale(1.06); }

        /* ── Badges ──────────────────────────────── */
        .tfw-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-bottom: 48px;
        }
        .tfw-badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 20px;
          border-radius: 50px;
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          font-size: 14px;
          border: 2.5px solid;
          transition: transform 0.2s;
        }
        .tfw-badge:hover { transform: translateY(-2px); }
        .tfw-badge-0 { background: #faf0d8; color: #59422f; border-color: #d9c59a; box-shadow: 3px 3px 0 #d9c59a; }
        .tfw-badge-1 { background: #8ea477; color: #fff; border-color: #6e8a5a; box-shadow: 3px 3px 0 #6e8a5a; }
        .tfw-badge-2 { background: #f0b86b; color: #59422f; border-color: #c8932e; box-shadow: 3px 3px 0 #c8932e; }
        .tfw-badge-3 { background: #b96855; color: #fff; border-color: #954c3a; box-shadow: 3px 3px 0 #954c3a; }
        .tfw-badge-4 { background: #faf0d8; color: #59422f; border-color: #d9c59a; box-shadow: 3px 3px 0 #d9c59a; }
        .tfw-badge-5 { background: #8ea477; color: #fff; border-color: #6e8a5a; box-shadow: 3px 3px 0 #6e8a5a; }

        /* ── Sticky note ─────────────────────────── */
        .tfw-note {
          max-width: 400px;
          margin: 0 auto;
          background: #f1d98f;
          padding: 28px 30px 24px;
          border-radius: 6px;
          box-shadow: 4px 6px 18px rgba(80,50,20,0.15);
          transform: rotate(-1.5deg);
          text-align: center;
        }
        .tfw-note-text {
          font-family: 'Gloria Hallelujah', cursive;
          font-size: 17px;
          color: #59422f;
          line-height: 1.6;
          margin: 0;
        }
        .tfw-note-attr {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #8a6347;
          margin-top: 10px;
        }

        /* ── Responsive 800px ────────────────────── */
        @media (max-width: 800px) {
          .tfw-p0, .tfw-p1, .tfw-p2, .tfw-p3, .tfw-p4 { width: 44%; margin-top: 0; }
          .tfw-p0 img, .tfw-p1 img, .tfw-p2 img, .tfw-p3 img, .tfw-p4 img { height: 160px; }
          .tfw-scrapbook { gap: 20px 14px; }
        }

        /* ── Responsive 520px ────────────────────── */
        @media (max-width: 520px) {
          .tfw-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
          }
          .tfw-header > div:last-child {
            justify-self: center;
          }
          .tfw-bio { max-width: 100%; }
          .tfw-scrapbook {
            flex-direction: column;
            align-items: center;
          }
          .tfw-p0, .tfw-p1, .tfw-p2, .tfw-p3, .tfw-p4 {
            width: 88%;
            transform: rotate(0deg) !important;
            margin-top: 0;
          }
          .tfw-p0 img, .tfw-p1 img, .tfw-p2 img, .tfw-p3 img, .tfw-p4 img {
            height: 220px;
          }
          .tfw-polaroid:hover.tfw-p0,
          .tfw-polaroid:hover.tfw-p1,
          .tfw-polaroid:hover.tfw-p2,
          .tfw-polaroid:hover.tfw-p3,
          .tfw-polaroid:hover.tfw-p4 {
            transform: rotate(0deg) scale(1.02) !important;
          }
          .tfw-tape { display: none; }
          .tfw-badges { gap: 8px; }
          .tfw-note { max-width: 90%; }
        }
      `}</style>

      <section className="tfw-wrap">
        {/* decorative doodles */}
        <span className="tfw-doodle tfw-doodle-heart" aria-hidden="true">&#x2665;</span>
        <span className="tfw-doodle tfw-doodle-star" aria-hidden="true">&#x2605;</span>
        <span className="tfw-doodle tfw-doodle-heart2" aria-hidden="true">&#x2661;</span>

        {/* header */}
        <header className="tfw-header">
          <div>
            <div className="tfw-kicker">{serviceArea}</div>
            <h1 className="tfw-name">
              {name}
              {verified && <span className="tfw-verified" title="Verified photographer">&#10003;</span>}
            </h1>
            {tagline && <div className="tfw-tagline">{tagline}</div>}
            {bio && <p className="tfw-bio">{bio}</p>}
            {priceLabel && <span className="tfw-price-label">{priceLabel}</span>}
          </div>
          <div>
            <button className="tfw-btn" onClick={onHire}>Book Your Session</button>
          </div>
        </header>

        {/* scrapbook photos */}
        <div className="tfw-scrapbook">
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`tfw-polaroid tfw-p${i}`}
              onClick={() => onPhotoClick(i)}
            >
              <div className="tfw-tape" />
              <img src={photo.url} alt={photo.filename} loading="lazy" />
              <span className="tfw-polaroid-caption">{captions[i] || photo.filename}</span>
            </div>
          ))}
        </div>

        {/* specialty badges */}
        <div className="tfw-badges">
          {specialties.map((s, i) => (
            <span key={s} className={`tfw-badge tfw-badge-${i % 6}`}>{s}</span>
          ))}
        </div>

        {/* sticky note */}
        <div className="tfw-note">
          <p className="tfw-note-text">
            &ldquo;Every family has a story worth capturing. Let&rsquo;s tell yours together.&rdquo;
          </p>
          <div className="tfw-note-attr">&mdash; {name}</div>
        </div>
      </section>
    </>
  );
}
