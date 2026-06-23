import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHomeLandscape(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-home-landscape";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap";
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
        .tla-wrap { color: #111827; background: linear-gradient(135deg,#f0fdf4,#fff 48%,#dcfce7); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .tla-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .tla-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .tla-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .tla-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .tla-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .tla-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #16a34a; color: #052e16; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .tla-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .tla-hero { display: grid; grid-template-columns: .95fr 1.05fr; gap: 42px; align-items: center; }
        .tla-hero h2 { margin: 0; color: #111827; font-family: "Playfair Display", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .tla-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .tla-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .tla-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .tla-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .tla-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #16a34a; color: #052e16; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .tla-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: none; opacity: .8; }
        .tla-media { position: relative; overflow: hidden; border-radius: 80px 28px 80px 28px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .tla-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .tla-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .tla-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .tla-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .tla-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .tla-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .tla-services { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .tla-services li { min-height: 54px; display: flex; gap: 10px; align-items: flex-start; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .tla-services li::before { content: "\\2713"; color: #16a34a; font-weight: 950; }
        .tla-area-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .tla-area { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .tla-proof-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 16px; }
        .tla-proof { padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; color: #111827; }
        .tla-ba { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
        .tla-ba-card { position: relative; overflow: hidden; border-radius: 26px; box-shadow: 0 16px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tla-ba-card img { display: block; width: 100%; height: 230px; object-fit: cover; }
        .tla-ba-card span { position: absolute; top: 14px; left: 14px; padding: 9px 12px; border-radius: 999px; background: rgba(255,255,255,.9); color: #111827; font-weight: 950; font-size: 12px; letter-spacing: .08em; }
        .tla-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .tla-review { padding: 24px; border-radius: 26px; background: #16a34a; color: #052e16; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .tla-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .tla-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .tla-gallery { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 26px; }
        .tla-gallery img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tla-gallery img:first-child { height: 224px; }
        .tla-verified { display: inline-block; color: #16a34a; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .tla-hero, .tla-main-grid, .tla-lower-grid { grid-template-columns: 1fr !important; }
          .tla-proof-grid, .tla-area-grid, .tla-ba, .tla-gallery { grid-template-columns: 1fr; }
          .tla-services { grid-template-columns: 1fr; }
          .tla-gallery img, .tla-gallery img:first-child, .tla-ba-card img { height: 220px; }
          .tla-media img { height: 340px; }
          .tla-nav { align-items: flex-start; flex-direction: column; }
          .tla-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .tla-wrap { padding: 64px 5vw; }
          .tla-hero h2 { font-size: 40px; }
          .tla-panel, .tla-review { padding: 20px; }
          .tla-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="tla-wrap">
        <div className="tla-inner">
          <nav className="tla-nav">
            <div className="tla-brand">
              <span className="tla-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="tla-verified">&#10003;</span>}
            </div>
            <div className="tla-navlinks"><span>Services</span><span>Area</span><span>Gallery</span><span>Contact</span></div>
          </nav>

          <div className="tla-hero">
            <div>
              <div className="tla-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="tla-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Professional ${specialties[0] || "service"} you can trust.`}</h2>
              {bio && <p>{bio}</p>}
              <div className="tla-btn-row">
                <button className="tla-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tla-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="tla-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tla-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="tla-main-grid">
            <div className="tla-panel">
              <h3>Services</h3>
              <ul className="tla-services">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="tla-panel">
              <h3>Service Area</h3>
              <p>{serviceArea}</p>
              <div className="tla-area-grid">
                {serviceArea.split(",").map((a, i) => (
                  <div key={i} className="tla-area">{a.trim()}</div>
                ))}
              </div>
            </div>
          </div>

          {verified && (
            <div className="tla-panel" style={{ marginTop: 24 }}>
              <h3>Verified Professional</h3>
              <p>This photographer has been verified by FrameNest for quality and reliability.</p>
              <div className="tla-proof-grid">
                <div className="tla-proof">Verified identity</div>
                <div className="tla-proof">Quality reviewed</div>
                <div className="tla-proof">Insured service</div>
              </div>
            </div>
          )}

          {restPhotos.length >= 2 && (
            <div className="tla-ba">
              <div className="tla-ba-card" onClick={() => onPhotoClick(1)}>
                <img src={restPhotos[0]?.url} alt={restPhotos[0]?.filename ?? ""} loading="lazy" />
                <span>BEFORE</span>
              </div>
              <div className="tla-ba-card" onClick={() => onPhotoClick(2)}>
                <img src={restPhotos[1]?.url} alt={restPhotos[1]?.filename ?? ""} loading="lazy" />
                <span>AFTER</span>
              </div>
            </div>
          )}

          <div className="tla-lower-grid">
            <div className="tla-panel">
              <h3>Get in Touch</h3>
              <p>Ready to start your project? Reach out for a free consultation.</p>
              <div className="tla-btn-row">
                <button className="tla-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div className="tla-review">
              <h3>Client Review</h3>
              <p>"Exceptional quality and professionalism from start to finish."</p>
            </div>
          </div>

          {restPhotos.length > 2 && (
            <div className="tla-gallery">
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
