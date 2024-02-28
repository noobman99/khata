import { toast } from "react-toastify";

export default function LoadTransactions(
  user,
  dispatch,
  config = { ignore: false, onComplete: () => true }
) {
  const API_URL = process.env.REACT_APP_BACKEND + "/transactions";

  fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${user.autoken}`,
    },
  })
    .then((res) => {
      if (!config.ignore) {
        if (res.ok) {
          res.json().then((res_data) => {
            dispatch({ type: "Set_Transactions", payload: res_data });
            config.onComplete();
          });
        } else if (res.status === 800 || res.status === 801) {
          res.json().then((res_data) => {
            toast.error(res_data.error);
            localStorage.removeItem(process.env.REACT_APP_TOKEN);
            dispatch({ type: "Clear_Data" });
            config.onComplete();
          });
        } else {
          res.json().then((res_data) => {
            toast.error(res_data.error);
            config.onComplete();
          });
        }
      }
    })
    .catch((err) => {
      if (!config.ignore) {
        // console.log(err);
        toast.error(
          "Failed to load your details. Check your internet connection."
        );
        config.onComplete();
      }
    });
}
