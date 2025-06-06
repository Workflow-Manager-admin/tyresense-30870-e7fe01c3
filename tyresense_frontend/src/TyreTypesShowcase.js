import React from "react";
import "./TyreTypesShowcase.css";

/**
 * PUBLIC_INTERFACE
 * TyreTypesShowcase
 * Displays only the four Porsche-inspired premium/larger brand containers.
 * Each brand container is a clickable button that routes to a tyre brand page.
 * @param {function} onBrandSelect - function(brand) called when a brand is clicked.
 */

// Helper for public URL
const getPublicUrl = () =>
  (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : window.PUBLIC_URL || "");

// Images for the premium brands
const TYRE_IMAGES = {
  pirelli: getPublicUrl() + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
  michelin: getPublicUrl() + "/assets/20250605_071317_michelin-tyres.jpg",
  continental: getPublicUrl() + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
  bridgestone: getPublicUrl() + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
};

// FINAL LIST: Porsche-style premium containers only, no small/legacy brands
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
  // Render only four premium-style containers, no legacy/small brands.
  return (
    <section className="ts-section ts-tyre-brands-showcase">
      <header className="tyre-showcase-header">
        <h2>Explore Tyre Brands</h2>
        <p className="tyre-showcase-desc">
          Premium, trusted choices for every journey.
        </p>
      </header>
      <div className="tyre-brands-grid">
        {/* Porsche-style large premium brand containers, hardcoded; no other brand cards */}
        {TYRE_BRANDS.filter(b =>
          ["pirelli", "michelin", "continental", "bridgestone"].includes(b.id)
        ).map((brand) => (
          <button
            key={brand.id}
            className="tyre-brand-card premium-brand-container"
            aria-label={`View details for ${brand.name}`}
            onClick={() => onBrandSelect && onBrandSelect(brand)}
            type="button"
            tabIndex={0}
          >
            <div className="tyre-brand-cover-bg" aria-hidden="true">
              <img
                src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
                alt={
                  brand.id === "pirelli"
                    ? "Pirelli Cinturato P7 tyre photo, full detail"
                    : brand.id === "michelin"
                    ? "Michelin Tyres, tread detail close-up"
                    : brand.id === "continental"
                    ? "Continental CityPlus tyre, macro sidewall/tread"
                    : brand.id === "bridgestone"
                    ? "Bridgestone Turanza T005 tyre, stacked detailed"
                    : `Photograph of a real ${brand.name} tyre`
                }
                loading="lazy"
                className="tyre-brand-img"
                draggable={false}
              />
              <div className="tyre-brand-img-overlay" />
            </div>
            <div className="tyre-brand-info-col premium-info-col">
              <div className="tyre-brand-logo">
                <span className="tyre-brand-name" aria-hidden="true">
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
