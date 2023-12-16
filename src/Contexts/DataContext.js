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

  const fetchTransactions = (user, toNavigate = false) => {
    const API_URL = process.env.REACT_APP_BACKEND + "/transactions";

    fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.autoken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res_data) => {
            dispatch({ type: "Set_Transactions", payload: res_data });
          });
        } else if (res.status === 800 || res.status === 801) {
          res.json().then((res_data) => {
            alert(res_data.error);
            localStorage.removeItem(process.env.REACT_APP_TOKEN);
            dispatch({ type: "Clear_Data" });
          });
        } else {
          res.json().then((res_data) => {
            alert(res_data.error);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load your details. Check your internet connection.");
      });
  };

  useEffect(() => {
    let user = localStorage.getItem(process.env.REACT_APP_TOKEN);
    if (user) {
      user = JSON.parse(user);
      dispatch({ type: "Set_User", payload: user });
      // load transactions
      fetchTransactions(user);
    }
  }, []);

  return (
    <CoreDataContext.Provider
      value={{ ...coreData, dispatch, fetchTransactions }}
    >
      {children}
    </CoreDataContext.Provider>
  );
};
