import { useEffect, useState } from "react";
import "../css/Dropdown.css";

export default function Dropdown(props) {
  let [search, setSearch] = useState(props.data[props.attribute]);
  let [focused, setFocused] = useState(false);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (focused) {
      setSearch(props.data[props.attribute]);
    }
  }, [focused]);

  useEffect(() => {
    setSearch(props.data[props.attribute]);
  }, [props.data]);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const onClick = (e) => {
    props.onChange(e.target.textContent);
  };

  return (
    <div className={props.className}>
      <div className="dropdown">
        <input
          type="text"
          name="search"
          value={focused ? search : props.data[props.attribute]}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onSearch}
          autoComplete="off"
        />
        <ul
          className={"dropdown__list" + (focused ? " dropdown-active" : "")}
          // style={props.style}
        >
          {props.list
            .filter((val) => {
              return (
                !search || val.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((val, key) => {
              return (
                <li
                  className={
                    "dropdown__list-item" +
                    (val === props.data[props.attribute] ? " select-value" : "")
                  }
                  key={key}
                  onClick={onClick}
                  value={val}
                >
                  {val}
                </li>
              );
            })}
        </ul>
      </div>
      <label>{props.label}</label>
    </div>
  );
}
