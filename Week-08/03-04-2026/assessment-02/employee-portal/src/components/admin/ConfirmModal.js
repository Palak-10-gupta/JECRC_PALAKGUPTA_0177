import React from 'react';

var ConfirmModal = function ({ employee, onConfirm, onCancel, isLoading }) {
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
        style={{ maxWidth: '400px' }}
        onClick={handleBoxClick}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title" style={{ color: 'var(--brand-danger)' }}>
            Confirm Deletion
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

        {/* Body */}
        <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.6rem' }}>
          {/* Warning icon */}
          <div
            style={{
              width: '68px',
              height: '68px',
              background: 'rgba(255,71,87,0.12)',
              border: '2px solid rgba(255,71,87,0.28)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.25rem',
            }}
          >
            🗑
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: '700',
              marginBottom: '0.6rem',
            }}
          >
            Remove {employee.name}?
          </h3>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.87rem',
              lineHeight: '1.65',
              maxWidth: '280px',
              margin: '0 auto',
            }}
          >
            This will permanently delete the employee record for{' '}
            <strong style={{ color: 'var(--text-primary)' }}>
              {employee.name}
            </strong>{' '}
            ({employee.position}, {employee.department}). This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={function () { return onConfirm(employee.id); }}
            disabled={isLoading}
          >
            {isLoading
              ? <><span className="spinner" /><span>Deleting...</span></>
              : 'Yes, Delete'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;