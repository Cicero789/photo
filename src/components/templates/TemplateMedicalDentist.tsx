import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalDentist(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-medical-dental";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Inter:wght@400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const galleryPhotos = portfolio.slice(1);

  return (
    <>
      <style>{`
        .tmd-dental {
          font-family: Inter, system-ui, -apple-system, sans-serif;
          color: #111827;
          background: linear-gradient(135deg, #ecfeff, #ffffff 48%, #f0fdf4);
          min-height: 600px;
          padding: 78px 6vw;
          position: relative;
          overflow: hidden;
        }
        .tmd-dental::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background: rgba(34,211,238,.25);
          top: -140px;
          right: -120px;
          filter: blur(6px);
          pointer-events: none;
          z-index: 0;
        }
        .tmd-dental::after {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 80px;
          border: 1px solid rgba(15,23,42,.08);
          left: -90px;
          bottom: -110px;
          transform: rotate(22deg);
          pointer-events: none;
          z-index: 0;
        }
        .tmd-dental-wrap {
          width: min(1200px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .tmd-dental-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          margin-bottom: 46px;
        }
        .tmd-dental-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .tmd-dental-logo {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: #06b6d4;
          color: #062f3a;
          box-shadow: 0 14px 32px rgba(15,23,42,.18);
          font-weight: 950;
          font-size: 18px;
        }
        .tmd-dental-navlinks {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 18px;
          font-weight: 800;
          font-size: 14px;
          opacity: 0.72;
        }
        .tmd-dental-navlinks span { cursor: pointer; }
        .tmd-dental-hero {
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          gap: 42px;
          align-items: center;
        }
        .tmd-dental-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .tmd-dental-pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.1);
          font-weight: 900;
          font-size: 13px;
        }
        .tmd-dental-hero h2 {
          margin: 0;
          font-family: Nunito, sans-serif;
          font-size: clamp(40px, 5.5vw, 78px);
          line-height: 0.95;
          letter-spacing: -0.06em;
          color: #111827;
        }
        .tmd-dental-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #06b6d4;
          color: #062f3a;
          font-size: 14px;
          margin-left: 12px;
          vertical-align: middle;
        }
        .tmd-dental-hero p {
          max-width: 690px;
          margin: 22px 0 0;
          font-size: 18px;
          line-height: 1.72;
          color: #111827;
          opacity: 0.78;
        }
        .tmd-dental-statbar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 28px;
        }
        .tmd-dental-stat {
          border-radius: 22px;
          padding: 18px;
          background: rgba(255,255,255,.8);
          border: 1px solid rgba(15,23,42,.08);
          box-shadow: 0 14px 34px rgba(15,23,42,.06);
        }
        .tmd-dental-stat strong {
          display: block;
          font-size: 32px;
          line-height: 1;
          letter-spacing: -0.06em;
          color: #06b6d4;
        }
        .tmd-dental-btnrow {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 30px;
        }
        .tmd-dental-btn {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border-radius: 999px;
          background: #06b6d4;
          color: #062f3a;
          font-weight: 950;
          font-family: inherit;
          font-size: inherit;
          border: none;
          cursor: pointer;
          box-shadow: 0 18px 46px rgba(15,23,42,.18);
          transition: transform 0.25s, background 0.25s;
        }
        .tmd-dental-btn:hover { transform: translateY(-2px); }
        .tmd-dental-btn.secondary {
          background: transparent;
          color: #111827;
          border: 1px solid currentColor;
          box-shadow: none;
          opacity: 0.78;
        }
        .tmd-dental-media {
          position: relative;
          border-radius: 44px;
          overflow: hidden;
          background: white;
          box-shadow: 0 28px 90px rgba(15,23,42,.15);
          border: 1px solid rgba(255,255,255,.5);
          cursor: pointer;
        }
        .tmd-dental-media img {
          display: block;
          width: 100%;
          height: 430px;
          object-fit: cover;
        }
        .tmd-dental-media-note {
          position: absolute;
          left: 22px;
          right: 22px;
          bottom: 22px;
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 48px rgba(15,23,42,.18);
          color: #0f172a;
          font-weight: 850;
          line-height: 1.45;
        }
        .tmd-dental-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 24px;
          margin-top: 52px;
        }
        .tmd-dental-panel {
          background: rgba(255,255,255,.8);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 18px 50px rgba(15,23,42,.08);
          backdrop-filter: blur(14px);
        }
        .tmd-dental-panel h3 {
          margin: 0 0 12px;
          font-size: 24px;
          letter-spacing: -0.035em;
          color: #111827;
        }
        .tmd-dental-panel p {
          margin: 0;
          color: #64748b;
          line-height: 1.65;
        }
        .tmd-dental-services {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tmd-dental-services li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          min-height: 54px;
          padding: 14px;
          border-radius: 18px;
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.08);
          font-weight: 800;
        }
        .tmd-dental-services li::before {
          content: "+";
          color: #06b6d4;
          font-weight: 950;
        }
        .tmd-dental-inforow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .tmd-dental-infocard {
          background: rgba(255,255,255,.8);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 16px 42px rgba(15,23,42,.07);
        }
        .tmd-dental-infocard b {
          display: block;
          margin-bottom: 9px;
          color: #111827;
        }
        .tmd-dental-infocard p {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
        }
        .tmd-dental-gallery {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr;
          gap: 14px;
          margin-top: 26px;
        }
        .tmd-dental-gallery-img {
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 18px 42px rgba(15,23,42,.1);
          cursor: pointer;
        }
        .tmd-dental-gallery-img:first-child img { height: 220px; }
        .tmd-dental-gallery-img img {
          display: block;
          width: 100%;
          height: 170px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1), opacity 0.3s;
        }
        .tmd-dental-gallery-img:hover img {
          transform: scale(1.04);
          opacity: 0.85;
        }
        @media (max-width: 980px) {
          .tmd-dental-hero,
          .tmd-dental-grid { grid-template-columns: 1fr !important; }
          .tmd-dental-inforow,
          .tmd-dental-gallery { grid-template-columns: 1fr; }
          .tmd-dental-gallery-img img,
          .tmd-dental-gallery-img:first-child img { height: 220px; }
          .tmd-dental-services { grid-template-columns: 1fr; }
          .tmd-dental-media img { height: 340px; }
          .tmd-dental-nav { align-items: flex-start; flex-direction: column; }
          .tmd-dental-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 620px) {
          .tmd-dental { padding: 64px 5vw; }
          .tmd-dental-hero h2 { font-size: 40px; }
          .tmd-dental-panel,
          .tmd-dental-infocard { padding: 20px; }
          .tmd-dental-media-note { position: static; margin: -46px 18px 18px; }
          .tmd-dental-statbar { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="tmd-dental">
        <div className="tmd-dental-wrap">
          <nav className="tmd-dental-nav">
            <div className="tmd-dental-brand">
              <span className="tmd-dental-logo">{name.charAt(0)}</span>
              {name}
            </div>
            <div className="tmd-dental-navlinks">
              <span>Portfolio</span>
              <span>About</span>
              <span onClick={onHire}>Hire</span>
            </div>
          </nav>
          <div className="tmd-dental-hero">
            <div>
              <div className="tmd-dental-pills">
                {specialties.map((s, i) => (
                  <span key={i} className="tmd-dental-pill">{s}</span>
                ))}
              </div>
              <h2>
                {name}
                {verified && <span className="tmd-dental-verified">&#10003;</span>}
              </h2>
              {bio && <p>{bio}</p>}
              {!bio && tagline && <p>{tagline}</p>}
              <div className="tmd-dental-statbar">
                <div className="tmd-dental-stat">
                  <strong>{serviceArea || "Local"}</strong>
                  Service area
                </div>
                <div className="tmd-dental-stat">
                  <strong>{portfolio.length}</strong>
                  Portfolio photos
                </div>
              </div>
              <div className="tmd-dental-btnrow">
                <button className="tmd-dental-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tmd-dental-btn secondary" onClick={onHire}>View Portfolio</button>
              </div>
            </div>
            <div className="tmd-dental-media" onClick={() => heroPhoto && onPhotoClick(0)}>
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tmd-dental-media-note">
                {specialties.slice(0, 3).join(" · ")}
              </div>
            </div>
          </div>
          <div className="tmd-dental-grid">
            <div className="tmd-dental-panel">
              <h3>About</h3>
              <p>{bio || tagline || `${name} is a professional photographer specializing in ${specialties.join(", ")}.`}</p>
            </div>
            <div className="tmd-dental-panel">
              <h3>Specialties</h3>
              <ul className="tmd-dental-services">
                {specialties.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tmd-dental-inforow">
            <div className="tmd-dental-infocard">
              <b>Service Area</b>
              <p>{serviceArea || "Available for local and travel bookings."}</p>
            </div>
            <div className="tmd-dental-infocard">
              <b>Pricing</b>
              <p>{priceLabel || "Contact for custom pricing and packages."}</p>
            </div>
            <div className="tmd-dental-infocard">
              <b>Portfolio</b>
              <p>{portfolio.length} photos available for viewing. Click any image to explore the full gallery.</p>
            </div>
          </div>
          <div className="tmd-dental-gallery">
            {galleryPhotos.map((photo, i) => (
              <div key={photo.id} className="tmd-dental-gallery-img" onClick={() => onPhotoClick(i + 1)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
