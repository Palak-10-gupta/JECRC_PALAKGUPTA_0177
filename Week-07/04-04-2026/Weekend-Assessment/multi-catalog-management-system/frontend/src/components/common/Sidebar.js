// src/components/common/Sidebar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

var navItems = [
  { to: '/',          icon: '⊞', label: 'Dashboard',  end: true },
  { to: '/bills/new', icon: '⚡', label: 'New Bill'  },
  { to: '/bills',     icon: '📋', label: 'All Bills'  },
  { to: '/catalogs',  icon: '📦', label: 'Catalogs'   },
];

var NavItem = function (props) {
  var [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={props.to}
      end={props.end || false}
      onMouseEnter={function () { return setHovered(true); }}
      onMouseLeave={function () { return setHovered(false); }}
      style={function (navState) {
        var isActive = navState.isActive;
        return {
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '0.65rem 0.9rem', borderRadius: 'var(--r-md)',
          textDecoration: 'none', marginBottom: '2px',
          fontSize: '0.87rem', fontWeight: isActive ? '700' : '500',
          color: isActive ? 'white' : (hovered ? 'var(--text-1)' : 'var(--text-3)'),
          background: isActive
            ? 'var(--grad-brand)'
            : (hovered ? 'var(--bg-hover)' : 'transparent'),
          border: isActive
            ? '1px solid rgba(255,107,53,0.4)'
            : '1px solid transparent',
          boxShadow: isActive ? '0 4px 16px rgba(255,107,53,0.3)' : 'none',
          transition: 'all 0.18s ease',
        };
      }}
    >
      <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center', flexShrink: 0 }}>{props.icon}</span>
      <span>{props.label}</span>
    </NavLink>
  );
};

var Sidebar = function () {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '1.4rem 1.1rem', borderBottom: '1px solid var(--border-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px', background: 'var(--grad-brand)',
            borderRadius: '10px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.2rem',
            boxShadow: '0 4px 16px rgba(255,107,53,0.4)', flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.02em', color: 'var(--text-1)' }}>
              Bill<span style={{ color: 'var(--orange)' }}>Gen</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-4)', marginTop: '-1px' }}>
              Multi-Catalog System
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0.75rem', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.62rem', fontWeight: '700', color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0.6rem 0.3rem 0.4rem', marginBottom: '0.2rem' }}>
          Navigation
        </div>
        {navItems.map(function (item) {
          return <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} end={item.end} />;
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-1)', fontSize: '0.72rem', color: 'var(--text-4)', textAlign: 'center' }}>
        <div>BillGen v1.0.0</div>
        <div style={{ marginTop: '2px' }}>© {new Date().getFullYear()} All rights reserved</div>
      </div>
    </aside>
  );
};

export default Sidebar;