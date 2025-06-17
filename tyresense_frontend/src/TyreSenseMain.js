import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TyreTypesShowcase from "./tyretypesShowcase";

/**
 * TyreSenseMain
 * Main page for tyre brand selection.
 * - Renders a brand showcase.
 * - On brand select, navigates to the detailed tyre range for that brand.
 */
function TyreSenseMain() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    // Navigate to the tyre range page for the selected brand
    if (brand && brand.id) {
      navigate(`/tyres/brand/${brand.id}`);
    }
  };

  return (
    <main>
      <TyreTypesShowcase onBrandSelect={handleBrandSelect} />
    </main>
  );
}

export default TyreSenseMain;
