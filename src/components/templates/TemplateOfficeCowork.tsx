// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficeCowork(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Hot Desks", "Dedicated Desks", "Meeting Rooms"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["Fast fiber WiFi", "Coffee bar", "Phone booths", "Member events", "Printer access", "Mail handling"];
  const rateTiers = ["Day Pass", "Weekly", "Monthly"];

  const BG = "linear-gradient(135deg,#ecfeff,#fff 48%,#e0f2fe)";
  const ACCENT = "#0891b2";
  const ACCENT_TEXT = "#ecfeff";
  const SHAPE = "34px";
  const DISPLAY = "'Space Grotesk',sans-serif";
  const CARD_BG = "rgba(255,255,255,.84)";
  const CARD_BORDER = "1px solid rgba(15,23,42,.08)";
  const PILL_BG = "rgba(255,255,255,.72)";
  const PILL_BORDER = "1px solid rgba(15,23,42,.1)";
  const SHADOW = "0 16px 42px rgba(15,23,42,.07)";
  const INPUT: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: 12, border: CARD_BORDER, background: CARD_BG, fontFamily: "inherit", fontSize: 15, outline: "none", boxSizing: "border-box" };

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: BG, color: "#111827", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* Nav */}
          <nav className="ofc-cw-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: ACCENT, color: ACCENT_TEXT, boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-cw-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: 0.72 }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-cw-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: PILL_BG, border: PILL_BORDER, fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: DISPLAY, fontSize: "clamp(40px,5.5vw,78px)", lineHeight: 0.95, letterSpacing: "-.06em" }}>
                {tagline || "Flexible desks, good coffee, and a community that actually connects."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: 0.78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A modern coworking space template built for shared offices, startup hubs, and freelancer-friendly environments with community at the center."}
              </p>
              {/* Rate Strip */}
              <div className="ofc-cw-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 26 }}>
                {rateTiers.map((tier, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW, textAlign: "center" }}>
                    <b style={{ fontSize: 13, letterSpacing: ".02em" }}>{tier}</b>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 26, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: ACCENT, color: ACCENT_TEXT, fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={() => onPhotoClick(0)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: CARD_BG, border: CARD_BORDER, fontWeight: 850, cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: SHAPE, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "white" }}>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
            </div>
          </div>

          {/* Main Grid */}
          <div className="ofc-cw-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ padding: 26, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
                {amenities.map((a, i) => (
                  <span key={i} style={{ fontSize: 15, lineHeight: 1.6 }}>■ {a}</span>
                ))}
              </div>
            </div>
            <div style={{ padding: 26, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Space Photos</b>
              <div className="ofc-cw-photos" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {portfolio.slice(0, 6).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="ofc-cw-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 9 }}>Rates</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{priceLabel || "Flexible day, weekly, and monthly passes available. Contact us for team pricing."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 9 }}>Location</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{serviceArea || "Space location details provided upon inquiry."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 9 }}>Booking Calendar</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>Select your preferred dates and desk type. Availability updated in real time.</p>
            </div>
          </div>

          {/* Lower Grid */}
          <div className="ofc-cw-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ padding: 26, borderRadius: SHAPE, background: CARD_BG, border: CARD_BORDER, boxShadow: SHADOW }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Booking Inquiry</b>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="text" placeholder="Your name" style={INPUT} />
                <input type="email" placeholder="Email address" style={INPUT} />
                <input type="date" style={INPUT} />
                <textarea placeholder="Message or special requests" rows={4} style={{ ...INPUT, resize: "vertical" }} />
                <button onClick={onHire} style={{ padding: "14px 0", borderRadius: 12, background: ACCENT, color: ACCENT_TEXT, fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Submit Inquiry</button>
              </div>
            </div>
            <div style={{ padding: 26, borderRadius: SHAPE, background: ACCENT, color: ACCENT_TEXT }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Rules &amp; Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.7, opacity: 0.92, fontSize: 15 }}>
                Quiet calls in booths, guest check-in required, meeting rooms reserved separately.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-cw-hero { grid-template-columns: 1fr !important; }
          .ofc-cw-main { grid-template-columns: 1fr !important; }
          .ofc-cw-info { grid-template-columns: 1fr !important; }
          .ofc-cw-lower { grid-template-columns: 1fr !important; }
          .ofc-cw-rstrip { grid-template-columns: 1fr !important; }
          .ofc-cw-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-cw-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-cw-hero h2 { font-size: 36px !important; }
          .ofc-cw-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
