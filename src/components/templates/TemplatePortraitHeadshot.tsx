// @ts-nocheck
import type { TemplateProps } from "./types";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap');`;

export default function TemplatePortraitHeadshot({
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
}: TemplateProps) {
  const photos = portfolio.slice(0, 6);
  const basicPrice = pricing?.downloads?.single ?? 199;
  const premiumPrice = pricing?.downloads?.full ?? 599;
  const standardPrice = Math.round((basicPrice + premiumPrice) / 2) || 349;

  const trustSignals = [
    { label: "Clients Served", value: "500+" },
    { label: "Years Experience", value: "12+" },
    { label: "Turnaround", value: "48 hrs" },
    { label: "Satisfaction", value: "100%" },
  ];

  const packages = [
    {
      badge: "Starter",
      title: "Basic",
      price: basicPrice,
      featured: false,
      features: [
        "1 retouched image",
        "30-minute session",
        "Studio lighting",
        "Digital download",
      ],
    },
    {
      badge: "Most Popular",
      title: "Standard",
      price: standardPrice,
      featured: true,
      features: [
        "5 retouched images",
        "60-minute session",
        "Wardrobe changes",
        "Studio + natural light",
        "Online gallery",
      ],
    },
    {
      badge: "Full Package",
      title: "Premium",
      price: premiumPrice,
      featured: false,
      features: [
        "All retouched images",
        "90-minute session",
        "Hair & makeup included",
        "Multiple backgrounds",
        "Print-ready files",
        "Rush delivery",
      ],
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fonts }} />

      <div
        className="headshot-tpl"
        style={{
          background: "#f1f3f6",
          color: "#182338",
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          minHeight: "100vh",
        }}
      >
        {/* NAV */}
        <nav
          className="headshot-tpl-nav"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 36px",
            borderBottom: "2px solid #2563eb",
          }}
        >
          <span
            style={{
              fontWeight: 800,
              fontSize: 20,
              fontFamily: "'Manrope', sans-serif",
              color: "#182338",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.6,
              color: "#6b7c99",
              fontWeight: 700,
            }}
          >
            {serviceArea}
          </span>
        </nav>

        {/* HEADER */}
        <header
          className="headshot-tpl-header"
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr .85fr",
            gap: 40,
            padding: "52px 36px 36px",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                background: "#2563eb",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.4,
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 18,
              }}
            >
              Headshot Pro
            </span>

            <h1
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 7vw, 72px)",
                lineHeight: 1.05,
                color: "#182338",
                margin: "0 0 14px",
              }}
            >
              {name}
              {verified && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#22c55e",
                    color: "#fff",
                    fontSize: 15,
                    marginLeft: 12,
                    verticalAlign: "middle",
                    lineHeight: 1,
                  }}
                >
                  &#10003;
                </span>
              )}
            </h1>

            <p
              style={{
                fontSize: 15,
                color: "#606d83",
                lineHeight: 1.65,
                maxWidth: 520,
                margin: "0 0 10px",
              }}
            >
              {tagline}
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#606d83",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 0 26px",
              }}
            >
              {bio}
            </p>

            <button
              onClick={onHire}
              className="headshot-tpl-hire"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                padding: "14px 36px",
                cursor: "pointer",
                boxShadow: "6px 6px 0 #b8ccff",
                transition: "transform .15s, box-shadow .15s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px,-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "8px 8px 0 #b8ccff";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "6px 6px 0 #b8ccff";
              }}
            >
              Book a Session
            </button>
          </div>

          {/* First photo large in header right */}
          {photos.length > 0 && (
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                background: "#dce1e8",
                boxShadow: "0 4px 24px rgba(0,0,0,.08)",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => onPhotoClick(0)}
            >
              <img
                src={photos[0]?.url}
                alt={photos[0]?.filename ?? ""}
                style={{
                  width: "100%",
                  height: 480,
                  objectFit: "cover",
                  display: "block",
                  filter: "saturate(.76) contrast(1.02)",
                }}
              />
              {specialties[0] && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 14,
                    left: 14,
                    background: "rgba(255,255,255,.88)",
                    backdropFilter: "blur(6px)",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    color: "#182338",
                    padding: "5px 12px",
                    borderRadius: 6,
                  }}
                >
                  {specialties[0]}
                </span>
              )}
            </div>
          )}
        </header>

        {/* PHOTO GRID */}
        {photos.length > 1 && (
          <section
            className="headshot-tpl-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              padding: "0 36px 40px",
            }}
          >
            {photos.slice(1).map((photo, i) => (
              <div
                key={photo.id}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#dce1e8",
                  boxShadow: "0 2px 16px rgba(0,0,0,.06)",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => onPhotoClick(i + 1)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  style={{
                    width: "100%",
                    height: 650,
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(.76) contrast(1.02)",
                  }}
                />
                {specialties[i + 1] && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: 12,
                      left: 12,
                      background: "rgba(255,255,255,.88)",
                      backdropFilter: "blur(6px)",
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                      color: "#182338",
                      padding: "5px 12px",
                      borderRadius: 6,
                    }}
                  >
                    {specialties[i + 1]}
                  </span>
                )}
              </div>
            ))}
          </section>
        )}

        {/* PRICING */}
        <section
          style={{
            borderTop: "1px solid #aeb6c3",
            padding: "48px 36px 40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 32,
              textAlign: "center",
              margin: "0 0 8px",
              color: "#182338",
            }}
          >
            Pricing Packages
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#606d83",
              fontSize: 14,
              margin: "0 0 36px",
            }}
          >
            Professional headshots tailored to your needs
          </p>

          <div
            className="headshot-tpl-packages"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              maxWidth: 920,
              margin: "0 auto",
              alignItems: "start",
            }}
          >
            {packages.map((pkg) => (
              <div
                key={pkg?.filename}
                style={{
                  background: pkg.featured ? "#1e4fb5" : "#fff",
                  color: pkg.featured ? "#fff" : "#182338",
                  borderRadius: 14,
                  padding: "32px 28px 28px",
                  boxShadow: pkg.featured
                    ? "0 8px 32px rgba(30,79,181,.22)"
                    : "0 2px 12px rgba(0,0,0,.06)",
                  transform: pkg.featured ? "translateY(-12px)" : "none",
                  display: "flex",
                  flexDirection: "column" as const,
                  position: "relative" as const,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.6,
                    color: pkg.featured ? "rgba(255,255,255,.7)" : "#2563eb",
                    marginBottom: 8,
                  }}
                >
                  {pkg.badge}
                </span>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 800,
                    fontSize: 22,
                    margin: "0 0 6px",
                  }}
                >
                  {pkg?.filename}
                </h3>
                <div style={{ margin: "0 0 20px" }}>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: 40,
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    ${pkg.price}
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 24px",
                    flex: 1,
                  }}
                >
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 13,
                        lineHeight: 1.5,
                        padding: "5px 0",
                        color: pkg.featured ? "rgba(255,255,255,.88)" : "#606d83",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: pkg.featured ? "#93c5fd" : "#22c55e",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        &#10003;
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onHire}
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    background: pkg.featured ? "#fff" : "#2563eb",
                    color: pkg.featured ? "#1e4fb5" : "#fff",
                    border: "none",
                    borderRadius: 7,
                    padding: "12px 0",
                    cursor: "pointer",
                    textAlign: "center",
                    width: "100%",
                    transition: "opacity .15s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                >
                  {pkg.featured ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST ROW */}
        <section
          className="headshot-tpl-trust"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid #aeb6c3",
            margin: "0 36px 0",
          }}
        >
          {trustSignals.map((t, i) => (
            <div
              key={t.label}
              style={{
                textAlign: "center",
                padding: "28px 16px",
                borderRight: i < 3 ? "1px solid #aeb6c3" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#182338",
                  marginBottom: 4,
                }}
              >
                {t.value}
              </div>
              <div
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 1.6,
                  color: "#6b7c99",
                  fontWeight: 700,
                }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: "center",
            padding: "32px 36px 40px",
            color: "#6b7c99",
            fontSize: 12,
          }}
        >
          {website && (
            <a
              href={website.startsWith("http") ? website : `https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}
            >
              {website}
            </a>
          )}
        </footer>
      </div>

      {/* RESPONSIVE STYLES */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 900px) {
              .headshot-tpl-packages {
                grid-template-columns: 1fr !important;
                max-width: 400px !important;
              }
              .headshot-tpl-packages > div {
                transform: none !important;
              }
              .headshot-tpl-trust {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (max-width: 600px) {
              .headshot-tpl-header {
                grid-template-columns: 1fr !important;
                padding: 32px 20px 28px !important;
              }
              .headshot-tpl-nav {
                padding: 14px 20px !important;
              }
              .headshot-tpl-grid {
                grid-template-columns: 1fr !important;
                padding: 0 20px 28px !important;
              }
              .headshot-tpl-packages {
                grid-template-columns: 1fr !important;
                max-width: 100% !important;
                padding: 0 !important;
              }
              .headshot-tpl-trust {
                grid-template-columns: 1fr !important;
                margin: 0 20px !important;
              }
              .headshot-tpl-trust > div {
                border-right: none !important;
                border-bottom: 1px solid #aeb6c3;
              }
            }
          `,
        }}
      />
    </>
  );
}
