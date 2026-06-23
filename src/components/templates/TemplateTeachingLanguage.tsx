// @ts-nocheck
import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingLanguage(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-lang";
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

  const defaultLanguages = ["Spanish", "French", "Mandarin", "English", "Italian"];
  const languages = specialties.length > 0 ? specialties : defaultLanguages;

  return (
    <>
      <style>{`
        .tt-lang {
          position: relative;
          background: linear-gradient(120deg, #eff6ff 0%, #fff 35%, #fff1f2 100%);
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          min-height: 100vh;
          overflow: hidden;
        }
        .tt-lang::before {
          content: 'Hola \\2022  Bonjour \\2022  \\4f60\\597d  \\2022  Ciao';
          position: absolute;
          top: 20px;
          right: -40px;
          font-size: 72px;
          font-weight: 900;
          color: rgba(220, 38, 38, 0.03);
          pointer-events: none;
          line-height: 1;
          z-index: 0;
          white-space: nowrap;
        }

        /* Hero */
        .tt-lang-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 64px 5vw 56px;
          position: relative;
          z-index: 1;
          align-items: center;
        }
        .tt-lang-eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 11px;
          font-weight: 700;
          color: #1d4ed8;
          margin-bottom: 12px;
        }
        .tt-lang-hero h2 {
          margin: 0 0 14px;
          font-size: clamp(26px, 3.8vw, 46px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #0f172a;
        }
        .tt-lang-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1d4ed8;
          color: white;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }
        .tt-lang-hero > div > p {
          margin: 0 0 18px;
          font-size: 15px;
          line-height: 1.7;
          color: #475569;
          max-width: 520px;
        }

        /* Pill Row */
        .tt-lang-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tt-lang-pill {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          font-size: 12px;
          font-weight: 600;
          color: #1d4ed8;
        }

        .tt-lang-btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .tt-lang-btn-primary {
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
          background: #dc2626;
          color: white;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-lang-btn-primary:hover {
          background: #b91c1c;
          transform: translateY(-1px);
        }
        .tt-lang-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 28px;
          font: inherit;
          font-weight: 600;
          font-size: 14px;
          border: 2px solid #1d4ed8;
          border-radius: 8px;
          background: transparent;
          color: #1d4ed8;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-lang-btn-secondary:hover {
          background: #1d4ed8;
          color: white;
        }

        /* Stats */
        .tt-lang-stats {
          display: flex;
          gap: 32px;
        }
        .tt-lang-stat-val {
          font-size: 22px;
          font-weight: 800;
          color: #0f172a;
        }
        .tt-lang-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Photo Card */
        .tt-lang-photo-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(29, 78, 216, 0.1);
          aspect-ratio: 4/5;
          max-height: 480px;
        }
        .tt-lang-photo-card img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .tt-lang-photo-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #0f172a;
        }

        /* Content Band */
        .tt-lang-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 48px 5vw 64px;
          position: relative;
          z-index: 1;
        }

        /* Left Panel */
        .tt-lang-left h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }
        .tt-lang-left p {
          margin: 0 0 28px;
          font-size: 14px;
          line-height: 1.75;
          color: #475569;
        }

        /* Level Ladder */
        .tt-lang-ladder {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tt-lang-ladder-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          font-weight: 600;
        }
        .tt-lang-ladder-label {
          width: 28px;
          flex-shrink: 0;
          color: #64748b;
        }
        .tt-lang-ladder-bar {
          height: 10px;
          border-radius: 5px;
          background: linear-gradient(90deg, #1d4ed8, #dc2626);
        }

        /* Right Panel */
        .tt-lang-right h3 {
          margin: 0 0 16px;
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
        }

        /* Mini Cards */
        .tt-lang-minicards {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .tt-lang-minicard {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }
        .tt-lang-minicard-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #1d4ed8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .tt-lang-minicard h4 {
          margin: 0;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
        }
        .tt-lang-minicard p {
          margin: 2px 0 0;
          font-size: 12px;
          color: #64748b;
        }

        /* Pricing */
        .tt-lang-pricing {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .tt-lang-price-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 20px 16px;
          text-align: center;
        }
        .tt-lang-price-card h4 {
          margin: 0 0 4px;
          font-size: 13px;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tt-lang-price-card .tt-lang-price {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
        }
        .tt-lang-price-card p {
          margin: 6px 0 0;
          font-size: 12px;
          color: #94a3b8;
        }

        /* Testimonial */
        .tt-lang-testimonial {
          background: white;
          border-left: 3px solid #dc2626;
          border-radius: 0 12px 12px 0;
          padding: 20px 24px;
          margin-bottom: 32px;
          font-size: 14px;
          font-style: italic;
          line-height: 1.7;
          color: #475569;
        }
        .tt-lang-testimonial cite {
          display: block;
          margin-top: 8px;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          color: #0f172a;
        }

        /* Gallery */
        .tt-lang-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-lang-gallery-item {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid #e2e8f0;
        }
        .tt-lang-gallery-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-lang-gallery-item:hover img {
          transform: scale(1.05);
        }

        .tt-lang-location {
          font-size: 12px;
          color: #64748b;
          margin-top: 16px;
        }

        @media (max-width: 800px) {
          .tt-lang-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 40px 5vw 36px;
          }
          .tt-lang-photo-card {
            max-height: 360px;
          }
          .tt-lang-content {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px 5vw 48px;
          }
          .tt-lang-pricing {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 520px) {
          .tt-lang-hero {
            padding: 28px 4vw 24px;
          }
          .tt-lang-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .tt-lang-btn-row {
            flex-direction: column;
          }
          .tt-lang-pills {
            gap: 6px;
          }
          .tt-lang-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
          .tt-lang-content {
            padding: 24px 4vw 36px;
          }
        }
      `}</style>
      <section className="tt-lang">
        {/* Hero */}
        <div className="tt-lang-hero">
          <div>
            <div className="tt-lang-eyebrow">Language Mentor</div>
            <h2>
              {name}
              {verified && <span className="tt-lang-verified" title="Verified">&#10003;</span>}
            </h2>
            <p>{tagline || "Speak with confidence, not just flashcards."}</p>
            <div className="tt-lang-pills">
              {languages.map((lang, i) => (
                <span key={i} className="tt-lang-pill">{lang}</span>
              ))}
            </div>
            <div className="tt-lang-btn-row">
              <button className="tt-lang-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-lang-btn-secondary">View Programs</button>
            </div>
            <div className="tt-lang-stats">
              <div>
                <div className="tt-lang-stat-val">5+</div>
                <div className="tt-lang-stat-label">Languages</div>
              </div>
              <div>
                <div className="tt-lang-stat-val">200+</div>
                <div className="tt-lang-stat-label">Students</div>
              </div>
              <div>
                <div className="tt-lang-stat-val">98%</div>
                <div className="tt-lang-stat-label">Pass Rate</div>
              </div>
            </div>
          </div>
          <div className="tt-lang-photo-card">
            {portfolio.length > 0 && (
              <>
                <img
                  src={portfolio?.[0].url}
                  alt={portfolio?.[0].filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(0)}
                  style={{ cursor: "pointer" }}
                />
                <div className="tt-lang-photo-overlay">
                  {specialties[0] || "Language Mentor"} &bull; {serviceArea}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Band */}
        <div className="tt-lang-content">
          {/* Left Panel */}
          <div className="tt-lang-left">
            <h3>About</h3>
            <p>{bio}</p>
            <h3>Proficiency Levels</h3>
            <div className="tt-lang-ladder">
              <div className="tt-lang-ladder-item">
                <span className="tt-lang-ladder-label">B2</span>
                <div className="tt-lang-ladder-bar" style={{ width: "100%" }} />
              </div>
              <div className="tt-lang-ladder-item">
                <span className="tt-lang-ladder-label">B1</span>
                <div className="tt-lang-ladder-bar" style={{ width: "80%" }} />
              </div>
              <div className="tt-lang-ladder-item">
                <span className="tt-lang-ladder-label">A2</span>
                <div className="tt-lang-ladder-bar" style={{ width: "55%" }} />
              </div>
              <div className="tt-lang-ladder-item">
                <span className="tt-lang-ladder-label">A1</span>
                <div className="tt-lang-ladder-bar" style={{ width: "30%" }} />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="tt-lang-right">
            <h3>Focus Areas</h3>
            <div className="tt-lang-minicards">
              <div className="tt-lang-minicard">
                <div className="tt-lang-minicard-icon">&#x2708;&#xFE0F;</div>
                <div>
                  <h4>Travel Talk</h4>
                  <p>Conversational survival skills for travelers</p>
                </div>
              </div>
              <div className="tt-lang-minicard">
                <div className="tt-lang-minicard-icon">&#x1F4BC;</div>
                <div>
                  <h4>Work Fluency</h4>
                  <p>Business communication &amp; professional vocabulary</p>
                </div>
              </div>
              <div className="tt-lang-minicard">
                <div className="tt-lang-minicard-icon">&#x1F4CB;</div>
                <div>
                  <h4>Exam Prep</h4>
                  <p>DELE, DELF, HSK &amp; other certification prep</p>
                </div>
              </div>
            </div>

            <h3>Pricing</h3>
            <div className="tt-lang-pricing">
              <div className="tt-lang-price-card">
                <h4>Trial</h4>
                <div className="tt-lang-price">$30</div>
                <p>30-min session</p>
              </div>
              <div className="tt-lang-price-card">
                <h4>Private</h4>
                <div className="tt-lang-price">$60</div>
                <p>60-min 1-on-1</p>
              </div>
              <div className="tt-lang-price-card">
                <h4>Group</h4>
                <div className="tt-lang-price">$25</div>
                <p>Per person</p>
              </div>
            </div>

            {priceLabel && <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{priceLabel}</p>}

            <div className="tt-lang-testimonial">
              "I went from barely ordering coffee in Spanish to having full conversations in three months. The immersive approach really works."
              <cite>-- Student Review</cite>
            </div>

            <h3>Gallery</h3>
            <div className="tt-lang-gallery">
              {portfolio.slice(0, 6).map((photo, i) => (
                <div key={photo.id} className="tt-lang-gallery-item" onClick={() => onPhotoClick(i)}>
                  <img src={photo.url} alt={photo.filename} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="tt-lang-location">&#128205; {serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
