import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './components/Auth/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';
import Spinner from './components/Layout/Spinner';
import { clearNotification } from './features/ui/uiSlice';

const notifConfig = {
  success: { bg: '#ecfdf5', border: '#10b981', color: '#065f46', icon: '✓' },
  error:   { bg: '#fef2f2', border: '#ef4444', color: '#991b1b', icon: '✕' },
  info:    { bg: '#eff6ff', border: '#3b82f6', color: '#1e40af', icon: 'i' },
};

export default function App() {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const loading         = useSelector((s) => s.ui.loading);
  const notification    = useSelector((s) => s.ui.notification);
  const theme           = useSelector((s) => s.ui.theme);
  const dispatch        = useDispatch();

  // Apply theme to <html> element so CSS vars work globally
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => dispatch(clearNotification()), 3500);
      return () => clearTimeout(t);
    }
  }, [notification, dispatch]);

  const nc = notification ? notifConfig[notification.type] || notifConfig.info : null;

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {loading && <Spinner />}

      {notification && nc && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999,
          background: nc.bg,
          border: `1px solid ${nc.border}`,
          color: nc.color,
          borderRadius: 10,
          padding: '12px 18px',
          fontWeight: 500,
          fontSize: 13,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          maxWidth: 340,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          animation: 'slideInRight 0.25s ease',
        }}>
          <span style={{
            width: 20, height: 20, borderRadius: '50%',
            background: nc.border, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>{nc.icon}</span>
          {notification.message}
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {isAuthenticated ? <Dashboard /> : <LoginPage />}
    </div>
  );
}