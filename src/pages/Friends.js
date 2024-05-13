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
  let { dispatch, user } = useCoreDataContext();

  const addFriendLink = `http://localhost:3000/addFriend?id=${user.uId}`;
  // const addFriendLink = `https://khata.netlify.app/addFriend?id=USR1234567`;

  const removeEntry = (id) => {
    setFriends((prev) => prev.filter((friend) => friend.uId !== id));
  };

  console.log("friendsss");

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
        Authorization: `Bearer ${user.autoken}`,
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
      <div className="friend-link">
        <div>
          <span>{addFriendLink}</span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(addFriendLink);
            toast.success("Link copied to clipboard.");
          }}
        >
          <i className="fas fa-copy"></i>
        </button>
      </div>
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
        {friends.map((friend) => (
          <Friend
            key={friend.uId}
            data={friend}
            type={type}
            removeEntry={removeEntry}
          />
        ))}
      </div>
    </div>
  );
}
