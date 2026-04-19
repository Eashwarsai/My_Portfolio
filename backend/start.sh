#!/bin/bash

# ============================================================
# Backend Startup Script
# ============================================================
# WHAT: Runs database migrations before starting the API server.
# WHY:  Ensures that the database schema is always up-to-date
#       without needing to run manual commands on every deploy.

echo "Running database migrations..."
# Run migrations to the latest version
alembic upgrade head

echo "Starting Uvicorn server..."
# Start the FastAPI application
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
