import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingWebsite(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-website";
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
        .tmwb-wrap { padding: 52px 5vw 64px; background: linear-gradient(135deg, #eef2ff, #e0f2fe); font-family: Inter, sans-serif; min-height: 600px; color: #1e1b4b; }
        .tmwb-header { text-align: center; padding-bottom: 36px; border-bottom: 2px solid rgba(79,70,229,.12); }
        .tmwb-header h2 { margin: 0 0 8px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.04em; }
        .tmwb-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #4f46e5; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        .tmwb-tagline { font-size: 15px; color: #4338ca; margin: 0 0 10px; }
        .tmwb-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tmwb-pill { padding: 5px 16px; background: rgba(79,70,229,.1); color: #4f46e5; border-radius: 18px; font-size: 12px; font-weight: 600; }
        .tmwb-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 44px; }
        .tmwb-hero-text h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin: 0 0 14px; }
        .tmwb-hero-text p { font-size: 14px; line-height: 1.75; color: #3730a3; margin: 0 0 20px; }
        .tmwb-stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .tmwb-stat { flex: 1; padding: 14px; background: rgba(255,255,255,.7); border-radius: 18px; text-align: center; }
        .tmwb-stat b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #4f46e5; }
        .tmwb-stat span { font-size: 11px; color: #4338ca; }
        .tmwb-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 18px; background: #4f46e5; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform .25s, opacity .25s; }
        .tmwb-cta:hover { transform: translateY(-2px); opacity: .9; }
        .tmwb-cta-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #4f46e5; border-radius: 18px; background: transparent; color: #4f46e5; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; margin-left: 12px; transition: transform .25s; }
        .tmwb-cta-sec:hover { transform: translateY(-2px); }
        .tmwb-hero-img { border-radius: 18px; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
        .tmwb-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmwb-hero-img:hover img { transform: scale(1.04); }
        .tmwb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 44px; }
        .tmwb-panel { background: rgba(255,255,255,.65); border-radius: 18px; padding: 32px 28px; }
        .tmwb-panel h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 12px; }
        .tmwb-panel p { font-size: 13px; line-height: 1.7; color: #3730a3; margin: 0; }
        .tmwb-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 28px; }
        .tmwb-proof { background: rgba(255,255,255,.65); border-radius: 18px; padding: 32px 28px; }
        .tmwb-proof h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 10px; }
        .tmwb-proof p { font-size: 13px; line-height: 1.7; color: #3730a3; margin: 0; }
        .tmwb-accent-cta { background: #4f46e5; border-radius: 18px; padding: 32px 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .tmwb-accent-cta h4 { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 20px; margin: 0 0 16px; }
        .tmwb-accent-cta button { min-height: 44px; padding: 0 28px; border: 2px solid #fff; border-radius: 18px; background: transparent; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .25s, color .25s; }
        .tmwb-accent-cta button:hover { background: #fff; color: #4f46e5; }
        .tmwb-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; }
        .tmwb-gallery-item { aspect-ratio: 1; border-radius: 18px; overflow: hidden; cursor: pointer; }
        .tmwb-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmwb-gallery-item:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .tmwb-hero { grid-template-columns: 1fr; }
          .tmwb-grid { grid-template-columns: 1fr; }
          .tmwb-lower { grid-template-columns: 1fr; }
          .tmwb-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmwb-wrap { padding: 32px 4vw 40px; }
          .tmwb-header h2 { font-size: 24px; }
          .tmwb-stats { flex-direction: column; }
          .tmwb-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
      <section className="tmwb-wrap">
        <header className="tmwb-header">
          <h2>
            {name}
            {verified && <span className="tmwb-verified" title="Verified">&#10003;</span>}
          </h2>
          <p className="tmwb-tagline">{tagline}</p>
          <div className="tmwb-pills">
            {specialties.map((s) => <span key={s} className="tmwb-pill">{s}</span>)}
          </div>
        </header>

        <div className="tmwb-hero">
          <div className="tmwb-hero-text">
            <h3>{tagline}</h3>
            <p>{bio}</p>
            <div className="tmwb-stats">
              <div className="tmwb-stat"><b>150+</b><span>Sites Launched</span></div>
              <div className="tmwb-stat"><b>99.9%</b><span>Uptime</span></div>
              <div className="tmwb-stat"><b>3.2s</b><span>Avg Load</span></div>
            </div>
            <button className="tmwb-cta" onClick={onHire}>Hire Me</button>
            <button className="tmwb-cta-sec">View Work</button>
          </div>
          {portfolio?.[0] && (
            <div className="tmwb-hero-img" onClick={() => onPhotoClick(0)}>
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tmwb-grid">
          <div className="tmwb-panel">
            <h4>Services &amp; Specialties</h4>
            <p>{specialties.join(" · ")}</p>
          </div>
          <div className="tmwb-panel">
            <h4>Details</h4>
            <p>{serviceArea}{priceLabel && <><br /><b>{priceLabel}</b></>}</p>
          </div>
        </div>

        <div className="tmwb-lower">
          <div className="tmwb-proof">
            <h4>Portfolio Highlights</h4>
            <p>Custom-designed, high-converting websites built with modern frameworks, pixel-perfect responsiveness, and blazing-fast performance.</p>
          </div>
          <div className="tmwb-accent-cta">
            <h4>Need a stunning website?</h4>
            <button onClick={onHire}>Let&apos;s Talk</button>
          </div>
        </div>

        <div className="tmwb-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tmwb-gallery-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
