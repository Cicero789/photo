// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingTutor(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-tutor";
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
        .tt-tutor {
          position: relative;
          background: linear-gradient(180deg, #ffffff, #edf4ff);
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-tutor::before {
          content: 'A+';
          position: absolute;
          top: -40px;
          right: -30px;
          font-size: 320px;
          font-weight: 900;
          color: rgba(37, 99, 235, 0.04);
          pointer-events: none;
          line-height: 1;
          z-index: 0;
        }

        /* Hero Grid */
        .tt-tutor-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .tt-tutor-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 12px;
        }
        .tt-tutor-hero h2 {
          margin: 0 0 14px;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #0f172a;
        }
        .tt-tutor-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-tutor-hero p {
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          max-width: 520px;
        }
        .tt-tutor-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .tt-tutor-btn-primary {
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
          background: #2563eb;
          color: white;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-tutor-btn-primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }
        .tt-tutor-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #2563eb;
          border-radius: 8px;
          background: transparent;
          color: #2563eb;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-tutor-btn-secondary:hover {
          background: #2563eb;
          color: white;
        }

        /* Stat Row */
        .tt-tutor-stats {
          display: flex;
          gap: 32px;
        }
        .tt-tutor-stat {
          text-align: left;
        }
        .tt-tutor-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
        }
        .tt-tutor-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Photo Card */
        .tt-tutor-photo-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(37, 99, 235, 0.12);
          aspect-ratio: 4/5;
          max-height: 480px;
        }
        .tt-tutor-photo-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tt-tutor-photo-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
        }

        /* Content Band */
        .tt-tutor-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 5vw 64px;
          position: relative;
          z-index: 1;
        }

        /* Left Panel */
        .tt-tutor-left h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }
        .tt-tutor-left p {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #475569;
        }

        /* Subjects Table */
        .tt-tutor-subjects {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tt-tutor-subjects li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
        }
        .tt-tutor-subjects li span {
          font-size: 12px;
          color: #2563eb;
          font-weight: 600;
        }

        /* Right Panel */
        .tt-tutor-right h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }

        /* Pricing 3-col */
        .tt-tutor-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .tt-tutor-price-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .tt-tutor-price-card h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tt-tutor-price-card .tt-tutor-price {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }
        .tt-tutor-price-card p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #94a3b8;
        }

        /* Testimonial */
        .tt-tutor-testimonial {
          background: white;
          border-left: 3px solid #2563eb;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #475569;
        }
        .tt-tutor-testimonial cite {
          display: block;
          margin-top: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #0f172a;
        }

        /* Gallery 3-col */
        .tt-tutor-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-tutor-gallery-item {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }
        .tt-tutor-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-tutor-gallery-item:hover img {
          transform: scale(1.05);
        }

        .tt-tutor-location {
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
        }

        @media (max-width: 800px) {
          .tt-tutor-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 5vw 36px;
          }
          .tt-tutor-photo-card {
            max-height: 360px;
          }
          .tt-tutor-content {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px 5vw 48px;
          }
          .tt-tutor-pricing {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .tt-tutor-hero {
            padding: 28px 4vw 24px;
          }
          .tt-tutor-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .tt-tutor-btn-row {
            flex-direction: column;
          }
          .tt-tutor-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .tt-tutor-content {
            padding: 24px 4vw 36px;
          }
        }
      `}</style>
      <section className="tt-tutor">
        {/* Hero Grid */}
        <div className="tt-tutor-hero">
          <div>
            <div className="tt-tutor-eyebrow">Academic Tutor</div>
            <h2>
              {name}
              {verified && <span className="tt-tutor-verified" title="Verified">&#10003;</span>}
            </h2>
            <p>{tagline}</p>
            <div className="tt-tutor-btn-row">
              <button className="tt-tutor-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-tutor-btn-secondary">View Subjects</button>
            </div>
            <div className="tt-tutor-stats">
              <div className="tt-tutor-stat">
                <div className="tt-tutor-stat-val">4.9★</div>
                <div className="tt-tutor-stat-label">Rating</div>
              </div>
              <div className="tt-tutor-stat">
                <div className="tt-tutor-stat-val">12+</div>
                <div className="tt-tutor-stat-label">Subjects</div>
              </div>
              <div className="tt-tutor-stat">
                <div className="tt-tutor-stat-val">24hr</div>
                <div className="tt-tutor-stat-label">Homework Help</div>
              </div>
            </div>
          </div>
          <div className="tt-tutor-photo-card">
            {portfolio.length > 0 && (
              <>
                <img
                  src={portfolio?.[0].url}
                  alt={portfolio?.[0].filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
                <div className="tt-tutor-photo-overlay">
                  {specialties[0] || "Academic Tutor"} &bull; {serviceArea}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Band */}
        <div className="tt-tutor-content">
          {/* Left Panel */}
          <div className="tt-tutor-left">
            <h3>About</h3>
            <p>{bio}</p>
            <h3>Subjects</h3>
            <ul className="tt-tutor-subjects">
              {specialties.map((s, i) => (
                <li key={i}>
                  {s}
                  <span>Available</span>
                </li>
              ))}
              {specialties.length === 0 && (
                <>
                  <li>Mathematics <span>Available</span></li>
                  <li>Physics <span>Available</span></li>
                  <li>Chemistry <span>Available</span></li>
                  <li>English <span>Available</span></li>
                </>
              )}
            </ul>
          </div>

          {/* Right Panel */}
          <div className="tt-tutor-right">
            <h3>Pricing</h3>
            <div className="tt-tutor-pricing">
              <div className="tt-tutor-price-card">
                <h4>Single</h4>
                <div className="tt-tutor-price">{pricing?.downloads?.single ? `$${pricing?.downloads?.single}` : "$55"}</div>
                <p>Per session</p>
              </div>
              <div className="tt-tutor-price-card">
                <h4>5-Pack</h4>
                <div className="tt-tutor-price">{pricing?.downloads?.full ? `$${pricing?.downloads?.full}` : "$240"}</div>
                <p>Save 12%</p>
              </div>
              <div className="tt-tutor-price-card">
                <h4>Monthly</h4>
                <div className="tt-tutor-price">$420</div>
                <p>Unlimited</p>
              </div>
            </div>

            {priceLabel && <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{priceLabel}</p>}

            <div className="tt-tutor-testimonial">
              "My daughter's math grade went from a C to an A in just two months. Absolutely transformative teaching."
              <cite>-- Parent Review</cite>
            </div>

            <h3>Gallery</h3>
            <div className="tt-tutor-gallery">
              {portfolio.slice(0, 6).map((photo, i) => (
                <div key={photo.id} className="tt-tutor-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="tt-tutor-location">&#128205; {serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
