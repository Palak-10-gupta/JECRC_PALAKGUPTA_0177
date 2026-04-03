import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import EmployeeForm from '../components/admin/EmployeeForm';
import Layout from '../components/common/Layout';

var AddEmployeePage = function () {
  var employeeCtx = useEmployees();
  var navigate    = useNavigate();

  async function handleSubmit(data) {
    await employeeCtx.addEmployee(data);
    navigate('/employees');
  }

  return (
    <Layout>
      {/* ── Header ── */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={function () { return navigate('/employees'); }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '1rem',
            padding: 0,
            fontFamily: 'var(--font-body)',
            transition: 'color 0.18s',
          }}
          onMouseEnter={function (e) { e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={function (e) { e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          ← Back to Directory
        </button>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.85rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
          }}
        >
          Add New{' '}
          <span className="text-gradient">Employee</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.88rem' }}>
          Complete the form below to onboard a new team member.
        </p>
      </div>

      {/* ── Form card ── */}
      <div style={{ maxWidth: '800px' }}>
        <div className="card card-glow">
          {/* Info banner */}
          <div className="alert alert-info" style={{ marginBottom: '1.6rem' }}>
            <span style={{ flexShrink: 0 }}>ℹ</span>
            <span>
              All required fields must be filled. The new employee record will appear in the
              directory immediately after saving.
            </span>
          </div>

          <EmployeeForm
            onSubmit={handleSubmit}
            onCancel={function () { return navigate('/employees'); }}
            isLoading={employeeCtx.isLoading}
            submitLabel="＋ Add Employee"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AddEmployeePage;