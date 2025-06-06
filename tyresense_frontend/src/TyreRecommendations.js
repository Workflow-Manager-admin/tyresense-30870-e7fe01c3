import React, { useEffect, useMemo, useState } from "react";
import RecommendationFilter from "./RecommendationFilter";
import { motion } from "framer-motion";

/**
 * TyreRecommendations:
 * - Fetches recommendations based on car details, location, weather, filters.
 * - Integrates OpenWeatherMap for weather context.
 * - Allows filtering by brand, size, budget.
 * - Shows animated, scroll-animated tyres for each recommended item.
 * - Provides "Buy Now" button and reminder interaction.
 */
const DEMO_TYRES = [
  {
    id: "p7",
    brand: "Pirelli",
    model: "Cinturato P7",
    type: "Summer",
    size: "225/45R17",
    price: 118,
    url: "https://www.pirelli.com/tyres/en-ww/cinturato/p7",
    img: (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : window.PUBLIC_URL || ""
    ) + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
    weather: "summer",
  },
  {
    id: "primacy4",
    brand: "Michelin",
    model: "Primacy 4",
    type: "All-Season",
    size: "205/55R16",
    price: 109,
    url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-4",
    img: process.env.PUBLIC_URL + "/assets/20250605_071317_michelin-tyres.jpg",
    weather: "all",
  },
  {
    id: "contisport",
    brand: "Continental",
    model: "SportContact 6",
    type: "Performance",
    size: "225/40R18",
    price: 127,
    url: "https://www.continental-tires.com/uk/en/b2c/car/tires/contisportcontact-6.html",
    img: process.env.PUBLIC_URL + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
    weather: "summer",
  },
  {
    id: "turanza",
    brand: "Bridgestone",
    model: "Turanza T005",
    type: "Touring",
    size: "195/65R15",
    price: 103,
    url: "https://www.bridgestone.co.uk/our-products/car-tyres/turanza-t005",
    img: process.env.PUBLIC_URL + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
    weather: "all",
  },
];

// Get unique options from tyres array
const uniqueFrom = (arr, key) => [...new Set(arr.map((t) => t[key]))].filter(Boolean);

function getWeatherLabel(code = "") {
  if (code.indexOf("snow") >= 0) return "snow";
  if (code.indexOf("rain") >= 0) return "rain";
  if (code.indexOf("hot") >= 0 || code.indexOf("clear") >= 0) return "summer";
  if (code.indexOf("cold") >= 0 || code.indexOf("frost") >= 0) return "winter";
  if (code.indexOf("all") >= 0) return "all";
  return "all";
}

