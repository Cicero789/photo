import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function Template1Clean(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-clean-minimal";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  return (
    <>
      <style>{`
        .t1-minimal { padding: 58px 5vw 70px; background: #fff; font-family: Inter, sans-serif; min-height: 600px; }
        .t1-minimal-head { display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: end; padding-bottom: 34px; border-bottom: 1px solid #dedede; }
        .t1-minimal h2 { margin: 0 0 9px; font-size: clamp(28px, 4vw, 52px); letter-spacing: -0.045em; font-weight: 500; }
        .t1-minimal .t1-sub { display: flex; gap: 18px; color: #707070; font-size: 13px; }
        .t1-minimal .t1-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 24px; font: inherit; text-decoration: none; cursor: pointer; border: 1px solid #111; background: #111; color: white; transition: transform 0.25s, background 0.25s, color 0.25s; }
        .t1-minimal .t1-hire:hover { background: white; color: #111; transform: translateY(-2px); }
        .t1-minimal-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 30px; }
        .t1-minimal-grid .t1-photo { aspect-ratio: 1; border: 1px solid #e7e7e7; overflow: hidden; cursor: pointer; }
        .t1-minimal-grid .t1-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.2,0.7,0.2,1); }
        .t1-minimal-grid .t1-photo:hover img { transform: scale(1.035); }
        .t1-minimal-bio { display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 40px; margin-top: 38px; color: #565656; font-size: 13px; line-height: 1.75; }
        .t1-eyebrow { text-transform: uppercase; letter-spacing: 0.18em; font-size: 11px; }
        .t1-verified { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: #111; color: white; font-size: 12px; margin-left: 8px; vertical-align: middle; }
        @media (max-width: 800px) {
          .t1-minimal-grid { grid-template-columns: repeat(2, 1fr); }
          .t1-minimal-bio { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .t1-minimal-head { grid-template-columns: 1fr; align-items: start; }
          .t1-minimal-grid { gap: 6px; }
        }
      `}</style>
      <section className="t1-minimal">
        <header className="t1-minimal-head">
          <div>
            <h2>
              {name}
              {verified && <span className="t1-verified" title="Verified">&#10003;</span>}
            </h2>
            <div className="t1-sub">
              <span>{tagline}</span>
              <span>{serviceArea}</span>
            </div>
          </div>
          <button className="t1-hire" onClick={onHire}>Hire Me</button>
        </header>
        <div className="t1-minimal-grid">
          {portfolio.map((photo, i) => (
            <div key={photo.id} className="t1-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="t1-minimal-bio">
          <span className="t1-eyebrow">{specialties.join(" · ")}</span>
          {bio && <p style={{ margin: 0 }}>{bio}</p>}
          <p style={{ margin: 0 }}>
            {priceLabel && <><b>{priceLabel}</b><br /></>}
            {serviceArea}
          </p>
        </div>
      </section>
    </>
  );
}
