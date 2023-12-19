import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./css/App.css";
import Transactions from "./pages/Transactions";
import Editor from "./pages/Editor";
import useCoreDataContext from "./Hooks/useCoreDataContext";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  let { user, transactions, isLoading } = useCoreDataContext();
  console.log(user, transactions, isLoading);

  return (
    <>
      {!isLoading ? (
        <Router>
          <Navbar />
          <section className="khata-body">
            <Routes>
              <Route
                path="/edit/:id"
                element={
                  user ? <Editor type="edit" /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/new"
                element={
                  user ? <Editor type="new" /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={!user ? <Login type="login" /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Login type="signup" /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={user ? <Transactions /> : <Navigate to="/login" />}
              />
            </Routes>
          </section>
        </Router>
      ) : (
        <h2> Loading </h2>
      )}
    </>
  );
}

export default App;
