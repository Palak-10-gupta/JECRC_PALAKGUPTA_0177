import React, { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useApp from '../../hooks/useApp';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout }       = useAuth();
  const { showNotification }   = useApp();
  const isDark = theme === 'dark';

  const [notifications, setNotifications] = useState(true);
  const [compactView,   setCompactView]   = useState(false);
  const [language,      setLanguage]      = useState('English');

  const textMuted  = isDark ? '#64748b' : '#94a3b8';
  const textBase   = isDark ? '#94a3b8' : '#475569';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';
  const borderCol  = isDark ? '#1e2d4a' : '#e2e8f0';
  const surfaceBg  = isDark ? '#111c35' : '#f8fafc';

  const Toggle = ({ value, onChange }) => (
    <button onClick={onChange} style={{
      width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer',
      background: value
        ? 'linear-gradient(135deg, #7c3aed, #0ea5e9)'
        : (isDark ? '#1e2d4a' : '#e2e8f0'),
      position: 'relative', transition: 'background 0.25s', flexShrink: 0, padding: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', background: '#fff',
        position: 'absolute', top: 3, left: value ? 23 : 3,
        transition: 'left 0.25s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  const Card = ({ children }) => (
    <div className="card" style={{ padding: '24px', marginBottom: 16, borderRadius: 14 }}>
      {children}
    </div>
  );

  const CardTitle = ({ children }) => (
    <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${borderCol}` }}>
      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.92rem',
        color: textStrong, letterSpacing: '-0.02em' }}>
        {children}
      </h3>
    </div>
  );

  const Row = ({ label, desc, right, last }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16,
      borderBottom: last ? 'none' : `1px solid ${borderCol}`,
    }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: textStrong }}>{label}</div>
        {desc && <div style={{ fontSize: '0.775rem', color: textMuted, marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 16 }}>{right}</div>
    </div>
  );

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div style={{ padding: '24px 32px', maxWidth: 660 }}>

      {/* ── Profile ── */}
      <Card>
        <CardTitle>Profile</CardTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, flexShrink: 0,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: '#fff', fontWeight: 700, letterSpacing: '-0.01em',
          }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem',
              color: textStrong, letterSpacing: '-0.02em' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.83rem', color: textMuted, marginTop: 3 }}>
              {user?.email}
            </div>
          </div>
          <span style={{
            padding: '4px 12px', borderRadius: 8,
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(124,58,237,0.2)',
            color: '#7c3aed', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.03em',
          }}>
            {user?.role}
          </span>
        </div>
      </Card>

      {/* ── Appearance ── */}
      <Card>
        <CardTitle>Appearance</CardTitle>
        <Row
          label="Theme"
          desc={`Currently using ${theme} mode`}
          right={
            <button onClick={toggleTheme} style={{
              padding: '7px 16px', borderRadius: 8, border: 'none',
              background: isDark
                ? 'rgba(245,158,11,0.1)'
                : 'rgba(124,58,237,0.1)',
              color: isDark ? '#f59e0b' : '#7c3aed',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {isDark ? '☀ Switch to Light' : '⏾ Switch to Dark'}
            </button>
          }
        />
        <Row
          label="Compact View"
          desc="Reduce padding and spacing across the UI"
          right={<Toggle value={compactView} onChange={() => setCompactView(v => !v)} />}
        />
        <Row
          label="Language"
          desc="Interface display language"
          last
          right={
            <select
              className="input-field"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              style={{ width: 'auto', padding: '6px 10px', fontSize: '0.82rem' }}
            >
              {['English','Hindi','Spanish','French','German'].map(l => <option key={l}>{l}</option>)}
            </select>
          }
        />
      </Card>

      {/* ── Notifications ── */}
      <Card>
        <CardTitle>Notifications</CardTitle>
        <Row
          label="In-app Notifications"
          desc="Show toast alerts for actions like add, edit, and delete"
          last
          right={<Toggle value={notifications} onChange={() => setNotifications(v => !v)} />}
        />
      </Card>

      {/* ── Account ── */}
      <Card>
        <CardTitle>Account</CardTitle>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => showNotification('Settings saved successfully')} style={{
            padding: '10px 20px', borderRadius: 9, border: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            color: '#fff', fontFamily: 'Inter, sans-serif',
            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Save Changes
          </button>

          <button onClick={logout} style={{
            padding: '10px 20px', borderRadius: 9,
            border: `1px solid ${borderCol}`,
            background: 'transparent',
            color: '#f43f5e', fontFamily: 'Inter, sans-serif',
            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 7, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.08)'; e.currentTarget.style.borderColor = '#f43f5e'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = borderCol; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;