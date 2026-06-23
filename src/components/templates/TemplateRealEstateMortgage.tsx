import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateMortgage(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-mortgage";
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
        .trem-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #ecfeff 0%, #f0fdfa 100%); font-family: Inter, sans-serif; min-height: 100vh; color: #1e293b; }
        .trem-nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 5vw; border-bottom: 1px solid #a5f3fc; }
        .trem-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 8px; color: #164e63; }
        .trem-brand-icon { width: 32px; height: 32px; border-radius: 26px 90px 26px 90px; background: #0891b2; display: flex; align-items: center; justify-content: center; color: #ecfeff; font-size: 16px; }
        .trem-nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; color: #475569; }
        .trem-nav-links span { cursor: pointer; transition: color .2s; }
        .trem-nav-links span:hover { color: #0891b2; }
        .trem-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 50px 5vw 40px; align-items: start; }
        .trem-hero-copy { display: flex; flex-direction: column; gap: 16px; }
        .trem-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .trem-pill { padding: 5px 14px; border-radius: 26px 90px 26px 90px; background: #a5f3fc; color: #164e63; font-size: 12px; font-weight: 600; }
        .trem-hero h2 { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.8vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: #0c4a6e; }
        .trem-hero-bio { font-size: 14px; line-height: 1.7; color: #475569; margin: 0; }
        .trem-listing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 4px; }
        .trem-listing-card { background: #fff; border-radius: 26px 90px 26px 90px; padding: 18px 20px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
        .trem-listing-card b { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #0891b2; }
        .trem-listing-card span { display: block; font-size: 11px; color: #64748b; margin-top: 4px; }
        .trem-cta-row { display: flex; gap: 12px; margin-top: 6px; }
        .trem-hire { padding: 12px 28px; border: none; border-radius: 26px 90px 26px 90px; background: #0891b2; color: #ecfeff; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform .25s, background .25s; }
        .trem-hire:hover { background: #0e7490; transform: translateY(-2px); }
        .trem-secondary { padding: 12px 28px; border: 1.5px solid #0891b2; border-radius: 26px 90px 26px 90px; background: transparent; color: #0891b2; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .25s; }
        .trem-secondary:hover { background: #cffafe; }
        .trem-hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .trem-hero-visual .trem-thumb { aspect-ratio: 4/3; border-radius: 26px 90px 26px 90px; overflow: hidden; cursor: pointer; }
        .trem-hero-visual .trem-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .trem-hero-visual .trem-thumb:hover img { transform: scale(1.04); }
        .trem-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 0 5vw 28px; }
        .trem-panel { background: #fff; border-radius: 26px 90px 26px 90px; padding: 26px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
        .trem-panel-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; margin: 0 0 14px; color: #0c4a6e; }
        .trem-cred-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .trem-cred-badge { padding: 6px 14px; border-radius: 26px 90px 26px 90px; background: #ecfeff; border: 1px solid #a5f3fc; font-size: 13px; font-weight: 500; color: #155e75; }
        .trem-area-text { font-size: 14px; line-height: 1.7; color: #475569; }
        .trem-lower-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; padding: 0 5vw 32px; }
        .trem-contact-panel { background: #fff; border-radius: 26px 90px 26px 90px; padding: 26px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
        .trem-contact-panel p { font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 10px; }
        .trem-quote-box { background: linear-gradient(135deg, #0891b2 0%, #0d9488 100%); border-radius: 26px 90px 26px 90px; padding: 30px; color: #ecfeff; display: flex; flex-direction: column; justify-content: center; }
        .trem-quote-box blockquote { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; line-height: 1.6; font-style: italic; }
        .trem-quote-box cite { margin-top: 14px; font-size: 13px; font-style: normal; opacity: .8; }
        .trem-gallery { padding: 0 5vw 56px; }
        .trem-gallery-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; margin: 0 0 18px; color: #0c4a6e; }
        .trem-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .trem-gallery-grid .trem-photo { aspect-ratio: 1; border-radius: 26px 90px 26px 90px; overflow: hidden; cursor: pointer; }
        .trem-gallery-grid .trem-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s ease; }
        .trem-gallery-grid .trem-photo:hover img { transform: scale(1.04); }
        .trem-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #0891b2; color: #ecfeff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .trem-hero { grid-template-columns: 1fr; }
          .trem-main-grid { grid-template-columns: 1fr; }
          .trem-lower-grid { grid-template-columns: 1fr; }
          .trem-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .trem-listing-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .trem-nav { flex-direction: column; gap: 10px; }
          .trem-listing-cards { grid-template-columns: 1fr; }
          .trem-gallery-grid { gap: 6px; }
          .trem-cta-row { flex-direction: column; }
          .trem-hero-visual { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="trem-wrap">
        <nav className="trem-nav">
          <div className="trem-brand">
            <div className="trem-brand-icon">&#9670;</div>
            {name}
          </div>
          <div className="trem-nav-links">
            <span>Listings</span><span>Service Area</span><span>Credentials</span><span>Contact</span>
          </div>
        </nav>

        <div className="trem-hero">
          <div className="trem-hero-copy">
            <div className="trem-pills">
              {specialties.map((s, i) => <span key={i} className="trem-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trem-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trem-hero-bio">{bio}</p>
            <div className="trem-listing-cards">
              <div className="trem-listing-card"><b>{priceLabel || "Get Quote"}</b><span>Per Session</span></div>
              <div className="trem-listing-card"><b>{specialties.length}</b><span>Specialties</span></div>
              <div className="trem-listing-card"><b>{portfolio.length}</b><span>Portfolio Shots</span></div>
            </div>
            <div className="trem-cta-row">
              <button className="trem-hire" onClick={onHire}>Hire Me</button>
              <button className="trem-secondary">View Portfolio</button>
            </div>
          </div>
          <div className="trem-hero-visual">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="trem-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="trem-main-grid">
          <div className="trem-panel">
            <h3 className="trem-panel-title">Credentials</h3>
            <div className="trem-cred-list">
              {specialties.map((s, i) => <span key={i} className="trem-cred-badge">{s}</span>)}
            </div>
          </div>
          <div className="trem-panel">
            <h3 className="trem-panel-title">Service Area</h3>
            <p className="trem-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trem-lower-grid">
          <div className="trem-contact-panel">
            <h3 className="trem-panel-title">About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p><b>{priceLabel}</b></p>}
          </div>
          <div className="trem-quote-box">
            <blockquote>&ldquo;Made the numbers make sense and delivered stunning visuals.&rdquo;</blockquote>
            <cite>&mdash; Homeowner</cite>
          </div>
        </div>

        <div className="trem-gallery">
          <h3 className="trem-gallery-title">Portfolio</h3>
          <div className="trem-gallery-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trem-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
