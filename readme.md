# 🚀 AI-Powered Job Portal Platform

<div align="center">

<img src="https://img.shields.io/badge/Architecture-Microservices-10B981?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-Next.js_15-000000?style=for-the-badge&logo=nextdotjs" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Async-Kafka-231F20?style=for-the-badge&logo=apachekafka" />
<img src="https://img.shields.io/badge/AI-Groq-FF6B35?style=for-the-badge" />
<img src="https://img.shields.io/badge/Payments-Razorpay-0C2451?style=for-the-badge" />
<img src="https://img.shields.io/badge/Logging-Winston-4B32C3?style=for-the-badge" />
<img src="https://img.shields.io/badge/Observability-Log_Admin-7C3AED?style=for-the-badge" />

---

**Production-grade distributed job portal platform** with microservices architecture, AI-powered workflows, async event processing, payment infrastructure, structured observability, and a dedicated admin monitoring dashboard.

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Monorepo Structure](#-monorepo-structure)
- [Services](#-services)
- [Features](#-features)
- [Observability & Logging](#-observability--logging)
- [Request Flows](#-request-flows)
- [Database Design](#-database-design)
- [Authentication & Security](#-authentication--security)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running The Project](#-running-the-project)
- [Engineering Patterns](#-engineering-patterns)
- [Current Status](#-current-status)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 🧠 Overview

A scalable distributed platform designed to simulate real-world production engineering — not a simple CRUD app.

**Core pillars:**
- Microservices with clean architecture per service
- API Gateway with circuit breakers & rate limiting
- Event-driven async processing via Kafka
- AI-powered resume intelligence & career guidance
- Production-grade payment infrastructure (Razorpay)
- Structured logging with Winston + dedicated observability dashboard
- Modern frontend with Next.js 15 App Router

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15 · :3000)                 │
│         Zustand · TanStack Query · Axios · ShadCN · Tailwind    │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                   API Gateway (Fastify · :8080)                  │
│     JWT Verify · Redis Rate Limit · Circuit Breaker · Proxy     │
│                    Winston Structured Logging                    │
└──────┬──────────┬──────────┬──────────┬──────────┬──────────────┘
       │          │          │          │          │
       ▼          ▼          ▼          ▼          ▼
   ┌──────┐  ┌──────┐  ┌──────┐  ┌───────┐  ┌──────┐
   │ Auth │  │ User │  │ Job  │  │Payment│  │Utils │
   │:4000 │  │:5003 │  │:5004 │  │ :5005 │  │:5002 │
   └──┬───┘  └──┬───┘  └──┬───┘  └───┬───┘  └──┬───┘
      │         │         │           │          │
      └─────────┴─────────┴───────────┴──────────┘
                          │
       ┌──────────────────┼──────────────────────┐
       │                  │                      │
       ▼                  ▼                      ▼
  ┌─────────┐      ┌──────────┐          ┌──────────┐
  │PostgreSQL│      │  Redis   │          │  Kafka   │
  │  (Neon)  │      │(Upstash) │          │  :9092   │
  └─────────┘      └──────────┘          └──────────┘
                                               │
                          ┌────────────────────┘
                          ▼
                   ┌─────────────┐     ┌──────────┐
                   │   Groq AI   │     │ Razorpay │
                   └─────────────┘     └──────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │              Log Admin Dashboard (:9000)                     │
  │   Aggregates logs from all services · Live DB metrics       │
  │   ER Diagram · Service health · Architecture view           │
  └─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Global state |
| TanStack Query | Server state & caching |
| Axios | HTTP client |
| ShadCN UI | Component library |
| Framer Motion | Animations |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + TypeScript | Runtime |
| Fastify | API Gateway |
| Express.js | Microservices |
| PostgreSQL (Neon) | Primary database |
| Redis (Upstash) | Rate limiting & caching |
| Apache Kafka | Async event processing |
| Winston + DailyRotateFile | Structured logging |
| Zod | Request validation |
| JWT + bcrypt | Authentication |

### AI & Payments
| Technology | Purpose |
|---|---|
| Groq AI (llama/mixtral) | Resume analysis & career guidance |
| Razorpay | Subscription payments |

### Observability
| Technology | Purpose |
|---|---|
| Winston | Structured JSON logging per service |
| Log Admin Dashboard | Real-time monitoring & metrics |
| pg_stat_activity | Live DB introspection |

---

## 📁 Monorepo Structure

```
job_portal_application/
├── frontend/                  # Next.js 15 App Router
├── api-gateway/               # Fastify reverse proxy
├── services/
│   ├── auth/                  # Authentication & sessions
│   ├── user/                  # Job seeker workflows
│   ├── job/                   # Recruiter & job management
│   ├── payment/               # Razorpay integration
│   ├── utils/                 # Kafka consumers & AI
│   └── log-admin/             # Observability dashboard
└── README.md
```

Each backend service follows **Clean Architecture**:
```
service/
├── src/
│   ├── api/                   # Controllers + routes
│   ├── domain/                # Business logic & services
│   ├── infra/                 # DB repositories + Kafka
│   ├── shared/                # Middleware + utilities
│   ├── composition-root/      # Dependency injection
│   └── config/                # Logger + env
```

---

## 🔧 Services

### 🚪 API Gateway (Fastify · :8080)
- JWT verification at gateway level
- Redis rate limiting (200 req/min per IP)
- Circuit breakers per downstream service (opossum)
- Reverse proxy via http-proxy
- Winston structured logging with request correlation

### 🔐 Auth Service (Express · :4000)
- Registration & login
- Refresh token rotation (access: 15m, refresh: 7d)
- Forgot/reset password
- Device tracking & session management
- Kafka producer: `send-mail` topic

### 👤 User Service (Express · :5003)
- Profile management & completion tracking
- Resume & profile-pic upload (Kafka → async processing)
- Skills CRUD
- Job applications & history
- Subscription status management
- Kafka producer: `upload-content` topic

### 💼 Job Service (Express · :5004)
- Company management (CRUD + logo upload)
- Job creation & updates
- Recruiter dashboard & applicant tracking
- Kafka producer: `send-mail`, `upload-content`

### 💳 Payment Service (Express · :5005)
- Razorpay order creation
- HMAC signature verification
- Subscription activation (30-day cycle)
- Webhook handling & payment audit
- Failure recovery

### 🤖 Utils Service (Express · :5002)
- Kafka consumers: `send-mail` + `upload-content`
- Email dispatch worker
- File upload processing worker
- Groq AI: resume analysis, skills extraction, career guidance
- Background job orchestration

### 📊 Log Admin Dashboard (Express · :9000)
- Real-time log aggregation across all 6 services
- Per-service metrics (request volume, errors, latency)
- Live PostgreSQL introspection (ER diagram, connections, TPS, cache hit)
- Top queries from pg_stat_activity
- Kafka & Redis monitoring panels
- Full architecture visualization with wire flows
- Cursor-based log pagination with in-memory caching
- 7-day audit trail

---

## ✨ Features

### Job Seeker
- Secure auth with session restoration
- AI resume analysis & career guidance
- Resume upload with async processing + polling
- Skills management
- Profile completion tracking
- Premium subscription (Razorpay)
- Job applications & history

### Recruiter
- Company management with logo upload
- Job creation & management
- Applicant tracking & workflow
- Recruiter dashboard

### Payment & Subscription
- Razorpay checkout integration
- Secure HMAC signature verification
- Subscription lifecycle (activation → expiry tracking)
- Payment failure recovery
- Production-safe checkout UX

### AI Features
- Resume intelligence (skills extraction, experience analysis)
- Resume improvement suggestions
- Career guidance with personalized roadmaps
- Technology recommendations
- AI quota management (Redis-backed)

---

## 📊 Observability & Logging

### Winston Integration (All Services)
- **Structured JSON logs** in production
- **Daily rotation** with 7-day retention (20MB max per file)
- **Separate error streams** for fast incident triage
- **Request correlation** via `X-Request-Id` (crypto.randomUUID)
- **Sensitive data redaction** (passwords, tokens, secrets)
- **Color-coded console** output in development

### Log Admin Dashboard
| Feature | Description |
|---|---|
| Dashboard | Cluster-wide stats, 7-day audit chart |
| Service Logs | Per-service log viewer with filters |
| Error Logs | Aggregated errors across all services |
| Service Details | Per-service CPU, memory, latency, error rate |
| Infrastructure | Live DB metrics, ER diagram, Kafka & Redis panels |
| Architecture | Full system wire flow & request lifecycle docs |

---

## 🔄 Request Flows

### Login Flow
```
Frontend → Gateway (rate limit) → Auth Service → PostgreSQL (verify)
→ Generate JWT + refresh token → Set cookies → Return user
```

### Resume Upload Flow
```
Frontend → Gateway → User Service → Kafka (upload-content)
→ Utils Consumer → Cloud upload → Groq AI analysis
→ DB update (status: success) → Frontend polling detects completion
```

### Payment Flow
```
Frontend → Payment Service → Razorpay (create order)
→ Frontend opens checkout → User pays → Razorpay callback
→ Payment Service (HMAC verify) → DB (activate subscription)
```

### AI Career Guidance
```
Frontend → Gateway (AI quota check via Redis)
→ Utils Service → Groq AI (structured prompt)
→ Parse response → Return roadmap + recommendations
```

---

## 🗄 Database Design

- **PostgreSQL** (Neon) — single shared database
- **Raw SQL queries** — no ORM
- **Migration-based** schema control
- **7 tables**: users, refresh_tokens, skills, user_skills, companies, jobs, applications

---

## 🛡 Authentication & Security

- JWT access tokens (15min) + refresh token rotation (7d)
- Secure httpOnly cookies for refresh tokens
- Device tracking per session
- Redis rate limiting (200/min per IP)
- AI quota limiting (daily per user)
- Zod request validation
- Sensitive data redaction in logs
- Razorpay HMAC signature verification
- Circuit breakers for fault tolerance

---

## 🚀 Installation

```bash
git clone <repository-url>
cd job_portal_application
```

---

## ⚙️ Environment Variables

```env
# Shared
PORT=
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
KAFKA_BROKER=
FRONTEND_URL=

# AI (Utils service)
GROQ_API_KEY=

# Payment service
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Log Admin
ADMIN_PASSWORD=
```

---

## ▶️ Running The Project

```bash
# Frontend
cd frontend && npm install && npm run dev

# API Gateway
cd api-gateway && npm install && npm run dev

# Services (each in separate terminal)
cd services/auth && npm install && npm run dev
cd services/user && npm install && npm run dev
cd services/job && npm install && npm run dev
cd services/payment && npm install && npm run dev
cd services/utils && npm install && npm run dev

# Log Admin Dashboard
cd services/log-admin && npm install && npm run dev
```

**Ports:**
| Service | Port |
|---|---|
| Frontend | 3000 |
| API Gateway | 8080 |
| Auth | 4000 |
| Utils | 5002 |
| User | 5003 |
| Job | 5004 |
| Payment | 5005 |
| Log Admin | 9000 |

---

## 🧠 Engineering Patterns

| Pattern | Implementation |
|---|---|
| Microservices | 6 independent services + gateway |
| API Gateway | Fastify reverse proxy with centralized auth |
| Clean Architecture | api → domain → infra → shared per service |
| Repository Pattern | DB abstraction layer (raw SQL) |
| Event-Driven | Kafka producers/consumers (fire-and-forget) |
| Circuit Breaker | opossum per downstream service |
| Rate Limiting | Redis INCR + EXPIRE (distributed) |
| Refresh Token Rotation | Old token invalidated on each refresh |
| Dependency Injection | Composition root wiring |
| Structured Logging | Winston JSON + daily rotation + correlation IDs |
| Polling Pattern | Frontend polls upload status until complete |
| HMAC Verification | Razorpay signature validation |

---

## 📊 Current Status

| Module | Status |
|---|---|
| Frontend (Next.js 15) | ✅ Stable |
| API Gateway (Fastify) | ✅ Stable |
| Auth Service | ✅ Stable |
| User Service | ✅ Stable |
| Job Service | ✅ Stable |
| Payment Service | ✅ Stable |
| Utils Service (AI + Kafka) | ✅ Stable |
| Winston Logging | ✅ All services |
| Log Admin Dashboard | ✅ Stable |
| Razorpay Integration | ✅ Working |
| AI Features (Groq) | ✅ Working |
| Kafka Consumers | ✅ Working |

---

## 🛣 Roadmap

- [ ] Docker Compose setup
- [ ] Kubernetes deployment
- [ ] Distributed tracing (OpenTelemetry)
- [ ] Dead Letter Queue (DLQ) for Kafka
- [ ] Service discovery
- [ ] WebSocket notifications
- [ ] Advanced search & filtering
- [ ] AI job matching & resume scoring

---

## 👨‍💻 Author

**Nikhil Singh**

Focused on distributed systems, scalable backend architecture, modern frontend engineering, AI-powered platform development, and production-grade system design.

---

<div align="center">

Built to demonstrate production-oriented software engineering — scalable architecture, async systems, AI integrations, payment infrastructure, structured observability, and modern frontend patterns.

⭐ Star this repo if you found it useful.

</div>
