import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Side View SVG (SF90/SF-23 style) - modern, sleek, side-on silhouette.
 * Used as the animated car intro and persistent logo.
 */
// PUBLIC_INTERFACE
function FerrariF1SideSVG({ style, ...props }) {
  // Car body: red main, dark undertray, gold/black wheels, fluo yellow details, outlined for contrast.
  return (
    <svg
      width="240"
      height="82"
      viewBox="0 0 240 82"
      fill="none"
      style={style}
      {...props}
      aria-label="Side view Ferrari F1 Car"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="120" cy="77.5" rx="98" ry="4.2" fill="#222" opacity="0.19" />
      <rect x="2" y="37" width="19.5" height="9" rx="2.9" fill="#21212a" />
      <rect x="2" y="46" width="17.5" height="3.7" rx="1.6" fill="#ffe600" />
      <ellipse cx="37" cy="66" rx="13" ry="13.2" fill="#18181c" stroke="#bababa" strokeWidth="3.2" />
      <ellipse cx="37" cy="66" rx="7.7" ry="7.9" fill="#FFD874" />
      <rect x="16.3" y="70.1" width="192" height="7.2" rx="3.1" fill="#232229" stroke="#232229" strokeWidth="1"/>
      <rect x="23" y="56" width="168" height="15.6" rx="7.9" fill="#ed0b1b" stroke="#ffe600" strokeWidth="1.6"/>
      <rect x="86" y="27.8" width="42.5" height="36.8" rx="17.3" fill="#ed0b1b" stroke="#ffe600" strokeWidth="1.45" />
      <rect x="109.5" y="22" width="11.5" height="10" rx="5" fill="#222630" stroke="#ffe600" strokeWidth="0.9"/>
      <rect x="114" y="35.5" width="3.6" height="11.4" rx="1.4" fill="#1b1b1b" />
      <rect x="184.5" y="66" width="18" height="3" rx="1.5" fill="#232229" />
      <rect x="48.2" y="69.5" width="122" height="3.1" rx="1.5" fill="#b70413" opacity="0.14"/>
      <rect x="119" y="58.7" width="20.2" height="7.6" rx="1.88" fill="#ffe600" stroke="#18181f" strokeWidth="0.8"/>
      <text x="126" y="64.3" fontSize="6.1" fontWeight="bold" fill="#1a1a1a">SF</text>
      <ellipse cx="120" cy="27.5" rx="7.5" ry="3.3" fill="#ffe600" opacity="0.74" />
      <rect x="190.6" y="45" width="39.2" height="11.2" rx="5.4" fill="#ed0b1b" stroke="#ffe600" strokeWidth="1"/>
      <rect x="223.2" y="48.4" width="11.0" height="4.5" rx="2.4" fill="#ffe600" stroke="#a39917" strokeWidth="0.38"/>
      <rect x="228.5" y="40.1" width="8.6" height="1.7" rx="0.9" fill="#ffe600"/>
      <rect x="228.9" y="41.8" width="8.6" height="1.7" rx="0.8" fill="#ffe600"/>
      <rect x="228" y="55.6" width="9.4" height="1.5" rx="0.7" fill="#ffe600"/>
      <ellipse cx="210" cy="67" rx="13" ry="13.2" fill="#18181c" stroke="#bababa" strokeWidth="3.2" />
      <ellipse cx="210" cy="67" rx="7.7" ry="7.9" fill="#FFD874" />
      <ellipse cx="37" cy="74.2" rx="8.9" ry="2.1" fill="#000" opacity="0.19" />
      <ellipse cx="210" cy="74.2" rx="8.9" ry="2.1" fill="#000" opacity="0.19" />
      <ellipse cx="108.5" cy="74.1" rx="56" ry="2.5" fill="#ed0b1b" opacity="0.18" />
      <rect x="101" y="45.9" width="37" height="5.5" rx="2.5" fill="#efe600" opacity="0.18"/>
      <ellipse cx="115.2" cy="29.1" rx="1.6" ry="0.8" fill="#18181c" />
      <ellipse cx="124.7" cy="29.1" rx="1.6" ry="0.8" fill="#18181c" />
      <rect x="73.2" y="43.1" width="6.3" height="1.2" rx="0.52" fill="#ffe600"/>
      <rect x="168.5" y="43.3" width="6.3" height="1.2" rx="0.52" fill="#ffe600"/>
      <rect x="110.4" y="37.7" width="14.4" height="4.4" rx="1.2" fill="#ffe600" opacity="0.72" />
      <text x="113.4" y="41.3" fontSize="3.1" fontWeight="bold" fill="#ed0b1b">F1</text>
    </svg>
  );
}

