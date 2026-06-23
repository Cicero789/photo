import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateTeachingCourse(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-tt-course";
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
  const coursePhotos = portfolio.slice(0, 3);

  const platforms = ["Teachable", "Kajabi", "Thinkific", "Gumroad", "YouTube"];

  return (
    <>
      <style>{`
        .tt-course-root {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #eef2ff, #fff 46%, #ecfeff);
          color: #1e1b4b;
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          line-height: 1.6;
        }

        /* Watermark */
        .tt-course-watermark {
          position: absolute;
          bottom: 40px;
          left: -10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 8rem;
          font-weight: 700;
          color: rgba(79, 70, 229, 0.04);
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Hero Grid */
        .tt-course-hero {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          padding: 64px 5vw 48px;
          align-items: center;
        }

        .tt-course-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #4f46e5;
          margin-bottom: 12px;
        }

        .tt-course-hero h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.85rem, 4.2vw, 3rem);
          font-weight: 700;
          line-height: 1.15;
          color: #1e1b4b;
          margin: 0 0 10px;
        }

        .tt-course-name-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }
        .tt-course-name-row h3 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e1b4b;
        }

        .tt-course-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #4f46e5;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          margin-left: 8px;
          vertical-align: middle;
        }

        .tt-course-tagline {
          font-size: 0.95rem;
          color: #64748b;
          margin-bottom: 18px;
        }

        /* Platform tags row */
        .tt-course-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 26px;
        }
        .tt-course-platform {
          font-size: 0.73rem;
          font-weight: 600;
          color: #4f46e5;
          background: rgba(79, 70, 229, 0.08);
          border: 1px solid rgba(79, 70, 229, 0.18);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.04em;
        }

        .tt-course-btn-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .tt-course-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          background: #4f46e5;
          border: 2px solid #4f46e5;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-course-btn-primary:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }

        .tt-course-btn-cyan {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0 30px;
          font-family: 'Inter', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          background: #06b6d4;
          border: 2px solid #06b6d4;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .tt-course-btn-cyan:hover {
          background: #0891b2;
          transform: translateY(-1px);
        }

        /* Hero photo card */
        .tt-course-hero-photo {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.12);
          cursor: pointer;
        }
        .tt-course-hero-photo img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 340px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tt-course-hero-photo:hover img {
          transform: scale(1.03);
        }

        /* Content band */
        .tt-course-band {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 5vw 64px;
        }

        /* Left panel */
        .tt-course-bio {
          font-size: 0.92rem;
          color: #64748b;
          line-height: 1.8;
          margin: 0 0 28px;
        }

        /* Course catalog cards */
        .tt-course-catalog {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .tt-course-card {
          display: flex;
          gap: 16px;
          background: #fff;
          border: 1px solid rgba(79, 70, 229, 0.1);
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 4px 16px rgba(79, 70, 229, 0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tt-course-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.14);
        }
        .tt-course-card-thumb {
          width: 105px;
          min-height: 80px;
          border-radius: 8px;
          object-fit: cover;
          background: linear-gradient(135deg, #e0e7ff, #cffafe);
          flex-shrink: 0;
        }
        .tt-course-card-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .tt-course-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 4px;
        }
        .tt-course-card-subtitle {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.4;
        }

        /* Right panel */
        .tt-course-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tt-course-tag {
          font-size: 0.75rem;
          font-weight: 600;
          color: #4f46e5;
          background: rgba(79, 70, 229, 0.08);
          padding: 5px 14px;
          border-radius: 20px;
          letter-spacing: 0.02em;
        }

        /* Mini-cards */
        .tt-course-minicards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .tt-course-minicard {
          background: #fff;
          border: 1px solid rgba(79, 70, 229, 0.1);
          border-radius: 10px;
          padding: 18px 14px;
          text-align: center;
        }
        .tt-course-minicard-icon {
          font-size: 1.4rem;
          margin-bottom: 6px;
        }
        .tt-course-minicard-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e1b4b;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Pricing */
        .tt-course-pricing {
          background: #fff;
          border: 1px solid rgba(79, 70, 229, 0.1);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 24px;
        }
        .tt-course-pricing-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #1e1b4b;
          margin: 0 0 16px;
        }
        .tt-course-pricing-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(79, 70, 229, 0.06);
          font-size: 0.88rem;
        }
        .tt-course-pricing-row:last-of-type {
          border-bottom: none;
        }
        .tt-course-pricing-label {
          color: #64748b;
        }
        .tt-course-pricing-price {
          font-weight: 700;
          color: #4f46e5;
        }

        /* Testimonial */
        .tt-course-testimonial {
          background: rgba(79, 70, 229, 0.04);
          border-left: 3px solid #4f46e5;
          border-radius: 0 10px 10px 0;
          padding: 20px 22px;
          margin-bottom: 24px;
        }
        .tt-course-testimonial-text {
          font-size: 0.95rem;
          font-style: italic;
          line-height: 1.65;
          color: #1e1b4b;
          margin: 0 0 8px;
        }
        .tt-course-testimonial-author {
          font-size: 0.78rem;
          font-weight: 700;
          color: #4f46e5;
        }

        /* Gallery */
        .tt-course-gallery {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .tt-course-gallery-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(79, 70, 229, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tt-course-gallery-img:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(79, 70, 229, 0.14);
        }

        .tt-course-area {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 8px;
        }

        /* ── Responsive: 800px ── */
        @media (max-width: 800px) {
          .tt-course-hero {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 48px 5vw 36px;
          }
          .tt-course-band {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .tt-course-minicards {
            grid-template-columns: repeat(3, 1fr);
          }
          .tt-course-gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* ── Responsive: 520px ── */
        @media (max-width: 520px) {
          .tt-course-hero {
            padding: 32px 4vw 28px;
          }
          .tt-course-watermark {
            font-size: 4rem;
            bottom: 20px;
          }
          .tt-course-minicards {
            grid-template-columns: 1fr;
          }
          .tt-course-gallery {
            grid-template-columns: 1fr;
          }
          .tt-course-btn-row {
            flex-direction: column;
          }
          .tt-course-band {
            padding: 0 4vw 48px;
          }
          .tt-course-card {
            flex-direction: column;
          }
          .tt-course-card-thumb {
            width: 100%;
            min-height: 120px;
          }
        }
      `}</style>

      <section className="tt-course-root">
        <div className="tt-course-watermark">ENROLL</div>

        {/* Hero */}
        <div className="tt-course-hero">
          <div>
            <div className="tt-course-eyebrow">Course Creator</div>
            <h2>Sell knowledge through courses, cohorts, and community.</h2>
            <div className="tt-course-name-row">
              <h3>{name}</h3>
              {verified && <span className="tt-course-verified" title="Verified">&#10003;</span>}
            </div>
            <p className="tt-course-tagline">{tagline}</p>

            <div className="tt-course-platforms">
              {platforms.map((p) => (
                <span key={p} className="tt-course-platform">{p}</span>
              ))}
            </div>

            <div className="tt-course-btn-row">
              <button className="tt-course-btn-primary" onClick={onHire}>Book a Lesson</button>
              <button className="tt-course-btn-cyan">Browse Courses</button>
            </div>
          </div>
          {heroPhoto && (
            <div className="tt-course-hero-photo" onClick={() => onPhotoClick(0)}>
              <img src={heroPhoto.url} alt={heroPhoto.filename} loading="lazy" />
            </div>
          )}
        </div>

        {/* Content Band */}
        <div className="tt-course-band">
          {/* Left Panel */}
          <div>
            <p className="tt-course-bio">{bio}</p>

            <div className="tt-course-catalog">
              {coursePhotos.map((photo, i) => {
                const titles = ["Launch Your First Course", "Build a Membership Site", "Scale with Live Cohorts"];
                const subtitles = [
                  "From outline to published — step by step.",
                  "Recurring revenue through community.",
                  "Premium group coaching that sells itself."
                ];
                return (
                  <div className="tt-course-card" key={photo.id}>
                    <img
                      className="tt-course-card-thumb"
                      src={photo.url}
                      alt={photo.filename}
                      loading="lazy"
                    />
                    <div className="tt-course-card-info">
                      <div className="tt-course-card-title">{titles[i] || `Course ${i + 1}`}</div>
                      <div className="tt-course-card-subtitle">{subtitles[i] || "A comprehensive course module."}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel */}
          <div>
            <div className="tt-course-tags">
              {specialties.map((s) => (
                <span key={s} className="tt-course-tag">{s}</span>
              ))}
            </div>

            <div className="tt-course-minicards">
              <div className="tt-course-minicard">
                <div className="tt-course-minicard-icon">&#128218;</div>
                <div className="tt-course-minicard-title">Self-Paced</div>
              </div>
              <div className="tt-course-minicard">
                <div className="tt-course-minicard-icon">&#127909;</div>
                <div className="tt-course-minicard-title">Live Cohort</div>
              </div>
              <div className="tt-course-minicard">
                <div className="tt-course-minicard-icon">&#11088;</div>
                <div className="tt-course-minicard-title">VIP Coaching</div>
              </div>
            </div>

            <div className="tt-course-pricing">
              <div className="tt-course-pricing-title">Course Pricing</div>
              <div className="tt-course-pricing-row">
                <span className="tt-course-pricing-label">Mini Course</span>
                <span className="tt-course-pricing-price">$49</span>
              </div>
              <div className="tt-course-pricing-row">
                <span className="tt-course-pricing-label">Signature Course</span>
                <span className="tt-course-pricing-price">$349</span>
              </div>
              <div className="tt-course-pricing-row">
                <span className="tt-course-pricing-label">Cohort Program</span>
                <span className="tt-course-pricing-price">$950</span>
              </div>
              {priceLabel && (
                <div style={{ marginTop: 10, fontSize: '0.8rem', color: '#4f46e5', fontWeight: 700 }}>{priceLabel}</div>
              )}
            </div>

            <div className="tt-course-testimonial">
              <p className="tt-course-testimonial-text">"I launched my first course in three weeks and made $12K in the first month. The framework is gold."</p>
              <div className="tt-course-testimonial-author">— Course Creator Student</div>
            </div>

            <div className="tt-course-gallery">
              {galleryPhotos.map((photo, i) => (
                <img
                  key={photo.id}
                  className="tt-course-gallery-img"
                  src={photo.url}
                  alt={photo.filename}
                  loading="lazy"
                  onClick={() => onPhotoClick(i + 1)}
                />
              ))}
            </div>
            <div className="tt-course-area">{serviceArea}</div>
          </div>
        </div>
      </section>
    </>
  );
}
