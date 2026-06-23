import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500;1,600&display=swap');`;

export default function TemplatePortraitStudio(props: TemplateProps) {
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
    ? `From $${pricing?.downloads?.single}`
    : "";
  const photos = portfolio.slice(0, 3);

  return (
    <>
      <style>{fonts}</style>
      <div
        className="studio-tpl"
        style={{
          background: "#fff",
          color: "#181818",
          fontFamily: '"Inter", sans-serif',
          minHeight: "100vh",
        }}
      >
        {/* ── Nav ── */}
        <nav
          className="studio-tpl-nav"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "18px 32px",
            borderBottom: "1px solid #cfcfcf",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              color: "#888",
              fontVariant: "all-small-caps",
            }}
          >
            {serviceArea}
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: ".04em",
              textAlign: "center",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              color: "#888",
              textAlign: "right",
              fontVariant: "all-small-caps",
            }}
          >
            {specialties.slice(0, 3).join(" · ")}
          </div>
        </nav>

        {/* ── Header ── */}
        <header
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "80px 24px 50px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: ".18em",
              color: "#777",
              fontVariant: "all-small-caps",
              marginBottom: 18,
            }}
          >
            Portrait Photography
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 300,
              fontSize: "clamp(48px, 9vw, 96px)",
              letterSpacing: "-.075em",
              color: "#181818",
              lineHeight: 0.95,
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
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#d1fae5",
                  fontSize: 14,
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

          {tagline && (
            <p
              style={{
                marginTop: 22,
                marginBottom: 0,
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(18px, 2.5vw, 24px)",
                color: "#666",
              }}
            >
              {tagline}
            </p>
          )}

          {priceLabel && (
            <div
              style={{
                marginTop: 16,
                fontSize: 13,
                fontWeight: 500,
                color: "#999",
                letterSpacing: ".04em",
              }}
            >
              {priceLabel}
            </div>
          )}

          <button
            onClick={onHire}
            className="studio-tpl-hire"
            style={{
              marginTop: 32,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 48,
              padding: "0 36px",
              background: "#171717",
              color: "#fff",
              border: "2px solid #171717",
              borderRadius: 0,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background .3s, color .3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.color = "#171717";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#171717";
              e.currentTarget.style.color = "#fff";
            }}
          >
            Hire Me
          </button>
        </header>

        {/* ── Portrait Column ── */}
        {photos.length > 0 && (
          <div
            className="studio-tpl-portraits"
            style={{
              maxWidth: 820,
              margin: "0 auto",
              padding: "0 24px 60px",
              display: "flex",
              flexDirection: "column",
              gap: 80,
            }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="studio-tpl-portrait-wrap"
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() => onPhotoClick(i)}
              >
                {/* Rotated caption label — left side */}
                <div
                  className="studio-tpl-caption"
                  style={{
                    position: "absolute",
                    left: -40,
                    top: "50%",
                    transform: "rotate(-90deg) translateX(-50%)",
                    transformOrigin: "0 0",
                    fontSize: 10,
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: ".14em",
                    color: "#aaa",
                    whiteSpace: "nowrap",
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                >
                  {photo.filename}
                </div>

                {/* Photo with dramatic light glow */}
                <div
                  className="studio-tpl-photo-container"
                  style={{ position: "relative" }}
                >
                  <img
                    src={photo.url}
                    alt={photo.filename || `Portrait ${i + 1}`}
                    style={{
                      width: "100%",
                      height: 980,
                      objectFit: "cover",
                      display: "block",
                      filter: "saturate(.78) contrast(1.06)",
                      boxShadow:
                        "-28px 0 60px -20px rgba(165,202,235,.35), 28px 0 60px -20px rgba(249,209,184,.34), 0 12px 40px rgba(0,0,0,.10)",
                      transition: "transform .5s ease",
                      position: "relative",
                      zIndex: 1,
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Footer ── */}
        <footer
          style={{
            maxWidth: 700,
            margin: "0 auto",
            padding: "40px 24px 60px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              padding: "36px 0",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: '"Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#555",
                lineHeight: 1.7,
              }}
            >
              {bio || "Every portrait tells a story — let me tell yours."}
            </p>
          </div>
        </footer>
      </div>

      {/* ── Scoped styles: pseudo-elements & responsive ── */}
      <style>{`
        .studio-tpl-photo-container::before {
          content: "";
          position: absolute;
          inset: -40px;
          z-index: 0;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 30% 50%, rgba(165,202,235,.35) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(249,209,184,.34) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .studio-tpl-nav {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 6px !important;
          }
          .studio-tpl-nav > div {
            text-align: center !important;
          }
          .studio-tpl-caption {
            position: static !important;
            transform: none !important;
            left: auto !important;
            top: auto !important;
            text-align: center !important;
            padding: 12px 0 6px !important;
            background: rgba(255,255,255,.85) !important;
          }
          .studio-tpl-portrait-wrap img {
            height: auto !important;
            max-height: 600px !important;
            width: 100% !important;
          }
          .studio-tpl-portraits {
            padding: 0 12px 40px !important;
            gap: 50px !important;
          }
        }
      `}</style>
    </>
  );
}
