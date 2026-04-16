import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-container">
      <div className="footer-brand">
        <span className="brand-icon">⬡</span>
        <span className="brand-name">NexaShop</span>
        <p className="footer-tagline">Enterprise e-commerce, reimagined.</p>
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Products</h4>
          <Link to="/products">All Products</Link>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 NexaShop. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;