// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingMusic(props: TemplateProps) {
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
    const id = "font-tt-music";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const miniCards = ["Piano", "Guitar", "Voice"];

  return (
    <>
      <style>{`
        .tt-music {
          position: relative;
          background: #1c1917;
          color: #fff;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-music-watermark {
          position: absolute;
          top: 30px;
          right: 40px;
          font-size: 120px;
          color: rgba(251, 191, 36, 0.06);
          pointer-events: none;
          z-index: 0;
          line-height: 1;
        }
        .tt-music-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tt-music-eyebrow {
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #fbbf24;
          margin-bottom: 12px;
        }
        .tt-music-name {
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 6px;
          line-height: 1.15;
        }
        .tt-music-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fbbf24;
          color: #1c1917;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-music-tagline {
          font-size: 22px;
          font-weight: 400;
          color: #d6d3d1;
          margin: 0 0 10px;
          line-height: 1.45;
        }
        .tt-music-location {
          font-size: 14px;
          color: #d6d3d1;
          margin-bottom: 8px;
        }
        .tt-music-price-label {
          font-size: 14px;
          color: #fbbf24;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .tt-music-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .tt-music-tag {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .tt-music-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tt-music-btn-primary {
          background: #fbbf24;
          color: #1c1917;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .tt-music-btn-primary:hover { opacity: 0.88; }
        .tt-music-btn-ghost {
          background: transparent;
          color: #fbbf24;
          border: 1.5px solid #fbbf24;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tt-music-btn-ghost:hover { background: rgba(251, 191, 36, 0.08); }
        .tt-music-photo-card {
          border-radius: 100px 28px 28px 100px;
          overflow: hidden;
          max-height: 420px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .tt-music-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }
        .tt-music-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          padding: 0 5vw 64px;
          position: relative;
          z-index: 1;
        }
        .tt-music-panel {
          background: #292524;
          border: 1px solid rgba(251, 191, 36, 0.15);
          border-radius: 18px;
          padding: 36px;
        }
        .tt-music-panel-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
          color: #fbbf24;
        }
        .tt-music-bio {
          font-size: 15px;
          line-height: 1.7;
          color: #d6d3d1;
          margin: 0 0 28px;
        }
        .tt-music-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .tt-music-minicard {
          background: #1c1917;
          border: 1px solid rgba(251, 191, 36, 0.2);
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-music-minicard-icon {
          font-size: 26px;
          margin-bottom: 6px;
        }
        .tt-music-minicard-label {
          font-size: 13px;
          font-weight: 600;
          color: #fbbf24;
        }
        .tt-music-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-music-tier {
          background: #1c1917;
          border: 1px solid rgba(251, 191, 36, 0.18);
          border-radius: 12px;
          padding: 22px 16px;
          text-align: center;
        }
        .tt-music-tier-duration {
          font-size: 13px;
          color: #d6d3d1;
          margin-bottom: 6px;
        }
        .tt-music-tier-price {
          font-size: 28px;
          font-weight: 800;
          color: #fbbf24;
        }
        .tt-music-testimonial {
          background: rgba(251, 191, 36, 0.08);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 28px;
          font-style: italic;
          font-size: 14px;
          line-height: 1.65;
          color: #d6d3d1;
          border-left: 3px solid #fbbf24;
        }
        .tt-music-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-music-gallery-img {
          border-radius: 50% 24px 50% 24px;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
        }
        .tt-music-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .tt-music-gallery-img:hover img { transform: scale(1.05); }

        @media (max-width: 800px) {
          .tt-music-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 40px;
          }
          .tt-music-band {
            grid-template-columns: 1fr;
          }
          .tt-music-name { font-size: 32px; }
          .tt-music-photo-card { max-height: 320px; }
          .tt-music-tiers { grid-template-columns: repeat(3, 1fr); }
          .tt-music-watermark { font-size: 80px; top: 16px; right: 16px; }
        }
        @media (max-width: 520px) {
          .tt-music-hero { padding: 32px 4vw 28px; gap: 24px; }
          .tt-music-name { font-size: 26px; }
          .tt-music-tagline { font-size: 17px; }
          .tt-music-minicards { grid-template-columns: 1fr; }
          .tt-music-tiers { grid-template-columns: 1fr; }
          .tt-music-gallery { grid-template-columns: repeat(2, 1fr); }
          .tt-music-btns { flex-direction: column; }
          .tt-music-band { padding: 0 4vw 40px; }
        }
      `}</style>

      <div className="tt-music">
        <div className="tt-music-watermark">♪ ♫</div>

        <div className="tt-music-hero">
          <div>
            <div className="tt-music-eyebrow">Music Studio</div>
            <h1 className="tt-music-name">
              {name}
              {verified && (
                <span className="tt-music-verified" title="Verified">&#10003;</span>
              )}
            </h1>
            <h2 className="tt-music-tagline">
              {tagline || "Private music lessons with rhythm, joy, and discipline."}
            </h2>
            <div className="tt-music-location">{serviceArea}</div>
            {priceLabel && <div className="tt-music-price-label">{priceLabel}</div>}
            <div className="tt-music-specialties">
              {specialties.map((s) => (
                <span key={s} className="tt-music-tag">{s}</span>
              ))}
            </div>
            <div className="tt-music-btns">
              <button className="tt-music-btn-primary" onClick={onHire}>
                Book a Lesson
              </button>
              <button className="tt-music-btn-ghost">View Recitals</button>
            </div>
          </div>

          <div className="tt-music-photo-card">
            {portfolio.length > 0 && (
              <img
                src={portfolio?.[0].url}
                alt={portfolio?.[0].filename}
                loading="lazy"
                onClick={() => onPhotoClick(0)}
              />
            )}
          </div>
        </div>

        <div className="tt-music-band">
          <div className="tt-music-panel">
            <div className="tt-music-panel-title">About the Studio</div>
            <p className="tt-music-bio">{bio}</p>
            <div className="tt-music-minicards">
              {miniCards.map((label, i) => (
                <div key={label} className="tt-music-minicard">
                  <div className="tt-music-minicard-icon">
                    {["🎹", "🎸", "🎤"][i]}
                  </div>
                  <div className="tt-music-minicard-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tt-music-panel">
            <div className="tt-music-panel-title">Lesson Pricing</div>
            <div className="tt-music-tiers">
              {[
                { dur: "30 Min", price: "$38" },
                { dur: "45 Min", price: "$55" },
                { dur: "60 Min", price: "$72" },
              ].map((t) => (
                <div key={t.dur} className="tt-music-tier">
                  <div className="tt-music-tier-duration">{t.dur}</div>
                  <div className="tt-music-tier-price">{t.price}</div>
                </div>
              ))}
            </div>

            <div className="tt-music-testimonial">
              "My daughter's confidence on stage has grown beyond what I imagined.
              The recitals are magical." — Parent
            </div>

            <div className="tt-music-gallery">
              {portfolio.slice(1, 7).map((photo, i) => (
                <div
                  key={photo.id}
                  className="tt-music-gallery-img"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
