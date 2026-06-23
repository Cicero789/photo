// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingDebate(props: TemplateProps) {
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
    const id = "font-tt-debate";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const miniCards = ["LD / PF", "Speech", "Writing"];
  const methods = [
    { num: 1, title: "Foundations", desc: "Core argumentation frameworks, evidence evaluation, and logical structure." },
    { num: 2, title: "Practice Rounds", desc: "Simulated rounds with real-time feedback, flowing, and cross-ex drills." },
    { num: 3, title: "Competition Prep", desc: "Tournament strategy, judge adaptation, and mental performance coaching." },
  ];

  return (
    <>
      <style>{`
        .tt-debate {
          position: relative;
          background: #f8f5ef;
          color: #1a1a1a;
          font-family: Inter, sans-serif;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-debate-watermark {
          position: absolute;
          top: 40px;
          left: 40px;
          font-family: 'Merriweather', serif;
          font-size: 96px;
          font-weight: 900;
          color: rgba(17, 24, 39, 0.035);
          pointer-events: none;
          z-index: 0;
          line-height: 1;
          letter-spacing: -2px;
        }
        .tt-debate-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .tt-debate-eyebrow {
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #9a3412;
          margin-bottom: 12px;
        }
        .tt-debate-name {
          font-family: 'Merriweather', serif;
          font-size: 40px;
          font-weight: 900;
          margin: 0 0 6px;
          line-height: 1.2;
          color: #111827;
        }
        .tt-debate-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #111827;
          color: #fff;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-debate-tagline {
          font-family: 'Merriweather', serif;
          font-size: 21px;
          font-weight: 400;
          color: #444;
          margin: 0 0 14px;
          line-height: 1.5;
        }
        .tt-debate-stats {
          display: flex;
          gap: 28px;
          margin-bottom: 18px;
        }
        .tt-debate-stat {
          text-align: center;
        }
        .tt-debate-stat-num {
          font-family: 'Merriweather', serif;
          font-size: 32px;
          font-weight: 900;
          color: #111827;
          line-height: 1.1;
        }
        .tt-debate-stat-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #9a3412;
          font-weight: 600;
        }
        .tt-debate-location {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }
        .tt-debate-price-label {
          font-size: 14px;
          color: #9a3412;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .tt-debate-specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .tt-debate-tag {
          background: rgba(17, 24, 39, 0.07);
          color: #111827;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .tt-debate-btns {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .tt-debate-btn-primary {
          background: #111827;
          color: #fff;
          border: none;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .tt-debate-btn-primary:hover { opacity: 0.85; }
        .tt-debate-btn-ghost {
          background: transparent;
          color: #111827;
          border: 1.5px solid #111827;
          padding: 14px 32px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .tt-debate-btn-ghost:hover { background: rgba(17, 24, 39, 0.05); }
        .tt-debate-photo-card {
          border-radius: 20px;
          overflow: hidden;
          max-height: 420px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .tt-debate-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: sepia(0.12);
          cursor: pointer;
        }
        .tt-debate-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          padding: 0 5vw 64px;
          position: relative;
          z-index: 1;
        }
        .tt-debate-panel {
          background: #fff;
          border: 1px solid #e5e1d8;
          border-radius: 18px;
          padding: 36px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
        }
        .tt-debate-panel-title {
          font-family: 'Merriweather', serif;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 16px;
          color: #111827;
        }
        .tt-debate-bio {
          font-size: 15px;
          line-height: 1.7;
          color: #555;
          margin: 0 0 28px;
        }
        .tt-debate-methods {
          counter-reset: method;
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .tt-debate-method {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .tt-debate-method-num {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #111827;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Merriweather', serif;
          font-size: 15px;
          font-weight: 700;
        }
        .tt-debate-method-title {
          font-size: 15px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 2px;
        }
        .tt-debate-method-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.55;
        }
        .tt-debate-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-debate-minicard {
          background: #f8f5ef;
          border: 1px solid #e5e1d8;
          border-radius: 12px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-debate-minicard-icon {
          font-size: 26px;
          margin-bottom: 6px;
        }
        .tt-debate-minicard-label {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
        }
        .tt-debate-tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-debate-tier {
          background: #f8f5ef;
          border: 1px solid #e5e1d8;
          border-radius: 12px;
          padding: 22px 16px;
          text-align: center;
        }
        .tt-debate-tier-label {
          font-size: 13px;
          color: #666;
          margin-bottom: 6px;
        }
        .tt-debate-tier-price {
          font-family: 'Merriweather', serif;
          font-size: 28px;
          font-weight: 900;
          color: #111827;
        }
        .tt-debate-testimonial {
          background: rgba(154, 52, 18, 0.05);
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 28px;
          font-style: italic;
          font-size: 14px;
          line-height: 1.65;
          color: #555;
          border-left: 3px solid #9a3412;
        }
        .tt-debate-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-debate-gallery-img {
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 1;
          cursor: pointer;
        }
        .tt-debate-gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .tt-debate-gallery-img:hover img { transform: scale(1.05); }

        @media (max-width: 800px) {
          .tt-debate-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 40px;
          }
          .tt-debate-band {
            grid-template-columns: 1fr;
          }
          .tt-debate-name { font-size: 30px; }
          .tt-debate-photo-card { max-height: 320px; }
          .tt-debate-watermark { font-size: 64px; top: 20px; left: 20px; }
        }
        @media (max-width: 520px) {
          .tt-debate-hero { padding: 32px 4vw 28px; gap: 24px; }
          .tt-debate-name { font-size: 24px; }
          .tt-debate-tagline { font-size: 17px; }
          .tt-debate-minicards { grid-template-columns: 1fr; }
          .tt-debate-tiers { grid-template-columns: 1fr; }
          .tt-debate-gallery { grid-template-columns: repeat(2, 1fr); }
          .tt-debate-btns { flex-direction: column; }
          .tt-debate-band { padding: 0 4vw 40px; }
          .tt-debate-stats { gap: 16px; }
          .tt-debate-stat-num { font-size: 24px; }
        }
      `}</style>

      <div className="tt-debate">
        <div className="tt-debate-watermark">Resolved:</div>

        <div className="tt-debate-hero">
          <div>
            <div className="tt-debate-eyebrow">Debate &amp; Speech</div>
            <h1 className="tt-debate-name">
              {name}
              {verified && (
                <span className="tt-debate-verified" title="Verified">&#10003;</span>
              )}
            </h1>
            <h2 className="tt-debate-tagline">
              {tagline || "Sharper arguments. Stronger speeches. Better presence."}
            </h2>
            <div className="tt-debate-stats">
              <div className="tt-debate-stat">
                <div className="tt-debate-stat-num">31</div>
                <div className="tt-debate-stat-label">Finalists</div>
              </div>
              <div className="tt-debate-stat">
                <div className="tt-debate-stat-num">12</div>
                <div className="tt-debate-stat-label">State Qualifiers</div>
              </div>
              <div className="tt-debate-stat">
                <div className="tt-debate-stat-num">5</div>
                <div className="tt-debate-stat-label">National Bids</div>
              </div>
            </div>
            <div className="tt-debate-location">{serviceArea}</div>
            {priceLabel && <div className="tt-debate-price-label">{priceLabel}</div>}
            <div className="tt-debate-specialties">
              {specialties.map((s) => (
                <span key={s} className="tt-debate-tag">{s}</span>
              ))}
            </div>
            <div className="tt-debate-btns">
              <button className="tt-debate-btn-primary" onClick={onHire}>
                Book a Session
              </button>
              <button className="tt-debate-btn-ghost">View Results</button>
            </div>
          </div>

          <div className="tt-debate-photo-card">
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

        <div className="tt-debate-band">
          <div className="tt-debate-panel">
            <div className="tt-debate-panel-title">About the Coach</div>
            <p className="tt-debate-bio">{bio}</p>
            <div className="tt-debate-panel-title">Method</div>
            <div className="tt-debate-methods">
              {methods.map((m) => (
                <div key={m.num} className="tt-debate-method">
                  <div className="tt-debate-method-num">{m.num}</div>
                  <div>
                    <div className="tt-debate-method-title">{m?.filename}</div>
                    <div className="tt-debate-method-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tt-debate-panel">
            <div className="tt-debate-panel-title">Focus Areas</div>
            <div className="tt-debate-minicards">
              {miniCards.map((label, i) => (
                <div key={label} className="tt-debate-minicard">
                  <div className="tt-debate-minicard-icon">
                    {["⚖️", "🎤", "✍️"][i]}
                  </div>
                  <div className="tt-debate-minicard-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="tt-debate-panel-title">Pricing</div>
            <div className="tt-debate-tiers">
              {[
                { label: "Private", price: "$75" },
                { label: "Team", price: "$240" },
                { label: "Tournament", price: "$500" },
              ].map((t) => (
                <div key={t.label} className="tt-debate-tier">
                  <div className="tt-debate-tier-label">{t.label}</div>
                  <div className="tt-debate-tier-price">{t.price}</div>
                </div>
              ))}
            </div>

            <div className="tt-debate-testimonial">
              "My daughter went from barely making it past prelims to qualifying
              for state in one season. His feedback is surgical." — Parent
            </div>

            <div className="tt-debate-gallery">
              {portfolio.slice(1, 7).map((photo, i) => (
                <div
                  key={photo.id}
                  className="tt-debate-gallery-img"
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
