import React, { useState, useEffect } from "react";
import "./CarDetailsInput.css";

// --- Demo car image data ---
const carImages = {
  Toyota: {
    Corolla: "https://cdn.motor1.com/images/mgl/0AN2x/s1/toyota-corolla.webp",
    Camry: "https://cdn.motor1.com/images/mgl/68Zrp/s1/2022-toyota-camry.webp",
    RAV4: "https://cdn.motor1.com/images/mgl/G47vJ/s1/2023-toyota-rav4.webp",
  },
  Honda: {
    Civic: "https://cdn.motor1.com/images/mgl/kEdYL/s1/2022-honda-civic.webp",
    Accord: "https://cdn.motor1.com/images/mgl/4elwL/s1/2023-honda-accord.webp",
    CRV: "https://cdn.motor1.com/images/mgl/NYm2A/s1/2023-honda-cr-v.webp",
  },
  Ford: {
    Focus: "https://cdn.motor1.com/images/mgl/QPzvK/s1/ford-focus.webp",
    Mustang: "https://cdn.motor1.com/images/mgl/vbWvA/s1/ford-mustang.webp",
    Explorer: "https://cdn.motor1.com/images/mgl/91lKM/s1/ford-explorer.webp",
  },
};

const carBrands = Object.keys(carImages);
const getModelsForBrand = (brand) => (brand ? Object.keys(carImages[brand] || {}) : []);

const fallbackCarSVG = (
  <svg
    aria-label="Default car silhouette"
    role="img"
    width="92"
    height="56"
    viewBox="0 0 92 56"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: "100%", height: "auto" }}
  >
    <g>
      <ellipse cx="23" cy="48" rx="10" ry="6" fill="#b4081b" />
      <ellipse cx="67" cy="48" rx="10" ry="6" fill="#b4081b" />
      <rect x="11" y="27" width="70" height="15" rx="7" fill="#232327" />
      <rect x="23" y="20" width="46" height="15" rx="7" fill="#292933" />
      <rect x="44" y="23" width="8" height="8" rx="3" fill="#b4081b" opacity={0.17} />
      <rect x="19" y="37" width="10" height="2" rx="1" fill="#7d7d85" />
      <rect x="63" y="37" width="10" height="2" rx="1" fill="#7d7d85" />
    </g>
  </svg>
);

// PUBLIC_INTERFACE
/**
 * CarDetailsInput: Upscale Porsche/Apple-inspired form for car details.
 * - Modern dark form box split in two (input fields left, car image preview right)
 * - All fields grouped cleanly, with bold neon-accented styling and error highlighting
 * - Responsive: vertical stack on small screens
 */
