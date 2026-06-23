import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerBrand(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-brand";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  return (
    <>
      <style>{`
        .tibr-wrap{padding:0;margin:0;background:linear-gradient(180deg,#ecfeff 0%,#f0fdf4 100%);color:#1e293b;font-family:'Inter',sans-serif;min-height:600px}
        .tibr-nav{display:flex;align-items:center;gap:16px;padding:22px 5vw;border-bottom:1px solid #99f6e4}
        .tibr-nav-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px}
        .tibr-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#0f766e;color:#fff;font-size:11px;margin-left:6px;vertical-align:middle}
        .tibr-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tibr-pill{padding:5px 14px;border-radius:28px;background:rgba(15,118,110,.08);color:#0f766e;font-size:12px;font-weight:500;border:1px solid rgba(15,118,110,.2)}
        .tibr-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tibr-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.8vw,46px);font-weight:700;letter-spacing:-0.03em;margin:0 0 14px;line-height:1.15}
        .tibr-hero-bio{color:#475569;font-size:14px;line-height:1.7;margin:0 0 22px}
        .tibr-stats{display:flex;gap:14px;margin-bottom:24px}
        .tibr-stat{padding:14px 20px;border-radius:28px;border:1px solid #99f6e4;background:#fff;flex:1;text-align:center}
        .tibr-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:22px;color:#0f766e}
        .tibr-stat span{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}
        .tibr-cta-row{display:flex;gap:12px}
        .tibr-hire{padding:12px 30px;border:none;border-radius:28px;background:#0f766e;color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tibr-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(15,118,110,.22)}
        .tibr-btn-sec{padding:12px 30px;border:1px solid #0f766e;border-radius:28px;background:transparent;color:#0f766e;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer}
        .tibr-hero-img{border-radius:28px;overflow:hidden;aspect-ratio:4/3;background:#f0fdf4}
        .tibr-hero-img img{width:100%;height:100%;object-fit:cover}
        .tibr-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tibr-card{border-radius:28px;border:1px solid #99f6e4;padding:28px;background:#fff}
        .tibr-card h3{font-family:'Space Grotesk',sans-serif;font-size:18px;margin:0 0 10px;color:#0f766e}
        .tibr-card p{margin:0;font-size:13px;color:#475569;line-height:1.65}
        .tibr-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tibr-accent-box{border-radius:28px;padding:32px;background:#0f766e;color:#fff}
        .tibr-accent-box h3{font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 8px}
        .tibr-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tibr-info{border-radius:28px;border:1px solid #99f6e4;padding:28px;background:#fff;font-size:13px;color:#475569}
        .tibr-info b{color:#1e293b}
        .tibr-quote{padding:36px 5vw;text-align:center;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#0f766e;border-top:1px solid #99f6e4;border-bottom:1px solid #99f6e4;margin:0 5vw 30px}
        .tibr-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tibr-photo{border-radius:28px;overflow:hidden;cursor:pointer}
        .tibr-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tibr-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tibr-hero{grid-template-columns:1fr}
          .tibr-main,.tibr-lower{grid-template-columns:1fr}
          .tibr-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tibr-stats{flex-direction:column}
          .tibr-cta-row{flex-direction:column}
          .tibr-gallery{gap:6px}
          .tibr-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tibr-wrap">
        <nav className="tibr-nav">
          <span className="tibr-nav-name">
            {name}
            {verified && <span className="tibr-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tibr-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tibr-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tibr-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tibr-hero-bio">{bio}</p>
            <div className="tibr-stats">
              <div className="tibr-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tibr-stat"><b>{specialties.length}</b><span>Services</span></div>
              <div className="tibr-stat"><b>&#9733;</b><span>Trusted</span></div>
            </div>
            <div className="tibr-cta-row">
              <button className="tibr-hire" onClick={onHire}>Hire Me</button>
              <button className="tibr-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tibr-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tibr-main">
          <div className="tibr-card"><h3>Brand Partnerships</h3><p>Authentic collaborations that align with my values and resonate with an engaged, loyal audience.</p></div>
          <div className="tibr-card"><h3>Content Creation</h3><p>High-quality visual and written content tailored for campaigns, social media, and editorial use.</p></div>
        </div>

        <div className="tibr-lower">
          <div className="tibr-accent-box">
            <h3>Work With Me</h3>
            <p>From concept to delivery, I bring creativity, professionalism, and a personal touch to every project.</p>
          </div>
          <div className="tibr-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tibr-quote">&ldquo;Your brand is the story you tell the world every day.&rdquo;</div>

        <div className="tibr-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tibr-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
