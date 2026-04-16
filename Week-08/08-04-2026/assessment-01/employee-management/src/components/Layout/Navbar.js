import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { toggleTheme } from '../../features/ui/uiSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const user     = useSelector((s) => s.auth.user);
  const theme    = useSelector((s) => s.ui.theme);
  const isDark   = theme === 'dark';

  return (
    <nav style={{
      background: 'var(--bg-nav)',
      backdropFilter: 'blur(12px)',
      padding: '0 32px',
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2.5"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{
          fontWeight: 700, fontSize: 15,
          color: 'var(--text-primary)',
          letterSpacing: -0.3,
        }}>
          EmpManager
        </span>
        <span style={{
          background: 'var(--bg-muted)',
          color: 'var(--text-muted)',
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 7px',
          borderRadius: 4,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          marginLeft: 4,
        }}>Redux</span>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            background: 'var(--bg-muted)',
            color: 'var(--text-secondary)',
            padding: '7px 12px',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid var(--border)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-focus)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          {isDark ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Light
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Dark
            </>
          )}
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 2px' }}/>

        {/* User badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          padding: '5px 12px 5px 5px',
          borderRadius: 8,
          background: 'var(--bg-muted)',
          border: '1px solid var(--border)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'linear-gradient(135deg, var(--accent), #818cf8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 12,
          }}>
            {user?.avatar}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {user?.username}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.3 }}>
              {user?.role}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => dispatch(logout())}
          style={{
            background: 'transparent',
            color: 'var(--text-secondary)',
            padding: '7px 13px',
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 600,
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#fef2f2';
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.borderColor = '#fca5a5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sign out
        </button>
      </div>
    </nav>
  );
}