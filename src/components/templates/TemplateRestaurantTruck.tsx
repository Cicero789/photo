import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRestaurantTruck(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-rest-truck";
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
        .ttk-wrap { color: #111827; background: radial-gradient(circle at 16% 18%,rgba(239,68,68,.28),transparent 25%),radial-gradient(circle at 82% 16%,rgba(250,204,21,.24),transparent 26%),linear-gradient(135deg,#fff,#fee2e2 55%,#fef3c7); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .ttk-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(239,68,68,.18); top: -150px; right: -130px; filter: blur(5px); }
        .ttk-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .ttk-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .ttk-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .ttk-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .ttk-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #dc2626; color: #fff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .ttk-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .ttk-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 42px; align-items: center; }
        .ttk-hero h2 { margin: 0; color: #111827; font-family: "Space Grotesk", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .ttk-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .ttk-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .ttk-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .ttk-menu-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .ttk-menu-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .ttk-menu-mini b { display: block; color: #111827; margin-bottom: 6px; }
        .ttk-menu-mini strong { display: block; color: #dc2626; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .ttk-menu-mini span { color: #64748b; line-height: 1.45; }
        .ttk-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .ttk-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #dc2626; color: #fff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .ttk-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .ttk-media { position: relative; overflow: hidden; border-radius: 14px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .ttk-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .ttk-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .ttk-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .ttk-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .ttk-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .ttk-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .ttk-menu-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .ttk-menu-list li { min-height: 54px; display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .ttk-menu-list li::before { content: "\\2726"; color: #dc2626; font-weight: 950; }
        .ttk-photo-grid { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 16px; }
        .ttk-photo-grid img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .ttk-photo-grid img:first-child { height: 224px; }
        .ttk-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .ttk-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .ttk-info b { display: block; color: #111827; margin-bottom: 9px; }
        .ttk-info p { margin: 0; color: #64748b; line-height: 1.6; }
        .ttk-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .ttk-review { padding: 24px; border-radius: 26px; background: #dc2626; color: #fff; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .ttk-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .ttk-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .ttk-verified { display: inline-block; color: #dc2626; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .ttk-hero, .ttk-main-grid, .ttk-lower-grid { grid-template-columns: 1fr !important; }
          .ttk-menu-strip, .ttk-info-grid, .ttk-photo-grid { grid-template-columns: 1fr; }
          .ttk-menu-list { grid-template-columns: 1fr; }
          .ttk-photo-grid img, .ttk-photo-grid img:first-child { height: 220px; }
          .ttk-media img { height: 340px; }
          .ttk-nav { align-items: flex-start; flex-direction: column; }
          .ttk-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .ttk-wrap { padding: 64px 5vw; }
          .ttk-hero h2 { font-size: 40px; }
          .ttk-panel, .ttk-review, .ttk-info { padding: 20px; }
          .ttk-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="ttk-wrap">
        <div className="ttk-inner">
          <nav className="ttk-nav">
            <div className="ttk-brand">
              <span className="ttk-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="ttk-verified">&#10003;</span>}
            </div>
            <div className="ttk-navlinks"><span>Menu</span><span>Hours</span><span>Order</span><span>Reviews</span></div>
          </nav>

          <div className="ttk-hero">
            <div>
              <div className="ttk-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="ttk-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Exceptional ${specialties[0] || "dining"} worth the visit.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="ttk-menu-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="ttk-menu-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="ttk-btn-row">
                <button className="ttk-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="ttk-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="ttk-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="ttk-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="ttk-main-grid">
            <div className="ttk-panel">
              <h3>Specialties</h3>
              <ul className="ttk-menu-list">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="ttk-panel">
              <h3>Portfolio</h3>
              <p>Browse recent work from this photographer.</p>
              <div className="ttk-photo-grid">
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

          <div className="ttk-info-grid">
            <div className="ttk-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="ttk-info">
              <b>Book Now</b>
              <p>Available for hire. Click to get started with your project.</p>
              <button className="ttk-btn" onClick={onHire} style={{ marginTop: 12 }}>
                Hire Me
              </button>
            </div>
            <div className="ttk-info">
              <b>{verified ? "Verified Pro" : "About"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest." : "Professional photographer ready to capture your vision."}</p>
            </div>
          </div>

          <div className="ttk-lower-grid">
            <div className="ttk-panel">
              <h3>About</h3>
              <p>{bio || tagline || "A dedicated photographer bringing creative vision and technical skill to every project."}</p>
            </div>
            <div className="ttk-review">
              <h3>Client Review</h3>
              <p>"Outstanding photography that exceeded our expectations in every way."</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
