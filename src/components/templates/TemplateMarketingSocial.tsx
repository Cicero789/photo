import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingSocial(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-social";
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
    { value: `${portfolio.length}+`, label: "Projects" },
    { value: "5.0", label: "Rating" },
    { value: "24h", label: "Response" },
  ];

  return (
    <>
      <style>{`
        .tmks-wrap { padding: 0; margin: 0; background: radial-gradient(ellipse at 30% 0%, #fdf2f8 0%, #dbeafe 100%); font-family: 'Inter', sans-serif; color: #1e293b; min-height: 600px; }
        .tmks-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(219,39,119,.12); }
        .tmks-nav-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; }
        .tmks-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #db2777; color: white; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmks-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmks-pill { padding: 4px 14px; border-radius: 999px; background: rgba(219,39,119,.10); color: #db2777; font-size: 12px; font-weight: 500; }
        .tmks-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmks-hero-left h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; margin: 0 0 8px; letter-spacing: -0.03em; line-height: 1.1; }
        .tmks-hero-left .tmks-tagline { color: #64748b; font-size: 15px; margin: 0 0 20px; }
        .tmks-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmks-hero-bio { color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmks-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmks-metric-card { background: white; border-radius: 16px; padding: 16px 22px; box-shadow: 0 2px 12px rgba(219,39,119,.08); text-align: center; flex: 1; }
        .tmks-metric-card strong { font-family: 'Space Grotesk', sans-serif; font-size: 22px; color: #db2777; display: block; }
        .tmks-metric-card span { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: .08em; }
        .tmks-btns { display: flex; gap: 12px; }
        .tmks-btn-primary { padding: 12px 28px; border: none; border-radius: 999px; background: #db2777; color: white; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmks-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(219,39,119,.3); }
        .tmks-btn-secondary { padding: 12px 28px; border: 2px solid #db2777; border-radius: 999px; background: transparent; color: #db2777; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmks-btn-secondary:hover { background: rgba(219,39,119,.06); }
        .tmks-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmks-hero-thumb { border-radius: 18px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmks-hero-thumb:first-child { border-radius: 40px 18px 18px 18px; }
        .tmks-hero-thumb:nth-child(2) { border-radius: 18px 40px 18px 18px; }
        .tmks-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmks-hero-thumb:hover img { transform: scale(1.05); }
        .tmks-section { padding: 0 5vw 40px; }
        .tmks-section-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; }
        .tmks-grid-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        .tmks-services { background: white; border-radius: 20px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmks-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f1f5f9; }
        .tmks-service-item:last-child { border-bottom: none; }
        .tmks-service-dot { width: 8px; height: 8px; border-radius: 50%; background: #db2777; flex-shrink: 0; }
        .tmks-info-card { background: white; border-radius: 20px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmks-info-card p { margin: 0 0 12px; color: #475569; font-size: 14px; line-height: 1.7; }
        .tmks-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmks-case { background: white; border-radius: 20px; padding: 28px; box-shadow: 0 2px 12px rgba(0,0,0,.04); }
        .tmks-case h4 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 8px; font-size: 16px; }
        .tmks-case p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
        .tmks-cta-box { background: linear-gradient(135deg, #db2777, #9333ea); border-radius: 20px; padding: 32px; color: white; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmks-cta-box h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin: 0 0 8px; }
        .tmks-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .9; }
        .tmks-cta-btn { padding: 12px 28px; border: none; border-radius: 999px; background: white; color: #db2777; font-weight: 600; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmks-cta-btn:hover { transform: translateY(-2px); }
        .tmks-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmks-gallery-item { border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; }
        .tmks-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmks-gallery-item:hover img { transform: scale(1.05); }
        .tmks-price { margin-top: 16px; font-weight: 600; color: #db2777; font-size: 15px; }
        .tmks-area { color: #64748b; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmks-hero { grid-template-columns: 1fr; }
          .tmks-grid-main { grid-template-columns: 1fr; }
          .tmks-lower { grid-template-columns: 1fr; }
          .tmks-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmks-hero { padding: 32px 5vw 24px; }
          .tmks-metrics { flex-direction: column; }
          .tmks-btns { flex-direction: column; }
          .tmks-hero-right { grid-template-columns: 1fr; }
          .tmks-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmks-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmks-wrap">
        <nav className="tmks-nav">
          <span className="tmks-nav-name">
            {name}
            {verified && <span className="tmks-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tmks-nav-pills">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="tmks-pill">{s}</span>
            ))}
          </div>
        </nav>

        <div className="tmks-hero">
          <div className="tmks-hero-left">
            <h1>{name}</h1>
            <p className="tmks-tagline">{tagline}</p>
            <div className="tmks-hero-pills">
              {specialties.map((s) => (
                <span key={s} className="tmks-pill">{s}</span>
              ))}
            </div>
            {bio && <p className="tmks-hero-bio">{bio}</p>}
            <div className="tmks-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="tmks-metric-card">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="tmks-btns">
              <button className="tmks-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tmks-btn-secondary" onClick={() => document.querySelector(".tmks-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
            </div>
          </div>
          <div className="tmks-hero-right">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="tmks-hero-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tmks-section">
          <h3 className="tmks-section-title">What I Offer</h3>
          <div className="tmks-grid-main">
            <div className="tmks-services">
              {specialties.map((s) => (
                <div key={s} className="tmks-service-item">
                  <span className="tmks-service-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tmks-info-card">
              <h4 style={{ margin: "0 0 12px", fontFamily: "'Space Grotesk', sans-serif" }}>About</h4>
              {bio && <p>{bio}</p>}
              <p style={{ color: "#94a3b8", fontSize: 12 }}>{serviceArea}</p>
            </div>
          </div>

          <div className="tmks-lower">
            <div className="tmks-case">
              <h4>Featured Work</h4>
              <p>Browse {portfolio.length} curated photos showcasing my best work across {specialties.slice(0, 2).join(" and ")}.</p>
            </div>
            <div className="tmks-cta-box">
              <h3>Ready to create?</h3>
              <p>Let&apos;s bring your vision to life with a custom shoot.</p>
              <button className="tmks-cta-btn" onClick={onHire}>Get Started</button>
            </div>
          </div>

          <h3 className="tmks-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
          <div className="tmks-gallery">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="tmks-gallery-item" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
          {priceLabel && <div className="tmks-price">{priceLabel}</div>}
          <div className="tmks-area">{serviceArea}</div>
        </div>
      </section>
    </>
  );
}
