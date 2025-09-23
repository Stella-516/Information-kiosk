import { useState, useEffect } from "react";
import "../index.css";

export default function FeedbackWrite() {
  const [text, setText] = useState("");

  useEffect(() => {
    document.body.classList.add('feedback-page');
    return () => document.body.classList.remove('feedback-page');
  }, []);

  return (
    <div className="fbw-wrap">
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
          <button className="fbw-btn" onClick={() => history.back()}>
            이전으로
          </button>
          <button className="fbw-btn primary">제출하기</button>
        </div>
      </div>
    </div>
  );
}
