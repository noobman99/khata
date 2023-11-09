import { useEffect, useState } from "react";
import "../css/Filter.css";

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
  const basefilter = { min: 0, max: Infinity, from: "2023-01-01", to: today };
  let [filters, setFilters] = useState(basefilter);

  const handleChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFilters(basefilter);
    props.setData(props.data);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    props.setData(sieve(props.data, filters));
  };

  useEffect(() => {
    props.setData(sieve(props.data, filters));
  }, []);

  return (
    <form className="transaction-filters active">
      <div className="transaction-filter-container">
        <div className="filter">
          <input
            type="date"
            name="from"
            id="from"
            onChange={handleChange}
            value={filters.from}
          />
          <label htmlFor="date">From</label>
        </div>
        <div className="filter">
          <input
            type="date"
            name="to"
            id="to"
            onChange={handleChange}
            value={filters.to}
          />
          <label htmlFor="date">To</label>
        </div>
        <div className="filter">
          <input
            type="number"
            name="max"
            id="max"
            onChange={handleChange}
            value={filters.max}
          />
          <label htmlFor="date">Max Cost</label>
        </div>
        <div className="filter">
          <input
            type="number"
            name="min"
            id="min"
            onChange={handleChange}
            value={filters.min}
          />
          <label htmlFor="date">Min Cost</label>
        </div>
      </div>
      <div className="transaction-filter-footer">
        <button onClick={handleConfirm} className="confirm">
          Apply
        </button>
        <button onClick={handleClear} className="clear">
          Clear
        </button>
      </div>
    </form>
  );
}
