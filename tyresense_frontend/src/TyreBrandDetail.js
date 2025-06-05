import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCarIntro from "./AnimatedCarIntro";
import "./TyreBrandDetail.css";

/**
 * PUBLIC_INTERFACE
 * TyreBrandDetail:
 * Individual tyre brand menu page, fully styled per Porsche menu sample:
 * - Structured layout—header bar, title, grid of large minimal cards, no decorative/legacy UI
 * - Strict use of Porsche color palette/typography/gap
 * - Expanded tyre options with real-world, curated images (see curated_tyre_images.txt)
 */

const DEMO_BRAND_TYPES = {
  pirelli: {
    name: "Pirelli",
    types: [
      {
        id: "p7",
        model: "Cinturato P7",
        type: "Summer",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Profile view of a real Pirelli tyre on a clean surface",
        desc: "Award-winning summer tyre for modern performance cars. Responsive, comfortable, low rolling resistance.",
        sizes: ["225/45R17", "215/40R18", "205/55R16"],
        url: "https://www.pirelli.com/tyres/en-ww/cinturato/p7"
      },
      {
        id: "powergy",
        model: "Powergy",
        type: "All-Season",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Pirelli Powergy close-up, ultra premium",
        desc: "Eco-friendly all-season with advanced safety, low noise and confident grip.",
        sizes: ["205/55R16", "225/40R18"],
        url: "https://www.pirelli.com/tyres/en-ww/powergy"
      },
      {
        id: "sottozero",
        model: "Sottozero 3",
        type: "Winter",
        img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Pirelli Sottozero, special tread for snow",
        desc: "Ultimate safety for cold: superior snow/ice, wide grooves for winter slush.",
        sizes: ["205/55R16", "225/45R17"],
        url: "https://www.pirelli.com/tyres/en-ww/cinturato-winter"
      },
      {
        id: "pzero",
        model: "P Zero",
        type: "Performance",
        img: "https://images.unsplash.com/photo-1523960623072-693d371ad3bd?auto=format&fit=crop&w=1200&q=90",
        imgAlt: "Pirelli P Zero, performance summer tyre close-up",
        desc: "High-end UHP tyre, excellent for sporty handling and control at speed.",
        sizes: ["225/40R18", "245/35R19", "255/30R20"],
        url: "https://www.pirelli.com/tyres/en-ww/pzero"
      },
      {
        id: "cinturatoAllSeason",
        model: "Cinturato All Season SF2",
        type: "All-Season",
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=90",
        imgAlt: "Pirelli Cinturato All Season, wet road photo",
        desc: "Versatile year-round tyre: strong wet road grip and winter safety.",
        sizes: ["205/55R16", "215/50R17"],
        url: "https://www.pirelli.com/tyres/en-ww/cinturato/all-season"
      }
    ]
  },
  michelin: {
    name: "Michelin",
    types: [
      {
        id: "primacy4",
        model: "Primacy 4",
        type: "All-Season",
        img: "https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Close-up of a single Michelin tyre showcasing deep tread detail",
        desc: "Touring tyre with outstanding wet braking and extra-long tread life.",
        sizes: ["205/55R16", "215/55R17", "185/60R15"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-4"
      },
      {
        id: "pilotSport5",
        model: "Pilot Sport 5",
        type: "Performance",
        img: "https://images.pexels.com/photos/7272630/pexels-photo-7272630.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Michelin Pilot Sport 5, deep tread, sidewall contrast",
        desc: "Maximum performance street tyre: track-derived compound for spirited drivers.",
        sizes: ["225/40R18", "235/45R18", "255/35R19"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-pilot-sport-5"
      },
      {
        id: "crossclimate2",
        model: "CrossClimate 2",
        type: "All-Weather",
        img: "https://images.pexels.com/photos/1715194/pexels-photo-1715194.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Michelin CrossClimate tread macro close-up",
        desc: "True all-weather safety: dry grip and advanced water dispersion.",
        sizes: ["215/55R17", "225/50R17"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-crossclimate-2"
      },
      {
        id: "alpin6",
        model: "Alpin 6",
        type: "Winter",
        img: "https://images.pexels.com/photos/1679648/pexels-photo-1679648.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Michelin Alpin 6 tyre ready for snowy roads",
        desc: "Winter tyre for cold, snow, and ice; best-in-class braking when worn.",
        sizes: ["205/55R16", "225/45R17"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-alpin-6"
      },
      {
        id: "primacyTouring",
        model: "Primacy 3",
        type: "Touring",
        img: "https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Close-up of Michelin Primacy 3 for touring use",
        desc: "Smooth, quiet ride and reduced fuel consumption, ideal for everyday comfort.",
        sizes: ["195/65R15", "205/60R16"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-3"
      }
    ]
  },
  continental: {
    name: "Continental",
    types: [
      {
        id: "conti6",
        model: "SportContact 6",
        type: "Performance",
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Macro shot of Continental tyre sidewall and tread textures",
        desc: "Ultra-high performance. Maximum control with Black Chili compound for race-inspired grip.",
        sizes: ["225/40R18", "235/45R17", "245/35R19"],
        url: "https://www.continental-tires.com/uk/en/b2c/car/tires/contisportcontact-6.html"
      },
      {
        id: "premiumContact7",
        model: "PremiumContact 7",
        type: "Touring",
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Continental PremiumContact, close profile of grooves",
        desc: "Quiet ride, class-leading efficiency and safe handling on wet.",
        sizes: ["205/55R16", "225/50R17"],
        url: "https://www.continental-tires.com/uk/en/b2c/car/tires/premiumcontact-7.html"
      },
      {
        id: "allSeasonContact",
        model: "AllSeasonContact 2",
        type: "All-Season",
        img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=90",
        imgAlt: "Continental AllSeasonContact, detailed tread and groove shot",
        desc: "Advanced all-season with high mileage and wet safety.",
        sizes: ["205/55R16", "225/45R17"],
        url: "https://www.continental-tires.com/uk/en/b2c/car/tires/allseasoncontact-2.html"
      },
      {
        id: "winterContactTS870",
        model: "WinterContact TS 870",
        type: "Winter",
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=2048&q=90",
        imgAlt: "Continental WinterContact, winter tread on snowy background",
        desc: "Superb winter braking and snow handling, for confidence in cold.",
        sizes: ["195/65R15", "205/60R16"],
        url: "https://www.continental-tires.com/uk/en/b2c/car/tires/wintercontact-ts870.html"
      }
    ]
  },
  bridgestone: {
    name: "Bridgestone",
    types: [
      {
        id: "turanza",
        model: "Turanza T005",
        type: "Touring",
        img: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Group of stacked Bridgestone tyres in a clean indoor setting",
        desc: "Premium touring: quiet, outstanding wet grip, proven efficiency.",
        sizes: ["195/65R15", "205/60R16"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/turanza-t005"
      },
      {
        id: "potenzaSport",
        model: "Potenza Sport",
        type: "Performance",
        img: "https://images.pexels.com/photos/1707826/pexels-photo-1707826.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Bridgestone Potenza Sport macro UHP tyre",
        desc: "Maximum cornering, quick response: Bridgestone’s top ultra-high performance model.",
        sizes: ["225/40R18", "235/45R17"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/potenza-sport"
      },
      {
        id: "blizzak",
        model: "Blizzak LM005",
        type: "Winter",
        img: "https://images.pexels.com/photos/1183504/pexels-photo-1183504.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Bridgestone Blizzak close-up with winter context",
        desc: "Exceptional winter control, engineered for snow/slush with advanced silica.",
        sizes: ["205/55R16", "225/45R17"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/blizzak-lm005"
      },
      {
        id: "weatherControlA005",
        model: "Weather Control A005",
        type: "All-Season",
        img: "https://images.pexels.com/photos/2884685/pexels-photo-2884685.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Bridgestone Weather Control A005, profile on wet road",
        desc: "All-season performance with advanced silica for wet & winter.",
        sizes: ["205/55R16", "215/50R17"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/weather-control-a005"
      }
    ]
  }
};

// fallback to Pirelli for unknown brands (minimal, robust)
function getDemoBrand(brand) {
  return DEMO_BRAND_TYPES[brand.id] || DEMO_BRAND_TYPES.pirelli;
}

// PUBLIC_INTERFACE
function TyreBrandDetail({ brand, onBack }) {
  const { types, name } = getDemoBrand(brand);
  const [selected, setSelected] = useState(types[0]?.id);

  // Animate card grid with subtle Porsche fade-up per card
  const gridVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.04 + i * 0.13,
        duration: 0.33,
        type: "spring",
        stiffness: 61,
        damping: 20,
      }
    }),
    exit: { opacity: 0, y: 14, transition: { duration: 0.13 } }
  };

  return (
    <div className="ts-brand-detail-outer" data-testid="brand-detail-view">
      {/* HEADER BAR */}
      <div className="ts-brand-detail-topbar" aria-label="TyreSense navigation bar" role="banner">
        <button className="ts-detail-back-btn" onClick={onBack} aria-label="Go back to brand selection">
          ← Back
        </button>
        <div aria-hidden="true" className="ts-brand-navbar-center-logo">
          <AnimatedCarIntro asLogo />
        </div>
      </div>
      {/* MAIN CONTAINER */}
      <div className="ts-brand-detail-container">
        <div className="brand-detail-breadcrumb">Explore Tyre Brands &nbsp;/&nbsp; {name}</div>
        <div className="brand-detail-headline">{name} - Tyre Range</div>
        {/* Minimal, responsive card grid */}
        <div className="porsche-type-card-grid">
          <AnimatePresence>
            {types.map((type, i) => (
              <motion.div
                className={`porsche-type-card${selected === type.id ? " selected" : ""}`}
                key={type.id}
                tabIndex={0}
                role="button"
                aria-label={`Select ${type.model} ${type.type}`}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={gridVariants}
                exit="exit"
                onClick={() => setSelected(type.id)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") setSelected(type.id);
                }}
                style={{
                  background: "#fff",
                  boxShadow: "0 5px 22px #cfd2d651"
                }}
              >
                <div className="porsche-type-card-img-row" style={{ background: "#edeef0" }}>
                  <img
                    src={type.img}
                    alt={type.imgAlt || `${name} ${type.model} tyre`}
                    className="porsche-type-card-img"
                    loading="lazy"
                    draggable={false}
                    style={{ borderRadius: '16px', maxWidth: '78%', maxHeight: 146 }}
                  />
                </div>
                <div className="porsche-type-card-info-row" style={{ padding: "25px 18px 18px 18px", gap: "7px" }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 8 }}>
                    <span className="porsche-type-model" style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em"
                    }}>{type.model}</span>
                    <span className="porsche-type-kind" style={{
                      color: "#b4081b",
                      fontWeight: 700,
                      fontSize: "1rem"
                    }}>{type.type}</span>
                  </div>
                  <div className="porsche-type-desc" style={{
                    color: "#7d7d85",
                    fontWeight: 420,
                    fontSize: "0.97rem",
                    marginBottom: 0
                  }}>{type.desc}</div>
                  <span className="porsche-type-sizes" style={{
                    color: "#232327",
                    fontWeight: 560,
                    fontSize: "0.98rem",
                  }}>
                    {type.sizes.join(" • ")}
                  </span>
                  <div style={{ marginTop: 11, display: "flex", flexDirection: "row", alignItems: "center", gap: 16 }}>
                    <a href={type.url} target="_blank" rel="noopener noreferrer"
                      className="porsche-type-select-btn"
                      style={{
                        background: "#fff",
                        color: selected === type.id ? "#b4081b" : "#111216",
                        border: selected === type.id ? "1.7px solid #b4081b" : "1.3px solid #111216",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: ".07em",
                        padding: "8px 21px",
                        fontFamily: "inherit",
                        fontSize: "1rem"
                      }}
                      tabIndex={0}
                      aria-label={`Go to official details/buy for ${type.model} ${type.type}`}
                      onClick={e => e.stopPropagation()}
                    >{selected === type.id ? "Official Site" : "Details"}</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TyreBrandDetail;
