import { createContext, useEffect, useReducer, useState } from "react";
import LoadTransactions from "../components/LoadTransactions";

const dataTemplate = {
  user: null,
  transactions: [],
  categories: ["Food", "Travel", "Shopping"],
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
    case "Set_Categories":
      return {
        ...state,
        categories: [...state.categories, ...action.payload],
      };
    case "New_Category":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "Clear_Data":
      return dataTemplate;
    default:
      return state;
  }
};

export const CoreDataContextProvider = ({ children }) => {
  let [coreData, dispatch] = useReducer(dataReducer, dataTemplate);
  let [isLoading, setIsLoading] = useState(false);
  let [isInit, setIsInit] = useState(true);
  let [transactionsFetched, setTransactionsFetched] = useState(false);

  const fetchTransactions = (user, config) => {
    if (transactionsFetched) return;

    console.log("fetching transaction");

    LoadTransactions(user, dispatch, config);
    setIsLoading(true);
    setTransactionsFetched(true);
  };

  // console.log(isLoading);

  useEffect(() => {
    let user_data = localStorage.getItem(process.env.REACT_APP_TOKEN);
    if (user_data) {
      let { user, categories } = JSON.parse(user_data);
      dispatch({ type: "Set_User", payload: user });
      dispatch({ type: "Set_Categories", payload: categories });
      // load transactions from server
      // fetchTransactions(user, config);
    }

    setIsInit(false);
  }, []);

  return (
    <CoreDataContext.Provider
      value={{
        ...coreData,
        dispatch,
        fetchTransactions,
        isLoading,
        setIsLoading,
        isInit,
      }}
    >
      {children}
    </CoreDataContext.Provider>
  );
};
