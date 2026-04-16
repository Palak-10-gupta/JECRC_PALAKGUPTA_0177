import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setTimeout(() => {
      register(form.name, form.email);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2>Create your account</h2>
        <p>Start your free NexaShop trial today</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" placeholder="Alex Johnson" required
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="you@company.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Min. 8 characters" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" placeholder="Repeat password" required
            value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
        </div>
        <button type="submit" className="btn-primary full-width" disabled={loading}>
          {loading ? <span className="spinner" /> : "Create Account"}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in →</Link>
      </p>
    </div>
  );
};

export default Register;