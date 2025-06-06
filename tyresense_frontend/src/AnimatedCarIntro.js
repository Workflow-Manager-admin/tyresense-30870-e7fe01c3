import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * TyreSense Animated Intro now uses the tyre-themed logo instead of a car.
 * Remove the inlined car SVG and use TyreLogoSVG for both animated intro and asLogo.
 */

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
    // Render tyre-themed logo plus TyreSense title for header use (just the new TyreLogoSVG)
    const TyreLogoSVG = require('./TyreLogoSVG').default;
    return (
      <span className="ts-animated-car-navbar" style={{display:"flex",alignItems:"center",gap:8,minWidth:92,height:46}}>
        <TyreLogoSVG style={{ width: 29, height: 29, minWidth: 20, marginRight: 10, verticalAlign: "middle", flex: "0 0 auto" }}/>
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
