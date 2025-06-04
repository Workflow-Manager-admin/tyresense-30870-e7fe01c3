import React, { useEffect, useState } from "react";
import "./TyreSenseMain.css";
import AnimatedCarIntro from "./AnimatedCarIntro";
import TyreTypesShowcase from "./TyreTypesShowcase";
import TyreBrandDetail from "./TyreBrandDetail";

/**
 * TyreSenseMain - Main container for TyreSense app UI, including animated car intro.
 */
function TyreSenseMain() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Hide the intro after 2.8s (length of the car intro animation is 2.5s)
  useEffect(() => {
    if (showIntro) {
      const tid = setTimeout(() => setShowIntro(false), 2800);
      return () => clearTimeout(tid);
    }
  }, [showIntro]);

  function handleBrandSelect(brand) {
    setSelectedBrand(brand);
    // Optionally, scroll to top or animate page in
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleBackFromDetail() {
    setSelectedBrand(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="tyresense-main" style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatedCarIntro
        visible={showIntro}
        onAnimationComplete={() => setShowIntro(false)}
      />
      {/* Hide the rest of the UI until the intro is finished */}
      {!showIntro && (
        <>
          {selectedBrand ? (
            <TyreBrandDetail brand={selectedBrand} onBack={handleBackFromDetail} />
          ) : (
            <>
              {/* --- Loading/Intro Section (kept for spacing after intro disappears) --- */}
              <section className="ts-section ts-intro-section">
                <div className="ts-animated-tyre">
                  {/* Will implement tyre SVG/CSS/animation here */}
                  <span className="ts-tyre-intro-text">TyreSense</span>
                </div>
              </section>

              <main className="ts-main-content">
                {/* --- Car Details Input Section --- */}
                <section className="ts-section ts-car-input-section">
                  <div className="ts-car-input-form">
                    <div className="ts-car-img-placeholder">
                      <span>Car Image</span>
                    </div>
                    <form>
                      <input className="ts-input" placeholder="Car Make" disabled />
                      <input className="ts-input" placeholder="Car Model" disabled />
                      <input className="ts-input" placeholder="Year" disabled />
                    </form>
                  </div>
                </section>

                {/* --- Tyre Brands Showcase Section --- */}
                <TyreTypesShowcase onBrandSelect={handleBrandSelect} />

                {/* --- Recommendation & Filtering Section --- */}
                <section className="ts-section ts-tyre-recommend-section">
                  <div className="ts-tyre-filters">
                    <button className="ts-btn ts-btn-filter" disabled>Brand</button>
                    <button className="ts-btn ts-btn-filter" disabled>Size</button>
                    <button className="ts-btn ts-btn-filter" disabled>Budget</button>
                  </div>
                  <div className="ts-tyre-list">
                    <div className="ts-tyre-card ts-card-placeholder" />
                    <div className="ts-tyre-card ts-card-placeholder" />
                    <div className="ts-tyre-card ts-card-placeholder" />
                  </div>
                </section>

                {/* --- Map Section --- */}
                <section className="ts-section ts-map-section">
                  <div className="ts-map-placeholder">
                    <span>Map: Nearby Tyre Stores</span>
                  </div>
                </section>

                {/* --- Reminder/Notification Section --- */}
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
