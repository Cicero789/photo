import { useEffect } from "react";
import type { TemplateProps } from "./types";

export default function TemplateCorporateSuite(props: TemplateProps) {
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

  const heroPhoto = portfolio[0];
  const galleryPhotos = portfolio.slice(1, 4);
  const singlePrice = pricing?.downloads?.single;
  const fullPrice = pricing?.downloads?.full;
  const priceLabel = singlePrice ? `$${singlePrice}` : "";
  const areaCode = serviceArea
    ? serviceArea.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase()
    : "STD";

  /* Build 4 service rows from specialties + pricing */
  const serviceDescriptions = [
    "Single session with full creative direction, lighting setup, and post-production retouching delivered within 5 business days.",
    "On-location coverage for corporate events, conferences, and executive gatherings with same-day preview selects.",
    "Comprehensive brand identity package including environmental portraits, product shots, and lifestyle imagery.",
    "Premium retainer package with priority scheduling, unlimited revisions, and dedicated account management.",
  ];
  const serviceTitles = [
    "Studio Session",
    "Event Coverage",
    "Brand Package",
    "Executive Retainer",
  ];
  const servicePrices = [
    singlePrice ? `$${singlePrice}` : "$450",
    singlePrice ? `$${Math.round(singlePrice * 2.2)}` : "$990",
    fullPrice ? `$${fullPrice}` : "$2,400",
    fullPrice ? `$${Math.round(fullPrice * 1.8)}` : "$4,200",
  ];
  const serviceRows = serviceTitles.map((title, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: specialties[i] ? `${title} — ${specialties[i]}` : title,
    description: serviceDescriptions[i],
    price: servicePrices[i],
  }));

  /* Split name for decorative line breaks */
  const nameParts = name.split(" ");
  const nameFirst = nameParts.slice(0, Math.ceil(nameParts.length / 2)).join(" ");
  const nameLast = nameParts.slice(Math.ceil(nameParts.length / 2)).join(" ");

  useEffect(() => {
    const id = "tcs-google-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <style>{`
        /* ── TemplateCorporateSuite ── */
        .tcs-root {
          background: #0f172a;
          color: #e8edf5;
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ── Nav ── */
        .tcs-nav {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 22px 48px;
          border-bottom: 1px solid #334155;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .tcs-nav-left {
          color: #94a3b8;
        }
        .tcs-nav-center {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #e8edf5;
          letter-spacing: 0.22em;
          text-align: center;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .tcs-nav-right {
          text-align: right;
          color: #94a3b8;
          font-size: 10px;
        }
        .tcs-verified-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #d9e0e9;
          color: #0f172a;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }

        /* ── Hero ── */
        .tcs-hero {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          min-height: 640px;
        }
        .tcs-hero-copy {
          padding: 80px 56px 80px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .tcs-kicker {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #94a3b8;
          margin-bottom: 28px;
          font-weight: 500;
        }
        .tcs-hero-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(42px, 5.5vw, 72px);
          line-height: 0.92;
          color: #e8edf5;
          margin: 0 0 32px 0;
          letter-spacing: -0.02em;
        }
        .tcs-hero-heading span {
          display: block;
        }
        .tcs-hero-heading span:nth-child(2) {
          color: #9ba8ba;
        }
        .tcs-hero-bio {
          color: #9ba8ba;
          font-size: 14px;
          line-height: 1.75;
          margin: 0 0 36px 0;
          max-width: 440px;
        }
        .tcs-cta-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        .tcs-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 36px;
          background: #d9e0e9;
          color: #0f172a;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid #d9e0e9;
          cursor: pointer;
          clip-path: polygon(0 0, 92% 0, 100% 25%, 100% 100%, 0 100%);
          transition: background 0.3s, color 0.3s;
        }
        .tcs-cta-btn:hover {
          background: transparent;
          color: #ffffff;
        }
        .tcs-response-note {
          font-size: 10px;
          color: #718096;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Hero photo panel */
        .tcs-hero-photo {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 500px;
        }
        .tcs-hero-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.3) brightness(0.55);
          transition: filter 0.5s, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tcs-hero-photo:hover img {
          filter: saturate(0.5) brightness(0.65);
          transform: scale(1.03);
        }
        .tcs-hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #0f172a 0%, rgba(15, 23, 42, 0.4) 40%, transparent 100%);
          pointer-events: none;
        }
        .tcs-hero-index {
          position: absolute;
          bottom: 28px;
          right: 32px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: #94a3b8;
          text-transform: uppercase;
          pointer-events: none;
        }

        /* ── Logo Band ── */
        .tcs-logos {
          border-top: 1px solid #334155;
          border-bottom: 1px solid #334155;
          padding: 48px;
        }
        .tcs-logos-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #718096;
          margin-bottom: 28px;
          font-weight: 500;
        }
        .tcs-logos-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        .tcs-logo-item {
          text-align: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #475569;
          padding: 20px 8px;
          border: 1px solid #1e293b;
          transition: color 0.3s, border-color 0.3s;
        }
        .tcs-logo-item:hover {
          color: #e8edf5;
          border-color: #475569;
        }

        /* ── Services ── */
        .tcs-services {
          padding: 80px 48px;
        }
        .tcs-services-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 56px;
          align-items: end;
        }
        .tcs-services-h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 4vw, 52px);
          line-height: 1;
          color: #e8edf5;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tcs-services-desc {
          font-size: 14px;
          color: #9ba8ba;
          line-height: 1.7;
          margin: 0;
        }
        .tcs-pricing-table {
          border-top: 1px solid #334155;
        }
        .tcs-pricing-row {
          display: grid;
          grid-template-columns: 60px 1fr 2fr auto;
          gap: 24px;
          align-items: center;
          padding: 28px 16px;
          border-bottom: 1px solid #1e293b;
          transition: background 0.3s, padding 0.3s;
          cursor: default;
        }
        .tcs-pricing-row:hover {
          background: rgba(71, 85, 105, 0.12);
          padding-left: 24px;
          padding-right: 24px;
        }
        .tcs-row-num {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #475569;
        }
        .tcs-row-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 15px;
          color: #e8edf5;
          letter-spacing: 0.02em;
        }
        .tcs-row-desc {
          font-size: 12px;
          color: #718096;
          line-height: 1.6;
        }
        .tcs-row-price {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 16px;
          color: #d9e0e9;
          text-align: right;
          white-space: nowrap;
        }

        /* ── Gallery ── */
        .tcs-gallery {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr;
          height: 430px;
          gap: 0;
        }
        .tcs-gallery-cell {
          overflow: hidden;
          cursor: pointer;
          position: relative;
        }
        .tcs-gallery-cell img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.25) brightness(0.6);
          transition: filter 0.5s, transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .tcs-gallery-cell:hover img {
          filter: saturate(0.6) brightness(0.75);
          transform: scale(1.04);
        }

        /* ── Footer ── */
        .tcs-footer {
          padding: 40px 48px;
          border-top: 1px solid #334155;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #475569;
        }
        .tcs-footer a {
          color: #94a3b8;
          text-decoration: none;
          transition: color 0.3s;
        }
        .tcs-footer a:hover {
          color: #e8edf5;
        }

        /* ── Responsive 800px ── */
        @media (max-width: 800px) {
          .tcs-hero {
            grid-template-columns: 1fr !important;
          }
          .tcs-hero-copy {
            padding: 56px 36px !important;
            order: 2;
          }
          .tcs-hero-photo {
            min-height: 420px !important;
            order: 1;
          }
          .tcs-logos-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .tcs-services-header {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .tcs-pricing-row {
            grid-template-columns: 48px 1fr auto !important;
          }
          .tcs-row-desc {
            display: none;
          }
        }

        /* ── Responsive 520px ── */
        @media (max-width: 520px) {
          .tcs-nav {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            gap: 8px;
            padding: 16px 24px !important;
          }
          .tcs-nav-left,
          .tcs-nav-right {
            text-align: center !important;
          }
          .tcs-hero-copy {
            padding: 40px 24px !important;
          }
          .tcs-logos {
            padding: 32px 24px !important;
          }
          .tcs-logos-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .tcs-services {
            padding: 48px 24px !important;
          }
          .tcs-pricing-row {
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
            padding: 20px 12px !important;
          }
          .tcs-row-num {
            display: none;
          }
          .tcs-row-desc {
            display: none;
          }
          .tcs-gallery {
            grid-template-columns: 1fr !important;
            height: auto !important;
          }
          .tcs-gallery-cell {
            height: 300px;
          }
          .tcs-footer {
            flex-direction: column;
            gap: 12px;
            padding: 28px 24px !important;
          }
        }
      `}</style>

      <div className="tcs-root">
        {/* ── Nav ── */}
        <nav className="tcs-nav">
          <div className="tcs-nav-left">{serviceArea}</div>
          <div className="tcs-nav-center">
            {name}
            {verified && (
              <span className="tcs-verified-badge" title="Verified photographer">
                &#10003;
              </span>
            )}
          </div>
          <div className="tcs-nav-right">
            {specialties.slice(0, 3).join(" / ")}
          </div>
        </nav>

        {/* ── Executive Hero ── */}
        <section className="tcs-hero">
          <div className="tcs-hero-copy">
            <div className="tcs-kicker">
              {tagline || "Executive Photography"}
            </div>
            <h1 className="tcs-hero-heading">
              <span>{nameFirst}</span>
              {nameLast && <span>{nameLast}</span>}
            </h1>
            <p className="tcs-hero-bio">{bio}</p>
            <div className="tcs-cta-wrap">
              <button className="tcs-cta-btn" onClick={onHire}>
                Request a Quote{priceLabel ? ` — ${priceLabel}` : ""}
              </button>
              <span className="tcs-response-note">
                Avg. response time: 2 hours
              </span>
            </div>
          </div>
          {heroPhoto && (
            <div
              className="tcs-hero-photo"
              onClick={() => onPhotoClick(0)}
            >
              <img
                src={heroPhoto.url}
                alt={heroPhoto.filename || "Hero"}
              />
              <div className="tcs-hero-gradient" />
              <div className="tcs-hero-index">
                {areaCode} / 01
              </div>
            </div>
          )}
        </section>

        {/* ── Logo Band ── */}
        {specialties.length > 0 && (
          <section className="tcs-logos">
            <div className="tcs-logos-title">Specialties &amp; Expertise</div>
            <div className="tcs-logos-grid">
              {specialties.slice(0, 6).map((s, i) => (
                <div key={i} className="tcs-logo-item">
                  {s}
                </div>
              ))}
              {/* Pad to 6 if fewer specialties */}
              {specialties.length < 6 &&
                Array.from({ length: 6 - Math.min(specialties.length, 6) }).map(
                  (_, i) => (
                    <div
                      key={`pad-${i}`}
                      className="tcs-logo-item"
                      style={{ borderColor: "transparent" }}
                    />
                  )
                )}
            </div>
          </section>
        )}

        {/* ── Services & Pricing ── */}
        <section className="tcs-services">
          <div className="tcs-services-header">
            <h2 className="tcs-services-h2">Services</h2>
            <p className="tcs-services-desc">
              Tailored photography solutions for corporate clients, executive
              teams, and brands that demand precision and polish.
            </p>
          </div>
          <div className="tcs-pricing-table">
            {serviceRows.map((row) => (
              <div key={row.num} className="tcs-pricing-row">
                <span className="tcs-row-num">{row.num}</span>
                <span className="tcs-row-title">{row.title}</span>
                <span className="tcs-row-desc">{row.description}</span>
                <span className="tcs-row-price">{row.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gallery ── */}
        {galleryPhotos.length > 0 && (
          <section className="tcs-gallery">
            {galleryPhotos.map((photo, i) => (
              <div
                key={photo.id}
                className="tcs-gallery-cell"
                onClick={() => onPhotoClick(i + 1)}
              >
                <img
                  src={photo.url}
                  alt={photo.filename || `Gallery ${i + 2}`}
                  loading="lazy"
                />
              </div>
            ))}
          </section>
        )}

        {/* ── Footer ── */}
        <footer className="tcs-footer">
          <span>&copy; {new Date().getFullYear()} {name}</span>
          <span>{serviceArea}</span>
          {props.website && (
            <a href={props.website} target="_blank" rel="noopener noreferrer">
              {props.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </footer>
      </div>
    </>
  );
}
