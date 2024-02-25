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
  let [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = (user, config) => {
    LoadTransactions(user, dispatch, config);
  };

  console.log(isLoading);

  useEffect(() => {
    const onComplete = () => {
      setIsLoading(false);
    };
    let config = { ignore: false, onComplete };

    let user = localStorage.getItem(process.env.REACT_APP_TOKEN);
    if (user) {
      user = JSON.parse(user);
      dispatch({ type: "Set_User", payload: user });
      // load transactions from server
      fetchTransactions(user, config);
    } else {
      onComplete();
    }

    return () => {
      config.ignore = true;
    };
  }, []);

  return (
    <CoreDataContext.Provider
      value={{
        ...coreData,
        dispatch,
        fetchTransactions,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CoreDataContext.Provider>
  );
};
