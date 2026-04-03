import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import Layout from '../components/common/Layout';
import ConfirmModal from '../components/admin/ConfirmModal';
import EditModal from '../components/admin/EditModal';

var EmployeeListPage = function () {
  var employeeCtx = useEmployees();
  var employees   = employeeCtx.employees;
  var isLoading   = employeeCtx.isLoading;

  var [search,       setSearch]       = useState('');
  var [filterDept,   setFilterDept]   = useState('');
  var [filterStatus, setFilterStatus] = useState('');
  var [filterRole,   setFilterRole]   = useState('');
  var [sortBy,       setSortBy]       = useState('name');
  var [deleteTarget, setDeleteTarget] = useState(null);
  var [editTarget,   setEditTarget]   = useState(null);

  /* ── Unique dept list ── */
  var deptSet = {};
  employees.forEach(function (e) { deptSet[e.department] = true; });
  var departments = Object.keys(deptSet).sort();

  /* ── Filtered + sorted list ── */
  var filtered = useMemo(function () {
    var q = search.toLowerCase();

    var list = employees.filter(function (emp) {
      var matchSearch = !q
        || emp.name.toLowerCase().includes(q)
        || emp.email.toLowerCase().includes(q)
        || emp.position.toLowerCase().includes(q)
        || emp.department.toLowerCase().includes(q);
      var matchDept   = !filterDept   || emp.department === filterDept;
      var matchStatus = !filterStatus || emp.status     === filterStatus;
      var matchRole   = !filterRole   || emp.role       === filterRole;
      return matchSearch && matchDept && matchStatus && matchRole;
    });

    list.sort(function (a, b) {
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      if (sortBy === 'salary')     return b.salary - a.salary;
      if (sortBy === 'joinDate')   return new Date(b.joinDate) - new Date(a.joinDate);
      return 0;
    });

    return list;
  }, [employees, search, filterDept, filterStatus, filterRole, sortBy]);

  /* ── Handlers ── */
  async function handleDelete(id) {
    await employeeCtx.deleteEmployee(id);
    setDeleteTarget(null);
  }

  async function handleEdit(data) {
    await employeeCtx.updateEmployee(editTarget.id, data);
    setEditTarget(null);
  }

  function clearFilters() {
    setSearch('');
    setFilterDept('');
    setFilterStatus('');
    setFilterRole('');
  }

  var hasFilters = search || filterDept || filterStatus || filterRole;

  return (
    <Layout>
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.85rem',
              fontWeight: '800',
              letterSpacing: '-0.02em',
            }}
          >
            Employee{' '}
            <span className="text-gradient">Directory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginTop: '0.2rem' }}>
            {filtered.length} of {employees.length} records displayed
          </p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">
          ＋ Add Employee
        </Link>
      </div>

      {/* ── Filter Bar ── */}
      <div
        style={{
          display: 'flex',
          gap: '0.7rem',
          flexWrap: 'wrap',
          marginBottom: '1.4rem',
          padding: '1rem 1.1rem',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* Search */}
        <div className="search-wrapper" style={{ flex: '1 1 210px' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="form-input search-input"
            style={{ margin: 0 }}
            placeholder="Search name, email, position..."
            value={search}
            onChange={function (e) { return setSearch(e.target.value); }}
          />
        </div>

        {/* Department */}
        <select
          className="form-select"
          style={{ flex: '0 0 155px', margin: 0 }}
          value={filterDept}
          onChange={function (e) { return setFilterDept(e.target.value); }}
        >
          <option value="">All Departments</option>
          {departments.map(function (d) {
            return <option key={d} value={d}>{d}</option>;
          })}
        </select>

        {/* Status */}
        <select
          className="form-select"
          style={{ flex: '0 0 138px', margin: 0 }}
          value={filterStatus}
          onChange={function (e) { return setFilterStatus(e.target.value); }}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="on-leave">On Leave</option>
        </select>

        {/* Role */}
        <select
          className="form-select"
          style={{ flex: '0 0 128px', margin: 0 }}
          value={filterRole}
          onChange={function (e) { return setFilterRole(e.target.value); }}
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employee">Employee</option>
        </select>

        {/* Sort */}
        <select
          className="form-select"
          style={{ flex: '0 0 148px', margin: 0 }}
          value={sortBy}
          onChange={function (e) { return setSortBy(e.target.value); }}
        >
          <option value="name">Sort: Name A-Z</option>
          <option value="department">Sort: Department</option>
          <option value="salary">Sort: Salary ↓</option>
          <option value="joinDate">Sort: Newest</option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            className="btn btn-secondary btn-sm"
            onClick={clearFilters}
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* ── Table ── */}
      <div className="table-wrapper">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>No employees found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Salary</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Role</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(function (emp) {
                return (
                  <tr key={emp.id}>
                    {/* Name + avatar */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                        <div className={'avatar avatar-sm ' + emp.avatarColor}>
                          {emp.avatar}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', fontSize: '0.88rem' }}>
                            {emp.name}
                          </div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {emp.position}
                    </td>

                    {/* Department pill */}
                    <td>
                      <span
                        style={{
                          padding: '0.18rem 0.6rem',
                          background: 'rgba(108,63,255,0.10)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.76rem',
                          color: '#a78bfa',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {emp.department}
                      </span>
                    </td>

                    {/* Contact */}
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      <div>{emp.phone}</div>
                    </td>

                    {/* Salary */}
                    <td>
                      <span
                        style={{
                          fontWeight: '700',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.88rem',
                          background: 'var(--grad-accent)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ${Number(emp.salary).toLocaleString()}
                      </span>
                    </td>

                    {/* Join date */}
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.80rem' }}>
                      {emp.joinDate}
                    </td>

                    {/* Status badge */}
                    <td>
                      <span
                        className={
                          'badge ' +
                          (emp.status === 'active'   ? 'badge-success' :
                           emp.status === 'inactive' ? 'badge-danger'  :
                                                       'badge-warning')
                        }
                        style={{ fontSize: '0.64rem' }}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* Role badge */}
                    <td>
                      <span
                        className={'badge ' + (emp.role === 'admin' ? 'badge-admin' : 'badge-employee')}
                        style={{ fontSize: '0.64rem' }}
                      >
                        {emp.role}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                        <button
                          className="btn-icon"
                          title="Edit employee"
                          onClick={function () { return setEditTarget(emp); }}
                          style={{ color: 'var(--brand-primary)' }}
                        >
                          ✏
                        </button>
                        <button
                          className="btn-icon"
                          title="Delete employee"
                          onClick={function () { return setDeleteTarget(emp); }}
                          style={{ color: 'var(--brand-danger)' }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Record count footer ── */}
      {filtered.length > 0 && (
        <div
          style={{
            marginTop: '1rem',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            textAlign: 'right',
          }}
        >
          Showing {filtered.length} record{filtered.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* ── Modals ── */}
      {deleteTarget && (
        <ConfirmModal
          employee={deleteTarget}
          onConfirm={handleDelete}
          onCancel={function () { return setDeleteTarget(null); }}
          isLoading={isLoading}
        />
      )}

      {editTarget && (
        <EditModal
          employee={editTarget}
          onSubmit={handleEdit}
          onCancel={function () { return setEditTarget(null); }}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default EmployeeListPage;