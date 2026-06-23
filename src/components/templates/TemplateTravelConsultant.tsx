// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateTravelConsultant(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const accent = "#2563eb";
  const accentText = "#eff6ff";
  const pills = specialties.length > 0 ? specialties : ["Honeymoons", "Milestone Trips", "Luxury Escapes"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div className="trv-tc-tpl" style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#fff,#f8fafc 48%,#e0f2fe)", color: "#0f172a", fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: 999, background: "rgba(37,99,235,.14)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="trv-tc-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="trv-tc-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 26, display: "grid", placeItems: "center", background: accent, color: accentText, boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950, fontSize: 18 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="trv-tc-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Packages</span><span>Photos</span><span>Availability</span><span>Reviews</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="trv-tc-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Libre Baskerville',serif", fontSize: "clamp(38px,5vw,72px)", lineHeight: .97, letterSpacing: "-.05em" }}>
                {tagline || "Bespoke itineraries for honeymoons, milestones, and rare escapes."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">&#10003;</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A luxury travel-consultant template designed for advisors who plan bespoke honeymoons, anniversary trips, and exclusive destination experiences."}
              </p>
              {/* Package Strip */}
              <div className="trv-tc-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                {[
                  { name: "Consult", price: "$250", desc: "90-min planning session" },
                  { name: "Custom Trip", price: "$2,500", desc: "Full itinerary + concierge" },
                  { name: "Premium", price: "$6,000", desc: "White-glove, end-to-end" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                    <b style={{ display: "block", color: accent, fontSize: 24, letterSpacing: "-.04em" }}>{pkg.price}</b>
                    <strong style={{ fontSize: 15 }}>{pkg.name}</strong>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{pkg.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: accent, color: accentText, fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Start Planning{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "transparent", color: "#0f172a", fontWeight: 900, border: "1.5px solid rgba(15,23,42,.18)", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  View Past Trips
                </button>
              </div>
            </div>

            {/* Media */}
            <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.55)", background: "white" }}>
              <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, padding: "9px 13px", borderRadius: 999, background: "rgba(255,255,255,.92)", color: accent, fontWeight: 950, letterSpacing: ".08em", fontSize: 12 }}>BESPOKE</span>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", color: "#0f172a", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(15,23,42,.10)" }}>
                Honeymoons &middot; Anniversary trips &middot; Exclusive destinations
              </div>
            </div>
          </div>

          {/* Main Grid: Services + Gallery */}
          <div className="trv-tc-main" style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.05)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 24, letterSpacing: "-.035em" }}>Services</h3>
              <div className="trv-tc-rooms" style={{ display: "grid", gap: 14 }}>
                {[
                  { nm: "Honeymoon Planning", desc: "Romantic itineraries tailored to you" },
                  { nm: "Milestone Celebrations", desc: "Birthdays, anniversaries, retirements" },
                  { nm: "Rare Escapes", desc: "Private villas, chartered yachts, safaris" },
                ].map((room, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, borderRadius: 22, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)" }}>
                    <img src={portfolio[i]?.url || heroImg} alt={room.nm} onClick={() => onPhotoClick(i)} style={{ width: 80, height: 64, objectFit: "cover", borderRadius: 16, cursor: "pointer", flexShrink: 0 }} loading="lazy" />
                    <div>
                      <strong style={{ display: "block", fontSize: 15 }}>{room.nm}</strong>
                      <span style={{ fontSize: 13, color: "#64748b" }}>{room.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.05)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 24, letterSpacing: "-.035em" }}>Photos</h3>
              <div className="trv-tc-gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {portfolio.slice(0, 4).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 18, cursor: "pointer", display: "block", boxShadow: "0 10px 28px rgba(15,23,42,.08)" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="trv-tc-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.05)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Availability</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>Accepting new clients year-round. Consultations are scheduled within one week of inquiry.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.05)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Location</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>{serviceArea || "Remote consultations available worldwide. In-person meetings by appointment."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.05)" }}>
              <b style={{ display: "block", marginBottom: 9 }}>Booking</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>Submit an inquiry and receive a proposal within 72 hours, tailored to your vision and budget.</p>
            </div>
          </div>

          {/* Lower Grid: Booking Form + Review */}
          <div className="trv-tc-lower" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24, marginTop: 24 }}>
            <div style={{ padding: 26, borderRadius: 26, background: "rgba(255,255,255,.7)", border: "1px solid rgba(15,23,42,.06)", boxShadow: "0 18px 50px rgba(15,23,42,.05)" }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 22, letterSpacing: "-.03em" }}>Start Your Inquiry</h3>
              <div style={{ display: "grid", gap: 14 }}>
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.1)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.6)", boxSizing: "border-box" }} readOnly />
                <input type="email" placeholder="Email address" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.1)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.6)", boxSizing: "border-box" }} readOnly />
                <input type="text" placeholder="Travel dates" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.1)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.6)", boxSizing: "border-box" }} readOnly />
                <textarea placeholder="Describe your dream trip..." rows={3} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(15,23,42,.1)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.6)", resize: "vertical", boxSizing: "border-box" }} readOnly />
                <button onClick={onHire} style={{ padding: "14px 22px", borderRadius: 14, background: accent, color: accentText, fontWeight: 900, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Send Inquiry</button>
              </div>
            </div>

            <div style={{ padding: 26, borderRadius: 26, background: accent, color: accentText, boxShadow: "0 18px 50px rgba(15,23,42,.12)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 22, letterSpacing: "-.03em" }}>Guest Review</h3>
              <div style={{ fontSize: 32, marginBottom: 12, letterSpacing: 2 }}>{"★★★★★"}</div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, opacity: .92 }}>
                &ldquo;The itinerary felt personal, elevated, and completely stress-free.&rdquo;
              </p>
              <p style={{ margin: "18px 0 0", fontWeight: 800, fontSize: 14, opacity: .78 }}>&mdash; Verified Guest</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:800px){
          .trv-tc-hero{grid-template-columns:1fr!important}
          .trv-tc-main{grid-template-columns:1fr!important}
          .trv-tc-info{grid-template-columns:1fr!important}
          .trv-tc-lower{grid-template-columns:1fr!important}
          .trv-tc-packages{grid-template-columns:1fr!important}
          .trv-tc-gallery{grid-template-columns:1fr!important}
          .trv-tc-nav{flex-direction:column!important;align-items:flex-start!important}
          .trv-tc-navlinks{justify-content:flex-start!important}
        }
        @media(max-width:520px){
          .trv-tc-tpl{padding:64px 5vw!important}
          .trv-tc-hero h2{font-size:36px!important}
        }
      `}</style>
    </>
  );
}
