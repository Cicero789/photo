// @ts-nocheck
import type { TemplateProps } from "./types";

export default function TemplateTechIT({
  name,
  tagline,
  specialties,
  bio,
  serviceArea,
  verified,
  pricing,
  portfolio,
  onHire,
  onPhotoClick,
}: TemplateProps) {
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const accent = "#334155";
  const bg = "linear-gradient(135deg,#f8fafc,#fff 48%,#e2e8f0)";
  const cardBg = "rgba(255,255,255,.84)";
  const cardBorder = "rgba(51,65,85,.08)";
  const radius = 26;
  const color = "#111827";

  const pills = specialties?.length ? specialties.slice(0, 3) : ["IT Services", "Infrastructure", "Cloud"];
  const heroTagline = tagline || "IT infrastructure that makes business operations steadier.";
  const heroBio = bio || "Reliable IT infrastructure services for small and mid-size businesses. Less downtime, clearer systems, better support.";
  const services = ["Network setup", "Cloud migration", "Server management", "Security audits", "Help desk", "Backup systems"];
  const skills = ["AWS", "Azure", "Linux", "VMware", "Cisco", "Active Directory"];
  const caseStudies = [
    { title: "Office Network Overhaul", desc: "Redesigned a 200-seat office network for zero-downtime failover." },
    { title: "Cloud Migration", desc: "Moved legacy on-prem systems to AWS with staged rollout." },
    { title: "Disaster Recovery", desc: "Built and tested a DR plan that cut RTO from 48 h to 2 h." },
  ];
  const heroImg = portfolio?.[0]?.url || "";
  const galleryImgs = portfolio?.slice(0, 3) || [];
  const brandLetter = name?.charAt(0) || "P";

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`}</style>

      <div style={{ background: bg, color, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
        {/* Nav */}
        <nav className="tch-it-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: accent, color: "#fff", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontWeight: 700, fontSize: 18, fontFamily: "Libre Baskerville, serif" }}>{brandLetter}</span>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{name}</span>
          </div>
          <div className="tch-it-nav-links" style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {["Services", "Case Studies", "Tech Skills", "Consultation"].map((l) => (
              <a key={l} style={{ color, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}>{l}</a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="tch-it-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 1200, margin: "0 auto", padding: "48px 40px 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {pills.map((p) => (
                <span key={p} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20, background: "rgba(51,65,85,.08)", border: "1px solid rgba(51,65,85,.10)", color: accent }}>{p}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 38, fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
              {heroTagline}
              {verified && <span style={{ display: "inline-block", marginLeft: 10, background: accent, color: "#fff", fontSize: 12, padding: "2px 10px", borderRadius: 12, verticalAlign: "middle", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Verified</span>}
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.75, margin: 0 }}>{heroBio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {skills.map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 500, color: accent, opacity: 0.7 }}>#{s}</span>
              ))}
            </div>
            <div className="tch-it-cta" style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <button onClick={onHire} style={{ padding: "12px 28px", background: accent, color: "#fff", border: "none", borderRadius: radius, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Hire Me{priceLabel && <span style={{ fontWeight: 400, marginLeft: 8, opacity: 0.85, fontSize: 13 }}>{priceLabel}</span>}
              </button>
              <button style={{ padding: "12px 28px", background: "transparent", color: accent, border: `1.5px solid ${accent}`, borderRadius: radius, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>View Case Studies</button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {heroImg ? (
              <img src={heroImg} alt="Hero" onClick={() => onPhotoClick?.(0)} style={{ width: "100%", height: 370, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div style={{ width: "100%", height: 370, borderRadius: radius, background: "rgba(51,65,85,.08)" }} />
            )}
            <span style={{ position: "absolute", bottom: 16, left: 16, background: "#fff", color: accent, fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 14, boxShadow: "0 2px 12px rgba(51,65,85,.12)" }}>{serviceArea || "Remote"}</span>
          </div>
        </section>

        {/* Main Grid */}
        <section className="tch-it-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, backdropFilter: "blur(6px)" }}>
            <h2 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 20, fontWeight: 700, margin: "0 0 18px" }}>Services</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {services.map((s) => (
                <span key={s} style={{ fontSize: 14, lineHeight: 1.8 }}>▸ {s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, backdropFilter: "blur(6px)" }}>
            <h2 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 20, fontWeight: 700, margin: "0 0 18px" }}>Case Studies</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {caseStudies.map((c) => (
                <div key={c?.filename} style={{ background: "rgba(51,65,85,.04)", borderRadius: 14, padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c?.filename}</div>
                  <div style={{ fontSize: 13, opacity: 0.65 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="tch-it-info" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Tech Skills</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {skills.map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 12, background: "rgba(51,65,85,.07)", color: accent }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>Client Examples</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ width: "100%", aspectRatio: "1", background: "rgba(51,65,85,.08)", borderRadius: 12 }} />
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 12 }}>
            <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 16, fontWeight: 700, margin: 0 }}>GitHub / Portfolio</h3>
            <p style={{ fontSize: 13, opacity: 0.6, margin: 0 }}>View open-source contributions and project repositories.</p>
            <button style={{ padding: "10px 22px", background: accent, color: "#fff", border: "none", borderRadius: radius, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Visit Portfolio</button>
          </div>
        </section>

        {/* Lower Grid */}
        <section className="tch-it-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 18, fontWeight: 700, margin: "0 0 18px" }}>Book a Consultation</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Your name" style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${cardBorder}`, background: "rgba(255,255,255,.6)", fontSize: 14, outline: "none" }} />
              <input placeholder="Email" style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${cardBorder}`, background: "rgba(255,255,255,.6)", fontSize: 14, outline: "none" }} />
              <input placeholder="Project type" style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${cardBorder}`, background: "rgba(255,255,255,.6)", fontSize: 14, outline: "none" }} />
              <textarea placeholder="Tell me about your project" rows={3} style={{ padding: "10px 14px", borderRadius: 12, border: `1px solid ${cardBorder}`, background: "rgba(255,255,255,.6)", fontSize: 14, resize: "vertical", outline: "none" }} />
              <button type="submit" style={{ padding: "12px 0", background: accent, color: "#fff", border: "none", borderRadius: radius, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>Send Message</button>
            </form>
          </div>
          <div style={{ background: accent, borderRadius: radius, padding: 36, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, color: "#fff" }}>
            <h3 style={{ fontFamily: "Libre Baskerville, serif", fontSize: 22, fontWeight: 700, margin: 0 }}>Project Fit</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, opacity: 0.92 }}>Whether you need a single audit or ongoing managed IT, this is where we start the conversation.</p>
            <blockquote style={{ margin: 0, paddingLeft: 16, borderLeft: "3px solid rgba(255,255,255,.35)", fontSize: 14, fontStyle: "italic", opacity: 0.8 }}>"Seamless migration with zero business interruption."</blockquote>
          </div>
        </section>

        {/* Gallery */}
        <section className="tch-it-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 16, maxWidth: 1200, margin: "0 auto", padding: "0 40px 60px" }}>
          {[0, 1, 2].map((i) => {
            const img = galleryImgs[i];
            return img ? (
              <img key={i} src={img.url} alt={img?.filename || ""} onClick={() => onPhotoClick?.(i)} style={{ width: "100%", height: i === 0 ? 320 : 200, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div key={i} style={{ width: "100%", height: i === 0 ? 320 : 200, borderRadius: radius, background: "rgba(51,65,85,.07)" }} />
            );
          })}
        </section>
      </div>

      <style>{`
        @media(max-width:800px){
          .tch-it-hero,.tch-it-main,.tch-it-lower{grid-template-columns:1fr!important}
          .tch-it-info{grid-template-columns:1fr 1fr!important}
          .tch-it-gallery{grid-template-columns:1fr 1fr!important}
          .tch-it-nav{padding:14px 20px!important}
          .tch-it-hero,.tch-it-main,.tch-it-info,.tch-it-lower,.tch-it-gallery{padding-left:20px!important;padding-right:20px!important}
        }
        @media(max-width:520px){
          .tch-it-info,.tch-it-gallery{grid-template-columns:1fr!important}
          .tch-it-nav-links{display:none!important}
          .tch-it-cta{flex-direction:column}
        }
      `}</style>
    </>
  );
}
