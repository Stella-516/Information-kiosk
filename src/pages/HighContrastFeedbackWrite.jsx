import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function HighContrastFeedbackWrite() {
  const nav = useNavigate();
  const [text, setText] = useState("");

  useEffect(() => {
    document.body.classList.add("feedback-page");
    return () => document.body.classList.remove("feedback-page");
  }, []);

  const handleSubmit = () => {
    if (text.trim()) {
      const feedbackId = Date.now().toString();
      const emotion = localStorage.getItem("feedback.emotion.key") || "happy";
      const date = new Date().toLocaleDateString("ko-KR");

      localStorage.setItem(`feedback_${feedbackId}_message`, text);
      localStorage.setItem(`feedback_${feedbackId}_emotion`, emotion);
      localStorage.setItem(`feedback_${feedbackId}_date`, date);

      nav("/high-contrast/feedback/message");
    }
  };

  const handleBack = () => {
    nav("/high-contrast/feedback/emotion");
  };

  return (
    <div
      className="fbw-wrap"
      style={{
        color: "#fff",
      }}
    >
      <div className="fbw-card">
        <h2 className="fbw-title">소감을 입력해 주세요</h2>
        <textarea
          className="fbw-textarea"
          rows={8}
          placeholder="전시에 대한 소감을 작성해 주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="fbw-actions">
          <button className="fbw-btn" onClick={handleBack}>
            이전으로
          </button>
          <button
            className="fbw-btn primary"
            onClick={handleSubmit}
            disabled={!text.trim()}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}
