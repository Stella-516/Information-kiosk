import React, { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { artworks as artworksData } from "../data/artworksData";

const DEFAULT_AVATAR = "/assets/avatars/default.png";

export default function HighContrastArtworkList({ items }) {
  const nav = useNavigate();

  const data = useMemo(() => {
    const src = items && items.length ? items : artworksData || [];
    return Array.isArray(src) ? src : [];
  }, [items]);

  const [selectedOrg, setSelectedOrg] = useState(null);

  const fixedOrgs = [
    "노원발달장애인평생교육센터",
    "다운복지관",
    "서울시립뇌성마비복지관",
    "서울장애인부모연대 노원지회",
    "서울시립북부장애인종합복지관",
    "서울시립상이군경복지관",
  ];

  const orgList = useMemo(() => {
    const counts = {};
    data.forEach((a) => {
      if (fixedOrgs.includes(a.org)) counts[a.org] = (counts[a.org] || 0) + 1;
    });
    return fixedOrgs.map((org) => [org, counts[org] || 0]);
  }, [data]);

  const filtered = useMemo(() => {
    if (!selectedOrg) return data;
    return data.filter((a) => a.org === selectedOrg);
  }, [data, selectedOrg]);

  const openViewer = (id) => {
    const idx = data.findIndex((x) => x.id === id);
    if (idx < 0) return;
    nav(`/high-contrast/works/viewer?i=${idx}`);
  };

  const railRef = useRef(null);
  const onWheelToHorizontal = (e) => {
    const el = railRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  return (
    <div
      className="artwork-page"
      style={{
        paddingBottom: 72,
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* 본문 */}
      <div className="artwork-wrap panel" style={{ background: "#000" }}>
        {/* 왼쪽: 기관 선택 */}
        <aside className="sidebar" style={{ background: "#000" }}>
          <h2 style={{ color: "#fff" }}>🔎 기관으로 찾기</h2>
          <div className="flex flex-col gap-2">
            {orgList.map(([o, count]) => (
              <button
                key={o}
                className={`pill ${selectedOrg === o ? "active" : ""}`}
                onClick={() => setSelectedOrg(o)}
                style={{
                  background: selectedOrg === o ? "#333" : "#000",
                  color: "#fff",
                  border: "2px solid #fff",
                  borderRadius: "20px",
                  padding: "12px 16px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedOrg !== o) {
                    e.target.style.background = "#333";
                    e.target.style.borderColor = "#ffff00";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedOrg !== o) {
                    e.target.style.background = "#000";
                    e.target.style.borderColor = "#fff";
                  }
                }}
              >
                {o}{" "}
                <span className="count" style={{ color: "#ffff00" }}>
                  {count}
                </span>
              </button>
            ))}
            <button
              className={`pill ${!selectedOrg ? "active" : ""}`}
              onClick={() => setSelectedOrg(null)}
              style={{
                background: !selectedOrg ? "#333" : "#000",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "20px",
                padding: "12px 16px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (selectedOrg) {
                  e.target.style.background = "#333";
                  e.target.style.borderColor = "#ffff00";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedOrg) {
                  e.target.style.background = "#000";
                  e.target.style.borderColor = "#fff";
                }
              }}
            >
              전체 보기
            </button>
          </div>
        </aside>

        {/* 오른쪽: 작품 가로 레일 */}
        <section className="rail-wrap">
          <div ref={railRef} onWheel={onWheelToHorizontal} className="art-rail">
            {filtered.map((a) => (
              <div
                key={a.id}
                className="card"
                style={{
                  background: "#000",
                  border: "2px solid #fff",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffff00";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(255,255,255,0.1)";
                }}
              >
                <div className="thumb" style={{ background: "transparent" }}>
                  <img
                    src={a.image}
                    alt={a.title?.ko || "작품 이미지"}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #fff",
                    }}
                  />
                  {a.purchasable === true && (
                    <span
                      className="buy-badge ok"
                      style={{
                        background: "#28a745",
                        color: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      구매 가능
                    </span>
                  )}
                  {a.purchasable === false && (
                    <span
                      className="buy-badge no"
                      style={{
                        background: "#dc3545",
                        color: "#fff",
                        border: "1px solid #fff",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      구매 불가
                    </span>
                  )}
                </div>
                <div className="body">
                  <h3
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    {a.title?.ko || "(제목 없음)"}
                  </h3>
                  <p
                    className="meta"
                    style={{
                      color: "#ccc",
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  >
                    전시 · {a.org || "-"}
                  </p>
                  <div
                    className="artist"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "12px",
                    }}
                  >
                    <img
                      src={a.artistAvatar || DEFAULT_AVATAR}
                      alt={`${a.artist || "작가"} 얼굴`}
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid #fff",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_AVATAR;
                      }}
                    />
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {a.artist || "-"}
                    </span>
                  </div>
                  <button
                    className="cta"
                    onClick={() => openViewer(a.id)}
                    style={{
                      background: "#333",
                      color: "#fff",
                      border: "2px solid #fff",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      width: "100%",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#ffff00";
                      e.target.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#333";
                      e.target.style.color = "#fff";
                    }}
                  >
                    자세히 보기 <span>›</span>
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div
                style={{
                  padding: "64px 16px",
                  opacity: 0.7,
                  color: "#fff",
                  textAlign: "center",
                  fontSize: "18px",
                }}
              >
                선택한 기관에 작품이 없습니다.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
