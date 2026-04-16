import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import employeeReducer from '../features/employees/employeeSlice';
import uiReducer from '../features/ui/uiSlice';

// Load state from localStorage (state persistence)
const loadState = () => {
  try {
    const serialized = localStorage.getItem('empAppState');
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('empAppState', JSON.stringify({
      auth: state.auth,
      employees: state.employees,
    }));
  } catch { /* ignore */ }
};

// Middleware: redux-logger logs every action to the browser console
const logger = createLogger({
  collapsed: true,
  colors: {
    title: () => '#a78bfa',
    prevState: () => '#60a5fa',
    action: () => '#34d399',
    nextState: () => '#fbbf24',
  },
});

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    ui: uiReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

// Subscribe to store changes and persist to localStorage
store.subscribe(() => saveState(store.getState()));

export default store;