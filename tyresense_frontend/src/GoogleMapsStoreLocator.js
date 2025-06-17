import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DEFAULT_CENTER = [51.5081, -0.1281]; // London
const DEFAULT_ZOOM = 13;

const TYRE_STORES = [
  { name: "QuickFit Tyres", position: [51.511, -0.1208] },
  { name: "Urban Tyre Centre", position: [51.503, -0.1357] },
  { name: "Prestige Wheels", position: [51.51, -0.142] },
  { name: "Rapid Tyre Services", position: [51.506, -0.129] },
  { name: "City Tyre Pros", position: [51.514, -0.122] },
];

// Component to center map on user's geolocation
function LocateUser() {
  const map = useMap();

  React.useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 15);
      },
      (err) => {
        // Could handle error or fallback
        console.warn("Geolocation unavailable, using default location");
      }
    );
  }, [map]);

  return null;
}

export default function LeafletStoreLocator() {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocateUser />
        {TYRE_STORES.map((store, idx) => (
          <Marker key={idx} position={store.position}>
            <Popup>{store.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
