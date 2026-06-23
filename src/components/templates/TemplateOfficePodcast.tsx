// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficePodcast(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Recording", "Interview", "Live Stream"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["Shure microphones", "Audio interface", "4K cameras", "Acoustic treatment", "Lighting kit", "Remote guest support"];
  const rateTiers = ["Hourly", "Half-Day", "Full Day"];

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#111827,#1e1b4b 55%,#312e81)", color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="ofc-pd-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em", color: "#fff" }}>
              <span style={{ width: 42, height: 42, borderRadius: 26, display: "grid", placeItems: "center", background: "#a78bfa", color: "#111827", boxShadow: "0 14px 34px rgba(0,0,0,.35)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-pd-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72, color: "#e0e7ff" }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-pd-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 900, color: "#e0e7ff" }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#fff" }}>
                {tagline || "Record clean audio and video without building your own studio."}
                {verified && <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "rgba(167,139,250,.25)", fontSize: 14, color: "#a78bfa", verticalAlign: "middle" }} title="Verified">✓</span>}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7, color: "#e0e7ff" }}>
                {bio || "A sleek dark template for podcast and recording studios offering professional microphones, cameras, acoustic treatment, and remote guest support."}
              </p>
              {/* Rate strip */}
              <div className="ofc-pd-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 26 }}>
                {rateTiers.map((t, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, opacity: .65, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#e0e7ff" }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#a78bfa", color: "#111827", fontWeight: 950, boxShadow: "0 18px 46px rgba(0,0,0,.35)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={() => onPhotoClick(0)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontWeight: 850, cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "#e0e7ff" }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", boxShadow: "0 28px 90px rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", background: "#1e1b4b" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
            </div>
          </div>

          {/* Main grid */}
          <div className="ofc-pd-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
            <div style={{ padding: 28, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif", color: "#fff" }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {amenities.map((a, i) => <span key={i} style={{ fontSize: 15, lineHeight: 1.7, color: "#e0e7ff" }}>■ {a}</span>)}
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif", color: "#fff" }}>Space Photos</b>
              <div className="ofc-pd-photos" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {portfolio.slice(0, 6).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 16, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="ofc-pd-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Rates</b>
              <p style={{ margin: 0, color: "#e0e7ff", lineHeight: 1.6, opacity: .82 }}>{priceLabel || "Contact for current rates and availability."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Location</b>
              <p style={{ margin: 0, color: "#e0e7ff", lineHeight: 1.6, opacity: .82 }}>{serviceArea || "Studio address provided upon booking confirmation."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Booking Calendar</b>
              <p style={{ margin: 0, color: "#e0e7ff", lineHeight: 1.6, opacity: .82 }}>Select a date and time slot to check real-time availability.</p>
            </div>
          </div>

          {/* Lower grid */}
          <div className="ofc-pd-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ padding: 28, borderRadius: 26, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif", color: "#fff" }}>Booking Inquiry</b>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                <input placeholder="Your Name" style={{ padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Email Address" type="email" style={{ padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Preferred Date" type="date" style={{ padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <textarea placeholder="Message or special requests..." rows={3} style={{ padding: "12px 14px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none", resize: "vertical" as const }} />
                <button onClick={onHire} style={{ padding: "14px 22px", borderRadius: 999, background: "#a78bfa", color: "#111827", fontWeight: 850, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Submit Inquiry</button>
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 26, background: "#a78bfa", color: "#111827" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Rules & Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.8, opacity: .92, fontSize: 15 }}>Handle microphones with care, no food or drinks near equipment, save files to your own drive before leaving.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-pd-hero { grid-template-columns: 1fr !important; }
          .ofc-pd-main { grid-template-columns: 1fr !important; }
          .ofc-pd-info { grid-template-columns: 1fr !important; }
          .ofc-pd-lower { grid-template-columns: 1fr !important; }
          .ofc-pd-rstrip { grid-template-columns: 1fr !important; }
          .ofc-pd-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-pd-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-pd-hero h2 { font-size: 36px !important; }
          .ofc-pd-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
