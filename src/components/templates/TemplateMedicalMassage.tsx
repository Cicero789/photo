import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalMassage({
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
    const id = "font-medical-massage";
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
        .tmd-massage-wrap{background:linear-gradient(135deg,#fff1f2,#fff 50%,#fce7f3);color:#111827;font-family:'Inter',sans-serif;min-height:100vh;position:relative;overflow-x:hidden}
        .tmd-massage-wrap *{box-sizing:border-box}
        .tmd-massage-orb{position:fixed;width:420px;height:420px;border-radius:50%;background:rgba(244,114,182,.22);filter:blur(100px);top:-80px;right:-60px;pointer-events:none;z-index:0}
        .tmd-massage-nav{display:flex;align-items:center;gap:16px;padding:18px 36px;position:relative;z-index:1;border-bottom:1px solid rgba(15,23,42,.08)}
        .tmd-massage-logo{width:38px;height:38px;border-radius:50%;background:#9f1239;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-weight:800;font-size:18px;flex-shrink:0}
        .tmd-massage-nav-name{font-family:'Playfair Display',serif;font-weight:700;font-size:17px;color:#111827;margin-right:auto}
        .tmd-massage-nav-link{font-size:13px;font-weight:600;color:#64748b;cursor:pointer;text-decoration:none;transition:color .2s}
        .tmd-massage-nav-link:hover{color:#9f1239}
        .tmd-massage-hero{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;padding:48px 36px 40px;position:relative;z-index:1;align-items:center}
        .tmd-massage-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
        .tmd-massage-pill{background:rgba(159,18,57,.1);border:1px solid rgba(159,18,57,.22);color:#9f1239;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;padding:5px 14px;border-radius:20px}
        .tmd-massage-h2{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(32px,5.5vw,56px);line-height:1.1;color:#111827;margin:0 0 14px}
        .tmd-massage-verified{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#22c55e;color:#fff;font-size:14px;margin-left:10px;vertical-align:middle;line-height:1}
        .tmd-massage-tagline{font-size:15px;color:#64748b;line-height:1.65;margin:0 0 8px;max-width:520px}
        .tmd-massage-bio{font-size:14px;color:#64748b;line-height:1.7;margin:0 0 20px;max-width:520px}
        .tmd-massage-stats{display:flex;gap:24px;margin-bottom:22px}
        .tmd-massage-stat{font-size:12px;color:#64748b;font-weight:600}
        .tmd-massage-stat strong{color:#111827;font-weight:700}
        .tmd-massage-hire{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;background:#9f1239;color:#fff;border:none;border-radius:10px;padding:14px 36px;cursor:pointer;transition:transform .15s,box-shadow .15s;box-shadow:0 4px 16px rgba(159,18,57,.25)}
        .tmd-massage-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(159,18,57,.35)}
        .tmd-massage-media{border-radius:44px;overflow:hidden;background:rgba(255,255,255,.8);box-shadow:0 4px 24px rgba(0,0,0,.07);cursor:pointer;position:relative}
        .tmd-massage-media img{width:100%;height:440px;object-fit:cover;display:block;border-radius:44px}
        .tmd-massage-main{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-massage-panel{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:16px;padding:28px;backdrop-filter:blur(8px)}
        .tmd-massage-panel h3{font-family:'Playfair Display',serif;font-weight:800;font-size:18px;color:#111827;margin:0 0 10px}
        .tmd-massage-panel p{font-size:13px;color:#64748b;line-height:1.65;margin:0}
        .tmd-massage-info{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 40px;position:relative;z-index:1}
        .tmd-massage-info-card{background:rgba(255,255,255,.8);border:1px solid rgba(15,23,42,.08);border-radius:14px;padding:24px;text-align:center;backdrop-filter:blur(8px)}
        .tmd-massage-info-card h4{font-family:'Playfair Display',serif;font-weight:700;font-size:15px;color:#111827;margin:0 0 6px}
        .tmd-massage-info-card p{font-size:12px;color:#64748b;line-height:1.6;margin:0}
        .tmd-massage-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:0 36px 48px;position:relative;z-index:1}
        .tmd-massage-gallery-item{border-radius:44px;overflow:hidden;cursor:pointer;background:rgba(255,255,255,.8);box-shadow:0 2px 12px rgba(0,0,0,.06);transition:transform .2s,box-shadow .2s}
        .tmd-massage-gallery-item:hover{transform:translateY(-3px);box-shadow:0 6px 20px rgba(0,0,0,.1)}
        .tmd-massage-gallery-item img{width:100%;height:280px;object-fit:cover;display:block}
        .tmd-massage-footer{text-align:center;padding:28px 36px 36px;position:relative;z-index:1;border-top:1px solid rgba(15,23,42,.08)}
        .tmd-massage-footer a{color:#9f1239;text-decoration:none;font-weight:700;font-size:13px}
        @media(max-width:980px){
          .tmd-massage-hero{grid-template-columns:1fr}
          .tmd-massage-main{grid-template-columns:1fr}
          .tmd-massage-info{grid-template-columns:1fr}
          .tmd-massage-gallery{grid-template-columns:1fr 1fr}
        }
        @media(max-width:620px){
          .tmd-massage-nav{padding:14px 20px}
          .tmd-massage-hero{padding:32px 20px 28px}
          .tmd-massage-h2{font-size:28px}
          .tmd-massage-main{padding:0 20px 28px}
          .tmd-massage-info{padding:0 20px 28px;grid-template-columns:1fr}
          .tmd-massage-gallery{grid-template-columns:1fr;padding:0 20px 32px}
          .tmd-massage-footer{padding:20px}
        }
      `}</style>

      <div className="tmd-massage-wrap">
        <div className="tmd-massage-orb" />

        <nav className="tmd-massage-nav">
          <div className="tmd-massage-logo">{name.charAt(0)}</div>
          <span className="tmd-massage-nav-name">{name}</span>
          <a href="#portfolio" className="tmd-massage-nav-link">Portfolio</a>
          <a href="#about" className="tmd-massage-nav-link">About</a>
          <a href="#hire" className="tmd-massage-nav-link" onClick={(e) => { e.preventDefault(); onHire(); }}>Hire</a>
        </nav>

        <section className="tmd-massage-hero">
          <div>
            <div className="tmd-massage-pills">
              {specialties.map((s) => (
                <span key={s} className="tmd-massage-pill">{s}</span>
              ))}
            </div>
            <h2 className="tmd-massage-h2">
              {name}
              {verified && <span className="tmd-massage-verified">&#10003;</span>}
            </h2>
            <p className="tmd-massage-tagline">{tagline}</p>
            <p className="tmd-massage-bio">{bio}</p>
            <div className="tmd-massage-stats">
              <span className="tmd-massage-stat"><strong>Area:</strong> {serviceArea}</span>
              {priceLabel && <span className="tmd-massage-stat"><strong>Pricing:</strong> {priceLabel}</span>}
            </div>
            <button className="tmd-massage-hire" onClick={onHire}>Hire Me</button>
          </div>
          {heroPhoto && (
            <div className="tmd-massage-media" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} />
            </div>
          )}
        </section>

        <section className="tmd-massage-main" id="about">
          <div className="tmd-massage-panel">
            <h3>About My Practice</h3>
            <p>{bio}</p>
          </div>
          <div className="tmd-massage-panel">
            <h3>Specialties &amp; Services</h3>
            <p>{specialties.join(" • ")}</p>
          </div>
        </section>

        <section className="tmd-massage-info">
          <div className="tmd-massage-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea}</p>
          </div>
          <div className="tmd-massage-info-card">
            <h4>Pricing</h4>
            <p>{priceLabel ?? "Contact for rates"}</p>
          </div>
          <div className="tmd-massage-info-card">
            <h4>Website</h4>
            <p>{website || "N/A"}</p>
          </div>
        </section>

        {galleryPhotos.length > 0 && (
          <section className="tmd-massage-gallery" id="portfolio">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tmd-massage-gallery-item"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} />
              </div>
            ))}
          </section>
        )}

        <footer className="tmd-massage-footer">
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
