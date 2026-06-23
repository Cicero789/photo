import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateFitnessMartialArts(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Belt Programs", "Youth Classes", "Beginner Trials"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{
        minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#09090b,#1c1917 55%,#7f1d1d)",
        color: "#f8fafc", fontFamily: "Inter,system-ui,sans-serif"
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", right: -125, top: -140, width: 430, height: 430, borderRadius: 999, background: "rgba(249,115,22,.18)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="fitness-dojo-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="fitness-dojo-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: "#f97316", color: "#111827", boxShadow: "0 14px 34px rgba(0,0,0,.18)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="fitness-dojo-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72 }}>
              <span>Schedule</span><span>Packages</span><span>Instructor</span><span>Location</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="fitness-dojo-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Libre Baskerville',serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#fff7ed" }}>
                {tagline || "Discipline, respect, and skill — one belt at a time."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", fontSize: 18, lineHeight: 1.7, color: "#fed7aa", opacity: .78 }}>
                {bio || "A bold martial arts template with belt levels, class schedules, dojo philosophy, youth programs, and beginner trial classes."}
              </p>
              {/* Schedule Strip */}
              <div className="fitness-dojo-schedule" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#f97316", fontSize: 24, letterSpacing: "-.04em" }}>Mon</b>4:00 PM Youth Foundations
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#f97316", fontSize: 24, letterSpacing: "-.04em" }}>Tue</b>7:00 PM Adult Sparring
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#f97316", fontSize: 24, letterSpacing: "-.04em" }}>Sat</b>11:00 AM Belt Prep
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#f97316", color: "#111827", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.2)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Join a Class{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>

            {/* Media */}
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.16)", border: "1px solid rgba(255,255,255,.5)", background: "white" }}>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", color: "#0f172a", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(15,23,42,.18)" }}>
                Belt programs · Youth classes · Beginner trial sessions
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="fitness-dojo-main" style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff7ed" }}>Instructor Bio</h3>
              <p style={{ margin: 0, color: "#e7e5e4", lineHeight: 1.65 }}>{bio || "A dedicated martial arts instructor with decades of practice, teaching discipline and technique to students of all ages through structured belt programs."}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.08)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff7ed" }}>Memberships &amp; Packages</h3>
              <div className="fitness-dojo-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  { name: "Trial", price: "$29", desc: "Two intro classes" },
                  { name: "Youth", price: "$135/mo", desc: "2 classes weekly" },
                  { name: "Family", price: "$289/mo", desc: "Multi-student membership" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", minHeight: 180, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 18 }}>{pkg.name}</strong>
                    <div style={{ fontSize: 31, fontWeight: 950, letterSpacing: "-.06em", color: "#f97316", margin: "14px 0 8px" }}>{pkg.price}</div>
                    <small style={{ color: "#e7e5e4", lineHeight: 1.5 }}>{pkg.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="fitness-dojo-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff7ed" }}>Class Schedule</b>
              <p style={{ margin: 0, color: "#e7e5e4", lineHeight: 1.6 }}>Weekly classes are designed for beginners, returning students, and committed members with clear progression paths.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff7ed" }}>Location</b>
              <p style={{ margin: 0, color: "#e7e5e4", lineHeight: 1.6 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(15,23,42,.07)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#fff7ed" }}>Online Class Option</b>
              <p style={{ margin: 0, color: "#e7e5e4", lineHeight: 1.6 }}>Virtual kata review and fundamentals coaching are available for remote students.</p>
            </div>
          </div>

          {/* Gallery */}
          <div className="fitness-dojo-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 220 : 170, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(15,23,42,.1)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .fitness-dojo-hero, .fitness-dojo-main { grid-template-columns: 1fr !important; }
          .fitness-dojo-packages, .fitness-dojo-info, .fitness-dojo-gallery, .fitness-dojo-schedule { grid-template-columns: 1fr !important; }
          .fitness-dojo-gallery img { height: 220px !important; }
          .fitness-dojo-nav { align-items: flex-start !important; flex-direction: column !important; }
          .fitness-dojo-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .fitness-dojo-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
