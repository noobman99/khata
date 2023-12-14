import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
// import data from "./test/data.json";
import Transactions from "./pages/Transactions";
import Editor from "./pages/Editor";

function App() {
  let [coreData, setCoreData] = useState([]);

  const fetchData = () => {
    fetch(process.env.REACT_APP_BACKEND)
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setCoreData(data);
          });
        } else {
          res.text().then((text) => {
            alert(text);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to load your details. Check your internet connection.");
      });
  };

  useEffect(() => {
    console.log("Fetching data");
    let ignored = false;

    fetch(process.env.REACT_APP_BACKEND)
      .then((res) => {
        if (!ignored) {
          if (res.ok) {
            res.json().then((data) => {
              setCoreData(data);
            });
          } else {
            res.text().then((text) => {
              alert(text);
            });
          }
        }
      })
      .catch((err) => {
        if (!ignored) {
          console.log(err);
          alert("Failed to load your details. Check your internet connection.");
        }
      });

    return () => {
      ignored = true;
    };
  }, []);

  return (
    <>
      {coreData.length ? (
        <Router>
          <Routes>
            <Route
              path="/edit/:id"
              element={
                <Editor type="edit" data={coreData} setData={setCoreData} />
              }
            />
            <Route
              path="/new"
              element={
                <Editor type="new" data={coreData} setData={setCoreData} />
              }
            />
            <Route
              path="/"
              element={<Transactions data={coreData} setData={setCoreData} />}
            />
          </Routes>
        </Router>
      ) : (
        <h2> Loading </h2>
      )}
    </>
  );
}

export default App;
