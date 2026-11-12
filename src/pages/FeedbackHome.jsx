import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../index.css";
import happy from "../assets/happy.png";
import good from "../assets/good.png";
import wow from "../assets/wow.png";
import funny from "../assets/funny.png";
import { loadSavedFeedbacks } from "../utils/feedbackStorage";

const EMOTION_IMAGES = {
  happy: happy,
  good: good,
  wow: wow,
  funny: funny,
};

export default function FeedbackHome() {
  const nav = useNavigate();
  const [feedbackData, setFeedbackData] = useState([]);
  const scrollerRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const loadFeedbackData = () => {
    setFeedbackData(loadSavedFeedbacks());
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

  useEffect(() => {
    let animationFrame;
    let previousTime;

    const scrollContinuously = (time) => {
      if (previousTime === undefined) previousTime = time;
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;

      const el = scrollerRef.current;
      if (el && !dragRef.current.active && el.scrollWidth > el.clientWidth) {
        const loopStart = el.querySelector("[data-loop-start='true']");
        if (loopStart) {
          const loopStartOffset =
            loopStart.getBoundingClientRect().left -
            el.getBoundingClientRect().left +
            el.scrollLeft;
          el.scrollLeft += elapsed * 0.024;
          if (el.scrollLeft >= loopStartOffset) {
            el.scrollLeft -= loopStartOffset;
          }
        }
      }

      animationFrame = window.requestAnimationFrame(scrollContinuously);
    };

    animationFrame = window.requestAnimationFrame(scrollContinuously);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [feedbackData.length]);

  const handlePointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft =
      dragRef.current.scrollLeft - (e.clientX - dragRef.current.startX);
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const defaultSamples = Array.from({ length: 8 }, (_, i) => ({
    id: `sample-${i + 1}`,
    message: "정말 멋진 전시였습니다!",
    date: "2025년 10월 28일 화요일",
    emotion: ["happy", "good", "wow", "funny"][i % 4],
  }));

  const displayData = feedbackData.length > 0 ? feedbackData : defaultSamples;

  return (
    <div className="fbh-wrap">
      <h1 className="fbh-title">미술전 소감 작성하기</h1>
      <div
        ref={scrollerRef}
        className="fbh-cards"
        aria-label="최근 소감 내역"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {[...displayData, ...displayData].map((item, index) => {
          const isClone = index >= displayData.length;
          const itemIndex = index % displayData.length;
          return (
            <article
              key={`${item.id || itemIndex}${isClone ? "-clone" : ""}`}
              className="fbh-card"
              data-loop-start={
                index === displayData.length ? "true" : undefined
              }
              aria-hidden={isClone || undefined}
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
              <div className="fbh-card__body">
                <h3 className="fbh-card__title">{item.message}</h3>
                <p className="fbh-card__date">{item.date}</p>
              </div>
            </article>
          );
        })}
      </div>

      <button
        className="fbh-start"
        onClick={() => nav("/menu/feedback/emotion")}
        style={{ marginTop: "-20px" }}
      >
        시작하기 버튼을 눌러주세요~
      </button>
    </div>
  );
}
