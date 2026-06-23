// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetWalker(props: TemplateProps) {
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
    : ["GPS Tracking", "Daily Photos", "Flexible Schedule"];

  const services = [
    "Solo walks",
    "Group walks",
    "Puppy walks",
    "Senior dog walks",
    "Trail adventures",
    "Rain-or-shine guarantee",
  ];

  const heroImage = portfolio?.[0];

  return (
    <>
      <style>{fonts}{`
        .pet-wk-root {
          --accent: #0891b2;
          --accent-text: #ecfeff;
          background: linear-gradient(135deg, #ecfeff, #fff 48%, #f0fdfa);
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          min-height: 100vh;
        }

        /* ---- NAV ---- */
        .pet-wk-nav {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 32px;
          border-bottom: 1px solid #e0f2fe;
        }
        .pet-wk-nav-logo {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--accent-text);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 18px;
          flex-shrink: 0;
        }
        .pet-wk-nav-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 17px;
          color: #0f172a;
        }
        .pet-wk-nav-links {
          display: flex; gap: 24px;
          margin-left: auto;
          list-style: none; padding: 0; margin-top: 0; margin-bottom: 0;
        }
        .pet-wk-nav-links li a {
          font-size: 14px; font-weight: 500;
          color: #475569; text-decoration: none;
          transition: color .2s;
        }
        .pet-wk-nav-links li a:hover { color: var(--accent); }

        /* ---- HERO ---- */
        .pet-wk-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 56px 32px 48px;
          align-items: center;
        }
        .pet-wk-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-bottom: 18px;
        }
        .pet-wk-pill {
          background: #ecfeff;
          color: var(--accent);
          font-size: 12px; font-weight: 600;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid #cffafe;
        }
        .pet-wk-hero-h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 38px; font-weight: 700;
          line-height: 1.18;
          color: #0f172a;
          margin: 0 0 10px;
        }
        .pet-wk-verified {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600;
          color: var(--accent);
          margin-bottom: 14px;
        }
        .pet-wk-bio {
          font-size: 15px; line-height: 1.65;
          color: #475569;
          margin-bottom: 22px;
        }
        .pet-wk-price-strip {
          display: flex; gap: 10px;
          margin-bottom: 26px;
        }
        .pet-wk-price-card {
          background: #fff;
          border: 1px solid #e0f2fe;
          border-radius: 12px;
          padding: 12px 18px;
          text-align: center;
          flex: 1;
        }
        .pet-wk-price-card-label {
          font-size: 11px; font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: .4px;
        }
        .pet-wk-price-card-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #0f172a;
          margin-top: 4px;
        }
        .pet-wk-hero-btns {
          display: flex; gap: 12px;
        }
        .pet-wk-btn-primary {
          background: var(--accent);
          color: var(--accent-text);
          font-weight: 600; font-size: 15px;
          padding: 13px 30px;
          border: none; border-radius: 10px;
          cursor: pointer;
          transition: background .2s;
        }
        .pet-wk-btn-primary:hover { background: #0e7490; }
        .pet-wk-btn-outline {
          background: transparent;
          color: var(--accent);
          font-weight: 600; font-size: 15px;
          padding: 13px 30px;
          border: 2px solid var(--accent);
          border-radius: 10px;
          cursor: pointer;
          transition: background .2s, color .2s;
        }
        .pet-wk-btn-outline:hover {
          background: var(--accent);
          color: var(--accent-text);
        }
        .pet-wk-hero-img {
          width: 100%; aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 999px 999px 40px 40px;
          cursor: pointer;
        }

        /* ---- MAIN GRID ---- */
        .pet-wk-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 0 32px 48px;
        }
        .pet-wk-section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #0f172a;
          margin: 0 0 18px;
        }
        .pet-wk-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
        }
        .pet-wk-service-item {
          font-size: 14px; color: #334155;
          display: flex; align-items: center; gap: 8px;
        }
        .pet-wk-pricing-panel {
          background: #fff;
          border: 1px solid #e0f2fe;
          border-radius: 16px;
          padding: 28px;
        }
        .pet-wk-price-row {
          display: flex; justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .pet-wk-price-row:last-child { border-bottom: none; }
        .pet-wk-price-row-name {
          font-weight: 600; font-size: 15px;
          color: #0f172a;
        }
        .pet-wk-price-row-val {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 18px;
          color: var(--accent);
        }

        /* ---- INFO GRID ---- */
        .pet-wk-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 32px 48px;
        }
        .pet-wk-info-card {
          background: #fff;
          border: 1px solid #e0f2fe;
          border-radius: 16px;
          padding: 26px;
        }
        .pet-wk-info-card h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px; font-weight: 700;
          color: #0f172a;
          margin: 0 0 10px;
        }
        .pet-wk-info-card p {
          font-size: 14px; line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        /* ---- LOWER GRID ---- */
        .pet-wk-lower {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          padding: 0 32px 48px;
        }
        .pet-wk-form {
          background: #fff;
          border: 1px solid #e0f2fe;
          border-radius: 16px;
          padding: 28px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .pet-wk-form label {
          font-size: 13px; font-weight: 600;
          color: #334155;
          display: flex; flex-direction: column; gap: 5px;
        }
        .pet-wk-form input,
        .pet-wk-form select,
        .pet-wk-form textarea {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: border-color .2s;
        }
        .pet-wk-form input:focus,
        .pet-wk-form select:focus,
        .pet-wk-form textarea:focus {
          border-color: var(--accent);
        }
        .pet-wk-form textarea { resize: vertical; min-height: 70px; }
        .pet-wk-review-card {
          background: var(--accent);
          color: var(--accent-text);
          border-radius: 16px;
          padding: 34px;
          display: flex; flex-direction: column;
          justify-content: center;
        }
        .pet-wk-review-stars {
          font-size: 20px; margin-bottom: 14px;
        }
        .pet-wk-review-quote {
          font-size: 17px; font-style: italic;
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .pet-wk-review-author {
          font-weight: 700; font-size: 14px;
          opacity: .9;
        }

        /* ---- GALLERY ---- */
        .pet-wk-gallery {
          display: grid;
          grid-template-columns: 1.2fr .8fr .8fr;
          gap: 16px;
          padding: 0 32px 56px;
        }
        .pet-wk-gallery-img {
          width: 100%; height: 260px;
          object-fit: cover;
          border-radius: 14px;
          cursor: pointer;
          transition: transform .25s;
        }
        .pet-wk-gallery-img:hover { transform: scale(1.02); }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 800px) {
          .pet-wk-hero,
          .pet-wk-main,
          .pet-wk-info-grid,
          .pet-wk-lower,
          .pet-wk-gallery {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .pet-wk-nav-links { display: none; }
          .pet-wk-hero-h2 { font-size: 26px; }
          .pet-wk-hero-btns { flex-direction: column; }
          .pet-wk-price-strip { flex-direction: column; }
        }
      `}</style>

      <div className="pet-wk-root">
        {/* NAV */}
        <nav className="pet-wk-nav">
          <div className="pet-wk-nav-logo">D</div>
          <span className="pet-wk-nav-brand">TrailTail Dog Walking</span>
          <ul className="pet-wk-nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#photos">Photos</a></li>
            <li><a href="#booking">Booking</a></li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="pet-wk-hero">
          <div>
            <div className="pet-wk-pills">
              {pills.map((p, i) => (
                <span key={i} className="pet-wk-pill">{p}</span>
              ))}
            </div>
            <h2 className="pet-wk-hero-h2">
              {tagline || "Reliable walks, fresh air, and happy tired dogs."}
            </h2>
            {verified && (
              <div className="pet-wk-verified">✓ Verified Professional</div>
            )}
            <p className="pet-wk-bio">
              {bio ||
                "We provide professional, GPS-tracked dog walking services tailored to your pup's energy level, personality, and needs."}
            </p>
            <div className="pet-wk-price-strip">
              <div className="pet-wk-price-card">
                <div className="pet-wk-price-card-label">Single Walk</div>
                <div className="pet-wk-price-card-value">
                  {pricing?.downloads?.single
                    ? `$${pricing?.downloads?.single}`
                    : "$25"}
                </div>
              </div>
              <div className="pet-wk-price-card">
                <div className="pet-wk-price-card-label">10-Walk Pack</div>
                <div className="pet-wk-price-card-value">
                  {pricing?.downloads?.full
                    ? `$${pricing?.downloads?.full}`
                    : "$220"}
                </div>
              </div>
              <div className="pet-wk-price-card">
                <div className="pet-wk-price-card-label">Monthly Unlimited</div>
                <div className="pet-wk-price-card-value">
                  {undefined
                    ? `$${undefined}`
                    : "$399"}
                </div>
              </div>
            </div>
            <div className="pet-wk-hero-btns">
              <button className="pet-wk-btn-primary" onClick={onHire}>
                Book Now
              </button>
              <button
                className="pet-wk-btn-outline"
                onClick={() => onPhotoClick?.(0)}
              >
                View Portfolio
              </button>
            </div>
          </div>
          <div>
            {heroImage && (
              <img
                src={heroImage}
                alt={name}
                className="pet-wk-hero-img"
                onClick={() => onPhotoClick?.(0)}
              />
            )}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="pet-wk-main" id="services">
          <div>
            <h3 className="pet-wk-section-title">Our Walking Services</h3>
            <div className="pet-wk-services-grid">
              {services.map((s, i) => (
                <div key={i} className="pet-wk-service-item">
                  🐾 {s}
                </div>
              ))}
            </div>
          </div>
          <div className="pet-wk-pricing-panel" id="pricing">
            <h3 className="pet-wk-section-title">Pricing</h3>
            <div className="pet-wk-price-row">
              <span className="pet-wk-price-row-name">Single Walk</span>
              <span className="pet-wk-price-row-val">
                {pricing?.downloads?.single
                  ? `$${pricing?.downloads?.single}`
                  : "$25"}
              </span>
            </div>
            <div className="pet-wk-price-row">
              <span className="pet-wk-price-row-name">10-Walk Pack</span>
              <span className="pet-wk-price-row-val">
                {pricing?.downloads?.full
                  ? `$${pricing?.downloads?.full}`
                  : "$220"}
              </span>
            </div>
            <div className="pet-wk-price-row">
              <span className="pet-wk-price-row-name">Monthly Unlimited</span>
              <span className="pet-wk-price-row-val">
                {undefined ? `$${undefined}` : "$399"}
              </span>
            </div>
          </div>
        </section>

        {/* INFO GRID */}
        <section className="pet-wk-info-grid">
          <div className="pet-wk-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "Serving the greater metro area and surrounding trails within a 15-mile radius."}</p>
          </div>
          <div className="pet-wk-info-card">
            <h4>Pet Care Notes</h4>
            <p>Every walk includes live GPS tracking, a detailed route summary, and photos of your dog enjoying the adventure.</p>
          </div>
          <div className="pet-wk-info-card">
            <h4>Booking</h4>
            <p>Book online any time. Same-day availability on most days. Recurring schedules welcome — set it and forget it.</p>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="pet-wk-lower" id="booking">
          <form
            className="pet-wk-form"
            onSubmit={(e) => {
              e.preventDefault();
              onHire?.();
            }}
          >
            <h3 className="pet-wk-section-title">Book a Walk</h3>
            <label>
              Dog Name
              <input type="text" placeholder="e.g. Cooper" />
            </label>
            <label>
              Service Type
              <select>
                <option>Solo Walk</option>
                <option>Group Walk</option>
                <option>Puppy Walk</option>
                <option>Senior Dog Walk</option>
                <option>Trail Adventure</option>
              </select>
            </label>
            <label>
              Preferred Time
              <input type="text" placeholder="e.g. Weekdays 10 AM" />
            </label>
            <label>
              Notes
              <textarea placeholder="Any special instructions..." />
            </label>
            <button type="submit" className="pet-wk-btn-primary">
              Submit Booking
            </button>
          </form>

          <div className="pet-wk-review-card">
            <div className="pet-wk-review-stars">★★★★★</div>
            <p className="pet-wk-review-quote">
              &ldquo;The GPS notes and photos are excellent, and our dog comes
              home relaxed.&rdquo;
            </p>
            <span className="pet-wk-review-author">— Alex &amp; Cooper</span>
          </div>
        </section>

        {/* GALLERY */}
        {portfolio && portfolio.length > 1 && (
          <section className="pet-wk-gallery" id="photos">
            {portfolio.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${name} gallery ${i + 1}`}
                className="pet-wk-gallery-img"
                onClick={() => onPhotoClick?.(i)}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
