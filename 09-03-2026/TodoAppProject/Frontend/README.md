# 📝 Todo Task Manager (Full Stack Web Application)

A **Full Stack Todo Application** that allows users to manage daily tasks efficiently.  
Users can **add, edit, delete, search, and mark tasks as completed**. Tasks are stored in a **SQL Server database** and managed through an **ASP.NET Core Web API**, while the frontend is built using **HTML, CSS, and JavaScript**.

---

# 🚀 Features

## Core Features
- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Persistent storage using SQL Server
- RESTful API using ASP.NET Core

## Bonus Features
- 🔍 Search tasks
- ✏️ Edit tasks
- 📊 Filter tasks (All / Active / Completed)
- 🌙 Dark mode
- ⚡ Task priority (Low / Medium / High)
- ✔ Checkbox to mark tasks completed
- 🎨 Professional responsive UI

---

# 🏗 System Architecture

```
User Browser
      ↓
HTML + CSS + JavaScript (Frontend)
      ↓
Fetch API (HTTP Requests)
      ↓
ASP.NET Core Web API
      ↓
Entity Framework Core
      ↓
SQL Server Database
```

---

# 🛠 Technologies Used

## Frontend
- HTML
- CSS
- JavaScript
- Font Awesome Icons

## Backend
- ASP.NET Core Web API
- C#

## Database
- SQL Server
- Entity Framework Core

## Tools
- Visual Studio Code
- SQL Server Management Studio (SSMS)
- Git & GitHub

---

# 📂 Project Structure

```
ToDoProject
│
├── TodoAPI
│   ├── Controllers
│   ├── Models
│   ├── Data
│   ├── Program.cs
│   └── appsettings.json
│
├── Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
```

---

## 2️⃣ Open the Project

Open the project folder in **Visual Studio Code**.

---

## 3️⃣ Setup Database

Open **SQL Server Management Studio (SSMS)** and run:

```sql
CREATE DATABASE TodoDB;
```

---

## 4️⃣ Configure Connection String

Update `appsettings.json` inside **TodoAPI**:

```json
"ConnectionStrings": {
 "DefaultConnection": "Server=localhost;Database=TodoDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

## 5️⃣ Run Entity Framework Migration

Inside the **TodoAPI folder** run:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 6️⃣ Run the Backend API

```bash
dotnet run
```

Swagger will open at something like:

```
https://localhost:5174/swagger
```

---

## 7️⃣ Run the Frontend

Open:

```
Frontend/index.html
```

using **Live Server** in VS Code.

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/todo | Get all tasks |
| POST | /api/todo | Add new task |
| PUT | /api/todo/{id} | Update task |
| DELETE | /api/todo/{id} | Delete task |

---

# 📸 Application Preview

Features include:

- Task creation with priority
- Filtering active and completed tasks
- Searching tasks instantly
- Dark mode support
- Clean modern UI

---

# 🎯 Learning Objectives

This project demonstrates:

- Building RESTful APIs
- Connecting frontend with backend
- CRUD operations
- Entity Framework Core usage
- SQL Server integration
- DOM manipulation using JavaScript

---

# 👩‍💻 Author

**Palak Gupta**  
B.Tech Electronics & Communication Engineering  
Jaipur Engineering College and Research Centre

---

# ⭐ If you like this project

Give it a ⭐ on GitHub!