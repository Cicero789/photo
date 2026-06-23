import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingSEO(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-seo";
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
    { value: `${portfolio.length}`, label: "Portfolio Items" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "#1", label: "Local Ranking" },
  ];

  return (
    <>
      <style>{`
        .tmse-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #f8fafc 0%, #dbeafe 100%); font-family: 'Inter', sans-serif; color: #0f172a; min-height: 600px; position: relative; }
        .tmse-wrap::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(37,99,235,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.05) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .tmse-inner { position: relative; z-index: 1; }
        .tmse-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(37,99,235,.1); }
        .tmse-nav-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; }
        .tmse-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #2563eb; color: white; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmse-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmse-pill { padding: 4px 14px; border-radius: 999px; background: rgba(37,99,235,.08); color: #2563eb; font-size: 12px; font-weight: 500; }
        .tmse-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmse-hero-left h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; margin: 0 0 8px; letter-spacing: -0.03em; line-height: 1.1; }
        .tmse-hero-left .tmse-tagline { color: #64748b; font-size: 15px; margin: 0 0 20px; }
        .tmse-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmse-hero-bio { color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmse-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmse-metric-card { background: white; border-radius: 12px; padding: 16px 22px; box-shadow: 0 1px 8px rgba(37,99,235,.07); text-align: center; flex: 1; border: 1px solid rgba(37,99,235,.08); }
        .tmse-metric-card strong { font-family: 'Space Grotesk', sans-serif; font-size: 22px; color: #2563eb; display: block; }
        .tmse-metric-card span { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: .08em; }
        .tmse-btns { display: flex; gap: 12px; }
        .tmse-btn-primary { padding: 12px 28px; border: none; border-radius: 8px; background: #2563eb; color: white; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmse-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,99,235,.25); }
        .tmse-btn-secondary { padding: 12px 28px; border: 2px solid #2563eb; border-radius: 8px; background: transparent; color: #2563eb; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmse-btn-secondary:hover { background: rgba(37,99,235,.05); }
        .tmse-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmse-hero-thumb { border-radius: 12px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid rgba(37,99,235,.08); }
        .tmse-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmse-hero-thumb:hover img { transform: scale(1.05); }
        .tmse-section { padding: 0 5vw 40px; }
        .tmse-section-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; }
        .tmse-grid-main { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .tmse-services { background: white; border-radius: 12px; padding: 28px; box-shadow: 0 1px 8px rgba(0,0,0,.04); border: 1px solid #e2e8f0; }
        .tmse-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .tmse-service-item:last-child { border-bottom: none; }
        .tmse-service-num { width: 28px; height: 28px; border-radius: 6px; background: rgba(37,99,235,.08); color: #2563eb; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 12px; flex-shrink: 0; }
        .tmse-info-card { background: white; border-radius: 12px; padding: 28px; box-shadow: 0 1px 8px rgba(0,0,0,.04); border: 1px solid #e2e8f0; }
        .tmse-info-card h4 { margin: 0 0 12px; font-family: 'Space Grotesk', sans-serif; }
        .tmse-info-card p { margin: 0 0 12px; color: #475569; font-size: 14px; line-height: 1.7; }
        .tmse-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmse-case { background: white; border-radius: 12px; padding: 28px; box-shadow: 0 1px 8px rgba(0,0,0,.04); border: 1px solid #e2e8f0; }
        .tmse-case h4 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 8px; font-size: 16px; }
        .tmse-case p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
        .tmse-cta-box { background: #2563eb; border-radius: 12px; padding: 32px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmse-cta-box h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin: 0 0 8px; }
        .tmse-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .9; }
        .tmse-cta-btn { padding: 12px 28px; border: none; border-radius: 8px; background: white; color: #2563eb; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmse-cta-btn:hover { transform: translateY(-2px); }
        .tmse-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmse-gallery-item { border-radius: 10px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid #e2e8f0; }
        .tmse-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmse-gallery-item:hover img { transform: scale(1.05); }
        .tmse-price { margin-top: 16px; font-weight: 600; color: #2563eb; font-size: 15px; }
        .tmse-area { color: #64748b; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmse-hero { grid-template-columns: 1fr; }
          .tmse-grid-main { grid-template-columns: 1fr; }
          .tmse-lower { grid-template-columns: 1fr; }
          .tmse-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmse-hero { padding: 32px 5vw 24px; }
          .tmse-metrics { flex-direction: column; }
          .tmse-btns { flex-direction: column; }
          .tmse-hero-right { grid-template-columns: 1fr; }
          .tmse-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmse-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmse-wrap">
        <div className="tmse-inner">
          <nav className="tmse-nav">
            <span className="tmse-nav-name">
              {name}
              {verified && <span className="tmse-verified" title="Verified">&#10003;</span>}
            </span>
            <div className="tmse-nav-pills">
              {specialties.slice(0, 3).map((s) => (
                <span key={s} className="tmse-pill">{s}</span>
              ))}
            </div>
          </nav>

          <div className="tmse-hero">
            <div className="tmse-hero-left">
              <h1>{name}</h1>
              <p className="tmse-tagline">{tagline}</p>
              <div className="tmse-hero-pills">
                {specialties.map((s) => (
                  <span key={s} className="tmse-pill">{s}</span>
                ))}
              </div>
              {bio && <p className="tmse-hero-bio">{bio}</p>}
              <div className="tmse-metrics">
                {metrics.map((m) => (
                  <div key={m.label} className="tmse-metric-card">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="tmse-btns">
                <button className="tmse-btn-primary" onClick={onHire}>Hire Me</button>
                <button className="tmse-btn-secondary" onClick={() => document.querySelector(".tmse-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
              </div>
            </div>
            <div className="tmse-hero-right">
              {portfolio.slice(0, 4).map((photo, i) => (
                <div key={photo.id} className="tmse-hero-thumb" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="tmse-section">
            <h3 className="tmse-section-title">Services</h3>
            <div className="tmse-grid-main">
              <div className="tmse-services">
                {specialties.map((s, idx) => (
                  <div key={s} className="tmse-service-item">
                    <span className="tmse-service-num">{idx + 1}</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="tmse-info-card">
                <h4>About</h4>
                {bio && <p>{bio}</p>}
                <p style={{ color: "#94a3b8", fontSize: 12 }}>{serviceArea}</p>
              </div>
            </div>

            <div className="tmse-lower">
              <div className="tmse-case">
                <h4>Case Study</h4>
                <p>With {portfolio.length} completed projects in {specialties.slice(0, 2).join(" and ")}, I deliver results that drive engagement and visibility for every client.</p>
              </div>
              <div className="tmse-cta-box">
                <h3>Boost your brand</h3>
                <p>Professional photography that ranks and converts.</p>
                <button className="tmse-cta-btn" onClick={onHire}>Get Started</button>
              </div>
            </div>

            <h3 className="tmse-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
            <div className="tmse-gallery">
              {portfolio.map((photo, i) => (
                <div key={photo.id} className="tmse-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>
            {priceLabel && <div className="tmse-price">{priceLabel}</div>}
            <div className="tmse-area">{serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
