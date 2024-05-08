import Friend from "../components/Friend";
import "../css/Friends.css";

export default function Friends() {
  return (
    <div className="friends-page">
      <header>
        <h1>
          <span>Y</span>our&nbsp;
          <span>F</span>riends
        </h1>
      </header>
      <div className="friends-toggle">
        <button className="active">Friends</button>
        <button>Requests</button>
      </div>
      <div className="friends-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <Friend key={i} />
        ))}
      </div>
    </div>
  );
}
