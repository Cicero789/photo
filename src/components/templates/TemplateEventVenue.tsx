// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateEventVenue(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Ceremonies", "Receptions", "Dinners"];
  const heroImg = portfolio?.[0]?.url || "";
  const galleryPhotos = portfolio.slice(1, 4);

  return (
    <>
      <style>{fonts}</style>
      <div
        className="evt-vn-tpl-root"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#07111f,#0f1e34 55%,#111827)",
          color: "#f8fafc",
          fontFamily: "Inter,system-ui,sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Nav ── */}
        <nav
          className="evt-vn-tpl-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px",
            borderBottom: "1px solid rgba(255,255,255,.12)",
            background: "rgba(255,255,255,.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "#d6a74a",
                color: "#07111f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              V
            </span>
            <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-.02em", color: "#fff" }}>The Glasshouse Venue</span>
          </div>
          <div className="evt-vn-tpl-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 24, fontSize: 14, fontWeight: 600, color: "#cbd5e1" }}>
            <span style={{ cursor: "pointer" }}>Portfolio</span>
            <span style={{ cursor: "pointer" }}>Services</span>
            <span style={{ cursor: "pointer" }}>About</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </nav>

        <div style={{ width: "min(1200px,100%)", margin: "0 auto", padding: "0 32px" }}>
          {/* ── Hero ── */}
          <div
            className="evt-vn-tpl-hero"
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
                      background: "rgba(214,167,74,.12)",
                      color: "#d6a74a",
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontSize: "clamp(34px,4.8vw,60px)", lineHeight: 1.05, letterSpacing: "-.03em", color: "#fff" }}>
                {tagline || "A bright, flexible space for ceremonies, dinners, and celebrations."}
                {verified && (
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "#22c55e", marginLeft: 8 }}>
                    <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M6 10l3 3 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                )}
              </h1>

              <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.7, color: "#cbd5e1", maxWidth: 560 }}>
                {bio || "A modern glass-walled venue with indoor-outdoor flow, natural light, and on-site coordination for up to 300 guests."}
              </p>

              {/* Pricing mini-cards */}
              <div className="evt-vn-tpl-pricing-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 26 }}>
                {[
                  { tier: "Essential", price: pricing?.downloads?.single ? `$${pricing?.downloads?.single}` : "$2,500" },
                  { tier: "Premium", price: pricing?.downloads?.full ? `$${pricing?.downloads?.full}` : "$5,000" },
                  { tier: "Luxury", price: "Custom" },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 18,
                      background: "rgba(255,255,255,.07)",
                      border: "1px solid rgba(255,255,255,.12)",
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#d6a74a", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: ".04em" }}>{pkg.tier}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.03em", color: "#fff" }}>{pkg.price}</div>
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
                    background: "#d6a74a",
                    color: "#07111f",
                    fontWeight: 800,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 15,
                    boxShadow: "0 10px 30px rgba(214,167,74,.22)",
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
                    color: "#d6a74a",
                    fontWeight: 800,
                    border: "2px solid #d6a74a",
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
                borderRadius: 44,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,.35)",
                border: "1px solid rgba(255,255,255,.12)",
                background: "rgba(255,255,255,.07)",
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
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, letterSpacing: "-.02em", marginBottom: 24, color: "#fff" }}>Featured Work</h2>
            <div className="evt-vn-tpl-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {galleryPhotos.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => onPhotoClick(i + 1)}
                  style={{
                    borderRadius: 22,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 12px 36px rgba(0,0,0,.3)",
                    border: "1px solid rgba(255,255,255,.12)",
                    background: "rgba(255,255,255,.07)",
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename || `Gallery ${i + 1}`}
                    style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: "#cbd5e1" }}>
                    {photo.filename || `Event ${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Info Cards ── */}
          <div className="evt-vn-tpl-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, paddingBottom: 48 }}>
            <div style={{ padding: 26, borderRadius: 22, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#fff" }}>Packages</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#cbd5e1" }}>
                {priceLabel || "Custom quotes available."} Venue rental includes tables, chairs, basic lighting, and on-site coordination.
              </p>
            </div>
            <div style={{ padding: 26, borderRadius: 22, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#fff" }}>Availability</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#cbd5e1" }}>
                {serviceArea || "Located in the heart of downtown."} Open for tours and bookings seven days a week.
              </p>
            </div>
            <div style={{ padding: 26, borderRadius: 22, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, color: "#fff" }}>Event Fit</h3>
              <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 14, lineHeight: 1.8, color: "#cbd5e1" }}>
                {pills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Lower 2-col: Contact + Testimonial ── */}
          <div className="evt-vn-tpl-lower" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, paddingBottom: 56 }}>
            {/* Contact form */}
            <div style={{ padding: 28, borderRadius: 22, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)" }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 20, fontWeight: 800, color: "#fff" }}>Get in Touch</h3>
              <div style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.08)", fontSize: 14, fontFamily: "inherit", color: "#f8fafc", outline: "none" }} readOnly />
                <input type="email" placeholder="Email address" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.08)", fontSize: 14, fontFamily: "inherit", color: "#f8fafc", outline: "none" }} readOnly />
                <input type="text" placeholder="Event date & guest count" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.08)", fontSize: 14, fontFamily: "inherit", color: "#f8fafc", outline: "none" }} readOnly />
                <textarea placeholder="Tell us about your celebration" rows={4} style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.08)", fontSize: 14, fontFamily: "inherit", color: "#f8fafc", outline: "none", resize: "vertical" as const }} readOnly />
                <button
                  onClick={onHire}
                  style={{
                    minHeight: 48,
                    borderRadius: 999,
                    background: "#d6a74a",
                    color: "#07111f",
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
                borderRadius: 22,
                background: "#d6a74a",
                color: "#07111f",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "center",
                boxShadow: "0 12px 40px rgba(214,167,74,.18)",
              }}
            >
              <div style={{ fontSize: 40, lineHeight: 1, marginBottom: 12, opacity: 0.35 }}>&ldquo;</div>
              <p style={{ fontSize: 18, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
                The space was beautiful, flexible, and easy for vendors to work in.
              </p>
              <span style={{ fontWeight: 700, fontSize: 14, opacity: 0.7 }}>— Recent Couple</span>
            </div>
          </div>

          {/* ── Footer ── */}
          <footer style={{ textAlign: "center" as const, padding: "24px 0 36px", borderTop: "1px solid rgba(255,255,255,.1)", fontSize: 13, color: "#64748b" }}>
            {name} &copy; {new Date().getFullYear()}. All rights reserved.
          </footer>
        </div>
      </div>

      {/* ── Responsive ── */}
      <style>{`
        @media (max-width: 800px) {
          .evt-vn-tpl-hero { grid-template-columns: 1fr !important; }
          .evt-vn-tpl-gallery { grid-template-columns: 1fr !important; }
          .evt-vn-tpl-info { grid-template-columns: 1fr !important; }
          .evt-vn-tpl-lower { grid-template-columns: 1fr !important; }
          .evt-vn-tpl-pricing-strip { grid-template-columns: 1fr !important; }
          .evt-vn-tpl-nav { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .evt-vn-tpl-navlinks { justify-content: flex-start !important; }
        }
        @media (max-width: 520px) {
          .evt-vn-tpl-hero h1 { font-size: 28px !important; }
          .evt-vn-tpl-root { padding: 0 !important; }
          .evt-vn-tpl-nav { padding: 12px 16px !important; }
        }
      `}</style>
    </>
  );
}
