import { Link } from "react-router-dom";
import "../css/ChoiceBox.css";

export default function ChoiceBox() {
  return (
    <div className="choice-box">
      <h2>Choose Type of Transaction</h2>
      <Link to="/transactions/new?type=income" className="income">
        Income
      </Link>
      <Link to="/transactions/new?type=expense" className="expense">
        Expense
      </Link>
      <Link to="/borrowing" className="borrowing">
        Borrowing
      </Link>
    </div>
  );
}
