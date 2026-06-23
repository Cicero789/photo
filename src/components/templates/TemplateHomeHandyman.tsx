import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHomeHandyman(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-home-handyman";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
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
        .thh-wrap { color: #111827; background: linear-gradient(135deg,#fff7ed,#fff 48%,#fef3c7); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .thh-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .thh-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .thh-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .thh-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .thh-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .thh-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #ea580c; color: #fff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .thh-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .thh-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 42px; align-items: center; }
        .thh-hero h2 { margin: 0; color: #111827; font-family: Inter, sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .thh-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .thh-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .thh-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .thh-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .thh-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #ea580c; color: #fff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .thh-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: none; opacity: .8; }
        .thh-media { position: relative; overflow: hidden; border-radius: 34px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .thh-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .thh-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .thh-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .thh-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .thh-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .thh-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .thh-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .thh-services li { min-height: 54px; display: flex; gap: 10px; align-items: flex-start; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .thh-services li::before { content: "\\2713"; color: #ea580c; font-weight: 950; }
        .thh-area-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .thh-area { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .thh-proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .thh-proof { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; color: #111827; }
        .thh-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
        .thh-ba-card { position: relative; overflow: hidden; border-radius: 26px; box-shadow: 0 16px 42px rgba(15,23,42,.10); cursor: pointer; }
        .thh-ba-card img { display: block; width: 100%; height: 230px; object-fit: cover; }
        .thh-ba-card span { position: absolute; top: 14px; left: 14px; padding: 9px 12px; border-radius: 999px; background: rgba(255,255,255,.9); color: #111827; font-weight: 950; font-size: 12px; letter-spacing: .08em; }
        .thh-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .thh-review { padding: 24px; border-radius: 26px; background: #ea580c; color: #fff; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .thh-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .thh-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .thh-gallery { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 26px; }
        .thh-gallery img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .thh-gallery img:first-child { height: 224px; }
        .thh-verified { display: inline-block; color: #ea580c; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .thh-hero, .thh-main-grid, .thh-lower-grid { grid-template-columns: 1fr !important; }
          .thh-proof-grid, .thh-area-grid, .thh-ba, .thh-gallery { grid-template-columns: 1fr; }
          .thh-services { grid-template-columns: 1fr; }
          .thh-gallery img, .thh-gallery img:first-child, .thh-ba-card img { height: 220px; }
          .thh-media img { height: 340px; }
          .thh-nav { align-items: flex-start; flex-direction: column; }
          .thh-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .thh-wrap { padding: 64px 5vw; }
          .thh-hero h2 { font-size: 40px; }
          .thh-panel, .thh-review { padding: 20px; }
          .thh-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="thh-wrap">
        <div className="thh-inner">
          <nav className="thh-nav">
            <div className="thh-brand">
              <span className="thh-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="thh-verified">&#10003;</span>}
            </div>
            <div className="thh-navlinks"><span>Services</span><span>Area</span><span>Gallery</span><span>Contact</span></div>
          </nav>

          <div className="thh-hero">
            <div>
              <div className="thh-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="thh-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Professional ${specialties[0] || "service"} you can trust.`}</h2>
              {bio && <p>{bio}</p>}
              <div className="thh-btn-row">
                <button className="thh-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="thh-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="thh-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="thh-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="thh-main-grid">
            <div className="thh-panel">
              <h3>Services</h3>
              <ul className="thh-services">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="thh-panel">
              <h3>Service Area</h3>
              <p>{serviceArea}</p>
              <div className="thh-area-grid">
                {serviceArea.split(",").map((a, i) => (
                  <div key={i} className="thh-area">{a.trim()}</div>
                ))}
              </div>
            </div>
          </div>

          {verified && (
            <div className="thh-panel" style={{ marginTop: 24 }}>
              <h3>Verified Professional</h3>
              <p>This photographer has been verified by FrameNest for quality and reliability.</p>
              <div className="thh-proof-grid">
                <div className="thh-proof">Verified identity</div>
                <div className="thh-proof">Quality reviewed</div>
                <div className="thh-proof">Insured service</div>
              </div>
            </div>
          )}

          {restPhotos.length >= 2 && (
            <div className="thh-ba">
              <div className="thh-ba-card" onClick={() => onPhotoClick(1)}>
                <img src={restPhotos[0]?.url} alt={restPhotos[0]?.filename ?? ""} loading="lazy" />
                <span>BEFORE</span>
              </div>
              <div className="thh-ba-card" onClick={() => onPhotoClick(2)}>
                <img src={restPhotos[1]?.url} alt={restPhotos[1]?.filename ?? ""} loading="lazy" />
                <span>AFTER</span>
              </div>
            </div>
          )}

          <div className="thh-lower-grid">
            <div className="thh-panel">
              <h3>Get in Touch</h3>
              <p>Ready to start your project? Reach out for a free consultation.</p>
              <div className="thh-btn-row">
                <button className="thh-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div className="thh-review">
              <h3>Client Review</h3>
              <p>"Exceptional quality and professionalism from start to finish."</p>
            </div>
          </div>

          {restPhotos.length > 2 && (
            <div className="thh-gallery">
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
