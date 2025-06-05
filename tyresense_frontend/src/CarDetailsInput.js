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
    <div className="ts-car-input-instruction">
      <span className="ts-car-input-instruction-title">
        Enter your car details for <span className="neon-accent">personalized tyre recommendations</span>
      </span>
      <span className="ts-car-input-instruction-desc">
        Save your car to preview, and get a live image demo.
      </span>
    </div>
  );

  return (
    <form
      className="ts-car-input-form ts-premium modern-car-form"
      onSubmit={handleSubmit}
      autoComplete="on"
      aria-label="Car details entry form"
    >
      {uxInstruction}
      <div className="ts-car-form-fields-container">
        {/* Car Brand */}
        <fieldset className="ts-car-form-group modern-form-group" style={{ marginTop: 72 }}>
          <label htmlFor="car-manufacturer">
            <span className="car-label-title">
              Car <span className="neon-accent">Manufacturer</span>
            </span>
            <span className="ts-label-sub">(brand)</span>
          </label>
          <select
            className="ts-input"
            id="car-manufacturer"
            value={CAR_BRANDS.includes(manufacturer) ? manufacturer : (manufacturer ? "Other" : "")}
            onChange={e => setManufacturer(e.target.value === "Other" ? "" : e.target.value)}
            required
            autoComplete="on"
            aria-label="Car manufacturer (brand)"
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
              onChange={e => setManufacturer(e.target.value)}
              required
              autoComplete="on"
              aria-label="Car manufacturer (other)"
              inputMode="text"
              style={{ border: "2.6px solid #00fff9" }}
            />
          )}
          <span className="ts-label-instruction">
            <span style={{ color: "#ffe600" }}>Select car brand</span> or <span className="neon-accent">type manually</span>.
          </span>
        </fieldset>

        {/* Car Model */}
        <fieldset className="ts-car-form-group ts-car-model-group modern-form-group" style={{ marginTop: 72 }}>
          <label htmlFor="car-model">
            <span className="car-label-title neon-accent">Model</span>
          </label>
          {/* Model as dropdown if brand is known, else input */}
          {manufacturer && CAR_MODELS_BY_BRAND[manufacturer] ? (
            <select
              className="ts-input"
              id="car-model"
              key={manufacturer}
              value={
                model && CAR_MODELS_BY_BRAND[manufacturer].includes(model)
                  ? model
                  : ""
              }
              onChange={e => setModel(e.target.value === "Other" ? "" : e.target.value)}
              required
              autoComplete="on"
              aria-label="Car model"
            >
              <option value="">Select model...</option>
              {CAR_MODELS_BY_BRAND[manufacturer].map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
              <option value="Other">Other (enter manually)</option>
            </select>
          ) : null}
          {/* If user selects "Other", or brand has no models, show a manual model input */}
          {(!manufacturer ||
            !CAR_MODELS_BY_BRAND[manufacturer] ||
            (manufacturer && CAR_MODELS_BY_BRAND[manufacturer] &&
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
              onChange={e => setModel(e.target.value)}
              required
              autoComplete="on"
              aria-label="Car model"
              inputMode="text"
              style={{ border: "2.6px solid #00fff9" }}
            />
          )}
          <span className="ts-label-instruction">
            {manufacturer && CAR_MODELS_BY_BRAND[manufacturer]
              ? <span><span style={{ color: "#ffe600" }}>Choose your model</span> or <span className="neon-accent">type manually</span>.</span>
              : <span>Enter your car's <span className="neon-accent">model</span>, e.g. "Corolla", "Mustang", "A-Class".</span>
            }
          </span>
        </fieldset>

        {/* Year */}
        <fieldset className="ts-car-form-group modern-form-group" style={{ maxWidth: 170, marginTop: 72 }}>
          <label htmlFor="car-year">
            <span className="car-label-title neon-gold">Year</span>
          </label>
          <select
            className="ts-input"
            id="car-year"
            value={year}
            onChange={e => setYear(e.target.value)}
            required
            autoComplete="on"
            aria-label="Car model year"
          >
            <option value="">Year…</option>
            {getYearOptions().map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
          <span className="ts-label-instruction">
            <span className="neon-gold">Registration year</span>
          </span>
        </fieldset>
      </div>

      <div className="modern-car-form-row">
        {/* Car image preview */}
        <div className="ts-car-img-preview modern-img-preview">
          <div className="ts-car-img-preview-box modern-img-preview-box">
            {loadingImg ? (
              <span className="ts-car-img-loading">Loading…</span>
            ) : carImg ? (
              <img
                src={carImg}
                alt="Auto-fetched preview illustration of your car"
                draggable={false}
              />
            ) : (
              <span>
                <span style={{
                  color: "#ffe600",
                  fontWeight: 820
                }}>Car image</span>
                <br />
                <span style={{
                  color: "#00fff9",
                  opacity: 0.9,
                  fontWeight: 600
                }}>(auto)</span>
              </span>
            )}
          </div>
          <span className="ts-car-img-preview-label modern-preview-label">
            <span className="neon-accent" style={{ fontWeight: 800 }}>Live visual:</span> based on your details.
          </span>
        </div>
        {/* Save Button */}
        <div className="ts-car-form-submit modern-form-submit">
          <button
            type="submit"
            className="btn btn-large neon-premium-btn"
            aria-label="Save car details"
          >
            <span style={{
              letterSpacing: "0.13em",
              fontWeight: 900,
              color: "#181924",
              textShadow: "0 0 12px #00fff92c"
            }}>Save Car</span>
            <span style={{
              color: "#00fff9",
              fontWeight: 800,
              paddingLeft: 8,
              fontSize: "1.42em",
              verticalAlign: "middle"
            }}>
              →
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default CarDetailsInput;
