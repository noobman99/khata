export default function LoadTransactions(user, dispatch) {
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
}
