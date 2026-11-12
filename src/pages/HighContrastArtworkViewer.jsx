import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { artworks as artworksData } from "../data/artworksData";

const DEFAULT_AVATAR = "/assets/avatars/A(1).png";
const PLACEHOLDER_IMG = "/assets/artworks/placeholder.png";

export default function HighContrastArtworkViewer({ items }) {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  const initialIdx = Number(sp.get("i") ?? -1);
  const [idx, setIdx] = useState(initialIdx);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const data = useMemo(() => {
    const src = items && items.length ? items : artworksData || [];
    return Array.isArray(src) ? src : [];
  }, [items]);

  useEffect(() => {
    setIdx(initialIdx);
  }, [initialIdx]);

  const art = data[idx] || null;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && idx < data.length - 1) {
      const newIdx = idx + 1;
      setIdx(newIdx);
      setSp({ i: newIdx.toString() });
    }
    if (isRightSwipe && idx > 0) {
      const newIdx = idx - 1;
      setIdx(newIdx);
      setSp({ i: newIdx.toString() });
    }
  };

  const otherWorks = useMemo(() => {
    if (!art) return [];
    return data
      .map((a, i) => ({ work: a, index: i }))
      .filter((a) => a.work.artist === art.artist && a.index !== idx);
  }, [data, art, idx]);

  if (!art) {
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
        <div className="artwork-topbar" style={{ background: "#000" }}>
          <div className="artwork-title" style={{ color: "#fff" }}>
            작품 상세
          </div>
        </div>
        <div className="artwork-wrap" style={{ background: "#000" }}>
          <section style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            <h2 style={{ fontWeight: 700, marginBottom: 8, color: "#fff" }}>
              작품을 찾을 수 없습니다
            </h2>
            <p style={{ opacity: 0.6, color: "#fff" }}>
              목록에서 다시 선택해 주세요.
            </p>
            <button
              className="btn primary"
              onClick={() => nav("/high-contrast/works")}
              style={{
                marginTop: 16,
                background: "#333",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              목록으로 가기
            </button>
          </section>
        </div>
      </div>
    );
  }

  const titleKo = art.title?.ko ?? "(제목 없음)";
  const artist = art.artist ?? "-";
  const org = art.org ?? "-";
  const year = art.year ?? "";
  const medium = art.medium ?? "";
  const size = art.size ?? "";

  const purchasable = art.purchasable;
  const purchaseNote =
    art.purchaseNote ||
    "작품 구매를 원하시는 분께서는 안내데스크로 문의해 주세요.";

  const safeSrc = (src) => src || PLACEHOLDER_IMG;
  const swapTo = (e, fallback) => (e.currentTarget.src = fallback);

  const getCurrentDateTime = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${month}/${date} (${day}) ${hours}:${minutes}`;
  };

  return (
    <div
      className="artwork-page"
      style={{
        paddingBottom: 72,
        background: "#000",
        color: "#fff",
        height: "100vh",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== 3열 레이아웃 ===== */}
      <section
        style={{
          padding: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
          height: "calc(100vh - 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingTop: "60px",
          position: "relative",
        }}
      >
        {/* 네비게이션 인디케이터 */}
        <div style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          zIndex: 10,
        }}>
          <button
            onClick={() => {
              if (idx > 0) {
                const newIdx = idx - 1;
                setIdx(newIdx);
                setSp({ i: newIdx.toString() });
              }
            }}
            disabled={idx === 0}
            style={{
              background: "#fff",
              color: "#000",
              border: "2px solid #fff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: idx === 0 ? "not-allowed" : "pointer",
              opacity: idx === 0 ? 0.3 : 1,
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            ‹
          </button>
          <span style={{
            background: "#fff",
            color: "#000",
            padding: "6px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
          }}>
            {idx + 1} / {data.length}
          </span>
          <button
            onClick={() => {
              if (idx < data.length - 1) {
                const newIdx = idx + 1;
                setIdx(newIdx);
                setSp({ i: newIdx.toString() });
              }
            }}
            disabled={idx === data.length - 1}
            style={{
              background: "#fff",
              color: "#000",
              border: "2px solid #fff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              cursor: idx === data.length - 1 ? "not-allowed" : "pointer",
              opacity: idx === data.length - 1 ? 0.3 : 1,
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            ›
          </button>
        </div>
        <div
          className="artwork-detail-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 0.85fr",
            gap: "20px",
            alignItems: "stretch",
            height: "min(550px, calc(100vh - 180px))",
            gridTemplateRows: "minmax(0, 1fr)",
            minHeight: 0,
          }}
        >
          {/* 좌측: 작품 이미지 + 작가의 다른 작품들 */}
          <div
            className="artwork-detail-card"
            style={{
              background: "#000",
              border: "2px solid #fff",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* 메인 작품 이미지 */}
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "8px",
                border: "1px solid #fff",
              }}
            >
              <img
                src={safeSrc(art.image)}
                alt={titleKo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => swapTo(e, PLACEHOLDER_IMG)}
              />
            </div>

            {art.qrCode && (
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: "6px",
                  }}
                >
                  작품 정보 QR
                </div>
                <img
                  src={art.qrCode}
                  alt="작품 QR 코드"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "contain",
                    margin: "0 auto",
                    display: "block",
                    background: "#fff",
                    borderRadius: "8px",
                    padding: "4px",
                  }}
                />
              </div>
            )}

            {/* 작가의 다른 작품들 */}
            {otherWorks.length > 0 && (
              <div style={{ marginTop: "auto" }}>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "6px",
                    color: "#fff",
                  }}
                >
                  작가님의 다른작품
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "hidden",
                    flexWrap: "wrap",
                  }}
                >
                  {otherWorks.map(({ work, index }, i) => (
                    <button
                      key={`${work.id ?? "ow"}-${index}-${i}`}
                      onClick={() =>
                        nav(`/high-contrast/works/viewer?i=${index}`)
                      }
                      style={{
                        minWidth: "50px",
                        height: "50px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        border: "1px solid #fff",
                        cursor: "pointer",
                        padding: 0,
                        background: "#000",
                      }}
                      title={work.title?.ko || ""}
                    >
                      <img
                        src={safeSrc(work.image)}
                        alt={work.title?.ko || "다른 작품"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => swapTo(e, PLACEHOLDER_IMG)}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 중앙: 작품 소개, 구매 정보, 작품 설명 */}
          <div
            className="artwork-detail-card"
            style={{
              background: "#000",
              border: "2px solid #fff",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* 작품소개 헤더 */}
            <div
              style={{
                background: "#333",
                borderRadius: "12px",
                padding: "4px 4px",
                marginBottom: "12px",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                작품소개
              </div>
            </div>

            {/* 작품 제목 */}
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#fff",
                margin: "0 0 10px 0",
              }}
            >
              &lt;{titleKo}&gt;
            </h2>

            {/* 구매 안내 */}
            {purchasable !== undefined && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    background: "#333",
                    border: "1px solid #fff",
                    borderRadius: "8px",
                    padding: "20px",
                    boxShadow: "0 2px 8px rgba(255,255,255,0.1)",
                    minHeight: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#fff",
                        marginBottom: "4px",
                      }}
                    >
                      작품구매
                    </div>
                    {purchasable ? (
                      <div
                        style={{
                          color: "#28a745",
                          fontWeight: "bold",
                          fontSize: "22px",
                        }}
                      >
                        구매 가능
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#dc3545",
                          fontWeight: "bold",
                          fontSize: "22px",
                        }}
                      >
                        구매 불가
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      lineHeight: "1.4",
                    }}
                  >
                    {purchasable
                      ? "안내 데스크로 문의주세요."
                      : "해당 작품은 판매하지 않습니다."}
                  </div>
                </div>
              </div>
            )}

            {/* 작품 설명 */}
            {art.description?.ko && (
              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "#fff",
                    marginBottom: "6px",
                  }}
                >
                  작품설명
                </div>
                {Array.isArray(art.description.ko) ? (
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {art.description.ko.map((line, idx) => (
                      <li
                        key={`desc-${idx}`}
                        style={{
                          fontSize: "15px",
                          fontWeight: "bold",
                          color: "#fff",
                          lineHeight: "1.5",
                          marginBottom: "3px",
                        }}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      color: "#fff",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {art.description.ko}
                  </p>
                )}
              </div>
            )}

            {/* 작가 정보 */}
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "3px",
                }}
              >
                작가
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {artist}
              </div>
            </div>
          </div>

          {/* 우측: 작가 소개 */}
          <div
            className="artwork-detail-card"
            style={{
              background: "#000",
              border: "2px solid #fff",
              borderRadius: "12px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* 작가소개 헤더 */}
            <div
              style={{
                background: "#333",
                borderRadius: "12px",
                padding: "4px 2px",
                marginBottom: "16px",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#fff",
                  whiteSpace: "nowrap",
                }}
              >
                작가소개
              </div>
            </div>

            {/* 작가 사진, 이름, 소속기관을 중간에 배치 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                flex: 1,
                paddingTop: "20px",
              }}
            >
              {/* 작가 사진 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={safeSrc(
                    art.artistPortrait || art.artistAvatar || DEFAULT_AVATAR
                  )}
                  alt={`${artist} 얼굴`}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
                  }}
                  onError={(e) => swapTo(e, DEFAULT_AVATAR)}
                />
              </div>

              {/* 작가 이름 */}
              <div
                style={{
                  textAlign: "center",
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                  overflowWrap: "anywhere",
                  width: "100%",
                }}
              >
                {artist}{" "}
                <span style={{ fontSize: "16px", color: "#ccc" }}>작가님</span>
              </div>

              {/* 소속기관 */}
              {org && (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#fff",
                      marginBottom: "4px",
                    }}
                  >
                    소속기관
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#fff",
                      lineHeight: "1.4",
                      fontWeight: "bold",
                    }}
                  >
                    {org}
                  </div>
                </div>
              )}
            </div>

            {/* 작가 소개 글 */}
            {art.artistBio && (
              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    background: "#333",
                    border: "1px solid #fff",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 2px 8px rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#fff",
                      marginBottom: "6px",
                    }}
                  >
                    작가소개 글
                  </div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    {art.artistBio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}




