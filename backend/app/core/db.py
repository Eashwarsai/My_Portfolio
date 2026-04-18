from sqlmodel import create_engine
from app.core.config import settings

# ── Database Setup ──
# We use SQLModel (built on SQLAlchemy) to interact with the database.
# Initializing the engine here avoids circular imports across the application.
engine = create_engine(settings.DATABASE_URL)
