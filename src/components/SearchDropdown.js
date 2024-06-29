import { useRef, useState } from "react";

export default function SearchDropdown(props) {
  const onClick = (value) => {
    props.onChange(value);
  };

  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
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
          value={isFocused ? search : props.data.display}
          autoComplete="off"
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
              if (search === "") {
                return true;
              }
              return val.display.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, key) => {
              return (
                <li
                  className={
                    "dropdown__list-item" +
                    (val.display === props.data ? " selected" : "")
                  }
                  key={key}
                  onClick={() => onClick(val)}
                >
                  {val.display}
                </li>
              );
            })}
        </ul>
      </div>
      <label>{props.label}</label>
    </div>
  );
}
