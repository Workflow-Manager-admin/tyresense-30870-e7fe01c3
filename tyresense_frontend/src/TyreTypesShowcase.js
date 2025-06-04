import React from "react";
import "./TyreTypesShowcase.css";

// Sample data: could be extended with images, descriptions, etc.
const TYRE_BRANDS = [
  {
    id: "pirelli",
    name: "Pirelli",
    tagline: "Performance meets Innovation",
    logo: null, // For minimalism, can use stylized text or import logos
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
            <div className="tyre-brand-logo">
              {/* Brand name as main premium title – no initial letter */}
              <span
                className="tyre-brand-name"
                aria-hidden="true"
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "2.3rem",
                  fontFamily: "Inter, Arial, sans-serif",
                  lineHeight: 1.08,
                  textShadow: "0 0 22px #ff3a3a70, 0 1.5px 9px #000000b2",
                  letterSpacing: ".11em"
                }}
              >
                {brand.name}
              </span>
            </div>
            {brand.tagline && (
              <span className="tyre-brand-tagline">{brand.tagline}</span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TyreTypesShowcase;
