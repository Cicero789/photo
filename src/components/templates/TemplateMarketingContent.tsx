import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingContent(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-content";
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

  return (
    <>
      <style>{`
        .tmco-wrap { padding: 52px 5vw 64px; background: linear-gradient(135deg, #faf7ef, #f3e8d6); font-family: Inter, sans-serif; min-height: 600px; color: #422006; }
        .tmco-header { text-align: center; padding-bottom: 36px; border-bottom: 2px solid rgba(146,64,14,.12); }
        .tmco-header h2 { margin: 0 0 8px; font-family: 'Libre Baskerville', serif; font-size: clamp(28px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.02em; }
        .tmco-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #92400e; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        .tmco-tagline { font-size: 15px; color: #92400e; margin: 0 0 10px; font-style: italic; }
        .tmco-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tmco-pill { padding: 5px 16px; background: rgba(146,64,14,.08); color: #92400e; border-radius: 26px; font-size: 12px; font-weight: 600; }
        .tmco-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 44px; }
        .tmco-hero-text h3 { font-family: 'Libre Baskerville', serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin: 0 0 14px; }
        .tmco-hero-text p { font-size: 14px; line-height: 1.8; color: #78350f; margin: 0 0 20px; }
        .tmco-stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .tmco-stat { flex: 1; padding: 14px; background: rgba(255,255,255,.6); border-radius: 26px; text-align: center; }
        .tmco-stat b { display: block; font-family: 'Libre Baskerville', serif; font-size: 20px; color: #92400e; }
        .tmco-stat span { font-size: 11px; color: #78350f; }
        .tmco-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 26px; background: #92400e; color: #fff; font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 15px; cursor: pointer; transition: transform .25s, opacity .25s; }
        .tmco-cta:hover { transform: translateY(-2px); opacity: .9; }
        .tmco-cta-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #92400e; border-radius: 26px; background: transparent; color: #92400e; font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 15px; cursor: pointer; margin-left: 12px; transition: transform .25s; }
        .tmco-cta-sec:hover { transform: translateY(-2px); }
        .tmco-hero-img { border-radius: 26px; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
        .tmco-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmco-hero-img:hover img { transform: scale(1.04); }
        .tmco-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 44px; }
        .tmco-panel { background: rgba(255,255,255,.55); border-radius: 26px; padding: 32px 28px; }
        .tmco-panel h4 { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 18px; margin: 0 0 12px; }
        .tmco-panel p { font-size: 13px; line-height: 1.7; color: #78350f; margin: 0; }
        .tmco-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 28px; }
        .tmco-proof { background: rgba(255,255,255,.55); border-radius: 26px; padding: 32px 28px; }
        .tmco-proof h4 { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 18px; margin: 0 0 10px; }
        .tmco-proof p { font-size: 13px; line-height: 1.7; color: #78350f; margin: 0; }
        .tmco-accent-cta { background: #92400e; border-radius: 26px; padding: 32px 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .tmco-accent-cta h4 { font-family: 'Libre Baskerville', serif; color: #fff; font-size: 20px; margin: 0 0 16px; }
        .tmco-accent-cta button { min-height: 44px; padding: 0 28px; border: 2px solid #fff; border-radius: 26px; background: transparent; color: #fff; font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: background .25s, color .25s; }
        .tmco-accent-cta button:hover { background: #fff; color: #92400e; }
        .tmco-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; }
        .tmco-gallery-item { aspect-ratio: 1; border-radius: 26px; overflow: hidden; cursor: pointer; }
        .tmco-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmco-gallery-item:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .tmco-hero { grid-template-columns: 1fr; }
          .tmco-grid { grid-template-columns: 1fr; }
          .tmco-lower { grid-template-columns: 1fr; }
          .tmco-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmco-wrap { padding: 32px 4vw 40px; }
          .tmco-header h2 { font-size: 24px; }
          .tmco-stats { flex-direction: column; }
          .tmco-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
      <section className="tmco-wrap">
        <header className="tmco-header">
          <h2>
            {name}
            {verified && <span className="tmco-verified" title="Verified">&#10003;</span>}
          </h2>
          <p className="tmco-tagline">{tagline}</p>
          <div className="tmco-pills">
            {specialties.map((s) => <span key={s} className="tmco-pill">{s}</span>)}
          </div>
        </header>

        <div className="tmco-hero">
          <div className="tmco-hero-text">
            <h3>{tagline}</h3>
            <p>{bio}</p>
            <div className="tmco-stats">
              <div className="tmco-stat"><b>10M+</b><span>Readers Reached</span></div>
              <div className="tmco-stat"><b>85%</b><span>Engagement Rate</span></div>
              <div className="tmco-stat"><b>200+</b><span>Articles Published</span></div>
            </div>
            <button className="tmco-cta" onClick={onHire}>Hire Me</button>
            <button className="tmco-cta-sec">Read More</button>
          </div>
          {portfolio?.[0] && (
            <div className="tmco-hero-img" onClick={() => onPhotoClick(0)}>
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tmco-grid">
          <div className="tmco-panel">
            <h4>Services &amp; Specialties</h4>
            <p>{specialties.join(" · ")}</p>
          </div>
          <div className="tmco-panel">
            <h4>Details</h4>
            <p>{serviceArea}{priceLabel && <><br /><b>{priceLabel}</b></>}</p>
          </div>
        </div>

        <div className="tmco-lower">
          <div className="tmco-proof">
            <h4>Editorial Excellence</h4>
            <p>Thoughtfully crafted content strategies that blend storytelling with data-driven insights to captivate audiences and build lasting brand authority.</p>
          </div>
          <div className="tmco-accent-cta">
            <h4>Elevate your content strategy</h4>
            <button onClick={onHire}>Start a Project</button>
          </div>
        </div>

        <div className="tmco-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tmco-gallery-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