export default function CarDetailsInput({
  onSubmit,
  initialCar = {},
  persistCar,
  car = {},
}) {
  const safeCar =
    car && typeof car === "object" && !Array.isArray(car) ? car : {};
  const effectiveCar = Object.keys(initialCar || {}).length
    ? initialCar
    : safeCar;

  const [manufacturer, setManufacturer] = useState(effectiveCar.make || "");
  const [model, setModel] = useState(effectiveCar.model || "");
  const [year, setYear] = useState(effectiveCar.year || "");
  const [lastTyreChange, setLastTyreChange] = useState(
    effectiveCar.lastTyreChange ||
      (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 4);
        return d.toISOString().slice(0, 10);
      })()
  );
  const [carImg, setCarImg] = useState(effectiveCar.carImg || null);
  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setModel("");
    setCarImg(null);
    setErrors((e) => ({ ...e, manufacturer: null, model: null }));
  }, [manufacturer]);

  useEffect(() => {
    setErrors((e) => ({ ...e, year: null }));

    if (manufacturer && model && year) {
      const imgUrl = carImages[manufacturer]?.[model] || null;
      setCarImg(imgUrl);
    } else {
      setCarImg(null);
    }
  }, [manufacturer, model, year]);

  if (!car || typeof car !== "object" || Array.isArray(car)) return null;

  // Modern validation logic with custom feedback
  const validate = () => {
    const errs = {};
    if (!manufacturer) errs.manufacturer = "Please choose a manufacturer.";
    if (!model) errs.model = "Please select a model.";
    if (!year) errs.year = "Please select a year.";
    else if (year < 1980 || year > currentYear)
      errs.year = `Year must be between 1980 and ${currentYear}.`;

    if (!lastTyreChange) errs.lastTyreChange = "Enter last tyre change date.";
    else {
      const d = new Date(lastTyreChange);
      const maxDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 20);
      if (d > maxDate || d < minDate)
        errs.lastTyreChange = `Date must be between ${minDate
          .toISOString()
          .slice(0, 10)} and ${maxDate.toISOString().slice(0, 10)}`;
    }
    setErrors(errs);
    return Object.keys(errs || {}).length === 0;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const carDetails = {
      make: manufacturer,
      model,
      year,
      lastTyreChange,
      carImg,
    };
    if (persistCar) persistCar(carDetails);
    if (onSubmit) onSubmit(carDetails);
  };

  // --- Porsche/Apple minimal instruction block ---
  const SubLabel = ({ children }) => (
    <span className="ts-label-sub">{children}</span>
  );
  const LabelInstruction = ({ children }) => (
    <span className="ts-label-instruction">{children}</span>
  );
  const ErrorNote = ({ error }) =>
    error ? (
      <span role="alert" className="ts-label-note" style={{ color: "#fb1744" }}>
        {error}
      </span>
    ) : null;

  // ----
  return (
    <form
      className="ts-car-input-form ts-premium"
      autoComplete="off"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Enter your car details"
      data-testid="car-details-form"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "3vw 2vw",
        alignItems: "stretch",
      }}
    >
      <div style={{ flex: "1 1 380px", minWidth: 220 }}>
        {/* Porsche minimal instruction/title */}
        <div className="ts-car-input-instruction" tabIndex={-1}>
          <span className="ts-car-input-instruction-title">
            Your Car Details
          </span>
          <span className="ts-car-input-instruction-desc">
            For personalized tyre recommendations and better results, please enter your car details accurately!
          </span>
        </div>
        <div
          className="ts-car-form-fields-container"
          style={{ display: "flex", flexWrap: "wrap", gap: "18px 0", alignItems: "flex-start" }}
        >
          {/* Manufacturer */}
          <fieldset className="ts-car-form-group" style={{ marginTop: 0, minWidth: 0 }}>
            <label htmlFor="manufacturer-select">
              Make / Manufacturer
              <SubLabel>required</SubLabel>
            </label>
            <select
              id="manufacturer-select"
              name="manufacturer"
              className={`ts-input${errors.manufacturer ? " ts-input-error" : ""}`}
              aria-describedby="manufacturer-error"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              required
              aria-invalid={!!errors.manufacturer}
            >
              <option value="">Choose brand (e.g., Toyota)</option>
              {carBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            <ErrorNote error={errors.manufacturer} />
          </fieldset>
          {/* Model */}
          <fieldset className="ts-car-form-group">
            <label htmlFor="model-select">
              Model
              <SubLabel>required</SubLabel>
            </label>
            <select
              id="model-select"
              className={`ts-input${errors.model ? " ts-input-error" : ""}`}
              value={model}
              name="model"
              onChange={(e) => setModel(e.target.value)}
              required
              disabled={!manufacturer}
              aria-describedby="model-error"
              aria-invalid={!!errors.model}
            >
              <option value="">
                {manufacturer ? "Choose model" : "Select make first"}
              </option>
              {getModelsForBrand(manufacturer).map((modelName) => (
                <option key={modelName} value={modelName}>
                  {modelName}
                </option>
              ))}
            </select>
            <ErrorNote error={errors.model} />
          </fieldset>
          {/* Year */}
          <fieldset className="ts-car-form-group">
            <label htmlFor="year-select">
              Year
              <SubLabel>required</SubLabel>
            </label>
            <select
              id="year-select"
              className={`ts-input${errors.year ? " ts-input-error" : ""}`}
              value={year}
              name="year"
              required
              onChange={(e) => setYear(e.target.value)}
              aria-describedby="year-error"
              aria-invalid={!!errors.year}
            >
              <option value="">Select year</option>
              {Array.from({ length: currentYear - 1979 }, (_, i) =>
                currentYear - i
              ).map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
            <ErrorNote error={errors.year} />
          </fieldset>
          {/* Last Tyre Change */}
          <fieldset className="ts-car-form-group">
            <label htmlFor="last-tyre-change">
              Last Tyre Change <SubLabel>required</SubLabel>
            </label>
            <input
              id="last-tyre-change"
              name="lastTyreChange"
              className={`ts-input${errors.lastTyreChange ? " ts-input-error" : ""}`}
              type="date"
              min={new Date(new Date().setFullYear(new Date().getFullYear() - 20))
                .toISOString()
                .slice(0, 10)}
              max={new Date().toISOString().slice(0, 10)}
              aria-describedby="tyre-change-error tyre-change-hint"
              value={lastTyreChange}
              onChange={(e) => setLastTyreChange(e.target.value)}
              required
              aria-invalid={!!errors.lastTyreChange}
              placeholder="YYYY-MM-DD"
              style={{ fontSize: "1.07rem", fontWeight: 600 }}
            />
            <LabelInstruction>Date within last 20 years.</LabelInstruction>
            <ErrorNote error={errors.lastTyreChange} />
          </fieldset>
        </div>
        {/* Submit Button */}
        <div className="ts-car-form-submit modern-form-submit" style={{ marginTop: 36 }}>
          <button
            type="submit"
            className="btn"
            aria-label="Submit car details"
            style={{
              background: "linear-gradient(92deg, #b4081b 37%, #7d7d85 96%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.13rem",
              letterSpacing: "0.045em",
              border: "none",
              borderRadius: 18,
              padding: "15px 48px",
              boxShadow: "0 4px 15px #b4081b50",
              outline: "none",
              minWidth: 128,
              minHeight: 48,
              cursor: "pointer",
              transition: "background 0.13s, color 0.14s"
            }}
          >
            Save Car Details
          </button>
        </div>
      </div>
      {/* Car Image Preview */}
      <div className="ts-car-img-preview">
        <div className="ts-car-img-preview-box modern-img-preview-box" tabIndex={-1}>
          {carImg ? (
            <img
              src={carImg}
              alt={`${manufacturer} ${model} ${year}`}
              style={{
                width: 133,
                height: 81,
                objectFit: "cover",
                borderRadius: 10,
                filter: "brightness(1.09)",
                background: "#19181b",
                userSelect: "none",
                pointerEvents: "none"
              }}
              draggable={false}
              onError={() => setCarImg(null)}
            />
          ) : (
            fallbackCarSVG
          )}
        </div>
        <span className="ts-car-img-preview-label modern-preview-label">
          {carImg
            ? `${manufacturer} ${model} ${year}`.trim()
            : "Car preview"}
        </span>
      </div>
    </form>
  );
}
