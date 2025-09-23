import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import happy from "../assets/happy.png";
import good from "../assets/good.png";
import wow from "../assets/wow.png";
import funny from "../assets/funny.png";
import flower from "../assets/flower.png";
import "../index.css";
import "../styles/FeedbackEmotion.css";

const EMOTIONS = [
  { key: "happy", label: "행복해요", src: happy },
  { key: "wow", label: "놀라워요", src: wow },
  { key: "good", label: "좋아요", src: good },
  { key: "funny", label: "재밌어요", src: funny },
];

export default function FeedbackEmotion() {
  const nav = useNavigate();
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem("feedback.emotion.key") || "";
  });

  useEffect(() => {
    document.body.classList.add('feedback-page');
    return () => document.body.classList.remove('feedback-page');
  }, []);

  const todayStr = useMemo(() => {
    const d = new Date();
    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const w = weekdays[d.getDay()];
    return `${y}년 ${m}월 ${day}일 ${w}`;
  }, []);

  useEffect(() => {
    const item = EMOTIONS.find((e) => e.key === selected);
    if (item) {
      localStorage.setItem("feedback.emotion.key", item.key);
      localStorage.setItem("feedback.emotion.label", item.label);
      localStorage.setItem("feedback.emotion.src", item.src);
      localStorage.setItem("feedback.date", todayStr);
    }
  }, [selected, todayStr]);

  const goNext = () => {
    if (!selected) return;
    nav("/menu/feedback/message");
  };

  const previewSrc = useMemo(() => {
    const item = EMOTIONS.find((e) => e.key === selected);
    return item?.src || null;
  }, [selected]);
  return (
    <div className="fbe-wrap">
      <div className="fbe-top">
        <img className="fbe-flower" src={flower} alt="" aria-hidden="true" />
        <div className="fbe-preview">
          {previewSrc ? (
            <img className="fbe-preview-img" src={previewSrc} alt="" />
          ) : (
            <div className="fbe-preview-placeholder">이모티콘을 선택하세요</div>
          )}

          <div className="fbe-lines">
            <div className="fbe-line bold" />
            <div className="fbe-line" />
          </div>
          <div className="fbe-date">{todayStr}</div>
        </div>
      </div>

      <section className="fbe-panel">
        <div className="fbe-panel-title">원하는 감정그림을 선택하고 다음 버튼을 눌러주세요!</div>

        <div className="fbe-options" role="listbox" aria-label="감정 선택">
          {EMOTIONS.map((e) => (
            <button
              key={e.key}
              type="button"
              className={`fbe-option ${selected === e.key ? "active" : ""}`}
              onClick={() => setSelected(e.key)}
              aria-pressed={selected === e.key}
              aria-label={e.label}
            >
              <img src={e.src} alt="" />
            </button>
          ))}
        </div>

        <div className="fbe-actions">
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
