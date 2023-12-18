import { useEffect, useRef, useState } from "react";
import "../css/Login.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let { dispatch, fetchTransactions } = useCoreDataContext();
  const navigate = useNavigate();

  let [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [loginData, setLoginData] = useState({ email: "", password: "" });

  // mode = 1 => login else signup
  let [mode, setMode] = useState(props.type === "login");
  let [logPassVisible, setLogPassVisible] = useState(false);
  let [signPassVisible, setSignPassVisible] = useState(false);
  let loginPassRef = useRef(null);
  let signupPassRef = useRef(null);

  // switch from login to signup and vice-verse as well as clear data
  const changeForm = (toMode) => {
    setMode(toMode);
    setLoginData({ email: "", password: "" });
    setSignupData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleChangeSignup = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleLogPass = () => {
    setLogPassVisible(!logPassVisible);
  };
  const toggleSignPass = () => {
    setSignPassVisible(!signPassVisible);
  };

  // sets password visible to false if click outside password input box
  useEffect(() => {
    const clickListener = (e) => {
      if (e.target.parentNode !== loginPassRef.current) {
        setLogPassVisible(false);
      }
    };

    if (logPassVisible) {
      window.addEventListener("click", clickListener);
    }

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [logPassVisible]);
  useEffect(() => {
    const clickListener = (e) => {
      if (e.target.parentNode !== signupPassRef.current) {
        setSignPassVisible(false);
      }
    };

    if (signPassVisible) {
      window.addEventListener("click", clickListener);
    }

    return () => {
      window.removeEventListener("click", clickListener);
    };
  }, [signPassVisible]);

  const handleSubmit = async (endpoint, data) => {
    const API_URL = process.env.REACT_APP_BACKEND + "/" + endpoint;

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
            };
            dispatch({
              type: "Set_User",
              payload: user,
            });
            localStorage.setItem(
              process.env.REACT_APP_TOKEN,
              JSON.stringify(user)
            );
            fetchTransactions(user);
            setLoginData({ email: "", password: "" });
            setSignupData({ email: "", password: "", username: "" });
            navigate("/");
          });
        } else {
          res.json().then((data) => {
            alert(data.error);
          });
        }
      })
      .catch((err) => {
        alert("Something went wrong. Please check your internet connection.");
        console.log(err);
      })
      .finally(() => {
        setLoginData({ ...loginData, password: "" });
        setSignupData({ ...signupData, password: "" });
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    handleSubmit("login", loginData);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    handleSubmit("signup", signupData);
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
        <form
          className={"login" + (mode ? "" : " hide")}
          onSubmit={handleLogin}
        >
          <h2>Log In</h2>
          <div className="inputbox">
            <div className="input-group">
              <input
                type="text"
                name="email"
                placeholder=" Email"
                value={loginData.email}
                onChange={handleChangeLogin}
                required
              />
            </div>
            <div className="input-group" ref={loginPassRef}>
              <input
                type={logPassVisible ? "text" : "password"}
                name="password"
                placeholder=" Password"
                value={loginData.password}
                onChange={handleChangeLogin}
                required
              />
              {loginData.password !== "" && (
                <i
                  className={
                    "fa-solid fa-eye" + (!logPassVisible ? "-slash" : "")
                  }
                  onClick={toggleLogPass}
                />
              )}
            </div>
          </div>
          <p>FORGET PASSWORD?</p>
          <button type="submit">LOG IN</button>
        </form>

        <form
          className={"signup" + (mode ? " hide" : "")}
          onSubmit={handleSignup}
        >
          <h2>Sign Up</h2>
          <div className="inputbox">
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder=" Username"
                value={signupData.username}
                onChange={handleChangeSignup}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="email"
                placeholder=" Email"
                value={signupData.email}
                onChange={handleChangeSignup}
                required
              />
            </div>
            <div className="input-group" ref={signupPassRef}>
              <input
                type={signPassVisible ? "text" : "password"}
                name="password"
                placeholder=" Password"
                value={signupData.password}
                onChange={handleChangeSignup}
                required
              />
              {signupData.password !== "" && (
                <i
                  className={
                    "fa-solid fa-eye" + (!signPassVisible ? "-slash" : "")
                  }
                  onClick={toggleSignPass}
                />
              )}
            </div>
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}
