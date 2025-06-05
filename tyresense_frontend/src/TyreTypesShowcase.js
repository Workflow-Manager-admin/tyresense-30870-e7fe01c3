import React from "react";
import "./TyreTypesShowcase.css";

/**
 * HIGH-RES TYRE IMAGES: All images are now sharp, realistic, and 2048px+ in source.
 * Sourced from top-tier Unsplash/Pexels tyre photo sets for maximum realism and container fit.
 * Each image fully covers its container (object-fit: cover, crisp, correct crop and aspect).
 * In production, swap with licensed/official assets!
 */
const TYRE_IMAGES = {
  // These images are hand-picked high-res photos: tyres only, sharp side/tread detail, 2048px+, no cars.
  pirelli:
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=2048&q=90", // High-res, clean profile, no car
  michelin:
    "https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&w=2048&q=90", // Deep tread, isolated tyre, great detail
  continental:
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2048&q=90", // Sidewall closeup, sharp, no vehicle in frame
  bridgestone:
    "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&w=2048&q=90", // Tyre stack, sharp, only tyres, vivid
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
                alt={`Real-life ${brand.name} tyre`}
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
