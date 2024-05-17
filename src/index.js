import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CoreDataContextProvider } from "./Contexts/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CoreDataContextProvider>
    <App />
  </CoreDataContextProvider>
);
