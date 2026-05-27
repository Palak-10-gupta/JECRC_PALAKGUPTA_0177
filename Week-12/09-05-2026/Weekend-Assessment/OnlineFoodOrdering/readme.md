<div align="center">

# 🔥 FoodRush — Online Food Ordering System

**A full-stack, production-grade food delivery web application built with .NET 8**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=azure-devops)](https://dev.azure.com)
[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC2927?style=for-the-badge&logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://docker.com)
[![Azure DevOps](https://img.shields.io/badge/Azure_DevOps-CI%2FCD-0078D7?style=for-the-badge&logo=azure-devops)](https://dev.azure.com)

---

*Customers browse food · Add to cart · Place orders · Admins manage everything · Deployed with Docker & CI/CD*

</div>

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Functional Modules](#-functional-modules)
- [Project Structure](#-project-structure)
- [Getting Started — Local Setup](#-getting-started--local-setup)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Docker Deployment](#-docker-deployment)
- [Azure DevOps CI/CD](#-azure-devops-cicd)
- [Screenshots](#-screenshots)
- [API Documentation](#-api-documentation)
- [Default Credentials](#-default-credentials)

---

## 🍔 Project Overview

**FoodRush** is a real-world food delivery platform simulation that replicates the complete workflow of a modern food ordering system. The platform provides:

- A **customer-facing storefront** to browse menus, search food items, manage a cart, and place orders
- A full **admin panel** to manage food items, categories, and track/update orders in real time
- A **RESTful Web API** exposing all core data operations with Swagger documentation
- **Containerized deployment** using Docker with SQL Server, Web, and API services
- **Automated CI/CD pipeline** via Azure DevOps that builds, tests, and packages the application on every push

---

## 🛠 Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (custom dark theme), Bootstrap Icons, Vanilla JavaScript |
| **Backend** | ASP.NET Core MVC (.NET 8) |
| **Web API** | ASP.NET Core Web API (.NET 8) + Swagger/OpenAPI |
| **Database** | SQL Server 2022 |
| **ORM** | Entity Framework Core 8 |
| **Authentication** | ASP.NET Core Identity (Roles: Admin, Customer) |
| **Session / Cart** | ASP.NET Core Session + Newtonsoft.Json |
| **Invoice Generation** | iTextSharp 5.5.13 |
| **Version Control** | Git + Azure Repos |
| **DevOps** | Azure DevOps Services (Pipelines, Repos, Boards) |
| **Containerization** | Docker + Docker Compose |
| **Fonts** | Playfair Display, DM Sans (Google Fonts) |

---

## 📦 Functional Modules

### Module 1 — User Authentication
| Feature | Status |
|---|---|
| Register new account | ✅ |
| Login with email & password | ✅ |
| Logout | ✅ |
| Forgot Password (demo) | ✅ |
| Role-based access (Admin / Customer) | ✅ |

### Module 2 — Food Management (Admin Only)
| Feature | Status |
|---|---|
| Add food item with image upload | ✅ |
| Update food item details | ✅ |
| Delete food item | ✅ |
| Upload & display food images | ✅ |
| Manage categories (Add / Edit / Delete) | ✅ |
| Mark items as Featured | ✅ |

### Module 3 — Customer Module
| Feature | Status |
|---|---|
| Browse all food items | ✅ |
| Filter by category | ✅ |
| Search food by name or description | ✅ |
| Add items to cart (session-based) | ✅ |
| Update quantity in cart | ✅ |
| Remove items from cart | ✅ |
| Checkout with delivery details | ✅ |

### Module 4 — Order Management
| Feature | Status |
|---|---|
| Place order | ✅ |
| View order history (customer) | ✅ |
| View all orders (admin) | ✅ |
| Update order status (admin) | ✅ |
| Generate PDF invoice (iTextSharp) | ✅ |

---

## 🗂 Project Structure

```
OnlineFoodOrdering/
│
├── src/
│   │
│   ├── FoodOrdering.Core/                    ← Domain Models & Interfaces
│   │   ├── Models/
│   │   │   ├── ApplicationUser.cs            ← Extends IdentityUser
│   │   │   ├── Category.cs                   ← Food categories
│   │   │   ├── FoodItem.cs                   ← Menu items
│   │   │   ├── CartItem.cs                   ← Session cart model
│   │   │   ├── Order.cs                      ← Order with OrderStatus enum
│   │   │   └── OrderItem.cs                  ← Line items per order
│   │   └── Interfaces/
│   │       ├── IFoodItemRepository.cs
│   │       ├── ICategoryRepository.cs
│   │       └── IOrderRepository.cs
│   │
│   ├── FoodOrdering.Infrastructure/          ← Data Access Layer
│   │   ├── Data/
│   │   │   └── ApplicationDbContext.cs       ← EF Core + Identity DbContext
│   │   ├── Repositories/
│   │   │   ├── FoodItemRepository.cs
│   │   │   ├── CategoryRepository.cs
│   │   │   └── OrderRepository.cs
│   │   └── Migrations/                       ← Auto-generated EF migrations
│   │
│   ├── FoodOrdering.Web/                     ← ASP.NET Core MVC (Main App)
│   │   ├── Controllers/
│   │   │   ├── HomeController.cs             ← Landing page + featured items
│   │   │   ├── AccountController.cs          ← Register, Login, Logout
│   │   │   ├── FoodController.cs             ← Browse + search menu
│   │   │   ├── CartController.cs             ← Cart operations (session)
│   │   │   ├── OrderController.cs            ← Checkout, history, invoice
│   │   │   └── AdminController.cs            ← Admin dashboard (Authorize Admin)
│   │   ├── Views/
│   │   │   ├── Shared/
│   │   │   │   ├── _Layout.cshtml            ← Main layout with sticky navbar
│   │   │   │   └── _AdminSidebar.cshtml      ← Admin panel sidebar partial
│   │   │   ├── Home/
│   │   │   │   └── Index.cshtml              ← Hero section + featured dishes
│   │   │   ├── Account/
│   │   │   │   ├── Login.cshtml
│   │   │   │   ├── Register.cshtml
│   │   │   │   └── ForgotPassword.cshtml
│   │   │   ├── Food/
│   │   │   │   └── Index.cshtml              ← Menu grid with search + filter
│   │   │   ├── Cart/
│   │   │   │   └── Index.cshtml              ← Cart table with qty controls
│   │   │   ├── Order/
│   │   │   │   ├── Checkout.cshtml
│   │   │   │   ├── OrderConfirmation.cshtml
│   │   │   │   └── History.cshtml
│   │   │   └── Admin/
│   │   │       ├── Dashboard.cshtml          ← Stats cards + quick actions
│   │   │       ├── FoodItems.cshtml          ← Data table of all food
│   │   │       ├── CreateFood.cshtml
│   │   │       ├── EditFood.cshtml
│   │   │       ├── Categories.cshtml
│   │   │       ├── CreateCategory.cshtml
│   │   │       ├── EditCategory.cshtml
│   │   │       ├── Orders.cshtml             ← All orders + status update
│   │   │       └── OrderDetails.cshtml
│   │   ├── Data/
│   │   │   └── SeedData.cs                   ← Seeds roles + admin user
│   │   ├── wwwroot/
│   │   │   ├── css/
│   │   │   │   └── site.css                  ← Full custom dark theme CSS
│   │   │   ├── js/
│   │   │   │   └── site.js
│   │   │   └── uploads/
│   │   │       └── foods/                    ← Uploaded food images stored here
│   │   ├── appsettings.json
│   │   └── Program.cs                        ← DI, Identity, Session, Middleware
│   │
│   └── FoodOrdering.API/                     ← ASP.NET Core Web API
│       ├── Controllers/
│       │   ├── FoodItemsController.cs        ← CRUD endpoints for food
│       │   └── OrdersController.cs           ← Order endpoints
│       ├── appsettings.json
│       └── Program.cs                        ← Swagger, DI, API setup
│
├── Dockerfile                                ← Web app Docker image (multi-stage)
├── Dockerfile.api                            ← API Docker image (multi-stage)
├── docker-compose.yml                        ← 3-service compose (SQL+Web+API)
├── .dockerignore
├── .gitignore
├── azure-pipelines.yml                       ← CI/CD pipeline definition
├── README.md
└── OnlineFoodOrdering.sln
```

---

## 🚀 Getting Started — Local Setup

### Prerequisites

Make sure the following are installed on your machine:

| Tool | Version | Download |
|---|---|---|
| Visual Studio 2022 | Community+ | [visualstudio.microsoft.com](https://visualstudio.microsoft.com) |
| .NET SDK | 8.0 | [dotnet.microsoft.com](https://dotnet.microsoft.com/download) |
| SQL Server | 2022 Developer | [microsoft.com](https://www.microsoft.com/sql-server) |
| SSMS | Latest | [aka.ms/ssms](https://aka.ms/ssms) |
| Docker Desktop | Latest | [docker.com](https://docker.com/products/docker-desktop) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

### 1. Clone the Repository

```bash
git clone https://YourOrg@dev.azure.com/YourOrg/OnlineFoodOrdering/_git/OnlineFoodOrdering
cd OnlineFoodOrdering
```

### 2. Open in Visual Studio

```
File → Open → Project/Solution → OnlineFoodOrdering.sln → Open
```

### 3. Configure Connection String

Open `src/FoodOrdering.Web/appsettings.json` and update:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=FoodOrderingDb;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Do the same in `src/FoodOrdering.API/appsettings.json`.

---

## 🗄 Database Setup

### Run EF Core Migrations

Open **Package Manager Console** (`Tools → NuGet Package Manager → Package Manager Console`):

> ⚠️ Right-click `FoodOrdering.Web` → **Set as Startup Project** before running.

```powershell
# Set Default project = FoodOrdering.Infrastructure in the console dropdown

Add-Migration InitialCreate `
  -Project FoodOrdering.Infrastructure `
  -StartupProject FoodOrdering.Web

Update-Database `
  -Project FoodOrdering.Infrastructure `
  -StartupProject FoodOrdering.Web
```

This will:
- Create the `FoodOrderingDb` database in SQL Server
- Create all tables: `AspNetUsers`, `AspNetRoles`, `Categories`, `FoodItems`, `Orders`, `OrderItems`
- Seed 5 default categories (Burgers, Pizza, Sushi, Desserts, Beverages)
- Auto-create the admin user on first run (via `SeedData.cs` in `Program.cs`)

### Verify in SSMS

Connect to `localhost` → expand Databases → you should see `FoodOrderingDb` with all tables.

---

## ▶️ Running the Application

### Option A — Visual Studio (Local)

1. Set `FoodOrdering.Web` as the startup project
2. Press **F5** or click the green Run button
3. Browser opens at `https://localhost:{port}`
4. Login at `/Account/Login` with admin credentials

To also run the API simultaneously:
- Right-click Solution → **Properties** → **Multiple startup projects**
- Set both `FoodOrdering.Web` and `FoodOrdering.API` to **Start**

### Option B — dotnet CLI

```bash
# Run Web App
cd src/FoodOrdering.Web
dotnet run

# Run API (new terminal)
cd src/FoodOrdering.API
dotnet run
```

---

## 🐳 Docker Deployment

The entire application stack runs in Docker with a single command — no local SQL Server needed.

### Architecture

```
docker-compose up
       │
       ├── sqlserver  (port 1433)  ← SQL Server 2022 Developer
       ├── web        (port 8080)  ← FoodRush MVC Web App
       └── api        (port 8081)  ← FoodRush Web API
```

### Build & Start

```bash
# From the project root (where docker-compose.yml lives)
docker-compose up --build
```

> First run downloads ~2 GB of base images. Subsequent runs are fast.

### Access the Application

| Service | URL |
|---|---|
| 🌐 Web Application | http://localhost:8080 |
| 🔌 Web API | http://localhost:8081 |
| 📖 Swagger UI | http://localhost:8081/swagger |

### Useful Docker Commands

```bash
# Start in background (detached)
docker-compose up --build -d

# View live logs
docker-compose logs -f web

# Stop containers (keeps database data)
docker-compose down

# Stop and wipe database (fresh start)
docker-compose down -v

# List running containers
docker ps

# Restart a single service
docker-compose restart web
```

### How It Works

- The `Dockerfile` and `Dockerfile.api` use **multi-stage builds** — the SDK stage compiles the app, the runtime stage creates a lean final image
- The `docker-compose.yml` uses a **health check** on SQL Server so the web and API containers wait until the database is fully ready before starting
- On startup, `Program.cs` calls `db.Database.Migrate()` which automatically applies all EF Core migrations and seeds the admin user inside the container — no manual setup needed

---

## ☁️ Azure DevOps CI/CD

### What's Set Up

The project uses a full **two-stage CI pipeline** defined in `azure-pipelines.yml`:

```
Push to main
     │
     ▼
┌─────────────────────┐     ┌─────────────────────┐
│   Build and Publish  │────▶│    Docker Build      │
│                      │     │                      │
│  • Restore packages  │     │  • Build Web image   │
│  • Build solution    │     │  • Build API image   │
│  • Publish Web app   │     │                      │
│  • Publish API       │     │  foodrush-web:latest │
│  • Save artifact     │     │  foodrush-api:latest │
└─────────────────────┘     └─────────────────────┘
    1m 22s  ✅                   1m 32s  ✅
```

### Steps Followed to Set Up

**1. Initialized Git and pushed to Azure Repos:**
```bash
git init
git add .
git commit -m "Initial commit: Online Food Ordering System"
git remote add origin https://palakgupta14140035@dev.azure.com/palakgupta14140035/OnlineFoodOrdering/_git/OnlineFoodOrdering
git push -u origin main
```

**2. Created `azure-pipelines.yml`** at the project root with two stages: `Build` and `DockerBuild`

**3. Set up the pipeline in Azure DevOps:**
- Pipelines → New Pipeline → Azure Repos Git → Select repo → Existing YAML file → `/azure-pipelines.yml` → Run

**4. Pipeline auto-triggers** on every push to `main`

### Pipeline Results

Both pipeline stages passed successfully:

**Azure Repos — Code pushed and visible:**


**Azure DevOps Pipeline — Both stages succeeded:**


> ✅ **Build and Publish** — 1 job completed in 1m 22s · 1 artifact produced  
> ✅ **Docker Build** — 1 job completed in 1m 32s · Web & API images built

---

## 📡 API Documentation

The Web API is accessible via Swagger at `http://localhost:8081/swagger`

### Food Items Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/fooditems` | Get all food items |
| `GET` | `/api/fooditems/{id}` | Get food item by ID |
| `GET` | `/api/fooditems/search?q={query}` | Search food items |
| `GET` | `/api/fooditems/featured` | Get featured items |
| `POST` | `/api/fooditems` | Create new food item |
| `PUT` | `/api/fooditems/{id}` | Update food item |
| `DELETE` | `/api/fooditems/{id}` | Delete food item |

### Orders Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | Get all orders |
| `GET` | `/api/orders/{id}` | Get order by ID |
| `GET` | `/api/orders/user/{userId}` | Get orders by user |
| `POST` | `/api/orders` | Create new order |
| `PATCH` | `/api/orders/{id}/status` | Update order status |

---

## 🔑 Default Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@foodorder.com | Admin@123 |
| **Customer** | Register a new account | Any (min 6 chars, 1 digit) |

> Admin is seeded automatically on first run via `SeedData.cs`. No manual DB steps required.

---

## 🗺 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Browser / Client                  │
└────────────────────┬────────────────────────────────┘
                     │ HTTP
          ┌──────────┴──────────┐
          │                     │
   ┌──────▼──────┐      ┌───────▼──────┐
   │  MVC Web App │      │   Web API    │
   │  (port 8080) │      │  (port 8081) │
   │              │      │   + Swagger  │
   └──────┬───────┘      └───────┬──────┘
          │                      │
          └──────────┬───────────┘
                     │ EF Core
              ┌──────▼──────┐
              │  SQL Server  │
              │  (port 1433) │
              │ FoodOrderingDb│
              └─────────────┘
```

---

## 🧩 Key Design Decisions

- **Repository Pattern** — all data access is abstracted behind interfaces (`IFoodItemRepository`, etc.), making the code testable and decoupled from EF Core
- **Session-based Cart** — the shopping cart uses `HttpContext.Session` with JSON serialization, so no cart data is stored in the database until checkout
- **Soft Delete for Categories** — categories are never hard-deleted; the `IsActive` flag is set to `false` to preserve historical data integrity
- **Multi-stage Docker Builds** — the SDK image is used only for compilation; the final runtime image is lean (aspnet:8.0 base), reducing image size
- **Auto-migration on startup** — `db.Database.Migrate()` in `Program.cs` ensures Docker containers are always up to date without manual intervention
- **Role seeding** — `SeedData.InitializeAsync()` runs at startup and idempotently creates Admin/Customer roles and the default admin user

---

## 📁 NuGet Packages Used

| Package | Version | Project |
|---|---|---|
| `Microsoft.EntityFrameworkCore` | 8.0.0 | Infrastructure |
| `Microsoft.EntityFrameworkCore.SqlServer` | 8.0.0 | Infrastructure |
| `Microsoft.EntityFrameworkCore.Tools` | 8.0.0 | Infrastructure |
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | 8.0.0 | Infrastructure |
| `Microsoft.EntityFrameworkCore.Design` | 8.0.0 | Web, API |
| `Microsoft.AspNetCore.Identity.UI` | 8.0.0 | Web |
| `Newtonsoft.Json` | 13.0.3 | Web |
| `iTextSharp` | 5.5.13.3 | Web |
| `Swashbuckle.AspNetCore` | 6.5.0 | API |

---

## 👤 Author

**Palak Gupta**  
Project: `OnlineFoodOrdering`

---

<div align="center">

 *FoodRush — Delivering happiness, one bite at a time*

</div>
