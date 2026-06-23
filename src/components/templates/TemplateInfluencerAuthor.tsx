import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerAuthor(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-author";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap";
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
        .tiau-wrap{padding:0;margin:0;background:linear-gradient(180deg,#fff7ed 0%,#fef3c7 100%);color:#1c1917;font-family:'Inter',sans-serif;min-height:600px}
        .tiau-nav{display:flex;align-items:center;gap:16px;padding:22px 5vw;border-bottom:1px solid #fcd34d}
        .tiau-nav-name{font-family:'Playfair Display',serif;font-weight:700;font-size:20px}
        .tiau-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#b45309;color:#fff;font-size:11px;margin-left:6px;vertical-align:middle}
        .tiau-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tiau-pill{padding:5px 14px;border-radius:44px;background:rgba(180,83,9,.08);color:#b45309;font-size:12px;font-weight:500;border:1px solid rgba(180,83,9,.2)}
        .tiau-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tiau-hero h1{font-family:'Playfair Display',serif;font-size:clamp(24px,3.8vw,46px);font-weight:800;letter-spacing:-0.02em;margin:0 0 14px;line-height:1.15}
        .tiau-hero-bio{color:#78716c;font-size:14px;line-height:1.7;margin:0 0 22px}
        .tiau-stats{display:flex;gap:14px;margin-bottom:24px}
        .tiau-stat{padding:14px 20px;border-radius:44px;border:1px solid #fcd34d;background:#fff;flex:1;text-align:center}
        .tiau-stat b{display:block;font-family:'Playfair Display',serif;font-size:22px;color:#b45309}
        .tiau-stat span{font-size:11px;color:#78716c;text-transform:uppercase;letter-spacing:.08em}
        .tiau-cta-row{display:flex;gap:12px}
        .tiau-hire{padding:12px 30px;border:none;border-radius:44px;background:#b45309;color:#fff;font-family:'Playfair Display',serif;font-weight:700;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tiau-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(180,83,9,.22)}
        .tiau-btn-sec{padding:12px 30px;border:1px solid #b45309;border-radius:44px;background:transparent;color:#b45309;font-family:'Playfair Display',serif;font-weight:700;font-size:15px;cursor:pointer}
        .tiau-hero-img{border-radius:44px;overflow:hidden;aspect-ratio:4/3;background:#fef3c7}
        .tiau-hero-img img{width:100%;height:100%;object-fit:cover}
        .tiau-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tiau-card{border-radius:44px;border:1px solid #fcd34d;padding:28px;background:#fff}
        .tiau-card h3{font-family:'Playfair Display',serif;font-size:18px;margin:0 0 10px;color:#b45309}
        .tiau-card p{margin:0;font-size:13px;color:#78716c;line-height:1.65}
        .tiau-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tiau-accent-box{border-radius:44px;padding:32px;background:#b45309;color:#fff}
        .tiau-accent-box h3{font-family:'Playfair Display',serif;font-size:20px;margin:0 0 8px}
        .tiau-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tiau-info{border-radius:44px;border:1px solid #fcd34d;padding:28px;background:#fff;font-size:13px;color:#78716c}
        .tiau-info b{color:#1c1917}
        .tiau-quote{padding:36px 5vw;text-align:center;font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#92400e;border-top:1px solid #fcd34d;border-bottom:1px solid #fcd34d;margin:0 5vw 30px}
        .tiau-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tiau-photo{border-radius:44px;overflow:hidden;cursor:pointer}
        .tiau-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tiau-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tiau-hero{grid-template-columns:1fr}
          .tiau-main,.tiau-lower{grid-template-columns:1fr}
          .tiau-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tiau-stats{flex-direction:column}
          .tiau-cta-row{flex-direction:column}
          .tiau-gallery{gap:6px}
          .tiau-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tiau-wrap">
        <nav className="tiau-nav">
          <span className="tiau-nav-name">
            {name}
            {verified && <span className="tiau-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tiau-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tiau-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tiau-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tiau-hero-bio">{bio}</p>
            <div className="tiau-stats">
              <div className="tiau-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tiau-stat"><b>{specialties.length}</b><span>Genres</span></div>
              <div className="tiau-stat"><b>&#9733;</b><span>Published</span></div>
            </div>
            <div className="tiau-cta-row">
              <button className="tiau-hire" onClick={onHire}>Hire Me</button>
              <button className="tiau-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tiau-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tiau-main">
          <div className="tiau-card"><h3>Books &amp; Publications</h3><p>Published works spanning memoir, photography essays, and visual storytelling anthologies.</p></div>
          <div className="tiau-card"><h3>Literary Events</h3><p>Book signings, readings, and author appearances for festivals, bookstores, and private gatherings.</p></div>
        </div>

        <div className="tiau-lower">
          <div className="tiau-accent-box">
            <h3>Commission a Story</h3>
            <p>Every image tells a story. Let&rsquo;s create a visual narrative that resonates with your audience.</p>
          </div>
          <div className="tiau-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tiau-quote">&ldquo;A photograph is a chapter the world can read without words.&rdquo;</div>

        <div className="tiau-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tiau-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
