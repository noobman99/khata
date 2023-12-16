import { useEffect } from "react";
import useCoreDataContext from "./useCoreDataContext";

export default function useTransactionsLoader(
  options = { outsideContext: false }
) {
  let { dispatch } = useCoreDataContext();

  if (options.outsideContext) {
    dispatch = options.dispatch;
  }

  useEffect(() => {
    let ignored = false;

    fetch(process.env.REACT_APP_BACKEND + "/transacations")
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
}
