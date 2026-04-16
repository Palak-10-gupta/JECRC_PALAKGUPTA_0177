import React, { useState } from 'react';
import useEmployees from '../../hooks/useEmployees';
import useApp from '../../hooks/useApp';
import useTheme from '../../hooks/useTheme';
import EmployeeForm from './EmployeeForm';
import EmployeeCard from './EmployeeCard';

const EmployeeList = () => {
  const { filtered, departments, filterDept, setFilterDept, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { showNotification } = useApp();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [showForm,      setShowForm]      = useState(false);
  const [editTarget,    setEditTarget]    = useState(null);
  const [viewMode,      setViewMode]      = useState('grid');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openAdd  = ()  => { setEditTarget(null); setShowForm(true); };
  const openEdit = emp => { setEditTarget(emp);  setShowForm(true); };

  const handleSave = data => {
    if (editTarget) { updateEmployee(editTarget.id, data); showNotification('Employee updated'); }
    else            { addEmployee(data);                   showNotification('Employee added');   }
    setShowForm(false); setEditTarget(null);
  };

  const handleDelete = id => {
    deleteEmployee(id);
    showNotification('Employee removed', 'error');
    setDeleteConfirm(null);
  };

  const textMuted  = isDark ? '#64748b' : '#94a3b8';
  const textBase   = isDark ? '#94a3b8' : '#475569';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';
  const borderCol  = isDark ? '#1e2d4a' : '#e2e8f0';
  const surfaceBg  = isDark ? '#111c35' : '#f8fafc';

  return (
    <div style={{ padding: '24px 32px' }}>

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>

        {/* Department filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', flex: 1 }}>
          {departments.map(d => {
            const active = filterDept === d;
            return (
              <button key={d} onClick={() => setFilterDept(d)} style={{
                padding: '6px 14px', borderRadius: 8,
                border: active ? '1px solid #7c3aed' : `1px solid ${borderCol}`,
                background: active ? 'rgba(124,58,237,0.1)' : 'transparent',
                color: active ? '#7c3aed' : textBase,
                fontFamily: 'Inter, sans-serif', fontWeight: active ? 600 : 500,
                fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.15s',
              }}>
                {d}
              </button>
            );
          })}
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: 2, background: surfaceBg,
          border: `1px solid ${borderCol}`, borderRadius: 9, padding: 3 }}>
          {[
            { id: 'grid', label: 'Grid', icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              )},
            { id: 'table', label: 'Table', icon: (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )},
          ].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)} style={{
              padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem',
              display: 'flex', alignItems: 'center', gap: 5,
              background: viewMode === v.id
                ? (isDark ? '#1e2d4a' : '#fff')
                : 'transparent',
              color: viewMode === v.id ? '#7c3aed' : textMuted,
              boxShadow: viewMode === v.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.15s',
            }}>
              {v.icon} {v.label}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button onClick={openAdd} style={{
          padding: '8px 16px', borderRadius: 9, border: 'none',
          background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
          color: '#fff', fontFamily: 'Inter, sans-serif',
          fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6,
          boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
          transition: 'all 0.18s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(124,58,237,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 4px 14px rgba(124,58,237,0.3)'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Employee
        </button>
      </div>

      {/* Count */}
      <p style={{ fontSize: '0.8rem', color: textMuted, marginBottom: 16, fontWeight: 500 }}>
        Showing <span style={{ color: textStrong, fontWeight: 700 }}>{filtered.length}</span> employee{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
          {filtered.map((emp, i) => (
            <div key={emp.id} style={{ animationDelay: `${i * 0.04}s` }}>
              <EmployeeCard employee={emp} onEdit={openEdit} onDelete={id => setDeleteConfirm(id)} />
            </div>
          ))}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="card" style={{ borderRadius: 14, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr className="table-header">
                {['Employee','Department','Role','Salary','Joined','Status','Actions'].map(h => (
                  <th key={h} style={{
                    padding: '12px 18px', textAlign: 'left',
                    fontSize: '0.7rem', fontWeight: 700,
                    color: textMuted, letterSpacing: '0.07em', textTransform: 'uppercase',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => {
                const initials = emp.name.split(' ').map(n => n[0]).join('').slice(0, 2);
                return (
                  <tr key={emp.id} className="table-row" style={{
                    borderBottom: `1px solid ${borderCol}`, transition: 'background 0.15s',
                  }}>
                    <td style={{ padding: '13px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.7rem', color: '#fff', fontWeight: 700, flexShrink: 0,
                        }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: textStrong }}>{emp.name}</div>
                          <div style={{ fontSize: '0.72rem', color: textMuted }}>{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '13px 18px', fontSize: '0.85rem', color: textBase }}>{emp.department}</td>
                    <td style={{ padding: '13px 18px', fontSize: '0.85rem', color: textBase }}>{emp.role}</td>
                    <td style={{ padding: '13px 18px', fontSize: '0.85rem', fontWeight: 600, color: textStrong }}>
                      ${emp.salary.toLocaleString()}
                    </td>
                    <td style={{ padding: '13px 18px', fontSize: '0.82rem', color: textMuted }}>{emp.joined || '—'}</td>
                    <td style={{ padding: '13px 18px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 99,
                        fontSize: '0.7rem', fontWeight: 600,
                        background: emp.status === 'Active'
                          ? (isDark ? 'rgba(16,185,129,0.15)' : '#dcfce7')
                          : (isDark ? 'rgba(244,63,94,0.15)'  : '#fee2e2'),
                        color: emp.status === 'Active'
                          ? (isDark ? '#34d399' : '#15803d')
                          : (isDark ? '#fb7185' : '#b91c1c'),
                      }}>
                        {emp.status}
                      </span>
                    </td>
                    <td style={{ padding: '13px 18px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => openEdit(emp)} style={{
                          padding: '5px 12px', borderRadius: 7,
                          border: `1px solid ${borderCol}`, background: 'transparent',
                          color: '#7c3aed', fontFamily: 'Inter, sans-serif',
                          fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                        }}>Edit</button>
                        <button onClick={() => setDeleteConfirm(emp.id)} style={{
                          padding: '5px 12px', borderRadius: 7,
                          border: 'none',
                          background: isDark ? 'rgba(244,63,94,0.1)' : '#fff1f2',
                          color: '#f43f5e', fontFamily: 'Inter, sans-serif',
                          fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                        }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: isDark ? '#111c35' : '#f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <p style={{ fontWeight: 600, color: textBase, fontSize: '0.9rem' }}>No employees found</p>
          <p style={{ fontSize: '0.8rem', color: textMuted, marginTop: 4 }}>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showForm && (
        <EmployeeForm
          employee={editTarget}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditTarget(null); }}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{
            maxWidth: 360, textAlign: 'center',
            background: isDark ? '#0d1526' : '#fff',
            border: `1px solid ${borderCol}`,
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14,
              background: isDark ? 'rgba(244,63,94,0.1)' : '#fff1f2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.05rem',
              color: isDark ? '#f1f5f9' : '#0f172a', marginBottom: 6 }}>
              Remove Employee?
            </h3>
            <p style={{ fontSize: '0.83rem', color: textMuted, marginBottom: 24 }}>
              This action is permanent and cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => handleDelete(deleteConfirm)} style={{
                flex: 1, padding: '10px', borderRadius: 9, border: 'none',
                background: '#f43f5e', color: '#fff', fontFamily: 'Inter, sans-serif',
                fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
              }}>
                Remove
              </button>
              <button onClick={() => setDeleteConfirm(null)} style={{
                flex: 1, padding: '10px', borderRadius: 9,
                border: `1px solid ${borderCol}`, background: 'transparent',
                color: textBase, fontFamily: 'Inter, sans-serif',
                fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;