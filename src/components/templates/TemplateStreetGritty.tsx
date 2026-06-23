import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');`;

export default function TemplateStreetGritty(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing?.downloads?.single}` : "";

  // Split name for outline effect on second word/line
  const nameParts = name.split(" ");
  const firstLine = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(" ");
  const secondLine = nameParts.slice(Math.ceil(nameParts.length / 2)).join(" ");

  const placements: Record<number, React.CSSProperties> = {
    0: { gridColumn: "1 / 8", gridRow: "1 / 3" },
    1: { gridColumn: "8 / 13", gridRow: "1" },
    2: { gridColumn: "8 / 13", gridRow: "2 / 4" },
    3: { gridColumn: "1 / 5", gridRow: "3" },
    4: { gridColumn: "5 / 8", gridRow: "3" },
    5: { display: "none" },
  };

  return (
    <>
      <style>{fonts}</style>
      <div
        className="gritty-tpl"
        style={{
          position: "relative",
          minHeight: 1480,
          padding: "48px 4vw 95px",
          color: "#f0f0ec",
          background:
            "linear-gradient(115deg, transparent 0 63%, rgba(255,255,255,.025) 63.1% 63.5%, transparent 63.6%), repeating-linear-gradient(0deg, rgba(255,255,255,.012) 0 1px, transparent 1px 5px), #1a1a1a",
          fontFamily: '"DM Mono", monospace',
          overflow: "hidden",
        }}
      >
        {/* Film grain overlay */}
        <div
          className="gritty-tpl-grain"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 20,
            inset: "-50%",
            width: "200%",
            height: "200%",
            pointerEvents: "none",
            opacity: 0.12,
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #fff 0 .7px, transparent .8px), radial-gradient(circle at 70% 60%, #fff 0 .55px, transparent .65px), radial-gradient(circle at 40% 80%, #000 0 .8px, transparent .9px)",
            backgroundSize: "7px 7px, 9px 9px, 11px 11px",
          }}
        />

        {/* Scratches overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 5,
            inset: 0,
            opacity: 0.12,
            pointerEvents: "none",
            background:
              "linear-gradient(93deg, transparent 12%, #fff 12.05%, transparent 12.15%), linear-gradient(89deg, transparent 73%, #fff 73.04%, transparent 73.12%), linear-gradient(177deg, transparent 48%, #fff 48.05%, transparent 48.1%)",
          }}
        />

        {/* Nav */}
        <nav
          className="gritty-tpl-nav"
          style={{
            position: "relative",
            zIndex: 25,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 30,
            alignItems: "center",
            maxWidth: 1460,
            margin: "auto",
            padding: "17px 0",
            borderTop: "4px solid #eee",
            borderBottom: "1px solid #777",
          }}
        >
          <span
            style={{
              color: "#aaa",
              fontSize: 9,
              letterSpacing: ".17em",
              textTransform: "uppercase",
            }}
          >
            {specialties.length > 0
              ? specialties.slice(0, 2).join(" · ")
              : "Photography"}
            {serviceArea ? ` · ${serviceArea}` : ""}
          </span>
          <strong
            style={{
              font: '800 23px/1 "Barlow Condensed", sans-serif',
              letterSpacing: ".07em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </strong>
          <span
            style={{
              color: "#aaa",
              fontSize: 9,
              letterSpacing: ".17em",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            {specialties.length > 2
              ? specialties.slice(2).join(" / ")
              : specialties.join(" / ")}
          </span>
        </nav>

        {/* Header */}
        <header
          className="gritty-tpl-header"
          style={{
            position: "relative",
            zIndex: 10,
            display: "grid",
            gridTemplateColumns: "1.35fr .65fr",
            gap: "5vw",
            alignItems: "end",
            maxWidth: 1400,
            margin: "65px auto 35px",
          }}
        >
          <div>
            <span
              style={{
                color: "#aaa",
                fontSize: 9,
                letterSpacing: ".23em",
                textTransform: "uppercase",
              }}
            >
              {tagline || "No staging. No second takes."}
            </span>
            <h1
              style={{
                margin: "10px 0 0",
                font: '900 clamp(74px, 12vw, 175px)/.72 "Barlow Condensed", sans-serif',
                letterSpacing: "-.045em",
                textTransform: "uppercase",
                transform: "rotate(-1deg)",
              }}
            >
              {firstLine}
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px #efefef",
                }}
              >
                {secondLine || firstLine}
              </span>
              {verified && (
                <span
                  style={{
                    marginLeft: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#059669",
                    fontSize: 15,
                    color: "#fff",
                    verticalAlign: "middle",
                    fontFamily: "sans-serif",
                    WebkitTextStroke: "0px transparent",
                  }}
                  title="Verified"
                >
                  ✓
                </span>
              )}
            </h1>
          </div>

          <div
            style={{
              padding: "20px 0 8px 25px",
              borderLeft: "5px solid #eee",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#b5b5b1",
                fontSize: 11,
                lineHeight: 1.75,
              }}
            >
              {bio}
            </p>
            {priceLabel && (
              <p
                style={{
                  margin: "12px 0 0",
                  color: "#aaa",
                  fontSize: 9,
                  letterSpacing: ".13em",
                  textTransform: "uppercase",
                }}
              >
                {priceLabel}
              </p>
            )}
            <button
              onClick={onHire}
              className="gritty-tpl-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                marginTop: 23,
                padding: "0 27px",
                color: "#171717",
                background: "#f2f2ed",
                border: "2px solid #f2f2ed",
                clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 100%)",
                fontSize: 10,
                fontWeight: 700,
                fontFamily: '"DM Mono", monospace',
                letterSpacing: ".11em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color .25s, background .25s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.background = "transparent";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "#171717";
                e.currentTarget.style.background = "#f2f2ed";
              }}
            >
              Hire Me
            </button>
          </div>
        </header>

        {/* Photo Grid */}
        {portfolio.length > 0 && (
          <div
            className="gritty-tpl-grid"
            style={{
              position: "relative",
              zIndex: 8,
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "310px 250px 310px",
              gap: 10,
              maxWidth: 1450,
              margin: "auto",
              transform: "rotate(-.6deg)",
            }}
          >
            {portfolio.slice(0, 6).map((photo, i) => (
              <div
                key={photo.id}
                className="gritty-tpl-photo"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  border: "4px solid #e4e4df",
                  background: "#080808",
                  cursor: "pointer",
                  ...placements[i],
                }}
                onClick={() => onPhotoClick(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Photo ${i + 1}`}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(1) contrast(1.38) brightness(.83)",
                    transition:
                      "transform .6s cubic-bezier(.2,.7,.2,1), filter .45s ease, opacity .35s ease",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter =
                      "grayscale(1) contrast(1.15) brightness(.98)";
                    e.currentTarget.style.transform = "scale(1.045)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter =
                      "grayscale(1) contrast(1.38) brightness(.83)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    right: 13,
                    bottom: 8,
                    color: "white",
                    font: '800 42px/1 "Barlow Condensed", sans-serif',
                    textShadow: "2px 2px 0 #000",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Contact Sheet */}
        {specialties.length > 0 && (
          <div
            className="gritty-tpl-contact"
            style={{
              position: "relative",
              zIndex: 9,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              maxWidth: 1150,
              margin: "70px auto 0",
              borderTop: "1px solid #777",
              borderLeft: "1px solid #777",
            }}
          >
            {specialties.slice(0, 8).map((s, i) => (
              <span
                key={i}
                style={{
                  minHeight: 90,
                  display: "grid",
                  placeItems: "center",
                  color: "#aaa",
                  borderRight: "1px solid #777",
                  borderBottom: "1px solid #777",
                  fontSize: 9,
                  letterSpacing: ".13em",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scoped styles: grain animation + responsive */}
      <style>{`
        @keyframes grain-shift {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(1.5%, -1%); }
          50%  { transform: translate(-1%, 1.5%); }
          75%  { transform: translate(1%, -1.5%); }
          100% { transform: translate(-1.5%, 1%); }
        }
        .gritty-tpl-grain {
          animation: grain-shift .25s steps(2) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .gritty-tpl-grain { animation: none; }
        }
        @media (max-width: 900px) {
          .gritty-tpl-header { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .gritty-tpl { padding: 35px 20px 75px !important; }
          .gritty-tpl-nav {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .gritty-tpl-nav span { text-align: center !important; }
          .gritty-tpl-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(3, 250px) !important;
            transform: none !important;
          }
          .gritty-tpl-photo {
            display: block !important;
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .gritty-tpl-contact {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
