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

function TyreSVG({ style }) {
  return (
    <svg
      width="104"
      height="104"
      viewBox="0 0 120 120"
      fill="none"
      style={style}
      aria-hidden="true"
      className="tyre-svg-img"
    >
      <ellipse
        cx="60"
        cy="60"
        rx="55"
        ry="54"
        fill="url(#tyre-dark-neon)"
        style={{ filter: "drop-shadow(0 0 16px #00fff96b)" }}
      />
      <ellipse
        cx="60"
        cy="60"
        rx="43"
        ry="43"
        fill="#18181f"
        opacity="0.35"
      />
      <circle
        cx="60"
        cy="60"
        r="29"
        stroke="#00fff9"
        strokeWidth="6"
        opacity="0.22"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="22"
        ry="22"
        fill="#212147"
        opacity="0.92"
      />
      {/* Centre highlight */}
      <ellipse
        cx="60"
        cy="57"
        rx="11"
        ry="4"
        fill="#fff"
        opacity="0.09"
      />
      <defs>
        <radialGradient
          id="tyre-dark-neon"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(78 63) rotate(121.14) scale(68 73.7)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.17" stopColor="#00fff9" />
          <stop offset="0.7" stopColor="#20273c" />
          <stop offset="1" stopColor="#18181f" />
        </radialGradient>
      </defs>
    </svg>
  );
}

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
            {/* Tyre image on right side */}
            <div className="tyre-brand-tyre-img">
              <TyreSVG />
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
