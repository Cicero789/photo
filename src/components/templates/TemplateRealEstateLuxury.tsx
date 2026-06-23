import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRealEstateLuxury(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-realestate-luxury";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
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
        .trel-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #07111f 0%, #111827 100%); font-family: Inter, sans-serif; min-height: 100vh; color: #e2e8f0; }
        .trel-nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 5vw; border-bottom: 1px solid rgba(255,255,255,.08); }
        .trel-brand { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; display: flex; align-items: center; gap: 10px; color: #d6a74a; }
        .trel-brand-icon { width: 36px; height: 36px; border-radius: 44px; background: #d6a74a; display: flex; align-items: center; justify-content: center; color: #07111f; font-size: 18px; font-weight: 800; }
        .trel-nav-links { display: flex; gap: 26px; font-size: 14px; font-weight: 500; color: rgba(255,255,255,.6); }
        .trel-nav-links span { cursor: pointer; transition: color .2s; }
        .trel-nav-links span:hover { color: #d6a74a; }
        .trel-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 44px; padding: 56px 5vw 44px; align-items: start; }
        .trel-hero-copy { display: flex; flex-direction: column; gap: 20px; }
        .trel-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .trel-pill { padding: 5px 16px; border-radius: 44px; background: rgba(214,167,74,.15); border: 1px solid rgba(214,167,74,.3); color: #d6a74a; font-size: 12px; font-weight: 600; }
        .trel-hero h2 { margin: 0; font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 50px); font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.15; }
        .trel-hero-bio { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,.6); margin: 0; }
        .trel-listing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 6px; }
        .trel-listing-card { background: rgba(255,255,255,.08); border-radius: 44px; padding: 20px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .trel-listing-card b { font-family: 'Playfair Display', serif; font-size: 20px; color: #d6a74a; }
        .trel-listing-card span { display: block; font-size: 11px; color: rgba(255,255,255,.45); margin-top: 4px; }
        .trel-cta-row { display: flex; gap: 14px; margin-top: 8px; }
        .trel-hire { padding: 13px 30px; border: none; border-radius: 44px; background: #d6a74a; color: #07111f; font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform .25s, background .25s; }
        .trel-hire:hover { background: #c4963f; transform: translateY(-2px); }
        .trel-secondary { padding: 13px 30px; border: 1.5px solid #d6a74a; border-radius: 44px; background: transparent; color: #d6a74a; font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background .25s; }
        .trel-secondary:hover { background: rgba(214,167,74,.12); }
        .trel-hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .trel-hero-visual .trel-thumb { aspect-ratio: 4/3; border-radius: 44px; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .trel-hero-visual .trel-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s ease; }
        .trel-hero-visual .trel-thumb:hover img { transform: scale(1.05); }
        .trel-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding: 0 5vw 32px; }
        .trel-panel { background: rgba(255,255,255,.08); border-radius: 44px; padding: 30px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .trel-panel-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 17px; margin: 0 0 16px; color: #fff; }
        .trel-cred-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .trel-cred-badge { padding: 6px 16px; border-radius: 44px; background: rgba(214,167,74,.1); border: 1px solid rgba(214,167,74,.25); font-size: 13px; font-weight: 500; color: #d6a74a; }
        .trel-area-text { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,.6); }
        .trel-lower-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; padding: 0 5vw 40px; }
        .trel-contact-panel { background: rgba(255,255,255,.08); border-radius: 44px; padding: 30px; border: 1px solid rgba(255,255,255,.06); }
        .trel-contact-panel p { font-size: 14px; line-height: 1.75; color: rgba(255,255,255,.6); margin: 0 0 10px; }
        .trel-quote-box { background: linear-gradient(135deg, #d6a74a 0%, #b8902e 100%); border-radius: 44px; padding: 34px; color: #07111f; display: flex; flex-direction: column; justify-content: center; }
        .trel-quote-box blockquote { margin: 0; font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; line-height: 1.55; font-style: italic; }
        .trel-quote-box cite { margin-top: 14px; font-size: 13px; font-style: normal; opacity: .7; }
        .trel-gallery { padding: 0 5vw 64px; }
        .trel-gallery-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; margin: 0 0 20px; color: #fff; }
        .trel-gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        .trel-gallery-grid .trel-photo { aspect-ratio: 1; border-radius: 44px; overflow: hidden; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .trel-gallery-grid .trel-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s ease; }
        .trel-gallery-grid .trel-photo:hover img { transform: scale(1.05); }
        .trel-verified { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; background: #d6a74a; color: #07111f; font-size: 14px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .trel-hero { grid-template-columns: 1fr; }
          .trel-main-grid { grid-template-columns: 1fr; }
          .trel-lower-grid { grid-template-columns: 1fr; }
          .trel-gallery-grid { grid-template-columns: repeat(2, 1fr); }
          .trel-listing-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .trel-nav { flex-direction: column; gap: 12px; }
          .trel-listing-cards { grid-template-columns: 1fr; }
          .trel-gallery-grid { gap: 6px; }
          .trel-cta-row { flex-direction: column; }
          .trel-hero-visual { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="trel-wrap">
        <nav className="trel-nav">
          <div className="trel-brand">
            <div className="trel-brand-icon">&#9830;</div>
            {name}
          </div>
          <div className="trel-nav-links">
            <span>Listings</span><span>Service Area</span><span>Credentials</span><span>Contact</span>
          </div>
        </nav>

        <div className="trel-hero">
          <div className="trel-hero-copy">
            <div className="trel-pills">
              {specialties.map((s, i) => <span key={i} className="trel-pill">{s}</span>)}
            </div>
            <h2>
              {tagline}
              {verified && <span className="trel-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="trel-hero-bio">{bio}</p>
            <div className="trel-listing-cards">
              <div className="trel-listing-card"><b>{priceLabel || "Inquire"}</b><span>Per Session</span></div>
              <div className="trel-listing-card"><b>{specialties.length}</b><span>Specialties</span></div>
              <div className="trel-listing-card"><b>{portfolio.length}</b><span>Portfolio Shots</span></div>
            </div>
            <div className="trel-cta-row">
              <button className="trel-hire" onClick={onHire}>Hire Me</button>
              <button className="trel-secondary">View Portfolio</button>
            </div>
          </div>
          <div className="trel-hero-visual">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="trel-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="trel-main-grid">
          <div className="trel-panel">
            <h3 className="trel-panel-title">Credentials</h3>
            <div className="trel-cred-list">
              {specialties.map((s, i) => <span key={i} className="trel-cred-badge">{s}</span>)}
            </div>
          </div>
          <div className="trel-panel">
            <h3 className="trel-panel-title">Service Area</h3>
            <p className="trel-area-text">{serviceArea}</p>
          </div>
        </div>

        <div className="trel-lower-grid">
          <div className="trel-contact-panel">
            <h3 className="trel-panel-title">About &amp; Pricing</h3>
            <p>{bio}</p>
            {priceLabel && <p><b>{priceLabel}</b></p>}
          </div>
          <div className="trel-quote-box">
            <blockquote>&ldquo;Unparalleled attention to detail and a truly luxurious experience.&rdquo;</blockquote>
            <cite>&mdash; Distinguished Client</cite>
          </div>
        </div>

        <div className="trel-gallery">
          <h3 className="trel-gallery-title">Portfolio</h3>
          <div className="trel-gallery-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="trel-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
