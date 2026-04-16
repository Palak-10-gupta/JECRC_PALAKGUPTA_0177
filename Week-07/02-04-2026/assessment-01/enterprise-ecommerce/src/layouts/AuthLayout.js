import React from "react";
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => (
  <div className="auth-layout">
    <div className="auth-left">
      <div className="auth-left-content">
        <Link to="/" className="auth-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">NexaShop</span>
        </Link>
        <h1 className="auth-headline">
          Enterprise commerce<br />
          <span className="auth-headline-accent">built for scale.</span>
        </h1>
        <p className="auth-subtext">
          Manage products, track analytics, and grow your business — all in one place.
        </p>
        <div className="auth-stats">
          <div className="auth-stat"><span className="stat-num">50K+</span><span className="stat-label">Products</span></div>
          <div className="auth-stat"><span className="stat-num">99.9%</span><span className="stat-label">Uptime</span></div>
          <div className="auth-stat"><span className="stat-num">2M+</span><span className="stat-label">Orders</span></div>
        </div>
      </div>
    </div>
    <div className="auth-right">
      <Outlet />
    </div>
  </div>
);

export default AuthLayout;