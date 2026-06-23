import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalNutrition({
  name,
  tagline,
  specialties,
  bio,
  website,
  serviceArea,
  verified,
  pricing,
  portfolio,
  onHire,
  onPhotoClick,
}: TemplateProps) {
  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;
  const heroPhoto = portfolio?.[0];
  const galleryPhotos = portfolio.slice(1);

  useEffect(() => {
    const id = "font-medical-nutrition";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        .tmd-nutrition-wrap{background:linear-gradient(135deg,#f0fdf4,#ffffff 44%,#dcfce7);color:#111827;font-family:'Inter',sans-serif;min-height:100vh;position:relative;overflow-x:hidden}
        .tmd-nutrition-wrap *{box-sizing:border-box}
        .tmd-nutrition-orb{position:fixed;width:420px;height:420px;border-radius:50%;background:rgba(22,163,74,.23);filter:blur(100px);top:-80px;right:-60px;pointer-events:none;z-index:0}
        .tmd-nutrition-nav{display:flex;align-items:center;gap:16px;padding:18px 36px;position:relative;z-index:1;border-bottom:1px solid rgba(15,23,42,.08)}
        .tmd-nutrition-logo{width:38px;height:38px;border-radius:50%;background:#16a34a;color:#052e16;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:800;font-size:18px;flex-shrink:0}
        .tmd-nutrition-nav-name{font-family:'Playfair Display',serif;font-weight:700;font-size:17px;color:#111827;margin-right:auto}
        .tmd-nutrition-nav-link{font-size:13px;font-weight:600;color:#64748b;cursor:pointer;text-decoration:none;transition:color .2s}
        .tmd-nutrition-nav-link:hover{color:#16a34a}
        .tmd-nutrition-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:48px 36px 40px;position:relative;z-index:1;align-items:center}
        .tmd-nutrition-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .tmd-nutrition-pill{background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.22);color:#16a34a;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 14px;border-radius:20px}
        .tmd-nutrition-h2{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(32px,5.5vw,56px);line-height:1.1;color:#111827;margin:0 0 14px}
        .tmd-nutrition-verified{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#22c55e;color:#fff;font-size:14px;margin-left:10px;vertical-align:middle;line-height:1}
        .tmd-nutrition-tagline{font-size:15px;color:#64748b;line-height:1.65;margin:0 0 8px;max-width:520px}
        .tmd-nutrition-bio{font-size:14px;color:#64748b;line-height:1.7;margin:0 0 20px;max-width:520px}
        .tmd-nutrition-stats{display:flex;gap:24px;margin-bottom:22px}
        .tmd-nutrition-stat{font-size:12px;color:#64748b;font-weight:600}
        .tmd-nutrition-stat strong{color:#111827;font-weight:700}
        .tmd-nutrition-hire{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;background:#16a34a;color:#052e16;border:none;border-radius:10px;padding:14px 36px;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(22,163,74,.25)}
        .tmd-nutrition-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(22,163,74,.35)}
        .tmd-nutrition-media{border-radius:18px;overflow:hidden;background:rgba(255,255,255,.8);box-shadow:0 4px 24px rgba(0,0,0,.07);cursor:pointer;position:relative}
        .tmd-nutrition-media img{width:100%;height:440px;object-fit:cover;display:block}
        .tmd-nutrition-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-nutrition-panel{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:16px;padding:28px;backdrop-filter:blur(8px)}
        .tmd-nutrition-panel h3{font-family:'Playfair Display',serif;font-weight:800;font-size:18px;color:#111827;margin:0 0 10px}
        .tmd-nutrition-panel p{font-size:13px;color:#64748b;line-height:1.65;margin:0}
        .tmd-nutrition-info{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-nutrition-info-card{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:24px;text-align:center;backdrop-filter:blur(8px)}
        .tmd-nutrition-info-card h4{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;color:#111827;margin:0 0 6px}
        .tmd-nutrition-info-card p{font-size:12px;color:#64748b;line-height:1.6;margin:0}
        .tmd-nutrition-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 36px 48px;position:relative;z-index:1}
        .tmd-nutrition-gallery-item{border-radius:14px;overflow:hidden;cursor:pointer;background:rgba(255,255,255,.8);box-shadow:0 2px 12px rgba(0,0,0,.06);transition:transform .2s,box-shadow .2s}
        .tmd-nutrition-gallery-item:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.1)}
        .tmd-nutrition-gallery-item img{width:100%;height:280px;object-fit:cover;display:block;filter:saturate(1.08)}
        .tmd-nutrition-footer{text-align:center;padding:28px 36px 36px;position:relative;z-index:1;border-top:1px solid rgba(15,23,42,.08)}
        .tmd-nutrition-footer a{color:#16a34a;text-decoration:none;font-weight:700;font-size:13px}
        @media(max-width:980px){
          .tmd-nutrition-hero{grid-template-columns:1fr}
          .tmd-nutrition-main{grid-template-columns:1fr}
          .tmd-nutrition-info{grid-template-columns:1fr}
          .tmd-nutrition-gallery{grid-template-columns:1fr 1fr}
        }
        @media(max-width:620px){
          .tmd-nutrition-nav{padding:14px 20px}
          .tmd-nutrition-hero{padding:32px 20px 28px}
          .tmd-nutrition-h2{font-size:28px}
          .tmd-nutrition-main{padding:0 20px 28px}
          .tmd-nutrition-info{padding:0 20px 28px;grid-template-columns:1fr}
          .tmd-nutrition-gallery{grid-template-columns:1fr;padding:0 20px 32px}
          .tmd-nutrition-footer{padding:20px}
        }
      `}</style>

      <div className="tmd-nutrition-wrap">
        <div className="tmd-nutrition-orb" />

        <nav className="tmd-nutrition-nav">
          <div className="tmd-nutrition-logo">{name.charAt(0)}</div>
          <span className="tmd-nutrition-nav-name">{name}</span>
          <a href="#portfolio" className="tmd-nutrition-nav-link">Portfolio</a>
          <a href="#about" className="tmd-nutrition-nav-link">About</a>
          <a href="#hire" className="tmd-nutrition-nav-link" onClick={(e) => { e.preventDefault(); onHire(); }}>Hire</a>
        </nav>

        <section className="tmd-nutrition-hero">
          <div>
            <div className="tmd-nutrition-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-nutrition-pill">{s}</span>
              ))}
            </div>
            <h2 className="tmd-nutrition-h2">
              {name}
              {verified && <span className="tmd-nutrition-verified">&#10003;</span>}
            </h2>
            <p className="tmd-nutrition-tagline">{tagline}</p>
            <p className="tmd-nutrition-bio">{bio}</p>
            <div className="tmd-nutrition-stats">
              <span className="tmd-nutrition-stat"><strong>Area:</strong> {serviceArea}</span>
              {priceLabel && <span className="tmd-nutrition-stat"><strong>Pricing:</strong> {priceLabel}</span>}
            </div>
            <button className="tmd-nutrition-hire" onClick={onHire}>Hire Me</button>
          </div>
          {heroPhoto && (
            <div className="tmd-nutrition-media" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
        </section>

        <section className="tmd-nutrition-main" id="about">
          <div className="tmd-nutrition-panel">
            <h3>About My Practice</h3>
            <p>{bio}</p>
          </div>
          <div className="tmd-nutrition-panel">
            <h3>Specialties &amp; Services</h3>
            <p>{specialties.join(" • ")}</p>
          </div>
        </section>

        <section className="tmd-nutrition-info">
          <div className="tmd-nutrition-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea}</p>
          </div>
          <div className="tmd-nutrition-info-card">
            <h4>Pricing</h4>
            <p>{priceLabel ?? "Contact for rates"}</p>
          </div>
          <div className="tmd-nutrition-info-card">
            <h4>Website</h4>
            <p>{website || "N/A"}</p>
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="tmd-nutrition-gallery" id="portfolio">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-nutrition-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </section>
        )}

        <footer className="tmd-nutrition-footer">
          {website && (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {website}
            </a>
          )}
        </footer>
      </div>
    </>
  );
}
