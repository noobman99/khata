import logo from "../assets/logo.png";
import "../css/Loader.css";

export default function Loader({ asBody = false }) {
  return (
    <div className={"loader" + (asBody ? " asbody" : "")}>
      <div className="loader-box">
        <div className="loader-spinner"></div>
        <img src={logo} alt="MyKhataApp" />
      </div>
    </div>
  );
}
