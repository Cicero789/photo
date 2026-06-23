// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetGroomer(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : "";

  const pills = specialties?.length ? specialties : ["Bath & Brush", "Breed Cuts", "Nail Trim"];

  const services = [
    "Full groom",
    "Bath & blow dry",
    "Nail trimming",
    "De-matting",
    "Puppy first groom",
    "Teeth brushing",
  ];

  const pricingCards = [
    { title: "Puppy Groom", desc: "Gentle intro groom for puppies under 6 months", price: "$45" },
    { title: "Full Groom", desc: "Bath, haircut, nails, ears & teeth", price: "$75" },
    { title: "Spa Package", desc: "Full groom plus de-shed treatment & pawdicure", price: "$110" },
  ];

  return (
    <>
      <style>{fonts}{`
        .pet-gr-root {
          --accent: #db2777;
          --accent-text: #fff;
          --radius: 12px;
          font-family: 'Inter', sans-serif;
          color: #1e1e2f;
          background: radial-gradient(circle at 16% 18%,rgba(244,114,182,.26),transparent 25%),linear-gradient(135deg,#fff,#fdf2f8 52%,#fae8ff);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .pet-gr-root *, .pet-gr-root *::before, .pet-gr-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ---- Nav ---- */
        .pet-gr-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 40px; position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,.72); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(219,39,119,.10);
        }
        .pet-gr-nav-brand { display: flex; align-items: center; gap: 12px; }
        .pet-gr-nav-logo {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--accent); color: var(--accent-text);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px;
        }
        .pet-gr-nav-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; color: #1e1e2f; }
        .pet-gr-nav-links { display: flex; gap: 28px; list-style: none; }
        .pet-gr-nav-links a {
          text-decoration: none; font-size: 14px; font-weight: 500; color: #444;
          transition: color .2s;
        }
        .pet-gr-nav-links a:hover { color: var(--accent); }

        /* ---- Hero ---- */
        .pet-gr-hero {
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          padding: 64px 40px 56px; align-items: center; max-width: 1200px; margin: 0 auto;
        }
        .pet-gr-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .pet-gr-pill {
          background: rgba(219,39,119,.10); color: var(--accent);
          font-size: 12px; font-weight: 600; padding: 5px 14px;
          border-radius: 999px; letter-spacing: .3px;
        }
        .pet-gr-hero-heading {
          font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 800;
          line-height: 1.18; margin-bottom: 12px; color: #1e1e2f;
        }
        .pet-gr-verified {
          display: inline-flex; align-items: center; justify-content: center;
          width: 26px; height: 26px; border-radius: 50%; background: #16a34a;
          color: #fff; font-size: 14px; margin-left: 8px; vertical-align: middle;
        }
        .pet-gr-bio { font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 22px; }
        .pet-gr-price-strip { display: flex; gap: 12px; margin-bottom: 26px; }
        .pet-gr-price-mini {
          background: #fff; border: 1px solid rgba(219,39,119,.14);
          border-radius: 10px; padding: 10px 16px; flex: 1; text-align: center;
          box-shadow: 0 2px 8px rgba(219,39,119,.06);
        }
        .pet-gr-price-mini strong { display: block; font-size: 15px; color: var(--accent); }
        .pet-gr-price-mini span { font-size: 11px; color: #888; }
        .pet-gr-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .pet-gr-btn-primary {
          background: var(--accent); color: var(--accent-text);
          border: none; padding: 13px 30px; border-radius: 999px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }
        .pet-gr-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(219,39,119,.30); }
        .pet-gr-btn-ghost {
          background: transparent; color: var(--accent);
          border: 2px solid var(--accent); padding: 11px 28px; border-radius: 999px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: background .2s, color .2s;
        }
        .pet-gr-btn-ghost:hover { background: var(--accent); color: var(--accent-text); }
        .pet-gr-hero-img-wrap {
          width: 100%; aspect-ratio: 4/5; overflow: hidden;
          border-radius: 80px 28px 80px 28px;
          box-shadow: 0 12px 40px rgba(219,39,119,.13);
        }
        .pet-gr-hero-img-wrap img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          cursor: pointer; transition: transform .45s;
        }
        .pet-gr-hero-img-wrap img:hover { transform: scale(1.04); }

        /* ---- Main grid (Services + Pricing) ---- */
        .pet-gr-main {
          display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
          padding: 0 40px 56px; max-width: 1200px; margin: 0 auto;
        }
        .pet-gr-panel {
          background: #fff; border-radius: var(--radius); padding: 32px;
          border: 1px solid rgba(219,39,119,.10);
          box-shadow: 0 4px 18px rgba(219,39,119,.05);
        }
        .pet-gr-panel-title {
          font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
          margin-bottom: 20px; color: #1e1e2f;
        }
        .pet-gr-services-list {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px; list-style: none;
        }
        .pet-gr-services-list li {
          font-size: 14px; color: #444; padding: 8px 0;
          border-bottom: 1px solid rgba(219,39,119,.06);
        }
        .pet-gr-price-card {
          background: #fdf2f8; border-radius: 10px; padding: 18px 20px;
          margin-bottom: 14px; border: 1px solid rgba(219,39,119,.08);
          transition: transform .2s;
        }
        .pet-gr-price-card:last-child { margin-bottom: 0; }
        .pet-gr-price-card:hover { transform: translateY(-2px); }
        .pet-gr-price-card-name { font-weight: 700; font-size: 16px; color: #1e1e2f; margin-bottom: 4px; }
        .pet-gr-price-card-desc { font-size: 13px; color: #666; margin-bottom: 6px; }
        .pet-gr-price-card-price { font-size: 20px; font-weight: 700; color: var(--accent); }

        /* ---- Info grid ---- */
        .pet-gr-info {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          padding: 0 40px 56px; max-width: 1200px; margin: 0 auto;
        }
        .pet-gr-info-card {
          background: #fff; border-radius: var(--radius); padding: 28px;
          border: 1px solid rgba(219,39,119,.10);
          box-shadow: 0 4px 18px rgba(219,39,119,.05);
        }
        .pet-gr-info-card h3 {
          font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700;
          margin-bottom: 10px; color: #1e1e2f;
        }
        .pet-gr-info-card p { font-size: 14px; color: #555; line-height: 1.65; }

        /* ---- Lower grid (Booking + Review) ---- */
        .pet-gr-lower {
          display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
          padding: 0 40px 56px; max-width: 1200px; margin: 0 auto;
        }
        .pet-gr-form { display: flex; flex-direction: column; gap: 14px; }
        .pet-gr-form label { font-size: 13px; font-weight: 600; color: #333; }
        .pet-gr-form input, .pet-gr-form select, .pet-gr-form textarea {
          width: 100%; padding: 11px 14px; border: 1px solid rgba(219,39,119,.18);
          border-radius: 8px; font-size: 14px; font-family: 'Inter', sans-serif;
          outline: none; transition: border-color .2s; background: #fff;
        }
        .pet-gr-form input:focus, .pet-gr-form select:focus, .pet-gr-form textarea:focus {
          border-color: var(--accent);
        }
        .pet-gr-form textarea { resize: vertical; min-height: 80px; }
        .pet-gr-form-submit {
          background: var(--accent); color: var(--accent-text);
          border: none; padding: 13px; border-radius: 999px;
          font-size: 15px; font-weight: 600; cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }
        .pet-gr-form-submit:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(219,39,119,.30); }
        .pet-gr-review-card {
          background: var(--accent); color: var(--accent-text);
          border-radius: var(--radius); padding: 36px; display: flex;
          flex-direction: column; justify-content: center;
        }
        .pet-gr-review-stars { font-size: 22px; margin-bottom: 16px; letter-spacing: 3px; }
        .pet-gr-review-quote {
          font-family: 'Libre Baskerville', serif; font-size: 19px;
          font-style: italic; line-height: 1.6; margin-bottom: 20px;
        }
        .pet-gr-review-author { font-weight: 600; font-size: 14px; opacity: .9; }

        /* ---- Gallery ---- */
        .pet-gr-gallery {
          display: grid; grid-template-columns: 1.2fr .8fr .8fr; gap: 16px;
          padding: 0 40px 72px; max-width: 1200px; margin: 0 auto;
        }
        .pet-gr-gallery-item {
          border-radius: var(--radius); overflow: hidden; aspect-ratio: 4/3;
          box-shadow: 0 4px 16px rgba(219,39,119,.08); cursor: pointer;
        }
        .pet-gr-gallery-item img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .45s;
        }
        .pet-gr-gallery-item:hover img { transform: scale(1.05); }

        /* ---- Responsive ---- */
        @media (max-width: 800px) {
          .pet-gr-hero { grid-template-columns: 1fr; gap: 32px; padding: 40px 24px 40px; }
          .pet-gr-main { grid-template-columns: 1fr; padding: 0 24px 40px; }
          .pet-gr-info { grid-template-columns: 1fr; padding: 0 24px 40px; }
          .pet-gr-lower { grid-template-columns: 1fr; padding: 0 24px 40px; }
          .pet-gr-gallery { grid-template-columns: 1fr; padding: 0 24px 48px; }
          .pet-gr-nav { padding: 14px 24px; }
        }
        @media (max-width: 520px) {
          .pet-gr-nav-links { display: none; }
          .pet-gr-hero-heading { font-size: 28px; }
          .pet-gr-cta-row { flex-direction: column; }
          .pet-gr-cta-row button { width: 100%; }
          .pet-gr-price-strip { flex-direction: column; }
        }
      `}</style>

      <div className="pet-gr-root">
        {/* ---- Nav ---- */}
        <nav className="pet-gr-nav">
          <div className="pet-gr-nav-brand">
            <div className="pet-gr-nav-logo">P</div>
            <span className="pet-gr-nav-name">Fluff &amp; Shine Grooming</span>
          </div>
          <ul className="pet-gr-nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#photos">Photos</a></li>
            <li><a href="#booking">Booking</a></li>
          </ul>
        </nav>

        {/* ---- Hero ---- */}
        <section className="pet-gr-hero">
          <div>
            <div className="pet-gr-pills">
              {pills.map((p) => (
                <span key={p} className="pet-gr-pill">{p}</span>
              ))}
            </div>
            <h2 className="pet-gr-hero-heading">
              Cute cuts, clean coats, and calm grooming appointments.
              {verified && <span className="pet-gr-verified">&#10003;</span>}
            </h2>
            <p className="pet-gr-bio">{bio || tagline || "Professional pet grooming with a gentle touch, tailored to every breed and temperament."}</p>

            <div className="pet-gr-price-strip">
              {pricingCards.map((c) => (
                <div key={c?.filename} className="pet-gr-price-mini">
                  <strong>{c.price}</strong>
                  <span>{c?.filename}</span>
                </div>
              ))}
            </div>

            <div className="pet-gr-cta-row">
              <button className="pet-gr-btn-primary" onClick={onHire}>
                Book Now{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <button
                className="pet-gr-btn-ghost"
                onClick={() => onPhotoClick?.(0)}
              >
                View Portfolio
              </button>
            </div>
          </div>

          <div className="pet-gr-hero-img-wrap">
            {portfolio?.[0] && (
              <img
                src={portfolio?.[0]}
                alt={`${name} hero`}
                onClick={() => onPhotoClick?.(0)}
              />
            )}
          </div>
        </section>

        {/* ---- Main grid: Services + Pricing ---- */}
        <section className="pet-gr-main" id="services">
          <div className="pet-gr-panel">
            <h3 className="pet-gr-panel-title">Our Grooming Services</h3>
            <ul className="pet-gr-services-list">
              {services.map((s) => (
                <li key={s}>&#128062; {s}</li>
              ))}
            </ul>
          </div>

          <div className="pet-gr-panel" id="pricing">
            <h3 className="pet-gr-panel-title">Pricing</h3>
            {pricingCards.map((c) => (
              <div key={c?.filename} className="pet-gr-price-card">
                <div className="pet-gr-price-card-name">{c?.filename}</div>
                <div className="pet-gr-price-card-desc">{c.desc}</div>
                <div className="pet-gr-price-card-price">{c.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Info grid ---- */}
        <section className="pet-gr-info">
          <div className="pet-gr-info-card">
            <h3>Service Area</h3>
            <p>{serviceArea || "Serving pet parents across the greater metro area and surrounding neighborhoods."}</p>
          </div>
          <div className="pet-gr-info-card">
            <h3>Pet Care Notes</h3>
            <p>We use gentle, fear-free handling techniques to keep every pet calm and comfortable during their grooming session.</p>
          </div>
          <div className="pet-gr-info-card">
            <h3>Booking</h3>
            <p>Appointments available Monday through Saturday. Book online or call ahead to reserve your pet&apos;s preferred time slot.</p>
          </div>
        </section>

        {/* ---- Lower grid: Booking form + Review ---- */}
        <section className="pet-gr-lower" id="booking">
          <div className="pet-gr-panel">
            <h3 className="pet-gr-panel-title">Book an Appointment</h3>
            <form className="pet-gr-form" onSubmit={(e) => { e.preventDefault(); onHire?.(); }}>
              <label>Pet Name
                <input type="text" placeholder="e.g. Biscuit" />
              </label>
              <label>Service
                <select>
                  <option>Puppy Groom</option>
                  <option>Full Groom</option>
                  <option>Spa Package</option>
                  <option>Bath &amp; Blow Dry</option>
                  <option>Nail Trim</option>
                </select>
              </label>
              <label>Preferred Date
                <input type="date" />
              </label>
              <label>Special Notes
                <textarea placeholder="Anything we should know about your pet..." />
              </label>
              <button type="submit" className="pet-gr-form-submit">Request Appointment</button>
            </form>
          </div>

          <div className="pet-gr-review-card">
            <div className="pet-gr-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="pet-gr-review-quote">
              &ldquo;Our anxious pup came home clean, happy, and not stressed.&rdquo;
            </p>
            <span className="pet-gr-review-author">&mdash; Jamie &amp; Biscuit</span>
          </div>
        </section>

        {/* ---- Gallery ---- */}
        <section className="pet-gr-gallery" id="photos">
          {portfolio?.slice(0, 3).map((src, i) => (
            <div key={i} className="pet-gr-gallery-item" onClick={() => onPhotoClick?.(i)}>
              <img src={src} alt={`${name} gallery ${i + 1}`} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
