import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;600;700;800&family=DM+Mono:wght@400;500&display=swap');`;

export default function TemplateStreetNeon(props: TemplateProps) {
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

  const priceLabel = pricing?.downloads?.single
    ? `$${pricing.downloads.single}`
    : "";
  const fullPackLabel = pricing?.downloads?.full
    ? `$${pricing.downloads.full}`
    : "";

  const nameParts = name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <>
      <style>{fonts}</style>
      <style>{`
        .neon-tpl {
          position: relative;
        }
        .neon-tpl::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(34,211,238,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(244,114,182,.07) 1px, transparent 1px);
          background-size: 55px 55px;
          mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }
        .neon-tpl > * {
          position: relative;
          z-index: 1;
        }
        .neon-tpl .cyan {
          color: #22d3ee;
          text-shadow: 0 0 7px rgba(34,211,238,.9), 0 0 30px rgba(34,211,238,.4), 0 0 60px rgba(34,211,238,.15);
        }
        .neon-tpl .pink {
          color: #f472b6;
          text-shadow: 0 0 7px rgba(244,114,182,.9), 0 0 30px rgba(244,114,182,.4), 0 0 60px rgba(244,114,182,.15);
        }
        .neon-tpl-card:nth-child(odd) {
          border: 1px solid rgba(34,211,238,.45);
          box-shadow: 0 0 8px rgba(34,211,238,.25), inset 0 0 8px rgba(34,211,238,.06);
        }
        .neon-tpl-card:nth-child(even) {
          border: 1px solid rgba(244,114,182,.45);
          box-shadow: 0 0 8px rgba(244,114,182,.25), inset 0 0 8px rgba(244,114,182,.06);
        }
        .neon-tpl-card:hover {
          transform: translateY(-6px) scale(1.012);
        }
        .neon-tpl-card:nth-child(odd):hover {
          box-shadow: 0 0 16px rgba(34,211,238,.5), 0 0 40px rgba(34,211,238,.2), inset 0 0 12px rgba(34,211,238,.1);
        }
        .neon-tpl-card:nth-child(even):hover {
          box-shadow: 0 0 16px rgba(244,114,182,.5), 0 0 40px rgba(244,114,182,.2), inset 0 0 12px rgba(244,114,182,.1);
        }
        .neon-tpl-hire:hover {
          background: transparent !important;
          color: #22d3ee !important;
          box-shadow: inset 0 0 20px rgba(34,211,238,.3), 0 0 14px rgba(34,211,238,.5) !important;
        }
        @media (max-width: 600px) {
          .neon-tpl-header {
            grid-template-columns: 1fr !important;
          }
          .neon-tpl-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(3, 220px) !important;
          }
          .neon-tpl-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .neon-tpl-manifesto {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="neon-tpl"
        style={{
          padding: 0,
          margin: 0,
          background:
            "linear-gradient(180deg, #030307 0%, #080510 50%, #02050a 100%)",
          color: "#e6fbff",
          fontFamily: '"DM Mono", monospace',
          fontWeight: 400,
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Radial gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(34,211,238,.14), transparent 70%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(244,114,182,.14), transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 4vw",
            borderTop: "2px solid #22d3ee",
            borderBottom: "2px solid #f472b6",
            boxShadow:
              "0 2px 12px rgba(244,114,182,.15), 0 -2px 12px rgba(34,211,238,.15)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: '"Orbitron", sans-serif',
              fontWeight: 700,
              fontSize: 15,
              color: "#22d3ee",
              textShadow: "0 0 12px rgba(34,211,238,.8)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#9ca9b3",
              letterSpacing: ".12em",
              textTransform: "uppercase",
            }}
          >
            {serviceArea}
          </span>
        </nav>

        {/* Header */}
        <header
          className="neon-tpl-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.25fr .75fr",
            gap: 40,
            padding: "60px 4vw 50px",
            alignItems: "end",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: 13,
                fontWeight: 500,
                color: "#f472b6",
                textShadow: "0 0 8px rgba(244,114,182,.6)",
                textTransform: "uppercase",
                letterSpacing: ".18em",
                marginBottom: 18,
              }}
            >
              {tagline || "Street Photography"}
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(48px, 9vw, 120px)",
                lineHeight: 0.88,
                textTransform: "uppercase",
                letterSpacing: "-.02em",
              }}
            >
              <span className="cyan">{firstName}</span>
              {lastName && (
                <>
                  <br />
                  <span className="pink">{lastName}</span>
                </>
              )}
            </h1>
            {verified && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 14,
                  fontSize: 12,
                  color: "#22d3ee",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "rgba(34,211,238,.15)",
                    border: "1px solid #22d3ee",
                    fontSize: 11,
                    color: "#22d3ee",
                  }}
                  title="Verified"
                >
                  ✓
                </span>
                Verified
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              fontSize: 13,
              color: "#9ca9b3",
              lineHeight: 1.65,
            }}
          >
            {specialties.length > 0 && (
              <div>
                <div
                  style={{
                    color: "#f472b6",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".15em",
                    marginBottom: 6,
                  }}
                >
                  Specialties
                </div>
                {specialties.join(" / ")}
              </div>
            )}
            {priceLabel && (
              <div>
                <div
                  style={{
                    color: "#22d3ee",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".15em",
                    marginBottom: 6,
                  }}
                >
                  Starting at
                </div>
                {priceLabel}
                {fullPackLabel && (
                  <span style={{ marginLeft: 8, color: "#666" }}>
                    · Full set {fullPackLabel}
                  </span>
                )}
              </div>
            )}
            <button
              className="neon-tpl-hire"
              onClick={onHire}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 30px",
                background: "#22d3ee",
                color: "#030307",
                border: "none",
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow:
                  "0 0 14px rgba(34,211,238,.7), 0 0 38px rgba(34,211,238,.3)",
                transition: "all .3s ease",
                marginTop: 4,
              }}
            >
              Hire Me
            </button>
          </div>
        </header>

        {/* Photo Grid */}
        {portfolio.length > 0 && (
          <section
            style={{
              padding: "0 4vw 50px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className="neon-tpl-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gridTemplateRows: "320px 180px 350px",
                gap: 10,
              }}
            >
              {portfolio.slice(0, 6).map((photo, i) => {
                const placements: Record<number, React.CSSProperties> = {
                  0: { gridColumn: "1 / 8", gridRow: "1 / 3" },
                  1: { gridColumn: "8 / 13", gridRow: "1" },
                  2: { gridColumn: "8 / 13", gridRow: "2 / 4" },
                  3: { gridColumn: "1 / 5", gridRow: "3" },
                  4: { gridColumn: "5 / 8", gridRow: "3" },
                  5: { gridColumn: "1 / 13", gridRow: "4", display: "none" },
                };
                const label = `// ${String(i + 1).padStart(3, "0")}`;
                return (
                  <div
                    key={photo.id}
                    className="neon-tpl-card"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      background: "#050508",
                      padding: 4,
                      cursor: "pointer",
                      transition: "transform .35s ease, box-shadow .35s ease",
                      ...placements[i],
                    }}
                    onClick={() => onPhotoClick(i)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.filename || `Photo ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "saturate(.75) contrast(1.15) brightness(.7)",
                        transition: "filter .4s ease",
                      }}
                      loading="lazy"
                    />
                    <span
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 12,
                        fontFamily: '"DM Mono", monospace',
                        fontSize: 11,
                        fontWeight: 500,
                        color: "rgba(255,255,255,.45)",
                        letterSpacing: ".06em",
                        fontVariant: "small-caps",
                        pointerEvents: "none",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Manifesto / About */}
        <section
          className="neon-tpl-manifesto"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            padding: "40px 4vw 60px",
            borderTop: "1px solid rgba(34,211,238,.3)",
            borderBottom: "1px solid rgba(244,114,182,.3)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 18px",
                fontFamily: '"Orbitron", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(22px, 3.5vw, 36px)",
                textTransform: "uppercase",
                color: "#f472b6",
                textShadow:
                  "0 0 10px rgba(244,114,182,.6), 0 0 30px rgba(244,114,182,.2)",
                letterSpacing: ".04em",
              }}
            >
              Manifesto
            </h3>
            {website && (
              <a
                href={
                  website.startsWith("http") ? website : `https://${website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: "#22d3ee",
                  textDecoration: "none",
                  letterSpacing: ".08em",
                  borderBottom: "1px solid rgba(34,211,238,.3)",
                }}
              >
                {website}
              </a>
            )}
          </div>
          <div
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: 14,
              lineHeight: 1.75,
              color: "#9ca9b3",
            }}
          >
            {bio}
          </div>
        </section>
      </div>
    </>
  );
}
