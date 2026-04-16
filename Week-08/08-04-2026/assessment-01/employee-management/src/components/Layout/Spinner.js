import React from 'react';

export default function Spinner() {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9998,
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        width: 54, height: 54, borderRadius: '50%',
        border: '4px solid #ede9fe',
        borderTopColor: '#a78bfa',
        animation: 'spin 0.8s linear infinite',
      }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}