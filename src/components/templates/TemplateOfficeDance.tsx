// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficeDance(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Studio Rental", "Class Space", "Rehearsal"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["Sprung floor", "Mirror walls", "Bluetooth sound", "Ballet barres", "Changing rooms", "Lobby seating"];
  const rateTiers = ["Hourly", "Half-Day", "Full Day"];
  const shape = "999px 999px 40px 40px";
  const accent = "#be185d";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#fff7ed,#fff 48%,#fce7f3)", color: "#111827", fontFamily: "Inter,system-ui,sans-serif" }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: "999px", background: "rgba(190,24,93,.15)", filter: "blur(6px)", pointerEvents: "none" }} />

        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="ofc-dn-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: shape, display: "grid", placeItems: "center", background: accent, color: "#fff", fontWeight: 900, boxShadow: "0 14px 34px rgba(0,0,0,.18)" }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-dn-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 700, opacity: .72 }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-dn-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 700 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,72px)", lineHeight: .97, letterSpacing: "-.04em" }}>
                {tagline || "Mirror walls, sprung floors, and space to move."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 17, lineHeight: 1.7 }}>
                {bio || "An energetic template for dance studios offering hourly rentals with sprung floors, mirrors, sound systems, and changing rooms."}
              </p>
              {/* Rate strip */}
              <div className="ofc-dn-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 26 }}>
                {rateTiers.map((t, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", textAlign: "center", fontSize: 13, fontWeight: 700 }}>{t}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 24px", borderRadius: shape, background: accent, color: "#fff", fontWeight: 800, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 24px", borderRadius: shape, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "#111827" }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ borderRadius: shape, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "#fff" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Hero"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
            </div>
          </div>

          {/* Main grid: Amenities + Space Photos */}
          <div className="ofc-dn-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
                {amenities.map((a, i) => (
                  <span key={i} style={{ fontSize: 14, lineHeight: 1.7 }}>■ {a}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Space Photos</b>
              <div className="ofc-dn-photos" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {portfolio.slice(0, 6).map((p, i) => (
                  <img key={p.id} src={p.url} alt={p.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 14, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="ofc-dn-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Rates</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6, fontSize: 14 }}>{priceLabel || "Contact for current hourly and daily rates."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Location</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6, fontSize: 14 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Booking Calendar</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6, fontSize: 14 }}>Check availability and reserve your preferred date and time slot online.</p>
            </div>
          </div>

          {/* Lower grid: Form + Rules */}
          <div className="ofc-dn-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Booking Inquiry</b>
              <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Your name" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Email" type="email" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Preferred date" type="date" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <textarea placeholder="Message or special requests" rows={3} style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.12)", fontFamily: "inherit", fontSize: 14, resize: "vertical", outline: "none" }} />
                <button type="submit" style={{ padding: "14px 0", borderRadius: shape, background: accent, color: "#fff", fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Submit Inquiry
                </button>
              </form>
            </div>
            <div style={{ padding: 28, borderRadius: 24, background: accent, color: "#fff" }}>
              <b style={{ display: "block", marginBottom: 14, fontSize: 18, fontFamily: "'Space Grotesk',sans-serif" }}>Rules & Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, opacity: .92 }}>
                No street shoes on the floor, clean up personal items after sessions, music volume capped after 9 PM.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-dn-hero { grid-template-columns: 1fr !important; }
          .ofc-dn-main { grid-template-columns: 1fr !important; }
          .ofc-dn-info { grid-template-columns: 1fr !important; }
          .ofc-dn-lower { grid-template-columns: 1fr !important; }
          .ofc-dn-rstrip { grid-template-columns: 1fr !important; }
          .ofc-dn-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-dn-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-dn-hero h2 { font-size: 36px !important; }
          .ofc-dn-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
