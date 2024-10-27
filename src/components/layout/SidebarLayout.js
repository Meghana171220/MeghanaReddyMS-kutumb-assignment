import React, { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import "./SidebarLayout.css";

const SidebarLayout = ({ token, setToken }) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/login");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setNavbarOpen(false);
  };

  return (
    <div className={`layout-container ${isNavbarOpen ? "navbar-open" : ""}`}>
      <header className="top-navbar">
        <div className="navbar-left">
          <button
            className="hamburger"
            onClick={() => setNavbarOpen(!isNavbarOpen)}
          >
            &#9776;
          </button>
          <h2 className="navbar-title">Quote Management</h2>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <nav className={`navbar-links ${isNavbarOpen ? "expanded" : ""}`}>
        <ul>
          <li className={currentPage === "dashboard" ? "active-link" : ""}>
            <NavLink
              to="/dashboard"
              onClick={() => handlePageChange("dashboard")}
            >
              Dashboard
            </NavLink>
          </li>
          <li className={currentPage === "create-quote" ? "active-link" : ""}>
            <NavLink
              to="/create-quote"
              onClick={() => handlePageChange("create-quote")}
            >
              Create Quote
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
