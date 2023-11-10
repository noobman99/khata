import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/App.css";
import data from "./test/data.json";
import Transactions from "./pages/Transactions";
import Editor from "./pages/Editor";

function App() {
  let [coreData, setCoreData] = useState(data);

  return (
    <Router>
      <Routes>
        <Route
          path="/edit/:id"
          element={<Editor type="edit" data={coreData} setData={setCoreData} />}
        />
        <Route
          path="/new"
          element={<Editor type="new" data={coreData} setData={setCoreData} />}
        />
        <Route
          path="/"
          element={<Transactions data={coreData} setData={setCoreData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
