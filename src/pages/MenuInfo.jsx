import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import point from "../assets/point.png";

export default function MenuInfo() {
  const nav = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, []);


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
          width: "min(1600px, 99vw)",
          height: "min(1000px, 99%)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            height: "calc(100% - 128px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "120px",
          }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 15,
              padding: "35px 100px",
              fontSize: 26,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 15,
              cursor: "pointer",
              minWidth: "450px",
              height: "100%",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15, flex: 1, justifyContent: "center" }}>
              <span style={{ color: "#ff4d4f", fontSize: 32 }}>♀</span>
              <span style={{ color: "#2f6bff", fontSize: 32 }}>♂</span>
              장애인 화장실
            </div>
            
            <img
              src={point}
              alt="클릭 안내"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                marginRight: "10px",
              }}
            />
          </button>
        </div>
      </div>

      {/* 장애인 화장실 안내 모달 */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "40px 50px",
              maxWidth: "600px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: 15,
                right: 20,
                background: "none",
                border: "none",
                fontSize: 30,
                cursor: "pointer",
                color: "#666",
                fontWeight: "bold",
              }}
            >
              ×
            </button>

            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  marginBottom: 20,
                  color: "#111",
                  textAlign: "center",
                }}
              >
                장애인 화장실 안내
              </h2>

              <div
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "#333",
                  marginBottom: 30,
                  textAlign: "left",
                }}
              >
                <p style={{ marginBottom: 20 }}>
                  <strong style={{ fontSize: 20, color: "#111" }}>📍 위치 안내</strong>
                </p>
                
                <div style={{ paddingLeft: 10, marginBottom: 20 }}>
                  <p style={{ marginBottom: 10, display: "flex", alignItems: "flex-start" }}>
                    <span style={{ marginRight: 8, fontWeight: "bold", color: "#2f6bff" }}>1.</span>
                    <span>현재층 엘리베이터를 타고 <strong>L층</strong> 버튼 누르기</span>
                  </p>
                  <p style={{ marginBottom: 10, display: "flex", alignItems: "flex-start" }}>
                    <span style={{ marginRight: 8, fontWeight: "bold", color: "#2f6bff" }}>2.</span>
                    <span>엘리베이터에서 내려서 앞으로 쭉 직진</span>
                  </p>
                  <p style={{ marginBottom: 10, display: "flex", alignItems: "flex-start" }}>
                    <span style={{ marginRight: 8, fontWeight: "bold", color: "#2f6bff" }}>3.</span>
                    <span>입구에 계신 <strong>관리자분께 문을 열어달라고 요청</strong></span>
                  </p>
                  <p style={{ marginBottom: 10, display: "flex", alignItems: "flex-start" }}>
                    <span style={{ marginRight: 8, fontWeight: "bold", color: "#2f6bff" }}>4.</span>
                    <span>입구를 지나 쭉 직진하면 <strong>코너쪽에 위치</strong></span>
                  </p>
                </div>

                <p style={{ marginBottom: 12 }}>
                  <strong>♿ 시설:</strong> 휠체어 접근 가능, 안전 손잡이 설치
                </p>
                <p style={{ color: "#666", fontSize: 16, marginTop: 15, padding: "12px", background: "#f5f5f5", borderRadius: 8 }}>
                  💡 도움이 필요하신 경우 관리자분께 문의해주세요.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 40px",
                  fontSize: 18,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
