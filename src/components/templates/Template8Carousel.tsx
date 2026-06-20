import { useState } from "react";
import type { TemplateProps } from "./types";

export default function Template8Carousel(props: TemplateProps) {
  const { name, tagline, verified, pricing, portfolio, onHire, onPhotoClick } = props;
  const [current, setCurrent] = useState(0);
  const total = portfolio.length;
  const priceLabel = pricing?.downloads?.single ? `Starting at $${pricing.downloads.single}` : "";

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : total - 1));
  const next = () => setCurrent((c) => (c < total - 1 ? c + 1 : 0));

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          padding: "62px 4vw 70px",
          background: "#f9fafb",
          fontFamily: "Inter, Helvetica, sans-serif",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(26px, 3.5vw, 50px)",
            fontWeight: 300,
            letterSpacing: "-.04em",
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
        {tagline && (
          <p style={{ color: "#777", margin: "10px 0 38px", fontWeight: 300 }}>{tagline}</p>
        )}

        {/* Spotlight */}
        {total > 0 && (
          <div
            className="carousel-tpl-spotlight"
            style={{
              position: "relative",
              width: "80vw",
              maxWidth: 1250,
              margin: "auto",
            }}
          >
            {/* Left arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="carousel-tpl-arrow-left"
              style={{
                position: "absolute",
                zIndex: 2,
                top: "50%",
                left: -27,
                transform: "translateY(-50%)",
                width: 54,
                height: 54,
                border: 0,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 8px 25px #0002",
                font: "300 34px/1 Inter",
                cursor: "pointer",
                transition: "transform .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
            >
              &#8249;
            </button>

            {/* Photo */}
            <div
              style={{
                height: "min(65vw, 690px)",
                background: "#eee",
                boxShadow: "0 20px 50px #0001",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => onPhotoClick(current)}
            >
              <img
                src={portfolio[current]?.url}
                alt={portfolio[current]?.filename || `Photo ${current + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform .65s cubic-bezier(.2,.7,.2,1), opacity .35s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.035)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>

            {/* Right arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="carousel-tpl-arrow-right"
              style={{
                position: "absolute",
                zIndex: 2,
                top: "50%",
                right: -27,
                transform: "translateY(-50%)",
                width: 54,
                height: 54,
                border: 0,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 8px 25px #0002",
                font: "300 34px/1 Inter",
                cursor: "pointer",
                transition: "transform .2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
            >
              &#8250;
            </button>
          </div>
        )}

        {/* Dots + Counter */}
        {total > 0 && (
          <div
            className="carousel-tpl-ui"
            style={{
              width: "80vw",
              maxWidth: 1250,
              margin: "16px auto 28px",
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <span />
            <div style={{ display: "flex", gap: 8 }}>
              {portfolio.map((_, i) => (
                <i
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: i === current ? "#111" : "#bbb",
                    display: "block",
                    cursor: "pointer",
                    fontStyle: "normal",
                    transition: "background .2s",
                  }}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <span style={{ justifySelf: "end", color: "#666" }}>
              {current + 1} / {total}
            </span>
          </div>
        )}

        {/* Hire Button */}
        <button
          onClick={onHire}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 44,
            padding: "0 24px",
            background: "#111",
            color: "white",
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

      <style>{`
        @media (max-width: 520px) {
          .carousel-tpl-spotlight, .carousel-tpl-ui { width: 90vw !important; }
          .carousel-tpl-spotlight > div { height: 65vh !important; }
          .carousel-tpl-arrow-left { width: 42px !important; height: 42px !important; left: -14px !important; }
          .carousel-tpl-arrow-right { width: 42px !important; height: 42px !important; right: -14px !important; }
        }
      `}</style>
    </>
  );
}
