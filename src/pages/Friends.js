import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import "../css/Friends.css";
import { toast } from "react-toastify";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function Friends() {
  let [type, setType] = useState(1);
  // type 0 = friend requests
  // type 1 = friends
  let [friends, setFriends] = useState([[], []]);
  let { dispatch, user, setIsLoading } = useCoreDataContext();

  const addFriendLink = `${process.env.REACT_APP_FRONTEND_URL}/addFriend?id=${user.uId}`;
  // const addFriendLink = `https://khata.netlify.app/addFriend?id=USR1234567`;

  const removeEntry = (id) => {
    setFriends((prev) => {
      prev[type] = prev[type].filter((friend) => friend.uId !== id);
      return [...prev];
    });
  };

  const addtofriends = (friend) => {
    setFriends((prev) => {
      prev[1].push(friend);
      return [...prev];
    });
  };

  console.log("friendsss");

  const copyLink = (e) => {
    if (
      typeof navigator !== undefined &&
      typeof navigator.clipboard !== "undefined" &&
      navigator.permissions !== "undefined"
    ) {
      navigator.permissions
        .query({ name: "clipboard-write" })
        .then((permission) => {
          if (permission.state === "granted" || permission.state === "prompt") {
            navigator.clipboard
              .writeText(addFriendLink)
              .then(() => {
                toast.success("Successfully copied link.");
              })
              .catch((e) => {
                console.log(e);
                toast.error("Cannot copy link.");
              });
          } else {
            toast.error("Cannot copy link due to insufficient permissions.");
          }
        });
    } else if (
      document.queryCommandSupported &&
      document.queryCommandSupported("copy")
    ) {
      var textarea = document.createElement("textarea");
      textarea.textContent = addFriendLink;
      textarea.style.height = 0;
      textarea.style.width = 0;
      textarea.style.opacity = 0;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        toast.success("Successfully copied link.");
      } catch (e) {
        console.log(e);
        document.body.removeChild(textarea);
        toast.error("Cannot copy link.");
      }
    } else {
      toast.error("Cannot copy link.");
    }
  };

  useEffect(() => {
    // fetch friends

    setIsLoading(true);

    let url = process.env.REACT_APP_BACKEND + "/profile";
    let ignore = false;

    async function fetchFriends() {
      try {
        let res = await fetch(url + "/friends", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.autoken}`,
          },
        });

        if (ignore) return;
        if (res.ok) {
          let data = await res.json();
          setFriends((prev) => {
            prev[1] = data;
            return [...prev];
          });
        } else if (res.status === 800 || res.status === 801) {
          let data = await res.json();
          toast.error(data.error + " Please login again.");
          localStorage.removeItem(process.env.REACT_APP_TOKEN);
          dispatch({ type: "Clear_Data" });
        } else if (res.status === 403) {
          toast.error("Please login to perform this operation.");
        } else {
          let data = await res.json();
          toast.error(data.error);
        }
      } catch (err) {
        console.error(err);
        toast.error("Please check your internet connection.");
      }

      try {
        let res = await fetch(url + "/friendrequests", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.autoken}`,
          },
        });

        if (ignore) return;
        if (res.ok) {
          let data = await res.json();
          setFriends((prev) => {
            prev[0] = data;
            return [...prev];
          });
        } else if (res.status === 800 || res.status === 801) {
          let data = await res.json();
          toast.error(data.error + " Please login again.");
          localStorage.removeItem(process.env.REACT_APP_TOKEN);
          dispatch({ type: "Clear_Data" });
        } else if (res.status === 403) {
          toast.error("Please login to perform this operation.");
        } else {
          let data = await res.json();
          toast.error(data.error);
        }
      } catch (err) {
        console.error(err);
        toast.error("Please check your internet connection.");
      }
    }

    fetchFriends().then(() => {
      setIsLoading(false);
    });
  }, []);

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
        <button onClick={copyLink}>
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
        {friends[type].map((friend) => (
          <Friend
            key={friend.uId}
            data={friend}
            type={type}
            removeEntry={removeEntry}
            addtofriends={addtofriends}
          />
        ))}
      </div>
    </div>
  );
}
