import React from 'react';
import EmployeeForm from './EmployeeForm';

var EditModal = function ({ employee, onSubmit, onCancel, isLoading }) {
  if (!employee) return null;

  function handleOverlayClick() {
    if (!isLoading) onCancel();
  }

  function handleBoxClick(e) {
    e.stopPropagation();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-box"
        style={{ maxWidth: '700px' }}
        onClick={handleBoxClick}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className={'avatar avatar-sm ' + employee.avatarColor}>
              {employee.avatar}
            </div>
            <div className="modal-title">
              Edit — {employee.name}
            </div>
          </div>
          <button
            className="btn-icon"
            onClick={onCancel}
            disabled={isLoading}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Body with form */}
        <div className="modal-body">
          <EmployeeForm
            initial={employee}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
            submitLabel="Update Employee"
          />
        </div>
      </div>
    </div>
  );
};

export default EditModal;