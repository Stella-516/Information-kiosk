import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { artworks } from "../data/artworksData";
import Acenter from "../assets/Acenter.png";
import Bcenter from "../assets/Bcenter.png";
import Ccenter from "../assets/Ccenter.png";
import Dcenter from "../assets/Dcenter.png";
import Ecenter from "../assets/Ecenter.png";
import Fcenter from "../assets/Fcenter.png";

export default function HighContrastQR() {
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrg, setSelectedOrg] = useState(searchParams.get("org"));

  useEffect(() => {
    if (selectedOrg) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [selectedOrg]);

  useEffect(() => {
    const orgFromParams = searchParams.get("org");
    if (orgFromParams) {
      setSelectedOrg(orgFromParams);
    }
  }, [searchParams]);

  const orgLogoMap = {
    노원발달장애인평생교육센터: Acenter,
    다운복지관: Bcenter,
    서울시립뇌성마비복지관: Ccenter,
    "서울장애인부모연대 노원지회": Dcenter,
    서울시립북부장애인종합복지관: Ecenter,
    서울시립상이군경복지관: Fcenter,
  };

  const artistsByOrg = artworks.reduce((acc, artwork) => {
    const org = artwork.org;
    if (!acc[org]) {
      acc[org] = [];
    }

    const existingArtist = acc[org].find((a) => a.name === artwork.artist);
    if (!existingArtist) {
      acc[org].push({
        name: artwork.artist,
        qrCode: `/assets/qr/qr${artwork.id.replace(/[A-Z-]/g, "")}.png`, // 작품 ID에서 숫자만 추출
        artworks: [artwork],
      });
    } else {
      existingArtist.artworks.push(artwork);
    }

    return acc;
  }, {});

  const artistsByOrgArray = Object.entries(artistsByOrg).map(
    ([org, artists]) => ({
      org,
      artists,
    })
  );

  const handleOrgSelect = (org) => {
    setSelectedOrg(org);
    setSearchParams({ org });
  };

  const handleBackToOrgList = () => {
    setSelectedOrg(null);
    setSearchParams({});
  };

  if (selectedOrg) {
    const selectedOrgData = artistsByOrgArray.find(
      (item) => item.org === selectedOrg
    );
    const isSmallCenter = (selectedOrgData?.artists?.length || 0) <= 6;

    return (
      <div
        style={{
          height: "calc(100vh - 68px - 72px)",
          background: "#000",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          overflow: "hidden",
          justifyContent: isSmallCenter ? "center" : "flex-start",
          paddingTop: isSmallCenter ? 0 : "20px",
          transform: isSmallCenter ? "translateY(-24px)" : "none",
        }}
      >
        {/*  */}
        <div
          style={{
            marginBottom: isSmallCenter ? "20px" : "30px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "800",
              color: "#fff",
            }}
          >
            {selectedOrg}
          </h1>
          <p style={{ margin: "10px 0 0 0", fontSize: "16px", color: "#fff" }}>
            오디오를 들으실 분은 듣고 싶은 기관을 클릭한 후 QR을 카메라로 찍어주세요!
          </p>
        </div>

        {/*  */}
        {selectedOrg === "서울시립북부장애인종합복지관" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {/*  */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "15px",
              }}
            >
              {selectedOrgData.artists.slice(0, 6).map((artist) => (
                <div
                  key={artist.name}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "15px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    height: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      color: "#111",
                      lineHeight: "1.2",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {artist.name}
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 4px 0",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    *카메라로 찍어주세요
                  </p>

                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "#fff",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e0e0e0",
                      overflow: "hidden",
                      marginTop: "-8px",
                    }}
                  >
                    <img
                      src={artist.qrCode}
                      alt={`${artist.name} 작품 설명 QR`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#666",
                        width: "100%",
                        height: "100%",
                        background: "#f5f5f5",
                      }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "3px" }}>
                        📱
                      </div>
                      <div style={{ fontSize: "10px" }}>QR</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/*  */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "15px",
              }}
            >
              {selectedOrgData.artists.slice(6).map((artist) => (
                <div
                  key={artist.name}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "15px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    height: "180px",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      color: "#111",
                      lineHeight: "1.2",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {artist.name}
                  </h3>
                  <p
                    style={{
                      margin: "4px 0 4px 0",
                      fontSize: "12px",
                      color: "#666",
                    }}
                  >
                    *카메라로 찍어주세요
                  </p>

                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      background: "#fff",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #e0e0e0",
                      overflow: "hidden",
                      marginTop: "-8px",
                    }}
                  >
                    <img
                      src={artist.qrCode}
                      alt={`${artist.name} 작품 설명 QR`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#666",
                        width: "100%",
                        height: "100%",
                        background: "#f5f5f5",
                      }}
                    >
                      <div style={{ fontSize: "20px", marginBottom: "3px" }}>
                        📱
                      </div>
                      <div style={{ fontSize: "10px" }}>QR</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "15px",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {selectedOrgData.artists.map((artist) => (
              <div
                key={artist.name}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  height: "180px",
                  justifyContent: "space-between",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#111",
                    lineHeight: "1.2",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                  }}
                >
                  {artist.name}
                </h3>
                <p
                  style={{
                    margin: "4px 0 4px 0",
                    fontSize: "12px",
                    color: "#666",
                  }}
                >
                  *카메라로 찍어주세요
                </p>

                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    background: "#fff",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                    marginTop: "-8px",
                  }}
                >
                  <img
                    src={artist.qrCode}
                    alt={`${artist.name} 작품 설명 QR`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      color: "#666",
                      width: "100%",
                      height: "100%",
                      background: "#f5f5f5",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "3px" }}>
                      📱
                    </div>
                    <div style={{ fontSize: "10px" }}>QR</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        height: "calc(100vh - 68px - 72px)",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "60px 40px 40px 40px",
        overflow: "hidden",
      }}
    >
      {/*  */}
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "800",
            color: "#fff",
          }}
        >
          전체 작품 설명 QR
        </h1>
        <p
          style={{
            margin: "15px 0 0 0",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          기관을 선택하여 작가별 QR 코드를 확인하세요
        </p>
      </div>

      {/*  */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          width: "100%",
          maxWidth: "100%",
          justifyContent: "center",
          flexWrap: "nowrap",
          padding: "0 20px",
        }}
      >
        {artistsByOrgArray.map((orgData, index) => (
          <div
            key={orgData.org}
            style={{
              background: "#000",
              borderRadius: "16px",
              padding: "16px 20px 16px 20px",
              boxShadow: "0 4px 20px rgba(255,255,255,0.1)",
              border: "2px solid #fff",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              height: "320px",
              width: "200px",
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            onClick={() => handleOrgSelect(orgData.org)}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 0 6px 0",
              }}
            >
              {orgLogoMap[orgData.org] && (
                <img
                  src={orgLogoMap[orgData.org]}
                  alt={`${orgData.org} 로고`}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    marginBottom: 6,
                    border: "2px solid #fff",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#fff",
                  lineHeight: "1.2",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                {orgData.org}
              </h2>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <span
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                참여 작가: {orgData.artists.length}명
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "15px",
                overflow: "visible",
                whiteSpace: "normal",
              }}
            >
              {orgData.artists.slice(0, 3).map((artist) => (
                <span
                  key={artist.name}
                  style={{
                    background: "#333",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {artist.name}
                </span>
              ))}
              {orgData.artists.length > 3 && (
                <>
                  <span style={{ flexBasis: "100%" }} />
                  <span
                    style={{
                      background: "#333",
                      padding: "6px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    +{orgData.artists.length - 3}명
                  </span>
                </>
              )}
            </div>

            <div
              style={{
                background: "#333",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
                marginTop: "auto",
              }}
            >
              <span
                style={{
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                클릭하여 작가별 QR 보기 →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

