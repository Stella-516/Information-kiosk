import { Outlet } from "react-router-dom";
import museumBg from "../assets/museum.png";
import "../index.css";

export default function FeedbackLayout() {
  return (
    <div className="museum-bg" style={{ backgroundImage: `url(${museumBg})` }}>
      <div className="museum-bg__content">
        <Outlet />
      </div>
    </div>
  );
}
