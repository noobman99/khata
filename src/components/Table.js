import { Link } from "react-router-dom";
import "../css/Table.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";
import { toast } from "react-toastify";
import { useState } from "react";

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Reason</th>
        <th>Amount</th>
        <th className="smscr-only"></th>
        <th className="bigscr-only">Category</th>
        <th className="bigscr-only">Controls</th>
      </tr>
    </thead>
  );
};

const TableRow = (props) => {
  const API_URL =
    process.env.REACT_APP_BACKEND + "/transactions/" + props.data.rowid;

  const [expanded, setExpanded] = useState(false);
  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  let { user, dispatch } = useCoreDataContext();
  const onDel = (rowid) => {
    dispatch({ type: "Del_Transaction", payload: rowid });
  };

  const deleteTransaction = () => {
    if (window.confirm("Do you want to delete transaction?")) {
      fetch(API_URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.autoken}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            onDel(props.data.rowid);
            toast.success("Deleted transaction successfully.");
          } else if (res.status === 800 || res.status === 801) {
            res.json().then((res_data) => {
              toast.error(res_data.error + " Please login again.");
              localStorage.removeItem(process.env.REACT_APP_TOKEN);
              dispatch({ type: "Clear_Data" });
              config.onComplete();
            });
          } else if (res.status === 403) {
            toast.error("Please login to delete transactions.");
          } else {
            res.json().then((res_data) => {
              toast.error(res_data.error);
            });
          }
        })
        .catch((err) => {
          // console.log(err);
          toast.error(
            "Failed to delete transaction. Check your internet connection."
          );
        });
    }
  };

  return (
    <>
      <tr className={props.className} onClick={toggleCollapse}>
        <td>{props.data.date}</td>
        <td>{props.data.reason}</td>
        <td>{props.data.amount}</td>
        <td className="smscr-only">
          <i
            className={
              "fa-sharp fa-solid fa-caret-down downarrow" +
              (expanded ? " inverted" : "")
            }
          />
        </td>
        <td className="bigscr-only">{props.data.category}</td>
        <td className="td-controls bigscr-only">
          <button className="table-control-button" onClick={deleteTransaction}>
            <i className="fa-regular fa-trash-can" />
          </button>
          <Link
            to={"/transactions/edit/" + props.data.rowid}
            className="table-control-button"
          >
            <i className="fa-solid fa-pen" />
          </Link>
        </td>
      </tr>
      <tr
        className={props.className + " smscr-only"}
        style={{ visibility: expanded ? "visible" : "collapse" }}
      >
        <td>
          <strong>Category :</strong>
        </td>
        <td>{props.data.category}</td>
        <td colSpan={2} className="td-controls">
          <button className="table-control-button" onClick={deleteTransaction}>
            <i className="fa-regular fa-trash-can" />
          </button>
          <Link
            to={"/transactions/edit/" + props.data.rowid}
            className="table-control-button"
          >
            <i className="fa-solid fa-pen" />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default function Table(props) {
  return (
    <table className="transaction-table">
      <TableHeader headers={props.headers} />
      <tbody>
        {props.data
          .sort((a, b) => {
            let c = new Date(a.date);
            let d = new Date(b.date);
            return d - c;
          })
          .map((row, index) => (
            <TableRow
              key={index}
              data={row}
              onDel={props.onDel}
              className={index % 2 ? "odd" : "even"}
            />
          ))}
      </tbody>
    </table>
  );
}
