import React, { useState, useEffect } from "react";
import "./CarDetailsInput.css";

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

  // When manufacturer changes, reset model unless it is valid for the selected brand.
  useEffect(() => {
    if (
      manufacturer &&
      CAR_MODELS_BY_BRAND[manufacturer] &&
      !CAR_MODELS_BY_BRAND[manufacturer].includes(model)
    ) {
      setModel("");
    }
    // eslint-disable-next-line
  }, [manufacturer]);

  // Popular car brands list (expansive, includes global brands; can be extended further)
  const CAR_BRANDS = [
    "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", "Audi", "Nissan", "Hyundai",
    "Kia", "Mazda", "Subaru", "Tesla", "Jeep", "Lexus", "Porsche", "Mini", "Jaguar", "Land Rover", "Volvo", "Renault", "Peugeot",
    "Skoda", "Fiat", "Citroen", "Mitsubishi", "Dacia", "Suzuki", "Alfa Romeo", "Seat", "Bentley", "Bugatti", 
    "Cadillac", "Chrysler", "Dodge", "Genesis", "Infiniti", "Maserati", "RAM", "Saab", "Smart", "SsangYong", "Rolls-Royce", "Opel", 
    "Vauxhall", "Acura", "Aston Martin", "Buick", "GMC", "Hummer", "Isuzu", "Lincoln", "Lotus", "Pagani", "Polestar", "Proton", "Rivian"
  ];

  // Car brand to car models map (partial, demo-level coverage for main manufacturers)
  const CAR_MODELS_BY_BRAND = {
    Toyota: ["Corolla", "Camry", "Yaris", "Prius", "RAV4", "Land Cruiser", "Hilux", "Supra"],
    Honda: ["Civic", "Accord", "CR-V", "Fit", "Odyssey", "Pilot", "HR-V", "Jazz"],
    Ford: ["F-150", "Focus", "Fiesta", "Mustang", "Explorer", "Escape", "Edge", "Ranger"],
    Chevrolet: ["Silverado", "Malibu", "Equinox", "Camaro", "Spark", "Tahoe", "Colorado"],
    Volkswagen: ["Golf", "Passat", "Polo", "Tiguan", "Jetta", "Touareg", "Atlas"],
    BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X1", "X7"],
    "Mercedes-Benz": ["C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "A-Class"],
    Audi: ["A3", "A4", "A6", "Q3", "Q5", "Q7", "Q8", "A8"],
    Nissan: ["Altima", "Sentra", "Leaf", "Rogue", "Qashqai", "X-Trail", "Juke"],
    Hyundai: ["Elantra", "i30", "Tucson", "Santa Fe", "Sonata", "Kona", "Venue"],
    Kia: ["Sportage", "Sorento", "Rio", "Seltos", "Stinger", "Ceed", "Niro"],
    Mazda: ["Mazda3", "Mazda6", "CX-5", "CX-3", "MX-5", "CX-9"],
    Subaru: ["Impreza", "Forester", "Outback", "Legacy", "Crosstrek", "XV"],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],
    Jeep: ["Wrangler", "Grand Cherokee", "Compass", "Renegade", "Cherokee"],
    Lexus: ["RX", "ES", "NX", "IS", "UX", "LS"],
    Porsche: ["911", "Cayenne", "Panamera", "Macan", "Taycan"],
    Mini: ["Cooper", "Clubman", "Countryman", "Convertible"],
    Jaguar: ["XE", "XF", "XJ", "F-PACE", "E-PACE", "I-PACE", "F-TYPE"],
    "Land Rover": ["Discovery", "Defender", "Range Rover", "Range Rover Evoque"],
    Volvo: ["S60", "XC40", "XC60", "XC90", "V60", "V90"],
    Renault: ["Clio", "Megane", "Kadjar", "Captur", "ZOE"],
    Peugeot: ["208", "308", "3008", "2008", "5008"],
    Skoda: ["Octavia", "Superb", "Fabia", "Kodiaq", "Karoq"],
    Fiat: ["500", "Panda", "Tipo", "Punto", "Doblo"],
    Citroen: ["C3", "C4", "C5 Aircross", "Berlingo"],
    Mitsubishi: ["Lancer", "Outlander", "ASX", "Eclipse Cross", "Pajero"],
    Suzuki: ["Swift", "Vitara", "Ignis", "S-Cross", "Jimny"],
    "Alfa Romeo": ["Giulia", "Stelvio", "Giulietta"],
    Seat: ["Ibiza", "Leon", "Ateca", "Arona"],
    Bentley: ["Continental GT", "Flying Spur", "Bentayga"],
    Bugatti: ["Chiron", "Veyron"],
    Cadillac: ["Escalade", "CT5", "XT5", "ATS"],
    Chrysler: ["300", "Pacifica", "Voyager"],
    Dodge: ["Charger", "Challenger", "Durango", "Journey"],
    Genesis: ["G70", "G80", "G90"],
    Infiniti: ["Q50", "QX60", "QX50", "QX80"],
    Maserati: ["Ghibli", "Levante", "Quattroporte"],
    RAM: ["1500", "2500", "3500"],
    Saab: ["9-3", "9-5"],
    Smart: ["Fortwo", "Forfour"],
    SsangYong: ["Rexton", "Tivoli", "Korando", "Musso"],
    "Rolls-Royce": ["Phantom", "Ghost", "Cullinan", "Wraith"],
    Opel: ["Astra", "Corsa", "Insignia", "Mokka"],
    Vauxhall: ["Astra", "Corsa", "Insignia", "Mokka"],
    Acura: ["MDX", "RDX", "ILX", "TLX"],
    "Aston Martin": ["DB11", "Vantage", "DBS Superleggera", "Rapide"],
    Buick: ["Enclave", "Encore", "Regal", "LaCrosse"],
    GMC: ["Sierra", "Terrain", "Acadia", "Canyon"],
    Hummer: ["H2", "H3"],
    Isuzu: ["D-Max", "MU-X"],
    Lincoln: ["Navigator", "Aviator", "Corsair", "Continental"],
    Lotus: ["Elise", "Evora", "Exige"],
    Pagani: ["Huayra", "Zonda"],
    Polestar: ["1", "2", "3"],
    Proton: ["Saga", "Persona", "Iriz"],
    Rivian: ["R1T", "R1S"],
    Dacia: ["Duster", "Sandero", "Logan"],
  };

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

  // Generate years list (descending, newest to oldest)
  const getYearOptions = () => {
    const yearList = [];
    const curr = new Date().getFullYear();
    for (let y = curr; y >= 1990; y--) {
      yearList.push(y);
    }
    return yearList;
  };

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
      {/* Manufacturer field */}
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

      {/* Model field */}
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
        {/* Model as dropdown if brand is known, else input */}
        {manufacturer && CAR_MODELS_BY_BRAND[manufacturer] && (
          <select
            className="ts-input"
            id="car-model"
            value={
              model && CAR_MODELS_BY_BRAND[manufacturer].includes(model)
                ? model
                : ""
            }
            onChange={(e) => {
              if (e.target.value === "Other") {
                setModel("");
              } else {
                setModel(e.target.value);
              }
            }}
            required
            autoComplete="on"
            aria-label="Car model"
            style={{
              borderRadius: 11,
              border: "1px solid #ffe60033",
              marginBottom: 2,
              fontWeight: 600,
              fontSize: "1.08rem",
              background: "#18181f",
              color: "#ffe600",
              padding: "7.5px 8.5px",
              width: "100%",
              appearance: "none",
              marginTop: 2,
            }}
            key={manufacturer}
          >
            <option value="">Select model...</option>
            {CAR_MODELS_BY_BRAND[manufacturer].map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
            <option value="Other">Other (enter manually)</option>
          </select>
        )}

        {/* If user selects "Other", or brand has no models, show a manual model input */}
        {(!manufacturer ||
          !CAR_MODELS_BY_BRAND[manufacturer] ||
          (manufacturer &&
            CAR_MODELS_BY_BRAND[manufacturer] &&
            (model === "Other" ||
              !CAR_MODELS_BY_BRAND[manufacturer].includes(model)))) && (
          <input
            className="ts-input"
            id="car-model-other"
            type="text"
            placeholder={
              manufacturer && CAR_MODELS_BY_BRAND[manufacturer]
                ? "Type model name (if not listed above)"
                : "e.g. Civic, F-150, Model 3"
            }
            value={model === "Other" ? "" : model}
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
              width: "100%",
              marginTop: 5,
            }}
            inputMode="text"
          />
        )}

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
          {manufacturer && CAR_MODELS_BY_BRAND[manufacturer]
            ? 'Choose your car\'s model or select "Other" to enter it manually.'
            : 'Enter your car\'s model, e.g. "Corolla", "Mustang", "A-Class".'}
        </span>
      </div>

      {/* Year field as dropdown */}
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
        <select
          className="ts-input"
          id="car-year"
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
            width: "100%",
            appearance: "none",
            marginBottom: 2
          }}
        >
          <option value="">Select year...</option>
          {getYearOptions().map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
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
          Car's registration year (choose from list)
        </span>
      </div>

      {/* Submit button */}
      <div style={{
        flex: "0 1 150px",
        alignSelf: "center",
        marginTop: 73,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}>
        <button
          type="submit"
          className="btn btn-large"
          style={{
            background:
              "linear-gradient(91deg,#ffe600 80%,#00fff9 125%)",
            color: "#191a1a",
            fontWeight: 700,
            borderRadius: 13,
            padding: "13px 29px",
            boxShadow: "0 2.5px 11px #00fff916, 0 1.5px 8px #ffe60019",
            minWidth: 86,
            minHeight: 46,
            fontSize: "1.13rem",
            border: "none",
            outline: "none",
            transition: "background 0.18s, box-shadow 0.18s"
          }}
          aria-label="Save car details"
        >
          Save Car →
        </button>
      </div>

      {/* Car image preview */}
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
