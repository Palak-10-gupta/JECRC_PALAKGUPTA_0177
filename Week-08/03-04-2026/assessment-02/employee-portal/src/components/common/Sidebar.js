import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ── Single nav item ── */
var NavItem = function ({ to, icon, label, end }) {
  var [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={to}
      end={end || false}
      style={function ({ isActive }) {
        return {
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.65rem 0.9rem',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          color: isActive ? 'white' : (hovered ? 'var(--text-primary)' : 'var(--text-secondary)'),
          background: isActive
            ? 'linear-gradient(135deg, rgba(108,63,255,0.40), rgba(255,63,143,0.18))'
            : (hovered ? 'rgba(108,63,255,0.10)' : 'transparent'),
          border: isActive
            ? '1px solid rgba(108,63,255,0.35)'
            : '1px solid transparent',
          fontWeight: isActive ? '500' : '400',
          fontSize: '0.88rem',
          transition: 'all 0.18s ease',
          fontFamily: 'var(--font-body)',
          marginBottom: '2px',
        };
      }}
      onMouseEnter={function () { return setHovered(true); }}
      onMouseLeave={function () { return setHovered(false); }}
    >
      <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  );
};

/* ── Section label inside sidebar ── */
var SectionLabel = function ({ children }) {
  return (
    <div
      style={{
        fontSize: '0.65rem',
        fontFamily: 'var(--font-display)',
        fontWeight: '700',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        padding: '0.75rem 0.3rem 0.4rem',
      }}
    >
      {children}
    </div>
  );
};

/* ── Main Sidebar ── */
var Sidebar = function () {
  var auth     = useAuth();
  var navigate = useNavigate();
  var [logoutHover, setLogoutHover] = useState(false);

  var handleLogout = function () {
    auth.logout();
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: '255px',
        minHeight: '100vh',
        height: '100vh',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          padding: '1.4rem 1.1rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'var(--grad-primary)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
              boxShadow: '0 4px 16px rgba(108,63,255,0.45)',
              flexShrink: 0,
            }}
          >
            ⬡
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              Nex<span style={{ color: 'var(--brand-primary)' }}>Corp</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '-1px' }}>
              Employee Portal
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav
        style={{
          flex: 1,
          padding: '0.75rem',
          overflowY: 'auto',
        }}
      >
        <SectionLabel>Overview</SectionLabel>
        <NavItem to="/dashboard" icon="⊞" label="Dashboard" end={true} />

        {auth.isAdmin ? (
          <>
            <SectionLabel>Administration</SectionLabel>
            <NavItem to="/employees"     icon="👥" label="All Employees" />
            <NavItem to="/employees/add" icon="＋" label="Add Employee" />
          </>
        ) : (
          <>
            <SectionLabel>My Account</SectionLabel>
            <NavItem to="/my-profile" icon="◎" label="My Profile" />
          </>
        )}
      </nav>

      {/* ── User Card + Logout ── */}
      <div
        style={{
          padding: '0.85rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {/* User info pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0.55rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '0.5rem',
          }}
        >
          <div className={'avatar avatar-sm ' + (auth.currentUser ? auth.currentUser.avatarColor : 'avatar-purple')}>
            {auth.currentUser ? auth.currentUser.avatar : '?'}
          </div>
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div
              style={{
                fontSize: '0.83rem',
                fontWeight: '500',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {auth.currentUser ? auth.currentUser.name : 'User'}
            </div>
            <div style={{ fontSize: '0.70rem', color: 'var(--text-muted)' }}>
              {auth.isAdmin ? '🛡 Admin' : '👤 Employee'}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          onMouseEnter={function () { return setLogoutHover(true); }}
          onMouseLeave={function () { return setLogoutHover(false); }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.58rem 0.9rem',
            background: logoutHover ? 'rgba(255,71,87,0.10)' : 'transparent',
            border: '1px solid',
            borderColor: logoutHover ? 'rgba(255,71,87,0.28)' : 'transparent',
            borderRadius: 'var(--radius-md)',
            color: logoutHover ? 'var(--brand-danger)' : 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.86rem',
            transition: 'all 0.18s ease',
            fontFamily: 'var(--font-body)',
          }}
        >
          <span style={{ fontSize: '1rem' }}>⏻</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;