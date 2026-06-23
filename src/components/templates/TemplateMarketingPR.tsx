import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingPR(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-pr";
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

  const metrics = [
    { value: `${portfolio.length}+`, label: "Campaigns" },
    { value: "100%", label: "Satisfaction" },
    { value: "Fast", label: "Delivery" },
  ];

  return (
    <>
      <style>{`
        .tmpr-wrap { padding: 0; margin: 0; background: linear-gradient(160deg, #fff7ed 0%, #fef3c7 100%); font-family: 'Inter', sans-serif; color: #1c1917; min-height: 600px; }
        .tmpr-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(234,88,12,.1); }
        .tmpr-nav-name { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 18px; }
        .tmpr-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #ea580c; color: white; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmpr-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmpr-pill { padding: 4px 14px; border-radius: 80px 26px 80px 26px; background: rgba(234,88,12,.08); color: #ea580c; font-size: 12px; font-weight: 500; }
        .tmpr-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmpr-hero-left h1 { font-family: 'Libre Baskerville', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; margin: 0 0 8px; line-height: 1.15; }
        .tmpr-hero-left .tmpr-tagline { color: #78716c; font-size: 15px; margin: 0 0 20px; }
        .tmpr-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmpr-hero-bio { color: #57534e; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmpr-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmpr-metric-card { background: white; border-radius: 80px 26px 80px 26px; padding: 16px 22px; box-shadow: 0 2px 12px rgba(234,88,12,.07); text-align: center; flex: 1; }
        .tmpr-metric-card strong { font-family: 'Libre Baskerville', serif; font-size: 22px; color: #ea580c; display: block; }
        .tmpr-metric-card span { font-size: 11px; color: #a8a29e; text-transform: uppercase; letter-spacing: .08em; }
        .tmpr-btns { display: flex; gap: 12px; }
        .tmpr-btn-primary { padding: 12px 28px; border: none; border-radius: 80px 26px 80px 26px; background: #ea580c; color: white; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmpr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(234,88,12,.25); }
        .tmpr-btn-secondary { padding: 12px 28px; border: 2px solid #ea580c; border-radius: 80px 26px 80px 26px; background: transparent; color: #ea580c; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmpr-btn-secondary:hover { background: rgba(234,88,12,.05); }
        .tmpr-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmpr-hero-thumb { border-radius: 80px 26px 80px 26px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmpr-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmpr-hero-thumb:hover img { transform: scale(1.05); }
        .tmpr-section { padding: 0 5vw 40px; }
        .tmpr-section-title { font-family: 'Libre Baskerville', serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; }
        .tmpr-grid-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        .tmpr-services { background: white; border-radius: 80px 26px 80px 26px; padding: 28px 28px 28px 36px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmpr-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #fef3c7; font-size: 14px; }
        .tmpr-service-item:last-child { border-bottom: none; }
        .tmpr-service-dot { width: 8px; height: 8px; border-radius: 50%; background: #ea580c; flex-shrink: 0; }
        .tmpr-info-card { background: white; border-radius: 26px 80px 26px 80px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmpr-info-card h4 { margin: 0 0 12px; font-family: 'Libre Baskerville', serif; }
        .tmpr-info-card p { margin: 0 0 12px; color: #57534e; font-size: 14px; line-height: 1.7; }
        .tmpr-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmpr-case { background: white; border-radius: 80px 26px 80px 26px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmpr-case h4 { font-family: 'Libre Baskerville', serif; margin: 0 0 8px; font-size: 16px; }
        .tmpr-case p { margin: 0; color: #78716c; font-size: 13px; line-height: 1.6; }
        .tmpr-cta-box { background: linear-gradient(135deg, #ea580c, #dc2626); border-radius: 26px 80px 26px 80px; padding: 32px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmpr-cta-box h3 { font-family: 'Libre Baskerville', serif; font-size: 22px; margin: 0 0 8px; }
        .tmpr-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .9; }
        .tmpr-cta-btn { padding: 12px 28px; border: none; border-radius: 80px 26px 80px 26px; background: white; color: #ea580c; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmpr-cta-btn:hover { transform: translateY(-2px); }
        .tmpr-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmpr-gallery-item { border-radius: 80px 26px 80px 26px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmpr-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmpr-gallery-item:hover img { transform: scale(1.05); }
        .tmpr-price { margin-top: 16px; font-weight: 600; color: #ea580c; font-size: 15px; }
        .tmpr-area { color: #78716c; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmpr-hero { grid-template-columns: 1fr; }
          .tmpr-grid-main { grid-template-columns: 1fr; }
          .tmpr-lower { grid-template-columns: 1fr; }
          .tmpr-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmpr-hero { padding: 32px 5vw 24px; }
          .tmpr-metrics { flex-direction: column; }
          .tmpr-btns { flex-direction: column; }
          .tmpr-hero-right { grid-template-columns: 1fr; }
          .tmpr-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmpr-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmpr-wrap">
        <nav className="tmpr-nav">
          <span className="tmpr-nav-name">
            {name}
            {verified && <span className="tmpr-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tmpr-nav-pills">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="tmpr-pill">{s}</span>
            ))}
          </div>
        </nav>

        <div className="tmpr-hero">
          <div className="tmpr-hero-left">
            <h1>{name}</h1>
            <p className="tmpr-tagline">{tagline}</p>
            <div className="tmpr-hero-pills">
              {specialties.map((s) => (
                <span key={s} className="tmpr-pill">{s}</span>
              ))}
            </div>
            {bio && <p className="tmpr-hero-bio">{bio}</p>}
            <div className="tmpr-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="tmpr-metric-card">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="tmpr-btns">
              <button className="tmpr-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tmpr-btn-secondary" onClick={() => document.querySelector(".tmpr-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
            </div>
          </div>
          <div className="tmpr-hero-right">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="tmpr-hero-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tmpr-section">
          <h3 className="tmpr-section-title">Services</h3>
          <div className="tmpr-grid-main">
            <div className="tmpr-services">
              {specialties.map((s) => (
                <div key={s} className="tmpr-service-item">
                  <span className="tmpr-service-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tmpr-info-card">
              <h4>About</h4>
              {bio && <p>{bio}</p>}
              <p style={{ color: "#a8a29e", fontSize: 12 }}>{serviceArea}</p>
            </div>
          </div>

          <div className="tmpr-lower">
            <div className="tmpr-case">
              <h4>Press Coverage</h4>
              <p>With {portfolio.length} editorial shoots across {specialties.slice(0, 2).join(" and ")}, I create press-ready imagery that tells compelling stories.</p>
            </div>
            <div className="tmpr-cta-box">
              <h3>Make headlines</h3>
              <p>Photography that captures attention and drives coverage.</p>
              <button className="tmpr-cta-btn" onClick={onHire}>Get Started</button>
            </div>
          </div>

          <h3 className="tmpr-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
          <div className="tmpr-gallery">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="tmpr-gallery-item" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
          {priceLabel && <div className="tmpr-price">{priceLabel}</div>}
          <div className="tmpr-area">{serviceArea}</div>
        </div>
      </section>
    </>
  );
}
