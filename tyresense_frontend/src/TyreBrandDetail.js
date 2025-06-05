import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedCarIntro from "./AnimatedCarIntro";
import "./TyreBrandDetail.css";

/**
 * Tyre brand detail view with advanced scroll-driven animation:
 * - Tyre image starts fully zoomed in, covering the section as a true background.
 * - As you scroll, it zooms out and shifts left, "parking" on the left.
 * - Key info blocks on the right appear progressively, not all at once, as you scroll further.
 * This layout uses the image as a background/cover at first. The info on the right appears in separate blocks, unveiled one after another.
 */

/** 
 * Tyre images per brand: highest-res, authentic tyre assets only.
 * Every image below is: 2048px+ in width, strictly a tyre (not a car), real photo, vivid, and fills all detail containers crisply.
 * If additional brands are added, vet images for tyre-only, no vehicle, no placeholder.
 */
const TYRE_IMAGES = {
  pirelli:
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2048&q=90", // Studio-lit close-up Pirelli racing tyre
  michelin:
    "https://images.pexels.com/photos/18355280/pexels-photo-18355280.jpeg?auto=compress&w=2048&q=90", // Stacked Michelin high-performance tyres
  continental:
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=2048&q=90", // Macro Continental tyre bead and sidewall
  bridgestone:
    "https://images.pexels.com/photos/16760311/pexels-photo-16760311.jpeg?auto=compress&w=2048&q=90", // Bridgestone tyre under directional light, detail focus
};

// Info blocks per brand (demo text—could be extended/customized)
function getBrandInfoBlocks(brand) {
  return [
    {
      label: "About",
      content: (
        <span>
          <b>{brand.name}</b> delivers world-class tyres for every performance need.
          <br />
          <br />
          Experience extra grip and longevity with {brand.name}, driving safety and comfort.
        </span>
      ),
    },
    {
      label: "Highlights",
      content: (
        <ul>
          <li>Maximum grip, low rolling resistance</li>
          <li>Enhanced tread durability and noise reduction</li>
          <li>Engineered for precision in wet and dry</li>
        </ul>
      ),
    },
    {
      label: "Popular Model",
      content: (
        <span>
          <strong>Featured:</strong> {brand.name} UltraMax Pro<br/>
          <strong>Sizes:</strong> 195/65R15, 205/55R16, 225/45R17
        </span>
      ),
    },
    {
      label: "Shop",
      content: (
        <button
          className="ts-detail-buy-btn"
          onClick={() =>
            window.open(
              "https://www.google.com/search?q=" +
                encodeURIComponent(brand.name + " tyres"),
              "_blank"
            )
          }
        >
          Buy Now &rarr;
        </button>
      ),
    },
  ];
}

