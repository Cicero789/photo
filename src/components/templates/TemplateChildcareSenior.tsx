// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateChildcareSenior(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const accent = "#92400e";
  const accentText = "#fff";
  const displayFont = '"Libre Baskerville",serif';
  const shape = "34px";
  const bg = "linear-gradient(135deg,#faf7ef,#fff 48%,#f3e8d6)";
  const textColor = "#1c1917";
  const brandName = "Golden Hour Senior Care";
  const brandLogo = "S";
  const defaultHeading = "Respectful in-home support that protects dignity and independence.";

  const services = ["Companionship visits","Medication reminders","Meal preparation","Light mobility support","Appointment transport","Daily check-ins"];
  const credentials = ["Licensed Home Care Agency","Bonded & Insured","Dementia Care Trained"];
  const testimonialQuote = "They treat my father with patience, respect, and real warmth.";

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const pills = specialties.length > 0 ? specialties.slice(0, 3) : services.slice(0, 3);

  const css = `
    .cc-sr-tpl { padding:40px 5vw 60px; background:${bg}; color:${textColor}; font-family:"Inter",system-ui,sans-serif; position:relative; overflow:hidden; }
    .cc-sr-nav-bar { display:flex; align-items:center; justify-content:space-between; gap:22px; margin-bottom:46px; }
    .cc-sr-brand { display:flex; align-items:center; gap:12px; font-weight:950; letter-spacing:-.03em; font-size:1.05rem; }
    .cc-sr-logo { width:42px; height:42px; display:grid; place-items:center; border-radius:15px; background:${accent}; color:#fff; font-weight:950; font-size:1.1rem; }
    .cc-sr-verified { margin-left:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#d1fae5; font-size:14px; color:#059669; }
    .cc-sr-nav-links { display:flex; gap:18px; flex-wrap:wrap; font-size:14px; font-weight:850; opacity:.72; }
    .cc-sr-nav-links span { cursor:pointer; }
    .cc-sr-hero { display:grid; grid-template-columns:1.04fr .96fr; gap:42px; align-items:center; }
    .cc-sr-pills { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
    .cc-sr-pill { padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.72); border:1px solid rgba(28,25,23,.1); font-size:13px; font-weight:900; }
    .cc-sr-hero h2 { margin:0; font-family:${displayFont}; font-size:clamp(40px,5.5vw,78px); line-height:.95; letter-spacing:-.06em; }
    .cc-sr-hero-desc { max-width:700px; margin:22px 0 0; opacity:.78; font-size:18px; line-height:1.7; }
    .cc-sr-price { margin-top:12px; font-weight:700; color:${accent}; }
    .cc-sr-cred-strip { display:flex; gap:14px; flex-wrap:wrap; margin-top:22px; }
    .cc-sr-cred-badge { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:${accent}; background:rgba(146,64,14,.08); padding:6px 14px; border-radius:999px; }
    .cc-sr-cred-check { width:16px; height:16px; border-radius:50%; background:${accent}; color:#fff; display:grid; place-items:center; font-size:9px; }
    .cc-sr-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:30px; }
    .cc-sr-btn-primary { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:${accent}; color:#fff; border:0; cursor:pointer; font-weight:950; font-size:15px; box-shadow:0 18px 46px rgba(28,25,23,.18); }
    .cc-sr-btn-ghost { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:transparent; color:${textColor}; border:2px solid rgba(28,25,23,.15); cursor:pointer; font-weight:800; font-size:15px; }
    .cc-sr-hero-img-wrap { position:relative; overflow:hidden; border-radius:${shape}; background:#fff; box-shadow:0 28px 90px rgba(28,25,23,.14); border:1px solid rgba(255,255,255,.5); }
    .cc-sr-hero-img { width:100%; height:430px; object-fit:cover; display:block; cursor:pointer; }
    .cc-sr-main { display:grid; grid-template-columns:.92fr 1.08fr; gap:24px; margin-top:52px; }
    .cc-sr-panel { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:22px; padding:36px 28px; }
    .cc-sr-panel h3 { font-family:${displayFont}; font-size:1.25rem; font-weight:700; margin:0 0 18px; }
    .cc-sr-svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }
    .cc-sr-svc-item { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; }
    .cc-sr-star { color:${accent}; font-size:14px; }
    .cc-sr-cred-list { display:flex; flex-direction:column; gap:14px; }
    .cc-sr-cred-row { display:flex; align-items:center; gap:10px; font-size:14px; font-weight:600; }
    .cc-sr-cred-icon { width:28px; height:28px; border-radius:50%; background:#d1fae5; color:#059669; display:grid; place-items:center; font-size:13px; flex-shrink:0; }
    .cc-sr-info { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
    .cc-sr-info-card { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:18px; padding:30px 24px; }
    .cc-sr-info-card h4 { font-family:${displayFont}; font-size:1rem; font-weight:700; margin:0 0 8px; }
    .cc-sr-info-card p { font-size:14px; line-height:1.6; opacity:.74; margin:0; }
    .cc-sr-lower { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:36px; }
    .cc-sr-form-panel { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:22px; padding:36px 28px; }
    .cc-sr-form-panel h3 { font-family:${displayFont}; font-size:1.15rem; font-weight:700; margin:0 0 18px; }
    .cc-sr-form-row { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
    .cc-sr-form-row label { font-size:13px; font-weight:700; }
    .cc-sr-form-row input, .cc-sr-form-row textarea { padding:10px 14px; border:1px solid rgba(28,25,23,.12); border-radius:10px; font-size:14px; font-family:inherit; resize:vertical; }
    .cc-sr-form-btn { margin-top:8px; padding:12px 24px; border-radius:999px; background:${accent}; color:#fff; border:0; cursor:pointer; font-weight:800; font-size:14px; }
    .cc-sr-testimonial-panel { background:${accent}; color:#fff; border-radius:22px; padding:40px 32px; display:flex; flex-direction:column; justify-content:center; }
    .cc-sr-testimonial-panel blockquote { font-family:${displayFont}; font-size:1.35rem; font-weight:600; line-height:1.5; margin:0 0 18px; font-style:italic; }
    .cc-sr-testimonial-panel cite { font-size:14px; font-weight:700; font-style:normal; opacity:.82; }
    .cc-sr-gallery { display:grid; grid-template-columns:1.3fr .7fr .7fr; grid-template-rows:1fr 1fr; gap:14px; margin-top:36px; }
    .cc-sr-gallery-img { width:100%; height:100%; min-height:180px; object-fit:cover; border-radius:16px; cursor:pointer; display:block; transition:transform .2s; }
    .cc-sr-gallery-img:hover { transform:scale(1.02); }
    .cc-sr-gallery-img:first-child { grid-row:1/3; }
    @media(max-width:800px){
      .cc-sr-hero,.cc-sr-main,.cc-sr-lower{grid-template-columns:1fr!important}
      .cc-sr-info{grid-template-columns:1fr!important}
      .cc-sr-nav-links{justify-content:flex-start}
      .cc-sr-gallery{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .cc-sr-gallery-img:first-child{grid-row:auto}
    }
    @media(max-width:520px){
      .cc-sr-tpl{padding:30px 4vw 40px!important}
      .cc-sr-hero h2{font-size:36px!important}
      .cc-sr-nav-links{display:none}
      .cc-sr-svc-grid{grid-template-columns:1fr}
      .cc-sr-gallery{grid-template-columns:1fr}
    }
  `;

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <div className="cc-sr-tpl">
        <nav className="cc-sr-nav-bar">
          <div className="cc-sr-brand">
            <span className="cc-sr-logo">{brandLogo}</span>
            {brandName}
            {verified && <span className="cc-sr-verified" title="Verified">✓</span>}
          </div>
          <div className="cc-sr-nav-links">
            <span>Services</span><span>Credentials</span><span>Availability</span><span>Safety</span>
          </div>
        </nav>

        <div className="cc-sr-hero">
          <div>
            {pills.length > 0 && (
              <div className="cc-sr-pills">
                {pills.map((s, i) => <span key={i} className="cc-sr-pill">{s}</span>)}
              </div>
            )}
            <h2>{tagline || defaultHeading}</h2>
            <p className="cc-sr-hero-desc">{bio}</p>
            {priceLabel && <p className="cc-sr-price">{priceLabel}</p>}
            <div className="cc-sr-cred-strip">
              {credentials.map((c, i) => (
                <span key={i} className="cc-sr-cred-badge">
                  <span className="cc-sr-cred-check">✓</span>{c}
                </span>
              ))}
            </div>
            <div className="cc-sr-cta-row">
              <button className="cc-sr-btn-primary" onClick={onHire}>Inquire Now</button>
              <button className="cc-sr-btn-ghost">View Availability</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="cc-sr-hero-img-wrap">
              <img className="cc-sr-hero-img" src={heroPhoto.url} alt={heroPhoto.filename || "Hero"} onClick={() => onPhotoClick(0)} loading="lazy" />
            </div>
          )}
        </div>

        <div className="cc-sr-main">
          <div className="cc-sr-panel">
            <h3>Our Services</h3>
            <div className="cc-sr-svc-grid">
              {services.map((s, i) => (
                <div key={i} className="cc-sr-svc-item">
                  <span className="cc-sr-star">★</span>{s}
                </div>
              ))}
            </div>
          </div>
          <div className="cc-sr-panel">
            <h3>Credentials &amp; Safety</h3>
            <div className="cc-sr-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="cc-sr-cred-row">
                  <span className="cc-sr-cred-icon">✓</span>{c}
                </div>
              ))}
            </div>
            {serviceArea && <p style={{ marginTop:18, fontSize:14, opacity:.68 }}>Serving: {serviceArea}</p>}
          </div>
        </div>

        <div className="cc-sr-info">
          <div className="cc-sr-info-card">
            <h4>Availability</h4>
            <p>Morning, afternoon, and overnight shifts available. Consistent caregivers assigned to build trust and familiarity.</p>
          </div>
          <div className="cc-sr-info-card">
            <h4>Safety</h4>
            <p>All caregivers are licensed, background-checked, and trained in fall prevention, medication safety, and emergency protocols.</p>
          </div>
          <div className="cc-sr-info-card">
            <h4>Family Fit</h4>
            <p>We meet with families first to understand routines, preferences, and health needs before matching a caregiver.</p>
          </div>
        </div>

        <div className="cc-sr-lower">
          <div className="cc-sr-form-panel">
            <h3>Care Inquiry</h3>
            <div className="cc-sr-form-row"><label>Parent / Guardian Name</label><input type="text" placeholder="Your name" /></div>
            <div className="cc-sr-form-row"><label>Child's Age</label><input type="text" placeholder="e.g. 5 years" /></div>
            <div className="cc-sr-form-row"><label>Message</label><textarea rows={3} placeholder="Tell us about your family's needs..." /></div>
            <button className="cc-sr-form-btn" onClick={onHire}>Send Inquiry</button>
          </div>
          <div className="cc-sr-testimonial-panel">
            <blockquote>"{testimonialQuote}"</blockquote>
            <cite>— Happy Family</cite>
          </div>
        </div>

        {galleryPhotos.length > 0 && (
          <div className="cc-sr-gallery">
            {galleryPhotos.map((p, i) => (
              <img key={p.id} className="cc-sr-gallery-img" src={p.url} alt={p.filename || `Gallery ${i+1}`} onClick={() => onPhotoClick(i + 1)} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
