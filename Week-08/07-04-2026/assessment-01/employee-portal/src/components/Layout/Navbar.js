import React from 'react';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useApp from '../../hooks/useApp';
import useEmployees from '../../hooks/useEmployees';

const PAGE_TITLE = {
  dashboard: 'Dashboard',
  employees: 'Employees',
  analytics: 'Analytics',
  settings:  'Settings',
};

const Navbar = () => {
  const { theme, toggleTheme }             = useTheme();
  const { user }                           = useAuth();
  const { activePage, notification }       = useApp();
  const { searchQuery, setSearchQuery }    = useEmployees();
  const isDark = theme === 'dark';

  const textMuted = isDark ? '#64748b' : '#94a3b8';
  const textBase  = isDark ? '#94a3b8' : '#475569';

  return (
    <header className="navbar" style={{ gap: 16 }}>
      {/* Page title */}
      <div>
        <h1 style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '1rem', fontWeight: 700,
          color: isDark ? '#f1f5f9' : '#0f172a',
          letterSpacing: '-0.02em',
        }}>
          {PAGE_TITLE[activePage]}
        </h1>
      </div>

      {/* Search — employees only */}
      {activePage === 'employees' && (
        <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
          <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: textMuted }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="input-field"
            placeholder="Search employees…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 34, height: 36, fontSize: '0.85rem' }}
          />
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Toast notification */}
        {notification && (
          <div style={{
            padding: '7px 14px', borderRadius: 8,
            background: notification.type === 'success'
              ? 'linear-gradient(135deg, #10b981, #0ea5e9)'
              : '#f43f5e',
            color: '#fff', fontWeight: 600, fontSize: '0.8rem',
            animation: 'fadeInUp 0.3s ease',
            letterSpacing: '-0.01em',
          }}>
            {notification.message}
          </div>
        )}

        {/* Theme toggle */}
        <button onClick={toggleTheme} style={{
          background: isDark ? '#1e2d4a' : '#f1f5f9',
          border: 'none', borderRadius: 8, padding: '7px 12px',
          color: textBase, fontFamily: 'Inter, sans-serif',
          fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 5,
          transition: 'all 0.2s',
        }}>
          {isDark
            ? <><span style={{ fontSize: '0.9rem' }}>☀</span> Light</>
            : <><span style={{ fontSize: '0.9rem' }}>⏾</span> Dark</>}
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: isDark ? '#1e2d4a' : '#e2e8f0' }} />

        {/* User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', color: '#fff', fontWeight: 700, letterSpacing: '-0.01em',
          }}>
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: isDark ? '#f1f5f9' : '#0f172a', lineHeight: 1.2 }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: textMuted }}>
              {user?.role}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;