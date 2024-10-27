import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the JWT
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import QuoteCreationPage from "./components/createquote/QuoteCreation";
import SidebarLayout from "./components/layout/SidebarLayout";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkTokenExpiry = () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const decodedToken = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp <= currentTime) {
            console.log("Token expired");
            logoutUser();
          } else {
            setToken(storedToken);
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          logoutUser();
        }
      } else {
        logoutUser();
      }
    };

    const logoutUser = () => {
      localStorage.removeItem("token");
      setToken(null);
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 60000);
    return () => clearInterval(interval);
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

        {/* Routes that require authentication */}
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

        {/* Default redirect if no matching routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
