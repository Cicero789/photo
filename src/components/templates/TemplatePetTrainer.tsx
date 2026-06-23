// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetTrainer(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";
  const pills = specialties.length > 0 ? specialties : ["Obedience", "Behavior", "Puppy Training"];
  const heroImg = portfolio?.[0]?.url || "";

  const services = [
    "Puppy foundations",
    "Loose-leash walking",
    "Recall training",
    "Reactivity coaching",
    "Private lessons",
    "Group classes",
  ];

  const pricingRows = [
    { label: "Single Session", price: "$95", desc: "One 60-minute private session" },
    { label: "4-Pack", price: "$340", desc: "Four sessions, flexible schedule" },
    { label: "Full Program", price: "$750", desc: "8-week structured training plan" },
  ];

  const css = `
    .pet-tr-root {
      font-family: 'Inter', system-ui, sans-serif;
      background: linear-gradient(135deg,#fff7ed,#fff 48%,#fef3c7);
      color: #1c1917;
      min-height: 100vh;
      line-height: 1.6;
    }

    /* ── Nav ── */
    .pet-tr-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 32px;
      border-bottom: 1px solid rgba(28,25,23,.08);
    }
    .pet-tr-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 1.05rem;
      color: #1c1917;
      letter-spacing: -.02em;
    }
    .pet-tr-brand-icon {
      width: 38px;
      height: 38px;
      background: #ea580c;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 6px 18px rgba(234,88,12,.25);
    }
    .pet-tr-nav-links {
      display: flex;
      gap: 22px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .pet-tr-nav-links span {
      cursor: pointer;
      color: #1c1917;
      opacity: 0.65;
      transition: opacity 0.2s;
    }
    .pet-tr-nav-links span:hover { opacity: 1; }

    /* ── Hero ── */
    .pet-tr-hero {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 40px;
      align-items: center;
      padding: 52px 32px 48px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .pet-tr-hero-copy {
      display: flex;
      flex-direction: column;
    }
    .pet-tr-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .pet-tr-pill {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #ea580c;
      background: rgba(234,88,12,.08);
      padding: 5px 13px;
      border-radius: 20px;
    }
    .pet-tr-hero h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.9rem, 4vw, 2.8rem);
      font-weight: 700;
      line-height: 1.1;
      color: #1c1917;
      margin: 0 0 16px 0;
      letter-spacing: -.03em;
    }
    .pet-tr-verified {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      background: #d1fae5;
      border-radius: 50%;
      margin-left: 8px;
      vertical-align: middle;
      color: #059669;
      font-size: 12px;
    }
    .pet-tr-hero-desc {
      font-size: 0.95rem;
      color: #57534e;
      line-height: 1.7;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .pet-tr-pricing-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 26px;
    }
    .pet-tr-pricing-mini {
      background: rgba(255,255,255,.75);
      border: 1px solid rgba(28,25,23,.08);
      border-radius: 14px;
      padding: 14px 12px;
      text-align: center;
      transition: box-shadow 0.2s;
    }
    .pet-tr-pricing-mini:hover {
      box-shadow: 0 6px 20px rgba(234,88,12,.10);
    }
    .pet-tr-pricing-mini-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: #78716c;
      margin-bottom: 4px;
    }
    .pet-tr-pricing-mini-price {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #ea580c;
    }
    .pet-tr-btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .pet-tr-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ea580c;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 26px;
      border: 2px solid #ea580c;
      border-radius: 26px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, box-shadow 0.2s;
      box-shadow: 0 8px 24px rgba(234,88,12,.2);
    }
    .pet-tr-btn-primary:hover {
      background: #c2410c;
      border-color: #c2410c;
      box-shadow: 0 12px 32px rgba(234,88,12,.28);
    }
    .pet-tr-btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: #1c1917;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 12px 26px;
      border: 2px solid rgba(28,25,23,.18);
      border-radius: 26px;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .pet-tr-btn-ghost:hover {
      border-color: #1c1917;
    }

    /* Hero Image */
    .pet-tr-hero-card {
      position: relative;
      border-radius: 26px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(28,25,23,.12);
    }
    .pet-tr-hero-img {
      width: 100%;
      height: 420px;
      object-fit: cover;
      display: block;
      cursor: pointer;
      transition: transform 0.3s;
    }
    .pet-tr-hero-img:hover {
      transform: scale(1.02);
    }

    /* ── Main Grid ── */
    .pet-tr-main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .pet-tr-panel {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(28,25,23,.07);
      border-radius: 26px;
      padding: 32px 26px;
    }
    .pet-tr-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #1c1917;
      margin: 0 0 18px 0;
      letter-spacing: -.02em;
    }
    .pet-tr-services-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .pet-tr-service-item {
      font-size: 0.9rem;
      color: #44403c;
      padding: 8px 0;
      line-height: 1.4;
    }
    .pet-tr-price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 18px;
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(28,25,23,.06);
      border-radius: 16px;
      margin-bottom: 10px;
      transition: box-shadow 0.2s;
    }
    .pet-tr-price-row:hover {
      box-shadow: 0 4px 16px rgba(234,88,12,.08);
    }
    .pet-tr-price-row:last-child { margin-bottom: 0; }
    .pet-tr-price-name {
      font-weight: 600;
      font-size: 0.92rem;
      color: #1c1917;
    }
    .pet-tr-price-desc {
      font-size: 0.76rem;
      color: #78716c;
      margin-top: 2px;
    }
    .pet-tr-price-amt {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #ea580c;
    }

    /* ── Info Grid ── */
    .pet-tr-info {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      padding: 0 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .pet-tr-info-card {
      background: rgba(255,255,255,.65);
      border: 1px solid rgba(28,25,23,.07);
      border-radius: 26px;
      padding: 26px 22px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .pet-tr-info-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(28,25,23,.07);
    }
    .pet-tr-info-card b {
      display: block;
      margin-bottom: 8px;
      font-size: 0.92rem;
      color: #1c1917;
    }
    .pet-tr-info-card p {
      margin: 0;
      font-size: 0.85rem;
      color: #57534e;
      line-height: 1.65;
    }

    /* ── Lower Grid ── */
    .pet-tr-lower {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      padding: 0 32px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .pet-tr-form-panel {
      background: rgba(255,255,255,.7);
      border: 1px solid rgba(28,25,23,.07);
      border-radius: 26px;
      padding: 32px 26px;
    }
    .pet-tr-form-panel h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #1c1917;
      margin: 0 0 20px 0;
      letter-spacing: -.02em;
    }
    .pet-tr-input,
    .pet-tr-select,
    .pet-tr-textarea {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid rgba(28,25,23,.12);
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      color: #1c1917;
      background: #fff;
      margin-bottom: 12px;
      outline: none;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }
    .pet-tr-input:focus,
    .pet-tr-select:focus,
    .pet-tr-textarea:focus {
      border-color: #ea580c;
    }
    .pet-tr-textarea {
      min-height: 80px;
      resize: vertical;
    }
    .pet-tr-form-submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #ea580c;
      color: #fff;
      font-family: 'Inter', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      padding: 11px 28px;
      border: none;
      border-radius: 26px;
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s;
      box-shadow: 0 6px 18px rgba(234,88,12,.18);
      margin-top: 4px;
    }
    .pet-tr-form-submit:hover {
      background: #c2410c;
      box-shadow: 0 10px 26px rgba(234,88,12,.25);
    }

    /* Review Card */
    .pet-tr-review {
      background: #ea580c;
      color: #fff;
      border-radius: 26px;
      padding: 36px 28px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .pet-tr-review-label {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      opacity: 0.8;
      margin-bottom: 16px;
    }
    .pet-tr-review-quote {
      font-family: 'Libre Baskerville', serif;
      font-size: 1.15rem;
      line-height: 1.65;
      font-style: italic;
      margin-bottom: 22px;
    }
    .pet-tr-review-stars {
      font-size: 1.1rem;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    .pet-tr-review-author {
      font-size: 0.85rem;
      font-weight: 700;
      opacity: 0.9;
    }

    /* ── Gallery ── */
    .pet-tr-gallery {
      display: grid;
      grid-template-columns: 1.2fr .8fr .8fr;
      gap: 14px;
      padding: 0 32px 56px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .pet-tr-gallery-img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      border-radius: 26px;
      cursor: pointer;
      display: block;
      transition: transform 0.25s, box-shadow 0.25s;
      box-shadow: 0 10px 30px rgba(28,25,23,.08);
    }
    .pet-tr-gallery-img:first-child {
      height: 260px;
    }
    .pet-tr-gallery-img:hover {
      transform: scale(1.02);
      box-shadow: 0 14px 40px rgba(28,25,23,.14);
    }

    /* ── Responsive 800px ── */
    @media (max-width: 800px) {
      .pet-tr-hero {
        grid-template-columns: 1fr;
        gap: 28px;
        padding: 36px 24px 36px;
      }
      .pet-tr-main {
        grid-template-columns: 1fr;
        padding: 0 24px 32px;
      }
      .pet-tr-info {
        grid-template-columns: 1fr;
        padding: 0 24px 32px;
      }
      .pet-tr-lower {
        grid-template-columns: 1fr;
        padding: 0 24px 32px;
      }
      .pet-tr-gallery {
        grid-template-columns: 1fr;
        padding: 0 24px 40px;
      }
      .pet-tr-gallery-img,
      .pet-tr-gallery-img:first-child {
        height: 220px;
      }
      .pet-tr-pricing-strip {
        grid-template-columns: 1fr;
      }
      .pet-tr-services-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ── Responsive 520px ── */
    @media (max-width: 520px) {
      .pet-tr-nav {
        padding: 14px 16px;
      }
      .pet-tr-nav-links { display: none; }
      .pet-tr-hero {
        padding: 28px 16px 28px;
      }
      .pet-tr-hero h2 {
        font-size: 1.7rem;
      }
      .pet-tr-btn-row {
        flex-direction: column;
      }
      .pet-tr-btn-primary,
      .pet-tr-btn-ghost {
        text-align: center;
        width: 100%;
      }
      .pet-tr-main,
      .pet-tr-info,
      .pet-tr-lower,
      .pet-tr-gallery {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  `;

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <section className="pet-tr-root">
        {/* ── Nav ── */}
        <nav className="pet-tr-nav">
          <div className="pet-tr-brand">
            <div className="pet-tr-brand-icon">D</div>
            GoodPup Training Co.
          </div>
          <div className="pet-tr-nav-links">
            <span>Services</span>
            <span>Pricing</span>
            <span>Photos</span>
            <span>Booking</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div className="pet-tr-hero">
          <div className="pet-tr-hero-copy">
            <div className="pet-tr-pills">
              {pills.map((p, i) => (
                <span key={i} className="pet-tr-pill">{p}</span>
              ))}
            </div>
            <h2>
              {tagline || "Better behavior, clearer communication, happier walks."}
              {verified && <span className="pet-tr-verified" title="Verified">✓</span>}
            </h2>
            <p className="pet-tr-hero-desc">
              {bio || "Positive-reinforcement dog training for puppies, adolescents, and reactive dogs. Serving families who want lasting results built on trust."}
            </p>
            <div className="pet-tr-pricing-strip">
              <div className="pet-tr-pricing-mini">
                <div className="pet-tr-pricing-mini-label">Single Session</div>
                <div className="pet-tr-pricing-mini-price">$95</div>
              </div>
              <div className="pet-tr-pricing-mini">
                <div className="pet-tr-pricing-mini-label">4-Pack</div>
                <div className="pet-tr-pricing-mini-price">$340</div>
              </div>
              <div className="pet-tr-pricing-mini">
                <div className="pet-tr-pricing-mini-label">Full Program</div>
                <div className="pet-tr-pricing-mini-price">$750</div>
              </div>
            </div>
            <div className="pet-tr-btn-row">
              <button className="pet-tr-btn-primary" onClick={onHire}>
                Book Now{priceLabel ? ` · ${priceLabel}` : ""}
              </button>
              <button className="pet-tr-btn-ghost" onClick={() => onPhotoClick(0)}>View Portfolio</button>
            </div>
          </div>
          {heroImg && (
            <div className="pet-tr-hero-card">
              <img
                className="pet-tr-hero-img"
                src={heroImg}
                alt={portfolio?.[0]?.filename || "Portfolio"}
                onClick={() => onPhotoClick(0)}
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* ── Main Grid: Services + Pricing ── */}
        <div className="pet-tr-main">
          <div className="pet-tr-panel">
            <h3>Training Services</h3>
            <div className="pet-tr-services-grid">
              {services.map((s, i) => (
                <div key={i} className="pet-tr-service-item">🐾 {s}</div>
              ))}
            </div>
          </div>
          <div className="pet-tr-panel">
            <h3>Pricing</h3>
            {pricingRows.map((row, i) => (
              <div key={i} className="pet-tr-price-row">
                <div>
                  <div className="pet-tr-price-name">{row.label}</div>
                  <div className="pet-tr-price-desc">{row.desc}</div>
                </div>
                <div className="pet-tr-price-amt">{row.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Info Grid ── */}
        <div className="pet-tr-info">
          <div className="pet-tr-info-card">
            <b>Service Area</b>
            <p>{serviceArea || "In-home visits and outdoor sessions available in your neighborhood."}</p>
          </div>
          <div className="pet-tr-info-card">
            <b>Pet Care Notes</b>
            <p>All sessions use force-free methods. Treats, clickers, and training plans are included with every package.</p>
          </div>
          <div className="pet-tr-info-card">
            <b>Booking</b>
            <p>Sessions are available Monday through Saturday. Evening and weekend slots fill quickly — book early for best availability.</p>
          </div>
        </div>

        {/* ── Lower Grid: Form + Review ── */}
        <div className="pet-tr-lower">
          <div className="pet-tr-form-panel">
            <h3>Request a Session</h3>
            <input className="pet-tr-input" type="text" placeholder="Your name" readOnly />
            <select className="pet-tr-select" defaultValue="">
              <option value="" disabled>Select a service</option>
              {services.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
            <input className="pet-tr-input" type="date" readOnly />
            <textarea className="pet-tr-textarea" placeholder="Tell us about your dog and goals..." readOnly />
            <button className="pet-tr-form-submit" onClick={onHire}>Submit Request</button>
          </div>
          <div className="pet-tr-review">
            <div className="pet-tr-review-label">Pet Parent Review</div>
            <div className="pet-tr-review-quote">
              &ldquo;Our dog finally walks calmly, and we understand how to keep the progress going.&rdquo;
            </div>
            <div className="pet-tr-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <div className="pet-tr-review-author">Jamie &amp; Scout</div>
          </div>
        </div>

        {/* ── Gallery ── */}
        {portfolio.length > 0 && (
          <div className="pet-tr-gallery">
            {portfolio.slice(0, 3).map((photo, i) => (
              <img
                key={photo.id}
                className="pet-tr-gallery-img"
                src={photo.url}
                alt={photo.filename || `Gallery ${i + 1}`}
                onClick={() => onPhotoClick(i)}
                loading="lazy"
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
