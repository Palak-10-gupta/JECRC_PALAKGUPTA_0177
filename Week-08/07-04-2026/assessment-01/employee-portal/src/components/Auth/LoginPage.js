import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

const LoginPage = () => {
  const { login, authError, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const isDark = theme === 'dark';

  const handleSubmit = async e => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: isDark
        ? 'linear-gradient(135deg, #060b18 0%, #0d1a3a 100%)'
        : 'linear-gradient(135deg, #eff6ff 0%, #faf5ff 50%, #fdf2f8 100%)',
    }}>

      {/* ── LEFT PANEL ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background accent */}
        <div style={{
          position: 'absolute', top: -100, left: -100,
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, right: -60,
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Logo mark */}
        <div style={{ marginBottom: 56, position: 'relative' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 40,
            boxShadow: '0 8px 24px rgba(124,58,237,0.35)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '2.6rem',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.04em',
            color: isDark ? '#f1f5f9' : '#0f172a',
            marginBottom: 16,
          }}>
            Manage your<br />
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              team, smarter.
            </span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: isDark ? '#64748b' : '#64748b',
            lineHeight: 1.6,
            maxWidth: 380,
          }}>
            A unified portal for employee records, analytics, and workforce management — built for modern teams.
          </p>
        </div>

        {/* Feature bullets */}
        {[
          { icon: '◈', text: 'Real-time employee analytics' },
          { icon: '◈', text: 'Role-based access control'   },
          { icon: '◈', text: 'Full CRUD records management' },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ color: '#7c3aed', fontWeight: 700, fontSize: '1rem' }}>{f.icon}</span>
            <span style={{ fontSize: '0.9rem', color: isDark ? '#94a3b8' : '#475569', fontWeight: 500 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── RIGHT PANEL — Login Card ── */}
      <div style={{
        width: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 48px',
        background: isDark ? 'rgba(13,21,38,0.98)' : '#ffffff',
        borderLeft: `1px solid ${isDark ? '#1e2d4a' : '#e2e8f0'}`,
        boxShadow: isDark ? 'none' : '-12px 0 40px rgba(15,23,42,0.06)',
        position: 'relative',
      }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} style={{
          position: 'absolute', top: 24, right: 24,
          background: isDark ? '#1e2d4a' : '#f1f5f9',
          border: 'none', borderRadius: 8, padding: '7px 14px',
          color: isDark ? '#94a3b8' : '#475569',
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: '0.8rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all 0.2s',
        }}>
          {isDark ? '☀ Light' : '⏾ Dark'}
        </button>

        <div style={{ width: '100%', maxWidth: 360 }}>
          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '1.65rem', fontWeight: 800,
              letterSpacing: '-0.03em',
              color: isDark ? '#f1f5f9' : '#0f172a',
              marginBottom: 6,
            }}>
              Welcome back
            </p>
            <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
              Sign in to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', marginBottom: 6,
                fontSize: '0.82rem', fontWeight: 600,
                color: isDark ? '#94a3b8' : '#374151',
              }}>
                Email address
              </label>
              <input
                className="input-field"
                type="email" required
                placeholder="palak@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{
                  fontSize: '0.82rem', fontWeight: 600,
                  color: isDark ? '#94a3b8' : '#374151',
                }}>
                  Password
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className="input-field"
                  type={showPass ? 'text' : 'password'} required
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingRight: 42 }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{
                  position: 'absolute', right: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600,
                  fontFamily: 'Inter',
                }}>
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Credentials hint — subtle, professional */}
            <div style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: isDark ? 'rgba(124,58,237,0.08)' : 'rgba(124,58,237,0.05)',
              border: `1px solid ${isDark ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.15)'}`,
              marginBottom: 20, marginTop: 14,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <span style={{ fontSize: '0.75rem', color: '#7c3aed', marginTop: 1 }}>ℹ</span>
              <div>
                <p style={{ fontSize: '0.78rem', color: isDark ? '#a78bfa' : '#6d28d9', fontWeight: 600, marginBottom: 3 }}>
                  Demo Credentials
                </p>
                <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6 }}>
                  <strong>Admin:</strong> admin@portal.com · admin123<br />
                  <strong>Staff:</strong> user@portal.com · user123
                </p>
              </div>
            </div>

            {/* Error */}
            {authError && (
              <div style={{
                padding: '10px 14px', borderRadius: 8, marginBottom: 16,
                background: 'rgba(244,63,94,0.08)',
                border: '1px solid rgba(244,63,94,0.25)',
                fontSize: '0.82rem', color: '#f43f5e', fontWeight: 500,
              }}>
                {authError}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: '100%',
              padding: '12px',
              border: 'none',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.2s',
              opacity: loading ? 0.8 : 1,
              letterSpacing: '-0.01em',
            }}>
              {loading
                ? <span style={{ width: 16, height: 16, borderRadius: '50%',
                    border: '2.5px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff', display: 'inline-block',
                    animation: 'spin 0.7s linear infinite' }} />
                : 'Sign in to workspace →'}
            </button>
          </form>

          {/* Footer */}
          <p style={{ textAlign: 'center', marginTop: 28, fontSize: '0.78rem', color: '#94a3b8' }}>
            EmpPortal · Internal Use Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;