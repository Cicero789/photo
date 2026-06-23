import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerNewsletter(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-newsletter";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap";
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
        .tinl-wrap{padding:0;margin:0;background:linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%);color:#1e293b;font-family:'Inter',sans-serif;min-height:600px}
        .tinl-nav{display:flex;align-items:center;gap:16px;padding:22px 5vw;border-bottom:1px solid #cbd5e1}
        .tinl-nav-name{font-family:'Libre Baskerville',serif;font-weight:700;font-size:20px}
        .tinl-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#334155;color:#fff;font-size:11px;margin-left:6px;vertical-align:middle}
        .tinl-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tinl-pill{padding:5px 14px;border-radius:24px;background:#e2e8f0;color:#334155;font-size:12px;font-weight:500;border:1px solid #cbd5e1}
        .tinl-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tinl-hero h1{font-family:'Libre Baskerville',serif;font-size:clamp(24px,3.8vw,44px);font-weight:700;letter-spacing:-0.02em;margin:0 0 14px;line-height:1.2}
        .tinl-hero-bio{color:#475569;font-size:14px;line-height:1.7;margin:0 0 22px}
        .tinl-stats{display:flex;gap:14px;margin-bottom:24px}
        .tinl-stat{padding:14px 20px;border-radius:24px;border:1px solid #cbd5e1;background:#fff;flex:1;text-align:center}
        .tinl-stat b{display:block;font-family:'Libre Baskerville',serif;font-size:22px;color:#334155}
        .tinl-stat span{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}
        .tinl-cta-row{display:flex;gap:12px}
        .tinl-hire{padding:12px 30px;border:none;border-radius:24px;background:#334155;color:#fff;font-family:'Libre Baskerville',serif;font-weight:700;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tinl-hire:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(51,65,85,.2)}
        .tinl-btn-sec{padding:12px 30px;border:1px solid #334155;border-radius:24px;background:transparent;color:#334155;font-family:'Libre Baskerville',serif;font-weight:700;font-size:15px;cursor:pointer}
        .tinl-hero-img{border-radius:24px;overflow:hidden;aspect-ratio:4/3;background:#e2e8f0}
        .tinl-hero-img img{width:100%;height:100%;object-fit:cover}
        .tinl-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tinl-card{border-radius:24px;border:1px solid #cbd5e1;padding:28px;background:#fff}
        .tinl-card h3{font-family:'Libre Baskerville',serif;font-size:18px;margin:0 0 10px;color:#334155}
        .tinl-card p{margin:0;font-size:13px;color:#475569;line-height:1.65}
        .tinl-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tinl-accent-box{border-radius:24px;padding:32px;background:#334155;color:#fff}
        .tinl-accent-box h3{font-family:'Libre Baskerville',serif;font-size:20px;margin:0 0 8px}
        .tinl-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tinl-info{border-radius:24px;border:1px solid #cbd5e1;padding:28px;background:#fff;font-size:13px;color:#475569}
        .tinl-info b{color:#1e293b}
        .tinl-quote{padding:36px 5vw;text-align:center;font-family:'Libre Baskerville',serif;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#64748b;border-top:1px solid #cbd5e1;border-bottom:1px solid #cbd5e1;margin:0 5vw 30px}
        .tinl-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tinl-photo{border-radius:24px;overflow:hidden;cursor:pointer}
        .tinl-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tinl-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tinl-hero{grid-template-columns:1fr}
          .tinl-main,.tinl-lower{grid-template-columns:1fr}
          .tinl-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tinl-stats{flex-direction:column}
          .tinl-cta-row{flex-direction:column}
          .tinl-gallery{gap:6px}
          .tinl-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tinl-wrap">
        <nav className="tinl-nav">
          <span className="tinl-nav-name">
            {name}
            {verified && <span className="tinl-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tinl-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tinl-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tinl-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tinl-hero-bio">{bio}</p>
            <div className="tinl-stats">
              <div className="tinl-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tinl-stat"><b>{specialties.length}</b><span>Topics</span></div>
              <div className="tinl-stat"><b>&#9733;</b><span>Featured</span></div>
            </div>
            <div className="tinl-cta-row">
              <button className="tinl-hire" onClick={onHire}>Hire Me</button>
              <button className="tinl-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tinl-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tinl-main">
          <div className="tinl-card"><h3>Newsletter &amp; Writing</h3><p>Long-form essays, curated reading lists, and weekly dispatches for a thoughtful readership.</p></div>
          <div className="tinl-card"><h3>Collaborations</h3><p>Open to guest features, co-authored pieces, and editorial partnerships with aligned brands.</p></div>
        </div>

        <div className="tinl-lower">
          <div className="tinl-accent-box">
            <h3>Subscribe &amp; Connect</h3>
            <p>Join a growing community of readers who value depth, clarity, and original perspective.</p>
          </div>
          <div className="tinl-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tinl-quote">&ldquo;Words have the power to change how we see the world.&rdquo;</div>

        <div className="tinl-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tinl-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
