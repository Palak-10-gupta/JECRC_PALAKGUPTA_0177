# 🚀 Employee Management System (Full Stack + Docker)

A complete full-stack Employee Management System built using:

- ASP.NET Core Web API (Backend)
- ASP.NET MVC (Frontend)
- SQL Server (Database)
- Docker & Docker Compose (Containerization)

---

# 📌 Project Overview

This project allows users to:

✔ View employees  
✔ Add new employees  
✔ Edit employee details  
✔ Delete employees  

The system is fully containerized using Docker, enabling easy deployment and scalability.

---

# 🧱 Project Structure


```text
EmployeeManagementSystem
│
├── backend
│   └── EMS.InMemoryAPI
│       ├── Controllers
│       │   └── EmployeesController.cs
│       │
│       ├── Models
│       │   ├── Employee.cs
│       │   └── AppDbContext.cs
│       │
│       ├── Repositories
│       │
│       ├── Migrations
│       │
│       ├── Program.cs
│       ├── appsettings.json
│       └── Dockerfile
│
├── frontend
│   └── EMPS-mvcApplication
│       ├── Controllers
│       │   └── HomeController.cs
│       │
│       ├── Models
│       │   └── Employee.cs
│       │
│       ├── Services
│       │   └── ApiService.cs
│       │
│       ├── Views
│       │   ├── Home
│       │   │   ├── Index.cshtml
│       │   │   ├── Create.cshtml
│       │   │   └── Edit.cshtml
│       │   │
│       │   └── Shared
│       │       ├── _Layout.cshtml
│       │       ├── _ViewImports.cshtml
│       │       └── _ViewStart.cshtml
│       │
│       ├── Program.cs
│       ├── appsettings.json
│       └── Dockerfile
│
└── docker-compose.yml
```

---

# ⚙️ Technologies Used

| Layer | Technology |
|------|----------|
| Frontend | ASP.NET MVC |
| Backend | ASP.NET Core Web API |
| Database | SQL Server |
| ORM | Entity Framework Core |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

# 🛠️ Step-by-Step Implementation

## 1️⃣ Backend Development (ASP.NET Core Web API)

- Created Web API project
- Added Model: `Employee`
- Created `AppDbContext` using EF Core
- Implemented CRUD APIs in `EmployeesController`
- Configured SQL Server connection in `appsettings.json`

### 🔹 Install EF Core packages


dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools


### 🔹 Run migrations


dotnet ef migrations add InitialCreate
dotnet ef database update


---

## 2️⃣ Frontend Development (ASP.NET MVC)

- Created MVC project
- Created views:
  - Index → List Employees
  - Create → Add Employee
  - Edit → Update Employee
- Created `ApiService` for API communication
- Used Bootstrap for UI styling

---

## 3️⃣ Database Integration

- Used SQL Server container
- Connected using EF Core
- Created Employees table using migrations

---

## 4️⃣ Dockerization

### 🔹 Backend Dockerfile


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "EMS.InMemoryAPI.dll"]


---

### 🔹 Frontend Dockerfile


FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
ENTRYPOINT ["dotnet", "EMPS-mvcApplication.dll"]


---

### 🔹 Docker Compose


services:

backend:
build: ./backend/EMS.InMemoryAPI
ports:
- "5000:80"
depends_on:
- db

frontend:
build: ./frontend/EMPS-mvcApplication
ports:
- "3000:80"
depends_on:
- backend

db:
image: mcr.microsoft.com/mssql/server:2022-latest
environment:
SA_PASSWORD: "Strong@1234"
ACCEPT_EULA: "Y"
ports:
- "1433:1433"


---

# 🧠 Important Concept (Docker Networking)

Inside Docker:


Frontend → Backend communication uses:
http://backend/api/employees


NOT:


http://localhost
 ❌


---

# 🚀 How to Run the Project

## Step 1: Go to root folder


cd EmployeeManagementSystem


## Step 2: Stop old containers


docker-compose down


## Step 3: Build and run


docker-compose build --no-cache
docker-compose up


---

# 🌐 Access URLs

| Service | URL |
|--------|-----|
| Frontend | http://localhost:3000 |
| Backend Swagger | http://localhost:5000/swagger |

---

# 📦 Docker Containers

After running:

- db-1 → SQL Server
- backend-1 → API
- frontend-1 → MVC UI

---

# 🎯 Features

✔ Full CRUD operations  
✔ Clean UI with Bootstrap  
✔ API integration  
✔ Docker-based deployment  
✔ Multi-container architecture  

---

# ⚠️ Issues Faced & Solutions

### ❌ Port already in use (1433)
✔ Stop existing SQL container

---

### ❌ API not working in Docker
✔ Use:


http://backend/api/employees


---

### ❌ Dockerfile not detected
✔ Rename:


Dockerfile.txt → Dockerfile


---

### ❌ UI not updating
✔ Rebuild:


docker-compose build --no-cache
docker-compose up


---

# 🏁 Final Outcome

✔ Fully working full-stack application  
✔ Dockerized deployment  
✔ Production-ready structure  
