import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerMom(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-mom";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
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
        .timm-wrap{background:linear-gradient(160deg,#fff7ed 0%,#fce7f3 100%);color:#4a2030;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
        .timm-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1100px;margin:0 auto}
        .timm-brand{font-family:'Playfair Display',serif;font-weight:700;font-size:1.3rem;display:flex;align-items:center;gap:8px}
        .timm-brand svg{width:26px;height:26px}
        .timm-nav-links{display:flex;gap:22px;font-size:.85rem;font-weight:500}
        .timm-nav-links span{cursor:pointer;opacity:.65;transition:opacity .2s}
        .timm-nav-links span:hover{opacity:1}
        .timm-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding:48px 32px 36px}
        .timm-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:16px}
        .timm-pills{display:flex;flex-wrap:wrap;gap:8px}
        .timm-pill{background:rgba(190,24,93,.1);color:#be185d;font-size:.73rem;font-weight:600;padding:5px 14px;border-radius:80px 28px 80px 28px}
        .timm-h2{font-family:'Playfair Display',serif;font-size:2.3rem;font-weight:800;line-height:1.15;margin:0;color:#6b1d3a}
        .timm-bio{font-size:.93rem;line-height:1.65;opacity:.75;margin:0}
        .timm-stats{display:flex;gap:14px;margin-top:4px}
        .timm-stat{background:#fff;border-radius:80px 28px 80px 28px;padding:14px 18px;flex:1;text-align:center;box-shadow:0 2px 14px rgba(190,24,93,.07)}
        .timm-stat b{display:block;font-family:'Playfair Display',serif;font-size:1.25rem;color:#be185d}
        .timm-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.55}
        .timm-btns{display:flex;gap:12px;margin-top:6px}
        .timm-hire{background:#be185d;color:#fff;border:none;padding:13px 32px;border-radius:80px 28px 80px 28px;font-family:'Playfair Display',serif;font-weight:700;font-size:.95rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .timm-hire:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(190,24,93,.3)}
        .timm-sec{background:transparent;color:#be185d;border:2px solid #be185d;padding:12px 26px;border-radius:80px 28px 80px 28px;font-family:'Playfair Display',serif;font-weight:700;font-size:.95rem;cursor:pointer}
        .timm-hero-img{border-radius:80px 28px 80px 28px;overflow:hidden;max-height:420px}
        .timm-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .timm-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#be185d;color:#fff;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .timm-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;padding:0 32px 24px}
        .timm-card{background:#fff;border-radius:80px 28px 80px 28px;padding:28px 24px;box-shadow:0 2px 16px rgba(190,24,93,.05)}
        .timm-card h3{font-family:'Playfair Display',serif;font-size:1.1rem;margin:0 0 10px;color:#6b1d3a}
        .timm-card p{font-size:.87rem;line-height:1.55;opacity:.7;margin:0}
        .timm-accent-card{background:linear-gradient(135deg,#be185d,#ec4899);color:#fff;border-radius:80px 28px 80px 28px;padding:32px 28px;display:flex;flex-direction:column;gap:14px}
        .timm-accent-card h3{font-family:'Playfair Display',serif;font-size:1.2rem;margin:0}
        .timm-accent-card p{font-size:.87rem;line-height:1.55;opacity:.9;margin:0}
        .timm-accent-hire{background:#fff;color:#be185d;border:none;padding:12px 28px;border-radius:80px 28px 80px 28px;font-family:'Playfair Display',serif;font-weight:700;cursor:pointer;align-self:flex-start}
        .timm-quote{max-width:1100px;margin:0 auto;padding:28px 32px;text-align:center;font-family:'Playfair Display',serif;font-style:italic;font-size:1.05rem;opacity:.55;color:#6b1d3a}
        .timm-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 32px 48px}
        .timm-photo{border-radius:80px 28px 80px 28px;overflow:hidden;cursor:pointer;aspect-ratio:1;transition:transform .2s}
        .timm-photo:hover{transform:scale(1.03)}
        .timm-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .timm-info{font-size:.85rem;opacity:.6;margin:0}
        @media(max-width:800px){
          .timm-hero{grid-template-columns:1fr;text-align:center}
          .timm-pills{justify-content:center}
          .timm-stats{flex-direction:column}
          .timm-btns{justify-content:center}
          .timm-grid{grid-template-columns:1fr}
          .timm-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .timm-hero{padding:28px 16px 20px}
          .timm-h2{font-size:1.6rem}
          .timm-grid,.timm-gallery,.timm-nav,.timm-quote{padding-left:16px;padding-right:16px}
          .timm-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="timm-wrap">
        <nav className="timm-nav">
          <div className="timm-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="#be185d" strokeWidth="2"><path d="M12 21C12 21 4 14.5 4 9a4 4 0 018 0 4 4 0 018 0c0 5.5-8 12-8 12z"/></svg>
            {name}
          </div>
          <div className="timm-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="timm-hero">
          <div className="timm-hero-copy">
            <div className="timm-pills">
              {specialties.map((s, i) => <span key={i} className="timm-pill">{s}</span>)}
            </div>
            <h2 className="timm-h2">
              {tagline}
              {verified && <span className="timm-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="timm-bio">{bio}</p>
            <div className="timm-stats">
              <div className="timm-stat"><b>120K+</b><span>Community</span></div>
              <div className="timm-stat"><b>500+</b><span>Posts</span></div>
              <div className="timm-stat"><b>4.9</b><span>Avg Rating</span></div>
            </div>
            <div className="timm-btns">
              <button className="timm-hire" onClick={onHire}>Hire Me</button>
              <button className="timm-sec" onClick={() => { const g = document.querySelector('.timm-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="timm-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
          </div>
        </div>

        <div className="timm-grid">
          <div className="timm-card">
            <h3>Content &amp; Family Life</h3>
            <div className="timm-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="timm-pill">{s}</span>)}
            </div>
            <p>Sharing real moments, honest reviews, and family-friendly content that resonates with parents everywhere.</p>
          </div>
          <div className="timm-card">
            <h3>Partnerships</h3>
            <p>Partnering with family-first brands for authentic product features, sponsored posts, and ambassador programs.</p>
          </div>
        </div>

        <div className="timm-grid">
          <div className="timm-accent-card">
            <h3>Media Kit</h3>
            <p>Audience insights, engagement stats, and partnership packages &mdash; everything you need to collaborate.</p>
            <button className="timm-accent-hire" onClick={onHire}>Get My Media Kit</button>
          </div>
          <div className="timm-card">
            <h3>Booking &amp; Info</h3>
            <p className="timm-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#be185d', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="timm-info" style={{ marginTop: 8 }}>Available for family events, brand campaigns, and content collaborations.</p>
          </div>
        </div>

        <p className="timm-quote">&ldquo;Motherhood is messy, magical, and worth sharing &mdash; one real moment at a time.&rdquo;</p>

        <div className="timm-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="timm-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
