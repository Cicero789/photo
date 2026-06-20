import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function Template4Instagram(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-instagram-grid";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const avatarPhoto = portfolio[0];
  const handle = name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");

  return (
    <>
      <style>{`
        .t4-instagram { padding: 42px 0 65px; background: white; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; min-height: 600px; }
        .t4-insta-inner { max-width: 935px; margin: auto; padding: 0 20px; }
        .t4-insta-profile { display: grid; grid-template-columns: 210px 1fr; gap: 30px; align-items: center; padding: 20px 0 42px; }
        .t4-insta-avatar { width: 150px; height: 150px; margin: auto; border-radius: 50%; padding: 4px; background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7); }
        .t4-insta-avatar img { display: block; width: 100%; height: 100%; border-radius: 50%; border: 4px solid white; object-fit: cover; }
        .t4-insta-title { display: flex; align-items: center; gap: 18px; }
        .t4-insta-title h2 { margin: 0; font-size: 25px; font-weight: 400; }
        .t4-hire { display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 18px; border-radius: 8px; color: white; background: #0095f6; font-size: 14px; font-weight: 600; border: none; cursor: pointer; font-family: inherit; transition: transform 0.25s, background 0.25s; }
        .t4-hire:hover { background: #1877f2; transform: translateY(-2px); }
        .t4-insta-stats { display: flex; gap: 28px; margin: 24px 0 17px; font-size: 15px; }
        .t4-insta-bio { max-width: 580px; font-size: 14px; line-height: 1.45; }
        .t4-insta-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #dbdbdb; }
        .t4-insta-grid .t4-photo { aspect-ratio: 1; position: relative; overflow: hidden; cursor: pointer; }
        .t4-insta-grid .t4-photo img { display: block; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.35s; }
        .t4-insta-grid .t4-photo:hover img { opacity: 0.78; }
        .t4-verified { color: #0095f6; font-size: 18px; margin-left: 8px; }
        @media (max-width: 800px) {
          .t4-insta-profile { grid-template-columns: 120px 1fr; }
          .t4-insta-avatar { width: 105px; height: 105px; }
          .t4-insta-title { align-items: flex-start; flex-direction: column; gap: 10px; }
        }
        @media (max-width: 520px) {
          .t4-insta-profile { grid-template-columns: 85px 1fr; gap: 14px; }
          .t4-insta-avatar { width: 78px; height: 78px; }
          .t4-insta-title h2 { font-size: 18px; }
          .t4-insta-stats { gap: 12px; font-size: 12px; }
        }
      `}</style>
      <section className="t4-instagram">
        <div className="t4-insta-inner">
          <header className="t4-insta-profile">
            <div className="t4-insta-avatar">
              {avatarPhoto && <img src={avatarPhoto.url} alt={`${name} avatar`} />}
            </div>
            <div>
              <div className="t4-insta-title">
                <h2>
                  {handle}
                  {verified && <span className="t4-verified">&#10003;</span>}
                </h2>
                <button className="t4-hire" onClick={onHire}>Hire Me</button>
              </div>
              <div className="t4-insta-stats">
                <span><b>{portfolio.length}</b> posts</span>
                <span><b>12</b> inquiries</span>
                <span><b>10+</b> years</span>
              </div>
              <div className="t4-insta-bio">
                <b>{name}</b><br />
                {tagline} &#10022;<br />
                {specialties.join(" · ")}<br />
                &#128205; {serviceArea}
                {priceLabel && <> &middot; {priceLabel}</>}
                {bio && <><br /><span style={{ color: "#666", marginTop: 4, display: "inline-block" }}>{bio}</span></>}
              </div>
            </div>
          </header>
          <div className="t4-insta-grid">
            {portfolio.map((photo, i) => (
              <div key={photo.id} className="t4-photo" onClick={() => onPhotoClick(i)}>
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
