import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');`;

export default function TemplateFitnessTrainer(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["1:1 Training", "Transformation Plans", "Free Consultation"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{
        minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden",
        background: "radial-gradient(circle at 15% 20%,rgba(239,68,68,.24),transparent 28%),linear-gradient(135deg,#111827,#1f2937 55%,#450a0a)",
        color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif"
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", right: -125, top: -140, width: 430, height: 430, borderRadius: 999, background: "rgba(239,68,68,.18)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="fitness-trainer-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="fitness-trainer-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: "#ef4444", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="fitness-trainer-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Schedule</span><span>Packages</span><span>Instructor</span><span>Location</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="fitness-trainer-hero" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#fff" }}>
                {tagline || "Build strength with a plan that actually follows you home."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", fontSize: 18, lineHeight: 1.7, color: "#fee2e2", opacity: .78 }}>
                {bio || "A high-energy trainer template built for transformation photos, program packages, accountability, and a free consultation pathway."}
              </p>
              {/* Schedule Strip */}
              <div className="fitness-trainer-schedule" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#ef4444", fontSize: 24, letterSpacing: "-.04em" }}>Mon</b>6:00 AM Strength Lab
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#ef4444", fontSize: 24, letterSpacing: "-.04em" }}>Wed</b>12:00 PM Lunch Lift
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#ef4444", fontSize: 24, letterSpacing: "-.04em" }}>Sat</b>9:00 AM Small Group
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#ef4444", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Join a Class{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>

            {/* Media */}
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.5)", background: "white" }}>
              <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, padding: "9px 13px", borderRadius: 999, background: "rgba(255,255,255,.9)", color: "#111827", fontWeight: 950, letterSpacing: ".08em", fontSize: 12 }}>RESULTS</span>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", color: "#0f172a", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(15,23,42,.18)" }}>
                Transformation photos · Program packages · Free consultation CTA
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="fitness-trainer-main" style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Instructor Bio</h3>
              <p style={{ margin: 0, color: "#e5e7eb", lineHeight: 1.65 }}>{bio || "Coach Marcus is a strength and conditioning trainer helping busy adults build sustainable strength, better mobility, and confidence in the gym."}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Memberships &amp; Packages</h3>
              <div className="fitness-trainer-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  { name: "Starter", price: "$149", desc: "Two sessions + movement screen" },
                  { name: "Build", price: "$399/mo", desc: "Weekly training + plan" },
                  { name: "Transform", price: "$749/mo", desc: "2x weekly + nutrition check-ins" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", minHeight: 180, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 18 }}>{pkg.name}</strong>
                    <div style={{ fontSize: 31, fontWeight: 950, letterSpacing: "-.06em", color: "#ef4444", margin: "14px 0 8px" }}>{pkg.price}</div>
                    <small style={{ color: "#e5e7eb", lineHeight: 1.5 }}>{pkg.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="fitness-trainer-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Class Schedule</b>
              <p style={{ margin: 0, color: "#e5e7eb", lineHeight: 1.6 }}>Weekly classes are designed for beginners, returning students, and committed members with clear progression paths.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Location</b>
              <p style={{ margin: 0, color: "#e5e7eb", lineHeight: 1.6 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff" }}>Online Class Option</b>
              <p style={{ margin: 0, color: "#e5e7eb", lineHeight: 1.6 }}>Live video form checks and app-based programming are available for hybrid clients.</p>
            </div>
          </div>

          {/* Gallery */}
          <div className="fitness-trainer-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 220 : 170, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(15,23,42,.1)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .fitness-trainer-hero, .fitness-trainer-main { grid-template-columns: 1fr !important; }
          .fitness-trainer-packages, .fitness-trainer-info, .fitness-trainer-gallery, .fitness-trainer-schedule { grid-template-columns: 1fr !important; }
          .fitness-trainer-gallery img { height: 220px !important; }
          .fitness-trainer-nav { align-items: flex-start !important; flex-direction: column !important; }
          .fitness-trainer-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .fitness-trainer-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
