# 🚀 Job Portal Backend (Microservices Architecture)

A production-oriented **Job Portal Backend System** built using **Node.js, TypeScript, PostgreSQL**, and a **Microservices Architecture with an API Gateway**.

This project focuses on **scalability, separation of concerns, and real-world backend patterns**, including centralized authentication, distributed rate limiting, and async processing.

---

## 🧠 System Overview

The platform supports:

* 👤 User profile & resume management
* 🔐 Authentication (JWT + refresh tokens)
* 🏢 Company & recruiter workflows
* 💼 Job creation & listing
* 📄 Application tracking
* 📦 File uploads (resume, profile, assets)
* ⚡ Event-driven workflows (Kafka – partial)
* 🌐 API Gateway for routing, security, and control

---

## 🏗️ Architecture

```
Client
  ↓
API Gateway (Fastify)
  ├── Authentication (JWT)
  ├── Rate Limiting (Redis)
  ├── Logging (Pino)
  ├── Reverse Proxy (Streaming)
  ↓
Services
  ├── Auth Service
  ├── User Service
  ├── Job Service
  └── Utils Service (Kafka Consumers)
  ↓
Infrastructure
  ├── PostgreSQL
  ├── Redis
  └── Kafka (partial)
```

---

## 🌐 API Gateway

### Responsibilities

* Centralized **JWT validation**
* Distributed **rate limiting (Redis)**
* **Streaming reverse proxy** (`@fastify/http-proxy`)
* Request logging (Pino)
* Standardized error handling

### Why this layer exists

* Keeps services **independent**
* Avoids duplicated authentication logic
* Protects services via rate limiting
* Enables scalable routing

---

## ⚙️ Tech Stack

### Core

* Node.js + TypeScript
* Fastify (API Gateway)
* PostgreSQL
* Redis
* Kafka (partial)

### Supporting

* Zod (validation)
* JWT (authentication)
* Pino (logging)

---

## 📦 Services

### 🔐 Auth Service

* Login / Register
* Refresh token rotation
* Password reset
* Device/session tracking
* Service-level rate limiting

---

### 👤 User Service

* Profile management
* Resume upload
* Skills management
* Profile picture handling

---

### 💼 Job Service

* Company management
* Job creation & updates
* Application handling
* Async file processing with retry

---

### 🧰 Utils Service

* Kafka consumers (email + upload)
* Async background processing
* Decouples heavy operations from request flow

---

## 📁 Project Structure

```
api-gateway/
services/
  ├── auth/
  ├── user/
  ├── job/
  └── utils/
frontend/ (planned)
```

Each service follows:

```
api → domain → infra → shared → composition-root
```

---

## 🧱 Database Design

* PostgreSQL (no ORM)
* SQL-based migrations
* Strong constraints:

  * Foreign keys
  * ENUM statuses
  * Unique indexes

### Migration System

* Custom SQL migration runner
* Version-controlled migrations
* Service-level isolation

---

## 🔄 Async Processing (Kafka)

* Producers in services
* Consumers in utils service
* Retry logic implemention planned
* DLQ (Dead Letter Queue) planned

### Current Use Cases

* File uploads
* Email processing

---

## 🔥 Key Engineering Decisions

* API Gateway for centralized control
* No ORM → predictable SQL behavior
* Service isolation → independent scaling
* Async + retry → resilience
* Clean Architecture → maintainability

---

## 🚧 Current Status

| Module       | Status     |
| ------------ | ---------- |
| API Gateway  | ✅ Stable   |
| Auth Service | ✅ Stable   |
| User Service | ✅ Stable   |
| Company APIs | ✅ Done     |
| Job APIs     | 🚧 Ongoing |
| Applications | 🚧 Ongoing |
| Kafka Flow   | ⚠️ Partial |
| Frontend     | ❌ Pending  |

---

## ⚠️ Planned Improvements

* Circuit breaker
* Request tracing (`x-request-id`)
* Redis caching layer
* RBAC (role-based access)
* Full Kafka pipeline (retry + DLQ)
* Docker + Nginx
* Cloud deployment (AWS)

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone <repo-url>
cd job_portal_application
```

---

### 2. Install dependencies

```bash
cd api-gateway && npm install

cd ../services/auth && npm install
cd ../user && npm install
cd ../job && npm install
cd ../utils && npm install
```

---

### 3. Environment Setup

Create `.env` for each service:

```env
PORT=5000
DATABASE_URL=
REDIS_URL=
KAFKA_BROKER=
JWT_SECRET=
```

---

### 4. Run services

Run each service separately:

```bash
npm run dev
```

---

## 🧪 Development Notes

* Each service runs independently
* API Gateway must run first
* Kafka consumers run in `utils` service

---

## 🧠 Design Philosophy

This project emphasizes:

* Clear separation of concerns
* Explicit data flow
* Predictable infrastructure
* Production-oriented backend patterns

---

## 📌 Final Note

This is not just a CRUD backend — it reflects **real-world scalable backend architecture**, focusing on:

* service isolation
* async processing
* centralized control
* maintainable structure
