import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRetailJeweler(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-ret-jeweler";
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
        .rjw-wrap { color: #f8fafc; background: linear-gradient(135deg,#07111f,#0f1e34 55%,#111827); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .rjw-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(236,72,153,.18); top: -150px; right: -130px; filter: blur(5px); }
        .rjw-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(255,255,255,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .rjw-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .rjw-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .rjw-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .rjw-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #d6a74a; color: #07111f; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .rjw-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .rjw-hero { display: grid; grid-template-columns: .95fr 1.05fr; gap: 42px; align-items: center; }
        .rjw-hero h2 { margin: 0; color: #fff; font-family: "Playfair Display", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .rjw-hero p { max-width: 700px; margin: 22px 0 0; color: #dbeafe; opacity: .78; font-size: 18px; line-height: 1.7; }
        .rjw-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .rjw-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); font-size: 13px; font-weight: 900; }
        .rjw-product-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .rjw-product-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .rjw-product-mini b { display: block; color: #fff; margin-bottom: 6px; }
        .rjw-product-mini strong { display: block; color: #d6a74a; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .rjw-product-mini span { color: #cbd5e1; line-height: 1.45; }
        .rjw-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .rjw-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #d6a74a; color: #07111f; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .rjw-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #fff; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .rjw-media { position: relative; overflow: hidden; border-radius: 44px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .rjw-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .rjw-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .rjw-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .rjw-panel { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .rjw-panel h3 { margin: 0 0 12px; color: #fff; font-size: 24px; letter-spacing: -0.035em; }
        .rjw-panel p { margin: 0; color: #cbd5e1; line-height: 1.65; }
        .rjw-showcase { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
        .rjw-product-card { overflow: hidden; border-radius: 24px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); cursor: pointer; }
        .rjw-product-card img { display: block; width: 100%; height: 150px; object-fit: cover; }
        .rjw-product-card div { padding: 14px; }
        .rjw-product-card b { display: block; margin-bottom: 5px; color: #fff; }
        .rjw-product-card span { color: #cbd5e1; line-height: 1.45; }
        .rjw-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .rjw-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .rjw-info b { display: block; color: #fff; margin-bottom: 9px; }
        .rjw-info p { margin: 0; color: #cbd5e1; line-height: 1.6; }
        .rjw-review { padding: 24px; border-radius: 26px; background: #d6a74a; color: #07111f; box-shadow: 0 18px 50px rgba(15,23,42,.16); margin-top: 24px; }
        .rjw-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .rjw-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .rjw-verified { display: inline-block; color: #d6a74a; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .rjw-hero, .rjw-main-grid { grid-template-columns: 1fr !important; }
          .rjw-product-strip, .rjw-showcase, .rjw-info-grid { grid-template-columns: 1fr; }
          .rjw-media img { height: 340px; }
          .rjw-product-card img { height: 220px; }
          .rjw-nav { align-items: flex-start; flex-direction: column; }
          .rjw-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .rjw-wrap { padding: 64px 5vw; }
          .rjw-hero h2 { font-size: 40px; }
          .rjw-panel, .rjw-review, .rjw-info { padding: 20px; }
          .rjw-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="rjw-wrap">
        <div className="rjw-inner">
          <nav className="rjw-nav">
            <div className="rjw-brand">
              <span className="rjw-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="rjw-verified">&#10003;</span>}
            </div>
            <div className="rjw-navlinks"><span>Products</span><span>Hours</span><span>Promotions</span><span>Reviews</span></div>
          </nav>

          <div className="rjw-hero">
            <div>
              <div className="rjw-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="rjw-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Curated ${specialties[0] || "photography"} for every occasion.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="rjw-product-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="rjw-product-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="rjw-btn-row">
                <button className="rjw-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="rjw-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="rjw-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="rjw-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="rjw-main-grid">
            <div className="rjw-panel">
              <h3>Portfolio Showcase</h3>
              <p>Browse this photographer's recent work and featured projects.</p>
              <div className="rjw-showcase">
                {restPhotos.slice(0, 3).map((photo, i) => (
                  <div key={photo.id} className="rjw-product-card" onClick={() => onPhotoClick(i + 1)}>
                    <img src={photo.url} alt={photo.filename} loading="lazy" />
                    <div>
                      <b>{specialties[i] || "Photography"}</b>
                      <span>{photo.filename}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rjw-panel">
              <h3>Work With Me</h3>
              <p>{bio || "Professional photographer available for bookings. Reach out to discuss your project."}</p>
              <div className="rjw-btn-row">
                <button className="rjw-btn" onClick={onHire}>Hire Me</button>
                <button className="rjw-btn-sec" onClick={() => onPhotoClick(0)}>Browse Gallery</button>
              </div>
            </div>
          </div>

          <div className="rjw-info-grid">
            <div className="rjw-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="rjw-info">
              <b>{verified ? "Verified Pro" : "Availability"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest for quality and reliability." : "Available for new bookings. Contact for scheduling."}</p>
            </div>
            <div className="rjw-info">
              <b>Specialties</b>
              <p>{specialties.join(", ")}</p>
            </div>
          </div>

          <div className="rjw-review">
            <h3>Client Review</h3>
            <p>"Incredible eye for detail and a wonderful experience from booking to delivery."</p>
          </div>
        </div>
      </section>
    </>
  );
}
