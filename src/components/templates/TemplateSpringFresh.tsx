import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&display=swap');`;

export default function TemplateSpringFresh(props: TemplateProps) {
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
    ? `From $${pricing?.downloads?.single}`
    : "";

  const displayPhotos = portfolio.slice(0, 6);
  const displaySpecialties = specialties.slice(0, 4);

  const gridPlacements: Record<number, React.CSSProperties> = {
    0: { gridColumn: "1 / 7", gridRow: "1 / 3" },
    1: { gridColumn: "7 / 13", gridRow: "1" },
    2: { gridColumn: "7 / 10", gridRow: "2" },
    3: { gridColumn: "10 / 13", gridRow: "2" },
    4: { gridColumn: "1 / 5", gridRow: "3" },
    5: { gridColumn: "5 / 13", gridRow: "3" },
  };

  const padNum = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      <style>{fonts}</style>
      <div
        className="fresh-tpl"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#f0fdf4",
          fontFamily: '"Manrope", sans-serif',
          fontWeight: 400,
          color: "#1a3a2a",
          overflow: "hidden",
        }}
      >
        {/* Radial gradient background layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(16,185,129,.12) 0%, transparent 60%), " +
              "radial-gradient(ellipse 60% 50% at 85% 80%, rgba(5,150,105,.10) 0%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Leaf pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.16,
            background:
              "radial-gradient(circle 6px at 15% 25%, #059669 50%, transparent 51%), " +
              "radial-gradient(circle 4px at 40% 60%, #10b981 50%, transparent 51%), " +
              "radial-gradient(circle 5px at 70% 15%, #047857 50%, transparent 51%), " +
              "radial-gradient(circle 3px at 85% 45%, #059669 50%, transparent 51%), " +
              "radial-gradient(circle 7px at 55% 85%, #10b981 50%, transparent 51%), " +
              "radial-gradient(circle 4px at 25% 75%, #047857 50%, transparent 51%), " +
              "radial-gradient(circle 5px at 92% 70%, #059669 50%, transparent 51%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content wrapper */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Nav bar */}
          <nav
            className="fresh-tpl-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 4vw",
              borderBottom: "2px solid #059669",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <span
              style={{
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: "-.02em",
              }}
            >
              {name}
            </span>
            <span
              style={{
                fontSize: 12,
                fontVariant: "small-caps",
                letterSpacing: ".08em",
                color: "#527566",
                fontWeight: 600,
              }}
            >
              {serviceArea && <span>{serviceArea}</span>}
              {serviceArea && specialties.length > 0 && (
                <span style={{ margin: "0 8px" }}>/</span>
              )}
              {specialties.length > 0 && (
                <span>{specialties.join(" · ")}</span>
              )}
            </span>
          </nav>

          {/* Header section */}
          <header
            className="fresh-tpl-header"
            style={{
              display: "grid",
              gridTemplateColumns: "1.18fr .82fr",
              gap: "40px",
              padding: "60px 4vw 50px",
              alignItems: "center",
            }}
          >
            <div>
              {/* Kicker badge */}
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 18px",
                  background: "#059669",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 50,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {tagline || "Photographer"}
              </span>

              {/* Name */}
              <h1
                style={{
                  margin: 0,
                  font: '800 clamp(48px, 8vw, 110px)/0.92 "Manrope", sans-serif',
                  letterSpacing: "-.08em",
                  color: "#0f2a1d",
                }}
              >
                {name}
                {verified && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#059669",
                      color: "white",
                      fontSize: 15,
                      marginLeft: 12,
                      verticalAlign: "middle",
                      fontFamily: "sans-serif",
                    }}
                    title="Verified"
                  >
                    ✓
                  </span>
                )}
              </h1>

              {priceLabel && (
                <p
                  style={{
                    marginTop: 18,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#059669",
                  }}
                >
                  {priceLabel}
                </p>
              )}
            </div>

            <div>
              {/* Bio */}
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "#527566",
                }}
              >
                {bio}
              </p>

              {/* Hire button */}
              <button
                className="fresh-tpl-hire"
                onClick={onHire}
                style={{
                  marginTop: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 48,
                  padding: "0 32px",
                  background: "#059669",
                  color: "white",
                  border: "2px solid #059669",
                  borderRadius: 10,
                  fontFamily: '"Manrope", sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "7px 7px 0 #8de0af",
                  transition: "background .25s, color .25s, box-shadow .25s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#059669";
                  e.currentTarget.style.boxShadow = "4px 4px 0 #8de0af";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.boxShadow = "7px 7px 0 #8de0af";
                }}
              >
                HIRE ME
              </button>
            </div>
          </header>

          {/* Photo grid */}
          {displayPhotos.length > 0 && (
            <section style={{ padding: "0 4vw 50px" }}>
              <div
                className="fresh-tpl-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  gridTemplateRows: "320px 200px 280px",
                  gap: 14,
                }}
              >
                {displayPhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="fresh-tpl-photo"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: 8,
                      boxShadow: "0 4px 20px rgba(5,150,105,.18)",
                      cursor: "pointer",
                      ...gridPlacements[i],
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
                        transition: "transform .4s ease",
                      }}
                      loading="lazy"
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    {/* Growth label */}
                    <span
                      className="growth-label"
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        padding: "5px 12px",
                        background: "#047857",
                        color: "white",
                        fontSize: 11,
                        fontWeight: 600,
                        borderRadius: 4,
                        letterSpacing: ".03em",
                        pointerEvents: "none",
                      }}
                    >
                      {photo.filename || `Photo ${i + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Service cards */}
          {displaySpecialties.length > 0 && (
            <section style={{ padding: "20px 4vw 60px" }}>
              <div
                className="fresh-tpl-services"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 18,
                }}
              >
                {displaySpecialties.map((spec, i) => (
                  <div
                    key={i}
                    style={{
                      background: "white",
                      border: "2px solid #bbf7d0",
                      borderRadius: 12,
                      padding: "28px 22px",
                      transition: "border-color .25s, box-shadow .25s",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.boxShadow =
                        "0 6px 24px rgba(5,150,105,.13)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#bbf7d0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontWeight: 800,
                        fontSize: 32,
                        color: "#d1fae5",
                        lineHeight: 1,
                        marginBottom: 12,
                        fontFamily: '"Manrope", sans-serif',
                      }}
                    >
                      {padNum(i)}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#1a3a2a",
                      }}
                    >
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <footer
            style={{
              padding: "24px 4vw",
              borderTop: "2px solid #bbf7d0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
              fontSize: 13,
              color: "#527566",
            }}
          >
            <span style={{ fontWeight: 600 }}>
              {website || `${name} Photography`}
            </span>
            <span>{serviceArea}</span>
          </footer>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .fresh-tpl-header {
            grid-template-columns: 1fr !important;
            padding: 40px 4vw 36px !important;
            gap: 24px !important;
          }
          .fresh-tpl-services {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .fresh-tpl-grid {
            grid-template-rows: 260px 180px 240px !important;
          }
        }
        @media (max-width: 600px) {
          .fresh-tpl-nav {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
          .fresh-tpl-header {
            padding: 28px 4vw 24px !important;
          }
          .fresh-tpl-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(3, 200px) !important;
          }
          .fresh-tpl-grid > div {
            grid-column: auto !important;
            grid-row: auto !important;
          }
          .fresh-tpl-services {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
