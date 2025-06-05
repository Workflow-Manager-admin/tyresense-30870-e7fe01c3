import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCarIntro from "./AnimatedCarIntro";
import "./TyreBrandDetail.css";

/**
 * Tyre brand detail view (Premium overhaul, smooth modern transitions, no zoom-out animation):
 * - Tyre image floats at left (non-animated), bold and luxurious, with deep shadow/glow.
 * - Info blocks elegantly fade/slide in with classic presentational transitions.
 * - Layout, color, spacing, and shadow all maximize premium/luxury feeling with modern elegance.
 * - Removal of scroll-driven zoom-out or parallax—transitions are just for entrance.
 */

// High-res authentic tyre images per brand (see curated_tyre_images.txt for alt explanations)
const TYRE_IMAGES = {
  pirelli:
    process.env.PUBLIC_URL + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
  michelin:
    process.env.PUBLIC_URL + "/assets/20250605_071317_michelin-tyres.jpg",
  continental:
    process.env.PUBLIC_URL + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
  bridgestone:
    process.env.PUBLIC_URL + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
};

function getBrandInfoBlocks(brand) {
  // PUBLIC_INTERFACE
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
  // Info blocks for this brand
  const infoBlocks = useMemo(() => getBrandInfoBlocks(brand), [brand]);

  // Animation variants for blocks: soft slide/fade up
  const blockVariants = {
    hidden: { opacity: 0, y: 44 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.09 + i * 0.17,
        duration: 0.45,
        type: "spring",
        stiffness: 68,
        damping: 18,
        ease: [0.71, 0.01, 0.17, 1]
      }
    }),
    exit: { opacity: 0, y: 32, transition: { duration: 0.28 } }
  };

  // Outer layout: tyre image always left, info panes float right
  return (
    <div
      className="ts-brand-detail-outer"
      style={{
        minHeight: "100vh",
        position: "relative",
        width: "100%",
        background: "linear-gradient(136deg, #18181f 23%, #0c1026 100%)",
        paddingBottom: 0,
        paddingTop: 0,
      }}
    >
      {/* Topbar: back & logo */}
      <div
        className="ts-brand-detail-topbar"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          minHeight: 90,
          zIndex: 140,
          background: "linear-gradient(89deg, #18181f 92%, #0c1026 110%)",
          pointerEvents: "none",
          justifyContent: "center",
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
            zIndex: 141,
            pointerEvents: "auto",
          }}
        >
          ← Back
        </button>
        <div
          aria-hidden="true"
          style={{
            width: "100%",
            minHeight: 0,
            height: "100%",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
            zIndex: 140,
          }}
        >
          <AnimatedCarIntro asLogo />
        </div>
      </div>
      {/* Main body with tyre image and info blocks */}
      <div
        className="ts-brand-detail-container"
        style={{
          position: "relative",
          overflow: "visible",
          margin: "0 auto",
          marginTop: 34,
          paddingBottom: 28,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          gap: "0",
          minHeight: "calc(80vh - 80px)",
          maxWidth: 1180,
        }}
      >
        {/* Tyre Image Block (left) */}
        <div
          className="ts-brand-tyre-bg"
          style={{
            width: "50vw",
            maxWidth: 610,
            minWidth: 270,
            height: "80vh",
            minHeight: 350,
            maxHeight: 670,
            position: "relative",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 10,
            userSelect: "none",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <motion.img
            src={TYRE_IMAGES[brand.id] || TYRE_IMAGES["pirelli"]}
            alt={
              brand.id === "pirelli"
                ? "Pirelli Cinturato P7 tyre photo, full detail"
                : brand.id === "michelin"
                ? "Michelin Tyres, tread detail close-up"
                : brand.id === "continental"
                ? "Continental CityPlus tyre, macro sidewall/tread"
                : brand.id === "bridgestone"
                ? "Bridgestone Turanza T005 tyre, stacked detailed"
                : `Photograph of a real ${brand.name} tyre`
            }
            initial={{ opacity: 0, scale: 1.14, filter: "brightness(1.13) blur(5px)" }}
            animate={{
              opacity: 1,
              scale: 1,
              filter:
                "drop-shadow(0 8px 85px #00fff945) drop-shadow(0 11px 132px #ffe60033) brightness(1.12) contrast(1.15)",
              transition: {
                duration: 0.82,
                ease: [0.62, 0, 0.38, 1]
              }
            }}
            transition={{ duration: 0.86, ease: "easeOut" }}
            style={{
              width: "98%",
              height: "95%",
              objectFit: "cover",
              borderRadius: "41px",
              boxShadow:
                "0 22px 124px 22px #00fff931, 0 9px 52px 2px #ffe60050",
              filter:
                "drop-shadow(0 6px 99px #00fff947) brightness(1.15) contrast(1.13)",
              display: "block",
              background: "#191932",
              userSelect: "none",
              pointerEvents: "none",
              transition: "box-shadow .37s, filter .23s",
            }}
            draggable={false}
            loading="lazy"
          />
        </div>

        {/* Info blocks (right) */}
        <div
          className="ts-brand-info-panes"
          style={{
            width: "50vw",
            minWidth: 330,
            maxWidth: 550,
            minHeight: 350,
            margin: "0 auto",
            padding: "32px 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "30px",
            zIndex: 18,
            position: "relative",
          }}
        >
          <AnimatePresence>
            {infoBlocks.map((block, i) => (
              <motion.section
                key={block.label}
                className={`ts-brand-info-block ts-brand-info-block${i}`}
                variants={blockVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                exit="exit"
                layout
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(94deg,#191932 82%, #ffe60022 170%)"
                      : "rgba(21,21,59, 0.88)",
                  color: i === 0 ? "#ffe600" : "#fff",
                  borderRadius: "25px",
                  boxShadow:
                    i === 0
                      ? "0 3.5px 34px #ffe60029, 0 0.5px 53px #00fff933"
                      : "0 2px 13px #00fff912, 0 2.5px 22px #ffe60017",
                  minWidth: 290,
                  maxWidth: 460,
                  width: "95%",
                  padding: i === 0 ? "38px 34px 29px 38px" : "30px 22px 18px 30px",
                  margin: "0 0 12px 0",
                  filter: "brightness(1.08)",
                  pointerEvents: "auto",
                  transition: "box-shadow 0.25s",
                }}
              >
                <h2
                  className="ts-brand-block-title"
                  style={{
                    fontSize: i === 0 ? "2.15rem" : "1.18rem",
                    fontWeight: i === 0 ? 860 : 640,
                    letterSpacing: ".13em",
                    color: i === 0 ? "#ffe600" : "#fff",
                    lineHeight: "1.13",
                    marginTop: i === 0 ? "0" : "0.15em",
                    marginBottom: i === 0 ? "0.45em" : "0.24em",
                    textShadow:
                      i === 0
                        ? "0 2.5px 30px #00fff995, 0 6px 12.5px #ffe60036"
                        : "0 1.5px 10px #00fff988",
                    filter: "brightness(1.21)"
                  }}
                >
                  {block.label}
                </h2>
                <div className="ts-brand-block-content">{block.content}</div>
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
