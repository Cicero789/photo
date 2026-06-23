import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateInfluencerSpeaker(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-influencer-speaker";
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
        .tisp-wrap{padding:0;margin:0;background:linear-gradient(180deg,#eff6ff 0%,#dbeafe 100%);color:#1e293b;font-family:'Inter',sans-serif;min-height:600px}
        .tisp-nav{display:flex;align-items:center;gap:16px;padding:22px 5vw;border-bottom:1px solid #bfdbfe}
        .tisp-nav-name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px}
        .tisp-verified{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#2563eb;color:#fff;font-size:11px;margin-left:6px;vertical-align:middle}
        .tisp-nav-pills{display:flex;gap:8px;margin-left:auto;flex-wrap:wrap}
        .tisp-pill{padding:5px 14px;border-radius:34px;background:rgba(37,99,235,.08);color:#2563eb;font-size:12px;font-weight:500;border:1px solid rgba(37,99,235,.2)}
        .tisp-hero{display:grid;grid-template-columns:1.2fr 1fr;gap:40px;padding:48px 5vw 40px;align-items:start}
        .tisp-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.8vw,46px);font-weight:700;letter-spacing:-0.03em;margin:0 0 14px;line-height:1.15}
        .tisp-hero-bio{color:#475569;font-size:14px;line-height:1.7;margin:0 0 22px}
        .tisp-stats{display:flex;gap:14px;margin-bottom:24px}
        .tisp-stat{padding:14px 20px;border-radius:34px;border:1px solid #bfdbfe;background:#fff;flex:1;text-align:center}
        .tisp-stat b{display:block;font-family:'Space Grotesk',sans-serif;font-size:22px;color:#2563eb}
        .tisp-stat span{font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}
        .tisp-cta-row{display:flex;gap:12px}
        .tisp-hire{padding:12px 30px;border:none;border-radius:34px;background:#2563eb;color:#fff;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .tisp-hire:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,.25)}
        .tisp-btn-sec{padding:12px 30px;border:1px solid #2563eb;border-radius:34px;background:transparent;color:#2563eb;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;cursor:pointer}
        .tisp-hero-img{border-radius:34px;overflow:hidden;aspect-ratio:4/3;background:#dbeafe}
        .tisp-hero-img img{width:100%;height:100%;object-fit:cover}
        .tisp-main{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tisp-card{border-radius:34px;border:1px solid #bfdbfe;padding:28px;background:#fff}
        .tisp-card h3{font-family:'Space Grotesk',sans-serif;font-size:18px;margin:0 0 10px;color:#2563eb}
        .tisp-card p{margin:0;font-size:13px;color:#475569;line-height:1.65}
        .tisp-lower{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:0 5vw 30px}
        .tisp-accent-box{border-radius:34px;padding:32px;background:#2563eb;color:#fff}
        .tisp-accent-box h3{font-family:'Space Grotesk',sans-serif;font-size:20px;margin:0 0 8px}
        .tisp-accent-box p{margin:0;font-size:13px;line-height:1.6}
        .tisp-info{border-radius:34px;border:1px solid #bfdbfe;padding:28px;background:#fff;font-size:13px;color:#475569}
        .tisp-info b{color:#1e293b}
        .tisp-quote{padding:36px 5vw;text-align:center;font-style:italic;font-size:clamp(16px,2.5vw,22px);color:#64748b;border-top:1px solid #bfdbfe;border-bottom:1px solid #bfdbfe;margin:0 5vw 30px}
        .tisp-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding:0 5vw 60px}
        .tisp-photo{border-radius:34px;overflow:hidden;cursor:pointer}
        .tisp-photo img{width:100%;aspect-ratio:1;object-fit:cover;transition:transform .5s cubic-bezier(.2,.7,.2,1)}
        .tisp-photo:hover img{transform:scale(1.04)}
        @media(max-width:800px){
          .tisp-hero{grid-template-columns:1fr}
          .tisp-main,.tisp-lower{grid-template-columns:1fr}
          .tisp-gallery{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:520px){
          .tisp-stats{flex-direction:column}
          .tisp-cta-row{flex-direction:column}
          .tisp-gallery{gap:6px}
          .tisp-nav{flex-wrap:wrap}
        }
      `}</style>
      <section className="tisp-wrap">
        <nav className="tisp-nav">
          <span className="tisp-nav-name">
            {name}
            {verified && <span className="tisp-verified" title="Verified">&#10003;</span>}
          </span>
          <div className="tisp-nav-pills">
            {specialties.map((s, i) => <span key={i} className="tisp-pill">{s}</span>)}
          </div>
        </nav>

        <div className="tisp-hero">
          <div>
            <h1>{tagline}</h1>
            <p className="tisp-hero-bio">{bio}</p>
            <div className="tisp-stats">
              <div className="tisp-stat"><b>{portfolio.length}</b><span>Photos</span></div>
              <div className="tisp-stat"><b>{specialties.length}</b><span>Topics</span></div>
              <div className="tisp-stat"><b>&#9733;</b><span>Keynotes</span></div>
            </div>
            <div className="tisp-cta-row">
              <button className="tisp-hire" onClick={onHire}>Hire Me</button>
              <button className="tisp-btn-sec">View Portfolio</button>
            </div>
          </div>
          {portfolio?.[0] && (
            <div className="tisp-hero-img">
              <img src={portfolio?.[0].url} alt={portfolio?.[0].filename} loading="lazy" />
            </div>
          )}
        </div>

        <div className="tisp-main">
          <div className="tisp-card"><h3>Speaking &amp; Keynotes</h3><p>Engaging presentations on innovation, leadership, and industry trends for conferences worldwide.</p></div>
          <div className="tisp-card"><h3>Workshops &amp; Panels</h3><p>Interactive sessions and expert panel participation tailored to your event&rsquo;s audience and goals.</p></div>
        </div>

        <div className="tisp-lower">
          <div className="tisp-accent-box">
            <h3>Book a Session</h3>
            <p>Elevate your next event with a keynote that inspires action and drives meaningful conversation.</p>
          </div>
          <div className="tisp-info">
            <p><b>Service Area:</b> {serviceArea}</p>
            {priceLabel && <p style={{ marginTop: 10 }}><b>Pricing:</b> {priceLabel}</p>}
          </div>
        </div>

        <div className="tisp-quote">&ldquo;The stage is where ideas meet impact.&rdquo;</div>

        <div className="tisp-gallery">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="tisp-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
