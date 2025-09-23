import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import flower from "../assets/flower.png";
import happy from "../assets/happy.png";
import good from "../assets/good.png";
import wow from "../assets/wow.png";
import funny from "../assets/funny.png";
import "../index.css";

const MESSAGES = [
  "정말 멋진 전시였습니다!",
  "마음이 따뜻해졌어요!",
  "모두 훌륭한 작품이었습니다!",
  "행복한 시간 보냈습니다!",
];

const splitMessage = (message) => {
  const words = message.split(" ");
  if (words.length <= 2) {
    return { firstLine: message, secondLine: "" };
  }

  const firstWord = words[0];
  if (firstWord.length <= 2) {
    return {
      firstLine: firstWord,
      secondLine: words.slice(1).join(" "),
    };
  }

  if (message === "모두 훌륭한 작품이었습니다!") {
    return {
      firstLine: "모두 훌륭한",
      secondLine: "작품이었습니다!",
    };
  }

  const midPoint = Math.ceil(words.length / 2);
  return {
    firstLine: words.slice(0, midPoint).join(" "),
    secondLine: words.slice(midPoint).join(" "),
  };
};

const EMOTION_IMAGES = {
  happy: happy,
  good: good,
  wow: wow,
  funny: funny,
};

export default function HighContrastFeedbackMessage() {
  const nav = useNavigate();

  const [selected, setSelected] = useState(
    localStorage.getItem("feedback.message") || ""
  );
  const savedEmotion = localStorage.getItem("feedback.emotion.key") || "😊"; // 기본값

  useEffect(() => {
    document.body.classList.add("feedback-page");
    return () => document.body.classList.remove("feedback-page");
  }, []);

  const todayStr = useMemo(() => {
    const d = new Date();
    const w = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ][d.getDay()];
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${w}`;
  }, []);

  const onChoose = (msg) => {
    setSelected(msg);
    localStorage.setItem("feedback.message", msg);
    localStorage.setItem("feedback.date", todayStr);
  };

  const goNext = () => {
    if (!selected) return;
    nav("/high-contrast/feedback/done");
  };

  return (
    <div
      className="fbm-wrap"
      style={{
        color: "#fff",
      }}
    >
      {/**/}
      <div className="fbm-top">
        <img className="fbm-flower" src={flower} alt="" aria-hidden="true" />
        <div className="fbm-preview">
          {/* */}
          <div className="fbm-preview-emoji">
            {EMOTION_IMAGES[savedEmotion] ? (
              <img
                src={EMOTION_IMAGES[savedEmotion]}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              savedEmotion
            )}
          </div>

          <div className="fbm-preview-msg">
            {selected || "메시지를 선택하세요"}
          </div>
          <div className="fbm-date">{todayStr}</div>
        </div>
      </div>

      {/* */}
      <section className="fbm-panel">
        <h2 className="fbm-panel-title">남기고 싶은 메세지를 선택하고, 다음 버튼을 누르면 완성입니다!</h2>
        <p className="fbm-panel-sub">원하는 메시지를 터치하세요</p>

        <div className="fbm-options">
          {MESSAGES.map((m) => {
            const { firstLine, secondLine } = splitMessage(m);
            return (
              <button
                key={m}
                type="button"
                className={`fbm-option ${selected === m ? "active" : ""}`}
                onClick={() => onChoose(m)}
              >
                <div className="fbm-option-text">
                  <div className="fbm-option-line">{firstLine}</div>
                  {secondLine && (
                    <div className="fbm-option-line">{secondLine}</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="fbm-actions">
          <button
            type="button"
            className="fbe-nav ghost"
            onClick={() => nav(-1)}
          >
            〈 이전
          </button>
          <button
            type="button"
            className="fbe-nav primary"
            onClick={goNext}
            disabled={!selected}
          >
            다음 〉
          </button>
        </div>
      </section>
    </div>
  );
}
