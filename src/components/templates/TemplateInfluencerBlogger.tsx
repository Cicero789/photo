import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerBlogger(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-blogger";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Inter:wght@400;500;600;700&display=swap";
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
        .tibl-wrap{background:linear-gradient(170deg,#faf7ef 0%,#f3e8d6 100%);color:#3b2f1e;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
        .tibl-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1060px;margin:0 auto;border-bottom:1px solid rgba(146,64,14,.1)}
        .tibl-brand{font-family:'Libre Baskerville',serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:8px}
        .tibl-brand svg{width:24px;height:24px}
        .tibl-nav-links{display:flex;gap:24px;font-size:.84rem;font-weight:500}
        .tibl-nav-links span{cursor:pointer;opacity:.6;transition:opacity .2s}
        .tibl-nav-links span:hover{opacity:1}
        .tibl-hero{display:grid;grid-template-columns:1fr 1fr;gap:44px;max-width:1060px;margin:0 auto;padding:52px 32px 36px}
        .tibl-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:16px}
        .tibl-pills{display:flex;flex-wrap:wrap;gap:8px}
        .tibl-pill{background:rgba(146,64,14,.1);color:#92400e;font-size:.73rem;font-weight:600;padding:5px 14px;border-radius:28px}
        .tibl-h2{font-family:'Libre Baskerville',serif;font-size:2.2rem;font-weight:700;line-height:1.2;margin:0;color:#5c3d12}
        .tibl-bio{font-size:.93rem;line-height:1.7;opacity:.75;margin:0}
        .tibl-stats{display:flex;gap:14px;margin-top:4px}
        .tibl-stat{background:#fff;border-radius:28px;padding:14px 18px;flex:1;text-align:center;box-shadow:0 2px 14px rgba(146,64,14,.06)}
        .tibl-stat b{display:block;font-family:'Libre Baskerville',serif;font-size:1.2rem;color:#92400e}
        .tibl-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.55}
        .tibl-btns{display:flex;gap:12px;margin-top:6px}
        .tibl-hire{background:#92400e;color:#fff;border:none;padding:13px 32px;border-radius:28px;font-family:'Libre Baskerville',serif;font-weight:700;font-size:.93rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .tibl-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(146,64,14,.25)}
        .tibl-sec{background:transparent;color:#92400e;border:2px solid #92400e;padding:12px 26px;border-radius:28px;font-family:'Libre Baskerville',serif;font-weight:700;font-size:.93rem;cursor:pointer}
        .tibl-hero-img{border-radius:28px;overflow:hidden;max-height:420px}
        .tibl-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .tibl-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#92400e;color:#fff;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .tibl-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1060px;margin:0 auto;padding:0 32px 24px}
        .tibl-card{background:#fff;border-radius:28px;padding:28px 24px;box-shadow:0 2px 16px rgba(146,64,14,.05)}
        .tibl-card h3{font-family:'Libre Baskerville',serif;font-size:1.05rem;margin:0 0 10px;color:#5c3d12}
        .tibl-card p{font-size:.87rem;line-height:1.6;opacity:.7;margin:0}
        .tibl-accent-card{background:linear-gradient(135deg,#92400e,#b45309);color:#fff;border-radius:28px;padding:32px 28px;display:flex;flex-direction:column;gap:14px}
        .tibl-accent-card h3{font-family:'Libre Baskerville',serif;font-size:1.15rem;margin:0}
        .tibl-accent-card p{font-size:.87rem;line-height:1.6;opacity:.9;margin:0}
        .tibl-accent-hire{background:#fff;color:#92400e;border:none;padding:12px 28px;border-radius:28px;font-family:'Libre Baskerville',serif;font-weight:700;cursor:pointer;align-self:flex-start}
        .tibl-quote{max-width:1060px;margin:0 auto;padding:30px 32px;text-align:center;font-family:'Libre Baskerville',serif;font-style:italic;font-size:1.05rem;opacity:.5;color:#5c3d12}
        .tibl-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1060px;margin:0 auto;padding:0 32px 48px}
        .tibl-photo{border-radius:28px;overflow:hidden;cursor:pointer;aspect-ratio:1;transition:transform .2s}
        .tibl-photo:hover{transform:scale(1.03)}
        .tibl-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .tibl-info{font-size:.85rem;opacity:.6;margin:0}
        @media(max-width:800px){
          .tibl-hero{grid-template-columns:1fr;text-align:center}
          .tibl-pills{justify-content:center}
          .tibl-stats{flex-direction:column}
          .tibl-btns{justify-content:center}
          .tibl-grid{grid-template-columns:1fr}
          .tibl-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tibl-hero{padding:28px 16px 20px}
          .tibl-h2{font-size:1.55rem}
          .tibl-grid,.tibl-gallery,.tibl-nav,.tibl-quote{padding-left:16px;padding-right:16px}
          .tibl-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="tibl-wrap">
        <nav className="tibl-nav">
          <div className="tibl-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2"><path d="M4 19V5a2 2 0 012-2h8l6 6v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M14 3v6h6"/></svg>
            {name}
          </div>
          <div className="tibl-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="tibl-hero">
          <div className="tibl-hero-copy">
            <div className="tibl-pills">
              {specialties.map((s, i) => <span key={i} className="tibl-pill">{s}</span>)}
            </div>
            <h2 className="tibl-h2">
              {tagline}
              {verified && <span className="tibl-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="tibl-bio">{bio}</p>
            <div className="tibl-stats">
              <div className="tibl-stat"><b>75K+</b><span>Readers</span></div>
              <div className="tibl-stat"><b>300+</b><span>Articles</span></div>
              <div className="tibl-stat"><b>12</b><span>Brand Partners</span></div>
            </div>
            <div className="tibl-btns">
              <button className="tibl-hire" onClick={onHire}>Hire Me</button>
              <button className="tibl-sec" onClick={() => { const g = document.querySelector('.tibl-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="tibl-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
          </div>
        </div>

        <div className="tibl-grid">
          <div className="tibl-card">
            <h3>Editorial Content</h3>
            <div className="tibl-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="tibl-pill">{s}</span>)}
            </div>
            <p>Long-form storytelling, lifestyle guides, and curated editorial content with a refined voice.</p>
          </div>
          <div className="tibl-card">
            <h3>Partnerships</h3>
            <p>Collaborating with thoughtful brands on sponsored features, product reviews, and curated gift guides.</p>
          </div>
        </div>

        <div className="tibl-grid">
          <div className="tibl-accent-card">
            <h3>Media Kit</h3>
            <p>Detailed audience analytics, traffic breakdowns, and sponsorship tiers for editorial partnerships.</p>
            <button className="tibl-accent-hire" onClick={onHire}>Request Media Kit</button>
          </div>
          <div className="tibl-card">
            <h3>Booking &amp; Info</h3>
            <p className="tibl-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#92400e', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="tibl-info" style={{ marginTop: 8 }}>Available for guest features, interviews, and long-form brand collaborations.</p>
          </div>
        </div>

        <p className="tibl-quote">&ldquo;Words have the power to inspire, inform, and transform &mdash; one thoughtful story at a time.&rdquo;</p>

        <div className="tibl-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tibl-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
