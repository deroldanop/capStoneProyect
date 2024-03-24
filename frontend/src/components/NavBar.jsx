import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./../context/AuthContext";
import "../style/navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <span>Welcome, {currentUser ? currentUser.username : "Guest"}</span>
        <h3>The news app</h3>
        <div>
          {currentUser ? (
            <button className="navbar-sign-out-button" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/signup" className="navbar-signup-button">
                Signup
              </Link>
              <Link to="/login" className="navbar-login-button">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/news">Home</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
