# 🚀 Job Portal Backend — Microservices Architecture

A production-oriented **Job Portal Backend System** built with **Node.js, TypeScript, PostgreSQL**, and a **Microservices Architecture with an API Gateway**.

Focuses on **scalability, separation of concerns, and real-world backend patterns** — including centralized authentication, distributed rate limiting, async processing, and **GenAI-powered workflows**.

---

## 🧠 System Overview

The platform supports:

| Feature | Description |
|---|---|
| 👤 User Management | Profile & resume management |
| 🔐 Authentication | JWT + refresh token rotation |
| 🏢 Recruiter Workflows | Company & recruiter management |
| 💼 Job Listings | Job creation, updates & listing |
| 📄 Applications | Application tracking |
| 📦 File Uploads | Resume, profile picture, assets |
| 🤖 GenAI Integration | Resume analysis & career recommendations |
| ⚡ Event-Driven | Async processing via Kafka (partial) |
| 🌐 API Gateway | Centralized routing, security & control |

---

## 🏗️ Architecture

```
Client
  │
  ▼
API Gateway (Fastify)
  ├── Authentication (JWT)
  ├── Rate Limiting (Redis)
  ├── Logging (Pino)
  └── Reverse Proxy (Streaming)
        │
        ▼
    Services
      ├── Auth Service
      ├── User Service
      ├── Job Service
      └── Utils Service
            ├── Kafka Consumers
            ├── GenAI (Gemini API)
            └── Background Processing
                  │
                  ▼
          Infrastructure
            ├── PostgreSQL
            ├── Redis
            └── Kafka (partial)
```

---

## ⚙️ Tech Stack

### Core
- **Runtime:** Node.js + TypeScript
- **Gateway:** Fastify
- **Database:** PostgreSQL (no ORM, raw SQL)
- **Cache / Rate Limiting:** Redis
- **Messaging:** Kafka (partial)

### Supporting Libraries
- **Zod** — Schema validation
- **JWT** — Authentication
- **Pino** — Structured logging

---

## 📦 Services

### 🔐 Auth Service
- User login & registration
- Refresh token rotation
- Password reset flow
- Device / session tracking
- Service-level rate limiting

### 👤 User Service
- Profile management
- Resume upload & management
- Skills management
- Profile picture handling

### 💼 Job Service
- Company management
- Job creation & updates
- Application handling
- Async file processing with retry

### 🧰 Utils Service *(Async + GenAI Layer)*
- Kafka consumers (email, uploads, background jobs)
- GenAI integration via **Gemini API**
- Resume parsing → skills, experience, keywords
- Context-aware career recommendation engine
- AI-generated insights for job matching
- Decouples heavy & AI workloads from the main request flow

---

## 📁 Project Structure

```
job_portal_application/
├── api-gateway/
└── services/
    ├── auth/
    ├── user/
    ├── job/
    └── utils/
```

Each service follows a consistent internal structure:

```
api → domain → infra → shared → composition-root
```

---

## 🧱 Database Design

- **PostgreSQL** with no ORM — raw SQL for predictable behavior
- SQL-based migrations with a **custom migration runner**
- Version-controlled migrations with service-level isolation
- Strong constraints: foreign keys, ENUM statuses, unique indexes

---

## 🔄 Async Processing (Kafka)

- **Producers** live inside individual services
- **Consumers** are centralized in the Utils Service
- Retry logic and **Dead Letter Queue (DLQ)** planned

**Current Use Cases:**
- File upload processing
- Email processing
- GenAI resume analysis (async)

---

## 🌐 API Gateway

| Responsibility | Detail |
|---|---|
| JWT Validation | Centralized — no per-service duplication |
| Rate Limiting | Distributed via Redis |
| Reverse Proxy | Streaming via `@fastify/http-proxy` |
| Logging | Structured request logging via Pino |
| Error Handling | Standardized error responses |

> The Gateway keeps services independent, avoids duplicated auth logic, and enables scalable routing.

---

## 🚧 Current Status

| Module | Status |
|---|---|
| API Gateway | ✅ Stable |
| Auth Service | ✅ Stable |
| User Service | ✅ Stable |
| Company APIs | ✅ Done |
| Job APIs | 🚧 Ongoing |
| Applications | 🚧 Ongoing |
| Kafka Flow | ⚠️ Partial |
| Frontend | ❌ Pending |

---

## ⚠️ Planned Improvements

- [ ] Circuit breaker pattern
- [ ] Request tracing via `x-request-id`
- [ ] Redis caching layer
- [ ] RBAC (role-based access control)
- [ ] Full Kafka pipeline with retry + DLQ
- [ ] Docker + Nginx containerization
- [ ] Cloud deployment (AWS)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd job_portal_application
```

### 2. Install Dependencies

```bash
cd api-gateway && npm install

cd ../services/auth  && npm install
cd ../user           && npm install
cd ../job            && npm install
cd ../utils          && npm install
```

### 3. Environment Setup

Create a `.env` file for each service:

```env
PORT=5000
DATABASE_URL=
REDIS_URL=
KAFKA_BROKER=
JWT_SECRET=
GEMINI_API_KEY=
```

### 4. Run Services

```bash
npm run dev
```

> **Note:** The API Gateway must be started first. Kafka consumers run inside the Utils Service.

---

## 🔥 Key Engineering Decisions

| Decision | Rationale |
|---|---|
| API Gateway | Centralized control — auth, rate limiting, routing |
| No ORM | Predictable SQL behavior, full query control |
| Service Isolation | Independent deployment and scaling |
| Async + Retry | Resilience for heavy and AI workloads |
| Dedicated Utils Service | Decouples GenAI from request lifecycle |
| Clean Architecture | Long-term maintainability |

---

## 🧠 Design Philosophy

> This is not just a CRUD backend — it reflects a **real-world scalable system** that combines service isolation, async processing, centralized control, GenAI-powered workflows, and maintainable architecture.

Built to explore how modern backend systems integrate **AI within microservices at scale**.
