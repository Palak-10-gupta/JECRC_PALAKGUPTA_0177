import React, { useState, useEffect } from 'react';

var DEPARTMENTS = [
  'Engineering', 'Design', 'Marketing', 'Finance',
  'Management', 'Operations', 'HR', 'Sales',
];

var POSITIONS = {
  Engineering: ['Junior Developer', 'Senior Developer', 'Tech Lead', 'DevOps Engineer', 'QA Engineer'],
  Design:      ['UI Designer', 'UX Designer', 'Graphic Designer', 'Product Designer'],
  Marketing:   ['Marketing Lead', 'Content Writer', 'SEO Specialist', 'Brand Manager'],
  Finance:     ['Financial Analyst', 'Accountant', 'CFO', 'Budget Manager'],
  Management:  ['HR Administrator', 'Project Manager', 'CEO', 'COO'],
  Operations:  ['Operations Manager', 'Logistics Coordinator', 'Process Analyst'],
  HR:          ['HR Manager', 'Recruiter', 'HR Coordinator'],
  Sales:       ['Sales Manager', 'Account Executive', 'Sales Rep', 'Business Developer'],
};

/* ── Validation ── */
function validateForm(data) {
  var errors = {};

  if (!data.name || !data.name.trim())
    errors.name = 'Full name is required';
  else if (data.name.trim().length < 3)
    errors.name = 'Name must be at least 3 characters';

  if (!data.email || !data.email.trim())
    errors.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address';

  if (!data.phone || !data.phone.trim())
    errors.phone = 'Phone number is required';
  else if (!/^\+?[\d\s\-().]{7,20}$/.test(data.phone))
    errors.phone = 'Enter a valid phone number';

  if (!data.department)
    errors.department = 'Department is required';

  if (!data.position || !data.position.trim())
    errors.position = 'Position is required';

  if (!data.joinDate)
    errors.joinDate = 'Join date is required';

  if (!data.salary)
    errors.salary = 'Salary is required';
  else if (isNaN(Number(data.salary)) || Number(data.salary) <= 0)
    errors.salary = 'Enter a valid positive salary';

  return errors;
}

/* ── Field wrapper ── */
var Field = function ({ name, label, touched, errors, children }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
      {touched[name] && errors[name] && (
        <span className="form-error">⚠ {errors[name]}</span>
      )}
    </div>
  );
};

