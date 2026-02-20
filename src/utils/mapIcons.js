import L from "leaflet";

// Define colors for densities
const colors = {
  high: "#ef4444",   // Red
  medium: "#facc15", // Yellow
  low: "#22c55e",    // Green
};

export const createDensityIcon = (density) => {
  const color = colors[density] || colors.low; // Default to low (green)

  return L.divIcon({
    className: "custom-pin-icon",
    html: `
      <div style="
        background-color: ${color};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        position: relative;
        top: -8px;
        left: -8px;
      "></div>
    `,
    iconSize: [0, 0], // DivIcon doesn't need explicit size if styled
    iconAnchor: [0, 0], // Center the point
    popupAnchor: [0, -10],
  });
};
