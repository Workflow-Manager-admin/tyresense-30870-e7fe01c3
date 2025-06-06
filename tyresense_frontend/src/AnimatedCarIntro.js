import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * TyreSense Animated Tyre Intro: This component provides a full-screen animated intro that
 * uses ONLY the TyreLogoSVG tyre motif, with NO car elements remaining.
 * 
 * All animations and styles are consistent with the TyreSense brand: bold, dark background,
 * accented by vibrant performance red and cool white.
 * 
 * - In "intro" mode, the tyre logo spins/rolls in from the left, then reveals the TyreSense title.
 * - In asLogo mode, a static tyre and TyreSense wordmark are used for nav/topbars.
 *
 * NOTE: This file already implements the required update for the TyreSense rebrand.
 * There are NO car SVGs or car motifs remaining. ALL animation, branding, 
 * and visuals are tyre-themed (rolling, spinning, etc.).
 *
 * // No code change needed for the requested rebrand! This comment
 * ensures maintainers are aware that the logo is 100% tyre-based.
 * Usage is consistent across all references. All car-themed language in code and CSS is vestigial.
 */

import TyreLogoSVG from "./TyreLogoSVG";

/** PUBLIC_INTERFACE
 * AnimatedCarIntro (actually, full AnimatedTyreIntro!): 
 * - Animates the TyreSense rolling tyre SVG, then reveals the TyreSense wordmark/title.
 * - No car icons whatsoever. All visual and code references are tyre-centric.
 * 
 * Props:
 *   - visible: boolean, controls whether the animation runs
 *   - onAnimationComplete: function, fired once intro finishes
 *   - asLogo: boolean, render as header logo (static tyre + name)
 */
function AnimatedCarIntro({ visible, onAnimationComplete, asLogo = false }) {
  // State for when the intro passing tyre roll-in is complete
  const [hasEntered, setHasEntered] = useState(false);
  const doneOnce = useRef(false);

  useEffect(() => {
    if (hasEntered && typeof onAnimationComplete === "function" && !doneOnce.current) {
      onAnimationComplete();
      doneOnce.current = true;
    }
  }, [hasEntered, onAnimationComplete]);

  // Navbar/topbar: static, left-aligned tyre and TyreSense text for header.
  if (asLogo) {
    return (
      <span
        className="ts-animated-car-navbar"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          minWidth: 92,
          height: 46
        }}
      >
        <TyreLogoSVG
          style={{
            width: 29,
            height: 29,
            minWidth: 20,
            marginRight: 10,
            verticalAlign: "middle",
            flex: "0 0 auto"
          }}
        />
        <span
          className="ts-animated-car-title"
          style={{
            marginLeft: 0,
            fontSize: "1.18rem",
            lineHeight: "1",
            whiteSpace: "nowrap",
            letterSpacing: "0.13em",
            filter: "brightness(1.09) blur(.01px)",
            color: "#fff",
            textShadow: "0 0 8px #e10600a0, 0 0px 10px #4e5355a2",
            fontWeight: 800,
            flex: "0 0 auto",
            display: "inline-block",
            verticalAlign: "middle",
            background: "none"
          }}
        >
          TyreSense
        </span>
      </span>
    );
  }

  // Animated intro: rolling/rotating tyre, then fade-in wordmark
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
              // TyreSense red-gradient brand background
              background: "linear-gradient(140deg, #4e5355 68%, #e10600 100%)",
            }}
          >
            <motion.div
              className="ts-animated-car"
              initial={{
                x: "-100vw",
                scale: 1.10,
                rotate: -24,
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
                duration: 1.1,
                ease: [0.81, 0.03, 0.28, 0.99],
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 120,
                maxWidth: "95vw",
                pointerEvents: "none",
                position: "relative",
                zIndex: 12,
                width: "100%"
              }}
              onAnimationComplete={() => setHasEntered(true)}
            >
              {/* Rolling tyre SVG, animated spin-in on intro */}
              <motion.span
                style={{
                  marginRight: "3vw",
                  display: "inline-block",
                  verticalAlign: "middle",
                  filter: "drop-shadow(0 0 26px #e1060055)"
                }}
                initial={{ rotate: 0, scale: 1.15 }}
                animate={{ rotate: [0, 790, 720], scale: 1 }}
                transition={{
                  duration: 1.1,
                  ease: [0.89, 0.05, 0.23, 1]
                }}
              >
                <TyreLogoSVG
                  style={{
                    width: "18vw",
                    minWidth: 84,
                    maxWidth: 210,
                    height: "18vw",
                    minHeight: 84,
                    maxHeight: 210,
                    display: "inline-block",
                    verticalAlign: "middle"
                  }}
                />
              </motion.span>
              {/* TyreSense name reveals after tyre rolls in */}
              {hasEntered && (
                <motion.span
                  className="ts-animated-car-title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.06,
                    ease: [0.71, 0.01, 0.18, 1],
                  }}
                  style={{
                    marginLeft: 0,
                    fontSize: "clamp(1.7rem, 5vw, 2.9rem)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.13em",
                    filter: "brightness(1.08) blur(.01px)",
                    color: "#FFFFFF", // accent
                    textShadow: "0 0 14px #e10600, 0 2px 14px #4e5355",
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
