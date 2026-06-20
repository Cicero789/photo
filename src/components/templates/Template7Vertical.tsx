import type { TemplateProps } from "./types";

export default function Template7Vertical(props: TemplateProps) {
  const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const priceLabel = pricing?.downloads?.single ? `From $${pricing.downloads.single}` : "";

  // Generate captions: use filename or fallback
  const captions = portfolio.map((p, i) => {
    const specialty = specialties[i % specialties.length] || "Photo";
    return {
      left: p.filename || tagline || "Captured moment",
      right: `${specialty} · ${String(i + 1).padStart(2, "0")}`,
    };
  });

  return (
    <>
      <div style={{ padding: "80px 5vw 100px", background: "white", fontFamily: "Inter, sans-serif" }}>
        {/* Header */}
        <header
          className="vertical-tpl-head"
          style={{
            maxWidth: 1040,
            margin: "0 auto 64px",
            display: "flex",
            alignItems: "end",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            paddingBottom: 24,
          }}
        >
          <div>
            {serviceArea && (
              <span
                style={{
                  textTransform: "uppercase",
                  letterSpacing: ".18em",
                  fontSize: 11,
                  color: "#707070",
                }}
              >
                {serviceArea} · Photo Essay
              </span>
            )}
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(28px, 4vw, 55px)",
                letterSpacing: "-.05em",
                fontWeight: 400,
              }}
            >
              {name}
              {verified && (
                <span
                  style={{
                    marginLeft: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#d1fae5",
                    fontSize: 12,
                    color: "#059669",
                    verticalAlign: "middle",
                  }}
                  title="Verified"
                >
                  ✓
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onHire}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0 24px",
              border: "1px solid #222",
              background: "transparent",
              color: "#222",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 500,
              transition: "transform .25s, background .25s, color .25s",
            }}
            className="vertical-tpl-hire"
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#222";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Hire Me{priceLabel ? ` · ${priceLabel}` : ""}
          </button>
        </header>

        {/* Essay photos */}
        <div style={{ maxWidth: 1040, margin: "auto" }}>
          {portfolio.map((photo, i) => (
            <figure key={photo.id} style={{ margin: "0 0 90px" }}>
              <div
                style={{
                  height: "min(72vw, 720px)",
                  overflow: "hidden",
                  cursor: "pointer",
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
                    transition: "transform .65s cubic-bezier(.2,.7,.2,1)",
                  }}
                  loading="lazy"
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.035)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <figcaption
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 20,
                  paddingTop: 13,
                  color: "#555",
                  font: 'italic 300 14px/1.5 Merriweather, serif',
                }}
              >
                <span>{captions[i]?.left}</span>
                <span>{captions[i]?.right}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Bio */}
        {bio && (
          <div style={{ maxWidth: 1040, margin: "0 auto", paddingTop: 0, borderTop: "1px solid #ddd" }}>
            <p style={{ paddingTop: 24, color: "#555", font: 'italic 300 14px/1.7 Merriweather, serif', maxWidth: 700 }}>
              {bio}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,300;1,400&display=swap');
        @media (max-width: 520px) {
          .vertical-tpl-head { flex-direction: column !important; align-items: flex-start !important; }
          .vertical-tpl-hire { margin-top: 22px !important; }
        }
      `}</style>
    </>
  );
}
