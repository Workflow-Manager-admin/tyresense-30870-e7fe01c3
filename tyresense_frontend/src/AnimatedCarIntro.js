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
            {/* SVG Car from Top-Down (Aerial) View */}
            <svg
              width="108"
              height="64"
              style={{ filter: "drop-shadow(0 0 22px #ffe600a8)" }}
              viewBox="0 0 108 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Car outline body */}
              <rect x="24" y="8" width="60" height="48" rx="16" fill="#242528" stroke="#ffe600b0" strokeWidth="2.8"/>
              {/* Central roof/cabin */}
              <rect x="37" y="16" width="34" height="30" rx="10" fill="#35364a" stroke="#22232b" strokeWidth="1.7"/>
              {/* Windshield (front, top) */}
              <rect x="43" y="8.7" width="22" height="8" rx="3.5" fill="#00fff9" opacity="0.31"/>
              {/* Rear windshield */}
              <rect x="43.2" y="47.6" width="22" height="7" rx="3.2" fill="#00fff9" opacity="0.19"/>
              {/* Car hood highlight line */}
              <rect x="47.5" y="8.6" width="13" height="2.7" rx="1.13" fill="#ffe600" opacity="0.18"/>
              {/* Doors dividing line */}
              <rect x="53" y="16.5" width="2" height="31" rx="1" fill="#ffe600" opacity="0.06"/>
              {/* Headlights */}
              <ellipse cx="30" cy="13.2" rx="4.9" ry="2.1" fill="#ffe600"/>
              <ellipse cx="78" cy="13.2" rx="4.9" ry="2.1" fill="#ffe600"/>

              {/* Tail lights */}
              <ellipse cx="30" cy="50.5" rx="4.2" ry="2.1" fill="#ff3566a5"/>
              <ellipse cx="78" cy="50.5" rx="4.2" ry="2.1" fill="#ff3566a5"/>

              {/* Side mirrors (stylized) */}
              <rect x="19.8" y="17" width="3.4" height="10" rx="2" fill="#ffe600" opacity="0.6" />
              <rect x="84.8" y="17" width="3.4" height="10" rx="2" fill="#ffe600" opacity="0.6" />

              {/* Wheels (aerial/vertical) */}
              <rect x="14.4" y="45" width="6" height="19" rx="3" fill="#10f9d8" stroke="#1B1B22" strokeWidth="2"/>
              <rect x="87.6" y="45" width="6" height="19" rx="3" fill="#10f9d8" stroke="#1B1B22" strokeWidth="2"/>
              <rect x="14.4" y="0" width="6" height="19" rx="3" fill="#10f9d8" stroke="#1B1B22" strokeWidth="2"/>
              <rect x="87.6" y="0" width="6" height="19" rx="3" fill="#10f9d8" stroke="#1B1B22" strokeWidth="2"/>

              {/* Tyre hub highlight */}
              <ellipse cx="17.4" cy="9.2" rx="1.4" ry="2.6" fill="#ffe600"/>
              <ellipse cx="17.4" cy="54.7" rx="1.4" ry="2.6" fill="#ffe600"/>
              <ellipse cx="90.6" cy="9.2" rx="1.4" ry="2.6" fill="#ffe600"/>
              <ellipse cx="90.6" cy="54.7" rx="1.4" ry="2.6" fill="#ffe600"/>
            </svg>
            <span className="ts-animated-car-title">TyreSense</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedCarIntro;
