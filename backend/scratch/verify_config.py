from app.core.config import settings
import os

# Test DATABASE_URL fix
original_url = "postgres://user:pass@host/db"
os.environ["DATABASE_URL"] = original_url

# We need to reload settings or mock it.
# Since settings is already initialized, we can test the validator directly
from app.core.config import Settings
try:
    s = Settings(DATABASE_URL="postgres://u:p@h/d")
    print(f"Fixed URL: {s.DATABASE_URL}")
    assert s.DATABASE_URL.startswith("postgresql://")
    print("DATABASE_URL fix verified!")
except Exception as e:
    print(f"Error: {e}")
