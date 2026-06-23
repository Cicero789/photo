// @ts-nocheck
import type { TemplateProps } from "./types";

export default function TemplateTechProduct({
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
  const accent = "#92400e";
  const radius = "28px";
  const pills = specialties?.length ? specialties : ["Product Management", "Strategy", "Roadmaps"];
  const services = ["Product strategy", "Roadmap planning", "User research", "Feature prioritization", "Sprint planning", "Stakeholder alignment"];
  const skills = ["Figma", "Notion", "Jira", "Amplitude", "Miro", "Linear"];
  const cases = ["SaaS Pivot Strategy", "Feature Audit", "MVP Definition"];
  const heroTagline = tagline || "Product direction for teams that need focus before speed.";
  const heroBio = bio || "Product management consulting for teams navigating growth, pivots, or feature overload. Clarity before velocity.";
  const heroImg = portfolio?.[0]?.url;
  const galleryImgs = portfolio?.slice(0, 3) || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');
        .tch-pr-wrap{margin:0;padding:0;font-family:'Inter',sans-serif;color:#111827;background:linear-gradient(135deg,#faf7ef,#fff 48%,#f3e8d6);min-height:100vh}
        .tch-pr-wrap *{box-sizing:border-box}
        @media(max-width:800px){.tch-pr-resp-2{grid-template-columns:1fr!important}.tch-pr-resp-3{grid-template-columns:1fr!important}.tch-pr-gallery{grid-template-columns:1fr!important}}
        @media(max-width:520px){.tch-pr-hero-h{font-size:1.6rem!important}}
      `}</style>
      <div className="tch-pr-wrap">
        {/* NAV */}
        <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 36px", maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, boxShadow: `0 2px 8px rgba(146,64,14,.25)` }}>{name?.charAt(0) || "P"}</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>{name || "Product Pro"}</span>
          </div>
          <span style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 500, color: "#6b7280" }}>
            <span>Services</span><span>Case Studies</span><span>Tech Skills</span><span>Consultation</span>
          </span>
        </nav>

        {/* HERO */}
        <section className="tch-pr-resp-2" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 40, maxWidth: 1140, margin: "0 auto", padding: "48px 36px 40px" }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {pills.map((p, i) => <span key={i} style={{ background: "rgba(146,64,14,.08)", color: accent, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{p}</span>)}
            </div>
            <h1 className="tch-pr-hero-h" style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "2.2rem", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
              {heroTagline}{verified && <span style={{ display: "inline-block", marginLeft: 8, background: "#16a34a", color: "#fff", fontSize: 13, borderRadius: "50%", width: 22, height: 22, textAlign: "center", lineHeight: "22px", verticalAlign: "middle" }}>✓</span>}
            </h1>
            <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{heroBio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {skills.map((s, i) => <span key={i} style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", background: "rgba(146,64,14,.05)", padding: "3px 10px", borderRadius: 14 }}>#{s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 6 }}>
              <button onClick={onHire} style={{ background: accent, color: "#fff", border: "none", padding: "12px 28px", borderRadius: radius, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Hire Me</button>
              {priceLabel && <span style={{ fontSize: 12, color: "#6b7280" }}>{priceLabel}</span>}
              <button style={{ background: "transparent", border: `1.5px solid ${accent}`, color: accent, padding: "12px 24px", borderRadius: radius, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>View Case Studies</button>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            {heroImg ? (
              <img src={heroImg} alt="" onClick={() => onPhotoClick?.(0)} style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : <div style={{ width: "100%", height: 340, borderRadius: radius, background: "rgba(146,64,14,.06)" }} />}
            <span style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(0,0,0,.58)", color: "#fff", fontSize: 11, padding: "4px 12px", borderRadius: 14, fontWeight: 600 }}>{serviceArea || "Remote"}</span>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="tch-pr-resp-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 1140, margin: "0 auto", padding: "0 36px 36px" }}>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 18px", fontSize: 18, fontWeight: 700 }}>Services</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
              {services.map((s, i) => <span key={i} style={{ fontSize: 14, color: "#374151" }}>▸ {s}</span>)}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 18px", fontSize: 18, fontWeight: 700 }}>Case Studies</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cases.map((c, i) => (
                <div key={i} style={{ background: "rgba(146,64,14,.04)", borderRadius: 14, padding: "14px 18px" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{c}</span>
                  <p style={{ margin: "6px 0 0", fontSize: 12, color: "#6b7280" }}>Strategy case study exploring product outcomes and team alignment.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO GRID */}
        <section className="tch-pr-resp-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1140, margin: "0 auto", padding: "0 36px 36px" }}>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 24 }}>
            <h4 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Tech Skills</h4>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{skills.map((s, i) => <span key={i} style={{ background: "rgba(146,64,14,.07)", color: accent, fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 14 }}>{s}</span>)}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 24 }}>
            <h4 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Client Examples</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>{[0,1,2,3].map(i => <div key={i} style={{ background: "#e5e7eb", borderRadius: 10, height: 64 }} />)}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 24 }}>
            <h4 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>GitHub / Portfolio</h4>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Explore open-source contributions and product thinking in public repositories and case studies.</p>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="tch-pr-resp-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, maxWidth: 1140, margin: "0 auto", padding: "0 36px 36px" }}>
          <div style={{ background: "rgba(255,255,255,.84)", border: "1px solid rgba(146,64,14,.08)", borderRadius: radius, padding: 28 }}>
            <h3 style={{ fontFamily: "'Libre Baskerville',serif", margin: "0 0 18px", fontSize: 18, fontWeight: 700 }}>Consultation</h3>
            <form onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Your name", "Email", "Project type"].map((ph, i) => <input key={i} placeholder={ph} style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none" }} />)}
              <textarea placeholder="Message" rows={3} style={{ border: "1px solid #d1d5db", borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", resize: "vertical" }} />
              <button style={{ background: accent, color: "#fff", border: "none", padding: "12px 0", borderRadius: radius, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 4 }}>Send Request</button>
            </form>
          </div>
          <div style={{ background: accent, borderRadius: radius, padding: 36, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ fontFamily: "'Libre Baskerville',serif", color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 14px" }}>Project Fit</h3>
            <p style={{ color: "rgba(255,255,255,.88)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>Whether you're pre-launch or scaling, let's align your product direction before building more.</p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="tch-pr-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 16, maxWidth: 1140, margin: "0 auto", padding: "0 36px 48px" }}>
          {[0, 1, 2].map(i => {
            const img = galleryImgs[i];
            const h = i === 0 ? 224 : 172;
            return img ? (
              <img key={i} src={img.url} alt="" onClick={() => onPhotoClick?.(i)} style={{ width: "100%", height: h, objectFit: "cover", borderRadius: radius, cursor: "pointer" }} />
            ) : (
              <div key={i} style={{ width: "100%", height: h, borderRadius: radius, background: "rgba(146,64,14,.05)" }} />
            );
          })}
        </section>
      </div>
    </>
  );
}
