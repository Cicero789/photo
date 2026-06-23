// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingActing(props: TemplateProps) {
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
    const id = "font-tt-act";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const miniCards = ["Monologues", "Camera", "Scenes"];

  return (
    <>
      <style>{`
        .tt-act {
          position: relative;
          background: radial-gradient(ellipse at 20% 0%, #7f1d1d 0%, #111827 55%, #030712 100%);
          color: #fff;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-act-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tt-act-eyebrow {
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #fca5a5;
          margin-bottom: 12px;
        }
        .tt-act-name {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 800;
          margin: 0 0 6px;
          line-height: 1.15;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .tt-act-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ef4444;
          color: #fff;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-act-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 400;
          color: #e5e7eb;
          margin: 0 0 10px;
          line-height: 1.45;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .tt-act-location {
          font-size: 14px;
          color: #e5e7eb;
          margin-bottom: 8px;
        }
        .tt-act-price-label {
          font-size: 14px;
          color: #fca5a5;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .tt-act-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .tt-act-tag {
          background: rgba(239, 68, 68, 0.12);
          color: #fca5a5;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .tt-act-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tt-act-btn-primary {
          background: #ef4444;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .tt-act-btn-primary:hover { opacity: 0.88; }
        .tt-act-btn-ghost {
          background: transparent;
          color: #fca5a5;
          border: 1.5px solid #fca5a5;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tt-act-btn-ghost:hover { background: rgba(239, 68, 68, 0.08); }
        .tt-act-photo-card {
          border-radius: 24px;
          overflow: hidden;
          max-height: 420px;
          box-shadow: 0 0 80px rgba(239, 68, 68, 0.25), 0 20px 60px rgba(0,0,0,0.5);
        }
        .tt-act-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }
        .tt-act-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          padding: 0 5vw 64px;
          position: relative;
          z-index: 1;
        }
        .tt-act-panel {
          background: rgba(17, 24, 39, 0.8);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 18px;
          padding: 36px;
          backdrop-filter: blur(8px);
        }
        .tt-act-panel-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
          color: #fca5a5;
        }
        .tt-act-bio {
          font-size: 15px;
          line-height: 1.7;
          color: #e5e7eb;
          margin: 0 0 28px;
        }
        .tt-act-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-act-minicard {
          background: rgba(3, 7, 18, 0.6);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-act-minicard-icon {
          font-size: 26px;
          margin-bottom: 6px;
        }
        .tt-act-minicard-label {
          font-size: 13px;
          font-weight: 600;
          color: #fca5a5;
        }
        .tt-act-headshots {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .tt-act-headshot {
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
        }
        .tt-act-headshot img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .tt-act-video {
          background: linear-gradient(135deg, #111827, #030712);
          border-radius: 16px;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          position: relative;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }
        .tt-act-play {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .tt-act-play:hover { transform: scale(1.1); }
        .tt-act-play-icon {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 12px 0 12px 22px;
          border-color: transparent transparent transparent #fff;
          margin-left: 4px;
        }
        .tt-act-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-act-tier {
          background: rgba(3, 7, 18, 0.6);
          border: 1px solid rgba(239, 68, 68, 0.18);
          border-radius: 12px;
          padding: 22px 16px;
          text-align: center;
        }
        .tt-act-tier-label {
          font-size: 13px;
          color: #e5e7eb;
          margin-bottom: 6px;
        }
        .tt-act-tier-price {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 800;
          color: #ef4444;
        }
        .tt-act-testimonial {
          background: rgba(239, 68, 68, 0.06);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 28px;
          font-style: italic;
          font-size: 14px;
          line-height: 1.65;
          color: #e5e7eb;
          border-left: 3px solid #ef4444;
        }
        .tt-act-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-act-gallery-img {
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
        }
        .tt-act-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .tt-act-gallery-img:hover img { transform: scale(1.05); }

        @media (max-width: 800px) {
          .tt-act-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 40px;
          }
          .tt-act-band {
            grid-template-columns: 1fr;
          }
          .tt-act-name { font-size: 32px; }
          .tt-act-photo-card { max-height: 320px; }
          .tt-act-headshots { grid-template-columns: repeat(4, 1fr); }
        }
        @media (max-width: 520px) {
          .tt-act-hero { padding: 32px 4vw 28px; gap: 24px; }
          .tt-act-name { font-size: 26px; }
          .tt-act-tagline { font-size: 17px; }
          .tt-act-minicards { grid-template-columns: 1fr; }
          .tt-act-tiers { grid-template-columns: 1fr; }
          .tt-act-gallery { grid-template-columns: repeat(2, 1fr); }
          .tt-act-btns { flex-direction: column; }
          .tt-act-band { padding: 0 4vw 40px; }
          .tt-act-headshots { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="tt-act">
        <div className="tt-act-hero">
          <div>
            <div className="tt-act-eyebrow">Acting Coach</div>
            <h1 className="tt-act-name">
              {name}
              {verified && (
                <span className="tt-act-verified" title="Verified">&#10003;</span>
              )}
            </h1>
            <h2 className="tt-act-tagline">
              {tagline || "Own the room before the first line."}
            </h2>
            <div className="tt-act-location">{serviceArea}</div>
            {priceLabel && <div className="tt-act-price-label">{priceLabel}</div>}
            <div className="tt-act-specialties">
              {specialties.map((s) => (
                <span key={s} className="tt-act-tag">{s}</span>
              ))}
            </div>
            <div className="tt-act-btns">
              <button className="tt-act-btn-primary" onClick={onHire}>
                Book a Lesson
              </button>
              <button className="tt-act-btn-ghost">Watch Reel</button>
            </div>
          </div>

          <div className="tt-act-photo-card">
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

        <div className="tt-act-band">
          <div className="tt-act-panel">
            <div className="tt-act-panel-title">About the Coach</div>
            <p className="tt-act-bio">{bio}</p>
            <div className="tt-act-minicards">
              {miniCards.map((label, i) => (
                <div key={label} className="tt-act-minicard">
                  <div className="tt-act-minicard-icon">
                    {["🎭", "🎬", "🎪"][i]}
                  </div>
                  <div className="tt-act-minicard-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="tt-act-headshots">
              {portfolio.slice(1, 5).map((photo, i) => (
                <div
                  key={photo.id}
                  className="tt-act-headshot"
                  onClick={() => onPhotoClick(i + 1)}
                >
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="tt-act-panel">
            <div className="tt-act-video">
              <div className="tt-act-play">
                <div className="tt-act-play-icon" />
              </div>
            </div>

            <div className="tt-act-panel-title">Coaching Packages</div>
            <div className="tt-act-tiers">
              {[
                { label: "Audition", price: "$80" },
                { label: "Weekly", price: "$280" },
                { label: "Workshop", price: "$190" },
              ].map((t) => (
                <div key={t.label} className="tt-act-tier">
                  <div className="tt-act-tier-label">{t.label}</div>
                  <div className="tt-act-tier-price">{t.price}</div>
                </div>
              ))}
            </div>

            <div className="tt-act-testimonial">
              "He completely transformed my audition technique. I booked three
              callbacks within a month of starting." — Student
            </div>

            <div className="tt-act-gallery">
              {portfolio.slice(5, 11).map((photo, i) => (
                <div
                  key={photo.id}
                  className="tt-act-gallery-img"
                  onClick={() => onPhotoClick(i + 5)}
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
