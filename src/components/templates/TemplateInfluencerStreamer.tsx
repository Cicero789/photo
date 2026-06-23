import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerStreamer(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-streamer";
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
        .tist-wrap{padding:0;margin:0;background:linear-gradient(180deg,#020617 0%,#0f172a 100%);color:#fff;font-family:'Inter',sans-serif;min-height:600px}
        .tist-nav{display:flex;align-items:center;gap:18px;padding:22px 5vw;border-bottom:1px solid rgba(57,255,136,.22)}
        .tist-nav-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;letter-spacing:-0.02em}
        .tist-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#39ff88;color:#04130a;font-size:11px;margin-left:6px;vertical-align:middle}
        .tist-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tist-pill{padding:5px 14px;border-radius:18px;background:rgba(57,255,136,.10);color:#39ff88;font-size:12px;font-weight:500;border:1px solid rgba(57,255,136,.22)}
        .tist-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tist-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,4vw,48px);font-weight:700;letter-spacing:-0.03em;margin:0 0 14px;line-height:1.15}
        .tist-hero-bio{color:#94a3b8;font-size:14px;line-height:1.65;margin:0 0 22px}
        .tist-stats{display:flex;gap:14px;margin-bottom:24px}
        .tist-stat{padding:14px 20px;border-radius:18px;border:1px solid rgba(57,255,136,.22);background:rgba(57,255,136,.06);flex:1;text-align:center}
        .tist-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:22px;color:#39ff88}
        .tist-stat span{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em}
        .tist-cta-row{display:flex;gap:12px}
        .tist-hire{padding:12px 30px;border:none;border-radius:18px;background:#39ff88;color:#04130a;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tist-hire:hover{transform:translateY(-2px);box-shadow:0 0 24px rgba(57,255,136,.35)}
        .tist-btn-sec{padding:12px 30px;border:1px solid rgba(57,255,136,.22);border-radius:18px;background:transparent;color:#39ff88;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer}
        .tist-hero-img{border-radius:18px;overflow:hidden;aspect-ratio:4/3;background:#0f172a}
        .tist-hero-img img{width:100%;height:100%;object-fit:cover}
        .tist-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tist-card{border-radius:18px;border:1px solid rgba(57,255,136,.22);padding:28px;background:rgba(57,255,136,.04)}
        .tist-card h3{font-family:'Space Grotesk',sans-serif;font-size:18px;margin:0 0 10px;color:#39ff88}
        .tist-card p{margin:0;font-size:13px;color:#94a3b8;line-height:1.6}
        .tist-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tist-accent-box{border-radius:18px;padding:32px;background:#39ff88;color:#04130a}
        .tist-accent-box h3{font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 8px}
        .tist-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tist-info{border-radius:18px;border:1px solid rgba(57,255,136,.22);padding:28px;font-size:13px;color:#94a3b8}
        .tist-info b{color:#fff}
        .tist-quote{padding:36px 5vw;text-align:center;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#64748b;border-top:1px solid rgba(57,255,136,.12);border-bottom:1px solid rgba(57,255,136,.12);margin:0 5vw 30px}
        .tist-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tist-photo{border-radius:18px;overflow:hidden;cursor:pointer}
        .tist-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tist-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tist-hero{grid-template-columns:1fr}
          .tist-main,.tist-lower{grid-template-columns:1fr}
          .tist-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tist-stats{flex-direction:column}
          .tist-cta-row{flex-direction:column}
          .tist-gallery{gap:6px}
          .tist-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tist-wrap">
        <nav className="tist-nav">
          <span className="tist-nav-name">
            {name}
            {verified && <span className="tist-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tist-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tist-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tist-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tist-hero-bio">{bio}</p>
            <div className="tist-stats">
              <div className="tist-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tist-stat"><b>{specialties.length}</b><span>Specialties</span></div>
              <div className="tist-stat"><b>&#9733;</b><span>Featured</span></div>
            </div>
            <div className="tist-cta-row">
              <button className="tist-hire" onClick={onHire}>Hire Me</button>
              <button className="tist-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tist-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tist-main">
          <div className="tist-card"><h3>Content &amp; Streams</h3><p>Live sessions, highlight reels, and behind-the-scenes content curated for an engaged audience.</p></div>
          <div className="tist-card"><h3>Partnerships</h3><p>Open to brand collaborations, sponsored features, and creative campaigns that align with my style.</p></div>
        </div>

        <div className="tist-lower">
          <div className="tist-accent-box">
            <h3>Let&rsquo;s Collaborate</h3>
            <p>Looking for a creative partner? I bring energy, audience reach, and authentic content to every project.</p>
          </div>
          <div className="tist-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tist-quote">&ldquo;Creating is not just what I do &mdash; it&rsquo;s who I am.&rdquo;</div>

        <div className="tist-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tist-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
