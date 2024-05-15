import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function AddFriend() {
  let [query] = useSearchParams();
  let friendId = query.get("id");
  let { dispatch, user } = useCoreDataContext();
  const navigate = useNavigate();

  if (!friendId) {
    toast.error("Invalid url.");
    return <Navigate to="/" />;
  }

  useEffect(() => {
    let url = process.env.REACT_APP_BACKEND + "/profile/addfriend";

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.autoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ friendId }),
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Friend request sent.");
        } else if (res.status === 800 || res.status === 801) {
          res.json().then((res_data) => {
            toast.error(res_data.error + " Please login again.");
            localStorage.removeItem(process.env.REACT_APP_TOKEN);
            dispatch({ type: "Clear_Data" });
          });
        } else if (res.status === 403) {
          toast.error("Please login to perform this operation.");
        } else {
          res.json().then((res_data) => {
            toast.error(res_data.error);
          });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Please check your internet connection.");
      })
      .finally(() => {
        setTimeout(() => {
          navigate("/friends", { replace: true });
        }, 1000);
      });
  }, [friendId]);

  return <Loader asBody={true} />;
}
