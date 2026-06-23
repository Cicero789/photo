import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHolidayElegant(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-holiday-elegant";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=DM+Sans:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0];
  const galleryPhotos = portfolio.slice(1);

  return (
    <>
      <style>{`
        .ec-elegant {
          position: relative;
          background: radial-gradient(ellipse at 50% 0%, #fffdf5 0%, #fef3c7 60%);
          color: #33281f;
          font-family: "DM Sans", sans-serif;
          min-height: 600px;
          overflow: hidden;
        }

        /* ── Sparkle decorations ── */
        .ec-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b88828;
          box-shadow: 0 0 8px 2px rgba(184, 136, 40, 0.45);
          z-index: 2;
          pointer-events: none;
          animation: ec-twinkle 3s ease-in-out infinite;
        }
        .ec-spark::before,
        .ec-spark::after {
          content: "";
          position: absolute;
          background: #b88828;
          border-radius: 1px;
        }
        .ec-spark::before {
          width: 1.5px;
          height: 18px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ec-spark::after {
          width: 18px;
          height: 1.5px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ec-spark-1 { top: 6%; left: 10%; animation-delay: 0s; }
        .ec-spark-2 { top: 14%; right: 8%; left: auto; animation-delay: 0.7s; }
        .ec-spark-3 { top: 44%; left: 4%; animation-delay: 1.4s; }
        .ec-spark-4 { top: 66%; right: 12%; left: auto; animation-delay: 2.1s; }
        .ec-spark-5 { top: 86%; left: 18%; animation-delay: 0.35s; }

        @keyframes ec-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.7); }
          50%      { opacity: 1;    transform: scale(1.25); }
        }

        /* ── Nav bar ── */
        .ec-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 18px 5vw;
          border-top: 1px solid #b28c49;
          border-bottom: 1px solid #b28c49;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          position: relative;
          z-index: 3;
        }
        .ec-nav-area  { text-align: left; color: #5c4a3a; }
        .ec-nav-name  {
          text-align: center;
          font-family: "Playfair Display", serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: none;
          color: #33281f;
        }
        .ec-nav-specs { text-align: right; color: #b28c49; }

        .ec-verified {
          display: inline-block;
          color: #b88828;
          font-size: 15px;
          margin-left: 8px;
          vertical-align: middle;
        }

        /* ── Hero ── */
        .ec-hero {
          position: relative;
          margin: 32px 5vw;
          border: 1px solid #b28c49;
          padding: 11px;
          background: #fdfaf0;
        }
        .ec-hero-inner {
          position: relative;
          overflow: hidden;
        }
        .ec-hero-img {
          display: block;
          width: 100%;
          min-height: 65vh;
          object-fit: cover;
        }
        .ec-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            0deg,
            rgba(51, 40, 31, 0.88) 0%,
            rgba(51, 40, 31, 0.35) 50%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 60px 40px 40px;
        }
        .ec-kicker {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #e7c878;
          margin-bottom: 14px;
        }
        .ec-hero-overlay h1 {
          font-family: "Playfair Display", serif;
          font-weight: 600;
          font-size: clamp(34px, 6vw, 72px);
          color: #fff;
          margin: 0 0 14px;
          line-height: 1.05;
        }
        .ec-hero-overlay p {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          line-height: 1.75;
          max-width: 520px;
          margin: 0 0 24px;
        }
        .ec-btn-hire {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 30px;
          background: #e7c878;
          color: #33281f;
          font-family: "DM Sans", sans-serif;
          font-weight: 600;
          font-size: 13px;
          border: 1px solid #e7c878;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: background 0.3s, color 0.3s;
          align-self: flex-start;
        }
        .ec-btn-hire:hover {
          background: transparent;
          color: #e7c878;
        }

        /* ── Celebration intro ── */
        .ec-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 52px 5vw;
          border-bottom: 1px solid #b28c49;
          position: relative;
          z-index: 1;
        }
        .ec-intro h2 {
          font-family: "Playfair Display", serif;
          font-weight: 500;
          font-style: italic;
          font-size: clamp(22px, 3.5vw, 40px);
          line-height: 1.3;
          margin: 0;
          color: #33281f;
        }
        .ec-intro p {
          font-size: 15px;
          line-height: 1.85;
          color: #5c4a3a;
          margin: 0;
        }

        /* ── Luxury grid ── */
        .ec-luxury-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr 1fr;
          gap: 24px;
          padding: 48px 5vw;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .ec-luxury-photo {
          border: 1px solid #b28c49;
          padding: 10px;
          background: #fdfaf0;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.35s ease;
        }
        .ec-luxury-photo:hover {
          transform: translateY(-4px);
        }
        .ec-luxury-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.18);
          transition: filter 0.4s ease;
        }
        .ec-luxury-photo:hover img {
          filter: sepia(0);
        }
        /* Side columns (1st & 3rd) at 78% height */
        .ec-luxury-photo:nth-child(3n+1),
        .ec-luxury-photo:nth-child(3n) {
          height: 296px;   /* 380 * 0.78 */
        }
        /* Center column full height */
        .ec-luxury-photo:nth-child(3n+2) {
          height: 380px;
        }

        /* ── Footer ── */
        .ec-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 36px 5vw 52px;
          position: relative;
          z-index: 1;
        }
        .ec-footer-line {
          flex: 0 0 60px;
          height: 1px;
          background: #b28c49;
        }
        .ec-footer-text {
          font-family: "Playfair Display", serif;
          font-style: italic;
          font-weight: 500;
          font-size: 14px;
          color: #b28c49;
          white-space: nowrap;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ec-intro {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .ec-nav {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 6px;
          }
          .ec-nav-area,
          .ec-nav-specs {
            text-align: center;
          }
          .ec-hero-img {
            min-height: 75vh;
          }
          .ec-hero-overlay {
            padding: 40px 20px 28px;
          }
          .ec-luxury-grid {
            grid-template-columns: 1fr;
          }
          .ec-luxury-photo:nth-child(3n+1),
          .ec-luxury-photo:nth-child(3n),
          .ec-luxury-photo:nth-child(3n+2) {
            height: 280px;
            align-self: auto;
          }
        }
      `}</style>

      <section className="ec-elegant">
        {/* Gold sparkle decorations */}
        <div className="ec-spark ec-spark-1" />
        <div className="ec-spark ec-spark-2" />
        <div className="ec-spark ec-spark-3" />
        <div className="ec-spark ec-spark-4" />
        <div className="ec-spark ec-spark-5" />

        {/* Nav bar */}
        <nav className="ec-nav">
          <span className="ec-nav-area">{serviceArea}</span>
          <span className="ec-nav-name">
            {name}
            {verified && <span className="ec-verified">&#10003;</span>}
          </span>
          <span className="ec-nav-specs">
            {specialties.join(" · ")}
          </span>
        </nav>

        {/* Hero image */}
        {heroPhoto && (
          <div className="ec-hero">
            <div className="ec-hero-inner">
              <img
                className="ec-hero-img"
                src={heroPhoto.url}
                alt={heroPhoto.filename}
              />
              <div className="ec-hero-overlay">
                <span className="ec-kicker">
                  {specialties.length > 0
                    ? specialties[0]
                    : "Photography"}
                </span>
                <h1>{name}</h1>
                {tagline && <p>{tagline}</p>}
                <button className="ec-btn-hire" onClick={onHire}>
                  Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration intro */}
        {(bio || tagline) && (
          <div className="ec-intro">
            <div>
              <h2>Capturing Your Celebration</h2>
            </div>
            <div>
              <p>
                {bio ||
                  `${tagline}. Specializing in ${specialties.join(", ")}, every frame is crafted with intention, warmth, and an eye for fleeting moments that deserve to last forever.`}
              </p>
            </div>
          </div>
        )}

        {/* Luxury photo grid */}
        {galleryPhotos.length > 0 && (
          <div className="ec-luxury-grid">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="ec-luxury-photo"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="ec-footer">
          <span className="ec-footer-line" />
          <span className="ec-footer-text">
            {name} &mdash; Elegant Celebration
          </span>
          <span className="ec-footer-line" />
        </footer>
      </section>
    </>
  );
}
