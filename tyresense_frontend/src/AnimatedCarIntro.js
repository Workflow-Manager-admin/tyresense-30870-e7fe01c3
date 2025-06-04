import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

// PUBLIC_INTERFACE
function AnimatedCarIntro({ visible, onAnimationComplete }) {
  /**
   * Displays an animated car moving across the screen horizontally.
   * @param {boolean} visible - If true, show the car animation; otherwise hide.
   * @param {function} onAnimationComplete - Called after animation completes.
   */
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="ts-animated-car-intro-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "absolute", inset: 0, zIndex: 12 }}
        >
          <motion.div
            className="ts-animated-car"
            initial={{ x: "-30vw", rotate: -4 }}
            animate={{ x: "70vw", rotate: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.67, 0, 0.33, 1] }}
            onAnimationComplete={onAnimationComplete}
          >
            {/* Simple SVG Car - Minimal silhouette, fits neon dark theme */}
            <svg
              width="128"
              height="50"
              style={{ filter: "drop-shadow(0 0 24px #ffe600)"}}
              viewBox="0 0 128 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car body */}
              <rect x="16" y="18" width="80" height="25" rx="13" fill="#242528" />
              <rect x="32" y="9" width="48" height="14" rx="7" fill="#3b3c46" />
              {/* Front/back neon highlight */}
              <ellipse cx="17" cy="33" rx="8" ry="6" fill="#ffe600cc"/>
              <ellipse cx="95" cy="33" rx="8" ry="6" fill="#ffe600cc"/>
              {/* Wheels */}
              <ellipse cx="32" cy="42" rx="9" ry="9" fill="#10f9d8" />
              <ellipse cx="82" cy="42" rx="9" ry="9" fill="#10f9d8" />
              {/* Tyre */}
              <ellipse cx="32" cy="42" rx="6" ry="6" fill="#1B1B22" />
              <ellipse cx="82" cy="42" rx="6" ry="6" fill="#1B1B22" />
              {/* Window */}
              <rect x="45" y="12" width="18" height="9" rx="3.5" fill="#00fff9" opacity="0.37"/>
            </svg>
            <span className="ts-animated-car-title">TyreSense</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedCarIntro;
