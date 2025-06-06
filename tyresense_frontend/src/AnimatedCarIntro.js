import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * PUBLIC_INTERFACE
 * TyreSenseLogoCarSVG
 * Purpose: Bold, premium side-view car SVG with stylized, minimal lines for branding and animation.
 * The design is logo-like and scale-agnostic, with thick outlines and ColorCraft theme accents.
 */
function TyreSenseLogoCarSVG({ style, ...props }) {
  // SVG: side-view, stylized coupe, with gradient fills per new brand guidelines
  return (
    <svg
      width={style?.width || 230}
      height={style?.height || 68}
      viewBox="0 0 340 90"
      fill="none"
      style={style}
      {...props}
      aria-label="TyreSense brand logo car"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
    >
      <defs>
        <linearGradient id="ts-main-grad-a" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e5355" />
          <stop offset="1" stopColor="#e10600" />
        </linearGradient>
        <radialGradient id="ts-carBody" cx="52%" cy="50%" r="80%">
          <stop offset="0.18" stopColor="#4e5355" stopOpacity="1" />
          <stop offset="0.85" stopColor="#e10600" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="ts-roof" x1="42" y1="16" x2="236" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e5355" />
          <stop offset="1" stopColor="#e10600" />
        </linearGradient>
        <radialGradient id="ts-wheel-dark" cx="49%" cy="48%" r="51%">
          <stop offset="0.24" stopColor="#4e5355" />
          <stop offset="0.85" stopColor="#e10600" />
        </radialGradient>
        <linearGradient id="ts-badge-grad" x1="234" y1="55" x2="251" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4e5355" />
          <stop offset="1" stopColor="#e10600" />
        </linearGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="160" cy="88" rx="92" ry="5.5" fill="url(#ts-main-grad-a)" opacity="0.17"/>
      {/* Rear wheel */}
      <g>
        <circle cx="60" cy="71" r="19.4" fill="url(#ts-wheel-dark)" />
        <circle cx="60" cy="71" r="13" fill="url(#ts-main-grad-a)" />
        <circle cx="60" cy="71" r="6.7" fill="#fff" opacity="0.06"/>
      </g>
      {/* Front wheel */}
      <g>
        <circle cx="232" cy="71" r="18" fill="url(#ts-wheel-dark)" />
        <circle cx="232" cy="71" r="12" fill="url(#ts-main-grad-a)" />
        <circle cx="232" cy="71" r="5.9" fill="#fff" opacity="0.04"/>
      </g>
      {/* Car body main shape */}
      <path
        d="M43 66 Q54 22 124 24 Q136 4 200 7 Q255 8 278 29 Q312 35 321 64 Q326 66 329 68 Q314 72 238 67 Q131 65 75 73 Q48 69 43 66 Z"
        fill="url(#ts-carBody)"
        stroke="url(#ts-main-grad-a)"
        strokeWidth="2.7"
        opacity="1"
      />
      {/* Roof highlight (faint) */}
      <path
        d="M99 27 Q113 13 197 13 Q238 15 258 28"
        stroke="url(#ts-roof)"
        strokeWidth="2.8"
        fill="none"
        opacity="0.32"
        strokeLinecap="round"
      />
      {/* Window gloss, subtle accent only */}
      <path
        d="M118 22 Q135 13 205 16 Q240 20 247 30"
        stroke="#fff"
        strokeWidth="1.7"
        fill="none"
        opacity="0.07"
        strokeLinecap="round"
      />
      {/* Undercarriage */}
      <rect x="54" y="67.5" width="190" height="7.1" rx="3.8" fill="url(#ts-main-grad-a)" opacity="0.51" />
      {/* Door handle */}
      <rect x="135" y="49" width="26" height="2.2" rx="1.1" fill="url(#ts-main-grad-a)" opacity="0.19" />
      {/* Rear "fin" */}
      <rect x="41.3" y="54" width="7.1" height="15" rx="3.5" fill="url(#ts-main-grad-a)" opacity="0.09" />
      {/* Antenna (accent) */}
      <rect x="137" y="12" width="2.9" height="13" rx="1.7" fill="#fff" opacity="0.09" />
      {/* Speedline highlights */}
      <rect x="86" y="41" width="33" height="2" rx="1" fill="url(#ts-main-grad-a)" opacity="0.10" />
      <rect x="220" y="21" width="23" height="2" rx="1" fill="url(#ts-main-grad-a)" opacity="0.12" />
      {/* TyreSense badge in gradient */}
      <g>
        <circle cx="242.5" cy="62.5" r="8" fill="url(#ts-badge-grad)" stroke="url(#ts-main-grad-a)" strokeWidth="1.1" opacity="0.92"/>
        <path d="M237 63 Q242.7 56 248 63 Q243 67 237 65 Z" fill="#fff" opacity="0.12" />
      </g>
    </svg>
  );
}

