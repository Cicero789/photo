import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRetailFood(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-ret-food";
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
        .rfd-wrap { color: #111827; background: linear-gradient(135deg,#fffbeb,#fff 48%,#fef3c7); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .rfd-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(236,72,153,.18); top: -150px; right: -130px; filter: blur(5px); }
        .rfd-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .rfd-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .rfd-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .rfd-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .rfd-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #b45309; color: #fff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .rfd-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .rfd-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 42px; align-items: center; }
        .rfd-hero h2 { margin: 0; color: #111827; font-family: "Space Grotesk", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .rfd-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .rfd-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .rfd-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .rfd-product-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .rfd-product-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .rfd-product-mini b { display: block; color: #111827; margin-bottom: 6px; }
        .rfd-product-mini strong { display: block; color: #b45309; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .rfd-product-mini span { color: #64748b; line-height: 1.45; }
        .rfd-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .rfd-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #b45309; color: #fff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .rfd-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .rfd-media { position: relative; overflow: hidden; border-radius: 26px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .rfd-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .rfd-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .rfd-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .rfd-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .rfd-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .rfd-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .rfd-showcase { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
        .rfd-product-card { overflow: hidden; border-radius: 24px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); cursor: pointer; }
        .rfd-product-card img { display: block; width: 100%; height: 150px; object-fit: cover; }
        .rfd-product-card div { padding: 14px; }
        .rfd-product-card b { display: block; margin-bottom: 5px; color: #111827; }
        .rfd-product-card span { color: #64748b; line-height: 1.45; }
        .rfd-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .rfd-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .rfd-info b { display: block; color: #111827; margin-bottom: 9px; }
        .rfd-info p { margin: 0; color: #64748b; line-height: 1.6; }
        .rfd-review { padding: 24px; border-radius: 26px; background: #b45309; color: #fff; box-shadow: 0 18px 50px rgba(15,23,42,.16); margin-top: 24px; }
        .rfd-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .rfd-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .rfd-verified { display: inline-block; color: #b45309; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .rfd-hero, .rfd-main-grid { grid-template-columns: 1fr !important; }
          .rfd-product-strip, .rfd-showcase, .rfd-info-grid { grid-template-columns: 1fr; }
          .rfd-media img { height: 340px; }
          .rfd-product-card img { height: 220px; }
          .rfd-nav { align-items: flex-start; flex-direction: column; }
          .rfd-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .rfd-wrap { padding: 64px 5vw; }
          .rfd-hero h2 { font-size: 40px; }
          .rfd-panel, .rfd-review, .rfd-info { padding: 20px; }
          .rfd-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="rfd-wrap">
        <div className="rfd-inner">
          <nav className="rfd-nav">
            <div className="rfd-brand">
              <span className="rfd-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="rfd-verified">&#10003;</span>}
            </div>
            <div className="rfd-navlinks"><span>Products</span><span>Hours</span><span>Promotions</span><span>Reviews</span></div>
          </nav>

          <div className="rfd-hero">
            <div>
              <div className="rfd-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="rfd-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Curated ${specialties[0] || "photography"} for every occasion.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="rfd-product-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="rfd-product-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="rfd-btn-row">
                <button className="rfd-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="rfd-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="rfd-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="rfd-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="rfd-main-grid">
            <div className="rfd-panel">
              <h3>Portfolio Showcase</h3>
              <p>Browse this photographer's recent work and featured projects.</p>
              <div className="rfd-showcase">
                {restPhotos.slice(0, 3).map((photo, i) => (
                  <div key={photo.id} className="rfd-product-card" onClick={() => onPhotoClick(i + 1)}>
                    <img src={photo.url} alt={photo.filename} loading="lazy" />
                    <div>
                      <b>{specialties[i] || "Photography"}</b>
                      <span>{photo.filename}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rfd-panel">
              <h3>Work With Me</h3>
              <p>{bio || "Professional photographer available for bookings. Reach out to discuss your project."}</p>
              <div className="rfd-btn-row">
                <button className="rfd-btn" onClick={onHire}>Hire Me</button>
                <button className="rfd-btn-sec" onClick={() => onPhotoClick(0)}>Browse Gallery</button>
              </div>
            </div>
          </div>

          <div className="rfd-info-grid">
            <div className="rfd-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="rfd-info">
              <b>{verified ? "Verified Pro" : "Availability"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest for quality and reliability." : "Available for new bookings. Contact for scheduling."}</p>
            </div>
            <div className="rfd-info">
              <b>Specialties</b>
              <p>{specialties.join(", ")}</p>
            </div>
          </div>

          <div className="rfd-review">
            <h3>Client Review</h3>
            <p>"Incredible eye for detail and a wonderful experience from booking to delivery."</p>
          </div>
        </div>
      </section>
    </>
  );
}
