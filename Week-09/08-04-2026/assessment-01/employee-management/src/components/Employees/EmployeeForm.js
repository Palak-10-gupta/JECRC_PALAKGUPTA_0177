import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee, clearSelection } from '../../features/employees/employeeSlice';
import { showNotification } from '../../features/ui/uiSlice';

const DEPTS    = ['Engineering','Product','Design','Analytics','HR','Finance','Marketing'];
const STATUSES = ['Active','On Leave','Remote','Probation'];
const empty    = { name:'', role:'', dept:'Engineering', salary:'', email:'', status:'Active', joined:'' };

export default function EmployeeForm({ onClose }) {
  const dispatch = useDispatch();
  const selected = useSelector((s) => s.employees.selectedEmployee);
  const [form, setForm] = useState(empty);
  const isEdit = Boolean(selected);

  useEffect(() => { setForm(selected ? { ...selected } : empty); }, [selected]);

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.role) {
      dispatch(showNotification({ message: 'Name, email and role are required.', type: 'error' }));
      return;
    }
    if (isEdit) {
      dispatch(updateEmployee({ ...form, salary: Number(form.salary) }));
      dispatch(showNotification({ message: `${form.name} updated.`, type: 'success' }));
    } else {
      dispatch(addEmployee({ ...form, salary: Number(form.salary) }));
      dispatch(showNotification({ message: `${form.name} added to the team.`, type: 'success' }));
    }
    dispatch(clearSelection());
    onClose();
  };

  const lbl = { fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 5, display: 'block' };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(15,23,42,0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, backdropFilter: 'blur(3px)', padding: 20,
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 16, padding: 32,
        width: '100%', maxWidth: 520,
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'modalIn 0.2s ease',
      }}>
        <style>{`@keyframes modalIn { from { opacity:0; transform:scale(0.97) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }`}</style>

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:26 }}>
          <div>
            <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text-primary)' }}>
              {isEdit ? 'Edit Employee' : 'Add Employee'}
            </h2>
            <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:3 }}>
              {isEdit ? 'Update the employee record below' : 'Fill in the details to add a new employee'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background:'var(--bg-muted)', color:'var(--text-secondary)',
              width:32, height:32, padding:0, borderRadius:8,
              border:'1px solid var(--border)', fontSize:16,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}
          >✕</button>
        </div>

        {/* Fields */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={lbl}>Full Name <span style={{ color:'#ef4444' }}>*</span></label>
              <input name="name" value={form.name} onChange={set} placeholder="e.g. Riya Patel"/>
            </div>
            <div>
              <label style={lbl}>Email <span style={{ color:'#ef4444' }}>*</span></label>
              <input name="email" type="email" value={form.email} onChange={set} placeholder="name@company.com"/>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={lbl}>Role / Designation <span style={{ color:'#ef4444' }}>*</span></label>
              <input name="role" value={form.role} onChange={set} placeholder="e.g. Senior Developer"/>
            </div>
            <div>
              <label style={lbl}>Department</label>
              <select name="dept" value={form.dept} onChange={set}>
                {DEPTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={lbl}>Annual Salary (₹)</label>
              <input name="salary" type="number" value={form.salary} onChange={set} placeholder="e.g. 850000"/>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <select name="status" value={form.status} onChange={set}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>Date Joined</label>
            <input name="joined" type="date" value={form.joined} onChange={set}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display:'flex', gap:10, marginTop:24 }}>
          <button
            onClick={handleSubmit}
            style={{
              flex:1, background:'var(--accent)', color:'#fff',
              padding:'11px', fontSize:14, fontWeight:600, borderRadius:8,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-dark)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            {isEdit ? 'Save Changes' : 'Add Employee'}
          </button>
          <button
            onClick={onClose}
            style={{
              background:'var(--bg-muted)', color:'var(--text-secondary)',
              padding:'11px 20px', border:'1px solid var(--border)', borderRadius:8,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}