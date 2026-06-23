import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateAppraiser(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea: serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-appraiser";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  return (
    <>
      <style>{`
        .traa-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); font-family: Inter, sans-serif; color: #1e293b; min-height: 600px; }
        .traa-nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 5vw; border-bottom: 1px solid #cbd5e1; }
        .traa-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; color: #334155; }
        .traa-nav-links { display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: #475569; }
        .traa-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 52px 5vw 40px; align-items: start; }
        .traa-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .traa-pill { padding: 5px 14px; border-radius: 12px; background: #334155; color: #fff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .traa-hero h2 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.5vw, 44px); font-weight: 700; color: #0f172a; line-height: 1.18; }
        .traa-hero-bio { font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 22px; }
        .traa-info-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px; }
        .traa-info-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: center; }
        .traa-info-card b { display: block; font-size: 18px; color: #334155; }
        .traa-info-card span { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
        .traa-btns { display: flex; gap: 12px; }
        .traa-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 12px; background: #334155; color: #fff; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: transform .25s, background .25s; }
        .traa-hire:hover { background: #1e293b; transform: translateY(-2px); }
        .traa-view { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #334155; border-radius: 12px; background: transparent; color: #334155; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: background .25s, color .25s; }
        .traa-view:hover { background: #334155; color: #fff; }
        .traa-hero-img { border-radius: 12px; overflow: hidden; aspect-ratio: 4/3; }
        .traa-hero-img img { width: 100%; height: 100%; object-fit: cover; }
        .traa-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #334155; color: #fff; font-size: 12px; margin-left: 8px; vertical-align: middle; }
        .traa-main { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .traa-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; }
        .traa-panel h3 { margin: 0 0 16px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #0f172a; }
        .traa-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .traa-badge { padding: 6px 16px; border-radius: 12px; border: 1px solid #cbd5e1; font-size: 12px; font-weight: 500; color: #334155; }
        .traa-area-text { font-size: 14px; color: #475569; line-height: 1.7; }
        .traa-lower { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding: 0 5vw 40px; }
        .traa-contact { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px; }
        .traa-contact h3 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #0f172a; }
        .traa-contact p { margin: 0 0 10px; font-size: 14px; color: #475569; line-height: 1.7; }
        .traa-price { font-weight: 700; color: #334155; font-size: 16px; }
        .traa-quote { background: #334155; border-radius: 12px; padding: 36px; display: flex; align-items: center; justify-content: center; }
        .traa-quote p { margin: 0; color: #f1f5f9; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-style: italic; line-height: 1.6; text-align: center; }
        .traa-gallery { padding: 0 5vw 60px; }
        .traa-gallery h3 { font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #0f172a; margin: 0 0 18px; }
        .traa-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .traa-photo { aspect-ratio: 1; border-radius: 12px; overflow: hidden; cursor: pointer; border: 1px solid #e2e8f0; }
        .traa-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .traa-photo:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .traa-hero { grid-template-columns: 1fr; }
          .traa-main { grid-template-columns: 1fr; }
          .traa-lower { grid-template-columns: 1fr; }
          .traa-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .traa-info-cards { grid-template-columns: 1fr; }
          .traa-btns { flex-direction: column; }
          .traa-grid { gap: 8px; }
          .traa-hero h2 { font-size: 24px; }
        }
      `}</style>
      <section className="traa-wrap">
        <nav className="traa-nav">
          <span className="traa-brand">{name}</span>
          <div className="traa-nav-links">
            <span>About</span><span>Credentials</span><span>Gallery</span><span>Contact</span>
          </div>
        </nav>

        <div className="traa-hero">
          <div>
            <div className="traa-pills">
              {specialties.slice(0, 4).map((s) => <span key={s} className="traa-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="traa-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="traa-hero-bio">{bio}</p>
            <div className="traa-info-cards">
              <div className="traa-info-card"><b>{specialties.length}+</b><span>Credentials</span></div>
              <div className="traa-info-card"><b>{portfolio.length}</b><span>Appraisals</span></div>
              <div className="traa-info-card"><b>{serviceArea.split(",")[0]}</b><span>Coverage</span></div>
            </div>
            <div className="traa-btns">
              <button className="traa-hire" onClick={onHire}>Hire Me</button>
              <button className="traa-view" onClick={() => { const g = document.querySelector(".traa-gallery"); g?.scrollIntoView({ behavior: "smooth" }); }}>View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="traa-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="traa-main">
          <div className="traa-panel">
            <h3>Credentials</h3>
            <div className="traa-badges">
              {specialties.map((s) => <span key={s} className="traa-badge">{s}</span>)}
            </div>
          </div>
          <div className="traa-panel">
            <h3>Service Area</h3>
            <p className="traa-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="traa-lower">
          <div className="traa-contact">
            <h3>About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p className="traa-price">{priceLabel}</p>}
          </div>
          <div className="traa-quote">
            <p>"Precision valuations backed by data — every property assessed with care."</p>
          </div>
        </div>

        <div className="traa-gallery">
          <h3>Portfolio</h3>
          <div className="traa-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="traa-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
