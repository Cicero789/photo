import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingDigital(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-digital";
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

  const metrics = [
    { value: `${portfolio.length}+`, label: "Deliverables" },
    { value: "98%", label: "On-Time" },
    { value: "4.9", label: "Avg Rating" },
  ];

  return (
    <>
      <style>{`
        .tmdi-wrap { padding: 0; margin: 0; background: linear-gradient(160deg, #ecfeff 0%, #f0fdf4 100%); font-family: 'Inter', sans-serif; color: #0f172a; min-height: 600px; }
        .tmdi-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(8,145,178,.1); }
        .tmdi-nav-name { font-weight: 800; font-size: 18px; }
        .tmdi-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #0891b2; color: white; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmdi-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmdi-pill { padding: 4px 14px; border-radius: 34px; background: rgba(8,145,178,.08); color: #0891b2; font-size: 12px; font-weight: 600; }
        .tmdi-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmdi-hero-left h1 { font-size: clamp(28px, 4vw, 48px); font-weight: 800; margin: 0 0 8px; letter-spacing: -0.03em; line-height: 1.1; }
        .tmdi-hero-left .tmdi-tagline { color: #64748b; font-size: 15px; margin: 0 0 20px; }
        .tmdi-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmdi-hero-bio { color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmdi-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmdi-metric-card { background: white; border-radius: 34px; padding: 16px 22px; box-shadow: 0 2px 12px rgba(8,145,178,.08); text-align: center; flex: 1; }
        .tmdi-metric-card strong { font-size: 22px; font-weight: 800; color: #0891b2; display: block; }
        .tmdi-metric-card span { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: .08em; }
        .tmdi-btns { display: flex; gap: 12px; }
        .tmdi-btn-primary { padding: 12px 28px; border: none; border-radius: 34px; background: #0891b2; color: white; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmdi-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(8,145,178,.25); }
        .tmdi-btn-secondary { padding: 12px 28px; border: 2px solid #0891b2; border-radius: 34px; background: transparent; color: #0891b2; font-weight: 700; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmdi-btn-secondary:hover { background: rgba(8,145,178,.05); }
        .tmdi-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmdi-hero-thumb { border-radius: 34px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmdi-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmdi-hero-thumb:hover img { transform: scale(1.05); }
        .tmdi-section { padding: 0 5vw 40px; }
        .tmdi-section-title { font-size: 22px; font-weight: 800; margin: 0 0 20px; }
        .tmdi-grid-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        .tmdi-services { background: white; border-radius: 34px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmdi-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
        .tmdi-service-item:last-child { border-bottom: none; }
        .tmdi-service-icon { width: 32px; height: 32px; border-radius: 34px; background: rgba(8,145,178,.08); color: #0891b2; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
        .tmdi-info-card { background: white; border-radius: 34px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmdi-info-card h4 { margin: 0 0 12px; font-weight: 700; }
        .tmdi-info-card p { margin: 0 0 12px; color: #475569; font-size: 14px; line-height: 1.7; }
        .tmdi-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmdi-case { background: white; border-radius: 34px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmdi-case h4 { margin: 0 0 8px; font-size: 16px; font-weight: 700; }
        .tmdi-case p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
        .tmdi-cta-box { background: linear-gradient(135deg, #0891b2, #059669); border-radius: 34px; padding: 32px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmdi-cta-box h3 { font-size: 22px; font-weight: 800; margin: 0 0 8px; }
        .tmdi-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .9; }
        .tmdi-cta-btn { padding: 12px 28px; border: none; border-radius: 34px; background: white; color: #0891b2; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmdi-cta-btn:hover { transform: translateY(-2px); }
        .tmdi-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmdi-gallery-item { border-radius: 34px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmdi-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmdi-gallery-item:hover img { transform: scale(1.05); }
        .tmdi-price { margin-top: 16px; font-weight: 700; color: #0891b2; font-size: 15px; }
        .tmdi-area { color: #64748b; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmdi-hero { grid-template-columns: 1fr; }
          .tmdi-grid-main { grid-template-columns: 1fr; }
          .tmdi-lower { grid-template-columns: 1fr; }
          .tmdi-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmdi-hero { padding: 32px 5vw 24px; }
          .tmdi-metrics { flex-direction: column; }
          .tmdi-btns { flex-direction: column; }
          .tmdi-hero-right { grid-template-columns: 1fr; }
          .tmdi-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmdi-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmdi-wrap">
        <nav className="tmdi-nav">
          <span className="tmdi-nav-name">
            {name}
            {verified && <span className="tmdi-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tmdi-nav-pills">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="tmdi-pill">{s}</span>
            ))}
          </div>
        </nav>

        <div className="tmdi-hero">
          <div className="tmdi-hero-left">
            <h1>{name}</h1>
            <p className="tmdi-tagline">{tagline}</p>
            <div className="tmdi-hero-pills">
              {specialties.map((s) => (
                <span key={s} className="tmdi-pill">{s}</span>
              ))}
            </div>
            {bio && <p className="tmdi-hero-bio">{bio}</p>}
            <div className="tmdi-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="tmdi-metric-card">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="tmdi-btns">
              <button className="tmdi-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tmdi-btn-secondary" onClick={() => document.querySelector(".tmdi-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
            </div>
          </div>
          <div className="tmdi-hero-right">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="tmdi-hero-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tmdi-section">
          <h3 className="tmdi-section-title">Services</h3>
          <div className="tmdi-grid-main">
            <div className="tmdi-services">
              {specialties.map((s) => (
                <div key={s} className="tmdi-service-item">
                  <span className="tmdi-service-icon">&#9679;</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tmdi-info-card">
              <h4>About</h4>
              {bio && <p>{bio}</p>}
              <p style={{ color: "#94a3b8", fontSize: 12 }}>{serviceArea}</p>
            </div>
          </div>

          <div className="tmdi-lower">
            <div className="tmdi-case">
              <h4>Recent Work</h4>
              <p>Delivering {portfolio.length} high-quality digital assets across {specialties.slice(0, 2).join(" and ")} with fast turnaround and modern style.</p>
            </div>
            <div className="tmdi-cta-box">
              <h3>Go digital</h3>
              <p>Modern photography for the digital-first world.</p>
              <button className="tmdi-cta-btn" onClick={onHire}>Get Started</button>
            </div>
          </div>

          <h3 className="tmdi-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
          <div className="tmdi-gallery">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="tmdi-gallery-item" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
          {priceLabel && <div className="tmdi-price">{priceLabel}</div>}
          <div className="tmdi-area">{serviceArea}</div>
        </div>
      </section>
    </>
  );
}
