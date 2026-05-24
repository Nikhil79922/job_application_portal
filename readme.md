# 🚀 AI-Powered Job Portal Platform

<div align="center">

<img src="https://img.shields.io/badge/Architecture-Microservices-10B981?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-Next.js_15-000000?style=for-the-badge&logo=nextdotjs" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Async-Kafka-231F20?style=for-the-badge&logo=apachekafka" />
<img src="https://img.shields.io/badge/AI-Groq-FF6B35?style=for-the-badge" />

---

# Production-Grade AI Job Portal Platform

Scalable microservices-based job portal platform built with distributed backend architecture, AI-powered workflows, asynchronous processing, and modern frontend engineering principles.

### ⚡ Core Highlights

Microservices • API Gateway • AI Workflows • Kafka • Distributed Systems • Clean Architecture • Scalable Frontend • Production-Oriented Backend Engineering

</div>

---

# 📌 Table of Contents

- [Overview](#-overview)
- [Live Features](#-live-features)
- [Architecture](#-architecture)
- [System Design](#-system-design)
- [Tech Stack](#-tech-stack)
- [Monorepo Structure](#-monorepo-structure)
- [Frontend Architecture](#-frontend-architecture)
- [API Gateway](#-api-gateway)
- [Backend Microservices](#-backend-microservices)
- [AI Features](#-ai-features)
- [Async Processing](#-async-processing)
- [Database Design](#-database-design)
- [Authentication & Security](#-authentication--security)
- [Payment Integration](#-payment-integration)
- [Infrastructure](#-infrastructure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running The Project](#-running-the-project)
- [Engineering Decisions](#-engineering-decisions)
- [Advanced Concepts Used](#-advanced-concepts-used)
- [Current Status](#-current-status)
- [Roadmap](#-roadmap)
- [Design Philosophy](#-design-philosophy)
- [Author](#-author)

---

# 🧠 Overview

This platform is designed to simulate a real-world scalable distributed engineering system rather than a simple CRUD application.

The project combines:

- Scalable Microservices Architecture
- API Gateway Pattern
- Distributed Authentication
- AI-powered Resume Intelligence
- Event-driven Workflows
- Kafka-based Async Processing
- Clean Architecture Principles
- Production-oriented Backend Engineering
- Modern Frontend Architecture
- Domain Separation & Service Isolation

---

# ✨ Live Features

# 👨‍💻 Job Seeker Features

- Secure Authentication
- AI Resume Analysis
- AI Career Guidance
- Resume Upload & Tracking
- Skills Management
- Profile Completion Tracking
- Premium Subscription System
- Razorpay Payment Integration
- Dynamic Resume Polling
- Responsive Dashboard
- Job Applications
- Application History

---

# 🏢 Recruiter Features

- Recruiter Workspace
- Company Management
- Job Creation
- Applicant Tracking
- Recruiter Dashboard
- Candidate Workflow Management
- Company Logo Upload
- Protected Recruiter Routes

---

# 🤖 AI Features

- Resume Intelligence
- Skills Extraction
- Experience Analysis
- Resume Suggestions
- Career Guidance Engine
- Personalized Learning Roadmaps
- Technology Recommendations
- AI-driven Resume Insights

---

# ⚡ Async Processing Features

- Kafka-based Event Processing
- Upload Processing Workers
- Email Processing Workers
- Background Resume Processing
- Retry-safe Consumer Handling
- Polling-based Status Updates

---

# 🏗 Architecture

```text
                            ┌─────────────────────┐
                            │     Frontend        │
                            │     Next.js App     │
                            └──────────┬──────────┘
                                       │
                                       ▼
                    ┌─────────────────────────────────┐
                    │          API Gateway            │
                    │---------------------------------│
                    │ • JWT Authentication            │
                    │ • Redis Rate Limiting           │
                    │ • Reverse Proxy                 │
                    │ • Circuit Breakers              │
                    │ • Request Routing               │
                    │ • Logging & Middleware          │
                    └──────────┬──────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Auth Service │      │ User Service │      │ Job Service  │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             ▼
                    ┌─────────────────┐
                    │  Utils Service  │
                    │-----------------│
                    │ • Kafka Consumer│
                    │ • AI Workflows  │
                    │ • Upload Worker │
                    │ • Email Worker  │
                    └────────┬────────┘
                             │
                             ▼
               ┌──────────────────────────┐
               │ Infrastructure Layer     │
               │--------------------------│
               │ PostgreSQL               │
               │ Redis                    │
               │ Kafka                    │
               │ Groq AI                  │
               │ Razorpay                 │
               └──────────────────────────┘
```

---

# 🧩 System Design

## Architectural Patterns

| Pattern | Purpose |
|---|---|
| Microservices Architecture | Independent scalability |
| API Gateway Pattern | Centralized control & routing |
| Clean Architecture | Better maintainability |
| Repository Pattern | Database abstraction |
| Event-driven Architecture | Async workflows |
| Dependency Injection | Loose coupling |
| Circuit Breaker Pattern | Fault tolerance |
| Distributed Rate Limiting | Security & abuse prevention |

---

# ⚙️ Tech Stack

# 🌐 Frontend Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Frontend framework |
| React | UI rendering |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Global state |
| TanStack Query | Server state |
| Axios | API communication |
| ShadCN UI | Reusable UI components |
| Framer Motion | Animations |
| Lucide React | Icons |

---

# 🔧 Backend Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Fastify | API Gateway |
| Express.js | Microservices |
| TypeScript | Type safety |
| PostgreSQL | Primary database |
| Redis | Rate limiting & caching |
| Kafka | Async event processing |
| Zod | Validation |
| JWT | Authentication |

---

# 🤖 AI & Async Stack

| Technology | Purpose |
|---|---|
| Groq AI | Resume intelligence |
| Kafka Consumers | Background processing |
| Async Workers | Upload & email jobs |

---

# 💳 Payment Stack

| Technology | Purpose |
|---|---|
| Razorpay | Subscription payments |
| Webhooks | Payment verification |
| Signature Validation | Payment security |

---

# ☁️ Infrastructure Stack

| Technology | Purpose |
|---|---|
| Neon PostgreSQL | Cloud database |
| Upstash Redis | Managed Redis |
| Docker | Containerization (planned) |
| AWS | Cloud deployment (planned) |

---

# 📁 Monorepo Structure

```bash
job_portal_application/
│
├── api-gateway/
│
├── frontend/
│
├── services/
│   ├── auth/
│   ├── user/
│   ├── job/
│   └── utils/
│
└── README.md
```

---

# 🌐 Frontend Architecture

Frontend is built using Next.js App Router with modular feature-based architecture.

---

# 📌 Frontend Features

# 🔐 Authentication

- Login
- Register
- Forgot Password
- Reset Password
- Session Restoration
- Protected Routes
- Auth Guards
- Role Guards

---

# 👤 Job Seeker Features

- Profile Management
- Resume Upload
- Resume Tracking
- Skills Management
- Job Applications
- Application History
- AI Resume Analysis
- AI Career Guidance
- Subscription Management

---

# 🏢 Recruiter Features

- Recruiter Dashboard
- Company Management
- Company Logo Upload
- Applicant Tracking
- Recruiter Workspace
- Job Management

---

# 🎨 Shared Features

- Dark / Light Theme
- Dynamic Loaders
- Protected Routes
- Responsive Design
- Dynamic Modals
- Polling-based Updates
- Reusable Components
- Smooth UI Animations

---

# 🧠 Frontend Architecture Patterns

| Pattern | Usage |
|---|---|
| Feature-based Architecture | Modular scalability |
| React Query | Server-state management |
| Zustand | Global auth management |
| Service Layer | API abstraction |
| Hooks-based Logic | Reusable business logic |
| Component Isolation | Better maintainability |

---

# 🌐 API Gateway

The API Gateway acts as the centralized entry point for all requests.

---

# 📌 Responsibilities

| Responsibility | Description |
|---|---|
| JWT Authentication | Centralized auth verification |
| Reverse Proxy | Request forwarding |
| Rate Limiting | Redis-based distributed limiting |
| Logging | Structured request logging |
| Circuit Breakers | Fault tolerance |
| Middleware Handling | Shared middleware layer |
| Request Routing | Service communication |

---

# 📌 Gateway Stack

- Fastify
- Redis
- Pino Logger
- Fastify HTTP Proxy

---

# 📌 Gateway Features

- Streaming Proxy
- Request Interception
- Auth Middleware
- AI Quota Middleware
- Circuit Breakers
- Shared Error Handling
- Distributed Rate Limiting

---

# 🧩 Backend Microservices

Every service follows Clean Architecture principles.

```text
api/
domain/
infra/
shared/
composition-root/
```

---

# 🔐 Auth Service

Handles all authentication workflows.

## Features

- User Registration
- User Login
- Refresh Token Rotation
- Forgot Password
- Reset Password
- Secure Logout
- Device Tracking
- Session Management
- JWT Authentication
- Redis Rate Limiting

---

# 👤 User Service

Handles job seeker workflows.

## Features

- Profile Management
- Resume Uploads
- Resume Status Tracking
- Skills Management
- Profile Picture Upload
- Apply For Jobs
- Application History
- Resume Polling
- Subscription Management

---

# 💼 Job Service

Handles recruiter workflows and job management.

## Features

- Company Management
- Create Jobs
- Update Jobs
- Active Listings
- Recruiter Dashboard
- Applicant Tracking
- Recruiter Workflows

---

# 🤖 Utils Service

Dedicated service for asynchronous and AI-powered workflows.

## Features

- Kafka Consumers
- Resume Analysis
- Upload Processing
- Email Workers
- AI Workflows
- Background Jobs

---

# ⚡ Async Processing

Kafka is used for asynchronous workflows.

## Event Flow

```text
Producer
   ↓
Kafka Topic
   ↓
Consumer
   ↓
Background Processing
```

---

# 📌 Current Use Cases

- Resume Processing
- Email Processing
- Upload Handling
- AI Workflows
- Background Jobs

---

# 🗄 Database Design

## Database Strategy

- PostgreSQL
- Raw SQL Queries
- Service-level Isolation
- Migration-based Schema Control
- No ORM Usage

---

# 📌 Database Design Principles

| Principle | Purpose |
|---|---|
| Raw SQL | Better query control |
| Service Isolation | Independent scalability |
| Migration Versioning | Controlled schema evolution |
| Strong Constraints | Data integrity |

---

# 🛡 Authentication & Security

# 📌 Authentication Security

- JWT Access Tokens
- Refresh Token Rotation
- Secure Cookie Handling
- Route Protection
- Device Tracking

---

# 📌 Infrastructure Security

- Redis Rate Limiting
- Request Validation using Zod
- Structured Error Handling
- Internal API Protection
- Service Isolation
- Razorpay Signature Validation

---

# 💳 Payment Integration

Premium subscription system integrated using Razorpay.

## Features

- Subscription Activation
- Secure Checkout
- Razorpay Webhooks
- Signature Verification
- Payment Audit Handling
- Payment Failure Handling
- Subscription Expiry Tracking

---

# ☁️ Infrastructure

# 📌 Current Infrastructure

| Service | Provider |
|---|---|
| PostgreSQL | Neon |
| Redis | Upstash |

---

# 📌 Planned Infrastructure

| Service | Status |
|---|---|
| Dockerization | Planned |
| Kubernetes | Planned |
| AWS Deployment | Planned |
| CI/CD | Planned |

---

# 🚀 Installation

# 📌 Clone Repository

```bash
git clone <repository-url>
cd job_portal_application
```

---

# 📌 Install Dependencies

## Frontend

```bash
cd frontend
npm install
```

## API Gateway

```bash
cd api-gateway
npm install
```

## Auth Service

```bash
cd services/auth
npm install
```

## User Service

```bash
cd ../user
npm install
```

## Job Service

```bash
cd ../job
npm install
```

## Utils Service

```bash
cd ../utils
npm install
```

---

# ⚙️ Environment Variables

Each service maintains its own `.env` configuration.

## Example

```env
PORT=

DATABASE_URL=
REDIS_URL=

JWT_SECRET=
JWT_REFRESH_SECRET=

KAFKA_BROKER=

GROQ_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

FRONTEND_URL=
```

---

# ▶️ Running The Project

# 📌 Start Frontend

```bash
cd frontend
npm run dev
```

---

# 📌 Start API Gateway

```bash
cd api-gateway
npm run dev
```

---

# 📌 Start Services

Run each service individually.

```bash
npm run dev
```

---

# 🧠 Engineering Decisions

| Decision | Reason |
|---|---|
| Microservices Architecture | Independent scalability |
| API Gateway | Centralized control |
| Raw SQL | Predictable database behavior |
| Kafka | Async workflows |
| Clean Architecture | Long-term maintainability |
| Dedicated Utils Service | AI workload isolation |
| Service Isolation | Independent deployments |

---

# 🔥 Advanced Concepts Used

- Microservices Architecture
- API Gateway Pattern
- Circuit Breaker Pattern
- Distributed Rate Limiting
- Event-driven Architecture
- Kafka Consumers
- Dependency Injection
- Repository Pattern
- Clean Architecture
- Domain-driven Structure
- Refresh Token Rotation
- Async Workflow Isolation
- Razorpay Integration
- Background Workers

---

# 📊 Current Status

| Module | Status |
|---|---|
| Frontend Authentication | ✅ Stable |
| Job Seeker Features | ✅ Stable |
| Recruiter Features | ✅ Stable |
| API Gateway | ✅ Stable |
| Auth Service | ✅ Stable |
| User Service | ✅ Stable |
| Job Service | ✅ Stable |
| AI Features | ✅ Working |
| Kafka Consumers | ✅ Working |
| Razorpay Integration | ✅ Stable |
| Dockerization | 🚧 Planned |
| AWS Deployment | 🚧 Planned |

---

# 🛣 Roadmap

# Backend

- [ ] Distributed tracing
- [ ] OpenTelemetry integration
- [ ] Dead Letter Queue (DLQ)
- [ ] Kafka retry pipelines
- [ ] Docker Compose setup
- [ ] Kubernetes deployment
- [ ] Service discovery
- [ ] Redis caching layer

---

# Frontend

- [ ] Recruiter analytics dashboard
- [ ] Real-time notifications
- [ ] WebSocket integration
- [ ] Advanced search & filtering
- [ ] Better mobile optimization

---

# AI Features

- [ ] AI Job Matching
- [ ] Resume Scoring
- [ ] Interview Preparation Assistant
- [ ] AI-generated Cover Letters

---

# 🧠 Design Philosophy

This platform is designed to reflect a real-world scalable engineering system rather than a simple CRUD application.

The focus areas are:

- Scalability
- Maintainability
- Service Isolation
- AI Integration
- Async Workflows
- Production-oriented Backend Patterns
- Modern Frontend Architecture

---

# 👨‍💻 Author

## Nikhil Singh

Focused on:

- Distributed Systems
- Scalable Backend Architecture
- Modern Frontend Engineering
- AI-powered Platform Development
- Microservices Engineering
- Production-grade System Design

---

# ⭐ Final Note

This project was built to demonstrate production-oriented software engineering concepts including scalable architecture, asynchronous systems, AI integrations, distributed workflows, and modern frontend engineering practices.

If you found this project useful, consider giving it a ⭐ on GitHub.