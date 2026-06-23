// @ts-nocheck
import type { TemplateProps } from "./types";

export default function TemplateTechData({
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

  const accent = "#0ea5e9";
  const shadow = "rgba(14,165,233,.25)";
  const radius = 18;
  const pills = specialties?.length ? specialties.slice(0, 3) : ["Data Engineering", "Analytics", "BI"];
  const heading = tagline || "Turn scattered data into decisions people can trust.";
  const desc = bio || "Data engineering and analytics consulting. Build pipelines, dashboards, and systems that make data useful instead of overwhelming.";
  const services = ["Data pipeline design", "Dashboard builds", "ETL development", "Data warehouse setup", "Analytics strategy", "Reporting automation"];
  const skills = ["Python", "SQL", "dbt", "Snowflake", "Tableau", "Airflow"];
  const cases = [
    { t: "Revenue Dashboard", d: "Real-time revenue tracking across three business units." },
    { t: "Data Lake Migration", d: "Moved 12 TB from legacy warehouse to cloud-native stack." },
    { t: "KPI Automation", d: "Automated weekly KPI reports saving 20+ analyst hours." },
  ];
  const heroImg = portfolio?.[0]?.url;
  const galleryImgs = portfolio?.slice(0, 3) || [];

  const card: React.CSSProperties = { background: "rgba(255,255,255,.84)", border: "1px solid rgba(14,165,233,.08)", borderRadius: radius, padding: 28 };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`}</style>

      <div id="tch-da" style={{ fontFamily: "'Inter',sans-serif", color: "#111827", background: "linear-gradient(135deg,#fff,#f8fafc 48%,#e0f2fe)", minHeight: "100vh" }}>
        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 36px", borderBottom: "1px solid rgba(14,165,233,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>{(name || "D")[0]}</div>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>{name || "Data Pro"}</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {["Services", "Case Studies", "Tech Skills", "Consultation"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ color: "#111827", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "64px 36px 48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {pills.map((p) => (
                <span key={p} style={{ padding: "5px 14px", borderRadius: 999, border: `1px solid ${shadow}`, fontSize: 12, fontWeight: 600, color: accent }}>{p}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px" }}>
              {heading}
              {verified && <span style={{ marginLeft: 10, fontSize: 20, color: accent }}>✓</span>}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#4b5563", maxWidth: 520, margin: "0 0 22px" }}>{desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
              {skills.map((s) => <span key={s} style={{ fontSize: 12, fontWeight: 600, color: "#475569", background: "rgba(14,165,233,.08)", padding: "4px 10px", borderRadius: 6 }}>#{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onHire} style={{ padding: "13px 30px", borderRadius: radius, background: accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 14px ${shadow}` }}>
                Hire Me{priceLabel && ` — ${priceLabel}`}
              </button>
              <a href="#case-studies" style={{ padding: "13px 30px", borderRadius: radius, border: `1.5px solid ${accent}`, color: accent, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>View Case Studies</a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {heroImg ? (
              <img src={heroImg} alt="Hero" onClick={() => onPhotoClick?.(0)} style={{ width: "100%", borderRadius: radius, objectFit: "cover", aspectRatio: "4/3", cursor: "pointer", boxShadow: `0 8px 30px ${shadow}` }} />
            ) : (
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: radius, background: "rgba(14,165,233,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#94a3b8" }}>Hero image</div>
            )}
            <div style={{ position: "absolute", bottom: 14, left: 14, background: accent, color: "#fff", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{serviceArea || "Remote"}</div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section id="services" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>Services</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {services.map((s) => <span key={s} style={{ fontSize: 14 }}>▸ {s}</span>)}
            </div>
          </div>
          <div id="case-studies" style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>Case Studies</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cases.map((c) => (
                <div key={c.t} style={{ padding: 14, borderRadius: 12, background: "rgba(14,165,233,.04)", border: "1px solid rgba(14,165,233,.08)" }}>
                  <strong style={{ fontSize: 15 }}>{c.t}</strong>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO GRID */}
        <section id="tech-skills" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px" }}>Tech Skills</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {skills.map((s) => <span key={s} style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(14,165,233,.08)", fontSize: 12, fontWeight: 600, color: accent }}>{s}</span>)}
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px" }}>Client Examples</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: "#e5e7eb" }} />)}
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px" }}>GitHub / Portfolio</h3>
            <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 16px" }}>Browse open-source work, code samples, and project repos.</p>
            <a href="#" style={{ color: accent, fontWeight: 600, fontSize: 14 }}>View Portfolio →</a>
          </div>
        </section>

        {/* LOWER GRID */}
        <section id="consultation" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>Book a Consultation</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Name", "Email", "Project Type", "Message"].map((f) => (
                <input key={f} placeholder={f} style={{ padding: 12, borderRadius: 10, border: "1px solid rgba(14,165,233,.12)", fontSize: 14, outline: "none" }} />
              ))}
              <button type="submit" style={{ padding: "13px 0", borderRadius: radius, background: accent, color: "#fff", border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>Send Message</button>
            </form>
          </div>
          <div style={{ ...card, background: accent, color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 14px", color: "#fff" }}>Project Fit</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, fontStyle: "italic", opacity: 0.95 }}>
              "From messy spreadsheets to production pipelines — let's map your data strategy."
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 16, padding: "0 36px 48px" }}>
          {[0, 1, 2].map((i) => {
            const img = galleryImgs[i];
            return img ? (
              <img key={i} src={img.url} alt={img?.filename || ""} onClick={() => onPhotoClick?.(i)} style={{ width: "100%", height: i === 0 ? 340 : 220, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div key={i} style={{ width: "100%", height: i === 0 ? 340 : 220, borderRadius: radius, background: "rgba(14,165,233,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#94a3b8" }}>Photo {i + 1}</div>
            );
          })}
        </section>
      </div>

      <style>{`
        @media(max-width:800px){
          #tch-da section{grid-template-columns:1fr!important;padding-left:20px!important;padding-right:20px!important}
          #tch-da nav{padding:14px 20px!important}
          #tch-da h1{font-size:32px!important}
        }
        @media(max-width:520px){
          #tch-da h1{font-size:26px!important}
          #tch-da nav>div:last-child{display:none!important}
        }
      `}</style>
    </>
  );
}
