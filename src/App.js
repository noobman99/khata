import React from "react";
import "./css/App.css";
import Transactions from "./pages/Transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
