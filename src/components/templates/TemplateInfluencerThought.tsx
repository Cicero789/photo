import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerThought(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-thought";
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
        .tith-wrap{padding:0;margin:0;background:linear-gradient(180deg,#07111f 0%,#111827 100%);color:#fff;font-family:'Inter',sans-serif;min-height:600px}
        .tith-nav{display:flex;align-items:center;gap:16px;padding:22px 5vw;border-bottom:1px solid rgba(214,167,74,.18)}
        .tith-nav-name{font-family:'Playfair Display',serif;font-weight:700;font-size:20px}
        .tith-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#d6a74a;color:#07111f;font-size:11px;margin-left:6px;vertical-align:middle}
        .tith-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tith-pill{padding:5px 14px;border-radius:44px;background:rgba(214,167,74,.10);color:#d6a74a;font-size:12px;font-weight:500;border:1px solid rgba(214,167,74,.22)}
        .tith-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tith-hero h1{font-family:'Playfair Display',serif;font-size:clamp(24px,3.8vw,46px);font-weight:800;letter-spacing:-0.02em;margin:0 0 14px;line-height:1.15}
        .tith-hero-bio{color:#94a3b8;font-size:14px;line-height:1.7;margin:0 0 22px}
        .tith-stats{display:flex;gap:14px;margin-bottom:24px}
        .tith-stat{padding:14px 20px;border-radius:44px;border:1px solid rgba(214,167,74,.22);background:rgba(255,255,255,.08);flex:1;text-align:center;backdrop-filter:blur(6px)}
        .tith-stat b{display:block;font-family:'Playfair Display',serif;font-size:22px;color:#d6a74a}
        .tith-stat span{font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em}
        .tith-cta-row{display:flex;gap:12px}
        .tith-hire{padding:12px 30px;border:none;border-radius:44px;background:#d6a74a;color:#07111f;font-family:'Playfair Display',serif;font-weight:700;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tith-hire:hover{transform:translateY(-2px);box-shadow:0 0 28px rgba(214,167,74,.3)}
        .tith-btn-sec{padding:12px 30px;border:1px solid rgba(214,167,74,.4);border-radius:44px;background:transparent;color:#d6a74a;font-family:'Playfair Display',serif;font-weight:700;font-size:15px;cursor:pointer}
        .tith-hero-img{border-radius:44px;overflow:hidden;aspect-ratio:4/3;background:#111827}
        .tith-hero-img img{width:100%;height:100%;object-fit:cover}
        .tith-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tith-card{border-radius:44px;border:1px solid rgba(214,167,74,.18);padding:28px;background:rgba(255,255,255,.08);backdrop-filter:blur(6px)}
        .tith-card h3{font-family:'Playfair Display',serif;font-size:18px;margin:0 0 10px;color:#d6a74a}
        .tith-card p{margin:0;font-size:13px;color:#94a3b8;line-height:1.65}
        .tith-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tith-accent-box{border-radius:44px;padding:32px;background:#d6a74a;color:#07111f}
        .tith-accent-box h3{font-family:'Playfair Display',serif;font-size:20px;margin:0 0 8px}
        .tith-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tith-info{border-radius:44px;border:1px solid rgba(214,167,74,.18);padding:28px;background:rgba(255,255,255,.08);font-size:13px;color:#94a3b8;backdrop-filter:blur(6px)}
        .tith-info b{color:#fff}
        .tith-quote{padding:36px 5vw;text-align:center;font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#d6a74a;border-top:1px solid rgba(214,167,74,.15);border-bottom:1px solid rgba(214,167,74,.15);margin:0 5vw 30px}
        .tith-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tith-photo{border-radius:44px;overflow:hidden;cursor:pointer}
        .tith-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tith-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tith-hero{grid-template-columns:1fr}
          .tith-main,.tith-lower{grid-template-columns:1fr}
          .tith-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tith-stats{flex-direction:column}
          .tith-cta-row{flex-direction:column}
          .tith-gallery{gap:6px}
          .tith-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tith-wrap">
        <nav className="tith-nav">
          <span className="tith-nav-name">
            {name}
            {verified && <span className="tith-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tith-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tith-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tith-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tith-hero-bio">{bio}</p>
            <div className="tith-stats">
              <div className="tith-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tith-stat"><b>{specialties.length}</b><span>Domains</span></div>
              <div className="tith-stat"><b>&#9733;</b><span>Authority</span></div>
            </div>
            <div className="tith-cta-row">
              <button className="tith-hire" onClick={onHire}>Hire Me</button>
              <button className="tith-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tith-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tith-main">
          <div className="tith-card"><h3>Insights &amp; Analysis</h3><p>Deep-dive perspectives on industry trends, strategy, and the ideas shaping tomorrow&rsquo;s landscape.</p></div>
          <div className="tith-card"><h3>Advisory &amp; Consulting</h3><p>Executive-level guidance for organizations seeking clarity, vision, and informed decision-making.</p></div>
        </div>

        <div className="tith-lower">
          <div className="tith-accent-box">
            <h3>Engage My Expertise</h3>
            <p>Leverage decades of experience and a network of influence to elevate your next initiative.</p>
          </div>
          <div className="tith-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tith-quote">&ldquo;Thought leadership is earned at the intersection of insight and action.&rdquo;</div>

        <div className="tith-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tith-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
