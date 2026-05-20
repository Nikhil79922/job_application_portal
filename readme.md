# 🚀 AI-Powered Job Portal Platform

<div align="center">

## Production-Grade Full Stack Job Portal Platform

Scalable microservices-based platform built with distributed backend architecture, AI-powered workflows, asynchronous processing, and modern frontend engineering principles.

---

### Core Highlights

Microservices • API Gateway • AI Workflows • Kafka • Distributed Systems • Clean Architecture • Scalable Frontend • Production-Oriented Backend Engineering

</div>

---

# 📌 Table of Contents

- [Overview](#-overview)
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
- [Infrastructure](#-infrastructure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running The Project](#-running-the-project)
- [Engineering Decisions](#-engineering-decisions)
- [Advanced Concepts Used](#-advanced-concepts-used)
- [Current Status](#-current-status)
- [Roadmap](#-roadmap)
- [Design Philosophy](#-design-philosophy)

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

---

# 🤖 AI & Async Stack

| Technology | Purpose |
|---|---|
| Groq AI | Resume intelligence |
| Kafka Consumers | Background processing |
| Async Workers | Upload & email jobs |

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

---

# 📌 Features

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

# 📌 Internal Modules

## API Layer
- Controllers
- Routes
- DTO Validation

## Domain Layer
- Entities
- Interfaces
- Services

## Infrastructure Layer
- PostgreSQL Repositories
- Redis Integration
- Kafka Producer
- Token Service
- Password Service

## Shared Layer
- Middleware
- Error Handling
- Utilities
- Cron Jobs

---

# 👤 User Service

Handles job seeker workflows.

---

# 📌 Features

- Profile Management
- Resume Uploads
- Resume Status Tracking
- Skills Management
- Profile Picture Upload
- Apply For Jobs
- Application History
- Resume Polling

---

# 📌 Internal Features

- Migration System
- Kafka Producer
- Raw SQL Repositories
- Token Verification
- File Upload Status Tracking

---

# 💼 Job Service

Handles recruiter workflows and job management.

---

# 📌 Company Management

- Create Company
- Delete Company
- Company Detail View
- Company Logo Upload
- Company Polling System

---

# 📌 Job Management

- Create Jobs
- Update Jobs
- Active Job Listings
- Job Details
- Recruiter Dashboard

---

# 📌 Application Management

- Applicant Tracking
- Application Status Updates
- Recruiter Applicant Workflows

---

# 📌 Backend Features

- Raw SQL Queries
- Migration Runner
- Kafka Producer
- Token Verification
- Repository Pattern

---

# 🤖 Utils Service

Dedicated service for asynchronous and AI-powered workflows.

---

# 📌 AI Workflows

# 📄 Resume Analyzer

AI-powered resume analysis including:

- Skills Extraction
- Experience Analysis
- Resume Insights
- Improvement Suggestions
- Strength Identification
- Resume Recommendations

---

# 🧭 Career Guidance Engine

Provides:

- Personalized Learning Roadmaps
- Technology Recommendations
- Career Suggestions
- Growth Strategies
- Learning Paths

---

# 📌 Async Processing

- Email Processing
- Upload Processing
- Kafka Consumers
- AI Workflows
- Background Jobs

---

# 📌 Kafka Consumers

## Current Consumers

- Send Email Consumer
- Upload Processing Consumer

---

# ⚡ Async Processing

Kafka is used for asynchronous workflows.

---

# 📌 Event Flow

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

---

# 📌 Database Strategy

- PostgreSQL
- Raw SQL Queries
- Service-level Isolation
- Migration-based Schema Control
- No ORM Usage

---

# 📌 Migration System

Every service maintains its own migration runner.

---

# 📌 Features

- Version-controlled migrations
- Advisory locking
- Raw SQL migrations
- Service-level schema isolation

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

---

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

---

# 📌 Security Patterns

| Pattern | Purpose |
|---|---|
| Refresh Token Rotation | Session security |
| Distributed Rate Limiting | Abuse prevention |
| Middleware Isolation | Shared protection |
| Secure Cookies | Token protection |

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

# 📌 Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# 📌 Install API Gateway Dependencies

```bash
cd api-gateway
npm install
```

---

# 📌 Install Auth Service Dependencies

```bash
cd services/auth
npm install
```

---

# 📌 Install User Service Dependencies

```bash
cd ../user
npm install
```

---

# 📌 Install Job Service Dependencies

```bash
cd ../job
npm install
```

---

# 📌 Install Utils Service Dependencies

```bash
cd ../utils
npm install
```

---

# ⚙️ Environment Variables

Each service maintains its own `.env` configuration.

---

# 📌 Example

```env
PORT=

DATABASE_URL=
REDIS_URL=

JWT_SECRET=
JWT_REFRESH_SECRET=

KAFKA_BROKER=

GROQ_API_KEY=

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

---

# 📊 Current Status

| Module | Status |
|---|---|
| Frontend Authentication | ✅ Stable |
| Job Seeker Features | ✅ Stable |
| Recruiter Features | 🚧 In Progress |
| API Gateway | ✅ Stable |
| Auth Service | ✅ Stable |
| User Service | ✅ Stable |
| Job Service | 🚧 Active Development |
| AI Features | ✅ Working |
| Kafka Consumers | ⚠️ Partial |
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

Built by Nikhil Singh.

Focused on distributed systems, scalable backend architecture, modern frontend engineering, and AI-powered platform development.