import { useState } from "react";
import "../css/Login.css";

export default function Login() {
  let [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });
  let [loginData, setLoginData] = useState({ email: "", password: "" });

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
            console.log("okay ", data);
          });
          return true;
        } else {
          // response not okay code
          res.json().then((data) => {
            console.log("not okay ", data);
            alert("not okay");
          });
          return false;
        }
      })
      .catch((err) => {
        alert("Something went wrong. Please check your internet connection.");
        console.log(err);
        return true;
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
        <div className="loginMsg">
          <div className="textcontent">
            <p className="title">Don't have an account?</p>
            <p>Sign up to save all your graph.</p>
            <button id="switch1">Sign Up</button>
          </div>
        </div>
        <div className="signupMsg visibility">
          <div className="textcontent">
            <p className="title">Have an account?</p>
            <p>Log in to see all your collection.</p>
            <button id="switch2">LOG IN</button>
          </div>
        </div>
      </div>

      <div className="frontbox">
        <form className="login" onSubmit={handleLogin}>
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

        <form className="signup hide" onSubmit={handleSignup}>
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
