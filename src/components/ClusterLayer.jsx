import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { createDensityIcon } from "../utils/mapIcons";

const ClusterLayer = ({ data }) => {
  const map = useMap();
  const markerClusterGroupRef = useRef(null);

  useEffect(() => {
    // Initialize cluster group
    if (!markerClusterGroupRef.current) {
      markerClusterGroupRef.current = L.markerClusterGroup({
        chunkedLoading: true,
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        // Customize cluster icons if needed
      });
      map.addLayer(markerClusterGroupRef.current);
    }

    const clusterGroup = markerClusterGroupRef.current;

    // Clear existing markers
    clusterGroup.clearLayers();

    // Add new markers
    const markers = data.map((point) => {
      const marker = L.marker([point.lat, point.lng], {
        icon: createDensityIcon(point.density),
        title: point.areaName,
      });

      marker.bindPopup(`
        <div style="font-family: system-ui; min-width: 150px;">
          <h3 style="margin: 0 0 4px; font-size: 16px; font-weight: 600;">${point.areaName}</h3>
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Density: 
            <span style="font-weight: 600; text-transform: capitalize; color: ${
              point.density === "high"
                ? "#dc2626"
                : point.density === "medium"
                  ? "#ca8a04"
                  : "#16a34a"
            }">${point.density}</span>
          </p>
        </div>
      `);

      return marker;
    });

    clusterGroup.addLayers(markers);

    // cleanup
    return () => {
      // We don't necessarily want to remove the layer on re-render if data hasn't changed,
      // but strict React effect cleanup suggests we should.
      // For performance with large datasets, one might optimize this.
      // Here we trust the effect dependency array.
    };
  }, [map, data]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (markerClusterGroupRef.current) {
        map.removeLayer(markerClusterGroupRef.current);
      }
    };
  }, [map]);

  return null;
};

export default ClusterLayer;
