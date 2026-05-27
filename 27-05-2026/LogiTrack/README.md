# 🚚 LogiTrack — Logistics & Supply Chain Management

> A full-stack logistics operations platform built with **ASP.NET Core 8** and **Angular 17**, featuring live GPS fleet tracking, shipment management, warehouse inventory, and IoT telemetry streaming via Kafka.

---

## 🗂️ Project Structure

```
LogiTrack/
├── backend/
│   ├── LogiTrack.API/            # Web API controllers and app startup
│   ├── LogiTrack.Application/    # Services, DTOs, interfaces, AutoMapper profiles
│   ├── LogiTrack.Core/           # Domain entities, enums, repository contracts
│   └── LogiTrack.Infrastructure/ # EF Core, repositories, SignalR hub, Kafka consumer
│
├── frontend/
│   └── src/app/
│       ├── core/                 # Models, services, route guards, HTTP interceptors
│       ├── layout/               # Shell component (sidebar + topbar)
│       └── modules/
│           ├── dashboard/        # KPI overview and summary charts
│           ├── shipments/        # List view, detail panel, public tracking page
│           ├── fleet/            # Live GPS fleet map
│           ├── warehouse/        # Inventory and capacity management
│           ├── routes/           # Route planner and optimization
│           ├── analytics/        # Charts and performance reporting
│           ├── customers/        # Customer directory
│           └── auth/             # Login module
│
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Prerequisites

| Tool | Version |
|---|---|
| .NET SDK | 8.0+ |
| Node.js | 20+ |
| Angular CLI | 17+ |
| PostgreSQL | 15+ |
| Docker & Docker Compose | Latest |

---

## 🚀 Quick Start

### ▶ Option A — Docker *(Recommended)*

```bash
docker-compose up -d
```

| Service | URL |
|---|---|
| Frontend | `http://localhost:4200` |
| API | `http://localhost:5000` |
| Swagger | `http://localhost:5000/swagger` |

---

### ⚙️ Option B — Manual Setup

#### 1. PostgreSQL — Create the Database

```sql
CREATE DATABASE "LogiTrackDb";
```

Or update the connection string in `backend/LogiTrack.API/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=LogiTrackDb;Username=YOUR_USER;Password=YOUR_PASS"
}
```

#### 2. Backend — ASP.NET Core API

```bash
cd backend

# Restore NuGet packages
dotnet restore LogiTrack.sln

# Apply EF Core migrations (also runs automatically on startup)
cd LogiTrack.API
dotnet ef database update --project ../LogiTrack.Infrastructure

# Launch the API
dotnet run
# Listening at: http://localhost:5000
# Swagger UI:   http://localhost:5000/swagger
```

#### 3. Frontend — Angular Dev Server

```bash
cd frontend
npm install
ng serve
# Runs at: http://localhost:4200
```

---

## 🗄️ Database Migrations

```bash
cd backend/LogiTrack.API

# Create a new migration
dotnet ef migrations add <MigrationName> --project ../LogiTrack.Infrastructure

# Apply pending migrations
dotnet ef database update --project ../LogiTrack.Infrastructure

# Roll back to a previous migration
dotnet ef database update <PreviousMigrationName> --project ../LogiTrack.Infrastructure
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/shipments` | Paginated shipments list |
| `POST` | `/api/shipments` | Create a new shipment |
| `GET` | `/api/shipments/track/{number}` | Public tracking by tracking number |
| `PATCH` | `/api/shipments/{id}/status` | Update shipment status |
| `POST` | `/api/shipments/{id}/assign` | Assign driver and vehicle |
| `GET` | `/api/vehicles` | All registered vehicles |
| `GET` | `/api/vehicles/fleet-summary` | Fleet status counts |
| `POST` | `/api/vehicles/telemetry` | Push IoT telemetry payload |
| `GET` | `/api/analytics/dashboard` | Dashboard KPI data |
| `POST` | `/api/routes/optimize` | Run route optimization |

---

## 🔌 Real-Time Events (SignalR)

**Hub URL:** `http://localhost:5000/hubs/tracking`

**Subscribe to streams:**

```javascript
// Receive all vehicle position updates
hub.invoke('JoinFleetRoom');

// Track a specific shipment
hub.invoke('JoinShipmentGroup', 'LT20240101XXXXX');

// Track a specific vehicle
hub.invoke('JoinVehicleGroup', vehicleId);
```

**Incoming event handlers:**

```javascript
hub.on('VehicleLocationUpdated', (payload) => { /* update map marker */ });
hub.on('ShipmentStatusUpdated', (payload) => { /* refresh timeline */ });
hub.on('FleetAlertReceived',    (payload) => { /* show alert badge  */ });
```

---

## 🗺️ Google Maps Integration

1. Generate an API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable: **Maps JavaScript API**, **Directions API**, **Geocoding API**
3. Add to `frontend/src/environments/environment.ts`:

```typescript
googleMapsApiKey: 'YOUR_KEY_HERE'
```

4. Add to `backend/LogiTrack.API/appsettings.json`:

```json
"GoogleMaps": {
  "ApiKey": "YOUR_KEY_HERE"
}
```

---

## ⚡ Kafka — IoT Telemetry Streaming *(Optional)*

Kafka handles high-throughput vehicle telemetry from IoT devices.

```bash
# Start Kafka and Zookeeper via Docker
docker-compose up kafka zookeeper -d

# Auto-created topics:
# - vehicle-telemetry
# - shipment-events

# Enable the hosted consumer in Program.cs:
# builder.Services.AddHostedService<VehicleTelemetryConsumer>();
```

---

## 🏗️ Architecture Overview

```
Angular 17 SPA
     │
     │  HTTP REST  +  SignalR WebSocket
     ▼
ASP.NET Core 8 API
     │
     ├── Application Layer   (Services · DTOs · AutoMapper)
     ├── Domain Layer        (Entities · Interfaces · Enums)
     └── Infrastructure
           ├── PostgreSQL    (EF Core data persistence)
           ├── SignalR Hub   (live GPS & shipment events)
           └── Kafka         (IoT vehicle telemetry consumer)
```

---

## 🧩 Module Summary

| Module | Features |
|---|---|
| **Dashboard** | KPI cards, order trend chart, shipping method breakdown, fleet gauge, recent deliveries |
| **Shipments** | Paginated list, status filters, create/assign/update flows, full event timeline |
| **Fleet** | Live vehicle list with status filters, map view, detail panel, SignalR position updates |
| **Warehouse** | Warehouse cards with capacity bars, inventory table, barcode scan emulation, low-stock alerts |
| **Routes** | Route planner form, waypoint management, optimization trigger, result summary |
| **Analytics** | Delivery trends (SVG line), revenue bars, fuel area chart, driver performance table |
| **Customers** | Card grid with search, add-customer modal, detail side panel |
| **Public Tracking** | Unauthenticated shipment tracking at `/track/:trackingNumber` |

---

## 📦 Tech Stack

**Backend**
- ASP.NET Core 8 · Clean Architecture (4-layer)
- Entity Framework Core 8 + Npgsql (PostgreSQL driver)
- SignalR (WebSocket real-time hub)
- Confluent.Kafka (IoT event streaming)
- AutoMapper · Serilog · JWT Bearer Auth

**Frontend**
- Angular 17 (standalone components, Angular Signals)
- RxJS · Angular Router with lazy-loaded feature modules
- `@microsoft/signalr` client
- Pure CSS (zero component library dependency)

---

## 🔑 Demo Login

```
Email:     admin@logitrack.com
Password:  admin123
```

> **Note:** The frontend falls back to realistic mock data when no backend is running, making all pages fully browsable in demo mode.

