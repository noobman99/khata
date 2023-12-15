import { useContext } from "react";
import { CoreDataContext } from "../Contexts/DataContext";

export default function useCoreDataContext() {
  let context = useContext(CoreDataContext);

  if (!context) {
    throw new Error(
      "useCoreDataContext must be used within a CoreDataContextProvider"
    );
  }

  return context;
}
