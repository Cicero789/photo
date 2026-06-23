// @ts-nocheck
import type { TemplateProps } from "./types";

export default function TemplateTechAI({
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

  const accent = "#a78bfa";
  const accentText = "#111827";
  const fg = "#e0e7ff";
  const headingColor = "#fff";
  const cardBg = "rgba(255,255,255,.08)";
  const cardBorder = "rgba(167,139,250,.18)";
  const radius = "26px 90px 26px 90px";
  const pills = specialties?.length ? specialties.slice(0, 3) : ["AI / ML", "LLM Integration", "Data Science"];
  const heading = tagline || "AI strategy that moves from hype to working systems.";
  const desc = bio || "AI and machine learning consulting for teams that want practical results, not just impressive demos.";
  const services = ["AI strategy consulting", "ML model development", "NLP integration", "Computer vision", "LLM fine-tuning", "MLOps setup"];
  const skills = ["Python", "PyTorch", "TensorFlow", "OpenAI API", "Hugging Face", "LangChain"];
  const cases = [
    { t: "Customer Support Bot", d: "Reduced ticket volume 40% with context-aware chatbot." },
    { t: "Document Classifier", d: "Automated intake of 5k+ documents per day with 97% accuracy." },
    { t: "Recommendation Engine", d: "Personalized content feed boosting engagement by 28%." },
  ];
  const heroImg = portfolio?.[0]?.url;
  const galleryImgs = portfolio?.slice(0, 3) || [];

  const card: React.CSSProperties = { background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: radius, padding: 28 };
  const inputStyle: React.CSSProperties = { padding: 12, borderRadius: 10, border: "1px solid rgba(167,139,250,.15)", background: "rgba(255,255,255,.06)", color: fg, fontSize: 14, outline: "none" };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');
        #tch-ai input::placeholder{color:#6b7280!important}`}</style>

      <div id="tch-ai" style={{ fontFamily: "'Inter',sans-serif", color: fg, background: "radial-gradient(circle at 16% 18%,rgba(168,85,247,.28),transparent 25%),linear-gradient(135deg,#111827,#1e1b4b 55%,#312e81)", minHeight: "100vh" }}>
        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 36px", borderBottom: `1px solid ${cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: accent, color: accentText, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18 }}>{(name || "A")[0]}</div>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: headingColor }}>{name || "AI Studio"}</span>
          </div>
          <div style={{ display: "flex", gap: 28, fontSize: 14, fontWeight: 500 }}>
            {["Services", "Case Studies", "Tech Skills", "Consultation"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`} style={{ color: "#f8fafc", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </nav>

        {/* HERO */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "64px 36px 48px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {pills.map((p) => (
                <span key={p} style={{ padding: "5px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(167,139,250,.15)", fontSize: 12, fontWeight: 600, color: accent }}>{p}</span>
              ))}
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: "0 0 12px", color: headingColor }}>
              {heading}
              {verified && <span style={{ marginLeft: 10, fontSize: 20, color: accent }}>✓</span>}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "#94a3b8", maxWidth: 520, margin: "0 0 22px" }}>{desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 26 }}>
              {skills.map((s) => <span key={s} style={{ fontSize: 12, fontWeight: 600, color: "#c4b5fd", background: "rgba(167,139,250,.12)", padding: "4px 10px", borderRadius: 6 }}>#{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={onHire} style={{ padding: "13px 30px", borderRadius: radius, background: accent, color: accentText, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 4px 14px rgba(0,0,0,.3)" }}>
                Hire Me{priceLabel && ` — ${priceLabel}`}
              </button>
              <a href="#case-studies" style={{ padding: "13px 30px", borderRadius: radius, border: `1.5px solid ${accent}`, color: accent, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "inline-block" }}>View Case Studies</a>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {heroImg ? (
              <img src={heroImg} alt="Hero" onClick={() => onPhotoClick?.(0)} style={{ width: "100%", borderRadius: radius, objectFit: "cover", aspectRatio: "4/3", cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }} />
            ) : (
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: radius, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#6b7280" }}>Hero image</div>
            )}
            <div style={{ position: "absolute", bottom: 14, left: 14, background: accent, color: accentText, padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{serviceArea || "Remote"}</div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section id="services" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px", color: headingColor }}>Services</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {services.map((s) => <span key={s} style={{ fontSize: 14 }}>▸ {s}</span>)}
            </div>
          </div>
          <div id="case-studies" style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px", color: headingColor }}>Case Studies</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cases.map((c) => (
                <div key={c.t} style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.04)", border: `1px solid ${cardBorder}` }}>
                  <strong style={{ fontSize: 15, color: headingColor }}>{c.t}</strong>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#94a3b8" }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO GRID */}
        <section id="tech-skills" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px", color: headingColor }}>Tech Skills</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {skills.map((s) => <span key={s} style={{ padding: "5px 12px", borderRadius: 999, background: "rgba(167,139,250,.14)", fontSize: 12, fontWeight: 600, color: accent }}>{s}</span>)}
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px", color: headingColor }}>Client Examples</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[0, 1, 2, 3].map((i) => <div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: "rgba(255,255,255,.06)" }} />)}
            </div>
          </div>
          <div style={card}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, margin: "0 0 14px", color: headingColor }}>GitHub / Portfolio</h3>
            <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 16px" }}>Explore open-source models, notebooks, and experiment repos.</p>
            <a href="#" style={{ color: accent, fontWeight: 600, fontSize: 14 }}>View Portfolio →</a>
          </div>
        </section>

        {/* LOWER GRID */}
        <section id="consultation" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "0 36px 36px" }}>
          <div style={card}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px", color: headingColor }}>Book a Consultation</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Name", "Email", "Project Type", "Message"].map((f) => (
                <input key={f} placeholder={f} style={inputStyle} />
              ))}
              <button type="submit" style={{ padding: "13px 0", borderRadius: radius, background: accent, color: accentText, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>Send Message</button>
            </form>
          </div>
          <div style={{ ...card, background: accent, color: accentText, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, margin: "0 0 14px", color: accentText }}>Project Fit</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, fontStyle: "italic", opacity: 0.95 }}>
              "Whether you're exploring AI for the first time or scaling an existing model, let's talk use cases."
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
              <div key={i} style={{ width: "100%", height: i === 0 ? 340 : 220, borderRadius: radius, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#6b7280" }}>Photo {i + 1}</div>
            );
          })}
        </section>
      </div>

      <style>{`
        @media(max-width:800px){
          #tch-ai section{grid-template-columns:1fr!important;padding-left:20px!important;padding-right:20px!important}
          #tch-ai nav{padding:14px 20px!important}
          #tch-ai h1{font-size:32px!important}
        }
        @media(max-width:520px){
          #tch-ai h1{font-size:26px!important}
          #tch-ai nav>div:last-child{display:none!important}
        }
      `}</style>
    </>
  );
}
