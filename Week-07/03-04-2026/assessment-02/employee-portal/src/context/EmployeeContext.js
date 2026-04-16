import React, { createContext, useContext, useState, useCallback } from 'react';

const EmployeeContext = createContext(null);

/* ── Seed Data ── */
var INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'Alexandra Singh',
    email: 'admin@nexcorp.com',
    department: 'Management',
    position: 'HR Administrator',
    phone: '+1 (555) 001-0000',
    joinDate: '2020-01-15',
    salary: 120000,
    status: 'active',
    role: 'admin',
    avatar: 'AS',
    avatarColor: 'avatar-purple',
    username: 'admin',
  },
  {
    id: 2,
    name: 'John Mercer',
    email: 'john@nexcorp.com',
    department: 'Engineering',
    position: 'Senior Developer',
    phone: '+1 (555) 002-0011',
    joinDate: '2021-06-10',
    salary: 95000,
    status: 'active',
    role: 'employee',
    avatar: 'JM',
    avatarColor: 'avatar-teal',
    username: 'john',
  },
  {
    id: 3,
    name: 'Sara Okonkwo',
    email: 'sara@nexcorp.com',
    department: 'Design',
    position: 'UX Designer',
    phone: '+1 (555) 003-0022',
    joinDate: '2022-03-01',
    salary: 88000,
    status: 'active',
    role: 'employee',
    avatar: 'SO',
    avatarColor: 'avatar-pink',
    username: 'sara',
  },
  {
    id: 4,
    name: 'Marcus Rivera',
    email: 'marcus@nexcorp.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    phone: '+1 (555) 004-0033',
    joinDate: '2021-09-20',
    salary: 98000,
    status: 'active',
    role: 'employee',
    avatar: 'MR',
    avatarColor: 'avatar-amber',
    username: 'marcus',
  },
  {
    id: 5,
    name: 'Priya Nair',
    email: 'priya@nexcorp.com',
    department: 'Marketing',
    position: 'Marketing Lead',
    phone: '+1 (555) 005-0044',
    joinDate: '2022-07-11',
    salary: 82000,
    status: 'active',
    role: 'employee',
    avatar: 'PN',
    avatarColor: 'avatar-purple',
    username: 'priya',
  },
  {
    id: 6,
    name: 'Lucas Chen',
    email: 'lucas@nexcorp.com',
    department: 'Finance',
    position: 'Financial Analyst',
    phone: '+1 (555) 006-0055',
    joinDate: '2020-11-30',
    salary: 91000,
    status: 'inactive',
    role: 'employee',
    avatar: 'LC',
    avatarColor: 'avatar-teal',
    username: 'lucas',
  },
  {
    id: 7,
    name: 'Nadia Patel',
    email: 'nadia@nexcorp.com',
    department: 'HR',
    position: 'HR Coordinator',
    phone: '+1 (555) 007-0066',
    joinDate: '2023-02-14',
    salary: 74000,
    status: 'active',
    role: 'employee',
    avatar: 'NP',
    avatarColor: 'avatar-pink',
    username: 'nadia',
  },
];

var AVATAR_COLORS = ['avatar-purple', 'avatar-pink', 'avatar-teal', 'avatar-amber'];

function getInitials(name) {
  var parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function randomColor() {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

export var EmployeeProvider = function ({ children }) {
  var [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  var [isLoading, setIsLoading] = useState(false);
  var [notification, setNotification] = useState(null);

  var showNotification = useCallback(function (message, type) {
    if (!type) type = 'success';
    setNotification({ message: message, type: type });
    setTimeout(function () { setNotification(null); }, 3500);
  }, []);

  /* ── CREATE ── */
  var addEmployee = useCallback(async function (data) {
    setIsLoading(true);
    await new Promise(function (r) { return setTimeout(r, 700); });

    var newEmp = Object.assign({}, data, {
      id: Date.now(),
      avatar: getInitials(data.name),
      avatarColor: randomColor(),
      salary: Number(data.salary),
      joinDate: data.joinDate || new Date().toISOString().split('T')[0],
    });

    setEmployees(function (prev) { return prev.concat([newEmp]); });
    setIsLoading(false);
    showNotification(data.name + ' has been added successfully!', 'success');
    return newEmp;
  }, [showNotification]);

  /* ── UPDATE ── */
  var updateEmployee = useCallback(async function (id, data) {
    setIsLoading(true);
    await new Promise(function (r) { return setTimeout(r, 700); });

    setEmployees(function (prev) {
      return prev.map(function (emp) {
        if (emp.id !== id) return emp;
        return Object.assign({}, emp, data, {
          id: id,
          avatar: getInitials(data.name || emp.name),
          salary: Number(data.salary),
        });
      });
    });

    setIsLoading(false);
    showNotification('Employee record updated successfully!', 'success');
  }, [showNotification]);

  /* ── DELETE ── */
  var deleteEmployee = useCallback(async function (id) {
    setIsLoading(true);
    await new Promise(function (r) { return setTimeout(r, 600); });

    var target = employees.find(function (e) { return e.id === id; });
    setEmployees(function (prev) { return prev.filter(function (e) { return e.id !== id; }); });
    setIsLoading(false);
    showNotification((target ? target.name : 'Employee') + ' has been removed.', 'danger');
  }, [employees, showNotification]);

  /* ── READ (by username) ── */
  var getEmployeeByUsername = useCallback(function (username) {
    return employees.find(function (e) { return e.username === username; }) || null;
  }, [employees]);

  var departments = Array.from(new Set(INITIAL_EMPLOYEES.map(function (e) { return e.department; })));

  return (
    <EmployeeContext.Provider
      value={{
        employees: employees,
        isLoading: isLoading,
        notification: notification,
        addEmployee: addEmployee,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee,
        getEmployeeByUsername: getEmployeeByUsername,
        departments: departments,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export var useEmployees = function () {
  var ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used inside EmployeeProvider');
  return ctx;
};

export default EmployeeContext;