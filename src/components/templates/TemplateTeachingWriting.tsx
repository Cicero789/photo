import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingWriting(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-write";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap";
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
        .tt-write-root {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg, #fcfbf7, #ffffff);
          color: #3f2a25;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          line-height: 1.6;
        }

        /* Watermark */
        .tt-write-watermark {
          position: absolute;
          top: 40px;
          right: -20px;
          font-family: 'Crimson Text', serif;
          font-size: 8rem;
          font-weight: 700;
          color: rgba(127, 29, 29, 0.04);
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        /* Hero Grid */
        .tt-write-hero {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding: 64px 5vw 48px;
          align-items: center;
        }

        .tt-write-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7f1d1d;
          margin-bottom: 12px;
        }

        .tt-write-hero h2 {
          font-family: 'Crimson Text', serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          line-height: 1.15;
          color: #3f2a25;
          margin: 0 0 10px;
        }

        .tt-write-tagline {
          font-size: 0.95rem;
          color: #6b5147;
          margin-bottom: 28px;
        }

        .tt-write-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #7f1d1d;
          color: #fff;
          font-size: 12px;
          margin-left: 8px;
          vertical-align: middle;
        }

        .tt-write-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .tt-write-name-row h3 {
          margin: 0;
          font-family: 'Crimson Text', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #3f2a25;
        }

        .tt-write-btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tt-write-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #fff;
          background: #7f1d1d;
          border: 2px solid #7f1d1d;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .tt-write-btn-primary:hover {
          background: #5c1414;
          transform: translateY(-1px);
        }

        .tt-write-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 600;
          color: #7f1d1d;
          background: transparent;
          border: 2px solid #7f1d1d;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tt-write-btn-ghost:hover {
          background: #7f1d1d;
          color: #fff;
        }

        /* Hero photo card */
        .tt-write-hero-photo {
          position: relative;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 12px 12px 0 rgba(127, 29, 29, 0.14);
          cursor: pointer;
        }
        .tt-write-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 340px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-write-hero-photo:hover img {
          transform: scale(1.03);
        }

        /* Content band */
        .tt-write-band {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 5vw 64px;
        }

        /* Left panel */
        .tt-write-left {}

        .tt-write-bio {
          font-size: 0.92rem;
          color: #6b5147;
          line-height: 1.8;
          margin: 0 0 28px;
        }

        /* Mini-cards */
        .tt-write-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }
        .tt-write-minicard {
          background: #fff;
          border: 1px solid rgba(127, 29, 29, 0.12);
          border-radius: 8px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-write-minicard-icon {
          font-size: 1.4rem;
          margin-bottom: 6px;
        }
        .tt-write-minicard-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #3f2a25;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* Manuscript block */
        .tt-write-manuscript {
          background: #fff;
          border: 2px solid #7f1d1d;
          border-radius: 6px;
          padding: 24px 28px;
        }
        .tt-write-manuscript-title {
          font-family: 'Crimson Text', serif;
          font-size: 0.82rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #7f1d1d;
          margin-bottom: 14px;
        }
        .tt-write-manuscript-line {
          font-family: 'Crimson Text', serif;
          font-size: 1.25rem;
          line-height: 1.7;
          color: #3f2a25;
          padding: 10px 0;
          border-bottom: 1px solid rgba(127, 29, 29, 0.1);
        }
        .tt-write-manuscript-line:last-child {
          border-bottom: none;
        }

        /* Right panel */
        .tt-write-right {}

        /* Specialties tags */
        .tt-write-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tt-write-tag {
          font-size: 0.75rem;
          font-weight: 500;
          color: #7f1d1d;
          background: rgba(127, 29, 29, 0.08);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        /* Pricing */
        .tt-write-pricing {
          background: #fff;
          border: 1px solid rgba(127, 29, 29, 0.12);
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .tt-write-pricing-title {
          font-family: 'Crimson Text', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #3f2a25;
          margin: 0 0 16px;
        }
        .tt-write-pricing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(127, 29, 29, 0.08);
          font-size: 0.88rem;
        }
        .tt-write-pricing-row:last-child {
          border-bottom: none;
        }
        .tt-write-pricing-label {
          color: #6b5147;
        }
        .tt-write-pricing-price {
          font-weight: 700;
          color: #7f1d1d;
        }

        /* Testimonial */
        .tt-write-testimonial {
          background: rgba(127, 29, 29, 0.04);
          border-left: 3px solid #7f1d1d;
          border-radius: 0 8px 8px 0;
          padding: 20px 22px;
          margin-bottom: 24px;
        }
        .tt-write-testimonial-text {
          font-family: 'Crimson Text', serif;
          font-style: italic;
          font-size: 1.05rem;
          line-height: 1.65;
          color: #3f2a25;
          margin: 0 0 8px;
        }
        .tt-write-testimonial-author {
          font-size: 0.78rem;
          font-weight: 600;
          color: #7f1d1d;
        }

        /* Gallery */
        .tt-write-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-write-gallery-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          box-shadow: 6px 6px 0 rgba(127, 29, 29, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tt-write-gallery-img:hover {
          transform: translateY(-2px);
          box-shadow: 8px 10px 0 rgba(127, 29, 29, 0.12);
        }

        .tt-write-area {
          font-size: 0.8rem;
          color: #6b5147;
          margin-top: 8px;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tt-write-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 36px;
          }
          .tt-write-band {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .tt-write-minicards {
            grid-template-columns: repeat(3, 1fr);
          }
          .tt-write-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tt-write-hero {
            padding: 32px 4vw 28px;
          }
          .tt-write-watermark {
            font-size: 4rem;
            top: 20px;
          }
          .tt-write-minicards {
            grid-template-columns: 1fr;
          }
          .tt-write-gallery {
            grid-template-columns: 1fr;
          }
          .tt-write-btn-row {
            flex-direction: column;
          }
          .tt-write-band {
            padding: 0 4vw 48px;
          }
        }
      `}</style>

      <section className="tt-write-root">
        <div className="tt-write-watermark">Chapter 01</div>

        {/* Hero */}
        <div className="tt-write-hero">
          <div>
            <div className="tt-write-eyebrow">Writing Workshop</div>
            <h2>Turn rough drafts into writing with a pulse.</h2>
            <div className="tt-write-name-row">
              <h3>{name}</h3>
              {verified && <span className="tt-write-verified" title="Verified">&#10003;</span>}
            </div>
            <p className="tt-write-tagline">{tagline}</p>
            <div className="tt-write-btn-row">
              <button className="tt-write-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-write-btn-ghost">Read Student Work</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tt-write-hero-photo" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} loading="lazy" />
            </div>
          )}
        </div>

        {/* Content Band */}
        <div className="tt-write-band">
          {/* Left Panel */}
          <div className="tt-write-left">
            <p className="tt-write-bio">{bio}</p>

            <div className="tt-write-minicards">
              <div className="tt-write-minicard">
                <div className="tt-write-minicard-icon">&#128218;</div>
                <div className="tt-write-minicard-title">Academic</div>
              </div>
              <div className="tt-write-minicard">
                <div className="tt-write-minicard-icon">&#9997;&#65039;</div>
                <div className="tt-write-minicard-title">Creative</div>
              </div>
              <div className="tt-write-minicard">
                <div className="tt-write-minicard-icon">&#128214;</div>
                <div className="tt-write-minicard-title">Published Work</div>
              </div>
            </div>

            <div className="tt-write-manuscript">
              <div className="tt-write-manuscript-title">Sample Manuscript</div>
              <div className="tt-write-manuscript-line">The opening line is where trust is built or broken.</div>
              <div className="tt-write-manuscript-line">Every paragraph should earn the next one.</div>
              <div className="tt-write-manuscript-line">Revision isn&#39;t fixing mistakes &#8212; it&#39;s finding the story.</div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="tt-write-right">
            <div className="tt-write-tags">
              {specialties.map((s) => (
                <span key={s} className="tt-write-tag">{s}</span>
              ))}
            </div>

            <div className="tt-write-pricing">
              <div className="tt-write-pricing-title">Session Pricing</div>
              <div className="tt-write-pricing-row">
                <span className="tt-write-pricing-label">Draft Review</span>
                <span className="tt-write-pricing-price">$95</span>
              </div>
              <div className="tt-write-pricing-row">
                <span className="tt-write-pricing-label">Private Session</span>
                <span className="tt-write-pricing-price">$70</span>
              </div>
              <div className="tt-write-pricing-row">
                <span className="tt-write-pricing-label">Manuscript Coaching</span>
                <span className="tt-write-pricing-price">$650</span>
              </div>
              {priceLabel && (
                <div style={{ marginTop: 10, fontSize: '0.8rem', color: '#7f1d1d', fontWeight: 600 }}>{priceLabel}</div>
              )}
            </div>

            <div className="tt-write-testimonial">
              <p className="tt-write-testimonial-text">&ldquo;My college essay went from forgettable to unforgettable. Best writing mentor I&rsquo;ve ever had.&rdquo;</p>
              <div className="tt-write-testimonial-author">&mdash; Workshop Student</div>
            </div>

            <div className="tt-write-gallery">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tt-write-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
            <div className="tt-write-area">{serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
