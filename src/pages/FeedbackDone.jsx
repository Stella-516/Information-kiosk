import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emoflower from "../assets/emoflower.png";
import "../index.css";
import {
  commitCurrentFeedback,
  readFeedbackDraft,
} from "../utils/feedbackStorage";

export default function FeedbackDone() {
  const nav = useNavigate();
  const [view] = useState(() => {
    const committed = commitCurrentFeedback();
    if (committed) return committed;
    return readFeedbackDraft();
  });

  useEffect(() => {
    document.body.classList.add("feedback-page");
    const t = setTimeout(() => nav("/"), 20000);
    return () => {
      document.body.classList.remove("feedback-page");
      clearTimeout(t);
    };
  }, [nav]);

  return (
    <>
      <div className="fbd-fixed-bg" />

      <div className="fbd-stage">
        <div className="fbd-top">
          <img className="fbd-emoflower" src={emoflower} alt="" aria-hidden="true" />
          <div className="fbd-card">
            {view.emoSrc && <img className="fbd-emoji" src={view.emoSrc} alt="" />}
            <div className="fbd-msg">{view.message}</div>
            {view.date && <div className="fbd-date">{view.date}</div>}
          </div>
        </div>

        <section className="fbd-panel">
          <h1 className="fbd-title">
            소감을 남겼습니다!
            <br />
            방문해주셔서 감사합니다.
          </h1>
          <p className="fbd-sub">20초 후에 처음 화면으로 이동합니다.</p>
          <button className="fbd-home" onClick={() => nav("/")}>
            맨 처음으로 〉
          </button>
        </section>
      </div>
    </>
  );
}
