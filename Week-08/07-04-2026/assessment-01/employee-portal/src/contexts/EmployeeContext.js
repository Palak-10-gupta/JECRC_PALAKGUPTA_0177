import React, { createContext, useState, useCallback, useMemo } from 'react';

export const EmployeeContext = createContext();

const INITIAL = [
  { id: 1, name: 'Priya Sharma',  email: 'priya@portal.com',  department: 'Engineering', role: 'Senior Dev',         status: 'Active',   salary: 95000, joined: '2021-03-15', avatar: '👩‍💻' },
  { id: 2, name: 'Rahul Mehta',   email: 'rahul@portal.com',  department: 'Design',       role: 'UI/UX Lead',         status: 'Active',   salary: 88000, joined: '2020-07-22', avatar: '🎨' },
  { id: 3, name: 'Ananya Patel',  email: 'ananya@portal.com', department: 'Marketing',    role: 'Marketing Manager',  status: 'Active',   salary: 82000, joined: '2019-11-10', avatar: '📊' },
  { id: 4, name: 'Vikram Singh',  email: 'vikram@portal.com', department: 'HR',           role: 'HR Specialist',      status: 'Inactive', salary: 72000, joined: '2022-01-05', avatar: '🤝' },
  { id: 5, name: 'Neha Gupta',   email: 'neha@portal.com',   department: 'Engineering',  role: 'Backend Dev',        status: 'Active',   salary: 91000, joined: '2021-09-18', avatar: '⚙️' },
  { id: 6, name: 'Arjun Kapoor', email: 'arjun@portal.com',  department: 'Sales',        role: 'Sales Executive',    status: 'Active',   salary: 78000, joined: '2023-02-28', avatar: '💼' },
];

let nextId = 7;

export const EmployeeProvider = ({ children }) => {
  const [employees,   setEmployees]   = useState(INITIAL);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept,  setFilterDept]  = useState('All');

  const addEmployee = useCallback(data => {
    setEmployees(prev => [...prev, { ...data, id: nextId++ }]);
  }, []);

  const updateEmployee = useCallback((id, data) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
  }, []);

  const deleteEmployee = useCallback(id => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }, []);

  const departments = useMemo(() => {
    const depts = [...new Set(employees.map(e => e.department))];
    return ['All', ...depts];
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter(e => {
      const matchSearch =
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = filterDept === 'All' || e.department === filterDept;
      return matchSearch && matchDept;
    });
  }, [employees, searchQuery, filterDept]);

  const stats = useMemo(() => ({
    total:      employees.length,
    active:     employees.filter(e => e.status === 'Active').length,
    inactive:   employees.filter(e => e.status === 'Inactive').length,
    avgSalary:  Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length),
    byDept:     employees.reduce((acc, e) => {
      acc[e.department] = (acc[e.department] || 0) + 1;
      return acc;
    }, {}),
  }), [employees]);

  return (
    <EmployeeContext.Provider value={{
      employees, filtered, stats, departments,
      searchQuery, setSearchQuery,
      filterDept,  setFilterDept,
      addEmployee, updateEmployee, deleteEmployee,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};