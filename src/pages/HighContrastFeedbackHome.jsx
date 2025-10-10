import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";
import happy from "../assets/happy.png";
import good from "../assets/good.png";
import wow from "../assets/wow.png";
import funny from "../assets/funny.png";

const EMOTION_IMAGES = {
  happy: happy,
  good: good,
  wow: wow,
  funny: funny,
};

export default function HighContrastFeedbackHome() {
  const nav = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const loadFeedbackData = () => {
    // localStorage에서 피드백 데이터 가져오기
    const savedFeedbacks = [];

    console.log("Loading feedback data...");
    console.log("localStorage keys:", Object.keys(localStorage));

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("feedback_") && key.includes("_message")) {
        const feedbackId = key.replace("feedback_", "").replace("_message", "");
        const message = localStorage.getItem(key);
        const emotion = localStorage.getItem(`feedback_${feedbackId}_emotion`);
        const date = localStorage.getItem(`feedback_${feedbackId}_date`);

        console.log("Found feedback:", { feedbackId, message, emotion, date });

        if (message && emotion && date) {
          savedFeedbacks.push({
            id: feedbackId,
            message: message,
            emotion: emotion,
            date: date,
          });
        }
      }
    }

    console.log("Total saved feedbacks:", savedFeedbacks.length);

    // 최신 순으로 정렬하고 최대 8개만 표시
    savedFeedbacks.sort((a, b) => {
      const timeA = parseInt(a.id) || 0;
      const timeB = parseInt(b.id) || 0;
      return timeB - timeA;
    });
    
    setFeedbackData(savedFeedbacks.slice(0, 8));
    setTotalCount(savedFeedbacks.length);
  };

  useEffect(() => {
    document.body.classList.add("feedback-page");
    loadFeedbackData();

    return () => document.body.classList.remove("feedback-page");
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadFeedbackData();
      }
    };

    const handleFocus = () => loadFeedbackData();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

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

    if (isLeftSwipe && currentIndex < displayData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const defaultSamples = Array.from({ length: 8 }, (_, i) => ({
    id: `sample-${i + 1}`,
    message: "정말 멋진 전시였습니다!",
    date: "2025년 10월 28일 화요일",
    emotion: ["happy", "good", "wow", "funny"][i % 4], // 이모티콘 추가
  }));

  const displayData = feedbackData.length > 0 ? feedbackData : defaultSamples;

  return (
    <div
      className="fbh-wrap"
      style={{
        color: "#fff",
      }}
    >
      <h1 className="fbh-title">미술전 소감 작성하기</h1>
      <div
        className="fbh-cards"
        aria-label="최근 소감 예시"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "flex",
          overflow: "hidden",
          position: "relative",
          width: "100%",
          height: "280px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "30px",
            transform: `translateX(-${currentIndex * 320}px)`,
            transition: "transform 0.3s ease-in-out",
            padding: "0 20px"
          }}
        >
          {displayData.map((item, index) => (
            <article
              key={item.id || index}
              className="fbh-card"
              style={{
                minWidth: "280px",
                width: "280px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <div className="fbh-card__thumb">
                {item.emotion && EMOTION_IMAGES[item.emotion] && (
                  <img
                    src={EMOTION_IMAGES[item.emotion]}
                    alt="감정"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
              <div className="fbh-card__body" style={{ textAlign: "center", width: "100%" }}>
                <h3
                  className="fbh-card__title"
                  style={{ fontSize: "16px", lineHeight: "1.4", marginBottom: "8px" }}
                >
                  {item.message}
                </h3>
                <p
                  className="fbh-card__date"
                  style={{ fontSize: "12px", whiteSpace: "nowrap" }}
                >
                  {item.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button
        className="fbh-start"
        onClick={() => nav("/high-contrast/feedback/emotion")}
        style={{ marginTop: "-20px" }}
      >
        시작하기 버튼을 눌러주세요~
      </button>
    </div>
  );
}
