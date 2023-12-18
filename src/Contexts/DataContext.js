import { createContext, useEffect, useReducer } from "react";
import LoadTransactions from "../components/LoadTransactions";

const dataTemplate = {
  user: null,
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

  const fetchTransactions = (user) => {
    LoadTransactions(user, dispatch);
  };

  useEffect(() => {
    let user = localStorage.getItem(process.env.REACT_APP_TOKEN);
    if (user) {
      user = JSON.parse(user);
      dispatch({ type: "Set_User", payload: user });
      // load transactions from server
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
