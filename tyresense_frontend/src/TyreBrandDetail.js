import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./TyreBrandDetail.css";

/**
 * Neutral, neon/cyan tyre SVG for new theme
 */
function TyreSVG({ style }) {
  return (
    <svg
      width="305"
      height="305"
      viewBox="0 0 305 305"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <ellipse
        cx="152.5"
        cy="152.5"
        rx="136"
        ry="136"
        fill="url(#tyre-dark-neon-detail)"
        style={{ filter: "drop-shadow(0 0 42px #00fff993)" }}
      />
      <ellipse
        cx="152.5"
        cy="152.5"
        rx="115"
        ry="115"
        fill="#18181f"
        opacity="0.27"
      />
      <circle
        cx="152.5"
        cy="152.5"
        r="82"
        stroke="#00fff9"
        strokeWidth="16"
        opacity="0.21"
      />
      <ellipse
        cx="152.5"
        cy="152.5"
        rx="62"
        ry="62"
        fill="#212147"
        opacity="0.92"
      />
      {/* Centre highlight */}
      <ellipse
        cx="152.5"
        cy="145"
        rx="32"
        ry="12"
        fill="#ffe600"
        opacity="0.11"
      />
      <defs>
        <radialGradient
          id="tyre-dark-neon-detail"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(182 154) rotate(123.1) scale(169 171.1)"
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
          <TyreSVG />
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
