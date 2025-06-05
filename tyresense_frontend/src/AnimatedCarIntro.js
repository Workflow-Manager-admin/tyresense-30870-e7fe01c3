import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Side View SVG (Visual Upgrade)
 * This is a true, crisp, side-on SVG representation of a Ferrari F1 car (2022+ era vibe, stylized for clarity and visual impact).
 * Proportions, lines, and shadows improved for a much more "real", visually rich appearance.
 */
// PUBLIC_INTERFACE
function FerrariF1SideSVG({ style, ...props }) {
  // A clean, visually enhanced Ferrari F1 side-view SVG, with sharper proportions and race-ready accents.
  // Key features: visually precise low nose, cockpit airbox, halo, realistic wheels/tyre shading, DRS, Ferrari shield.
  return (
    <svg
      viewBox="0 0 380 109"
      fill="none"
      width="300"
      height="90"
      style={style}
      {...props}
      aria-label="High-quality side view Ferrari F1 car"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient id="ferrariRed" x1="0" y1="0" x2="0" y2="115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D50A13" />
          <stop offset="1" stopColor="#960A12" />
        </linearGradient>
        <linearGradient id="ferrariBody" x1="0" y1="60" x2="380" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C10D10"/>
          <stop offset="0.49" stopColor="#F40C1E"/>
          <stop offset="0.96" stopColor="#900a13"/>
        </linearGradient>
        <linearGradient id="tyreBlack" x1="0" y1="0" x2="0" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#454649" />
          <stop offset="1" stopColor="#0D0D12" />
        </linearGradient>
        <radialGradient id="tyreRimGloss" cx="50%" cy="40%" r="64%">
          <stop offset="0.16" stopColor="#FFD700" stopOpacity="0.99"/>
          <stop offset="0.63" stopColor="#FFF6D2" stopOpacity="0.29"/>
          <stop offset="1" stopColor="#FFD700" stopOpacity="0.12"/>
        </radialGradient>
        <radialGradient id="carShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#222" stopOpacity="0.31" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.03" />
        </radialGradient>
      </defs>
      {/* Car shadow */}
      <ellipse cx="190" cy="103" rx="138" ry="6.7" fill="url(#carShadow)" opacity="0.24" />
      {/* Rear Wing (flat DRS) */}
      <rect x="340" y="38" width="29" height="7.6" rx="3.8" fill="#11131C" />
      <rect x="340.6" y="34" width="28" height="3.2" rx="1.6" fill="#FFE600" opacity="0.83" />
      {/* Rear Wheel */}
      <ellipse cx="333" cy="87.5" rx="20.5" ry="20.8" fill="url(#tyreBlack)" stroke="#E6E6E6" strokeWidth="4.2"/>
      <ellipse cx="333" cy="87.5" rx="10.7" ry="10.8" fill="url(#tyreRimGloss)" />
      {/* Front Wheel */}
      <ellipse cx="52.5" cy="87.7" rx="19.5" ry="19.8" fill="url(#tyreBlack)" stroke="#DADADA" strokeWidth="4.2"/>
      <ellipse cx="52.5" cy="87.7" rx="10.2" ry="10" fill="url(#tyreRimGloss)" />
      {/* Main body */}
      <rect x="66" y="55" width="255" height="27.5" rx="13.6" fill="url(#ferrariBody)" stroke="#FFE600" strokeWidth="1.92"/>
      {/* Cockpit "bubble" */}
      <rect x="168" y="19" width="51" height="45" rx="18.5" fill="url(#ferrariRed)" stroke="#FFE600" strokeWidth="1.4"/>
      {/* Halo */}
      <rect x="208" y="16" width="14.5" height="7.1" rx="3" fill="#111119" stroke="#FFE600" strokeWidth="0.6"/>
      {/* Airbox/Air intake */}
      <ellipse cx="196" cy="13.2" rx="7.6" ry="4" fill="#FFE600" stroke="#AAAA00" strokeWidth="0.38"/>
      {/* Headrest/roll bar behind head */}
      <rect x="222" y="32" width="8.8" height="20" rx="4" fill="#0f0e13" />
      {/* Undertray/floor */}
      <rect x="70" y="81" width="244" height="10.8" rx="5.1" fill="#101019" opacity=".62" stroke="#343335" strokeWidth="1.09"/>
      {/* Sidepod air inlets */}
      <rect x="270" y="66.2" width="23" height="5" rx="2.1" fill="#ffe600" opacity="0.63" />
      <rect x="84" y="67" width="17" height="6.1" rx="1.4" fill="#ffe600" opacity="0.47" />
      {/* Ferrari shield (simplified) */}
      <rect x="255" y="65" width="13.2" height="11.7" rx="3.2" fill="#ffe600" stroke="#111" strokeWidth="0.42"/>
      <text x="261.2" y="76" fontSize="7.7" fontWeight="bold" fill="#1a1a1a" style={{ fontFamily: 'monospace' }}>SF</text>
      {/* Driver helmet */}
      <ellipse cx="177" cy="36.2" rx="9.3" ry="9.0" fill="#e5e5e5" stroke="#D50A13" strokeWidth="2.1"/>
      <ellipse cx="179.5" cy="36.2" rx="3.7" ry="4.7" fill="#222" />
      {/* Side mirrors */}
      <rect x="160" y="45" width="7" height="3.5" rx="1.1" fill="#ffe600"/>
      <rect x="246" y="44.8" width="6" height="3.3" rx="1.2" fill="#ffe600"/>
      {/* Front wing mainplate/base */}
      <rect x="14" y="67.3" width="48" height="5.9" rx="3.2" fill="#22222b" />
      <rect x="10" y="74.2" width="53" height="3.4" rx="1.9" fill="#ffe600" opacity="0.91"/>
      {/* Nose */}
      <rect x="26" y="59.5" width="15" height="10.6" rx="4.1" fill="#ffe600" stroke="#AAA920" strokeWidth="0.39"/>
      {/* Front winglets (splitters/endplates) */}
      <rect x="19.6" y="74.6" width="12.1" height="4.4" rx="2.0" fill="#ffe600" opacity=".85"/>
      {/* Branding text and model */}
      <text x="222" y="71.5" fontSize="12.5" fontWeight="bold" fill="#1a1a1a" style={{ fontFamily: 'monospace' }}>SF-75</text>
      {/* Under-body accent shadow */}
      <ellipse cx="190" cy="90.3" rx="90" ry="4.7" fill="#e80b1b" opacity="0.14" />
      {/* Subtle body highlight */}
      <ellipse cx="225" cy="54" rx="65" ry="18" fill="#fff" opacity="0.14" />
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
