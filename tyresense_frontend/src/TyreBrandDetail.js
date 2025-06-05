import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./TyreBrandDetail.css";

/**
 * UPDATE: Use high-resolution, realistic, royalty-free tyre images for demo.
 * Should match the ones in TyreTypesShowcase.js!
 */
const TYRE_IMAGES = {
  pirelli:
    "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=600&q=90", // Demo purpose
  michelin:
    "https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&w=600&q=90",
  continental:
    "https://images.pexels.com/photos/460235/pexels-photo-460235.jpeg?auto=compress&w=600&q=90",
  bridgestone:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=600&q=90",
};

// PUBLIC_INTERFACE
function TyreBrandDetail({ brand, onBack }) {
  /**
   * Brand detail view: tyre zooms out to right, info slides in from left.
   * @param {object} brand - e.g. {id, name, tagline}
   * @param {function} onBack
   */
  const ref = useRef(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Tyre animation: scale decreases, translateX increases, y stays almost unchanged
  const scale = useTransform(scrollYProgress, [0, 0.45], [1.15, 0.68]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 180]); // to right
  const y = useTransform(scrollYProgress, [0, 1], [0, 14]);  // slight downward

  // Info card animation: opacity from 0.2 -> 1, translateX from -110px -> 0 (left to center)
  const infoOpacity = useTransform(scrollYProgress, [0, 0.23, 0.6], [0.15, 0.86, 1]);
  const infoX = useTransform(scrollYProgress, [0, 0.22, 1], [-110, 0, 0]);

  return (
    <div className="ts-brand-detail-outer">
      <button className="ts-detail-back-btn" onClick={onBack}>
        ← Back
      </button>
      <div className="ts-brand-detail-container" ref={ref}>
        <motion.div
          className="ts-brand-tyre-hero"
          style={{
            scale,
            x,
            y,
            zIndex: 25,
          }}
        >
          <img
            src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
            alt={`Real-life ${brand.name} tyre`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "31px",
              backgroundColor: "#191932",
              boxShadow: "0 0 32px #00fff978, 0 4px 24px #1119",
            }}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="ts-brand-info"
          style={{
            opacity: infoOpacity,
            x: infoX,
            zIndex: 30,
          }}
        >
          <h1 className="ts-brand-name">{brand.name}</h1>
          <h3 className="ts-brand-tagline">
            {brand.tagline || "Premium Tyres"}
          </h3>
          <section className="ts-brand-desc">
            <p>
              <span>
                {brand.name} brings industry-leading technology and craftsmanship for a sublime driving experience.
              </span>
              <br />
              <br />
              <span>
                <b>Highlights:</b>
                <ul>
                  <li>Maximum grip, low rolling resistance</li>
                  <li>Enhanced durability with unique tread design</li>
                  <li>Engineered for performance &amp; safety on all roads</li>
                </ul>
              </span>
            </p>
            <div className="ts-gradient-divider" />
            <div className="ts-brand-placeholder-data">
              <strong>Featured Model:</strong> {brand.name} UltraMax Pro <br />
              <strong>Available Sizes:</strong> 195/65R15, 205/55R16, 225/45R17 <br />
              <button
                className="ts-detail-buy-btn"
                onClick={() =>
                  window.open(
                    "https://www.google.com/search?q=" +
                      encodeURIComponent(brand.name + " tyres"),
                    "_blank"
                  )
                }
              >
                Buy Now &rarr;
              </button>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
