import React, { useState, useEffect } from "react";
import "./CarDetailsInput.css";

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

const getModelsForBrand = (brand) => {
  if (!brand) return [];
  return Object.keys(carImages[brand] || {});
};

const fallbackCarSVG = (
  <svg
    aria-label="Default car silhouette"
    role="img"
    width="280"
    height="180"
    viewBox="0 0 280 180"
    xmlns="http://www.w3.org/2000/svg"
    style={{ maxWidth: "100%", height: "auto" }}
  >
    <path
      d="M11.375 94.39h7.5L35 74l5 10 5 5v6.5l-2 5-3 2-3.5 1-8.5 1-6.5-5-2-5-2-4zM42 80l3-5h20l5 5v7l-5 5-7 3h-13l-5-3v-12zM66 100v7l-1 5-2 5-4 3-3 2-5 2-5-1-3-2-2-3-1-4v-6l2-4 3-3 5-1h14l3 2zM170 94l7-10 8-3h30l5 6 2 9-2 9-5 3-6 3-5-2-6-6-4-5-10-5zM188 89v-6l-3-4-3-2-3 1-3 4v5l2 4 2 2 4 3 4-2 1-5zM188 100l-5 4-7 5-5 3-7-1-5-5-2-6v-6l2-4 4-3 7-1 9 3 5 5 1 7z"
      fill="#b4081b"
    />
    <circle cx="45" cy="150" r="15" fill="#b4081b" />
    <circle cx="90" cy="150" r="15" fill="#b4081b" />
  </svg>
);

export default function CarDetailsInput({ onSubmit, initialCar = {}, persistCar, car = {} }) {
  // Support both legacy "initialCar" and new "car" prop for flexibility, with default fallbacks.
  const safeCar = car && typeof car === "object" ? car : {};
  const effectiveCar = Object.keys(initialCar).length ? initialCar : safeCar;
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

  // Update model options when manufacturer changes, reset model & image
  useEffect(() => {
    setModel("");
    setCarImg(null);
    setErrors((e) => ({ ...e, manufacturer: null, model: null }));
  }, [manufacturer]);

  // Update car image whenever manufacturer/model/year changes
  useEffect(() => {
    setErrors((e) => ({ ...e, year: null }));

    if (manufacturer && model && year) {
      // Use your existing images
      const imgUrl = carImages[manufacturer]?.[model] || null;
      setCarImg(imgUrl);
    } else {
      setCarImg(null);
    }
  }, [manufacturer, model, year]);

  // Validation logic
  const validate = () => {
    const errs = {};

    if (!manufacturer) errs.manufacturer = "Please select a manufacturer";
    if (!model) errs.model = "Please select a model";
    if (!year) errs.year = "Please select a year";
    else if (year < 1980 || year > currentYear)
      errs.year = `Year must be between 1980 and ${currentYear}`;

    if (!lastTyreChange) errs.lastTyreChange = "Please enter last tyre change date";
    else {
      const d = new Date(lastTyreChange);
      const maxDate = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 20);

      if (d > maxDate || d < minDate)
        errs.lastTyreChange = `Date must be between ${minDate.toISOString().slice(0, 10)} and ${maxDate
          .toISOString()
          .slice(0, 10)}`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

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

  return (
    <form className="car-details-form" onSubmit={handleSubmit} noValidate>
      <h2>Enter your car details</h2>

      {/* Manufacturer */}
      <label htmlFor="manufacturer-select" className="form-label">
        Manufacturer <span aria-hidden="true" style={{ color: "red" }}>*</span>
      </label>
      <select
        id="manufacturer-select"
        aria-describedby="manufacturer-error"
        value={manufacturer}
        onChange={(e) => setManufacturer(e.target.value)}
        required
        aria-invalid={!!errors.manufacturer}
      >
        <option value="">Select Manufacturer</option>
        {carBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      {errors.manufacturer && (
        <p id="manufacturer-error" className="error-msg" role="alert">
          {errors.manufacturer}
        </p>
      )}

      {/* Model */}
      <label htmlFor="model-select" className="form-label">
        Model <span aria-hidden="true" style={{ color: "red" }}>*</span>
      </label>
      <select
        id="model-select"
        aria-describedby="model-error"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
        disabled={!manufacturer}
        aria-invalid={!!errors.model}
      >
        <option value="">{manufacturer ? "Select Model" : "Select Manufacturer First"}</option>
        {getModelsForBrand(manufacturer).map((modelName) => (
          <option key={modelName} value={modelName}>
            {modelName}
          </option>
        ))}
      </select>
      {errors.model && (
        <p id="model-error" className="error-msg" role="alert">
          {errors.model}
        </p>
      )}

      {/* Year */}
      <label htmlFor="year-select" className="form-label">
        Year <span aria-hidden="true" style={{ color: "red" }}>*</span>
      </label>
      <select
        id="year-select"
        aria-describedby="year-error"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
        aria-invalid={!!errors.year}
      >
        <option value="">Select Year</option>
        {Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i).map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
      </select>
      {errors.year && (
        <p id="year-error" className="error-msg" role="alert">
          {errors.year}
        </p>
      )}

      {/* Last Tyre Change */}
      <label htmlFor="last-tyre-change" className="form-label">
        Last Tyre Change Date <span aria-hidden="true" style={{ color: "red" }}>*</span>
      </label>
      <input
        id="last-tyre-change"
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
      />
      <small id="tyre-change-hint" className="hint">
        Date must be within the last 20 years
      </small>
      {errors.lastTyreChange && (
        <p id="tyre-change-error" className="error-msg" role="alert">
          {errors.lastTyreChange}
        </p>
      )}

      {/* Car Image preview */}
      <fieldset
        className="car-image-container"
        aria-live="polite"
        aria-label="Car image preview"
      >
        {carImg ? (
          <img
            src={carImg}
            alt={`${manufacturer} ${model} ${year}`}
            className="car-image"
            onError={() => setCarImg(null)}
          />
        ) : (
          fallbackCarSVG
        )}
      </fieldset>

      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
}
