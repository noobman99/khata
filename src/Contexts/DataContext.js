import { createContext, useReducer } from "react";
import useTransactionsLoader from "../Hooks/useTransactionsLoader";

export const CoreDataContext = createContext({});

export const dataReducer = (state, action) => {
  // console.log(action);
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

  let options = { outsideContext: true, dispatch };
  useTransactionsLoader(options);

  return (
    <CoreDataContext.Provider value={{ coreData, dispatch }}>
      {children}
    </CoreDataContext.Provider>
  );
};
