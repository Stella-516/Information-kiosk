import "../index.css";
import { useNavigate } from "react-router-dom";
import menuBg from "../assets/menu.png";
import QR from "../assets/QR.png";
import exhibit from "../assets/exhibit.png";
import writer from "../assets/writer.png";
import picture from "../assets/picture.png";
import emotion from "../assets/emotion.png";

export default function Menu() {
  const nav = useNavigate();

  const items = [
    {
      title: "전체 작품 설명 QR",
      desc: "카메라로 QR을 찍으면 전체 작품 설명을 들을 수 있어요.",
      to: "/menu/qr",
      image: QR,
    },
    {
      title: "전시회 안내정보",
      desc: "전시장 배치 및 동선 안내.",
      to: "/menu/info",
      image: exhibit,
    },
    {
      title: "작품 설명 보기",
      desc: "작품별 상세 설명과 이미지.",
      to: "/works",
      image: picture,
    },
    {
      title: "작가분들 모아보기",
      desc: "작가별 사진 보기.",
      to: "/menu/artist-intro",
      image: writer,
    },
    {
      title: "전시회 소감 작성",
      desc: "관람 소감을 남겨주세요.",
      to: "/menu/feedback",
      image: emotion,
    },
  ];

  const handleKey = (e, to) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      nav(to);
    }
  };

  return (
    <div
      className="menu-screen solid-bg"
      style={{
        backgroundImage: `url(${menuBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="menu-content">
        <h1 className="menu-title">메뉴를 선택하세요</h1>

        <div className="menu-cards">
          {items.map((it) => (
            <article
              key={it.title}
              className="menu-card"
              role="button"
              tabIndex={0}
              onClick={() => nav(it.to)}
              onKeyDown={(e) => handleKey(e, it.to)}
              aria-label={`${it.title} 이동`}
            >
              <div
                className="menu-card__body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                }}
              >
                <img
                  src={it.image}
                  alt={it.title}
                  style={{
                    width: it.title === "전체 작품 설명 QR" ? "120px" : "140px",
                    height:
                      it.title === "전체 작품 설명 QR" ? "120px" : "140px",
                    objectFit: "contain",
                    marginBottom:
                      it.title === "전체 작품 설명 QR" ? "24px" : "20px",
                  }}
                />
                <h3 className="menu-card__title">{it.title}</h3>
                
                {it.title === "전체 작품 설명 QR" && (
                  <p className="menu-card__description" style={{
                    fontSize: "14px",
                    color: "#666",
                    margin: "8px 0 16px 0",
                    lineHeight: "1.4"
                  }}>
                    QR로 오디오를<br />들을 수 있습니다!
                  </p>
                )}

                <button
                  className="menu-card__cta"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nav(it.to);
                  }}
                >
                  선택하기 ›
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
