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

  // Popular car brands list (expansive, includes global brands; can be extended further)
  const CAR_BRANDS = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Nissan", "Hyundai",
    "Kia", "Mazda", "Subaru", "Tesla", "Jeep", "Lexus", "Porsche", "Mini", "Jaguar", "Land Rover", "Volvo", "Renault", "Peugeot",
    "Skoda", "Fiat", "Citroen", "Mitsubishi", "Dacia", "Suzuki", "Alfa Romeo", "Seat", "Bentley", "Bugatti", 
    "Cadillac", "Chrysler", "Dodge", "Genesis", "Infiniti", "Maserati", "RAM", "Saab", "Smart", "SsangYong", "Rolls-Royce", "Opel", 
    "Vauxhall", "Acura", "Aston Martin", "Buick", "GMC", "Hummer", "Isuzu", "Lincoln", "Lotus", "Pagani", "Polestar", "Proton", "Rivian"
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
        gap: 34,
        flexWrap: "wrap",
        background: "linear-gradient(130deg, #18181f 78%, #191932 100%)",
        borderRadius: 20,
        boxShadow: "0 2px 18px #00fff91e, 0 1.5px 10px #ffe60019",
        padding: "38px 32px 28px 32px",
        marginBottom: 40,
        marginTop: 22,
        position: "relative",
        border: "1.5px solid #232f5c",
        minWidth: 0
      }}
      onSubmit={handleSubmit}
      autoComplete="on"
      aria-label="Car details entry form"
    >
      <div style={{ position: "absolute", left: 36, top: 12, right: 36 }}>
        {uxInstruction}
      </div>
      {/* Leave top margin for instructions on desktop */}
      <div style={{
        flex: "1 1 220px",
        minWidth: 130,
        marginTop: 57
      }}>
        <label
          className="ts-label"
          htmlFor="car-manufacturer"
          style={{
            fontWeight: 800,
            color: "#ffe600",
            fontSize: "1.13rem",
            marginBottom: 6,
            letterSpacing: ".045em",
            display: "block",
            marginLeft: 1,
          }}
        >
          Car Manufacturer
          <span style={{
            color: "#fff",
            opacity: 0.62,
            fontWeight: 400,
            fontSize: "0.97em",
            marginLeft: 7,
          }}>(brand)</span>
        </label>
        <select
          className="ts-input"
          id="car-manufacturer"
          value={CAR_BRANDS.includes(manufacturer) ? manufacturer : (manufacturer ? "Other" : "")}
          onChange={(e) => {
            if (e.target.value === "Other") {
              setManufacturer("");
            } else {
              setManufacturer(e.target.value);
            }
          }}
          required
          autoComplete="on"
          aria-label="Car manufacturer (brand)"
          style={{
            borderRadius: 11,
            border: "1px solid #ffe60066",
            marginBottom: 3,
            fontWeight: 600,
            fontSize: "1.10rem",
            background: "#18181f",
            color: "#ffe600",
            padding: "7.5px 8.5px",
            marginTop: 2,
            width: "100%",
            minHeight: 37,
            appearance: "none"
          }}
        >
          <option value="">Select manufacturer...</option>
          {CAR_BRANDS.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
          <option value="Other">Other (enter manually)</option>
        </select>
        {/* Show manual input if "Other" or not in list */}
        {(manufacturer === "" || !CAR_BRANDS.includes(manufacturer)) && (
          <input
            className="ts-input"
            id="car-manufacturer-other"
            type="text"
            placeholder="Type manufacturer name"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            autoComplete="on"
            aria-label="Car manufacturer (other)"
            style={{
              borderRadius: 11,
              border: "1px solid #ffe60066",
              marginBottom: 1,
              fontWeight: 600,
              fontSize: "1.10rem",
              background: "#18181f",
              color: "#ffe600",
              marginTop: 5,
              width: "100%",
              padding: "7.5px 8.5px",
            }}
            inputMode="text"
          />
        )}
        <span
          style={{
            display: "block",
            color: "#ffe600a0",
            fontSize: ".94em",
            marginTop: 4,
            marginBottom: 2,
            fontWeight: 400,
            opacity: 0.82
          }}
        >
          Choose your car's manufacturer or select "Other" to enter it manually.
        </span>
      </div>
      <div style={{
        flex: "1 1 190px",
        minWidth: 100,
        marginTop: 57
      }}>
        <label
          className="ts-label"
          htmlFor="car-model"
          style={{
            fontWeight: 700,
            color: "#ffe600cc",
            fontSize: "1.07rem",
            marginBottom: 5,
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
            borderRadius: 11,
            border: "1px solid #ffe60033",
            marginBottom: 2,
            fontWeight: 600,
            fontSize: "1.06rem",
            background: "#18181f",
            color: "#ffe600",
            padding: "7.5px 8.5px",
            width: "100%"
          }}
          inputMode="text"
        />
        <span
          style={{
            display: "block",
            color: "#ffe600a1",
            fontSize: "0.91em",
            marginTop: 4,
            fontWeight: 400,
            opacity: 0.82
          }}
        >
          Enter your car's model, e.g. "Corolla", "Mustang", "A-Class".
        </span>
      </div>
      <div style={{
        flex: "1 1 90px",
        minWidth: 65,
        marginTop: 57
      }}>
        <label
          className="ts-label"
          htmlFor="car-year"
          style={{
            fontWeight: 700,
            color: "#ffe600aa",
            fontSize: "1.03rem",
            marginBottom: 4,
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
            borderRadius: 11,
            border: "1px solid #ffe60033",
            fontWeight: 600,
            fontSize: "1.04rem",
            background: "#18181f",
            color: "#ffe600",
            padding: "7.5px 8.5px",
            width: "100%"
          }}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <span
          style={{
            display: "block",
            color: "#ffe60070",
            fontSize: "0.89em",
            marginTop: 3,
            fontWeight: 400,
            opacity: 0.83
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
