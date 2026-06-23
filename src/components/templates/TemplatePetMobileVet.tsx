// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetMobileVet(props: TemplateProps) {
  const {
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
  } = props;

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : "";

  const pills = specialties?.length ? specialties : ["House Calls", "Senior Pets", "Low-Stress"];

  const services = [
    "Wellness exams",
    "Vaccinations",
    "Blood work",
    "End-of-life care",
    "Chronic condition management",
    "Puppy checkups",
  ];

  const pricingCards = [
    { label: "House Call", price: pricing?.downloads?.single ? `$${pricing?.downloads?.single}` : "$95" },
    { label: "Senior Wellness", price: pricing?.downloads?.full ? `$${pricing?.downloads?.full}` : "$140" },
    { label: "Vaccination Visit", price: pricing?.prints?.medium ? `$${pricing.prints.medium}` : "$75" },
  ];

  const heroImg = portfolio?.[0];
  const galleryImgs = portfolio?.slice(1, 4) ?? [];

  return (
    <>
      <style>{fonts}{`
        .pet-mv-root *,
        .pet-mv-root *::before,
        .pet-mv-root *::after { margin:0; padding:0; box-sizing:border-box; }
        .pet-mv-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg,#f5f3ff,#fff 48%,#e0f2fe);
          color: #1e1b4b;
          min-height: 100vh;
        }
        /* NAV */
        .pet-mv-nav {
          display:flex; align-items:center; justify-content:space-between;
          padding:18px 40px; border-bottom:1px solid #ede9fe;
        }
        .pet-mv-nav-brand { display:flex; align-items:center; gap:10px; font-weight:700; font-size:1.05rem; }
        .pet-mv-nav-logo {
          width:36px; height:36px; border-radius:50%; background:#7c3aed;
          color:#fff; display:flex; align-items:center; justify-content:center;
          font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem;
        }
        .pet-mv-nav-links { display:flex; gap:28px; }
        .pet-mv-nav-links a {
          text-decoration:none; color:#4c1d95; font-size:.92rem; font-weight:500;
          transition:color .2s;
        }
        .pet-mv-nav-links a:hover { color:#7c3aed; }
        /* HERO */
        .pet-mv-hero {
          display:grid; grid-template-columns:1fr 1fr; gap:48px;
          padding:56px 40px 48px; align-items:center;
        }
        .pet-mv-pills { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:18px; }
        .pet-mv-pill {
          background:#ede9fe; color:#6d28d9; font-size:.78rem; font-weight:600;
          padding:5px 14px; border-radius:20px;
        }
        .pet-mv-hero h2 {
          font-family:'Space Grotesk',sans-serif; font-size:2.35rem; font-weight:700;
          line-height:1.18; color:#1e1b4b; margin-bottom:8px;
        }
        .pet-mv-verified {
          display:inline-flex; align-items:center; gap:5px;
          font-size:.82rem; color:#7c3aed; font-weight:600; margin-bottom:16px;
        }
        .pet-mv-bio { font-size:.97rem; color:#4b5563; line-height:1.65; margin-bottom:22px; }
        .pet-mv-price-strip { display:flex; gap:12px; margin-bottom:24px; }
        .pet-mv-price-mini {
          flex:1; background:#fff; border:1px solid #ede9fe; border-radius:12px;
          padding:12px 14px; text-align:center;
        }
        .pet-mv-price-mini strong { display:block; font-size:.92rem; color:#1e1b4b; }
        .pet-mv-price-mini span { font-size:.78rem; color:#6b7280; }
        .pet-mv-ctas { display:flex; gap:12px; }
        .pet-mv-btn-primary {
          padding:13px 30px; background:#7c3aed; color:#fff; border:none;
          border-radius:10px; font-weight:700; font-size:.95rem; cursor:pointer;
          transition:background .2s;
        }
        .pet-mv-btn-primary:hover { background:#6d28d9; }
        .pet-mv-btn-outline {
          padding:13px 30px; background:transparent; color:#7c3aed;
          border:2px solid #7c3aed; border-radius:10px; font-weight:700;
          font-size:.95rem; cursor:pointer; transition:background .2s;
        }
        .pet-mv-btn-outline:hover { background:#f5f3ff; }
        .pet-mv-hero-img {
          width:100%; aspect-ratio:4/3; object-fit:cover;
          border-radius:26px 90px 26px 90px; cursor:pointer;
        }
        /* MAIN GRID */
        .pet-mv-main {
          display:grid; grid-template-columns:1fr 1fr; gap:40px;
          padding:0 40px 48px;
        }
        .pet-mv-main h3 {
          font-family:'Space Grotesk',sans-serif; font-size:1.35rem;
          font-weight:700; margin-bottom:18px; color:#1e1b4b;
        }
        .pet-mv-services {
          display:grid; grid-template-columns:1fr 1fr; gap:10px 20px;
        }
        .pet-mv-service-item { font-size:.93rem; color:#374151; line-height:1.7; }
        .pet-mv-pricing-panel {
          background:#fff; border:1px solid #ede9fe; border-radius:18px;
          padding:28px; box-shadow:0 2px 12px rgba(124,58,237,.06);
        }
        .pet-mv-pricing-panel h3 { margin-bottom:20px; }
        .pet-mv-price-row {
          display:flex; justify-content:space-between; align-items:center;
          padding:14px 0; border-bottom:1px solid #f3f0ff;
        }
        .pet-mv-price-row:last-child { border-bottom:none; }
        .pet-mv-price-row span:first-child { font-weight:600; color:#1e1b4b; }
        .pet-mv-price-row span:last-child {
          font-weight:700; color:#7c3aed; font-size:1.05rem;
        }
        /* INFO GRID */
        .pet-mv-info {
          display:grid; grid-template-columns:repeat(3,1fr); gap:24px;
          padding:0 40px 48px;
        }
        .pet-mv-info-card {
          background:#fff; border:1px solid #ede9fe; border-radius:16px;
          padding:26px; box-shadow:0 1px 8px rgba(124,58,237,.04);
        }
        .pet-mv-info-card h4 {
          font-family:'Space Grotesk',sans-serif; font-size:1.05rem;
          font-weight:700; margin-bottom:10px; color:#4c1d95;
        }
        .pet-mv-info-card p { font-size:.9rem; color:#4b5563; line-height:1.6; }
        /* LOWER GRID */
        .pet-mv-lower {
          display:grid; grid-template-columns:1fr 1fr; gap:40px;
          padding:0 40px 48px;
        }
        .pet-mv-form { display:flex; flex-direction:column; gap:14px; }
        .pet-mv-form h3 {
          font-family:'Space Grotesk',sans-serif; font-size:1.25rem;
          font-weight:700; color:#1e1b4b; margin-bottom:4px;
        }
        .pet-mv-form input,
        .pet-mv-form select,
        .pet-mv-form textarea {
          padding:11px 14px; border:1px solid #ddd6fe; border-radius:10px;
          font-size:.93rem; font-family:'Inter',sans-serif; outline:none;
          transition:border-color .2s;
        }
        .pet-mv-form input:focus,
        .pet-mv-form select:focus,
        .pet-mv-form textarea:focus { border-color:#7c3aed; }
        .pet-mv-form textarea { resize:vertical; min-height:70px; }
        .pet-mv-review {
          background:#7c3aed; color:#fff; border-radius:18px;
          padding:36px 32px; display:flex; flex-direction:column;
          justify-content:center;
        }
        .pet-mv-review blockquote {
          font-size:1.12rem; font-style:italic; line-height:1.6;
          margin-bottom:16px; opacity:.95;
        }
        .pet-mv-stars { font-size:1.1rem; margin-bottom:8px; }
        .pet-mv-reviewer { font-weight:700; font-size:.95rem; }
        /* GALLERY */
        .pet-mv-gallery {
          display:grid; grid-template-columns:1.2fr .8fr .8fr; gap:16px;
          padding:0 40px 56px;
        }
        .pet-mv-gallery img {
          width:100%; height:220px; object-fit:cover;
          border-radius:26px 90px 26px 90px; cursor:pointer;
          transition:transform .25s;
        }
        .pet-mv-gallery img:hover { transform:scale(1.02); }
        /* RESPONSIVE */
        @media(max-width:800px){
          .pet-mv-hero,
          .pet-mv-main,
          .pet-mv-info,
          .pet-mv-lower,
          .pet-mv-gallery { grid-template-columns:1fr; }
          .pet-mv-hero { padding:36px 20px 32px; gap:28px; }
          .pet-mv-main,
          .pet-mv-info,
          .pet-mv-lower,
          .pet-mv-gallery { padding-left:20px; padding-right:20px; }
          .pet-mv-nav { padding:14px 20px; }
        }
        @media(max-width:520px){
          .pet-mv-nav-links { display:none; }
          .pet-mv-hero h2 { font-size:1.55rem; }
          .pet-mv-ctas { flex-direction:column; }
          .pet-mv-price-strip { flex-direction:column; }
          .pet-mv-gallery img { height:170px; }
        }
      `}</style>

      <div className="pet-mv-root">
        {/* NAV */}
        <nav className="pet-mv-nav">
          <div className="pet-mv-nav-brand">
            <div className="pet-mv-nav-logo">M</div>
            HouseCall Vet Studio
          </div>
          <div className="pet-mv-nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#photos">Photos</a>
            <a href="#booking">Booking</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="pet-mv-hero">
          <div>
            <div className="pet-mv-pills">
              {pills.map((p, i) => (
                <span key={i} className="pet-mv-pill">{p}</span>
              ))}
            </div>
            <h2>
              {tagline || "Veterinary care brought gently to your front door."}
              {verified && <span className="pet-mv-verified"> ✓ Verified</span>}
            </h2>
            <p className="pet-mv-bio">
              {bio ||
                `${name || "Our mobile veterinarian"} provides compassionate, low-stress veterinary care right in the comfort of your home. Specializing in senior pets and anxious animals.`}
            </p>
            <div className="pet-mv-price-strip">
              {pricingCards.map((c, i) => (
                <div key={i} className="pet-mv-price-mini">
                  <span>{c.label}</span>
                  <strong>{c.price}</strong>
                </div>
              ))}
            </div>
            <div className="pet-mv-ctas">
              <button className="pet-mv-btn-primary" onClick={onHire}>
                Book Now
              </button>
              <button
                className="pet-mv-btn-outline"
                onClick={() => {
                  const el = document.getElementById("pet-mv-gallery");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Portfolio
              </button>
            </div>
          </div>
          <div>
            {heroImg ? (
              <img
                className="pet-mv-hero-img"
                src={heroImg}
                alt={name || "Mobile vet hero"}
                onClick={() => onPhotoClick?.(heroImg)}
              />
            ) : (
              <div
                className="pet-mv-hero-img"
                style={{ background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", color: "#7c3aed" }}
              >
                🐾 Hero Photo
              </div>
            )}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="pet-mv-main" id="services">
          <div>
            <h3>Our Mobile Vet Services</h3>
            <div className="pet-mv-services">
              {services.map((s, i) => (
                <div key={i} className="pet-mv-service-item">🐾 {s}</div>
              ))}
            </div>
          </div>
          <div className="pet-mv-pricing-panel" id="pricing">
            <h3>Pricing</h3>
            {pricingCards.map((c, i) => (
              <div key={i} className="pet-mv-price-row">
                <span>{c.label}</span>
                <span>{c.price}</span>
              </div>
            ))}
            {priceLabel && (
              <p style={{ marginTop: 14, fontSize: ".85rem", color: "#6b7280" }}>
                {priceLabel}
              </p>
            )}
          </div>
        </section>

        {/* INFO GRID */}
        <section className="pet-mv-info">
          <div className="pet-mv-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "We serve a 25-mile radius, bringing quality veterinary care to homes throughout the metro region."}</p>
          </div>
          <div className="pet-mv-info-card">
            <h4>Pet Care Notes</h4>
            <p>
              Please prepare a quiet room for the visit. A calm environment helps
              reduce stress for your pet and allows for a thorough examination.
            </p>
          </div>
          <div className="pet-mv-info-card">
            <h4>Booking</h4>
            <p>
              Appointments available Monday–Saturday. Same-week scheduling for
              urgent needs. Fill out the form below or call to reserve your visit.
            </p>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="pet-mv-lower" id="booking">
          <form
            className="pet-mv-form"
            onSubmit={(e) => {
              e.preventDefault();
              onHire?.();
            }}
          >
            <h3>Book a House Call</h3>
            <input type="text" placeholder="Pet name" required />
            <select defaultValue="">
              <option value="" disabled>
                Service type
              </option>
              <option>Wellness exam</option>
              <option>Vaccination</option>
              <option>Senior check-up</option>
              <option>Blood work</option>
              <option>End-of-life care</option>
            </select>
            <input type="date" placeholder="Preferred date" required />
            <textarea placeholder="Address & notes" />
            <button type="submit" className="pet-mv-btn-primary">
              Submit Request
            </button>
          </form>
          <div className="pet-mv-review">
            <div className="pet-mv-stars">★★★★★</div>
            <blockquote>
              "Our senior cat was so much calmer at home than at the clinic."
            </blockquote>
            <span className="pet-mv-reviewer">— Linda &amp; Whiskers</span>
          </div>
        </section>

        {/* GALLERY */}
        <section className="pet-mv-gallery" id="pet-mv-gallery">
          {galleryImgs.length > 0
            ? galleryImgs.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  onClick={() => onPhotoClick?.(src)}
                />
              ))
            : [0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "#ede9fe",
                    borderRadius: "26px 90px 26px 90px",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#7c3aed",
                    fontSize: "1rem",
                  }}
                >
                  🐾 Photo {i + 1}
                </div>
              ))}
        </section>
      </div>
    </>
  );
}
