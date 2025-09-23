import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import done from "../assets/done.png";
import emoflower from "../assets/emoflower.png";
import "../index.css";

export default function HighContrastFeedbackDone() {
  const nav = useNavigate();
  const msg =
    localStorage.getItem("feedback.message") || "방문해주셔서 감사합니다!";
  const emoKey = localStorage.getItem("feedback.emotion.key");
  const emoSrc = localStorage.getItem("feedback.emotion.src");
  const date = localStorage.getItem("feedback.date");

  useEffect(() => {
    document.body.classList.add("feedback-page");

    // 이미 저장된 피드백이 있는지 확인
    const existingFeedback = localStorage.getItem("feedback.message");
    if (existingFeedback && existingFeedback === msg) {
      const t = setTimeout(() => nav("/high-contrast"), 20000);
      return () => {
        document.body.classList.remove("feedback-page");
        clearTimeout(t);
      };
    }

    // 피드백을 고유한 ID와 함께 저장
    const feedbackId = Date.now().toString();
    localStorage.setItem(`feedback_${feedbackId}_message`, msg);
    localStorage.setItem(`feedback_${feedbackId}_emotion`, emoKey || "");
    localStorage.setItem(
      `feedback_${feedbackId}_date`,
      date ||
        new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })
    );

    // 기존 피드백 데이터 정리 (중복 방지)
    localStorage.removeItem("feedback.message");
    localStorage.removeItem("feedback.emotion.key");
    localStorage.removeItem("feedback.emotion.label");
    localStorage.removeItem("feedback.emotion.src");
    localStorage.removeItem("feedback.date");

    const t = setTimeout(() => nav("/high-contrast"), 20000);
    return () => {
      document.body.classList.remove("feedback-page");
      clearTimeout(t);
    };
  }, [nav, msg, emoKey, emoSrc, date]);

  return (
    <>
      {/*  */}
      <div className="fbd-fixed-bg" />

      {/*  */}
      <div className="fbd-stage">
        <div className="fbd-top">
          <img
            className="fbd-emoflower"
            src={emoflower}
            alt=""
            aria-hidden="true"
          />
          <div className="fbd-card">
            {emoSrc && <img className="fbd-emoji" src={emoSrc} alt="" />}
            <div className="fbd-msg">{msg}</div>
            {date && <div className="fbd-date">{date}</div>}
          </div>
        </div>

        <section className="fbd-panel">
          <h1 className="fbd-title">
            소감을 남겼습니다!
            <br />
            방문해주셔서 감사합니다.
          </h1>
          <p className="fbd-sub">20초 후에 처음 화면으로 이동합니다.</p>
          <button className="fbd-home" onClick={() => nav("/high-contrast")}>
            맨 처음으로 〉
          </button>
        </section>
      </div>
    </>
  );
}
