import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setFilterDept } from '../../features/employees/employeeSlice';
import EmployeeCard from './EmployeeCard';
import EmployeeForm from './EmployeeForm';

const DEPTS = ['All','Engineering','Product','Design','Analytics','HR','Finance','Marketing'];

export default function EmployeeList() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { list, searchQuery, filterDept } = useSelector((s) => s.employees);
  const user  = useSelector((s) => s.auth.user);
  const perms = user?.permissions || {};

  const filtered = list.filter((e) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q);
    const matchDept = filterDept === 'All' || e.dept === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <div>
      {/* Toolbar */}
      <div style={{
        display: 'flex', gap: 10, flexWrap: 'wrap',
        alignItems: 'center', marginBottom: 20,
      }}>
        <div style={{ flex: 1, minWidth: 200, maxWidth: 360, position: 'relative' }}>
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="8" stroke="var(--text-muted)" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            placeholder="Search by name, role or email..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            style={{ paddingLeft: 34 }}
          />
        </div>

        <select
          value={filterDept}
          onChange={(e) => dispatch(setFilterDept(e.target.value))}
          style={{ width: 160 }}
        >
          {DEPTS.map((d) => <option key={d}>{d}</option>)}
        </select>

        {/* Only Admin sees Add Employee */}
        {perms.canAdd && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'var(--accent)', color: '#fff',
              padding: '10px 18px', fontSize: 13, fontWeight: 600,
              borderRadius: 8,
              display: 'flex', alignItems: 'center', gap: 6,
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add Employee
          </button>
        )}
      </div>

      {/* Quick stats */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Total',    value: list.length,                                      color: '#6366f1' },
          { label: 'Active',   value: list.filter(e => e.status === 'Active').length,   color: '#10b981' },
          { label: 'On Leave', value: list.filter(e => e.status === 'On Leave').length, color: '#f59e0b' },
          { label: 'Showing',  value: filtered.length,                                  color: '#3b82f6' },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 8, padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: 'var(--shadow-sm)',
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '48px 20px',
          color: 'var(--text-muted)',
          background: 'var(--bg-muted)',
          borderRadius: 10,
          border: '1px dashed var(--border)',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>No employees found</p>
          <p style={{ fontSize: 12, marginTop: 4 }}>Try a different search or filter</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} onEdit={() => setShowForm(true)} />
          ))}
        </div>
      )}

      {showForm && <EmployeeForm onClose={() => setShowForm(false)} />}
    </div>
  );
}