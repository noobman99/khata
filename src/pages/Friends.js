import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import "../css/Friends.css";
import { toast } from "react-toastify";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function Friends() {
  let [type, setType] = useState(1);
  // type 0 = friend requests
  // type 1 = friends
  let [friends, setFriends] = useState([]);
  let { dispatch } = useCoreDataContext();

  useEffect(() => {
    // fetch friends
    let url = process.env.REACT_APP_BACKEND + "/profile";
    let ignore = false;

    if (type) {
      url += "/friends";
    } else {
      url += "/friendrequests";
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (ignore) return;
        if (res.ok) {
          res.json().then((data) => {
            setFriends(data);
          });
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
        if (ignore) return;
        console.error(err);
        toast.error("Please check your internet connection.");
      });

    return () => {
      ignore = true;
    };
  }, [type]);

  return (
    <div className="friends-page">
      <header>
        <h1>
          <span>Y</span>our&nbsp;
          <span>F</span>riends
        </h1>
      </header>
      <div className="friends-toggle">
        <button
          className={type ? "active" : ""}
          onClick={() => {
            setType(1);
          }}
        >
          Friends
        </button>
        <button
          className={type ? "" : "active"}
          onClick={() => {
            setType(0);
          }}
        >
          Requests
        </button>
      </div>
      <div className="friends-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <Friend key={i} type={type} />
        ))}
      </div>
    </div>
  );
}
