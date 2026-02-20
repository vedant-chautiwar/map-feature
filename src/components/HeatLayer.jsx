import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const HeatLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !data || data.length === 0) return;

    // Check if map has size, otherwise wait (rare case but good safety)
    if (!map.getSize().x || !map.getSize().y) {
      return;
    }

    const points = data.map((p) => [p.latitude, p.longitude, p.intensity]);
    // Increase radius and blur for better visibility, maxZoom to scale correctly
    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
    }).addTo(map);

    return () => {
      // Safe removal
      if (map && heat) {
        map.removeLayer(heat);
      }
    };
  }, [map, data]);

  return null;
};

export default HeatLayer;
