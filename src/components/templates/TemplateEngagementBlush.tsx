import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateEngagementBlush(props: TemplateProps) {
  const {
    name,
    tagline,
    specialties,
    bio,
    website,
    serviceArea,
    verified,
    pricing,
    portfolio,
    onHire,
    onPhotoClick,
  } = props;

  const heroPhoto = portfolio?.[0];
  const floatingPhotos = portfolio.slice(1, 4);
  const priceLabel =
    pricing?.downloads?.single
      ? `From $${pricing?.downloads?.single}`
      : pricing?.downloads?.full
        ? `Full gallery $${pricing?.downloads?.full}`
        : "";

  /* Load Google Fonts */
  useEffect(() => {
    const id = "teb-gfonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Allura&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        /* ── Romantic Blush Engagement Template ── */

        .teb-root {
          --teb-bg: #fff1f2;
          --teb-text: #302326;
          --teb-accent: #8d5963;
          --teb-kicker: #a56570;
          --teb-muted: #745a60;
          --teb-muted2: #725d62;
          --teb-script: 'Allura', cursive;
          --teb-serif: 'Cormorant Garamond', serif;
          --teb-sans: 'DM Sans', sans-serif;

          background: var(--teb-bg);
          background-image:
            radial-gradient(ellipse at 10% 20%, rgba(255,255,255,.65) 0%, transparent 50%),
            radial-gradient(ellipse at 91% 64%, rgba(219,170,178,.25) 0%, transparent 45%);
          color: var(--teb-text);
          font-family: var(--teb-sans);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Header ── */
        .teb-header {
          text-align: center;
          padding: 72px 24px 40px;
          position: relative;
        }
        .teb-kicker {
          font-family: var(--teb-sans);
          font-weight: 500;
          font-size: 11px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--teb-kicker);
          margin-bottom: 12px;
        }
        .teb-name {
          font-family: var(--teb-script);
          font-size: clamp(56px, 10vw, 110px);
          font-weight: 400;
          line-height: 1;
          color: var(--teb-text);
          margin: 0 0 14px;
        }
        .teb-verified {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #f9c6ce;
          color: #8d5963;
          font-size: 13px;
          margin-left: 10px;
          vertical-align: middle;
          position: relative;
          top: -6px;
        }
        .teb-tagline {
          font-family: var(--teb-serif);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(16px, 2.2vw, 22px);
          color: var(--teb-muted);
          margin: 0;
          line-height: 1.5;
        }

        /* ── Heart showcase section ── */
        .teb-showcase {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px 80px;
          min-height: 520px;
        }

        /* Decorative elliptical borders */
        .teb-showcase::before {
          content: '';
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(141,89,99,.12);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .teb-showcase::after {
          content: '';
          position: absolute;
          width: 540px;
          height: 540px;
          border-radius: 50%;
          border: 1px dashed rgba(141,89,99,.08);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        /* Heart wrapper */
        .teb-heart-wrap {
          position: relative;
          width: 320px;
          height: 320px;
          z-index: 2;
        }

        /* Main heart photo: rotated square with one rounded corner + two circular lobes */
        .teb-heart-main {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translate(-50%, -50%) rotate(-45deg);
          border-radius: 0 0 0 50%;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(141,89,99,.18);
        }
        .teb-heart-main img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          transform: rotate(45deg) scale(1.35);
          transform-origin: center center;
          filter: saturate(.85);
          transition: filter .4s ease, transform .5s ease;
        }
        .teb-heart-main:hover img {
          filter: saturate(1);
          transform: rotate(45deg) scale(1.4);
        }

        /* Heart lobes (two circles that complete the heart shape) */
        .teb-heart-lobe {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(141,89,99,.18);
        }
        .teb-heart-lobe img {
          width: 300px;
          height: 300px;
          object-fit: cover;
          filter: saturate(.85);
          transition: filter .4s ease;
        }
        .teb-heart-lobe:hover img {
          filter: saturate(1);
        }
        /* Top lobe */
        .teb-heart-lobe-t {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg) translate(0, -100px);
        }
        .teb-heart-lobe-t img {
          transform: rotate(45deg) scale(1.35) translate(-15%, 10%);
        }
        /* Right lobe */
        .teb-heart-lobe-r {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg) translate(100px, 0);
        }
        .teb-heart-lobe-r img {
          transform: rotate(45deg) scale(1.35) translate(-25%, -5%);
        }

        /* Decorative petal shapes */
        .teb-petal {
          position: absolute;
          border-radius: 50% 0 50% 0;
          opacity: .08;
          pointer-events: none;
          z-index: 1;
        }
        .teb-petal-1 {
          width: 60px;
          height: 60px;
          background: var(--teb-accent);
          top: 12%;
          left: 8%;
          transform: rotate(-30deg);
        }
        .teb-petal-2 {
          width: 45px;
          height: 45px;
          background: var(--teb-kicker);
          bottom: 18%;
          right: 10%;
          transform: rotate(50deg);
        }
        .teb-petal-3 {
          width: 35px;
          height: 35px;
          background: var(--teb-accent);
          top: 30%;
          right: 15%;
          transform: rotate(15deg);
        }
        .teb-petal-4 {
          width: 50px;
          height: 50px;
          background: var(--teb-kicker);
          bottom: 25%;
          left: 12%;
          transform: rotate(-60deg);
        }

        /* Floating polaroid photos */
        .teb-polaroid {
          position: absolute;
          background: #fff;
          padding: 8px 8px 32px 8px;
          box-shadow: 0 6px 24px rgba(48,35,38,.12), 0 2px 8px rgba(48,35,38,.06);
          cursor: pointer;
          z-index: 3;
          transition: transform .35s ease, box-shadow .35s ease;
        }
        .teb-polaroid:hover {
          box-shadow: 0 10px 36px rgba(48,35,38,.18), 0 4px 12px rgba(48,35,38,.1);
        }
        .teb-polaroid img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(.8) brightness(1.02);
          transition: filter .4s ease;
        }
        .teb-polaroid:hover img {
          filter: saturate(1) brightness(1);
        }
        .teb-polaroid-left {
          width: 150px;
          height: 180px;
          left: 2%;
          top: 18%;
          transform: rotate(-6deg);
        }
        .teb-polaroid-left:hover {
          transform: rotate(-6deg) translateY(-4px);
        }
        .teb-polaroid-right {
          width: 140px;
          height: 170px;
          right: 3%;
          top: 12%;
          transform: rotate(5deg);
        }
        .teb-polaroid-right:hover {
          transform: rotate(5deg) translateY(-4px);
        }
        .teb-polaroid-bottom {
          width: 145px;
          height: 175px;
          right: 15%;
          bottom: 0;
          transform: rotate(3deg);
        }
        .teb-polaroid-bottom:hover {
          transform: rotate(3deg) translateY(-4px);
        }

        /* ── Info bar ── */
        .teb-info {
          position: relative;
          padding: 60px 7vw 72px;
        }
        .teb-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--teb-accent), transparent);
        }
        .teb-info-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr 1fr;
          gap: 48px;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
        }
        .teb-info-story h2 {
          font-family: var(--teb-script);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 400;
          color: var(--teb-text);
          margin: 0;
          line-height: 1.3;
        }
        .teb-info-desc {
          font-family: var(--teb-sans);
          font-size: 14px;
          font-weight: 300;
          line-height: 1.85;
          color: var(--teb-muted2);
          margin: 0;
        }
        .teb-info-desc .teb-area {
          display: block;
          margin-top: 10px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--teb-kicker);
        }
        .teb-info-cta {
          text-align: right;
        }

        /* ── Inquire Now button ── */
        .teb-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 36px;
          border: none;
          border-radius: 100px;
          background: linear-gradient(115deg, #b76e79, #d3a09c);
          color: #fff;
          font-family: var(--teb-sans);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(183,110,121,.25);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .teb-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(183,110,121,.35);
        }
        .teb-btn:active {
          transform: translateY(0);
        }

        /* ── Price label ── */
        .teb-price {
          display: block;
          text-align: right;
          margin-top: 10px;
          font-size: 12px;
          font-weight: 400;
          color: var(--teb-muted);
          font-style: italic;
          font-family: var(--teb-serif);
        }

        /* ── Website link ── */
        .teb-website {
          display: block;
          text-align: center;
          padding: 0 24px 48px;
          font-family: var(--teb-sans);
          font-size: 12px;
          font-weight: 400;
          letter-spacing: .1em;
          color: var(--teb-muted);
        }
        .teb-website a {
          color: var(--teb-accent);
          text-decoration: none;
          border-bottom: 1px solid rgba(141,89,99,.2);
          transition: border-color .3s;
        }
        .teb-website a:hover {
          border-bottom-color: var(--teb-accent);
        }

        /* ── Responsive ── */
        @media (max-width: 800px) {
          .teb-polaroid-left,
          .teb-polaroid-right,
          .teb-polaroid-bottom {
            width: 110px !important;
            height: 130px !important;
          }
          .teb-info-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 28px !important;
          }
          .teb-info-cta {
            text-align: center !important;
          }
        }

        @media (max-width: 520px) {
          .teb-heart-main {
            width: 75vw !important;
            height: 75vw !important;
          }
          .teb-heart-main img {
            width: 110vw !important;
            height: 110vw !important;
          }
          .teb-heart-lobe {
            width: 75vw !important;
            height: 75vw !important;
          }
          .teb-heart-lobe img {
            width: 110vw !important;
            height: 110vw !important;
          }
          .teb-heart-wrap {
            width: 85vw !important;
            height: 85vw !important;
          }
          .teb-polaroid-left {
            left: -2% !important;
            top: 60% !important;
          }
          .teb-polaroid-right {
            right: -2% !important;
            top: 5% !important;
          }
          .teb-polaroid-bottom {
            right: 5% !important;
            bottom: -10% !important;
          }
          .teb-showcase {
            padding: 24px 12px 100px !important;
            min-height: 400px !important;
          }
          .teb-header {
            padding: 48px 16px 24px !important;
          }
          .teb-info {
            padding: 40px 5vw 48px !important;
          }
        }
      `}</style>

      <div className="teb-root">
        {/* ── Header ── */}
        <header className="teb-header">
          {specialties.length > 0 && (
            <div className="teb-kicker">{specialties.join("  ·  ")}</div>
          )}
          <h1 className="teb-name">
            {name}
            {verified && (
              <span className="teb-verified" title="Verified photographer">
                ✓
              </span>
            )}
          </h1>
          {tagline && <p className="teb-tagline">{tagline}</p>}
        </header>

        {/* ── Heart showcase ── */}
        <section className="teb-showcase">
          {/* Decorative petals */}
          <div className="teb-petal teb-petal-1" />
          <div className="teb-petal teb-petal-2" />
          <div className="teb-petal teb-petal-3" />
          <div className="teb-petal teb-petal-4" />

          {/* Center heart photo */}
          <div className="teb-heart-wrap">
            {heroPhoto && (
              <>
                {/* Main rotated square */}
                <div
                  className="teb-heart-main"
                  onClick={() => onPhotoClick(0)}
                >
                  <img
                    src={heroPhoto.url}
                    alt={heroPhoto.filename || "Featured"}
                  />
                </div>
                {/* Top lobe */}
                <div
                  className="teb-heart-lobe teb-heart-lobe-t"
                  onClick={() => onPhotoClick(0)}
                >
                  <img
                    src={heroPhoto.url}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                {/* Right lobe */}
                <div
                  className="teb-heart-lobe teb-heart-lobe-r"
                  onClick={() => onPhotoClick(0)}
                >
                  <img
                    src={heroPhoto.url}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </div>

          {/* Floating polaroid photos */}
          {floatingPhotos[0] && (
            <div
              className="teb-polaroid teb-polaroid-left"
              onClick={() => onPhotoClick(1)}
            >
              <img
                src={floatingPhotos[0].url}
                alt={floatingPhotos[0].filename || "Photo 2"}
                loading="lazy"
              />
            </div>
          )}
          {floatingPhotos[1] && (
            <div
              className="teb-polaroid teb-polaroid-right"
              onClick={() => onPhotoClick(2)}
            >
              <img
                src={floatingPhotos[1].url}
                alt={floatingPhotos[1].filename || "Photo 3"}
                loading="lazy"
              />
            </div>
          )}
          {floatingPhotos[2] && (
            <div
              className="teb-polaroid teb-polaroid-bottom"
              onClick={() => onPhotoClick(3)}
            >
              <img
                src={floatingPhotos[2].url}
                alt={floatingPhotos[2].filename || "Photo 4"}
                loading="lazy"
              />
            </div>
          )}
        </section>

        {/* ── Info bar ── */}
        <section className="teb-info">
          <div className="teb-info-grid">
            <div className="teb-info-story">
              <h2>Your story, softly told.</h2>
            </div>

            <div>
              <p className="teb-info-desc">
                {bio}
                {serviceArea && (
                  <span className="teb-area">{serviceArea}</span>
                )}
              </p>
            </div>

            <div className="teb-info-cta">
              <button className="teb-btn" onClick={onHire}>
                Inquire Now
              </button>
              {priceLabel && (
                <span className="teb-price">{priceLabel}</span>
              )}
            </div>
          </div>
        </section>

        {/* ── Website footer ── */}
        {website && (
          <div className="teb-website">
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
