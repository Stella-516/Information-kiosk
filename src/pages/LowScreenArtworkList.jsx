import React, { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { artworks as artworksData } from "../data/artworksData";

const DEFAULT_AVATAR = "/assets/avatars/default.png";

export default function LowScreenArtworkList({ items }) {
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
    nav(`/low-screen/works/viewer?i=${idx}`);
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
    <div className="artwork-page" style={{ paddingBottom: 72 }}>
      <div className="artwork-wrap panel">
        <aside className="sidebar">
          <h2>🔎 기관으로 찾기</h2>
          <div className="flex flex-col gap-2">
            {orgList.map(([o, count]) => (
              <button
                key={o}
                className={`pill ${selectedOrg === o ? "active" : ""}`}
                onClick={() => setSelectedOrg(o)}
              >
                {o} <span className="count">{count}</span>
              </button>
            ))}
            <button
              className={`pill ${!selectedOrg ? "active" : ""}`}
              onClick={() => setSelectedOrg(null)}
            >
              전체 보기
            </button>
          </div>
        </aside>

        <section className="rail-wrap">
          <div ref={railRef} onWheel={onWheelToHorizontal} className="art-rail">
            {filtered.map((a) => (
              <div key={a.id} className="card">
                <div className="thumb">
                  <img src={a.image} alt={a.title?.ko || "작품 이미지"} />
                  {a.purchasable === true && (
                    <span className="buy-badge ok">구매 가능</span>
                  )}
                  {a.purchasable === false && (
                    <span className="buy-badge no">구매 불가</span>
                  )}
                </div>
                <div className="body">
                  <h3>{a.title?.ko || "(제목 없음)"}</h3>
                  <p className="meta">전시 · {a.org || "-"}</p>
                  <div className="artist">
                    <img
                      src={a.artistAvatar || DEFAULT_AVATAR}
                      alt={`${a.artist || "작가"} 얼굴`}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_AVATAR;
                      }}
                    />
                    <span>{a.artist || "-"}</span>
                  </div>
                  <button className="cta" onClick={() => openViewer(a.id)}>
                    자세히 보기 <span>›</span>
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: "64px 16px", opacity: 0.5 }}>
                선택한 기관에 작품이 없습니다.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
