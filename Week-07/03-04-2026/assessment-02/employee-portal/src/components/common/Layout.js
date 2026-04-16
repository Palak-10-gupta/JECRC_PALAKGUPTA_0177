import React from 'react';
import Sidebar from './Sidebar';
import Notification from './Notification';
import { useEmployees } from '../../context/EmployeeContext';

var Layout = function ({ children }) {
  var employeeCtx = useEmployees();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: '2rem 2.5rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          minWidth: 0,
        }}
      >
        <div className="page-enter">
          {children}
        </div>
      </main>

      {/* Toast notification */}
      <Notification notification={employeeCtx.notification} />
    </div>
  );
};

export default Layout;