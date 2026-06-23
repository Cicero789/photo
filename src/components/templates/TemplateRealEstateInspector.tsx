import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateInspector(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea: serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-inspector";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap";
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
        .trei-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #fff7ed 0%, #fef3c7 100%); font-family: Inter, sans-serif; color: #422006; min-height: 600px; }
        .trei-nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 5vw; border-bottom: 1px solid #fed7aa; }
        .trei-brand { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 20px; color: #9a3412; }
        .trei-nav-links { display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: #78350f; }
        .trei-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 52px 5vw 40px; align-items: start; }
        .trei-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .trei-pill { padding: 5px 14px; border-radius: 80px 28px 80px 28px; background: #ea580c; color: #fff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .trei-hero h2 { margin: 0 0 12px; font-family: 'Libre Baskerville', serif; font-size: clamp(26px, 3.5vw, 44px); font-weight: 700; color: #9a3412; line-height: 1.18; }
        .trei-hero-bio { font-size: 14px; line-height: 1.7; color: #78350f; margin: 0 0 22px; }
        .trei-info-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px; }
        .trei-info-card { background: rgba(234,88,12,.08); border-radius: 80px 28px 80px 28px; padding: 16px; text-align: center; }
        .trei-info-card b { display: block; font-size: 18px; color: #9a3412; }
        .trei-info-card span { font-size: 11px; color: #78350f; text-transform: uppercase; letter-spacing: 0.08em; }
        .trei-btns { display: flex; gap: 12px; }
        .trei-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 80px 28px 80px 28px; background: #ea580c; color: #fff; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: transform .25s, background .25s; }
        .trei-hire:hover { background: #c2410c; transform: translateY(-2px); }
        .trei-view { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #ea580c; border-radius: 80px 28px 80px 28px; background: transparent; color: #ea580c; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: background .25s, color .25s; }
        .trei-view:hover { background: #ea580c; color: #fff; }
        .trei-hero-img { border-radius: 80px 28px 80px 28px; overflow: hidden; aspect-ratio: 4/3; }
        .trei-hero-img img { width: 100%; height: 100%; object-fit: cover; }
        .trei-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #ea580c; color: #fff; font-size: 12px; margin-left: 8px; vertical-align: middle; }
        .trei-main { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .trei-panel { background: #fff; border-radius: 80px 28px 80px 28px; padding: 32px; }
        .trei-panel h3 { margin: 0 0 16px; font-family: 'Libre Baskerville', serif; font-size: 18px; color: #9a3412; }
        .trei-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .trei-badge { padding: 6px 16px; border-radius: 80px 28px 80px 28px; border: 1px solid #fed7aa; font-size: 12px; font-weight: 500; color: #9a3412; }
        .trei-area-text { font-size: 14px; color: #78350f; line-height: 1.7; }
        .trei-lower { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding: 0 5vw 40px; }
        .trei-contact { background: #fff; border-radius: 80px 28px 80px 28px; padding: 32px; }
        .trei-contact h3 { margin: 0 0 12px; font-family: 'Libre Baskerville', serif; font-size: 18px; color: #9a3412; }
        .trei-contact p { margin: 0 0 10px; font-size: 14px; color: #78350f; line-height: 1.7; }
        .trei-price { font-weight: 700; color: #ea580c; font-size: 16px; }
        .trei-quote { background: #ea580c; border-radius: 80px 28px 80px 28px; padding: 36px; display: flex; align-items: center; justify-content: center; }
        .trei-quote p { margin: 0; color: #fff; font-family: 'Libre Baskerville', serif; font-size: 18px; font-style: italic; line-height: 1.6; text-align: center; }
        .trei-gallery { padding: 0 5vw 60px; }
        .trei-gallery h3 { font-family: 'Libre Baskerville', serif; font-size: 20px; color: #9a3412; margin: 0 0 18px; }
        .trei-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .trei-photo { aspect-ratio: 1; border-radius: 80px 28px 80px 28px; overflow: hidden; cursor: pointer; }
        .trei-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .trei-photo:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .trei-hero { grid-template-columns: 1fr; }
          .trei-main { grid-template-columns: 1fr; }
          .trei-lower { grid-template-columns: 1fr; }
          .trei-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .trei-info-cards { grid-template-columns: 1fr; }
          .trei-btns { flex-direction: column; }
          .trei-grid { gap: 8px; }
          .trei-hero h2 { font-size: 24px; }
        }
      `}</style>
      <section className="trei-wrap">
        <nav className="trei-nav">
          <span className="trei-brand">{name}</span>
          <div className="trei-nav-links">
            <span>About</span><span>Services</span><span>Gallery</span><span>Contact</span>
          </div>
        </nav>

        <div className="trei-hero">
          <div>
            <div className="trei-pills">
              {specialties.slice(0, 4).map((s) => <span key={s} className="trei-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trei-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trei-hero-bio">{bio}</p>
            <div className="trei-info-cards">
              <div className="trei-info-card"><b>{specialties.length}+</b><span>Specialties</span></div>
              <div className="trei-info-card"><b>{portfolio.length}</b><span>Projects</span></div>
              <div className="trei-info-card"><b>{serviceArea.split(",")[0]}</b><span>Service Area</span></div>
            </div>
            <div className="trei-btns">
              <button className="trei-hire" onClick={onHire}>Hire Me</button>
              <button className="trei-view" onClick={() => { const g = document.querySelector(".trei-gallery"); g?.scrollIntoView({ behavior: "smooth" }); }}>View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="trei-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="trei-main">
          <div className="trei-panel">
            <h3>Credentials</h3>
            <div className="trei-badges">
              {specialties.map((s) => <span key={s} className="trei-badge">{s}</span>)}
            </div>
          </div>
          <div className="trei-panel">
            <h3>Service Area</h3>
            <p className="trei-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trei-lower">
          <div className="trei-contact">
            <h3>About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p className="trei-price">{priceLabel}</p>}
          </div>
          <div className="trei-quote">
            <p>"Thorough inspections you can trust — every detail documented."</p>
          </div>
        </div>

        <div className="trei-gallery">
          <h3>Portfolio</h3>
          <div className="trei-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trei-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
