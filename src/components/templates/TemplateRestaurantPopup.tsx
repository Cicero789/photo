import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRestaurantPopup(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-rest-popup";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `$${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `$${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const restPhotos = portfolio.slice(1);

  return (
    <>
      <style>{`
        .tpu-wrap { color: #111827; background: linear-gradient(135deg,#ecfeff,#fff 48%,#fef3c7); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .tpu-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .tpu-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .tpu-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .tpu-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .tpu-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .tpu-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #0891b2; color: #ecfeff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .tpu-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .tpu-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 42px; align-items: center; }
        .tpu-hero h2 { margin: 0; color: #111827; font-family: "Space Grotesk", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .tpu-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .tpu-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .tpu-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .tpu-menu-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .tpu-menu-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .tpu-menu-mini b { display: block; color: #111827; margin-bottom: 6px; }
        .tpu-menu-mini strong { display: block; color: #0891b2; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .tpu-menu-mini span { color: #64748b; line-height: 1.45; }
        .tpu-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .tpu-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #0891b2; color: #ecfeff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .tpu-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .tpu-media { position: relative; overflow: hidden; border-radius: 18px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .tpu-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .tpu-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .tpu-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .tpu-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .tpu-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .tpu-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .tpu-menu-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .tpu-menu-list li { min-height: 54px; display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .tpu-menu-list li::before { content: "\\2726"; color: #0891b2; font-weight: 950; }
        .tpu-photo-grid { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 16px; }
        .tpu-photo-grid img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tpu-photo-grid img:first-child { height: 224px; }
        .tpu-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .tpu-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .tpu-info b { display: block; color: #111827; margin-bottom: 9px; }
        .tpu-info p { margin: 0; color: #64748b; line-height: 1.6; }
        .tpu-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .tpu-review { padding: 24px; border-radius: 26px; background: #0891b2; color: #ecfeff; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .tpu-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .tpu-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .tpu-verified { display: inline-block; color: #0891b2; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .tpu-hero, .tpu-main-grid, .tpu-lower-grid { grid-template-columns: 1fr !important; }
          .tpu-menu-strip, .tpu-info-grid, .tpu-photo-grid { grid-template-columns: 1fr; }
          .tpu-menu-list { grid-template-columns: 1fr; }
          .tpu-photo-grid img, .tpu-photo-grid img:first-child { height: 220px; }
          .tpu-media img { height: 340px; }
          .tpu-nav { align-items: flex-start; flex-direction: column; }
          .tpu-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .tpu-wrap { padding: 64px 5vw; }
          .tpu-hero h2 { font-size: 40px; }
          .tpu-panel, .tpu-review, .tpu-info { padding: 20px; }
          .tpu-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="tpu-wrap">
        <div className="tpu-inner">
          <nav className="tpu-nav">
            <div className="tpu-brand">
              <span className="tpu-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="tpu-verified">&#10003;</span>}
            </div>
            <div className="tpu-navlinks"><span>Menu</span><span>Hours</span><span>Order</span><span>Reviews</span></div>
          </nav>

          <div className="tpu-hero">
            <div>
              <div className="tpu-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="tpu-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Exceptional ${specialties[0] || "dining"} worth the visit.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="tpu-menu-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="tpu-menu-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="tpu-btn-row">
                <button className="tpu-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tpu-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="tpu-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tpu-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="tpu-main-grid">
            <div className="tpu-panel">
              <h3>Specialties</h3>
              <ul className="tpu-menu-list">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="tpu-panel">
              <h3>Portfolio</h3>
              <p>Browse recent work from this photographer.</p>
              <div className="tpu-photo-grid">
                {restPhotos.slice(0, 3).map((photo, i) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={photo.filename}
                    loading="lazy"
                    onClick={() => onPhotoClick(i + 1)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="tpu-info-grid">
            <div className="tpu-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="tpu-info">
              <b>Book Now</b>
              <p>Available for hire. Click to get started with your project.</p>
              <button className="tpu-btn" onClick={onHire} style={{ marginTop: 12 }}>
                Hire Me
              </button>
            </div>
            <div className="tpu-info">
              <b>{verified ? "Verified Pro" : "About"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest." : "Professional photographer ready to capture your vision."}</p>
            </div>
          </div>

          <div className="tpu-lower-grid">
            <div className="tpu-panel">
              <h3>About</h3>
              <p>{bio || tagline || "A dedicated photographer bringing creative vision and technical skill to every project."}</p>
            </div>
            <div className="tpu-review">
              <h3>Client Review</h3>
              <p>"Outstanding photography that exceeded our expectations in every way."</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
