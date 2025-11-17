import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { clearToken, getToken } from "../api";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = getToken();

  function logout() {
    clearToken();
    navigate("/login");
  }

  return (
    <header className="nav-wrapper">
      <div className="nav-container">

        {/* BRAND LOGO */}
        <Link to="/products" className="nav-logo">
          E-Shop
        </Link>

        {/* NAV LINKS */}
        <nav className="nav-links">
          <Link to="/analytics">Analytics</Link>

          {loggedIn ? (
            <button className="btn-logout" onClick={logout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}
