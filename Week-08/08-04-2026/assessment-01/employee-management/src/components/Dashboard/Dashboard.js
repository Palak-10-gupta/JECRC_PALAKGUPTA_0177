import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../Layout/Navbar';
import EmployeeList from '../Employees/EmployeeList';

const StatCard = ({ icon, label, value, sub, accent, locked }) => (
  <div
    style={{
      background: locked ? 'var(--bg-muted)' : 'var(--bg-card)',
      borderRadius: 12,
      padding: '20px 22px',
      boxShadow: locked ? 'none' : 'var(--shadow-sm)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      transition: 'box-shadow 0.2s',
      position: 'relative',
      overflow: 'hidden',
      opacity: locked ? 0.6 : 1,
    }}
    onMouseEnter={e => { if (!locked) e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
    onMouseLeave={e => { if (!locked) e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
  >
    {locked && (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-muted)',
        zIndex: 2, borderRadius: 12,
        flexDirection: 'column', gap: 4,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--text-muted)" strokeWidth="2"/>
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>Admin only</span>
      </div>
    )}
    <div style={{
      width: 44, height: 44, borderRadius: 10,
      background: `${accent}14`,
      border: `1px solid ${accent}22`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{sub}</div>}
    </div>
  </div>
);

export default function Dashboard() {
  const user      = useSelector((s) => s.auth.user);
  const employees = useSelector((s) => s.employees.list);
  const perms     = user?.permissions || {};

  const totalPayroll = employees.reduce((s, e) => s + Number(e.salary || 0), 0);
  const deptCounts   = employees.reduce((acc, e) => {
    acc[e.dept] = (acc[e.dept] || 0) + 1;
    return acc;
  }, {});
  const topDept = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])[0];

  const now     = new Date();
  const hour    = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const isAdmin   = user?.role === 'Admin';
  const isHR      = user?.role === 'HR Manager';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <Navbar />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>

        {/* Page header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', marginBottom: 28,
          flexWrap: 'wrap', gap: 12,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {greeting}, {user?.username}
              </h1>
              {/* Role badge */}
              <span style={{
                background: isAdmin ? '#eff6ff' : '#f0fdf4',
                color: isAdmin ? '#1d4ed8' : '#166534',
                border: `1px solid ${isAdmin ? '#bfdbfe' : '#bbf7d0'}`,
                borderRadius: 6, padding: '3px 10px',
                fontSize: 11, fontWeight: 700,
                letterSpacing: 0.3,
              }}>
                {user?.role}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
              {now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 14px',
            fontSize: 12, color: 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#10b981', display: 'inline-block',
              boxShadow: '0 0 0 2px #d1fae5',
            }} />
            All systems operational
          </div>
        </div>

        {/* HR access-level notice */}
        {isHR && (
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 10, padding: '12px 18px',
            marginBottom: 24,
            display: 'flex', alignItems: 'flex-start', gap: 12,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="#d97706" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 2 }}>
                HR Manager — Limited Access
              </p>
              <p style={{ fontSize: 12, color: '#b45309' }}>
                You can view and edit employee records. Adding new employees, deleting records, and viewing salary data requires Admin access.
              </p>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16, marginBottom: 28,
        }}>
          <StatCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="#6366f1" strokeWidth="2"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            label="Total Employees"
            value={employees.length}
            accent="#6366f1"
          />
          <StatCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Active"
            value={employees.filter((e) => e.status === 'Active').length}
            sub={`${Math.round((employees.filter(e => e.status === 'Active').length / employees.length) * 100) || 0}% of workforce`}
            accent="#10b981"
          />
          <StatCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#f59e0b" strokeWidth="2"/>
                <path d="M2 10h20" stroke="#f59e0b" strokeWidth="2"/>
              </svg>
            }
            label="Total Payroll"
            value={perms.canViewSalary ? `₹${(totalPayroll / 100000).toFixed(1)}L` : '••••••'}
            sub={perms.canViewSalary ? 'Annual cost' : ''}
            accent="#f59e0b"
            locked={!perms.canViewSalary}
          />
          <StatCard
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            label="Top Department"
            value={topDept ? topDept[0] : '—'}
            sub={topDept ? `${topDept[1]} employees` : ''}
            accent="#3b82f6"
          />
        </div>

        {/* Analytics section — Admin only */}
        {perms.canViewAnalytics && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 14, padding: '20px 24px',
            marginBottom: 24,
            boxShadow: 'var(--shadow-sm)',
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
              Department Breakdown
            </h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(deptCounts).sort((a, b) => b[1] - a[1]).map(([dept, count]) => {
                const pct = Math.round((count / employees.length) * 100);
                const colors = {
                  Engineering: '#6366f1', Product: '#8b5cf6', Design: '#ec4899',
                  Analytics: '#10b981', HR: '#f59e0b', Finance: '#3b82f6', Marketing: '#ef4444',
                };
                const c = colors[dept] || '#6366f1';
                return (
                  <div key={dept} style={{
                    flex: '1 1 140px',
                    background: `${c}0d`,
                    border: `1px solid ${c}25`,
                    borderRadius: 10, padding: '12px 14px',
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c, marginBottom: 6 }}>{dept}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                      {count}
                    </div>
                    <div style={{
                      height: 3, background: 'var(--border)',
                      borderRadius: 2, marginTop: 8, overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${pct}%`, height: '100%',
                        background: c, borderRadius: 2,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{pct}% of total</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Employee Directory */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                Employee Directory
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                {isAdmin ? 'Full access — add, edit and delete records' : 'View and edit employee records'}
              </p>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <EmployeeList />
          </div>
        </div>

      </main>
    </div>
  );
}