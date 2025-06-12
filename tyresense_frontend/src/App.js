import React from "react";
import "./App.css";
import TyreSenseMain from "./TyreSenseMain";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      {/* Render the TyreSense main shell container instead of the template */}
      <TyreSenseMain />
    </div>
  );
}

export default App;