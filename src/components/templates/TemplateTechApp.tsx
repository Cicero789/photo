// @ts-nocheck
import { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateTechApp({ name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick }: TemplateProps) {
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const accent = "#0891b2";
  const accentText = "#ecfeff";
  const br = "999px 999px 40px 40px";
  const pills = specialties?.length ? specialties.slice(0, 3) : ["Mobile Development", "iOS & Android", "App Strategy"];
  const heading = tagline || "Mobile apps that feel fast, focused, and easy to use.";
  const desc = bio || "Mobile app development for startups and growing teams. From wireframe to app store, every screen built for speed and clarity.";
  const services = ["iOS development", "Android apps", "Cross-platform builds", "UI/UX for mobile", "App store launch", "Post-launch support"];
  const skills = ["React Native", "Swift", "Kotlin", "Flutter", "Firebase", "Figma"];
  const cases = [
    { title: "Fitness Tracker", desc: "Activity tracking with real-time syncing and coaching." },
    { title: "Local Marketplace", desc: "Peer-to-peer marketplace with map-based discovery." },
    { title: "Booking App", desc: "Scheduling and payments for a service-based business." },
  ];
  const heroImg = portfolio?.[0]?.url;
  const gallery = portfolio?.slice(0, 3) || [];

  const card: React.CSSProperties = { background: "rgba(255,255,255,.84)", border: "1px solid rgba(8,145,178,.08)", borderRadius: br, padding: 28 };
  const btn: React.CSSProperties = { background: accent, color: "#fff", border: "none", borderRadius: br, padding: "13px 30px", fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 18px rgba(8,145,178,.25)" };
  const btnOutline: React.CSSProperties = { ...btn, background: "transparent", color: accent, border: `1.5px solid ${accent}`, boxShadow: "none" };

  return (
    <>
      <style>{fonts}</style>
      <div className="tch-ap-tpl" style={{ background: "linear-gradient(135deg,#ecfeff,#fff 48%,#eef2ff)", fontFamily: "Inter,sans-serif", color: "#111827", minHeight: "100vh" }}>
        {/* Nav */}
        <nav className="tch-ap-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 38px", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 18 }}>{(name || "A")[0]}</div>
            <span style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 18 }}>{name || "App Developer"}</span>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500 }}>
            {["Services", "Case Studies", "Tech Skills", "Consultation"].map(l => <a key={l} style={{ color: "#111827", textDecoration: "none" }}>{l}</a>)}
          </div>
        </nav>

        {/* Hero */}
        <section className="tch-ap-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "48px 38px 32px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {pills.map(p => <span key={p} style={{ background: `${accent}14`, color: accent, fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 99 }}>{p}</span>)}
            </div>
            <h1 style={{ fontFamily: "Space Grotesk,sans-serif", fontSize: 38, fontWeight: 700, lineHeight: 1.15, margin: "0 0 10px" }}>
              {heading}{verified && <span style={{ display: "inline-block", width: 22, height: 22, borderRadius: "50%", background: "#16a34a", color: "#fff", fontSize: 13, textAlign: "center", lineHeight: "22px", marginLeft: 8, verticalAlign: "middle" }}>✓</span>}
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4b5563", margin: "0 0 18px", maxWidth: 520 }}>{desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
              {skills.map(s => <span key={s} style={{ fontSize: 12, fontWeight: 600, color: accent, background: `${accent}0c`, padding: "4px 12px", borderRadius: 99 }}>#{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onHire} style={btn}>Hire Me{priceLabel ? ` · ${priceLabel}` : ""}</button>
              <button style={btnOutline}>View Case Studies</button>
            </div>
          </div>
          {heroImg && (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => onPhotoClick?.(0)}>
              <img src={heroImg} alt="" style={{ width: "100%", borderRadius: br, objectFit: "cover", aspectRatio: "4/3" }} />
              <span style={{ position: "absolute", bottom: 14, left: 14, background: accent, color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 99 }}>Featured Project</span>
            </div>
          )}
        </section>

        {/* Main grid */}
        <section className="tch-ap-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 38px 28px" }}>
          <div style={card}>
            <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 20, margin: "0 0 18px" }}>Services</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {services.map(s => <div key={s} style={{ fontSize: 14, color: "#374151" }}><span style={{ color: accent, marginRight: 6 }}>▸</span>{s}</div>)}
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 20, margin: "0 0 18px" }}>Case Studies</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cases.map(c => <div key={c?.filename} style={{ padding: "12px 16px", background: "#f0fdfa", borderRadius: 12 }}><strong style={{ fontSize: 14 }}>{c?.filename}</strong><p style={{ fontSize: 13, color: "#6b7280", margin: "4px 0 0" }}>{c.desc}</p></div>)}
            </div>
          </div>
        </section>

        {/* Info grid */}
        <section className="tch-ap-info" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, padding: "0 38px 28px" }}>
          <div style={card}>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, margin: "0 0 14px" }}>Tech Skills</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map(s => <span key={s} style={{ fontSize: 12, fontWeight: 500, padding: "4px 14px", borderRadius: 99, background: `${accent}10`, color: accent }}>{s}</span>)}
            </div>
          </div>
          <div style={card}>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, margin: "0 0 14px" }}>Client Examples</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map(i => <div key={i} style={{ width: "100%", aspectRatio: "1", background: "#e5e7eb", borderRadius: 10 }} />)}
            </div>
          </div>
          <div style={card}>
            <h4 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, margin: "0 0 14px" }}>GitHub / Portfolio</h4>
            <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>Explore published apps and open-source mobile libraries.</p>
            <button onClick={onHire} style={{ ...btnOutline, marginTop: 16, padding: "10px 22px", fontSize: 13 }}>View Portfolio</button>
          </div>
        </section>

        {/* Lower grid */}
        <section className="tch-ap-lower" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 38px 28px" }}>
          <div style={card}>
            <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 20, margin: "0 0 18px" }}>Book a Consultation</h3>
            {["Your name", "Email", "Project type", "Message"].map(f => (
              f === "Message"
                ? <textarea key={f} placeholder={f} rows={3} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "Inter,sans-serif", marginBottom: 12, resize: "vertical", boxSizing: "border-box" }} />
                : <input key={f} placeholder={f} style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "Inter,sans-serif", marginBottom: 12, boxSizing: "border-box" }} />
            ))}
            <button onClick={onHire} style={{ ...btn, width: "100%", marginTop: 4 }}>Send Message</button>
          </div>
          <div style={{ ...card, background: accent, color: accentText, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontFamily: "Space Grotesk,sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 14px", color: "#fff" }}>Project Fit</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 20px", opacity: 0.92 }}>Bring your app idea or existing prototype — let's talk scope, timeline, and what launch looks like.</p>
            <blockquote style={{ borderLeft: "3px solid rgba(255,255,255,.4)", paddingLeft: 16, margin: 0, fontStyle: "italic", fontSize: 14, opacity: 0.85 }}>"From first wireframe to app store approval in under eight weeks."</blockquote>
          </div>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="tch-ap-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 18, padding: "0 38px 48px" }}>
            {gallery.map((img, i) => (
              <img key={i} src={img.url} alt="" onClick={() => onPhotoClick?.(i)} style={{ width: "100%", borderRadius: br, objectFit: "cover", height: i === 0 ? 340 : 220, cursor: "pointer" }} />
            ))}
          </section>
        )}
      </div>
      <style>{`
        @media(max-width:800px){
          .tch-ap-hero,.tch-ap-main,.tch-ap-lower{grid-template-columns:1fr!important}
          .tch-ap-info{grid-template-columns:1fr!important}
          .tch-ap-gallery{grid-template-columns:1fr!important}
          .tch-ap-hero img{aspect-ratio:16/9}
        }
        @media(max-width:520px){
          .tch-ap-tpl{font-size:14px}
          .tch-ap-hero h1{font-size:26px!important}
          .tch-ap-nav{padding:14px 18px!important}
          .tch-ap-hero,.tch-ap-main,.tch-ap-info,.tch-ap-lower,.tch-ap-gallery{padding-left:18px!important;padding-right:18px!important}
        }
      `}</style>
    </>
  );
}
