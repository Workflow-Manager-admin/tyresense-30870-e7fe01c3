import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./TyreBrandDetail.css";

// Placeholder tyre SVG: stylized for hero image
function TyreSVG({ style }) {
  return (
    <svg
      width="230"
      height="230"
      viewBox="0 0 230 230"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <ellipse
        cx="115"
        cy="115"
        rx="99"
        ry="99"
        fill="url(#tyre-red-gradient)"
        style={{ filter: "drop-shadow(0 0 40px #f33a3a66)" }}
      />
      <ellipse
        cx="115"
        cy="115"
        rx="81"
        ry="81"
        fill="#181114"
        opacity="0.35"
      />
      <circle
        cx="115"
        cy="115"
        r="58"
        stroke="#fff"
        strokeWidth="11"
        opacity="0.12"
      />
      <ellipse
        cx="115"
        cy="115"
        rx="39"
        ry="39"
        fill="#1a0308"
        filter="blur(1.2px)"
        opacity="0.91"
      />
      {/* Central highlight */}
      <ellipse
        cx="115"
        cy="110"
        rx="23"
        ry="9"
        fill="#fff"
        opacity="0.06"
      />
      <defs>
        <radialGradient
          id="tyre-red-gradient"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(130 112) rotate(131.26) scale(124 123.9)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.16" stopColor="#FD222D" />
          <stop offset="0.6" stopColor="#B80031" />
          <stop offset="1" stopColor="#6e0720" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// PUBLIC_INTERFACE
function TyreBrandDetail({ brand, onBack }) {
  /**
   * Detail page for tyre brand/type, with scroll-based zoom-out animation.
   * @param {object} brand - Selected brand {id, name, tagline}
   * @param {function} onBack - Handler for back navigation
   */
  const ref = useRef(null);
  // Track scroll progress within component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Animate scale from 1.14 at top to 0.67 at bottom
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.14, 0.67]);
  // Animate vertical y from 0 to 110px down
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);

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
            y,
            zIndex: 15,
            boxShadow:
              "0 12px 80px 7px #ff3a3acc, 0 0px 44px 10px #d2001a51",
          }}
        >
          <TyreSVG />
        </motion.div>
        <div className="ts-brand-info">
          <h1 className="ts-brand-name">{brand.name}</h1>
          <h3 className="ts-brand-tagline">{brand.tagline || "Premium Tyres"}</h3>
          <section className="ts-brand-desc">
            <p>
              <span>
                {brand.name} brings industry-leading technology and craftsmanship for a sublime driving experience.
              </span><br /><br />
              <span>
                <b>Highlights:</b>
                <ul>
                  <li>Maximum grip, low rolling resistance</li>
                  <li>Enhanced durability with unique tread design</li>
                  <li>Engineered for performance & safety on all roads</li>
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
                  window.open("https://www.google.com/search?q=" + encodeURIComponent(brand.name + " tyres"), "_blank")
                }
              >
                Buy Now &rarr;
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
