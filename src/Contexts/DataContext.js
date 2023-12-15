import { createContext, useReducer, useEffect } from "react";

export const CoreDataContext = createContext({});

export const dataReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "Set_Transactions":
      return action.payload;
    case "Add_Transaction":
      return [...state, action.payload];
    case "Del_Transaction":
      return state.filter((row) => row.rowid !== action.payload);
    case "Edit_Transaction":
      return state.map((row) =>
        row.rowid === action.payload.rowid ? action.payload : row
      );
    default:
      return state;
  }
};

export const CoreDataContextProvider = ({ children }) => {
  let [coreData, dispatch] = useReducer(dataReducer, []);

  useEffect(() => {
    console.log("Fetching data");
    let ignored = false;

    fetch(process.env.REACT_APP_BACKEND)
      .then((res) => {
        if (!ignored) {
          if (res.ok) {
            res.json().then((data) => {
              dispatch({ type: "Set_Transactions", payload: data });
            });
          } else {
            res.text().then((text) => {
              alert(text);
            });
          }
        }
      })
      .catch((err) => {
        if (!ignored) {
          console.log(err);
          alert("Failed to load your details. Check your internet connection.");
        }
      });

    return () => {
      ignored = true;
    };
  }, []);

  return (
    <CoreDataContext.Provider value={{ coreData, dispatch }}>
      {children}
    </CoreDataContext.Provider>
  );
};
