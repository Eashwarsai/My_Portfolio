# ============================================================
# FastAPI Main Application Entry Point
# ============================================================
# WHAT: The core FastAPI application instance.
# WHY:  This is where the API server starts, middlewares are attached,
#       and API routes are included. 

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine
from contextlib import asynccontextmanager

from app.core.config import settings
from app.api.v1.api import api_router
from app.core.db import engine

# ── Lifespan Context Manager ──
# Runs code before the app starts accepting requests, and after it shuts down
@asynccontextmanager
async def lifespan(app: FastAPI):
    # In production, we use Alembic migrations to manage the schema.
    # To apply migrations, run: alembic upgrade head
    yield
    # Shutdown: Clean up resources (if necessary)

# ── App Initialization ──
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# ── CORS Middleware ──
# Critical: Browsers block API requests from different domains for security.
# Since frontend runs on :5173 and backend on :8000, we must explicitly allow it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Root / Health Check Endpoint ──
# Required by hosting providers (Render) to verify the service is running.
@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "ok", 
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }

# Include API v1 routers
app.include_router(api_router, prefix=settings.API_V1_STR)
