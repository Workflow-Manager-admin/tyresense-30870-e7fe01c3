import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Car Aerial SVG - simplified, bold, and stylized.
 */
function FerrariF1AerialSVG({ style, ...props }) {
  return (
    <svg
      width="108"
      height="64"
      viewBox="0 0 108 64"
      fill="none"
      style={style}
      {...props}
      aria-label="Aerial Ferrari F1 Car"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main red F1 body */}
      <rect x="34" y="14" width="40" height="36" rx="13" fill="#EF1A24" stroke="#FFE600" strokeWidth="2" />
      {/* Cockpit - center black */}
      <rect x="52" y="24" width="10" height="16" rx="3.7" fill="#1A1A1A" />
      {/* Nose (yellow tip) */}
      <rect x="47.5" y="6.2" width="13" height="17" rx="5.5" fill="#FFE600" stroke="#B11218" strokeWidth="1.4" />
      {/* Rear engine cover */}
      <rect x="48" y="44.8" width="12" height="12.5" rx="5.5" fill="#D90412" stroke="#80000D" strokeWidth="0.8" />
      {/* Driver helmet */}
      <ellipse cx="57" cy="28.6" rx="2.1" ry="3.7" fill="#1719CC"/>
      {/* Tyres (front) */}
      <rect x="22.8" y="8" width="8" height="18" rx="4" fill="#222" stroke="#AAA" strokeWidth="2"/>
      <rect x="77.2" y="8" width="8" height="18" rx="4" fill="#222" stroke="#AAA" strokeWidth="2"/>
      {/* Tyres (rear) */}
      <rect x="22.8" y="38" width="8" height="18" rx="4" fill="#222" stroke="#AAA" strokeWidth="2"/>
      <rect x="77.2" y="38" width="8" height="18" rx="4" fill="#222" stroke="#AAA" strokeWidth="2"/>
      {/* Front wing */}
      <rect x="41.7" y="3" width="24.6" height="5.8" rx="2.6" fill="#FFF" stroke="#B11218" strokeWidth="1.1"/>
      {/* Rear wing - tall with black center, red endplates */}
      <rect x="43.5" y="59" width="21" height="4" rx="2" fill="#18181F"/>
      <rect x="43.5" y="59" width="4.2" height="4" rx="1.6" fill="#D90412"/>
      <rect x="60.3" y="59" width="4.2" height="4" rx="1.6" fill="#D90412"/>
      {/* Ferrari badge (side) */}
      <rect x="68.2" y="18.7" width="6.2" height="6.2" rx="3.1" fill="#FFE600" stroke="#000" strokeWidth="0.8"/>
      {/* Sidepod shadow */}
      <ellipse cx="54" cy="50" rx="15" ry="4.2" fill="#000" opacity="0.08"/>
      {/* Side mirrors (yellow) */}
      <ellipse cx="40" cy="13.6" rx="1.2" ry="2.1" fill="#FFE600"/>
      <ellipse cx="68" cy="13.6" rx="1.2" ry="2.1" fill="#FFE600"/>
      {/* Motion line - left/right accents */}
      <rect x="12" y="30" width="13" height="2.2" rx="1.1" fill="#FFE600" opacity="0.18"/>
      <rect x="83" y="30" width="13" height="2.2" rx="1.1" fill="#FFE600" opacity="0.18"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
function AnimatedCarIntro({ visible, onAnimationComplete }) {
  /**
   * Displays the animated aerial Ferrari F1 zooming across and stopping at TyreSense.
   * After animation, the car 'parks' beside/under TyreSense and remains.
   * @param {boolean} visible - If true, show the car animation; otherwise hide.
   * @param {function} onAnimationComplete - Called after animation completes.
   */
  // The parked position is x: '49vw' for logo & car together, with a visual bias left
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
            initial={{ x: "-33vw", rotate: -6 }}
            animate={{ x: "49vw", rotate: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 2.3, ease: [0.67, 0, 0.33, 1] }}
            onAnimationComplete={onAnimationComplete}
            style={{ flexDirection: "row", minWidth: 140, alignItems: "center" }}
          >
            <FerrariF1AerialSVG style={{ filter: "drop-shadow(0 0 28px #ffe600a8)" }} />
            <span className="ts-animated-car-title" style={{ marginLeft: 18 }}>TyreSense</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedCarIntro;
