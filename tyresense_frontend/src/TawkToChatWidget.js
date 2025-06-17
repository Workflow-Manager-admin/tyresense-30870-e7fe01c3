// src/components/TawkToChatWidget.js -- This file should ONLY contain this code.
import React, { useEffect } from 'react';

const TawkToChatWidget = () => {
  useEffect(() => {
    // Check if Tawk.to script is already loaded to prevent multiple loads
    if (window.Tawk_API && window.Tawk_API.isLoaded) {
      return;
    }

    // Tawk.to embed script provided by their setup, with YOUR specific IDs
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function(){
      var s1 = document.createElement("script"),
          s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      // Your unique Tawk.to embed URL goes here
      s1.src = 'https://embed.tawk.to/685177be9445d6190c8c7723/1itv3ng4m'; // <--- YOUR UNIQUE URL
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // No specific cleanup needed for a persistent global widget
    return () => {};
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component doesn't render any visible JSX
};

export default TawkToChatWidget;