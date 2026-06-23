import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap');`;

const ACCENT_COLORS = ["#ea580c", "#b91c1c", "#d97706", "#eab308", "#9a3412", "#c2410c"];

export default function TemplateFallPalette(props: TemplateProps) {
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
    : pricing?.downloads?.full
      ? `Full set $${pricing?.downloads?.full}`
      : "";

  return (
    <>
      <style>{fonts}</style>

      <div
        className="palette-tpl"
        style={{
          background: "#fffbeb",
          color: "#3f2a1d",
          fontFamily: '"Manrope", sans-serif',
          fontWeight: 400,
          minHeight: "100%",
        }}
      >
        {/* ── Autumn gradient strip ── */}
        <div
          style={{
            height: 13,
            background:
              "linear-gradient(90deg, #ea580c 0%, #c2410c 24%, #b91c1c 47%, #d97706 72%, #eab308 100%)",
          }}
        />

        {/* ── Nav ── */}
        <nav
          className="palette-tpl-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 5vw",
            borderBottom: "1px solid #b99e78",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 20 }}>{name}</span>
          {serviceArea && (
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8b6f4e",
              }}
            >
              {serviceArea}
            </span>
          )}
        </nav>

        {/* ── Header ── */}
        <header
          className="palette-tpl-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.18fr .82fr",
            gap: 48,
            padding: "56px 5vw 48px",
            alignItems: "center",
          }}
        >
          {/* Left column */}
          <div>
            {/* Kicker with gradient bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 36,
                  height: 4,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #ea580c, #eab308)",
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#b45309",
                }}
              >
                {tagline || "Photographer"}
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                margin: 0,
                fontFamily: '"Manrope", sans-serif',
                fontWeight: 800,
                fontSize: "clamp(42px, 7vw, 82px)",
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "#3f2a1d",
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
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#d1fae5",
                    fontSize: 15,
                    color: "#059669",
                    verticalAlign: "middle",
                    fontFamily: "sans-serif",
                  }}
                  title="Verified"
                >
                  ✓
                </span>
              )}
            </h1>

            {/* Bio */}
            <p
              style={{
                marginTop: 22,
                fontSize: 15,
                lineHeight: 1.7,
                color: "#775f49",
                maxWidth: 520,
              }}
            >
              {bio}
            </p>

            {/* Hire button */}
            <button
              onClick={onHire}
              style={{
                marginTop: 28,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 32px",
                background: "#b45309",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontFamily: '"Manrope", sans-serif',
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                boxShadow: "6px 6px 0 #f5c158",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "8px 8px 0 #f5c158";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translate(0,0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #f5c158";
              }}
            >
              Hire Me
            </button>
          </div>

          {/* Right column — price card / info */}
          <div
            style={{
              background: "#fffdf6",
              border: "1px solid #e8d8c4",
              borderRadius: 12,
              padding: "36px 32px",
            }}
          >
            {priceLabel && (
              <p
                style={{
                  margin: "0 0 8px",
                  fontWeight: 800,
                  fontSize: 26,
                  color: "#b45309",
                }}
              >
                {priceLabel}
              </p>
            )}
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: "#775f49" }}>
              {specialties.length > 0
                ? specialties.join(" · ")
                : "Photography"}
            </p>
            {website && (
              <p style={{ margin: "14px 0 0", fontSize: 13, color: "#b99e78" }}>{website}</p>
            )}
          </div>
        </header>

        {/* ── Gallery ── */}
        {portfolio.length > 0 && (
          <section style={{ padding: "0 5vw 48px" }}>
            {/* Scroll hint */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#b99e78",
              }}
            >
              <span>Scroll the season</span>
              <span style={{ fontSize: 18 }}>→→</span>
            </div>

            <div
              className="palette-tpl-gallery"
              style={{
                display: "flex",
                gap: 20,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                paddingBottom: 12,
              }}
            >
              {portfolio.slice(0, 6).map((photo, i) => {
                const borderColor = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <div
                    key={photo.id}
                    style={{
                      flex: "0 0 300px",
                      scrollSnapAlign: "start",
                      border: "8px solid #fff",
                      borderBottom: `8px solid ${borderColor}`,
                      borderRadius: 6,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      boxShadow: "0 2px 12px rgba(63,42,29,.1)",
                    }}
                    onClick={() => onPhotoClick(i)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.filename || `Photo ${i + 1}`}
                      style={{
                        display: "block",
                        width: "100%",
                        height: 220,
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                    {/* Label */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        padding: "6px 14px",
                        background: "rgba(30,18,10,.72)",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        borderTopRightRadius: 6,
                      }}
                    >
                      {photo.filename || `Photo ${i + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Service cards ── */}
        {specialties.length > 0 && (
          <section
            className="palette-tpl-services"
            style={{ padding: "0 5vw 64px" }}
          >
            <div
              className="palette-tpl-service-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {specialties.slice(0, 3).map((spec, i) => {
                const topColor = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <div
                    key={spec}
                    style={{
                      background: "#fffdf6",
                      border: "1px solid #e8d8c4",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    {/* Colored top bar */}
                    <div style={{ height: 5, background: topColor }} />
                    <div style={{ padding: "24px 22px" }}>
                      <h3
                        style={{
                          margin: 0,
                          fontWeight: 800,
                          fontSize: 17,
                          color: "#3f2a1d",
                        }}
                      >
                        {spec}
                      </h3>
                      <p
                        style={{
                          margin: "10px 0 0",
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: "#775f49",
                        }}
                      >
                        Professional {spec.toLowerCase()} photography tailored
                        to your vision.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        .palette-tpl-gallery::-webkit-scrollbar {
          height: 6px;
        }
        .palette-tpl-gallery::-webkit-scrollbar-thumb {
          background: #d4b896;
          border-radius: 3px;
        }
        .palette-tpl-gallery::-webkit-scrollbar-track {
          background: transparent;
        }
        @media (max-width: 900px) {
          .palette-tpl-header {
            grid-template-columns: 1fr !important;
          }
          .palette-tpl-service-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .palette-tpl-nav {
            flex-direction: column;
            gap: 6px;
            text-align: center;
          }
          .palette-tpl-header {
            grid-template-columns: 1fr !important;
            padding: 32px 5vw 28px !important;
            gap: 28px !important;
          }
          .palette-tpl-service-grid {
            grid-template-columns: 1fr !important;
          }
          .palette-tpl-gallery > div {
            flex: 0 0 260px !important;
          }
        }
      `}</style>
    </>
  );
}
