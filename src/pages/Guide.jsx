import { useNavigate } from "react-router-dom";
import poster from "../assets/poster.png";
import guide1 from "../assets/guide1.png";
import guide2 from "../assets/guide2.png";
import guide3 from "../assets/guide3.png";
import "../index.css";

export default function Guide() {
  const nav = useNavigate();
  const go = (path) => () => nav(path);
  const onKey = (path) => (e) => {
    if (e.key === "Enter" || e.key === " ") nav(path);
  };

  return (
    <div
      className="guide"
      style={{ backgroundImage: `url(${poster})` }}
      aria-label="안내 선택 화면"
    >
      <div className="guide__overlay" />

      <div className="guide__center">
        <section className="guide__panel">
          <h2 className="guide__panel-title">도움 서비스를 선택하세요</h2>

          <div className="guide__panel-grid">
            <div
              className="guide__card"
              role="button"
              tabIndex={0}
              onClick={go("/menu")}
              onKeyDown={onKey("/menu")}
              aria-label="메뉴 화면으로 이동"
            >
              <div className="guide__card-content">
                <img src={guide1} alt="기존 화면 유지" className="guide__card-icon" />
                <span className="guide__card-subtext">일반 관람객</span>
                <span className="guide__card-text">기존 화면 유지</span>
              </div>
            </div>

            <div
              className="guide__card"
              role="button"
              tabIndex={0}
              onClick={go("/high-contrast")}
              onKeyDown={onKey("/high-contrast")}
              aria-label="큰 글씨/고대비 도움 서비스로 이동"
            >
              <div className="guide__card-content">
                <img src={guide2} alt="큰 글씨/고대비 도움 서비스" className="guide__card-icon" />
                <span className="guide__card-subtext">배려가 필요하신 분</span>
                <span className="guide__card-text">큰 글씨/고대비 도움 서비스</span>
              </div>
            </div>

            <div
              className="guide__card"
              role="button"
              tabIndex={0}
              onClick={go("/low-screen")}
              onKeyDown={onKey("/low-screen")}
              aria-label="낮은 화면 위치 도움 서비스로 이동"
            >
              <div className="guide__card-content">
                <img src={guide3} alt="낮은 화면 위치 도움 서비스" className="guide__card-icon" />
                <span className="guide__card-subtext">거동이 불편하신 분</span>
                <span className="guide__card-text">낮은 화면 위치 도움 서비스</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
