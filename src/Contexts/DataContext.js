import { createContext, useEffect, useReducer } from "react";
// import LoadTransactions from "../Hooks/LoadTransactions";

const dataTemplate = {
  user: { username: "", autoken: "" },
  transactions: [],
};

export const CoreDataContext = createContext({});

export const dataReducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "Set_Transactions":
      return { ...state, transactions: action.payload };
    case "Add_Transaction":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "Del_Transaction":
      return {
        ...state,
        transactions: state.transactions.filter(
          (row) => row.rowid !== action.payload
        ),
      };
    case "Edit_Transaction":
      return {
        ...state,
        transactions: state.transactions.map((row) =>
          row.rowid === action.payload.rowid ? action.payload : row
        ),
      };
    case "Set_User":
      return {
        ...state,
        user: action.payload,
      };
    case "Clear_Data":
      return dataTemplate;
    default:
      return state;
  }
};

export const CoreDataContextProvider = ({ children }) => {
  let [coreData, dispatch] = useReducer(dataReducer, dataTemplate);

  useEffect(() => {
    let user = localStorage.getItem(process.env.REACT_APP_TOKEN);
    if (user) {
      // load transactions
      fetch(process.env.REACT_APP_BACKEND + "/transactions")
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              dispatch({ type: "Set_Transactions", payload: data });
              dispatch({ type: "Set_User", payload: user });
            });
          } else if (res.status === 800) {
            alert("Do not tamper with data manually.");
            dispatch({ type: "Clear_Data" });
          } else {
            res.text().then((text) => {
              alert(text);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to load your details. Check your internet connection.");
        });
    }
  }, []);

  return (
    <CoreDataContext.Provider value={{ ...coreData, dispatch }}>
      {children}
    </CoreDataContext.Provider>
  );
};
