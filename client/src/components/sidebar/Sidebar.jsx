// src/Sidebar.js
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <>
      <div className="sidebar">
        <div className="nav-links">
          <Link to="/sign-up">sign up</Link>
          <Link to="/sign-in">sign in</Link>
          <Link to="/settings">settings</Link>
          <a href="#contact">Contact</a>
        </div>
        <div className="auth-buttons">
          <button>Sign Up</button>
          <button>Login</button>
        </div>
        <div
          className="hamburger-menu"
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <FaBars />
        </div>
      </div>
      <div
        className={`mobile-sidebar ${isMobileSidebarOpen ? "open" : ""}`}
      ></div>
    </>
  );
};

export default Sidebar;
