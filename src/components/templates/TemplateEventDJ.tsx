// @ts-nocheck
﻿import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateEventDJ(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing.downloads.single}` : "";
  const accent = "#c084fc";
  const accentText = "#111827";
  const headFont = '"Space Grotesk", sans-serif';
  const shape = "18px";

  return (
    <>
      <style>{fonts}</style>
      <div className="evt-dj-tpl" style={{ padding: "40px 5vw 60px", background: "linear-gradient(135deg,#020617,#111827 52%,#581c87)", color: "#f8fafc", fontFamily: '"Inter", system-ui, sans-serif', position: "relative", overflow: "hidden" }}>
        {/* Nav */}
        <nav className="evt-dj-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
            <span style={{ width: 42, height: 42, display: "grid", placeItems: "center", borderRadius: 15, background: accent, color: accentText, fontWeight: 950, boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontSize: 18 }}>{name.charAt(0)}</span>
            {name}
            {verified && (
              <span style={{ marginLeft: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", fontFamily: "sans-serif" }} title="Verified">&#x2713;</span>
            )}
          </div>
          <div className="evt-dj-links" style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: 0.72 }}>
            <span>Gallery</span><span>Packages</span><span>Availability</span><span>Pricing</span>
          </div>
        </nav>

        {/* Hero */}
        <div className="evt-dj-hero" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 42, alignItems: "center" }}>
          <div>
            {specialties.length > 0 && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {specialties.slice(0, 4).map((s, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", fontSize: 13, fontWeight: 900 }}>{s}</span>
                ))}
              </div>
            )}
            <h2 style={{ margin: 0, fontFamily: headFont, fontSize: "clamp(40px,5.5vw,78px)", lineHeight: 0.95, letterSpacing: "-.06em", color: "#f8fafc" }}>
              {tagline || "The right music, the right energy, the right moment."}
            </h2>
            <p style={{ maxWidth: 700, margin: "22px 0 0", opacity: 0.78, fontSize: 18, lineHeight: 1.7 }}>{bio}</p>
            {priceLabel && <p style={{ marginTop: 14, fontWeight: 800, color: accent, fontSize: 15 }}>{priceLabel}</p>}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
              <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: accent, color: accentText, border: 0, cursor: "pointer", fontWeight: 950, fontSize: 15, fontFamily: '"Inter", sans-serif', boxShadow: "0 18px 46px rgba(0,0,0,.30)" }}>Check Availability</button>
              {portfolio.length > 0 && (
                <button onClick={() => onPhotoClick(0)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "transparent", border: "1px solid rgba(255,255,255,.3)", color: "#f8fafc", cursor: "pointer", fontWeight: 950, fontSize: 15, fontFamily: '"Inter", sans-serif', opacity: 0.8 }}>View Gallery</button>
              )}
            </div>
          </div>
          {portfolio.length > 0 && (
            <div style={{ position: "relative", overflow: "hidden", borderRadius: shape, background: "rgba(255,255,255,.08)", boxShadow: "0 28px 90px rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.15)" }}>
              <img src={portfolio[0].url} alt={portfolio[0].filename || "Hero"} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} onClick={() => onPhotoClick(0)} loading="lazy" />
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 14, background: "rgba(0,0,0,.7)", backdropFilter: "blur(16px)", color: "#f8fafc", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(0,0,0,.3)", fontSize: 14 }}>
                {serviceArea && <span>{serviceArea}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Gallery */}
        {portfolio.length > 1 && (
          <div className="evt-dj-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 52 }}>
            {portfolio.slice(0, 6).map((photo, i) => (
              <div key={photo.id} style={{ overflow: "hidden", borderRadius: 16, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer" }} onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename || `Photo ${i + 1}`} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {/* Info Grid */}
        <div className="evt-dj-info" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 24 }}>
          <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
            <b style={{ display: "block", marginBottom: 9 }}>Packages</b>
            <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.6, fontSize: 14 }}>Clear package tiers help clients compare scope, inclusions, timing, and add-on needs.</p>
          </div>
          <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
            <b style={{ display: "block", marginBottom: 9 }}>Availability</b>
            <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.6, fontSize: 14 }}>{serviceArea ? `Serving ${serviceArea}` : "Popular dates book 9-14 months ahead. Weekday dates available sooner."}</p>
          </div>
          <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
            <b style={{ display: "block", marginBottom: 9 }}>Event Fit</b>
            <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.6, fontSize: 14 }}>Travel radius, guest count, venue requirements, and production notes.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="evt-dj-foot" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 24, marginTop: 24 }}>
          <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 18, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.2)" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em" }}>Get in Touch</h3>
            <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.65, fontSize: 14 }}>{bio}</p>
            <button onClick={onHire} style={{ marginTop: 16, display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: accent, color: accentText, border: 0, cursor: "pointer", fontWeight: 950, fontSize: 15, fontFamily: '"Inter", sans-serif' }}>Check Availability</button>
          </div>
          <div style={{ padding: 24, borderRadius: 18, background: accent, color: accentText, boxShadow: "0 18px 50px rgba(0,0,0,.3)" }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 28, letterSpacing: "-.04em" }}>Client Testimonial</h3>
            <p style={{ margin: 0, lineHeight: 1.65, opacity: 0.92 }}>{`"The dance floor never emptied, and the transitions were perfect."`}</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .evt-dj-hero, .evt-dj-foot { grid-template-columns: 1fr !important; }
          .evt-dj-gallery { grid-template-columns: 1fr 1fr !important; }
          .evt-dj-info { grid-template-columns: 1fr !important; }
          .evt-dj-nav { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 520px) {
          .evt-dj-tpl { padding: 30px 4vw 40px !important; }
          .evt-dj-hero h2 { font-size: 36px !important; }
          .evt-dj-gallery { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}