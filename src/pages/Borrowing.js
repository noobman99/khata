import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "../css/Editor.css";
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import useCoreDataContext from "../Hooks/useCoreDataContext";
import { toast } from "react-toastify";
import {
  validDate,
  validAmount,
  validText,
} from "../components/ValidityChecks";
import SearchDropdown from "../components/SearchDropdown";
import ChoiceBox from "../components/ChoiceBox";

export default function Borrowing(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  let {
    transactions,
    user,
    expCategories,
    incCategories,
    dispatch,
    fetchTransactions,
    isLoading,
    setIsLoading,
  } = useCoreDataContext();

  let [data, setData] = useState({
    date: new Date().toISOString().split("T")[0],
    reason: "",
    amount: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  let [friends, setFriends] = useState([]);

  const API_URL =
    process.env.REACT_APP_BACKEND +
    "/transactions" +
    (props.type === "edit" ? "/" + id : "");
  let req_type = props.type === "edit" ? "PUT" : "POST";

  useEffect(() => {
    let config = {
      ignore: false,
      onComplete: () => {
        setIsLoading(false);
      },
    };
    const fetchFriends = async () => {
      let url = process.env.REACT_APP_BACKEND + "/profile/friends";

      try {
        let res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.autoken}`,
          },
        });

        if (res.ok) {
          let data = await res.json();
          setFriends(data);
          console.log(data);
        } else if (res.status === 800 || res.status === 801) {
          let data = await res.json();
          toast.error(data.error + " Please login again.");
          localStorage.removeItem(process.env.REACT_APP_TOKEN);
          dispatch({ type: "Clear_Data" });
        } else if (res.status === 403) {
          toast.error("Please login to perform this operation.");
        } else {
          let data = await res.json();
          toast.error(data.error);
        }
      } catch (err) {
        console.error(err);
        toast.error("Please check your internet connection.");
      }
    };

    fetchFriends().then(() => {
      setIsLoading(false);
      console.log("Friends fetched");
    });

    return () => {
      config.ignore = true;
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (props.type === "edit") {
      let req_val = transactions.filter((val) => val.id === Number(id))[0];
      if (req_val) {
        setData(req_val);
      } else {
        toast.error("Undefined transaction!");
        navigate("/transactions", { replace: true });
      }
    }
  }, [id, props.type, navigate, transactions]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const redir = (e) => {
    e.preventDefault();
    navigate("/transactions", { replace: true });
  };

  const submitForm = (e) => {
    e.preventDefault();

    setIsSubmitting(true); // start spinner

    // check if date and amount are valid
    if (
      !validDate(data.date) ||
      !validAmount(data.amount) ||
      !validText(data.reason, "Reason") ||
      !validText(data.category, "Category")
    ) {
      setIsSubmitting(false);
      return;
    }

    let formdata = { ...data };

    fetch(API_URL, {
      method: req_type,
      body: JSON.stringify(formdata),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${user.autoken}`,
      },
    })
      .then((res) => {
        setIsSubmitting(false);

        if (res.ok) {
          res.json().then((res_data) => {
            let action;
            if (props.type === "edit") {
              action = {
                type: "Edit_Transaction",
                payload: data,
              };
            } else {
              formdata.id = res_data.insertId;
              action = {
                type: "Add_Transaction",
                payload: formdata,
              };
            }
            dispatch(action);

            toast.success(
              (props.type === "edit" ? "Edited" : "Added new") + " transaction."
            );
            navigate("/transactions", { replace: true });
          });
        } else if (res.status === 800 || res.status === 801) {
          res.json().then((res_data) => {
            toast.error(res_data.error + " Please login again.");
            localStorage.removeItem(process.env.REACT_APP_TOKEN);
            dispatch({ type: "Clear_Data" });
            // config.onComplete();
          });
        } else if (res.status === 403) {
          toast.error("Please login to perform this operation.");
        } else {
          res.json().then((res_data) => {
            toast.error(res_data.error);
            navigate("/transactions", { replace: true });
          });
        }
      })
      .catch((err) => {
        setIsSubmitting(false);

        // console.log(err);
        toast.error(
          `Could not ${
            props.type === "edit" ? "update" : "add"
          } transaction. Please check your internet connection.`
        );
      });
  };

  return (
    <div className="new-transaction">
      <header>
        <h1>
          <span>{props.type.slice(0, 1).toUpperCase()}</span>
          {props.type.slice(1)}{" "}
        </h1>
      </header>
      <form className="new-transaction-form" onSubmit={submitForm}>
        <div className="input-group">
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={data.date}
            required
          />
          <label>Date</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Reason"
            name="reason"
            onChange={handleChange}
            value={data.reason}
            required
          />
          <label>For</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
            value={data.amount}
            required
          />
          <label>Amount</label>
        </div>
        <SearchDropdown
          className="input-group"
          label="Category"
          onChange={(val) => {
            setData({
              ...data,
              category: val,
            });
          }}
          name="category"
          data={data.category}
          list={friends.map((val) => {
            return {
              display: val.username,
              value: val.uId,
            };
          })}
        />
        <div className="new-transaction-form-footer">
          <button
            onClick={redir}
            className="button-red"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {isSubmitting ? (
            <div className="spinner-border" role="status" aria-hidden="true">
              <div className="spinner-inner" />
            </div>
          ) : (
            <button className="button-blue" type="submit">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
