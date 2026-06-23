// @ts-nocheck
import type { TemplateProps } from "./types";

export default function TemplateTechCyber({
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

  const accent = "#22c55e";
  const accentText = "#052e16";
  const bg = "linear-gradient(135deg,#020617,#111827 52%,#0f172a)";
  const fg = "#f8fafc";
  const cardBg = "rgba(255,255,255,.08)";
  const cardBorder = "rgba(34,197,94,.20)";
  const radius = 14;

  const pills = specialties?.length ? specialties.slice(0, 3) : ["Cybersecurity", "Pen Testing", "Compliance"];
  const heroTagline = tagline || "Find the risks before attackers do.";
  const heroBio = bio || "Cybersecurity consulting for teams that take risk seriously. Pen testing, compliance, incident response, and honest assessments.";
  const services = ["Penetration testing", "Vulnerability scans", "Compliance audits", "Incident response", "Security training", "Risk assessment"];
  const skills = ["OSCP", "Burp Suite", "Nmap", "Wireshark", "Metasploit", "SIEM"];
  const caseStudies = [
    { title: "Enterprise Pen Test", desc: "Full-scope red-team engagement across a Fortune-500 perimeter." },
    { title: "SOC Buildout", desc: "Stood up a 24/7 security operations center in 90 days." },
    { title: "Compliance Sprint", desc: "Achieved SOC 2 Type II certification ahead of deadline." },
  ];
  const heroImg = portfolio?.[0]?.url || "";
  const galleryImgs = portfolio?.slice(0, 3) || [];
  const brandLetter = name?.charAt(0) || "P";

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`}</style>

      <div style={{ background: bg, color: fg, fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
        {/* Nav */}
        <nav className="tch-cy-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 40px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: accent, color: accentText, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontWeight: 700, fontSize: 18, fontFamily: "Space Grotesk, sans-serif" }}>{brandLetter}</span>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#fff" }}>{name}</span>
          </div>
          <div className="tch-cy-nav-links" style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {["Services", "Case Studies", "Tech Skills", "Consultation"].map((l) => (
              <a key={l} style={{ color: fg, opacity: 0.7, textDecoration: "none", cursor: "pointer" }}>{l}</a>
            ))}
          </div>
        </nav>

        {/* Hero */}
        <section className="tch-cy-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 1200, margin: "0 auto", padding: "48px 40px 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {pills.map((p) => (
                <span key={p} style={{ fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20, background: "rgba(255,255,255,.08)", border: "1px solid rgba(34,197,94,.15)", color: accent }}>{p}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 38, fontWeight: 700, lineHeight: 1.2, margin: 0, color: "#fff" }}>
              {heroTagline}
              {verified && <span style={{ display: "inline-block", marginLeft: 10, background: accent, color: accentText, fontSize: 12, padding: "2px 10px", borderRadius: 12, verticalAlign: "middle", fontFamily: "Inter, sans-serif", fontWeight: 600 }}>Verified</span>}
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.7, margin: 0 }}>{heroBio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              {skills.map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 500, color: accent, opacity: 0.8 }}>#{s}</span>
              ))}
            </div>
            <div className="tch-cy-cta" style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
              <button onClick={onHire} style={{ padding: "12px 28px", background: accent, color: accentText, border: "none", borderRadius: radius, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Hire Me{priceLabel && <span style={{ fontWeight: 400, marginLeft: 8, opacity: 0.85, fontSize: 13 }}>{priceLabel}</span>}
              </button>
              <button style={{ padding: "12px 28px", background: "transparent", color: accent, border: `1.5px solid ${accent}`, borderRadius: radius, fontWeight: 600, fontSize: 15, cursor: "pointer" }}>View Case Studies</button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {heroImg ? (
              <img src={heroImg} alt="Hero" onClick={() => onPhotoClick?.(0)} style={{ width: "100%", height: 370, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div style={{ width: "100%", height: 370, borderRadius: radius, background: "rgba(255,255,255,.08)" }} />
            )}
            <span style={{ position: "absolute", bottom: 16, left: 16, background: "#0f172a", color: accent, fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,.3)" }}>{serviceArea || "Remote"}</span>
          </div>
        </section>

        {/* Main Grid */}
        <section className="tch-cy-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, backdropFilter: "blur(6px)" }}>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 18px", color: "#fff" }}>Services</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {services.map((s) => (
                <span key={s} style={{ fontSize: 14, lineHeight: 1.8 }}>▸ {s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, backdropFilter: "blur(6px)" }}>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 20, fontWeight: 700, margin: "0 0 18px", color: "#fff" }}>Case Studies</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {caseStudies.map((c) => (
                <div key={c?.filename} style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "14px 18px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#fff" }}>{c?.filename}</div>
                  <div style={{ fontSize: 13, opacity: 0.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="tch-cy-info" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px", color: "#fff" }}>Tech Skills</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {skills.map((s) => (
                <span key={s} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 10, background: "rgba(255,255,255,.08)", border: "1px solid rgba(34,197,94,.15)", color: accent }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 700, margin: "0 0 14px", color: "#fff" }}>Client Examples</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ width: "100%", aspectRatio: "1", background: "rgba(255,255,255,.06)", borderRadius: 10 }} />
              ))}
            </div>
          </div>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 12 }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 16, fontWeight: 700, margin: 0, color: "#fff" }}>GitHub / Portfolio</h3>
            <p style={{ fontSize: 13, opacity: 0.55, margin: 0 }}>View open-source contributions and project repositories.</p>
            <button style={{ padding: "10px 22px", background: accent, color: accentText, border: "none", borderRadius: radius, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Visit Portfolio</button>
          </div>
        </section>

        {/* Lower Grid */}
        <section className="tch-cy-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1200, margin: "0 auto", padding: "0 40px 32px" }}>
          <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 18px", color: "#fff" }}>Book a Consultation</h3>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Your name" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(34,197,94,.15)", background: "rgba(255,255,255,.06)", fontSize: 14, outline: "none", color: fg }} />
              <input placeholder="Email" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(34,197,94,.15)", background: "rgba(255,255,255,.06)", fontSize: 14, outline: "none", color: fg }} />
              <input placeholder="Project type" style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(34,197,94,.15)", background: "rgba(255,255,255,.06)", fontSize: 14, outline: "none", color: fg }} />
              <textarea placeholder="Tell me about your project" rows={3} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid rgba(34,197,94,.15)", background: "rgba(255,255,255,.06)", fontSize: 14, resize: "vertical", outline: "none", color: fg }} />
              <button type="submit" style={{ padding: "12px 0", background: accent, color: accentText, border: "none", borderRadius: radius, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>Send Message</button>
            </form>
          </div>
          <div style={{ background: accent, borderRadius: radius, padding: 36, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, color: accentText }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 22, fontWeight: 700, margin: 0 }}>Project Fit</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, opacity: 0.9 }}>From one-time audits to ongoing red-team exercises — let's scope your security posture.</p>
            <blockquote style={{ margin: 0, paddingLeft: 16, borderLeft: "3px solid rgba(5,46,22,.3)", fontSize: 14, fontStyle: "italic", opacity: 0.8 }}>"Their pen test uncovered three critical vulnerabilities our scanner missed."</blockquote>
          </div>
        </section>

        {/* Gallery */}
        <section className="tch-cy-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 16, maxWidth: 1200, margin: "0 auto", padding: "0 40px 60px" }}>
          {[0, 1, 2].map((i) => {
            const img = galleryImgs[i];
            return img ? (
              <img key={i} src={img.url} alt={img?.filename || ""} onClick={() => onPhotoClick?.(i)} style={{ width: "100%", height: i === 0 ? 320 : 200, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div key={i} style={{ width: "100%", height: i === 0 ? 320 : 200, borderRadius: radius, background: "rgba(255,255,255,.06)" }} />
            );
          })}
        </section>
      </div>

      <style>{`
        @media(max-width:800px){
          .tch-cy-hero,.tch-cy-main,.tch-cy-lower{grid-template-columns:1fr!important}
          .tch-cy-info{grid-template-columns:1fr 1fr!important}
          .tch-cy-gallery{grid-template-columns:1fr 1fr!important}
          .tch-cy-nav{padding:14px 20px!important}
          .tch-cy-hero,.tch-cy-main,.tch-cy-info,.tch-cy-lower,.tch-cy-gallery{padding-left:20px!important;padding-right:20px!important}
        }
        @media(max-width:520px){
          .tch-cy-info,.tch-cy-gallery{grid-template-columns:1fr!important}
          .tch-cy-nav-links{display:none!important}
          .tch-cy-cta{flex-direction:column}
        }
      `}</style>
    </>
  );
}
