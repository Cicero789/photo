import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalAcupuncture({
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
    const id = "font-medical-acu";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <>
      <style>{`
        .tmd-acu-wrap{background:linear-gradient(135deg,#faf7ef,#fff 48%,#f3e8d6);color:#111827;font-family:'Inter',sans-serif;min-height:100vh;position:relative;overflow-x:hidden}
        .tmd-acu-wrap *{box-sizing:border-box}
        .tmd-acu-orb{position:fixed;width:400px;height:400px;border-radius:50%;background:rgba(146,64,14,.18);filter:blur(100px);top:-60px;right:-40px;pointer-events:none;z-index:0}
        .tmd-acu-nav{display:flex;align-items:center;gap:16px;padding:18px 36px;position:relative;z-index:1;border-bottom:1px solid rgba(15,23,42,.08)}
        .tmd-acu-logo{width:38px;height:38px;border-radius:50%;background:#92400e;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Libre Baskerville',serif;font-weight:700;font-size:18px;flex-shrink:0}
        .tmd-acu-nav-name{font-family:'Libre Baskerville',serif;font-weight:700;font-size:17px;color:#111827;margin-right:auto}
        .tmd-acu-nav-link{font-size:13px;font-weight:600;color:#64748b;cursor:pointer;text-decoration:none;transition:color .2s}
        .tmd-acu-nav-link:hover{color:#92400e}
        .tmd-acu-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:48px 36px 40px;position:relative;z-index:1;align-items:center}
        .tmd-acu-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .tmd-acu-pill{background:rgba(146,64,14,.1);border:1px solid rgba(146,64,14,.22);color:#92400e;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 14px;border-radius:20px}
        .tmd-acu-h2{font-family:'Libre Baskerville',serif;font-weight:700;font-size:clamp(32px,5.5vw,56px);line-height:1.1;color:#111827;margin:0 0 14px}
        .tmd-acu-verified{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#22c55e;color:#fff;font-size:14px;margin-left:10px;vertical-align:middle;line-height:1}
        .tmd-acu-tagline{font-size:15px;color:#64748b;line-height:1.65;margin:0 0 8px;max-width:520px}
        .tmd-acu-bio{font-size:14px;color:#64748b;line-height:1.7;margin:0 0 20px;max-width:520px}
        .tmd-acu-stats{display:flex;gap:24px;margin-bottom:22px}
        .tmd-acu-stat{font-size:12px;color:#64748b;font-weight:600}
        .tmd-acu-stat strong{color:#111827;font-weight:700}
        .tmd-acu-hire{font-family:'Libre Baskerville',serif;font-weight:700;font-size:15px;background:#92400e;color:#fff;border:none;border-radius:10px;padding:14px 36px;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(146,64,14,.25)}
        .tmd-acu-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(146,64,14,.35)}
        .tmd-acu-media{border-radius:18px;overflow:hidden;background:rgba(255,255,255,.8);box-shadow:0 4px 24px rgba(0,0,0,.07);cursor:pointer;position:relative}
        .tmd-acu-media img{width:100%;height:440px;object-fit:cover;display:block}
        .tmd-acu-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-acu-panel{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:16px;padding:28px;backdrop-filter:blur(8px)}
        .tmd-acu-panel h3{font-family:'Libre Baskerville',serif;font-weight:700;font-size:18px;color:#111827;margin:0 0 10px}
        .tmd-acu-panel p{font-size:13px;color:#64748b;line-height:1.65;margin:0}
        .tmd-acu-info{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-acu-info-card{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:24px;text-align:center;backdrop-filter:blur(8px)}
        .tmd-acu-info-card h4{font-family:'Libre Baskerville',serif;font-weight:700;font-size:15px;color:#111827;margin:0 0 6px}
        .tmd-acu-info-card p{font-size:12px;color:#64748b;line-height:1.6;margin:0}
        .tmd-acu-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 36px 48px;position:relative;z-index:1}
        .tmd-acu-gallery-item{border-radius:14px;overflow:hidden;cursor:pointer;background:rgba(255,255,255,.8);box-shadow:0 2px 12px rgba(0,0,0,.06);transition:transform .2s,box-shadow .2s}
        .tmd-acu-gallery-item:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.1)}
        .tmd-acu-gallery-item img{width:100%;height:280px;object-fit:cover;display:block}
        .tmd-acu-footer{text-align:center;padding:28px 36px 36px;position:relative;z-index:1;border-top:1px solid rgba(15,23,42,.08)}
        .tmd-acu-footer a{color:#92400e;text-decoration:none;font-weight:700;font-size:13px}
        @media(max-width:980px){
          .tmd-acu-hero{grid-template-columns:1fr}
          .tmd-acu-main{grid-template-columns:1fr}
          .tmd-acu-info{grid-template-columns:1fr}
          .tmd-acu-gallery{grid-template-columns:1fr 1fr}
        }
        @media(max-width:620px){
          .tmd-acu-nav{padding:14px 20px}
          .tmd-acu-hero{padding:32px 20px 28px}
          .tmd-acu-h2{font-size:28px}
          .tmd-acu-main{padding:0 20px 28px}
          .tmd-acu-info{padding:0 20px 28px;grid-template-columns:1fr}
          .tmd-acu-gallery{grid-template-columns:1fr;padding:0 20px 32px}
          .tmd-acu-footer{padding:20px}
        }
      `}</style>

      <div className="tmd-acu-wrap">
        <div className="tmd-acu-orb" />

        <nav className="tmd-acu-nav">
          <div className="tmd-acu-logo">{name.charAt(0)}</div>
          <span className="tmd-acu-nav-name">{name}</span>
          <a href="#portfolio" className="tmd-acu-nav-link">Portfolio</a>
          <a href="#about" className="tmd-acu-nav-link">About</a>
          <a href="#hire" className="tmd-acu-nav-link" onClick={(e) => { e.preventDefault(); onHire(); }}>Hire</a>
        </nav>

        <section className="tmd-acu-hero">
          <div>
            <div className="tmd-acu-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-acu-pill">{s}</span>
              ))}
            </div>
            <h2 className="tmd-acu-h2">
              {name}
              {verified && <span className="tmd-acu-verified">&#10003;</span>}
            </h2>
            <p className="tmd-acu-tagline">{tagline}</p>
            <p className="tmd-acu-bio">{bio}</p>
            <div className="tmd-acu-stats">
              <span className="tmd-acu-stat"><strong>Area:</strong> {serviceArea}</span>
              {priceLabel && <span className="tmd-acu-stat"><strong>Pricing:</strong> {priceLabel}</span>}
            </div>
            <button className="tmd-acu-hire" onClick={onHire}>Hire Me</button>
          </div>
          {heroPhoto && (
            <div className="tmd-acu-media" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
        </section>

        <section className="tmd-acu-main" id="about">
          <div className="tmd-acu-panel">
            <h3>About My Practice</h3>
            <p>{bio}</p>
          </div>
          <div className="tmd-acu-panel">
            <h3>Specialties &amp; Services</h3>
            <p>{specialties.join(" • ")}</p>
          </div>
        </section>

        <section className="tmd-acu-info">
          <div className="tmd-acu-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea}</p>
          </div>
          <div className="tmd-acu-info-card">
            <h4>Pricing</h4>
            <p>{priceLabel ?? "Contact for rates"}</p>
          </div>
          <div className="tmd-acu-info-card">
            <h4>Website</h4>
            <p>{website || "N/A"}</p>
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="tmd-acu-gallery" id="portfolio">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-acu-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </section>
        )}

        <footer className="tmd-acu-footer">
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
