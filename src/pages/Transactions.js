import Table from "../components/Table";
import data from "../test/data.json";
import { useState, useEffect } from "react";

export default function Transactions() {
  const headers = ["Date", "Description", "Amount", "Controls"];
  let [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(data);
  }, []);

  const onDel = (rowid) => {
    setTransactions(transactions.filter((row) => row.rowid !== rowid));
  };

  return <Table headers={headers} data={transactions} onDel={onDel}></Table>;
}
