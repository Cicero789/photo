// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficeConference(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Meeting Room", "Boardroom", "Training"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["4K display", "Video conferencing", "Whiteboard", "Speakerphone", "Coffee service", "Catering add-ons"];
  const rateTiers = ["Hourly", "Half-Day", "Full Day"];

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#eff6ff,#fff 48%,#dbeafe)", color: "#111827", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="ofc-cf-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 18, display: "grid", placeItems: "center", background: "#2563eb", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-cf-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-cf-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em" }}>
                {tagline || "A ready-to-book meeting room with polished AV and support."}
                {verified && <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A clean, professional template for conference rooms and meeting spaces with modern AV, video conferencing, and catering options."}
              </p>
              {/* Rate strip */}
              <div className="ofc-cf-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 26 }}>
                {rateTiers.map((t, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 8px 22px rgba(15,23,42,.05)", textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, opacity: .55, textTransform: "uppercase" as const, letterSpacing: ".04em" }}>{t}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#2563eb", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={() => onPhotoClick(0)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.1)", fontWeight: 850, cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "#111827" }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "white" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
            </div>
          </div>

          {/* Main grid */}
          <div className="ofc-cf-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
            <div style={{ padding: 28, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {amenities.map((a, i) => <span key={i} style={{ fontSize: 15, lineHeight: 1.7 }}>■ {a}</span>)}
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Space Photos</b>
              <div className="ofc-cf-photos" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {portfolio.slice(0, 6).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="ofc-cf-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Rates</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{priceLabel || "Contact for current rates and availability."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Location</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{serviceArea || "Address details provided upon booking confirmation."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Booking Calendar</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>Select a date and time slot to check real-time availability.</p>
            </div>
          </div>

          {/* Lower grid */}
          <div className="ofc-cf-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ padding: 28, borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Booking Inquiry</b>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 12 }}>
                <input placeholder="Your Name" style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Email Address" type="email" style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Preferred Date" type="date" style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <textarea placeholder="Message or special requests..." rows={3} style={{ padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none", resize: "vertical" as const }} />
                <button onClick={onHire} style={{ padding: "14px 22px", borderRadius: 999, background: "#2563eb", color: "#fff", fontWeight: 850, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Submit Inquiry</button>
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: 18, background: "#2563eb", color: "#fff" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Rules & Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.8, opacity: .92, fontSize: 15 }}>Return furniture to default layout, erase whiteboards after use, no outside catering without prior approval.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-cf-hero { grid-template-columns: 1fr !important; }
          .ofc-cf-main { grid-template-columns: 1fr !important; }
          .ofc-cf-info { grid-template-columns: 1fr !important; }
          .ofc-cf-lower { grid-template-columns: 1fr !important; }
          .ofc-cf-rstrip { grid-template-columns: 1fr !important; }
          .ofc-cf-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-cf-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-cf-hero h2 { font-size: 36px !important; }
          .ofc-cf-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
