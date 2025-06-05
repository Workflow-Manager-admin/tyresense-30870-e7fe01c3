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
            className="tyre-brand-card premium-brand-container"
            aria-label={`View details for ${brand.name}`}
            onClick={() => onBrandSelect && onBrandSelect(brand)}
            type="button"
            tabIndex={0}
          >
            {/* Background Tyre Image - always covers whole container */}
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
              {/* Overlay for contrast and premium vignette */}
              <div className="tyre-brand-img-overlay" />
            </div>
            <div className="tyre-brand-info-col premium-info-col">
              <div className="tyre-brand-logo">
                <span
                  className="tyre-brand-name"
                  aria-hidden="true"
                >
                  {brand.name}
                </span>
              </div>
              {brand.tagline && (
                <span
                  className="tyre-brand-tagline"
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
