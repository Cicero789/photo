import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateProperty(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-property";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap";
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
        .trep-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%); font-family: Inter, sans-serif; min-height: 100vh; color: #1e293b; }
        .trep-nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 5vw; border-bottom: 1px solid #bfdbfe; }
        .trep-brand { font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 8px; color: #1e3a5f; }
        .trep-brand-icon { width: 32px; height: 32px; border-radius: 18px; background: #2563eb; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; }
        .trep-nav-links { display: flex; gap: 24px; font-size: 14px; font-weight: 500; color: #475569; }
        .trep-nav-links span { cursor: pointer; transition: color .2s; }
        .trep-nav-links span:hover { color: #2563eb; }
        .trep-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 48px 5vw 40px; align-items: start; }
        .trep-hero-copy { display: flex; flex-direction: column; gap: 16px; }
        .trep-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .trep-pill { padding: 5px 14px; border-radius: 18px; background: #dbeafe; color: #1e3a8a; font-size: 12px; font-weight: 600; }
        .trep-hero h2 { margin: 0; font-size: clamp(26px, 3.6vw, 42px); font-weight: 800; letter-spacing: -0.03em; color: #0f172a; }
        .trep-hero-bio { font-size: 14px; line-height: 1.7; color: #475569; margin: 0; }
        .trep-listing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 4px; }
        .trep-listing-card { background: #fff; border-radius: 18px; padding: 18px; box-shadow: 0 1px 4px rgba(0,0,0,.06); border: 1px solid #e2e8f0; }
        .trep-listing-card b { font-size: 19px; font-weight: 800; color: #2563eb; }
        .trep-listing-card span { display: block; font-size: 11px; color: #64748b; margin-top: 4px; }
        .trep-cta-row { display: flex; gap: 12px; margin-top: 6px; }
        .trep-hire { padding: 12px 28px; border: none; border-radius: 18px; background: #2563eb; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform .25s, background .25s; }
        .trep-hire:hover { background: #1d4ed8; transform: translateY(-2px); }
        .trep-secondary { padding: 12px 28px; border: 1.5px solid #2563eb; border-radius: 18px; background: transparent; color: #2563eb; font-size: 15px; font-weight: 600; cursor: pointer; transition: background .25s; }
        .trep-secondary:hover { background: #dbeafe; }
        .trep-hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .trep-hero-visual .trep-thumb { aspect-ratio: 4/3; border-radius: 18px; overflow: hidden; cursor: pointer; border: 1px solid #e2e8f0; }
        .trep-hero-visual .trep-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
        .trep-hero-visual .trep-thumb:hover img { transform: scale(1.04); }
        .trep-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 0 5vw 28px; }
        .trep-panel { background: #fff; border-radius: 18px; padding: 26px; box-shadow: 0 1px 4px rgba(0,0,0,.05); border: 1px solid #e2e8f0; }
        .trep-panel-title { font-weight: 700; font-size: 16px; margin: 0 0 14px; color: #0f172a; }
        .trep-cred-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .trep-cred-badge { padding: 6px 14px; border-radius: 18px; background: #eff6ff; border: 1px solid #bfdbfe; font-size: 13px; font-weight: 500; color: #1e40af; }
        .trep-area-text { font-size: 14px; line-height: 1.7; color: #475569; }
        .trep-lower-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; padding: 0 5vw 32px; }
        .trep-contact-panel { background: #fff; border-radius: 18px; padding: 26px; box-shadow: 0 1px 4px rgba(0,0,0,.05); border: 1px solid #e2e8f0; }
        .trep-contact-panel p { font-size: 14px; line-height: 1.7; color: #475569; margin: 0 0 10px; }
        .trep-quote-box { background: #2563eb; border-radius: 18px; padding: 30px; color: #fff; display: flex; flex-direction: column; justify-content: center; }
        .trep-quote-box blockquote { margin: 0; font-size: 17px; font-weight: 600; line-height: 1.6; font-style: italic; }
        .trep-quote-box cite { margin-top: 14px; font-size: 13px; font-style: normal; opacity: .8; }
        .trep-gallery { padding: 0 5vw 56px; }
        .trep-gallery-title { font-weight: 800; font-size: 20px; margin: 0 0 18px; color: #0f172a; }
        .trep-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .trep-gallery-grid .trep-photo { aspect-ratio: 1; border-radius: 18px; overflow: hidden; cursor: pointer; border: 1px solid #e2e8f0; }
        .trep-gallery-grid .trep-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s ease; }
        .trep-gallery-grid .trep-photo:hover img { transform: scale(1.04); }
        .trep-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #2563eb; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .trep-hero { grid-template-columns: 1fr; }
          .trep-main-grid { grid-template-columns: 1fr; }
          .trep-lower-grid { grid-template-columns: 1fr; }
          .trep-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .trep-listing-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .trep-nav { flex-direction: column; gap: 10px; }
          .trep-listing-cards { grid-template-columns: 1fr; }
          .trep-gallery-grid { gap: 6px; }
          .trep-cta-row { flex-direction: column; }
          .trep-hero-visual { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="trep-wrap">
        <nav className="trep-nav">
          <div className="trep-brand">
            <div className="trep-brand-icon">&#9635;</div>
            {name}
          </div>
          <div className="trep-nav-links">
            <span>Listings</span><span>Service Area</span><span>Credentials</span><span>Contact</span>
          </div>
        </nav>

        <div className="trep-hero">
          <div className="trep-hero-copy">
            <div className="trep-pills">
              {specialties.map((s, i) => <span key={i} className="trep-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trep-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trep-hero-bio">{bio}</p>
            <div className="trep-listing-cards">
              <div className="trep-listing-card"><b>{priceLabel || "Contact"}</b><span>Per Session</span></div>
              <div className="trep-listing-card"><b>{specialties.length}</b><span>Specialties</span></div>
              <div className="trep-listing-card"><b>{portfolio.length}</b><span>Properties</span></div>
            </div>
            <div className="trep-cta-row">
              <button className="trep-hire" onClick={onHire}>Hire Me</button>
              <button className="trep-secondary">View Portfolio</button>
            </div>
          </div>
          <div className="trep-hero-visual">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="trep-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="trep-main-grid">
          <div className="trep-panel">
            <h3 className="trep-panel-title">Credentials</h3>
            <div className="trep-cred-list">
              {specialties.map((s, i) => <span key={i} className="trep-cred-badge">{s}</span>)}
            </div>
          </div>
          <div className="trep-panel">
            <h3 className="trep-panel-title">Service Area</h3>
            <p className="trep-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trep-lower-grid">
          <div className="trep-contact-panel">
            <h3 className="trep-panel-title">About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p><b>{priceLabel}</b></p>}
          </div>
          <div className="trep-quote-box">
            <blockquote>&ldquo;Organized, professional, and delivered every shot on time.&rdquo;</blockquote>
            <cite>&mdash; Property Manager</cite>
          </div>
        </div>

        <div className="trep-gallery">
          <h3 className="trep-gallery-title">Portfolio</h3>
          <div className="trep-gallery-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trep-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
