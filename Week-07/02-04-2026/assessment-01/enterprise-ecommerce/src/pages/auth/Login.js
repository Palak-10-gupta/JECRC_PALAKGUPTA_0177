import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(form.email, form.password);
      if (ok) navigate("/dashboard");
      else setError("Invalid credentials. Please try again.");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2>Welcome back</h2>
        <p>Sign in to your NexaShop account</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" placeholder="you@company.com" required
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" required
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <button type="submit" className="btn-primary full-width" disabled={loading}>
          {loading ? <span className="spinner" /> : "Sign In"}
        </button>
      </form>

      <div className="auth-demo-hint">
        <p>Demo: enter any email & password</p>
      </div>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Create one →</Link>
      </p>
    </div>
  );
};

export default Login;