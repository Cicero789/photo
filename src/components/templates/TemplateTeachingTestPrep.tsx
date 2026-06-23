// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingTestPrep(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-test";
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

  return (
    <>
      <style>{`
        .tt-test {
          position: relative;
          background: #0f172a;
          font-family: 'Inter', sans-serif;
          color: #f8fafc;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-test::before {
          content: '730 → 1510';
          position: absolute;
          top: 30px;
          right: -20px;
          font-size: 160px;
          font-weight: 900;
          color: rgba(249, 115, 22, 0.04);
          pointer-events: none;
          line-height: 1;
          z-index: 0;
          white-space: nowrap;
        }

        /* Hero */
        .tt-test-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .tt-test-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          color: #f97316;
          margin-bottom: 12px;
        }
        .tt-test-hero h2 {
          margin: 0 0 14px;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #f8fafc;
        }
        .tt-test-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #f97316;
          color: white;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-test-hero p {
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #cbd5e1;
          max-width: 520px;
        }
        .tt-test-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .tt-test-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: none;
          border-radius: 8px;
          background: #f97316;
          color: white;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-test-btn-primary:hover {
          background: #ea580c;
          transform: translateY(-1px);
        }
        .tt-test-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #f97316;
          border-radius: 8px;
          background: transparent;
          color: #f97316;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-test-btn-secondary:hover {
          background: #f97316;
          color: white;
        }

        /* Stats */
        .tt-test-stats {
          display: flex;
          gap: 32px;
        }
        .tt-test-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #f8fafc;
        }
        .tt-test-stat-label {
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Photo Card */
        .tt-test-photo-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          aspect-ratio: 4/5;
          max-height: 480px;
        }
        .tt-test-photo-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tt-test-photo-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #f8fafc;
        }

        /* Content Band */
        .tt-test-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 5vw 64px;
          position: relative;
          z-index: 1;
        }

        /* Left Panel */
        .tt-test-left h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
        }
        .tt-test-left p {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #cbd5e1;
        }

        /* Mini Cards */
        .tt-test-minicards {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .tt-test-minicard {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
        }
        .tt-test-minicard-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #f97316;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tt-test-minicard h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #f8fafc;
        }
        .tt-test-minicard p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #94a3b8;
        }

        /* Right Panel */
        .tt-test-right h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #f8fafc;
        }

        /* Pricing */
        .tt-test-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .tt-test-price-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .tt-test-price-card h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tt-test-price-card .tt-test-price {
          font-size: 28px;
          font-weight: 800;
          color: #f8fafc;
        }
        .tt-test-price-card p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #64748b;
        }

        /* Testimonial */
        .tt-test-testimonial {
          background: #1e293b;
          border-left: 3px solid #f97316;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #cbd5e1;
        }
        .tt-test-testimonial cite {
          display: block;
          margin-top: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #f8fafc;
        }

        /* Gallery */
        .tt-test-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-test-gallery-item {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #334155;
        }
        .tt-test-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-test-gallery-item:hover img {
          transform: scale(1.05);
        }

        .tt-test-location {
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
        }

        @media (max-width: 800px) {
          .tt-test-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 5vw 36px;
          }
          .tt-test-photo-card {
            max-height: 360px;
          }
          .tt-test-content {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px 5vw 48px;
          }
          .tt-test-pricing {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .tt-test-hero {
            padding: 28px 4vw 24px;
          }
          .tt-test-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .tt-test-btn-row {
            flex-direction: column;
          }
          .tt-test-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .tt-test-content {
            padding: 24px 4vw 36px;
          }
        }
      `}</style>
      <section className="tt-test">
        {/* Hero */}
        <div className="tt-test-hero">
          <div>
            <div className="tt-test-eyebrow">Test Prep Pro</div>
            <h2>
              {name}
              {verified && <span className="tt-test-verified" title="Verified">&#10003;</span>}
            </h2>
            <p>{tagline || "Higher scores. Smarter strategy. Less panic."}</p>
            <div className="tt-test-btn-row">
              <button className="tt-test-btn-primary" onClick={onHire}>Book a Session</button>
              <button className="tt-test-btn-secondary">View Programs</button>
            </div>
            <div className="tt-test-stats">
              <div className="tt-test-stat">
                <div className="tt-test-stat-val">+180</div>
                <div className="tt-test-stat-label">Avg SAT Gain</div>
              </div>
              <div className="tt-test-stat">
                <div className="tt-test-stat-val">93%</div>
                <div className="tt-test-stat-label">Goal Score Hit</div>
              </div>
              <div className="tt-test-stat">
                <div className="tt-test-stat-val">6wk</div>
                <div className="tt-test-stat-label">Crash Plans</div>
              </div>
            </div>
          </div>
          <div className="tt-test-photo-card">
            {portfolio.length > 0 && (
              <>
                <img
                  src={portfolio?.[0].url}
                  alt={portfolio?.[0].filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
                <div className="tt-test-photo-overlay">
                  {specialties[0] || "Test Prep"} &bull; {serviceArea}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Band */}
        <div className="tt-test-content">
          {/* Left Panel */}
          <div className="tt-test-left">
            <h3>Programs</h3>
            <div className="tt-test-minicards">
              <div className="tt-test-minicard">
                <div className="tt-test-minicard-icon">📝</div>
                <div>
                  <h4>SAT / ACT</h4>
                  <p>Strategic prep for top percentile scores</p>
                </div>
              </div>
              <div className="tt-test-minicard">
                <div className="tt-test-minicard-icon">🎓</div>
                <div>
                  <h4>GRE</h4>
                  <p>Quant &amp; verbal intensive bootcamps</p>
                </div>
              </div>
              <div className="tt-test-minicard">
                <div className="tt-test-minicard-icon">📚</div>
                <div>
                  <h4>AP Exams</h4>
                  <p>Subject-specific crash courses</p>
                </div>
              </div>
            </div>
            <h3>About</h3>
            <p>{bio}</p>
          </div>

          {/* Right Panel */}
          <div className="tt-test-right">
            <h3>Pricing</h3>
            <div className="tt-test-pricing">
              <div className="tt-test-price-card">
                <h4>Diagnostic</h4>
                <div className="tt-test-price">$95</div>
                <p>Full assessment</p>
              </div>
              <div className="tt-test-price-card">
                <h4>Target Plan</h4>
                <div className="tt-test-price">$720</div>
                <p>8-session block</p>
              </div>
              <div className="tt-test-price-card">
                <h4>Elite Plan</h4>
                <div className="tt-test-price">$1,350</div>
                <p>Full program</p>
              </div>
            </div>

            {priceLabel && <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>{priceLabel}</p>}

            <div className="tt-test-testimonial">
              "Went from a 1280 to 1510 on my SAT. The strategy sessions alone were worth every penny."
              <cite>-- Student Review</cite>
            </div>

            <h3>Gallery</h3>
            <div className="tt-test-gallery">
              {portfolio.slice(0, 6).map((photo, i) => (
                <div key={photo.id} className="tt-test-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="tt-test-location">&#128205; {serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
