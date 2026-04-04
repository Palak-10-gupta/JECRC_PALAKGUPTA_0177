// src/components/common/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Toast from './Toast';

var Layout = function ({ children }) {
  return (
    <div className="app-root">
      <div className="bg-grid" />
      <div className="bg-glow-1" />
      <div className="bg-glow-2" />
      <Sidebar />
      <main className="main-content">
        <div className="page-enter">{children}</div>
      </main>
      <Toast />
    </div>
  );
};

export default Layout;