import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateInvestor(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea: serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-investor";
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
        .triv-wrap { padding: 0; margin: 0; background: linear-gradient(160deg, #020617 0%, #064e3b 100%); font-family: Inter, sans-serif; color: #f1f5f9; min-height: 600px; }
        .triv-nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 5vw; border-bottom: 1px solid rgba(255,255,255,.1); }
        .triv-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; color: #22c55e; }
        .triv-nav-links { display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: rgba(255,255,255,.6); }
        .triv-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 52px 5vw 40px; align-items: start; }
        .triv-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .triv-pill { padding: 5px 14px; border-radius: 18px; background: #22c55e; color: #052e16; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .triv-hero h2 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.5vw, 44px); font-weight: 700; color: #fff; line-height: 1.18; }
        .triv-hero-bio { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,.7); margin: 0 0 22px; }
        .triv-info-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px; }
        .triv-info-card { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 16px; text-align: center; backdrop-filter: blur(8px); }
        .triv-info-card b { display: block; font-size: 18px; color: #22c55e; }
        .triv-info-card span { font-size: 11px; color: rgba(255,255,255,.5); text-transform: uppercase; letter-spacing: 0.08em; }
        .triv-btns { display: flex; gap: 12px; }
        .triv-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 18px; background: #22c55e; color: #052e16; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: transform .25s, background .25s; }
        .triv-hire:hover { background: #16a34a; transform: translateY(-2px); }
        .triv-view { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #22c55e; border-radius: 18px; background: transparent; color: #22c55e; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: background .25s, color .25s; }
        .triv-view:hover { background: #22c55e; color: #052e16; }
        .triv-hero-img { border-radius: 18px; overflow: hidden; aspect-ratio: 4/3; }
        .triv-hero-img img { width: 100%; height: 100%; object-fit: cover; }
        .triv-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #22c55e; color: #052e16; font-size: 12px; margin-left: 8px; vertical-align: middle; }
        .triv-main { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .triv-panel { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 32px; backdrop-filter: blur(8px); }
        .triv-panel h3 { margin: 0 0 16px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #22c55e; }
        .triv-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .triv-badge { padding: 6px 16px; border-radius: 18px; border: 1px solid rgba(255,255,255,.15); font-size: 12px; font-weight: 500; color: rgba(255,255,255,.8); }
        .triv-area-text { font-size: 14px; color: rgba(255,255,255,.7); line-height: 1.7; }
        .triv-lower { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding: 0 5vw 40px; }
        .triv-contact { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); border-radius: 18px; padding: 32px; backdrop-filter: blur(8px); }
        .triv-contact h3 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #22c55e; }
        .triv-contact p { margin: 0 0 10px; font-size: 14px; color: rgba(255,255,255,.7); line-height: 1.7; }
        .triv-price { font-weight: 700; color: #22c55e; font-size: 16px; }
        .triv-quote { background: rgba(34,197,94,.15); border: 1px solid rgba(34,197,94,.3); border-radius: 18px; padding: 36px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
        .triv-quote p { margin: 0; color: #86efac; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-style: italic; line-height: 1.6; text-align: center; }
        .triv-gallery { padding: 0 5vw 60px; }
        .triv-gallery h3 { font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #22c55e; margin: 0 0 18px; }
        .triv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .triv-photo { aspect-ratio: 1; border-radius: 18px; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,.1); }
        .triv-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .triv-photo:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .triv-hero { grid-template-columns: 1fr; }
          .triv-main { grid-template-columns: 1fr; }
          .triv-lower { grid-template-columns: 1fr; }
          .triv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .triv-info-cards { grid-template-columns: 1fr; }
          .triv-btns { flex-direction: column; }
          .triv-grid { gap: 8px; }
          .triv-hero h2 { font-size: 24px; }
        }
      `}</style>
      <section className="triv-wrap">
        <nav className="triv-nav">
          <span className="triv-brand">{name}</span>
          <div className="triv-nav-links">
            <span>Deals</span><span>Portfolio</span><span>Track Record</span><span>Contact</span>
          </div>
        </nav>

        <div className="triv-hero">
          <div>
            <div className="triv-pills">
              {specialties.slice(0, 4).map((s) => <span key={s} className="triv-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="triv-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="triv-hero-bio">{bio}</p>
            <div className="triv-info-cards">
              <div className="triv-info-card"><b>{specialties.length}+</b><span>Strategies</span></div>
              <div className="triv-info-card"><b>{portfolio.length}</b><span>Deals</span></div>
              <div className="triv-info-card"><b>{serviceArea.split(",")[0]}</b><span>Markets</span></div>
            </div>
            <div className="triv-btns">
              <button className="triv-hire" onClick={onHire}>Hire Me</button>
              <button className="triv-view" onClick={() => { const g = document.querySelector(".triv-gallery"); g?.scrollIntoView({ behavior: "smooth" }); }}>View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="triv-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="triv-main">
          <div className="triv-panel">
            <h3>Credentials</h3>
            <div className="triv-badges">
              {specialties.map((s) => <span key={s} className="triv-badge">{s}</span>)}
            </div>
          </div>
          <div className="triv-panel">
            <h3>Service Area</h3>
            <p className="triv-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="triv-lower">
          <div className="triv-contact">
            <h3>About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p className="triv-price">{priceLabel}</p>}
          </div>
          <div className="triv-quote">
            <p>"Maximizing returns through strategic acquisitions — every deal analyzed."</p>
          </div>
        </div>

        <div className="triv-gallery">
          <h3>Portfolio</h3>
          <div className="triv-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="triv-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
