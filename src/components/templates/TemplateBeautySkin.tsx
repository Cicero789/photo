import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');`;

export default function TemplateBeautySkin(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Facials", "Peels", "Microneedling"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#f8fafc,#fff 52%,#e0f2fe)", color: "#111827", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: "999px", background: "rgba(14,116,144,.16)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="beauty-skin-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <nav className="beauty-skin-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 16, display: "grid", placeItems: "center", background: "#0e7490", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="beauty-skin-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Services</span><span>Gallery</span><span>Policies</span><span>Instagram</span>
            </div>
          </nav>

          <div className="beauty-skin-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "Inter,system-ui,sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em" }}>
                {tagline || "Clinical skin care with visible, thoughtful results."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A clinical-beauty website for estheticians and skin specialists with treatment menus, skin type education, results galleries, and consultation booking."}
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#0e7490", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Book Now{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 30, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "white" }}>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
            </div>
          </div>

          <div className="beauty-skin-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Booking</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>Clients can choose a service, request a preferred date, and send inspiration notes before the appointment.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Location</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Client Experience</b>
              <p style={{ margin: 0, color: "#6b7280", lineHeight: 1.6 }}>Each layout includes a clear service path, visual proof, policies, and a fast call-to-action for booking.</p>
            </div>
          </div>

          <div className="beauty-skin-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 220 : 170, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(15,23,42,.1)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .beauty-skin-hero { grid-template-columns: 1fr !important; }
          .beauty-skin-info { grid-template-columns: 1fr !important; }
          .beauty-skin-gallery { grid-template-columns: 1fr !important; }
          .beauty-skin-gallery img { height: 220px !important; }
          .beauty-skin-nav { align-items: flex-start !important; flex-direction: column !important; }
          .beauty-skin-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .beauty-skin-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
