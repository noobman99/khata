import { useState } from "react";
import { validPassword } from "../components/ValidityChecks";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import "../css/ResetPassword.css";
import { toast } from "react-toastify";

export default function ResetPassword() {
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const navigate = useNavigate();

  console.log(token, email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validPassword(password)) {
      return;
    }

    setLoading(true);
    // send request to backend
    fetch(process.env.REACT_APP_BACKEND + "/resetpassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email, password, token }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Password reset successful.");
        } else if (res.code === 403) {
          toast.error("You are not allowed to reset this password.");
        } else {
          res.json().then((data) => {
            toast.error(data.error);
          });
        }
        navigate("/login");
      })
      .catch((err) => {
        toast.error(
          "Something went wrong. Please check your internet connection."
        );
        setLoading(false);
        // console.log(err);
      });
  };

  if (!token || !email) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="reset-password">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {!loading ? (
          <button className="btn" type="submit">
            Reset Password
          </button>
        ) : (
          <div className="spinner-border" role="status" aria-hidden="true">
            <div className="spinner-inner" />
          </div>
        )}
      </form>
    </div>
  );
}
