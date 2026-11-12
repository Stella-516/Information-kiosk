import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function HighContrastFeedbackWrite() {
  const nav = useNavigate();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("feedback-page");
    const prevBg = document.body.style.background;
    const prevColor = document.body.style.color;
    const prevHtmlBg = document.documentElement.style.background;
    document.body.style.background = "#000";
    document.body.style.color = "#fff";
    document.documentElement.style.background = "#000";
    return () => {
      document.body.classList.remove("feedback-page");
      document.body.style.background = prevBg;
      document.body.style.color = prevColor;
    document.documentElement.style.background = prevHtmlBg;
    };
  }, []);

  const handleSubmit = () => {
    const message = text.trim();
    if (!message || isSubmitting) return;

    setIsSubmitting(true);
    localStorage.setItem("feedback.message", message);
    localStorage.setItem(
      "feedback.date",
      new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    );

    nav("/high-contrast/feedback/message");
  };

  const handleBack = () => {
    nav("/high-contrast/feedback/emotion");
  };

  return (
    <div
      className="fbw-wrap"
      style={{
        color: "#fff",
        background: "#000",
        minHeight: "calc(100vh - 68px - 72px)",
        width: "100%",
        padding: "20px",
      }}
    >
      <style>{`
        /* High-contrast: textarea placeholder도 대비 강화 */
        .fbw-textarea::placeholder { color: #bbbbbb; opacity: 1; }
      `}</style>
      <div
        className="fbw-card"
        style={{
          background: "#000",
          color: "#fff",
          border: "3px solid #fff",
          boxShadow: "none",
        }}
      >
        <h2 className="fbw-title" style={{ color: "#fff" }}>
          소감을 입력해 주세요
        </h2>
        <textarea
          className="fbw-textarea"
          rows={8}
          placeholder="전시에 대한 소감을 작성해 주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            background: "#000",
            color: "#fff",
            border: "3px solid #fff",
            outline: "none",
          }}
        />
        <div className="fbw-actions">
          <button
            className="fbw-btn"
            onClick={handleBack}
            style={{
              background: "#ffff00",
              color: "#000",
              border: "3px solid #000",
              fontWeight: 900,
              filter: "saturate(140%)",
            }}
          >
            이전으로
          </button>
          <button
            className="fbw-btn primary"
            onClick={handleSubmit}
            disabled={!text.trim() || isSubmitting}
            style={{
              background: !text.trim() || isSubmitting ? "#bfbf00" : "#ffff00",
              color: "#000",
              border: "3px solid #000",
              fontWeight: 900,
              cursor: !text.trim() || isSubmitting ? "not-allowed" : "pointer",
              filter:
                !text.trim() || isSubmitting
                  ? "grayscale(10%)"
                  : "saturate(140%)",
            }}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
