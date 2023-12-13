import { Link } from "react-router-dom";
import "../css/Table.css";

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
  const API_URL = process.env.REACT_APP_BACKEND;

  const deleteTransaction = () => {
    fetch(API_URL + "/" + props.data.rowid, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok || true /* add condition of success request */) {
        props.onDel(props.data.rowid);
      } else {
        alert("Failed to delete transaction");
      }
    });
  };

  return (
    <tr>
      <td>{props.data.date}</td>
      <td>{props.data.reason}</td>
      <td>{props.data.amount}</td>
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
