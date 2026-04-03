import React from 'react';

var ICONS = {
  success: '✓',
  danger:  '✕',
  warning: '!',
  info:    'i',
};

var BG = {
  success: 'rgba(0,214,143,0.15)',
  danger:  'rgba(255,71,87,0.15)',
  warning: 'rgba(255,184,0,0.15)',
  info:    'rgba(108,63,255,0.15)',
};

var COL = {
  success: '#00D68F',
  danger:  '#FF4757',
  warning: '#FFB800',
  info:    '#a78bfa',
};

var Notification = function ({ notification }) {
  if (!notification) return null;

  var type = notification.type || 'info';
  var icon = ICONS[type] || 'i';
  var bg   = BG[type]   || BG.info;
  var col  = COL[type]  || COL.info;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.75rem',
        right: '1.75rem',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '400px',
        animation: 'alertSlide 0.35s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0.9rem 1.1rem',
          background: 'var(--bg-card)',
          border: '1px solid ' + col + '44',
          borderLeft: '3px solid ' + col,
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
          color: col,
          fontSize: '0.88rem',
        }}
      >
        {/* Icon circle */}
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: bg,
            fontWeight: '700',
            fontSize: '0.72rem',
            flexShrink: 0,
            color: col,
          }}
        >
          {icon}
        </span>

        {/* Message */}
        <span style={{ color: 'var(--text-primary)', flex: 1, lineHeight: 1.4 }}>
          {notification.message}
        </span>
      </div>
    </div>
  );
};

export default Notification;