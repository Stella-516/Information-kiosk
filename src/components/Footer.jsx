import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";

export default function Footer() {
  const nav = useNavigate();
  const location = useLocation();

  const isHighContrastMode = location.pathname.startsWith("/high-contrast");

  return (
    <footer
      className={isHighContrastMode ? "high-contrast-footer" : ""}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "72px",
        backgroundColor: isHighContrastMode ? "#000" : "#1a1a1a",
        color: isHighContrastMode ? "#fff" : "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 20px",
        boxSizing: "border-box",
        zIndex: 1000,
        borderTop: isHighContrastMode ? "3px solid #fff" : "none",
        gap: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => nav("/menu")}
          style={{
            background: isHighContrastMode ? "#fff" : "#8b5cf6",
            color: isHighContrastMode ? "#000" : "#fff",
            padding: "10px 16px",
            border: isHighContrastMode ? "2px solid #000" : "none",
            borderRadius: "8px",
            fontWeight: isHighContrastMode ? "700" : "normal",
            fontSize: isHighContrastMode ? "16px" : "14px",
          }}
        >
          일반모드
        </button>
        <button
          onClick={() => nav("/high-contrast")}
          style={{
            background: isHighContrastMode ? "#ffff00" : "#f87171",
            color: isHighContrastMode ? "#000" : "#fff",
            padding: "10px 16px",
            border: isHighContrastMode ? "2px solid #000" : "none",
            borderRadius: "8px",
            fontWeight: isHighContrastMode ? "700" : "normal",
            fontSize: isHighContrastMode ? "16px" : "14px",
          }}
        >
          큰글씨
        </button>
        <button
          onClick={() => nav("/low-screen")}
          style={{
            background: isHighContrastMode ? "#fff" : "#4ade80",
            color: isHighContrastMode ? "#000" : "#fff",
            padding: "10px 16px",
            border: isHighContrastMode ? "2px solid #000" : "none",
            borderRadius: "8px",
            fontWeight: isHighContrastMode ? "700" : "normal",
            fontSize: isHighContrastMode ? "16px" : "14px",
          }}
        >
          낮은화면대비
        </button>
      </div>
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => nav("/")}
          style={{
            background: isHighContrastMode ? "#fff" : "#333",
            color: isHighContrastMode ? "#000" : "#fff",
            padding: "10px 16px",
            border: isHighContrastMode ? "2px solid #000" : "none",
            borderRadius: "8px",
            fontWeight: isHighContrastMode ? "700" : "normal",
            fontSize: isHighContrastMode ? "16px" : "14px",
          }}
        >
          처음으로
        </button>
        <button
          onClick={() => nav(-1)}
          style={{
            background: isHighContrastMode ? "#fff" : "#333",
            color: isHighContrastMode ? "#000" : "#fff",
            padding: "10px 16px",
            border: isHighContrastMode ? "2px solid #000" : "none",
            borderRadius: "8px",
            fontWeight: isHighContrastMode ? "700" : "normal",
            fontSize: isHighContrastMode ? "16px" : "14px",
          }}
        >
          이전으로
        </button>
      </div>
    </footer>
  );
}
