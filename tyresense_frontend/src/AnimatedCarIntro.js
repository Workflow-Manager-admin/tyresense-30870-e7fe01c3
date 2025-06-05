import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Side View SVG (Visual Upgrade)
 * This is a true, crisp, side-on SVG representation of a Ferrari F1 car (2022+ era vibe, stylized for clarity and visual impact).
 * Proportions, lines, and shadows improved for a much more "real", visually rich appearance.
 */
/**
 * PUBLIC_INTERFACE
 * FerrariF1SideSVG: Now featuring an ultra-polished, highly detailed Ferrari F1 car (side view, 2022+), with more realistic wheels, correct "shark" nose, accurate halo, subtle sponsor/numbering, intense paint, and pro motorsport touches. Optimized for scale and dark backgrounds.
 */
function FerrariF1SideSVG({ style, ...props }) {
  return (
    <svg
      viewBox="0 0 420 120"
      fill="none"
      width="300"
      height="95"
      style={style}
      {...props}
      aria-label="Ultra-premium Ferrari F1 2022+ side profile"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient id="ferrariRedGrad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D50317" />
          <stop offset="1" stopColor="#84030C" />
        </linearGradient>
        <linearGradient id="mainBodyRed" x1="30" y1="80" x2="340" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C30410"/>
          <stop offset="0.6" stopColor="#f0101a"/>
          <stop offset="1" stopColor="#65040C"/>
        </linearGradient>
        <linearGradient id="matteBlack" x1="0" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b3c41" />
          <stop offset="1" stopColor="#19161d" />
        </linearGradient>
        <radialGradient id="carbonGloss" cx="48%" cy="29%" r="61%">
          <stop offset="0.19" stopColor="#F6D944" stopOpacity="0.95"/>
          <stop offset="0.48" stopColor="#FFFBE6" stopOpacity="0.37"/>
          <stop offset="1" stopColor="#F6D944" stopOpacity="0.11"/>
        </radialGradient>
        <radialGradient id="tyreShadow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#2a090c" stopOpacity="0.31" />
          <stop offset="100%" stopColor="#121210" stopOpacity="0.13" />
        </radialGradient>
        <radialGradient id="mainShadow" cx="50%" cy="62%" r="78%">
          <stop offset="0.11" stopColor="#410d19" stopOpacity="0.31" />
          <stop offset="1" stopColor="#000" stopOpacity="0.09" />
        </radialGradient>
      </defs>
      {/* Main car shadow */}
      <ellipse cx="202" cy="113" rx="144" ry="7.5" fill="url(#mainShadow)" opacity="0.19" />
      {/* Rear wing endplate, main (black/red) */}
      <rect x="352" y="38" width="30" height="38" rx="5" fill="#2C1519" />
      <rect x="350" y="36" width="33" height="9" rx="2.5" fill="#EC1A20" />
      {/* DRS pod (hint) */}
      <rect x="349" y="32" width="34" height="4.3" rx="2.15" fill="#FFE600" opacity="0.97" />
      {/* Rear tyre group */}
      <g>
        <ellipse cx="355" cy="91.5" rx="22" ry="22.5" fill="url(#matteBlack)" stroke="#EEEEEC" strokeWidth="5"/>
        <ellipse cx="355" cy="91.5" rx="12.2" ry="12.7" fill="url(#carbonGloss)" />
        <ellipse cx="355" cy="91.5" rx="16" ry="16.7" fill="url(#tyreShadow)" opacity="0.16"/>
      </g>
      {/* Front tyre group */}
      <g>
        <ellipse cx="78.5" cy="94.2" rx="21.2" ry="21.4" fill="url(#matteBlack)" stroke="#D3DAE1" strokeWidth="4.5"/>
        <ellipse cx="78.5" cy="94.2" rx="11.4" ry="12" fill="url(#carbonGloss)" />
        <ellipse cx="78.5" cy="94.2" rx="14.2" ry="14.9" fill="url(#tyreShadow)" opacity="0.13"/>
      </g>
      {/* Floor/undertray */}
      <rect x="84" y="103.2" width="241" height="11.4" rx="6.5" fill="#23262A" opacity="0.62" stroke="#36353f" strokeWidth="1.2"/>
      {/* Sidepod and floor edges */}
      <rect x="94" y="84.5" width="219" height="21.6" rx="11.2" fill="url(#mainBodyRed)" stroke="#FFE600" strokeWidth="2"/>
      <rect x="244" y="84.5" width="61" height="21.6" rx="10.5" fill="#d20516" stroke="#FFE600" strokeWidth="1.1"/>

      {/* Main Ferrari body */}
      <rect x="78" y="48" width="224" height="36" rx="18.5"
        fill="url(#mainBodyRed)" stroke="#FFE600" strokeWidth="2.2"/>
      {/* Cockpit glass */}
      <rect x="180" y="18.5" width="61" height="38.5" rx="19.5"
        fill="url(#ferrariRedGrad)" stroke="#FFE600" strokeWidth="1.8"/>
      {/* Halo */}
      <rect x="236" y="16" width="18" height="8.7" rx="3.6"
        fill="#19171d" stroke="#FFE600" strokeWidth="0.7"/>
      {/* Halo double supports */}
      <rect x="248" y="24" width="5" height="16" rx="1.5" fill="#ffe600" opacity="0.85" />
      <rect x="208" y="24" width="4.6" height="15.4" rx="1.27" fill="#ffe600" opacity="0.5" />
      {/* Airbox/intake */}
      <ellipse cx="215" cy="14.4" rx="8" ry="4.3" fill="#FFE600" stroke="#DAAC13" strokeWidth="0.41"/>
      {/* Chassis/engine cover */}
      <rect x="256" y="28" width="22" height="23.5" rx="4.6" fill="#0f0e13"/>
      <rect x="289" y="35.2" width="13.5" height="12.7" rx="3.1" fill="#ffe60066"/>
      {/* "Shark" extended nose (modern F1 highlight) */}
      <rect x="42" y="65" width="46" height="13.6" rx="6.8" fill="#FFE600" stroke="#C9C143" strokeWidth="0.41"/>
      {/* Driver helmet + seat */}
      <ellipse cx="195" cy="36.1" rx="9.1" ry="8.7" fill="#f8e8e8" stroke="#DD0D19" strokeWidth="2.2"/>
      <ellipse cx="198" cy="36.1" rx="3.6" ry="4.5" fill="#362022" />
      {/* Roll hoop */}
      <rect x="237" y="26.2" width="7.7" height="19.3" rx="3.8" fill="#111a1d" />
      {/* Mirrors */}
      <rect x="158" y="49" width="7.5" height="4.1" rx="1.45" fill="#ffe600"/>
      <rect x="287" y="47" width="6.2" height="3.6" rx="1.1" fill="#ffe600"/>
      {/* Ferrari shield (SVG-optimized, stylized) */}
      <rect x="276" y="74.1" width="15" height="13.5" rx="3.1"
        fill="#FFE600" stroke="#191a1a" strokeWidth="0.38"/>
      <text x="280.5" y="85.5" fontSize="8.5" fontWeight="bold"
        fill="#111a1a" style={{fontFamily: 'monospace'}}>SF</text>
      {/* Branding text/number model number */}
      <text x="260" y="71" fontSize="14.3" fontWeight="bold"
        fill="#1a1a1a" style={{ fontFamily: 'monospace' }}>75</text>
      {/* Front wing mainplate (multi-segment for F1 2022+) */}
      <rect x="22" y="75.5" width="60" height="7" rx="3.3" fill="#22222b" />
      <rect x="17" y="82.8" width="64" height="4" rx="2.4" fill="#ffe600" opacity="0.96"/>
      {/* Front winglets (modern swept flow) */}
      <rect x="31.3" y="90" width="11.5" height="2.2" rx="1.1" fill="#ffe600" opacity="0.74"/>
      <rect x="46" y="90.8" width="10.1" height="2" rx="0.85" fill="#ffe600" opacity="0.74"/>
      {/* Subtle body highlight */}
      <ellipse cx="185" cy="60" rx="72" ry="19" fill="#fff" opacity="0.10" />
      {/* Tire rakes/wheel highlights */}
      <ellipse cx="78.5" cy="94.2" rx="8.5" ry="7.5" fill="#ffe600" opacity="0.11" />
      <ellipse cx="355" cy="91.5" rx="8.5" ry="7.5" fill="#ffe600" opacity="0.11" />
      {/* Rear number/ferrari accent bar */}
      <rect x="345" y="78" width="20" height="6" rx="2.5" fill="#ffe600" opacity="0.85" />
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
