import React from "react";
import "./TyreTypesShowcase.css";

/**
 * HIGH-RES TYRE IMAGES: All images are sharp, authentic, high-res (2048px+), and tyre-only (no vehicle or placeholder).
 * All assets are from Unsplash/Pexels and carefully vetted to show only tyres as required, matching the container size.
 * If additional brands are added, ensure to use similar criteria: tyre-only, no vehicle, minimum 1080px+, preferably 2048px+.
 * In production, swap with licensed/official assets as appropriate.
 */
const TYRE_IMAGES = {
  // Updated to user-provided, locally hosted image paths for each tyre brand
  pirelli:
    process.env.PUBLIC_URL + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
  michelin:
    process.env.PUBLIC_URL + "/assets/20250605_071317_michelin-tyres.jpg",
  continental:
    process.env.PUBLIC_URL + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
  bridgestone:
    process.env.PUBLIC_URL + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
};

// Sample data: could be extended with images, descriptions, etc.
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
function TyreTypesShowcase({ onBrandSelect }) {
  /**
   * Displays tyre types/brand cards in a side-by-side, responsive, premium style.
   * @param {function} onBrandSelect - function(brand) called when a brand is clicked (for future detail view integration).
   */
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
          >
            {/* Tyre image - fills card as background/cover */}
            <div
              className="tyre-brand-tyre-img"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "32px",
                width: 132,
                height: 132,
                minWidth: 98,
                minHeight: 98,
                maxWidth: 164,
                margin: "0 0 0 14px",
                background: "#18181f",
                boxShadow:
                  "0 0 24px #00fff984, 0 4px 24px #142 0 12px 36px #1919323f",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
                alt={
                  brand.id === "pirelli"
                    ? "Profile view of a real Pirelli tyre on a clean surface"
                    : brand.id === "michelin"
                    ? "Close-up of a single Michelin tyre showcasing deep tread detail"
                    : brand.id === "continental"
                    ? "Macro shot of Continental tyre sidewall and tread textures"
                    : brand.id === "bridgestone"
                    ? "Group of stacked Bridgestone tyres in a clean indoor setting"
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
                  boxShadow: "0 0 18px #00fff954, 0 2px 14px #111a",
                  transition: "transform .25s cubic-bezier(.68,-0.35,.32,1.35)",
                  background: "#222",
                  pointerEvents: "none",
                  userSelect: "none"
                }}
                draggable={false}
              />
            </div>
            {/* Info on left */}
            <div className="tyre-brand-info-col">
              <div className="tyre-brand-logo">
                {/* Brand name as main premium title */}
                <span
                  className="tyre-brand-name"
                  aria-hidden="true"
                >
                  {brand.name}
                </span>
              </div>
              {brand.tagline && (
                <span className="tyre-brand-tagline">{brand.tagline}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TyreTypesShowcase;