/**
 * AnimatedCarIntro:
 * - Animates a detailed car and "TyreSense" brand name using only ColorCraft palette.
 * - After the animation, both persist, always parked and centered in the viewport.
 *
 * Props:
 *   - visible: boolean, controls whether the animation runs
 *   - onAnimationComplete: function, fired once intro finishes
 *   - asLogo: boolean, render as header logo
 */
// PUBLIC_INTERFACE
function AnimatedCarIntro({ visible, onAnimationComplete, asLogo = false }) {
  // State to track when the animation (entry) is over.
  const [hasEntered, setHasEntered] = useState(false);
  const doneOnce = useRef(false);

  // Trigger callback after entry anim is over.
  useEffect(() => {
    if (hasEntered && typeof onAnimationComplete === "function" && !doneOnce.current) {
      onAnimationComplete();
      doneOnce.current = true;
    }
  }, [hasEntered, onAnimationComplete]);

  // Persistent logo (mini, navbar style)
  if (asLogo) {
    // Just brand word (no car SVG) since tyre logo is provided by the header
    return (
      <span
        className="ts-animated-car-title"
        style={{
          marginLeft: 0,
          fontSize: "1.53rem",
          lineHeight: "1",
          whiteSpace: "nowrap",
          letterSpacing: "0.13em",
          filter: "brightness(1.10) blur(.01px)",
          color: "#fff",
          // Subtle double-shadow using main gradient colors
          textShadow: "0 0 10px #e10600a0, 0 0px 12px #4e5355b2",
          fontWeight: 800,
          flex: "0 0 auto",
          display: "inline-block",
          verticalAlign: "middle",
          background: "none"
        }}
      >
        TyreSense
      </span>
    );
  }

  // Animated intro
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
              // ColorCraft gradient
              background: "linear-gradient(140deg, #4e5355 68%, #e10600 100%)",
            }}
          >
            <motion.div
              className="ts-animated-car"
              initial={{
                x: "-90vw",
                scale: 1.05,
                rotate: -7,
                opacity: 1,
              }}
              animate={{
                x: "0vw",
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                x: "0vw",
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1.3,
                ease: [0.81, 0.03, 0.28, 0.99],
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 238,
                maxWidth: "92vw",
                pointerEvents: "none",
                position: "relative",
                zIndex: 12,
                width: "100%",
              }}
              onAnimationComplete={() => setHasEntered(true)}
            >
              <TyreSenseLogoCarSVG
                style={{
                  width: "21vw",
                  minWidth: 146,
                  maxWidth: 330,
                  height: "11vw",
                  minHeight: 38,
                  maxHeight: 92,
                  marginRight: "3vw",
                  filter: "drop-shadow(0 0 26px #e1060055)", // updated to red palette
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              />
              {/* "TyreSense" appears just after car centers */}
              {hasEntered && (
                <motion.span
                  className="ts-animated-car-title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.05,
                    ease: [0.71, 0.01, 0.18, 1],
                  }}
                  style={{
                    marginLeft: 0,
                    fontSize: "clamp(1.7rem, 5vw, 2.9rem)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.13em",
                    filter: "brightness(1.08) blur(.01px)",
                    color: "#FFFFFF", // accent
                    textShadow: "0 0 14px #e10600, 0 2px 14px #4e5355", // Only palette, no opacity tokens
                    fontWeight: 800,
                    lineHeight: 1,
                    display: "inline-block",
                    verticalAlign: "middle",
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
