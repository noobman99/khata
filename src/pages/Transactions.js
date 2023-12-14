import Filter from "../components/Filter";
import Table from "../components/Table";
import "../css/Transactions.css";
import { useState, useEffect } from "react";

export default function Transactions(props) {
  const headers = ["Date", "Description", "Amount", "Category", "Controls"];
  let [transactions, setTransactions] = useState(props.data);

  useEffect(() => {
    setTransactions(props.data);
  }, [props.data]);

  const onDel = (rowid) => {
    props.setData(props.data.filter((row) => row.rowid !== rowid));
  };

  return (
    <section className="transactions">
      <Filter
        data={props.data}
        filterdata={transactions}
        setData={setTransactions}
      />
      <Table headers={headers} data={transactions} onDel={onDel} />
    </section>
  );
}
