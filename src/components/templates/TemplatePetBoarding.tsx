// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetBoarding(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const pills = specialties?.length ? specialties : ["Overnight Suites", "Play Groups", "Webcam Access"];
  const services = ["Standard suite", "Luxury suite", "Play groups", "Webcam access", "Medication admin", "Daily report cards"];
  const heroImg = portfolio?.[0];
  const galleryImgs = portfolio?.slice(1, 4) || [];

  return (
    <>
      <style>{fonts}{`
        .pet-bd-root { background:linear-gradient(135deg,#07111f,#0f1e34 55%,#111827); color:#f8fafc; font-family:'Inter',sans-serif; min-height:100vh; }
        .pet-bd-root *,.pet-bd-root *::before,.pet-bd-root *::after { box-sizing:border-box; margin:0; padding:0; }

        /* NAV */
        .pet-bd-nav { display:flex; align-items:center; justify-content:space-between; padding:20px 48px; }
        .pet-bd-brand { display:flex; align-items:center; gap:14px; }
        .pet-bd-logo { width:44px; height:44px; border-radius:50%; background:#d6a74a; color:#07111f; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display',serif; font-weight:800; font-size:20px; flex-shrink:0; }
        .pet-bd-brand-name { font-size:18px; font-weight:700; color:#fff; font-family:'Space Grotesk',sans-serif; }
        .pet-bd-nav-links { display:flex; gap:28px; }
        .pet-bd-nav-links a { color:rgba(255,255,255,.7); text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .pet-bd-nav-links a:hover { color:#fff; }

        /* HERO */
        .pet-bd-hero { display:grid; grid-template-columns:1fr 1fr; gap:48px; padding:48px 48px 56px; align-items:center; }
        .pet-bd-pills { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:20px; }
        .pet-bd-pill { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.18); border-radius:44px; padding:6px 18px; font-size:13px; font-weight:500; color:#f8fafc; }
        .pet-bd-hero h2 { font-family:'Playfair Display',serif; font-size:40px; font-weight:800; color:#fff; line-height:1.15; margin-bottom:12px; }
        .pet-bd-verified { display:inline-flex; align-items:center; gap:6px; background:rgba(214,167,74,.15); color:#d6a74a; font-size:12px; font-weight:600; border-radius:44px; padding:4px 12px; margin-left:10px; vertical-align:middle; }
        .pet-bd-bio { color:#f8fafc; opacity:.78; font-size:15px; line-height:1.65; margin-bottom:28px; }

        .pet-bd-price-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
        .pet-bd-price-mini { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); border-radius:14px; padding:14px 16px; text-align:center; }
        .pet-bd-price-mini-label { font-size:12px; color:rgba(255,255,255,.6); margin-bottom:4px; }
        .pet-bd-price-mini-val { font-size:18px; font-weight:700; color:#d6a74a; }

        .pet-bd-cta-row { display:flex; gap:14px; }
        .pet-bd-btn-primary { background:#d6a74a; color:#07111f; border:none; padding:14px 32px; border-radius:44px; font-size:15px; font-weight:700; cursor:pointer; transition:transform .2s,box-shadow .2s; }
        .pet-bd-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(214,167,74,.35); }
        .pet-bd-btn-ghost { background:transparent; color:#fff; border:1.5px solid rgba(255,255,255,.35); padding:14px 32px; border-radius:44px; font-size:15px; font-weight:600; cursor:pointer; transition:border-color .2s,background .2s; }
        .pet-bd-btn-ghost:hover { border-color:#fff; background:rgba(255,255,255,.06); }

        .pet-bd-hero-img-wrap { position:relative; border-radius:44px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,.55); aspect-ratio:4/3; }
        .pet-bd-hero-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; cursor:pointer; transition:transform .4s; }
        .pet-bd-hero-img-wrap img:hover { transform:scale(1.03); }

        /* MAIN GRID */
        .pet-bd-main { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding:0 48px 56px; }
        .pet-bd-card { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); border-radius:24px; padding:36px; }
        .pet-bd-section-title { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#fff; margin-bottom:24px; }
        .pet-bd-services-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .pet-bd-service-item { display:flex; align-items:center; gap:10px; font-size:14px; color:#f8fafc; line-height:1.5; }
        .pet-bd-service-icon { font-size:18px; flex-shrink:0; }

        .pet-bd-price-row { display:flex; justify-content:space-between; align-items:center; padding:16px 0; border-bottom:1px solid rgba(255,255,255,.1); }
        .pet-bd-price-row:last-child { border-bottom:none; }
        .pet-bd-price-name { font-size:15px; font-weight:500; color:#f8fafc; }
        .pet-bd-price-val { font-size:18px; font-weight:700; color:#d6a74a; }

        /* INFO GRID */
        .pet-bd-info { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; padding:0 48px 56px; }
        .pet-bd-info-title { font-size:16px; font-weight:700; color:#fff; margin-bottom:12px; }
        .pet-bd-info-text { font-size:14px; color:rgba(255,255,255,.7); line-height:1.65; }

        /* LOWER GRID */
        .pet-bd-lower { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding:0 48px 56px; }
        .pet-bd-form { display:flex; flex-direction:column; gap:14px; }
        .pet-bd-input { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.18); border-radius:12px; padding:14px 18px; color:#f8fafc; font-size:14px; font-family:'Inter',sans-serif; outline:none; transition:border-color .2s; }
        .pet-bd-input::placeholder { color:rgba(255,255,255,.4); }
        .pet-bd-input:focus { border-color:#d6a74a; }
        .pet-bd-textarea { min-height:100px; resize:vertical; }

        .pet-bd-review { background:#d6a74a; color:#07111f; border-radius:24px; padding:36px; display:flex; flex-direction:column; justify-content:center; }
        .pet-bd-review-quote { font-family:'Libre Baskerville',serif; font-size:18px; font-weight:400; line-height:1.65; margin-bottom:20px; }
        .pet-bd-review-stars { font-size:18px; margin-bottom:8px; }
        .pet-bd-review-author { font-size:14px; font-weight:700; }

        /* GALLERY */
        .pet-bd-gallery { display:grid; grid-template-columns:1.2fr .8fr .8fr; gap:16px; padding:0 48px 64px; }
        .pet-bd-gallery-item { border-radius:20px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,.45); aspect-ratio:4/3; }
        .pet-bd-gallery-item img { width:100%; height:100%; object-fit:cover; display:block; cursor:pointer; transition:transform .4s; }
        .pet-bd-gallery-item img:hover { transform:scale(1.04); }

        /* RESPONSIVE */
        @media(max-width:800px){
          .pet-bd-nav { padding:16px 24px; }
          .pet-bd-hero { grid-template-columns:1fr; padding:32px 24px; gap:32px; }
          .pet-bd-main { grid-template-columns:1fr; padding:0 24px 40px; }
          .pet-bd-info { grid-template-columns:1fr; padding:0 24px 40px; }
          .pet-bd-lower { grid-template-columns:1fr; padding:0 24px 40px; }
          .pet-bd-gallery { grid-template-columns:1fr; padding:0 24px 48px; }
          .pet-bd-price-strip { grid-template-columns:1fr; }
          .pet-bd-services-grid { grid-template-columns:1fr; }
        }
        @media(max-width:520px){
          .pet-bd-nav-links { display:none; }
          .pet-bd-hero h2 { font-size:28px; }
          .pet-bd-cta-row { flex-direction:column; }
          .pet-bd-btn-primary,.pet-bd-btn-ghost { width:100%; text-align:center; }
        }
      `}</style>

      <div className="pet-bd-root">
        {/* NAV */}
        <nav className="pet-bd-nav">
          <div className="pet-bd-brand">
            <div className="pet-bd-logo">P</div>
            <span className="pet-bd-brand-name">Happy Den Boarding</span>
          </div>
          <div className="pet-bd-nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#photos">Photos</a>
            <a href="#booking">Booking</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="pet-bd-hero">
          <div>
            <div className="pet-bd-pills">
              {pills.map((p, i) => (
                <span className="pet-bd-pill" key={i}>{p}</span>
              ))}
            </div>
            <h2>
              {tagline || "Safe stays, cozy suites, and plenty of playtime."}
              {verified && <span className="pet-bd-verified">✓ Verified</span>}
            </h2>
            <p className="pet-bd-bio">
              {bio || "We treat every pet like family. Our spacious suites, supervised play groups, and attentive staff ensure your furry friend has the best time while you're away."}
            </p>
            <div className="pet-bd-price-strip">
              <div className="pet-bd-price-mini">
                <div className="pet-bd-price-mini-label">Standard Suite</div>
                <div className="pet-bd-price-mini-val">{priceLabel || "$45/night"}</div>
              </div>
              <div className="pet-bd-price-mini">
                <div className="pet-bd-price-mini-label">Luxury Suite</div>
                <div className="pet-bd-price-mini-val">$75/night</div>
              </div>
              <div className="pet-bd-price-mini">
                <div className="pet-bd-price-mini-label">Extended Stay</div>
                <div className="pet-bd-price-mini-val">$38/night</div>
              </div>
            </div>
            <div className="pet-bd-cta-row">
              <button className="pet-bd-btn-primary" onClick={onHire}>Book Now</button>
              <button className="pet-bd-btn-ghost" onClick={() => onPhotoClick?.(0)}>View Portfolio</button>
            </div>
          </div>
          <div className="pet-bd-hero-img-wrap">
            {heroImg ? (
              <img src={heroImg} alt={name || "Pet boarding"} onClick={() => onPhotoClick?.(0)} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>🐾</div>
            )}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="pet-bd-main" id="services">
          <div className="pet-bd-card">
            <h3 className="pet-bd-section-title">Our Boarding Services</h3>
            <div className="pet-bd-services-grid">
              {services.map((s, i) => (
                <div className="pet-bd-service-item" key={i}>
                  <span className="pet-bd-service-icon">🐾</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pet-bd-card" id="pricing">
            <h3 className="pet-bd-section-title">Pricing</h3>
            <div className="pet-bd-price-row">
              <span className="pet-bd-price-name">Standard Suite</span>
              <span className="pet-bd-price-val">{priceLabel || "$45/night"}</span>
            </div>
            <div className="pet-bd-price-row">
              <span className="pet-bd-price-name">Luxury Suite</span>
              <span className="pet-bd-price-val">$75/night</span>
            </div>
            <div className="pet-bd-price-row">
              <span className="pet-bd-price-name">Extended Stay</span>
              <span className="pet-bd-price-val">$38/night</span>
            </div>
          </div>
        </section>

        {/* INFO GRID */}
        <section className="pet-bd-info">
          <div className="pet-bd-card">
            <h4 className="pet-bd-info-title">Service Area</h4>
            <p className="pet-bd-info-text">{serviceArea || "Serving the greater metro area with convenient drop-off and pick-up options."}</p>
          </div>
          <div className="pet-bd-card">
            <h4 className="pet-bd-info-title">Pet Care Notes</h4>
            <p className="pet-bd-info-text">Please provide feeding schedule details and any comfort items your pet enjoys. We accommodate special dietary needs and medication schedules.</p>
          </div>
          <div className="pet-bd-card">
            <h4 className="pet-bd-info-title">Booking</h4>
            <p className="pet-bd-info-text">We recommend booking at least one week in advance, especially during holidays. Same-day availability may be limited.</p>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="pet-bd-lower" id="booking">
          <div className="pet-bd-card">
            <h3 className="pet-bd-section-title">Reserve a Stay</h3>
            <form className="pet-bd-form" onSubmit={(e) => { e.preventDefault(); onHire?.(); }}>
              <input className="pet-bd-input" placeholder="Your name" />
              <input className="pet-bd-input" placeholder="Pet's name" />
              <input className="pet-bd-input" placeholder="Email address" type="email" />
              <input className="pet-bd-input" placeholder="Check-in date" type="date" />
              <textarea className="pet-bd-input pet-bd-textarea" placeholder="Special requests or notes..." />
              <button className="pet-bd-btn-primary" type="submit" style={{ width: "100%" }}>Submit Booking</button>
            </form>
          </div>
          <div className="pet-bd-review">
            <div className="pet-bd-review-stars">★★★★★</div>
            <p className="pet-bd-review-quote">"The webcam and daily report cards made us feel completely at ease."</p>
            <span className="pet-bd-review-author">— Chris &amp; Buddy</span>
          </div>
        </section>

        {/* GALLERY */}
        <section className="pet-bd-gallery" id="photos">
          {galleryImgs.length > 0 ? galleryImgs.map((src, i) => (
            <div className="pet-bd-gallery-item" key={i}>
              <img src={src} alt={`Gallery ${i + 1}`} onClick={() => onPhotoClick?.(i + 1)} />
            </div>
          )) : [0, 1, 2].map((i) => (
            <div className="pet-bd-gallery-item" key={i}>
              <div style={{ width: "100%", height: "100%", background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>🐾</div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
