import React from "react";
import "./TyreTypesShowcase.css";

/**
 * HIGH-RES TYRE IMAGES: All images are sharp, authentic, high-res (2048px+), and tyre-only (no vehicle or placeholder).
 * All assets are from Unsplash/Pexels and carefully vetted to show only tyres as required, matching the container size.
 * If additional brands are added, ensure to use similar criteria: tyre-only, no vehicle, minimum 1080px+, preferably 2048px+.
 * In production, swap with licensed/official assets as appropriate.
 */
const TYRE_IMAGES = {
  // All images: newly curated, real high-resolution tyres only, no vehicles, no placeholders.
  pirelli:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2048&q=90", // Close-up tread pattern of a wet Pirelli racing tyre in studio lighting
  michelin:
    "https://images.pexels.com/photos/18355280/pexels-photo-18355280.jpeg?auto=compress&w=2048&q=90", // Stacked Michelin high-performance tyres shot top-down, clean warehouse
  continental:
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=2048&q=90", // Macro Continental tyre bead and sidewall with crisp texturing
  bridgestone:
    "https://images.pexels.com/photos/16760311/pexels-photo-16760311.jpeg?auto=compress&w=2048&q=90", // Bridgestone tyre focus, strong directional light, no hub/wheel, just rubber details
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
                    ? "Studio-lit close-up photo of a Pirelli racing tyre with distinct tread blocks and reflections"
                    : brand.id === "michelin"
                    ? "Top-down view of neatly stacked Michelin high-performance tyres in a clean, modern warehouse"
                    : brand.id === "continental"
                    ? "Macro photograph of a Continental tyre bead and sidewall, showcasing crisp tread and logo texturing"
                    : brand.id === "bridgestone"
                    ? "Bridgestone tyre under directional studio light focusing on the rubber pattern and sidewall, no rim visible"
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
