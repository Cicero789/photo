import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateMarketingBrand(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-marketing-brand";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const metrics = [
    { value: `${portfolio.length}+`, label: "Projects" },
    { value: "5.0", label: "Rating" },
    { value: "24h", label: "Turnaround" },
  ];

  return (
    <>
      <style>{`
        .tmbr-wrap { padding: 0; margin: 0; background: linear-gradient(180deg, #07111f 0%, #111827 100%); font-family: 'Inter', sans-serif; color: #e2e8f0; min-height: 600px; }
        .tmbr-nav { display: flex; align-items: center; gap: 16px; padding: 20px 5vw; border-bottom: 1px solid rgba(214,167,74,.15); }
        .tmbr-nav-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; color: #f8fafc; }
        .tmbr-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #d6a74a; color: #07111f; font-size: 12px; margin-left: 6px; vertical-align: middle; }
        .tmbr-nav-pills { display: flex; gap: 8px; margin-left: auto; flex-wrap: wrap; }
        .tmbr-pill { padding: 4px 14px; border-radius: 999px; background: rgba(214,167,74,.12); color: #d6a74a; font-size: 12px; font-weight: 500; border: 1px solid rgba(214,167,74,.2); }
        .tmbr-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 5vw 40px; align-items: center; }
        .tmbr-hero-left h1 { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 48px); font-weight: 800; margin: 0 0 8px; letter-spacing: -0.02em; line-height: 1.1; color: #f8fafc; }
        .tmbr-hero-left .tmbr-tagline { color: #94a3b8; font-size: 15px; margin: 0 0 20px; }
        .tmbr-hero-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .tmbr-hero-bio { color: #94a3b8; font-size: 14px; line-height: 1.7; margin: 0 0 24px; }
        .tmbr-metrics { display: flex; gap: 16px; margin-bottom: 28px; }
        .tmbr-metric-card { background: rgba(255,255,255,.08); border-radius: 14px; padding: 16px 22px; text-align: center; flex: 1; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmbr-metric-card strong { font-family: 'Playfair Display', serif; font-size: 22px; color: #d6a74a; display: block; }
        .tmbr-metric-card span { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: .08em; }
        .tmbr-btns { display: flex; gap: 12px; }
        .tmbr-btn-primary { padding: 12px 28px; border: none; border-radius: 8px; background: #d6a74a; color: #07111f; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s, box-shadow .2s; }
        .tmbr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(214,167,74,.3); }
        .tmbr-btn-secondary { padding: 12px 28px; border: 1px solid #d6a74a; border-radius: 8px; background: transparent; color: #d6a74a; font-weight: 600; font-size: 14px; cursor: pointer; transition: background .2s; }
        .tmbr-btn-secondary:hover { background: rgba(214,167,74,.08); }
        .tmbr-hero-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .tmbr-hero-thumb { border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .tmbr-hero-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmbr-hero-thumb:hover img { transform: scale(1.05); }
        .tmbr-section { padding: 0 5vw 40px; }
        .tmbr-section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; margin: 0 0 20px; color: #f8fafc; }
        .tmbr-grid-main { display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px; }
        .tmbr-services { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmbr-service-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.06); font-size: 14px; }
        .tmbr-service-item:last-child { border-bottom: none; }
        .tmbr-service-dot { width: 8px; height: 8px; border-radius: 50%; background: #d6a74a; flex-shrink: 0; }
        .tmbr-info-card { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmbr-info-card h4 { margin: 0 0 12px; font-family: 'Playfair Display', serif; color: #f8fafc; }
        .tmbr-info-card p { margin: 0 0 12px; color: #94a3b8; font-size: 14px; line-height: 1.7; }
        .tmbr-lower { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
        .tmbr-case { background: rgba(255,255,255,.08); border-radius: 14px; padding: 28px; border: 1px solid rgba(255,255,255,.06); backdrop-filter: blur(8px); }
        .tmbr-case h4 { font-family: 'Playfair Display', serif; margin: 0 0 8px; font-size: 16px; color: #f8fafc; }
        .tmbr-case p { margin: 0; color: #64748b; font-size: 13px; line-height: 1.6; }
        .tmbr-cta-box { background: linear-gradient(135deg, #d6a74a, #b8860b); border-radius: 14px; padding: 32px; color: #07111f; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .tmbr-cta-box h3 { font-family: 'Playfair Display', serif; font-size: 22px; margin: 0 0 8px; }
        .tmbr-cta-box p { margin: 0 0 20px; font-size: 14px; opacity: .85; }
        .tmbr-cta-btn { padding: 12px 28px; border: none; border-radius: 8px; background: #07111f; color: #d6a74a; font-weight: 700; font-size: 14px; cursor: pointer; transition: transform .2s; }
        .tmbr-cta-btn:hover { transform: translateY(-2px); }
        .tmbr-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 24px; }
        .tmbr-gallery-item { border-radius: 14px; overflow: hidden; aspect-ratio: 1; cursor: pointer; border: 1px solid rgba(255,255,255,.06); }
        .tmbr-gallery-item img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
        .tmbr-gallery-item:hover img { transform: scale(1.05); }
        .tmbr-price { margin-top: 16px; font-weight: 600; color: #d6a74a; font-size: 15px; }
        .tmbr-area { color: #64748b; font-size: 13px; margin-top: 6px; }
        @media (max-width: 800px) {
          .tmbr-hero { grid-template-columns: 1fr; }
          .tmbr-grid-main { grid-template-columns: 1fr; }
          .tmbr-lower { grid-template-columns: 1fr; }
          .tmbr-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .tmbr-hero { padding: 32px 5vw 24px; }
          .tmbr-metrics { flex-direction: column; }
          .tmbr-btns { flex-direction: column; }
          .tmbr-hero-right { grid-template-columns: 1fr; }
          .tmbr-gallery { grid-template-columns: 1fr 1fr; gap: 8px; }
          .tmbr-nav-pills { display: none; }
        }
      `}</style>
      <section className="tmbr-wrap">
        <nav className="tmbr-nav">
          <span className="tmbr-nav-name">
            {name}
            {verified && <span className="tmbr-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tmbr-nav-pills">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="tmbr-pill">{s}</span>
            ))}
          </div>
        </nav>

        <div className="tmbr-hero">
          <div className="tmbr-hero-left">
            <h1>{name}</h1>
            <p className="tmbr-tagline">{tagline}</p>
            <div className="tmbr-hero-pills">
              {specialties.map((s) => (
                <span key={s} className="tmbr-pill">{s}</span>
              ))}
            </div>
            {bio && <p className="tmbr-hero-bio">{bio}</p>}
            <div className="tmbr-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="tmbr-metric-card">
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <div className="tmbr-btns">
              <button className="tmbr-btn-primary" onClick={onHire}>Hire Me</button>
              <button className="tmbr-btn-secondary" onClick={() => document.querySelector(".tmbr-gallery")?.scrollIntoView({ behavior: "smooth" })}>View Portfolio</button>
            </div>
          </div>
          <div className="tmbr-hero-right">
            {portfolio.slice(0, 4).map((photo, i) => (
              <div key={photo.id} className="tmbr-hero-thumb" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="tmbr-section">
          <h3 className="tmbr-section-title">Services</h3>
          <div className="tmbr-grid-main">
            <div className="tmbr-services">
              {specialties.map((s) => (
                <div key={s} className="tmbr-service-item">
                  <span className="tmbr-service-dot" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="tmbr-info-card">
              <h4>About</h4>
              {bio && <p>{bio}</p>}
              <p style={{ color: "#475569", fontSize: 12 }}>{serviceArea}</p>
            </div>
          </div>

          <div className="tmbr-lower">
            <div className="tmbr-case">
              <h4>Brand Story</h4>
              <p>With {portfolio.length} curated brand sessions, I craft visual identities that resonate across {specialties.slice(0, 2).join(" and ")}.</p>
            </div>
            <div className="tmbr-cta-box">
              <h3>Elevate your brand</h3>
              <p>Premium photography that defines your visual identity.</p>
              <button className="tmbr-cta-btn" onClick={onHire}>Get Started</button>
            </div>
          </div>

          <h3 className="tmbr-section-title" style={{ marginTop: 36 }}>Portfolio</h3>
          <div className="tmbr-gallery">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="tmbr-gallery-item" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
          {priceLabel && <div className="tmbr-price">{priceLabel}</div>}
          <div className="tmbr-area">{serviceArea}</div>
        </div>
      </section>
    </>
  );
}
