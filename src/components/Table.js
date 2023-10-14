import { Link } from "react-router-dom";
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
      if (response.ok) {
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
          DEL
        </button>
        <Link
          to={"/edit/" + props.data.rowid}
          className="table-control-button"
        ></Link>
      </td>
    </tr>
  );
};

export default function Table(props) {
  return (
    <table>
      <TableHeader headers={props.headers} />
      <tbody>
        {props.data.map((row, index) => (
          <TableRow key={index} data={row} onDel={props.onDel} />
        ))}
      </tbody>
    </table>
  );
}
