// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetSitter(props: TemplateProps) {
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

  const pills = specialties?.length
    ? specialties
    : ["In-Home Visits", "Overnight Stays", "Photo Updates"];

  const services = [
    "Drop-in visits",
    "Overnight stays",
    "Dog walking",
    "Medication admin",
    "Plant watering",
    "Mail collection",
  ];

  const heroImg = portfolio?.[0];
  const galleryPhotos = portfolio?.slice(0, 3) ?? [];

  return (
    <>
      <style>{fonts}{`
        .pet-st-root *,
        .pet-st-root *::before,
        .pet-st-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .pet-st-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #f0fdf4, #fff 48%, #dcfce7);
          color: #1e293b;
          min-height: 100vh;
        }

        /* Nav */
        .pet-st-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 48px;
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #bbf7d0;
          position: sticky; top: 0; z-index: 50;
        }
        .pet-st-nav-brand { display: flex; align-items: center; gap: 12px; }
        .pet-st-nav-logo {
          width: 40px; height: 40px; border-radius: 50%;
          background: #16a34a; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 18px;
        }
        .pet-st-nav-name { font-weight: 700; font-size: 15px; color: #052e16; }
        .pet-st-nav-links { display: flex; gap: 28px; }
        .pet-st-nav-links a {
          text-decoration: none; font-size: 14px; font-weight: 500; color: #374151;
          transition: color .2s;
        }
        .pet-st-nav-links a:hover { color: #16a34a; }

        /* Hero */
        .pet-st-hero {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          padding: 64px 48px 56px;
          align-items: center;
        }
        .pet-st-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
        .pet-st-pill {
          padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
          background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0;
        }
        .pet-st-hero h2 {
          font-family: 'Libre Baskerville', serif; font-size: 38px; font-weight: 700;
          line-height: 1.25; color: #052e16; margin-bottom: 8px;
        }
        .pet-st-verified {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #16a34a; margin-bottom: 16px;
        }
        .pet-st-bio { font-size: 15px; line-height: 1.7; color: #475569; margin-bottom: 24px; }
        .pet-st-price-strip {
          display: flex; gap: 12px; margin-bottom: 28px;
        }
        .pet-st-price-mini {
          flex: 1; padding: 14px 16px; border-radius: 14px;
          background: rgba(255,255,255,.85); border: 1px solid #bbf7d0;
          text-align: center;
        }
        .pet-st-price-mini-label { font-size: 12px; color: #64748b; margin-bottom: 4px; }
        .pet-st-price-mini-value { font-size: 18px; font-weight: 800; color: #052e16; }
        .pet-st-hero-btns { display: flex; gap: 12px; }
        .pet-st-btn-primary {
          padding: 14px 32px; border-radius: 34px; border: none;
          background: #16a34a; color: #fff; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: transform .2s, box-shadow .2s;
        }
        .pet-st-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,.3); }
        .pet-st-btn-secondary {
          padding: 14px 32px; border-radius: 34px;
          background: transparent; border: 2px solid #16a34a; color: #16a34a;
          font-size: 15px; font-weight: 700; cursor: pointer; transition: background .2s, color .2s;
        }
        .pet-st-btn-secondary:hover { background: #16a34a; color: #fff; }
        .pet-st-hero-img {
          width: 100%; aspect-ratio: 4/3; object-fit: cover;
          border-radius: 34px; cursor: pointer;
          border: 3px solid #bbf7d0;
          transition: transform .3s;
        }
        .pet-st-hero-img:hover { transform: scale(1.02); }

        /* Main Grid */
        .pet-st-main {
          display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
          padding: 0 48px 56px;
        }
        .pet-st-card {
          background: rgba(255,255,255,.88); border: 1px solid #bbf7d0;
          border-radius: 24px; padding: 32px;
        }
        .pet-st-card h3 {
          font-family: 'Libre Baskerville', serif; font-size: 22px; font-weight: 700;
          color: #052e16; margin-bottom: 20px;
        }
        .pet-st-services-list {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
          list-style: none;
        }
        .pet-st-services-list li {
          font-size: 14px; color: #374151; display: flex; align-items: center; gap: 8px;
        }
        .pet-st-price-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; border-bottom: 1px solid #e2e8f0;
        }
        .pet-st-price-row:last-child { border-bottom: none; }
        .pet-st-price-row-label { font-size: 14px; font-weight: 600; color: #1e293b; }
        .pet-st-price-row-val { font-size: 16px; font-weight: 800; color: #16a34a; }

        /* Info Grid */
        .pet-st-info {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          padding: 0 48px 56px;
        }
        .pet-st-info-card {
          background: rgba(255,255,255,.88); border: 1px solid #bbf7d0;
          border-radius: 24px; padding: 28px;
        }
        .pet-st-info-card h4 {
          font-size: 16px; font-weight: 700; color: #052e16; margin-bottom: 10px;
        }
        .pet-st-info-card p { font-size: 13px; line-height: 1.65; color: #475569; }

        /* Lower Grid */
        .pet-st-lower {
          display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
          padding: 0 48px 56px;
        }
        .pet-st-form { display: flex; flex-direction: column; gap: 14px; }
        .pet-st-form label { font-size: 13px; font-weight: 600; color: #374151; }
        .pet-st-form input,
        .pet-st-form select,
        .pet-st-form textarea {
          width: 100%; padding: 12px 14px; border-radius: 12px;
          border: 1px solid #d1d5db; font-size: 14px; font-family: inherit;
          transition: border-color .2s;
        }
        .pet-st-form input:focus,
        .pet-st-form select:focus,
        .pet-st-form textarea:focus { border-color: #16a34a; outline: none; }
        .pet-st-form textarea { resize: vertical; min-height: 80px; }
        .pet-st-review-card {
          background: #16a34a; border-radius: 24px; padding: 36px;
          color: #fff; display: flex; flex-direction: column; justify-content: center;
        }
        .pet-st-review-card .pet-st-stars { font-size: 20px; margin-bottom: 16px; }
        .pet-st-review-card .pet-st-quote {
          font-family: 'Libre Baskerville', serif; font-size: 20px;
          font-style: italic; line-height: 1.5; margin-bottom: 20px;
        }
        .pet-st-review-card .pet-st-reviewer { font-size: 14px; font-weight: 600; opacity: .9; }

        /* Gallery */
        .pet-st-gallery {
          display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 16px;
          padding: 0 48px 64px;
        }
        .pet-st-gallery-img {
          width: 100%; height: 260px; object-fit: cover;
          border-radius: 20px; cursor: pointer; border: 2px solid #bbf7d0;
          transition: transform .3s, box-shadow .3s;
        }
        .pet-st-gallery-img:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(22,163,74,.15); }

        /* Responsive */
        @media (max-width: 800px) {
          .pet-st-hero,
          .pet-st-main,
          .pet-st-info,
          .pet-st-lower,
          .pet-st-gallery { grid-template-columns: 1fr; }
          .pet-st-nav { padding: 14px 24px; }
          .pet-st-hero,
          .pet-st-main,
          .pet-st-info,
          .pet-st-lower,
          .pet-st-gallery { padding-left: 24px; padding-right: 24px; }
        }
        @media (max-width: 520px) {
          .pet-st-nav-links { display: none; }
          .pet-st-hero h2 { font-size: 26px; }
          .pet-st-hero-btns { flex-direction: column; }
          .pet-st-price-strip { flex-direction: column; }
        }
      `}</style>

      <div className="pet-st-root">
        {/* Nav */}
        <nav className="pet-st-nav">
          <div className="pet-st-nav-brand">
            <div className="pet-st-nav-logo">P</div>
            <span className="pet-st-nav-name">Cozy Paws Pet Sitting</span>
          </div>
          <div className="pet-st-nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#photos">Photos</a>
            <a href="#booking">Booking</a>
          </div>
        </nav>

        {/* Hero */}
        <section className="pet-st-hero">
          <div>
            <div className="pet-st-pills">
              {pills.map((p, i) => (
                <span key={i} className="pet-st-pill">{p}</span>
              ))}
            </div>
            <h2>
              At-home pet care with updates you can count on.
            </h2>
            {verified && (
              <div className="pet-st-verified">✅ Verified Professional</div>
            )}
            {(bio || tagline) && (
              <p className="pet-st-bio">{bio || tagline}</p>
            )}
            <div className="pet-st-price-strip">
              <div className="pet-st-price-mini">
                <div className="pet-st-price-mini-label">Drop-In Visit</div>
                <div className="pet-st-price-mini-value">$25</div>
              </div>
              <div className="pet-st-price-mini">
                <div className="pet-st-price-mini-label">Overnight Stay</div>
                <div className="pet-st-price-mini-value">$65</div>
              </div>
              <div className="pet-st-price-mini">
                <div className="pet-st-price-mini-label">Weekly Package</div>
                <div className="pet-st-price-mini-value">$150</div>
              </div>
            </div>
            <div className="pet-st-hero-btns">
              <button className="pet-st-btn-primary" onClick={onHire}>
                Book Now
              </button>
              <button
                className="pet-st-btn-secondary"
                onClick={() => onPhotoClick?.(0)}
              >
                View Portfolio
              </button>
            </div>
          </div>
          <div>
            {heroImg && (
              <img
                className="pet-st-hero-img"
                src={heroImg.url}
                alt={heroImg?.filename || name}
                onClick={() => onPhotoClick?.(0)}
              />
            )}
          </div>
        </section>

        {/* Main Grid */}
        <section className="pet-st-main" id="services">
          <div className="pet-st-card">
            <h3>Our Pet Sitting Services</h3>
            <ul className="pet-st-services-list">
              {services.map((s, i) => (
                <li key={i}>🐾 {s}</li>
              ))}
            </ul>
          </div>
          <div className="pet-st-card" id="pricing">
            <h3>Pricing</h3>
            {priceLabel && (
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
                {priceLabel}
              </p>
            )}
            <div className="pet-st-price-row">
              <span className="pet-st-price-row-label">Drop-In Visit</span>
              <span className="pet-st-price-row-val">$25</span>
            </div>
            <div className="pet-st-price-row">
              <span className="pet-st-price-row-label">Overnight Stay</span>
              <span className="pet-st-price-row-val">$65</span>
            </div>
            <div className="pet-st-price-row">
              <span className="pet-st-price-row-label">Weekly Package</span>
              <span className="pet-st-price-row-val">$150</span>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="pet-st-info">
          <div className="pet-st-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "Serving the greater metro area and surrounding neighborhoods."}</p>
          </div>
          <div className="pet-st-info-card">
            <h4>Pet Care Notes</h4>
            <p>
              Key safety protocols followed at every visit. Feeding routines are
              maintained exactly as instructed by pet owners.
            </p>
          </div>
          <div className="pet-st-info-card">
            <h4>Booking</h4>
            <p>
              Fill out the form below or reach out directly. We respond to all
              inquiries within 24 hours.
            </p>
          </div>
        </section>

        {/* Lower Grid */}
        <section className="pet-st-lower" id="booking">
          <div className="pet-st-card">
            <h3>Book a Visit</h3>
            <form
              className="pet-st-form"
              onSubmit={(e) => {
                e.preventDefault();
                onHire?.();
              }}
            >
              <label>Pet Name</label>
              <input type="text" placeholder="e.g. Bella" />
              <label>Service Type</label>
              <select>
                <option>Drop-in Visit</option>
                <option>Overnight Stay</option>
                <option>Dog Walking</option>
                <option>Weekly Package</option>
              </select>
              <label>Dates</label>
              <input type="text" placeholder="e.g. June 20 – June 25" />
              <label>Notes</label>
              <textarea placeholder="Any special instructions..." />
              <button type="submit" className="pet-st-btn-primary">
                Submit Booking
              </button>
            </form>
          </div>
          <div className="pet-st-review-card">
            <div className="pet-st-stars">★★★★★</div>
            <div className="pet-st-quote">
              "The photo updates made traveling so much easier."
            </div>
            <div className="pet-st-reviewer">— Megan &amp; Oliver</div>
          </div>
        </section>

        {/* Gallery */}
        {galleryPhotos.length > 0 && (
          <section className="pet-st-gallery" id="photos">
            {galleryPhotos.map((photo, i) => (
              <img
                key={i}
                className="pet-st-gallery-img"
                src={photo.url}
                alt={photo?.filename || `Photo ${i + 1}`}
                onClick={() => onPhotoClick?.(i)}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
