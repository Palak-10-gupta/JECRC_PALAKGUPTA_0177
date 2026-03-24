# Employee Leave Management System

![.NET](https://img.shields.io/badge/.NET-ASP.NET%20Core-blue)
![Database](https://img.shields.io/badge/Database-SQL%20Server-green)
![Frontend](https://img.shields.io/badge/Frontend-HTML%20CSS%20JS-orange)
![Auth](https://img.shields.io/badge/Auth-JWT-red)
![License](https://img.shields.io/badge/Project-Academic-purple)

---

# 📌 Project Overview

The **Employee Leave Management System** is a full-stack web application that allows employees to apply for leave and managers to approve or reject leave requests.

This project demonstrates the integration of:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** ASP.NET Core Web API
- **Database:** SQL Server
- **Authentication:** JWT (JSON Web Token)
- **Authorization:** Role-Based Access Control

---

# 📝 Assignment Question

### Task: Employee Leave Management System

Build a Leave Management System where employees can apply for leave and managers/admins can approve or reject leave requests.

This project demonstrates:

- Frontend (HTML + CSS + JavaScript)
- Backend (ASP.NET Core Web API)
- Database (SQL Server)
- Authentication (JWT)
- Authorization (Role-Based Access)

---

# 🏢 Real-World Scenario

A company wants a simple leave management portal where:

- Employees submit leave requests.
- Managers review requests.
- Admin manages all employees.

---

# 👥 System Roles

| Role | Permissions |
|-----|-------------|
| Admin | Manage employees |
| Manager | Approve / Reject leave |
| Employee | Apply for leave |

---

# 🗄 Database Tables

## 1️⃣ Users Table

| Column | Type |
|------|------|
| Id | int |
| Username | nvarchar |
| Password | nvarchar |
| Role | nvarchar |

Example Roles:

- Admin
- Manager
- Employee

---

## 2️⃣ LeaveRequests Table

| Column | Type |
|------|------|
| Id | int |
| EmployeeId | int |
| LeaveType | nvarchar |
| StartDate | date |
| EndDate | date |
| Reason | nvarchar |
| Status | nvarchar |

Status Values:

- Pending
- Approved
- Rejected

---

# 🌐 Web API Endpoints

## 🔐 Authentication APIs

### Register User

```
POST /api/auth/register
```

Example Request:

```json
{
 "username":"john",
 "password":"123",
 "role":"Employee"
}
```

---

### Login

```
POST /api/auth/login
```

Response:

```json
{
 "token":"JWT_TOKEN"
}
```

---

# 👤 Employee APIs

### Apply Leave

```
POST /api/leave/apply
```

Body:

```json
{
 "leaveType":"Sick Leave",
 "startDate":"2026-04-01",
 "endDate":"2026-04-02",
 "reason":"Fever"
}
```

---

### View My Leave Requests

```
GET /api/leave/my-leaves
```

---

# 👨‍💼 Manager APIs

### View All Leave Requests

```
GET /api/leave/all
```

---

### Approve Leave

```
PUT /api/leave/approve/{id}
```

---

### Reject Leave

```
PUT /api/leave/reject/{id}
```

---

# 👑 Admin APIs

### Get All Employees

```
GET /api/admin/employees
```

---

### Delete Employee

```
DELETE /api/admin/delete/{id}
```

---

# 💻 Frontend Pages

| Page | Purpose |
|-----|--------|
| Login Page | User authentication |
| Register Page | Create account |
| Dashboard | Role-based dashboard |
| Apply Leave Page | Employee submits leave |
| Leave List Page | View leave requests |
| Manager Panel | Approve / Reject leave |

---

# 🎨 UI Components

Implemented UI components include:

- Login Form
- Register Form
- Leave Request Form
- Leave Requests Table
- Approve / Reject Buttons
- Dashboard Navigation

---

# ⚙ JavaScript Features

| Feature | Concept Used |
|------|-------------|
| Login API Call | Fetch API |
| Store JWT Token | LocalStorage |
| Apply Leave | POST API |
| Load Leave Requests | GET API |
| Approve Leave | PUT API |

Example API call:

```javascript
fetch("https://localhost:5001/api/leave/apply", {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   "Authorization": "Bearer " + localStorage.getItem("token")
 },
 body: JSON.stringify(data)
});
```

---

# 🏗 Project Structure

```
Employee_Leave_Management_System
│
├── LeaveManagementAPI
│   ├── Controllers
│   │   ├── AuthController.cs
│   │   ├── LeaveController.cs
│   │   └── AdminController.cs
│   │
│   ├── Models
│   │   ├── User.cs
│   │   └── LeaveRequest.cs
│   │
│   ├── Data
│   │   └── AppDbContext.cs
│   │
│   ├── Program.cs
│   └── appsettings.json
│
├── LeaveManagementFrontend
│   ├── HTML
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── dashboard.html
│   │   ├── apply-leave.html
│   │   ├── leave-list.html
│   │   └── manager-leaves.html
│   │
│   ├── JavaScript
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── leave.js
│   │   └── manager.js
│   │
│   └── CSS
│       └── style.css
│
└── README.md
```

---

# ⚙ Steps Followed to Implement the Project

### 1️⃣ Backend Setup
- Created **ASP.NET Core Web API**
- Configured **SQL Server database**
- Implemented **Entity Framework Core**

### 2️⃣ Authentication
- Implemented **Register API**
- Implemented **Login API**
- Generated **JWT tokens**
- Configured **JWT authentication middleware**

### 3️⃣ Authorization
Implemented role-based access using:

```
[Authorize(Roles="Employee")]
[Authorize(Roles="Manager")]
```

---

### 4️⃣ Leave Management APIs
Created APIs for:

- Apply Leave
- View My Leaves
- View All Leaves
- Approve Leave
- Reject Leave

---

### 5️⃣ Frontend Development
Built user interface using:

- HTML
- CSS
- JavaScript

Pages created:

- Login
- Register
- Dashboard
- Apply Leave
- Leave List
- Manager Panel

---

### 6️⃣ API Integration
Integrated frontend with backend using **Fetch API**.

Implemented:

- Login API
- Apply Leave API
- Load Leave Requests
- Approve / Reject Leave

---

# 🚀 How to Run the Project

### Run Backend

```
dotnet run
```

Open Swagger:

```
http://localhost:5119/swagger
```

---

### Run Frontend

Open the file:

```
HTML/login.html
```

in your browser.

---

# 🎯 Features Implemented

✔ JWT Authentication  
✔ Role-Based Authorization  
✔ Leave Application System  
✔ Manager Approval Workflow  
✔ RESTful API Integration  
✔ Full Stack Implementation  

---

# 📚 Technologies Used

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- HTML
- CSS
- JavaScript
- JWT Authentication

---

# 👩‍💻 Author

**Palak Gupta**

B.Tech – Electronics & Communication Engineering  
Jaipur Engineering College and Research Centre