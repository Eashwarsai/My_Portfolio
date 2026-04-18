# Eashwar Sai — Personal Portfolio & Learning Log

A full-stack web application designed to act as a professional portfolio, robust blog platform, and a daily learning journal.

Built with **React, TypeScript, Redux Toolkit (RTK Query), TailwindCSS v3** on the frontend, and a highly performant **Python FastAPI, SQLModel** stack on the backend. Complete with **Docker orchestration** for robust local development and production deployments.

## 🚀 Features (Under Development)

- **Portfolio**: Hero, Interactive Skills Matrix, Chronological Experience, Project Showcase
- **Blog Platform**: Server-side pagination, markdown rendering with code highlighting (Phase 2).
- **Learning Log**: A dedicated daily journal featuring an infinite scrolling feed (Phase 3).
- **Stunning UI/UX**: Entirely token-driven Tailwind configuration ensuring a strict, cohesive Dark/Light Mode interface with zero absolute hardcoded values.

## 📦 Project Structure

Structured as a **Monorepo** to tightly couple the frontend and backend under a single unified version control workflow with isolated deployments.

```
MyWebsite/
├── frontend/             # Single Page Application (React 18 + Vite + TS)
│   ├── src/
│   │   ├── app/          # App router, Redux Store, Theme configurations
│   │   ├── components/   # Shared Layout & Reusable UI elements
│   │   └── features/     # Feature-slice design (Portfolio, Blog, Learning Log)
│   ├── tailwind.config.js# System design strict mappings
│   └── Dockerfile        # Production Multi-Stage Nginx Build
│
├── backend/              # RESTful API (Python + FastAPI)
│   ├── app/              # Clean API architecture
│   ├── alembic/          # Database migrations
│   ├── pyproject.toml    # Dependencies
│   └── Dockerfile        # Production FastAPI Build
│
├── .env.example          # Environment Variables Spec
└── docker-compose.yml    # Local Development Orchestrator 
```

## 🛠️ Local Development Setup

We map volumes locally for instant hot-module replacement (HMR) within the Docker environment without rebuilding containers!

### Option 1: Native (Node & Python virtual environment)

**1. Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**2. Start the Backend:**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Option 2: Docker Compose (Recommended)
You only need Docker desktop installed!

```bash
docker-compose up
```
*Frontend runs on http://localhost:5173* \
*Backend API runs on http://localhost:8000* \
*API Swagger Documentation runs on http://localhost:8000/docs*

---
*Built with passion by Eashwar Sai.*