// PUBLIC_INTERFACE
function TyreBrandDetail({ brand, onBack }) {
  /**
   * This layout makes the tyre image the covering "background" at first, then scroll-animates it to park left,
   * while info blocks on right are progressively revealed upon further scrolling.
   */
  const ref = useRef(null);

  // Info blocks for this brand
  const infoBlocks = useMemo(() => getBrandInfoBlocks(brand), [brand]);

  // Scroll progress across the detail container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end center"], // gentle ramp
  });

  // IMAGE ANIMATION
  // Scale: starts at 1.23 (fully covers), zoom to 0.77 much slower and smoother (increases range, curve)
  const tyreScale = useTransform(
    scrollYProgress,
    [0, 0.6],
    [1.23, 0.77],
    { mixer: (a, b) => (t) => a + (b - a) * (1 - Math.cos(Math.PI * t)) / 2 } // easeInOutSine for extra smooth
  );
  // X: slow curve, linger at start, then ease out farther left
  const tyreX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.75],
    ["0vw", "-15vw", "-28vw"],
    { mixer: (a, b) => (t) => a + (b - a) * (1 - Math.cos(Math.PI * t)) / 2 }
  );
  // Y: move downward slower for parallax, linger at top
  const tyreY = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0vh", "8vh"]
  );
  // Border radius: round out more gently as we park left
  const tyreBorder = useTransform(scrollYProgress, [0, 0.4, 1], [0, 42, 54]);
  // Drop shadow/brightness adjusts slower for extra smooth transition
  const tyreFilter = useTransform(
    scrollYProgress,
    [0, 0.23, 1],
    [
      "drop-shadow(0 8px 74px #00fff97e) brightness(1.23)",
      "drop-shadow(0 3px 34px #00fff96c) brightness(1.11)",
      "drop-shadow(0 1px 9px #00fff938) brightness(1.04)",
    ]
  );
  // Opacity: always 1

  // INFO BLOCKS STAGING (no hooks in loops, call hooks directly and unconditionally)
  // Assuming there are always 4 info blocks
  const block0_opacity = useTransform(scrollYProgress, [0, 0.22, 0.22 + 0.16 * 0.95], [0, 0, 1]);
  const block0_y = useTransform(scrollYProgress, [0, 0.22, 0.22 + 0.16 * 0.95], [48, 44, 0]);
  const block1_opacity = useTransform(scrollYProgress, [0, 0.22 + 0.16, 0.22 + 0.16 * 2 * 0.95], [0, 0, 1]);
  const block1_y = useTransform(scrollYProgress, [0, 0.22 + 0.16, 0.22 + 0.16 * 2 * 0.95], [48, 44, 0]);
  const block2_opacity = useTransform(scrollYProgress, [0, 0.22 + 0.32, 0.22 + 0.16 * 3 * 0.95], [0, 0, 1]);
  const block2_y = useTransform(scrollYProgress, [0, 0.22 + 0.32, 0.22 + 0.16 * 3 * 0.95], [48, 44, 0]);
  const block3_opacity = useTransform(scrollYProgress, [0, 0.22 + 0.48, 0.22 + 0.16 * 4 * 0.95], [0, 0, 1]);
  const block3_y = useTransform(scrollYProgress, [0, 0.22 + 0.48, 0.22 + 0.16 * 4 * 0.95], [48, 44, 0]);

  // Container style: full height, relative + overflow hidden
  return (
    <div className="ts-brand-detail-outer" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Topbar with Back button and logo (z-index 120, always over detail/tyre but below fullscreen modals) */}
      <div
        className="ts-brand-detail-topbar"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          minHeight: 90,
          zIndex: 120,
          background: "transparent",
          pointerEvents: "none", // disables interactions except button, fixed below
          justifyContent: "center"
        }}
        aria-label="TyreSense navigation bar"
        role="banner"
      >
        <button
          className="ts-detail-back-btn"
          onClick={onBack}
          aria-label="Go back to brand selection"
          style={{
            marginLeft: 34,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            position: "relative",
            zIndex: 121,
            pointerEvents: "auto"
          }}
        >
          ← Back
        </button>
        {/* Always centered logo, never overlaps button, perfectly balanced */}
        <div
          aria-hidden="true"
          style={{
            width: "100%",
            minHeight: 0,
            height: "100%",
            position: "absolute",
            left: 0, right: 0, top: 0, bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 120,
          }}
        >
          <AnimatedCarIntro asLogo />
        </div>
      </div>
      <div
        className="ts-brand-detail-container"
        ref={ref}
        style={{
          position: "relative",
          overflow: "visible",
          marginTop: 20 // provides space below fixed logo/topbar
        }}
      >
        {/* Background: Tyre image (true cover at start). Absolutely position, z-index 2 */}
        <motion.div
          className="ts-brand-tyre-bg"
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0, right: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            willChange: "transform, filter, borderRadius",
            scale: tyreScale,
            x: tyreX,
            y: tyreY,
            borderRadius: tyreBorder,
            filter: tyreFilter,
            overflow: "hidden",
            background: "radial-gradient(ellipse at center, #232f5c 80%, #18181f 100%)",
            transition: "box-shadow 0.25s"
          }}
          aria-hidden="true"
        >
          <img
            src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
            alt={
              brand.id === "pirelli"
                ? "Studio-lit close-up of a Pirelli racing tyre with dramatic tread highlight and water droplets"
                : brand.id === "michelin"
                ? "Top-down photo of a stack of Michelin high-performance tyres in a spotless warehouse"
                : brand.id === "continental"
                ? "Macro detail showing Continental tyre bead and pronounced sidewall lettering"
                : brand.id === "bridgestone"
                ? "Single Bridgestone tyre illuminated by strong side light, showing detailed rubber pattern"
                : `Photograph of a real ${brand.name} tyre`
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              borderRadius: "inherit",
              background: "#181932",
              boxShadow: "0 0 100px #00fff951, 0 12px 38px #19193241",
              filter: "brightness(1.05) contrast(1.08)",
              pointerEvents: "none",
              userSelect: "none"
            }}
            draggable={false}
            loading="lazy"
          />
        </motion.div>

        {/* Foreground: staged right info blocks (flex col), relative zIndex 4 */}
        <div
          className="ts-brand-info-panes"
          style={{
            zIndex: 4,
            position: "relative",
            width: "100%",
            marginLeft: "auto",
            marginRight: 0,
            minHeight: 360,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "18px",
            paddingLeft: "48vw",
            transition: "padding-left 0.22s"
          }}
        >
          {infoBlocks.map((block, i) => {
            let opacity, y;
            if (i === 0) {
              opacity = block0_opacity; y = block0_y;
            } else if (i === 1) {
              opacity = block1_opacity; y = block1_y;
            } else if (i === 2) {
              opacity = block2_opacity; y = block2_y;
            } else {
              opacity = block3_opacity; y = block3_y;
            }
            return (
              <motion.section
                key={block.label}
                className={`ts-brand-info-block ts-brand-info-block${i}`}
                style={{
                  opacity,
                  y,
                  background: "rgba(21,21,59, 0.81)",
                  borderRadius: "22px",
                  boxShadow: "0 2px 15px #00fff924",
                  minWidth: 320,
                  maxWidth: 440,
                  width: "80%",
                  margin: "12px 0",
                  padding: "32px 30px 22px 38px",
                  filter: "brightness(1.08)",
                  pointerEvents: "auto"
                }}
              >
                <h2
                  className="ts-brand-block-title"
                  style={{
                    fontSize: i === 0 ? "2.05rem" : "1.25rem",
                    fontWeight: i === 0 ? 800 : 600,
                    letterSpacing: ".13em",
                    color: i === 0 ? "#ffe600" : "#fff",
                    lineHeight: "1.15",
                    marginTop: i === 0 ? "0" : "0.22em",
                    marginBottom: i === 0 ? "0.53em" : "0.29em",
                    textShadow: "0 1.5px 20px #00fff992"
                  }}
                >
                  {block.label}
                </h2>
                <div className="ts-brand-block-content">{block.content}</div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
