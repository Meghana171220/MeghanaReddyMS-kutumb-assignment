import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import QuoteCreationPage from "./components/createquote/QuoteCreation";
import SidebarLayout from "./components/layout/SidebarLayout";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !token ? (
              <Login setToken={setToken} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route element={<SidebarLayout token={token} setToken={setToken} />}>
          <Route
            path="/dashboard"
            element={
              token ? (
                <Dashboard setToken={setToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/create-quote"
            element={
              token ? (
                <QuoteCreationPage setToken={setToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
