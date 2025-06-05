import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./TyreBrandDetail.css";

/**
 * Tyre brand detail view with advanced scroll-driven animation:
 * - Tyre image starts fully zoomed in, covering the section as a true background.
 * - As you scroll, it zooms out and shifts left, "parking" on the left.
 * - Key info blocks on the right appear progressively, not all at once, as you scroll further.
 * This layout uses the image as a background/cover at first. The info on the right appears in separate blocks, unveiled one after another.
 */

// Tyre images per brand
const TYRE_IMAGES = {
  pirelli:
    "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&w=900&q=90",
  michelin:
    "https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&w=900&q=90",
  continental:
    "https://images.pexels.com/photos/460235/pexels-photo-460235.jpeg?auto=compress&w=900&q=90",
  bridgestone:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=90",
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
  // Scale: starts at 1.23 (fully covers), zoom to 0.77 once scrolled enough
  const tyreScale = useTransform(scrollYProgress, [0, 0.35], [1.23, 0.77]);
  // X: at 0, at rest, as scroll increases move left into place (0 to -28vw)
  const tyreX = useTransform(scrollYProgress, [0, 0.29, 0.6], ["0vw", "-21vw", "-28vw"]);
  // Y: subtle move downward for parallax
  const tyreY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "8vh"]);
  // Border radius: round out as we park left
  const tyreBorder = useTransform(scrollYProgress, [0, 0.25, 1], [0, 42, 54]); // px
  // Drop shadow/brightness adjusts as image shifts
  const tyreFilter = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7],
    [
      "drop-shadow(0 8px 74px #00fff97e) brightness(1.2)",
      "drop-shadow(0 3px 34px #00fff96c) brightness(1.1)",
      "drop-shadow(0 1px 9px #00fff938) brightness(1.03)",
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
    <div className="ts-brand-detail-outer" style={{ minHeight: "100vh"}}>
      <button className="ts-detail-back-btn" onClick={onBack}>
        ← Back
      </button>
      <div
        className="ts-brand-detail-container"
        ref={ref}
        style={{
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Background: Tyre image (true cover at start). We absolutely position, z-index 2 */}
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
            alt={`Real-life ${brand.name} tyre`}
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
          {infoBlocks.map((block, i) => (
            <motion.section
              key={block.label}
              className={`ts-brand-info-block ts-brand-info-block${i}`}
              style={{
                opacity: infoBlockOpacities[i],
                y: infoBlockYs[i],
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
