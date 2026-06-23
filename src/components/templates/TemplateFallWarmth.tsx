import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap');`;

export default function TemplateFallWarmth(props: TemplateProps) {
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
    : pricing?.downloads?.full
      ? `Full set $${pricing?.downloads?.full}`
      : "";

  const heroPhoto = portfolio.length > 0 ? portfolio?.[0] : null;
  const galleryPhotos = portfolio.slice(1, 4);

  return (
    <>
      <style>{fonts}</style>
      <div
        className="warmth-tpl"
        style={{
          position: "relative",
          background: `
            radial-gradient(ellipse 120% 80% at 20% 10%, rgba(217,119,6,.35) 0%, transparent 60%),
            radial-gradient(ellipse 100% 70% at 80% 90%, rgba(194,65,12,.3) 0%, transparent 55%),
            radial-gradient(ellipse 90% 60% at 50% 50%, rgba(180,83,9,.2) 0%, transparent 50%),
            #451a03
          `,
          color: "#e4c39b",
          fontFamily: '"DM Sans", sans-serif',
          fontSize: 16,
          lineHeight: 1.65,
          overflow: "hidden",
        }}
      >
        {/* Leaf pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.09,
            pointerEvents: "none",
            background: `
              radial-gradient(ellipse 18px 24px at 15% 20%, #c2410c 50%, transparent 51%),
              radial-gradient(ellipse 14px 20px at 45% 35%, #d97706 50%, transparent 51%),
              radial-gradient(ellipse 20px 28px at 75% 15%, #9a3412 50%, transparent 51%),
              radial-gradient(ellipse 16px 22px at 25% 65%, #d97706 50%, transparent 51%),
              radial-gradient(ellipse 12px 18px at 85% 55%, #c2410c 50%, transparent 51%),
              radial-gradient(ellipse 18px 26px at 55% 80%, #9a3412 50%, transparent 51%),
              radial-gradient(ellipse 14px 20px at 10% 90%, #d97706 50%, transparent 51%),
              radial-gradient(ellipse 16px 24px at 65% 50%, #c2410c 50%, transparent 51%)
            `,
          }}
        />

        {/* Decorative leaf shapes */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: -30,
            width: 90,
            height: 90,
            borderRadius: "100% 0 100% 0",
            background: "#c2410c",
            opacity: 0.18,
            transform: "rotate(25deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            left: -20,
            width: 70,
            height: 70,
            borderRadius: "100% 0 100% 0",
            background: "#d97706",
            opacity: 0.15,
            transform: "rotate(-15deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 120,
            right: 40,
            width: 60,
            height: 60,
            borderRadius: "100% 0 100% 0",
            background: "#9a3412",
            opacity: 0.14,
            transform: "rotate(40deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 300,
            left: 50,
            width: 50,
            height: 50,
            borderRadius: "100% 0 100% 0",
            background: "#c2410c",
            opacity: 0.12,
            transform: "rotate(-30deg)",
          }}
        />

        {/* Nav */}
        <nav
          className="warmth-tpl-nav"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "18px 32px",
            borderTop: "2px solid rgba(247,197,127,.5)",
            borderBottom: "2px solid rgba(247,197,127,.5)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#e7bd85",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {serviceArea && <span>{serviceArea}</span>}
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: '"Libre Baskerville", serif',
              fontWeight: 700,
              fontSize: "clamp(18px, 2.5vw, 28px)",
              color: "#fff4d9",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            {name}
          </h1>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#e7bd85",
              textAlign: "right",
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {specialties.length > 0 && <span>{specialties.join(" · ")}</span>}
          </div>
        </nav>

        {/* Hero */}
        <section
          className="warmth-tpl-hero"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: ".88fr 1.12fr",
            minHeight: 480,
            margin: "32px 32px 0",
          }}
        >
          {/* Hero left — copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "48px 40px",
              background: "linear-gradient(135deg, #5b2104 0%, #3d1603 100%)",
              borderRadius: "4px 0 0 4px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                marginBottom: 12,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e88744",
              }}
            >
              {tagline || "Photographer"}
            </span>
            <h2
              style={{
                margin: "0 0 6px",
                fontFamily: '"Libre Baskerville", serif',
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.15,
                color: "#fff4d9",
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
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#059669",
                    fontSize: 14,
                    color: "#fff",
                    verticalAlign: "middle",
                    fontFamily: "sans-serif",
                    lineHeight: 1,
                  }}
                  title="Verified Photographer"
                >
                  ✓
                </span>
              )}
            </h2>
            {priceLabel && (
              <span
                style={{
                  marginBottom: 16,
                  fontSize: 14,
                  color: "#e88744",
                  fontWeight: 500,
                }}
              >
                {priceLabel}
              </span>
            )}
            <p
              style={{
                margin: "12px 0 28px",
                fontFamily: '"Source Serif 4", serif',
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.75,
                color: "#e4c39b",
                maxWidth: 420,
              }}
            >
              {bio}
            </p>
            <button
              className="warmth-tpl-hire"
              onClick={onHire}
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 48,
                padding: "0 32px",
                background: "#c2410c",
                color: "#fff4d9",
                border: "none",
                borderRadius: 2,
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: "6px 6px 0 #281001",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translate(-2px, -2px)";
                e.currentTarget.style.boxShadow = "8px 8px 0 #281001";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "6px 6px 0 #281001";
              }}
            >
              Hire Me
            </button>
          </div>

          {/* Hero right — photo */}
          {heroPhoto && (
            <div
              style={{
                position: "relative",
                padding: 10,
                background: `
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 6px,
                    rgba(180,83,9,.25) 6px,
                    rgba(180,83,9,.25) 8px
                  )
                `,
                border: "3px solid #b45309",
                borderRadius: "0 4px 4px 0",
                cursor: "pointer",
              }}
              onClick={() => onPhotoClick(0)}
            >
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename || "Hero photo"}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  minHeight: 380,
                }}
                loading="eager"
              />
            </div>
          )}
        </section>

        {/* Gallery */}
        {galleryPhotos.length > 0 && (
          <section
            className="warmth-tpl-gallery"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              padding: "32px 32px 0",
            }}
          >
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                style={{
                  position: "relative",
                  border: "2px solid rgba(247,197,127,.4)",
                  borderRadius: 4,
                  overflow: "hidden",
                  cursor: "pointer",
                  aspectRatio: "4 / 3",
                }}
                onClick={() => onPhotoClick(i + 1)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Photo ${i + 2}`}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "sepia(.2) saturate(1.1)",
                    transition: "transform .4s, filter .4s",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter = "sepia(0) saturate(1.2)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "sepia(.2) saturate(1.1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 14px 10px",
                    background:
                      "linear-gradient(to top, rgba(69,26,3,.85) 0%, transparent 100%)",
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#e7bd85",
                  }}
                >
                  {photo.filename}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Footer */}
        <footer
          className="warmth-tpl-footer"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            margin: "40px 32px 0",
            padding: "28px 0 36px",
            borderTop: "2px solid #a85e2d",
            borderBottom: "2px solid #a85e2d",
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 10px",
                fontFamily: '"Libre Baskerville", serif',
                fontWeight: 700,
                fontSize: 20,
                color: "#fff4d9",
              }}
            >
              {tagline || "Let’s Create Together"}
            </h3>
            {specialties.length > 0 && (
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: "#e4c39b",
                  lineHeight: 1.7,
                }}
              >
                Specializing in {specialties.join(", ").toLowerCase()}.
              </p>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: "0 0 6px",
                fontFamily: '"Source Serif 4", serif',
                fontStyle: "italic",
                fontSize: 14,
                color: "#e4c39b",
                lineHeight: 1.7,
              }}
            >
              Based in {serviceArea || "your area"}. Available for travel worldwide.
            </p>
            {priceLabel && (
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#e88744",
                  letterSpacing: "0.06em",
                }}
              >
                {priceLabel}
              </span>
            )}
          </div>
        </footer>

        {/* Bottom padding */}
        <div style={{ height: 40 }} />
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .warmth-tpl-hero {
            grid-template-columns: 1fr !important;
          }
          .warmth-tpl-hero > div:first-child {
            border-radius: 4px 4px 0 0 !important;
          }
          .warmth-tpl-hero > div:last-child {
            border-radius: 0 0 4px 4px !important;
          }
          .warmth-tpl-nav {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 8px !important;
          }
          .warmth-tpl-nav > div {
            text-align: center !important;
          }
        }
        @media (max-width: 600px) {
          .warmth-tpl-hero {
            margin: 16px 16px 0 !important;
          }
          .warmth-tpl-hero > div:first-child {
            padding: 28px 20px !important;
          }
          .warmth-tpl-gallery {
            grid-template-columns: 1fr !important;
            padding: 20px 16px 0 !important;
          }
          .warmth-tpl-footer {
            grid-template-columns: 1fr !important;
            margin: 24px 16px 0 !important;
            gap: 20px !important;
          }
          .warmth-tpl-footer > div {
            text-align: left !important;
          }
          .warmth-tpl-nav {
            padding: 14px 16px !important;
          }
        }
      `}</style>
    </>
  );
}