/**
 * AnimatedCarIntro controls the animated intro:
 * - Car starts off-screen, slides solo into center, parks.
 * - Only after car is centered, "TyreSense" appears to its right.
 * - Both stay perfectly centered during the intro, then (afterwards) slide down left and persist there as overlay.
 *
 * Props:
 *   - visible: boolean, controls whether the animation runs
 *   - onAnimationComplete: function, fired once intro finishes
 */
// PUBLIC_INTERFACE
function AnimatedCarIntro({ visible, onAnimationComplete }) {
  // State to track animation
  const [hasEntered, setHasEntered] = useState(false);
  const doneOnce = useRef(false);

  // Only calls onAnimationComplete the first time the animation finishes
  useEffect(() => {
    if (hasEntered && typeof onAnimationComplete === "function" && !doneOnce.current) {
      onAnimationComplete();
      doneOnce.current = true;
    }
  }, [hasEntered, onAnimationComplete]);

  // During the intro:
  // - "visible" is true, car slides in alone, then the TyreSense fades in statically.
  // After: both are docked fixed at bottom left as the app's persistent logo.

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="ts-animated-car-intro-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.31 } }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1200,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* The animated car block & brand name, perfectly centered ("main container center") */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                position: "relative"
              }}
            >
              {/* Car slides in from left to center */}
              <motion.div
                className="ts-animated-car"
                initial={{
                  x: "-80vw",
                  scale: 1.12,
                  rotate: -5,
                  opacity: 1
                }}
                animate={{
                  x: "0vw",
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                }}
                exit={{
                  scale: 1,
                  y: 0,
                  x: "0vw",
                  opacity: 1,
                }}
                transition={{
                  duration: 1.6,
                  ease: [0.8, 0.01, 0.28, 0.99]
                }}
                style={{
                  flexDirection: "row",
                  minWidth: 220,
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  position: "relative",
                  zIndex: 11
                }}
                onAnimationComplete={() => setHasEntered(true)}
              >
                <FerrariF1SideSVG
                  style={{
                    width: 210,
                    height: 74,
                    minWidth: 110,
                    maxWidth: "38vw",
                    marginRight: 26,
                    filter: "drop-shadow(0 0 56px #ffe60099)"
                  }}
                />
              </motion.div>
              {/* Brand name only appears after car has parked */}
              {hasEntered && (
                <motion.span
                  className="ts-animated-car-title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.72, 0.03, 0.22, 1.01] }}
                  style={{
                    marginLeft: 0,
                    fontSize: "2.69rem",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.13em",
                    filter: "brightness(1.34) blur(.03px)",
                    color: "#ffe600",
                    textShadow: "0 0 20px #ffe60090, 0 2px 10px #000",
                    position: "relative",
                    zIndex: 12
                  }}
                >
                  TyreSense
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Persistent logo after intro: fixed at left bottom */}
      {!visible && hasEntered && (
        <div
          className="ts-animated-car ts-animated-car-fixed"
          style={{
            position: "fixed",
            left: 0,
            bottom: "10vh",
            minWidth: 200,
            zIndex: 99,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <FerrariF1SideSVG
            style={{
              width: 148,
              height: 49,
              minWidth: 98,
              maxWidth: "17vw",
              marginRight: 13,
              filter: "drop-shadow(0 0 40px #ffe60070)"
            }}
          />
          <span
            className="ts-animated-car-title"
            style={{
              marginLeft: 0,
              fontSize: "2.11rem",
              whiteSpace: "nowrap",
              letterSpacing: "0.13em",
              filter: "brightness(1.2) blur(.01px)",
              color: "#ffe600",
              textShadow: "0 0 14px #ffe60080, 0 2px 10px #000"
            }}
          >
            TyreSense
          </span>
        </div>
      )}
    </>
  );
}

export default AnimatedCarIntro;
