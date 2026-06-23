import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalSpecialist({
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
    const id = "font-medical-specialist";
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
        .tmd-specialist-wrap{background:linear-gradient(135deg,#0b1220,#111827 55%,#172554);color:#fff;font-family:'Inter',sans-serif;min-height:100vh;position:relative;overflow-x:hidden}
        .tmd-specialist-wrap *{box-sizing:border-box}
        .tmd-specialist-orb{position:fixed;width:420px;height:420px;border-radius:50%;background:rgba(96,165,250,.18);filter:blur(100px);top:-80px;right:-60px;pointer-events:none;z-index:0}
        .tmd-specialist-nav{display:flex;align-items:center;gap:16px;padding:18px 36px;position:relative;z-index:1;border-bottom:1px solid rgba(255,255,255,.15)}
        .tmd-specialist-logo{width:38px;height:38px;border-radius:50%;background:#60a5fa;color:#07111f;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:800;font-size:18px;flex-shrink:0}
        .tmd-specialist-nav-name{font-family:'Playfair Display',serif;font-weight:700;font-size:17px;color:#fff;margin-right:auto}
        .tmd-specialist-nav-link{font-size:13px;font-weight:600;color:#cbd5e1;cursor:pointer;text-decoration:none;transition:color .2s}
        .tmd-specialist-nav-link:hover{color:#60a5fa}
        .tmd-specialist-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:48px 36px 40px;position:relative;z-index:1;align-items:center}
        .tmd-specialist-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .tmd-specialist-pill{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#dbeafe;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 14px;border-radius:20px}
        .tmd-specialist-h2{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(32px,5.5vw,56px);line-height:1.1;color:#fff;margin:0 0 14px}
        .tmd-specialist-verified{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#22c55e;color:#fff;font-size:14px;margin-left:10px;vertical-align:middle;line-height:1}
        .tmd-specialist-tagline{font-size:15px;color:#dbeafe;line-height:1.65;margin:0 0 8px;max-width:520px}
        .tmd-specialist-bio{font-size:14px;color:#cbd5e1;line-height:1.7;margin:0 0 20px;max-width:520px}
        .tmd-specialist-stats{display:flex;gap:24px;margin-bottom:22px}
        .tmd-specialist-stat{font-size:12px;color:#cbd5e1;font-weight:600}
        .tmd-specialist-stat strong{color:#fff;font-weight:700}
        .tmd-specialist-hire{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;background:#60a5fa;color:#07111f;border:none;border-radius:10px;padding:14px 36px;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(96,165,250,.3)}
        .tmd-specialist-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(96,165,250,.45)}
        .tmd-specialist-media{border-radius:18px;overflow:hidden;background:rgba(255,255,255,.08);box-shadow:0 4px 24px rgba(0,0,0,.2);cursor:pointer;position:relative}
        .tmd-specialist-media img{width:100%;height:440px;object-fit:cover;display:block}
        .tmd-specialist-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-specialist-panel{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:28px;backdrop-filter:blur(8px)}
        .tmd-specialist-panel h3{font-family:'Playfair Display',serif;font-weight:800;font-size:18px;color:#fff;margin:0 0 10px}
        .tmd-specialist-panel p{font-size:13px;color:#cbd5e1;line-height:1.65;margin:0}
        .tmd-specialist-info{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-specialist-info-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:24px;text-align:center;backdrop-filter:blur(8px)}
        .tmd-specialist-info-card h4{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;color:#fff;margin:0 0 6px}
        .tmd-specialist-info-card p{font-size:12px;color:#cbd5e1;line-height:1.6;margin:0}
        .tmd-specialist-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 36px 48px;position:relative;z-index:1}
        .tmd-specialist-gallery-item{border-radius:14px;overflow:hidden;cursor:pointer;background:rgba(255,255,255,.08);box-shadow:0 2px 12px rgba(0,0,0,.15);transition:transform .2s,box-shadow .2s}
        .tmd-specialist-gallery-item:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.25)}
        .tmd-specialist-gallery-item img{width:100%;height:280px;object-fit:cover;display:block}
        .tmd-specialist-footer{text-align:center;padding:28px 36px 36px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.15)}
        .tmd-specialist-footer a{color:#60a5fa;text-decoration:none;font-weight:700;font-size:13px}
        @media(max-width:980px){
          .tmd-specialist-hero{grid-template-columns:1fr}
          .tmd-specialist-main{grid-template-columns:1fr}
          .tmd-specialist-info{grid-template-columns:1fr}
          .tmd-specialist-gallery{grid-template-columns:1fr 1fr}
        }
        @media(max-width:620px){
          .tmd-specialist-nav{padding:14px 20px}
          .tmd-specialist-hero{padding:32px 20px 28px}
          .tmd-specialist-h2{font-size:28px}
          .tmd-specialist-main{padding:0 20px 28px}
          .tmd-specialist-info{padding:0 20px 28px;grid-template-columns:1fr}
          .tmd-specialist-gallery{grid-template-columns:1fr;padding:0 20px 32px}
          .tmd-specialist-footer{padding:20px}
        }
      `}</style>

      <div className="tmd-specialist-wrap">
        <div className="tmd-specialist-orb" />

        <nav className="tmd-specialist-nav">
          <div className="tmd-specialist-logo">{name.charAt(0)}</div>
          <span className="tmd-specialist-nav-name">{name}</span>
          <a href="#portfolio" className="tmd-specialist-nav-link">Portfolio</a>
          <a href="#about" className="tmd-specialist-nav-link">About</a>
          <a href="#hire" className="tmd-specialist-nav-link" onClick={(e) => { e.preventDefault(); onHire(); }}>Hire</a>
        </nav>

        <section className="tmd-specialist-hero">
          <div>
            <div className="tmd-specialist-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-specialist-pill">{s}</span>
              ))}
            </div>
            <h2 className="tmd-specialist-h2">
              {name}
              {verified && <span className="tmd-specialist-verified">&#10003;</span>}
            </h2>
            <p className="tmd-specialist-tagline">{tagline}</p>
            <p className="tmd-specialist-bio">{bio}</p>
            <div className="tmd-specialist-stats">
              <span className="tmd-specialist-stat"><strong>Area:</strong> {serviceArea}</span>
              {priceLabel && <span className="tmd-specialist-stat"><strong>Pricing:</strong> {priceLabel}</span>}
            </div>
            <button className="tmd-specialist-hire" onClick={onHire}>Hire Me</button>
          </div>
          {heroPhoto && (
            <div className="tmd-specialist-media" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
        </section>

        <section className="tmd-specialist-main" id="about">
          <div className="tmd-specialist-panel">
            <h3>About My Practice</h3>
            <p>{bio}</p>
          </div>
          <div className="tmd-specialist-panel">
            <h3>Specialties &amp; Services</h3>
            <p>{specialties.join(" • ")}</p>
          </div>
        </section>

        <section className="tmd-specialist-info">
          <div className="tmd-specialist-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea}</p>
          </div>
          <div className="tmd-specialist-info-card">
            <h4>Pricing</h4>
            <p>{priceLabel ?? "Contact for rates"}</p>
          </div>
          <div className="tmd-specialist-info-card">
            <h4>Website</h4>
            <p>{website || "N/A"}</p>
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="tmd-specialist-gallery" id="portfolio">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-specialist-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </section>
        )}

        <footer className="tmd-specialist-footer">
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
