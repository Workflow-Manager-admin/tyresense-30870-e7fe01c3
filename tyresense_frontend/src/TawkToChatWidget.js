// src/TawkToChatWidget.js
import React, { useEffect } from 'react';

const TawkToChatWidget = () => {
  useEffect(() => {
    // Check if Tawk.to script is already loaded to prevent multiple loads
    // This is important for development (hot reloading) and ensures it only runs once
    if (window.Tawk_API && window.Tawk_API.isLoaded) {
      // Tawk.to script is already loaded, do nothing
      return;
    }

    // This is the JavaScript code Tawk.to provides,
    // adapted to be injected dynamically into the document.
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      // !! IMPORTANT: REPLACE 'YOUR_PROPERTY_ID' AND 'YOUR_WIDGET_ID'
      // WITH THE ACTUAL VALUES FROM YOUR TAWK.TO DASHBOARD !!
      s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Optional: Cleanup function (less critical for a global chat widget)
    return () => {
      // If you needed to remove the widget on component unmount,
      // you would put logic here, e.g., Tawk_API.hideWidget();
      // However, for a persistent chat widget, this isn't usually necessary.
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render any visible JSX itself, Tawk.to injects its own widget
};

export default TawkToChatWidget;