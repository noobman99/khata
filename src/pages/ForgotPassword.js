import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validEmail } from "../components/ValidityChecks";
import "../css/ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function ForgotPassword() {
  let [email, setEmail] = useState("");
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let { setIsLoading } = useCoreDataContext();

  function handleSubmit(e) {
    e.preventDefault();

    if (!validEmail(email)) {
      return;
    }

    setLoading(true);

    fetch(process.env.REACT_APP_BACKEND + "/forgotpassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Reset link sent to your email.");
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
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="forgot-password">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!loading ? (
          <button className="btn" type="submit">
            Send Reset Link
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
