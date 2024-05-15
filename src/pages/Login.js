import { useEffect, useRef, useState } from "react";
import "../css/Login.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validEmail,
  validPassword,
  validText,
} from "../components/ValidityChecks";

export default function Login(props) {
  let { dispatch, setIsLoading } = useCoreDataContext();

  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // mode = 1 => login else signup
  let [mode, setMode] = useState(props.type === "login");
  let [passVisible, setPassVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let passRef = useRef(null);

  // switch from login to signup and vice-verse as well as clear data
  const changeForm = (toMode) => {
    setMode(toMode);
    setUserData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassVisible = () => {
    setPassVisible(!passVisible);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // set mode to login if type is login
  useEffect(() => {
    if (props.type === "login") {
      setMode(true);
    } else {
      setMode(false);
    }
  }, [props.type]);

  // set pass visible to false if clicked anywhere except the password input.
  useEffect(() => {
    const clickListener = (e) => {
      // console.log(e.target.parentNode, passRef.current);
      if (e.target.parentNode !== passRef.current) {
        setPassVisible(false);
      }
    };

    if (passVisible) {
      window.addEventListener("click", clickListener);
    }

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [passVisible]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const endpoint = mode ? "login" : "signup";
    const API_URL = process.env.REACT_APP_BACKEND + "/" + endpoint;
    let data;

    if (mode) {
      data = { email: userData.email, password: userData.password };
    } else {
      data = { ...userData };
    }
    // console.log(data);

    setLoading(true); // stop from multiple request generation

    // check if email and password are valid
    if (
      !validEmail(data.email) ||
      (mode === 0 &&
        (!validPassword(data.password) ||
          !validText(data.username, "Username")))
    ) {
      setLoading(false);
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          // response okay code
          res.json().then((data) => {
            let user = {
              username: data.username,
              autoken: data.token,
              email: data.email,
              uId: data.uId,
            };
            dispatch({
              type: "Set_User",
              payload: user,
            });
            dispatch({
              type: "Set_Categories",
              payload: data.categories,
            });
            localStorage.setItem(
              process.env.REACT_APP_TOKEN,
              JSON.stringify({ user, categories: data.categories })
            );

            setLoading(false);
            setUserData({ username: "", email: "", password: "" });
            setIsLoading(true);
            toast.success("Welcome " + user.username);
          });
        } else {
          setLoading(false);

          res.json().then((data) => {
            toast.error(data.error);
            setUserData({ ...userData, password: "" });
          });
        }
      })
      .catch((err) => {
        toast.error(
          "Something went wrong. Please check your internet connection."
        );
        // console.log(err);
        setLoading(false);
        setUserData({ ...userData, password: "" });
      });
  };

  return (
    <div className="container">
      <div className="backbox">
        <div className={"loginMsg" + (mode ? "" : " visibility")}>
          <div className="textcontent">
            <p className="title">Don't have an account?</p>
            <p>Sign up to save all your records.</p>
            <button id="switch1" onClick={() => changeForm(0)}>
              Sign Up
            </button>
          </div>
        </div>
        <div className={"signupMsg" + (mode ? " visibility" : "")}>
          <div className="textcontent">
            <p className="title">Have an account?</p>
            <p>Log in to see all your records.</p>
            <button id="switch2" onClick={() => changeForm(1)}>
              Log In
            </button>
          </div>
        </div>
      </div>

      <div className={"frontbox" + (mode ? "" : " moving")}>
        {mode ? (
          <form
            className={"login" + (mode ? "" : " hide")}
            onSubmit={handleSubmit}
          >
            <h2>Log In</h2>
            <div className="inputbox">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" Email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group" ref={passRef}>
                <input
                  type={passVisible ? "text" : "password"}
                  name="password"
                  placeholder=" Password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                />
                {userData.password !== "" && (
                  <i
                    className={
                      "fa-solid fa-eye" + (!passVisible ? "-slash" : "")
                    }
                    onClick={togglePassVisible}
                  />
                )}
              </div>
            </div>
            <Link to="/forgot-password">
              <p>FORGOT PASSWORD?</p>
            </Link>
            {loading ? (
              <div className="spinner-border" role="status" aria-hidden="true">
                <div className="spinner-inner" />
              </div>
            ) : (
              <button type="submit">LOG IN</button>
            )}
          </form>
        ) : (
          <form
            className={"signup" + (mode ? " hide" : "")}
            onSubmit={handleSubmit}
          >
            <h2>Sign Up</h2>
            <div className="inputbox">
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder=" Username"
                  value={userData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder=" Email"
                  value={userData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group" ref={passRef}>
                <input
                  type={passVisible ? "text" : "password"}
                  name="password"
                  placeholder=" Password"
                  value={userData.password}
                  onChange={handleInputChange}
                  required
                />
                {userData.password !== "" && (
                  <i
                    className={
                      "fa-solid fa-eye" + (!passVisible ? "-slash" : "")
                    }
                    onClick={togglePassVisible}
                  />
                )}
              </div>
            </div>
            {loading ? (
              <div className="spinner-border" role="status" aria-hidden="true">
                <div className="spinner-inner" />
              </div>
            ) : (
              <button type="submit">SIGN UP</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
