import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMedicalDoctor(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-medical-doctor";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap";
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
        .tmd-doctor {
          font-family: Inter, system-ui, -apple-system, sans-serif;
          color: #111827;
          background: linear-gradient(135deg, #f8fbff, #eaf5ff 55%, #ffffff);
          min-height: 600px;
          padding: 78px 6vw;
          position: relative;
          overflow: hidden;
        }
        .tmd-doctor::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 999px;
          background: rgba(37,99,235,.18);
          top: -140px;
          right: -120px;
          filter: blur(6px);
          pointer-events: none;
          z-index: 0;
        }
        .tmd-doctor::after {
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
        .tmd-doctor-wrap {
          width: min(1200px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .tmd-doctor-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          margin-bottom: 46px;
        }
        .tmd-doctor-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 950;
          letter-spacing: -0.03em;
        }
        .tmd-doctor-logo {
          width: 42px;
          height: 42px;
          border-radius: 16px;
          display: grid;
          place-items: center;
          background: #2563eb;
          color: #fff;
          box-shadow: 0 14px 32px rgba(15,23,42,.18);
          font-weight: 950;
          font-size: 18px;
        }
        .tmd-doctor-navlinks {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 18px;
          font-weight: 800;
          font-size: 14px;
          opacity: 0.72;
        }
        .tmd-doctor-navlinks span { cursor: pointer; }
        .tmd-doctor-hero {
          display: grid;
          grid-template-columns: 1.04fr 0.96fr;
          gap: 42px;
          align-items: center;
        }
        .tmd-doctor-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 24px;
        }
        .tmd-doctor-pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.72);
          border: 1px solid rgba(15,23,42,.1);
          font-weight: 900;
          font-size: 13px;
        }
        .tmd-doctor-hero h2 {
          margin: 0;
          font-family: Inter, sans-serif;
          font-size: clamp(40px, 5.5vw, 78px);
          line-height: 0.95;
          letter-spacing: -0.06em;
          color: #111827;
        }
        .tmd-doctor-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563eb;
          color: #fff;
          font-size: 14px;
          margin-left: 12px;
          vertical-align: middle;
        }
        .tmd-doctor-hero p {
          max-width: 690px;
          margin: 22px 0 0;
          font-size: 18px;
          line-height: 1.72;
          color: #111827;
          opacity: 0.78;
        }
        .tmd-doctor-statbar {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 28px;
        }
        .tmd-doctor-stat {
          border-radius: 22px;
          padding: 18px;
          background: rgba(255,255,255,.86);
          border: 1px solid rgba(15,23,42,.08);
          box-shadow: 0 14px 34px rgba(15,23,42,.06);
        }
        .tmd-doctor-stat strong {
          display: block;
          font-size: 32px;
          line-height: 1;
          letter-spacing: -0.06em;
          color: #2563eb;
        }
        .tmd-doctor-btnrow {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 30px;
        }
        .tmd-doctor-btn {
          min-height: 52px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 22px;
          border-radius: 999px;
          background: #2563eb;
          color: #fff;
          font-weight: 950;
          font-family: inherit;
          font-size: inherit;
          border: none;
          cursor: pointer;
          box-shadow: 0 18px 46px rgba(15,23,42,.18);
          transition: transform 0.25s, background 0.25s;
        }
        .tmd-doctor-btn:hover { transform: translateY(-2px); }
        .tmd-doctor-btn.secondary {
          background: transparent;
          color: #111827;
          border: 1px solid currentColor;
          box-shadow: none;
          opacity: 0.78;
        }
        .tmd-doctor-media {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: white;
          box-shadow: 0 28px 90px rgba(15,23,42,.15);
          border: 1px solid rgba(255,255,255,.5);
          cursor: pointer;
        }
        .tmd-doctor-media img {
          display: block;
          width: 100%;
          height: 430px;
          object-fit: cover;
        }
        .tmd-doctor-media-note {
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
        .tmd-doctor-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 24px;
          margin-top: 52px;
        }
        .tmd-doctor-panel {
          background: rgba(255,255,255,.86);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 26px;
          padding: 26px;
          box-shadow: 0 18px 50px rgba(15,23,42,.08);
          backdrop-filter: blur(14px);
        }
        .tmd-doctor-panel h3 {
          margin: 0 0 12px;
          font-size: 24px;
          letter-spacing: -0.035em;
          color: #111827;
        }
        .tmd-doctor-panel p {
          margin: 0;
          color: #64748b;
          line-height: 1.65;
        }
        .tmd-doctor-services {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .tmd-doctor-services li {
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
        .tmd-doctor-services li::before {
          content: "+";
          color: #2563eb;
          font-weight: 950;
        }
        .tmd-doctor-inforow {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        .tmd-doctor-infocard {
          background: rgba(255,255,255,.86);
          border: 1px solid rgba(15,23,42,.08);
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 16px 42px rgba(15,23,42,.07);
        }
        .tmd-doctor-infocard b {
          display: block;
          margin-bottom: 9px;
          color: #111827;
        }
        .tmd-doctor-infocard p {
          margin: 0;
          color: #64748b;
          line-height: 1.6;
        }
        .tmd-doctor-gallery {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 0.8fr;
          gap: 14px;
          margin-top: 26px;
        }
        .tmd-doctor-gallery-img {
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 18px 42px rgba(15,23,42,.1);
          cursor: pointer;
        }
        .tmd-doctor-gallery-img:first-child img { height: 220px; }
        .tmd-doctor-gallery-img img {
          display: block;
          width: 100%;
          height: 170px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2,0.7,0.2,1), opacity 0.3s;
        }
        .tmd-doctor-gallery-img:hover img {
          transform: scale(1.04);
          opacity: 0.85;
        }
        @media (max-width: 980px) {
          .tmd-doctor-hero,
          .tmd-doctor-grid { grid-template-columns: 1fr !important; }
          .tmd-doctor-inforow,
          .tmd-doctor-gallery { grid-template-columns: 1fr; }
          .tmd-doctor-gallery-img img,
          .tmd-doctor-gallery-img:first-child img { height: 220px; }
          .tmd-doctor-services { grid-template-columns: 1fr; }
          .tmd-doctor-media img { height: 340px; }
          .tmd-doctor-nav { align-items: flex-start; flex-direction: column; }
          .tmd-doctor-navlinks { justify-content: flex-start; }
        }
        @media (max-width: 620px) {
          .tmd-doctor { padding: 64px 5vw; }
          .tmd-doctor-hero h2 { font-size: 40px; }
          .tmd-doctor-panel,
          .tmd-doctor-infocard { padding: 20px; }
          .tmd-doctor-media-note { position: static; margin: -46px 18px 18px; }
          .tmd-doctor-statbar { grid-template-columns: 1fr; }
        }
      `}</style>
      <section className="tmd-doctor">
        <div className="tmd-doctor-wrap">
          <nav className="tmd-doctor-nav">
            <div className="tmd-doctor-brand">
              <span className="tmd-doctor-logo">{name.charAt(0)}</span>
              {name}
            </div>
            <div className="tmd-doctor-navlinks">
              <span>Portfolio</span>
              <span>About</span>
              <span onClick={onHire}>Hire</span>
            </div>
          </nav>
          <div className="tmd-doctor-hero">
            <div>
              <div className="tmd-doctor-pills">
                {specialties.map((s, i) => (
                  <span key={i} className="tmd-doctor-pill">{s}</span>
                ))}
              </div>
              <h2>
                {name}
                {verified && <span className="tmd-doctor-verified">&#10003;</span>}
              </h2>
              {bio && <p>{bio}</p>}
              {!bio && tagline && <p>{tagline}</p>}
              <div className="tmd-doctor-statbar">
                <div className="tmd-doctor-stat">
                  <strong>{serviceArea || "Local"}</strong>
                  Service area
                </div>
                <div className="tmd-doctor-stat">
                  <strong>{portfolio.length}</strong>
                  Portfolio photos
                </div>
              </div>
              <div className="tmd-doctor-btnrow">
                <button className="tmd-doctor-btn" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button className="tmd-doctor-btn secondary" onClick={onHire}>View Portfolio</button>
              </div>
            </div>
            <div className="tmd-doctor-media" onClick={() => heroPhoto && onPhotoClick(0)}>
              {heroPhoto && <img src={heroPhoto.url} alt={heroPhoto.filename} />}
              <div className="tmd-doctor-media-note">
                {specialties.slice(0, 3).join(" · ")}
              </div>
            </div>
          </div>
          <div className="tmd-doctor-grid">
            <div className="tmd-doctor-panel">
              <h3>About</h3>
              <p>{bio || tagline || `${name} is a professional photographer specializing in ${specialties.join(", ")}.`}</p>
            </div>
            <div className="tmd-doctor-panel">
              <h3>Specialties</h3>
              <ul className="tmd-doctor-services">
                {specialties.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tmd-doctor-inforow">
            <div className="tmd-doctor-infocard">
              <b>Service Area</b>
              <p>{serviceArea || "Available for local and travel bookings."}</p>
            </div>
            <div className="tmd-doctor-infocard">
              <b>Pricing</b>
              <p>{priceLabel || "Contact for custom pricing and packages."}</p>
            </div>
            <div className="tmd-doctor-infocard">
              <b>Portfolio</b>
              <p>{portfolio.length} photos available for viewing. Click any image to explore the full gallery.</p>
            </div>
          </div>
          <div className="tmd-doctor-gallery">
            {galleryPhotos.map((photo, i) => (
              <div key={photo.id} className="tmd-doctor-gallery-img" onClick={() => onPhotoClick(i + 1)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
