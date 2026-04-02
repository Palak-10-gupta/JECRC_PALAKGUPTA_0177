import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", icon: "⊞", label: "Dashboard" },
  { to: "/dashboard/analytics", icon: "◎", label: "Analytics" },
  { to: "/dashboard/settings", icon: "⚙", label: "Settings" },
  { to: "/products", icon: "◈", label: "Products" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <Link to="/" className="sidebar-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">NexaShop</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <p className="sidebar-section-label">Main Menu</p>
        {navItems.map((item) => {
          const isActive =
            item.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-link ${isActive ? "sidebar-active" : ""}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="user-avatar">{user?.avatar}</div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          ⎋ Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;