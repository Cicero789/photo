// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingArt(props: TemplateProps) {
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
    const id = "font-tt-art";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const miniCards = ["Painting", "Sculpture", "Digital"];

  return (
    <>
      <style>{`
        .tt-art {
          position: relative;
          background: #fffaf0;
          color: #1a1a1a;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-art-hero {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tt-art-eyebrow {
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #f97316;
          margin-bottom: 12px;
        }
        .tt-art-name {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 6px;
          line-height: 1.15;
          color: #1a1a1a;
        }
        .tt-art-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #7c3aed;
          color: #fff;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-art-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: #444;
          margin: 0 0 10px;
          line-height: 1.45;
        }
        .tt-art-location {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .tt-art-price-label {
          font-size: 14px;
          color: #7c3aed;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .tt-art-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .tt-art-tag {
          background: rgba(124, 58, 237, 0.1);
          color: #7c3aed;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .tt-art-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tt-art-btn-primary {
          background: #7c3aed;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .tt-art-btn-primary:hover { opacity: 0.88; }
        .tt-art-btn-ghost {
          background: transparent;
          color: #7c3aed;
          border: 1.5px solid #7c3aed;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tt-art-btn-ghost:hover { background: rgba(124, 58, 237, 0.06); }
        .tt-art-photo-wrap {
          position: relative;
        }
        .tt-art-photo-wrap::before {
          content: '';
          position: absolute;
          top: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(#ef4444, #f97316, #fbbf24, #22c55e, #3b82f6, #8b5cf6, #ec4899, #ef4444);
          opacity: 0.3;
          z-index: 0;
          pointer-events: none;
        }
        .tt-art-photo-card {
          border-radius: 24px;
          overflow: hidden;
          max-height: 420px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          transform: rotate(1.2deg);
          position: relative;
          z-index: 1;
        }
        .tt-art-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }
        .tt-art-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          padding: 0 5vw 64px;
          position: relative;
          z-index: 1;
        }
        .tt-art-panel {
          background: #fff;
          border: 1px solid rgba(124, 58, 237, 0.15);
          border-radius: 18px;
          padding: 36px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .tt-art-panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
          color: #7c3aed;
        }
        .tt-art-bio {
          font-size: 15px;
          line-height: 1.7;
          color: #555;
          margin: 0 0 28px;
        }
        .tt-art-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .tt-art-minicard {
          background: #fffaf0;
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-art-minicard-icon {
          font-size: 26px;
          margin-bottom: 6px;
        }
        .tt-art-minicard-label {
          font-size: 13px;
          font-weight: 600;
          color: #7c3aed;
        }
        .tt-art-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-art-tier {
          background: #fef3c7;
          border: 1px solid rgba(124, 58, 237, 0.12);
          border-radius: 12px;
          padding: 22px 16px;
          text-align: center;
        }
        .tt-art-tier-label {
          font-size: 13px;
          color: #666;
          margin-bottom: 6px;
        }
        .tt-art-tier-price {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 800;
          color: #7c3aed;
        }
        .tt-art-testimonial {
          background: #fef3c7;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 28px;
          font-style: italic;
          font-size: 14px;
          line-height: 1.65;
          color: #555;
          border-left: 3px solid #7c3aed;
        }
        .tt-art-gallery {
          display: grid;
          grid-template-columns: 1.2fr .8fr 1fr;
          gap: 10px;
        }
        .tt-art-gallery-img {
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
        }
        .tt-art-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .tt-art-gallery-img:hover img { transform: scale(1.05); }

        @media (max-width: 800px) {
          .tt-art-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 40px;
          }
          .tt-art-band {
            grid-template-columns: 1fr;
          }
          .tt-art-name { font-size: 32px; }
          .tt-art-photo-card { max-height: 320px; transform: rotate(0.6deg); }
          .tt-art-tiers { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 520px) {
          .tt-art-hero { padding: 32px 4vw 28px; gap: 24px; }
          .tt-art-name { font-size: 26px; }
          .tt-art-tagline { font-size: 17px; }
          .tt-art-minicards { grid-template-columns: 1fr; }
          .tt-art-tiers { grid-template-columns: 1fr; }
          .tt-art-gallery { grid-template-columns: repeat(2, 1fr); }
          .tt-art-btns { flex-direction: column; }
          .tt-art-band { padding: 0 4vw 40px; }
          .tt-art-photo-card { transform: none; }
        }
      `}</style>

      <div className="tt-art">
        <div className="tt-art-hero">
          <div>
            <div className="tt-art-eyebrow">Art Atelier</div>
            <h1 className="tt-art-name">
              {name}
              {verified && (
                <span className="tt-art-verified" title="Verified">&#10003;</span>
              )}
            </h1>
            <h2 className="tt-art-tagline">
              {tagline || "A studio for brave lines, bold color, and original student work."}
            </h2>
            <div className="tt-art-location">{serviceArea}</div>
            {priceLabel && <div className="tt-art-price-label">{priceLabel}</div>}
            <div className="tt-art-specialties">
              {specialties.map((s) => (
                <span key={s} className="tt-art-tag">{s}</span>
              ))}
            </div>
            <div className="tt-art-btns">
              <button className="tt-art-btn-primary" onClick={onHire}>
                Book a Session
              </button>
              <button className="tt-art-btn-ghost">View Gallery</button>
            </div>
          </div>

          <div className="tt-art-photo-wrap">
            <div className="tt-art-photo-card">
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
        </div>

        <div className="tt-art-band">
          <div className="tt-art-panel">
            <div className="tt-art-panel-title">About the Artist</div>
            <p className="tt-art-bio">{bio}</p>
            <div className="tt-art-minicards">
              {miniCards.map((label, i) => (
                <div key={label} className="tt-art-minicard">
                  <div className="tt-art-minicard-icon">
                    {["🎨", "🗿", "💻"][i]}
                  </div>
                  <div className="tt-art-minicard-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tt-art-panel">
            <div className="tt-art-panel-title">Pricing</div>
            <div className="tt-art-tiers">
              {[
                { label: "Drop-in", price: "$40" },
                { label: "Monthly", price: "$155" },
                { label: "Portfolio", price: "$420" },
              ].map((t) => (
                <div key={t.label} className="tt-art-tier">
                  <div className="tt-art-tier-label">{t.label}</div>
                  <div className="tt-art-tier-price">{t.price}</div>
                </div>
              ))}
            </div>

            <div className="tt-art-testimonial">
              "She helped my son find his artistic voice. The portfolio he built
              here got him into his dream program." — Parent
            </div>

            <div className="tt-art-gallery">
              {portfolio.slice(1, 7).map((photo, i) => (
                <div
                  key={photo.id}
                  className="tt-art-gallery-img"
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
