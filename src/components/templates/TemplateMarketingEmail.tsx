import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingEmail(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-email";
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
        .tmem-wrap { padding: 52px 5vw 64px; background: linear-gradient(135deg, #fdf2f8, #fae8ff); font-family: Inter, sans-serif; min-height: 600px; color: #3b0764; }
        .tmem-header { text-align: center; padding-bottom: 36px; border-bottom: 2px solid rgba(162,28,175,.15); }
        .tmem-header h2 { margin: 0 0 8px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.04em; }
        .tmem-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #a21caf; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        .tmem-tagline { font-size: 15px; color: #86198f; margin: 0 0 10px; }
        .tmem-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tmem-pill { padding: 5px 16px; background: rgba(162,28,175,.1); color: #a21caf; border-radius: 999px 999px 40px 40px; font-size: 12px; font-weight: 600; }
        .tmem-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 44px; }
        .tmem-hero-text h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin: 0 0 14px; }
        .tmem-hero-text p { font-size: 14px; line-height: 1.75; color: #6b21a8; margin: 0 0 20px; }
        .tmem-stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .tmem-stat { flex: 1; padding: 14px; background: rgba(255,255,255,.7); border-radius: 999px 999px 40px 40px; text-align: center; }
        .tmem-stat b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #a21caf; }
        .tmem-stat span { font-size: 11px; color: #86198f; }
        .tmem-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 999px 999px 40px 40px; background: #a21caf; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform .25s, opacity .25s; }
        .tmem-cta:hover { transform: translateY(-2px); opacity: .9; }
        .tmem-cta-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #a21caf; border-radius: 999px 999px 40px 40px; background: transparent; color: #a21caf; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; margin-left: 12px; transition: transform .25s; }
        .tmem-cta-sec:hover { transform: translateY(-2px); }
        .tmem-hero-img { border-radius: 999px 999px 40px 40px; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
        .tmem-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmem-hero-img:hover img { transform: scale(1.04); }
        .tmem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 44px; }
        .tmem-panel { background: rgba(255,255,255,.65); border-radius: 999px 999px 40px 40px; padding: 32px 28px; }
        .tmem-panel h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 12px; }
        .tmem-panel p { font-size: 13px; line-height: 1.7; color: #6b21a8; margin: 0; }
        .tmem-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 28px; }
        .tmem-proof { background: rgba(255,255,255,.65); border-radius: 999px 999px 40px 40px; padding: 32px 28px; }
        .tmem-proof h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 10px; }
        .tmem-proof p { font-size: 13px; line-height: 1.7; color: #6b21a8; margin: 0; }
        .tmem-accent-cta { background: #a21caf; border-radius: 999px 999px 40px 40px; padding: 32px 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .tmem-accent-cta h4 { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 20px; margin: 0 0 16px; }
        .tmem-accent-cta button { min-height: 44px; padding: 0 28px; border: 2px solid #fff; border-radius: 999px 999px 40px 40px; background: transparent; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .25s, color .25s; }
        .tmem-accent-cta button:hover { background: #fff; color: #a21caf; }
        .tmem-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; }
        .tmem-gallery-item { aspect-ratio: 1; border-radius: 999px 999px 40px 40px; overflow: hidden; cursor: pointer; }
        .tmem-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmem-gallery-item:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .tmem-hero { grid-template-columns: 1fr; }
          .tmem-grid { grid-template-columns: 1fr; }
          .tmem-lower { grid-template-columns: 1fr; }
          .tmem-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmem-wrap { padding: 32px 4vw 40px; }
          .tmem-header h2 { font-size: 24px; }
          .tmem-stats { flex-direction: column; }
          .tmem-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
      <section className="tmem-wrap">
        <header className="tmem-header">
          <h2>
            {name}
            {verified && <span className="tmem-verified" title="Verified">&#10003;</span>}
          </h2>
          <p className="tmem-tagline">{tagline}</p>
          <div className="tmem-pills">
            {specialties.map((s) => <span key={s} className="tmem-pill">{s}</span>)}
          </div>
        </header>

        <div className="tmem-hero">
          <div className="tmem-hero-text">
            <h3>{tagline}</h3>
            <p>{bio}</p>
            <div className="tmem-stats">
              <div className="tmem-stat"><b>98%</b><span>Open Rate</span></div>
              <div className="tmem-stat"><b>4.2x</b><span>ROI Avg</span></div>
              <div className="tmem-stat"><b>500+</b><span>Campaigns</span></div>
            </div>
            <button className="tmem-cta" onClick={onHire}>Hire Me</button>
            <button className="tmem-cta-sec">View Work</button>
          </div>
          {portfolio?.[0] && (
            <div className="tmem-hero-img" onClick={() => onPhotoClick(0)}>
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tmem-grid">
          <div className="tmem-panel">
            <h4>Services &amp; Specialties</h4>
            <p>{specialties.join(" · ")}</p>
          </div>
          <div className="tmem-panel">
            <h4>Details</h4>
            <p>{serviceArea}{priceLabel && <><br /><b>{priceLabel}</b></>}</p>
          </div>
        </div>

        <div className="tmem-lower">
          <div className="tmem-proof">
            <h4>Proven Results</h4>
            <p>Delivering high-impact email marketing campaigns with measurable results across open rates, click-throughs, and conversions.</p>
          </div>
          <div className="tmem-accent-cta">
            <h4>Ready to boost your email game?</h4>
            <button onClick={onHire}>Get Started</button>
          </div>
        </div>

        <div className="tmem-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tmem-gallery-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
