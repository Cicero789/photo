// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetDaycare(props: TemplateProps) {
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
    : ["Socialization", "Enrichment", "Supervised Play"];

  const heroImg = portfolio?.[0];
  const galleryImgs = portfolio?.slice(1, 4) ?? [];

  return (
    <>
      <style>{fonts}{`
        .pet-dc-root *,
        .pet-dc-root *::before,
        .pet-dc-root *::after { margin:0; padding:0; box-sizing:border-box; }

        .pet-dc-root {
          font-family: 'Inter', sans-serif;
          color: #1a2e05;
          background: radial-gradient(circle at 16% 18%,rgba(34,197,94,.26),transparent 25%),linear-gradient(135deg,#fff,#ecfccb 52%,#fef9c3);
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ---- NAV ---- */
        .pet-dc-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 40px;
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255,255,255,.72);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(101,163,13,.18);
        }
        .pet-dc-nav-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #1a2e05;
        }
        .pet-dc-nav-logo {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: #65a30d;
          color: #1a2e05;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
        }
        .pet-dc-nav-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }
        .pet-dc-nav-links li {
          font-size: .92rem;
          font-weight: 500;
          color: #3f6212;
          cursor: pointer;
          transition: color .2s;
        }
        .pet-dc-nav-links li:hover { color: #65a30d; }

        /* ---- HERO ---- */
        .pet-dc-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 40px 56px;
          align-items: center;
        }
        .pet-dc-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 18px;
        }
        .pet-dc-pill {
          background: rgba(101,163,13,.14);
          color: #3f6212;
          font-size: .78rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 999px;
          border: 1px solid rgba(101,163,13,.22);
        }
        .pet-dc-hero h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.45rem;
          font-weight: 700;
          line-height: 1.18;
          color: #1a2e05;
          margin-bottom: 10px;
        }
        .pet-dc-verified {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: .8rem;
          font-weight: 600;
          color: #65a30d;
          margin-left: 8px;
        }
        .pet-dc-bio {
          font-size: 1rem;
          line-height: 1.7;
          color: #4d5a38;
          margin: 16px 0 24px;
          max-width: 520px;
        }

        /* pricing strip */
        .pet-dc-price-strip {
          display: flex;
          gap: 14px;
          margin-bottom: 28px;
        }
        .pet-dc-price-card {
          background: #fff;
          border: 1px solid rgba(101,163,13,.2);
          border-radius: 14px;
          padding: 14px 20px;
          text-align: center;
          min-width: 110px;
        }
        .pet-dc-price-card strong {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a2e05;
        }
        .pet-dc-price-card span {
          font-size: .78rem;
          color: #65a30d;
          font-weight: 600;
        }

        /* CTA */
        .pet-dc-cta-row {
          display: flex;
          gap: 14px;
        }
        .pet-dc-btn-primary {
          background: #65a30d;
          color: #1a2e05;
          border: none;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: .95rem;
          padding: 13px 32px;
          border-radius: 12px;
          cursor: pointer;
          transition: background .2s;
        }
        .pet-dc-btn-primary:hover { background: #4d7c0f; color: #fff; }
        .pet-dc-btn-outline {
          background: transparent;
          color: #3f6212;
          border: 2px solid #65a30d;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: .95rem;
          padding: 12px 28px;
          border-radius: 12px;
          cursor: pointer;
          transition: background .2s;
        }
        .pet-dc-btn-outline:hover { background: rgba(101,163,13,.1); }

        /* hero image */
        .pet-dc-hero-img-wrap {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 26px 90px 26px 90px;
          overflow: hidden;
          background: #d9f99d;
        }
        .pet-dc-hero-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        /* ---- MAIN GRID ---- */
        .pet-dc-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 0 40px 56px;
        }
        .pet-dc-section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #1a2e05;
          margin-bottom: 20px;
        }
        .pet-dc-services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
        }
        .pet-dc-service-item {
          font-size: .92rem;
          color: #3f6212;
          padding: 6px 0;
        }

        /* pricing panel */
        .pet-dc-pricing-panel {
          background: #fff;
          border: 1px solid rgba(101,163,13,.18);
          border-radius: 20px;
          padding: 32px;
        }
        .pet-dc-pricing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 0;
          border-bottom: 1px solid rgba(101,163,13,.1);
        }
        .pet-dc-pricing-row:last-child { border-bottom: none; }
        .pet-dc-pricing-row span:first-child { font-weight: 600; color: #1a2e05; }
        .pet-dc-pricing-row span:last-child {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          color: #65a30d;
        }

        /* ---- INFO GRID ---- */
        .pet-dc-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 40px 56px;
        }
        .pet-dc-info-card {
          background: #fff;
          border: 1px solid rgba(101,163,13,.15);
          border-radius: 18px;
          padding: 28px 24px;
        }
        .pet-dc-info-card h4 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #1a2e05;
          margin-bottom: 10px;
        }
        .pet-dc-info-card p {
          font-size: .9rem;
          color: #4d5a38;
          line-height: 1.65;
        }

        /* ---- LOWER GRID ---- */
        .pet-dc-lower {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 0 40px 56px;
        }
        .pet-dc-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .pet-dc-form input,
        .pet-dc-form select,
        .pet-dc-form textarea {
          font-family: 'Inter', sans-serif;
          font-size: .92rem;
          padding: 12px 16px;
          border: 1.5px solid rgba(101,163,13,.25);
          border-radius: 12px;
          background: #fff;
          color: #1a2e05;
          outline: none;
          transition: border-color .2s;
        }
        .pet-dc-form input:focus,
        .pet-dc-form select:focus,
        .pet-dc-form textarea:focus {
          border-color: #65a30d;
        }
        .pet-dc-form textarea { resize: vertical; min-height: 80px; }

        .pet-dc-review-card {
          background: #65a30d;
          color: #1a2e05;
          border-radius: 22px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .pet-dc-review-card blockquote {
          font-family: 'Libre Baskerville', serif;
          font-size: 1.15rem;
          line-height: 1.7;
          font-style: italic;
          margin-bottom: 18px;
        }
        .pet-dc-review-stars {
          font-size: 1.1rem;
          margin-bottom: 8px;
        }
        .pet-dc-review-author {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: .95rem;
        }

        /* ---- GALLERY ---- */
        .pet-dc-gallery {
          display: grid;
          grid-template-columns: 1.2fr .8fr .8fr;
          gap: 16px;
          padding: 0 40px 64px;
        }
        .pet-dc-gallery-item {
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: #d9f99d;
        }
        .pet-dc-gallery-item img {
          width: 100%; height: 100%;
          object-fit: cover;
          cursor: pointer;
          transition: transform .3s;
        }
        .pet-dc-gallery-item img:hover { transform: scale(1.04); }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 800px) {
          .pet-dc-hero,
          .pet-dc-main,
          .pet-dc-info-grid,
          .pet-dc-lower,
          .pet-dc-gallery {
            grid-template-columns: 1fr;
          }
          .pet-dc-hero { padding: 40px 24px 36px; gap: 32px; }
          .pet-dc-main,
          .pet-dc-info-grid,
          .pet-dc-lower,
          .pet-dc-gallery {
            padding-left: 24px;
            padding-right: 24px;
          }
          .pet-dc-nav { padding: 14px 24px; }
        }

        @media (max-width: 520px) {
          .pet-dc-nav-links { display: none; }
          .pet-dc-hero h2 { font-size: 1.65rem; }
          .pet-dc-cta-row { flex-direction: column; }
          .pet-dc-cta-row button { width: 100%; }
          .pet-dc-price-strip { flex-wrap: wrap; }
          .pet-dc-services-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pet-dc-root">
        {/* NAV */}
        <nav className="pet-dc-nav">
          <div className="pet-dc-nav-brand">
            <div className="pet-dc-nav-logo">P</div>
            PlayYard Pet Daycare
          </div>
          <ul className="pet-dc-nav-links">
            <li>Services</li>
            <li>Pricing</li>
            <li>Photos</li>
            <li>Booking</li>
          </ul>
        </nav>

        {/* HERO */}
        <section className="pet-dc-hero">
          <div>
            <div className="pet-dc-pills">
              {pills.map((p, i) => (
                <span className="pet-dc-pill" key={i}>{p}</span>
              ))}
            </div>
            <h2>
              {tagline || "A playful day of social time, enrichment, and supervision."}
              {verified && (
                <span className="pet-dc-verified">✔ Verified</span>
              )}
            </h2>
            <p className="pet-dc-bio">
              {bio ||
                `${name || "PlayYard Pet Daycare"} provides a safe, fun, and enriching environment for your furry family members. Every day is filled with supervised play, socialization, and activities designed to keep tails wagging.`}
            </p>

            <div className="pet-dc-price-strip">
              <div className="pet-dc-price-card">
                <span>Half Day</span>
                <strong>{priceLabel || "$24"}</strong>
              </div>
              <div className="pet-dc-price-card">
                <span>Full Day</span>
                <strong>$38</strong>
              </div>
              <div className="pet-dc-price-card">
                <span>Weekly Pass</span>
                <strong>$160</strong>
              </div>
            </div>

            <div className="pet-dc-cta-row">
              <button className="pet-dc-btn-primary" onClick={onHire}>Book Now</button>
              <button
                className="pet-dc-btn-outline"
                onClick={() => onPhotoClick?.(0)}
              >
                View Portfolio
              </button>
            </div>
          </div>

          <div className="pet-dc-hero-img-wrap">
            {heroImg ? (
              <img
                src={heroImg.url}
                alt={heroImg.alt || "Happy dogs at daycare"}
                onClick={() => onPhotoClick?.(0)}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                🐾
              </div>
            )}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="pet-dc-main">
          <div>
            <h3 className="pet-dc-section-title">Our Daycare Services</h3>
            <div className="pet-dc-services-grid">
              {[
                "Full-day play",
                "Half-day sessions",
                "Puppy socialization",
                "Enrichment activities",
                "Webcam viewing",
                "Report cards",
              ].map((s, i) => (
                <div className="pet-dc-service-item" key={i}>🐾 {s}</div>
              ))}
            </div>
          </div>

          <div className="pet-dc-pricing-panel">
            <h3 className="pet-dc-section-title">Pricing</h3>
            {[
              ["Half Day (up to 5 hrs)", "$24"],
              ["Full Day (up to 10 hrs)", "$38"],
              ["Weekly Pass (5 days)", "$160"],
            ].map(([label, price], i) => (
              <div className="pet-dc-pricing-row" key={i}>
                <span>{label}</span>
                <span>{price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* INFO GRID */}
        <section className="pet-dc-info-grid">
          <div className="pet-dc-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "Available for drop-off and pick-up within the greater metro area. Convenient central location with ample parking."}</p>
          </div>
          <div className="pet-dc-info-card">
            <h4>Pet Care Notes</h4>
            <p>All pets must have up-to-date vaccinations. A temperament assessment is required before the first day to ensure a safe and happy experience for every guest.</p>
          </div>
          <div className="pet-dc-info-card">
            <h4>Booking</h4>
            <p>Reserve your spot online or give us a call. Same-day bookings accepted when space is available. Discounts for multi-day packages.</p>
          </div>
        </section>

        {/* LOWER GRID */}
        <section className="pet-dc-lower">
          <div>
            <h3 className="pet-dc-section-title">Book a Visit</h3>
            <form
              className="pet-dc-form"
              onSubmit={(e) => {
                e.preventDefault();
                onHire?.();
              }}
            >
              <input type="text" placeholder="Pet Name" required />
              <select defaultValue="">
                <option value="" disabled>Service Type</option>
                <option>Half Day</option>
                <option>Full Day</option>
                <option>Weekly Pass</option>
              </select>
              <input type="text" placeholder="Preferred Dates" />
              <textarea placeholder="Notes (allergies, special needs, etc.)" />
              <button className="pet-dc-btn-primary" type="submit">Submit Booking</button>
            </form>
          </div>

          <div className="pet-dc-review-card">
            <div className="pet-dc-review-stars">★★★★★</div>
            <blockquote>
              &ldquo;Our dog runs to the door every morning and comes home happy.&rdquo;
            </blockquote>
            <div className="pet-dc-review-author">— Priya &amp; Rosie</div>
          </div>
        </section>

        {/* GALLERY */}
        {galleryImgs.length > 0 && (
          <section className="pet-dc-gallery">
            {galleryImgs.map((img, i) => (
              <div className="pet-dc-gallery-item" key={i}>
                <img
                  src={img.url}
                  alt={img.alt || `Gallery photo ${i + 1}`}
                  onClick={() => onPhotoClick?.(i + 1)}
                />
              </div>
            ))}
          </section>
        )}
      </div>
    </>
  );
}
