import useCoreDataContext from "../Hooks/useCoreDataContext";
import Filter from "../components/Filter";
import Table from "../components/Table";
import "../css/Transactions.css";
import { useState, useEffect } from "react";

export default function Transactions(props) {
  const headers = ["Date", "Description", "Amount", "Category", "Controls"];
  let {
    fetchTransactions,
    setIsLoading,
    user,
    transactions: coreTransactions,
  } = useCoreDataContext();
  let [transactions, setTransactions] = useState(coreTransactions);
  let [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTransactions(coreTransactions);
  }, [coreTransactions]);

  useEffect(() => {
    let config = {
      ignore: false,
      onComplete: () => {
        setIsLoading(false);
      },
    };
    fetchTransactions(user, config);

    return () => {
      config.ignore = true;
    };
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // const onDel = (rowid) => {
  //   props.setData(props.data.filter((row) => row.rowid !== rowid));
  // };

  return (
    <div className="ledger">
      <header>
        <div className="pseudo-header">
          <h1>Passbook</h1>
          <button
            className={showFilters ? "active" : ""}
            onClick={toggleFilters}
          >
            <i className="fa-solid fa-filter" />
          </button>
        </div>
      </header>
      <Filter
        // data={coreData}
        filterdata={transactions}
        setData={setTransactions}
        show={showFilters}
        setShow={setShowFilters}
      />
      <Table headers={headers} data={transactions} />
    </div>
  );
}
