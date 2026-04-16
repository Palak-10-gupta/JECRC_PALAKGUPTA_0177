import React from 'react';
import useTheme from '../../hooks/useTheme';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textMuted  = isDark ? '#64748b' : '#94a3b8';
  const textBase   = isDark ? '#94a3b8' : '#475569';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';
  const surfaceBg  = isDark ? '#111c35' : '#f8fafc';
  const borderCol  = isDark ? '#1e2d4a' : '#e2e8f0';

  const initials = employee.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="card fade-in" style={{
      borderRadius: 14,
      padding: 20,
      transition: 'transform 0.18s, box-shadow 0.18s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = isDark
          ? '0 8px 28px rgba(0,0,0,0.35)'
          : '0 8px 28px rgba(15,23,42,0.1)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: 11,
            background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.82rem', color: '#fff', fontWeight: 700,
            flexShrink: 0, letterSpacing: '-0.01em',
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: textStrong, lineHeight: 1.2 }}>
              {employee.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: textMuted, marginTop: 2 }}>
              {employee.role}
            </div>
          </div>
        </div>

        {/* Status badge */}
        <span style={{
          padding: '3px 10px', borderRadius: 99,
          fontSize: '0.7rem', fontWeight: 600,
          background: employee.status === 'Active'
            ? (isDark ? 'rgba(16,185,129,0.15)' : '#dcfce7')
            : (isDark ? 'rgba(244,63,94,0.15)'  : '#fee2e2'),
          color: employee.status === 'Active'
            ? (isDark ? '#34d399' : '#15803d')
            : (isDark ? '#fb7185' : '#b91c1c'),
        }}>
          {employee.status}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: borderCol, marginBottom: 14 }} />

      {/* Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 16 }}>
        {[
          { icon: (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            ), text: employee.email },
          { icon: (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            ), text: employee.department },
          { icon: (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            ), text: `$${employee.salary.toLocaleString()} / yr` },
          ...(employee.joined ? [{ icon: (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            ), text: `Joined ${employee.joined}` }] : []),
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: textMuted, display: 'flex', flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontSize: '0.82rem', color: textBase }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => onEdit(employee)} style={{
          flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${borderCol}`,
          background: 'transparent', fontFamily: 'Inter, sans-serif',
          fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
          color: '#7c3aed', transition: 'all 0.18s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.08)'; e.currentTarget.style.borderColor = '#7c3aed'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = borderCol; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>
        <button onClick={() => onDelete(employee.id)} style={{
          flex: 1, padding: '8px', borderRadius: 8, border: '1px solid transparent',
          background: isDark ? 'rgba(244,63,94,0.1)' : '#fff1f2',
          fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.8rem',
          cursor: 'pointer', color: '#f43f5e', transition: 'all 0.18s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(244,63,94,0.18)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(244,63,94,0.1)' : '#fff1f2'; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;