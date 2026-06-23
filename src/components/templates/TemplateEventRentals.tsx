// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateEventRentals(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Tables", "Linens", "Lounges"];
  const heroImg = portfolio?.[0]?.url || "";
  const galleryPhotos = portfolio.slice(1, 4);

  return (
    <>
      <style>{fonts}</style>
      <div
        className="evt-rn-tpl-root"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#ecfeff,#fff 48%,#f0fdfa)",
          color: "#0e1a2b",
          fontFamily: "Inter,system-ui,sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Nav ── */}
        <nav
          className="evt-rn-tpl-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px",
            borderBottom: "1px solid rgba(8,145,178,.13)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#0891b2",
                color: "#ecfeff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              P
            </span>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em" }}>SceneSet Rentals</span>
          </div>
          <div className="evt-rn-tpl-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontSize: 14, fontWeight: 600, color: "#334155" }}>
            <span style={{ cursor: "pointer" }}>Portfolio</span>
            <span style={{ cursor: "pointer" }}>Services</span>
            <span style={{ cursor: "pointer" }}>About</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </nav>

        <div style={{ width: "min(1200px,100%)", margin: "0 auto", padding: "0 32px" }}>
          {/* ── Hero ── */}
          <div
            className="evt-rn-tpl-hero"
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 48,
              alignItems: "center",
              padding: "56px 0 48px",
            }}
          >
            {/* Left */}
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
                {pills.map((p, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      background: "rgba(8,145,178,.12)",
                      color: "#0891b2",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(34px,4.8vw,60px)", lineHeight: 1.05, letterSpacing: "-.04em", color: "#0e1a2b" }}>
                {tagline || "Tables, lounges, linens, and details delivered right."}
                {verified && (
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#22c55e", marginLeft: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                )}
              </h1>

              <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.7, color: "#475569", maxWidth: 560 }}>
                {bio || "Full-service event rental with delivery, setup, and pickup — so you can focus on celebrating."}
              </p>

              {/* Pricing mini-cards */}
              <div className="evt-rn-tpl-pricing-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 26 }}>
                {[
                  { tier: "Essential", price: pricing?.downloads?.single ? `$${pricing?.downloads?.single}` : "$250" },
                  { tier: "Premium", price: pricing?.downloads?.full ? `$${pricing?.downloads?.full}` : "$600" },
                  { tier: "Luxury", price: "Custom" },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 18,
                      background: "#fff",
                      border: "1px solid rgba(8,145,178,.13)",
                      boxShadow: "0 4px 20px rgba(8,145,178,.06)",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0891b2", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: ".04em" }}>{pkg.tier}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.03em", color: "#0e1a2b" }}>{pkg.price}</div>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
                <button
                  onClick={onHire}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 50,
                    padding: "0 28px",
                    borderRadius: 999,
                    background: "#0891b2",
                    color: "#ecfeff",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                    boxShadow: "0 10px 30px rgba(8,145,178,.22)",
                  }}
                >
                  Book Consultation{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button
                  onClick={() => {}}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 50,
                    padding: "0 28px",
                    borderRadius: 999,
                    background: "transparent",
                    color: "#0891b2",
                    fontWeight: 800,
                    border: "2px solid #0891b2",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                  }}
                >
                  View Portfolio
                </button>
              </div>
            </div>

            {/* Right — hero image */}
            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(8,145,178,.14)",
                border: "1px solid rgba(8,145,178,.13)",
                background: "#fff",
              }}
            >
              {heroImg && (
                <img
                  src={heroImg}
                  alt={portfolio?.[0]?.filename || "Hero"}
                  onClick={() => onPhotoClick(0)}
                  style={{ width: "100%", height: 440, objectFit: "cover", display: "block", cursor: "pointer" }}
                  loading="lazy"
                />
              )}
            </div>
          </div>

          {/* ── Gallery ── */}
          <div style={{ paddingBottom: 48 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 28, fontWeight: 700, letterSpacing: "-.03em", marginBottom: 24, color: "#0e1a2b" }}>Featured Work</h2>
            <div className="evt-rn-tpl-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => onPhotoClick(i + 1)}
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 12px 36px rgba(8,145,178,.1)",
                    border: "1px solid rgba(8,145,178,.13)",
                    background: "#fff",
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename || `Gallery ${i + 1}`}
                    style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#334155" }}>
                    {photo.filename || `Setup ${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div className="evt-rn-tpl-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, paddingBottom: 48 }}>
            <div style={{ padding: 26, borderRadius: 18, background: "#fff", border: "1px solid rgba(8,145,178,.13)", boxShadow: "0 8px 28px rgba(8,145,178,.06)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#0e1a2b" }}>Packages</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                {priceLabel || "Contact for custom pricing."} We offer tiered packages for any event size with delivery, setup, and pickup included.
              </p>
            </div>
            <div style={{ padding: 26, borderRadius: 18, background: "#fff", border: "1px solid rgba(8,145,178,.13)", boxShadow: "0 8px 28px rgba(8,145,178,.06)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#0e1a2b" }}>Availability</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#475569" }}>
                {serviceArea || "Serving the greater metro area."} Booking available year-round with seasonal specials.
              </p>
            </div>
            <div style={{ padding: 26, borderRadius: 18, background: "#fff", border: "1px solid rgba(8,145,178,.13)", boxShadow: "0 8px 28px rgba(8,145,178,.06)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#0e1a2b" }}>Event Fit</h3>
              <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, lineHeight: 1.8, color: "#475569" }}>
                {pills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Lower 2-col: Contact + Testimonial ── */}
          <div className="evt-rn-tpl-lower" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, paddingBottom: 56 }}>
            {/* Contact form */}
            <div style={{ padding: 28, borderRadius: 18, background: "#fff", border: "1px solid rgba(8,145,178,.13)", boxShadow: "0 8px 28px rgba(8,145,178,.06)" }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 800, color: "#0e1a2b" }}>Get in Touch</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(8,145,178,.18)", background: "#f8fdfe", fontSize: 14, fontFamily: "inherit", color: "#0e1a2b", outline: "none" }} readOnly />
                <input type="email" placeholder="Email address" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(8,145,178,.18)", background: "#f8fdfe", fontSize: 14, fontFamily: "inherit", color: "#0e1a2b", outline: "none" }} readOnly />
                <input type="text" placeholder="Event date" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(8,145,178,.18)", background: "#f8fdfe", fontSize: 14, fontFamily: "inherit", color: "#0e1a2b", outline: "none" }} readOnly />
                <textarea placeholder="Tell us about your event" rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(8,145,178,.18)", background: "#f8fdfe", fontSize: 14, fontFamily: "inherit", color: "#0e1a2b", outline: "none", resize: "vertical" as const }} readOnly />
                <button
                  onClick={onHire}
                  style={{
                    minHeight: 48,
                    borderRadius: 999,
                    background: "#0891b2",
                    color: "#ecfeff",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                  }}
                >
                  Submit Inquiry
                </button>
              </div>
            </div>

            {/* Testimonial */}
            <div
              style={{
                padding: 32,
                borderRadius: 18,
                background: "#0891b2",
                color: "#ecfeff",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                boxShadow: "0 12px 40px rgba(8,145,178,.18)",
              }}
            >
              <div style={{ fontSize: 40, lineHeight: 1, marginBottom: 12, opacity: 0.4 }}>&ldquo;</div>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
                Everything arrived on time, looked great, and was picked up without stress.
              </p>
              <span style={{ fontWeight: 700, fontSize: 14, opacity: 0.8 }}>— Satisfied Client</span>
            </div>
          </div>

          {/* ── Footer ── */}
          <footer style={{ textAlign: "center" as const, padding: "24px 0 36px", borderTop: "1px solid rgba(8,145,178,.1)", fontSize: 13, color: "#94a3b8" }}>
            {name} &copy; {new Date().getFullYear()}. All rights reserved.
          </footer>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 800px) {
          .evt-rn-tpl-hero { grid-template-columns: 1fr !important; }
          .evt-rn-tpl-gallery { grid-template-columns: 1fr !important; }
          .evt-rn-tpl-info { grid-template-columns: 1fr !important; }
          .evt-rn-tpl-lower { grid-template-columns: 1fr !important; }
          .evt-rn-tpl-pricing-strip { grid-template-columns: 1fr !important; }
          .evt-rn-tpl-nav { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .evt-rn-tpl-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .evt-rn-tpl-hero h1 { font-size: 28px !important; }
          .evt-rn-tpl-root { padding: 0 !important; }
          .evt-rn-tpl-nav { padding: 12px 16px !important; }
        }
      `}</style>
    </>
  );
}
