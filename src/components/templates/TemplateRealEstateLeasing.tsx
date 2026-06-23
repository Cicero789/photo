import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateLeasing(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-leasing";
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
        .trle-wrap { padding: 0; margin: 0; background: radial-gradient(ellipse at 30% 20%, #f5f3ff 0%, #e0f2fe 100%); font-family: Inter, sans-serif; color: #1e1b4b; min-height: 600px; }
        .trle-nav { display: flex; justify-content: space-between; align-items: center; padding: 18px 5vw; border-bottom: 1px solid #ddd6fe; }
        .trle-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; color: #7c3aed; }
        .trle-nav-links { display: flex; gap: 24px; font-size: 13px; font-weight: 500; color: #6d28d9; }
        .trle-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 52px 5vw 40px; align-items: start; }
        .trle-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; }
        .trle-pill { padding: 5px 14px; border-radius: 999px 999px 40px 40px; background: #7c3aed; color: #fff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
        .trle-hero h2 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.5vw, 44px); font-weight: 700; color: #1e1b4b; line-height: 1.18; }
        .trle-hero-bio { font-size: 14px; line-height: 1.7; color: #4c1d95; margin: 0 0 22px; }
        .trle-info-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 22px; }
        .trle-info-card { background: rgba(124,58,237,.08); border-radius: 999px 999px 40px 40px; padding: 16px; text-align: center; }
        .trle-info-card b { display: block; font-size: 18px; color: #7c3aed; }
        .trle-info-card span { font-size: 11px; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.08em; }
        .trle-btns { display: flex; gap: 12px; }
        .trle-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 999px 999px 40px 40px; background: #7c3aed; color: #fff; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: transform .25s, background .25s; }
        .trle-hire:hover { background: #6d28d9; transform: translateY(-2px); }
        .trle-view { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #7c3aed; border-radius: 999px 999px 40px 40px; background: transparent; color: #7c3aed; font: 600 14px/1 Inter, sans-serif; cursor: pointer; transition: background .25s, color .25s; }
        .trle-view:hover { background: #7c3aed; color: #fff; }
        .trle-hero-img { border-radius: 999px 999px 40px 40px; overflow: hidden; aspect-ratio: 4/3; }
        .trle-hero-img img { width: 100%; height: 100%; object-fit: cover; }
        .trle-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #7c3aed; color: #fff; font-size: 12px; margin-left: 8px; vertical-align: middle; }
        .trle-main { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .trle-panel { background: #fff; border-radius: 999px 999px 40px 40px; padding: 32px; box-shadow: 0 2px 12px rgba(124,58,237,.06); }
        .trle-panel h3 { margin: 0 0 16px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #1e1b4b; }
        .trle-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .trle-badge { padding: 6px 16px; border-radius: 999px; border: 1px solid #ddd6fe; font-size: 12px; font-weight: 500; color: #7c3aed; }
        .trle-area-text { font-size: 14px; color: #4c1d95; line-height: 1.7; }
        .trle-lower { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; padding: 0 5vw 40px; }
        .trle-contact { background: #fff; border-radius: 999px 999px 40px 40px; padding: 32px; box-shadow: 0 2px 12px rgba(124,58,237,.06); }
        .trle-contact h3 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #1e1b4b; }
        .trle-contact p { margin: 0 0 10px; font-size: 14px; color: #4c1d95; line-height: 1.7; }
        .trle-price { font-weight: 700; color: #7c3aed; font-size: 16px; }
        .trle-quote { background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 999px 999px 40px 40px; padding: 36px; display: flex; align-items: center; justify-content: center; }
        .trle-quote p { margin: 0; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-style: italic; line-height: 1.6; text-align: center; }
        .trle-gallery { padding: 0 5vw 60px; }
        .trle-gallery h3 { font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #1e1b4b; margin: 0 0 18px; }
        .trle-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .trle-photo { aspect-ratio: 1; border-radius: 999px 999px 40px 40px; overflow: hidden; cursor: pointer; }
        .trle-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .trle-photo:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .trle-hero { grid-template-columns: 1fr; }
          .trle-main { grid-template-columns: 1fr; }
          .trle-lower { grid-template-columns: 1fr; }
          .trle-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .trle-info-cards { grid-template-columns: 1fr; }
          .trle-btns { flex-direction: column; }
          .trle-grid { gap: 8px; }
          .trle-hero h2 { font-size: 24px; }
        }
      `}</style>
      <section className="trle-wrap">
        <nav className="trle-nav">
          <span className="trle-brand">{name}</span>
          <div className="trle-nav-links">
            <span>Listings</span><span>Amenities</span><span>Gallery</span><span>Apply</span>
          </div>
        </nav>

        <div className="trle-hero">
          <div>
            <div className="trle-pills">
              {specialties.slice(0, 4).map((s) => <span key={s} className="trle-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trle-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trle-hero-bio">{bio}</p>
            <div className="trle-info-cards">
              <div className="trle-info-card"><b>{specialties.length}+</b><span>Services</span></div>
              <div className="trle-info-card"><b>{portfolio.length}</b><span>Listings</span></div>
              <div className="trle-info-card"><b>{serviceArea.split(",")[0]}</b><span>Neighborhoods</span></div>
            </div>
            <div className="trle-btns">
              <button className="trle-hire" onClick={onHire}>Hire Me</button>
              <button className="trle-view" onClick={() => { const g = document.querySelector(".trle-gallery"); g?.scrollIntoView({ behavior: "smooth" }); }}>View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="trle-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="trle-main">
          <div className="trle-panel">
            <h3>Credentials</h3>
            <div className="trle-badges">
              {specialties.map((s) => <span key={s} className="trle-badge">{s}</span>)}
            </div>
          </div>
          <div className="trle-panel">
            <h3>Service Area</h3>
            <p className="trle-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trle-lower">
          <div className="trle-contact">
            <h3>About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p className="trle-price">{priceLabel}</p>}
          </div>
          <div className="trle-quote">
            <p>"Finding the perfect space for every renter — apartment living made easy."</p>
          </div>
        </div>

        <div className="trle-gallery">
          <h3>Portfolio</h3>
          <div className="trle-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trle-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
