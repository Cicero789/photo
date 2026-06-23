// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateTravelHotel(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const accent = "#d6a74a";
  const accentText = "#07111f";
  const fg = "#f8fafc";
  const head = "#fff";
  const card = "rgba(255,255,255,.08)";
  const pills = specialties.length > 0 ? specialties : ["Boutique Hotel", "City Center", "Concierge"];
  const heroImg = portfolio?.[0]?.url || "";

  return (
    <>
      <style>{fonts}</style>
      <div className="trv-ht-tpl" style={{ minHeight: 760, padding: "78px 6vw", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#07111f,#0f1e34 55%,#111827)", color: fg, fontFamily: "Inter,system-ui,sans-serif" }}>
        <div style={{ position: "absolute", right: -130, top: -150, width: 440, height: 440, borderRadius: 999, background: "rgba(214,167,74,.12)", filter: "blur(5px)", pointerEvents: "none" }} />

        <div className="trv-ht-wrap" style={{ width: "min(1200px,100%)", margin: "0 auto", position: "relative", zIndex: 2 }}>
          {/* Nav */}
          <nav className="trv-ht-nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 22, marginBottom: 46 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 950, letterSpacing: "-.03em", color: head }}>
              <span style={{ width: 42, height: 42, borderRadius: 44, display: "grid", placeItems: "center", background: accent, color: accentText, boxShadow: "0 14px 34px rgba(0,0,0,.4)", fontWeight: 950, fontSize: 18 }}>{name.charAt(0)}</span>
              {name}
            </div>
            <div className="trv-ht-navlinks" style={{ display: "flex", justifyContent: "flex-end", gap: 18, flexWrap: "wrap", fontSize: 14, fontWeight: 850, opacity: .6 }}>
              <span>Packages</span><span>Photos</span><span>Availability</span><span>Reviews</span>
            </div>
          </nav>

          {/* Hero */}
          <div className="trv-ht-hero" style={{ display: "grid", gridTemplateColumns: "1.12fr .88fr", gap: 42, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                {pills.map((p, i) => (
                  <span key={i} style={{ padding: "10px 14px", borderRadius: 999, background: card, border: "1px solid rgba(255,255,255,.1)", fontSize: 13, fontWeight: 900 }}>{p}</span>
                ))}
              </div>
              <h2 style={{ margin: 0, fontFamily: "'Playfair Display',serif", fontSize: "clamp(40px,5.5vw,78px)", lineHeight: .95, letterSpacing: "-.06em", color: head }}>
                {tagline || "A polished boutique stay in the center of it all."}
                {verified && (
                  <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: accent, fontSize: 14, color: accentText, verticalAlign: "middle" }} title="Verified">&#10003;</span>
                )}
              </h2>
              <p style={{ maxWidth: 690, margin: "22px 0 0", opacity: .7, fontSize: 18, lineHeight: 1.7 }}>
                {bio || "A luxury hotel template with a dark, sophisticated palette, gold accents, room showcases, and a polished booking experience for discerning travelers."}
              </p>
              {/* Package Strip */}
              <div className="trv-ht-packages" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 28 }}>
                {[
                  { name: "Classic", price: "$240", desc: "Standard room, breakfast included" },
                  { name: "Deluxe", price: "$420", desc: "Suite, lounge access, minibar" },
                  { name: "Penthouse", price: "$780", desc: "Top floor, private terrace, butler" },
                ].map((pkg, i) => (
                  <div key={i} style={{ padding: 16, borderRadius: 22, background: card, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 14px 34px rgba(0,0,0,.2)" }}>
                    <b style={{ display: "block", color: accent, fontSize: 24, letterSpacing: "-.04em" }}>{pkg.price}</b>
                    <strong style={{ fontSize: 15, color: head }}>{pkg.name}</strong>
                    <div style={{ fontSize: 13, color: "rgba(248,250,252,.55)", marginTop: 4 }}>{pkg.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 30, alignItems: "center" }}>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: accent, color: accentText, fontWeight: 950, boxShadow: "0 18px 46px rgba(0,0,0,.35)", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Reserve a Room{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
                <button onClick={onHire} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 52, padding: "0 22px", borderRadius: 999, background: "transparent", color: fg, fontWeight: 900, border: "1.5px solid rgba(255,255,255,.2)", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                  Explore Suites
                </button>
              </div>
            </div>

            {/* Media */}
            <div style={{ position: "relative", borderRadius: 44, overflow: "hidden", boxShadow: "0 28px 90px rgba(0,0,0,.4)", border: "1px solid rgba(255,255,255,.1)", background: "#1a1a2e" }}>
              <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, padding: "9px 13px", borderRadius: 999, background: accent, color: accentText, fontWeight: 950, letterSpacing: ".08em", fontSize: 12 }}>PREMIUM</span>
              {heroImg && (
                <img src={heroImg} alt={portfolio?.[0]?.filename || "Portfolio"} onClick={() => onPhotoClick(0)} style={{ width: "100%", height: 430, objectFit: "cover", display: "block", cursor: "pointer" }} loading="lazy" />
              )}
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, padding: 18, borderRadius: 22, background: "rgba(7,17,31,.88)", backdropFilter: "blur(16px)", color: fg, fontWeight: 850, lineHeight: 1.45, boxShadow: "0 16px 48px rgba(0,0,0,.3)" }}>
                Boutique rooms &middot; Rooftop bar &middot; Concierge service
              </div>
            </div>
          </div>

          {/* Main Grid: Rooms + Gallery */}
          <div className="trv-ht-main" style={{ display: "grid", gridTemplateColumns: ".88fr 1.12fr", gap: 24, marginTop: 52 }}>
            <div style={{ background: card, border: "1px solid rgba(255,255,255,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.2)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 24, letterSpacing: "-.035em", color: head }}>Rooms &amp; Suites</h3>
              <div className="trv-ht-rooms" style={{ display: "grid", gap: 14 }}>
                {[
                  { nm: "Classic Room", desc: "City view, king bed, marble bath" },
                  { nm: "Deluxe Suite", desc: "Living area, balcony, lounge access" },
                  { nm: "Penthouse", desc: "Panoramic views, private terrace, butler" },
                ].map((room, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, borderRadius: 22, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)" }}>
                    <img src={portfolio[i]?.url || heroImg} alt={room.nm} onClick={() => onPhotoClick(i)} style={{ width: 80, height: 64, objectFit: "cover", borderRadius: 16, cursor: "pointer", flexShrink: 0 }} loading="lazy" />
                    <div>
                      <strong style={{ display: "block", fontSize: 15, color: head }}>{room.nm}</strong>
                      <span style={{ fontSize: 13, color: "rgba(248,250,252,.55)" }}>{room.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: card, border: "1px solid rgba(255,255,255,.08)", borderRadius: 26, padding: 26, boxShadow: "0 18px 50px rgba(0,0,0,.2)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 24, letterSpacing: "-.035em", color: head }}>Photos</h3>
              <div className="trv-ht-gallery" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {portfolio.slice(0, 4).map((photo, i) => (
                  <img key={photo.id} src={photo.url} alt={photo.filename || `Photo ${i + 1}`} onClick={() => onPhotoClick(i)} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 18, cursor: "pointer", display: "block", boxShadow: "0 10px 28px rgba(0,0,0,.25)" }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="trv-ht-info" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 24 }}>
            <div style={{ padding: 22, borderRadius: 24, background: card, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Availability</b>
              <p style={{ margin: 0, color: "rgba(248,250,252,.55)", lineHeight: 1.6 }}>Rooms are available nightly. Extended stays and corporate rates available upon request.</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: card, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Location</b>
              <p style={{ margin: 0, color: "rgba(248,250,252,.55)", lineHeight: 1.6 }}>{serviceArea || "City center, steps from dining, culture, and nightlife."}</p>
            </div>
            <div style={{ padding: 22, borderRadius: 24, background: card, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 16px 42px rgba(0,0,0,.18)" }}>
              <b style={{ display: "block", marginBottom: 9, color: head }}>Booking</b>
              <p style={{ margin: 0, color: "rgba(248,250,252,.55)", lineHeight: 1.6 }}>Reserve online with instant confirmation. Concierge reaches out 24 hours before check-in.</p>
            </div>
          </div>

          {/* Lower Grid: Booking Form + Review */}
          <div className="trv-ht-lower" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 24, marginTop: 24 }}>
            <div style={{ padding: 26, borderRadius: 26, background: card, border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 18px 50px rgba(0,0,0,.2)" }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 22, letterSpacing: "-.03em", color: head }}>Reserve a Room</h3>
              <div style={{ display: "grid", gap: 14 }}>
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.06)", color: fg, boxSizing: "border-box" }} readOnly />
                <input type="email" placeholder="Email address" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.06)", color: fg, boxSizing: "border-box" }} readOnly />
                <input type="text" placeholder="Check-in / Check-out dates" style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.06)", color: fg, boxSizing: "border-box" }} readOnly />
                <textarea placeholder="Room preference or special requests..." rows={3} style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", fontFamily: "inherit", fontSize: 15, background: "rgba(255,255,255,.06)", color: fg, resize: "vertical", boxSizing: "border-box" }} readOnly />
                <button onClick={onHire} style={{ padding: "14px 22px", borderRadius: 14, background: accent, color: accentText, fontWeight: 900, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>Confirm Reservation</button>
              </div>
            </div>

            <div style={{ padding: 26, borderRadius: 26, background: accent, color: accentText, boxShadow: "0 18px 50px rgba(0,0,0,.3)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 22, letterSpacing: "-.03em" }}>Guest Review</h3>
              <div style={{ fontSize: 32, marginBottom: 12, letterSpacing: 2 }}>{"★★★★★"}</div>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, opacity: .92 }}>
                &ldquo;Elegant without being cold &mdash; the service felt personal from arrival.&rdquo;
              </p>
              <p style={{ margin: "18px 0 0", fontWeight: 800, fontSize: 14, opacity: .78 }}>&mdash; Verified Guest</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:800px){
          .trv-ht-hero{grid-template-columns:1fr!important}
          .trv-ht-main{grid-template-columns:1fr!important}
          .trv-ht-info{grid-template-columns:1fr!important}
          .trv-ht-lower{grid-template-columns:1fr!important}
          .trv-ht-packages{grid-template-columns:1fr!important}
          .trv-ht-gallery{grid-template-columns:1fr!important}
          .trv-ht-nav{flex-direction:column!important;align-items:flex-start!important}
          .trv-ht-navlinks{justify-content:flex-start!important}
        }
        @media(max-width:520px){
          .trv-ht-tpl{padding:64px 5vw!important}
          .trv-ht-hero h2{font-size:36px!important}
        }
      `}</style>
    </>
  );
}
