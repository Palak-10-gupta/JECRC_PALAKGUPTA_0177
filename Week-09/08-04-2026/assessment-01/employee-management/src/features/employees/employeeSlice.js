import { createSlice } from '@reduxjs/toolkit';

/*
  TASK 5 — Reducer Example:
  This slice manages CRUD for employees with clean, readable reducers.
  Each reducer handles one action — easy to test and maintain.
*/

const sampleEmployees = [
  { id: 1, name: 'Priya Sharma',   role: 'Frontend Developer', dept: 'Engineering', salary: 85000,  email: 'priya@company.com',   status: 'Active',    joined: '2021-03-15', avatar: 'PS' },
  { id: 2, name: 'Arjun Mehta',    role: 'Backend Developer',  dept: 'Engineering', salary: 90000,  email: 'arjun@company.com',   status: 'Active',    joined: '2020-07-20', avatar: 'AM' },
  { id: 3, name: 'Neha Kapoor',    role: 'Product Manager',    dept: 'Product',     salary: 110000, email: 'neha@company.com',    status: 'Active',    joined: '2019-11-01', avatar: 'NK' },
  { id: 4, name: 'Rahul Verma',    role: 'UI/UX Designer',     dept: 'Design',      salary: 75000,  email: 'rahul@company.com',   status: 'On Leave',  joined: '2022-01-10', avatar: 'RV' },
  { id: 5, name: 'Sneha Joshi',    role: 'Data Analyst',       dept: 'Analytics',   salary: 80000,  email: 'sneha@company.com',   status: 'Active',    joined: '2021-08-05', avatar: 'SJ' },
  { id: 6, name: 'Karan Singh',    role: 'DevOps Engineer',    dept: 'Engineering', salary: 95000,  email: 'karan@company.com',   status: 'Active',    joined: '2020-02-28', avatar: 'KS' },
];

const initialState = {
  list: sampleEmployees,
  selectedEmployee: null,
  searchQuery: '',
  filterDept: 'All',
  nextId: 7,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.list.push({ ...action.payload, id: state.nextId, avatar: action.payload.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() });
      state.nextId += 1;
    },
    updateEmployee(state, action) {
      const idx = state.list.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload };
    },
    deleteEmployee(state, action) {
      state.list = state.list.filter((e) => e.id !== action.payload);
      if (state.selectedEmployee?.id === action.payload) state.selectedEmployee = null;
    },
    selectEmployee(state, action) {
      state.selectedEmployee = action.payload;
    },
    clearSelection(state) {
      state.selectedEmployee = null;
    },
    setSearch(state, action) {
      state.searchQuery = action.payload;
    },
    setFilterDept(state, action) {
      state.filterDept = action.payload;
    },
  },
});

export const {
  addEmployee, updateEmployee, deleteEmployee,
  selectEmployee, clearSelection, setSearch, setFilterDept,
} = employeeSlice.actions;

export default employeeSlice.reducer;