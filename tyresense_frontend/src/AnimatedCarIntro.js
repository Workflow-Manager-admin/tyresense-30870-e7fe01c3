import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Ferrari F1 Car Aerial SVG - photorealistic, accurate detail (top-down 2023/2024 SF-23/SF-24 flavor).
 * Approximates the real Ferrari livery, halo, suspension, and the distinctive wing/tyre geometry.
 */
function FerrariF1AerialSVG({ style, ...props }) {
  return (
    <svg
      width="140"
      height="76"
      viewBox="0 0 140 76"
      fill="none"
      style={style}
      {...props}
      aria-label="Aerial Ferrari Formula 1 Car"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rear wing (black, broad) */}
      <rect x="40" y="67" width="60" height="8" rx="4" fill="#19191f" stroke="#19191f" strokeWidth="2"/>
      {/* Rear wing endplates (red) */}
      <rect x="40" y="67" width="7" height="8" rx="2" fill="#F60020" stroke="#b11117" strokeWidth="0.6"/>
      <rect x="93" y="67" width="7" height="8" rx="2" fill="#F60020" stroke="#b11117" strokeWidth="0.6"/>

      {/* Rear tyres (left/right) */}
      <ellipse cx="32" cy="60" rx="13" ry="13" fill="#191919" stroke="#bbb" strokeWidth="3"/>
      <ellipse cx="108" cy="60" rx="13" ry="13" fill="#191919" stroke="#bbb" strokeWidth="3"/>
      {/* Shadow under rear tyres */}
      <ellipse cx="32" cy="67" rx="9" ry="2.1" fill="#000" opacity="0.13"/>
      <ellipse cx="108" cy="67" rx="9" ry="2.1" fill="#000" opacity="0.13"/>

      {/* Main body center spine (main survival cell) */}
      <rect x="58" y="13" width="24" height="45" rx="10" fill="#ED0B1B" stroke="#ffe600" strokeWidth="1.2"/>
      {/* Sidepods broader section */}
      <rect x="46" y="31" width="48" height="21" rx="10.5" fill="#EF1A24" stroke="#faf600" strokeWidth="1.2"/>
      {/* Cockpit opening inside (black) */}
      <ellipse cx="70" cy="33.5" rx="9" ry="6.5" fill="#16171b" />
      {/* Halo (black arc) */}
      <path d="M61 31 q9 -14 18 0" stroke="#0d0f13" strokeWidth="3.5" fill="none"/>
      {/* Headrest padding */}
      <ellipse cx="70" cy="33.5" rx="4.6" ry="2.1" fill="#232a38"/>
      {/* Driver helmet (blue visor) */}
      <ellipse cx="70" cy="33.7" rx="2.7" ry="2.3" fill="#0033cc" stroke="#ffe600" strokeWidth="0.7"/>
      <ellipse cx="70" cy="34.6" rx="2" ry="1.3" fill="#ffe600" opacity="0.41"/>
      {/* Ferrari badge in sidepod */}
      <rect x="89.2" y="38.3" width="7.2" height="8.2" rx="1.8" fill="#ffe600" stroke="#1d0f0f" strokeWidth="0.8"/>
      <text x="92.7" y="43.7" fontSize="5" fontWeight="bold" fill="#111">SF</text>

      {/* Side mirrors */}
      <ellipse cx="48" cy="18" rx="2.2" ry="4.2" fill="#ffe600" />
      <ellipse cx="92" cy="18" rx="2.2" ry="4.2" fill="#ffe600" />

      {/* Front nose cone */}
      <rect x="58.3" y="1.3" width="23.5" height="18" rx="6.5" fill="#ffe600" stroke="#c20507" strokeWidth="1.2"/>
      {/* Red triangle nose tip */}
      <polygon points="70,1.5 66,11 74,11" fill="#d9041d" />
      {/* Black and white stickers/emblems under cockpit */}
      <rect x="66.5" y="18.6" width="7" height="2.2" rx="0.7" fill="#fff" stroke="#19191f" strokeWidth="0.55"/>
      <rect x="67.5" y="22.1" width="5" height="0.95" rx="0.4" fill="#16171b" />

      {/* Front wing (wide) */}
      <rect x="49" y="0.2" width="42" height="8.8" rx="4.2" fill="#fff" stroke="#ed0b1b" strokeWidth="1.6"/>
      {/* Front wing endplates */}
      <rect x="49" y="0.2" width="6" height="8.8" rx="2.7" fill="#e30219"/>
      <rect x="85" y="0.2" width="6" height="8.8" rx="2.7" fill="#e30219"/>

      {/* Front tyres */}
      <ellipse cx="40" cy="13" rx="11" ry="11" fill="#16181b" stroke="#bbb" strokeWidth="3"/>
      <ellipse cx="100" cy="13" rx="11" ry="11" fill="#16181b" stroke="#bbb" strokeWidth="3"/>
      {/* Shadow under front tyres */}
      <ellipse cx="40" cy="21" rx="7.5" ry="2.3" fill="#000" opacity="0.11"/>
      <ellipse cx="100" cy="21" rx="7.5" ry="2.3" fill="#000" opacity="0.11"/>

      {/* Front suspension arms */}
      <rect x="42" y="16" width="6" height="2" rx="1" fill="#666" opacity="0.96"/>
      <rect x="92" y="16" width="6" height="2" rx="1" fill="#666" opacity="0.96"/>
      <rect x="43.4" y="22" width="3.7" height="1.5" rx="0.8" fill="#231a1a"/>
      <rect x="92.9" y="22" width="3.7" height="1.5" rx="0.8" fill="#231a1a"/>
      {/* Rear suspension arms */}
      <rect x="33" y="45" width="4.9" height="1.5" rx="0.7" fill="#231a1a"/>
      <rect x="102" y="45" width="4.9" height="1.5" rx="0.7" fill="#231a1a"/>

      {/* Diffuser highlight */}
      <ellipse cx="70" cy="74" rx="8.7" ry="1.7" fill="#1e1e1e" opacity="0.12"/>

      {/* Floor plank line */}
      <rect x="67" y="58.3" width="6" height="2.1" rx="1" fill="#FFD874"/>
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
            initial={{ x: "-33vw", rotate: -6, scale: 1.2 }}
            animate={{
              x: "49vw",
              rotate: 0,
              scale: 1
            }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 2.3, ease: [0.67, 0, 0.33, 1] }}
            onAnimationComplete={onAnimationComplete}
            style={{ flexDirection: "row", minWidth: 185, alignItems: "center" }}
          >
            <FerrariF1AerialSVG
              style={{
                filter: "drop-shadow(0 0 60px #ffe600aa)",
                width: 140,
                height: 76,
                minWidth: 110,
                marginRight: 14
              }}
            />
            <span
              className="ts-animated-car-title"
              style={{
                marginLeft: 16,
                fontSize: "2.5rem",
                whiteSpace: "nowrap",
                letterSpacing: "0.14em",
                filter: "brightness(1.34) blur(.04px)"
              }}
            >
              TyreSense
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedCarIntro;
