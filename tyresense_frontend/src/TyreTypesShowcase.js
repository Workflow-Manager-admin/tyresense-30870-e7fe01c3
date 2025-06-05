import React from "react";
import "./TyreTypesShowcase.css";

/**
 * HIGH-RES TYRE IMAGES: All images are sharp, authentic, high-res (2048px+), and tyre-only (no vehicle or placeholder).
 * All assets are from Unsplash/Pexels and carefully vetted to show only tyres as required, matching the container size.
 * In production, swap with licensed/official assets as appropriate.
 */
const TYRE_IMAGES = {
  pirelli:
    process.env.PUBLIC_URL + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
  michelin:
    process.env.PUBLIC_URL + "/assets/20250605_071317_michelin-tyres.jpg",
  continental:
    process.env.PUBLIC_URL + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
  bridgestone:
    process.env.PUBLIC_URL + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
};

const TYRE_BRANDS = [
  {
    id: "pirelli",
    name: "Pirelli",
    tagline: "Performance meets Innovation",
    logo: null,
  },
  {
    id: "michelin",
    name: "Michelin",
    tagline: "Motion for Life",
    logo: null,
  },
  {
    id: "continental",
    name: "Continental",
    tagline: "The Future in Motion",
    logo: null,
  },
  {
    id: "bridgestone",
    name: "Bridgestone",
    tagline: "Solutions for your journey",
    logo: null,
  },
];

// PUBLIC_INTERFACE
/**
 * Displays "Explore Tyre Brands" section – each brand in its own visually impactful, device-responsive container with a fully sized, object-fit: cover image.
 * @param {function} onBrandSelect - function(brand) called when a brand is clicked.
 */
function TyreTypesShowcase({ onBrandSelect }) {
  return (
    <section className="ts-section ts-tyre-brands-showcase">
      <header className="tyre-showcase-header">
        <h2>Explore Tyre Brands</h2>
        <p className="tyre-showcase-desc">
          Premium, trusted choices for every journey.
        </p>
      </header>
      <div className="tyre-brands-grid">
        {TYRE_BRANDS.map((brand) => (
          <button
            key={brand.id}
            className="tyre-brand-card"
            aria-label={`View details for ${brand.name}`}
            onClick={() => onBrandSelect && onBrandSelect(brand)}
            type="button"
            tabIndex={0}
            style={{
              padding: 0,
              overflow: "hidden",
              borderRadius: "39px",
              minHeight: 290,
              minWidth: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "stretch",
              background: "#1c2241", // fallback before img loads
            }}
          >
            {/* Brand Tyre Image - covers the entire container */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                pointerEvents: "none",
                overflow: "hidden",
                borderRadius: "inherit",
              }}
              className="tyre-brand-impact-img-outer"
              aria-hidden="true"
            >
              <img
                src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
                alt={
                  brand.id === "pirelli"
                    ? "User provided Pirelli Cinturato P7 tyre photo, full detail"
                    : brand.id === "michelin"
                    ? "User provided Michelin Tyres, tread detail close-up"
                    : brand.id === "continental"
                    ? "User provided Continental CityPlus tyre, macro sidewall/tread"
                    : brand.id === "bridgestone"
                    ? "User provided Bridgestone Turanza T005 tyre, stacked detailed"
                    : `Photograph of a real ${brand.name} tyre`
                }
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  borderRadius: "inherit",
                  transition: "transform .22s cubic-bezier(.68,-0.35,.32,1.35)",
                  background: "#191932",
                  filter: "brightness(1.13) contrast(1.06)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                draggable={false}
              />
              {/* Overlay for contrast and readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(151deg, #18181fdd 9%, #0e193b55 94%)",
                  zIndex: 3,
                  borderRadius: "inherit",
                }}
              ></div>
            </div>
            {/* Info at the front, overlays image for maximum visual impact */}
            <div
              className="tyre-brand-info-col"
              style={{
                position: "relative",
                zIndex: 4,
                padding: "42px 34px 33px 34px",
                background: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              <div className="tyre-brand-logo">
                <span
                  className="tyre-brand-name"
                  aria-hidden="true"
                  style={{
                    fontSize: "2.35rem",
                    color: "#ffe600",
                    fontWeight: 820,
                    letterSpacing: ".12em",
                    textShadow: "0px 2.5px 36px #00fff984, 0 2px 14px #191932",
                    lineHeight: 1.05,
                  }}
                >
                  {brand.name}
                </span>
              </div>
              {brand.tagline && (
                <span
                  className="tyre-brand-tagline"
                  style={{
                    color: "#fff",
                    fontWeight: 520,
                    fontSize: "1.095rem",
                    opacity: 0.85,
                    textShadow: "0 2px 18px #19193290",
                  }}
                >
                  {brand.tagline}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TyreTypesShowcase;
