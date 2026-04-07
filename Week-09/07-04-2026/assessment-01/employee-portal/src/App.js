import React from 'react';
import { ThemeProvider }   from './contexts/ThemeContext';
import { AuthProvider }    from './contexts/AuthContext';
import { EmployeeProvider} from './contexts/EmployeeContext';
import { AppProvider }     from './contexts/AppContext';
import useAuth  from './hooks/useAuth';
import useApp   from './hooks/useApp';
import useTheme from './hooks/useTheme';

import LoginPage    from './components/Auth/LoginPage';
import Sidebar      from './components/Layout/Sidebar';
import Navbar       from './components/Layout/Navbar';
import Dashboard    from './components/Dashboard/Dashboard';
import EmployeeList from './components/Employees/EmployeeList';
import Analytics    from './components/Analytics/Analytics';
import Settings     from './components/Settings/Settings';

const PageRenderer = () => {
  const { activePage } = useApp();
  switch (activePage) {
    case 'dashboard':  return <Dashboard />;
    case 'employees':  return <EmployeeList />;
    case 'analytics':  return <Analytics />;
    case 'settings':   return <Settings />;
    default:           return <Dashboard />;
  }
};

const AppShell = () => {
  const { isAuthenticated } = useAuth();
  const { theme }           = useTheme();

  if (!isAuthenticated) return <LoginPage />;

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-content" style={{ flex:1, display:'flex', flexDirection:'column', minHeight:'100vh' }}>
        <Navbar />
        <div style={{ flex:1, overflowY:'auto' }}>
          <PageRenderer />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <EmployeeProvider>
        <AppProvider>
          <AppShell />
        </AppProvider>
      </EmployeeProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;