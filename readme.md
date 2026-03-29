# 🚀 Job Portal Application (Microservices Backend)

A scalable and modular **Job Portal Backend System** built using **Node.js, TypeScript, PostgreSQL**, and a **Microservices Architecture**.

This project follows **Clean Architecture principles**, ensuring separation of concerns, maintainability, and production readiness.

---

## 🧠 Overview

This system is designed to handle:

* 👤 User Management (Profile, Skills, Resume)
* 🔐 Authentication & Authorization (JWT, Refresh Tokens)
* 🏢 Company Management (Recruiters)
* 💼 Job Management (Creation, Listings)
* 📄 Applications System (Apply, Track Status)
* 📦 File Upload System (Profile Pic, Resume, Company Logo)
* ⚡ Async Processing (Kafka-based architecture - planned/partial)

---

## 🏗️ Architecture

The project follows a **Microservices + Clean Architecture** approach:

```
services/
  ├── auth     → Authentication & session management
  ├── user     → User profile & skills
  ├── job      → Companies, Jobs, Applications
```

Each service is independently structured with:

```
src/
├── api/                → Controllers, Routes, DTOs
├── domain/             → Business logic (Entities, Services, Interfaces)
├── infra/              → DB, Repositories, Kafka, Storage
├── shared/             → Utils, Middlewares, Errors
├── config/             → Environment & service configs
├── composition-root/   → Dependency Injection setup
```

---

## ⚙️ Tech Stack

* **Backend:** Node.js, TypeScript, Express
* **Database:** PostgreSQL (with manual migration system)
* **Caching:** Redis
* **Messaging:** Kafka (Producer setup, async-ready)
* **Validation:** Zod
* **File Upload:** Multer + Cloud Storage
* **Auth:** JWT + Refresh Token Rotation
* **Architecture:** Clean Architecture + Repository Pattern

---

## 📦 Services Breakdown

### 🔐 Auth Service

* User Registration & Login
* Refresh Token Management
* Password Reset Flow
* Device Tracking
* Rate Limiting

---

### 👤 User Service

* Profile Management
* Resume Upload
* Profile Picture Upload
* Skills Management

---

### 💼 Job Service

* Company Management (Recruiter-based)
* Job Creation & Listing (in progress)
* Application System (in progress)
* Async File Upload Handling with retry logic

---

## 🗄️ Database Design

Relational structure:

```
users
  ↓
companies (recruiter_id FK)
  ↓
jobs (company_id FK)
  ↓
applications (job_id + applicant_id UNIQUE)
```

Key features:

* Foreign Key constraints for integrity
* ENUM-based status fields
* Unique constraints (e.g., one application per job per user)
* Custom migration system

---

## 🔄 Migration System

Unlike ORMs, this project uses a **custom migration runner**:

* SQL-based migrations
* Version tracking via migration table
* Controlled execution order
* Service-level isolation

---

## 📁 Project Structure (Simplified)

```
frontend/              → (Planned)
services/
  ├── auth/
  ├── user/
  ├── job/
  └── utils/           → Kafka consumers, shared utilities
```

---

## 🚧 Current Status

| Module       | Status         |
| ------------ | -------------- |
| Auth         | ✅ Completed    |
| User         | ✅ Completed    |
| Companies    | ✅ Completed    |
| Jobs         | 🚧 In Progress |
| Applications | 🚧 In Progress |
| Kafka Flow   | ⚠️ Partial     |
| Frontend     | ❌ Pending      |

---

## 🔥 Key Features

* Clean separation of layers (API → Domain → Infra)
* Non-blocking file upload with retry mechanism
* Strong validation using Zod
* Manual migration system (no ORM dependency)
* Scalable microservice design
* Production-oriented error handling & logging

---

## ⚠️ Known Improvements (Planned)

* Kafka consumer integration for async workflows
* Idempotent upload handling
* Distributed transaction handling (Saga pattern)
* Advanced job filtering & search
* Notification system (email / push)
* Full frontend integration

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd job_portal_application
```

---

### 2. Install dependencies (per service)

```bash
cd services/auth
npm install

cd ../user
npm install

cd ../job
npm install
```

---

### 3. Setup environment variables

Create `.env` files for each service:

```
DATABASE_URL=
JWT_SECRET=
REDIS_URL=
KAFKA_BROKER=
```

---

### 4. Run services

```bash
npm run dev
```

Each service runs on its own port.

---

## 🧪 API Testing

Use:

* Postman
* Thunder Client

---

## 🧠 Design Philosophy

This project focuses on:

* **Control over abstraction** (no heavy ORM)
* **Explicit data handling**
* **Scalable architecture from day one**
* **Separation of business logic from infrastructure**

---

## 👨‍💻 Author

**Nikhil Singh**

Backend Developer focused on:

* Scalable system design
* Microservices architecture
* Performance optimization

---

## ⭐ Final Note

This project is actively evolving into a **production-grade job platform backend**, with emphasis on **scalability, reliability, and clean architecture**.

---
