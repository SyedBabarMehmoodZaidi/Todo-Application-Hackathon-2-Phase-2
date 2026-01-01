<!--
SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: None (existing principles aligned with user input)
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/phr-template.prompt.md ✅ updated
Runtime docs requiring updates:
  - README.md ⚠ pending
Follow-up TODOs: None
-->

# Phase II – Full-Stack Multi-User Todo Web Application Constitution

## Core Principles

### I. Spec-Driven Development
Every feature MUST be traceable to written specifications. The development flow follows:
specification → plan → tasks → implementation. No feature may be implemented without prior
written specification.

### II. No Manual Coding
All implementation MUST be performed via Claude Code. Manual coding is prohibited. This
ensures consistency, traceability, and that all changes are AI-mediated for quality control.

### III. Security-First Design
Authentication and user data isolation MUST be enforced by default. The backend MUST enforce
user-level data isolation for all resources. Authentication MUST be stateless using JWT tokens.

### IV. Clean Architecture
The system MUST maintain clear separation of concerns between frontend and backend.
Frontend and backend MUST communicate via REST API only.

### V. Reproducibility
The project MUST be runnable locally by judges using documented commands. All dependencies,
configuration, and setup instructions MUST be captured in documentation.

### VI. Standardized APIs
REST APIs MUST follow standard HTTP semantics including proper HTTP methods, status codes,
and response formats.

## Additional Constraints

### Authentication Requirements
- JWT-based stateless authentication
- End-to-end authentication flow: signup → login → protected API
- Token issuance and expiry handling
- Authorization header parsing and signature verification

### Data Isolation
- Each user MUST only see and access their own tasks
- Query-level data filtering by user ID
- Ownership validation checks on all operations
- Forbidden access handling for unauthorized requests

### Frontend Requirements
- Responsive and usable interface
- Safe API communication via centralized client
- JWT token attachment to headers
- Async data fetching patterns with error boundary handling

## Development Workflow

### Code Quality Standards
- Request/Response schemas MUST use Pydantic models
- HTTP status codes MUST follow conventions
- Error handling MUST use consistent response format
- CRUD operations MUST follow templates

### Database Standards
- SQLModel table definitions for persistence
- Foreign key relationships properly defined
- Indexing strategy for performance
- Timestamp management for audits

### Testing Requirements
- Feature-level validation against specifications
- API response verification
- Authentication flow testing
- Edge case handling

## Technical Standards

### Frontend Technology Stack
- Next.js 16+ with App Router
- Client-side state management
- Responsive design principles
- Component-based architecture

### Backend Technology Stack
- Python FastAPI framework
- SQLModel ORM for database operations
- Neon Serverless PostgreSQL for persistence
- Better Auth for JWT-based authentication

### Security Requirements
- All API endpoints require valid JWT token
- JWT signature verification on backend
- User ID derived from JWT, not client input
- Tasks filtered by authenticated user
- Unauthorized requests return HTTP 401

### Data Constraints
- Tasks persisted in PostgreSQL
- Each task belongs to exactly one user
- No cross-user data access permitted
- In-memory storage not allowed in Phase II

### Development Workflow Constraints
- All changes must start with updating specs
- Claude Code must reference specs using @specs/ paths
- No direct edits without spec justification

## Governance

This constitution supersedes all other practices. Amendments require documentation of rationale
and, where applicable, a migration plan. All code changes MUST verify compliance with these
principles.

**Version**: 1.1.0 | **Ratified**: 2025-01-01 | **Last Amended**: 2026-01-01