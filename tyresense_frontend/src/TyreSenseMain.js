import React, { useEffect, useRef, useState } from "react";
// Only import APIs present in react-router-dom v6
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
            height: 74,
            padding: 0,
            boxShadow: "0 2px 11px #11111417"
          }}
        >
          {/* Updated: Prominent tyre-themed SVG logo in header */}
          <div
            className="ts-animated-car-navbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              minWidth: 155,
              maxWidth: 340,
              padding: "0 18px",
              gap: 10
            }}
          >
            <TyreLogoSVG
              style={{
                width: 54,
                height: 54,
                minWidth: 36,
                marginRight: 13,
                verticalAlign: "middle",
                flex: "0 0 auto",
                filter: "drop-shadow(0 0 13px #b4081b21)"
              }}
            />
            <span
              className="ts-animated-car-title"
              style={{
                fontWeight: 900,
                fontSize: "1.25rem",
                letterSpacing: "0.17em",
                color: "#fff",
                textShadow: "0 0 13px #e1060078, 0 0.5px 8px #23232733",
                filter: "brightness(1.13) blur(.01px)",
                verticalAlign: "middle",
                fontFamily: "'Roboto', Helvetica, Arial, sans-serif",
                marginLeft: 1,
                display: "inline-block",
                background: "none",
                lineHeight: 1.1,
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
                    poster={"/assets/porsche_hero_fallback.jpg"}
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
                  {/* --- Porsche-style clickable 4-tile brand grid (responsive, modern) --- */}
                  <section
                    aria-label="Premium tyre brands Porsche-style grid"
                    style={{
                      maxWidth: 1080,
                      margin: "0 auto",
                      padding: "28px 8vw 38px 8vw",
                      width: "100%",
                      background: "linear-gradient(129deg, #232327 12%, #18181b 94%)",
                      borderRadius: 24,
                      boxShadow: "0 7px 27px 3px #18181c2a",
                      minHeight: 360
                    }}
                  >
                    <header style={{ marginBottom: 38, textAlign: "left" }}>
                      <h2 style={{
                        margin: 0,
                        color: "#b4081b",
                        fontSize: "2.19rem",
                        fontWeight: 800,
                        letterSpacing: ".025em",
                        fontFamily: "'Roboto', Helvetica, Arial, sans-serif"
                      }}>
                        Explore Tyre Brands
                      </h2>
                      <div style={{ color: "#c4d8ff", fontSize: "1.13rem", opacity: 0.83, fontWeight: 500 }}>Premium, trusted choices for every journey.</div>
                    </header>
                    {/* Responsive Porsche-grid: 2 column on desktop, 1 column on mobile */}
                    <div
                      className="porsche-dual-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "44px 36px",
                        maxWidth: 1040,
                        width: "100%",
                        margin: "0 auto"
                      }}
                    >
                      {[
                        {
                          id: "pirelli",
                          name: "Pirelli",
                          tagline: "Performance meets Innovation",
                          image: `${process.env.PUBLIC_URL || ""}/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg`
                        },
                        {
                          id: "michelin",
                          name: "Michelin",
                          tagline: "Motion for Life",
                          image: `${process.env.PUBLIC_URL || ""}/assets/20250605_071317_michelin-tyres.jpg`
                        },
                        {
                          id: "continental",
                          name: "Continental",
                          tagline: "The Future in Motion",
                          image: `${process.env.PUBLIC_URL || ""}/assets/20250605_071316_continental_pp_conti_cityplus.jpg`
                        },
                        {
                          id: "bridgestone",
                          name: "Bridgestone",
                          tagline: "Solutions for your journey",
                          image: `${process.env.PUBLIC_URL || ""}/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg`
                        }
                      ].map((brand) => (
                        <button
                          key={brand.id}
                          className="porsche-tyre-card"
                          aria-label={`View details for ${brand.name}`}
                          tabIndex={0}
                          style={{
                            background: "#232327",
                            border: "1.7px solid #2f2f33",
                            borderRadius: 18,
                            boxShadow: "0 6px 23px 2.5px #18181c22",
                            minHeight: 235,
                            minWidth: 210,
                            maxWidth: 620,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-end",
                            outline: "none",
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            transition: "box-shadow 0.16s, border 0.14s, background 0.12s, transform 0.22s"
                          }}
                          onClick={() => handleBrandSelect({ id: brand.id, name: brand.name })}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") handleBrandSelect({ id: brand.id, name: brand.name });
                          }}
                          type="button"
                        >
                          {/* Tyre image */}
                          <div
                            className="porsche-tyre-card-img-wrapper"
                            aria-hidden="true"
                            style={{
                              width: "100%",
                              paddingTop: "60%",
                              background: "#18181b",
                              borderBottom: "1.5px solid #cfd2d6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden"
                            }}
                          >
                            <img
                              src={brand.image}
                              alt={`${brand.name} tyre example photo`}
                              className="porsche-tyre-card-image"
                              style={{
                                width: "98%",
                                height: "98%",
                                maxWidth: 246,
                                objectFit: "cover",
                                borderRadius: 16,
                                margin: "0 auto",
                                background: "#18181b"
                              }}
                              loading="lazy"
                              draggable={false}
                            />
                            {/* Subtle gradient overlay for contrast */}
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "inherit",
                                background: "linear-gradient(145deg, #18181fda 22%, #232327cc 64%, #0c0c0e99 98%)",
                                pointerEvents: "none",
                                zIndex: 3
                              }}
                              className="porsche-card-gradient-hover"
                            />
                          </div>
                          {/* Card content/info */}
                          <div
                            className="porsche-tyre-card-content"
                            style={{
                              padding: "30px 27px 24px 27px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              gap: 12,
                              background: "none"
                            }}
                          >
                            <div className="porsche-tyre-brand" style={{
                              fontSize: "1.43rem", fontWeight: 700, letterSpacing: ".12em", color: "#fff"
                            }}>
                              {brand.name}
                            </div>
                            <div className="porsche-tyre-details" style={{ color: "#c4d8ff", fontSize: "1.11rem", fontWeight: 500 }}>
                              {brand.tagline}
                            </div>
                            <span style={{
                              marginTop: 10,
                              display: "flex",
                              alignItems: "center",
                              fontWeight: 590,
                              fontSize: "1.02rem",
                              color: "#b4081b"
                            }}>
                              Discover →
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                  {/* --- End modern Porsche-style grid --- */}
                  {/* Spacing for visual balance */}
                  <div style={{ margin: "58px 0 0 0" }} />
                  <section style={{ maxWidth: 930, margin: "0 auto", padding: "24px 0" }}>
                    <CarDetailsInput
                      onSubmit={car => { setUserCar(car); saveCarToLS(car); }}
                      initialCar={userCar}
                      persistCar={saveCarToLS}
                    />
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
