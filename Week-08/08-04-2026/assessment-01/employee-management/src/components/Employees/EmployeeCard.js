import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, selectEmployee } from '../../features/employees/employeeSlice';
import { showNotification } from '../../features/ui/uiSlice';

const STATUS_CONFIG = {
  Active:     { bg: '#ecfdf5', color: '#065f46', dot: '#10b981' },
  'On Leave': { bg: '#fefce8', color: '#713f12', dot: '#eab308' },
  Remote:     { bg: '#eff6ff', color: '#1e40af', dot: '#3b82f6' },
  Probation:  { bg: '#fdf4ff', color: '#581c87', dot: '#a855f7' },
};

const DEPT_ACCENT = {
  Engineering: '#6366f1', Product: '#8b5cf6', Design: '#ec4899',
  Analytics: '#10b981', HR: '#f59e0b', Finance: '#3b82f6', Marketing: '#ef4444',
};

export default function EmployeeCard({ employee, onEdit }) {
  const dispatch = useDispatch();
  const user     = useSelector((s) => s.auth.user);
  const perms    = user?.permissions || {};

  const sc = STATUS_CONFIG[employee.status] || STATUS_CONFIG.Active;
  const ac = DEPT_ACCENT[employee.dept] || '#6366f1';

  const handleDelete = () => {
    if (window.confirm(`Remove ${employee.name} from the system?`)) {
      dispatch(deleteEmployee(employee.id));
      dispatch(showNotification({ message: `${employee.name} has been removed.`, type: 'info' }));
    }
  };

  const handleEdit = () => {
    dispatch(selectEmployee(employee));
    onEdit();
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        borderRadius: 12,
        padding: '18px 20px',
        boxShadow: 'var(--shadow-sm)',
        border: '1px solid var(--border)',
        transition: 'box-shadow 0.18s, transform 0.18s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          background: `${ac}18`, border: `1.5px solid ${ac}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 13, color: ac,
        }}>
          {employee.avatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 600, fontSize: 14, color: 'var(--text-primary)',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {employee.name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 1 }}>
            {employee.role}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: sc.bg, color: sc.color,
          borderRadius: 20, padding: '3px 9px',
          fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
          {employee.status}
        </div>
      </div>

      {/* Meta chips */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span style={{
          background: `${ac}12`, color: ac,
          border: `1px solid ${ac}25`,
          borderRadius: 5, padding: '3px 9px', fontSize: 11, fontWeight: 600,
        }}>
          {employee.dept}
        </span>

        {/* Salary — Admin only */}
        {perms.canViewSalary ? (
          <span style={{
            background: 'var(--bg-muted)', color: 'var(--text-secondary)',
            borderRadius: 5, padding: '3px 9px', fontSize: 11,
            border: '1px solid var(--border)',
          }}>
            ₹{Number(employee.salary).toLocaleString('en-IN')} / yr
          </span>
        ) : (
          <span style={{
            background: 'var(--bg-muted)', color: 'var(--text-muted)',
            borderRadius: 5, padding: '3px 9px', fontSize: 11,
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Salary hidden
          </span>
        )}
      </div>

      {/* Email & join date */}
      <div style={{
        fontSize: 11, color: 'var(--text-muted)', marginBottom: 14,
        display: 'flex', flexDirection: 'column', gap: 3,
      }}>
        <span>{employee.email}</span>
        {employee.joined && <span>Joined {employee.joined}</span>}
      </div>

      {/* Actions — conditional per role */}
      <div style={{ display: 'flex', gap: 8 }}>
        {perms.canEdit && (
          <button
            onClick={handleEdit}
            style={{
              flex: 1, background: 'var(--bg-muted)',
              color: 'var(--text-secondary)', fontSize: 12,
              padding: '7px 12px', border: '1px solid var(--border)', borderRadius: 7,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#eff6ff';
              e.currentTarget.style.color = '#1d4ed8';
              e.currentTarget.style.borderColor = '#bfdbfe';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-muted)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            Edit
          </button>
        )}

        {perms.canDelete && (
          <button
            onClick={handleDelete}
            style={{
              background: 'var(--bg-muted)', color: 'var(--text-muted)',
              padding: '7px 12px', border: '1px solid var(--border)',
              borderRadius: 7, fontSize: 12,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fef2f2';
              e.currentTarget.style.color = '#dc2626';
              e.currentTarget.style.borderColor = '#fca5a5';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bg-muted)';
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
          >
            Delete
          </button>
        )}

        {/* HR view-only indicator */}
        {!perms.canEdit && !perms.canDelete && (
          <div style={{
            flex: 1, background: 'var(--bg-muted)',
            color: 'var(--text-muted)', fontSize: 11,
            padding: '7px 12px', border: '1px solid var(--border)',
            borderRadius: 7, textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            View only
          </div>
        )}
      </div>
    </div>
  );
}