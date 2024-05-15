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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CancelReset from "./components/CancelReset";
import Friends from "./pages/Friends";
import AddFriend from "./pages/addFriend";
// import Profile from "./pages/Profile";

function App() {
  let { user, isInit, isLoading } = useCoreDataContext();
  // console.log(user, transactions, isLoading);

  // console.log(isInit);

  if (isInit) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {isLoading ? <Loader /> : <> </>}
      <Router>
        <Navbar />
        <section className="khata-body">
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login type="login" /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Login type="signup" /> : <Navigate to="/" />}
            />
            <Route
              path="/forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/cancel-reset" element={<CancelReset />} />
            <Route
              path="/transactions/edit/:id"
              element={user ? <Editor type="edit" /> : <Navigate to="/login" />}
            />
            <Route
              path="/transactions/new"
              element={user ? <Editor type="new" /> : <Navigate to="/login" />}
            />
            {/* <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to={"/login"} />}
              /> */}
            <Route
              path="/transactions"
              element={user ? <Transactions /> : <Navigate to="/login" />}
            />
            <Route
              path="/friends"
              element={user ? <Friends /> : <Navigate to="/login" />}
            />
            <Route
              path="/addfriend"
              element={user ? <AddFriend /> : <Navigate to="/login" />}
            />
            <Route path="/" element={<Navigate to="/transactions" />} />
          </Routes>
        </section>
      </Router>
    </>
  );
}

export default App;
