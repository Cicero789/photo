import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateHolidayFestive(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;

  useEffect(() => {
    const id = "font-holiday-festive";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const priceLabel = pricing?.downloads?.single
    ? `Starting at $${pricing?.downloads?.single}`
    : pricing?.downloads?.full
      ? `Full gallery $${pricing?.downloads?.full}`
      : null;

  const nameWords = name.split(" ");
  const gridPhotos = portfolio.slice(0, 5);

  return (
    <>
      <style>{`
        .fp-wrap {
          position: relative;
          min-height: 1350px;
          padding: 65px 5vw 100px;
          background:
            radial-gradient(circle at 8% 12%, rgba(255,86,130,.12), transparent 20%),
            radial-gradient(circle at 92% 20%, rgba(88,205,255,.14), transparent 21%),
            radial-gradient(circle at 50% 90%, rgba(255,215,66,.11), transparent 24%),
            #fff;
          font-family: Manrope, sans-serif;
          color: #1e1924;
          overflow: hidden;
        }

        /* ── Confetti field ── */
        .fp-confetti-field {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }
        .fp-confetti {
          position: absolute;
          top: -10%;
          width: 10px;
          height: 22px;
          border-radius: 3px;
          opacity: .8;
          animation: fp-confetti-fall linear infinite;
        }
        .fp-confetti:nth-child(1) { left: 5%; background: #ff4f87; animation-duration: 8s; animation-delay: -3s; }
        .fp-confetti:nth-child(2) { left: 14%; width: 8px; height: 8px; border-radius: 50%; background: #5fd0ff; animation-duration: 11s; animation-delay: -8s; }
        .fp-confetti:nth-child(3) { left: 25%; background: #ffd644; animation-duration: 9s; animation-delay: -4s; transform: rotate(35deg); }
        .fp-confetti:nth-child(4) { left: 38%; width: 17px; height: 7px; background: #7658ff; animation-duration: 12s; animation-delay: -10s; }
        .fp-confetti:nth-child(5) { left: 52%; background: #28d9a1; animation-duration: 8.5s; animation-delay: -6s; }
        .fp-confetti:nth-child(6) { left: 64%; width: 8px; height: 8px; border-radius: 50%; background: #ff6d3f; animation-duration: 10s; animation-delay: -2s; }
        .fp-confetti:nth-child(7) { left: 76%; background: #ff4f87; animation-duration: 12.5s; animation-delay: -7s; }
        .fp-confetti:nth-child(8) { left: 86%; width: 18px; height: 7px; background: #5fd0ff; animation-duration: 9.5s; animation-delay: -5s; }
        .fp-confetti:nth-child(9) { left: 95%; background: #ffd644; animation-duration: 11.5s; animation-delay: -9s; }
        @keyframes fp-confetti-fall {
          0%   { transform: translate3d(0, -8vh, 0) rotate(0); }
          50%  { transform: translate3d(40px, 65vh, 0) rotate(430deg); }
          100% { transform: translate3d(-20px, 145vh, 0) rotate(820deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .fp-confetti { animation: none !important; top: var(--still, 25%); }
        }

        /* ── Header ── */
        .fp-header {
          position: relative;
          z-index: 3;
          max-width: 1350px;
          margin: 0 auto;
          text-align: center;
        }
        .fp-kicker {
          display: inline-flex;
          padding: 9px 15px;
          color: #463c52;
          background: #f2eaff;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .fp-wrap h1 {
          margin: 20px auto 10px;
          max-width: 1050px;
          font: 800 clamp(62px, 10vw, 145px)/.77 Manrope, sans-serif;
          letter-spacing: -.085em;
          color: #1e1924;
        }
        .fp-gradient-text {
          color: transparent;
          background: linear-gradient(100deg, #ff3979 5%, #ff8b35 28%, #e6c616 47%, #22c991 66%, #438eff 84%, #8357ef);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .fp-verified {
          display: inline-block;
          font-size: 22px;
          margin-left: 12px;
          vertical-align: middle;
          color: transparent;
          background: linear-gradient(100deg, #ff3979, #ff8b35, #e6c616, #22c991, #438eff, #8357ef);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .fp-subtitle {
          max-width: 650px;
          margin: 24px auto;
          color: #68616f;
          font-size: 14px;
          line-height: 1.75;
        }
        .fp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 28px;
          color: #fff;
          background: #201b26;
          border: none;
          border-radius: 999px;
          box-shadow: 0 8px 0 #ffd644;
          font: 700 12px/1 Manrope, sans-serif;
          letter-spacing: .06em;
          text-decoration: none;
          cursor: pointer;
          transition: transform .25s, box-shadow .25s, background .25s, color .25s;
        }
        .fp-btn:hover {
          color: #201b26;
          background: #ffd644;
          box-shadow: 0 5px 0 #201b26;
          transform: translateY(3px);
        }

        /* ── Photo grid ── */
        .fp-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: 300px 240px 290px;
          gap: 16px;
          max-width: 1400px;
          margin: 65px auto 0;
        }
        .fp-photo {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 17px 40px rgba(42,27,53,.13);
          cursor: pointer;
        }
        .fp-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.08) contrast(1.02);
          transition: transform .7s cubic-bezier(.2,.7,.2,1), filter .5s ease;
        }
        .fp-photo:hover img {
          transform: scale(1.055);
        }
        .fp-photo:nth-child(1) { grid-column: 1 / 8; grid-row: 1 / 3; border: 8px solid #ffd644; }
        .fp-photo:nth-child(2) { grid-column: 8 / 13; grid-row: 1;     border: 8px solid #ff648f; }
        .fp-photo:nth-child(3) { grid-column: 8 / 13; grid-row: 2 / 4; border: 8px solid #5fd0ff; }
        .fp-photo:nth-child(4) { grid-column: 1 / 5;  grid-row: 3;     border: 8px solid #8c6aff; }
        .fp-photo:nth-child(5) { grid-column: 5 / 8;  grid-row: 3;     border: 8px solid #45d8a6; }

        .fp-label {
          position: absolute;
          left: 16px;
          bottom: 16px;
          padding: 8px 12px;
          border-radius: 999px;
          color: #fff;
          background: rgba(25,21,29,.86);
          backdrop-filter: blur(5px);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          pointer-events: none;
        }

        /* ── Occasion strip ── */
        .fp-occasions {
          position: relative;
          z-index: 3;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 1100px;
          margin: 45px auto 0;
        }
        .fp-occasion {
          padding: 12px 18px;
          border: 2px solid #221d28;
          border-radius: 999px;
          background: #fff;
          box-shadow: 4px 4px 0 #221d28;
          font-size: 11px;
          font-weight: 800;
          transform: rotate(-1deg);
        }
        .fp-occasion:nth-child(even) { background: #fff1a9; transform: rotate(1deg); }
        .fp-occasion:nth-child(3n)   { background: #d8f5ff; }
        .fp-occasion:nth-child(4n)   { background: #ffe0eb; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .fp-grid { grid-template-rows: 250px 210px 250px; }
        }
        @media (max-width: 600px) {
          .fp-wrap { padding: 55px 20px 80px; }
          .fp-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(3, 245px);
          }
          .fp-photo:nth-child(n) {
            display: block;
            grid-column: auto;
            grid-row: auto;
            border-width: 5px;
            border-radius: 20px;
          }
        }
      `}</style>
      <section className="fp-wrap">
        {/* Confetti field */}
        <div className="fp-confetti-field" aria-hidden="true">
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
          <i className="fp-confetti" />
        </div>

        {/* Header */}
        <header className="fp-header">
          <span className="fp-kicker">
            {serviceArea}{specialties.length > 0 && ` · ${specialties.slice(0, 2).join(" · ")}`}
          </span>
          <h1>
            {nameWords.length > 1
              ? (
                <>
                  {nameWords.slice(0, -1).join(" ")}{" "}
                  <span className="fp-gradient-text">{nameWords[nameWords.length - 1]}</span>
                </>
              )
              : <span className="fp-gradient-text">{name}</span>
            }
            {verified && <span className="fp-verified">&#10003;</span>}
          </h1>
          {bio && <p className="fp-subtitle">{bio}</p>}
          {!bio && tagline && (
            <p className="fp-subtitle">
              {tagline}. Big energy, bright color, and all the blink-and-you-miss-it moments.
            </p>
          )}
          <button className="fp-btn" onClick={onHire}>
            Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
          </button>
        </header>

        {/* Photo grid (up to 5 photos) */}
        <div className="fp-grid">
          {gridPhotos.map((photo, i) => (
            <div key={photo.id} className="fp-photo" onClick={() => onPhotoClick(i)}>
              <img src={photo.url} alt={photo.filename} loading={i === 0 ? undefined : "lazy"} />
              <span className="fp-label">{photo.filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}</span>
            </div>
          ))}
        </div>

        {/* Occasion strip */}
        {specialties.length > 0 && (
          <div className="fp-occasions" aria-label="Holiday specialties">
            {specialties.map((s, i) => (
              <span key={i} className="fp-occasion">{s}</span>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
