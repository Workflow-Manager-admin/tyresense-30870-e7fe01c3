import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Side View SVG (detailed, higher-fidelity, scalable vector).
 * This SVG is more premium, smooth, and visually rich.
 */
// PUBLIC_INTERFACE
function FerrariF1SideSVG({ style, ...props }) {
  // Enhanced SVG: clean, high-detail, gradients, improved wheels/body/light
  return (
    <svg
      width="300"
      height="90"
      viewBox="0 0 300 90"
      fill="none"
      style={style}
      {...props}
      aria-label="High-quality side view Ferrari F1 car"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient id="ferrariRed" x1="0" x2="0" y1="0" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E30717" />
          <stop offset="0.82" stopColor="#B50015" />
        </linearGradient>
        <radialGradient id="bodyShine" cx="60%" cy="55%" r="60%" fx="75%" fy="45%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#B50015" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tyreGloss" x1="0" y1="0" x2="0" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#555" />
          <stop offset="1" stopColor="#18181c" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="150" cy="88" rx="124" ry="4.3" fill="#222" opacity="0.21" />
      {/* Left Front Wing */}
      <rect x="10" y="48" width="29" height="5.8" rx="2.7" fill="#22212b" />
      <rect x="8" y="54.2" width="31.6" height="3.2" rx="1.6" fill="#ffe600" opacity="0.90"/>
      {/* Left Wheel */}
      <ellipse
        cx="44"
        cy="72"
        rx="17"
        ry="17.3"
        fill="url(#tyreGloss)"
        stroke="#bababa"
        strokeWidth="3.8"
      />
      <ellipse cx="44" cy="72" rx="10" ry="10.3" fill="#FFD874" />
      {/* Main Body */}
      <rect
        x="32"
        y="46"
        width="202"
        height="20.8"
        rx="10.2"
        fill="url(#ferrariRed)"
        stroke="#ffe600"
        strokeWidth="2.5"
      />
      {/* Cockpit */}
      <rect
        x="101"
        y="22.8"
        width="51"
        height="34.5"
        rx="15.1"
        fill="url(#ferrariRed)"
        stroke="#ffe600"
        strokeWidth="1.9"
      />
      {/* Halo */}
      <rect x="138" y="18" width="12" height="5.4" rx="2.6" fill="#222630" stroke="#ffe600" strokeWidth="0.9"/>
      {/* Headrest */}
      <rect x="151.7" y="34" width="5.5" height="16.5" rx="2.75" fill="#1a191c" />
      {/* Floor/Undertray */}
      <rect x="37" y="66.5" width="196" height="8" rx="4" fill="#18181f" opacity=".65" stroke="#232229" strokeWidth="1" />
      {/* Nose tip */}
      <rect x="14" y="42.2" width="17.2" height="8.3" rx="3" fill="#ffe600" opacity=".97" stroke="#a39917" strokeWidth="0.41"/>
      {/* Front winglets */}
      <rect x="24" y="56.7" width="12.1" height="4.6" rx="2.0" fill="#ffe600" opacity=".84"/>
      {/* Rear Pod */}
      <rect x="228" y="38" width="61" height="16.4" rx="8.2" fill="url(#ferrariRed)" stroke="#ffe600" strokeWidth="2.1"/>
      {/* Rear light */}
      <ellipse cx="289.8" cy="46.1" rx="3.7" ry="4.9" fill="#E30717" stroke="#ffe600" strokeWidth="0.95"/>
      {/* DRS Wing */}
      <rect x="249.2" y="31" width="32" height="4.1" rx="1.9" fill="#ffe600"/>
      {/* Rear wheels */}
      <ellipse
        cx="262"
        cy="73"
        rx="17"
        ry="17.3"
        fill="url(#tyreGloss)"
        stroke="#bababa"
        strokeWidth="3.8"
      />
      <ellipse cx="262" cy="73" rx="10" ry="10.3" fill="#FFD874" />
      {/* Wheel shadows */}
      <ellipse cx="44" cy="80.7" rx="10" ry="2.5" fill="#000" opacity="0.16" />
      <ellipse cx="262" cy="80.7" rx="10" ry="2.5" fill="#000" opacity="0.16" />
      <ellipse cx="150" cy="80.9" rx="69" ry="3.5" fill="#ed0b1b" opacity="0.14" />
      {/* Air inlets */}
      <rect x="190.8" y="54.9" width="24" height="4.8" rx="2.1" fill="#ffe600" opacity="0.64" />
      {/* Branding */}
      <text x="160" y="62.8" fontSize="11" fontWeight="bold" fill="#1a1a1a" style={{ fontFamily: 'monospace' }}>SF90</text>
      <text x="121" y="48.5" fontSize="8" fontWeight="bold" fill="#ed0b1b">F1</text>
      {/* Shine overlay for dynamism */}
      <ellipse cx="180" cy="52" rx="72" ry="17" fill="url(#bodyShine)" />
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
