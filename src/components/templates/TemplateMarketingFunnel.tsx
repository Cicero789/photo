import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingFunnel(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-funnel";
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
        .tmfu-wrap { padding: 52px 5vw 64px; background: linear-gradient(135deg, #111827, #312e81); font-family: Inter, sans-serif; min-height: 600px; color: #e0e7ff; }
        .tmfu-header { text-align: center; padding-bottom: 36px; border-bottom: 1px solid rgba(167,139,250,.2); }
        .tmfu-header h2 { margin: 0 0 8px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.04em; color: #fff; }
        .tmfu-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #a78bfa; color: #111827; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        .tmfu-tagline { font-size: 15px; color: #a78bfa; margin: 0 0 10px; }
        .tmfu-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tmfu-pill { padding: 5px 16px; background: rgba(167,139,250,.12); color: #a78bfa; border-radius: 18px; font-size: 12px; font-weight: 600; border: 1px solid rgba(167,139,250,.2); }
        .tmfu-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 44px; }
        .tmfu-hero-text h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin: 0 0 14px; color: #fff; }
        .tmfu-hero-text p { font-size: 14px; line-height: 1.75; color: #c7d2fe; margin: 0 0 20px; }
        .tmfu-stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .tmfu-stat { flex: 1; padding: 14px; background: rgba(255,255,255,.08); border: 1px solid rgba(167,139,250,.15); border-radius: 18px; text-align: center; backdrop-filter: blur(8px); }
        .tmfu-stat b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #a78bfa; }
        .tmfu-stat span { font-size: 11px; color: #c7d2fe; }
        .tmfu-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 18px; background: #a78bfa; color: #111827; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform .25s, opacity .25s; }
        .tmfu-cta:hover { transform: translateY(-2px); opacity: .9; }
        .tmfu-cta-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #a78bfa; border-radius: 18px; background: transparent; color: #a78bfa; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; margin-left: 12px; transition: transform .25s; }
        .tmfu-cta-sec:hover { transform: translateY(-2px); }
        .tmfu-hero-img { border-radius: 18px; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; border: 1px solid rgba(167,139,250,.2); }
        .tmfu-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmfu-hero-img:hover img { transform: scale(1.04); }
        .tmfu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 44px; }
        .tmfu-panel { background: rgba(255,255,255,.08); border: 1px solid rgba(167,139,250,.15); border-radius: 18px; padding: 32px 28px; backdrop-filter: blur(8px); }
        .tmfu-panel h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 12px; color: #fff; }
        .tmfu-panel p { font-size: 13px; line-height: 1.7; color: #c7d2fe; margin: 0; }
        .tmfu-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 28px; }
        .tmfu-proof { background: rgba(255,255,255,.08); border: 1px solid rgba(167,139,250,.15); border-radius: 18px; padding: 32px 28px; backdrop-filter: blur(8px); }
        .tmfu-proof h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 10px; color: #fff; }
        .tmfu-proof p { font-size: 13px; line-height: 1.7; color: #c7d2fe; margin: 0; }
        .tmfu-accent-cta { background: #a78bfa; border-radius: 18px; padding: 32px 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .tmfu-accent-cta h4 { font-family: 'Space Grotesk', sans-serif; color: #111827; font-size: 20px; margin: 0 0 16px; }
        .tmfu-accent-cta button { min-height: 44px; padding: 0 28px; border: 2px solid #111827; border-radius: 18px; background: transparent; color: #111827; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .25s, color .25s; }
        .tmfu-accent-cta button:hover { background: #111827; color: #a78bfa; }
        .tmfu-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; }
        .tmfu-gallery-item { aspect-ratio: 1; border-radius: 18px; overflow: hidden; cursor: pointer; border: 1px solid rgba(167,139,250,.15); }
        .tmfu-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmfu-gallery-item:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .tmfu-hero { grid-template-columns: 1fr; }
          .tmfu-grid { grid-template-columns: 1fr; }
          .tmfu-lower { grid-template-columns: 1fr; }
          .tmfu-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmfu-wrap { padding: 32px 4vw 40px; }
          .tmfu-header h2 { font-size: 24px; }
          .tmfu-stats { flex-direction: column; }
          .tmfu-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
      <section className="tmfu-wrap">
        <header className="tmfu-header">
          <h2>
            {name}
            {verified && <span className="tmfu-verified" title="Verified">&#10003;</span>}
          </h2>
          <p className="tmfu-tagline">{tagline}</p>
          <div className="tmfu-pills">
            {specialties.map((s) => <span key={s} className="tmfu-pill">{s}</span>)}
          </div>
        </header>

        <div className="tmfu-hero">
          <div className="tmfu-hero-text">
            <h3>{tagline}</h3>
            <p>{bio}</p>
            <div className="tmfu-stats">
              <div className="tmfu-stat"><b>12x</b><span>ROAS Average</span></div>
              <div className="tmfu-stat"><b>67%</b><span>Funnel Conv.</span></div>
              <div className="tmfu-stat"><b>300+</b><span>Funnels Built</span></div>
            </div>
            <button className="tmfu-cta" onClick={onHire}>Hire Me</button>
            <button className="tmfu-cta-sec">View Work</button>
          </div>
          {portfolio?.[0] && (
            <div className="tmfu-hero-img" onClick={() => onPhotoClick(0)}>
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tmfu-grid">
          <div className="tmfu-panel">
            <h4>Services &amp; Specialties</h4>
            <p>{specialties.join(" · ")}</p>
          </div>
          <div className="tmfu-panel">
            <h4>Details</h4>
            <p>{serviceArea}{priceLabel && <><br /><b>{priceLabel}</b></>}</p>
          </div>
        </div>

        <div className="tmfu-lower">
          <div className="tmfu-proof">
            <h4>Funnel Performance</h4>
            <p>High-converting sales funnels engineered with precision — from awareness to action, every touchpoint is optimized to maximize conversions and lifetime value.</p>
          </div>
          <div className="tmfu-accent-cta">
            <h4>Ready to build your funnel?</h4>
            <button onClick={onHire}>Get Started</button>
          </div>
        </div>

        <div className="tmfu-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tmfu-gallery-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
