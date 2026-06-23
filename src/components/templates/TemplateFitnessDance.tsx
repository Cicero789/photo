import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');`;

export default function TemplateFitnessDance(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Ballet", "Hip-Hop", "Contemporary"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{
        minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden",
        background: "radial-gradient(circle at 18% 18%,rgba(236,72,153,.25),transparent 25%),linear-gradient(135deg,#fdf2f8,#fff 44%,#ede9fe)",
        color: "#0f172a", fontFamily: "Inter,system-ui,sans-serif"
      }}>
        {/* Decorative orb */}
        <div style={{ position: "absolute", right: -125, top: -140, width: 430, height: 430, borderRadius: 999, background: "rgba(168,85,247,.22)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="fitness-dance-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="fitness-dance-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em" }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: "#db2777", color: "#fff", boxShadow: "0 14px 34px rgba(0,0,0,.10)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="fitness-dance-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .55 }}>
              <span>Schedule</span><span>Packages</span><span>Instructor</span><span>Location</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="fitness-dance-hero" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(0,0,0,.04)", border: "1px solid rgba(0,0,0,.08)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#0f172a" }}>
                {tagline || "Find your rhythm. Train your expression."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#fce7f3", fontSize: 14, color: "#db2777", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", fontSize: 18, lineHeight: 1.7, color: "#334155", opacity: .78 }}>
                {bio || "An expressive dance academy template with movement-inspired design, class types, recital gallery, age groups, and performance announcements."}
              </p>
              {/* Schedule Strip */}
              <div className="fitness-dance-schedule" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#db2777", fontSize: 24, letterSpacing: "-.04em" }}>Tue</b>4:30 PM Kids Ballet
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#db2777", fontSize: 24, letterSpacing: "-.04em" }}>Thu</b>6:00 PM Teen Hip-Hop
                </div>
                <div style={{ padding: 16, borderRadius: 22, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
                  <b style={{ display: "block", color: "#db2777", fontSize: 24, letterSpacing: "-.04em" }}>Sat</b>1:00 PM Contemporary
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#db2777", color: "#fff", fontWeight: 950, boxShadow: "0 18px 46px rgba(15,23,42,.12)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Join a Class{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>

            {/* Media */}
            <div style={{ position: "relative", borderRadius: "26px 90px 26px 90px", overflow: "hidden", boxShadow: "0 28px 90px rgba(15,23,42,.10)", border: "1px solid rgba(0,0,0,.08)", background: "white" }}>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.9)", backdropFilter: "blur(16px)", color: "#0f172a", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(15,23,42,.10)" }}>
                Recital gallery · Age groups · Performance announcements
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="fitness-dance-main" style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.05)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#0f172a" }}>Instructor Bio</h3>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.65 }}>{bio || "A passionate dance educator bringing energy and discipline to every class, from tiny dancers to competitive company members."}</p>
            </div>
            <div style={{ background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(15,23,42,.05)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#0f172a" }}>Memberships &amp; Packages</h3>
              <div className="fitness-dance-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                {[
                  { name: "Mini Movers", price: "$110/mo", desc: "Ages 4-7 weekly class" },
                  { name: "Core", price: "$165/mo", desc: "Two weekly classes" },
                  { name: "Company", price: "$320/mo", desc: "Performance track" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", minHeight: 180, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 18 }}>{pkg.name}</strong>
                    <div style={{ fontSize: 31, fontWeight: 950, letterSpacing: "-.06em", color: "#db2777", margin: "14px 0 8px" }}>{pkg.price}</div>
                    <small style={{ color: "#64748b", lineHeight: 1.5 }}>{pkg.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Row */}
          <div className="fitness-dance-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.04)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#0f172a" }}>Class Schedule</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>Weekly classes are designed for beginners, returning students, and committed members with clear progression paths.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.04)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#0f172a" }}>Location</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>{serviceArea || "Studio location details provided upon booking."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.7)", border: "1px solid rgba(0,0,0,.06)", boxShadow: "0 16px 42px rgba(15,23,42,.04)" }}>
              <b style={{ display: "block", marginBottom: 9, color: "#0f172a" }}>Online Class Option</b>
              <p style={{ margin: 0, color: "#64748b", lineHeight: 1.6 }}>Livestreamed technique classes and recorded choreography reviews available for remote dancers.</p>
            </div>
          </div>

          {/* Gallery */}
          <div className="fitness-dance-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 220 : 170, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(15,23,42,.07)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .fitness-dance-hero, .fitness-dance-main { grid-template-columns: 1fr !important; }
          .fitness-dance-packages, .fitness-dance-info, .fitness-dance-gallery, .fitness-dance-schedule { grid-template-columns: 1fr !important; }
          .fitness-dance-gallery img { height: 220px !important; }
          .fitness-dance-nav { align-items: flex-start !important; flex-direction: column !important; }
          .fitness-dance-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .fitness-dance-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
