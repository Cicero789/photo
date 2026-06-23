import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingAds(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-ads";
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

  const metrics = [
    { value: `${portfolio.length}+`, label: "Campaigns" },
    { value: "10x", label: "ROI Avg" },
    { value: "48h", label: "Delivery" },
  ];

  return (
    <>
      <style>{`
        .tmad-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #020617 0%, #450a0a 100%); font-family: 'Inter', sans-serif; color: #e2e8f0; min-height: 600px; }
        .tmad-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(239,68,68,.15); }
        .tmad-nav-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; color: #f8fafc; }
        .tmad-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #ef4444; color: white; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmad-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmad-pill { padding: 4px 14px; border-radius: 999px; background: rgba(239,68,68,.12); color: #ef4444; font-size: 12px; font-weight: 500; border: 1px solid rgba(239,68,68,.2); }
        .tmad-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmad-hero-left h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; margin: 0 0 8px; letter-spacing: -0.03em; line-height: 1.1; color: #f8fafc; }
        .tmad-hero-left .tmad-tagline { color: #94a3b8; font-size: 15px; margin: 0 0 20px; }
        .tmad-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmad-hero-bio { color: #94a3b8; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmad-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmad-metric-card { background: rgba(255,255,255,.08); border-radius: 14px; padding: 16px 22px; text-align: center; flex: 1; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmad-metric-card strong { font-family: 'Space Grotesk', sans-serif; font-size: 22px; color: #ef4444; display: block; }
        .tmad-metric-card span { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; }
        .tmad-btns { display: flex; gap: 12px; }
        .tmad-btn-primary { padding: 12px 28px; border: none; border-radius: 8px; background: #ef4444; color: white; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmad-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239,68,68,.3); }
        .tmad-btn-secondary { padding: 12px 28px; border: 1px solid #ef4444; border-radius: 8px; background: transparent; color: #ef4444; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmad-btn-secondary:hover { background: rgba(239,68,68,.08); }
        .tmad-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmad-hero-thumb { border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .tmad-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmad-hero-thumb:hover img { transform: scale(1.05); }
        .tmad-section { padding: 0 5vw 40px; }
        .tmad-section-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; color: #f8fafc; }
        .tmad-grid-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        .tmad-services { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmad-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.06); font-size: 14px; }
        .tmad-service-item:last-child { border-bottom: none; }
        .tmad-service-dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; flex-shrink: 0; }
        .tmad-info-card { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmad-info-card h4 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; color: #f8fafc; }
        .tmad-info-card p { margin: 0 0 12px; color: #94a3b8; font-size: 14px; line-height: 1.7; }
        .tmad-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmad-case { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmad-case h4 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 8px; font-size: 16px; color: #f8fafc; }
        .tmad-case p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
        .tmad-cta-box { background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 14px; padding: 32px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmad-cta-box h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin: 0 0 8px; }
        .tmad-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .9; }
        .tmad-cta-btn { padding: 12px 28px; border: none; border-radius: 8px; background: #020617; color: #ef4444; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmad-cta-btn:hover { transform: translateY(-2px); }
        .tmad-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmad-gallery-item { border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .tmad-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmad-gallery-item:hover img { transform: scale(1.05); }
        .tmad-price { margin-top: 16px; font-weight: 600; color: #ef4444; font-size: 15px; }
        .tmad-area { color: #64748b; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmad-hero { grid-template-columns: 1fr; }
          .tmad-grid-main { grid-template-columns: 1fr; }
          .tmad-lower { grid-template-columns: 1fr; }
          .tmad-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmad-hero { padding: 32px 5vw 24px; }
          .tmad-metrics { flex-direction: column; }
          .tmad-btns { flex-direction: column; }
          .tmad-hero-right { grid-template-columns: 1fr; }
          .tmad-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmad-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmad-wrap">
        <nav className="tmad-nav">
          <span className="tmad-nav-name">
            {name}
            {verified && <span className="tmad-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tmad-nav-pills">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="tmad-pill">{s}</span>
            ))}
          </div>
        </nav>

        <div className="tmad-hero">
          <div className="tmad-hero-left">
            <h1>{name}</h1>
            <p className="tmad-tagline">{tagline}</p>
            <div className="tmad-hero-pills">
              {specialties.map((s) => (
                <span key={s} className="tmad-pill">{s}</span>
              ))}
            </div>
            {bio && <p className="tmad-hero-bio">{bio}</p>}
            <div className="tmad-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="tmad-metric-card">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="tmad-btns">
              <button className="tmad-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tmad-btn-secondary" onClick={() => document.querySelector(".tmad-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
            </div>
          </div>
          <div className="tmad-hero-right">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="tmad-hero-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tmad-section">
          <h3 className="tmad-section-title">Services</h3>
          <div className="tmad-grid-main">
            <div className="tmad-services">
              {specialties.map((s) => (
                <div key={s} className="tmad-service-item">
                  <span className="tmad-service-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tmad-info-card">
              <h4>About</h4>
              {bio && <p>{bio}</p>}
              <p style={{ color: "#475569", fontSize: 12 }}>{serviceArea}</p>
            </div>
          </div>

          <div className="tmad-lower">
            <div className="tmad-case">
              <h4>Ad Performance</h4>
              <p>Across {portfolio.length} campaigns in {specialties.slice(0, 2).join(" and ")}, I deliver visuals that convert clicks into customers.</p>
            </div>
            <div className="tmad-cta-box">
              <h3>Ads that convert</h3>
              <p>High-impact photography built for paid media and performance.</p>
              <button className="tmad-cta-btn" onClick={onHire}>Get Started</button>
            </div>
          </div>

          <h3 className="tmad-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
          <div className="tmad-gallery">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="tmad-gallery-item" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
          {priceLabel && <div className="tmad-price">{priceLabel}</div>}
          <div className="tmad-area">{serviceArea}</div>
        </div>
      </section>
    </>
  );
}