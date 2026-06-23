import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRestaurantCafe(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-rest-cafe";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700;800;900&display=swap";
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
        .tcf-wrap { color: #111827; background: linear-gradient(135deg,#faf7ef,#fff 48%,#f3e8d6); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .tcf-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(245,158,11,.18); top: -150px; right: -130px; filter: blur(5px); }
        .tcf-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .tcf-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .tcf-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .tcf-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .tcf-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #92400e; color: #fff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .tcf-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .tcf-hero { display: grid; grid-template-columns: .95fr 1.05fr; gap: 42px; align-items: center; }
        .tcf-hero h2 { margin: 0; color: #111827; font-family: "Libre Baskerville", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .tcf-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .tcf-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .tcf-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .tcf-menu-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .tcf-menu-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .tcf-menu-mini b { display: block; color: #111827; margin-bottom: 6px; }
        .tcf-menu-mini strong { display: block; color: #92400e; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .tcf-menu-mini span { color: #64748b; line-height: 1.45; }
        .tcf-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .tcf-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #92400e; color: #fff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .tcf-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .tcf-media { position: relative; overflow: hidden; border-radius: 80px 28px 80px 28px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .tcf-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .tcf-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .tcf-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .tcf-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .tcf-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .tcf-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .tcf-menu-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 0; padding: 0; list-style: none; }
        .tcf-menu-list li { min-height: 54px; display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 18px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); font-weight: 850; }
        .tcf-menu-list li::before { content: "\\2726"; color: #92400e; font-weight: 950; }
        .tcf-photo-grid { display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 14px; margin-top: 16px; }
        .tcf-photo-grid img { display: block; width: 100%; height: 172px; object-fit: cover; border-radius: 24px; box-shadow: 0 18px 42px rgba(15,23,42,.10); cursor: pointer; }
        .tcf-photo-grid img:first-child { height: 224px; }
        .tcf-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .tcf-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .tcf-info b { display: block; color: #111827; margin-bottom: 9px; }
        .tcf-info p { margin: 0; color: #64748b; line-height: 1.6; }
        .tcf-lower-grid { display: grid; grid-template-columns: 1.05fr .95fr; gap: 24px; margin-top: 24px; }
        .tcf-review { padding: 24px; border-radius: 26px; background: #92400e; color: #fff; box-shadow: 0 18px 50px rgba(15,23,42,.16); }
        .tcf-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .tcf-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .tcf-verified { display: inline-block; color: #92400e; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .tcf-hero, .tcf-main-grid, .tcf-lower-grid { grid-template-columns: 1fr !important; }
          .tcf-menu-strip, .tcf-info-grid, .tcf-photo-grid { grid-template-columns: 1fr; }
          .tcf-menu-list { grid-template-columns: 1fr; }
          .tcf-photo-grid img, .tcf-photo-grid img:first-child { height: 220px; }
          .tcf-media img { height: 340px; }
          .tcf-nav { align-items: flex-start; flex-direction: column; }
          .tcf-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .tcf-wrap { padding: 64px 5vw; }
          .tcf-hero h2 { font-size: 40px; }
          .tcf-panel, .tcf-review, .tcf-info { padding: 20px; }
          .tcf-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="tcf-wrap">
        <div className="tcf-inner">
          <nav className="tcf-nav">
            <div className="tcf-brand">
              <span className="tcf-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="tcf-verified">&#10003;</span>}
            </div>
            <div className="tcf-navlinks"><span>Menu</span><span>Hours</span><span>Order</span><span>Reviews</span></div>
          </nav>

          <div className="tcf-hero">
            <div>
              <div className="tcf-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="tcf-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Exceptional ${specialties[0] || "dining"} worth the visit.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="tcf-menu-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="tcf-menu-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="tcf-btn-row">
                <button className="tcf-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tcf-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="tcf-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tcf-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="tcf-main-grid">
            <div className="tcf-panel">
              <h3>Specialties</h3>
              <ul className="tcf-menu-list">
                {specialties.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div className="tcf-panel">
              <h3>Portfolio</h3>
              <p>Browse recent work from this photographer.</p>
              <div className="tcf-photo-grid">
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

          <div className="tcf-info-grid">
            <div className="tcf-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="tcf-info">
              <b>Book Now</b>
              <p>Available for hire. Click to get started with your project.</p>
              <button className="tcf-btn" onClick={onHire} style={{ marginTop: 12 }}>
                Hire Me
              </button>
            </div>
            <div className="tcf-info">
              <b>{verified ? "Verified Pro" : "About"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest." : "Professional photographer ready to capture your vision."}</p>
            </div>
          </div>

          <div className="tcf-lower-grid">
            <div className="tcf-panel">
              <h3>About</h3>
              <p>{bio || tagline || "A dedicated photographer bringing creative vision and technical skill to every project."}</p>
            </div>
            <div className="tcf-review">
              <h3>Client Review</h3>
              <p>"Outstanding photography that exceeded our expectations in every way."</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
