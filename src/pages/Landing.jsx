import { useNavigate } from "react-router-dom";
import poster from "../assets/poster.png";

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/guide");
  };

  return (
    <div
      className="w-screen h-screen bg-black cursor-pointer relative overflow-hidden"
      onClick={handleClick}
    >
      <img
        src={poster}
        alt="나눔과 소통의 미학전"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default Landing;
