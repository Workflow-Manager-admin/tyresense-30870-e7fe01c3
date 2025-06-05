import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * PUBLIC_INTERFACE
 * TyreSenseLogoCarSVG: Modern, logo-like, bold and minimal side-view car SVG for TyreSense, optimized for animation, branding, and clarity.
 * Clean shapes, dark and neon scheme, visually distinctive, always displays well on dark backgrounds and scales cleanly.
 */
function TyreSenseLogoCarSVG({ style, ...props }) {
  return (
    <svg
      viewBox="0 0 360 100"
      fill="none"
      width={style?.width || 240}
      height={style?.height || 70}
      style={style}
      {...props}
      aria-label="TyreSense logo stylized side-view car"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient id="ts-car-body" x1="0" y1="41" x2="300" y2="59" gradientUnits="userSpaceOnUse">
          <stop offset="0.03" stopColor="#222444" />
          <stop offset="0.45" stopColor="#ffe600" />
          <stop offset="0.61" stopColor="#f6d944" />
          <stop offset="1" stopColor="#ffe600" />
        </linearGradient>
        <radialGradient id="ts-tyre-outer" cx="49%" cy="45%" r="52%">
          <stop offset="0.16" stopColor="#535353"/>
          <stop offset="0.67" stopColor="#151719"/>
          <stop offset="1" stopColor="#0e0e12"/>
        </radialGradient>
        <radialGradient id="ts-tyre-gloss" cx="56%" cy="36%" r="65%">
          <stop offset="0.38" stopColor="#ffe600" stopOpacity="0.23"/>
          <stop offset="0.7" stopColor="#ffe600" stopOpacity="0.01"/>
          <stop offset="1" stopColor="#ffe600" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="170" cy="97" rx="96" ry="6" fill="#221" opacity="0.22"/>
      {/* Rear wheel */}
      <g>
        <ellipse cx="62" cy="80" rx="23" ry="23" fill="url(#ts-tyre-outer)" />
        <ellipse cx="62" cy="80" rx="13" ry="13" fill="#191922" />
        <ellipse cx="62" cy="80" rx="20" ry="20" fill="url(#ts-tyre-gloss)" />
        <ellipse cx="62" cy="80" rx="6.7" ry="6.7" fill="#ffe600" opacity="0.13"/>
      </g>
      {/* Front wheel */}
      <g>
        <ellipse cx="255" cy="80" rx="21" ry="21" fill="url(#ts-tyre-outer)" />
        <ellipse cx="255" cy="80" rx="12" ry="12" fill="#232332" />
        <ellipse cx="255" cy="80" rx="17" ry="17" fill="url(#ts-tyre-gloss)" />
        <ellipse cx="255" cy="80" rx="6.7" ry="6.4" fill="#ffe600" opacity="0.08"/>
      </g>
      {/* Floor/undercarriage simplified */}
      <rect x="44" y="75" width="235" height="9.3" rx="4.5" fill="#1c2233" />
      {/* Car body */}
      <path
        d="M41 72 Q50 35 107 36 Q113 23 170 23 Q202 22 227 33 Q275 46 277 72 Q293 72 293 68 Q300 58 321 60 Q326 60 336 74 Q318 76 255 75 Q209 74 134 76 Q74 77 60 72 Z"
        fill="url(#ts-car-body)"
        stroke="#ffe600"
        strokeWidth="2.1"
        opacity="1"
        />
      {/* Cabin/B pillar line, stylized */}
      <path
        d="M112 38 Q120 26 171 28 Q211 31 220 46"
        stroke="#ffe600"
        strokeWidth="2.2"
        fill="none"
        opacity="0.95"
      />
      {/* Window highlight */}
      <path
        d="M127 34 Q138 27 170 27 Q194 28 211 38"
        stroke="#fff"
        strokeWidth="1.2"
        fill="none"
        opacity="0.28"
      />
      {/* Neon accent speed lines */}
      <rect x="62" y="51" width="22" height="3.3" rx="1.6" fill="#00fff9" opacity="0.27"/>
      <rect x="140" y="31" width="22" height="2.1" rx="1.1" fill="#00fff9" opacity="0.20"/>
      {/* Door handle */}
      <rect x="141" y="51" width="16" height="2.3" rx="1.15" fill="#ffe600" opacity="0.8"/>
      {/* Rear "fin" stylized */}
      <rect x="40.2" y="62" width="8" height="17" rx="4" fill="#ffe600" opacity="0.63"/>
      {/* Short antenna */}
      <rect x="137" y="18" width="4" height="13" rx="1.9" fill="#ffe600" opacity="0.68"/>
      {/* TyreSense glyph badge - small logo detail */}
      <g>
        <circle cx="264" cy="68" r="8.4" fill="#ffe600" stroke="#ffe600" strokeWidth="1.7"/>
        <path d="M258 69 Q263 62 270 68 Q263 75 256 70 Z" fill="#fff" opacity="0.77"/>
      </g>
    </svg>
  );
}

