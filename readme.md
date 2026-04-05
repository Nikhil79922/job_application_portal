# 🚀 Job Portal Application (Microservices Backend)

A scalable and production-ready **Job Portal Backend System** built using **Node.js, TypeScript, PostgreSQL**, and a **Microservices Architecture with an API Gateway**.

This project follows **Clean Architecture principles** and implements **real-world backend patterns** like centralized authentication, rate limiting, and service orchestration.

---

## 🧠 Overview

This system is designed to handle:

- 👤 User Management (Profile, Skills, Resume)
- 🔐 Authentication & Authorization (JWT, Refresh Tokens)
- 🏢 Company Management (Recruiters)
- 💼 Job Management (Creation, Listings)
- 📄 Applications System (Apply, Track Status)
- 📦 File Upload System (Resume, Profile Pic, Logos)
- ⚡ Async Processing (Kafka - partial)
- 🌐 API Gateway (Routing, Auth, Rate Limiting)

---

## 🏗️ Architecture

This project follows a **Microservices + API Gateway + Clean Architecture** approach:

Client
↓
API Gateway (Fastify)
├── Rate Limiting (Redis)
├── JWT Authentication
├── Request Logging
├── Reverse Proxy (Streaming)
↓
| Auth Service (Node.js) |
| User Service (Node.js) |
| Job Service (Node.js) |

↓
PostgreSQL / Redis / Kafka

---

## 🌐 API Gateway

A dedicated **API Gateway layer** built using **Fastify**.

### Responsibilities:

- Centralized **JWT Authentication**
- **Redis-based Rate Limiting**
- **Streaming Reverse Proxy** (`@fastify/http-proxy`)
- Request logging (Pino)
- Error handling standardization

### Why this matters:

- Services remain **clean and independent**
- Security handled at one place
- Prevents overload using rate limiting
- Production-level request routing

---

## ⚙️ Tech Stack

### Core

- **Backend:** Node.js, TypeScript
- **Gateway:** Fastify
- **Database:** PostgreSQL
- **Caching / Rate Limit:** Redis
- **Messaging:** Kafka (partial)
- **Validation:** Zod
- **Auth:** JWT + Refresh Tokens

---

## 📦 Services Breakdown

### 🔐 Auth Service

- Login / Register
- Refresh Token Rotation
- Password Reset
- Device Tracking
- Service-level rate limiting

---

### 👤 User Service

- Profile Management
- Resume Upload
- Skills Management
- Profile Picture Upload

---

### 💼 Job Service

- Company Management
- Job Creation & Listing (WIP)
- Application System (WIP)
- Async file handling with retry

---

## 📁 Project Structure

api-gateway/ → API Gateway (Fastify)
services/
├── auth/
├── user/
├── job/
frontend/ → (Planned)


### Features:

- Foreign key constraints
- ENUM-based statuses
- Unique constraints
- Custom migration system

---

## 🔄 Migration System

Custom SQL-based migration runner:

- Version-controlled migrations
- Service-level isolation
- No ORM dependency

---

## 🔥 Key Features

- API Gateway with centralized control
- Redis-backed rate limiting (distributed)
- JWT authentication at gateway level
- Streaming proxy (no request mutation)
- Clean Architecture (API → Domain → Infra)
- Structured logging (Pino)
- Scalable microservices design

---

## 🚧 Current Status

| Module        | Status         |
|--------------|--------------|
| API Gateway  | ✅ Completed   |
| Auth Service | ✅ Completed   |
| User Service | ✅ Completed   |
| Companies    | ✅ Completed   |
| Jobs         | 🚧 In Progress |
| Applications | 🚧 In Progress |
| Kafka Flow   | ⚠️ Partial     |
| Frontend     | ❌ Pending     |

---

## ⚠️ Planned Improvements

- Circuit Breaker (resilience layer)
- Request tracing (x-request-id)
- Redis caching layer
- Role-based access control (RBAC)
- Kafka consumers (async workflows)
- Docker + Nginx setup
- AWS deployment

---

## 🚀 Getting Started

### 1. Clone repo

```bash
git clone <repo-url>
cd job_portal_application

cd api-gateway && npm install

cd ../services/auth && npm install
cd ../user && npm install
cd ../job && npm install