import React, { useState, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';

const DEPTS   = ['Engineering','Design','Marketing','HR','Sales','Finance','Operations'];
const STATUSES = ['Active','Inactive'];
const EMPTY   = { name:'', email:'', department:'Engineering', role:'', status:'Active', salary:'', joined:'' };

const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(employee ? { ...employee, salary: String(employee.salary) } : EMPTY);
  }, [employee]);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    onSave({ ...form, salary: Number(form.salary) });
  };

  const labelStyle = {
    display: 'block', marginBottom: 5,
    fontSize: '0.78rem', fontWeight: 600,
    color: isDark ? '#64748b' : '#374151',
    letterSpacing: '0.02em',
  };

  const borderCol  = isDark ? '#1e2d4a' : '#e2e8f0';
  const textStrong = isDark ? '#f1f5f9' : '#0f172a';

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{
        background: isDark ? '#0d1526' : '#fff',
        border: `1px solid ${borderCol}`,
        boxShadow: isDark ? '0 24px 60px rgba(0,0,0,0.5)' : '0 24px 60px rgba(15,23,42,0.15)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.2rem',
            color: textStrong, letterSpacing: '-0.02em' }}>
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <p style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8', marginTop: 4 }}>
            {employee ? 'Update the details below' : 'Fill in the details to add a new team member'}
          </p>
        </div>

        <form onSubmit={submit}>
          {/* Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input className="input-field" name="name" required
                value={form.name} onChange={change} placeholder="Jane Doe" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input className="input-field" name="email" type="email" required
                value={form.email} onChange={change} placeholder="jane@company.com" />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Department</label>
              <select className="input-field" name="department" value={form.department} onChange={change}>
                {DEPTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Role / Title *</label>
              <input className="input-field" name="role" required
                value={form.role} onChange={change} placeholder="e.g. Software Engineer" />
            </div>
          </div>

          {/* Row 3 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Status</label>
              <select className="input-field" name="status" value={form.status} onChange={change}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Annual Salary ($) *</label>
              <input className="input-field" name="salary" type="number" required
                value={form.salary} onChange={change} placeholder="80000" />
            </div>
          </div>

          {/* Row 4 */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Joining Date</label>
            <input className="input-field" name="joined" type="date" value={form.joined} onChange={change} />
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" style={{
              flex: 1, padding: '11px', border: 'none', borderRadius: 10,
              background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
              color: '#fff', fontFamily: 'Inter, sans-serif',
              fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}>
              {employee ? 'Save Changes' : 'Add Employee'}
            </button>
            <button type="button" onClick={onCancel} style={{
              padding: '11px 20px', border: `1px solid ${borderCol}`,
              borderRadius: 10, background: 'transparent',
              color: isDark ? '#94a3b8' : '#475569',
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '0.875rem', cursor: 'pointer',
            }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;