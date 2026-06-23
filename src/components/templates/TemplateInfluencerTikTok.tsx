import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerTikTok(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-tiktok";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";
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
        .titt-wrap{background:linear-gradient(160deg,#111827 0%,#020617 100%);color:#f1f5f9;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden;position:relative}
        .titt-wrap::before{content:'';position:absolute;top:-120px;right:-80px;width:400px;height:400px;background:radial-gradient(circle,rgba(34,211,238,.15) 0%,transparent 70%);pointer-events:none}
        .titt-wrap::after{content:'';position:absolute;bottom:-100px;left:-60px;width:350px;height:350px;background:radial-gradient(circle,rgba(244,63,94,.12) 0%,transparent 70%);pointer-events:none}
        .titt-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1100px;margin:0 auto;position:relative;z-index:1}
        .titt-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:8px;color:#22d3ee}
        .titt-brand svg{width:26px;height:26px}
        .titt-nav-links{display:flex;gap:24px;font-size:.85rem;font-weight:500}
        .titt-nav-links span{cursor:pointer;opacity:.5;transition:opacity .2s;color:#f1f5f9}
        .titt-nav-links span:hover{opacity:1}
        .titt-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding:48px 32px 36px;position:relative;z-index:1}
        .titt-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:16px}
        .titt-pills{display:flex;flex-wrap:wrap;gap:8px}
        .titt-pill{background:rgba(34,211,238,.12);color:#22d3ee;font-size:.73rem;font-weight:600;padding:5px 14px;border-radius:18px;border:1px solid rgba(34,211,238,.2)}
        .titt-h2{font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:700;line-height:1.15;margin:0;color:#fff}
        .titt-bio{font-size:.93rem;line-height:1.65;opacity:.65;margin:0}
        .titt-stats{display:flex;gap:14px;margin-top:4px}
        .titt-stat{background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:14px 18px;flex:1;text-align:center}
        .titt-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:#22d3ee}
        .titt-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.5}
        .titt-btns{display:flex;gap:12px;margin-top:6px}
        .titt-hire{background:#22d3ee;color:#062f3a;border:none;padding:13px 32px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .titt-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(34,211,238,.35)}
        .titt-sec{background:transparent;color:#22d3ee;border:2px solid #22d3ee;padding:12px 26px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer}
        .titt-hero-img{border-radius:18px;overflow:hidden;max-height:420px;border:1px solid rgba(255,255,255,.1)}
        .titt-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .titt-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#22d3ee;color:#062f3a;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .titt-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;padding:0 32px 24px;position:relative;z-index:1}
        .titt-card{background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:28px 24px}
        .titt-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;margin:0 0 10px;color:#22d3ee}
        .titt-card p{font-size:.87rem;line-height:1.55;opacity:.6;margin:0}
        .titt-accent-card{background:linear-gradient(135deg,rgba(34,211,238,.2),rgba(244,63,94,.2));backdrop-filter:blur(12px);border:1px solid rgba(34,211,238,.25);border-radius:18px;padding:32px 28px;display:flex;flex-direction:column;gap:14px}
        .titt-accent-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;margin:0;color:#22d3ee}
        .titt-accent-card p{font-size:.87rem;line-height:1.55;opacity:.75;margin:0}
        .titt-accent-hire{background:#22d3ee;color:#062f3a;border:none;padding:12px 28px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;cursor:pointer;align-self:flex-start}
        .titt-quote{max-width:1100px;margin:0 auto;padding:28px 32px;text-align:center;font-family:'Space Grotesk',sans-serif;font-style:italic;font-size:1.05rem;opacity:.4;position:relative;z-index:1}
        .titt-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 32px 48px;position:relative;z-index:1}
        .titt-photo{border-radius:18px;overflow:hidden;cursor:pointer;aspect-ratio:9/16;transition:transform .2s;border:1px solid rgba(255,255,255,.1)}
        .titt-photo:hover{transform:scale(1.03)}
        .titt-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .titt-info{font-size:.85rem;opacity:.5;margin:0}
        @media(max-width:800px){
          .titt-hero{grid-template-columns:1fr;text-align:center}
          .titt-pills{justify-content:center}
          .titt-stats{flex-direction:column}
          .titt-btns{justify-content:center}
          .titt-grid{grid-template-columns:1fr}
          .titt-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .titt-hero{padding:28px 16px 20px}
          .titt-h2{font-size:1.6rem}
          .titt-grid,.titt-gallery,.titt-nav,.titt-quote{padding-left:16px;padding-right:16px}
          .titt-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="titt-wrap">
        <nav className="titt-nav">
          <div className="titt-brand">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19.3 8.3a4.8 4.8 0 01-3.3-1.3 4.8 4.8 0 01-1.3-3.3h-3v10.6a2.3 2.3 0 11-1.6-2.2V9a5.6 5.6 0 104.9 5.6V10a7.8 7.8 0 004.3 1.3V8.3" fill="#22d3ee"/></svg>
            {name}
          </div>
          <div className="titt-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="titt-hero">
          <div className="titt-hero-copy">
            <div className="titt-pills">
              {specialties.map((s, i) => <span key={i} className="titt-pill">{s}</span>)}
            </div>
            <h2 className="titt-h2">
              {tagline}
              {verified && <span className="titt-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="titt-bio">{bio}</p>
            <div className="titt-stats">
              <div className="titt-stat"><b>500K+</b><span>Followers</span></div>
              <div className="titt-stat"><b>50M+</b><span>Likes</span></div>
              <div className="titt-stat"><b>15%</b><span>Eng. Rate</span></div>
            </div>
            <div className="titt-btns">
              <button className="titt-hire" onClick={onHire}>Hire Me</button>
              <button className="titt-sec" onClick={() => { const g = document.querySelector('.titt-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="titt-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
          </div>
        </div>

        <div className="titt-grid">
          <div className="titt-card">
            <h3>Content &amp; Trends</h3>
            <div className="titt-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="titt-pill">{s}</span>)}
            </div>
            <p>Trending sounds, viral hooks, and short-form video content crafted for maximum reach and engagement.</p>
          </div>
          <div className="titt-card">
            <h3>Partnerships</h3>
            <p>UGC, branded content, duets, and product integrations tailored for the TikTok audience.</p>
          </div>
        </div>

        <div className="titt-grid">
          <div className="titt-accent-card">
            <h3>Media Kit</h3>
            <p>Follower analytics, viral reach, demographic breakdowns, and UGC pricing packages.</p>
            <button className="titt-accent-hire" onClick={onHire}>Request Media Kit</button>
          </div>
          <div className="titt-card">
            <h3>Booking &amp; Info</h3>
            <p className="titt-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#22d3ee', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="titt-info" style={{ marginTop: 8 }}>Available for brand deals, event appearances, and content creation sprints.</p>
          </div>
        </div>

        <p className="titt-quote">&ldquo;Go viral or go home &mdash; every scroll is a chance to make someone&apos;s day.&rdquo;</p>

        <div className="titt-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="titt-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
