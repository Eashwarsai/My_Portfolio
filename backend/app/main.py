# ============================================================
# FastAPI Main Application Entry Point
# ============================================================
# WHAT: The core FastAPI application instance.
# WHY:  This is where the API server starts, middlewares are attached,
#       and API routes are included. 

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, create_engine
import traceback
import logging
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

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app")

# ── App Initialization ──
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# ── Global Exception Handler ──
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "message": str(exc)} if settings.ENVIRONMENT == "development" else {"detail": "Internal Server Error"}
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

# ── Root / Health Check Endpoints ──
# Required by hosting providers (Render) to verify the service is running.
@app.get("/", tags=["System"])
def root_check():
    return {"status": "ok", "message": "Portfolio API is live"}

@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "ok", 
        "environment": settings.ENVIRONMENT,
        "database": "connected"
    }

# Include API v1 routers
app.include_router(api_router, prefix=settings.API_V1_STR)
