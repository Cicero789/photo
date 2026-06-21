import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Allura&family=DM+Sans:wght@400;500;600&display=swap');`;

export default function TemplateSpringBlossom(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing.downloads.single}` : "";

  /* Petal-shaped photo placements (absolute, matching mockup) */
  const petalPlacements: Record<number, React.CSSProperties> = {
    0: {
      zIndex: 4, left: "28%", top: 35, width: "44%", height: 570,
      borderRadius: "55% 45% 52% 48% / 70% 48% 52% 30%",
      transform: "rotate(-2deg)",
    },
    1: {
      zIndex: 2, left: "2%", top: 115, width: "31%", height: 390,
      borderRadius: "80% 20% 75% 25% / 70% 30% 70% 30%",
      transform: "rotate(-10deg)",
    },
    2: {
      zIndex: 2, right: "2%", top: 120, width: "31%", height: 390,
      borderRadius: "20% 80% 25% 75% / 30% 70% 30% 70%",
      transform: "rotate(9deg)",
    },
    3: {
      zIndex: 5, left: "11%", bottom: 0, width: "32%", height: 300,
      borderRadius: "70% 30% 65% 35% / 38% 62% 38% 62%",
      transform: "rotate(5deg)",
    },
    4: {
      zIndex: 5, right: "10%", bottom: 0, width: "32%", height: 300,
      borderRadius: "30% 70% 35% 65% / 62% 38% 62% 38%",
      transform: "rotate(-5deg)",
    },
  };

  /* Small falling petal decorations */
  const fallingPetals: React.CSSProperties[] = [
    { left: "7%", top: 180, transform: "rotate(35deg)" },
    { right: "8%", top: 340, transform: "rotate(105deg) scale(.7)" },
    { left: "17%", bottom: 240, transform: "rotate(-20deg) scale(.75)" },
    { right: "14%", bottom: 100, transform: "rotate(175deg)" },
  ];

  return (
    <>
      <style>{fonts}</style>
      <div
        className="blossom-tpl"
        style={{
          position: "relative",
          minHeight: 1400,
          padding: "60px 5vw 100px",
          color: "#5a3241",
          background:
            "radial-gradient(circle at 12% 18%, rgba(255,255,255,.95), transparent 22%), " +
            "radial-gradient(circle at 86% 68%, rgba(244,169,192,.16), transparent 27%), " +
            "#fdf2f8",
          fontFamily: '"DM Sans", sans-serif',
          overflow: "hidden",
        }}
      >
        {/* Decorative border shapes (replaces ::before / ::after) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -240,
            right: -50,
            width: 320,
            height: 500,
            border: "1px solid rgba(225,29,72,.17)",
            borderRadius: "100% 0 100% 0",
            transform: "rotate(25deg)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -250,
            left: -80,
            width: 320,
            height: 500,
            border: "1px solid rgba(225,29,72,.17)",
            borderRadius: "100% 0 100% 0",
            transform: "rotate(-35deg)",
            pointerEvents: "none",
          }}
        />

        {/* Falling petals */}
        {fallingPetals.map((style, i) => (
          <i
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              zIndex: 1,
              width: 22,
              height: 37,
              borderRadius: "100% 0 100% 0",
              background: "linear-gradient(135deg, #f4afc3, #fff2f6)",
              opacity: 0.65,
              pointerEvents: "none",
              ...style,
            }}
          />
        ))}

        {/* Nav bar */}
        <nav
          className="blossom-tpl-nav"
          style={{
            position: "relative",
            zIndex: 3,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: 30,
            alignItems: "center",
            maxWidth: 1410,
            margin: "0 auto",
            padding: "18px 0",
            borderTop: "1px solid rgba(196,91,124,.4)",
            borderBottom: "1px solid rgba(196,91,124,.4)",
          }}
        >
          <span
            style={{
              color: "#9c6677",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: ".19em",
              textTransform: "uppercase",
            }}
          >
            {specialties.length > 0 ? specialties.join(" · ") : "Photography"}
          </span>
          <strong style={{ fontSize: 17, fontWeight: 500 }}>{name}</strong>
          <span
            style={{
              color: "#9c6677",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: ".19em",
              textTransform: "uppercase",
              textAlign: "right",
            }}
          >
            {serviceArea || "Worldwide"}
          </span>
        </nav>

        {/* Header */}
        <header
          className="blossom-tpl-header"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 1100,
            margin: "45px auto 0",
            textAlign: "center",
          }}
        >
          <span
            style={{
              color: "#e11d48",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: ".25em",
              textTransform: "uppercase",
            }}
          >
            {priceLabel || "Soft light, new beginnings"}
          </span>

          <h1
            style={{
              margin: "5px 0 0",
              color: "#be496c",
              font: '400 clamp(76px, 12vw, 160px)/.78 Allura, cursive',
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
          </h1>

          <p
            style={{
              maxWidth: 650,
              margin: "14px auto 24px",
              color: "#82616c",
              fontSize: 13,
              lineHeight: 1.75,
            }}
          >
            {tagline ? `${tagline} — ` : ""}{bio}
          </p>

          <button
            onClick={onHire}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 49,
              padding: "0 28px",
              color: "#fff",
              background: "#e11d48",
              border: "1px solid #e11d48",
              borderRadius: 999,
              boxShadow: "0 10px 28px rgba(225,29,72,.18)",
              fontSize: 10,
              fontWeight: 700,
              fontFamily: '"DM Sans", sans-serif',
              letterSpacing: ".13em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform .25s, color .25s, background .25s, box-shadow .25s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#c3133b";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.background = "#e11d48";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Book a Session
          </button>
        </header>

        {/* Petal gallery */}
        {portfolio.length > 0 && (
          <div
            className="blossom-tpl-gallery"
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: 800,
              maxWidth: 1300,
              margin: "45px auto 0",
            }}
          >
            {portfolio.slice(0, 5).map((photo, i) => (
              <div
                key={photo.id}
                className="blossom-tpl-photo"
                style={{
                  position: "absolute",
                  background: "#f7bfd0",
                  boxShadow: "0 22px 55px rgba(132,58,80,.15)",
                  overflow: "hidden",
                  cursor: "pointer",
                  ...petalPlacements[i],
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
                    filter: "saturate(.72) contrast(.94) brightness(1.06)",
                    transition: "transform .75s cubic-bezier(.2,.7,.2,1), filter .5s ease",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = "saturate(.95) contrast(.98) brightness(1.02)";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = "saturate(.72) contrast(.94) brightness(1.06)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer note */}
        <div
          className="blossom-tpl-note"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: 800,
            margin: "60px auto 0",
            padding: "35px 0",
            color: "#a34d68",
            borderTop: "1px solid rgba(196,91,124,.45)",
            borderBottom: "1px solid rgba(196,91,124,.45)",
            textAlign: "center",
            font: '400 46px/1 Allura, cursive',
          }}
        >
          Beautiful things begin quietly.
        </div>
      </div>

      {/* Responsive media queries */}
      <style>{`
        @media (max-width: 900px) {
          .blossom-tpl-gallery { min-height: 700px !important; }
        }
        @media (max-width: 600px) {
          .blossom-tpl { min-height: 2100px !important; padding: 42px 20px 75px !important; }
          .blossom-tpl-nav {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .blossom-tpl-nav span { text-align: center !important; }
          .blossom-tpl-gallery { min-height: 1450px !important; }
          .blossom-tpl-photo {
            left: 7% !important;
            right: auto !important;
            width: 86% !important;
            height: 320px !important;
            border-radius: 55% 45% 58% 42% / 65% 45% 55% 35% !important;
          }
          .blossom-tpl-photo:nth-child(1) { top: 0 !important; bottom: auto !important; }
          .blossom-tpl-photo:nth-child(2) { top: 280px !important; bottom: auto !important; transform: rotate(4deg) !important; }
          .blossom-tpl-photo:nth-child(3) { top: 560px !important; bottom: auto !important; transform: rotate(-3deg) !important; }
          .blossom-tpl-photo:nth-child(4) { top: 840px !important; bottom: auto !important; transform: rotate(4deg) !important; }
          .blossom-tpl-photo:nth-child(5) { top: 1120px !important; bottom: auto !important; transform: rotate(-3deg) !important; }
          .blossom-tpl-note { font-size: 34px !important; }
        }
      `}</style>
    </>
  );
}
