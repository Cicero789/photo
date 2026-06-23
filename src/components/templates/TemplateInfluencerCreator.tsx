import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerCreator(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-creator";
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
        .ticc-wrap{background:radial-gradient(ellipse at 20% 0%,#fdf2f8 0%,#dbeafe 100%);color:#1e1b4b;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
        .ticc-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1100px;margin:0 auto}
        .ticc-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:8px}
        .ticc-brand svg{width:28px;height:28px}
        .ticc-nav-links{display:flex;gap:24px;font-size:.85rem;font-weight:500}
        .ticc-nav-links span{cursor:pointer;opacity:.7;transition:opacity .2s}
        .ticc-nav-links span:hover{opacity:1}
        .ticc-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding:48px 32px 32px}
        .ticc-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:18px}
        .ticc-pills{display:flex;flex-wrap:wrap;gap:8px}
        .ticc-pill{background:rgba(219,39,119,.12);color:#db2777;font-size:.75rem;font-weight:600;padding:5px 14px;border-radius:26px 90px 26px 90px}
        .ticc-h2{font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:700;line-height:1.15;margin:0}
        .ticc-bio{font-size:.95rem;line-height:1.6;opacity:.8;margin:0}
        .ticc-stats{display:flex;gap:14px;margin-top:4px}
        .ticc-stat{background:#fff;border-radius:26px 90px 26px 90px;padding:14px 20px;flex:1;text-align:center;box-shadow:0 2px 12px rgba(219,39,119,.08)}
        .ticc-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:#db2777}
        .ticc-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.6}
        .ticc-btns{display:flex;gap:12px;margin-top:6px}
        .ticc-hire{background:#db2777;color:#fff;border:none;padding:13px 32px;border-radius:26px 90px 26px 90px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .ticc-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(219,39,119,.35)}
        .ticc-sec{background:transparent;color:#db2777;border:2px solid #db2777;padding:12px 28px;border-radius:26px 90px 26px 90px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer}
        .ticc-hero-img{border-radius:26px 90px 26px 90px;overflow:hidden;max-height:420px}
        .ticc-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .ticc-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#db2777;color:#fff;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .ticc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;padding:0 32px 24px}
        .ticc-card{background:#fff;border-radius:26px 90px 26px 90px;padding:28px 24px;box-shadow:0 2px 16px rgba(219,39,119,.06)}
        .ticc-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;margin:0 0 12px}
        .ticc-card p{font-size:.88rem;line-height:1.55;opacity:.75;margin:0}
        .ticc-accent-card{background:linear-gradient(135deg,#db2777,#7c3aed);color:#fff;border-radius:26px 90px 26px 90px;padding:32px 28px;display:flex;flex-direction:column;gap:14px}
        .ticc-accent-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;margin:0}
        .ticc-accent-card p{font-size:.88rem;line-height:1.55;opacity:.9;margin:0}
        .ticc-accent-hire{background:#fff;color:#db2777;border:none;padding:12px 28px;border-radius:26px 90px 26px 90px;font-family:'Space Grotesk',sans-serif;font-weight:600;cursor:pointer;align-self:flex-start}
        .ticc-quote{max-width:1100px;margin:0 auto;padding:28px 32px;text-align:center;font-family:'Space Grotesk',sans-serif;font-style:italic;font-size:1.05rem;opacity:.6}
        .ticc-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 32px 48px}
        .ticc-photo{border-radius:26px 90px 26px 90px;overflow:hidden;cursor:pointer;aspect-ratio:1;transition:transform .2s}
        .ticc-photo:hover{transform:scale(1.03)}
        .ticc-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .ticc-info{font-size:.85rem;opacity:.65;margin:0}
        @media(max-width:800px){
          .ticc-hero{grid-template-columns:1fr;text-align:center}
          .ticc-pills{justify-content:center}
          .ticc-stats{flex-direction:column}
          .ticc-btns{justify-content:center}
          .ticc-grid{grid-template-columns:1fr}
          .ticc-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .ticc-hero{padding:28px 16px 20px}
          .ticc-h2{font-size:1.6rem}
          .ticc-grid,.ticc-gallery,.ticc-nav,.ticc-quote{padding-left:16px;padding-right:16px}
          .ticc-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="ticc-wrap">
        <nav className="ticc-nav">
          <div className="ticc-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
            {name}
          </div>
          <div className="ticc-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="ticc-hero">
          <div className="ticc-hero-copy">
            <div className="ticc-pills">
              {specialties.map((s, i) => <span key={i} className="ticc-pill">{s}</span>)}
            </div>
            <h2 className="ticc-h2">
              {tagline}
              {verified && <span className="ticc-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="ticc-bio">{bio}</p>
            <div className="ticc-stats">
              <div className="ticc-stat"><b>50K+</b><span>Followers</span></div>
              <div className="ticc-stat"><b>200+</b><span>Collabs</span></div>
              <div className="ticc-stat"><b>98%</b><span>Satisfaction</span></div>
            </div>
            <div className="ticc-btns">
              <button className="ticc-hire" onClick={onHire}>Hire Me</button>
              <button className="ticc-sec" onClick={() => { const g = document.querySelector('.ticc-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="ticc-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
          </div>
        </div>

        <div className="ticc-grid">
          <div className="ticc-card">
            <h3>Content &amp; Platforms</h3>
            <div className="ticc-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="ticc-pill">{s}</span>)}
            </div>
            <p>Creating engaging content across multiple platforms with a focus on authentic storytelling and brand alignment.</p>
          </div>
          <div className="ticc-card">
            <h3>Partnerships</h3>
            <p>Open to brand collaborations, sponsored content, and creative partnerships. Let&apos;s create something amazing together.</p>
          </div>
        </div>

        <div className="ticc-grid">
          <div className="ticc-accent-card">
            <h3>Media Kit</h3>
            <p>Get the full breakdown of audience demographics, engagement rates, and collaboration packages.</p>
            <button className="ticc-accent-hire" onClick={onHire}>Request Media Kit</button>
          </div>
          <div className="ticc-card">
            <h3>Booking &amp; Info</h3>
            <p className="ticc-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#db2777', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="ticc-info" style={{ marginTop: 8 }}>Available for events, brand shoots, and content creation collaborations.</p>
          </div>
        </div>

        <p className="ticc-quote">&ldquo;Creativity is intelligence having fun &mdash; every project is a chance to tell a new story.&rdquo;</p>

        <div className="ticc-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="ticc-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
