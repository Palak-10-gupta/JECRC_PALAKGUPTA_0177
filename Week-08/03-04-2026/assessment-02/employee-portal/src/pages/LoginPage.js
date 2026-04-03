import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ── Client-side validation ── */
function validate(username, password) {
  var errors = {};
  if (!username.trim())
    errors.username = 'Username is required';
  else if (username.trim().length < 3)
    errors.username = 'Username must be at least 3 characters';

  if (!password)
    errors.password = 'Password is required';
  else if (password.length < 6)
    errors.password = 'Password must be at least 6 characters';

  return errors;
}

var LoginPage = function () {
  var auth     = useAuth();
  var navigate = useNavigate();
  var location = useLocation();

  var [username, setUsername]         = useState('');
  var [password, setPassword]         = useState('');
  var [showPassword, setShowPassword] = useState(false);
  var [errors, setErrors]             = useState({});
  var [touched, setTouched]           = useState({});

  var from = (location.state && location.state.from && location.state.from.pathname)
    ? location.state.from.pathname
    : '/dashboard';

  /* ── Submit handler ── */
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ username: true, password: true });

    var errs = validate(username, password);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    var result = await auth.login(username, password);
    if (result.success) {
      navigate(from, { replace: true });
    }
  }

  /* ── Blur: validate that field ── */
  function handleBlur(field) {
    setTouched(function (prev) { return Object.assign({}, prev, { [field]: true }); });
    var errs = validate(username, password);
    setErrors(errs);
  }

  /* ── Change: clear auth error ── */
  function handleChange(field, value) {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    auth.setAuthError('');
    if (touched[field]) {
      var u = field === 'username' ? value : username;
      var p = field === 'password' ? value : password;
      setErrors(validate(u, p));
    }
  }

  /* ── Fill demo credentials ── */
  function fillDemo(role) {
    var creds = role === 'admin'
      ? { u: 'admin', p: 'admin123' }
      : { u: 'john',  p: 'john123'  };
    setUsername(creds.u);
    setPassword(creds.p);
    setErrors({});
    auth.setAuthError('');
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-base)',
        padding: '1.5rem',
      }}
    >
      {/* BG effects */}
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(108,63,255,0.14) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          position: 'relative',
          zIndex: 1,
          animation: 'slideUp 0.5s ease',
        }}
      >
        {/* ── Logo ── */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '66px',
              height: '66px',
              background: 'var(--grad-primary)',
              borderRadius: '18px',
              fontSize: '2rem',
              marginBottom: '1.25rem',
              boxShadow: '0 8px 32px rgba(108,63,255,0.45)',
            }}
          >
            ⬡
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.1rem',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              marginBottom: '0.35rem',
            }}
          >
            Nex<span className="text-gradient">Corp</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Internal Employee Portal — sign in to continue
          </p>
        </div>

        {/* ── Form box ── */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.50), var(--shadow-glow)',
          }}
        >
          {/* Auth error */}
          {auth.authError && (
            <div className="alert alert-danger" style={{ marginBottom: '1.4rem' }}>
              <span>⚠</span>
              <span>{auth.authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute', left: '0.9rem', top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)', fontSize: '0.9rem', pointerEvents: 'none',
                  }}
                >
                  ◉
                </span>
                <input
                  type="text"
                  className={'form-input' + (touched.username && errors.username ? ' error' : '')}
                  style={{ paddingLeft: '2.4rem' }}
                  placeholder="Enter your username"
                  value={username}
                  onChange={function (e) { return handleChange('username', e.target.value); }}
                  onBlur={function () { return handleBlur('username'); }}
                  autoComplete="username"
                />
              </div>
              {touched.username && errors.username && (
                <span className="form-error">⚠ {errors.username}</span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute', left: '0.9rem', top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)', fontSize: '0.85rem', pointerEvents: 'none',
                  }}
                >
                  🔒
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={'form-input' + (touched.password && errors.password ? ' error' : '')}
                  style={{ paddingLeft: '2.4rem', paddingRight: '3rem' }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={function (e) { return handleChange('password', e.target.value); }}
                  onBlur={function () { return handleBlur('password'); }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={function () { return setShowPassword(function (s) { return !s; }); }}
                  style={{
                    position: 'absolute', right: '0.9rem', top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer', fontSize: '0.85rem', padding: '4px',
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {touched.password && errors.password && (
                <span className="form-error">⚠ {errors.password}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.4rem' }}
              disabled={auth.isLoading}
            >
              {auth.isLoading
                ? <><span className="spinner" /><span>Authenticating...</span></>
                : 'Sign In to Portal'
              }
            </button>
          </form>

          {/* ── Demo Credentials ── */}
          <div style={{ marginTop: '1.75rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span
                style={{
                  fontSize: '0.70rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Demo Access
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={function () { return fillDemo('admin'); }}
              >
                🛡 Admin Demo
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={function () { return fillDemo('employee'); }}
              >
                👤 Employee Demo
              </button>
            </div>

            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem 1rem',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: 'var(--text-secondary)' }}>Admin:</strong> admin / admin123
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong style={{ color: 'var(--text-secondary)' }}>Employee:</strong> john / john123
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.76rem',
          }}
        >
          NexCorp Internal System · All rights reserved © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;