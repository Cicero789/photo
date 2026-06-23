// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingAdmissions(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-college";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap";
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
        .tt-college {
          position: relative;
          background: linear-gradient(135deg, #071a35, #0a2a53);
          font-family: 'Inter', sans-serif;
          color: #ffffff;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-college::after {
          content: '';
          position: absolute;
          bottom: -120px;
          right: -120px;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Hero */
        .tt-college-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .tt-college-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 12px;
        }
        .tt-college-hero h2 {
          margin: 0 0 14px;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #ffffff;
        }
        .tt-college-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d4af37;
          color: #071a35;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-college-hero p {
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #94a3b8;
          max-width: 520px;
        }
        .tt-college-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .tt-college-btn-primary {
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
          background: #d4af37;
          color: #071a35;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-college-btn-primary:hover {
          background: #c4a030;
          transform: translateY(-1px);
        }
        .tt-college-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #d4af37;
          border-radius: 8px;
          background: transparent;
          color: #d4af37;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-college-btn-secondary:hover {
          background: #d4af37;
          color: #071a35;
        }

        /* Stats */
        .tt-college-stats {
          display: flex;
          gap: 32px;
        }
        .tt-college-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
        }
        .tt-college-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Photo Card */
        .tt-college-photo-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          aspect-ratio: 4/5;
          max-height: 480px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .tt-college-photo-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tt-college-photo-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(7, 26, 53, 0.88);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #d4af37;
        }

        /* Content Band */
        .tt-college-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 5vw 64px;
          position: relative;
          z-index: 1;
        }

        /* Left Panel */
        .tt-college-left h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #ffffff;
        }
        .tt-college-left p {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #94a3b8;
        }

        /* Timeline */
        .tt-college-timeline {
          list-style: none;
          margin: 0;
          padding: 0 0 0 20px;
          border-left: 2px solid #d4af37;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .tt-college-timeline li {
          position: relative;
          padding-left: 20px;
        }
        .tt-college-timeline li::before {
          content: '';
          position: absolute;
          left: -27px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #d4af37;
          border: 2px solid #071a35;
        }
        .tt-college-timeline-phase {
          font-size: 12px;
          font-weight: 700;
          color: #d4af37;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .tt-college-timeline-desc {
          font-size: 14px;
          color: #cbd5e1;
          margin-top: 4px;
          line-height: 1.6;
        }

        /* Right Panel */
        .tt-college-right h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #ffffff;
        }

        /* Pricing */
        .tt-college-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .tt-college-price-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .tt-college-price-card h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tt-college-price-card .tt-college-price {
          font-size: 26px;
          font-weight: 800;
          color: #d4af37;
        }
        .tt-college-price-card p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #64748b;
        }

        /* Testimonial */
        .tt-college-testimonial {
          background: rgba(255, 255, 255, 0.04);
          border-left: 3px solid #d4af37;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #94a3b8;
        }
        .tt-college-testimonial cite {
          display: block;
          margin-top: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
        }

        /* Gallery */
        .tt-college-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-college-gallery-item {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(212, 175, 55, 0.15);
        }
        .tt-college-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-college-gallery-item:hover img {
          transform: scale(1.05);
        }

        .tt-college-location {
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
        }

        @media (max-width: 800px) {
          .tt-college-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 5vw 36px;
          }
          .tt-college-photo-card {
            max-height: 360px;
          }
          .tt-college-content {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px 5vw 48px;
          }
          .tt-college-pricing {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .tt-college-hero {
            padding: 28px 4vw 24px;
          }
          .tt-college-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .tt-college-btn-row {
            flex-direction: column;
          }
          .tt-college-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .tt-college-content {
            padding: 24px 4vw 36px;
          }
        }
      `}</style>
      <section className="tt-college">
        {/* Hero */}
        <div className="tt-college-hero">
          <div>
            <div className="tt-college-eyebrow">College Admissions Guide</div>
            <h2>
              {name}
              {verified && <span className="tt-college-verified" title="Verified">&#10003;</span>}
            </h2>
            <p>{tagline || "Shape a stronger application story."}</p>
            <div className="tt-college-btn-row">
              <button className="tt-college-btn-primary" onClick={onHire}>Book a Consultation</button>
              <button className="tt-college-btn-secondary">View Services</button>
            </div>
            <div className="tt-college-stats">
              <div>
                <div className="tt-college-stat-val">87%</div>
                <div className="tt-college-stat-label">Top 3 Admits</div>
              </div>
              <div>
                <div className="tt-college-stat-val">140+</div>
                <div className="tt-college-stat-label">Essays Edited</div>
              </div>
              <div>
                <div className="tt-college-stat-val">$2.1M</div>
                <div className="tt-college-stat-label">Scholarships</div>
              </div>
            </div>
          </div>
          <div className="tt-college-photo-card">
            {portfolio.length > 0 && (
              <>
                <img
                  src={portfolio?.[0].url}
                  alt={portfolio?.[0].filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
                <div className="tt-college-photo-overlay">
                  {specialties[0] || "College Admissions"} &bull; {serviceArea}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Band */}
        <div className="tt-college-content">
          {/* Left Panel */}
          <div className="tt-college-left">
            <h3>About</h3>
            <p>{bio}</p>
            <h3>Application Timeline</h3>
            <ul className="tt-college-timeline">
              <li>
                <div className="tt-college-timeline-phase">Junior Spring</div>
                <div className="tt-college-timeline-desc">School list research, extracurricular strategy, and initial essay brainstorming</div>
              </li>
              <li>
                <div className="tt-college-timeline-phase">Junior Summer</div>
                <div className="tt-college-timeline-desc">Personal statement drafting, activity list refinement, and teacher recommendation requests</div>
              </li>
              <li>
                <div className="tt-college-timeline-phase">Senior Fall</div>
                <div className="tt-college-timeline-desc">Application submission, supplement essays, interview preparation, and financial aid applications</div>
              </li>
            </ul>
          </div>

          {/* Right Panel */}
          <div className="tt-college-right">
            <h3>Pricing</h3>
            <div className="tt-college-pricing">
              <div className="tt-college-price-card">
                <h4>Essay Review</h4>
                <div className="tt-college-price">$350</div>
                <p>Per essay</p>
              </div>
              <div className="tt-college-price-card">
                <h4>Application</h4>
                <div className="tt-college-price">$1,900</div>
                <p>Full app support</p>
              </div>
              <div className="tt-college-price-card">
                <h4>Complete</h4>
                <div className="tt-college-price">$4,800</div>
                <p>End-to-end</p>
              </div>
            </div>

            {priceLabel && <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>{priceLabel}</p>}

            <div className="tt-college-testimonial">
              "She helped my son craft a compelling narrative that got him into his dream school with a merit scholarship. Worth every penny."
              <cite>-- Parent of Stanford Admit</cite>
            </div>

            <h3>Gallery</h3>
            <div className="tt-college-gallery">
              {portfolio.slice(0, 6).map((photo, i) => (
                <div key={photo.id} className="tt-college-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="tt-college-location">&#128205; {serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