// PUBLIC_INTERFACE
function TyreRecommendations({ car, userLocation, onSetReminder, userTyreData, persistTyreData }) {
  const [filters, setFilters] = useState({ brand: "", size: "", budget: "" });
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Simulate fetch from OpenWeather, then filter demo tyres by weather context + user filters
  useEffect(() => {
    if (!userLocation || !userLocation.lat) return;
    setWeatherLoading(true);

    const API_KEY =
      (typeof process !== "undefined" && process.env && process.env.REACT_APP_OWM_KEY)
        ? process.env.REACT_APP_OWM_KEY
        : window.REACT_APP_OWM_KEY
        || "<YOUR_OPENWEATHERMAP_KEY>";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=${API_KEY}&units=metric`
    )
      .then((r) => r.json())
      .then((data) => {
        setWeather(data);
        setWeatherLoading(false);
      })
      .catch(() => setWeatherLoading(false));
  }, [userLocation]);

  // Demo: recommend by weather
  const weatherType = useMemo(
    () =>
      weather && weather.weather && weather.weather.length
        ? getWeatherLabel(weather.weather[0].main.toLowerCase())
        : "all",
    [weather]
  );

  // Demo: filter tyres by brand, size, budget
  const filteredTyres = useMemo(() => {
    return DEMO_TYRES.filter((tyre) => {
      // Brand filter
      if (filters.brand && tyre.brand !== filters.brand) return false;
      if (filters.size && tyre.size !== filters.size) return false;
      if (
        filters.budget &&
        !(
          (filters.budget === "budget" && tyre.price <= 110) ||
          (filters.budget === "mid" && tyre.price > 110 && tyre.price <= 125) ||
          (filters.budget === "premium" && tyre.price > 125)
        )
      )
        return false;
      if (
        weatherType !== "all" &&
        tyre.weather !== "all" &&
        tyre.weather !== weatherType
      )
        return false;
      return true;
    });
  }, [filters, weatherType]);

  const brandOptions = uniqueFrom(DEMO_TYRES, "brand");
  const sizeOptions = uniqueFrom(DEMO_TYRES, "size");
  const budgetOptions = [
    { val: "budget", label: "Budget (<£110)" },
    { val: "mid", label: "Mid (£111–125)" },
    { val: "premium", label: "Premium (>£125)" },
  ];

  return (
    <section className="ts-section ts-tyre-recommend-section">
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ color: "#b4081b", fontWeight: 800, letterSpacing: "0.08em" }}>
          Tyre Recommendations
        </h2>
        <p className="tyre-showcase-desc" style={{ color: "#7d7d85", opacity: 0.8 }}>
          Personalised for your car, location and weather.
        </p>
        {car && (
          <div style={{ color: "#7d7d85", fontWeight: 600 }}>
            {car.year} {car.make} {car.model}
          </div>
        )}
        {weatherLoading && (
          <span style={{ color: "#a9aaae", fontWeight: 600 }}>Loading weather...</span>
        )}
        {weather && (
          <span style={{ color: "#b4081b", fontWeight: 600 }}>
            Weather: {weather.weather ? weather.weather[0].description : "N/A"} ({weather.main ? weather.main.temp + "°C" : ""})
          </span>
        )}
      </header>
      <RecommendationFilter
        filters={filters}
        onFiltersChange={setFilters}
        brandOptions={brandOptions}
        sizeOptions={sizeOptions}
        budgetOptions={budgetOptions.map((b) => b.val)}
      />
      <div className="ts-tyre-list">
        {filteredTyres.length === 0 ? (
          <div style={{ color: "#b4081b", fontWeight: 700, padding: 18 }}>
            No matching tyres found for your selection.
          </div>
        ) : (
          filteredTyres.map((tyre, idx) => (
            <motion.div
              className="ts-tyre-card"
              key={tyre.id}
              style={{
                background: "#232327",
                borderRadius: "13px",
                boxShadow: "0 5px 15px #18181b33",
                cursor: "pointer",
                padding: "8px",
                minWidth: 102,
                minHeight: 100,
                alignItems: "center",
                justifyContent: "center",
                flex: "0 0 132px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
              whileHover={{ scale: 1.11, rotate: -2 }}
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.27 + idx * 0.1 }}
            >
              <motion.img
                src={tyre.img}
                alt={`${tyre.brand} ${tyre.model} tyre`}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #b4081b55",
                  marginBottom: 4,
                  objectFit: "cover",
                  filter: "brightness(1.09)",
                  background: "#18181b",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                draggable={false}
                animate={{
                  rotate: [0, 720],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 9 + idx * 1,
                  ease: "linear",
                }}
              />
              <div style={{ color: "#b4081b", fontWeight: 700, fontSize: "1.03rem" }}>
                {tyre.brand}
              </div>
              <div style={{ color: "#edeef0", fontWeight: 600, fontSize: "0.98rem" }}>
                {tyre.model}
              </div>
              <div style={{ color: "#7d7d85", fontSize: "0.91rem" }}>{tyre.size}</div>
              <div style={{ color: "#edeef0", marginBottom: 3 }}>{tyre.type}</div>
              <div style={{ color: "#b4081b", fontWeight: 800 }}>
                £{tyre.price}
              </div>
              <button
                className="ts-btn"
                style={{
                  marginTop: 7,
                  fontSize: "0.97rem",
                  borderRadius: 7,
                  border: "1.3px solid #b4081b",
                  background: "#b4081b",
                  color: "#fff",
                  fontWeight: 800,
                  padding: "6px 17px",
                  boxShadow: "none",
                  cursor: "pointer",
                  transition: "background 0.14s, color 0.13s, border 0.13s"
                }}
                onClick={() => window.open(tyre.url, "_blank")}
              >
                Buy Now
              </button>
              <button
                className="ts-btn"
                style={{
                  background: "#232327",
                  border: "1.2px solid #7d7d85",
                  color: "#7d7d85",
                  marginTop: 3,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  borderRadius: 6,
                  boxShadow: "none",
                  cursor: "pointer"
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onSetReminder) onSetReminder(tyre);
                }}
              >
                Remind Me
              </button>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}

export default TyreRecommendations;
