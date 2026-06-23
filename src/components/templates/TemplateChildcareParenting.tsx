// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateChildcareParenting(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const accent = "#16a34a";
  const accentText = "#052e16";
  const displayFont = '"Playfair Display",serif';
  const shape = "44px";
  const bg = "linear-gradient(135deg,#f0fdf4,#fff 48%,#dcfce7)";
  const textColor = "#052e16";
  const brandName = "Calm Home Parenting";
  const brandLogo = "P";
  const defaultHeading = "Supportive coaching for the messy middle of family life.";

  const services = ["Positive discipline","Emotional regulation","Sibling dynamics","Screen time balance","Boundary setting","Communication tools"];
  const credentials = ["Licensed Family Counselor","Certified Parent Educator","Positive Discipline Trainer"];
  const testimonialQuote = "We left every session with language we could use the same day.";

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const pills = specialties.length > 0 ? specialties.slice(0, 3) : services.slice(0, 3);

  const css = `
    .cc-pc-tpl { padding:40px 5vw 60px; background:${bg}; color:${textColor}; font-family:"Inter",system-ui,sans-serif; position:relative; overflow:hidden; }
    .cc-pc-nav-bar { display:flex; align-items:center; justify-content:space-between; gap:22px; margin-bottom:46px; }
    .cc-pc-brand { display:flex; align-items:center; gap:12px; font-weight:950; letter-spacing:-.03em; font-size:1.05rem; }
    .cc-pc-logo { width:42px; height:42px; display:grid; place-items:center; border-radius:15px; background:${accent}; color:#fff; font-weight:950; font-size:1.1rem; }
    .cc-pc-verified { margin-left:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#d1fae5; font-size:14px; color:#059669; }
    .cc-pc-nav-links { display:flex; gap:18px; flex-wrap:wrap; font-size:14px; font-weight:850; opacity:.72; }
    .cc-pc-nav-links span { cursor:pointer; }
    .cc-pc-hero { display:grid; grid-template-columns:1.04fr .96fr; gap:42px; align-items:center; }
    .cc-pc-pills { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
    .cc-pc-pill { padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.72); border:1px solid rgba(5,46,22,.1); font-size:13px; font-weight:900; }
    .cc-pc-hero h2 { margin:0; font-family:${displayFont}; font-size:clamp(40px,5.5vw,78px); line-height:.95; letter-spacing:-.06em; }
    .cc-pc-hero-desc { max-width:700px; margin:22px 0 0; opacity:.78; font-size:18px; line-height:1.7; }
    .cc-pc-price { margin-top:12px; font-weight:700; color:${accent}; }
    .cc-pc-cred-strip { display:flex; gap:14px; flex-wrap:wrap; margin-top:22px; }
    .cc-pc-cred-badge { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:${accent}; background:rgba(22,163,74,.08); padding:6px 14px; border-radius:999px; }
    .cc-pc-cred-check { width:16px; height:16px; border-radius:50%; background:${accent}; color:#fff; display:grid; place-items:center; font-size:9px; }
    .cc-pc-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:30px; }
    .cc-pc-btn-primary { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:${accent}; color:#fff; border:0; cursor:pointer; font-weight:950; font-size:15px; box-shadow:0 18px 46px rgba(5,46,22,.18); }
    .cc-pc-btn-ghost { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:transparent; color:${textColor}; border:2px solid rgba(5,46,22,.15); cursor:pointer; font-weight:800; font-size:15px; }
    .cc-pc-hero-img-wrap { position:relative; overflow:hidden; border-radius:${shape}; background:#fff; box-shadow:0 28px 90px rgba(5,46,22,.14); border:1px solid rgba(255,255,255,.5); }
    .cc-pc-hero-img { width:100%; height:430px; object-fit:cover; display:block; cursor:pointer; }
    .cc-pc-main { display:grid; grid-template-columns:.92fr 1.08fr; gap:24px; margin-top:52px; }
    .cc-pc-panel { background:rgba(255,255,255,.68); border:1px solid rgba(5,46,22,.07); border-radius:22px; padding:36px 28px; }
    .cc-pc-panel h3 { font-family:${displayFont}; font-size:1.25rem; font-weight:700; margin:0 0 18px; }
    .cc-pc-svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }
    .cc-pc-svc-item { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; }
    .cc-pc-star { color:${accent}; font-size:14px; }
    .cc-pc-cred-list { display:flex; flex-direction:column; gap:14px; }
    .cc-pc-cred-row { display:flex; align-items:center; gap:10px; font-size:14px; font-weight:600; }
    .cc-pc-cred-icon { width:28px; height:28px; border-radius:50%; background:#d1fae5; color:#059669; display:grid; place-items:center; font-size:13px; flex-shrink:0; }
    .cc-pc-info { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
    .cc-pc-info-card { background:rgba(255,255,255,.68); border:1px solid rgba(5,46,22,.07); border-radius:18px; padding:30px 24px; }
    .cc-pc-info-card h4 { font-family:${displayFont}; font-size:1rem; font-weight:700; margin:0 0 8px; }
    .cc-pc-info-card p { font-size:14px; line-height:1.6; opacity:.74; margin:0; }
    .cc-pc-lower { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:36px; }
    .cc-pc-form-panel { background:rgba(255,255,255,.68); border:1px solid rgba(5,46,22,.07); border-radius:22px; padding:36px 28px; }
    .cc-pc-form-panel h3 { font-family:${displayFont}; font-size:1.15rem; font-weight:700; margin:0 0 18px; }
    .cc-pc-form-row { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
    .cc-pc-form-row label { font-size:13px; font-weight:700; }
    .cc-pc-form-row input, .cc-pc-form-row textarea { padding:10px 14px; border:1px solid rgba(5,46,22,.12); border-radius:10px; font-size:14px; font-family:inherit; resize:vertical; }
    .cc-pc-form-btn { margin-top:8px; padding:12px 24px; border-radius:999px; background:${accent}; color:#fff; border:0; cursor:pointer; font-weight:800; font-size:14px; }
    .cc-pc-testimonial-panel { background:${accent}; color:#fff; border-radius:22px; padding:40px 32px; display:flex; flex-direction:column; justify-content:center; }
    .cc-pc-testimonial-panel blockquote { font-family:${displayFont}; font-size:1.35rem; font-weight:600; line-height:1.5; margin:0 0 18px; font-style:italic; }
    .cc-pc-testimonial-panel cite { font-size:14px; font-weight:700; font-style:normal; opacity:.82; }
    .cc-pc-gallery { display:grid; grid-template-columns:1.3fr .7fr .7fr; grid-template-rows:1fr 1fr; gap:14px; margin-top:36px; }
    .cc-pc-gallery-img { width:100%; height:100%; min-height:180px; object-fit:cover; border-radius:16px; cursor:pointer; display:block; transition:transform .2s; }
    .cc-pc-gallery-img:hover { transform:scale(1.02); }
    .cc-pc-gallery-img:first-child { grid-row:1/3; }
    @media(max-width:800px){
      .cc-pc-hero,.cc-pc-main,.cc-pc-lower{grid-template-columns:1fr!important}
      .cc-pc-info{grid-template-columns:1fr!important}
      .cc-pc-nav-links{justify-content:flex-start}
      .cc-pc-gallery{grid-template-columns:1fr 1fr;grid-template-rows:auto}
      .cc-pc-gallery-img:first-child{grid-row:auto}
    }
    @media(max-width:520px){
      .cc-pc-tpl{padding:30px 4vw 40px!important}
      .cc-pc-hero h2{font-size:36px!important}
      .cc-pc-nav-links{display:none}
      .cc-pc-svc-grid{grid-template-columns:1fr}
      .cc-pc-gallery{grid-template-columns:1fr}
    }
  `;

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <div className="cc-pc-tpl">
        <nav className="cc-pc-nav-bar">
          <div className="cc-pc-brand">
            <span className="cc-pc-logo">{brandLogo}</span>
            {brandName}
            {verified && <span className="cc-pc-verified" title="Verified">✓</span>}
          </div>
          <div className="cc-pc-nav-links">
            <span>Services</span><span>Credentials</span><span>Availability</span><span>Safety</span>
          </div>
        </nav>

        <div className="cc-pc-hero">
          <div>
            {pills.length > 0 && (
              <div className="cc-pc-pills">
                {pills.map((s, i) => <span key={i} className="cc-pc-pill">{s}</span>)}
              </div>
            )}
            <h2>{tagline || defaultHeading}</h2>
            <p className="cc-pc-hero-desc">{bio}</p>
            {priceLabel && <p className="cc-pc-price">{priceLabel}</p>}
            <div className="cc-pc-cred-strip">
              {credentials.map((c, i) => (
                <span key={i} className="cc-pc-cred-badge">
                  <span className="cc-pc-cred-check">✓</span>{c}
                </span>
              ))}
            </div>
            <div className="cc-pc-cta-row">
              <button className="cc-pc-btn-primary" onClick={onHire}>Inquire Now</button>
              <button className="cc-pc-btn-ghost">View Availability</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="cc-pc-hero-img-wrap">
              <img className="cc-pc-hero-img" src={heroPhoto.url} alt={heroPhoto.filename || "Hero"} onClick={() => onPhotoClick(0)} loading="lazy" />
            </div>
          )}
        </div>

        <div className="cc-pc-main">
          <div className="cc-pc-panel">
            <h3>Our Services</h3>
            <div className="cc-pc-svc-grid">
              {services.map((s, i) => (
                <div key={i} className="cc-pc-svc-item">
                  <span className="cc-pc-star">★</span>{s}
                </div>
              ))}
            </div>
          </div>
          <div className="cc-pc-panel">
            <h3>Credentials &amp; Safety</h3>
            <div className="cc-pc-cred-list">
              {credentials.map((c, i) => (
                <div key={i} className="cc-pc-cred-row">
                  <span className="cc-pc-cred-icon">✓</span>{c}
                </div>
              ))}
            </div>
            {serviceArea && <p style={{ marginTop:18, fontSize:14, opacity:.68 }}>Serving: {serviceArea}</p>}
          </div>
        </div>

        <div className="cc-pc-info">
          <div className="cc-pc-info-card">
            <h4>Availability</h4>
            <p>Sessions available weekdays and evenings. In-person and virtual options to fit your family's schedule.</p>
          </div>
          <div className="cc-pc-info-card">
            <h4>Safety</h4>
            <p>A judgment-free space built on evidence-based methods. Everything shared in sessions stays confidential.</p>
          </div>
          <div className="cc-pc-info-card">
            <h4>Family Fit</h4>
            <p>A short intro call helps us understand your family dynamic and make sure the coaching style feels right.</p>
          </div>
        </div>

        <div className="cc-pc-lower">
          <div className="cc-pc-form-panel">
            <h3>Care Inquiry</h3>
            <div className="cc-pc-form-row"><label>Parent / Guardian Name</label><input type="text" placeholder="Your name" /></div>
            <div className="cc-pc-form-row"><label>Child's Age</label><input type="text" placeholder="e.g. 5 years" /></div>
            <div className="cc-pc-form-row"><label>Message</label><textarea rows={3} placeholder="Tell us about your family's needs..." /></div>
            <button className="cc-pc-form-btn" onClick={onHire}>Send Inquiry</button>
          </div>
          <div className="cc-pc-testimonial-panel">
            <blockquote>"{testimonialQuote}"</blockquote>
            <cite>— Happy Parent</cite>
          </div>
        </div>

        {galleryPhotos.length > 0 && (
          <div className="cc-pc-gallery">
            {galleryPhotos.map((p, i) => (
              <img key={p.id} className="cc-pc-gallery-img" src={p.url} alt={p.filename || `Gallery ${i+1}`} onClick={() => onPhotoClick(i + 1)} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