/**
 * AnimatedCarIntro:
 * - Animates a detailed Ferrari F1 side-view car and "TyreSense" brand name to the center.
 * - After the animation, both persist, always parked and centered in the viewport.
 *
 * Props:
 *   - visible: boolean, controls whether the animation runs
 *   - onAnimationComplete: function, fired once intro finishes
 */
/**
 * AnimatedCarIntro:
 * - Animates a detailed Ferrari F1 side-view car and "TyreSense" brand name to the center (intro mode).
 * - In logo mode (`asLogo`), shows a horizontally condensed, fixed car+name logo (e.g., inside navbar).
 *
 * Props:
 *   - visible: boolean, controls whether the intro animation runs (centered, big)
 *   - asLogo: boolean, if true, renders as a persistent logo (small, inline for navbar)
 *   - onAnimationComplete: function, fired once intro finishes
 */
function AnimatedCarIntro({ visible, onAnimationComplete, asLogo = false }) {
  // State to track when the animation (entry) is over.
  const [hasEntered, setHasEntered] = useState(false);
  const doneOnce = useRef(false);

  // "visible" triggers the entry animation; after, signal completion.
  useEffect(() => {
    if (hasEntered && typeof onAnimationComplete === "function" && !doneOnce.current) {
      onAnimationComplete();
      doneOnce.current = true;
    }
  }, [hasEntered, onAnimationComplete]);

  // If asLogo is enabled, render an always present car+TyreSense mark (small/in-navbar).
  if (asLogo) {
    return (
      <div
        className="ts-animated-car ts-animated-car-navbar"
        style={{
          position: "relative",
          left: 0,
          top: "0",
          transform: "translate(0,0)",
          minWidth: 165,
          maxWidth: 370,
          zIndex: 11,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 63
        }}
      >
        <FerrariF1SideSVG
          style={{
            width: 97,
            height: 30,
            marginRight: 11,
            marginLeft: 3,
            filter: "drop-shadow(0 0 28px #ffe60043)"
          }}
        />
        <span
          className="ts-animated-car-title"
          style={{
            marginLeft: 0,
            fontSize: "1.6rem",
            whiteSpace: "nowrap",
            letterSpacing: "0.13em",
            filter: "brightness(1.18) blur(.01px)",
            color: "#ffe600",
            textShadow: "0 0 10px #ffe60085",
            fontWeight: 800,
            lineHeight: "1.1"
          }}
        >
          TyreSense
        </span>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="ts-animated-car-intro-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.22 } }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1200,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent" // Blackout handled by parent overlay now
            }}
          >
            {/* Animated car + logo in center */}
            <motion.div
              className="ts-animated-car"
              initial={{
                x: "-90vw",
                scale: 1.05,
                rotate: -7,
                opacity: 1
              }}
              animate={{
                x: "0vw",
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              exit={{
                x: "0vw",
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              transition={{
                duration: 1.3,
                ease: [0.81, 0.03, 0.28, 0.99]
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 238,
                pointerEvents: "none",
                position: "relative",
                zIndex: 12
              }}
              onAnimationComplete={() => setHasEntered(true)}
            >
              <FerrariF1SideSVG
                style={{
                  width: 285,
                  height: 88,
                  maxWidth: "46vw",
                  marginRight: 36,
                  filter: "drop-shadow(0 0 68px #ffe60099)"
                }}
              />
              {/* "TyreSense" appears just after car centers */}
              {hasEntered && (
                <motion.span
                  className="ts-animated-car-title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, delay: 0.05, ease: [0.71, 0.01, 0.18, 1] }}
                  style={{
                    marginLeft: 0,
                    fontSize: "2.9rem",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.13em",
                    filter: "brightness(1.34) blur(.03px)",
                    color: "#ffe600",
                    textShadow: "0 0 22px #ffe600a4, 0 2px 13px #000",
                    fontWeight: 800
                  }}
                >
                  TyreSense
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AnimatedCarIntro;
