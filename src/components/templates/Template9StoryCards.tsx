import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500&display=swap');`;

/** Generate story card labels from portfolio data + specialties */
function storyLabel(index: number, specialties: string[], filename: string): { small: string; h3: string } {
  const cats = specialties.length > 0 ? specialties : ["Photography"];
  const cat = cats[index % cats.length] ?? "Photography";
  const title = filename
    ? filename.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")
    : `Story ${index + 1}`;
  return { small: index === 0 ? `Featured story` : cat, h3: title };
}

export default function Template9StoryCards(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing.downloads.single}` : "";
  const metaLine = [serviceArea, ...specialties].filter(Boolean).join(" · ");

  return (
    <>
      <style>{fonts}</style>
      <div style={{ padding: "70px 5vw 100px", background: "#fffbf5", fontFamily: "Poppins, sans-serif" }}>
        {/* Header */}
        <header
          className="stories-tpl-head"
          style={{
            maxWidth: 1200,
            margin: "0 auto 38px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "end",
            gap: 40,
          }}
        >
          <div>
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: ".18em",
                fontSize: 11,
                color: "#8a6c55",
              }}
            >
              Stories by {name.split(" ")[0]}
            </span>
            <h2
              style={{
                margin: "6px 0",
                color: "#523927",
                font: '600 clamp(43px, 6vw, 82px)/.95 Lora, serif',
              }}
            >
              {tagline || (
                <>
                  Love, light &amp;
                  <br />
                  everything between.
                </>
              )}
              {verified && (
                <span
                  style={{
                    marginLeft: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#d1fae5",
                    fontSize: 14,
                    color: "#059669",
                    verticalAlign: "middle",
                  }}
                  title="Verified"
                >
                  ✓
                </span>
              )}
            </h2>
            {bio && (
              <p style={{ color: "#8a6c55", maxWidth: 580, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                {bio}
              </p>
            )}
          </div>
          <div>
            {metaLine && (
              <span style={{ fontSize: 13, color: "#8a6c55" }}>{metaLine}</span>
            )}
            <br /><br />
            <button
              onClick={onHire}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 24px",
                color: "white",
                background: "#8a552f",
                borderRadius: 99,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 500,
                transition: "transform .25s, background .25s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
            </button>
          </div>
        </header>

        {/* Story Cards Grid */}
        <div
          className="stories-tpl-grid"
          style={{
            maxWidth: 1200,
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 25,
          }}
        >
          {portfolio.map((photo, i) => {
            const label = storyLabel(i, specialties, photo.filename);
            const isFeatured = i === 0;
            return (
              <article
                key={photo.id}
                className={isFeatured ? "stories-tpl-featured" : undefined}
                style={{
                  position: "relative",
                  height: isFeatured ? 640 : 420,
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "0 18px 40px #6b402718",
                  cursor: "pointer",
                  ...(isFeatured ? { gridColumn: "1 / -1" } : {}),
                }}
                onClick={() => onPhotoClick(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Story ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform .65s cubic-bezier(.2,.7,.2,1)",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.035)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: "40% 0 0",
                    background: "linear-gradient(transparent, rgba(38, 20, 8, .8))",
                    pointerEvents: "none",
                  }}
                />
                {/* Label */}
                <div
                  style={{
                    position: "absolute",
                    zIndex: 2,
                    left: 30,
                    right: 30,
                    bottom: 26,
                    color: "white",
                  }}
                >
                  <small
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: ".18em",
                      fontSize: 11,
                    }}
                  >
                    {label.small}
                  </small>
                  <h3
                    style={{
                      margin: "5px 0 0",
                      font: '600 34px/1.1 Lora, serif',
                    }}
                  >
                    {label.h3}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .stories-tpl-head { grid-template-columns: 1fr !important; }
          .stories-tpl-featured { height: 520px !important; }
        }
        @media (max-width: 520px) {
          .stories-tpl-grid { grid-template-columns: 1fr !important; }
          .stories-tpl-featured { grid-column: auto !important; }
          .stories-tpl-grid > article { height: 440px !important; }
        }
      `}</style>
    </>
  );
}
