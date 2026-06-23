import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateRetailBook(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-ret-book";
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
        .rbk-wrap { color: #111827; background: linear-gradient(135deg,#fff7ed,#fff 48%,#f3e8d6); font-family: Inter, system-ui, sans-serif; min-height: 780px; padding: 78px 6vw; position: relative; overflow: hidden; }
        .rbk-wrap::before { content: ""; position: absolute; width: 440px; height: 440px; border-radius: 999px; background: rgba(236,72,153,.18); top: -150px; right: -130px; filter: blur(5px); }
        .rbk-wrap::after { content: ""; position: absolute; width: 330px; height: 330px; border: 1px solid rgba(15,23,42,.08); left: -120px; bottom: -130px; border-radius: 80px; transform: rotate(24deg); }
        .rbk-inner { width: min(1220px, 100%); margin: 0 auto; position: relative; z-index: 2; }
        .rbk-nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; margin-bottom: 46px; }
        .rbk-brand { display: flex; align-items: center; gap: 12px; font-weight: 950; letter-spacing: -0.03em; }
        .rbk-logo { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 15px; background: #92400e; color: #fff; font-weight: 950; box-shadow: 0 14px 34px rgba(0,0,0,.18); }
        .rbk-navlinks { display: flex; gap: 18px; flex-wrap: wrap; justify-content: flex-end; font-size: 14px; font-weight: 850; opacity: .72; }
        .rbk-hero { display: grid; grid-template-columns: 1.1fr .9fr; gap: 42px; align-items: center; }
        .rbk-hero h2 { margin: 0; color: #111827; font-family: "Libre Baskerville", sans-serif; font-size: clamp(40px, 5.5vw, 78px); line-height: .95; letter-spacing: -0.06em; }
        .rbk-hero p { max-width: 700px; margin: 22px 0 0; color: #111827; opacity: .78; font-size: 18px; line-height: 1.7; }
        .rbk-pills { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px; }
        .rbk-pill { padding: 10px 14px; border-radius: 999px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.1); font-size: 13px; font-weight: 900; }
        .rbk-product-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
        .rbk-product-mini { padding: 16px; border-radius: 22px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 14px 34px rgba(15,23,42,.06); }
        .rbk-product-mini b { display: block; color: #111827; margin-bottom: 6px; }
        .rbk-product-mini strong { display: block; color: #92400e; font-size: 28px; line-height: 1; letter-spacing: -0.06em; margin-bottom: 8px; }
        .rbk-product-mini span { color: #64748b; line-height: 1.45; }
        .rbk-btn-row { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 30px; }
        .rbk-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: #92400e; color: #fff; border: 0; cursor: pointer; font-weight: 950; font-family: inherit; box-shadow: 0 18px 46px rgba(15,23,42,.20); }
        .rbk-btn-sec { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 22px; border-radius: 999px; background: transparent; border: 1px solid currentColor; color: #111827; cursor: pointer; font-weight: 950; font-family: inherit; opacity: .8; }
        .rbk-media { position: relative; overflow: hidden; border-radius: 28px; background: white; box-shadow: 0 28px 90px rgba(15,23,42,.16); border: 1px solid rgba(255,255,255,.5); }
        .rbk-media img { display: block; width: 100%; height: 430px; object-fit: cover; }
        .rbk-media-note { position: absolute; left: 22px; right: 22px; bottom: 22px; padding: 18px; border-radius: 22px; background: rgba(255,255,255,.9); backdrop-filter: blur(16px); color: #0f172a; font-weight: 850; line-height: 1.45; box-shadow: 0 16px 48px rgba(15,23,42,.18); }
        .rbk-main-grid { display: grid; grid-template-columns: .92fr 1.08fr; gap: 24px; margin-top: 52px; }
        .rbk-panel { background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); border-radius: 26px; padding: 26px; box-shadow: 0 18px 50px rgba(15,23,42,.08); backdrop-filter: blur(14px); }
        .rbk-panel h3 { margin: 0 0 12px; color: #111827; font-size: 24px; letter-spacing: -0.035em; }
        .rbk-panel p { margin: 0; color: #64748b; line-height: 1.65; }
        .rbk-showcase { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 16px; }
        .rbk-product-card { overflow: hidden; border-radius: 24px; background: rgba(255,255,255,.72); border: 1px solid rgba(15,23,42,.08); cursor: pointer; }
        .rbk-product-card img { display: block; width: 100%; height: 150px; object-fit: cover; }
        .rbk-product-card div { padding: 14px; }
        .rbk-product-card b { display: block; margin-bottom: 5px; color: #111827; }
        .rbk-product-card span { color: #64748b; line-height: 1.45; }
        .rbk-info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
        .rbk-info { padding: 22px; border-radius: 24px; background: rgba(255,255,255,.84); border: 1px solid rgba(15,23,42,.08); box-shadow: 0 16px 42px rgba(15,23,42,.07); }
        .rbk-info b { display: block; color: #111827; margin-bottom: 9px; }
        .rbk-info p { margin: 0; color: #64748b; line-height: 1.6; }
        .rbk-review { padding: 24px; border-radius: 26px; background: #92400e; color: #fff; box-shadow: 0 18px 50px rgba(15,23,42,.16); margin-top: 24px; }
        .rbk-review h3 { margin: 0 0 12px; font-size: 28px; letter-spacing: -0.04em; }
        .rbk-review p { margin: 0; line-height: 1.65; opacity: .92; }
        .rbk-verified { display: inline-block; color: #92400e; font-size: 16px; margin-left: 10px; vertical-align: middle; }
        @media (max-width: 800px) {
          .rbk-hero, .rbk-main-grid { grid-template-columns: 1fr !important; }
          .rbk-product-strip, .rbk-showcase, .rbk-info-grid { grid-template-columns: 1fr; }
          .rbk-media img { height: 340px; }
          .rbk-product-card img { height: 220px; }
          .rbk-nav { align-items: flex-start; flex-direction: column; }
          .rbk-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 520px) {
          .rbk-wrap { padding: 64px 5vw; }
          .rbk-hero h2 { font-size: 40px; }
          .rbk-panel, .rbk-review, .rbk-info { padding: 20px; }
          .rbk-media-note { position: static; margin: -48px 18px 18px; }
        }`}</style>
      <section className="rbk-wrap">
        <div className="rbk-inner">
          <nav className="rbk-nav">
            <div className="rbk-brand">
              <span className="rbk-logo">{name.charAt(0)}</span>
              {name}
              {verified && <span className="rbk-verified">&#10003;</span>}
            </div>
            <div className="rbk-navlinks"><span>Products</span><span>Hours</span><span>Promotions</span><span>Reviews</span></div>
          </nav>

          <div className="rbk-hero">
            <div>
              <div className="rbk-pills">
                {specialties.slice(0, 3).map((s, i) => (
                  <span key={i} className="rbk-pill">{s}</span>
                ))}
              </div>
              <h2>{tagline || `Curated ${specialties[0] || "photography"} for every occasion.`}</h2>
              {bio && <p>{bio}</p>}
              {priceLabel && (
                <div className="rbk-product-strip">
                  {specialties.slice(0, 3).map((s, i) => (
                    <div key={i} className="rbk-product-mini">
                      <b>{s}</b>
                      {i === 0 && priceLabel && <strong>{priceLabel}</strong>}
                      <span>Photography service</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="rbk-btn-row">
                <button className="rbk-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="rbk-btn-sec" onClick={() => onPhotoClick(0)}>View Portfolio</button>
              </div>
            </div>
            <div className="rbk-media">
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="rbk-media-note">{specialties.join(" · ")}</div>
            </div>
          </div>

          <div className="rbk-main-grid">
            <div className="rbk-panel">
              <h3>Portfolio Showcase</h3>
              <p>Browse this photographer's recent work and featured projects.</p>
              <div className="rbk-showcase">
                {restPhotos.slice(0, 3).map((photo, i) => (
                  <div key={photo.id} className="rbk-product-card" onClick={() => onPhotoClick(i + 1)}>
                    <img src={photo.url} alt={photo.filename} loading="lazy" />
                    <div>
                      <b>{specialties[i] || "Photography"}</b>
                      <span>{photo.filename}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rbk-panel">
              <h3>Work With Me</h3>
              <p>{bio || "Professional photographer available for bookings. Reach out to discuss your project."}</p>
              <div className="rbk-btn-row">
                <button className="rbk-btn" onClick={onHire}>Hire Me</button>
                <button className="rbk-btn-sec" onClick={() => onPhotoClick(0)}>Browse Gallery</button>
              </div>
            </div>
          </div>

          <div className="rbk-info-grid">
            <div className="rbk-info">
              <b>Location</b>
              <p>{serviceArea}</p>
            </div>
            <div className="rbk-info">
              <b>{verified ? "Verified Pro" : "Availability"}</b>
              <p>{verified ? "This photographer has been verified by FrameNest for quality and reliability." : "Available for new bookings. Contact for scheduling."}</p>
            </div>
            <div className="rbk-info">
              <b>Specialties</b>
              <p>{specialties.join(", ")}</p>
            </div>
          </div>

          <div className="rbk-review">
            <h3>Client Review</h3>
            <p>"Incredible eye for detail and a wonderful experience from booking to delivery."</p>
          </div>
        </div>
      </section>
    </>
  );
}
