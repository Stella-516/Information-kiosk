import { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import "../index.css";

function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isFeedbackPage, setIsFeedbackPage] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);

      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      const dayName = dayNames[now.getDay()];
      setDate(`${month}/${day}(${dayName})`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const checkFeedbackPage = () => {
      setIsFeedbackPage(document.body.classList.contains("feedback-page"));
    };

    checkFeedbackPage();
    const observer = new MutationObserver(checkFeedbackPage);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="header"
      style={
        isFeedbackPage
          ? {
              background: "transparent",
              backgroundColor: "transparent",
              backgroundImage: "none",
              boxShadow: "none",
              border: "none",
            }
          : {}
      }
    >
      <img src={logo} alt="로고" className="logo" />
      <div className="time">
        <span
          style={{
            marginRight: "8px",
            fontSize: "22px",
            color: "#333",
          }}
        >
          {date}
        </span>
        <span
          style={{
            fontSize: "24px",
            color: "#333",
          }}
        >
          {time}
        </span>
      </div>
    </header>
  );
}

export default Header;
