// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetPhotographer(props: TemplateProps) {
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
    : ["Studio Sessions", "Outdoor Shoots", "Holiday Minis"];

  const services = [
    "Studio portraits",
    "Outdoor sessions",
    "Holiday mini sessions",
    "Adoption photos",
    "Multi-pet sessions",
    "Print packages",
  ];

  const pricingCards = [
    { label: "Mini Session", price: "$175" },
    { label: "Full Session", price: "$350" },
    { label: "Deluxe Package", price: "$595" },
  ];

  const heroImage = portfolio?.[0]?.url || "";
  const galleryImages = portfolio?.slice(0, 3) || [];

  return (
    <>
      <style>{fonts}{`
        .pet-pp-root *,
        .pet-pp-root *::before,
        .pet-pp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .pet-pp-root {
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #fff7ed, #fff 48%, #fce7f3);
          color: #1e1e1e;
          min-height: 100vh;
        }

        /* ── Nav ── */
        .pet-pp-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px;
          border-bottom: 1px solid #f3e8ff;
        }
        .pet-pp-nav-brand { display: flex; align-items: center; gap: 12px; }
        .pet-pp-nav-logo {
          width: 40px; height: 40px; border-radius: 50%;
          background: #be185d; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-weight: 800; font-size: 18px;
        }
        .pet-pp-nav-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 17px; color: #1e1e1e;
        }
        .pet-pp-nav-links { display: flex; gap: 28px; list-style: none; }
        .pet-pp-nav-links li {
          font-size: 14px; font-weight: 500; color: #64748b; cursor: pointer;
          transition: color .2s;
        }
        .pet-pp-nav-links li:hover { color: #be185d; }

        /* ── Hero ── */
        .pet-pp-hero {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 48px; padding: 56px 40px 48px;
          align-items: center;
        }
        .pet-pp-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
        .pet-pp-pill {
          background: #fce7f3; color: #be185d; border-radius: 20px;
          padding: 5px 14px; font-size: 12px; font-weight: 600;
        }
        .pet-pp-hero h2 {
          font-family: 'Playfair Display', serif; font-weight: 800;
          font-size: 38px; line-height: 1.2; color: #1e1e1e; margin-bottom: 8px;
        }
        .pet-pp-verified {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: #be185d; font-weight: 600; margin-bottom: 14px;
        }
        .pet-pp-bio {
          font-size: 15px; line-height: 1.65; color: #4b5563; margin-bottom: 20px;
        }
        .pet-pp-price-strip {
          display: flex; gap: 12px; margin-bottom: 24px;
        }
        .pet-pp-price-mini {
          flex: 1; background: #fff; border: 1px solid #f3e8ff;
          border-radius: 14px; padding: 12px 14px; text-align: center;
        }
        .pet-pp-price-mini-label {
          font-size: 11px; text-transform: uppercase; letter-spacing: .5px;
          color: #9ca3af; margin-bottom: 4px;
        }
        .pet-pp-price-mini-val {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 18px; color: #be185d;
        }
        .pet-pp-hero-btns { display: flex; gap: 12px; }
        .pet-pp-btn-primary {
          background: #be185d; color: #fff; border: none; border-radius: 44px;
          padding: 13px 30px; font-size: 15px; font-weight: 700; cursor: pointer;
          transition: background .2s;
        }
        .pet-pp-btn-primary:hover { background: #9f1239; }
        .pet-pp-btn-outline {
          background: transparent; color: #be185d;
          border: 2px solid #be185d; border-radius: 44px;
          padding: 13px 30px; font-size: 15px; font-weight: 700; cursor: pointer;
          transition: background .2s, color .2s;
        }
        .pet-pp-btn-outline:hover { background: #be185d; color: #fff; }
        .pet-pp-hero-img {
          width: 100%; aspect-ratio: 4/5; object-fit: cover;
          border-radius: 44px; background: #fce7f3;
        }

        /* ── Main Grid ── */
        .pet-pp-main {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; padding: 0 40px 48px;
        }
        .pet-pp-section-title {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 24px; margin-bottom: 20px; color: #1e1e1e;
        }
        .pet-pp-services-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .pet-pp-service-item {
          font-size: 14px; color: #4b5563; display: flex; align-items: center; gap: 8px;
        }
        .pet-pp-pricing-panel {
          background: #fff; border: 1px solid #f3e8ff; border-radius: 24px;
          padding: 28px;
        }
        .pet-pp-price-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 0; border-bottom: 1px solid #f9f0f5;
        }
        .pet-pp-price-row:last-child { border-bottom: none; }
        .pet-pp-price-row-label { font-weight: 600; font-size: 15px; }
        .pet-pp-price-row-val {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700; font-size: 18px; color: #be185d;
        }

        /* ── Info Grid ── */
        .pet-pp-info {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 24px; padding: 0 40px 48px;
        }
        .pet-pp-info-card {
          background: #fff; border: 1px solid #f3e8ff; border-radius: 20px;
          padding: 24px;
        }
        .pet-pp-info-card h4 {
          font-family: 'Playfair Display', serif; font-weight: 700;
          font-size: 17px; margin-bottom: 10px; color: #1e1e1e;
        }
        .pet-pp-info-card p {
          font-size: 14px; line-height: 1.6; color: #6b7280;
        }

        /* ── Lower Grid ── */
        .pet-pp-lower {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; padding: 0 40px 48px;
        }
        .pet-pp-form { display: flex; flex-direction: column; gap: 14px; }
        .pet-pp-form label {
          font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 2px;
        }
        .pet-pp-form input,
        .pet-pp-form select,
        .pet-pp-form textarea {
          width: 100%; border: 1px solid #e5e7eb; border-radius: 12px;
          padding: 10px 14px; font-size: 14px; font-family: 'Inter', sans-serif;
          outline: none; transition: border-color .2s;
        }
        .pet-pp-form input:focus,
        .pet-pp-form select:focus,
        .pet-pp-form textarea:focus { border-color: #be185d; }
        .pet-pp-form textarea { resize: vertical; min-height: 70px; }
        .pet-pp-review-card {
          background: #be185d; border-radius: 24px; padding: 32px;
          color: #fff; display: flex; flex-direction: column; justify-content: center;
        }
        .pet-pp-review-card blockquote {
          font-family: 'Libre Baskerville', serif; font-size: 18px;
          line-height: 1.6; font-style: italic; margin-bottom: 16px;
        }
        .pet-pp-review-stars { font-size: 18px; margin-bottom: 8px; }
        .pet-pp-review-author { font-size: 14px; font-weight: 600; opacity: .9; }

        /* ── Gallery ── */
        .pet-pp-gallery {
          display: grid; grid-template-columns: 1.2fr .8fr .8fr;
          gap: 16px; padding: 0 40px 56px;
        }
        .pet-pp-gallery-img {
          width: 100%; height: 260px; object-fit: cover;
          border-radius: 20px; cursor: pointer; background: #fce7f3;
          transition: transform .25s;
        }
        .pet-pp-gallery-img:hover { transform: scale(1.02); }

        /* ── Responsive ── */
        @media (max-width: 800px) {
          .pet-pp-hero,
          .pet-pp-main,
          .pet-pp-info,
          .pet-pp-lower,
          .pet-pp-gallery { grid-template-columns: 1fr; }
          .pet-pp-price-strip { flex-direction: column; }
        }
        @media (max-width: 520px) {
          .pet-pp-nav-links { display: none; }
          .pet-pp-hero h2 { font-size: 26px; }
          .pet-pp-hero-btns { flex-direction: column; }
          .pet-pp-nav { padding: 14px 20px; }
          .pet-pp-hero,
          .pet-pp-main,
          .pet-pp-info,
          .pet-pp-lower,
          .pet-pp-gallery { padding-left: 20px; padding-right: 20px; }
        }
      `}</style>

      <div className="pet-pp-root">
        {/* ── Nav ── */}
        <nav className="pet-pp-nav">
          <div className="pet-pp-nav-brand">
            <div className="pet-pp-nav-logo">P</div>
            <span className="pet-pp-nav-name">Wag &amp; Wonder Studio</span>
          </div>
          <ul className="pet-pp-nav-links">
            <li>Services</li>
            <li>Pricing</li>
            <li>Photos</li>
            <li>Booking</li>
          </ul>
        </nav>

        {/* ── Hero ── */}
        <section className="pet-pp-hero">
          <div>
            <div className="pet-pp-pills">
              {pills.map((p, i) => (
                <span className="pet-pp-pill" key={i}>{p}</span>
              ))}
            </div>

            <h2>
              Portraits that capture every whisker, wiggle, and personality.
              {verified && (
                <span className="pet-pp-verified"> ✔ Verified</span>
              )}
            </h2>

            <p className="pet-pp-bio">
              {bio ||
                `${name} specializes in heartfelt pet photography that celebrates the bond between you and your companion. Every session is tailored to your pet's unique personality.`}
            </p>

            <div className="pet-pp-price-strip">
              {pricingCards.map((c, i) => (
                <div className="pet-pp-price-mini" key={i}>
                  <div className="pet-pp-price-mini-label">{c.label}</div>
                  <div className="pet-pp-price-mini-val">{c.price}</div>
                </div>
              ))}
            </div>

            <div className="pet-pp-hero-btns">
              <button className="pet-pp-btn-primary" onClick={onHire}>
                Book Now
              </button>
              <button
                className="pet-pp-btn-outline"
                onClick={() => onPhotoClick?.(portfolio?.[0])}
              >
                View Portfolio
              </button>
            </div>
          </div>

          <div>
            {heroImage ? (
              <img
                className="pet-pp-hero-img"
                src={heroImage}
                alt={`${name} hero`}
                onClick={() => onPhotoClick?.(portfolio?.[0])}
              />
            ) : (
              <div className="pet-pp-hero-img" />
            )}
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section className="pet-pp-main">
          <div>
            <h3 className="pet-pp-section-title">Our Photography Services</h3>
            <div className="pet-pp-services-grid">
              {services.map((s, i) => (
                <div className="pet-pp-service-item" key={i}>
                  🐾 {s}
                </div>
              ))}
            </div>
          </div>

          <div className="pet-pp-pricing-panel">
            <h3 className="pet-pp-section-title">Pricing</h3>
            {pricingCards.map((c, i) => (
              <div className="pet-pp-price-row" key={i}>
                <span className="pet-pp-price-row-label">{c.label}</span>
                <span className="pet-pp-price-row-val">{c.price}</span>
              </div>
            ))}
            {priceLabel && (
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 12 }}>
                {priceLabel}
              </p>
            )}
          </div>
        </section>

        {/* ── Info Grid ── */}
        <section className="pet-pp-info">
          <div className="pet-pp-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "Greater metro area and surrounding suburbs. Travel fees may apply for sessions beyond 30 miles."}</p>
          </div>
          <div className="pet-pp-info-card">
            <h4>Pet Care Notes</h4>
            <p>
              Please bring your pet's favorite treats and toys to the session.
              We recommend a short walk beforehand so they're comfortable and relaxed.
            </p>
          </div>
          <div className="pet-pp-info-card">
            <h4>Booking</h4>
            <p>
              Sessions are available weekdays and weekends. Book at least one week
              in advance. A 50% deposit is required to reserve your date.
            </p>
          </div>
        </section>

        {/* ── Lower Grid ── */}
        <section className="pet-pp-lower">
          <div>
            <h3 className="pet-pp-section-title">Book a Session</h3>
            <form
              className="pet-pp-form"
              onSubmit={(e) => {
                e.preventDefault();
                onHire?.();
              }}
            >
              <label>Pet Name</label>
              <input type="text" placeholder="e.g. Luna" />
              <label>Session Type</label>
              <select>
                <option>Mini Session</option>
                <option>Full Session</option>
                <option>Deluxe Package</option>
              </select>
              <label>Preferred Date</label>
              <input type="date" />
              <label>Notes</label>
              <textarea placeholder="Anything we should know about your pet?" />
              <button className="pet-pp-btn-primary" type="submit">
                Submit Booking
              </button>
            </form>
          </div>

          <div className="pet-pp-review-card">
            <div className="pet-pp-review-stars">★★★★★</div>
            <blockquote>
              "They captured our dog's exact personality in every photo."
            </blockquote>
            <span className="pet-pp-review-author">— Sarah &amp; Luna</span>
          </div>
        </section>

        {/* ── Gallery ── */}
        {galleryImages.length > 0 && (
          <section className="pet-pp-gallery">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                className="pet-pp-gallery-img"
                src={img.url}
                alt={img.alt || `Gallery ${i + 1}`}
                onClick={() => onPhotoClick?.(img)}
              />
            ))}
          </section>
        )}
      </div>
    </>
  );
}
