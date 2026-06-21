import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateEngagementElegant(props: TemplateProps) {
  const { name, tagline, specialties, bio, website: _website, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-engagement-elegant";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing.downloads.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : null;

  const heroPhoto = portfolio.length > 0 ? portfolio[0] : null;
  const galleryPhotos = portfolio.slice(1, 4);

  return (
    <>
      <style>{`
        /* ---- root ---- */
        .tee-root {
          background: #f8f3e9;
          color: #2f2a24;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          min-height: 600px;
          padding: 0;
          overflow-x: hidden;
        }

        /* ---- header ---- */
        .tee-header {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 26px 5vw;
          border-top: 1px solid #a49784;
          border-bottom: 1px solid #a49784;
        }
        .tee-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tee-header-right {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: right;
        }
        .tee-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          font-size: clamp(26px, 3.5vw, 44px);
          margin: 0;
          text-align: center;
          letter-spacing: 0.02em;
          padding: 0 24px;
        }
        .tee-kicker {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #686055;
          font-weight: 400;
        }
        .tee-muted {
          font-size: 12px;
          color: #686055;
          font-weight: 300;
        }
        .tee-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #40372d;
          color: #f8f3e9;
          font-size: 10px;
          margin-left: 8px;
          vertical-align: middle;
        }

        /* ---- hero ---- */
        .tee-hero {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 420px;
          max-height: 720px;
          overflow: hidden;
          cursor: pointer;
        }
        .tee-hero img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tee-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.62) 0%,
            rgba(0, 0, 0, 0.18) 45%,
            transparent 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 60px 5vw;
          color: #fff;
        }
        .tee-hero-kicker {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          font-weight: 400;
          margin-bottom: 14px;
          opacity: 0.85;
        }
        .tee-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px, 5vw, 60px);
          font-weight: 400;
          margin: 0 0 14px;
          line-height: 1.12;
        }
        .tee-hero-desc {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(16px, 2vw, 22px);
          margin: 0;
          opacity: 0.88;
          max-width: 480px;
          line-height: 1.5;
        }

        /* ---- intro ---- */
        .tee-intro {
          display: grid;
          grid-template-columns: 1fr 1.6fr auto;
          gap: 40px;
          align-items: center;
          padding: 60px 5vw;
        }
        .tee-intro-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 500;
          margin: 0;
          line-height: 1.2;
        }
        .tee-intro-text {
          font-size: 14px;
          line-height: 1.85;
          color: #686055;
          margin: 0;
          font-weight: 300;
        }
        .tee-intro-cta {
          display: flex;
          justify-content: flex-end;
        }

        /* ---- button ---- */
        .tee-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 34px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          border: 1px solid #40372d;
          background: #40372d;
          color: #fff;
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        .tee-btn:hover {
          background: transparent;
          color: #40372d;
        }

        /* ---- process ---- */
        .tee-process {
          border-top: 1px solid #a49784;
          border-bottom: 1px solid #a49784;
          padding: 60px 5vw;
        }
        .tee-process-header {
          text-align: center;
          margin-bottom: 50px;
        }
        .tee-process-kicker {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: #686055;
          display: block;
          margin-bottom: 10px;
          font-weight: 400;
        }
        .tee-process-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 500;
          margin: 0;
        }
        .tee-timeline {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 40px;
          position: relative;
          text-align: center;
        }
        .tee-timeline-line {
          position: absolute;
          top: 22px;
          left: 16.67%;
          right: 16.67%;
          height: 1px;
          background: #a49784;
          pointer-events: none;
        }
        .tee-step {
          position: relative;
          z-index: 1;
        }
        .tee-step-num {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #a49784;
          background: #f8f3e9;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #2f2a24;
          margin-bottom: 18px;
        }
        .tee-step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 10px;
        }
        .tee-step-desc {
          font-size: 13px;
          line-height: 1.75;
          color: #686055;
          margin: 0 auto;
          max-width: 280px;
          font-weight: 300;
        }

        /* ---- gallery ---- */
        .tee-gallery {
          display: grid;
          grid-template-columns: 1fr 1.08fr 1fr;
          gap: 16px;
          padding: 60px 5vw;
          align-items: center;
        }
        .tee-gallery-item {
          overflow: hidden;
          cursor: pointer;
        }
        .tee-gallery-center {
          aspect-ratio: 3 / 4;
        }
        .tee-gallery-side {
          aspect-ratio: 3 / 3.12;
        }
        .tee-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.3);
          transition: filter 0.5s ease, transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tee-gallery-item:hover img {
          filter: saturate(1);
          transform: scale(1.035);
        }

        /* ---- responsive 800px ---- */
        @media (max-width: 800px) {
          .tee-intro {
            grid-template-columns: 1fr 1fr;
          }
          .tee-intro-cta {
            grid-column: 1 / -1;
            justify-content: center;
          }
        }

        /* ---- responsive 520px ---- */
        @media (max-width: 520px) {
          .tee-header {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 10px;
          }
          .tee-header-left {
            align-items: center;
          }
          .tee-header-right {
            text-align: center;
            align-items: center;
          }
          .tee-hero {
            height: 80vh;
            max-height: none;
          }
          .tee-intro {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .tee-intro-cta {
            justify-content: center;
          }
          .tee-timeline {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .tee-timeline-line {
            display: none;
          }
          .tee-gallery {
            grid-template-columns: 1fr;
          }
          .tee-gallery-side {
            aspect-ratio: 3 / 4;
          }
        }
      `}</style>

      <section className="tee-root">
        {/* ---- Header ---- */}
        <header className="tee-header">
          <div className="tee-header-left">
            <span className="tee-kicker">{tagline}</span>
            <span className="tee-muted">{serviceArea}</span>
          </div>
          <h1 className="tee-name">
            {name}
            {verified && (
              <span className="tee-verified" title="Verified">
                &#10003;
              </span>
            )}
          </h1>
          <div className="tee-header-right">
            <span className="tee-kicker">{specialties.join(" · ")}</span>
            {priceLabel && <span className="tee-muted">{priceLabel}</span>}
          </div>
        </header>

        {/* ---- Proposal Hero ---- */}
        {heroPhoto && (
          <div className="tee-hero" onClick={() => onPhotoClick(0)}>
            <img src={heroPhoto.url} alt={heroPhoto.filename} />
            <div className="tee-hero-overlay">
              <span className="tee-hero-kicker">A Moment in Time</span>
              <h2 className="tee-hero-title">The most beautiful yes&hellip;</h2>
              <p className="tee-hero-desc">{tagline}</p>
            </div>
          </div>
        )}

        {/* ---- Intro ---- */}
        <div className="tee-intro">
          <h3 className="tee-intro-title">Your Story Begins&nbsp;Here</h3>
          <p className="tee-intro-text">
            {bio ||
              `${name} specializes in ${specialties.join(", ")} photography in ${serviceArea}.`}
          </p>
          <div className="tee-intro-cta">
            <button className="tee-btn" onClick={onHire}>
              Inquire Now
            </button>
          </div>
        </div>

        {/* ---- Process ---- */}
        <div className="tee-process">
          <div className="tee-process-header">
            <span className="tee-process-kicker">The Experience</span>
            <h3 className="tee-process-title">How it works</h3>
          </div>
          <div className="tee-timeline">
            <div className="tee-timeline-line" />
            <div className="tee-step">
              <div className="tee-step-num">01</div>
              <h4 className="tee-step-title">Inquiry</h4>
              <p className="tee-step-desc">
                Reach out and share your vision. We&rsquo;ll discuss locations,
                timing, and how to make your moment unforgettable.
              </p>
            </div>
            <div className="tee-step">
              <div className="tee-step-num">02</div>
              <h4 className="tee-step-title">The Shoot</h4>
              <p className="tee-step-desc">
                A relaxed, guided session capturing the authentic emotion and
                connection between you and your partner.
              </p>
            </div>
            <div className="tee-step">
              <div className="tee-step-num">03</div>
              <h4 className="tee-step-title">Delivery</h4>
              <p className="tee-step-desc">
                Receive your beautifully edited gallery within two weeks, ready
                to share and treasure forever.
              </p>
            </div>
          </div>
        </div>

        {/* ---- Gallery ---- */}
        {galleryPhotos.length > 0 && (
          <div className="tee-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className={`tee-gallery-item ${i === 1 ? "tee-gallery-center" : "tee-gallery-side"}`}
                onClick={() => onPhotoClick(i + 1)}
              >
                <img src={photo.url} alt={photo.filename} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
