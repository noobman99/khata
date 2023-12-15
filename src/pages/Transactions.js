import useCoreDataContext from "../Hooks/useCoreDataContext";
import Filter from "../components/Filter";
import Table from "../components/Table";
import "../css/Transactions.css";
import { useState, useEffect } from "react";

export default function Transactions(props) {
  const headers = ["Date", "Description", "Amount", "Category", "Controls"];
  let { coreData } = useCoreDataContext();
  let [transactions, setTransactions] = useState(coreData);

  useEffect(() => {
    setTransactions(coreData);
  }, [coreData]);

  // const onDel = (rowid) => {
  //   props.setData(props.data.filter((row) => row.rowid !== rowid));
  // };

  return (
    <section className="transactions">
      <Filter
        // data={coreData}
        filterdata={transactions}
        setData={setTransactions}
      />
      <Table headers={headers} data={transactions} />
    </section>
  );
}
