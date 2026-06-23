// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&family=Playfair+Display:wght@600;700;800&family=Libre+Baskerville:wght@400;700&display=swap');`;

export default function TemplateChildcareDaycare(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  const PREFIX = "cc-dc";
  const accent = "#0f766e";
  const accentText = "#fff";
  const displayFont = '"Space Grotesk",sans-serif';
  const shape = "999px 999px 40px 40px";
  const bg = "radial-gradient(circle at 16% 18%,rgba(45,212,191,.24),transparent 25%),linear-gradient(135deg,#ecfeff,#fff 48%,#fef9c3)";
  const textColor = "#0f172a";
  const brandName = "BrightStart Learning Center";
  const brandLogo = "D";
  const defaultHeading = "A bright, safe place for little learners to grow.";

  const services = ["Infant care","Toddler program","Pre-K readiness","Outdoor play","Meals and snacks","Parent updates"];
  const credentials = ["State Licensed Childcare Center","CPR/First Aid Certified Staff","Secure Check-In System"];
  const testimonialQuote = "The teachers know our child deeply, and the updates make us feel connected all day.";

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 4);
  const pills = specialties.length > 0 ? specialties.slice(0, 3) : services.slice(0, 3);

  const css = `
    .${PREFIX}-tpl { padding:40px 5vw 60px; background:${bg}; color:${textColor}; font-family:"Inter",system-ui,sans-serif; position:relative; overflow:hidden; }

    /* Nav */
    .${PREFIX}-nav-bar { display:flex; align-items:center; justify-content:space-between; gap:22px; margin-bottom:46px; }
    .${PREFIX}-brand { display:flex; align-items:center; gap:12px; font-weight:950; letter-spacing:-.03em; font-size:1.05rem; }
    .${PREFIX}-logo { width:42px; height:42px; display:grid; place-items:center; border-radius:15px; background:${accent}; color:${accentText}; font-weight:950; font-size:1.1rem; }
    .${PREFIX}-verified { margin-left:8px; display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; border-radius:50%; background:#d1fae5; font-size:14px; color:#059669; }
    .${PREFIX}-nav-links { display:flex; gap:18px; flex-wrap:wrap; font-size:14px; font-weight:850; opacity:.72; }
    .${PREFIX}-nav-links span { cursor:pointer; }

    /* Hero */
    .${PREFIX}-hero { display:grid; grid-template-columns:1.04fr .96fr; gap:42px; align-items:center; }
    .${PREFIX}-pills { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:24px; }
    .${PREFIX}-pill { padding:10px 14px; border-radius:999px; background:rgba(255,255,255,.72); border:1px solid rgba(15,23,42,.1); font-size:13px; font-weight:900; }
    .${PREFIX}-hero h2 { margin:0; font-family:${displayFont}; font-size:clamp(40px,5.5vw,78px); line-height:.95; letter-spacing:-.06em; }
    .${PREFIX}-hero-desc { max-width:700px; margin:22px 0 0; opacity:.78; font-size:18px; line-height:1.7; }
    .${PREFIX}-price { margin-top:12px; font-weight:700; color:${accent}; }
    .${PREFIX}-cred-strip { display:flex; gap:14px; flex-wrap:wrap; margin-top:22px; }
    .${PREFIX}-cred-badge { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; color:${accent}; background:rgba(15,118,110,.08); padding:6px 14px; border-radius:999px; }
    .${PREFIX}-cred-check { width:16px; height:16px; border-radius:50%; background:${accent}; color:${accentText}; display:grid; place-items:center; font-size:9px; }
    .${PREFIX}-cta-row { display:flex; gap:14px; flex-wrap:wrap; margin-top:30px; }
    .${PREFIX}-btn-primary { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:${accent}; color:${accentText}; border:0; cursor:pointer; font-weight:950; font-size:15px; box-shadow:0 18px 46px rgba(15,23,42,.20); }
    .${PREFIX}-btn-ghost { display:inline-flex; align-items:center; justify-content:center; min-height:52px; padding:0 22px; border-radius:999px; background:transparent; color:${textColor}; border:2px solid rgba(15,23,42,.15); cursor:pointer; font-weight:800; font-size:15px; }
    .${PREFIX}-hero-img-wrap { position:relative; overflow:hidden; border-radius:${shape}; background:#fff; box-shadow:0 28px 90px rgba(15,23,42,.16); border:1px solid rgba(255,255,255,.5); }
    .${PREFIX}-hero-img { width:100%; height:430px; object-fit:cover; display:block; cursor:pointer; }

    /* Main grid: services + credentials */
    .${PREFIX}-main { display:grid; grid-template-columns:.92fr 1.08fr; gap:24px; margin-top:52px; }
    .${PREFIX}-panel { background:rgba(255,255,255,.68); border:1px solid rgba(15,23,42,.07); border-radius:22px; padding:36px 28px; }
    .${PREFIX}-panel h3 { font-family:${displayFont}; font-size:1.25rem; font-weight:700; margin:0 0 18px; }
    .${PREFIX}-svc-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px 18px; }
    .${PREFIX}-svc-item { display:flex; align-items:center; gap:8px; font-size:14px; font-weight:600; }
    .${PREFIX}-star { color:${accent}; font-size:14px; }
    .${PREFIX}-cred-list { display:flex; flex-direction:column; gap:14px; }
    .${PREFIX}-cred-row { display:flex; align-items:center; gap:10px; font-size:14px; font-weight:600; }
    .${PREFIX}-cred-icon { width:28px; height:28px; border-radius:50%; background:#d1fae5; color:#059669; display:grid; place-items:center; font-size:13px; flex-shrink:0; }

    /* Info grid */
    .${PREFIX}-info { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:36px; }
    .${PREFIX}-info-card { background:rgba(255,255,255,.68); border:1px solid rgba(15,23,42,.07); border-radius:18px; padding:30px 24px; }
    .${PREFIX}-info-card h4 { font-family:${displayFont}; font-size:1rem; font-weight:700; margin:0 0 8px; }
    .${PREFIX}-info-card p { font-size:14px; line-height:1.6; opacity:.74; margin:0; }

    /* Lower grid */
    .${PREFIX}-lower { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:36px; }
    .${PREFIX}-form-panel { background:rgba(255,255,255,.68); border:1px solid rgba(15,23,42,.07); border-radius:22px; padding:36px 28px; }
    .${PREFIX}-form-panel h3 { font-family:${displayFont}; font-size:1.15rem; font-weight:700; margin:0 0 18px; }
    .${PREFIX}-form-row { display:flex; flex-direction:column; gap:10px; margin-bottom:14px; }
    .${PREFIX}-form-row label { font-size:13px; font-weight:700; }
    .${PREFIX}-form-row input, .${PREFIX}-form-row textarea { padding:10px 14px; border:1px solid rgba(15,23,42,.12); border-radius:10px; font-size:14px; font-family:inherit; resize:vertical; }
    .${PREFIX}-form-btn { margin-top:8px; padding:12px 24px; border-radius:999px; background:${accent}; color:${accentText}; border:0; cursor:pointer; font-weight:800; font-size:14px; }
    .${PREFIX}-testimonial-panel { background:${accent}; color:${accentText}; border-radius:22px; padding:40px 32px; display:flex; flex-direction:column; justify-content:center; }
    .${PREFIX}-testimonial-panel blockquote { font-family:${displayFont}; font-size:1.35rem; font-weight:600; line-height:1.5; margin:0 0 18px; font-style:italic; }
    .${PREFIX}-testimonial-panel cite { font-size:14px; font-weight:700; font-style:normal; opacity:.82; }

    /* Gallery */
    .${PREFIX}-gallery { display:grid; grid-template-columns:1.3fr .7fr .7fr; grid-template-rows:1fr 1fr; gap:14px; margin-top:36px; }
    .${PREFIX}-gallery-img { width:100%; height:100%; min-height:180px; object-fit:cover; border-radius:16px; cursor:pointer; display:block; transition:transform .2s; }
    .${PREFIX}-gallery-img:hover { transform:scale(1.02); }
    .${PREFIX}-gallery-img:first-child { grid-row:1/3; }

    /* Responsive */
    @media(max-width:800px){
      .${PREFIX}-hero,.${PREFIX}-main,.${PREFIX}-lower { grid-template-columns:1fr!important; }
      .${PREFIX}-info { grid-template-columns:1fr!important; }
      .${PREFIX}-nav-links { justify-content:flex-start; }
      .${PREFIX}-gallery { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
      .${PREFIX}-gallery-img:first-child { grid-row:auto; }
    }
    @media(max-width:520px){
      .${PREFIX}-tpl { padding:30px 4vw 40px!important; }
      .${PREFIX}-hero h2 { font-size:36px!important; }
      .${PREFIX}-nav-links { display:none; }
      .${PREFIX}-svc-grid { grid-template-columns:1fr; }
      .${PREFIX}-gallery { grid-template-columns:1fr; }
    }
  `;

  return (
    <>
      <style>{fonts}</style>
      <style>{css}</style>
      <div className={`${PREFIX}-tpl`}>
        {/* Nav */}
        <nav className={`${PREFIX}-nav-bar`}>
          <div className={`${PREFIX}-brand`}>
            <span className={`${PREFIX}-logo`}>{brandLogo}</span>
            {brandName}
            {verified && <span className={`${PREFIX}-verified`} title="Verified">✓</span>}
          </div>
          <div className={`${PREFIX}-nav-links`}>
            <span>Services</span><span>Credentials</span><span>Availability</span><span>Safety</span>
          </div>
        </nav>

        {/* Hero */}
        <div className={`${PREFIX}-hero`}>
          <div>
            {pills.length > 0 && (
              <div className={`${PREFIX}-pills`}>
                {pills.map((s, i) => <span key={i} className={`${PREFIX}-pill`}>{s}</span>)}
              </div>
            )}
            <h2>{tagline || defaultHeading}</h2>
            <p className={`${PREFIX}-hero-desc`}>{bio}</p>
            {priceLabel && <p className={`${PREFIX}-price`}>{priceLabel}</p>}
            <div className={`${PREFIX}-cred-strip`}>
              {credentials.map((c, i) => (
                <span key={i} className={`${PREFIX}-cred-badge`}>
                  <span className={`${PREFIX}-cred-check`}>✓</span>{c}
                </span>
              ))}
            </div>
            <div className={`${PREFIX}-cta-row`}>
              <button className={`${PREFIX}-btn-primary`} onClick={onHire}>Inquire Now</button>
              <button className={`${PREFIX}-btn-ghost`}>View Availability</button>
            </div>
          </div>
          {heroPhoto && (
            <div className={`${PREFIX}-hero-img-wrap`}>
              <img className={`${PREFIX}-hero-img`} src={heroPhoto.url} alt={heroPhoto.filename || "Hero"} onClick={() => onPhotoClick(0)} loading="lazy" />
            </div>
          )}
        </div>

        {/* Services + Credentials */}
        <div className={`${PREFIX}-main`}>
          <div className={`${PREFIX}-panel`}>
            <h3>Our Services</h3>
            <div className={`${PREFIX}-svc-grid`}>
              {services.map((s, i) => (
                <div key={i} className={`${PREFIX}-svc-item`}>
                  <span className={`${PREFIX}-star`}>★</span>{s}
                </div>
              ))}
            </div>
          </div>
          <div className={`${PREFIX}-panel`}>
            <h3>Credentials &amp; Safety</h3>
            <div className={`${PREFIX}-cred-list`}>
              {credentials.map((c, i) => (
                <div key={i} className={`${PREFIX}-cred-row`}>
                  <span className={`${PREFIX}-cred-icon`}>✓</span>{c}
                </div>
              ))}
            </div>
            {serviceArea && <p style={{ marginTop:18, fontSize:14, opacity:.68 }}>Serving: {serviceArea}</p>}
          </div>
        </div>

        {/* Info grid */}
        <div className={`${PREFIX}-info`}>
          <div className={`${PREFIX}-info-card`}>
            <h4>Availability</h4>
            <p>Monday through Friday, 7:00 AM to 6:00 PM. Flexible drop-off and pick-up windows available for enrolled families.</p>
          </div>
          <div className={`${PREFIX}-info-card`}>
            <h4>Safety</h4>
            <p>Secured entry, daily health screenings, low child-to-staff ratios, and fully licensed classroom spaces.</p>
          </div>
          <div className={`${PREFIX}-info-card`}>
            <h4>Family Fit</h4>
            <p>We welcome families of all structures. Visits and trial days help you decide if BrightStart is the right match.</p>
          </div>
        </div>

        {/* Lower grid: form + testimonial */}
        <div className={`${PREFIX}-lower`}>
          <div className={`${PREFIX}-form-panel`}>
            <h3>Care Inquiry</h3>
            <div className={`${PREFIX}-form-row`}><label>Parent / Guardian Name</label><input type="text" placeholder="Your name" /></div>
            <div className={`${PREFIX}-form-row`}><label>Child's Age</label><input type="text" placeholder="e.g. 2 years" /></div>
            <div className={`${PREFIX}-form-row`}><label>Message</label><textarea rows={3} placeholder="Tell us about your family's needs..." /></div>
            <button className={`${PREFIX}-form-btn`} onClick={onHire}>Send Inquiry</button>
          </div>
          <div className={`${PREFIX}-testimonial-panel`}>
            <blockquote>"{testimonialQuote}"</blockquote>
            <cite>— Happy Parent</cite>
          </div>
        </div>

        {/* Gallery */}
        {galleryPhotos.length > 0 && (
          <div className={`${PREFIX}-gallery`}>
            {galleryPhotos.map((p, i) => (
              <img key={p.id} className={`${PREFIX}-gallery-img`} src={p.url} alt={p.filename || `Gallery ${i+1}`} onClick={() => onPhotoClick(i + 1)} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
