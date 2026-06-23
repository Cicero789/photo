// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficeEvent(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Venue", "Reception", "Ceremony"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["Capacity 180 seated", "Catering kitchen", "AV package", "Green room", "Outdoor terrace", "Vendor access"];
  const rateTiers = ["Half-Day", "Full Day", "Weekend"];
  const accent = "#f59e0b";
  const accentText = "#111827";
  const head = "#fff7ed";
  const text = "#fed7aa";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#09090b,#1c1917 55%,#26130c)", color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif" }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", right: -100, top: -120, width: 420, height: 420, borderRadius: "999px", background: "rgba(245,158,11,.1)", filter: "blur(6px)", pointerEvents: "none" }} />

        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="ofc-ev-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 800, letterSpacing: "-.03em", color: head }}>
              <span style={{ width: 42, height: 42, borderRadius: 44, display: "grid", placeItems: "center", background: accent, color: accentText, fontWeight: 900, boxShadow: "0 14px 34px rgba(0,0,0,.35)" }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-ev-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 700, color: text, opacity: .78 }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-ev-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 700, color: text }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,5.5vw,72px)", lineHeight: .97, letterSpacing: "-.04em", color: head }}>
                {tagline || "An elegant venue for dinners, launches, ceremonies, and celebrations."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "rgba(245,158,11,.18)", fontSize: 14, color: accent, verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", color: text, opacity: .82, fontSize: 17, lineHeight: 1.7 }}>
                {bio || "A dramatic dark template for event venues and celebration spaces offering elegant interiors, catering support, and full AV packages."}
              </p>
              {/* Rate strip */}
              <div className="ofc-ev-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 26 }}>
                {rateTiers.map((t, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 18, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", textAlign: "center", fontSize: 13, fontWeight: 700, color: text }}>{t}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 24px", borderRadius: 44, background: accent, color: accentText, fontWeight: 800, boxShadow: "0 18px 46px rgba(0,0,0,.4)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 24px", borderRadius: 44, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", fontSize: 15, color: "#f8fafc" }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ borderRadius: 44, overflow: "hidden", boxShadow: "0 28px 90px rgba(0,0,0,.45)", border: "1px solid rgba(255,255,255,.1)", background: "#1c1917" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Hero"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
            </div>
          </div>

          {/* Main grid: Amenities + Space Photos */}
          <div className="ofc-ev-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 32 }}>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Playfair Display',serif", color: head }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px" }}>
                {amenities.map((a, i) => (
                  <span key={i} style={{ fontSize: 14, lineHeight: 1.7, color: text }}>■ {a}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Playfair Display',serif", color: head }}>Space Photos</b>
              <div className="ofc-ev-photos" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {portfolio.slice(0, 6).map((p, i) => (
                  <img key={p.id} src={p.url} alt={p.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 14, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="ofc-ev-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Rates</b>
              <p style={{ margin: 0, color: text, opacity: .78, lineHeight: 1.6, fontSize: 14 }}>{priceLabel || "Contact for current half-day and weekend rates."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Location</b>
              <p style={{ margin: 0, color: text, opacity: .78, lineHeight: 1.6, fontSize: 14 }}>{serviceArea || "Venue location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Booking Calendar</b>
              <p style={{ margin: 0, color: text, opacity: .78, lineHeight: 1.6, fontSize: 14 }}>Check availability and reserve your preferred date and time slot online.</p>
            </div>
          </div>

          {/* Lower grid: Form + Rules */}
          <div className="ofc-ev-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 24 }}>
            <div style={{ padding: 26, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18, fontFamily: "'Playfair Display',serif", color: head }}>Booking Inquiry</b>
              <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input placeholder="Your name" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Email" type="email" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <input placeholder="Preferred date" type="date" style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, outline: "none" }} />
                <textarea placeholder="Message or special requests" rows={3} style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.06)", color: "#f8fafc", fontFamily: "inherit", fontSize: 14, resize: "vertical", outline: "none" }} />
                <button type="submit" style={{ padding: "14px 0", borderRadius: 44, background: accent, color: accentText, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Submit Inquiry
                </button>
              </form>
            </div>
            <div style={{ padding: 28, borderRadius: 24, background: accent, color: accentText }}>
              <b style={{ display: "block", marginBottom: 14, fontSize: 18, fontFamily: "'Playfair Display',serif" }}>Rules & Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: 15, opacity: .88 }}>
                All vendors must check in at reception, noise ordinance after 10 PM, decorations must use damage-free adhesives.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-ev-hero { grid-template-columns: 1fr !important; }
          .ofc-ev-main { grid-template-columns: 1fr !important; }
          .ofc-ev-info { grid-template-columns: 1fr !important; }
          .ofc-ev-lower { grid-template-columns: 1fr !important; }
          .ofc-ev-rstrip { grid-template-columns: 1fr !important; }
          .ofc-ev-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-ev-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-ev-hero h2 { font-size: 36px !important; }
          .ofc-ev-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
