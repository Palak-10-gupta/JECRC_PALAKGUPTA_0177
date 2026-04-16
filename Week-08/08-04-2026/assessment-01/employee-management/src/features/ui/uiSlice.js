import { createSlice } from '@reduxjs/toolkit';

// Global UI state: theme, loading spinner, notifications
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'light',
    loading: false,
    notification: null, // { message, type: 'success'|'error'|'info' }
    sidebarOpen: true,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { toggleTheme, setLoading, showNotification, clearNotification, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;