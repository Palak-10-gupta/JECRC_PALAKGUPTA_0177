import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { to: "/", key: "nav_home" },
    { to: "/about", key: "nav_about" },
    { to: "/contact", key: "nav_contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "nb-scrolled" : ""}`}>
      <div className="nb-inner">
        <Link to="/" className="nb-brand" onClick={() => setMenuOpen(false)}>
          <div className="nb-logo-wrap">
            <span className="nb-logo-icon">🌐</span>
          </div>
          <span className="nb-brand-name">LinguaX</span>
        </Link>

        <div className={`nb-links ${menuOpen ? "nb-open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nb-link ${location.pathname === l.to ? "nb-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {t(l.key)}
              {location.pathname === l.to && <span className="nb-dot" />}
            </Link>
          ))}
        </div>

        <div className="nb-right">
          <LanguageSwitcher />
          <button className="nb-burger" onClick={() => setMenuOpen(!menuOpen)}>
            <span className={`burger-line ${menuOpen ? "bl-open1" : ""}`} />
            <span className={`burger-line ${menuOpen ? "bl-open2" : ""}`} />
            <span className={`burger-line ${menuOpen ? "bl-open3" : ""}`} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;