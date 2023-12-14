import { useNavigate, useParams } from "react-router-dom";
import "../css/Editor.css";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";

export default function Editor(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  let [data, setData] = useState({
    date: new Date().toISOString().split("T")[0],
    reason: "",
    amount: "",
  });

  const categoryTypes = ["Food", "Travel", "Bevereges", "Shopping", "Others"];

  const API_URL = process.env.REACT_APP_BACKEND;
  const post_path = API_URL + (props.type === "edit" ? "/" + id : "");
  let req_type = props.type === "edit" ? "PUT" : "POST";

  useEffect(() => {
    if (props.type === "edit") {
      let req_val = props.data.filter((val) => val.rowid === Number(id))[0];
      if (req_val) {
        setData(req_val);
      } else {
        alert("Undefined transaction!");
        navigate("/", { replace: true });
      }
    }
  }, [id, props.type, navigate, props.data]);

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

  //console.log(data.category);

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(req_type, post_path);
    // console.log(data);

    fetch(post_path, {
      method: req_type,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((res_data) => {
            let _transactions = props.data;
            if (props.type === "edit") {
              _transactions = props.data.filter(
                (val) => val.rowid !== Number(id)
              );
            } else {
              data.rowid = res_data.insertId;
            }
            _transactions.push(data);
            props.setData(_transactions);
          });
        } else {
          res.text().then((res_data) => {
            alert(res_data);
          });
        }
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        alert(
          `Could not ${
            props.type === "edit" ? "update" : "add"
          } transaction. Please check your internet connection.`
        );
      });

    // let transactions = props.data;
    // if (props.type === "edit") {
    //   transactions = transactions.filter((val) => val.rowid !== Number(id));
    // }
    // transactions.push(data);
    // props.setData(transactions);
    // navigate("/", { replace: true });
  };

  return (
    <div className="new-transaction">
      <form className="new-transaction-form" onSubmit={submitForm}>
        <div className="title">{props.type} Transaction</div>
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
        {/* <Dropdown
          className="input-group"
          label="Category"
          list={categoryTypes}
          data={data}
          attribute="category"
          onChange={(val) => {
            setData({
              ...data,
              category: val,
            });
          }}
        /> */}
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
