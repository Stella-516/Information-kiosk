import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuInfo() {
  const nav = useNavigate();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  const exhibitionZones = [
    {
      id: "north",
      name: "서울시립북부장애인종합복지관 지관 전시존",
      color: "#FFB6C1",
    },
    { id: "dawoon", name: "다운복지관 전시존", color: "#FFD700" },
    { id: "veterans", name: "서울시립상이군경복지관 전시존", color: "#FF6B6B" },
    {
      id: "nowon",
      name: "노원발달장애인평생교육센터 전시존",
      color: "#90EE90",
    },
    { id: "cerebral", name: "서울시립뇌성마비복지관 전시존", color: "#87CEEB" },
    {
      id: "parents",
      name: "서울장애인부모연대 노원지대 전시존",
      color: "#4169E1",
    },
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 68px - 72px)",
        background: "#efeff3",
        color: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "min(1280px, 92vw)",
          height: "min(680px, 90%)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            height: "calc(100% - 200px)",
            background: "#e9e9ee",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              background: "#fff",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <img
              src="/assets/exhibit-map.png"
              alt="전시장 안내 지도"
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: 8,
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 10,
            height: "120px",
          }}
        >
          {exhibitionZones.slice(0, 3).map((zone) => (
            <button
              key={zone.id}
              style={{
                gridColumn: "span 2",
                background: zone.color,
                border: "none",
                borderRadius: 10,
                padding: "10px 8px",
                fontSize: 16,
                fontWeight: 800,
                color: ["#FFD700", "#90EE90", "#87CEEB", "#FFB6C1"].includes(
                  zone.color
                )
                  ? "#000"
                  : "#fff",
                cursor: "pointer",
              }}
              onClick={() => {}}
            >
              {zone.name}
            </button>
          ))}

          <button
            style={{
              gridColumn: "span 2",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 8px",
              fontSize: 16,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "#ff4d4f" }}>♀</span>
            <span style={{ color: "#2f6bff" }}>♂</span>
            화장실
          </button>

          {exhibitionZones.slice(3).map((zone) => (
            <button
              key={zone.id}
              style={{
                gridColumn: "span 2",
                background: zone.color,
                border: "none",
                borderRadius: 10,
                padding: "10px 8px",
                fontSize: 16,
                fontWeight: 800,
                color: ["#FFD700", "#90EE90", "#87CEEB", "#FFB6C1"].includes(
                  zone.color
                )
                  ? "#000"
                  : "#fff",
                cursor: "pointer",
              }}
              onClick={() => {}}
            >
              {zone.name}
            </button>
          ))}

          <button
            style={{
              gridColumn: "span 2",
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 8px",
              fontSize: 16,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onClick={() => nav("/works")}
          >
            🏆 작품존
          </button>
        </div>
      </div>
    </div>
  );
}
