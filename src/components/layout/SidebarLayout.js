import React, { useState, useRef } from "react";
import { useNavigate, NavLink, Outlet, useLocation } from "react-router-dom";
import "./SidebarLayout.css";

const SidebarLayout = ({ token, setToken }) => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    navigate("/login");
  };

  const isActiveLink = (path) => location.pathname === path;

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      hamburgerRef.current !== event.target
    ) {
      setNavbarOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const toggleNavbar = () => {
    setNavbarOpen((prev) => {
      const newState = !prev;
      if (newState) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return newState;
    });
  };

  return (
    <div className={`layout-container ${isNavbarOpen ? "navbar-open" : ""}`}>
      <header className="top-navbar">
        <div className="navbar-left">
          <button
            className="hamburger"
            onClick={toggleNavbar}
            ref={hamburgerRef}
          >
            {isNavbarOpen ? "x" : "☰"}
          </button>
          <h2 className="navbar-title">Quote Management</h2>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <nav
        ref={navbarRef}
        className={`navbar-links ${isNavbarOpen ? "expanded" : ""}`}
      >
        <ul>
          <li className={isActiveLink("/dashboard") ? "active-link" : ""}>
            <NavLink to="/dashboard" onClick={() => setNavbarOpen(false)}>
              Dashboard
            </NavLink>
          </li>
          <li className={isActiveLink("/create-quote") ? "active-link" : ""}>
            <NavLink to="/create-quote" onClick={() => setNavbarOpen(false)}>
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
