import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerYouTube(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-youtube";
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
        .tiyt-wrap{background:linear-gradient(170deg,#fff 0%,#fee2e2 100%);color:#1c1917;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
        .tiyt-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1100px;margin:0 auto}
        .tiyt-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:8px}
        .tiyt-brand svg{width:28px;height:28px}
        .tiyt-nav-links{display:flex;gap:24px;font-size:.85rem;font-weight:500}
        .tiyt-nav-links span{cursor:pointer;opacity:.65;transition:opacity .2s}
        .tiyt-nav-links span:hover{opacity:1}
        .tiyt-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding:48px 32px 36px}
        .tiyt-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:16px}
        .tiyt-pills{display:flex;flex-wrap:wrap;gap:8px}
        .tiyt-pill{background:rgba(220,38,38,.1);color:#dc2626;font-size:.73rem;font-weight:600;padding:5px 14px;border-radius:18px}
        .tiyt-h2{font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:700;line-height:1.15;margin:0}
        .tiyt-bio{font-size:.93rem;line-height:1.65;opacity:.75;margin:0}
        .tiyt-stats{display:flex;gap:14px;margin-top:4px}
        .tiyt-stat{background:#fff;border-radius:18px;padding:14px 18px;flex:1;text-align:center;box-shadow:0 2px 14px rgba(220,38,38,.07);border:1px solid rgba(220,38,38,.08)}
        .tiyt-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:#dc2626}
        .tiyt-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.55}
        .tiyt-btns{display:flex;gap:12px;margin-top:6px}
        .tiyt-hire{background:#dc2626;color:#fff;border:none;padding:13px 32px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .tiyt-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(220,38,38,.35)}
        .tiyt-sec{background:transparent;color:#dc2626;border:2px solid #dc2626;padding:12px 26px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer}
        .tiyt-hero-img{border-radius:18px;overflow:hidden;max-height:420px;position:relative}
        .tiyt-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .tiyt-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none}
        .tiyt-play-icon{width:64px;height:64px;background:rgba(220,38,38,.85);border-radius:50%;display:flex;align-items:center;justify-content:center}
        .tiyt-play-icon svg{width:28px;height:28px}
        .tiyt-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#dc2626;color:#fff;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .tiyt-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;padding:0 32px 24px}
        .tiyt-card{background:#fff;border-radius:18px;padding:28px 24px;box-shadow:0 2px 16px rgba(220,38,38,.05)}
        .tiyt-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;margin:0 0 10px}
        .tiyt-card p{font-size:.87rem;line-height:1.55;opacity:.7;margin:0}
        .tiyt-accent-card{background:linear-gradient(135deg,#dc2626,#ef4444);color:#fff;border-radius:18px;padding:32px 28px;display:flex;flex-direction:column;gap:14px}
        .tiyt-accent-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;margin:0}
        .tiyt-accent-card p{font-size:.87rem;line-height:1.55;opacity:.9;margin:0}
        .tiyt-accent-hire{background:#fff;color:#dc2626;border:none;padding:12px 28px;border-radius:18px;font-family:'Space Grotesk',sans-serif;font-weight:600;cursor:pointer;align-self:flex-start}
        .tiyt-quote{max-width:1100px;margin:0 auto;padding:28px 32px;text-align:center;font-family:'Space Grotesk',sans-serif;font-style:italic;font-size:1.05rem;opacity:.55}
        .tiyt-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 32px 48px}
        .tiyt-photo{border-radius:18px;overflow:hidden;cursor:pointer;aspect-ratio:16/9;transition:transform .2s;position:relative}
        .tiyt-photo:hover{transform:scale(1.03)}
        .tiyt-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .tiyt-info{font-size:.85rem;opacity:.6;margin:0}
        @media(max-width:800px){
          .tiyt-hero{grid-template-columns:1fr;text-align:center}
          .tiyt-pills{justify-content:center}
          .tiyt-stats{flex-direction:column}
          .tiyt-btns{justify-content:center}
          .tiyt-grid{grid-template-columns:1fr}
          .tiyt-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tiyt-hero{padding:28px 16px 20px}
          .tiyt-h2{font-size:1.6rem}
          .tiyt-grid,.tiyt-gallery,.tiyt-nav,.tiyt-quote{padding-left:16px;padding-right:16px}
          .tiyt-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="tiyt-wrap">
        <nav className="tiyt-nav">
          <div className="tiyt-brand">
            <svg viewBox="0 0 24 24" fill="#dc2626" stroke="none"><path d="M23 7s-.3-2-1.1-2.9C20.8 3 19.6 3 19 2.9 15.7 2.6 12 2.6 12 2.6s-3.7 0-7 .3c-.6.1-1.8.1-2.9 1.2C1.3 5 1 7 1 7S.7 9.3.7 11.7v2.1c0 2.3.3 4.7.3 4.7s.3 2 1.1 2.9c1.1 1.1 2.5 1.1 3.1 1.2 2.3.2 9.8.3 9.8.3s3.7 0 7-.3c.6-.1 1.8-.1 2.9-1.2.8-.9 1.1-2.9 1.1-2.9s.3-2.3.3-4.7v-2.1C23.3 9.3 23 7 23 7zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            {name}
          </div>
          <div className="tiyt-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="tiyt-hero">
          <div className="tiyt-hero-copy">
            <div className="tiyt-pills">
              {specialties.map((s, i) => <span key={i} className="tiyt-pill">{s}</span>)}
            </div>
            <h2 className="tiyt-h2">
              {tagline}
              {verified && <span className="tiyt-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="tiyt-bio">{bio}</p>
            <div className="tiyt-stats">
              <div className="tiyt-stat"><b>250K+</b><span>Subscribers</span></div>
              <div className="tiyt-stat"><b>10M+</b><span>Total Views</span></div>
              <div className="tiyt-stat"><b>500+</b><span>Videos</span></div>
            </div>
            <div className="tiyt-btns">
              <button className="tiyt-hire" onClick={onHire}>Hire Me</button>
              <button className="tiyt-sec" onClick={() => { const g = document.querySelector('.tiyt-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="tiyt-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
            <div className="tiyt-play"><div className="tiyt-play-icon"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div></div>
          </div>
        </div>

        <div className="tiyt-grid">
          <div className="tiyt-card">
            <h3>Content &amp; Videos</h3>
            <div className="tiyt-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="tiyt-pill">{s}</span>)}
            </div>
            <p>Creating high-quality video content with professional editing, engaging thumbnails, and consistent upload schedules.</p>
          </div>
          <div className="tiyt-card">
            <h3>Partnerships</h3>
            <p>Sponsorships, integrations, dedicated videos, and affiliate partnerships. Let&apos;s grow your brand through video.</p>
          </div>
        </div>

        <div className="tiyt-grid">
          <div className="tiyt-accent-card">
            <h3>Media Kit</h3>
            <p>Channel analytics, viewer demographics, CPM rates, and sponsorship packages &mdash; all in one place.</p>
            <button className="tiyt-accent-hire" onClick={onHire}>Request Media Kit</button>
          </div>
          <div className="tiyt-card">
            <h3>Booking &amp; Info</h3>
            <p className="tiyt-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#dc2626', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="tiyt-info" style={{ marginTop: 8 }}>Available for brand deals, event coverage, and video production collaborations.</p>
          </div>
        </div>

        <p className="tiyt-quote">&ldquo;Every video is an opportunity to connect, educate, and entertain &mdash; hit subscribe and join the journey.&rdquo;</p>

        <div className="tiyt-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tiyt-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
