// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap');`;

export default function TemplateCreativeVoice(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Commercial", "Narration", "Character"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{
        minHeight: 780, padding: "78px 6vw", position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#111827,#312e81 56%,#581c87)",
        color: "#ede9fe", fontFamily: "Inter,system-ui,sans-serif"
      }}>
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: 999, background: "rgba(192,132,252,.18)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="creative-voice-wrap" style={{ width: "min(1220px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="creative-voice-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em", color: "#fff" }}>
              <span style={{ width: 42, height: 42, borderRadius: 15, display: "grid", placeItems: "center", background: "#c084fc", color: "#111827", boxShadow: "0 14px 34px rgba(0,0,0,.3)", fontWeight: 950 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="creative-voice-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .72, color: "#ddd6fe" }}>
              <span>Portfolio</span><span>Services</span><span>Pricing</span><span>Inquiry</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="creative-voice-hero" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", fontSize: 13, fontWeight: 900, color: "#f8fafc" }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: "#fff" }}>
                {tagline || "A voice that carries the message with character."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#d1fae5", fontSize: 14, color: "#059669", verticalAlign: "middle" }} title="Verified">✓</span>
                )}
              </h2>
              <p style={{ maxWidth: 700, margin: "22px 0 0", opacity: .78, fontSize: 18, lineHeight: 1.7, color: "#ede9fe" }}>
                {bio || "An audio-forward voice actor template with demo reel player styling, voice types, studio specs, and booking inquiry flow."}
              </p>
              <div className="creative-voice-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                {["Commercial Demo", "Narration Reel", "Character Reel"].map((proj, i) => (
                  <div key={i} style={{ padding: 16, minHeight: 86, borderRadius: 22, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 14px 34px rgba(0,0,0,.18)" }}>
                    <b style={{ display: "block", color: "#c084fc", marginBottom: 6 }}>{proj}</b>
                    <span style={{ color: "#ddd6fe" }}>Featured project</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30 }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#c084fc", color: "#111827", fontWeight: 950, boxShadow: "0 18px 46px rgba(0,0,0,.3)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
            <div style={{ position: "relative", borderRadius: "999px 999px 40px 40px", overflow: "hidden", boxShadow: "0 28px 90px rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.15)", background: "#1e1b4b" }}>
              {heroImg && <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />}
              <div style={{ position: "absolute", top: 22, right: 22, padding: "10px 16px", borderRadius: 999, background: "#fff", color: "#111827", fontWeight: 900, fontSize: 14, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}>
                ▶ 00:42
              </div>
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(255,255,255,.1)", backdropFilter: "blur(16px)", color: "#f8fafc", fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(0,0,0,.25)" }}>
                Demo reel · Voice types · Studio specs
              </div>
            </div>
          </div>

          {/* Main Grid - Services + Pricing */}
          <div className="creative-voice-main" style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.18)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Services</h3>
              <ul className="creative-voice-services" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, margin: 0, padding: 0, listStyle: "none" }}>
                {["Commercial voiceover", "Audiobook narration", "Explainer videos", "Character voices", "IVR prompts", "Remote recording"].map((s, i) => (
                  <li key={i} style={{ minHeight: 54, padding: 14, borderRadius: 18, display: "flex", gap: 10, alignItems: "flex-start", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", fontWeight: 850, color: "#ede9fe" }}>
                    <span style={{ color: "#c084fc", fontWeight: 950 }}>✦</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.18)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Pricing</h3>
              <div className="creative-voice-pricing" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 24 }}>
                {[
                  { name: "Short Spot", price: "$300", desc: "Up to 60 seconds" },
                  { name: "Narration", price: "$750", desc: "Explainer or training module" },
                  { name: "Campaign", price: "$2,500+", desc: "Multi-spot usage package" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 22, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", minHeight: 178, display: "flex", flexDirection: "column" as const, justifyContent: "space-between" }}>
                    <strong style={{ fontSize: 18, color: "#f8fafc" }}>{pkg.name}</strong>
                    <div style={{ margin: "14px 0 8px", color: "#c084fc", fontSize: 31, fontWeight: 950, letterSpacing: "-.06em" }}>{pkg.price}</div>
                    <small style={{ color: "#ddd6fe", lineHeight: 1.5 }}>{pkg.desc}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Grid - Inquiry + Testimonials */}
          <div className="creative-voice-lower" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 24, marginTop: 24 }}>
            <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.18)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Inquiry Form</h3>
              <p style={{ margin: 0, color: "#ddd6fe", lineHeight: 1.65 }}>Use this visual form block to collect project type, budget range, timeline, and creative direction.</p>
              <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
                <div style={{ width: "100%", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.06)", color: "#a78bfa" }}>Your name</div>
                <div style={{ width: "100%", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.06)", color: "#a78bfa" }}>Email address</div>
                <div style={{ width: "100%", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.06)", color: "#a78bfa" }}>Project type</div>
                <div style={{ width: "100%", border: "1px solid rgba(255,255,255,.18)", borderRadius: 16, padding: "13px 14px", background: "rgba(255,255,255,.06)", color: "#a78bfa", minHeight: 96 }}>Tell me about your project</div>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "#c084fc", color: "#111827", fontWeight: 950, boxShadow: "0 18px 46px rgba(0,0,0,.3)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Hire Me</button>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.16)" }}>
                <p style={{ margin: 0, opacity: .82, lineHeight: 1.6, color: "#ede9fe" }}>"The read was warm, polished, and exactly on brief."</p>
                <b style={{ display: "block", marginTop: 12, color: "#f8fafc" }}>— Client testimonial</b>
              </div>
              <div style={{ padding: 20, borderRadius: 24, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", boxShadow: "0 16px 42px rgba(0,0,0,.16)" }}>
                <p style={{ margin: 0, opacity: .82, lineHeight: 1.6, color: "#ede9fe" }}>"Fast turnaround and broadcast-quality audio."</p>
                <b style={{ display: "block", marginTop: 12, color: "#f8fafc" }}>— Client testimonial</b>
              </div>
              <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.18)" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: 24, letterSpacing: "-.035em", color: "#fff" }}>Portfolio / Gallery</h3>
                <p style={{ margin: 0, color: "#ddd6fe", lineHeight: 1.65 }}>Featured work, selected projects, process imagery, and proof of style live together in a clean visual section.</p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="creative-voice-gallery" style={{ display: "grid", gridTemplateColumns: "1.2fr .8fr .8fr", gap: 14, marginTop: 26 }}>
            {portfolio.slice(0, 3).map((photo, i) => (
              <img key={photo.id} src={photo.url} alt={photo.filename || `Gallery ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: i === 0 ? 224 : 172, objectFit: "cover", borderRadius: 24, boxShadow: "0 18px 42px rgba(0,0,0,.2)", cursor: "pointer", display: "block" }} loading="lazy" />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .creative-voice-hero, .creative-voice-main, .creative-voice-lower { grid-template-columns: 1fr !important; }
          .creative-voice-pricing, .creative-voice-strip, .creative-voice-gallery { grid-template-columns: 1fr !important; }
          .creative-voice-services { grid-template-columns: 1fr !important; }
          .creative-voice-gallery img { height: 220px !important; }
          .creative-voice-nav { align-items: flex-start !important; flex-direction: column !important; }
          .creative-voice-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 620px) {
          .creative-voice-hero h2 { font-size: 40px !important; }
        }
      `}</style>
    </>
  );
}
