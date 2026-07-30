# BankSarthi architecture review and implementation plan

## Document review findings
- The PRD and TRD describe a personal finance and education product with auth, CSV ingestion, budgeting, quizzes, health score, and AI chat. The schema and notes add missing persistence for upload jobs, budgets, audit logs, consents, and prompt templates.
- The TRD’s ADR-003 recommends JWT in localStorage, which conflicts with the stronger security posture expected for a finance app. The implementation uses httpOnly cookies with CSRF protection instead.
- The schema uses Argon2id-compatible password hashes, but the implementation uses a placeholder. The production version should use Argon2id via a dedicated password hashing service.
- The documents mention AI chat and voice flows, but no production storage or moderation strategy is defined. The implementation includes prompt versioning, request logging, and a moderation boundary.

## Target architecture
- Frontend: React + TypeScript + Vite + TanStack Router + Zustand
- Backend: FastAPI modular monolith with domain-driven modules for auth, finance, quiz, and chat
- Database: PostgreSQL with migrations and indexes
- Cache: Redis for session/caching
- Storage: object storage for uploads and exports
- Observability: OpenTelemetry + Prometheus + Grafana + Sentry
- Deployment: Docker Compose for local, Kubernetes for prod, GitHub Actions for CI/CD

## Folder structure
- backend/ — API server, domain modules, infrastructure, presentation routes
- frontend/ — React app, pages, components, hooks, services
- database/ — schema, migrations, seed data
- infra/ — Terraform, Kubernetes manifests, environment templates
- docs/ — architecture, runbooks, API docs
- tests/ — unit, integration, and e2e suites

## Milestones
1. Sprint 0 — infrastructure and CI/CD
2. Sprint 1 — authentication and onboarding
3. Sprint 2 — core finance features and CSV ingestion
4. Sprint 3 — AI chat and moderation
5. Sprint 4 — dashboards and quiz modules
6. Sprint 5 — testing, security hardening, and performance tuning
7. Sprint 6 — deployment and rollback readiness

## Effort estimate
- Sprint 0: 2 weeks
- Sprint 1: 2 weeks
- Sprint 2: 3 weeks
- Sprint 3: 2 weeks
- Sprint 4: 2 weeks
- Sprint 5: 2 weeks
- Sprint 6: 1 week
