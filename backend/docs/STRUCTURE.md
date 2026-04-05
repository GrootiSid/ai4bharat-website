# AI4Bharat Backend Infrastructure & API Design

This document outlines the proposed backend architecture, folder structure, and API requirements for the AI4Bharat platform based on current frontend capabilities.

## 1. Project Overview
AI4Bharat is an autonomous engineering intelligence platform. The backend must handle high-concurrency requests, secure authentication, and provide a robust API for the AI-driven remediation engine.

## 2. Core Modules & Backend Requirements

### A. Authentication & User Management
Currently, the frontend has placeholders for:
- **Sign In**: `src/app/signin/page.tsx`
- **Sign Up**: `src/app/signup/page.tsx`
- **Password Reset**: Integrated in the Sign In page.
- **Social Auth**: Google and GitHub placeholders are present.

**Backend Tasks:**
- JWT-based session management.
- Secure password hashing (Bcrypt/Argon2).
- Email verification & password reset flows.
- OAuth2 integration for Google/GitHub.

### B. Strategic Briefing & Contact Forms
- **Briefing Request**: `src/app/briefing/page.tsx` (Currently uses `api/briefing/route.ts` with Web3Forms).
- **Contact Us**: `src/app/contact/page.tsx`.

**Backend Tasks:**
- Internal CRM integration or direct database logging for leads.
- Rate limiting to prevent form spam.
- Email notification system (AWS SES / SendGrid).

### C. Autonomous Remediation Engine (Core Feature)
- **Terminal Simulation**: `src/components/Terminal.tsx`.
- **Code Diff Analysis**: `src/components/CodeDiff.tsx`.

**Backend Tasks:**
- Real-time WebSocket or Server-Sent Events (SSE) for "Live" terminal updates.
- Sandbox environments for vulnerability analysis (simulated or real).
- Integration with LLMs (Gemini/OpenAI) for reconciliation logic generation.

### D. Content & Resources
- **Blog**: `src/app/blog/page.tsx`.
- **Documentation**: `src/app/documentation/page.tsx`.
- **Changelog**: `src/app/changelog/page.tsx`.

**Backend Tasks:**
- CMS integration (Headless CMS like Strapi or Contentful).
- Search API using Fuse.js or Elasticsearch for documentation.

---

## 3. Proposed Folder Structure (Microservices / Modular Monolith)

We recommend a **Node.js (Express/Fastify)** or **Python (FastAPI)** backend structured as follows:

```text
backend/
├── src/
│   ├── api/                # API Route handlers
│   │   ├── auth/           # Login, Register, OAuth, Sessions
│   │   ├── users/          # Profile management, Permissions
│   │   ├── intelligence/   # AI Remediation engine logic
│   │   ├── forms/          # Briefing, Contact, Support
│   │   └── content/        # Blog, Docs, Changelog (from CMS)
│   ├── core/               # Shared business logic & services
│   │   ├── ai/             # LLM orchestration (Gemini/GPT)
│   │   ├── mail/           # Email service wrappers
│   │   └── security/       # Middleware (JWT, Rate Limiting, CORS)
│   ├── data/               # Data access layer
│   │   ├── models/         # Database schemas (Prisma/Mongoose)
│   │   └── repositories/   # CRUD operations
│   ├── config/             # Environment variables & constants
│   ├── utils/              # Shared helper functions
│   └── app.ts              # Entry point
├── tests/                  # Unit & Integration tests
├── scripts/                # Database migrations & seeds
├── .env.example            # Environment template
├── docker-compose.yml      # Infrastructure (Redis, Postgres, etc.)
└── README.md               # Backend setup instructions
```

## 4. Database Schema Recommendations

- **Users**: `id, email, password_hash, full_name, company, role, created_at`.
- **RemediationLogs**: `id, user_id, vulnerability_type, code_before, code_after, status, timestamp`.
- **Leads**: `id, name, email, company, industry, interest_level, message, source`.

## 5. Security Strategy
- **CORS**: Restricted to `ai4bharat.next` domains.
- **Rate Limiting**: Applied to all `/api/auth` and `/api/forms` endpoints.
- **Encryption**: TLS for all traffic; AES-256 for sensitive data at rest.
- **Audit Logs**: Tracking all AI-generated code changes for compliance.
