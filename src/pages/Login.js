import { useState } from "react";
import "../css/Login.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function Login(props) {
  let { dispatch } = useCoreDataContext();

  let [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [loginData, setLoginData] = useState({ email: "", password: "" });

  // mode = 1 => login else signup
  let [mode, setMode] = useState(props.type === "login");

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

  const handleSubmit = async (endpoint, data) => {
    let path = process.env.REACT_APP_BACKEND + "/" + endpoint;

    fetch(path, {
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
            <p>Sign up to save all your graph.</p>
            <button id="switch1" onClick={() => setMode(0)}>
              Sign Up
            </button>
          </div>
        </div>
        <div className={"signupMsg" + (mode ? " visibility" : "")}>
          <div className="textcontent">
            <p className="title">Have an account?</p>
            <p>Log in to see all your collection.</p>
            <button id="switch2" onClick={() => setMode(1)}>
              LOG IN
            </button>
          </div>
        </div>
      </div>

      <div className={"frontbox" + (mode ? "" : " moving")}>
        <form
          className={"login" + (mode ? "" : " hide")}
          onSubmit={handleLogin}
        >
          <h2>LOG IN</h2>
          <div className="inputbox">
            <input
              type="text"
              name="email"
              placeholder="  EMAIL"
              value={loginData.email}
              onChange={handleChangeLogin}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="  PASSWORD"
              value={loginData.password}
              onChange={handleChangeLogin}
              required
            />
          </div>
          <p>FORGET PASSWORD?</p>
          <button type="submit">LOG IN</button>
        </form>

        <form
          className={"signup" + (mode ? " hide" : "")}
          onSubmit={handleSignup}
        >
          <h2>SIGN UP</h2>
          <div className="inputbox">
            <input
              type="text"
              name="username"
              placeholder="  USERNAME"
              value={signupData.username}
              onChange={handleChangeSignup}
              required
            />
            <input
              type="text"
              name="email"
              placeholder="  EMAIL"
              value={signupData.email}
              onChange={handleChangeSignup}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="  PASSWORD"
              value={signupData.password}
              onChange={handleChangeSignup}
              required
            />
          </div>
          <button type="submit">SIGN UP</button>
        </form>
      </div>
    </div>
  );
}
