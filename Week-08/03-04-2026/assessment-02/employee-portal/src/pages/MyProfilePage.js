import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import Layout from '../components/common/Layout';

/* ── A single info row inside a profile section ── */
var InfoRow = function ({ label, value, highlight, last }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.8rem 0',
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      <span
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.74rem',
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontWeight: '500',
          fontSize: '0.9rem',
          color: highlight ? 'var(--brand-accent)' : 'var(--text-primary)',
          fontFamily: highlight ? 'var(--font-display)' : 'var(--font-body)',
          textAlign: 'right',
          maxWidth: '60%',
          wordBreak: 'break-word',
        }}
      >
        {value || '—'}
      </span>
    </div>
  );
};

var MyProfilePage = function () {
  var auth            = useAuth();
  var employeeCtx     = useEmployees();
  var currentUser     = auth.currentUser;

  /* ── Get latest data from employee list (admin may have updated it) ── */
  var liveData = employeeCtx.getEmployeeByUsername(
    currentUser ? currentUser.username : ''
  ) || currentUser || {};

  /* ── Computed values ── */
  var joinDate = liveData.joinDate
    ? new Date(liveData.joinDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : 'N/A';

  var yearsWorked = liveData.joinDate
    ? ((Date.now() - new Date(liveData.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1)
    : '0.0';

  var salary = liveData.salary
    ? '$' + Number(liveData.salary).toLocaleString()
    : '—';

  return (
    <Layout>
      {/* ── Page title ── */}
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.85rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
          }}
        >
          My{' '}
          <span className="text-gradient">Profile</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.88rem' }}>
          Your personal employee record. Contact HR Admin for any changes.
        </p>
      </div>

      {/* ── Content grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '1.5rem',
          maxWidth: '900px',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT: Avatar card ── */}
        <div>
          <div
            className="card card-glow"
            style={{ textAlign: 'center', padding: '2rem 1.25rem' }}
          >
            {/* Avatar */}
            <div
              className={'avatar avatar-xl ' + (liveData.avatarColor || 'avatar-purple')}
              style={{ margin: '0 auto 1.25rem' }}
            >
              {liveData.avatar || '?'}
            </div>

            {/* Name */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: '700',
                marginBottom: '0.2rem',
              }}
            >
              {liveData.name || '—'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.85rem' }}>
              {liveData.position || '—'}
            </p>

            {/* Role badge */}
            <span
              className={'badge ' + (liveData.role === 'admin' ? 'badge-admin' : 'badge-employee')}
            >
              {liveData.role === 'admin' ? '🛡 Admin' : '👤 Employee'}
            </span>

            <hr className="divider" />

            {/* Quick stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {/* Years */}
              <div
                style={{
                  padding: '0.85rem',
                  background: 'rgba(108,63,255,0.08)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  Years at NexCorp
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    background: 'var(--grad-accent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}
                >
                  {yearsWorked}
                </div>
              </div>

              {/* Status */}
              <div
                style={{
                  padding: '0.85rem',
                  background: liveData.status === 'active'
                    ? 'rgba(0,214,143,0.07)'
                    : 'rgba(255,71,87,0.07)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid ' + (liveData.status === 'active'
                    ? 'rgba(0,214,143,0.20)'
                    : 'rgba(255,71,87,0.20)'),
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                  }}
                >
                  Employment Status
                </div>
                <span
                  className={'badge ' + (
                    liveData.status === 'active'   ? 'badge-success' :
                    liveData.status === 'inactive' ? 'badge-danger'  :
                                                     'badge-warning'
                  )}
                  style={{ fontSize: '0.70rem' }}
                >
                  {liveData.status || 'active'}
                </span>
              </div>

              {/* Department */}
              <div
                style={{
                  padding: '0.85rem',
                  background: 'rgba(108,63,255,0.06)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-display)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.09em',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                  }}
                >
                  Department
                </div>
                <span
                  className="badge badge-info"
                  style={{ fontSize: '0.70rem' }}
                >
                  {liveData.department || '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Personal Info */}
          <div className="card">
            <div
              style={{
                fontSize: '0.70rem',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              Personal Information
            </div>
            <InfoRow label="Full Name" value={liveData.name} />
            <InfoRow label="Email Address" value={liveData.email} />
            <InfoRow label="Phone Number" value={liveData.phone} />
            <InfoRow label="Portal Username" value={liveData.username} last={true} />
          </div>

          {/* Employment Info */}
          <div className="card">
            <div
              style={{
                fontSize: '0.70rem',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: 'var(--text-muted)',
                marginBottom: '0.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              Employment Details
            </div>
            <InfoRow label="Department"  value={liveData.department} />
            <InfoRow label="Position"    value={liveData.position} />
            <InfoRow label="Join Date"   value={joinDate} />
            <InfoRow label="Annual Salary" value={salary} highlight={true} last={true} />
          </div>

          {/* Info notice */}
          <div className="alert alert-info">
            <span style={{ flexShrink: 0, fontSize: '1rem' }}>ℹ</span>
            <span>
              This is a read-only view of your employee record. To request any changes,
              please contact your HR Administrator.
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfilePage;