// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingHomeschool(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-home";
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
        .tt-home {
          position: relative;
          background: linear-gradient(135deg, #fff7ed, #ecfccb);
          font-family: 'Inter', sans-serif;
          color: #1c1917;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-home::before {
          content: '\\2743';
          position: absolute;
          top: -20px;
          right: 40px;
          font-size: 280px;
          color: rgba(234, 88, 12, 0.05);
          pointer-events: none;
          line-height: 1;
          z-index: 0;
        }

        /* Hero */
        .tt-home-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .tt-home-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          color: #ea580c;
          margin-bottom: 12px;
        }
        .tt-home-hero h2 {
          margin: 0 0 14px;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #1c1917;
        }
        .tt-home-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #16a34a;
          color: white;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-home-hero p {
          margin: 0 0 24px;
          font-size: 15px;
          line-height: 1.7;
          color: #57534e;
          max-width: 520px;
        }
        .tt-home-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .tt-home-btn-primary {
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
          background: #16a34a;
          color: white;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-home-btn-primary:hover {
          background: #15803d;
          transform: translateY(-1px);
        }
        .tt-home-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #16a34a;
          border-radius: 8px;
          background: transparent;
          color: #16a34a;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-home-btn-secondary:hover {
          background: #16a34a;
          color: white;
        }

        /* Stats */
        .tt-home-stats {
          display: flex;
          gap: 32px;
        }
        .tt-home-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #1c1917;
        }
        .tt-home-stat-label {
          font-size: 11px;
          color: #78716c;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Photo Card */
        .tt-home-photo-card {
          position: relative;
          border-radius: 42px 12px 42px 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(22, 163, 74, 0.1);
          aspect-ratio: 4/5;
          max-height: 480px;
        }
        .tt-home-photo-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tt-home-photo-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #1c1917;
        }

        /* Content Band */
        .tt-home-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 5vw 64px;
          position: relative;
          z-index: 1;
        }

        /* Left Panel */
        .tt-home-left h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #1c1917;
        }
        .tt-home-left p {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #57534e;
        }

        /* Mini Cards */
        .tt-home-minicards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tt-home-minicard {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #d6d3d1;
          border-radius: 12px;
        }
        .tt-home-minicard-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tt-home-minicard h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #1c1917;
        }
        .tt-home-minicard p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #78716c;
        }

        /* Right Panel */
        .tt-home-right h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #1c1917;
        }

        /* Weekly Schedule */
        .tt-home-schedule {
          list-style: none;
          margin: 0 0 28px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tt-home-schedule li {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 12px;
          align-items: center;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #d6d3d1;
          border-radius: 10px;
          font-size: 14px;
        }
        .tt-home-schedule-day {
          font-weight: 700;
          color: #16a34a;
          font-size: 13px;
        }
        .tt-home-schedule-desc {
          color: #57534e;
          font-size: 13px;
        }

        /* Pricing */
        .tt-home-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .tt-home-price-card {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid #d6d3d1;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .tt-home-price-card h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #78716c;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tt-home-price-card .tt-home-price {
          font-size: 28px;
          font-weight: 800;
          color: #1c1917;
        }
        .tt-home-price-card p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #a8a29e;
        }

        /* Testimonial */
        .tt-home-testimonial {
          background: rgba(255, 255, 255, 0.7);
          border-left: 3px solid #16a34a;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #57534e;
        }
        .tt-home-testimonial cite {
          display: block;
          margin-top: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #1c1917;
        }

        /* Gallery */
        .tt-home-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-home-gallery-item {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #d6d3d1;
        }
        .tt-home-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-home-gallery-item:hover img {
          transform: scale(1.05);
        }

        .tt-home-location {
          font-size: 12px;
          color: #78716c;
          margin-top: 16px;
        }

        @media (max-width: 800px) {
          .tt-home-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 5vw 36px;
          }
          .tt-home-photo-card {
            max-height: 360px;
          }
          .tt-home-content {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px 5vw 48px;
          }
          .tt-home-pricing {
            grid-template-columns: 1fr;
          }
          .tt-home-schedule li {
            grid-template-columns: 1fr;
            gap: 4px;
          }
        }
        @media (max-width: 520px) {
          .tt-home-hero {
            padding: 28px 4vw 24px;
          }
          .tt-home-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .tt-home-btn-row {
            flex-direction: column;
          }
          .tt-home-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .tt-home-content {
            padding: 24px 4vw 36px;
          }
        }
      `}</style>
      <section className="tt-home">
        {/* Hero */}
        <div className="tt-home-hero">
          <div>
            <div className="tt-home-eyebrow">Homeschool Hub</div>
            <h2>
              {name}
              {verified && <span className="tt-home-verified" title="Verified">&#10003;</span>}
            </h2>
            <p>{tagline || "Warm, structured learning for homeschool families."}</p>
            <div className="tt-home-btn-row">
              <button className="tt-home-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-home-btn-secondary">View Curriculum</button>
            </div>
            <div className="tt-home-stats">
              <div>
                <div className="tt-home-stat-val">K-8</div>
                <div className="tt-home-stat-label">Grade Range</div>
              </div>
              <div>
                <div className="tt-home-stat-val">5★</div>
                <div className="tt-home-stat-label">Parent Rating</div>
              </div>
              <div>
                <div className="tt-home-stat-val">40+</div>
                <div className="tt-home-stat-label">Families Served</div>
              </div>
            </div>
          </div>
          <div className="tt-home-photo-card">
            {portfolio.length > 0 && (
              <>
                <img
                  src={portfolio?.[0].url}
                  alt={portfolio?.[0].filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
                <div className="tt-home-photo-overlay">
                  {specialties[0] || "Homeschool"} &bull; {serviceArea}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Band */}
        <div className="tt-home-content">
          {/* Left Panel */}
          <div className="tt-home-left">
            <h3>About</h3>
            <p>{bio}</p>
            <h3>Programs</h3>
            <div className="tt-home-minicards">
              <div className="tt-home-minicard">
                <div className="tt-home-minicard-icon">📖</div>
                <div>
                  <h4>Core Skills</h4>
                  <p>Reading, writing, math &amp; science foundations</p>
                </div>
              </div>
              <div className="tt-home-minicard">
                <div className="tt-home-minicard-icon">🎨</div>
                <div>
                  <h4>Enrichment</h4>
                  <p>Art, music, nature studies &amp; project-based learning</p>
                </div>
              </div>
              <div className="tt-home-minicard">
                <div className="tt-home-minicard-icon">👨‍👩‍👧</div>
                <div>
                  <h4>Parent Support</h4>
                  <p>Curriculum planning, record keeping &amp; coaching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="tt-home-right">
            <h3>Weekly Schedule</h3>
            <ul className="tt-home-schedule">
              <li>
                <span className="tt-home-schedule-day">Mon</span>
                <span className="tt-home-schedule-desc">Math &amp; Science (9am-11am)</span>
              </li>
              <li>
                <span className="tt-home-schedule-day">Wed</span>
                <span className="tt-home-schedule-desc">Language Arts &amp; History (9am-11am)</span>
              </li>
              <li>
                <span className="tt-home-schedule-day">Fri</span>
                <span className="tt-home-schedule-desc">Enrichment &amp; Projects (10am-12pm)</span>
              </li>
            </ul>

            <h3>Pricing</h3>
            <div className="tt-home-pricing">
              <div className="tt-home-price-card">
                <h4>Drop-in</h4>
                <div className="tt-home-price">$45</div>
                <p>Per session</p>
              </div>
              <div className="tt-home-price-card">
                <h4>Pod</h4>
                <div className="tt-home-price">$320</div>
                <p>Monthly (4 kids)</p>
              </div>
              <div className="tt-home-price-card">
                <h4>Family Plan</h4>
                <div className="tt-home-price">$580</div>
                <p>Monthly unlimited</p>
              </div>
            </div>

            {priceLabel && <p style={{ fontSize: 13, color: "#78716c", marginBottom: 16 }}>{priceLabel}</p>}

            <div className="tt-home-testimonial">
              "Our kids look forward to learning days now. The structured yet flexible approach is exactly what our family needed."
              <cite>-- Homeschool Parent</cite>
            </div>

            <h3>Gallery</h3>
            <div className="tt-home-gallery">
              {portfolio.slice(0, 6).map((photo, i) => (
                <div key={photo.id} className="tt-home-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="tt-home-location">&#128205; {serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
