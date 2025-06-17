import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in React Leaflet for marker icons (important for webpack setups)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DEFAULT_CENTER = [51.5081, -0.1281]; // Central London (fallback)
const DEFAULT_ZOOM = 13;
const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter"; // Standard Overpass API endpoint

// Function to generate the Overpass query
const generateOverpassQuery = (lat, lng, radius_m = 5000) => {
  // Increased radius slightly for more shops initially
  return `
    [out:json][timeout:60];
    (
      node["shop"="tyres"](around:${radius_m},${lat},${lng});
      way["shop"="tyres"](around:${radius_m},${lat},${lng});
      relation["shop"="tyres"](around:${radius_m},${lat},${lng});
    );
    out center;
    `;
};

// Component that pans/zooms to user's location if available and places a marker
// Also fetches nearby tyre shops based on user's location
function MapLogic({ setUserPosition, setTyreStores }) {
  const map = useMap();

  // Use useCallback to memoize the fetch function and prevent unnecessary re-renders
  const fetchTyreStores = useCallback(async (lat, lng) => {
    const query = generateOverpassQuery(lat, lng);
    try {
      const response = await fetch(OVERPASS_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newStores = data.elements.map(element => ({
        name: element.tags?.name || "Unnamed Tyre Shop", // Use 'name' tag, fallback to generic
        position: [element.lat || element.center.lat, element.lon || element.center.lon],
        id: element.id, // Use unique ID from Overpass
        address: element.tags?.addr ? Object.values(element.tags.addr).join(', ') : 'Address not available' // Basic address
      }));
      setTyreStores(newStores);
    } catch (error) {
      console.error("Error fetching tyre shops from Overpass API:", error);
      // Potentially set an error state or display a message to the user
    }
  }, [setTyreStores]); // Dependency on setTyreStores

  useEffect(() => {
    // If no geolocation, use default center for fetching
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported by this browser. Using default location.");
      setUserPosition(null); // Explicitly set to null if not found
      fetchTyreStores(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const userPos = [userLat, userLng];
        map.setView(userPos, 15); // Zoom in closer to user's location
        setUserPosition(userPos);
        fetchTyreStores(userLat, userLng); // Fetch based on user's location
      },
      (err) => {
        console.warn("Geolocation failed or denied:", err);
        // Fallback to default center if geolocation fails or is denied
        setUserPosition(null);
        fetchTyreStores(DEFAULT_CENTER[0], DEFAULT_CENTER[1]);
      }
    );

    // Optional: Fetch new stores when the map view changes (e.g., user drags map)
    // This can be resource-intensive, so enable with caution for MVP
    // const handleMoveEnd = () => {
    //   const center = map.getCenter();
    //   fetchTyreStores(center.lat, center.lng);
    // };
    // map.on('moveend', handleMoveEnd);
    // return () => {
    //   map.off('moveend', handleMoveEnd);
    // };

  }, [map, setUserPosition, fetchTyreStores]); // Dependencies for useEffect

  return null;
}

export default function LeafletStoreLocator() {
  const [userPosition, setUserPosition] = useState(null);
  const [tyreStores, setTyreStores] = useState([]); // State to hold fetched tyre stores

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={DEFAULT_CENTER} // Initial center, will be updated by LocateUser
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Pass setTyreStores to MapLogic so it can update the state */}
        <MapLogic setUserPosition={setUserPosition} setTyreStores={setTyreStores} />

        {userPosition && (
          <Marker position={userPosition}>
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Render fetched tyre stores */}
        {tyreStores.map((store) => (
          <Marker key={store.id} position={store.position}>
            <Popup>
              <strong>{store.name}</strong>
              <br />
              {store.address}
              {/* Add more details here from store.tags if available and relevant, e.g., phone, opening hours */}
              {store.tags?.phone && <><br/>Phone: {store.tags.phone}</>}
              {store.tags?.opening_hours && <><br/>Hours: {store.tags.opening_hours}</>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}