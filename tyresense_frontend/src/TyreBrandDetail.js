import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCarIntro from "./AnimatedCarIntro";
import "./TyreBrandDetail.css";

/**
 * PUBLIC_INTERFACE
 * TyreBrandDetail:
 * Individual tyre brand menu page, fully styled per Porsche menu sample:
 * - Strict page structure: header, headline, grid of long luxury cards (no legacy or neon)
 * - Implements all details of Porsche-inspired layout, color palette, card, and type hierarchy from style_guide.md
 */

/*
 * Expanded and refined: Each brand gets more tyre models, curated real tyre images, and clean, consistent card details.
 * Real image links based on curated_tyre_images.txt for primary models, with unique alt text.
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
        img: "https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Michelin Pilot Sport 5 in deep contrast lighting",
        desc: "Maximum performance street tyre: track-derived compound for spirited drivers.",
        sizes: ["225/40R18", "235/45R18", "255/35R19"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-pilot-sport-5"
      },
      {
        id: "crossclimate2",
        model: "CrossClimate 2",
        type: "All-Weather",
        img: "https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Michelin CrossClimate, all-weather turn",
        desc: "True all-weather safety: dry grip and advanced water dispersion.",
        sizes: ["215/55R17", "225/50R17"],
        url: "https://www.michelin.co.uk/auto/tyres/michelin-crossclimate-2"
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
        img: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Bridgestone Potenza Sport - out-of-the-pit fresh",
        desc: "Maximum cornering, quick response: Bridgestone’s top ultra-high performance model.",
        sizes: ["225/40R18", "235/45R17"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/potenza-sport"
      },
      {
        id: "blizzak",
        model: "Blizzak LM005",
        type: "Winter",
        img: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&w=2048&q=90",
        imgAlt: "Bridgestone Blizzak stacked, ready for snow",
        desc: "Exceptional winter control, engineered for snow/slush with advanced silica.",
        sizes: ["205/55R16", "225/45R17"],
        url: "https://www.bridgestone.co.uk/our-products/car-tyres/blizzak-lm005"
      }
    ]
  }
};

function getDemoBrand(brand) {
  // fallback to Pirelli for unknown brands
  return DEMO_BRAND_TYPES[brand.id] || DEMO_BRAND_TYPES.pirelli;
}

// PUBLIC_INTERFACE
function TyreBrandDetail({ brand, onBack }) {
  const { types, name } = getDemoBrand(brand);
  const [selected, setSelected] = useState(types[0]?.id);

  // Animate card grid; subtle Porsche-like fade-up per card
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
      <div className="ts-brand-detail-topbar" aria-label="TyreSense navigation bar" role="banner">
        <button className="ts-detail-back-btn" onClick={onBack} aria-label="Go back to brand selection">
          ← Back
        </button>
        <div aria-hidden="true" className="ts-brand-navbar-center-logo">
          <AnimatedCarIntro asLogo />
        </div>
      </div>
      <div className="ts-brand-detail-container">
        <div className="brand-detail-breadcrumb">Explore Tyre Brands &nbsp;/&nbsp; {name}</div>
        <div className="brand-detail-headline">{name} - Tyre Range</div>
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
              >
                <div className="porsche-type-card-img-row">
                  <img
                    src={type.img}
                    alt={`${name} ${type.model} tyre`}
                    className="porsche-type-card-img"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="porsche-type-card-info-row">
                  <span className="porsche-type-model">{type.model}</span>
                  <span className="porsche-type-kind">{type.type}</span>
                  <span className="porsche-type-desc">{type.desc}</span>
                  <span className="porsche-type-sizes">{type.sizes.join(", ")}</span>
                  <button
                    className="porsche-type-select-btn"
                    tabIndex={0}
                    style={selected === type.id ? { border: "1.7px solid #b4081b", color: "#b4081b" } : undefined}
                    onClick={e => {
                      e.stopPropagation();
                      setSelected(type.id);
                    }}
                    aria-label={`Show details for ${type.model} ${type.type}`}
                  >
                    {selected === type.id ? "Selected" : "Show details"}
                  </button>
                  {selected === type.id && (
                    <span
                      className="porsche-type-buy-btn"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      Buy Now (In-app only)
                    </span>
                  )}
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