/* ── Main EmployeeForm ── */
var EmployeeForm = function ({ initial, onSubmit, onCancel, isLoading, submitLabel }) {
  var defaultForm = {
    name: '', email: '', phone: '', department: '', position: '',
    joinDate: '', salary: '', status: 'active', role: 'employee', username: '',
  };

  var [form, setForm]       = useState(Object.assign({}, defaultForm, initial || {}));
  var [errors, setErrors]   = useState({});
  var [touched, setTouched] = useState({});

  useEffect(function () {
    if (initial && Object.keys(initial).length > 0) {
      setForm(function (prev) { return Object.assign({}, prev, initial); });
    }
  }, []);

  var positions = form.department ? (POSITIONS[form.department] || []) : [];

  function handleChange(field, value) {
    var updated = Object.assign({}, form, { [field]: value });
    if (field === 'department') updated.position = '';
    setForm(updated);
    if (touched[field]) {
      var errs = validateForm(updated);
      setErrors(function (prev) {
        return Object.assign({}, prev, { [field]: errs[field] });
      });
    }
  }

  function handleBlur(field) {
    setTouched(function (prev) { return Object.assign({}, prev, { [field]: true }); });
    var errs = validateForm(form);
    setErrors(function (prev) {
      return Object.assign({}, prev, { [field]: errs[field] });
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var keys = Object.keys(form);
    var allTouched = {};
    keys.forEach(function (k) { allTouched[k] = true; });
    setTouched(allTouched);

    var errs = validateForm(form);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0 1.2rem',
        }}
      >
        {/* Name */}
        <Field name="name" label="Full Name" touched={touched} errors={errors}>
          <input
            type="text"
            className={'form-input' + (touched.name && errors.name ? ' error' : '')}
            placeholder="e.g. Jane Doe"
            value={form.name}
            onChange={function (e) { return handleChange('name', e.target.value); }}
            onBlur={function () { return handleBlur('name'); }}
          />
        </Field>

        {/* Email */}
        <Field name="email" label="Email Address" touched={touched} errors={errors}>
          <input
            type="email"
            className={'form-input' + (touched.email && errors.email ? ' error' : '')}
            placeholder="name@nexcorp.com"
            value={form.email}
            onChange={function (e) { return handleChange('email', e.target.value); }}
            onBlur={function () { return handleBlur('email'); }}
          />
        </Field>

        {/* Phone */}
        <Field name="phone" label="Phone Number" touched={touched} errors={errors}>
          <input
            type="text"
            className={'form-input' + (touched.phone && errors.phone ? ' error' : '')}
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={function (e) { return handleChange('phone', e.target.value); }}
            onBlur={function () { return handleBlur('phone'); }}
          />
        </Field>

        {/* Join Date */}
        <Field name="joinDate" label="Join Date" touched={touched} errors={errors}>
          <input
            type="date"
            className={'form-input' + (touched.joinDate && errors.joinDate ? ' error' : '')}
            value={form.joinDate}
            onChange={function (e) { return handleChange('joinDate', e.target.value); }}
            onBlur={function () { return handleBlur('joinDate'); }}
            style={{ colorScheme: 'dark' }}
          />
        </Field>

        {/* Department */}
        <Field name="department" label="Department" touched={touched} errors={errors}>
          <select
            className={'form-select' + (touched.department && errors.department ? ' error' : '')}
            value={form.department}
            onChange={function (e) { return handleChange('department', e.target.value); }}
            onBlur={function () { return handleBlur('department'); }}
          >
            <option value="">Select department...</option>
            {DEPARTMENTS.map(function (d) {
              return <option key={d} value={d}>{d}</option>;
            })}
          </select>
        </Field>

        {/* Position */}
        <Field name="position" label="Position / Title" touched={touched} errors={errors}>
          {positions.length > 0 ? (
            <select
              className={'form-select' + (touched.position && errors.position ? ' error' : '')}
              value={form.position}
              onChange={function (e) { return handleChange('position', e.target.value); }}
              onBlur={function () { return handleBlur('position'); }}
            >
              <option value="">Select position...</option>
              {positions.map(function (p) {
                return <option key={p} value={p}>{p}</option>;
              })}
            </select>
          ) : (
            <input
              type="text"
              className={'form-input' + (touched.position && errors.position ? ' error' : '')}
              placeholder="Enter position title"
              value={form.position}
              onChange={function (e) { return handleChange('position', e.target.value); }}
              onBlur={function () { return handleBlur('position'); }}
            />
          )}
        </Field>

        {/* Salary */}
        <Field name="salary" label="Annual Salary (USD)" touched={touched} errors={errors}>
          <input
            type="number"
            className={'form-input' + (touched.salary && errors.salary ? ' error' : '')}
            placeholder="e.g. 75000"
            value={form.salary}
            onChange={function (e) { return handleChange('salary', e.target.value); }}
            onBlur={function () { return handleBlur('salary'); }}
            min="0"
          />
        </Field>

        {/* Username */}
        <Field name="username" label="Username (optional)" touched={touched} errors={errors}>
          <input
            type="text"
            className="form-input"
            placeholder="Portal login username"
            value={form.username}
            onChange={function (e) { return handleChange('username', e.target.value); }}
          />
        </Field>

        {/* Status */}
        <Field name="status" label="Employment Status" touched={touched} errors={errors}>
          <select
            className="form-select"
            value={form.status}
            onChange={function (e) { return handleChange('status', e.target.value); }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </Field>

        {/* Role */}
        <Field name="role" label="Portal Role" touched={touched} errors={errors}>
          <select
            className="form-select"
            value={form.role}
            onChange={function (e) { return handleChange('role', e.target.value); }}
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'flex-end',
          marginTop: '1rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading
            ? <><span className="spinner" /><span>Saving...</span></>
            : (submitLabel || 'Save Employee')
          }
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;