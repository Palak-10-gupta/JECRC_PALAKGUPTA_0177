// src/components/common/Toast.js
import React from 'react';
import { useApp } from '../../Context/AppContext';

var ICONS = { success: '✓', danger: '✕', info: '⚡', warning: '!' };
var COLORS = { success: 'var(--emerald)', danger: 'var(--rose)', info: 'var(--orange)', warning: 'var(--gold)' };

var Toast = function () {
  var app = useApp();

  if (!app.toasts.length) return null;

  return (
    <div className="toast-container">
      {app.toasts.map(function (toast) {
        var color = COLORS[toast.type] || COLORS.info;
        return (
          <div key={toast.id} className={'toast toast-' + toast.type}>
            <span style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: color + '22', border: '1px solid ' + color + '44',
              color: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.72rem', fontWeight: '700', flexShrink: 0,
            }}>
              {ICONS[toast.type] || '⚡'}
            </span>
            <span style={{ color: 'var(--text-1)', flex: 1, fontSize: '0.87rem', lineHeight: 1.4 }}>
              {toast.message}
            </span>
            <button onClick={function () { return app.removeToast(toast.id); }} style={{
              background: 'none', border: 'none', color: 'var(--text-3)',
              cursor: 'pointer', fontSize: '0.9rem', padding: '2px', lineHeight: 1,
            }}>✕</button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;