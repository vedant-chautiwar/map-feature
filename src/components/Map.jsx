import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import ClusterLayer from "./ClusterLayer";
import MapLegend from "./MapLegend";
import HeatLayer from "./HeatLayer";
import "leaflet/dist/leaflet.css";

// Helper to fit bounds to markers on load
function FitBounds({ data }) {
  const map = useMap();

  useEffect(() => {
    if (data && data.length > 0) {
      const bounds = data.map((p) => [p.lat, p.lng]);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [data, map]);

  return null;
}

// Component to recenter the map when user location changes
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15); // Zoom closer for local view
    }
  }, [center, map]);
  return null;
}

// Simulate fetching backend data near a location
const fetchNearbyProblems = (lat, lng) => {
  const problems = [];
  const count = 20 + Math.floor(Math.random() * 10); // 20-30 points

  for (let i = 0; i < count; i++) {
    // Generate random offset within ~1-2km
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;

    // Random density/severity
    const r = Math.random();
    const density = r > 0.7 ? "high" : r > 0.4 ? "medium" : "low";

    const types = [
      "Pothole",
      "Garbage Dump",
      "Street Light Issue",
      "Water Logging",
      "Traffic Congestion",
    ];
    const type = types[Math.floor(Math.random() * types.length)];

    problems.push({
      id: `local-${i}`,
      lat: lat + latOffset,
      lng: lng + lngOffset,
      density: density,
      areaName: `${type} #${i + 1}`, // Simple name for now
    });
  }
  return problems;
};

function Map() {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [heatData, setHeatData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Try to get User Location first
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);

        // 2. Generate/Fetch data around user
        console.log("Generating data around:", coords);
        const localData = fetchNearbyProblems(coords[0], coords[1]);
        setData(localData);
        setLoading(false);
      },
      (err) => {
        console.error("Error getting location:", err);
        // Do NOT load default Mumbai data. Just stop loading.
        setLoading(false);
        alert("Location access denied. Cannot show nearby problems.");
      },
    );
  }, []);

  // Update Heatmap data whenever 'data' changes
  useEffect(() => {
    if (data.length > 0) {
      const heatPoints = data.map((item) => ({
        latitude: item.lat,
        longitude: item.lng,
        intensity:
          item.density === "high" ? 1.0 : item.density === "medium" ? 0.6 : 0.3,
      }));
      setHeatData(heatPoints);
    }
  }, [data]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <MapContainer
        center={[19.076, 72.8777]} // Default Mumbai (just as a start point, will pan)
        zoom={11}
        minZoom={10}
        maxZoom={18}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Dynamic Bounds Fitting */}
        {!loading && <FitBounds data={data} />}

        {/* User Location Marker & Recenter */}
        {userLocation && (
          <>
            <RecenterMap center={userLocation} />
            <Marker position={userLocation}>
              <Popup>You are here</Popup>
            </Marker>
          </>
        )}

        {/* Density Heatmap (Underneath clusters) */}
        {!loading && <HeatLayer data={heatData} />}

        {/* Marker Clusters (On top) */}
        {!loading && <ClusterLayer data={data} />}

        <MapLegend />
      </MapContainer>
    </div>
  );
}

export default Map;
