import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TyreBrandDetail.css";
import TyreLogoSVG from "./TyreLogoSVG";

/**
 * PUBLIC_INTERFACE
 * TyreBrandDetail
 *
 * Displays featured flagship tyres for a selected brand.
 * Each tyre card includes product image, name, and a "Buy Now" button linking to official site.
 * Purely visual Porsche-inspired card grid.
 * 
 * Props:
 * - brand: { id: string } (one of 'michelin', 'bridgestone', 'continental', 'goodyear', 'pirelli')
 * - onBack: function - callback for back navigation
 */

// Hardcoded tyre data by brand (URLs and product links)
const TYRE_BRAND_DATA = {
  michelin: {
    name: "Michelin",
    tyres: [
      {
        name: "Pilot Sport 4",
        image_url:
          "https://media.michelin.co.uk/_next/image?url=https%3A%2F%2Fdam.michelin.com%2Fmi%2Ff8db3dd0-0e2a-40c8-810b-d4e493b7e2e0%2Fsport4_2021_2.png&w=3840&q=75",
        product_url:
          "https://www.michelin.co.uk/auto/tyres/michelin-pilot-sport-4",
      },
      {
        name: "Pilot Sport 5",
        image_url:
          "https://media.michelin.co.uk/_next/image?url=https%3A%2F%2Fdam.michelin.com%2Fmi%2F55f5b825-26f6-4282-82bf-429e3ccd03a0%2Fsport5.png&w=3840&q=75",
        product_url:
          "https://www.michelin.co.uk/auto/tyres/michelin-pilot-sport-5",
      },
      {
        name: "Primacy 4",
        image_url:
          "https://media.michelin.co.uk/_next/image?url=https%3A%2F%2Fdam.michelin.com%2Fmi%2F6bf1d0f9-5542-4feb-9f1e-586726ca71d6%2Fprimacy4_2019_1.png&w=3840&q=75",
        product_url: "https://www.michelin.co.uk/auto/tyres/michelin-primacy-4",
      },
      {
        name: "CrossClimate 2",
        image_url:
          "https://media.michelin.co.uk/_next/image?url=https%3A%2F%2Fdam.michelin.com%2Fmi%2F30bad3fb-7215-41d1-827a-14e776492d44%2Fcrossclimate2_2021.png&w=3840&q=75",
        product_url:
          "https://www.michelin.co.uk/auto/tyres/michelin-crossclimate-2",
      },
    ],
  },
  bridgestone: {
    name: "Bridgestone",
    tyres: [
      {
        name: "Turanza T005",
        image_url:
          "https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/filters/tyre-turanza-t005.png",
        product_url:
          "https://www.bridgestone.co.uk/our-products/car-tyres/turanza-t005",
      },
      {
        name: "Potenza Sport",
        image_url:
          "https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/filters/tyre-potenza-sport.png",
        product_url:
          "https://www.bridgestone.co.uk/our-products/car-tyres/potenza-sport",
      },
      {
        name: "Blizzak LM005",
        image_url:
          "https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/products/filters/BLIZZAK_LM005-Filter-Image.png",
        product_url:
          "https://www.bridgestone.co.uk/our-products/car-tyres/blizzak-lm005",
      },
      {
        name: "Weather Control A005",
        image_url:
          "https://www.bridgestone.co.uk/content/dam/bridgestone/consumer/products/filters/WEATHER_CONTROL_A005-Filter-Image.png",
        product_url:
          "https://www.bridgestone.co.uk/our-products/car-tyres/weather-control-a005",
      },
    ],
  },
  continental: {
    name: "Continental",
    tyres: [
      {
        name: "PremiumContact 7",
        image_url:
          "https://blobs.continental-tires.com/www8/servlet/image/886768/dyn960x480/img-premiumcontact-7-3-4.png",
        product_url:
          "https://www.continental-tires.com/uk/en/b2c/car/tires/premiumcontact-7.html",
      },
      {
        name: "SportContact 7",
        image_url:
          "https://blobs.continental-tires.com/www8/servlet/image/874348/dyn960x480/img-sportcontact-7-3-4.png",
        product_url:
          "https://www.continental-tires.com/uk/en/b2c/car/tires/sportcontact-7.html",
      },
      {
        name: "AllSeasonContact 2",
        image_url:
          "https://blobs.continental-tires.com/www8/servlet/image/979369/dyn960x480/img-allseasoncontact-2-3-4.png",
        product_url:
          "https://www.continental-tires.com/uk/en/b2c/car/tires/allseasoncontact-2.html",
      },
      {
        name: "WinterContact TS 870",
        image_url:
          "https://blobs.continental-tires.com/www8/servlet/image/926831/dyn960x480/img-wintercontact-ts-870-3-4.png",
        product_url:
          "https://www.continental-tires.com/uk/en/b2c/car/tires/wintercontact-ts870.html",
      },
    ],
  },
  goodyear: {
    name: "Goodyear",
    tyres: [
      {
        name: "Eagle F1 Asymmetric 6",
        image_url:
          "https://www.goodyear.eu/on/demandware.static/-/Sites-goodyear-uk-library/default/dwadd850d7/images/tyres/library/1280x960/Eagle%20F1%20Asymmetric%206_1280x960_3-4.png",
        product_url:
          "https://www.goodyear.eu/en_gb/consumer/tires/eagle-f1-asymmetric-6.GAEA6.html",
      },
      {
        name: "EfficientGrip Performance 2",
        image_url:
          "https://www.goodyear.eu/on/demandware.static/-/Sites-goodyear-uk-library/default/dw2c119540/images/tyres/library/1280x960/EfficientGrip_Performance_2_1280x960_3-4.png",
        product_url:
          "https://www.goodyear.eu/en_gb/consumer/tires/efficientgrip-performance-2.EFFIGP2.html",
      },
      {
        name: "Vector 4Seasons Gen-3",
        image_url:
          "https://www.goodyear.eu/on/demandware.static/-/Sites-goodyear-uk-library/default/dw37dbb45c/images/tyres/library/1280x960/Vector_4Seasons_Gen-3_1280x960_3-4.png",
        product_url:
          "https://www.goodyear.eu/en_gb/consumer/tires/vector-4seasons-gen-3.VE4SG3.html",
      },
    ],
  },
  pirelli: {
    name: "Pirelli",
    tyres: [
      {
        name: "P Zero",
        image_url:
          "https://www.pirelli.com/globalassets/tyres/prodotti-auto/pzero/pzero-hero-mobile.png",
        product_url: "https://www.pirelli.com/tyres/en-ww/pzero",
      },
      {
        name: "Cinturato P7",
        image_url:
          "https://www.pirelli.com/globalassets/tyres/prodotti-auto/cinturato-p7/cinturato-p7-hero-mobile.png",
        product_url: "https://www.pirelli.com/tyres/en-ww/cinturato/p7",
      },
      {
        name: "Cinturato All Season SF2",
        image_url:
          "https://www.pirelli.com/globalassets/tyres/prodotti-auto/cinturato-allseason-sf2/cinturato-all-season-sf2-hero-mobile.png",
        product_url: "https://www.pirelli.com/tyres/en-ww/cinturato/all-season",
      },
      {
        name: "Sottozero 3",
        image_url:
          "https://www.pirelli.com/globalassets/tyres/prodotti-auto/cinturato-winter/cinturato-winter-hero-mobile.png",
        product_url: "https://www.pirelli.com/tyres/en-ww/cinturato-winter",
      },
    ],
  },
};

