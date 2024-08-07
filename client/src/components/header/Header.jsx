import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./header.scss";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">Nexux</div>
      <input className="search-bar" type="text" placeholder="Search..." />
      <nav className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}></nav>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
