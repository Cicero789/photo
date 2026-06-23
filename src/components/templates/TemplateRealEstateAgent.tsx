import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateAgent(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-agent";
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
        .trea-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #f0fdf4 0%, #dcfce7 100%); font-family: Inter, sans-serif; min-height: 100vh; color: #1e293b; }
        .trea-nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 5vw; border-bottom: 1px solid #bbf7d0; }
        .trea-brand { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 8px; color: #052e16; }
        .trea-brand-icon { width: 32px; height: 32px; border-radius: 34px; background: #16a34a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; }
        .trea-nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; color: #374151; }
        .trea-nav-links span { cursor: pointer; transition: color .2s; }
        .trea-nav-links span:hover { color: #16a34a; }
        .trea-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 52px 5vw 40px; align-items: start; }
        .trea-hero-copy { display: flex; flex-direction: column; gap: 18px; }
        .trea-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .trea-pill { padding: 5px 14px; border-radius: 34px; background: #bbf7d0; color: #052e16; font-size: 12px; font-weight: 600; }
        .trea-hero h2 { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.8vw, 44px); font-weight: 700; letter-spacing: -0.03em; color: #052e16; }
        .trea-hero-bio { font-size: 14px; line-height: 1.7; color: #475569; margin: 0; }
        .trea-listing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 6px; }
        .trea-listing-card { background: #fff; border-radius: 34px; padding: 18px; box-shadow: 0 1px 4px rgba(0,0,0,.06); }
        .trea-listing-card b { font-family: 'Space Grotesk', sans-serif; font-size: 18px; color: #16a34a; }
        .trea-listing-card span { display: block; font-size: 11px; color: #64748b; margin-top: 4px; }
        .trea-cta-row { display: flex; gap: 12px; margin-top: 8px; }
        .trea-hire { padding: 12px 28px; border: none; border-radius: 34px; background: #16a34a; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform .25s, background .25s; }
        .trea-hire:hover { background: #15803d; transform: translateY(-2px); }
        .trea-secondary { padding: 12px 28px; border: 1.5px solid #16a34a; border-radius: 34px; background: transparent; color: #16a34a; font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .25s; }
        .trea-secondary:hover { background: #dcfce7; }
        .trea-hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .trea-hero-visual .trea-thumb { aspect-ratio: 4/3; border-radius: 34px; overflow: hidden; cursor: pointer; }
        .trea-hero-visual .trea-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .trea-hero-visual .trea-thumb:hover img { transform: scale(1.04); }
        .trea-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .trea-panel { background: #fff; border-radius: 34px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
        .trea-panel-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; margin: 0 0 14px; color: #052e16; }
        .trea-cred-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .trea-cred-badge { padding: 6px 16px; border-radius: 34px; background: #f0fdf4; border: 1px solid #bbf7d0; font-size: 13px; font-weight: 500; color: #166534; }
        .trea-area-text { font-size: 14px; line-height: 1.7; color: #475569; }
        .trea-lower-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; padding: 0 5vw 36px; }
        .trea-contact-panel { background: #fff; border-radius: 34px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,.05); }
        .trea-contact-panel p { font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 10px; }
        .trea-quote-box { background: #16a34a; border-radius: 34px; padding: 32px; color: #fff; display: flex; flex-direction: column; justify-content: center; }
        .trea-quote-box blockquote { margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 500; line-height: 1.6; font-style: italic; }
        .trea-quote-box cite { margin-top: 14px; font-size: 13px; font-style: normal; opacity: .85; }
        .trea-gallery { padding: 0 5vw 60px; }
        .trea-gallery-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 20px; margin: 0 0 18px; color: #052e16; }
        .trea-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .trea-gallery-grid .trea-photo { aspect-ratio: 1; border-radius: 34px; overflow: hidden; cursor: pointer; }
        .trea-gallery-grid .trea-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s ease; }
        .trea-gallery-grid .trea-photo:hover img { transform: scale(1.04); }
        .trea-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #16a34a; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .trea-hero { grid-template-columns: 1fr; }
          .trea-main-grid { grid-template-columns: 1fr; }
          .trea-lower-grid { grid-template-columns: 1fr; }
          .trea-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .trea-listing-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .trea-nav { flex-direction: column; gap: 10px; }
          .trea-listing-cards { grid-template-columns: 1fr; }
          .trea-gallery-grid { gap: 6px; }
          .trea-cta-row { flex-direction: column; }
          .trea-hero-visual { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="trea-wrap">
        <nav className="trea-nav">
          <div className="trea-brand">
            <div className="trea-brand-icon">&#9750;</div>
            {name}
          </div>
          <div className="trea-nav-links">
            <span>Listings</span><span>Service Area</span><span>Credentials</span><span>Contact</span>
          </div>
        </nav>

        <div className="trea-hero">
          <div className="trea-hero-copy">
            <div className="trea-pills">
              {specialties.map((s, i) => <span key={i} className="trea-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trea-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trea-hero-bio">{bio}</p>
            <div className="trea-listing-cards">
              <div className="trea-listing-card"><b>{priceLabel || "Contact"}</b><span>Per Session</span></div>
              <div className="trea-listing-card"><b>{specialties.length}</b><span>Specialties</span></div>
              <div className="trea-listing-card"><b>{portfolio.length}</b><span>Portfolio Shots</span></div>
            </div>
            <div className="trea-cta-row">
              <button className="trea-hire" onClick={onHire}>Hire Me</button>
              <button className="trea-secondary">View Portfolio</button>
            </div>
          </div>
          <div className="trea-hero-visual">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="trea-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="trea-main-grid">
          <div className="trea-panel">
            <h3 className="trea-panel-title">Credentials</h3>
            <div className="trea-cred-list">
              {specialties.map((s, i) => <span key={i} className="trea-cred-badge">{s}</span>)}
            </div>
          </div>
          <div className="trea-panel">
            <h3 className="trea-panel-title">Service Area</h3>
            <p className="trea-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trea-lower-grid">
          <div className="trea-contact-panel">
            <h3 className="trea-panel-title">About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p><b>{priceLabel}</b></p>}
          </div>
          <div className="trea-quote-box">
            <blockquote>&ldquo;An incredible photographer who truly understands the vision.&rdquo;</blockquote>
            <cite>&mdash; Happy Client</cite>
          </div>
        </div>

        <div className="trea-gallery">
          <h3 className="trea-gallery-title">Portfolio</h3>
          <div className="trea-gallery-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trea-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
