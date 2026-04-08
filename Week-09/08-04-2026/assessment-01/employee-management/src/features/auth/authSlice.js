import { createSlice } from '@reduxjs/toolkit';

/*
  Role-based access control:
  - Admin    → full CRUD (add, edit, delete, view all)
  - HR Manager → read + edit only (no add, no delete)
*/

const DEMO_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'Admin',
    avatar: 'AD',
    permissions: {
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canViewSalary: true,
      canViewAnalytics: true,
    },
  },
  {
    id: 2,
    username: 'hr',
    password: 'hr123',
    role: 'HR Manager',
    avatar: 'HR',
    permissions: {
      canAdd: false,
      canEdit: true,
      canDelete: false,
      canViewSalary: false,
      canViewAnalytics: false,
    },
  },
];

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;
      const found = DEMO_USERS.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        state.user = {
          id: found.id,
          username: found.username,
          role: found.role,
          avatar: found.avatar,
          permissions: found.permissions,
        };
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid username or password.';
      }
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;