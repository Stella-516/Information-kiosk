import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { artworks } from "../data/artworksData";

export default function MunuQR() {
  const nav = useNavigate();

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);

  // QR 코드가 있는 모든 작품 필터링
  const artworksWithQR = artworks.filter((artwork) => artwork.qrCode);

  return (
    <div
      style={{
        height: "calc(100vh - 68px - 72px)",
        background: "#efeff3",
        color: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        overflow: "auto",
      }}
    >
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "800",
            color: "#111",
          }}
        >
          전체 작품 설명 QR
        </h1>
        <p
          style={{
            margin: "15px 0 0 0",
            fontSize: "18px",
            color: "#666",
          }}
        >
          오디오를 들으실 분은 QR을 카메라로 찍어주세요!
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1400px",
          padding: "0 20px",
        }}
      >
        {artworksWithQR.map((artwork) => (
          <div
            key={artwork.id}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "700",
                textAlign: "center",
                color: "#111",
                lineHeight: "1.3",
                minHeight: "42px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {artwork.title.ko}
            </h3>
            
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#666",
                fontWeight: "600",
              }}
            >
              {artwork.artist}
            </p>

            <div
              style={{
                width: "150px",
                height: "150px",
                background: "#fff",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #e0e0e0",
                overflow: "hidden",
                padding: "8px",
              }}
            >
              <img
                src={artwork.qrCode}
                alt={`${artwork.title.ko} QR 코드`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "#999",
                textAlign: "center",
              }}
            >
              {artwork.org}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
