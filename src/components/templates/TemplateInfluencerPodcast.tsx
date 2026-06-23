import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerPodcast(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-podcast";
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
        .tipo-wrap{background:linear-gradient(160deg,#111827 0%,#581c87 100%);color:#f3f0ff;font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden;position:relative}
        .tipo-wrap::before{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:500px;height:500px;background:radial-gradient(circle,rgba(192,132,252,.15) 0%,transparent 70%);pointer-events:none}
        .tipo-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;max-width:1100px;margin:0 auto;position:relative;z-index:1}
        .tipo-brand{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.25rem;display:flex;align-items:center;gap:8px;color:#c084fc}
        .tipo-brand svg{width:26px;height:26px}
        .tipo-nav-links{display:flex;gap:24px;font-size:.85rem;font-weight:500}
        .tipo-nav-links span{cursor:pointer;opacity:.5;transition:opacity .2s;color:#f3f0ff}
        .tipo-nav-links span:hover{opacity:1}
        .tipo-hero{display:grid;grid-template-columns:1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding:48px 32px 36px;position:relative;z-index:1}
        .tipo-hero-copy{display:flex;flex-direction:column;justify-content:center;gap:16px}
        .tipo-pills{display:flex;flex-wrap:wrap;gap:8px}
        .tipo-pill{background:rgba(192,132,252,.12);color:#c084fc;font-size:.73rem;font-weight:600;padding:5px 14px;border-radius:999px 999px 40px 40px;border:1px solid rgba(192,132,252,.2)}
        .tipo-h2{font-family:'Space Grotesk',sans-serif;font-size:2.4rem;font-weight:700;line-height:1.15;margin:0;color:#fff}
        .tipo-bio{font-size:.93rem;line-height:1.65;opacity:.65;margin:0}
        .tipo-stats{display:flex;gap:14px;margin-top:4px}
        .tipo-stat{background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:999px 999px 40px 40px;padding:14px 18px;flex:1;text-align:center}
        .tipo-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:1.3rem;color:#c084fc}
        .tipo-stat span{font-size:.7rem;text-transform:uppercase;letter-spacing:.5px;opacity:.5}
        .tipo-btns{display:flex;gap:12px;margin-top:6px}
        .tipo-hire{background:#c084fc;color:#111827;border:none;padding:13px 32px;border-radius:999px 999px 40px 40px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer;transition:transform .15s,box-shadow .15s}
        .tipo-hire:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(192,132,252,.35)}
        .tipo-sec{background:transparent;color:#c084fc;border:2px solid #c084fc;padding:12px 26px;border-radius:999px 999px 40px 40px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:.95rem;cursor:pointer}
        .tipo-hero-img{border-radius:999px 999px 40px 40px;overflow:hidden;max-height:420px;border:1px solid rgba(255,255,255,.1)}
        .tipo-hero-img img{width:100%;height:100%;object-fit:cover;display:block}
        .tipo-verified{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:#c084fc;color:#111827;border-radius:50%;font-size:.75rem;margin-left:8px;vertical-align:middle}
        .tipo-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:1100px;margin:0 auto;padding:0 32px 24px;position:relative;z-index:1}
        .tipo-card{background:rgba(255,255,255,.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:999px 999px 40px 40px;padding:36px 24px 28px}
        .tipo-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;margin:0 0 10px;color:#c084fc}
        .tipo-card p{font-size:.87rem;line-height:1.55;opacity:.6;margin:0}
        .tipo-accent-card{background:linear-gradient(135deg,rgba(192,132,252,.25),rgba(139,92,246,.25));backdrop-filter:blur(12px);border:1px solid rgba(192,132,252,.3);border-radius:999px 999px 40px 40px;padding:40px 28px 28px;display:flex;flex-direction:column;gap:14px}
        .tipo-accent-card h3{font-family:'Space Grotesk',sans-serif;font-size:1.2rem;margin:0;color:#c084fc}
        .tipo-accent-card p{font-size:.87rem;line-height:1.55;opacity:.75;margin:0}
        .tipo-accent-hire{background:#c084fc;color:#111827;border:none;padding:12px 28px;border-radius:999px 999px 40px 40px;font-family:'Space Grotesk',sans-serif;font-weight:600;cursor:pointer;align-self:flex-start}
        .tipo-wave{display:flex;align-items:center;justify-content:center;gap:3px;padding:20px 0;max-width:1100px;margin:0 auto;position:relative;z-index:1}
        .tipo-wave-bar{width:4px;background:#c084fc;border-radius:2px;opacity:.4}
        .tipo-quote{max-width:1100px;margin:0 auto;padding:8px 32px 28px;text-align:center;font-family:'Space Grotesk',sans-serif;font-style:italic;font-size:1.05rem;opacity:.4;position:relative;z-index:1}
        .tipo-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1100px;margin:0 auto;padding:0 32px 48px;position:relative;z-index:1}
        .tipo-photo{border-radius:999px 999px 40px 40px;overflow:hidden;cursor:pointer;aspect-ratio:1;transition:transform .2s;border:1px solid rgba(255,255,255,.1)}
        .tipo-photo:hover{transform:scale(1.03)}
        .tipo-photo img{width:100%;height:100%;object-fit:cover;display:block}
        .tipo-info{font-size:.85rem;opacity:.5;margin:0}
        @media(max-width:800px){
          .tipo-hero{grid-template-columns:1fr;text-align:center}
          .tipo-pills{justify-content:center}
          .tipo-stats{flex-direction:column}
          .tipo-btns{justify-content:center}
          .tipo-grid{grid-template-columns:1fr}
          .tipo-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tipo-hero{padding:28px 16px 20px}
          .tipo-h2{font-size:1.6rem}
          .tipo-grid,.tipo-gallery,.tipo-nav,.tipo-quote{padding-left:16px;padding-right:16px}
          .tipo-gallery{grid-template-columns:1fr 1fr}
        }
      `}</style>
      <section className="tipo-wrap">
        <nav className="tipo-nav">
          <div className="tipo-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            {name}
          </div>
          <div className="tipo-nav-links">
            <span>Media Kit</span><span>Partnerships</span><span>Content</span><span>Booking</span>
          </div>
        </nav>

        <div className="tipo-hero">
          <div className="tipo-hero-copy">
            <div className="tipo-pills">
              {specialties.map((s, i) => <span key={i} className="tipo-pill">{s}</span>)}
            </div>
            <h2 className="tipo-h2">
              {tagline}
              {verified && <span className="tipo-verified" title="Verified">&#10003;</span>}
            </h2>
            <p className="tipo-bio">{bio}</p>
            <div className="tipo-stats">
              <div className="tipo-stat"><b>100K+</b><span>Listeners</span></div>
              <div className="tipo-stat"><b>200+</b><span>Episodes</span></div>
              <div className="tipo-stat"><b>4.8</b><span>Avg Rating</span></div>
            </div>
            <div className="tipo-btns">
              <button className="tipo-hire" onClick={onHire}>Hire Me</button>
              <button className="tipo-sec" onClick={() => { const g = document.querySelector('.tipo-gallery'); g?.scrollIntoView({ behavior: 'smooth' }); }}>View Portfolio</button>
            </div>
          </div>
          <div className="tipo-hero-img">
            {portfolio?.[0] && <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} />}
          </div>
        </div>

        <div className="tipo-grid">
          <div className="tipo-card">
            <h3>Content &amp; Episodes</h3>
            <div className="tipo-pills" style={{ marginBottom: 12 }}>
              {specialties.map((s, i) => <span key={i} className="tipo-pill">{s}</span>)}
            </div>
            <p>In-depth conversations, expert interviews, and audio storytelling that keeps listeners coming back every week.</p>
          </div>
          <div className="tipo-card">
            <h3>Partnerships</h3>
            <p>Pre-roll, mid-roll, and host-read sponsorships with authentic integration and engaged listeners.</p>
          </div>
        </div>

        <div className="tipo-grid">
          <div className="tipo-accent-card">
            <h3>Media Kit</h3>
            <p>Download stats, listener demographics, ad read samples, and sponsorship tier packages.</p>
            <button className="tipo-accent-hire" onClick={onHire}>Request Media Kit</button>
          </div>
          <div className="tipo-card">
            <h3>Booking &amp; Info</h3>
            <p className="tipo-info">{serviceArea}</p>
            {priceLabel && <p style={{ fontWeight: 600, color: '#c084fc', margin: '8px 0 0' }}>{priceLabel}</p>}
            <p className="tipo-info" style={{ marginTop: 8 }}>Available for guest appearances, live shows, and audio production partnerships.</p>
          </div>
        </div>

        <div className="tipo-wave">
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i} className="tipo-wave-bar" style={{ height: `${12 + Math.sin(i * 0.5) * 16 + Math.random() * 8}px` }} />
          ))}
        </div>

        <p className="tipo-quote">&ldquo;Every great conversation starts with the courage to press record.&rdquo;</p>

        <div className="tipo-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tipo-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
