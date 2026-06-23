import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingDriving(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-drive";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const heroPhoto = portfolio?.[0] || null;
  const galleryPhotos = portfolio.slice(1, 7);

  return (
    <>
      <style>{`
        .tt-drive-root {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc, #e0f2fe);
          color: #111827;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          line-height: 1.6;
        }

        /* Watermark */
        .tt-drive-watermark {
          position: absolute;
          top: 30px;
          right: -10px;
          font-family: 'Inter', sans-serif;
          font-size: 9rem;
          font-weight: 900;
          color: rgba(250, 204, 21, 0.07);
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Hero Grid */
        .tt-drive-hero {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding: 64px 5vw 48px;
          align-items: center;
        }

        .tt-drive-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #0369a1;
          margin-bottom: 12px;
        }

        .tt-drive-hero h2 {
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.85rem, 4.2vw, 3rem);
          font-weight: 800;
          line-height: 1.15;
          color: #111827;
          margin: 0 0 10px;
        }

        .tt-drive-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .tt-drive-name-row h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
        }

        .tt-drive-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #0369a1;
          color: #fff;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }

        .tt-drive-tagline {
          font-size: 0.95rem;
          color: #4b5563;
          margin-bottom: 20px;
        }

        /* Stats row */
        .tt-drive-stats {
          display: flex;
          gap: 28px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .tt-drive-stat {
          text-align: center;
        }
        .tt-drive-stat-value {
          font-size: 1.6rem;
          font-weight: 900;
          color: #111827;
          line-height: 1.2;
        }
        .tt-drive-stat-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6b7280;
        }

        .tt-drive-btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tt-drive-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #111827;
          background: #facc15;
          border: 2px solid #facc15;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-drive-btn-primary:hover {
          background: #eab308;
          transform: translateY(-1px);
        }

        .tt-drive-btn-dark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          background: #111827;
          border: 2px solid #111827;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-drive-btn-dark:hover {
          background: #1f2937;
        }

        /* Hero photo card */
        .tt-drive-hero-photo {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(17, 24, 39, 0.12);
          cursor: pointer;
        }
        .tt-drive-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 340px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-drive-hero-photo:hover img {
          transform: scale(1.03);
        }

        /* Content band */
        .tt-drive-band {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 5vw 64px;
        }

        /* Left panel */
        .tt-drive-bio {
          font-size: 0.92rem;
          color: #4b5563;
          line-height: 1.8;
          margin: 0 0 28px;
        }

        /* Road-map visual */
        .tt-drive-roadmap {
          position: relative;
          background: #111827;
          border-radius: 12px;
          min-height: 230px;
          padding: 32px 24px;
          overflow: hidden;
        }
        .tt-drive-roadmap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 100%;
          transform: translateX(-50%);
          background: repeating-linear-gradient(
            180deg,
            #facc15 0px,
            #facc15 16px,
            transparent 16px,
            transparent 28px
          );
        }
        .tt-drive-milestone {
          position: absolute;
          background: #facc15;
          color: #111827;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 6px 14px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
        .tt-drive-milestone:nth-child(1) {
          top: 24px;
          left: 20px;
        }
        .tt-drive-milestone:nth-child(2) {
          top: 50%;
          right: 20px;
          transform: translateY(-50%);
        }
        .tt-drive-milestone:nth-child(3) {
          bottom: 24px;
          left: 20px;
        }

        /* Right panel */
        .tt-drive-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tt-drive-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #0369a1;
          background: rgba(3, 105, 161, 0.08);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        /* Mini-cards */
        .tt-drive-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-drive-minicard {
          background: #fff;
          border: 1px solid rgba(17, 24, 39, 0.1);
          border-radius: 10px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-drive-minicard-icon {
          font-size: 1.4rem;
          margin-bottom: 6px;
        }
        .tt-drive-minicard-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Pricing */
        .tt-drive-pricing {
          background: #fff;
          border: 1px solid rgba(17, 24, 39, 0.1);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .tt-drive-pricing-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #111827;
          margin: 0 0 16px;
        }
        .tt-drive-pricing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(17, 24, 39, 0.06);
          font-size: 0.88rem;
        }
        .tt-drive-pricing-row:last-of-type {
          border-bottom: none;
        }
        .tt-drive-pricing-label {
          color: #4b5563;
        }
        .tt-drive-pricing-price {
          font-weight: 800;
          color: #111827;
        }

        /* Testimonial */
        .tt-drive-testimonial {
          background: rgba(250, 204, 21, 0.08);
          border-left: 3px solid #facc15;
          border-radius: 0 10px 10px 0;
          padding: 20px 22px;
          margin-bottom: 24px;
        }
        .tt-drive-testimonial-text {
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.65;
          color: #111827;
          margin: 0 0 8px;
        }
        .tt-drive-testimonial-author {
          font-size: 0.78rem;
          font-weight: 700;
          color: #0369a1;
        }

        /* Gallery */
        .tt-drive-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-drive-gallery-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tt-drive-gallery-img:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(17, 24, 39, 0.12);
        }

        .tt-drive-area {
          font-size: 0.8rem;
          color: #4b5563;
          margin-top: 8px;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tt-drive-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 36px;
          }
          .tt-drive-band {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .tt-drive-minicards {
            grid-template-columns: repeat(3, 1fr);
          }
          .tt-drive-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tt-drive-hero {
            padding: 32px 4vw 28px;
          }
          .tt-drive-watermark {
            font-size: 4.5rem;
            top: 16px;
          }
          .tt-drive-minicards {
            grid-template-columns: 1fr;
          }
          .tt-drive-gallery {
            grid-template-columns: 1fr;
          }
          .tt-drive-btn-row {
            flex-direction: column;
          }
          .tt-drive-band {
            padding: 0 4vw 48px;
          }
          .tt-drive-stats {
            gap: 18px;
          }
        }
      `}</style>

      <section className="tt-drive-root">
        <div className="tt-drive-watermark">PASS</div>

        {/* Hero */}
        <div className="tt-drive-hero">
          <div>
            <div className="tt-drive-eyebrow">Driving School</div>
            <h2>Calm, practical driving lessons that build safe habits.</h2>
            <div className="tt-drive-name-row">
              <h3>{name}</h3>
              {verified && <span className="tt-drive-verified" title="Verified">&#10003;</span>}
            </div>
            <p className="tt-drive-tagline">{tagline}</p>

            <div className="tt-drive-stats">
              <div className="tt-drive-stat">
                <div className="tt-drive-stat-value">96%</div>
                <div className="tt-drive-stat-label">Pass Rate</div>
              </div>
              <div className="tt-drive-stat">
                <div className="tt-drive-stat-value">Dual</div>
                <div className="tt-drive-stat-label">Brake Car</div>
              </div>
              <div className="tt-drive-stat">
                <div className="tt-drive-stat-value">7</div>
                <div className="tt-drive-stat-label">Cities Served</div>
              </div>
            </div>

            <div className="tt-drive-btn-row">
              <button className="tt-drive-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-drive-btn-dark">Area Served</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tt-drive-hero-photo" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} loading="lazy" />
            </div>
          )}
        </div>

        {/* Content Band */}
        <div className="tt-drive-band">
          {/* Left Panel */}
          <div>
            <p className="tt-drive-bio">{bio}</p>

            <div className="tt-drive-roadmap">
              <div className="tt-drive-milestone">Parking</div>
              <div className="tt-drive-milestone">Freeway</div>
              <div className="tt-drive-milestone">Road Test</div>
            </div>
          </div>

          {/* Right Panel */}
          <div>
            <div className="tt-drive-tags">
              {specialties.map((s) => (
                <span key={s} className="tt-drive-tag">{s}</span>
              ))}
            </div>

            <div className="tt-drive-minicards">
              <div className="tt-drive-minicard">
                <div className="tt-drive-minicard-icon">&#128663;</div>
                <div className="tt-drive-minicard-title">Beginner</div>
              </div>
              <div className="tt-drive-minicard">
                <div className="tt-drive-minicard-icon">&#128203;</div>
                <div className="tt-drive-minicard-title">Road Test</div>
              </div>
              <div className="tt-drive-minicard">
                <div className="tt-drive-minicard-icon">&#128260;</div>
                <div className="tt-drive-minicard-title">Refresher</div>
              </div>
            </div>

            <div className="tt-drive-pricing">
              <div className="tt-drive-pricing-title">Lesson Pricing</div>
              <div className="tt-drive-pricing-row">
                <span className="tt-drive-pricing-label">90 Minutes</span>
                <span className="tt-drive-pricing-price">$110</span>
              </div>
              <div className="tt-drive-pricing-row">
                <span className="tt-drive-pricing-label">6-Hour Package</span>
                <span className="tt-drive-pricing-price">$399</span>
              </div>
              <div className="tt-drive-pricing-row">
                <span className="tt-drive-pricing-label">Test Day Prep</span>
                <span className="tt-drive-pricing-price">$180</span>
              </div>
              {priceLabel && (
                <div style={{ marginTop: 10, fontSize: '0.8rem', color: '#0369a1', fontWeight: 700 }}>{priceLabel}</div>
              )}
            </div>

            <div className="tt-drive-testimonial">
              <p className="tt-drive-testimonial-text">"I was terrified of the freeway. After three lessons, I merged with confidence. Best instructor in the area."</p>
              <div className="tt-drive-testimonial-author">— New Driver, Age 17</div>
            </div>

            <div className="tt-drive-gallery">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tt-drive-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
            <div className="tt-drive-area">{serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
