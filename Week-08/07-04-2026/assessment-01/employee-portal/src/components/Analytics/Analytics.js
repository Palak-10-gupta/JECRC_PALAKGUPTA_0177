import React from 'react';
import useEmployees from '../../hooks/useEmployees';
import useTheme from '../../hooks/useTheme';

const DEPT_COLORS = ['#7c3aed','#0ea5e9','#10b981','#f59e0b','#f43f5e','#d946ef'];

const Analytics = () => {
  const { employees, stats } = useEmployees();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textMuted  = isDark ? '#64748b' : '#94a3b8';
  const textBase   = isDark ? '#94a3b8' : '#475569';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';
  const borderCol  = isDark ? '#1e2d4a' : '#e2e8f0';
  const trackBg    = isDark ? '#1e2d4a' : '#f1f5f9';

  const salaryRanges = [
    { label: '< $75k',     count: employees.filter(e => e.salary < 75000).length },
    { label: '$75k–$90k',  count: employees.filter(e => e.salary >= 75000 && e.salary < 90000).length },
    { label: '$90k–$100k', count: employees.filter(e => e.salary >= 90000 && e.salary < 100000).length },
    { label: '> $100k',    count: employees.filter(e => e.salary >= 100000).length },
  ];
  const maxSalary = Math.max(...salaryRanges.map(r => r.count), 1);

  const recentJoins = [...employees]
    .filter(e => e.joined)
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 5);

  const maxDept = Math.max(...Object.values(stats.byDept), 1);

  const SectionTitle = ({ children, sub }) => (
    <div style={{ marginBottom: 20 }}>
      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '0.95rem',
        color: textStrong, letterSpacing: '-0.02em' }}>
        {children}
      </h3>
      {sub && <p style={{ fontSize: '0.75rem', color: textMuted, marginTop: 3 }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ padding: '24px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* ── Headcount by Department ── */}
        <div className="card fade-in" style={{ padding: 24 }}>
          <SectionTitle sub="Number of employees per department">Headcount by Department</SectionTitle>
          {Object.entries(stats.byDept).map(([dept, count], i) => (
            <div key={dept} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: textBase }}>{dept}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.75rem', color: textMuted }}>{count} people</span>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 700,
                    color: DEPT_COLORS[i % DEPT_COLORS.length],
                    background: `${DEPT_COLORS[i % DEPT_COLORS.length]}18`,
                    padding: '1px 8px', borderRadius: 99,
                  }}>
                    {Math.round((count / stats.total) * 100)}%
                  </span>
                </div>
              </div>
              <div style={{ height: 6, borderRadius: 99, background: trackBg, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${(count / maxDept) * 100}%`,
                  background: DEPT_COLORS[i % DEPT_COLORS.length],
                  transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Salary Distribution ── */}
        <div className="card fade-in" style={{ padding: 24, animationDelay: '0.1s' }}>
          <SectionTitle sub="Distribution of annual salaries">Salary Distribution</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 140, marginBottom: 16 }}>
            {salaryRanges.map((r, i) => {
              const pct = (r.count / maxSalary) * 100;
              return (
                <div key={r.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: DEPT_COLORS[i % DEPT_COLORS.length] }}>
                    {r.count}
                  </span>
                  <div style={{
                    width: '100%', height: `${Math.max(pct, 4)}%`,
                    background: `linear-gradient(180deg, ${DEPT_COLORS[i % DEPT_COLORS.length]}, ${DEPT_COLORS[i % DEPT_COLORS.length]}88)`,
                    borderRadius: '6px 6px 0 0', minHeight: 6,
                    transition: 'height 0.6s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            {salaryRanges.map((r, i) => (
              <div key={r.label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ width: '100%', height: 3, borderRadius: 99, background: trackBg, marginBottom: 6 }}>
                  <div style={{ height: '100%', borderRadius: 99, width: '100%', background: DEPT_COLORS[i % DEPT_COLORS.length] }} />
                </div>
                <span style={{ fontSize: '0.68rem', color: textMuted, fontWeight: 500 }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* ── Active vs Inactive ── */}
        <div className="card fade-in" style={{ padding: 24, animationDelay: '0.2s' }}>
          <SectionTitle sub="Employment status breakdown">Active vs Inactive</SectionTitle>

          {[
            { label: 'Active',   count: stats.active,   color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
            { label: 'Inactive', count: stats.inactive, color: '#f43f5e', bg: 'rgba(244,63,94,0.1)'  },
          ].map(item => {
            const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
            return (
              <div key={item.label} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: textBase }}>{item.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: textStrong }}>{item.count}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '1px 8px', borderRadius: 99,
                      color: item.color, background: item.bg }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div style={{ height: 8, borderRadius: 99, background: trackBg, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 99, width: `${pct}%`,
                    background: item.color, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                  }} />
                </div>
              </div>
            );
          })}

          {/* Summary box */}
          <div style={{
            marginTop: 20, padding: '16px 20px', borderRadius: 12,
            background: isDark ? '#111c35' : '#f8fafc',
            border: `1px solid ${borderCol}`,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: textMuted,
                textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                Total Workforce
              </p>
              <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '2rem',
                fontWeight: 900, color: '#7c3aed', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {stats.total}
              </p>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12,
              background: 'rgba(124,58,237,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Recent Joiners ── */}
        <div className="card fade-in" style={{ padding: 24, animationDelay: '0.3s' }}>
          <SectionTitle sub="Most recently onboarded team members">Recent Joiners</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {recentJoins.map((e, i) => {
              const initials = e.name.split(' ').map(n => n[0]).join('').slice(0, 2);
              return (
                <div key={e.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 10,
                  background: isDark ? '#111c35' : '#f8fafc',
                  border: `1px solid ${borderCol}`,
                  transition: 'background 0.15s',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                    background: `linear-gradient(135deg, ${DEPT_COLORS[i % DEPT_COLORS.length]}, ${DEPT_COLORS[(i+1) % DEPT_COLORS.length]})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', color: '#fff', fontWeight: 700,
                  }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: textStrong,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {e.name}
                    </div>
                    <div style={{ fontSize: '0.73rem', color: textMuted }}>{e.department}</div>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: textMuted, fontWeight: 500, flexShrink: 0 }}>
                    {e.joined}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;