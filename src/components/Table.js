import { Link } from "react-router-dom";
import "../css/Table.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        {props.headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = (props) => {
  const API_URL =
    process.env.REACT_APP_BACKEND + "/transactions/" + props.data.rowid;

  let { user, dispatch } = useCoreDataContext();
  const onDel = (rowid) => {
    dispatch({ type: "Del_Transaction", payload: rowid });
  };

  const deleteTransaction = () => {
    fetch(API_URL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.autoken}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          onDel(props.data.rowid);
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
        alert("Failed to delete transaction. Check your internet connection.");
      });
  };

  return (
    <tr>
      <td>{props.data.date}</td>
      <td>{props.data.reason}</td>
      <td>{props.data.amount}</td>
      <td>{props.data.category}</td>
      <td className="td-controls">
        <button className="table-control-button" onClick={deleteTransaction}>
          <i className="fa-regular fa-trash-can" />
        </button>
        <Link to={"/edit/" + props.data.rowid} className="table-control-button">
          <i className="fa-solid fa-pen" />
        </Link>
      </td>
    </tr>
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
            <TableRow key={index} data={row} onDel={props.onDel} />
          ))}
      </tbody>
    </table>
  );
}
