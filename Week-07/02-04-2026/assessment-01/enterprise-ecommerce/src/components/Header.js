import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/products", label: "Products" },
  ];

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">NexaShop</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? "nav-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/login" className="btn-outline-sm">Sign In</Link>
          <Link to="/register" className="btn-primary-sm">Get Started</Link>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;