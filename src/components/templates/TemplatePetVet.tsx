// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplatePetVet(props: TemplateProps) {
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
    : ["Wellness Exams", "Vaccinations", "Surgery"];

  const services = [
    "Wellness exams",
    "Vaccinations",
    "Dental cleaning",
    "Surgery",
    "Lab diagnostics",
    "Emergency care",
  ];

  const pricingCards = [
    { label: "Wellness Exam", price: pricing?.downloads?.single ?? 65 },
    { label: "Dental Package", price: pricing?.downloads?.full ?? 180 },
    { label: "Vaccination Bundle", price: undefined ?? 120 },
  ];

  const photos = portfolio?.slice(0, 3) ?? [];

  return (
    <>
      <style>{fonts}{`
        .pet-vt-wrap{background:linear-gradient(135deg,#f8fafc,#fff 48%,#dbeafe);font-family:'Inter',sans-serif;color:#1e293b;min-height:100vh}
        .pet-vt-nav{display:flex;align-items:center;justify-content:space-between;padding:18px 36px;border-bottom:1px solid #e2e8f0}
        .pet-vt-nav-brand{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;color:#1e293b}
        .pet-vt-nav-logo{width:38px;height:38px;border-radius:50%;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem}
        .pet-vt-nav-links{display:flex;gap:28px}
        .pet-vt-nav-links a{text-decoration:none;color:#475569;font-size:.92rem;font-weight:500;transition:color .2s}
        .pet-vt-nav-links a:hover{color:#2563eb}

        .pet-vt-hero{display:grid;grid-template-columns:1.15fr 1fr;gap:40px;padding:52px 36px 44px;align-items:center}
        .pet-vt-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
        .pet-vt-pill{background:#dbeafe;color:#2563eb;padding:5px 14px;border-radius:20px;font-size:.78rem;font-weight:600}
        .pet-vt-hero-heading{font-family:'Space Grotesk',sans-serif;font-size:2.15rem;font-weight:700;line-height:1.25;color:#0f172a;margin:0 0 10px}
        .pet-vt-verified{display:inline-flex;align-items:center;gap:5px;background:#dbeafe;color:#2563eb;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:12px;margin-left:8px;vertical-align:middle}
        .pet-vt-bio{color:#475569;font-size:.95rem;line-height:1.65;margin:14px 0 22px}

        .pet-vt-price-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:26px}
        .pet-vt-price-mini{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:14px 16px;text-align:center}
        .pet-vt-price-mini-label{font-size:.76rem;color:#64748b;margin-bottom:4px}
        .pet-vt-price-mini-val{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.15rem;color:#2563eb}

        .pet-vt-cta-row{display:flex;gap:12px}
        .pet-vt-btn-primary{background:#2563eb;color:#fff;border:none;padding:12px 28px;border-radius:18px;font-size:.92rem;font-weight:600;cursor:pointer;transition:background .2s}
        .pet-vt-btn-primary:hover{background:#1d4ed8}
        .pet-vt-btn-outline{background:transparent;color:#2563eb;border:2px solid #2563eb;padding:12px 28px;border-radius:18px;font-size:.92rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s}
        .pet-vt-btn-outline:hover{background:#2563eb;color:#fff}

        .pet-vt-hero-img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;display:block}

        .pet-vt-main{display:grid;grid-template-columns:1.2fr 1fr;gap:36px;padding:0 36px 48px}
        .pet-vt-section-title{font-family:'Space Grotesk',sans-serif;font-size:1.35rem;font-weight:700;color:#0f172a;margin:0 0 20px}
        .pet-vt-services-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px}
        .pet-vt-service-item{display:flex;align-items:center;gap:8px;font-size:.92rem;color:#334155;padding:6px 0}
        .pet-vt-service-icon{font-size:1rem}

        .pet-vt-pricing-panel{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:28px}
        .pet-vt-price-row{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid #f1f5f9}
        .pet-vt-price-row:last-child{border-bottom:none}
        .pet-vt-price-row-label{font-weight:600;color:#1e293b;font-size:.93rem}
        .pet-vt-price-row-val{font-family:'Space Grotesk',sans-serif;font-weight:700;color:#2563eb;font-size:1.05rem}

        .pet-vt-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:0 36px 48px}
        .pet-vt-info-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px}
        .pet-vt-info-card h4{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1rem;margin:0 0 10px;color:#0f172a}
        .pet-vt-info-card p,.pet-vt-info-card li{color:#475569;font-size:.88rem;line-height:1.6}
        .pet-vt-info-card ul{list-style:none;padding:0;margin:0}
        .pet-vt-info-card ul li::before{content:"• ";color:#2563eb;font-weight:700}

        .pet-vt-lower{display:grid;grid-template-columns:1fr 1fr;gap:36px;padding:0 36px 48px}
        .pet-vt-form{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:28px}
        .pet-vt-form h4{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;margin:0 0 18px;color:#0f172a}
        .pet-vt-form-group{margin-bottom:14px}
        .pet-vt-form-group label{display:block;font-size:.82rem;font-weight:600;color:#334155;margin-bottom:5px}
        .pet-vt-form-group input,.pet-vt-form-group select,.pet-vt-form-group textarea{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:12px;font-size:.9rem;font-family:'Inter',sans-serif;background:#f8fafc;outline:none;box-sizing:border-box}
        .pet-vt-form-group textarea{resize:vertical;min-height:70px}
        .pet-vt-form-group input:focus,.pet-vt-form-group select:focus,.pet-vt-form-group textarea:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.1)}
        .pet-vt-form-submit{background:#2563eb;color:#fff;border:none;padding:12px 0;width:100%;border-radius:18px;font-size:.92rem;font-weight:600;cursor:pointer;margin-top:6px;transition:background .2s}
        .pet-vt-form-submit:hover{background:#1d4ed8}

        .pet-vt-review{background:#2563eb;border-radius:18px;padding:36px;display:flex;flex-direction:column;justify-content:center;color:#fff}
        .pet-vt-review-quote{font-size:1.15rem;line-height:1.6;font-style:italic;margin:0 0 20px}
        .pet-vt-review-stars{font-size:1.1rem;margin-bottom:8px}
        .pet-vt-review-name{font-weight:700;font-size:.95rem}

        .pet-vt-gallery{padding:0 36px 56px}
        .pet-vt-gallery h3{font-family:'Space Grotesk',sans-serif;font-size:1.35rem;font-weight:700;color:#0f172a;margin:0 0 20px}
        .pet-vt-gallery-grid{display:grid;grid-template-columns:1.2fr .8fr .8fr;gap:14px}
        .pet-vt-gallery-img{width:100%;height:220px;object-fit:cover;border-radius:18px;cursor:pointer;transition:transform .25s,box-shadow .25s;display:block}
        .pet-vt-gallery-img:hover{transform:scale(1.02);box-shadow:0 8px 30px rgba(37,99,235,.15)}

        @media(max-width:800px){
          .pet-vt-hero{grid-template-columns:1fr}
          .pet-vt-main{grid-template-columns:1fr}
          .pet-vt-info-grid{grid-template-columns:1fr}
          .pet-vt-lower{grid-template-columns:1fr}
          .pet-vt-gallery-grid{grid-template-columns:1fr}
          .pet-vt-price-strip{grid-template-columns:1fr}
        }
        @media(max-width:520px){
          .pet-vt-nav-links{display:none}
          .pet-vt-hero-heading{font-size:1.55rem}
          .pet-vt-cta-row{flex-direction:column}
          .pet-vt-cta-row button{width:100%}
          .pet-vt-hero{padding:32px 18px 28px}
          .pet-vt-main,.pet-vt-info-grid,.pet-vt-lower,.pet-vt-gallery{padding-left:18px;padding-right:18px}
          .pet-vt-nav{padding:14px 18px}
        }
      `}</style>

      <div className="pet-vt-wrap">
        {/* ── Nav ── */}
        <nav className="pet-vt-nav">
          <div className="pet-vt-nav-brand">
            <div className="pet-vt-nav-logo">V</div>
            KindVet Animal Clinic
          </div>
          <div className="pet-vt-nav-links">
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#photos">Photos</a>
            <a href="#booking">Booking</a>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="pet-vt-hero">
          <div>
            <div className="pet-vt-pills">
              {pills.map((p, i) => (
                <span className="pet-vt-pill" key={i}>{p}</span>
              ))}
            </div>

            <h2 className="pet-vt-hero-heading">
              {tagline || "Clinical care with a warm touch for pets and their people."}
              {verified && <span className="pet-vt-verified">✓ Verified</span>}
            </h2>

            <p className="pet-vt-bio">
              {bio ||
                `${name || "KindVet Animal Clinic"} provides comprehensive veterinary services with compassion and expertise. From routine wellness exams to advanced surgical procedures, we treat every pet like family.`}
            </p>

            <div className="pet-vt-price-strip">
              {pricingCards.map((c, i) => (
                <div className="pet-vt-price-mini" key={i}>
                  <div className="pet-vt-price-mini-label">{c.label}</div>
                  <div className="pet-vt-price-mini-val">${c.price}</div>
                </div>
              ))}
            </div>

            <div className="pet-vt-cta-row">
              <button className="pet-vt-btn-primary" onClick={onHire}>
                Book Now
              </button>
              <button
                className="pet-vt-btn-outline"
                onClick={() => {
                  const el = document.getElementById("photos");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Portfolio
              </button>
            </div>
          </div>

          <div>
            {photos[0] ? (
              <img
                className="pet-vt-hero-img"
                src={photos[0].url}
                alt={photos[0]?.filename || "Hero"}
                onClick={() => onPhotoClick?.(photos[0], 0)}
              />
            ) : (
              <div
                className="pet-vt-hero-img"
                style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)" }}
              />
            )}
          </div>
        </section>

        {/* ── Main Grid ── */}
        <section className="pet-vt-main" id="services">
          <div>
            <h3 className="pet-vt-section-title">Our Veterinary Services</h3>
            <div className="pet-vt-services-grid">
              {services.map((s, i) => (
                <div className="pet-vt-service-item" key={i}>
                  <span className="pet-vt-service-icon">🐾</span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="pet-vt-pricing-panel" id="pricing">
            <h3 className="pet-vt-section-title">Pricing</h3>
            {pricingCards.map((c, i) => (
              <div className="pet-vt-price-row" key={i}>
                <span className="pet-vt-price-row-label">{c.label}</span>
                <span className="pet-vt-price-row-val">${c.price}</span>
              </div>
            ))}
            {priceLabel && (
              <p style={{ marginTop: 14, fontSize: ".82rem", color: "#64748b" }}>
                {priceLabel}
              </p>
            )}
          </div>
        </section>

        {/* ── Info Grid ── */}
        <section className="pet-vt-info-grid">
          <div className="pet-vt-info-card">
            <h4>Service Area</h4>
            <p>{serviceArea || "Greater Metro Area — in-clinic and mobile visits available."}</p>
          </div>
          <div className="pet-vt-info-card">
            <h4>Pet Care Notes</h4>
            <ul>
              <li>Complete pre-visit health form online</li>
              <li>Fasting required 12 hrs before surgery</li>
              <li>Bring vaccination records to first visit</li>
            </ul>
          </div>
          <div className="pet-vt-info-card">
            <h4>Booking</h4>
            <p>
              Schedule online or call us directly. Same-day appointments available for urgent
              care. Walk-ins welcome for vaccinations.
            </p>
          </div>
        </section>

        {/* ── Lower Grid ── */}
        <section className="pet-vt-lower" id="booking">
          <div className="pet-vt-form">
            <h4>Book an Appointment</h4>
            <div className="pet-vt-form-group">
              <label>Pet Name</label>
              <input type="text" placeholder="e.g. Milo" />
            </div>
            <div className="pet-vt-form-group">
              <label>Service Type</label>
              <select>
                <option value="">Select a service</option>
                {services.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="pet-vt-form-group">
              <label>Preferred Date</label>
              <input type="date" />
            </div>
            <div className="pet-vt-form-group">
              <label>Notes</label>
              <textarea placeholder="Any special needs or concerns..." />
            </div>
            <button className="pet-vt-form-submit" onClick={onHire}>
              Submit Booking
            </button>
          </div>

          <div className="pet-vt-review">
            <div className="pet-vt-review-stars">★★★★★</div>
            <p className="pet-vt-review-quote">
              "They explain everything clearly and treat our pets like family."
            </p>
            <span className="pet-vt-review-name">— Rachel &amp; Milo</span>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="pet-vt-gallery" id="photos">
          <h3>Gallery</h3>
          {photos.length > 0 && (
            <div className="pet-vt-gallery-grid">
              {photos.map((p, i) => (
                <img
                  key={i}
                  className="pet-vt-gallery-img"
                  src={p.url}
                  alt={p?.filename || `Photo ${i + 1}`}
                  onClick={() => onPhotoClick?.(p, i)}
                />
              ))}
            </div>
          )}
          {photos.length === 0 && (
            <div className="pet-vt-gallery-grid">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="pet-vt-gallery-img"
                  style={{ background: "linear-gradient(135deg,#dbeafe,#bfdbfe)" }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
