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
const getPublicUrl = () =>
  (typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : window.PUBLIC_URL || "");

const DEMO_TYRES = [
  {
    id: "p7",
    brand: "Pirelli",
    model: "Cinturato P7",
    type: "Summer",
    size: "225/45R17",
    price: 118,
    url: "https://www.pirelli.com/tyres/en-ww/cintaurato/p7",
    img: getPublicUrl() + "/assets/20250605_071317_Pirelli-Cintaurato-P7.jpg",
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
    img: getPublicUrl() + "/assets/20250605_071317_michelin-tyres.jpg",
    weather: "all",
  },
  {
    id: "contisport",
    brand: "Continental",
    model: "SportContact 6",
    type: "Performance",
    size: "225/40R18",
    price: 127,
    url:
      "https://www.continental-tires.com/uk/en/b2c/car/tires/contisportcontact-6.html",
    img: getPublicUrl() + "/assets/20250605_071316_continental_pp_conti_cityplus.jpg",
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
    img: getPublicUrl() + "/assets/20250605_071315_Bridgestone-Turanza-T005-1.jpg",
    weather: "all",
  },
];

// Get unique options from tyres array
const uniqueFrom = (arr, key) =>
  [...new Set(arr.map((t) => t[key]))].filter(Boolean);

function getWeatherLabel(code = "") {
  const lower = code.toLowerCase();
  if (lower.includes("snow")) return "snow";
  if (lower.includes("rain")) return "rain";
  if (lower.includes("hot") || lower.includes("clear")) return "summer";
  if (lower.includes("cold") || lower.includes("frost")) return "winter";
  if (lower.includes("all")) return "all";
  return "all";
}

// PUBLIC_INTERFACE
function TyreRecommendations({
  car,
  userLocation,
  onSetReminder,
  userTyreData,
  persistTyreData,
}) {
  const [filters, setFilters] = useState({ brand: "", size: "", budget: "" });
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Fetch weather data from OpenWeatherMap API
  useEffect(() => {
    if (!userLocation?.lat || !userLocation?.lng) return;

    setWeatherLoading(true);
    setWeatherError(null);

    const API_KEY =
      process.env.REACT_APP_OWM_KEY ||
      window.REACT_APP_OWM_KEY ||
      "<YOUR_OPENWEATHERMAP_KEY>";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.lat}&lon=${userLocation.lng}&appid=${API_KEY}&units=metric`
    )
      .then((r) => {
        if (!r.ok) throw new Error("Weather API error");
        return r.json();
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
        setWeatherError("Could not load weather data.");
      })
      .finally(() => {
        setWeatherLoading(false);
      });
  }, [userLocation]);

  // Determine weather type label for filtering tyres
  const weatherType = useMemo(() => {
    if (weather?.weather?.length) {
      return getWeatherLabel(weather.weather[0].main);
    }
    return "all";
  }, [weather]);

  // Filter tyres by user-selected filters + weather type
  const filteredTyres = useMemo(() => {
    return DEMO_TYRES.filter((tyre) => {
      if (filters.brand && tyre.brand !== filters.brand) return false;
      if (filters.size && tyre.size !== filters.size) return false;

      if (filters.budget) {
        if (
          filters.budget === "budget" &&
          !(tyre.price <= 110)
        )
          return false;
        if (
          filters.budget === "mid" &&
          !(tyre.price > 110 && tyre.price <= 125)
        )
          return false;
        if (
          filters.budget === "premium" &&
          !(tyre.price > 125)
        )
          return false;
      }

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
    <section className="ts-section ts-tyre-recommend-section" aria-label="Tyre recommendations">
      <header style={{ marginBottom: 16 }}>
        <h2
          style={{
            color: "#b4081b",
            fontWeight: 800,
            letterSpacing: "0.08em",
            margin: 0,
          }}
        >
          Tyre Recommendations
        </h2>
        <p
          className="tyre-showcase-desc"
          style={{ color: "#7d7d85", opacity: 0.8, marginTop: 4, marginBottom: 6 }}
        >
          Personalised for your car, location and weather.
        </p>
        {car && (
          <div
            style={{
              color: "#7d7d85",
              fontWeight: 600,
              fontSize: "1rem",
              marginBottom: 6,
            }}
          >
            {car.year} {car.make} {car.model}
          </div>
        )}
        {weatherLoading && (
          <span style={{ color: "#a9aaae", fontWeight: 600 }}>Loading weather...</span>
        )}
        {weatherError && (
          <span style={{ color: "#e94b35", fontWeight: 600 }}>{weatherError}</span>
        )}
        {weather && !weatherError && (
          <span
            style={{ color: "#b4081b", fontWeight: 600 }}
            aria-live="polite"
            aria-atomic="true"
          >
            Weather: {weather.weather ? weather.weather[0].description : "N/A"}{" "}
            {weather.main ? `(${weather.main.temp}°C)` : ""}
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
      <div
        className="ts-tyre-list"
        role="list"
        aria-label="List of recommended tyres"
        style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}
      >
        {filteredTyres.length === 0 ? (
          <div
            role="alert"
            style={{ color: "#b4081b", fontWeight: 700, padding: 18, width: "100%" }}
          >
            No matching tyres found for your selection.
          </div>
        ) : (
          filteredTyres.map((tyre, idx) => (
            <motion.div
              className="ts-tyre-card"
              key={tyre.id}
              role="listitem"
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
              tabIndex={0}
              aria-label={`${tyre.brand} ${tyre.model} tyre, size ${tyre.size}, priced £${tyre.price}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(tyre.url, "_blank");
                }
              }}
              onClick={() => window.open(tyre.url,
