import React, { useEffect, useRef, useState } from "react";
import "./TyreSenseMain.css";
import AnimatedCarIntro from "./AnimatedCarIntro";
import ReminderPopup from "./ReminderPopup";
import CarDetailsInput from "./CarDetailsInput";
import GoogleMapsStoreLocator from "./GoogleMapsStoreLocator";
import TyreTypesShowcase from "./TyreTypesShowcase";
import TyreBrandDetail from "./TyreBrandDetail";
/**
 * Remove all neon styling, use only Porsche.com palette and minimalist structure.
 * Use a dual card/grid main layout with a looping video background hero,
 * prominent 'All tyres' option, and understated Porsche-inspired typography/colors.
 */

// SAMPLE TYRES for demonstration (can be extended)
const MAIN_TYRES = [
  {
    id: "p7",
    brand: "Pirelli",
    model: "Cinturato P7",
    type: "Summer",
    size: "225/45R17",
    price: 118,
    img: process.env.PUBLIC_URL + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
    url: "https://www.pirelli.com/tyres/en-ww/cinturato/p7"
  },
  {
    id: "primacy4",
    brand: "Michelin",
    model: "Primacy 4",
    type: "All-Season",
    size: "205/55R16",
    price: 109,
    img: process.env.PUBLIC_URL + "/assets/20250605_071317_michelin-tyres.jpg",
    url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-4"
  },
  {
    id: "contisport",
    brand: "Continental",
    model: "SportContact 6",
    type: "Performance",
    size: "225/40R18",
    price: 127,
    img: process.env.PUBLIC_URL + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
    url: "https://www.continental-tires.com/uk/en/b2c/car/tires/contisportcontact-6.html"
  },
  {
    id: "turanza",
    brand: "Bridgestone",
    model: "Turanza T005",
    type: "Touring",
    size: "195/65R15",
    price: 103,
    img: process.env.PUBLIC_URL + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
    url: "https://www.bridgestone.co.uk/our-products/car-tyres/turanza-t005"
  }
];

// LocalStorage helpers (unchanged, minimal)
function saveCarToLS(car) {
  window.localStorage.setItem("tyrewiseCar", JSON.stringify(car));
}
function loadCarFromLS() {
  try { return JSON.parse(window.localStorage.getItem("tyrewiseCar") || "null"); }
  catch { return null; }
}

