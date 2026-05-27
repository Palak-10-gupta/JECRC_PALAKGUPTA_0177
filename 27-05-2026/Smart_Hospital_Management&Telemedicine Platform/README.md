# 🏥 Central Hospital Platform

> A multi-branch hospital digital management system built with **React**, **ASP.NET Core Web API**, **SQL Server**, **SignalR**, **Docker**, and **Azure DevOps** — providing role-aware clinical workflows, real-time emergency tracking, and smart appointment scheduling.

---

## 🏗️ System Architecture

```
React SPA (Vite)
     │
     │  REST API  +  SignalR WebSocket
     ▼
ASP.NET Core Web API
     │
     ├── Auth Module       (JWT-style role-based access)
     ├── Clinical Layer    (Patients · Doctors · Appointments · Prescriptions)
     ├── Operations Layer  (Lab Reports · Billing · Emergency · Audit)
     └── Infrastructure
           ├── SQL Server   (EF Core / Dapper persistence)
           ├── SignalR Hub  (live appointment & emergency events)
           └── Azure DevOps (CI/CD pipeline scaffolding)
```

---

## ✅ What's Implemented

### Frontend — React
- Role-aware login with protected routing per user type (Admin, Doctor, Patient)
- Admin dashboard with operational KPI overview
- Appointment scheduler with conflict prevention for overlapping doctor slots
- Emergency tracking panel with live status updates
- Real-time notification area powered by SignalR
- Built-in symptom checker widget

### Backend — ASP.NET Core Web API
| Domain | Endpoints |
|---|---|
| Authentication | Login, token refresh, role resolution |
| Patients | Registration, profile management, records |
| Doctors | Directory, scheduling, availability |
| Appointments | Booking, conflict detection, status updates |
| Lab Reports | Upload, retrieval, patient linking |
| Prescriptions | Issue, view, patient history |
| Billing | Invoice generation, payment status |
| Emergency | Incident logging, real-time status push |
| Analytics | Branch-level KPIs and trend data |
| Audit | Immutable operation logs |

### Infrastructure & DevOps
- SignalR hub for real-time appointment confirmations and emergency alerts
- Appointment overlap detection prevents double-booking a doctor slot
- Dockerfiles for both API and frontend containers
- `docker-compose.yml` for local full-stack orchestration
- Azure Pipeline YAML scaffolding for CI/CD
- SQL Server schema scripts with table definitions and seed data
- Architecture decision notes included

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@hospital.local` | `Admin@123` |
| **Doctor** | `doctor@hospital.local` | `Doctor@123` |
| **Patient** | `patient@hospital.local` | `Patient@123` |

---

## 🚀 Running Locally

### Option A — Manual *(with hot reload)*

**Step 1 — Start the API:**

```powershell
dotnet run --project .\src\Hospital.Api\Hospital.Api.csproj --urls http://localhost:5187
```

**Step 2 — Install dependencies and start the React app:**

```powershell
cd .\web
npm.cmd install
npm.cmd run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### Option B — Docker Compose *(Full Stack)*

```powershell
docker compose -f .\infra\docker\docker-compose.yml up --build
```

All services — API, frontend, and SQL Server — will start in isolated containers.

---

## 📂 Project Structure

```
.
├── src/
│   └── Hospital.Api/             # ASP.NET Core Web API (controllers, hubs, startup)
│
├── web/                          # React frontend (Vite)
│   ├── src/
│   │   ├── pages/                # Dashboard, Appointments, Emergency, Billing, etc.
│   │   ├── components/           # Shared UI components
│   │   ├── hooks/                # Custom React hooks
│   │   └── services/             # API client and SignalR connection setup
│   └── vite.config.ts
│
└── infra/
    ├── docker/
    │   ├── Dockerfile.api        # Multi-stage .NET API image
    │   ├── Dockerfile.web        # React + Nginx production image
    │   └── docker-compose.yml    # Full-stack orchestration
    ├── sql/
    │   └── schema.sql            # SQL Server table definitions and seed data
    └── azure-pipeline.yml        # Azure DevOps CI/CD scaffold
```

---

## 🔌 Real-Time Events (SignalR)

The SignalR hub broadcasts the following events to connected clients:

| Event | Trigger |
|---|---|
| `AppointmentConfirmed` | A new appointment is successfully booked |
| `AppointmentUpdated` | Status change on an existing appointment |
| `EmergencyCreated` | A new emergency incident is logged |
| `EmergencyStatusChanged` | Emergency case status is updated by staff |

---

## 🛣️ Planned Production Steps

The following items are scaffolded or noted for production readiness:

- [ ] Replace in-memory repositories with SQL Server persistence via **EF Core** or **Dapper**
- [ ] Integrate **ASP.NET Core Identity** with official JWT Bearer middleware
- [ ] Connect **Azure SignalR Service** and **Application Insights** for cloud-scale real-time and observability
- [ ] Integrate a payment gateway provider SDK and extract pharmacy logic into a dedicated microservice
- [ ] Add test projects covering: booking conflict scenarios, role-based authorization, and API contract validation

---

## 📦 Tech Stack

**Backend**
- ASP.NET Core Web API (.NET 8)
- SQL Server with EF Core / Dapper
- SignalR (real-time hub)
- JWT-style role-based authentication
- Docker + Azure DevOps scaffolding

**Frontend**
- React 18 (Vite build tooling)
- Role-aware protected routing
- SignalR client for live notifications
- Component-based UI with symptom checker and emergency tracker

