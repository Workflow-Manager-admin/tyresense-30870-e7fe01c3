import React from "react";
import "./TyreTypesShowcase.css";

/**
 * UPDATE: Use higher-resolution, realistic tyre photos for demo purpose from Unsplash/Pexels/official brand press.
 * All images below are free for demo (unsplash, pexels links).
 * In production, replace with licensed or brand-supplied media!
 */
const TYRE_IMAGES = {
  pirelli:
    "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=600&q=90", // Pirelli style - closeup
  michelin:
    "https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&w=600&q=90", // Michelin - crisp profile
  continental:
    "https://images.pexels.com/photos/460235/pexels-photo-460235.jpeg?auto=compress&w=600&q=90", // Continental tyre sidewall
  bridgestone:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=90", // Closeup 'Bridgestone'-type tread
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
            {/* Tyre image on right side */}
            <div className="tyre-brand-tyre-img">
              <img
                src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
                alt={`Real-life ${brand.name} tyre`}
                loading="lazy"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "22px",
                  backgroundColor: "#191932",
                  boxShadow: "0 0 12px #00fff944, 0 2px 10px #1112",
                }}
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