// PUBLIC_INTERFACE
function TyreSenseMain() {
  const [stage, setStage] = useState("BLACKOUT");
  const [userCar, setUserCar] = useState(loadCarFromLS());
  const [reminderTyre, setReminderTyre] = useState(null);
  const [showReminderPopup, setShowReminderPopup] = useState(false);

  // Anim intro
  const logoFadeInTimeout = useRef();
  useEffect(() => { setStage("CAR_ANIM"); }, []);
  const handleAnimatedCarDone = () => {
    setStage("LOGO_FADEIN");
    logoFadeInTimeout.current = setTimeout(() => {
      setStage("LIFT_BLACKOUT");
      setTimeout(() => setStage("SHOW_MAIN"), 540);
    }, 660);
  };
  useEffect(() => () => { if (logoFadeInTimeout.current) clearTimeout(logoFadeInTimeout.current); }, []);

  // Geolocation for map (optional, not shown in main hero)
  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserLocation(null),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);
  function closeReminderPopup() {
    setShowReminderPopup(false);
    setTimeout(() => setReminderTyre(null), 300);
  }

  // --- Blackout overlay states as before ---
  const showBlackout = stage !== "SHOW_MAIN";
  const blackoutStyle = showBlackout
    ? { opacity: stage === "LIFT_BLACKOUT" ? 0 : 1, transition: "opacity 540ms cubic-bezier(.71,0,.38,1)", pointerEvents: "all", zIndex: 2000 }
    : { opacity: 0, pointerEvents: "none" };
  const showAnimatedCar = stage === "CAR_ANIM" || stage === "LOGO_FADEIN" || stage === "LIFT_BLACKOUT";
  const showNavbarLogo = stage === "SHOW_MAIN";

  // Render the Porsche-style hero, grid/cards, and main structure
  return (
    <div className="tyresense-main">
      {/* Persistent Porsche-minimal logo as navbar */}
      {showNavbarLogo && (
        <nav style={{
          position: "fixed",
          top: 0, left: 0, width: "100%",
          zIndex: 100,
          background: "var(--porsche-black)",
          borderBottom: "1px solid var(--porsche-border-light)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 66
        }}>
          <AnimatedCarIntro asLogo />
        </nav>
      )}

      {/* Blackout overlay */}
      {showBlackout && (<div className="blackout-overlay" style={{
        ...blackoutStyle,
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "#08080B",
        willChange: "opacity",
        pointerEvents: (blackoutStyle.opacity === 0 ? "none" : "all"),
        zIndex: 2000
      }}></div>)}

      {/* Animated car intro staged in center */}
      {showAnimatedCar && (<AnimatedCarIntro visible onAnimationComplete={handleAnimatedCarDone} />)}

      {/* Main UI per Porsche visual guidelines */}
      {stage === "SHOW_MAIN" && (
        <>
          {/* Porsche.com-style looping hero video */}
          <div className="porsche-hero-bg-video-container">
            <video
              className="porsche-hero-bg-video"
              autoPlay
              muted
              loop
              playsInline
              poster={process.env.PUBLIC_URL + "/assets/porsche_hero_fallback.jpg"}
            >
              <source src="https://storage.googleapis.com/kavia-public-assets/porsche_tyreloop_trimmed.mp4" type="video/mp4" />
              {/* If video fails, show fallback img */}
            </video>
            <div className="porsche-hero-frost" />
          </div>
          {/* Main overlayed content */}
          <div className="porsche-main-content">
            <div style={{ maxWidth: 1320, margin: "0 auto", padding: "10px 8vw 28px 8vw" }}>
              <h1 className="porsche-title" style={{ marginTop: 0 }}>TyreSense</h1>
              <div className="porsche-subtitle">
                Premium tyres. Engineered for performance. Select your vehicle and explore leading brands.
              </div>
            </div>
            {/* Card/grid section */}
            <section className="porsche-dual-grid" aria-label="TyreGrid">
              {/* Main tyre cards */}
              {MAIN_TYRES.slice(0, 2).map((tyre) => (
                <div key={tyre.id} className="porsche-tyre-card" tabIndex={0} role="button" onClick={() => window.open(tyre.url, "_blank")} aria-label={`View details about ${tyre.brand} ${tyre.model}`}>
                  <div className="porsche-tyre-card-img-wrapper">
                    <img src={tyre.img} alt={`${tyre.brand} ${tyre.model} tyre`} className="porsche-tyre-card-image" draggable={false} />
                  </div>
                  <div className="porsche-tyre-card-content">
                    <div className="porsche-tyre-brand">{tyre.brand}</div>
                    <div className="porsche-tyre-details">
                      {tyre.model} • {tyre.type} <br />Size: {tyre.size}
                    </div>
                    <div className="porsche-accent-red">£{tyre.price}</div>
                    <button className="porsche-tyre-card-btn" tabIndex={0} aria-label={`Buy ${tyre.brand} ${tyre.model}`} onClick={e => { e.stopPropagation(); window.open(tyre.url, "_blank"); }}>Buy Now</button>
                  </div>
                  <div className="porsche-card-gradient-hover" />
                </div>
              ))}
              {/* 'All tyres' special card */}
              <div className="porsche-tyre-card porsche-tyre-card-all" tabIndex={0} role="button" aria-label="Show all tyres" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                <div className="porsche-tyre-card-all-content">
                  <span className="porsche-tyre-card-all-title">All Tyres</span>
                  <span className="porsche-tyre-card-all-desc">
                    Explore the complete collection. Browse all brands, sizes, and performance profiles.
                  </span>
                  <button className="porsche-tyre-card-btn" style={{ marginTop: 16 }} tabIndex={0} aria-label="View all tyres">View Full Range</button>
                </div>
                <div className="porsche-card-gradient-hover" />
              </div>
            </section>
            <div style={{ margin: "48px 0 0 0" }} />
            {/* Next grid row: more tyres */}
            <section className="porsche-dual-grid" style={{ marginTop: 0 }}>
              {MAIN_TYRES.slice(2, 4).map((tyre) => (
                <div key={tyre.id} className="porsche-tyre-card" tabIndex={0} role="button" onClick={() => window.open(tyre.url, "_blank")} aria-label={`View details about ${tyre.brand} ${tyre.model}`}>
                  <div className="porsche-tyre-card-img-wrapper">
                    <img src={tyre.img} alt={`${tyre.brand} ${tyre.model} tyre`} className="porsche-tyre-card-image" draggable={false} />
                  </div>
                  <div className="porsche-tyre-card-content">
                    <div className="porsche-tyre-brand">{tyre.brand}</div>
                    <div className="porsche-tyre-details">
                      {tyre.model} • {tyre.type} <br />Size: {tyre.size}
                    </div>
                    <div className="porsche-accent-red">£{tyre.price}</div>
                    <button className="porsche-tyre-card-btn" tabIndex={0} aria-label={`Buy ${tyre.brand} ${tyre.model}`} onClick={e => { e.stopPropagation(); window.open(tyre.url, "_blank"); }}>Buy Now</button>
                  </div>
                  <div className="porsche-card-gradient-hover" />
                </div>
              ))}
              {/* The fourth grid cell: empty for balancing if odd number */}
              <div />
            </section>
            {/* Filters & user info could go here; main input form below */}
            <div style={{ margin: "58px 0 0 0" }} />
            <section style={{ maxWidth: 930, margin: "0 auto", padding: "24px 0" }}>
              <CarDetailsInput onSubmit={car => { setUserCar(car); saveCarToLS(car); }} initialCar={userCar} persistCar={saveCarToLS} />
            </section>
            {/* Map section */}
            <section style={{ maxWidth: 900, margin: "0 auto", padding: "26px 13px 0 13px" }}>
              <GoogleMapsStoreLocator />
            </section>
            {/* Porsche-style popover for reminder */}
            <section style={{ maxWidth: 900, margin: "30px auto 0 auto", minHeight: 64 }}>
              {showReminderPopup && reminderTyre ? (
                <ReminderPopup
                  tyre={reminderTyre}
                  userEmail={userCar?.email || ""}
                  onClose={closeReminderPopup}
                />
              ) : (
                <div style={{
                  minWidth: 260, minHeight: 43, background: "rgba(34,34,37,0.97)", color: "#fff",
                  borderRadius: 11, border: "1.2px solid #252526", padding: "17px 13px", textAlign: "center",
                  fontSize: "1.05rem", fontWeight: 500, boxShadow: "0 2px 9px #222", opacity: 0.87, marginTop: 8
                }}>
                  <span>Tyre replacement reminder will appear here.</span>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export default TyreSenseMain;
