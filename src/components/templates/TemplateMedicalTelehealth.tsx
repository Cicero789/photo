import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalTelehealth({
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
    const id = "font-medical-telehealth";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        .tmd-telehealth-wrap{background:radial-gradient(circle at 80% 12%,rgba(6,182,212,.3),transparent 28%),linear-gradient(135deg,#020617,#0f172a 48%,#083344);color:#fff;font-family:'Inter',sans-serif;min-height:100vh;position:relative;overflow-x:hidden}
        .tmd-telehealth-wrap *{box-sizing:border-box}
        .tmd-telehealth-orb{position:fixed;width:420px;height:420px;border-radius:50%;background:rgba(6,182,212,.2);filter:blur(100px);top:-80px;right:-60px;pointer-events:none;z-index:0}
        .tmd-telehealth-nav{display:flex;align-items:center;gap:16px;padding:18px 36px;position:relative;z-index:1;border-bottom:1px solid rgba(255,255,255,.15)}
        .tmd-telehealth-logo{width:38px;height:38px;border-radius:50%;background:#22d3ee;color:#062f3a;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;flex-shrink:0}
        .tmd-telehealth-nav-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;color:#fff;margin-right:auto}
        .tmd-telehealth-nav-link{font-size:13px;font-weight:600;color:#cbd5e1;cursor:pointer;text-decoration:none;transition:color .2s}
        .tmd-telehealth-nav-link:hover{color:#22d3ee}
        .tmd-telehealth-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:48px 36px 40px;position:relative;z-index:1;align-items:center}
        .tmd-telehealth-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .tmd-telehealth-pill{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);color:#cffafe;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 14px;border-radius:20px}
        .tmd-telehealth-h2{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(32px,5.5vw,56px);line-height:1.1;color:#fff;margin:0 0 14px}
        .tmd-telehealth-verified{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#22c55e;color:#fff;font-size:14px;margin-left:10px;vertical-align:middle;line-height:1}
        .tmd-telehealth-tagline{font-size:15px;color:#cffafe;line-height:1.65;margin:0 0 8px;max-width:520px}
        .tmd-telehealth-bio{font-size:14px;color:#cbd5e1;line-height:1.7;margin:0 0 20px;max-width:520px}
        .tmd-telehealth-stats{display:flex;gap:24px;margin-bottom:22px}
        .tmd-telehealth-stat{font-size:12px;color:#cbd5e1;font-weight:600}
        .tmd-telehealth-stat strong{color:#fff;font-weight:700}
        .tmd-telehealth-hire{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;background:#22d3ee;color:#062f3a;border:none;border-radius:10px;padding:14px 36px;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(34,211,238,.3)}
        .tmd-telehealth-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(34,211,238,.45)}
        .tmd-telehealth-media{border-radius:34px;overflow:hidden;background:rgba(255,255,255,.08);box-shadow:0 4px 24px rgba(0,0,0,.2);cursor:pointer;position:relative;padding:22px}
        .tmd-telehealth-media::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#22d3ee,transparent);border-radius:34px 34px 0 0}
        .tmd-telehealth-media img{width:100%;height:400px;object-fit:cover;display:block;border-radius:20px}
        .tmd-telehealth-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-telehealth-panel{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:16px;padding:28px;backdrop-filter:blur(8px)}
        .tmd-telehealth-panel h3{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:#fff;margin:0 0 10px}
        .tmd-telehealth-panel p{font-size:13px;color:#cbd5e1;line-height:1.65;margin:0}
        .tmd-telehealth-info{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-telehealth-info-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:24px;text-align:center;backdrop-filter:blur(8px)}
        .tmd-telehealth-info-card h4{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:15px;color:#fff;margin:0 0 6px}
        .tmd-telehealth-info-card p{font-size:12px;color:#cbd5e1;line-height:1.6;margin:0}
        .tmd-telehealth-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 36px 48px;position:relative;z-index:1}
        .tmd-telehealth-gallery-item{border-radius:14px;overflow:hidden;cursor:pointer;background:rgba(255,255,255,.08);box-shadow:0 2px 12px rgba(0,0,0,.15);transition:transform .2s,box-shadow .2s}
        .tmd-telehealth-gallery-item:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.25)}
        .tmd-telehealth-gallery-item img{width:100%;height:280px;object-fit:cover;display:block}
        .tmd-telehealth-footer{text-align:center;padding:28px 36px 36px;position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.15)}
        .tmd-telehealth-footer a{color:#22d3ee;text-decoration:none;font-weight:700;font-size:13px}
        @media(max-width:980px){
          .tmd-telehealth-hero{grid-template-columns:1fr}
          .tmd-telehealth-main{grid-template-columns:1fr}
          .tmd-telehealth-info{grid-template-columns:1fr}
          .tmd-telehealth-gallery{grid-template-columns:1fr 1fr}
        }
        @media(max-width:620px){
          .tmd-telehealth-nav{padding:14px 20px}
          .tmd-telehealth-hero{padding:32px 20px 28px}
          .tmd-telehealth-h2{font-size:28px}
          .tmd-telehealth-main{padding:0 20px 28px}
          .tmd-telehealth-info{padding:0 20px 28px;grid-template-columns:1fr}
          .tmd-telehealth-gallery{grid-template-columns:1fr;padding:0 20px 32px}
          .tmd-telehealth-footer{padding:20px}
        }
      `}</style>

      <div className="tmd-telehealth-wrap">
        <div className="tmd-telehealth-orb" />

        <nav className="tmd-telehealth-nav">
          <div className="tmd-telehealth-logo">{name.charAt(0)}</div>
          <span className="tmd-telehealth-nav-name">{name}</span>
          <a href="#portfolio" className="tmd-telehealth-nav-link">Portfolio</a>
          <a href="#about" className="tmd-telehealth-nav-link">About</a>
          <a href="#hire" className="tmd-telehealth-nav-link" onClick={(e) => { e.preventDefault(); onHire(); }}>Hire</a>
        </nav>

        <section className="tmd-telehealth-hero">
          <div>
            <div className="tmd-telehealth-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-telehealth-pill">{s}</span>
              ))}
            </div>
            <h2 className="tmd-telehealth-h2">
              {name}
              {verified && <span className="tmd-telehealth-verified">&#10003;</span>}
            </h2>
            <p className="tmd-telehealth-tagline">{tagline}</p>
            <p className="tmd-telehealth-bio">{bio}</p>
            <div className="tmd-telehealth-stats">
              <span className="tmd-telehealth-stat"><strong>Area:</strong> {serviceArea}</span>
              {priceLabel && <span className="tmd-telehealth-stat"><strong>Pricing:</strong> {priceLabel}</span>}
            </div>
            <button className="tmd-telehealth-hire" onClick={onHire}>Hire Me</button>
          </div>
          {heroPhoto && (
            <div className="tmd-telehealth-media" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
        </section>

        <section className="tmd-telehealth-main" id="about">
          <div className="tmd-telehealth-panel">
            <h3>About My Practice</h3>
            <p>{bio}</p>
          </div>
          <div className="tmd-telehealth-panel">
            <h3>Specialties &amp; Services</h3>
            <p>{specialties.join(" • ")}</p>
          </div>
        </section>

        <section className="tmd-telehealth-info">
          <div className="tmd-telehealth-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea}</p>
          </div>
          <div className="tmd-telehealth-info-card">
            <h4>Pricing</h4>
            <p>{priceLabel ?? "Contact for rates"}</p>
          </div>
          <div className="tmd-telehealth-info-card">
            <h4>Website</h4>
            <p>{website || "N/A"}</p>
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="tmd-telehealth-gallery" id="portfolio">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-telehealth-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </section>
        )}

        <footer className="tmd-telehealth-footer">
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
