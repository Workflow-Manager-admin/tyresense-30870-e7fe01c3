import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Import Leaflet CSS globally to ensure map styles work everywhere
import 'leaflet/dist/leaflet.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
