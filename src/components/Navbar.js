import { Link, useNavigate } from "react-router-dom";
import useCoreDataContext from "../Hooks/useCoreDataContext";
import "../css/Navbar.css";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, dispatch } = useCoreDataContext();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN);
    dispatch({
      type: "Clear_Data",
    });
  };

  return (
    <nav>
      <img src={logo} alt="" className="logo" onClick={() => navigate("/")} />
      <div className="navigation">
        {user ? (
          <>
            <Link to="/transactions/new">Add</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
