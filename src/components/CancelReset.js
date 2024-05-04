import { useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function CancelReset() {
  let [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    let ignore = false;

    fetch(process.env.REACT_APP_BACKEND + "/cancelreset", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email, token }),
    })
      .then((res) => {
        if (ignore) return;
        if (res.ok) {
          toast.success("Cancelled password reset.");
        } else if (res.code === 403) {
          toast.error("You are not allowed to reset this password.");
        } else {
          res.json().then((data) => {
            toast.error(data.error);
          });
        }
      })
      .catch((err) => {
        toast.error(
          "Something went wrong. Please check your internet connection."
        );
      })
      .finally(() => {
        setTimeout(() => {
          if (ignore) return;
          close();
        }, 2000);
      });

    return () => {
      ignore = true;
    };
  }, []);
  return <Loader asBody={true} />;
}
