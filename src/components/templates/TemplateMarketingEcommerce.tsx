import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingEcommerce(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-ecommerce";
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
        .tmec-wrap { padding: 52px 5vw 64px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); font-family: Inter, sans-serif; min-height: 600px; color: #052e16; }
        .tmec-header { text-align: center; padding-bottom: 36px; border-bottom: 2px solid rgba(22,163,74,.12); }
        .tmec-header h2 { margin: 0 0 8px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 4.5vw, 54px); font-weight: 700; letter-spacing: -0.04em; }
        .tmec-verified { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; background: #16a34a; color: #fff; font-size: 13px; margin-left: 8px; vertical-align: middle; }
        .tmec-tagline { font-size: 15px; color: #15803d; margin: 0 0 10px; }
        .tmec-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tmec-pill { padding: 5px 16px; background: rgba(22,163,74,.1); color: #16a34a; border-radius: 34px; font-size: 12px; font-weight: 600; }
        .tmec-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-top: 44px; }
        .tmec-hero-text h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3vw, 36px); font-weight: 700; margin: 0 0 14px; }
        .tmec-hero-text p { font-size: 14px; line-height: 1.75; color: #166534; margin: 0 0 20px; }
        .tmec-stats { display: flex; gap: 16px; margin-bottom: 24px; }
        .tmec-stat { flex: 1; padding: 14px; background: rgba(255,255,255,.7); border-radius: 34px; text-align: center; }
        .tmec-stat b { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 20px; color: #16a34a; }
        .tmec-stat span { font-size: 11px; color: #15803d; }
        .tmec-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: none; border-radius: 34px; background: #16a34a; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; transition: transform .25s, opacity .25s; }
        .tmec-cta:hover { transform: translateY(-2px); opacity: .9; }
        .tmec-cta-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 46px; padding: 0 28px; border: 2px solid #16a34a; border-radius: 34px; background: transparent; color: #16a34a; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; cursor: pointer; margin-left: 12px; transition: transform .25s; }
        .tmec-cta-sec:hover { transform: translateY(-2px); }
        .tmec-hero-img { border-radius: 34px; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
        .tmec-hero-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmec-hero-img:hover img { transform: scale(1.04); }
        .tmec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 44px; }
        .tmec-panel { background: rgba(255,255,255,.65); border-radius: 34px; padding: 32px 28px; }
        .tmec-panel h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 12px; }
        .tmec-panel p { font-size: 13px; line-height: 1.7; color: #166534; margin: 0; }
        .tmec-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 28px; }
        .tmec-proof { background: rgba(255,255,255,.65); border-radius: 34px; padding: 32px 28px; }
        .tmec-proof h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 10px; }
        .tmec-proof p { font-size: 13px; line-height: 1.7; color: #166534; margin: 0; }
        .tmec-accent-cta { background: #16a34a; border-radius: 34px; padding: 32px 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .tmec-accent-cta h4 { font-family: 'Space Grotesk', sans-serif; color: #fff; font-size: 20px; margin: 0 0 16px; }
        .tmec-accent-cta button { min-height: 44px; padding: 0 28px; border: 2px solid #fff; border-radius: 34px; background: transparent; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .25s, color .25s; }
        .tmec-accent-cta button:hover { background: #fff; color: #052e16; }
        .tmec-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-top: 44px; }
        .tmec-gallery-item { aspect-ratio: 1; border-radius: 34px; overflow: hidden; cursor: pointer; }
        .tmec-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s cubic-bezier(.2,.7,.2,1); }
        .tmec-gallery-item:hover img { transform: scale(1.04); }
        @media (max-width: 800px) {
          .tmec-hero { grid-template-columns: 1fr; }
          .tmec-grid { grid-template-columns: 1fr; }
          .tmec-lower { grid-template-columns: 1fr; }
          .tmec-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmec-wrap { padding: 32px 4vw 40px; }
          .tmec-header h2 { font-size: 24px; }
          .tmec-stats { flex-direction: column; }
          .tmec-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      `}</style>
      <section className="tmec-wrap">
        <header className="tmec-header">
          <h2>
            {name}
            {verified && <span className="tmec-verified" title="Verified">&#10003;</span>}
          </h2>
          <p className="tmec-tagline">{tagline}</p>
          <div className="tmec-pills">
            {specialties.map((s) => <span key={s} className="tmec-pill">{s}</span>)}
          </div>
        </header>

        <div className="tmec-hero">
          <div className="tmec-hero-text">
            <h3>{tagline}</h3>
            <p>{bio}</p>
            <div className="tmec-stats">
              <div className="tmec-stat"><b>$2.4M</b><span>Revenue Driven</span></div>
              <div className="tmec-stat"><b>38%</b><span>Conv. Rate Lift</span></div>
              <div className="tmec-stat"><b>120+</b><span>Stores Built</span></div>
            </div>
            <button className="tmec-cta" onClick={onHire}>Hire Me</button>
            <button className="tmec-cta-sec">View Work</button>
          </div>
          {portfolio?.[0] && (
            <div className="tmec-hero-img" onClick={() => onPhotoClick(0)}>
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tmec-grid">
          <div className="tmec-panel">
            <h4>Services &amp; Specialties</h4>
            <p>{specialties.join(" · ")}</p>
          </div>
          <div className="tmec-panel">
            <h4>Details</h4>
            <p>{serviceArea}{priceLabel && <><br /><b>{priceLabel}</b></>}</p>
          </div>
        </div>

        <div className="tmec-lower">
          <div className="tmec-proof">
            <h4>Case Study</h4>
            <p>End-to-end e-commerce solutions that drive conversions, from product photography and storefront design to checkout optimization and analytics.</p>
          </div>
          <div className="tmec-accent-cta">
            <h4>Ready to scale your store?</h4>
            <button onClick={onHire}>Get Started</button>
          </div>
        </div>

        <div className="tmec-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tmec-gallery-item" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
