import { useNavigate, useParams } from "react-router-dom";
import "../css/Editor.css";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import useCoreDataContext from "../Hooks/useCoreDataContext";

export default function Editor(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  let { transactions, user, dispatch } = useCoreDataContext();

  let [data, setData] = useState({
    date: new Date().toISOString().split("T")[0],
    reason: "",
    amount: "",
    category: "Other",
  });

  const categoryTypes = ["Food", "Travel", "Bevereges", "Shopping", "Others"];

  const API_URL =
    process.env.REACT_APP_BACKEND +
    "/transactions" +
    (props.type === "edit" ? "/" + id : "");
  let req_type = props.type === "edit" ? "PUT" : "POST";

  useEffect(() => {
    if (props.type === "edit") {
      let req_val = transactions.filter((val) => val.rowid === Number(id))[0];
      if (req_val) {
        setData(req_val);
      } else {
        alert("Undefined transaction!");
        navigate("/", { replace: true });
      }
    }
  }, [id, props.type, navigate, transactions]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const redir = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  const submitForm = (e) => {
    e.preventDefault();

    fetch(API_URL, {
      method: req_type,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.autoken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res_data) => {
            let action;
            if (props.type === "edit") {
              action = {
                type: "Edit_Transaction",
                payload: data,
              };
            } else {
              data.rowid = res_data.insertId;
              action = {
                type: "Add_Transaction",
                payload: data,
              };
            }
            dispatch(action);
            navigate("/", { replace: true });
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
            navigate("/", { replace: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Could not ${
            props.type === "edit" ? "update" : "add"
          } transaction. Please check your internet connection.`
        );
      });
  };

  return (
    <div className="new-transaction">
      <header>
        <h1>
          <span>{props.type.slice(0, 1).toUpperCase()}</span>
          {props.type.slice(1)} <span>T</span>ransaction
        </h1>
      </header>
      <form className="new-transaction-form" onSubmit={submitForm}>
        <div className="input-group">
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={data.date}
            required
          />
          <label>Date</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Reason"
            name="reason"
            onChange={handleChange}
            value={data.reason}
            required
          />
          <label>Expenditure For</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
            value={data.amount}
            required
          />
          <label>Amount</label>
        </div>
        <Dropdown
          className="input-group"
          label="Category"
          list={categoryTypes}
          data={data.category}
          name="category"
          onChange={(val) => {
            setData({
              ...data,
              category: val,
            });
          }}
        />
        <div className="new-transaction-form-footer">
          <button onClick={redir} className="button-red">
            Cancel
          </button>
          <button className="button-blue" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
