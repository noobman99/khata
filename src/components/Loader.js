import logo from "../assets/logo.png";
import "../css/Loader.css";

export default function Loader(props) {
  return (
    <div className="loader">
      <div className="loader-box">
        <div className="loader-spinner"></div>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}
