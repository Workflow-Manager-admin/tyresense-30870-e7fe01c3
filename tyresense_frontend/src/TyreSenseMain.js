import React, { useEffect, useRef, useState } from "react";
import "./TyreSenseMain.css";
import AnimatedCarIntro from "./AnimatedCarIntro";
import TyreTypesShowcase from "./TyreTypesShowcase";
import TyreBrandDetail from "./TyreBrandDetail";
import GoogleMapsStoreLocator from "./GoogleMapsStoreLocator";

/**
 * TyreSenseMain - Main container for TyreSense app UI, with a blackout overlay intro.
 */
function TyreSenseMain() {
  // --- Intro/blackout orchestration logic:
  const [stage, setStage] = useState("BLACKOUT"); // "BLACKOUT" | "CAR_ANIM" | "LOGO_FADEIN" | "LIFT_BLACKOUT" | "SHOW_MAIN"
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [blackoutOpacity, setBlackoutOpacity] = useState(1);

  // Refs to control timeouts and animation triggers
  const logoFadeInTimeout = useRef();
  const liftBlackoutTimeout = useRef();

  // On mount: start animated car as soon as possible after blackout paint
  useEffect(() => {
    setStage("CAR_ANIM");
  }, []);

  // After car parks: trigger TyreSense logo fade-in
  const handleAnimatedCarDone = () => {
    setStage("LOGO_FADEIN");
    // Give time for "TyreSense" word to fade in fully
    logoFadeInTimeout.current = setTimeout(() => {
      setStage("LIFT_BLACKOUT");
      // Smoothly fade out blackout after brief brand mark animation
      setTimeout(() => {
        // Blackout is faded out, switch to showing main content
        setStage("SHOW_MAIN");
      }, 550); // Blackout fade duration matches CSS (see .blackout-overlay)
    }, 660); // Time for "TyreSense" to appear after car parks
  };

  // Clean up timers if rich navigation occurs
  useEffect(() => {
    return () => {
      if (logoFadeInTimeout.current) clearTimeout(logoFadeInTimeout.current);
      if (liftBlackoutTimeout.current) clearTimeout(liftBlackoutTimeout.current);
    };
  }, []);

  function handleBrandSelect(brand) {
    setSelectedBrand(brand);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleBackFromDetail() {
    setSelectedBrand(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Blackout overlay states ---
  // Blackout is visible for all intro states except "SHOW_MAIN"
  const showBlackout = stage !== "SHOW_MAIN";
  // Blackout should fade out only on "LIFT_BLACKOUT"
  const blackoutStyle = showBlackout
    ? {
        opacity: stage === "LIFT_BLACKOUT" ? 0 : 1,
        transition: "opacity 540ms cubic-bezier(.71,0,.38,1)",
        pointerEvents: "all",
        zIndex: 2000,
      }
    : { opacity: 0, pointerEvents: "none" };

  // Show animated intro with car when in intro stages
  const showAnimatedCar = stage === "CAR_ANIM" || stage === "LOGO_FADEIN" || stage === "LIFT_BLACKOUT";

  // After the intro: show logo as fixed item in top nav (not center)
  const showNavbarLogo = stage === "SHOW_MAIN";

  return (
    <div className="tyresense-main" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Persistent logo mark (car + TyreSense name) as navbar logo after intro */}
      {showNavbarLogo && (
        <nav className="navbar" style={{
          position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
          background: "var(--base-dark, #18181f)", borderBottom: "1px solid var(--border-color, #222)",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              height: 70,
              minHeight: 39,
              userSelect: "none",
              width: "100%",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <AnimatedCarIntro asLogo visible={false} />
          </div>
        </nav>
      )}
      {/* Blackout overlay */}
      {showBlackout && (
        <div className="blackout-overlay" style={{
          ...blackoutStyle,
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          width: "100vw",
          height: "100vh",
          background: "#08080B",
          willChange: "opacity",
          pointerEvents: (blackoutStyle.opacity === 0 ? "none" : "all"),
          zIndex: 2000
        }}></div>
      )}
      {/* Animated car intro staged in center of blackout */}
      {showAnimatedCar && (
        <AnimatedCarIntro
          visible
          onAnimationComplete={handleAnimatedCarDone}
        />
      )}
      {/* Main UI shown only once blackout overlay is gone */}
      {stage === "SHOW_MAIN" && (
        <>
          {selectedBrand ? (
            <TyreBrandDetail brand={selectedBrand} onBack={handleBackFromDetail} />
          ) : (
            <>
              <section className="ts-section ts-intro-section" style={{ paddingTop: "96px" }}>
                {/* Logo is now in the navbar instead */}
              </section>
              <main className="ts-main-content">
                <TyreTypesShowcase onBrandSelect={handleBrandSelect} />
                <section className="ts-section ts-map-section">
                  {/* Interactive Google Map showing nearby tyre stores */}
                  <GoogleMapsStoreLocator />
                </section>
                <section className="ts-section ts-reminder-section">
                  <div className="ts-popup-reminder ts-card-placeholder">
                    <span>Tyre replacement reminder popup will appear here.</span>
                  </div>
                </section>
                <div className="ts-section ts-hidden-userdata"></div>
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default TyreSenseMain;
