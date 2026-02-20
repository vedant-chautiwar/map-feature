const MapLegend = () => {
  return (
    <div
      className="leaflet-bottom leaflet-right"
      style={{ pointerEvents: "auto", margin: "20px" }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          fontFamily: "system-ui, sans-serif",
          fontSize: "12px",
          minWidth: "140px",
        }}
      >
        <h4 style={{ margin: "0 0 8px", fontWeight: "600", color: "#374151" }}>
          Density Levels
        </h4>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#ef4444",
              borderRadius: "50%",
              marginRight: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></span>
          <span>High Density</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#facc15",
              borderRadius: "50%",
              marginRight: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></span>
          <span>Medium Density</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#22c55e",
              borderRadius: "50%",
              marginRight: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          ></span>
          <span>Low Density</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
