import React, { createContext, useState, useCallback } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage,    setActivePage]    = useState('dashboard');
  const [notification,  setNotification]  = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const navigate = useCallback(page => setActivePage(page), []);

  return (
    <AppContext.Provider value={{ activePage, navigate, notification, showNotification }}>
      {children}
    </AppContext.Provider>
  );
};