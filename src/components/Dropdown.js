// import { useEffect, useState } from "react";
import { useRef, useState } from "react";
import "../css/Dropdown.css";

export default function Dropdown(props) {
  const onClick = (e) => {
    props.onChange(e.target.textContent);
    setNewEntryVal("");
  };

  const [newEntry, setNewEntry] = useState(false);
  const [newEntryVal, setNewEntryVal] = useState("");
  const inputRef = useRef(null);

  const focusOut = (e) => {
    if (newEntryVal != "") {
      props.onChange(newEntryVal);
    }
    setNewEntry(false);
  };

  const enableNewEntry = () => {
    setNewEntry(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInput = (e) => {
    setNewEntryVal(e.target.value);
  };

  return (
    <div className={props.className}>
      <div className="dropdown">
        <input
          type="text"
          name={props.name}
          value={newEntry ? newEntryVal : props.data}
          autoComplete="off"
          readOnly={!newEntry}
          onBlur={focusOut}
          ref={inputRef}
          onChange={handleInput}
          placeholder={props.label}
          required
        />
        {!newEntry && (
          <>
            <i className="fa-sharp fa-solid fa-caret-down downarrow" />

            <ul className={"dropdown__list"}>
              {props.list.map((val, key) => {
                return (
                  <li
                    className={
                      "dropdown__list-item" +
                      (val === props.data ? " selected" : "")
                    }
                    key={key}
                    onClick={onClick}
                  >
                    {val}
                  </li>
                );
              })}
              {props.addButton && (
                <li
                  className="dropdown__list-item add-button"
                  style={{ textAlign: "center", color: "var(--font-green)" }}
                  onClick={enableNewEntry}
                >
                  <i className="fab fa-plus" /> Add
                </li>
              )}
            </ul>
          </>
        )}
      </div>
      <label>{props.label}</label>
    </div>
  );
}
