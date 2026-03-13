# 📚 Course Management System (LibraryPro)

A modern **Role-Based Course Management Web Application** developed using  
**ASP.NET Core Web API + SQL Server + HTML, CSS, JavaScript**

This system allows **Admins to manage courses** and **Students to enroll and track courses** through a clean industry-style UI.

---

## 🚀 Features

### 👨‍💼 Admin
- Add new courses
- Update course details
- Delete courses
- View enrollment history
- View dashboard statistics

### 🎓 Student
- View available courses
- Enroll in courses
- Drop enrolled courses
- Track personal enrollment history

---

## 🛠️ Tech Stack

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- SQL Server

### Frontend
- HTML5
- CSS3 (Modern UI)
- Vanilla JavaScript (Fetch API)

### Tools
- Visual Studio
- SQL Server Management Studio
- Swagger
- VS Code Live Server

---

## 📂 Project Structure

```

CourseManagementSystem
│
├── Backend
│   ├── Controllers
│   │   ├── AuthController.cs
│   │   ├── CoursesController.cs
│   │   └── EnrollmentsController.cs
│   │
│   ├── Models
│   │   ├── Course.cs
│   │   ├── Enrollment.cs
│   │   └── User.cs
│   │
│   ├── Data
│   │   └── AppDbContext.cs
│   │
│   ├── Program.cs
│   └── appsettings.json
│
├── Frontend
│   ├── css
│   │   └── styles.css
│   │
│   ├── js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── courses.js
│   │   ├── enrollment.js
│   │   └── history.js
│   │
│   ├── index.html
│   ├── dashboard.html
│   ├── courses.html
│   ├── enrollment.html
│   └── history.html
│
└── README.md

```

---

## 🔐 Login Credentials

### 👨‍💼 Admin Login

```

Email    : [admin@gmail.com](mailto:admin@gmail.com)
Password : admin123
Role     : Admin

```

### 🎓 Student Login

```

Email    : [palak@gmail.com](mailto:palak@gmail.com)
Password : student123
Role     : Student

```

---

## ⚙️ How to Run

### Backend

1. Open solution in **Visual Studio**
2. Restore NuGet packages
3. Configure connection string in `appsettings.json`
4. Run project → Swagger will open

### Database

- Create database in SQL Server
- Insert sample users for login

### Frontend

1. Open **Frontend folder in VS Code**
2. Run with **Live Server**
3. Open `index.html`

---

## 📊 Modules Included

- Role-Based Authentication
- Course CRUD Management
- Enrollment System
- Dashboard Statistics
- Search Functionality
- Modal Based UI

---

## ⭐ Future Enhancements

- JWT Authentication
- Pagination & Sorting
- Charts & Analytics
- Mobile Responsive Design
- Cloud Deployment

---

## 👩‍💻 Author

**Palak Gupta**  
B.Tech ECE  

---
