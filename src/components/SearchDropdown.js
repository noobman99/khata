import { useRef, useState } from "react";

export default function Dropdown(props) {
  const onClick = (e) => {
    props.onChange(e.target.textContent);
  };

  const inputRef = useRef(null);
  const [search, setSearch] = useState();
  const [isFocused, setIsFocused] = useState();

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    // Delay closing to allow option click
    setTimeout(() => {
      setIsFocused(false);
      setTimeout(() => {
        setSearch(inputRef.current.value);
      }, 200);
    }, 100);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={props.className}>
      <div className="dropdown">
        <input
          type="text"
          name={props.name}
          value={isFocused ? search : props.data}
          autoComplete="off"
          readOnly={true}
          ref={inputRef}
          onChange={handleInput}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={props.label}
          required
        />
        <i className="fa-sharp fa-solid fa-caret-down downarrow" />

        <ul className={"dropdown__list"}>
          {props.list
            .filter((val) => {
              val.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, key) => {
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
        </ul>
      </div>
      <label>{props.label}</label>
    </div>
  );
}
