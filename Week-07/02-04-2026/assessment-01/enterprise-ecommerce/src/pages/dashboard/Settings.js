import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, orders: true, marketing: false });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dash-page">
      <div className="dash-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences.</p>
        </div>
      </div>

      {saved && <div className="save-toast">✓ Settings saved successfully</div>}

      {/* Profile */}
      <div className="dash-card settings-card">
        <h3 className="settings-section-title">Profile Information</h3>
        <form className="settings-form" onSubmit={handleSave}>
          <div className="settings-avatar-row">
            <div className="settings-avatar">{user?.avatar}</div>
            <div>
              <p className="settings-avatar-name">{user?.name}</p>
              <p className="settings-avatar-role">{user?.role}</p>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" defaultValue={user?.name} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" defaultValue={user?.email} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <input type="text" defaultValue={user?.role} disabled />
            </div>
            <div className="form-group">
              <label>Timezone</label>
              <select defaultValue="UTC-8">
                <option>UTC-8 (PST)</option>
                <option>UTC-5 (EST)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+5:30 (IST)</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      </div>

      {/* Notifications */}
      <div className="dash-card settings-card">
        <h3 className="settings-section-title">Notifications</h3>
        <div className="toggle-list">
          {[
            { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
            { key: "orders", label: "Order Alerts", desc: "Get notified on new orders" },
            { key: "marketing", label: "Marketing Emails", desc: "Product updates and offers" },
          ].map((item) => (
            <div key={item.key} className="toggle-row">
              <div>
                <p className="toggle-label">{item.label}</p>
                <p className="toggle-desc">{item.desc}</p>
              </div>
              <button
                className={`toggle-btn ${notifications[item.key] ? "toggle-on" : ""}`}
                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
              >
                <span className="toggle-knob" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;