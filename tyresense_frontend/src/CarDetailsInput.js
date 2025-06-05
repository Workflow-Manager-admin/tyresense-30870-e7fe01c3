import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * CarDetailsInput:
 *  - User enters car details: Manufacturer, Model, Year, gets a contextual car image.
 *  - Refined UX: clearer field labels, helpful instructions and hints.
 *  - Persists car info in LocalStorage (or Firebase if available).
 */
function CarDetailsInput({ onSubmit, initialCar, persistCar }) {
  const [manufacturer, setManufacturer] = useState(initialCar?.make || "");
  const [model, setModel] = useState(initialCar?.model || "");
  const [year, setYear] = useState(initialCar?.year || "");
  const [carImg, setCarImg] = useState(initialCar?.carImg || null);
  const [loadingImg, setLoadingImg] = useState(false);

  // Popular car brands list for dropdown (customizable, can expand)
  const CAR_BRANDS = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Nissan", "Hyundai",
    "Kia", "Mazda", "Subaru", "Tesla", "Jeep", "Lexus", "Porsche", "Mini", "Jaguar", "Land Rover", "Volvo", "Renault", "Peugeot"
  ];

  // Fetch car image for preview based on manufacturer/model/year
  useEffect(() => {
    if (manufacturer && model && year) {
      setLoadingImg(true);
      fetch(
        // Example API—replace for prod use
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          `${year} ${manufacturer} ${model} car`
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
  }, [manufacturer, model, year]);

  function handleSubmit(e) {
    e.preventDefault();
    const car = { make: manufacturer, model, year, carImg };
    onSubmit(car);
    if (persistCar) persistCar(car);
  }

  // UX: Instructions block
  const uxInstruction = (
    <div
      style={{
        background: "rgba(255,230,0,0.09)",
        borderRadius: 10,
        color: "#ffe600",
        fontWeight: 600,
        fontSize: "1.08rem",
        marginBottom: 14,
        marginTop: -10,
        padding: "8px 17px",
        textAlign: "left",
        boxShadow: "0 1.5px 8px #ffe60027",
        maxWidth: 480,
      }}
    >
      <span>Enter your car details for personalized tyre recommendations & image preview.</span>
    </div>
  );

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
        position: "relative"
      }}
      onSubmit={handleSubmit}
      autoComplete="on"
      aria-label="Car details entry form"
    >
      <div style={{ position: "absolute", left: 36, top: 12, right: 36 }}>
        {uxInstruction}
      </div>
      {/* Leave top margin for instructions on desktop */}
      <div style={{ flex: "1 1 190px", minWidth: 120, marginTop: 44 }}>
        <label
          className="ts-label"
          htmlFor="car-manufacturer"
          style={{
            fontWeight: 700,
            color: "#ffe600",
            fontSize: "1.06rem",
            marginBottom: 3,
            letterSpacing: ".03em",
            display: "block"
          }}
        >
          Car Manufacturer <span style={{ color: "#fff", opacity: 0.62, fontWeight: 400, fontSize: "0.98em" }}>(brand)</span>
        </label>
        <input
          className="ts-input"
          id="car-manufacturer"
          type="text"
          placeholder="e.g. Toyota, Ford, BMW, Tesla"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          required
          autoComplete="on"
          aria-label="Car manufacturer (brand)"
          style={{
            borderRadius: 9,
            border: "1.3px solid #ffe60088",
            marginBottom: 2,
            fontWeight: 600,
            fontSize: "1.08rem",
            background: "#18181f",
            color: "#ffe600"
          }}
          inputMode="text"
        />
        <span
          style={{
            display: "block",
            color: "#ffe600b4",
            fontSize: "0.93em",
            marginTop: 2,
            marginBottom: 2,
            fontWeight: 400,
            opacity: 0.86
          }}
        >
          Enter your car's manufacturer, e.g. "Honda", "Audi", "Toyota".
        </span>
      </div>
      <div style={{ flex: "1 1 190px", minWidth: 100, marginTop: 44 }}>
        <label
          className="ts-label"
          htmlFor="car-model"
          style={{
            fontWeight: 700,
            color: "#ffe600cc",
            fontSize: "1.06rem",
            marginBottom: 3,
            letterSpacing: ".03em",
            display: "block"
          }}
        >
          Model
        </label>
        <input
          className="ts-input"
          id="car-model"
          type="text"
          placeholder="e.g. Civic, F-150, Model 3"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
          autoComplete="on"
          aria-label="Car model"
          style={{
            borderRadius: 9,
            border: "1.3px solid #ffe60044",
            marginBottom: 2,
            fontWeight: 600,
            fontSize: "1.01rem",
            background: "#18181f",
            color: "#ffe600"
          }}
          inputMode="text"
        />
        <span
          style={{
            display: "block",
            color: "#ffe600a1",
            fontSize: "0.91em",
            marginTop: 2,
            fontWeight: 400,
            opacity: 0.82
          }}
        >
          Enter your car's model, e.g. "Corolla", "Mustang", "A-Class".
        </span>
      </div>
      <div style={{ flex: "1 1 90px", minWidth: 60, marginTop: 44 }}>
        <label
          className="ts-label"
          htmlFor="car-year"
          style={{
            fontWeight: 700,
            color: "#ffe600aa",
            fontSize: "1.04rem",
            marginBottom: 3,
            letterSpacing: ".03em",
            display: "block"
          }}
        >
          Year
        </label>
        <input
          className="ts-input"
          id="car-year"
          type="number"
          min="1970"
          max={new Date().getFullYear()}
          placeholder="e.g. 2020"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          autoComplete="on"
          aria-label="Car model year"
          style={{
            borderRadius: 9,
            border: "1.3px solid #ffe60044",
            fontWeight: 600,
            fontSize: "1.00rem",
            background: "#18181f",
            color: "#ffe600"
          }}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <span
          style={{
            display: "block",
            color: "#ffe60070",
            fontSize: "0.88em",
            marginTop: 2,
            fontWeight: 400,
            opacity: 0.80
          }}
        >
          Car's registration year (4 digits)
        </span>
      </div>
      <div style={{ flex: "0 1 160px", alignSelf: "center", marginTop: 60 }}>
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
            fontSize: "1.12rem",
          }}
          aria-label="Save car details"
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
          marginTop: 56
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
            <span style={{ color: "#ffe600" }}>Loading...</span>
          ) : carImg ? (
            <img
              src={carImg}
              alt="Auto-fetched preview illustration of your car"
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
        <span
          style={{
            color: "#ffe60084",
            fontSize: ".89em",
            textAlign: "center",
            marginTop: 3,
            display: "block"
          }}
        >
          Image is a visual demo, based on your entries.
        </span>
      </div>
    </form>
  );
}

export default CarDetailsInput;
