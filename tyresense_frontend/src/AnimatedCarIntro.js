import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AnimatedCarIntro.css";

/**
 * Detailed Aerial Ferrari F1 Car SVG (SF-23/SF-24 style, top-down)
 * Main distinctive colorway: Ferrari Red with neon yellow accents,
 * black suspension/halo, four wheels, two wings.
 */
function FerrariF1AerialSVG({ style, ...props }) {
  return (
    <svg
      width="160"
      height="90"
      viewBox="0 0 160 90"
      fill="none"
      style={style}
      {...props}
      aria-label="Aerial Ferrari Formula 1 Car"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rear wing */}
      <rect x="52" y="78" width="56" height="8" rx="3.5" fill="#18181c" stroke="#18181c" strokeWidth="2"/>
      {/* Rear wing endplates */}
      <rect x="52" y="78" width="7.6" height="8" rx="2" fill="#f60020" stroke="#98091C" strokeWidth="0.6"/>
      <rect x="100.4" y="78" width="7.6" height="8" rx="2" fill="#f60020" stroke="#98091C" strokeWidth="0.6"/>

      {/* Rear tyres */}
      <ellipse cx="40" cy="67" rx="13" ry="13" fill="#1b1b1b" stroke="#bababa" strokeWidth="3"/>
      <ellipse cx="120" cy="67" rx="13" ry="13" fill="#1b1b1b" stroke="#bababa" strokeWidth="3"/>
      {/* Shadows under rear tyres */}
      <ellipse cx="40" cy="74" rx="8.8" ry="2.1" fill="#000" opacity="0.12"/>
      <ellipse cx="120" cy="74" rx="8.8" ry="2.1" fill="#000" opacity="0.12"/>

      {/* Floor plank */}
      <rect x="74" y="72.6" width="12.2" height="2.1" rx="1" fill="#FFD874"/>
      {/* Rear suspension arms */}
      <rect x="29.7" y="50" width="7.7" height="1.9" rx="0.7" fill="#211b1b"/>
      <rect x="122.6" y="50" width="7.7" height="1.9" rx="0.7" fill="#211b1b"/>
      {/* Rear suspension links */}
      <rect x="40.2" y="54.2" width="6" height="1.8" rx="0.7" fill="#2d2623" opacity="0.91"/>
      <rect x="113.8" y="54.2" width="6" height="1.8" rx="0.7" fill="#2d2623" opacity="0.91"/>

      {/* Main body (monocoque and sidepods) */}
      <rect x="66" y="16" width="28" height="50" rx="13" fill="#ED0B1B" stroke="#ffe600" strokeWidth="1.25"/>
      <rect x="50" y="30" width="60" height="26" rx="12" fill="#EF1A24" stroke="#faf600" strokeWidth="1.15"/>

      {/* Sidepod neon accent shape (left and right) */}
      <ellipse cx="58.7" cy="46" rx="5.2" ry="10.8" fill="#ffe600" opacity="0.14"/>
      <ellipse cx="101.3" cy="46" rx="5.2" ry="10.8" fill="#ffe600" opacity="0.14"/>

      {/* Cockpit opening */}
      <ellipse cx="80" cy="36" rx="10" ry="7.2" fill="#202021" />
      {/* Halo */}
      <path d="M71.5 33 q8.5 -18 17 0" stroke="#161622" strokeWidth="4.2" fill="none"/>
      {/* Halo yellow tips */}
      <ellipse cx="78" cy="25" rx="1.1" ry="1.1" fill="#ffe600"/>
      <ellipse cx="82" cy="25" rx="1.1" ry="1.1" fill="#ffe600"/>

      {/* Cockpit padding */}
      <ellipse cx="80" cy="36" rx="4.2" ry="1.7" fill="#232a38"/>
      {/* Driver helmet */}
      <ellipse cx="80" cy="35.8" rx="2.7" ry="2.2" fill="#0146ca" stroke="#ffe600" strokeWidth="0.7"/>
      <ellipse cx="80" cy="36.7" rx="2.1" ry="1.2" fill="#ffe600" opacity="0.35"/>

      {/* Ferrari logo badge (right pod) */}
      <rect x="103.4" y="43.5" width="8.9" height="7.1" rx="1.4" fill="#ffe600" stroke="#15110f" strokeWidth="0.85"/>
      <text x="106.4" y="49.1" fontSize="4.7" fontWeight="bold" fill="#1a1a1a">SF</text>

      {/* Side mirrors */}
      <ellipse cx="56" cy="18.6" rx="2.1" ry="3.8" fill="#ffe600" />
      <ellipse cx="104" cy="18.6" rx="2.1" ry="3.8" fill="#ffe600" />

      {/* Front nose cone */}
      <rect x="66.9" y="3" width="26.2" height="16.3" rx="6.8" fill="#ffe600" stroke="#c20507" strokeWidth="1.08"/>
      {/* Red tip */}
      <polygon points="80,2.5 76.4,12.3 83.6,12.3" fill="#d9041d" />

      {/* Black + white stickers below cockpit */}
      <rect x="74.1" y="19.6" width="12" height="2.3" rx="0.8" fill="#fff" stroke="#2c2021" strokeWidth="0.42"/>
      <rect x="76.8" y="24.5" width="6.5" height="1" rx="0.6" fill="#19191b" />

      {/* Front wing */}
      <rect x="56.7" y="0.6" width="46.8" height="8.5" rx="4.5" fill="#fff" stroke="#ed0b1b" strokeWidth="1.4"/>
      {/* Front wing endplates */}
      <rect x="56.7" y="0.6" width="6.8" height="8.5" rx="2.9" fill="#e30219"/>
      <rect x="96.7" y="0.6" width="6.8" height="8.5" rx="2.9" fill="#e30219"/>

      {/* Front tyres */}
      <ellipse cx="51" cy="15" rx="11.1" ry="11.1" fill="#19181d" stroke="#bababa" strokeWidth="3"/>
      <ellipse cx="109" cy="15" rx="11.1" ry="11.1" fill="#19181d" stroke="#bababa" strokeWidth="3"/>
      {/* Front tyre shadows */}
      <ellipse cx="51" cy="23.4" rx="7.6" ry="2.1" fill="#000" opacity="0.11"/>
      <ellipse cx="109" cy="23.4" rx="7.6" ry="2.1" fill="#000" opacity="0.11"/>

      {/* Front suspension arms */}
      <rect x="53.6" y="18.1" width="7.1" height="2.2" rx="1" fill="#656565" opacity="0.96"/>
      <rect x="99.3" y="18.1" width="7.1" height="2.2" rx="1" fill="#656565" opacity="0.96"/>
      <rect x="55.7" y="24" width="4.0" height="1.7" rx="0.8" fill="#18171a"/>
      <rect x="100.3" y="24" width="4.0" height="1.7" rx="0.8" fill="#18171a"/>

      {/* Diffuser highlight */}
      <ellipse cx="80" cy="86.6" rx="8.6" ry="1.3" fill="#222222" opacity="0.19"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
function AnimatedCarIntro({ visible, onAnimationComplete }) {
  /**
   * F1 Car rolls/zooms in and parks aligned left of TyreSense, then the unified duo remains.
   * @param {boolean} visible - Show/hide the animation.
   * @param {function} onAnimationComplete - Called after animation completes.
   */
  // The car and TyreSense are centered vertically; car parks left of text as one joined logo.
  // On small screens, everything scales down nicely.
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="ts-animated-car-intro-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "absolute", inset: 0, zIndex: 1200, pointerEvents: "none" }}
        >
          <motion.div
            className="ts-animated-car"
            initial={{
              x: "-50vw",
              scale: 1.3,
              rotate: -8,
              opacity: 1
            }}
            animate={{
              x: 0,           // parks at position 0 in flex row (left of TyreSense)
              scale: 1,
              rotate: 0,
              opacity: 1
            }}
            exit={{
              scale: 0.95, y: 32, opacity: 0
            }}
            transition={{
              duration: 2.4,
              ease: [0.74, 0.02, 0.25, 1]
            }}
            onAnimationComplete={onAnimationComplete}
            style={{
              flexDirection: "row",
              minWidth: 200,
              alignItems: "center",
              justifyContent: "flex-start",
              pointerEvents: "none"
            }}
          >
            <FerrariF1AerialSVG
              style={{
                width: 140,
                height: 80,
                minWidth: 108,
                marginRight: 18,
                filter: "drop-shadow(0 0 70px #ffe60088)"
              }}
            />
            <span
              className="ts-animated-car-title"
              style={{
                marginLeft: 0,
                fontSize: "2.68rem",
                whiteSpace: "nowrap",
                letterSpacing: "0.13em",
                filter: "brightness(1.34) blur(.03px)",
                color: "#ffe600",
                textShadow: "0 0 20px #ffe60090, 0 2px 10px #000"
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
