import React from 'react';
import useApp from '../../hooks/useApp';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

const NAV = [
  { id: 'dashboard', label: 'Dashboard',  icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )},
  { id: 'employees', label: 'Employees', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { id: 'analytics', label: 'Analytics', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </svg>
  )},
  { id: 'settings',  label: 'Settings', icon: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  )},
];

const Sidebar = () => {
  const { activePage, navigate } = useApp();
  const { user, logout }         = useAuth();
  const { theme }                = useTheme();
  const isDark = theme === 'dark';

  const textMuted = isDark ? '#64748b' : '#94a3b8';
  const textBase  = isDark ? '#94a3b8' : '#475569';
  const textStrong= isDark ? '#f1f5f9' : '#0f172a';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '22px 20px 20px', borderBottom: `1px solid ${isDark ? '#1e2d4a' : '#f1f5f9'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2.2"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem',
              letterSpacing: '-0.02em', color: textStrong }}>
              EmpPortal
            </div>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, color: textMuted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Workspace
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '14px 12px', flex: 1 }}>
        <p style={{ fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: textMuted, padding: '0 8px', marginBottom: 8 }}>
          Menu
        </p>

        {NAV.map(item => {
          const active = activePage === item.id;
          return (
            <button key={item.id} onClick={() => navigate(item.id)} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 9,
              marginBottom: 2,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: active ? 600 : 500,
              fontSize: '0.875rem',
              background: active
                ? (isDark ? 'rgba(124,58,237,0.15)' : 'rgba(124,58,237,0.08)')
                : 'transparent',
              color: active ? '#7c3aed' : textBase,
              transition: 'all 0.15s',
              textAlign: 'left',
              position: 'relative',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : '#f8fafc'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              {/* Active bar */}
              {active && (
                <div style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: 3, height: 18, borderRadius: 99,
                  background: 'linear-gradient(180deg, #7c3aed, #0ea5e9)',
                }} />
              )}
              <span style={{ color: active ? '#7c3aed' : textBase, display: 'flex' }}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <div style={{
        margin: '0 12px 16px',
        padding: '14px',
        borderRadius: 12,
        background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc',
        border: `1px solid ${isDark ? '#1e2d4a' : '#e2e8f0'}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem', color: '#fff', fontWeight: 700, flexShrink: 0,
          }}>
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: textStrong,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: textMuted }}>{user?.role}</div>
          </div>
        </div>
        <button onClick={logout} style={{
          width: '100%', padding: '7px', borderRadius: 7,
          border: `1px solid ${isDark ? '#1e2d4a' : '#e2e8f0'}`,
          background: 'transparent',
          color: '#f43f5e',
          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem',
          cursor: 'pointer', transition: 'all 0.2s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;