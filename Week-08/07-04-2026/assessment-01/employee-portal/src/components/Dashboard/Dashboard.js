import React from 'react';
import useEmployees from '../../hooks/useEmployees';
import useAuth from '../../hooks/useAuth';
import useApp from '../../hooks/useApp';
import useTheme from '../../hooks/useTheme';

const DEPT_COLORS = ['#7c3aed','#0ea5e9','#10b981','#f59e0b','#f43f5e','#d946ef'];

const Dashboard = () => {
  const { stats }    = useEmployees();
  const { user }     = useAuth();
  const { navigate } = useApp();
  const { theme }    = useTheme();
  const isDark = theme === 'dark';

  const textMuted  = isDark ? '#64748b' : '#94a3b8';
  const textBase   = isDark ? '#94a3b8' : '#475569';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';
  const surfaceBg  = isDark ? '#111c35' : '#f8fafc';

  const STATS = [
    {
      label: 'Total Employees', value: stats.total,
      color: '#7c3aed', bg: 'rgba(124,58,237,0.1)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: 'Active', value: stats.active,
      color: '#10b981', bg: 'rgba(16,185,129,0.1)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
    },
    {
      label: 'Inactive', value: stats.inactive,
      color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
    },
    {
      label: 'Avg. Salary', value: `$${stats.avgSalary?.toLocaleString()}`,
      color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  const ACTIONS = [
    { label: 'Add New Employee',   page: 'employees', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
    { label: 'Browse Employees',   page: 'employees', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
    { label: 'Analytics Overview', page: 'analytics', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { label: 'Settings',           page: 'settings',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)'  },
  ];

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1200 }}>

      {/* ── Welcome Banner ── */}
      <div className="fade-in" style={{
        borderRadius: 16,
        padding: '28px 32px',
        marginBottom: 24,
        background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Subtle pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Welcome back
          </p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.7rem', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.03em', marginBottom: 4 }}>
            Good day, {user?.name?.split(' ')[0]}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>
            {user?.role} · Here's your workspace overview
          </p>
        </div>
        <div style={{ position: 'relative', textAlign: 'right' }}>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>
            Total headcount
          </div>
          <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '3rem', fontWeight: 900,
            color: '#fff', lineHeight: 1, letterSpacing: '-0.04em' }}>
            {stats.total}
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {STATS.map((s, i) => (
          <div key={i} className="card stat-card fade-in" style={{ animationDelay: `${i * 0.07}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: textMuted,
                letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {s.label}
              </p>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {s.icon}
              </div>
            </div>
            <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '1.9rem', fontWeight: 800,
              color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Bottom Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Department breakdown */}
        <div className="card fade-in" style={{ padding: 24, animationDelay: '0.28s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem',
                color: textStrong, letterSpacing: '-0.02em' }}>
                By Department
              </h3>
              <p style={{ fontSize: '0.75rem', color: textMuted, marginTop: 2 }}>
                Headcount distribution
              </p>
            </div>
          </div>

          {Object.entries(stats.byDept).map(([dept, count], i) => {
            const pct = Math.round((count / stats.total) * 100);
            return (
              <div key={dept} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: textBase }}>{dept}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: textMuted }}>{count} people</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: DEPT_COLORS[i % DEPT_COLORS.length],
                      background: `${DEPT_COLORS[i % DEPT_COLORS.length]}15`,
                      padding: '1px 7px', borderRadius: 99 }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 99, background: isDark ? '#1e2d4a' : '#f1f5f9', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99,
                    width: `${pct}%`,
                    background: DEPT_COLORS[i % DEPT_COLORS.length],
                    transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="card fade-in" style={{ padding: 24, animationDelay: '0.35s' }}>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem',
              color: textStrong, letterSpacing: '-0.02em' }}>
              Quick Actions
            </h3>
            <p style={{ fontSize: '0.75rem', color: textMuted, marginTop: 2 }}>
              Common tasks and shortcuts
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ACTIONS.map((a, i) => (
              <button key={i} onClick={() => navigate(a.page)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 16px', borderRadius: 10, border: `1px solid ${isDark ? '#1e2d4a' : '#e2e8f0'}`,
                background: isDark ? 'rgba(255,255,255,0.02)' : '#fafafa',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem',
                color: textBase, cursor: 'pointer', transition: 'all 0.18s',
                textAlign: 'left',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = a.bg;
                  e.currentTarget.style.borderColor = a.color + '40';
                  e.currentTarget.style.color = a.color;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.02)' : '#fafafa';
                  e.currentTarget.style.borderColor = isDark ? '#1e2d4a' : '#e2e8f0';
                  e.currentTarget.style.color = textBase;
                }}
              >
                {a.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;