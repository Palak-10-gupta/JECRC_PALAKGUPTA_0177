import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthError } from '../../features/auth/authSlice';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const error    = useSelector((s) => s.auth.error);

  const handleChange = (e) => {
    dispatch(clearAuthError());
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: 'var(--bg-page)',
    }}>
      {/* Left panel — branding */}
      <div style={{
        flex: 1,
        display: 'none',
        background: 'linear-gradient(145deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 56px',
        position: 'relative',
        overflow: 'hidden',
      }} className="login-left">
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', top: -100, right: -100,
        }}/>
        <div style={{
          position: 'absolute', width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', bottom: -80, left: -60,
        }}/>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 48, height: 48, background: 'rgba(255,255,255,0.15)',
            borderRadius: 12, display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: 40,
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
            Employee<br/>Management<br/>System
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.7, maxWidth: 320 }}>
            A centralized platform for managing your workforce — powered by Redux state management.
          </p>

          <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: '⚡', text: 'Real-time state with Redux Toolkit' },
              { icon: '🔒', text: 'Role-based access control' },
              { icon: '💾', text: 'Persistent state with localStorage' },
            ].map((f) => (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 16 }}>{f.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'var(--bg-page)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 400,
        }}>
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{
              width: 44, height: 44, background: 'var(--accent)',
              borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: 24,
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              Sign in
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Enter your credentials to access the portal
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: 8,
              padding: '11px 14px',
              color: '#991b1b',
              fontSize: 13,
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 500,
            }}>
              <span style={{
                width: 18, height: 18, background: '#ef4444', borderRadius: '50%',
                color: '#fff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0,
              }}>✕</span>
              {error}
            </div>
          )}

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: 6,
              }}>
                Username
              </label>
              <input
                name="username"
                autoComplete="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Password
                </label>
              </div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                padding: '12px',
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 8,
                marginTop: 4,
                width: '100%',
                letterSpacing: 0.2,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
            >
              Sign in to EmpManager
            </button>
          </div>

          <p style={{
            marginTop: 28, textAlign: 'center', fontSize: 12,
            color: 'var(--text-muted)',
          }}>
            Redux Employee Management System &mdash; Assessment Project
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .login-left { display: flex !important; }
        }
      `}</style>
    </div>
  );
}