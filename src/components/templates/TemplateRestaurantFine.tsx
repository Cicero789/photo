import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRestaurantFine(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-rest-fine";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap";
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
        .tfi-wrap { color: #f8fafc; background: linear-gradient(135deg,#09090b,#1c1917 55%,#26130c); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .tfi-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .tfi-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(255,255,255,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .tfi-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .tfi-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .tfi-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .tfi-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #d6a74a; color: #111827; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .tfi-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .tfi-hero { display: grid; grid-template-columns: .95fr 1.05fr; gap: 42px; align-items: center; }
        .tfi-hero h2 { margin: 0; color: #fff7ed; font-family: "Playfair Display", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .tfi-hero p { max-width: 700px; margin: 22px 0 0; color: #fed7aa; opacity: .78; font-size: 18px; line-height: 1.7; }
        .tfi-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .tfi-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); font-size: 13px; font-weight: 900; }
        .tfi-menu-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .tfi-menu-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .tfi-menu-mini b { display: block; color: #fff7ed; margin-bottom: 6px; }
        .tfi-menu-mini strong { display: block; color: #d6a74a; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .tfi-menu-mini span { color: #e7e5e4; line-height: 1.45; }
        .tfi-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .tfi-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #d6a74a; color: #111827; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .tfi-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #fff7ed; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .tfi-media { position: relative; overflow: hidden; border-radius: 44px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .tfi-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .tfi-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .tfi-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .tfi-panel { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .tfi-panel h3 { margin: 0 0 12px; color: #fff7ed; font-size: 24px; letter-spacing: -0.035em; }
        .tfi-panel p { margin: 0; color: #e7e5e4; line-height: 1.65; }
        .tfi-menu-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .tfi-menu-list li { min-height: 54px; display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); font-weight: 850; }
        .tfi-menu-list li::before { content: "\\2726"; color: #d6a74a; font-weight: 950; }
        .tfi-photo-grid { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 16px; }
        .tfi-photo-grid img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tfi-photo-grid img:first-child { height: 224px; }
        .tfi-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .tfi-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .tfi-info b { display: block; color: #fff7ed; margin-bottom: 9px; }
        .tfi-info p { margin: 0; color: #e7e5e4; line-height: 1.6; }
        .tfi-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .tfi-review { padding: 24px; border-radius: 26px; background: #d6a74a; color: #111827; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .tfi-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .tfi-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .tfi-verified { display: inline-block; color: #d6a74a; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .tfi-hero, .tfi-main-grid, .tfi-lower-grid { grid-template-columns: 1fr !important; }
          .tfi-menu-strip, .tfi-info-grid, .tfi-photo-grid { grid-template-columns: 1fr; }
          .tfi-menu-list { grid-template-columns: 1fr; }
          .tfi-photo-grid img, .tfi-photo-grid img:first-child { height: 220px; }
          .tfi-media img { height: 340px; }
          .tfi-nav { align-items: flex-start; flex-direction: column; }
          .tfi-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .tfi-wrap { padding: 64px 5vw; }
          .tfi-hero h2 { font-size: 40px; }
          .tfi-panel, .tfi-review, .tfi-info { padding: 20px; }
          .tfi-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="tfi-wrap">
        <div className="tfi-inner">
          <nav className="tfi-nav">
            <div className="tfi-brand">
              <span className="tfi-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="tfi-verified">&#10003;</span>}
            </div>
            <div className="tfi-navlinks"><span>Menu</span><span>Hours</span><span>Order</span><span>Reviews</span></div>
          </nav>

          <div className="tfi-hero">
            <div>
              <div className="tfi-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="tfi-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Exceptional ${specialties[0] || "dining"} worth the visit.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="tfi-menu-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="tfi-menu-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="tfi-btn-row">
                <button className="tfi-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tfi-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="tfi-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tfi-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="tfi-main-grid">
            <div className="tfi-panel">
              <h3>Specialties</h3>
              <ul className="tfi-menu-list">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="tfi-panel">
              <h3>Portfolio</h3>
              <p>Browse recent work from this photographer.</p>
              <div className="tfi-photo-grid">
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

          <div className="tfi-info-grid">
            <div className="tfi-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="tfi-info">
              <b>Book Now</b>
              <p>Available for hire. Click to get started with your project.</p>
              <button className="tfi-btn" onClick={onHire} style={{ marginTop: 12 }}>
                Hire Me
              </button>
            </div>
            <div className="tfi-info">
              <b>{verified ? "Verified Pro" : "About"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest." : "Professional photographer ready to capture your vision."}</p>
            </div>
          </div>

          <div className="tfi-lower-grid">
            <div className="tfi-panel">
              <h3>About</h3>
              <p>{bio || tagline || "A dedicated photographer bringing creative vision and technical skill to every project."}</p>
            </div>
            <div className="tfi-review">
              <h3>Client Review</h3>
              <p>"Outstanding photography that exceeded our expectations in every way."</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
