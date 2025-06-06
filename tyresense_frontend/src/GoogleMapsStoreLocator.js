import React, { useEffect, useRef, useState } from "react";

// PUBLIC_INTERFACE
/**
 * GoogleMapsStoreLocator
 * Displays an interactive Google Map centered on user's current position, with markers for nearby tyre stores.
 * Fallbacks to London if geolocation is unavailable/denied.
 * Markers are displayed for several mock tyre store locations.
 *
 * --- API KEY SETUP ---
 * You MUST provide your own Google Maps JavaScript API key for this to work.
 *  - Recommended: add REACT_APP_GOOGLE_MAPS_API_KEY=<your-key> to your .env file in project root.
 *  - The component will load the script using process.env.REACT_APP_GOOGLE_MAPS_API_KEY.
 *  - Alternatively, replace the string in the code directly for testing ONLY (not for production).
 *
 * This component does not use any external dependencies beyond the base Google Maps web JS API.
 */
function GoogleMapsStoreLocator() {
  const mapRef = useRef();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);

  // DIAGNOSTIC: Log what key is found (DEV ONLY: Remove after fix)
  useEffect(() => {
    // eslint-disable-next-line
    // Only for debugging API key issue in dev: log to console
    // Check if REACT_APP_GOOGLE_MAPS_API_KEY is injected as a global variable (replace at build time)
    const injectedKey = typeof process !== "undefined" && process.env && process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      : undefined;
    // Masked key for console, if present
    const maskedKey =
      injectedKey
        ? injectedKey.substr(0, 5) + '...'
        : String(injectedKey);
    // Friendly browser console note (will show 'undefined...' if not injected)
    // eslint-disable-next-line no-console
    console.log('[TyreSense] REACT_APP_GOOGLE_MAPS_API_KEY from env:', maskedKey);
  }, []);

  // Default to Central London if no location found (Trafalgar Square)
  const DEFAULT_CENTER = { lat: 51.5081, lng: -0.1281 };
  const DEFAULT_ZOOM = 13;

  // Example (mock) nearby tyre stores, relative to London
  const TYRE_STORES = [
    { name: "QuickFit Tyres", lat: 51.511, lng: -0.1208 },
    { name: "Urban Tyre Centre", lat: 51.503, lng: -0.1357 },
    { name: "Prestige Wheels", lat: 51.51, lng: -0.142 },
    { name: "Rapid Tyre Services", lat: 51.506, lng: -0.129 },
    { name: "City Tyre Pros", lat: 51.514, lng: -0.122 },
  ];

  // Load Google Maps JS API (idempotent for SPA)
  useEffect(() => {
    // In production build, env vars like REACT_APP_GOOGLE_MAPS_API_KEY are replaced at build time.
    const MAPS_API_KEY =
      (typeof process !== "undefined" && process.env && process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
        ? process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        : window.REACT_APP_GOOGLE_MAPS_API_KEY // fallback in case it's injected globally
        || "<YOUR_GOOGLE_MAPS_KEY>";

    // If missing or left as placeholder, show user-friendly, production-safe message (no stacktrace!)
    if (!MAPS_API_KEY || MAPS_API_KEY.includes("<YOUR_GOOGLE_MAPS_KEY>")) {
      setError("Map unavailable - please contact support or check configuration");
      return;
    }

    // If maps already loaded (SPA hot reload defense)
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }
    if (document.getElementById("google-maps-js")) {
      // Already loading elsewhere, still set up error catch handler
      window.gm_authFailure = () =>
        setError("Map unavailable - please contact support or check configuration");
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMapGoogleTyreSense&libraries=places`;
    window.gm_authFailure = () =>
      setError("Map unavailable - please contact support or check configuration");
    window.initMapGoogleTyreSense = () => setScriptLoaded(true);
    script.onerror = () =>
      setError("Map unavailable - please contact support or check configuration");
    document.body.appendChild(script);
    // Clean up on unmount so no lingering handlers
    return () => {
      window.initMapGoogleTyreSense = undefined;
      window.gm_authFailure = undefined;
    };
  }, []);

  // On mount + scriptLoaded: initialize map, request geolocation
  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;
    let center = DEFAULT_CENTER;
    let userMarker = null;

    // Map options
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: DEFAULT_ZOOM,
      styles: [
        // Porsche-inspired muted dark mode
        { elementType: "geometry", stylers: [{ color: "#18181c" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#232327" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#edeef0" }] },
        {
          featureType: "poi.business",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#232327" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#222226" }]
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#2f2f33" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#7d7d85" }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    });

    // Try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          center = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          map.setCenter(center);
          map.setZoom(15);

          // Marker for user's location
          userMarker = new window.google.maps.Marker({
            position: center,
            map,
            title: "You are here",
            icon: {
              url:
                "data:image/svg+xml;utf-8," +
                encodeURIComponent(
                  `<svg height="34" width="34" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="17" r="13" fill="#edeef0" stroke="#b4081b" stroke-width="2.4"/>
                    <circle cx="17" cy="17" r="5.9" fill="#7d7d85"/>
                  </svg>`
                ),
              scaledSize: new window.google.maps.Size(34, 34),
              anchor: new window.google.maps.Point(17, 17)
            }
          });
        },
        (err) => {
          setError("Geolocation unavailable. Showing default area.");
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setError("Geolocation not supported by this browser.");
    }

    // Add mock store markers
    TYRE_STORES.forEach((store, idx) => {
      new window.google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        map,
        title: store.name,
        icon: {
          url:
            "data:image/svg+xml;utf-8," +
            encodeURIComponent(
              `<svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="15" cy="20" rx="10" ry="6.4" fill="#232327" stroke="#b4081b" stroke-width="2.2"/>
                <ellipse cx="15" cy="20" rx="4.5" ry="2.7" fill="#edeef0"/>
                <circle cx="15" cy="11.5" r="7" fill="#edeef0" stroke="#b4081b" stroke-width="2.2"/>
                <circle cx="15" cy="11.5" r="3.5" fill="#232327" />
              </svg>`
            ),
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 20)
        }
      });
    });

    // Clean up old map instance on unmount
    return () => {
      if (userMarker) userMarker.setMap(null);
    };
  }, [scriptLoaded]);

  // Hide the entire map container and only show the friendly error if API key is missing
  const isAPIKeyMissing =
    error === "Map unavailable - please contact support or check configuration";

  if (isAPIKeyMissing) {
    return (
      <div
        className="ts-map-error"
        style={{
          color: "#ffe600",
          background: "#191932",
          border: "2px solid #ffe600",
          borderRadius: "14px",
          padding: "22px 18px",
          fontWeight: 600,
          minHeight: "110px",
          fontSize: "1.14rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          textAlign: "center",
          width: "100%",
        }}
        aria-live="polite"
      >
        Map unavailable - please contact support or check configuration
      </div>
    );
  }

  // If showing some other error (e.g., geolocation) or map, show map container as usual
  return (
    <div className="ts-map-container">
      {error ? (
        // Show only the user-friendly message WITHOUT any error detail
        <div
          className="ts-map-error"
          style={{
            color: "#ffe600",
            background: "#191932",
            border: "2px solid #ffe600",
            borderRadius: "14px",
            padding: "22px 18px",
            fontWeight: 600,
            minHeight: "110px",
            fontSize: "1.14rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            textAlign: "center",
          }}
          aria-live="polite"
        >
          Map unavailable - please contact support or check configuration
        </div>
      ) : (
        <div
          ref={mapRef}
          className="ts-map-canvas"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "170px",
            borderRadius: "13px",
            boxShadow: "0 5px 22px #b4081b14, 0 1px 16px #edeef013",
            background: "#18181c",
          }}
          aria-label="Nearby tyre stores map"
          tabIndex={0}
        ></div>
      )}
    </div>
  );
}

export default GoogleMapsStoreLocator;
