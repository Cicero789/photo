import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');`;

export default function TemplateBeautyTattoo(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Custom", "Flash", "Cover-up"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#030712,#111827 54%,#1f2937)", color: "#d1d5db", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div className="beauty-tattoo-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <nav className="beauty-tattoo-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em", color: "#fff" }}>
              <span style={{ width: 42, height: 42, borderRadius: 16, display: "grid", placeItems: "center", background: "#ef4444", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="beauty-tattoo-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72, color: "#cbd5e1" }}>
              <span>Services</span><span>Gallery</span><span>Policies</span><span>Instagram</span>
            </div>
          </nav>

          <div className="beauty-tattoo-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 900, color: "#cbd5e1" }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#fff" }}>
                {tagline || "Custom work, clean lines, serious booking standards."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7, color: "#d1d5db" }}>
                {bio || "An edgy dark tattoo artist template with flash galleries, style portfolio, consultation process, and booking policy sections."}
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#ef4444", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(0,0,0,.3)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", boxShadow: "0 28px 90px rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.15)", background: "#1a1a1a" }}>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
            </div>
          </div>

          <div className="beauty-tattoo-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.12)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Booking</b>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>Clients can choose a service, request a preferred date, and send inspiration notes before the appointment.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.12)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Location</b>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.12)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Client Experience</b>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>Each layout includes a clear service path, visual proof, policies, and a fast call-to-action for booking.</p>
            </div>
          </div>

          <div className="beauty-tattoo-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 220 : 170, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(0,0,0,.2)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .beauty-tattoo-hero { grid-template-columns: 1fr !important; }
          .beauty-tattoo-info { grid-template-columns: 1fr !important; }
          .beauty-tattoo-gallery { grid-template-columns: 1fr !important; }
          .beauty-tattoo-gallery img { height: 220px !important; }
          .beauty-tattoo-nav { align-items: flex-start !important; flex-direction: column !important; }
          .beauty-tattoo-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .beauty-tattoo-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
