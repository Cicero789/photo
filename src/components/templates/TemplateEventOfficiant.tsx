// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

const P = "evt-of-tpl";
const ACCENT = "#be185d";
const ACCENT_TEXT = "#fff";
const DISPLAY = "'Libre Baskerville',serif";
const BODY = "'Inter',system-ui,sans-serif";
const RADIUS = "44px";
const BG = "linear-gradient(135deg,#fff7ed,#fff 48%,#fce7f3)";
const CARD_BG = "#fff";
const CARD_BORDER = "1px solid rgba(190,24,93,.13)";
const BRAND = "Heartline Ceremonies";
const LOGO_LETTER = "W";
const HERO_HEADING = "Personal ceremonies written with care, humor, and meaning.";
const TESTIMONIAL = "The ceremony sounded exactly like us — warm, personal, and never generic.";

export default function TemplateEventOfficiant(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Weddings", "Elopements", "Vow Renewals"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ minHeight: "100vh", background: BG, color: "#1a1a1a", fontFamily: BODY, position: "relative", overflow: "hidden" }}>
        {/* Decorative background blobs */}
        <div style={{
          position: "absolute", top: -110, right: -130,
          width: 440, height: 440, borderRadius: "50%",
          background: "rgba(190,24,93,.06)", filter: "blur(80px)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: -70, left: -110,
          width: 360, height: 360, borderRadius: "50%",
          background: "rgba(251,146,60,.05)", filter: "blur(60px)", pointerEvents: "none",
        }} />

        {/* ── Nav ── */}
        <nav className={`${P}-nav`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(190,24,93,.1)", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: "50%", background: ACCENT, color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 18, fontFamily: BODY }}>{LOGO_LETTER}</span>
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-.02em", color: "#1f2937" }}>{BRAND}</span>
            {verified && (
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#22c55e", marginLeft: 8 }}>
                <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            )}
          </div>
          <div className={`${P}-navlinks`} style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500, color: "#374151" }}>
            <span style={{ cursor: "pointer" }}>Portfolio</span>
            <span style={{ cursor: "pointer" }}>Services</span>
            <span style={{ cursor: "pointer" }}>About</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </nav>

        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>

          {/* ── Hero ── */}
          <section className={`${P}-hero`} style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center", padding: "64px 0 48px" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "6px 14px", borderRadius: 999, background: "rgba(190,24,93,.12)", color: ACCENT, fontSize: 13, fontWeight: 600 }}>{p}</span>
                ))}
              </div>
              <h1 style={{ margin: 0, fontFamily: DISPLAY, fontSize: "clamp(34px,4.5vw,56px)", lineHeight: 1.15, letterSpacing: "-.02em", color: "#1f2937" }}>
                {tagline || HERO_HEADING}
              </h1>
              <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: 1.7, color: "#374151", maxWidth: 540 }}>
                {bio || "A wedding officiant who writes original ceremonies rooted in your real story — heartfelt, inclusive, and never cookie-cutter."}
              </p>

              {/* Pricing mini-cards */}
              <div className={`${P}-pricing`} style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                {[
                  { label: "Essential", amount: pricing?.downloads?.single ? `$${pricing?.downloads?.single}` : "$400" },
                  { label: "Premium", amount: pricing?.downloads?.full ? `$${pricing?.downloads?.full}` : "$750" },
                  { label: "Luxury", amount: pricing?.downloads?.full ? `$${Math.round(pricing?.downloads?.full * 1.8)}` : "$1,350" },
                ].map((tier, i) => (
                  <div key={i} style={{
                    padding: "14px 20px", borderRadius: 16,
                    background: CARD_BG, border: CARD_BORDER,
                    minWidth: 110, textAlign: "center",
                    boxShadow: "0 4px 18px rgba(0,0,0,.04)",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em" }}>{tier.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#1f2937" }}>{tier.amount}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
                <button onClick={onHire} style={{
                  padding: "14px 28px", borderRadius: 999,
                  background: ACCENT, color: ACCENT_TEXT,
                  fontWeight: 700, fontSize: 15, border: "none",
                  cursor: "pointer", fontFamily: BODY,
                  boxShadow: "0 8px 28px rgba(190,24,93,.25)",
                }}>
                  Book Consultation{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button style={{
                  padding: "14px 28px", borderRadius: 999,
                  background: "transparent", color: ACCENT,
                  fontWeight: 700, fontSize: 15,
                  border: `2px solid ${ACCENT}`,
                  cursor: "pointer", fontFamily: BODY,
                }}>
                  View Portfolio
                </button>
              </div>
            </div>

            {/* Hero image */}
            <div style={{ borderRadius: RADIUS, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,.1)" }}>
              {heroImg && (
                <img
                  src={heroImg}
                  alt={portfolio?.[0]?.filename || "Featured"}
                  onClick={() => onPhotoClick(0)}
                  style={{ width: "100%", height: 440, objectFit: "cover", display: "block", cursor: "pointer" }}
                  loading="lazy"
                />
              )}
            </div>
          </section>

          {/* Section divider */}
          <div style={{ width: 60, height: 3, background: ACCENT, borderRadius: 2, margin: "0 auto", opacity: 0.35 }} />

          {/* ── Gallery ── */}
          <section style={{ padding: "48px 0" }}>
            <h2 style={{ fontFamily: DISPLAY, fontSize: 30, fontWeight: 700, marginBottom: 8, letterSpacing: "-.02em", color: "#1f2937" }}>
              Featured Work
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: 15, color: "#6b7280", maxWidth: 480 }}>
              Moments captured from recent ceremonies — the readings, the vows, and the real emotions between them.
            </p>
            <div className={`${P}-gallery`} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {portfolio.slice(1, 4).map((photo, i) => (
                <div key={photo.id} onClick={() => onPhotoClick(i + 1)} style={{
                  borderRadius: RADIUS, overflow: "hidden",
                  boxShadow: "0 12px 36px rgba(0,0,0,.08)",
                  cursor: "pointer", background: CARD_BG, border: CARD_BORDER,
                }}>
                  <img
                    src={photo.url}
                    alt={photo.filename || `Work ${i + 1}`}
                    style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500, color: "#6b7280" }}>
                    {photo.filename || `Photo ${i + 2}`}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Info Cards ── */}
          <section className={`${P}-info`} style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, padding: "32px 0" }}>
            <div style={{ padding: 28, borderRadius: 20, background: CARD_BG, border: CARD_BORDER, boxShadow: "0 8px 28px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📜</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#1f2937" }}>Packages</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#6b7280" }}>
                {priceLabel || "Custom quotes available"} — includes consultation, custom ceremony writing, rehearsal coordination, and day-of officiation.
              </p>
            </div>
            <div style={{ padding: 28, borderRadius: 20, background: CARD_BG, border: CARD_BORDER, boxShadow: "0 8px 28px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📍</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#1f2937" }}>Availability</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#6b7280" }}>
                {serviceArea || "Greater metro area"} — Booking now for upcoming seasons. Destination ceremonies welcome with travel fee.
              </p>
            </div>
            <div style={{ padding: 28, borderRadius: 20, background: CARD_BG, border: CARD_BORDER, boxShadow: "0 8px 28px rgba(0,0,0,.04)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>💍</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700, color: "#1f2937" }}>Event Fit</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#6b7280" }}>
                Specializing in {pills.join(", ")}. Non-denominational, LGBTQ+ affirming, and fully customizable to your values.
              </p>
            </div>
          </section>

          {/* ── Lower 2-col: Contact + Testimonial ── */}
          <section className={`${P}-lower`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, padding: "48px 0" }}>
            {/* Contact form */}
            <div style={{ padding: 32, borderRadius: 20, background: CARD_BG, border: CARD_BORDER, boxShadow: "0 8px 28px rgba(0,0,0,.04)" }}>
              <h3 style={{ margin: "0 0 20px", fontSize: 22, fontWeight: 700, fontFamily: DISPLAY, color: "#1f2937" }}>Get in Touch</h3>
              <form onSubmit={e => { e.preventDefault(); onHire(); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input type="text" placeholder="Name" style={{
                  padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #d1d5db", fontSize: 14,
                  fontFamily: BODY, outline: "none",
                }} />
                <input type="email" placeholder="Email" style={{
                  padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #d1d5db", fontSize: 14,
                  fontFamily: BODY, outline: "none",
                }} />
                <input type="text" placeholder="Wedding Date" style={{
                  padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #d1d5db", fontSize: 14,
                  fontFamily: BODY, outline: "none",
                }} />
                <textarea placeholder="Tell us about your ceremony vision..." rows={4} style={{
                  padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #d1d5db", fontSize: 14,
                  fontFamily: BODY, outline: "none", resize: "vertical",
                }} />
                <button type="submit" style={{
                  padding: "14px 28px", borderRadius: 999,
                  background: ACCENT, color: ACCENT_TEXT,
                  fontWeight: 700, fontSize: 15, border: "none",
                  cursor: "pointer", fontFamily: BODY, marginTop: 4,
                }}>
                  Submit
                </button>
              </form>
            </div>

            {/* Testimonial */}
            <div style={{
              padding: 40, borderRadius: 20,
              background: ACCENT, color: ACCENT_TEXT,
              display: "flex", flexDirection: "column", justifyContent: "center",
              boxShadow: "0 16px 48px rgba(190,24,93,.22)",
            }}>
              <p style={{ margin: 0, fontSize: "clamp(20px,2.2vw,30px)", fontFamily: DISPLAY, fontStyle: "italic", lineHeight: 1.5, opacity: .95 }}>
                &ldquo;{TESTIMONIAL}&rdquo;
              </p>
              <span style={{ marginTop: 28, fontSize: 14, fontWeight: 600, opacity: .8 }}>— Recent Client</span>
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid rgba(190,24,93,.12)", padding: "32px 32px 28px", textAlign: "center", fontSize: 13, color: "#6b7280", position: "relative", zIndex: 2 }}>
          <div style={{ fontWeight: 700, color: "#1f2937", fontSize: 16, marginBottom: 6 }}>{name}</div>
          <div style={{ marginBottom: 8 }}>Personal ceremonies written with heart</div>
          <div>&copy; {new Date().getFullYear()} {name}. All rights reserved.</div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .${P}-hero { grid-template-columns: 1fr !important; gap: 28px !important; }
          .${P}-gallery { grid-template-columns: 1fr !important; }
          .${P}-gallery img { height: 220px !important; }
          .${P}-info { grid-template-columns: 1fr !important; }
          .${P}-lower { grid-template-columns: 1fr !important; }
          .${P}-nav { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .${P}-navlinks { justify-content: flex-start !important; }
          .${P}-pricing { flex-direction: column !important; align-items: stretch !important; }
        }
        @media (max-width: 520px) {
          .${P}-hero h1 { font-size: 28px !important; }
          .${P}-hero p { font-size: 14px !important; }
          .${P}-nav { padding: 12px 16px !important; }
          .${P}-hero { padding: 32px 0 24px !important; }
          .${P}-gallery img { height: 180px !important; }
          .${P}-info > div { padding: 20px !important; }
          .${P}-lower > div { padding: 20px !important; }
        }
      `}</style>
    </>
  );
}