function getBrandData(brand) {
  if (!brand || !brand.id) return TYRE_BRAND_DATA["pirelli"];
  return TYRE_BRAND_DATA[brand.id] || TYRE_BRAND_DATA["pirelli"];
}

const gridVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.09,
      duration: 0.27,
      type: "spring",
      stiffness: 62,
      damping: 18,
    },
  }),
  exit: { opacity: 0, y: 14, transition: { duration: 0.13 } },
};

function TyreBrandDetail({ brand, onBack }) {
  const { name, tyres } = getBrandData(brand);
  const [selected, setSelected] = useState(null);

  return (
    <div className="ts-brand-detail-outer" data-testid="brand-detail-view">
      {/* Topbar Header */}
      <header
        className="ts-brand-detail-topbar"
        role="banner"
        aria-label="TyreSense navigation bar"
      >
        <button
          className="ts-detail-back-btn"
          onClick={onBack}
          aria-label="Go back to brand selection"
          type="button"
        >
          ← Back
        </button>
        <div className="ts-animated-car-navbar" aria-hidden="true">
          <TyreLogoSVG className="ts-tyre-logo" />
          <span className="ts-animated-car-title">TyreSense</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="ts-brand-detail-container">
        <nav aria-label="Breadcrumb">
          <p className="brand-detail-breadcrumb">
            <span style={{ fontWeight: 600 }}>Explore Tyre Brands</span> <span style={{ color: "#b4081b" }}>/</span> {name}
          </p>
        </nav>
        <h1 className="brand-detail-headline">{name} – Featured Tyres</h1>
        <section className="porsche-type-card-grid" aria-label={`${name} tyre models`}>
          <AnimatePresence>
            {tyres.map((tyre, i) => (
              <motion.article
                key={tyre.name}
                className={`porsche-type-card${selected === tyre.name ? " selected" : ""}`}
                tabIndex={0}
                role="region"
                aria-label={`${tyre.name} tyre card`}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={gridVariants}
                custom={i}
                onClick={() => setSelected(tyre.name)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) {
                    e.preventDefault();
                    setSelected(tyre.name);
                  }
                }}
              >
                <div className="porsche-type-card-img-row">
                  <img
                    src={tyre.image_url}
                    alt={`${name} ${tyre.name} tyre`}
                    className="porsche-type-card-img"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="porsche-type-card-info-row">
                  <h2 className="porsche-type-model">{tyre.name}</h2>
                  {/* Description or feature block can be added here, if available */}
                  <a
                    href={tyre.product_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="porsche-type-select-btn"
                    tabIndex={0}
                    aria-label={`Buy ${name} ${tyre.name} on official site`}
                    onClick={e => e.stopPropagation()}
                  >
                    Buy Now
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

export default TyreBrandDetail;
