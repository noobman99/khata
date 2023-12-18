import { useState } from "react";
import "../css/Filter.css";
import useCoreDataContext from "../Hooks/useCoreDataContext";

const sieve = (data, filters) => {
  let filteredData = data;
  const filtermap = {
    max: ["amount", 2],
    min: ["amount", 1],
    from: ["date", 1],
    to: ["date", 2],
  };
  for (let filter in filters) {
    if (filters[filter] !== null && filters[filter] !== "") {
      filteredData = filteredData.filter((row) => {
        let a, b;
        if (filtermap[filter][0] === "date") {
          a = new Date(row[filtermap[filter][0]]);
          b = new Date(filters[filter]);
          a = a.getTime();
          b = b.getTime();
        } else {
          a = row[filtermap[filter][0]];
          b = filters[filter];
        }

        return filtermap[filter][1]
          ? filtermap[filter][1] === 1
            ? a >= b
            : a <= b
          : a === b;
      });
    }
  }
  return filteredData;
};

export default function Filter(props) {
  const today = new Date().toISOString().split("T")[0];
  const basefilter = { min: "", max: "", from: "2023-01-01", to: today };
  let [filters, setFilters] = useState(basefilter);
  let { transactions } = useCoreDataContext();

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    props.setShow(false);
    props.setData(transactions);
    setFilters(basefilter);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    props.setData(sieve(transactions, filters));
  };

  return (
    <form className={"transaction-filters" + (props.show ? " active" : "")}>
      <div className="transaction-filter-container">
        <div className="filter input-group">
          <input
            type="date"
            name="from"
            id="from"
            onChange={handleChange}
            value={filters.from}
          />
          <label htmlFor="date">From</label>
        </div>
        <div className="filter input-group">
          <input
            type="date"
            name="to"
            id="to"
            onChange={handleChange}
            value={filters.to}
          />
          <label htmlFor="date">To</label>
        </div>
        <div className="filter input-group">
          <input
            type="number"
            name="max"
            id="max"
            onChange={handleChange}
            value={filters.max}
            placeholder="Max Cost"
          />
          <label htmlFor="date">Max Cost</label>
        </div>
        <div className="filter input-group">
          <input
            type="number"
            name="min"
            id="min"
            onChange={handleChange}
            value={filters.min}
            placeholder="Min Cost"
          />
          <label htmlFor="date">Min Cost</label>
        </div>
      </div>
      <div className="transaction-filter-footer">
        <button onClick={handleConfirm} className="button-blue">
          Apply
        </button>
        <button onClick={handleClear} className="button-red">
          Clear
        </button>
      </div>
    </form>
  );
}
