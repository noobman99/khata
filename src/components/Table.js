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
  const API_URL = process.env.BACKEND_URL_WALLET;

  const deleteTransaction = () => {
    fetch(API_URL + "/transactions/" + props.data.rowid, {
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
      <td>{props.data.desc}</td>
      <td>{props.data.amount}</td>
      <td className="td-controls">
        <button className="table-control-button" onClick={deleteTransaction}>
          <i class="fa-regular fa-trash-can" />
        </button>
        <Link to={"/edit/" + props.data.rowid} className="table-control-button">
          <i class="fa-solid fa-pen" />
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
        {props.data.map((row, index) => (
          <TableRow key={index} data={row} onDel={props.onDel} />
        ))}
      </tbody>
    </table>
  );
}
