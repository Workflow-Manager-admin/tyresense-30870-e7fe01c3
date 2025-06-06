import React, { useState, useEffect } from "react";
import "./CarDetailsInput.css";

/**
 * PUBLIC_INTERFACE
 * CarDetailsInput:
 *  - User enters car details: Manufacturer, Model, Year, gets a contextual car image.
 *  - NEW: User enters date of last tyre change, used for reminder popup logic ("when tyres are due").
 *  - Refined UX: clearer field labels, helpful instructions and hints.
 *  - Persists car info in LocalStorage (or Firebase if available).
 */
function CarDetailsInput({ onSubmit, initialCar, persistCar }) {
  const [manufacturer, setManufacturer] = useState(initialCar?.make || "");
  const [model, setModel] = useState(initialCar?.model || "");
  const [year, setYear] = useState(initialCar?.year || "");
  const [lastTyreChange, setLastTyreChange] = useState(
    initialCar?.lastTyreChange ||
      // Default to 4 years ago (for first-timers, demo purposes: not overdue)
      (() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 4);
        return d.toISOString().substr(0, 10);
      })()
  );
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
      // Use DuckDuckGo for API search first, fallback to Bing if blank, otherwise always fallback SVG
      fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          `${year} ${manufacturer} ${model} car`
        )}&format=json&no_redirect=1`,
        { method: "GET", mode: "cors" }
      )
        .then((r) => r.json())
        .then((data) => {
          let img =
            data.Image && data.Image.startsWith("http")
              ? data.Image
              : null;
          // If DuckDuckGo API gives blank (common for lesser-known cars), fallback to Bing search API (free demo endpoint)
          if (!img) {
            // Demo or fallback: Use Bing/Unsplash API (vivid demo only, swap for prod API if needed)
            fetch(
              `https://api.unsplash.com/search/photos?client_id=FJ7a7yzrRgqT1kt9YAGQ8lm9ZimzLmYWrm7Y8Rx-lP8&query=${encodeURIComponent(
                `${year} ${manufacturer} ${model} car`
              )}`,
              { method: "GET" }
            )
              .then((res) => res.json())
              .then((json) => {
                if (
                  json.results &&
                  json.results.length > 0 &&
                  json.results[0].urls &&
                  json.results[0].urls.small
                ) {
                  img = json.results[0].urls.small;
                  setCarImg(img);
                } else {
                  setCarImg(null);
                }
                setLoadingImg(false);
              })
              .catch(() => {
                setCarImg(null);
                setLoadingImg(false);
              });
          } else {
            setCarImg(img);
            setLoadingImg(false);
          }
        })
        .catch(() => {
          // Fallback/fail gracefully to showing SVG
          setCarImg(null);
          setLoadingImg(false);
        });
    }
  }, [manufacturer, model, year]);

  function handleSubmit(e) {
    e.preventDefault();
    const car = {
      make: manufacturer,
      model,
      year,
      carImg,
      lastTyreChange,
      // Support other fields (e.g., email in the future) if needed
    };
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
        Enter your car details for <span style={{ color: "#b4081b", fontWeight: 800 }}>personalized tyre recommendations</span>
      </span>
      <span className="ts-car-input-instruction-desc">
        Save your car to preview, and get a live image demo.
      </span>
    </div>
  );

  // --- Porsche-style minimal summary section ---
  const hasEssentials = manufacturer && model;
  // Inline SVG fallback silhouette (simple side car icon)
  const fallbackCarSVG = (
    <svg width="71" height="49" viewBox="0 0 90 49" fill="none" style={{display: 'block'}}
      aria-label="Default car silhouette">
      <rect x="0" y="24" width="90" height="24" rx="9" fill="#18181b"/>
      <ellipse cx="25" cy="41" rx="8" ry="6.5" fill="#7d7d85"/>
      <ellipse cx="66" cy="41" rx="8" ry="6.5" fill="#7d7d85"/>
      <rect x="11" y="13" width="68" height="17" rx="7" fill="#232327" />
      <rect x="29" y="9" width="33" height="12" rx="5.5" fill="#232327" />
      <rect x="41" y="4" width="11" height="7" rx="3.2" fill="#b4081b" />
    </svg>
  );
  // Helper for conditional preview (carImg, loading, fallback)
  const renderCarImage = (altText = "Car", imgStyle = {}) =>
    loadingImg ? (
      <span className="ts-car-img-loading">Loading…</span>
    ) : carImg ? (
      <img
        src={carImg}
        alt={altText}
        style={imgStyle}
        draggable={false}
        onError={e => { e.target.onerror = null; setCarImg(null); }}
      />
    ) : (
      fallbackCarSVG
    );

  const minimalSummary = hasEssentials && (
    <section
      className="car-details-minimal-summary"
      aria-live="polite"
    >
      <div
        style={{
          width: 77,
          height: 54,
          borderRadius: 9,
          background: "#232327",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          border: "1.2px solid #cfd2d6",
          marginRight: 24,
        }}
        aria-hidden={carImg ? "false" : "true"}
      >
        {renderCarImage(
          `Preview: ${year ? year + " " : ""}${manufacturer} ${model}`,
          {
            width: 71,
            height: 49,
            objectFit: "cover",
            borderRadius: 8,
            background: "#19181b",
          }
        )}
      </div>
      <div>
        <div
          className="car-details-summary-title"
        >
          {manufacturer}
          <span className="car-details-summary-model">{model}</span>
          {year && (
            <span className="car-details-summary-year">{year}</span>
          )}
        </div>
        {lastTyreChange && (
          <div style={{ color: "#b4081b", fontWeight: 700, fontSize: "1.01rem", marginTop: 6 }}>
            Last Tyre Change: {lastTyreChange}
          </div>
        )}
      </div>
    </section>
  );

  return (
    <>
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
                Car <span style={{ color: "#b4081b", fontWeight: 800 }}>Manufacturer</span>
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
                style={{ border: "2.1px solid #b4081b" }}
              />
            )}
            <span className="ts-label-instruction">
              <span style={{ color: "#b4081b", fontWeight: 700 }}>Select car brand</span> or <span style={{ color: "#b4081b", fontWeight: 600 }}>type manually</span>.
            </span>
          </fieldset>

          {/* Car Model */}
          <fieldset className="ts-car-form-group ts-car-model-group modern-form-group" style={{ marginTop: 72 }}>
            <label htmlFor="car-model">
              <span className="car-label-title" style={{ color: "#b4081b", fontWeight: 800 }}>Model</span>
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
                style={{ border: "2.1px solid #b4081b" }}
              />
            )}
            <span className="ts-label-instruction">
              {manufacturer && CAR_MODELS_BY_BRAND[manufacturer]
                ? <span><span style={{ color: "#b4081b", fontWeight: 700 }}>Choose your model</span> or <span style={{ color: "#b4081b", fontWeight: 600 }}>type manually</span>.</span>
                : <span>Enter your car's <span style={{ color: "#b4081b", fontWeight: 700 }}>model</span>, e.g. "Corolla", "Mustang", "A-Class".</span>
              }
            </span>
          </fieldset>

          {/* Year */}
          <fieldset className="ts-car-form-group modern-form-group" style={{ maxWidth: 170, marginTop: 72 }}>
            <label htmlFor="car-year">
              <span className="car-label-title" style={{ color: "#edeef0", fontWeight: 800 }}>Year</span>
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
              <span style={{ color: "#7d7d85", fontWeight: 700 }}>Registration year</span>
            </span>
          </fieldset>

          {/* Last Tyre Change Date */}
          <fieldset className="ts-car-form-group modern-form-group" style={{ maxWidth: 220, marginTop: 72 }}>
            <label htmlFor="car-last-tyre-change">
              <span className="car-label-title" style={{ color: "#b4081b", fontWeight: 800 }}>Last Tyre Change</span>
            </label>
            <input
              className="ts-input"
              type="date"
              id="car-last-tyre-change"
              value={lastTyreChange}
              onChange={e => setLastTyreChange(e.target.value)}
              required
              aria-label="Date of last tyre replacement"
              style={{ border: "2.1px solid #b4081b" }}
              max={new Date().toISOString().substr(0, 10)}
            />
            <span className="ts-label-instruction">
              <span style={{ color: "#b4081b", fontWeight: 700 }}>When did you last replace your tyres?</span>
            </span>
          </fieldset>
        </div>

        <div className="modern-car-form-row">
          {/* Car image preview */}
          <div className="ts-car-img-preview modern-img-preview">
            <div className="ts-car-img-preview-box modern-img-preview-box">
              {renderCarImage(
                "Auto-fetched preview illustration of your car",
                {
                  width: 133,
                  height: 81,
                  objectFit: "cover",
                  borderRadius: 10,
                  background: "#19181b",
                }
              )}
            </div>
            <span className="ts-car-img-preview-label modern-preview-label">
              <span style={{ color: "#b4081b", fontWeight: 800 }}>Live visual:</span> based on your details.
            </span>
          </div>
          {/* Save Button */}
          <div className="ts-car-form-submit modern-form-submit">
            <button
              type="submit"
              className="btn btn-large"
              aria-label="Save car details"
              style={{
                background: "#b4081b",
                color: "#fff",
                fontWeight: 800,
                borderRadius: "18px",
                padding: "15px 45px",
                boxShadow: "none",
                minWidth: "110px",
                minHeight: "46px",
                fontSize: "1.13rem",
                letterSpacing: "0.13em",
                border: "1.4px solid #b4081b",
                outline: "none",
                transition: "background 0.18s, box-shadow 0.13s, filter 0.08s, color 0.10s",
                fontFamily: "inherit",
                filter: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span style={{
                letterSpacing: "0.13em",
                fontWeight: 900,
                color: "#fff"
              }}>Save Car</span>
              <span style={{
                color: "#fff",
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
      {minimalSummary}
    </>
  );
}

export default CarDetailsInput;
