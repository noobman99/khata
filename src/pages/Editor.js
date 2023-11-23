import { useNavigate, useParams } from "react-router-dom";
import "../css/Editor.css";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";

export default function Editor(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  let date = new Date();
  let [data, setData] = useState({
    date: date.toISOString().split("T")[0],
    reason: "",
    cost: "",
    category: "",
  });

  const categoryTypes = ["Food", "Travel", "Bevereges", "Shopping", "Others"];

  const API_URL = process.env.BACKEND_URL_WALLET;
  const post_path =
    API_URL + "/transactions" + (props.type === "edit" ? "/" + id : "");
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
    console.log(req_type);

    /* fetch(post_path, {
      method: req_type,
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(
        (res) => res.json(),
        (err) => console.log(err)
      )
      .then((res) => {
        // add condition of failed request
        if (false ) {
          alert("Could not add transaction.");
        } else {
          // success -- add the new transaction to the data / change the existing data
          let transactions = props.data;
          if (props.type === "edit") {
            transactions = transactions.filter(
              (val) => val.rowid !== Number(id)
            );
          }
          transactions.push(res);
          props.setData(transactions);
        }
        navigate("/", { replace: true });
      }); */
    let transactions = props.data;
    if (props.type === "edit") {
      transactions = transactions.filter((val) => val.rowid !== Number(id));
    }
    transactions.push(data);
    props.setData(transactions);
    navigate("/", { replace: true });
  };

  return (
    <div className="new-transaction">
      <form className="new-transaction-form">
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
            name="desc"
            onChange={handleChange}
            value={data.desc}
            required={true}
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
          data={data}
          attribute="category"
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
          <button className="button-blue" type="submit" onClick={submitForm}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
