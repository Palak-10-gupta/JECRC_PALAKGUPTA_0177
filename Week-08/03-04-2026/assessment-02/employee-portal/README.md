# 🚀 NexCorp – Internal Employee Portal System

A modern, role-based Internal Employee Portal built using **React.js** and **Context API**, designed to simulate real-world enterprise applications.

---

## 📌 Overview

NexCorp Employee Portal is a frontend-only system that allows organizations to manage employee data with **role-based access control**.

It solves common corporate issues such as:

* ❌ Unauthorized access to restricted pages
* ❌ Improper logout handling
* ❌ No role-based system
* ❌ Poor UI/UX and validation
* ❌ Difficult-to-scale code structure

---

## ✨ Features

### 🔐 Authentication System

* Secure login/logout functionality
* Session-based authentication using Context API

### 🛡️ Role-Based Access Control

* **Admin**

  * Full access to employee management
  * Can Create, Read, Update, Delete employees
* **Employee**

  * Can only view their own profile
  * Restricted from admin operations

### 🔄 Employee Management (CRUD)

* ➕ Add new employees
* 📋 View employee list
* ✏️ Edit employee details
* ❌ Delete employee records

### 🔒 Protected Routes

* Unauthorized users are redirected to login
* Role-based route protection implemented

### 🎨 Modern UI/UX

* Beautiful dark-themed professional interface
* Responsive layout with sidebar navigation
* Smooth user experience with clean design

### ⚡ Enhanced User Experience

* Form validation
* Alerts and notifications
* Structured layout for scalability

---

## 🏗️ Project Structure

```
src/
│
├── components/
│   ├── admin/
│   │   ├── ConfirmModal.js
│   │   ├── EditModal.js
│   │   ├── EmployeeForm.js
│   │
│   ├── common/
│   │   ├── Layout.js
│   │   ├── Notification.js
│   │   ├── ProtectedRoute.js
│   │   ├── Sidebar.js
│
├── context/
│   ├── AuthContext.js
│   ├── EmployeeContext.js
│
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── EmployeeListPage.js
│   ├── AddEmployeePage.js
│   ├── MyProfilePage.js
│
├── styles/
│   ├── global.css
│   ├── App.css
│
├── App.js
```

---

## ⚙️ Tech Stack

* ⚛️ React.js
* 🌐 React Router DOM
* 🧠 Context API (State Management)
* 🎨 CSS (Custom Styling)

---

## 🔑 Demo Credentials

| Role     | Username | Password |
| -------- | -------- | -------- |
| Admin    | admin    | admin123 |
| Employee | john     | john123  |

---

## 🧠 Core Concepts Used

* Context API for global state management
* Role-based routing
* Conditional rendering
* Controlled forms
* Component-based architecture

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd employee-portal
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm start
```

---

## 🎯 Assessment Objectives Covered

✔ Authentication system
✔ Role-based access control
✔ Protected routes
✔ Full CRUD using Context API
✔ Admin-only access for CRUD
✔ Edit/Update functionality
✔ Employee-specific data view
✔ Improved UI with validation & alerts

---

## 👩‍💻 Developed By

**Palak Gupta**

---

## 💡 Conclusion

This project demonstrates a **scalable, maintainable, and production-ready frontend architecture** using React best practices, making it suitable for real-world enterprise applications.
