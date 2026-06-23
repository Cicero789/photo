import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Montserrat:wght@400;500;600&display=swap');`;

export default function Template6Split(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const heroPhoto = portfolio?.[0];
  const thumbPhotos = portfolio.slice(1);
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing?.downloads?.single}` : "";

  return (
    <>
      <style>{fonts}</style>
      <div style={{ background: "#fffbf5", fontFamily: "Montserrat, sans-serif" }}>
        {/* Split Top */}
        <div
          style={{
            minHeight: 720,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
          className="split-hero-grid"
        >
          {/* Left: Hero Image */}
          {heroPhoto && (
            <div
              style={{ minHeight: 720, overflow: "hidden", cursor: "pointer" }}
              onClick={() => onPhotoClick(0)}
            >
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename || "Hero"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .65s cubic-bezier(.2,.7,.2,1)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.035)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          )}

          {/* Right: Copy */}
          <div
            style={{
              padding: "8vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {serviceArea && (
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                  fontSize: 11,
                  color: "#735f4b",
                }}
              >
                {serviceArea}
              </span>
            )}
            <h2
              style={{
                margin: "10px 0 20px",
                color: "#30261c",
                font: '600 clamp(52px, 7vw, 100px)/.85 "Cormorant Garamond", serif',
              }}
            >
              {name}
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
                  title="Verified photographer"
                >
                  ✓
                </span>
              )}
            </h2>
            {tagline && (
              <p style={{ color: "#735f4b", lineHeight: 1.75, fontSize: 13, margin: "0 0 4px" }}>
                {tagline}
              </p>
            )}
            {specialties.length > 0 && (
              <div
                style={{
                  margin: "15px 0",
                  color: "#b45309",
                  textTransform: "uppercase",
                  letterSpacing: ".13em",
                  fontSize: 10,
                }}
              >
                {specialties.join(" · ")}
              </div>
            )}
            {bio && (
              <p style={{ color: "#735f4b", lineHeight: 1.75, fontSize: 13, margin: "0 0 10px" }}>
                {bio}
              </p>
            )}
            <button
              onClick={onHire}
              style={{
                alignSelf: "flex-start",
                marginTop: 15,
                color: "white",
                background: "#b45309",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 44,
                padding: "0 24px",
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
        </div>

        {/* Thumbnail Grid */}
        {thumbPhotos.length > 0 && (
          <div
            style={{
              padding: "70px 7vw",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
            className="split-thumbs-grid"
          >
            {thumbPhotos.map((photo, i) => (
              <div
                key={photo.id}
                style={{ height: 460, overflow: "hidden", cursor: "pointer" }}
                onClick={() => onPhotoClick(i + 1)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Photo ${i + 2}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform .65s cubic-bezier(.2,.7,.2,1)",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.035)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .split-hero-grid { grid-template-columns: 1fr !important; }
          .split-hero-grid > div:first-child { min-height: 80vh !important; }
          .split-hero-grid > div:last-child { padding: 70px 9vw !important; }
        }
        @media (max-width: 520px) {
          .split-thumbs-grid { grid-template-columns: 1fr !important; }
          .split-thumbs-grid > div { height: 380px !important; }
        }
      `}</style>
    </>
  );
}
