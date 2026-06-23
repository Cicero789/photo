import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHomeSecurity(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-home-security";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const restPhotos = portfolio.slice(1);

  return (
    <>
      <style>{`
        .tsc-wrap { color: #f8fafc; background: linear-gradient(135deg,#020617,#111827 56%,#1e1b4b); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .tsc-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .tsc-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(255,255,255,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .tsc-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .tsc-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .tsc-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .tsc-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #60a5fa; color: #07111f; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .tsc-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .tsc-hero { display: grid; grid-template-columns: .95fr 1.05fr; gap: 42px; align-items: center; }
        .tsc-hero h2 { margin: 0; color: #fff; font-family: "Space Grotesk", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .tsc-hero p { max-width: 700px; margin: 22px 0 0; color: #dbeafe; opacity: .78; font-size: 18px; line-height: 1.7; }
        .tsc-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .tsc-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); font-size: 13px; font-weight: 900; }
        .tsc-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .tsc-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #60a5fa; color: #07111f; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .tsc-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #fff; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: none; opacity: .8; }
        .tsc-media { position: relative; overflow: hidden; border-radius: 18px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .tsc-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .tsc-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .tsc-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .tsc-panel { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .tsc-panel h3 { margin: 0 0 12px; color: #fff; font-size: 24px; letter-spacing: -0.035em; }
        .tsc-panel p { margin: 0; color: #cbd5e1; line-height: 1.65; }
        .tsc-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .tsc-services li { min-height: 54px; display: flex; gap: 10px; align-items: flex-start; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); font-weight: 850; }
        .tsc-services li::before { content: "\\2713"; color: #60a5fa; font-weight: 950; }
        .tsc-area-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .tsc-area { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); font-weight: 850; }
        .tsc-proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .tsc-proof { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); font-weight: 850; color: #fff; }
        .tsc-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
        .tsc-ba-card { position: relative; overflow: hidden; border-radius: 26px; box-shadow: 0 16px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tsc-ba-card img { display: block; width: 100%; height: 230px; object-fit: cover; }
        .tsc-ba-card span { position: absolute; top: 14px; left: 14px; padding: 9px 12px; border-radius: 999px; background: rgba(255,255,255,.9); color: #111827; font-weight: 950; font-size: 12px; letter-spacing: .08em; }
        .tsc-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .tsc-review { padding: 24px; border-radius: 26px; background: #60a5fa; color: #07111f; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .tsc-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .tsc-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .tsc-gallery { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 26px; }
        .tsc-gallery img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tsc-gallery img:first-child { height: 224px; }
        .tsc-verified { display: inline-block; color: #60a5fa; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .tsc-hero, .tsc-main-grid, .tsc-lower-grid { grid-template-columns: 1fr !important; }
          .tsc-proof-grid, .tsc-area-grid, .tsc-ba, .tsc-gallery { grid-template-columns: 1fr; }
          .tsc-services { grid-template-columns: 1fr; }
          .tsc-gallery img, .tsc-gallery img:first-child, .tsc-ba-card img { height: 220px; }
          .tsc-media img { height: 340px; }
          .tsc-nav { align-items: flex-start; flex-direction: column; }
          .tsc-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .tsc-wrap { padding: 64px 5vw; }
          .tsc-hero h2 { font-size: 40px; }
          .tsc-panel, .tsc-review { padding: 20px; }
          .tsc-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="tsc-wrap">
        <div className="tsc-inner">
          <nav className="tsc-nav">
            <div className="tsc-brand">
              <span className="tsc-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="tsc-verified">&#10003;</span>}
            </div>
            <div className="tsc-navlinks"><span>Services</span><span>Area</span><span>Gallery</span><span>Contact</span></div>
          </nav>

          <div className="tsc-hero">
            <div>
              <div className="tsc-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="tsc-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Professional ${specialties[0] || "service"} you can trust.`}</h2>
              {bio && <p>{bio}</p>}
              <div className="tsc-btn-row">
                <button className="tsc-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tsc-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="tsc-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tsc-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="tsc-main-grid">
            <div className="tsc-panel">
              <h3>Services</h3>
              <ul className="tsc-services">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="tsc-panel">
              <h3>Service Area</h3>
              <p>{serviceArea}</p>
              <div className="tsc-area-grid">
                {serviceArea.split(",").map((a, i) => (
                  <div key={i} className="tsc-area">{a.trim()}</div>
                ))}
              </div>
            </div>
          </div>

          {verified && (
            <div className="tsc-panel" style={{ marginTop: 24 }}>
              <h3>Verified Professional</h3>
              <p>This photographer has been verified by FrameNest for quality and reliability.</p>
              <div className="tsc-proof-grid">
                <div className="tsc-proof">Verified identity</div>
                <div className="tsc-proof">Quality reviewed</div>
                <div className="tsc-proof">Insured service</div>
              </div>
            </div>
          )}

          {restPhotos.length >= 2 && (
            <div className="tsc-ba">
              <div className="tsc-ba-card" onClick={() => onPhotoClick(1)}>
                <img src={restPhotos[0]?.url} alt={restPhotos[0]?.filename ?? ""} loading="lazy" />
                <span>BEFORE</span>
              </div>
              <div className="tsc-ba-card" onClick={() => onPhotoClick(2)}>
                <img src={restPhotos[1]?.url} alt={restPhotos[1]?.filename ?? ""} loading="lazy" />
                <span>AFTER</span>
              </div>
            </div>
          )}

          <div className="tsc-lower-grid">
            <div className="tsc-panel">
              <h3>Get in Touch</h3>
              <p>Ready to start your project? Reach out for a free consultation.</p>
              <div className="tsc-btn-row">
                <button className="tsc-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div className="tsc-review">
              <h3>Client Review</h3>
              <p>"Exceptional quality and professionalism from start to finish."</p>
            </div>
          </div>

          {restPhotos.length > 2 && (
            <div className="tsc-gallery">
              {restPhotos.slice(2, 5).map((photo, i) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(i + 3)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
