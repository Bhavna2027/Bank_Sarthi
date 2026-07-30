# BankSarthi

BankSarthi is a production-ready personal finance and financial literacy platform designed specifically for Indian users. The platform combines real-time spending analytics, AI-assisted financial guidance, gamified financial education, and budget management into a single cohesive product.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)

---

## Features

### Finance Management
- **Dashboard** — Real-time overview of income, expenses, and savings with interactive charts (Area, Bar, Pie) powered by Recharts.
- **Transaction Tracking** — Log and categorize debit and credit transactions with merchant tagging and recurring transaction detection.
- **Budget Management** — Set monthly limits per category (Food, Shopping, Entertainment, Utilities, etc.) and track spending against limits in real time.
- **Analytics** — Time-series analysis of spending patterns across weekly, monthly, and yearly views with downloadable reports.

### Financial Literacy
- **Bankopedia** — A searchable encyclopedia of banking and financial terms with category filtering and bookmarking.
- **Quizzes** — Gamified financial literacy quizzes with an XP reward system to incentivize user learning. Users earn points for correct answers and track progression.

### AI and Voice
- **Voice Assistant** — Conversational AI interface to ask finance-related questions in natural language, providing personalized guidance.

### Design and Accessibility
- **70-Point Design System** — Consistent design tokens covering color palettes, typography, spacing, border radii, shadows, and animation curves.
- **11 Core UI Components** — Button, Card, Input, Badge, Progress, Avatar, Alert, Divider, Spinner, Skeleton, Pill — all built with Vanilla CSS.
- **Responsive Layout** — Six breakpoints spanning 320px to 1536px for full device coverage.
- **WCAG AA Compliance** — Accessible color contrast ratios and keyboard navigation support throughout.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| TypeScript | Latest | Static typing |
| Vite | 8.1.4 | Build tool and dev server |
| Framer Motion | 10.16.16 | Animations and transitions |
| Recharts | 2.10.3 | Interactive data visualizations |
| Lucide React | 0.292.0 | Icon library |
| Axios | 1.6.2 | HTTP client |
| Clsx | 2.0.0 | Conditional class management |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.13 | Runtime |
| FastAPI | 0.115.x | REST API framework |
| Uvicorn | 0.32.x | ASGI server |
| PyMongo | 4.17.x | MongoDB driver |
| SQLAlchemy | 2.0.x | SQL ORM (legacy support) |
| Alembic | 1.15.x | Database migration tool |
| Passlib (bcrypt) | 1.7.x | Password hashing |
| Python-Jose | 3.5.x | JWT generation and validation |
| Pydantic | v2 | Request/response data validation |
| Python-dotenv | 1.0.x | Environment variable management |

### Database
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Primary cloud database (users, transactions, budgets) |
| SQLite | Local development fallback |

### Infrastructure and DevOps
| Technology | Purpose |
|---|---|
| Docker and Docker Compose | Containerized local development |
| Kubernetes | Production orchestration |
| GitHub Actions | CI/CD pipeline |
| Netlify | Frontend deployment |

---

## Architecture

BankSarthi follows a Clean Architecture (Domain-Driven Design) pattern on the backend, ensuring separation of concerns and testability.

```
Request
  |
  v
Presentation Layer (routes.py, schemas.py)
  |
  v
Domain Layer (models.py - Business Entities)
  |
  v
Infrastructure Layer (database.py, repositories.py)
  |
  v
MongoDB Atlas / SQLite
```

The Repository Pattern is used to decouple the presentation layer from any specific database technology. Swapping from `InMemoryRepository` to `MongoRepository` requires zero changes to the API routes.

---

## File Structure

