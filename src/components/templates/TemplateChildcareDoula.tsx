// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateChildcareDoula(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const accent = "#e11d48";
  const accentText = "#fff";
  const displayFont = '"Playfair Display",serif';
  const shape = "80px 28px 80px 28px";
  const bg = "linear-gradient(135deg,#fff1f2,#fff 48%,#fde68a)";
  const textColor = "#1c1917";
  const brandName = "Root & Rise Doula Care";
  const brandLogo = "D";
  const defaultHeading = "Steady, nurturing support before, during, and after birth.";
  const services = ["Birth planning","Labor support","Postpartum recovery","Breastfeeding guidance","Partner coaching","Newborn care education"];
  const credentials = ["DONA Certified Doula","Breastfeeding Educator","Neonatal Resuscitation Trained"];
  const testimonialQuote = "Her presence helped us feel grounded, informed, and cared for.";

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const pills = specialties.length > 0 ? specialties.slice(0, 3) : services.slice(0, 3);

  const css = `
    .cc-dl-tpl { padding:40px 5vw 60px; background:${bg}; color:${textColor}; font-family:"Inter",system-ui,sans-serif; position:relative; overflow:hidden; }
    .cc-dl-nav-bar { display:flex; align-items:center; justify-content:space-between; gap:22px; margin-bottom:46px; }
    .cc-dl-brand { display:flex; align-items:center; gap:12px; font-weight:950; letter-spacing:-.03em; font-size:1.05rem; }
    .cc-dl-logo { width:42px; height:42px; display:grid; place-items:center; border-radius:15px; background:${accent}; color:${accentText}; font-weight:950; font-size:1.1rem; }
    .cc-dl-verified { margin-left:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#d1fae5; font-size:14px; color:#059669; }
    .cc-dl-nav-links { display:flex; gap:18px; flex-wrap:wrap; font-size:14px; font-weight:850; opacity:.72; }
    .cc-dl-nav-links span { cursor:pointer; }
    .cc-dl-hero { display:grid; grid-template-columns:1.04fr .96fr; gap:42px; align-items:center; }
    .cc-dl-pills { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
    .cc-dl-pill { padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.72); border:1px solid rgba(28,25,23,.1); font-size:13px; font-weight:900; }
    .cc-dl-hero h2 { margin:0; font-family:${displayFont}; font-size:clamp(40px,5.5vw,78px); line-height:.95; letter-spacing:-.06em; }
    .cc-dl-hero-desc { max-width:700px; margin:22px 0 0; opacity:.78; font-size:18px; line-height:1.7; }
    .cc-dl-price { margin-top:12px; font-weight:700; color:${accent}; }
    .cc-dl-cred-strip { display:flex; gap:14px; flex-wrap:wrap; margin-top:22px; }
    .cc-dl-cred-badge { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:${accent}; background:rgba(225,29,72,.08); padding:6px 14px; border-radius:999px; }
    .cc-dl-cred-check { width:16px; height:16px; border-radius:50%; background:${accent}; color:${accentText}; display:grid; place-items:center; font-size:9px; }
    .cc-dl-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:30px; }
    .cc-dl-btn-primary { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:${accent}; color:${accentText}; border:0; cursor:pointer; font-weight:950; font-size:15px; box-shadow:0 18px 46px rgba(28,25,23,.18); }
    .cc-dl-btn-ghost { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:transparent; color:${textColor}; border:2px solid rgba(28,25,23,.15); cursor:pointer; font-weight:800; font-size:15px; }
    .cc-dl-hero-img-wrap { position:relative; overflow:hidden; border-radius:${shape}; background:#fff; box-shadow:0 28px 90px rgba(28,25,23,.14); border:1px solid rgba(255,255,255,.5); }
    .cc-dl-hero-img { width:100%; height:430px; object-fit:cover; display:block; cursor:pointer; }
    .cc-dl-main { display:grid; grid-template-columns:.92fr 1.08fr; gap:24px; margin-top:52px; }
    .cc-dl-panel { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:22px; padding:36px 28px; }
    .cc-dl-panel h3 { font-family:${displayFont}; font-size:1.25rem; font-weight:700; margin:0 0 18px; }
    .cc-dl-svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }
    .cc-dl-svc-item { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; }
    .cc-dl-star { color:${accent}; font-size:14px; }
    .cc-dl-cred-list { display:flex; flex-direction:column; gap:14px; }
    .cc-dl-cred-row { display:flex; align-items:center; gap:10px; font-size:14px; font-weight:600; }
    .cc-dl-cred-icon { width:28px; height:28px; border-radius:50%; background:#d1fae5; color:#059669; display:grid; place-items:center; font-size:13px; flex-shrink:0; }
    .cc-dl-info { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
    .cc-dl-info-card { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:18px; padding:30px 24px; }
    .cc-dl-info-card h4 { font-family:${displayFont}; font-size:1rem; font-weight:700; margin:0 0 8px; }
    .cc-dl-info-card p { font-size:14px; line-height:1.6; opacity:.74; margin:0; }
    .cc-dl-lower { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:36px; }
    .cc-dl-form-panel { background:rgba(255,255,255,.68); border:1px solid rgba(28,25,23,.07); border-radius:22px; padding:36px 28px; }
    .cc-dl-form-panel h3 { font-family:${displayFont}; font-size:1.15rem; font-weight:700; margin:0 0 18px; }
    .cc-dl-form-row { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
    .cc-dl-form-row label { font-size:13px; font-weight:700; }
    .cc-dl-form-row input, .cc-dl-form-row textarea { padding:10px 14px; border:1px solid rgba(28,25,23,.12); border-radius:10px; font-size:14px; font-family:inherit; resize:vertical; }
    .cc-dl-form-btn { margin-top:8px; padding:12px 24px; border-radius:999px; background:${accent}; color:${accentText}; border:0; cursor:pointer; font-weight:800; font-size:14px; }
    .cc-dl-testimonial-panel { background:${accent}; color:${accentText}; border-radius:22px; padding:40px 32px; display:flex; flex-direction:column; justify-content:center; }
    .cc-dl-testimonial-panel blockquote { font-family:${displayFont}; font-size:1.35rem; font-weight:600; line-height:1.5; margin:0 0 18px; font-style:italic; }
    .cc-dl-testimonial-panel cite { font-size:14px; font-weight:700; font-style:normal; opacity:.82; }
    .cc-dl-gallery { display:grid; grid-template-columns:1.3fr .7fr .7fr; grid-template-rows:1fr 1fr; gap:14px; margin-top:36px; }
    .cc-dl-gallery-img { width:100%; height:100%; min-height:180px; object-fit:cover; border-radius:16px; cursor:pointer; display:block; transition:transform .2s; }
    .cc-dl-gallery-img:hover { transform:scale(1.02); }
    .cc-dl-gallery-img:first-child { grid-row:1/3; }
    @media(max-width:800px){
      .cc-dl-hero,.cc-dl-main,.cc-dl-lower{grid-template-columns:1fr!important}
      .cc-dl-info{grid-template-columns:1fr!important}
      .cc-dl-nav-links{justify-content:flex-start}
      .cc-dl-gallery{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .cc-dl-gallery-img:first-child{grid-row:auto}
    }
    @media(max-width:520px){
      .cc-dl-tpl{padding:30px 4vw 40px!important}
      .cc-dl-hero h2{font-size:36px!important}
      .cc-dl-nav-links{display:none}
      .cc-dl-svc-grid{grid-template-columns:1fr}
      .cc-dl-gallery{grid-template-columns:1fr}
    }
  `;

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <div className="cc-dl-tpl">
        <nav className="cc-dl-nav-bar">
          <div className="cc-dl-brand">
            <span className="cc-dl-logo">{brandLogo}</span>
            {brandName}
            {verified && <span className="cc-dl-verified" title="Verified">&#10003;</span>}
          </div>
          <div className="cc-dl-nav-links">
            <span>Services</span><span>Credentials</span><span>Availability</span><span>Safety</span>
          </div>
        </nav>

        <div className="cc-dl-hero">
          <div>
            {pills.length > 0 && (
              <div className="cc-dl-pills">
                {pills.map((s, i) => <span key={i} className="cc-dl-pill">{s}</span>)}
              </div>
            )}
            <h2>{tagline || defaultHeading}</h2>
            <p className="cc-dl-hero-desc">{bio}</p>
            {priceLabel && <p className="cc-dl-price">{priceLabel}</p>}
            <div className="cc-dl-cred-strip">
              {credentials.map((c, i) => (
                <span key={i} className="cc-dl-cred-badge">
                  <span className="cc-dl-cred-check">&#10003;</span>{c}
                </span>
              ))}
            </div>
            <div className="cc-dl-cta-row">
              <button className="cc-dl-btn-primary" onClick={onHire}>Inquire Now</button>
              <button className="cc-dl-btn-ghost">View Availability</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="cc-dl-hero-img-wrap">
              <img className="cc-dl-hero-img" src={heroPhoto.url} alt={heroPhoto.filename || "Hero"} onClick={() => onPhotoClick(0)} loading="lazy" />
            </div>
          )}
        </div>

        <div className="cc-dl-main">
          <div className="cc-dl-panel">
            <h3>Our Services</h3>
            <div className="cc-dl-svc-grid">
              {services.map((s, i) => (
                <div key={i} className="cc-dl-svc-item">
                  <span className="cc-dl-star">&#9733;</span>{s}
                </div>
              ))}
            </div>
          </div>
          <div className="cc-dl-panel">
            <h3>Credentials &amp; Safety</h3>
            <div className="cc-dl-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="cc-dl-cred-row">
                  <span className="cc-dl-cred-icon">&#10003;</span>{c}
                </div>
              ))}
            </div>
            {serviceArea && <p style={{ marginTop:18, fontSize:14, opacity:.68 }}>Serving: {serviceArea}</p>}
          </div>
        </div>

        <div className="cc-dl-info">
          <div className="cc-dl-info-card">
            <h4>Availability</h4>
            <p>Prenatal visits begin at 34 weeks. On-call for birth 24/7 from 38 weeks through delivery, with postpartum visits after.</p>
          </div>
          <div className="cc-dl-info-card">
            <h4>Safety</h4>
            <p>DONA-certified with training in comfort measures, neonatal resuscitation, and evidence-based birth support practices.</p>
          </div>
          <div className="cc-dl-info-card">
            <h4>Family Fit</h4>
            <p>A complimentary meet-and-greet ensures both partners feel comfortable and confident before we commit to working together.</p>
          </div>
        </div>

        <div className="cc-dl-lower">
          <div className="cc-dl-form-panel">
            <h3>Care Inquiry</h3>
            <div className="cc-dl-form-row"><label>Parent / Guardian Name</label><input type="text" placeholder="Your name" /></div>
            <div className="cc-dl-form-row"><label>Due Date</label><input type="text" placeholder="e.g. August 2026" /></div>
            <div className="cc-dl-form-row"><label>Message</label><textarea rows={3} placeholder="Tell us about your birth preferences and needs..." /></div>
            <button className="cc-dl-form-btn" onClick={onHire}>Send Inquiry</button>
          </div>
          <div className="cc-dl-testimonial-panel">
            <blockquote>&ldquo;{testimonialQuote}&rdquo;</blockquote>
            <cite>&mdash; Happy Parent</cite>
          </div>
        </div>

        {galleryPhotos.length > 0 && (
          <div className="cc-dl-gallery">
            {galleryPhotos.map((p, i) => (
              <img key={p.id} className="cc-dl-gallery-img" src={p.url} alt={p.filename || `Gallery ${i+1}`} onClick={() => onPhotoClick(i + 1)} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
