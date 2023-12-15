import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
// import data from "./test/data.json";
import Transactions from "./pages/Transactions";
import Editor from "./pages/Editor";
import useCoreDataContext from "./Hooks/useCoreDataContext";
import Login from "./pages/Login";

function App() {
  let { coreData } = useCoreDataContext();

  return (
    <>
      {coreData.length ? (
        <Router>
          <Routes>
            <Route path="/edit/:id" element={<Editor type="edit" />} />
            <Route path="/new" element={<Editor type="new" />} />
            <Route path="/login" element={<Login type="login" />} />
            <Route path="/signup" element={<Login type="signup" />} />
            <Route path="/" element={<Transactions />} />
          </Routes>
        </Router>
      ) : (
        <h2> Loading </h2>
      )}
    </>
  );
}

export default App;