```
BANKSARTHI/
|
|-- backend/                              Python FastAPI backend
|   |-- app/
|   |   |-- __init__.py
|   |   |-- domain/                       Core business logic (no external dependencies)
|   |   |   |-- models.py                 Dataclass entities: User, Transaction, Budget
|   |   |
|   |   |-- infrastructure/              External integrations
|   |   |   |-- database.py              MongoDB Atlas client, SQLAlchemy engine setup
|   |   |   |-- repositories.py          InMemoryRepository, MongoRepository (CRUD)
|   |   |
|   |   |-- presentation/               API surface exposed to the frontend
|   |       |-- routes.py               FastAPI router with all REST endpoints
|   |       |-- schemas.py              Pydantic request/response models
|   |
|   |-- tests/                          Automated test suite
|   |   |-- conftest.py                 Pytest fixtures and test configuration
|   |   |-- test_health.py              Health check endpoint tests
|   |   |-- test_routes.py              Route integration tests
|   |
|   |-- main.py                         FastAPI application entrypoint with CORS config
|   |-- seed_db.py                      Database seeding script with sample data
|   |-- requirements.txt                Python package dependencies
|   |-- Dockerfile                      Backend container image definition
|   |-- .env                            Environment variables (not committed to git)
|
|-- frontend/                           React TypeScript frontend application
|   |-- src/
|   |   |-- components/                 Reusable UI component library
|   |   |   |-- index.tsx               11 core components: Button, Card, Input, Badge, etc.
|   |   |   |-- layout.tsx              Application shell, sidebar navigation, header
|   |   |   |-- components.css          Component-level styles
|   |   |   |-- layout.css              Layout and grid styles
|   |   |   |-- pages.css               Page-level styles shared across all pages
|   |   |
|   |   |-- pages/                      Application views mapped to navigation items
|   |   |   |-- dashboard.tsx           Spending overview, charts, recent transactions
|   |   |   |-- analytics.tsx           Time-series spending analysis, filter controls
|   |   |   |-- bankopedia.tsx          Financial term encyclopedia with search
|   |   |   |-- quizzes.tsx             Gamified financial literacy quizzes with XP
|   |   |   |-- voice.tsx               Conversational AI voice assistant interface
|   |   |
|   |   |-- styles/                     Global design system tokens
|   |   |   |-- designSystem.ts         Color palettes, typography, spacing, shadow tokens
|   |   |   |-- global.ts               CSS reset, base styles, root variables
|   |   |
|   |   |-- App.tsx                     Root component, page routing, API health check
|   |   |-- main.tsx                    React DOM entrypoint, mounts App to #root
|   |   |-- vite-env.d.ts               Vite environment type definitions
|   |
|   |-- index.html                      Base HTML document template
|   |-- package.json                    Frontend dependencies and npm scripts
|   |-- tsconfig.json                   TypeScript compiler configuration
|   |-- vite.config.ts                  Vite bundler and plugin configuration
|   |-- Dockerfile                      Frontend container image definition
|   |-- .gitignore                      Excludes node_modules, dist, .env
|
|-- database/                           Database management
|   |-- migrations/
|       |-- 001_initial_schema.sql      Initial table definitions for SQL databases
|
|-- docs/                               Technical documentation
|   |-- api.md                          REST API reference
|   |-- architecture.md                 System architecture review and milestone plan
|
|-- infra/                              Infrastructure and deployment configuration
|   |-- k8s/
|       |-- deployment.yaml             Kubernetes deployment and service manifests
|
|-- .gitignore                          Root gitignore: node_modules, .env, __pycache__, dist
|-- docker-compose.yml                  Orchestrates frontend, backend, and database locally
|-- schema.sql                          Reference SQL schema for all entities
|-- package.json                        Root workspace configuration
|-- package-lock.json                   Lockfile (generated for Linux/Netlify compatibility)
|-- README.md                           This document
|-- DESIGN.md                           UI and visual design system documentation
|-- REDESIGN_SUMMARY.md                 Summary of the complete redesign and delivered scope
|-- SETUP_GUIDE.md                      Step-by-step local development setup instructions
|-- design_notes.md                     Developer design decisions and notes
|-- BankSarthi PRD.docx                 Product Requirements Document
|-- BANK SARTHI TRD.docx                Technical Requirements Document
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Python 3.13 or higher
- Docker and Docker Compose (optional, for containerized setup)

### Option 1 — Local Development (Manual)

**Backend**

```bash
cd backend
python -m venv venv
venv\Scripts\activate         # Windows
source venv/bin/activate      # macOS and Linux
pip install -r requirements.txt
cp .env.example .env          # configure your environment variables
python main.py
```

The API server will be available at `http://localhost:8000`.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

