// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateOfficeBeauty(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Suite Rental", "Chair Rental", "Studio"];
  const heroImg = portfolio?.[0]?.url || "";
  const amenities = ["Private suites", "Shampoo station", "Styling chairs", "Retail shelving", "Client parking", "Washer/dryer"];
  const rateTiers = ["Daily", "Weekly", "Monthly"];

  const card = { padding: 22, borderRadius: "26px 90px 26px 90px", background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" } as const;
  const pill = { padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 900 } as const;
  const input = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(15,23,42,.15)", fontFamily: "inherit", fontSize: 14, background: "#fff", color: "#111827", boxSizing: "border-box" as const };

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "radial-gradient(circle at 16% 18%,rgba(244,114,182,.26),transparent 25%),linear-gradient(135deg,#fff,#fdf2f8 52%,#fae8ff)", color: "#111827", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="ofc-bt-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: "#db2777", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="ofc-bt-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Photos</span><span>Rates</span><span>Amenities</span><span>Calendar</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="ofc-bt-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => <span key={i} style={pill}>{p}</span>)}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em" }}>
                {tagline || "Independent beauty suites with polish, storage, and freedom."}
                {verified && <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A stylish template for beauty professionals renting independent suites, chairs, or studio spaces with full creative control."}
              </p>
              <div className="ofc-bt-rstrip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 26 }}>
                {rateTiers.map((t, i) => (
                  <div key={i} style={{ padding: "14px 10px", borderRadius: 16, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", textAlign: "center", fontSize: 13, fontWeight: 700 }}>{t}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 26, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#db2777", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={() => onPhotoClick(0)} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "rgba(255,255,255,.72)", color: "#111827", fontWeight: 800, border: "1px solid rgba(15,23,42,.1)", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  View Space
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: "26px 90px 26px 90px", overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "white" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
            </div>
          </div>

          {/* Main grid */}
          <div className="ofc-bt-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ ...card, padding: 28 }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Amenities</b>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {amenities.map((a, i) => <div key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>■ {a}</div>)}
              </div>
            </div>
            <div style={{ ...card, padding: 28 }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Space Photos</b>
              <div className="ofc-bt-photos" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
                {portfolio.slice(0, 6).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12, cursor: "pointer", display: "block" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="ofc-bt-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={card}><b style={{ display: "block", marginBottom: 9 }}>Rates</b><p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{priceLabel || "Contact for current suite and chair rental pricing."}</p></div>
            <div style={card}><b style={{ display: "block", marginBottom: 9 }}>Location</b><p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{serviceArea || "Address provided upon booking confirmation."}</p></div>
            <div style={card}><b style={{ display: "block", marginBottom: 9 }}>Booking Calendar</b><p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>Select your preferred move-in date and rental term to get started.</p></div>
          </div>

          {/* Lower grid */}
          <div className="ofc-bt-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 28 }}>
            <div style={{ ...card, padding: 28 }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Booking Inquiry</b>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="text" placeholder="Your name" style={input} />
                <input type="email" placeholder="Email address" style={input} />
                <input type="date" style={input} />
                <textarea placeholder="Message or questions" rows={3} style={{ ...input, resize: "vertical" }} />
                <button onClick={onHire} style={{ padding: "14px 0", borderRadius: 999, background: "#db2777", color: "#fff", fontWeight: 800, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Submit Inquiry</button>
              </div>
            </div>
            <div style={{ padding: 28, borderRadius: "26px 90px 26px 90px", background: "#db2777", color: "#fff" }}>
              <b style={{ display: "block", marginBottom: 16, fontSize: 18 }}>Rules &amp; Use Notes</b>
              <p style={{ margin: 0, lineHeight: 1.8, opacity: .92, fontSize: 15 }}>Keep suites clean after each client, shared laundry sign-up required, no walk-in signage in hallways.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .ofc-bt-hero { grid-template-columns: 1fr !important; }
          .ofc-bt-main { grid-template-columns: 1fr !important; }
          .ofc-bt-info { grid-template-columns: 1fr !important; }
          .ofc-bt-lower { grid-template-columns: 1fr !important; }
          .ofc-bt-rstrip { grid-template-columns: 1fr !important; }
          .ofc-bt-nav { flex-direction: column !important; align-items: flex-start !important; }
          .ofc-bt-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .ofc-bt-hero h2 { font-size: 36px !important; }
          .ofc-bt-photos { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
