import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingCoding(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-code";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap";
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

  const pills = ["Python", "JavaScript", "HTML/CSS", "React", "AI"];

  return (
    <>
      <style>{`
        .tt-code-root {
          position: relative;
          overflow: hidden;
          background: #020617;
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          line-height: 1.6;
        }

        /* Watermark */
        .tt-code-watermark {
          position: absolute;
          top: 40px;
          right: -10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10rem;
          font-weight: 700;
          color: rgba(34, 197, 94, 0.05);
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
        }

        /* Hero Grid */
        .tt-code-hero {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding: 64px 5vw 48px;
          align-items: center;
        }

        .tt-code-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #22c55e;
          margin-bottom: 12px;
        }

        .tt-code-hero h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.85rem, 4.2vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #e2e8f0;
          margin: 0 0 10px;
        }

        .tt-code-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .tt-code-name-row h3 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #e2e8f0;
        }

        .tt-code-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #22c55e;
          color: #020617;
          font-size: 12px;
          font-weight: 700;
          margin-left: 8px;
          vertical-align: middle;
        }

        .tt-code-tagline {
          font-size: 0.95rem;
          color: #94a3b8;
          margin-bottom: 18px;
        }

        /* Pill row */
        .tt-code-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 26px;
        }
        .tt-code-pill {
          font-size: 0.73rem;
          font-weight: 600;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.25);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .tt-code-btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tt-code-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #020617;
          background: #22c55e;
          border: 2px solid #22c55e;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-code-btn-primary:hover {
          background: #16a34a;
          transform: translateY(-1px);
        }

        .tt-code-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #e2e8f0;
          background: transparent;
          border: 2px solid #334155;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .tt-code-btn-ghost:hover {
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.08);
        }

        /* Hero photo card */
        .tt-code-hero-photo {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          border: 2px solid rgba(34, 197, 94, 0.2);
          cursor: pointer;
        }
        .tt-code-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 340px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-code-hero-photo:hover img {
          transform: scale(1.03);
        }

        /* Content band */
        .tt-code-band {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 5vw 64px;
        }

        /* Left panel */
        .tt-code-left {
          background: rgba(34, 197, 94, 0.03);
          border: 1px solid rgba(34, 197, 94, 0.12);
          border-radius: 12px;
          padding: 32px;
        }

        .tt-code-bio {
          font-size: 0.92rem;
          color: #94a3b8;
          line-height: 1.8;
          margin: 0 0 28px;
        }

        /* Terminal block */
        .tt-code-terminal {
          background: #020617;
          border: 2px solid #22c55e;
          border-radius: 10px;
          padding: 24px;
          font-family: 'Space Grotesk', monospace;
          overflow-x: auto;
        }
        .tt-code-terminal-header {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
        }
        .tt-code-terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .tt-code-terminal-dot:nth-child(1) { background: #ef4444; }
        .tt-code-terminal-dot:nth-child(2) { background: #eab308; }
        .tt-code-terminal-dot:nth-child(3) { background: #22c55e; }

        .tt-code-terminal-line {
          font-size: 0.85rem;
          line-height: 1.8;
          color: #a7f3d0;
        }
        .tt-code-terminal-line .tt-code-prompt {
          color: #22c55e;
          font-weight: 600;
        }
        .tt-code-terminal-line .tt-code-cmd {
          color: #e2e8f0;
        }

        /* Right panel */
        .tt-code-right {
          background: rgba(34, 197, 94, 0.03);
          border: 1px solid rgba(34, 197, 94, 0.12);
          border-radius: 12px;
          padding: 32px;
        }

        .tt-code-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tt-code-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        /* Mini-cards */
        .tt-code-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-code-minicard {
          background: #0f172a;
          border: 1px solid rgba(34, 197, 94, 0.15);
          border-radius: 10px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-code-minicard-icon {
          font-size: 1.4rem;
          margin-bottom: 6px;
        }
        .tt-code-minicard-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #e2e8f0;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Pricing */
        .tt-code-pricing {
          background: #0f172a;
          border: 1px solid rgba(34, 197, 94, 0.15);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .tt-code-pricing-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #e2e8f0;
          margin: 0 0 16px;
        }
        .tt-code-pricing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(34, 197, 94, 0.08);
          font-size: 0.88rem;
        }
        .tt-code-pricing-row:last-of-type {
          border-bottom: none;
        }
        .tt-code-pricing-label {
          color: #94a3b8;
        }
        .tt-code-pricing-price {
          font-weight: 700;
          color: #22c55e;
        }

        /* Testimonial */
        .tt-code-testimonial {
          background: rgba(34, 197, 94, 0.06);
          border-left: 3px solid #22c55e;
          border-radius: 0 10px 10px 0;
          padding: 20px 22px;
          margin-bottom: 24px;
        }
        .tt-code-testimonial-text {
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.65;
          color: #e2e8f0;
          margin: 0 0 8px;
        }
        .tt-code-testimonial-author {
          font-size: 0.78rem;
          font-weight: 700;
          color: #22c55e;
        }

        /* Gallery */
        .tt-code-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-code-gallery-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid rgba(34, 197, 94, 0.2);
          cursor: pointer;
          transition: transform 0.3s, border-color 0.3s;
        }
        .tt-code-gallery-img:hover {
          transform: translateY(-2px);
          border-color: #22c55e;
        }

        .tt-code-area {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 8px;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tt-code-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 36px;
          }
          .tt-code-band {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .tt-code-minicards {
            grid-template-columns: repeat(3, 1fr);
          }
          .tt-code-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tt-code-hero {
            padding: 32px 4vw 28px;
          }
          .tt-code-watermark {
            font-size: 5rem;
            top: 20px;
          }
          .tt-code-minicards {
            grid-template-columns: 1fr;
          }
          .tt-code-gallery {
            grid-template-columns: 1fr;
          }
          .tt-code-btn-row {
            flex-direction: column;
          }
          .tt-code-band {
            padding: 0 4vw 48px;
          }
          .tt-code-left,
          .tt-code-right {
            padding: 20px;
          }
        }
      `}</style>

      <section className="tt-code-root">
        <div className="tt-code-watermark">{"{ }"}</div>

        {/* Hero */}
        <div className="tt-code-hero">
          <div>
            <div className="tt-code-eyebrow">Code Academy</div>
            <h2>Learn to build real projects, not just watch tutorials.</h2>
            <div className="tt-code-name-row">
              <h3>{name}</h3>
              {verified && <span className="tt-code-verified" title="Verified">&#10003;</span>}
            </div>
            <p className="tt-code-tagline">{tagline}</p>

            <div className="tt-code-pills">
              {pills.map((p) => (
                <span key={p} className="tt-code-pill">{p}</span>
              ))}
            </div>

            <div className="tt-code-btn-row">
              <button className="tt-code-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-code-btn-ghost">View Projects</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tt-code-hero-photo" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} loading="lazy" />
            </div>
          )}
        </div>

        {/* Content Band */}
        <div className="tt-code-band">
          {/* Left Panel */}
          <div className="tt-code-left">
            <p className="tt-code-bio">{bio}</p>

            <div className="tt-code-terminal">
              <div className="tt-code-terminal-header">
                <div className="tt-code-terminal-dot" />
                <div className="tt-code-terminal-dot" />
                <div className="tt-code-terminal-dot" />
              </div>
              <div className="tt-code-terminal-line">
                <span className="tt-code-prompt">$ </span>
                <span className="tt-code-cmd">npx create-react-app my-portfolio</span>
              </div>
              <div className="tt-code-terminal-line">
                <span className="tt-code-prompt">$ </span>
                <span className="tt-code-cmd">python train_model.py --epochs 50</span>
              </div>
              <div className="tt-code-terminal-line">
                <span className="tt-code-prompt">$ </span>
                <span className="tt-code-cmd">git push origin main</span>
              </div>
              <div className="tt-code-terminal-line">
                <span className="tt-code-prompt">{'>'} </span>
                <span style={{ color: '#22c55e' }}>Build complete. Ship it!</span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="tt-code-right">
            <div className="tt-code-tags">
              {specialties.map((s) => (
                <span key={s} className="tt-code-tag">{s}</span>
              ))}
            </div>

            <div className="tt-code-minicards">
              <div className="tt-code-minicard">
                <div className="tt-code-minicard-icon">&#128118;</div>
                <div className="tt-code-minicard-title">Kids Code</div>
              </div>
              <div className="tt-code-minicard">
                <div className="tt-code-minicard-icon">&#128187;</div>
                <div className="tt-code-minicard-title">Teen Dev</div>
              </div>
              <div className="tt-code-minicard">
                <div className="tt-code-minicard-icon">&#127891;</div>
                <div className="tt-code-minicard-title">Adult Skills</div>
              </div>
            </div>

            <div className="tt-code-pricing">
              <div className="tt-code-pricing-title">Session Pricing</div>
              <div className="tt-code-pricing-row">
                <span className="tt-code-pricing-label">Intro Session</span>
                <span className="tt-code-pricing-price">$65</span>
              </div>
              <div className="tt-code-pricing-row">
                <span className="tt-code-pricing-label">8-Week Bootcamp</span>
                <span className="tt-code-pricing-price">$480</span>
              </div>
              <div className="tt-code-pricing-row">
                <span className="tt-code-pricing-label">Capstone Project</span>
                <span className="tt-code-pricing-price">$900</span>
              </div>
              {priceLabel && (
                <div style={{ marginTop: 10, fontSize: '0.8rem', color: '#22c55e', fontWeight: 700 }}>{priceLabel}</div>
              )}
            </div>

            <div className="tt-code-testimonial">
              <p className="tt-code-testimonial-text">"I went from zero coding experience to deploying my first web app in eight weeks. The project-based approach made everything click."</p>
              <div className="tt-code-testimonial-author">— Bootcamp Graduate</div>
            </div>

            <div className="tt-code-gallery">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tt-code-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
            <div className="tt-code-area">{serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
