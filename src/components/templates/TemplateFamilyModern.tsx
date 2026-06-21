import { useEffect } from "react";
import type { TemplateProps } from "./types";

const PILL_COLORS = [
  { bg: "#ffe0e6", text: "#b8244a" },
  { bg: "#dceeff", text: "#1a5fa0" },
  { bg: "#fff4c7", text: "#8a6d00" },
  { bg: "#d9f1cf", text: "#2e7a1e" },
];

const TESTIMONIALS = [
  {
    quote:
      "They captured our family perfectly — playful, warm, and so authentic. Every photo feels like a real moment, not a pose.",
    author: "The Andersons",
    bg: "#fff1ae",
  },
  {
    quote:
      "We've done family photos before but never loved them this much. The kids were comfortable the entire time!",
    author: "Maria & James",
    bg: "#d9f1cf",
  },
  {
    quote:
      "From start to finish the experience was seamless. The gallery was delivered fast and every image was stunning.",
    author: "The Chens",
    bg: "#dcedff",
  },
];

export default function TemplateFamilyModern(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  const priceLabel = pricing?.downloads?.single
    ? `From $${pricing.downloads.single}/photo`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing.downloads.full}`
      : "";

  useEffect(() => {
    const id = "tfm-manrope-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  /* Grid placements for the 6 photos in the geometric grid */
  const gridPlacements: React.CSSProperties[] = [
    { gridColumn: "1 / 7", gridRow: "1 / 2" },
    { gridColumn: "7 / 13", gridRow: "1 / 2" },
    { gridColumn: "1 / 5", gridRow: "2 / 3" },
    { gridColumn: "5 / 9", gridRow: "2 / 3" },
    { gridColumn: "9 / 13", gridRow: "2 / 4" },
    { gridColumn: "1 / 9", gridRow: "3 / 4" },
  ];

  return (
    <>
      <style>{`
        /* ── Modern Family Template ── */
        .tfm-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 48px 28px 72px;
          background: #fff;
          color: #171717;
          font-family: 'Manrope', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }

        /* ── Header ── */
        .tfm-header {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 56px;
        }
        .tfm-kicker {
          display: inline-block;
          background: #ff6259;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: 5px 16px;
          border-radius: 100px;
          margin-bottom: 18px;
        }
        .tfm-name {
          margin: 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: clamp(48px, 8vw, 80px);
          line-height: .92;
          letter-spacing: -0.075em;
          color: #171717;
        }
        .tfm-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #1b1b1b;
          color: #fff;
          font-size: 14px;
          margin-left: 12px;
          vertical-align: middle;
          flex-shrink: 0;
        }
        .tfm-tagline {
          margin: 14px 0 0;
          color: #5b5b5b;
          font-size: 15px;
          font-weight: 500;
        }
        .tfm-price-label {
          display: inline-block;
          margin-top: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #ff6259;
        }
        .tfm-right {
          padding-top: 8px;
        }
        .tfm-bio {
          margin: 0 0 24px;
          color: #5b5b5b;
          font-size: 15px;
          line-height: 1.7;
        }
        .tfm-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 32px;
          background: #1b1b1b;
          color: #fff;
          border: 2px solid #1b1b1b;
          border-radius: 12px;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 7px 7px 0 #ffd84d;
          transition: background .22s, color .22s, box-shadow .22s;
          margin-bottom: 28px;
        }
        .tfm-btn:hover {
          background: #ffd84d;
          color: #1b1b1b;
          box-shadow: 7px 7px 0 #1b1b1b;
        }
        .tfm-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tfm-pill {
          display: inline-block;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
        }

        /* ── Geometric Photo Grid ── */
        .tfm-geo-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 320px 250px 280px;
          gap: 14px;
          margin-bottom: 64px;
        }
        .tfm-photo-cell {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
        }
        .tfm-photo-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .4s ease;
        }
        .tfm-photo-cell:hover img {
          transform: scale(1.05);
        }
        .tfm-photo-cell::after {
          content: '';
          position: absolute;
          bottom: 12px;
          right: 12px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          transition: transform .3s ease;
        }
        .tfm-photo-cell:hover::after {
          transform: scale(1.6);
        }
        .tfm-dot-0::after { background: #ff6259; }
        .tfm-dot-1::after { background: #4a90d9; }
        .tfm-dot-2::after { background: #ffd84d; }
        .tfm-dot-3::after { background: #3ecf8e; }
        .tfm-dot-4::after { background: #a855f7; }
        .tfm-dot-5::after { background: #f97316; }

        /* ── Testimonials ── */
        .tfm-test-header {
          display: flex;
          align-items: baseline;
          gap: 14px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }
        .tfm-test-title {
          margin: 0;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: -0.04em;
          color: #171717;
        }
        .tfm-test-location {
          font-size: 14px;
          font-weight: 500;
          color: #5b5b5b;
        }
        .tfm-test-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .tfm-test-card {
          border: 2px solid #171717;
          border-radius: 18px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 180px;
        }
        .tfm-test-quote {
          font-size: 15px;
          line-height: 1.65;
          color: #171717;
          margin: 0 0 20px;
          font-weight: 500;
        }
        .tfm-test-author {
          font-size: 13px;
          font-weight: 700;
          color: #171717;
        }

        /* ── Responsive ── */
        @media (max-width: 800px) {
          .tfm-header {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .tfm-test-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .tfm-geo-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(3, 220px) !important;
          }
          .tfm-geo-grid .tfm-photo-cell {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .tfm-test-header {
            flex-direction: column !important;
            gap: 4px !important;
          }
          .tfm-wrap {
            padding: 28px 16px 48px !important;
          }
        }
      `}</style>

      <div className="tfm-wrap">
        {/* ── Header ── */}
        <header className="tfm-header">
          <div>
            <span className="tfm-kicker">Family Photographer</span>
            <h1 className="tfm-name">
              {name}
              {verified && (
                <span className="tfm-verified" title="Verified">
                  ✓
                </span>
              )}
            </h1>
            {tagline && <p className="tfm-tagline">{tagline}</p>}
            {priceLabel && <span className="tfm-price-label">{priceLabel}</span>}
          </div>

          <div className="tfm-right">
            <p className="tfm-bio">{bio}</p>
            <button className="tfm-btn" onClick={onHire}>
              Book Your Session
            </button>
            {specialties.length > 0 && (
              <div className="tfm-pills">
                {specialties.slice(0, 4).map((s, i) => {
                  const c = PILL_COLORS[i % PILL_COLORS.length]!;
                  return (
                    <span
                      key={s}
                      className="tfm-pill"
                      style={{ background: c.bg, color: c.text }}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </header>

        {/* ── Geometric Photo Grid ── */}
        {portfolio.length > 0 && (
          <div className="tfm-geo-grid">
            {portfolio.slice(0, 6).map((photo, i) => (
              <div
                key={photo.id}
                className={`tfm-photo-cell tfm-dot-${i}`}
                style={gridPlacements[i] || {}}
                onClick={() => onPhotoClick(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Photo ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Testimonials ── */}
        <section>
          <div className="tfm-test-header">
            <h2 className="tfm-test-title">What Families Say</h2>
            {serviceArea && (
              <span className="tfm-test-location">{serviceArea}</span>
            )}
          </div>
          <div className="tfm-test-grid">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="tfm-test-card"
                style={{ background: t.bg }}
              >
                <p className="tfm-test-quote">"{t.quote}"</p>
                <span className="tfm-test-author">— {t.author}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
