import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * CarDetailsInput:
 * - Allows the user to enter their car make, model, year.
 * - Fetches a car image (via Bing image as fallback, demo only, could be swapped for licensed API)
 * - Collects car details and submits them up
 * - Persists car details in LocalStorage (or Firebase if available)
 * - Shows demo car image with brand style
 */
function CarDetailsInput({ onSubmit, initialCar, persistCar }) {
  const [make, setMake] = useState(initialCar?.make || "");
  const [model, setModel] = useState(initialCar?.model || "");
  const [year, setYear] = useState(initialCar?.year || "");
  const [carImg, setCarImg] = useState(initialCar?.carImg || null);
  const [loadingImg, setLoadingImg] = useState(false);

  // Attempt to fetch car image from Bing/duckduckgo for demo (FIREBASE: swap w/prod endpoint)
  useEffect(() => {
    if (make && model && year) {
      setLoadingImg(true);
      // Fetch from Bing (demo only; for prod, use licensed car images API)
      fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          `${year} ${make} ${model} car`
        )}&format=json&no_redirect=1`,
        { method: "GET", mode: "cors" }
      )
        .then((r) => r.json())
        .then((data) => {
          const img =
            data.Image && data.Image.startsWith("http")
              ? data.Image
              : null;
          if (img) setCarImg(img);
          setLoadingImg(false);
        })
        .catch(() => setLoadingImg(false));
    }
  }, [make, model, year]);

  function handleSubmit(e) {
    e.preventDefault();
    const car = { make, model, year, carImg };
    onSubmit(car);
    if (persistCar) persistCar(car); // For LocalStorage/Firebase sync
  }

  return (
    <form
      className="ts-car-input-form"
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 28,
        background: "rgba(18,20,40,0.89)",
        borderRadius: 22,
        boxShadow: "0 2.5px 18px #00fff929",
        padding: "32px 38px",
        flexWrap: "wrap",
        marginBottom: 36,
        marginTop: 10,
      }}
      onSubmit={handleSubmit}
      autoComplete="on"
    >
      <div style={{ flex: "1 1 190px", minWidth: 120 }}>
        <label className="ts-label" htmlFor="car-make">
          Car Manufacturer
        </label>
        <input
          className="ts-input"
          id="car-make"
          type="text"
          placeholder="e.g. Toyota, Ford, BMW"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
          autoComplete="on"
          aria-label="Car Manufacturer"
        />
      </div>
      <div style={{ flex: "1 1 190px", minWidth: 100 }}>
        <label className="ts-label" htmlFor="car-model">
          Model
        </label>
        <input
          className="ts-input"
          id="car-model"
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          autoComplete="on"
        />
      </div>
      <div style={{ flex: "1 1 90px", minWidth: 60 }}>
        <label className="ts-label" htmlFor="car-year">
          Year
        </label>
        <input
          className="ts-input"
          id="car-year"
          type="number"
          min="1970"
          max={new Date().getFullYear()}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          autoComplete="on"
        />
      </div>
      <div style={{ flex: "0 1 160px", alignSelf: "center" }}>
        <button
          type="submit"
          className="btn btn-large"
          style={{
            background:
              "linear-gradient(91deg,#ffe600 80%,#00fff9 130%)",
            color: "#18181f",
            fontWeight: 700,
            borderRadius: 16,
            padding: "12px 27px",
            boxShadow: "0 2px 11px #00fff926, 0 0.8px 8px #ffe60036",
            minWidth: 83,
            minHeight: 44,
            fontSize: "1.07rem",
          }}
        >
          Save Car →
        </button>
      </div>
      <div
        style={{
          flex: "0 0 128px",
          marginLeft: 6,
          alignSelf: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 110,
            height: 63,
            borderRadius: 12,
            background: "#232f5c22",
            boxShadow: "0 3px 18px #00fff94a, 0 2px 8px #ffe60017",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {loadingImg ? (
            <span style={{ color: "#ffe600" }}>...</span>
          ) : carImg ? (
            <img
              src={carImg}
              alt="User car, demo image"
              style={{
                width: 108,
                height: 61,
                objectFit: "contain",
                borderRadius: 8,
                filter: "drop-shadow(0 0 12px #00fff98c) brightness(1.12)",
                background: "#111",
                userSelect: "none",
                pointerEvents: "none",
              }}
              draggable={false}
            />
          ) : (
            <span
              style={{
                color: "#ffe600b7",
                textAlign: "center",
                fontWeight: 500,
                fontSize: "1.013rem",
                padding: 7,
                opacity: 0.88,
              }}
            >
              Car image
              <br />
              (auto)
            </span>
          )}
        </div>
      </div>
    </form>
  );
}

export default CarDetailsInput;