The development server will be available at `http://localhost:5173`.

### Option 2 — Docker Compose

```bash
docker compose up -d
```

This starts the frontend, backend, and database services together. Open `http://localhost:3000`.

### Seed the Database

To populate the database with sample data:

```bash
cd backend
python seed_db.py
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
DATABASE_NAME=banksarthi
DATABASE_URL=sqlite:///./banksarthi.db   # SQLite fallback for local development
```

The application will automatically use MongoDB if `MONGODB_URL` is valid, otherwise it falls back to an in-memory store for development.

---

## Database

BankSarthi uses **MongoDB Atlas** as its primary cloud database. The application manages three core collections:

| Collection | Description |
|---|---|
| `users` | User accounts with authentication credentials and XP totals |
| `transactions` | All debit and credit transaction records with merchant, amount, date, and category |
| `budgets` | Monthly budget limits per spending category per user |

The Repository Pattern means the underlying database can be swapped without any changes to the API routes. The system automatically falls back to an in-memory store if the MongoDB connection fails.

---

## API Reference

All API endpoints are prefixed with `/api/v1`.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Server health check |
| POST | `/api/v1/auth/register` | Register a new user account |
| POST | `/api/v1/auth/login` | Authenticate and log in |
| GET | `/api/v1/transactions?user_id=` | List all transactions for a user |
| POST | `/api/v1/transactions?user_id=` | Create a new transaction |
| GET | `/api/v1/budgets?user_id=` | List all budgets for a user |
| POST | `/api/v1/budgets?user_id=` | Create a new budget category |

Full API documentation is available in `docs/api.md`.

---

## Deployment

### Frontend (Netlify)

The frontend is deployed on Netlify. The `package-lock.json` is generated with Linux-compatible flags to ensure successful builds on Netlify's Linux environment.

```bash
npm run build
```

Build output is placed in `frontend/dist/`.

### Backend (Kubernetes)

The backend is deployable via Kubernetes using the manifests in `infra/k8s/`. Docker images are built from the `Dockerfile` in each service directory.

```bash
docker build -t banksarthi-backend ./backend
docker build -t banksarthi-frontend ./frontend
kubectl apply -f infra/k8s/deployment.yaml
```

---

## Future Roadmap

### Sprint 1 — Authentication and Onboarding
- Complete JWT-based authentication with httpOnly cookies and CSRF protection
- User registration with email verification
- Onboarding flow for first-time users

### Sprint 2 — Core Finance Features
- CSV and PDF bank statement ingestion
- Automatic transaction categorization using rule-based and ML classifiers
- Financial health score calculation

### Sprint 3 — AI Chat and Moderation
- Production AI chat integration with prompt versioning
- Request logging and moderation boundary
- Multilingual support (Hindi, Tamil, Bengali, Marathi)

### Sprint 4 — Notifications and Alerts
- Spending threshold alerts
- Budget overage push notifications
- Weekly summary reports via email

### Sprint 5 — Testing and Security Hardening
- End-to-end test suite with Playwright
- Argon2id password hashing
- Rate limiting and OWASP security hardening
- OpenTelemetry observability with Prometheus and Grafana

### Sprint 6 — Production Release
- Full Kubernetes deployment with autoscaling
- Redis caching for session management and hot data
- Rollback readiness and incident runbooks

---

## Contributing

1. Fork the repository.
2. Create a feature branch from `main`.
3. Commit your changes with clear, descriptive commit messages.
4. Ensure all tests pass with `python -m pytest` before submitting a pull request.
5. Open a pull request against `main` with a detailed description of your changes.

---

## License

This project is private and proprietary. All rights reserved.
