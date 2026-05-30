# 🚀 AI-Powered Job Portal Platform

<div align="center">

<img src="https://img.shields.io/badge/Architecture-Microservices-10B981?style=for-the-badge" />
<img src="https://img.shields.io/badge/Frontend-Next.js_15-000000?style=for-the-badge&logo=nextdotjs" />
<img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql" />
<img src="https://img.shields.io/badge/Async-Kafka-231F20?style=for-the-badge&logo=apachekafka" />
<img src="https://img.shields.io/badge/AI-Groq-FF6B35?style=for-the-badge" />
<img src="https://img.shields.io/badge/Payments-Razorpay-0C2451?style=for-the-badge" />

---

# Production-Grade AI Job Portal Platform

Scalable microservices-based job portal platform built with distributed backend architecture, AI-powered workflows, asynchronous processing, payment infrastructure, and modern frontend engineering principles.

### ⚡ Core Highlights

Microservices • API Gateway • AI Workflows • Kafka • Razorpay • Distributed Systems • Clean Architecture • Scalable Frontend • Production-Oriented Backend Engineering

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
- [Payment Infrastructure](#-payment-infrastructure)
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
- Production-grade Payment Infrastructure
- Clean Architecture Principles
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

# 💳 Payment & Subscription Features

- Razorpay Checkout Integration
- Secure Subscription Activation
- Signature Verification
- Webhook-based Payment Handling
- Subscription Lifecycle Management
- Payment Audit Handling
- Payment Failure Recovery
- Expiry Tracking
- Production-safe Checkout UX
- Backend Payment Verification Service

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
      ┌────────────────────────┼────────────────────────┐
      ▼                        ▼                        ▼
┌──────────────┐      ┌──────────────┐        ┌──────────────┐
│ Auth Service │      │ User Service │        │ Job Service  │
└──────┬───────┘      └──────┬───────┘        └──────┬───────┘
       │                     │                       │
       └─────────────────────┼───────────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Payment Service │
                    │-----------------│
                    │ • Razorpay API  │
                    │ • Webhooks      │
                    │ • Verification  │
                    │ • Subscriptions │
                    │ • Audit Logs    │
                    └────────┬────────┘
                             │
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
| Backend Verification Service | Secure payment validation |
| Payment Audit Logs | Transaction tracking |
| Subscription Engine | Subscription lifecycle handling |

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
│   ├── payment/
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

# 💳 Payment Service

Dedicated backend service responsible for secure payment processing and subscription management.

## Features

- Razorpay Order Creation
- Payment Verification
- Signature Validation
- Subscription Activation
- Subscription Expiry Handling
- Webhook Verification
- Payment Audit Logs
- Transaction Validation
- Failure Handling & Retry Logic
- Secure Checkout Processing

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
- Subscription Events

---

# 🗄 Database Design

## Database Strategy

- PostgreSQL
- Raw SQL Queries
- Service-level Isolation
- Migration-based Schema Control
- No ORM Usage

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
- Payment Verification Layer
- Webhook Security Validation

---

# 💳 Payment Infrastructure

Premium subscription system integrated using Razorpay.

## Features

- Subscription Activation
- Secure Checkout
- Razorpay Webhooks
- Signature Verification
- Payment Audit Handling
- Payment Failure Handling
- Subscription Expiry Tracking
- Secure Backend Verification
- Transaction Validation
- Production-safe Checkout Architecture

---

# 🚀 Installation

## Clone Repository

```bash
git clone <repository-url>
cd job_portal_application
```

---

# ▶️ Running The Project

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Gateway

```bash
cd api-gateway
npm install
npm run dev
```

## Auth Service

```bash
cd services/auth
npm install
npm run dev
```

## User Service

```bash
cd services/user
npm install
npm run dev
```

## Job Service

```bash
cd services/job
npm install
npm run dev
```

## Payment Service

```bash
cd services/payment
npm install
npm run dev
```

## Utils Service

```bash
cd services/utils
npm install
npm run dev
```

---

# ⚙️ Environment Variables

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
RAZORPAY_WEBHOOK_SECRET=

FRONTEND_URL=
```

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
- Payment Verification Pipelines
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
| Payment Service | ✅ Stable |
| AI Features | ✅ Working |
| Kafka Consumers | ✅ Working |
| Razorpay Integration | ✅ Working |
| AWS Deployment | 🚧 Planned |

---

# 🛣 Roadmap

## Backend

- [ ] Distributed tracing
- [ ] OpenTelemetry integration
- [ ] Dead Letter Queue (DLQ)
- [ ] Kafka retry pipelines
- [ ] Docker Compose setup
- [ ] Kubernetes deployment
- [ ] Service discovery
- [ ] Redis caching layer

---

## Frontend

- [ ] Recruiter analytics dashboard
- [ ] Real-time notifications
- [ ] WebSocket integration
- [ ] Advanced search & filtering
- [ ] Better mobile optimization

---

## AI Features

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

This project was built to demonstrate production-oriented software engineering concepts including scalable architecture, asynchronous systems, AI integrations, distributed workflows, payment infrastructure, and modern frontend engineering practices.

If you found this project useful, consider giving it a ⭐ on GitHub.
