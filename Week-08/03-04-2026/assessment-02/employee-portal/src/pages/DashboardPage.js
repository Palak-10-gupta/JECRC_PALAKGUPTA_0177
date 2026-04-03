import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import Layout from '../components/common/Layout';

/* ── Stat card ── */
var StatCard = function ({ number, label, icon, colorClass, gradient }) {
  return (
    <div className={'stat-card ' + colorClass}>
      <div className="stat-icon">{icon}</div>
      <div
        className="stat-number"
        style={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {number}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

/* ── Quick action link ── */
var QuickAction = function ({ to, icon, title, desc, accentColor }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
          borderLeft: '3px solid ' + accentColor,
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            background: accentColor + '22',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              fontSize: '0.93rem',
              marginBottom: '2px',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: '0.80rem', color: 'var(--text-muted)' }}>
            {desc}
          </div>
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>→</span>
      </div>
    </Link>
  );
};

var DashboardPage = function () {
  var auth            = useAuth();
  var employeeCtx     = useEmployees();
  var currentUser     = auth.currentUser;
  var isAdmin         = auth.isAdmin;
  var employees       = employeeCtx.employees;

  var activeCount = employees.filter(function (e) { return e.status === 'active'; }).length;
  var deptSet     = {};
  employees.forEach(function (e) { deptSet[e.department] = true; });
  var deptCount   = Object.keys(deptSet).length;
  var adminCount  = employees.filter(function (e) { return e.role === 'admin'; }).length;

  var hour      = new Date().getHours();
  var greeting  = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  var firstName = currentUser ? currentUser.name.split(' ')[0] : 'User';

  var recentList = employees.slice().reverse().slice(0, 5);

  return (
    <Layout>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.80rem',
                marginBottom: '0.2rem',
                fontFamily: 'var(--font-display)',
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
              }}
            >
              {greeting} 👋
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '800',
                letterSpacing: '-0.025em',
              }}
            >
              Welcome back,{' '}
              <span className="text-gradient">{firstName}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.88rem' }}>
              {isAdmin
                ? "Here's your organization's overview for today."
                : 'Your personal portal snapshot.'}
            </p>
          </div>

          <span className={'badge ' + (isAdmin ? 'badge-admin' : 'badge-employee')}>
            {isAdmin ? '🛡 Admin Access' : '👤 Employee'}
          </span>
        </div>
      </div>

      {/* ── Admin Stats ── */}
      {isAdmin && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <StatCard
            number={employees.length}
            label="Total Employees"
            icon="👥"
            colorClass="stat-card-purple"
            gradient="var(--grad-primary)"
          />
          <StatCard
            number={activeCount}
            label="Active Members"
            icon="✓"
            colorClass="stat-card-teal"
            gradient="var(--grad-success)"
          />
          <StatCard
            number={deptCount}
            label="Departments"
            icon="🏢"
            colorClass="stat-card-amber"
            gradient="var(--grad-amber)"
          />
          <StatCard
            number={adminCount}
            label="Admins"
            icon="🛡"
            colorClass="stat-card-pink"
            gradient="var(--grad-pink)"
          />
        </div>
      )}

      {/* ── Lower grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isAdmin ? '1fr 1fr' : '1fr',
          gap: '1.5rem',
        }}
      >
        {/* Quick Actions */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              fontSize: '0.78rem',
            }}
          >
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {isAdmin ? (
              <>
                <QuickAction
                  to="/employees"
                  icon="👥"
                  title="Manage Employees"
                  desc="View, edit and delete all employee records"
                  accentColor="var(--brand-primary)"
                />
                <QuickAction
                  to="/employees/add"
                  icon="＋"
                  title="Add New Employee"
                  desc="Onboard a new team member into the system"
                  accentColor="var(--brand-accent)"
                />
              </>
            ) : (
              <QuickAction
                to="/my-profile"
                icon="◎"
                title="View My Profile"
                desc="See your personal details and information"
                accentColor="var(--brand-accent)"
              />
            )}
          </div>

          {/* Status summary for admin */}
          {isAdmin && (
            <div
              className="card"
              style={{ marginTop: '1rem', padding: '1rem 1.25rem' }}
            >
              <div
                style={{
                  fontSize: '0.70rem',
                  fontFamily: 'var(--font-display)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                Status Breakdown
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Active', color: 'var(--brand-success)', count: activeCount },
                  { label: 'Inactive', color: 'var(--brand-danger)', count: employees.filter(function (e) { return e.status === 'inactive'; }).length },
                  { label: 'On Leave', color: 'var(--brand-warning)', count: employees.filter(function (e) { return e.status === 'on-leave'; }).length },
                ].map(function (item) {
                  return (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '8px', height: '8px',
                          borderRadius: '50%',
                          background: item.color,
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {item.label}:{' '}
                        <strong style={{ color: 'var(--text-primary)' }}>{item.count}</strong>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        {isAdmin ? (
          /* Recent employees list */
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              Recently Added
            </h2>
            <div
              className="card"
              style={{ padding: 0, overflow: 'hidden' }}
            >
              {recentList.map(function (emp, idx) {
                return (
                  <div
                    key={emp.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1.1rem',
                      borderBottom: idx < recentList.length - 1
                        ? '1px solid var(--border-subtle)'
                        : 'none',
                    }}
                  >
                    <div className={'avatar avatar-sm ' + emp.avatarColor}>
                      {emp.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.87rem',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {emp.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {emp.position} · {emp.department}
                      </div>
                    </div>
                    <span
                      className={'badge ' + (emp.status === 'active' ? 'badge-success' : emp.status === 'inactive' ? 'badge-danger' : 'badge-warning')}
                      style={{ fontSize: '0.62rem' }}
                    >
                      {emp.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Employee profile card */
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.78rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              My Profile Summary
            </h2>
            <div className="card card-glow">
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className={'avatar avatar-lg ' + (currentUser ? currentUser.avatarColor : 'avatar-purple')}>
                  {currentUser ? currentUser.avatar : '?'}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                    }}
                  >
                    {currentUser ? currentUser.name : '—'}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
                    {currentUser ? currentUser.position : '—'}
                  </p>
                  <span className="badge badge-employee" style={{ marginTop: '0.3rem', fontSize: '0.68rem' }}>
                    {currentUser ? currentUser.department : '—'}
                  </span>
                </div>
              </div>

              <hr className="divider" />

              {/* Details grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Email',     value: currentUser ? currentUser.email    : '—' },
                  { label: 'Phone',     value: currentUser ? currentUser.phone    : '—' },
                  { label: 'Joined',    value: currentUser ? currentUser.joinDate : '—' },
                  { label: 'Status',    value: currentUser ? currentUser.status   : '—' },
                ].map(function (item) {
                  return (
                    <div key={item.label}>
                      <div
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.70rem',
                          fontFamily: 'var(--font-display)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.07em',
                          marginBottom: '2px',
                        }}
                      >
                        {item.label}
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.88rem' }}>
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;