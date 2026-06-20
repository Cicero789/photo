import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Roboto+Mono:wght@400;700&display=swap');`;

export default function Template10Brutalist(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing.downloads.single}` : "";

  return (
    <>
      <style>{fonts}</style>
      <div
        className="brutal-tpl"
        style={{
          padding: "35px 3vw 80px",
          background: "white",
          color: "black",
          fontFamily: '"Roboto Mono", monospace',
          border: "12px solid black",
        }}
      >
        {/* Header */}
        <header style={{ borderBottom: "10px solid black", paddingBottom: 25 }}>
          <h2
            style={{
              margin: 0,
              maxWidth: 1200,
              font: '700 clamp(72px, 13vw, 190px)/.76 Oswald, sans-serif',
              textTransform: "uppercase",
              letterSpacing: "-.06em",
            }}
          >
            {name}
            {verified && (
              <span
                style={{
                  marginLeft: 14,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#d1fae5",
                  fontSize: 16,
                  color: "#059669",
                  verticalAlign: "middle",
                  fontFamily: "sans-serif",
                }}
                title="Verified"
              >
                ✓
              </span>
            )}
          </h2>
          <div
            className="brutal-tpl-meta"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 12,
              marginTop: 28,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {serviceArea && <span>{serviceArea}</span>}
            {specialties.length > 0 && <span>{specialties.join(" / ")}</span>}
            {priceLabel && <span>{priceLabel}</span>}
          </div>
        </header>

        {/* Grid */}
        {portfolio.length > 0 && (
          <div
            className="brutal-tpl-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "370px 180px 420px",
              gap: 12,
              margin: "20px 0",
            }}
          >
            {portfolio.slice(0, 6).map((photo, i) => {
              // Grid placement for each photo
              const placements: Record<number, React.CSSProperties> = {
                0: { gridColumn: "1 / 8", gridRow: "1 / 3" },
                1: { gridColumn: "8 / 13", gridRow: "1" },
                2: { gridColumn: "9 / 13", gridRow: "2 / 4" },
                3: { gridColumn: "1 / 5", gridRow: "3" },
                4: { gridColumn: "5 / 9", gridRow: "3" },
                5: { display: "none" },
              };
              return (
                <div
                  key={photo.id}
                  style={{
                    overflow: "hidden",
                    filter: "grayscale(1) contrast(1.13)",
                    border: "5px solid black",
                    cursor: "pointer",
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
                      transition: "opacity .35s",
                    }}
                    loading="lazy"
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.62")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <footer
          className="brutal-tpl-foot"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: 30,
            alignItems: "start",
            borderTop: "10px solid black",
            paddingTop: 24,
            textTransform: "uppercase",
            fontSize: 13,
            lineHeight: 1.55,
          }}
        >
          <strong>{tagline || "Photography"}</strong>
          <span style={{ textTransform: "none" }}>{bio}</span>
          <button
            onClick={onHire}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0 24px",
              color: "white",
              background: "black",
              border: "5px solid black",
              fontWeight: 700,
              fontSize: 18,
              fontFamily: '"Roboto Mono", monospace',
              cursor: "pointer",
              transition: "background .25s, color .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "black";
              e.currentTarget.style.background = "white";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.background = "black";
            }}
          >
            EMAIL ME
          </button>
        </footer>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .brutal-tpl-grid { grid-template-rows: 260px 130px 300px !important; }
          .brutal-tpl-foot { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .brutal-tpl { border-width: 7px !important; }
          .brutal-tpl header { border-bottom-width: 7px !important; }
          .brutal-tpl-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(3, 230px) !important;
          }
          .brutal-tpl-grid > div { grid-column: auto !important; grid-row: auto !important; display: block !important; }
        }
      `}</style>
    </>
  );
}
