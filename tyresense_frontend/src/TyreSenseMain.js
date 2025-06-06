import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation, useParams } from "react-router-dom";
import "./TyreSenseMain.css";
import ReminderPopup from "./ReminderPopup";
import CarDetailsInput from "./CarDetailsInput";
import GoogleMapsStoreLocator from "./GoogleMapsStoreLocator";
import TyreTypesShowcase from "./TyreTypesShowcase";
import TyreBrandDetail from "./TyreBrandDetail";
import AnimatedCarIntro from "./AnimatedCarIntro";
import TyreRecommendations from "./TyreRecommendations";
import TyreLogoSVG from "./TyreLogoSVG";

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
    img: (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : window.PUBLIC_URL || ""
    ) + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
    url: "https://www.pirelli.com/tyres/en-ww/cinturato/p7"
  },
  {
    id: "primacy4",
    brand: "Michelin",
    model: "Primacy 4",
    type: "All-Season",
    size: "205/55R16",
    price: 109,
    img: (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : window.PUBLIC_URL || ""
    ) + "/assets/20250605_071317_michelin-tyres.jpg",
    url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-4"
  },
  {
    id: "contisport",
    brand: "Continental",
    model: "SportContact 6",
    type: "Performance",
    size: "225/40R18",
    price: 127,
    img: (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : window.PUBLIC_URL || ""
    ) + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
    url: "https://www.continental-tires.com/uk/en/b2c/car/tires/contisportcontact-6.html"
  },
  {
    id: "turanza",
    brand: "Bridgestone",
    model: "Turanza T005",
    type: "Touring",
    size: "195/65R15",
    price: 103,
    img: (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : window.PUBLIC_URL || ""
    ) + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
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

/** PUBLIC_INTERFACE
 * TyreSenseMain - container for TyreSense app
 * Handles navigation using react-router-dom for client-side routing.
 */

function MainTyreSenseRoutes(props) {
  // Extract main app logic and state here (copied from above).
  const [stage, setStage] = useState("BLACKOUT");
  const [userCar, setUserCar] = useState(loadCarFromLS());
  const [reminderTyre, setReminderTyre] = useState(null);
  const [showReminderPopup, setShowReminderPopup] = useState(false);

  // --- Geolocation for map ---
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

  // -- Tyre replacement popup logic: Show reminder (modal/popup) on "Remind Me",
  // and/or when tyres are due for replacement --
  // If 'lastTyreChange' is >6 years ago, show popup when app loads or car changes

  // Make reminder popup visible
  function handleSetReminderPopup(tyre) {
    setReminderTyre(tyre);
    setShowReminderPopup(true);
  }

  // Check for overdue tyres and auto-trigger popup on mount/car change
  useEffect(() => {
    if (userCar && userCar.lastTyreChange) {
      const lastChangeDate = new Date(userCar.lastTyreChange);
      const today = new Date();
      const diffYears = (today - lastChangeDate) / (1000 * 60 * 60 * 24 * 365.25);
      // Criteria: more than 6 years since tyre change triggers popup (overdue)
      if (diffYears >= 6 && !showReminderPopup) {
        // Note: Use any demo tyre as context; in real app, would track which
        setReminderTyre({
          brand: userCar.make ? "Your Vehicle Tyre" : "Tyre",
          model: userCar.model ? userCar.model : "Model",
        });
        setShowReminderPopup(true);
      }
    }
  }, [userCar]); // Re-run if userCar data changes


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

  // For navigation
  const navigate = useNavigate();
  const location = useLocation();

  // Brand selection navigation
  const handleBrandSelect = (brand) => {
    // Go to /brand/<brand.id> page
    if (brand && brand.id) {
      navigate(`/brand/${brand.id}`);
    }
  };

  // If we are on the main page ("/")
  const isMainPage = location.pathname === "/" || location.pathname === "";

  // Navbar/logo is shown for both main and brand pages
  // Main UI per Porsche visual guidelines
  return (
    <div className="tyresense-main">
      {/* Persistent Porsche-minimal logo as navbar */}
      {showNavbarLogo && (
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
            background: "var(--porsche-black)",
            borderBottom: "1px solid var(--porsche-border-light)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 66,
            padding: 0,
            boxShadow: "0 2px 11px #11111417"
          }}
        >
          {/* TyreSense tyre-themed logo in header/main navbar */}
          <div
            className="ts-animated-car-navbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minWidth: 123,
              maxWidth: 390,
              padding: "0 14px",
              gap: 10
            }}
          >
            {/* Tyre-themed logo inline for branding */}
            {/* Use TyreLogoSVG as tyre-themed logo for header/main navbar */}
            <TyreLogoSVG
              style={{
                width: 36,
                height: 36,
                minWidth: 26,
                marginRight: 12,
                verticalAlign: "middle",
                flex: "0 0 auto",
                filter: "drop-shadow(0 0 11px #b4081b18)"
              }}
            />
            <span
              className="ts-animated-car-title"
              style={{
                fontWeight: 800,
                fontSize: "1.18rem",
                letterSpacing: "0.13em",
                color: "#fff",
                textShadow: "0 0 10px #e1060080, 0 1px 5px #0009",
                filter: "brightness(1.13) blur(.01px)",
                verticalAlign: "middle",
                fontFamily: "'Roboto', Helvetica, Arial, sans-serif",
                marginLeft: 2,
                display: "inline-block",
                background: "none",
                lineHeight: 1.12,
                textTransform: "uppercase"
              }}
            >
              TyreSense
            </span>
          </div>
        </nav>
      )}
      {/* Blackout overlay */}
      {showBlackout && (
        <div
          className="blackout-overlay"
          style={{
            ...blackoutStyle,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            background: "#08080B",
            willChange: "opacity",
            pointerEvents: blackoutStyle.opacity === 0 ? "none" : "all",
            zIndex: 2000,
          }}
        ></div>
      )}
      {/* Animated car intro staged in center */}
      {showAnimatedCar && (
        <AnimatedCarIntro visible onAnimationComplete={handleAnimatedCarDone} />
      )}

      <Routes>
        {/* Main page route */}
        <Route
          path="/"
          element={
            stage === "SHOW_MAIN" && (
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
                    <source
                      src="https://storage.googleapis.com/kavia-public-assets/porsche_tyreloop_trimmed.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="porsche-hero-frost" />
                </div>
                {/* Main overlayed content */}
                <div className="porsche-main-content">
                  <div style={{ maxWidth: 1320, margin: "0 auto", padding: "10px 8vw 28px 8vw" }}>
                    <h1
                      className="porsche-title tyresense-brand-gradient-text"
                      style={{
                        marginTop: 0,
                        background: "linear-gradient(90deg, #D41414 18%, #b4081b 82%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontWeight: 900,
                        textTransform: "uppercase"
                      }}
                    >
                      TyreSense
                    </h1>
                    <div
                      className="porsche-subtitle tyresense-brand-gradient-text"
                      style={{
                        fontWeight: 600,
                        fontSize: "1.14rem",
                        background: "linear-gradient(90deg, #D41414 6%, #b4081b 84%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        marginBottom: 12
                      }}
                    >
                      Premium tyres. Engineered for performance. Select your vehicle and explore leading brands.
                    </div>
                  </div>
                  {/* --- Brand showcase navigation uses router --- */}
                  <TyreTypesShowcase
                    onBrandSelect={handleBrandSelect}
                  />
                  {/* Card/grid section */}
                  <section className="porsche-dual-grid" aria-label="TyreGrid">
                    {/* Main tyre cards */}
                    {MAIN_TYRES.slice(0, 2).map((tyre) => (
                      <div key={tyre.id} className="porsche-tyre-card" tabIndex={0} role="region" aria-label={`Brand: ${tyre.brand}`}>
                        <div className="porsche-tyre-card-img-wrapper">
                          <img src={tyre.img} alt={`${tyre.brand} ${tyre.model} tyre`} className="porsche-tyre-card-image" draggable={false} />
                        </div>
                        <div className="porsche-tyre-card-content">
                          <div className="porsche-tyre-brand">{tyre.brand}</div>
                          <div className="porsche-tyre-details">
                            {tyre.model} • {tyre.type} <br />Size: {tyre.size}
                          </div>
                          <div className="porsche-accent-red">£{tyre.price}</div>
                        </div>
                        <div className="porsche-card-gradient-hover" />
                      </div>
                    ))}
                    {/* 'All tyres' special card - the only primary action */}
                    <div className="porsche-tyre-card porsche-tyre-card-all" tabIndex={0} role="button" aria-label="Show all tyres" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
                      <div className="porsche-tyre-card-all-content">
                        <span className="porsche-tyre-card-all-title">All Tyres</span>
                        <span className="porsche-tyre-card-all-desc">
                          Explore the complete collection. Browse all brands, sizes, and performance profiles.
                        </span>
                        <button className="porsche-tyre-card-btn" style={{ marginTop: 16 }} tabIndex={0} aria-label="View all tyres">View all tyres</button>
                      </div>
                      <div className="porsche-card-gradient-hover" />
                    </div>
                  </section>
                  {/* Remove buy now or other buttons from grid cells below */}
                  <div style={{ margin: "48px 0 0 0" }} />
                  {/* Next grid row: more tyres (no primary action/buttons) */}
                  <section className="porsche-dual-grid" style={{ marginTop: 0 }}>
                    {MAIN_TYRES.slice(2, 4).map((tyre) => (
                      <div key={tyre.id} className="porsche-tyre-card" tabIndex={0} role="region" aria-label={`Brand: ${tyre.brand}`}>
                        <div className="porsche-tyre-card-img-wrapper">
                          <img src={tyre.img} alt={`${tyre.brand} ${tyre.model} tyre`} className="porsche-tyre-card-image" draggable={false} />
                        </div>
                        <div className="porsche-tyre-card-content">
                          <div className="porsche-tyre-brand">{tyre.brand}</div>
                          <div className="porsche-tyre-details">
                            {tyre.model} • {tyre.type} <br />Size: {tyre.size}
                          </div>
                          <div className="porsche-accent-red">£{tyre.price}</div>
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
                    {/* Render the ReminderPopup when a tyre is selected for reminder */}
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
                    {/* Pass the handler for "Remind Me" to TyreRecommendations */}
                    <TyreRecommendations
                      car={userCar}
                      userLocation={userLocation}
                      onSetReminder={handleSetReminderPopup}
                      userTyreData={null}
                      persistTyreData={() => {}}
                    />
                  </section>
                </div>
              </>
            )
          }
        />
        {/* Brand details route */}
        <Route
          path="/brand/:brandId"
          element={
            stage === "SHOW_MAIN" && (
              <BrandDetailRoute
                onBackToList={() => navigate(-1)}
              />
            )
          }
        />
        {/* Fallback - could add 404 here */}
      </Routes>
    </div>
  );
}

 
// Helper: Renders TyreBrandDetail using route param
function BrandDetailRoute({ onBackToList }) {
  // PUBLIC_INTERFACE
  // Proper useParams usage: ensures SPA navigation and back/forward work correctly.
  const { brandId } = useParams();
  const brand = brandId ? { id: brandId } : undefined;
  return (
    <TyreBrandDetail
      brand={brand}
      onBack={onBackToList}
    />
  );
}

/**
 * PUBLIC_INTERFACE
 * TyreSenseMain: Only renders the main app routes and UI, does NOT wrap with <Router>.
 * The SPA <Router> must be provided at the true app root (index.js) for correct in-app navigation/history behavior.
 */
function TyreSenseMain() {
  return <MainTyreSenseRoutes />;
}

export default TyreSenseMain;
