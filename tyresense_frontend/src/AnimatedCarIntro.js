import React, { useEffect, useRef, useState } from "react";
// Ensure only named imports from 'framer-motion' as per latest recommendation.
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * PUBLIC_INTERFACE
 * TyreSenseLogoCarSVG
 * Purpose: Bold, premium side-view car SVG with stylized, minimal lines for branding and animation.
 * The design is logo-like and scale-agnostic, with thick outlines and muted Porsche-inspired accents.
 */
function TyreSenseLogoCarSVG({ style, ...props }) {
  // SVG: side-view, stylized coupe with bold lines, circular wheels, and premium muted highlights.
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
        <radialGradient id="ts-carBody" cx="49%" cy="52%" r="78%">
          <stop offset="0.02" stopColor="#b6b3a7" stopOpacity="0.72" />
          <stop offset="0.54" stopColor="#232327" stopOpacity="1" />
          <stop offset="1" stopColor="#18181c" stopOpacity="1" />
        </radialGradient>
        <linearGradient id="ts-roof" x1="42" y1="16" x2="220" y2="9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7d7d85" />
          <stop offset="0.8" stopColor="#edeef0" />
        </linearGradient>
        <radialGradient id="ts-wheel-dark" cx="49%" cy="48%" r="51%">
          <stop offset="0.29" stopColor="#4e5355" />
          <stop offset="0.77" stopColor="#232327" />
          <stop offset="1" stopColor="#0c0c0e" />
        </radialGradient>
        <radialGradient id="ts-wheel-gloss" cx="62%" cy="40%" r="66%">
          <stop offset="0.48" stopColor="#b6b3a7" stopOpacity="0.09" />
          <stop offset="0.96" stopColor="#edeef0" stopOpacity="0.04" />
        </radialGradient>
      </defs>
      {/* Shadow */}
      <ellipse cx="160" cy="88" rx="92" ry="5.5" fill="#18181c" opacity="0.18" />
      {/* Rear wheel */}
      <g>
        <circle cx="60" cy="71" r="19.4" fill="url(#ts-wheel-dark)" />
        <circle cx="60" cy="71" r="13" fill="#18181c" />
        <circle cx="60" cy="71" r="17" fill="url(#ts-wheel-gloss)" />
        <circle cx="60" cy="71" r="5.8" fill="#edeef0" opacity="0.08" />
        {/* Muted highlight */}
        <ellipse cx="56" cy="61" rx="6" ry="2.6" fill="#7d7d85" opacity="0.07" />
      </g>
      {/* Front wheel */}
      <g>
        <circle cx="232" cy="71" r="18" fill="url(#ts-wheel-dark)" />
        <circle cx="232" cy="71" r="12" fill="#232327" />
        <circle cx="232" cy="71" r="15" fill="url(#ts-wheel-gloss)" />
        <circle cx="232" cy="71" r="6" fill="#edeef0" opacity="0.05" />
        {/* Muted highlight */}
        <ellipse cx="229" cy="61" rx="6" ry="2.5" fill="#7d7d85" opacity="0.07" />
      </g>
      {/* Car body main shape (front to tail, stylized and logo-like) */}
      <path
        d="M43 66 Q54 22 124 24 Q136 4 200 7 Q255 8 278 29 Q312 35 321 64 Q326 66 329 68 Q314 72 238 67 Q131 65 75 73 Q48 69 43 66 Z"
        fill="url(#ts-carBody)"
        stroke="#7d7d85"
        strokeWidth="2.7"
        opacity="1"
      />
      {/* Roof - stylized highlight */}
      <path
        d="M99 27 Q113 13 197 13 Q238 15 258 28"
        stroke="url(#ts-roof)"
        strokeWidth="2.8"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
      {/* Window gloss - muted accent */}
      <path
        d="M118 22 Q135 13 205 16 Q240 20 247 30"
        stroke="#edeef0"
        strokeWidth="1.7"
        fill="none"
        opacity="0.07"
        strokeLinecap="round"
      />
      {/* Undercarriage */}
      <rect x="54" y="67.5" width="190" height="7.1" rx="3.8" fill="#18181c" />
      {/* Door handle - muted mini bar */}
      <rect x="135" y="49" width="26" height="2.2" rx="1.1" fill="#edeef0" opacity="0.11" />
      {/* Rear "fin" - thicker stylized bar */}
      <rect x="41.3" y="54" width="7.1" height="15" rx="3.5" fill="#edeef0" opacity="0.07" />
      {/* Short vertical antenna */}
      <rect x="137" y="12" width="2.9" height="13" rx="1.7" fill="#edeef0" opacity="0.11" />
      {/* Muted speedline (stylized motion effect) */}
      <rect x="86" y="41" width="33" height="2" rx="1" fill="#7d7d85" opacity="0.08" />
      <rect x="220" y="21" width="23" height="2" rx="1" fill="#7d7d85" opacity="0.09" />
      {/* TyreSense badge (logo dot, subtle) */}
      <g>
        <circle cx="242.5" cy="62.5" r="8" fill="#edeef0" stroke="#edeef0" strokeWidth="1.1" />
        <path d="M237 63 Q242.7 56 248 63 Q243 67 237 65 Z" fill="#fff" opacity="0.41" />
      </g>
    </svg>
  );
}

/**
 * AnimatedCarIntro:
 * - Animates a detailed Porsche-style car and "TyreSense" brand name to the center.
 * - After the animation, both persist, always parked and centered in the viewport.
 *
 * Props:
 *   - visible: boolean, controls whether the animation runs
 *   - onAnimationComplete: function, fired once intro finishes
 *   - asLogo: boolean, render as header logo style (persistent mini)
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
    return (
      <div
        className="ts-animated-car ts-animated-car-navbar"
        style={{
          position: "relative",
          left: "50%",
          top: "0",
          transform: "translateX(-50%)",
          minWidth: 165,
          maxWidth: 390,
          zIndex: 11,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: 63,
          width: "auto",
        }}
      >
        <TyreSenseLogoCarSVG
          style={{
            width: 92,
            height: 31,
            marginRight: 13,
            marginLeft: 2,
            // Subtle accent red shadow for Porsche branding
            filter: "drop-shadow(0 0 9px #b4081b22)",
            flex: "0 0 auto",
          }}
        />
        <span
          className="ts-animated-car-title"
          style={{
            marginLeft: 0,
            fontSize: "1.53rem",
            lineHeight: "1",
            whiteSpace: "nowrap",
            letterSpacing: "0.13em",
            filter: "brightness(1.13) blur(.01px)",
            color: "#edeef0",
            textShadow: "0 0 4px #b4081b40",
            fontWeight: 800,
            flex: "0 0 auto",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          TyreSense
        </span>
      </div>
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
              // Updated background using main palette primary/secondary
              background: "linear-gradient(140deg, #4e5355 68%, #001eff 100%)",
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
                  filter: "drop-shadow(0 0 31px #b4081b64)",
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
                    filter: "brightness(1.17) blur(.01px)",
                    color: "#edeef0",
                    textShadow: "0 0 10px #b4081b55, 0 2px 13px #000",
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
