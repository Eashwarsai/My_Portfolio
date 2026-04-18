# ============================================================
# API Configuration (pydantic-settings)
# ============================================================
# WHAT: Type-safe environment variables.
# WHY:  Instead of using os.getenv() everywhere (which returns strings or None),
#       Pydantic validates that the required variables exist and casts them
#       to the correct Python types (e.g., bool, int). 
#       If a required variable is missing, the app fails to start immediately
#       rather than throwing an error deep in the code later.

from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Eashwar Sai Portfolio API"
    API_V1_STR: str = "/api/v1"
    
    # CORS Configuration
    # Accepts either a list or a comma-separated string from the environment
    CORS_ORIGINS: Union[List[str], str] = ["http://localhost:5173", "http://localhost:5174"]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list):
            return v
        return v

    # Database configuration 
    # Must be provided via .env (DATABASE_URL)
    DATABASE_URL: str

    # Environment
    ENVIRONMENT: str = "development"

    # Firebase Authentication Configuration
    # All these must be provided via .env
    FIREBASE_PROJECT_ID: str | None = None
    FIREBASE_SERVICE_ACCOUNT_PATH: str | None = None
    FIREBASE_SERVICE_ACCOUNT_JSON: str | None = None
    
    USE_FIREBASE_AUTH: bool = True
    ADMIN_API_KEY: str

    # Read from .env file
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
