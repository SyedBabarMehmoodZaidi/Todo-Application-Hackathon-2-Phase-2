---
id: "002"
title: "update-constitution"
stage: "constitution"
date: "2026-01-01"
surface: "agent"
model: "sonnet-4.5-20250929"
feature: "none"
branch: "main"
user: "User"
command: "/sp.constitution Project: Phase II – Full-Stack Multi-User Todo Web Application Core principles: - Spec-driven development (spec → plan → tasks → implement) - No manual coding (all implementation via Claude Code) - Security-first design (authentication and user isolation by default) - Clean architecture with clear separation of concerns - Reproducibility (project can be run locally by judges) Key standards: - All features must trace back to written specs - Backend must enforce user-level data isolation - Authentication must be stateless using JWT tokens - REST APIs must follow standard HTTP semantics - Frontend and backend must communicate only via defined API contracts Technical constraints: - Frontend: Next.js 16+ (App Router) - Backend: Python FastAPI - ORM: SQLModel - Database: Neon Serverless PostgreSQL - Authentication: Better Auth (JWT-based) - Spec system: Spec-Kit Plus + Claude Code - Repository structure: Monorepo (frontend + backend) Security requirements: - All API endpoints require valid JWT token - JWT signature must be verified on backend - User ID must be derived from JWT, not trusted from client input - Tasks must always be filtered by authenticated user - Unauthorized requests must return HTTP 401 Data constraints: - Tasks are persisted in PostgreSQL - Each task belongs to exactly one user - No cross-user data access is permitted - In-memory storage is not allowed in Phase II Development workflow constraints: - All changes must start with updating specs - Claude Code must reference specs using @specs/ paths - CLAUDE.md files define implementation rules at each level - No direct edits without spec justification Success criteria: - Multi-user todo app with persistent storage - All CRUD operations work via REST API - Frontend is responsive and usable - Authentication works end-to-end (signup → login → protected API) - Each user only sees their own tasks - Project can be run locally using documented commands"
labels: [constitution,project-update]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - ".specify/memory/constitution.md"
tests:
  - "null"
---

## Prompt

/sp.constitution Project: Phase II – Full-Stack Multi-User Todo Web Application

Core principles:
- Spec-driven development (spec → plan → tasks → implement)
- No manual coding (all implementation via Claude Code)
- Security-first design (authentication and user isolation by default)
- Clean architecture with clear separation of concerns
- Reproducibility (project can be run locally by judges)

Key standards:
- All features must trace back to written specs
- Backend must enforce user-level data isolation
- Authentication must be stateless using JWT tokens
- REST APIs must follow standard HTTP semantics
- Frontend and backend must communicate only via defined API contracts

Technical constraints:
- Frontend: Next.js 16+ (App Router)
- Backend: Python FastAPI
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT-based)
- Spec system: Spec-Kit Plus + Claude Code
- Repository structure: Monorepo (frontend + backend)

Security requirements:
- All API endpoints require valid JWT token
- JWT signature must be verified on backend
- User ID must be derived from JWT, not trusted from client input
- Tasks must always be filtered by authenticated user
- Unauthorized requests must return HTTP 401

Data constraints:
- Tasks are persisted in PostgreSQL
- Each task belongs to exactly one user
- No cross-user data access is permitted
- In-memory storage is not allowed in Phase II

Development workflow constraints:
- All changes must start with updating specs
- Claude Code must reference specs using @specs/ paths
- CLAUDE.md files define implementation rules at each level
- No direct edits without spec justification

Success criteria:
- Multi-user todo app with persistent storage
- All CRUD operations work via REST API
- Frontend is responsive and usable
- Authentication works end-to-end (signup → login → protected API)
- Each user only sees their own tasks
- Project can be run locally using documented commands

## Response snapshot

Updated project constitution at `.specify/memory/constitution.md` to version 1.1.0, incorporating additional technical standards and constraints from the user input. Added comprehensive sections covering technology stack, security requirements, data constraints, and development workflow constraints. Included a sync impact report at the top of the file documenting the changes made. The updated constitution now fully reflects all the requirements and constraints specified in the user input.

## Outcome

- ✅ Impact: Updated constitution to include detailed technical standards and constraints for Phase II Todo Application
- 🧪 Tests: Not applicable
- 📁 Files: 1 updated (.specify/memory/constitution.md)
- 🔁 Next prompts: Proceed with feature specification based on updated constitution
- 🧠 Reflection: Constitution now provides comprehensive governance framework with detailed technical requirements

## Evaluation notes (flywheel)

- Failure modes observed: "null"
- Graders run and results (PASS/FAIL): "null"
- Prompt variant (if applicable): "null"
- Next experiment (smallest change to try): "null"