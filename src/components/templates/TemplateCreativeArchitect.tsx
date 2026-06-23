// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');`;

export default function TemplateCreativeArchitect(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Residential", "Commercial", "Awards"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{
        minHeight: 780, padding: "78px 6vw", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#e5e7eb,#fff 48%,#dbeafe)",
        backgroundImage: "linear-gradient(135deg,#e5e7eb,#fff 48%,#dbeafe),linear-gradient(rgba(29,78,216,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(29,78,216,.06) 1px,transparent 1px)",
        backgroundSize: "100% 100%,44px 44px,44px 44px",
        color: "#111827", fontFamily: "Inter,system-ui,sans-serif"
      }}>
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: 999, background: "rgba(29,78,216,.12)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="creative-architect-wrap" style={{ width: "min(1220px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="creative-architect-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: "#1d4ed8", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="creative-architect-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Portfolio</span><span>Services</span><span>Pricing</span><span>Inquiry</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="creative-architect-hero" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.1)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em" }}>
                {tagline || "Buildings shaped by structure, context, and restraint."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 700, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A structural architecture template with blueprint motifs, project portfolio, awards, firm philosophy, and high-end inquiry flow."}
              </p>
              <div className="creative-architect-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                {["Cedar House", "Studio Addition", "Urban Courtyard"].map((proj, i) => (
                  <div key={i} style={{ padding: 16, minHeight: 86, borderRadius: 22, background: "rgba(255,255,255,.8)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                    <b style={{ display: "block", color: "#1d4ed8", marginBottom: 6 }}>{proj}</b>
                    <span>Featured project</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#1d4ed8", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.5)", background: "white" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", color: "#0f172a", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(15,23,42,.18)" }}>
                Blueprint motifs · Project portfolio · Awards
              </div>
            </div>
          </div>

          {/* Main Grid - Services + Pricing */}
          <div className="creative-architect-main" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em" }}>Services</h3>
              <ul className="creative-architect-services" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
                {["Residential architecture", "Commercial concepts", "Feasibility studies", "Permit drawings", "Renovations", "Design consultation"].map((s, i) => (
                  <li key={i} style={{ minHeight: 54, padding: 14, borderRadius: 18, display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.08)", fontWeight: 850 }}>
                    <span style={{ color: "#1d4ed8", fontWeight: 950 }}>✦</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em" }}>Pricing</h3>
              <div className="creative-architect-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 24 }}>
                {[
                  { name: "Feasibility", price: "$1,500", desc: "Site and concept review" },
                  { name: "Concept Design", price: "$7,500", desc: "Early plans and direction" },
                  { name: "Full Scope", price: "$35,000+", desc: "Complete architectural service" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.72)", border: "1px solid rgba(15,23,42,.08)", minHeight: 178, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 18 }}>{pkg.name}</strong>
                    <div style={{ margin: "14px 0 8px", color: "#1d4ed8", fontSize: 31, fontWeight: 950, letterSpacing: "-.06em" }}>{pkg.price}</div>
                    <small style={{ color: "#64748b", lineHeight: 1.5 }}>{pkg.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Grid - Inquiry + Testimonials */}
          <div className="creative-architect-lower" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 24, marginTop: 24 }}>
            <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em" }}>Inquiry Form</h3>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.65 }}>Use this visual form block to collect project type, budget range, timeline, and creative direction.</p>
              <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                <div style={{ width: "100%", border: "1px solid rgba(15,23,42,.12)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.8)", color: "#9ca3af" }}>Your name</div>
                <div style={{ width: "100%", border: "1px solid rgba(15,23,42,.12)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.8)", color: "#9ca3af" }}>Email address</div>
                <div style={{ width: "100%", border: "1px solid rgba(15,23,42,.12)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.8)", color: "#9ca3af" }}>Project type</div>
                <div style={{ width: "100%", border: "1px solid rgba(15,23,42,.12)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.8)", color: "#9ca3af", minHeight: 96 }}>Tell me about your project</div>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#1d4ed8", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Hire Me</button>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
                <p style={{ margin: 0, opacity: .82, lineHeight: 1.6 }}>"They balanced beauty, budget, and buildability."</p>
                <b style={{ display: "block", marginTop: 12 }}>— Client testimonial</b>
              </div>
              <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
                <p style={{ margin: 0, opacity: .82, lineHeight: 1.6 }}>"The plans were thoughtful from the first sketch."</p>
                <b style={{ display: "block", marginTop: 12 }}>— Client testimonial</b>
              </div>
              <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(15,23,42,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em" }}>Portfolio / Gallery</h3>
                <p style={{ margin: 0, color: "#64748b", lineHeight: 1.65 }}>Featured work, selected projects, process imagery, and proof of style live together in a clean visual section.</p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="creative-architect-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 224 : 172, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(15,23,42,.1)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .creative-architect-hero, .creative-architect-main, .creative-architect-lower { grid-template-columns: 1fr !important; }
          .creative-architect-pricing, .creative-architect-strip, .creative-architect-gallery { grid-template-columns: 1fr !important; }
          .creative-architect-services { grid-template-columns: 1fr !important; }
          .creative-architect-gallery img { height: 220px !important; }
          .creative-architect-nav { align-items: flex-start !important; flex-direction: column !important; }
          .creative-architect-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .creative-architect-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
